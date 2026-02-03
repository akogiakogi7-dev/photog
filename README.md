# Photo Gallery - 使い方

## 📸 写真の追加方法

### 方法1: 直接HTMLを編集（今すぐ使える）

`index.html` を開いて、写真を追加・変更：

```html
<div class="gallery-item" data-watermark="© あなたの名前" data-category="landscape">
    <img src="images/your-photo.jpg"
         data-full="images/your-photo.jpg"
         alt="写真の説明" loading="lazy">
    <div class="overlay">
        <span class="photo-title">写真のタイトル</span>
    </div>
</div>
```

### カテゴリ
- `landscape` - 風景
- `portrait` - ポートレート  
- `street` - ストリート

---

## 🔒 保護機能

- ✅ ウォーターマーク表示
- ✅ 右クリック無効
- ✅ ドラッグ無効
- ✅ キーボードショートカット無効

---

## 📂 ファイル構成

```
photog/
├── index.html      ← メインページ
├── styles.css      ← スタイル
├── gallery.js      ← ギャラリー機能
├── images/         ← あなたの写真を入れるフォルダ
└── README.md       ← このファイル
```

---

## 🚀 Firebase版（後で設定）

アップロード機能を使いたい場合は `FIREBASE_SETUP.md` を参照してください。
