# Leica Portfolio

ライカ愛用クリエイターのためのモダンなパーソナル・ポートフォリオサイト。

## 特徴

- 🎨 **流動的な背景アニメーション** - Canvas ベースの有機的なモーション
- 🌙 **ダークモード対応** - 深い墨色の高級感あるカラーパレット  
- 📸 **EXIF メタデータ表示** - 写真の撮影情報をエレガントに表示
- 🔗 **ソーシャルリンク** - Instagram, YouTube, X (Twitter)

## 技術スタック

- Next.js 14 (App Router)
- Tailwind CSS
- Framer Motion
- TypeScript

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# 本番ビルド
npm run build
```

## ディレクトリ構成

```
src/
├── app/
│   ├── layout.tsx     # ルートレイアウト
│   ├── page.tsx       # メインページ
│   └── globals.css    # グローバルスタイル
└── components/
    ├── FluidBackground.tsx  # 流動背景
    ├── Navigation.tsx       # ナビゲーション
    ├── Hero.tsx             # ヒーローセクション
    ├── GallerySlot.tsx      # ギャラリー埋め込み予約
    ├── PhotoMetadata.tsx    # EXIF表示
    ├── FeaturedPhoto.tsx    # フィーチャーフォト
    └── Footer.tsx           # フッター
```

## ギャラリーの埋め込み

`GallerySlot.tsx` 内のプレースホルダーを iframe に置き換えてください:

```tsx
<iframe 
  src="YOUR_GALLERY_URL" 
  className="w-full h-full border-0"
  title="Photo Gallery"
  loading="lazy"
/>
```
