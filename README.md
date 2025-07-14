# YOLUBE ウェブサイト

遊び心で社会を変える - YOLUBEのオフィシャルウェブサイト

## 概要

YOLUBEは「遊び心で社会を変える」という理念のもと、テーブルゲームの力で地域社会の課題解決に取り組む革新的な団体です。このウェブサイトは、YOLUBEの事業内容、実績、プロフィールを紹介するReactベースのSPA（Single Page Application）です。

## 特徴

- **レスポンシブデザイン**: スマートフォンからデスクトップまで対応
- **ボードゲーム風デザイン**: テーブルゲームを連想させる視覚的なテイスト
- **アニメーション**: 遊び心のある動きとエフェクト
- **アクセシビリティ**: 日本語フォントとユーザビリティの最適化
- **SEO対応**: メタタグとOGPタグの設定

## 使用技術

- React 18.2.0
- CSS3（カスタムプロパティ、グリッド、フレックスボックス）
- Google Fonts（Noto Sans JP）
- レスポンシブデザイン

## ファイル構成

```
src/
├── components/
│   ├── Header.js/.css        # ナビゲーションヘッダー
│   ├── Hero.js/.css          # メインビジュアル
│   ├── About.js/.css         # 事業概要
│   ├── Services.js/.css      # サービス紹介
│   ├── Achievements.js/.css  # 実績紹介
│   ├── Profile.js/.css       # プロフィール
│   ├── Contact.js/.css       # お問い合わせ
│   └── Footer.js/.css        # フッター
├── App.js                    # メインアプリケーション
├── App.css                   # 共通スタイル
└── index.js                  # エントリーポイント

public/
├── images/                   # 画像ファイル
│   ├── favicon.png           # ファビコン
│   ├── YOLUBE_logo.png       # ロゴ
│   ├── YOLUBE_Symbol.png     # シンボル
│   └── makoto.jpg            # プロフィール画像
└── index.html                # HTMLテンプレート
```

## セットアップ

1. 依存関係をインストール:
   ```bash
   npm install
   ```

2. 開発サーバーを起動:
   ```bash
   npm start
   ```

3. ブラウザで http://localhost:3000 にアクセス

## ビルド

本番環境用にビルドする場合:

```bash
npm run build
```

ビルドされたファイルは `build/` フォルダに生成されます。

## デザインシステム

### カラーパレット

- **プライマリカラー**: #8BC780 (メインブランドカラー)
- **プライマリダーク**: #6BA563
- **プライマリライト**: #A5D59C
- **セカンダリカラー**: #FF6B6B
- **アクセントカラー**: #FFD93D

### フォント

- **日本語**: Noto Sans JP
- **英語**: Helvetica Neue, Arial

### コンポーネント

- **game-card**: ボードゲーム風のカードデザイン
- **btn**: アニメーション付きボタン
- **section**: 統一されたセクションレイアウト

## 連絡先

- **団体名**: YOLUBE
- **代表者**: 木村 允
- **電話**: 090-2841-3926
- **メール**: info@yolube.jp

## ライセンス

© 2025 YOLUBE. All rights reserved. 