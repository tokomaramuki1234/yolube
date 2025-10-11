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
7. [コーディングガイドライン](#コーディングガイドライン) 📘

---

## 📘 コーディングガイドライン

**新規開発・コード修正を行う前に必ずお読みください**

本プロジェクトでは、コードの品質と保守性を保つため、統一されたコーディングガイドラインを定めています。

📖 **[CODING_GUIDELINES.md](docs/CODING_GUIDELINES.md)** - プロジェクト専用コーディング規約

**含まれる内容:**
- ✅ 命名規則（ファイル、変数、関数、CSSクラス）
- ✅ CSS設計方針（CSS変数、レスポンシブブレークポイント）
- ✅ React / JavaScript 規約（Functional Component + Hooks）
- ✅ 多言語対応の実装方針
- ✅ Gitコミットメッセージ規約
- ✅ 推奨/非推奨とする記法

**ベースガイドライン:**
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react)
- [CSS Guidelines by Harry Roberts](https://cssguidelin.es/)

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

### アクセス解析
- **Google Tag Manager**: GTM-KVZ2B2MX（タグ管理）
- **Google Analytics 4**: G-SV2DXKDBGD（アクセス解析）
- **カスタムイベント**: page_view, contact_form_submit, reservation_complete

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

5. **アクセス解析・コンバージョントラッキング**
   - ページビュー自動トラッキング（全ページ）
   - お問い合わせフォーム送信トラッキング
   - 予約完了トラッキング
   - GA4リアルタイムレポート

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

#### 5. GTM/GA4データが表示されない
- ブラウザのスーパーリロード（Ctrl + Shift + R）を実行
- Vercelのビルドキャッシュが原因の場合、空コミットで強制再デプロイ:
  ```bash
  git commit --allow-empty -m "chore: Vercel強制再ビルド"
  git push origin master
  ```
- GA4でイベントが表示されるまで数時間かかる場合があります

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

## 📊 Google Tag Manager (GTM) とアクセス解析

### 実装概要

本サイトでは、Google Tag Manager (GTM) を使用してアクセス解析とコンバージョントラッキングを実装しています。

### GTM設定情報

- **GTMコンテナID**: GTM-KVZ2B2MX
- **GA4測定ID**: G-SV2DXKDBGD
- **実装日**: 2025年10月9日

### トラッキングイベント

以下の3つのカスタムイベントをトラッキングしています:

#### 1. page_view（ページビュー）
- **発火タイミング**: 全ページ読み込み時、ルート変更時
- **実装場所**: `src/App.js` の `PageViewTracker` コンポーネント
- **送信データ**:
  - `page_path`: ページパス（例: `/`, `/ke`）
  - `page_title`: ページタイトル
  - `page_location`: 完全なURL
  - `timestamp`: イベント発生時刻

#### 2. contact_form_submit（お問い合わせフォーム送信）
- **発火タイミング**: お問い合わせフォーム送信成功時
- **実装場所**: `src/components/Contact.js`
- **送信データ**:
  - `form_type`: 'contact'
  - `form_name`: 送信者名
  - `form_email`: 送信者メールアドレス
  - `inquiry_type`: お問い合わせ種別
  - `page_location`: フォーム送信ページURL

#### 3. reservation_complete（予約完了）
- **発火タイミング**: イベント予約フォーム送信成功時
- **実装場所**: `src/components/ReservationForm.jsx`
- **送信データ**:
  - `event_name`: イベント名
  - `event_date`: イベント日時
  - `participant_count`: 参加人数
  - `page_location`: 予約ページURL

### 実装ファイル

```
src/
├── utils/gtm.js              # GTMユーティリティ関数
│   ├── pushDataLayer()       # dataLayer送信
│   ├── trackPageView()       # ページビュートラッキング
│   ├── trackContactFormSubmit()  # お問い合わせトラッキング
│   └── trackReservationComplete() # 予約完了トラッキング
├── App.js                    # PageViewTrackerコンポーネント
├── components/
│   ├── Contact.js            # お問い合わせフォーム（GTM連携）
│   └── ReservationForm.jsx  # 予約フォーム（GTM連携）
public/
└── index.html                # GTMコンテナコード
```

### データ確認方法

#### リアルタイムでの確認
1. https://analytics.google.com/ にアクセス
2. プロパティ `G-SV2DXKDBGD` を選択
3. **レポート** → **リアルタイム**
4. 現在のアクセス状況とイベント発生をリアルタイムで確認

#### イベントレポート
1. **レポート** → **エンゲージメント** → **イベント**
2. 各イベントの発生回数を確認

#### コンバージョンレポート
1. **管理** → **プロパティ設定** → **データの表示** → **イベント**
2. イベント右側のオプションボタンから「キーイベントとしてマーク」
3. **レポート** → **エンゲージメント** → **コンバージョン**でお問い合わせ数と予約数を確認

### 動作確認コマンド

本番環境でGTMが正しく動作しているか確認:

```javascript
// ブラウザのコンソールで実行
window.dataLayer

// ページビューイベントの確認
window.dataLayer.forEach((item, index) => console.log(index + ':', item))
```

**期待される出力:**
```javascript
0: {gtm.start: 1759990084130, event: 'gtm.js', gtm.uniqueEventId: 3}
1: {event: 'gtm.dom', gtm.uniqueEventId: 4}
2: {event: 'page_view', page_path: '/', page_title: 'YOLUBE - 遊び心で社会を変える', ...}
3: {event: 'gtm.load', gtm.uniqueEventId: 6}
```

### 注意事項

#### 1. ブラウザキャッシュ
- GTM実装後、ブラウザキャッシュの影響で `dataLayer` が見つからない場合があります
- **スーパーリロード**（Ctrl + Shift + R / Cmd + Shift + R）を実行してください

#### 2. Vercelビルドキャッシュ
- コードをpushしてもGTMコードが反映されない場合、Vercelがビルドキャッシュを使用している可能性があります
- 以下のコマンドで強制再ビルド:
  ```bash
  git commit --allow-empty -m "chore: Vercel強制再ビルド"
  git push origin master
  ```
- ビルド完了後、JavaScriptバンドルファイル名が変わっていることを確認

#### 3. GA4データの反映タイミング
- イベントがGA4に送信されても、レポートに表示されるまで**数時間〜24時間**かかる場合があります
- リアルタイムレポートでは数分以内に確認可能です

#### 4. GTM vs GA4の役割
- **GTM**: データ送信の仕組みを管理（タグ設定、イベント定義）
- **GA4**: データを記録・分析（レポート、コンバージョン測定）
- **日常的なデータ確認はGA4のみで実施**
- GTMは新しいイベント追加やトラブルシューティング時のみ使用

#### 5. 本番ビルドのログ
- 本番環境では `console.log` などのデバッグログは出力されません
- これは正常な動作です（コード最適化の一環）
- GTMの動作確認は `window.dataLayer` で実施してください

---

## ライセンス

MIT License

Copyright (c) 2025 YOLUBE

---

## 🚀 最新デプロイ情報

### ✅ デプロイ状況
- **最新デプロイ**: 2025年10月9日 14:15 JST
- **デプロイコミット**: b634378 (Google Tag Manager実装完了)
- **Vercel自動デプロイ**: ✅ 再デプロイ実行中
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

*最終更新: 2025年10月9日*
*システムバージョン: v3.32 (GTM実装完了)*