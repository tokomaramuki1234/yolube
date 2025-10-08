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

## 📋 目次

1. [システム概要](#システム概要)
2. [技術スタック](#技術スタック)
3. [主要機能](#主要機能)
4. [プロジェクト構造](#プロジェクト構造)
5. [開発・デプロイ手順](#開発・デプロイ手順)
6. [トラブルシューティング](#トラブルシューティング)

---

## システム概要

### サイト構成

| URL | 説明 | 主要機能 |
|-----|------|---------|
| `/` | メインページ | ヒーロー、About、Services、実績、プロフィール、お問い合わせ |
| `/ke` | Ke.イベントページ | イベント紹介、予約状況、予約フォーム、ギャラリー |
| `/training` | 企業研修ページ | コミュニケーション研修のランディングページ |
| `/admin` | 管理画面 | 予約一覧、統計ダッシュボード（認証あり） |

### アーキテクチャ概要

- **フロントエンド**: React SPA（Single Page Application）
- **バックエンド**: Google Apps Script（GAS）による API
- **データベース**: Google Sheets（セキュリティ設計による2シート分離）
- **デプロイ**: Vercel（GitHub連携自動デプロイ）
- **多言語対応**: 7言語（日本語、英語、中国語、韓国語、ドイツ語、フランス語、スペイン語）

---

## 技術スタック

### フロントエンド
- **React**: 18.2.0（最新安定版）
- **React Router DOM**: 7.6.3（SPA ルーティング）
- **React Helmet Async**: 2.0.5（SEO/OGP動的管理）
- **FontAwesome**: 6.4.0（アイコンライブラリ）
- **CSS3**: カスタムプロパティ、グリッド、フレックスボックス
- **Google Fonts**: Noto Sans JP（日本語）

### バックエンド・インフラ
- **Google Apps Script**: v3.31（API・メール送信）
- **Google Sheets**: データストレージ
- **Gmail API**: 自動返信・通知メール
- **Vercel**: 本番環境デプロイ
- **GitHub**: バージョン管理・CI/CD

### アナリティクス
- **Google Tag Manager**: GTM-KVZ2B2MX（イベント追跡）
- **Google Analytics 4**: （GTM連携予定）

### 開発ツール
- **Create React App**: 開発環境
- **React Scripts**: 5.0.1（ビルドツール）
- **ESLint**: コード品質管理

---

## 主要機能

### 🎯 コア機能
1. **イベント予約システム**
   - リアルタイム予約状況表示
   - フォーム送信・確認画面
   - 自動返信メール機能
   - SNSシェア機能（X/Facebook）

2. **管理画面**
   - 予約一覧・詳細表示
   - 統計ダッシュボード
   - CSV出力機能
   - ベーシック認証

3. **多言語対応**
   - 7言語の自動切り替え
   - ブラウザ言語検出
   - モバイル対応メニュー

4. **レスポンシブデザイン**
   - デスクトップ・タブレット・モバイル対応
   - タッチ操作最適化

5. **アクセス解析**
   - Google Tag Manager (GTM) 実装
   - ページビュー追跡（全ページ自動）
   - コンバージョン追跡（お問い合わせ・予約完了）
   - イベントパラメータ送信

### 🔐 セキュリティ機能
- **データ分離設計**: イベント情報（公開）と予約情報（非公開）を別シートで管理
- **認証システム**: 管理画面へのアクセス制御
- **個人情報保護**: 予約データの適切な暗号化・管理

---

## プロジェクト構造

```
yolube/
├── src/
│   ├── components/           # Reactコンポーネント
│   │   ├── admin/           # 管理画面コンポーネント
│   │   ├── ReservationForm.jsx  # 予約フォーム（GTM統合）
│   │   ├── ReservationStatus.jsx # 予約状況表示
│   │   ├── Contact.js       # お問い合わせフォーム（GTM統合）
│   │   └── [各種コンポーネント]
│   ├── pages/
│   │   ├── ke/              # Ke.イベントページ
│   │   └── admin/           # 管理画面ページ
│   ├── contexts/            # React Context（認証等）
│   ├── services/            # API連携
│   ├── utils/
│   │   └── gtm.js           # Google Tag Manager ユーティリティ
│   └── App.js              # メインアプリ（ページビュー追跡）
├── public/
│   ├── index.html           # GTM コンテナコード
│   ├── images/              # 画像ファイル・OGP
│   └── docs/PDF/           # PDF資料
├── docs/                    # システムドキュメント
│   ├── GAS_INTEGRATED.gs   # Google Apps Script（最新版）
│   └── [技術ドキュメント]
├── scripts/                 # ビルドスクリプト
├── package.json
└── README.md
```

---

## 開発・デプロイ手順

### ローカル開発環境

```bash
# 1. リポジトリクローン
git clone https://github.com/tokomaramuki1234/yolube.git
cd yolube

# 2. 依存関係インストール
npm install

# 3. 開発サーバー起動
npm start
# → http://localhost:3000 でアクセス可能

# 4. ビルド
npm run build
```

### 本番デプロイ

```bash
# Vercel自動デプロイ（GitHub連携）
git add .
git commit -m "更新内容の説明"
git push origin master
# → 自動的に https://yolube.jp にデプロイされます
```

### Google Apps Script 更新手順

1. `docs/GAS_INTEGRATED.gs` を編集
2. Google Apps Script エディタにコードをコピー
3. 新しいバージョンとしてデプロイ
4. Webアプリとして公開

詳細は `docs/GAS_DEPLOYMENT_GUIDE.md` を参照

---

## トラブルシューティング

### 🚨 よくある問題

#### 1. 開発環境のリセット
```bash
rm -rf node_modules package-lock.json
npm install
npm start
```

#### 2. 予約データが表示されない
- 管理画面で確認済み予約のみ表示される仕様です
- GAS APIの動作状況をチェックしてください

#### 3. CORS エラー
- GAS APIはCORS preflightに対応していません
- HTMLフォーム送信方式を使用しています

#### 4. メール送信エラー
- Gmail APIの権限を確認してください
- 送信エイリアス設定を確認してください

### 📞 サポート情報

#### 開発・技術サポート
- **リポジトリ**: https://github.com/tokomaramuki1234/yolube
- **本番URL**: https://yolube.jp
- **対応時間**: 3営業日以内

#### 組織情報
- **団体名**: YOLUBE
- **代表者**: 木村 允
- **メール**: info@yolube.jp

---

## ライセンス

MIT License

Copyright (c) 2025 YOLUBE

---

## 🚀 最新デプロイ情報

### ✅ デプロイ状況
- **最新デプロイ**: 2025年10月8日 21:30 JST
- **デプロイコミット**: 5b21bab (Google Tag Manager実装)
- **Vercel自動デプロイ**: ✅ 実行中
- **本番URL**: https://yolube.jp
- **GTMコンテナ**: GTM-KVZ2B2MX

### 📊 アナリティクス実装内容

#### ✅ 完了した実装
1. **GTMコンテナの統合**
   - GTM-KVZ2B2MX をpublic/index.htmlに追加
   - dataLayerの初期化

2. **ページビュー追跡**
   - App.jsにPageViewTrackerを実装
   - React Routerと連携して全ページ自動追跡
   - パラメータ: page_path, page_title, page_location

3. **お問い合わせフォームの変換追跡**
   - イベント名: `contact_form_submit`
   - パラメータ: name, email, inquiry_type

4. **イベント予約完了の変換追跡**
   - イベント名: `reservation_complete`
   - パラメータ: eventName, eventDate, participantCount

#### 📝 次のステップ（手動設定が必要）

1. **Google Analytics 4 (GA4) のセットアップ**
   ```
   1. GA4プロパティを作成
   2. 測定IDを取得（G-XXXXXXXXXX）
   3. GTM管理画面でGA4設定タグを作成
   4. GTMコンテナを公開
   ```

2. **GTM管理画面でのタグ設定**
   ```
   タグ:
   - GA4 Configuration Tag（基本設定）
   - Page View Tag（自動トリガー: すべてのページビュー）
   - Contact Form Submit Tag（カスタムイベント: contact_form_submit）
   - Reservation Complete Tag（カスタムイベント: reservation_complete）
   ```

3. **GA4での変換設定**
   ```
   変換イベント:
   - contact_form_submit（お問い合わせ完了）
   - reservation_complete（予約完了）
   ```

4. **GTMのプレビュー・テスト**
   ```
   1. GTM管理画面でプレビューモード起動
   2. https://yolube.jp で動作確認
   3. dataLayerイベントが正しく送信されることを確認
   4. テスト完了後、コンテナを本番公開
   ```

### 📦 ビルド結果
- **JavaScript**: 約690 kB (gzip圧縮済み)
- **CSS**: 約22 kB (gzip圧縮済み)
- **新規追加**: src/utils/gtm.js (2.5 kB)

---

*最終更新: 2025年10月8日*
*システムバージョン: v3.31*