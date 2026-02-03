/**
 * Gallery Loader - Firebase Storage Integration
 * 
 * このファイルはFirebaseから画像を動的に読み込みます。
 * Firebase設定が完了したら、index.htmlでこのスクリプトを有効化してください。
 */

import { getAllImages } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', async () => {
    const gallery = document.getElementById('gallery');
    const watermarkText = '© Your Name'; // ウォーターマークのテキスト

    // Firebase画像を読み込み
    await loadFirebaseImages();

    async function loadFirebaseImages() {
        try {
            const result = await getAllImages();

            if (result.success && result.images.length > 0) {
                // サンプル画像を削除（Firebaseから読み込む場合）
                // gallery.innerHTML = '';

                // Firebase上の画像を追加
                result.images.forEach((image, index) => {
                    const item = createGalleryItem(image, index);
                    gallery.appendChild(item);
                });

                // ギャラリーを再初期化
                reinitializeGallery();
            }
        } catch (error) {
            console.error('Firebase画像の読み込みエラー:', error);
        }
    }

    function createGalleryItem(image, index) {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        div.dataset.category = image.category;
        div.dataset.watermark = watermarkText;
        div.style.animationDelay = `${0.1 + (index * 0.05)}s`;

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
        // イベントリスナーを再設定（Lightbox用）
        const newItems = document.querySelectorAll('.gallery-item');
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');
        const lightboxCounter = document.getElementById('lightbox-counter');

        let visibleItems = [...newItems];
        let currentIndex = 0;

        newItems.forEach((item) => {
            // Lazy loading
            const img = item.querySelector('img');
            if (img) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            img.classList.add('loaded');
                            observer.unobserve(img);
                        }
                    });
                }, { threshold: 0.1 });
                observer.observe(img);
            }

            // クリックでLightboxを開く
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
            const itemImg = item.querySelector('img');
            if (itemImg) {
                itemImg.addEventListener('dragstart', (e) => e.preventDefault());
            }
        });

        function openLightbox() {
            const item = visibleItems[currentIndex];
            const img = item.querySelector('img');
            const title = item.querySelector('.photo-title');

            lightboxImg.src = img.dataset.full || img.src;
            lightboxImg.alt = img.alt;
            lightboxCaption.textContent = title ? title.textContent : '';
            lightboxCounter.textContent = `${currentIndex + 1} / ${visibleItems.length}`;

            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
});
