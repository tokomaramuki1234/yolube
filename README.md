# YOLUBE ウェブサイト

遊び心で社会を変える - YOLUBEのオフィシャルウェブサイト

---

## 🚀 クイックスタート

```bash
npm install          # 依存関係インストール
npm start            # 開発サーバー起動（localhost:3000）
npm run build        # 本番ビルド
git push origin master  # デプロイ（Vercel自動デプロイ）
```

**本番URL**: https://yolube.jp

---

## 📋 重要情報

### システム概要

- **フロントエンド**: React SPA（Single Page Application）
- **バックエンド**: Google Apps Script（GAS）による API
- **データベース**: Google Sheets
- **デプロイ**: Vercel（GitHub連携自動デプロイ）
- **多言語対応**: 7言語（日本語、英語、中国語、韓国語、ドイツ語、フランス語、スペイン語）

### 主要ページ

| URL | 説明 | ステータス |
|-----|------|---------|
| `/` | メインページ | ✅ 実装済 |
| `/ke` | Ke.イベントページ | ✅ 実装済 |
| `/training` | 企業研修ページ（オリジナル） | ✅ 実装済（パターン4アニメーション適用済） |
| `/training01` | 企業研修ページ（ABテスト用） | ✅ 実装済 |
| `/NEWS` | 新着情報ページ | ✅ 実装済 |
| `/admin` | 管理画面（認証あり） | ✅ 実装済 |
| `/hero-demo` | テキストアニメーションデモ | ✅ 実装済（5パターン比較用） |

### ⚠️ ABテスト重要事項

**ABテスト対象ページ**: `/training` と `/training01`

#### 完全分離設計
- **目的**: 企業研修LPのABテストのため、2つのページは完全に独立
- **影響範囲**: 各ページは独自のJS/CSSファイルを持ち、相互に影響しない

| 項目 | Training | Training01 |
|------|----------|------------|
| **JSファイル** | `src/components/Training.js` | `src/components/Training01.js` |
| **CSSファイル** | `src/components/Training.css` | `src/components/Training01.css` |
| **影響範囲** | 独立 | 独立 |
| **用途** | オリジナル版（現行デザイン） | ABテスト版（大幅なデザイン改修予定） |

#### 編集時の注意
- ✅ `Training.css`を編集 → `Training`ページのみ影響
- ✅ `Training01.css`を編集 → `Training01`ページのみ影響
- ✅ 完全に独立しているため、一方の変更が他方に影響することはない

#### 実装日
- **作成日**: 2025年10月28日
- **目的**: デザインABテストによるコンバージョン率最適化

---

## 📘 開発ガイドライン

**新規開発・コード修正を行う前に必ずお読みください**

📖 **[CODING_GUIDELINES.md](docs/CODING_GUIDELINES.md)** - プロジェクト専用コーディング規約

**含まれる内容:**
- ✅ 命名規則（ファイル、変数、関数、CSSクラス）
- ✅ CSS設計方針（CSS変数、レスポンシブブレークポイント）
- ✅ React / JavaScript 規約（Functional Component + Hooks）
- ✅ 多言語対応の実装方針
- ✅ Gitコミットメッセージ規約

---

## 🎯 コア機能

1. **イベント予約システム**
   - リアルタイム予約状況表示
   - 自動返信メール機能
   - SNSシェア機能

2. **NEWS管理システム**
   - 管理画面でのNEWS記事作成・編集・削除
   - カテゴリ管理（イベント、お知らせ、メディア）
   - 画像直接アップロード機能
   - X (Twitter) 自動投稿機能

3. **管理画面**
   - 予約一覧・詳細表示
   - NEWS記事管理
   - 統計ダッシュボード
   - ベーシック認証

4. **アクセス解析**
   - Google Tag Manager (GTM-KVZ2B2MX)
   - Google Analytics 4 (G-SV2DXKDBGD)
   - ページビュー・コンバージョントラッキング

5. **ヒーローセクションアニメーション**
   - 企業研修ページヒーローに「分裂→集合」テキストアニメーション実装
   - 文字が画面外のランダムな位置から集まってくる動的演出
   - サブタイトルはブラーインエフェクトで滑らかに表示
   - 5パターンのアニメーションデモページ（`/hero-demo`）で比較可能
   - 実装日: 2025年10月28日

---

## プロジェクト構造

```
yolube/
├── src/
│   ├── components/           # Reactコンポーネント
│   │   ├── Training.js       # 企業研修LP（オリジナル）
│   │   ├── Training.css      # 企業研修LP CSS（オリジナル）
│   │   ├── Training01.js     # 企業研修LP（ABテスト用）
│   │   ├── Training01.css    # 企業研修LP CSS（ABテスト用）
│   │   ├── HeroDemo.js       # テキストアニメーションデモ（5パターン）
│   │   ├── HeroDemo.css      # デモページ専用CSS
│   │   └── admin/           # 管理画面コンポーネント
│   ├── pages/               # ページコンポーネント
│   ├── styles/              # 共通スタイル
│   │   └── BasePage.css     # 第1層ページ共通CSS
│   ├── contexts/            # React Context
│   ├── services/            # API連携
│   ├── utils/
│   │   └── gtm.js           # Google Tag Manager
│   └── App.js              # メインアプリ
├── public/
│   ├── images/              # 画像・OGP
│   └── docs/PDF/           # PDF資料
├── docs/                    # システムドキュメント
│   ├── CODING_GUIDELINES.md # コーディング規約
│   ├── GAS_INTEGRATED.gs   # Google Apps Script（予約システム）
│   ├── GAS_NEWS_API.gs     # Google Apps Script（NEWSシステム）
│   └── [技術ドキュメント]
└── README.md
```

---

## 開発・デプロイ手順

### ローカル開発

```bash
# 1. リポジトリクローン
git clone https://github.com/tokomaramuki1234/yolube.git
cd yolube

# 2. 依存関係インストール
npm install

# 3. 開発サーバー起動
npm start
```

### 本番デプロイ

```bash
# Vercel自動デプロイ（GitHub連携）
git add .
git commit -m "更新内容の説明"
git push origin master
# → 自動的に https://yolube.jp にデプロイされます
```

---

## トラブルシューティング

### よくある問題

#### 1. 開発環境のリセット
```bash
rm -rf node_modules package-lock.json
npm install
npm start
```

#### 2. 管理画面ログインできない
- パスワード: `yolube2025`
- `src/contexts/AuthContext.jsx` でパスワード確認

#### 3. GTM/GA4データが表示されない
```bash
# ブラウザのスーパーリロード（Ctrl + Shift + R）
# Vercel強制再ビルド
git commit --allow-empty -m "chore: Vercel強制再ビルド"
git push origin master
```

---

## 📞 サポート情報

#### 開発・技術サポート
- **リポジトリ**: https://github.com/tokomaramuki1234/yolube
- **本番URL**: https://yolube.jp

#### 組織情報
- **団体名**: YOLUBE
- **代表者**: 木村 允
- **メール**: info@yolube.jp

---

## 📚 詳細ドキュメント

より詳細な情報は以下をご参照ください:

- **[READMEMORE.md](READMEMORE.md)** - 詳細な技術仕様・実装履歴
- **[CODING_GUIDELINES.md](docs/CODING_GUIDELINES.md)** - コーディング規約
- **[tasklist.md](tasklist.md)** - タスク管理・今後の開発計画

---

## ライセンス

MIT License

Copyright (c) 2025 YOLUBE

---

*最終更新: 2025年10月28日*
*システムバージョン: v4.4 (ABテストページ実装)*
