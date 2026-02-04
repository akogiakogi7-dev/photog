/**
 * Admin Page JavaScript
 * Handles authentication, image upload, and management
 */

import {
    login,
    logout,
    onAuthChange,
    uploadImage,
    getAllImages,
    deleteImage
} from './firebase-config.js';

// ========================================
// DOM Elements
// ========================================
const loginScreen = document.getElementById('login-screen');
const adminScreen = document.getElementById('admin-screen');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const logoutBtn = document.getElementById('logout-btn');
const userEmail = document.getElementById('user-email');

const uploadForm = document.getElementById('upload-form');
const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('file-input');
const previewContainer = document.getElementById('preview-container');
const previewGrid = document.getElementById('preview-grid');
const categorySelect = document.getElementById('category');
const titleInput = document.getElementById('title');
const uploadBtn = uploadForm.querySelector('.btn-upload');

const imagesGrid = document.getElementById('images-grid');
const deleteModal = document.getElementById('delete-modal');
const cancelDeleteBtn = document.getElementById('cancel-delete');
const confirmDeleteBtn = document.getElementById('confirm-delete');

// State
let selectedFiles = [];
let imageToDelete = null;

// ========================================
// Authentication
// ========================================
onAuthChange((user) => {
    if (user) {
        // ログイン状態
        loginScreen.classList.add('hidden');
        adminScreen.classList.remove('hidden');
        userEmail.textContent = user.email;
        loadImages();
    } else {
        // 未ログイン状態
        loginScreen.classList.remove('hidden');
        adminScreen.classList.add('hidden');
    }
});

// ログインフォーム送信
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    loginError.textContent = '';

    const result = await login(email, password);

    if (!result.success) {
        loginError.textContent = 'ログインに失敗しました: ' + result.error;
    }
});

// ログアウト
logoutBtn.addEventListener('click', async () => {
    await logout();
});

// ========================================
// File Upload
// ========================================

// ドロップゾーンのイベント
dropzone.addEventListener('click', () => fileInput.click());

dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('dragover');
});

dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('dragover');
});

dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('dragover');
    handleFiles(e.dataTransfer.files);
});

fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

// ========================================
// 画像圧縮機能（高画質モード）
// ========================================

// 圧縮設定
const COMPRESSION_CONFIG = {
    maxWidth: 3840,           // 4K解像度まで対応
    jpegQuality: 0.92,        // 高画質JPEG（92%）
    pngQuality: 0.95,         // PNG品質
    skipThreshold: 2 * 1024 * 1024,  // 2MB以下はスキップ
    maxSizeForProcess: 15 * 1024 * 1024  // 15MB以上は必ず処理
};

/**
 * 画像を最適化する（高画質維持）
 * - 色情報やメタデータを可能な限り保持
 * - PNGはPNGのまま、JPEGはJPEGのまま処理
 * - 小さいファイルは処理をスキップ
 * @param {File} file - 元の画像ファイル
 * @returns {Promise<File>} 最適化された画像ファイル
 */
async function compressImage(file) {
    // 小さいファイルはスキップ（画質維持のため）
    if (file.size < COMPRESSION_CONFIG.skipThreshold &&
        file.size < COMPRESSION_CONFIG.maxSizeForProcess) {
        console.log(`スキップ（${(file.size / 1024 / 1024).toFixed(2)}MB）: ${file.name}`);
        return file;
    }

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                // 元のサイズを取得
                let width = img.width;
                let height = img.height;
                const originalWidth = width;

                // リサイズが必要か確認（4K以上のみリサイズ）
                if (width > COMPRESSION_CONFIG.maxWidth) {
                    height = (height * COMPRESSION_CONFIG.maxWidth) / width;
                    width = COMPRESSION_CONFIG.maxWidth;
                }

                // リサイズも圧縮も不要な場合はスキップ
                if (originalWidth <= COMPRESSION_CONFIG.maxWidth &&
                    file.size < COMPRESSION_CONFIG.skipThreshold) {
                    console.log(`処理スキップ: ${file.name}`);
                    resolve(file);
                    return;
                }

                // Canvasで処理
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d', {
                    // 色空間を維持
                    colorSpace: 'srgb'
                });

                // 高品質レンダリング設定
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
                ctx.drawImage(img, 0, 0, width, height);

                // 元のフォーマットを維持
                const isPNG = file.type === 'image/png';
                const outputType = isPNG ? 'image/png' : 'image/jpeg';
                const quality = isPNG ? COMPRESSION_CONFIG.pngQuality : COMPRESSION_CONFIG.jpegQuality;

                // Blobに変換
                canvas.toBlob((blob) => {
                    if (blob) {
                        // 圧縮後のサイズが元より大きい場合は元のファイルを使用
                        if (blob.size >= file.size) {
                            console.log(`元ファイル使用（圧縮効果なし）: ${file.name}`);
                            resolve(file);
                            return;
                        }

                        // 新しいFileオブジェクトを作成
                        const compressedFile = new File([blob], file.name, {
                            type: outputType,
                            lastModified: Date.now()
                        });
                        const reduction = ((1 - compressedFile.size / file.size) * 100).toFixed(1);
                        console.log(`最適化: ${(file.size / 1024 / 1024).toFixed(2)}MB → ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB (-${reduction}%)`);
                        resolve(compressedFile);
                    } else {
                        reject(new Error('圧縮に失敗しました'));
                    }
                }, outputType, quality);
            };
            img.onerror = () => reject(new Error('画像の読み込みに失敗しました'));
            img.src = e.target.result;
        };
        reader.onerror = () => reject(new Error('ファイルの読み込みに失敗しました'));
        reader.readAsDataURL(file);
    });
}

// ファイル処理（並列処理で高速化）
async function handleFiles(files) {
    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));

    // 処理中の表示
    if (imageFiles.length > 0) {
        dropzone.classList.add('processing');
        dropzone.querySelector('.dropzone-content p').textContent = `${imageFiles.length}枚の画像を処理中...`;
    }

    // 重複チェック
    const newFiles = imageFiles.filter(file => !selectedFiles.find(f => f.name === file.name));

    if (newFiles.length > 0) {
        try {
            // 並列処理で高速化
            const processedFiles = await Promise.all(
                newFiles.map(async (file) => {
                    try {
                        return await compressImage(file);
                    } catch (error) {
                        console.error('処理エラー:', error);
                        return file; // エラー時は元ファイルを使用
                    }
                })
            );
            selectedFiles.push(...processedFiles);
        } catch (error) {
            console.error('バッチ処理エラー:', error);
        }
    }

    // 表示を戻す
    dropzone.classList.remove('processing');
    dropzone.querySelector('.dropzone-content p').textContent = 'ここに画像をドロップ';

    updatePreview();
    updateUploadButton();
}

// プレビュー更新
function updatePreview() {
    if (selectedFiles.length === 0) {
        previewContainer.classList.add('hidden');
        return;
    }

    previewContainer.classList.remove('hidden');
    previewGrid.innerHTML = '';

    selectedFiles.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const item = document.createElement('div');
            item.className = 'preview-item';
            item.innerHTML = `
                <img src="${e.target.result}" alt="${file.name}">
                <button class="remove-btn" data-index="${index}">×</button>
            `;
            previewGrid.appendChild(item);

            // 削除ボタン
            item.querySelector('.remove-btn').addEventListener('click', () => {
                selectedFiles.splice(index, 1);
                updatePreview();
                updateUploadButton();
            });
        };
        reader.readAsDataURL(file);
    });
}

// アップロードボタンの状態更新
function updateUploadButton() {
    uploadBtn.disabled = selectedFiles.length === 0;
}

// アップロードフォーム送信
uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (selectedFiles.length === 0) return;

    const category = categorySelect.value;
    const title = titleInput.value || 'Untitled';

    // UIを更新
    uploadBtn.disabled = true;
    uploadBtn.querySelector('.btn-text').classList.add('hidden');
    uploadBtn.querySelector('.btn-loading').classList.remove('hidden');

    // 各ファイルをアップロード
    for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const fileTitle = selectedFiles.length > 1 ? `${title} (${i + 1})` : title;

        const result = await uploadImage(file, category, fileTitle);

        if (!result.success) {
            alert(`アップロードエラー: ${result.error}`);
        }
    }

    // リセット
    selectedFiles = [];
    updatePreview();
    titleInput.value = '';
    fileInput.value = '';

    uploadBtn.disabled = false;
    uploadBtn.querySelector('.btn-text').classList.remove('hidden');
    uploadBtn.querySelector('.btn-loading').classList.add('hidden');

    // 画像一覧を再読み込み
    loadImages();
});

// ========================================
// Image Management
// ========================================

// 画像一覧を読み込み
async function loadImages() {
    imagesGrid.innerHTML = '<p class="loading-message">読み込み中...</p>';

    const result = await getAllImages();

    if (result.images.length === 0) {
        imagesGrid.innerHTML = '<p class="empty-message">まだ画像がありません</p>';
        return;
    }

    imagesGrid.innerHTML = '';

    result.images.forEach(image => {
        const card = document.createElement('div');
        card.className = 'image-card';
        card.innerHTML = `
            <img src="${image.url}" alt="${image.title}">
            <div class="image-card-info">
                <p class="image-card-title">${image.title}</p>
                <p class="image-card-category">${image.category}</p>
                <div class="image-card-actions">
                    <button class="btn btn-secondary btn-small delete-btn" data-path="${image.path}">削除</button>
                </div>
            </div>
        `;
        imagesGrid.appendChild(card);

        // 削除ボタン
        card.querySelector('.delete-btn').addEventListener('click', () => {
            imageToDelete = image.path;
            deleteModal.classList.remove('hidden');
        });
    });
}

// 削除モーダル
cancelDeleteBtn.addEventListener('click', () => {
    deleteModal.classList.add('hidden');
    imageToDelete = null;
});

confirmDeleteBtn.addEventListener('click', async () => {
    if (imageToDelete) {
        const result = await deleteImage(imageToDelete);

        if (result.success) {
            loadImages();
        } else {
            alert('削除エラー: ' + result.error);
        }
    }

    deleteModal.classList.add('hidden');
    imageToDelete = null;
});

// モーダル外クリックで閉じる
deleteModal.addEventListener('click', (e) => {
    if (e.target === deleteModal) {
        deleteModal.classList.add('hidden');
        imageToDelete = null;
    }
});
