/**
 * Gallery Loader - Firebase Storage Integration
 * 
 * このファイルはFirebaseから画像を動的に読み込みます。
 * 既存のHTML画像を維持しつつ、Firebase画像を追加表示します。
 */

import { getAllImages } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', async () => {
    const gallery = document.getElementById('gallery');
    const watermarkText = '© Aru';

    console.log('Gallery Loader: 初期化開始...');

    // Firebase画像を読み込み
    await loadFirebaseImages();

    async function loadFirebaseImages() {
        try {
            console.log('Firebase画像を読み込み中...');
            const result = await getAllImages();
            console.log('Firebase結果:', result);

            if (result.success && result.images.length > 0) {
                console.log(`${result.images.length}枚のFirebase画像を追加します`);

                // Firebase上の画像をギャラリーの先頭に追加（新しい画像が上に来る）
                const existingFirstItem = gallery.firstElementChild;

                result.images.forEach((image, index) => {
                    // 重複チェック（同じURLの画像がすでにあるかどうか）
                    const existingImg = gallery.querySelector(`img[src="${image.url}"]`);
                    if (!existingImg) {
                        const item = createGalleryItem(image, index);
                        // 先頭に挿入
                        if (existingFirstItem) {
                            gallery.insertBefore(item, existingFirstItem);
                        } else {
                            gallery.appendChild(item);
                        }
                    }
                });

                // ギャラリーを再初期化（Lightbox、フィルター用）
                reinitializeGallery();

                console.log('Firebase画像の読み込み完了');
            } else {
                console.log('Firebase画像なし、または読み込み失敗:', result.error || '画像がありません');
            }
        } catch (error) {
            console.error('Firebase画像の読み込みエラー:', error);
        }
    }

    function createGalleryItem(image, index) {
        const div = document.createElement('div');
        div.className = 'gallery-item firebase-image';
        div.dataset.category = image.category;
        div.dataset.watermark = watermarkText;
        div.dataset.source = 'firebase';
        div.style.animationDelay = `${0.05 + (index * 0.03)}s`;

        div.innerHTML = `
            <img src="${image.url}" 
                 data-full="${image.url}"
                 alt="${image.title}" 
                 loading="lazy">
            <div class="overlay">
                <span class="photo-title">${image.title}</span>
            </div>
        `;

        return div;
    }

    function reinitializeGallery() {
        // 全てのギャラリーアイテムを取得（静的 + Firebase）
        const allItems = document.querySelectorAll('.gallery-item');
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');
        const lightboxCounter = document.getElementById('lightbox-counter');
        const lightboxClose = document.getElementById('lightbox-close');
        const lightboxPrev = document.getElementById('lightbox-prev');
        const lightboxNext = document.getElementById('lightbox-next');
        const filterBtns = document.querySelectorAll('.nav-btn');

        let visibleItems = [...allItems];
        let currentIndex = 0;

        // フィルターボタンの再設定
        filterBtns.forEach(btn => {
            // 既存のイベントリスナーを削除するためにクローンで置き換え
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);

            newBtn.addEventListener('click', () => {
                const filter = newBtn.dataset.filter;

                // アクティブボタン更新
                document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                newBtn.classList.add('active');

                // フィルタリング
                allItems.forEach(item => {
                    const category = item.dataset.category;
                    if (filter === 'all' || category === filter) {
                        item.classList.remove('hidden', 'fade-out');
                    } else {
                        item.classList.add('fade-out');
                        setTimeout(() => item.classList.add('hidden'), 300);
                    }
                });

                // visibleItems更新
                setTimeout(() => {
                    visibleItems = [...allItems].filter(item => !item.classList.contains('hidden'));
                }, 350);
            });
        });

        // 各アイテムにイベントリスナーを設定
        allItems.forEach((item) => {
            // Lazy loading
            const img = item.querySelector('img');
            if (img && !img.classList.contains('observed')) {
                img.classList.add('observed');
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            img.classList.add('loaded');
                            observer.unobserve(img);
                        }
                    });
                }, { threshold: 0.1, rootMargin: '50px' });
                observer.observe(img);
            }

            // クリックでLightboxを開く（既存のリスナーがない場合のみ）
            if (!item.dataset.listenerAdded) {
                item.dataset.listenerAdded = 'true';
                item.addEventListener('click', () => {
                    const idx = visibleItems.indexOf(item);
                    if (idx !== -1) {
                        currentIndex = idx;
                        openLightbox();
                    }
                });

                // 右クリック無効
                item.addEventListener('contextmenu', (e) => e.preventDefault());

                // ドラッグ無効
                if (img) {
                    img.addEventListener('dragstart', (e) => e.preventDefault());
                }
            }
        });

        function openLightbox() {
            const item = visibleItems[currentIndex];
            if (!item) return;

            const img = item.querySelector('img');
            const title = item.querySelector('.photo-title');

            // ローディング状態を表示
            lightboxImg.style.opacity = '0.5';

            const tempImg = new Image();
            tempImg.onload = () => {
                lightboxImg.src = img.dataset.full || img.src;
                lightboxImg.alt = img.alt;
                lightboxImg.style.opacity = '1';
            };
            tempImg.src = img.dataset.full || img.src;

            lightboxCaption.textContent = title ? title.textContent : '';
            lightboxCounter.textContent = `${currentIndex + 1} / ${visibleItems.length}`;

            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }

        function nextImage() {
            currentIndex = (currentIndex + 1) % visibleItems.length;
            openLightbox();
        }

        function prevImage() {
            currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
            openLightbox();
        }

        // Lightboxコントロールの再設定
        if (lightboxClose) {
            const newClose = lightboxClose.cloneNode(true);
            lightboxClose.parentNode.replaceChild(newClose, lightboxClose);
            newClose.addEventListener('click', closeLightbox);
        }

        if (lightboxPrev) {
            const newPrev = lightboxPrev.cloneNode(true);
            lightboxPrev.parentNode.replaceChild(newPrev, lightboxPrev);
            newPrev.addEventListener('click', prevImage);
        }

        if (lightboxNext) {
            const newNext = lightboxNext.cloneNode(true);
            lightboxNext.parentNode.replaceChild(newNext, lightboxNext);
            newNext.addEventListener('click', nextImage);
        }

        // 背景クリックで閉じる
        lightbox.onclick = (e) => {
            if (e.target === lightbox) closeLightbox();
        };

        // キーボードナビゲーション
        document.onkeydown = (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };
    }
});
