/**
 * Firebase Configuration
 * 
 * ⚠️ セットアップ手順:
 * 1. https://console.firebase.google.com/ でプロジェクトを作成
 * 2. Authentication > Sign-in method > メール/パスワードを有効化
 * 3. Storage を有効化
 * 4. プロジェクト設定 > 全般 > マイアプリ > ウェブアプリを追加
 * 5. 下記の firebaseConfig を取得した値で置き換え
 */

// Firebase SDK (CDN版を使用)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getStorage, ref, uploadBytes, getDownloadURL, listAll, deleteObject } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js';

// ========================================
// 🔧 ここを自分のFirebase設定に置き換えてください
// ========================================
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Firebase初期化
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

// ========================================
// 認証関連
// ========================================

/**
 * メールとパスワードでログイン
 */
export async function login(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { success: true, user: userCredential.user };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

/**
 * ログアウト
 */
export async function logout() {
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

/**
 * 認証状態を監視
 */
export function onAuthChange(callback) {
    return onAuthStateChanged(auth, callback);
}

/**
 * 現在のユーザーを取得
 */
export function getCurrentUser() {
    return auth.currentUser;
}

// ========================================
// ストレージ関連
// ========================================

/**
 * 画像をアップロード
 * @param {File} file - アップロードするファイル
 * @param {string} category - カテゴリ (landscape, portrait, street)
 * @param {string} title - 写真のタイトル
 */
export async function uploadImage(file, category, title) {
    try {
        // ファイル名を生成（タイムスタンプ + 元のファイル名）
        const timestamp = Date.now();
        const fileName = `${timestamp}_${file.name}`;
        const filePath = `gallery/${category}/${fileName}`;

        // メタデータを設定
        const metadata = {
            customMetadata: {
                title: title,
                category: category,
                uploadedAt: new Date().toISOString()
            }
        };

        // アップロード
        const storageRef = ref(storage, filePath);
        await uploadBytes(storageRef, file, metadata);

        // ダウンロードURLを取得
        const downloadURL = await getDownloadURL(storageRef);

        return {
            success: true,
            url: downloadURL,
            path: filePath,
            title: title,
            category: category
        };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

/**
 * 全ての画像を取得
 */
export async function getAllImages() {
    try {
        const images = [];
        const categories = ['landscape', 'portrait', 'street'];

        for (const category of categories) {
            const categoryRef = ref(storage, `gallery/${category}`);

            try {
                const result = await listAll(categoryRef);

                for (const item of result.items) {
                    const url = await getDownloadURL(item);
                    const metadata = await item.getMetadata();

                    images.push({
                        url: url,
                        path: item.fullPath,
                        category: category,
                        title: metadata.customMetadata?.title || 'Untitled',
                        uploadedAt: metadata.customMetadata?.uploadedAt || ''
                    });
                }
            } catch (e) {
                // カテゴリフォルダが存在しない場合はスキップ
                console.log(`Category ${category} not found, skipping...`);
            }
        }

        // 日付順にソート（新しい順）
        images.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));

        return { success: true, images: images };
    } catch (error) {
        return { success: false, error: error.message, images: [] };
    }
}

/**
 * 画像を削除
 * @param {string} path - 削除する画像のパス
 */
export async function deleteImage(path) {
    try {
        const imageRef = ref(storage, path);
        await deleteObject(imageRef);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Exportする定数
export { auth, storage };
