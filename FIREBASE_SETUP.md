# Photo Gallery - Firebase セットアップガイド

このガイドでは、写真ギャラリーにFirebaseのアップロード機能と認証を設定する方法を説明します。

## 📋 必要なもの

- Googleアカウント
- 数分の時間

---

## 🚀 セットアップ手順

### Step 1: Firebaseプロジェクトの作成

1. [Firebase Console](https://console.firebase.google.com/) にアクセス
2. 「プロジェクトを追加」をクリック
3. プロジェクト名を入力（例: `my-photo-gallery`）
4. Googleアナリティクスは無効でOK
5. 「プロジェクトを作成」をクリック

### Step 2: ウェブアプリを追加

1. プロジェクトの概要ページで `</>` (Web) アイコンをクリック
2. アプリのニックネームを入力
3. 「Firebase Hosting」はチェック不要
4. 「アプリを登録」をクリック
5. 表示される `firebaseConfig` の内容をコピー

### Step 3: firebase-config.js を更新

`firebase-config.js` を開き、以下の部分を自分の設定に置き換え:

```javascript
const firebaseConfig = {
    apiKey: "AIza...",           // コピーした値
    authDomain: "xxx.firebaseapp.com",
    projectId: "xxx",
    storageBucket: "xxx.appspot.com",
    messagingSenderId: "123...",
    appId: "1:123..."
};
```

### Step 4: Authentication を有効化

1. 左メニューの「Build」→「Authentication」
2. 「始める」をクリック
3. 「Sign-in method」タブ
4. 「メール/パスワード」を有効化
5. 「保存」

### Step 5: 管理者アカウントを作成

1. 「Authentication」→「Users」タブ
2. 「ユーザーを追加」
3. メールアドレスとパスワードを入力
4. 「ユーザーを追加」をクリック

### Step 6: Storage を有効化

1. 左メニューの「Build」→「Storage」
2. 「始める」をクリック
3. 「本番環境モード」を選択
4. ロケーションを選択（asia-northeast1 = 東京）
5. 「完了」

### Step 7: Storage ルールを設定

「Storage」→「Rules」タブで以下に置き換え:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /gallery/{allPaths=**} {
      // 誰でも読み取り可能
      allow read: if true;
      // 認証済みユーザーのみ書き込み可能
      allow write: if request.auth != null;
    }
  }
}
```

「公開」をクリックして保存。

---

## ✅ 動作確認

1. `admin.html` をブラウザで開く
2. 作成したメール/パスワードでログイン
3. 画像をアップロード
4. `index.html` で画像が表示されることを確認

---

## 📁 ファイル構成

```
photog/
├── index.html         # メインギャラリー
├── admin.html         # 管理者ページ
├── styles.css         # 共通スタイル
├── admin.css          # 管理画面スタイル
├── gallery.js         # ギャラリー機能
├── admin.js           # 管理画面機能
├── firebase-config.js # Firebase設定（要編集）
├── gallery-loader.js  # Firebase画像読み込み
└── FIREBASE_SETUP.md  # このファイル
```

---

## ❓ トラブルシューティング

### ログインできない
- メール/パスワードが正しいか確認
- Authentication でメール認証が有効か確認

### 画像がアップロードできない
- Storage ルールが正しく設定されているか確認
- ブラウザのコンソールでエラーを確認

### CORSエラーが出る
- ローカルファイル（file://）からは動作しません
- ローカルサーバーで実行してください:
  ```bash
  npx serve .
  ```
