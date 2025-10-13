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

#### 主要ページ

| URL | 説明 | 主要機能 |
|-----|------|---------|
| `/` | メインページ | ヒーロー、About、Services、実績、プロフィール、お問い合わせ |
| `/ke` | Ke.イベントページ | イベント紹介、予約状況、予約フォーム、ギャラリー |
| `/training` | 企業研修ページ | コミュニケーション研修のランディングページ |
| `/NEWS` | 新着情報ページ | NEWS記事一覧、カテゴリフィルター |
| `/admin` | 管理画面 | 予約一覧、NEWS管理、統計ダッシュボード（認証あり） |

#### 第1層ページ（共通デザイン）

| ページ | 説明 | ステータス |
|-------|------|---------|
| `/YOLUBE` | 組織情報 | ✅ 実装済 |
| `/NEWS` | 新着情報 | ✅ 実装済 |
| `/ABOUT` | 代表プロフィール | 🔜 予定 |
| `/ACHIEVEMENT` | 活動実績 | 🔜 予定 |
| `/FOSTER` | テーブルゲーム文化醸成事業 | 🔜 予定 |
| `/RRP` | 地域活性化事業 | 🔜 予定 |
| `/DEV` | テーブルゲーム開発事業 | 🔜 予定 |
| `/CST` | コミュニケーション研修事業 | 🔜 予定 |
| `/IID` | インバウンド基盤開発事業 | 🔜 予定 |

#### 第2層ページ（プロジェクトLP）

| プロジェクト | URL | ステータス |
|------------|-----|---------|
| Ke. | `/ke` | ✅ 実装済 |
| 企業研修 | `/training` | ✅ 実装済 |
| ホームタウントラベラー | `/HT` | 🔜 予定 |
| 他プロジェクト | `/NNBNB`, `/KanTo` | 🔜 予定 |

### ページ階層と設計方針

yolube.jpは**3層のページ構造**で設計されています。

#### 📄 第1層: メインサイトと基本ページ
- **対象ページ**: `/`（トップページ）および グローバルナビの「プロジェクト」以外のページ
  - 例: `/NEWS`、`/YOLUBE`、`/ABOUT`、`/ACHIEVEMENT`、`/FOSTER`、`/RRP`、`/DEV`、`/CST`、`/IID`
- **グローバルナビ**: 共通（Header.js）
- **Footer**: 共通（Footer.js）
- **役割**: YOLUBEの組織情報・事業紹介を統一デザインで提供

#### 🎯 第2層: プロジェクトページ（LP）
- **対象ページ**: グローバルナビ「プロジェクト」配下のページ
  - 例: `/ke`、`/training`、`/HT`、`/NNBNB`、`/KanTo`
- **グローバルナビ**: **各ページ独自**のデザイン・構成
- **Footer**: **第1層と共通**（Footer.js）
- **役割**: 各プロジェクトのランディングページとして機能
- **特徴**: プロジェクトごとに最適化されたUI/UX

#### 📂 第3層: プロジェクト下層ページ
- **対象ページ**: 第2層プロジェクトページの子ページ
  - 例: `/HT/about/`、`/ke/reservations/:eventId`
- **CSS継承**: **親プロジェクトページのCSS**を踏襲
- **ナビゲーション**: 親プロジェクトのナビゲーション構造を継承
- **役割**: プロジェクトの詳細情報・機能提供

#### 🎨 設計思想
```
第1層（統一デザイン）
  └─ 共通Header + 共通Footer

第2層（独立LP）
  └─ 独自Header + 共通Footer

第3層（プロジェクト詳細）
  └─ 親のCSS継承 + 親のナビゲーション
```

この階層構造により、**ブランドの統一性**と**プロジェクトの独自性**を両立しています。

### 🎨 第1層ページの共通設計（重要）

**第1層の全サブページは共通のCSS・構造で統一されています。**

#### 📁 共通スタイルシステム
- **共通CSSファイル**: `src/styles/BasePage.css`
- **役割**: 第1層全ページの基本デザインを統一
- **適用ページ**: `/NEWS`、`/YOLUBE`、`/ABOUT`、`/ACHIEVEMENT`、`/FOSTER`、`/RRP`、`/DEV`、`/CST`、`/IID`

#### 🏗️ 共通ページ構造
すべての第1層サブページは以下の構造を採用：

```jsx
import '../styles/BasePage.css';  // 共通スタイル（必須）
import './PageName.css';          // ページ固有スタイル（オプション）

<div className="base-page">
  {/* ヒーローセクション */}
  <section className="base-hero">
    <div className="container">
      <h1 className="base-hero-title">ページタイトル</h1>
    </div>
  </section>

  {/* コンテンツセクション */}
  <section className="base-content">
    <div className="container">
      <div className="base-content-inner">
        {/* ページ固有のコンテンツ */}
      </div>
    </div>
  </section>
</div>
```

#### 📐 BasePage.css の提供要素
1. **ページコンテナ**: `.base-page` - ヘッダー分の余白調整
2. **ヒーローセクション**: `.base-hero` - 緑グラデーション背景、ドットパターン
3. **見出し階層**:
   - H2: 下線（緑）、アクセント（オレンジ）、2つ目以降は `padding-top: 100px`
   - H3: 左ボーダー（緑）
   - H4〜H5: 基本スタイル
4. **コンテンツ要素**:
   - 段落、リスト、テーブル
   - リンク（緑、ホバー下線）
   - 引用文、情報ボックス、コンテンツカード
5. **レスポンシブ対応**: 768px、480px ブレークポイント

#### ✅ 作成済みページ（2025年10月11日時点）
1. **NEWSページ** (`/NEWS`)
   - 共通スタイル: BasePage.css
   - 固有機能: カテゴリフィルター、ニュース一覧
   - 固有CSS: NewsPage.css（カテゴリフィルター、カードスタイルのみ）

2. **YOLUBEページ** (`/YOLUBE`)
   - 共通スタイル: BasePage.css のみ
   - コンテンツ: 基本情報、MISSION/VISION/VALUE、体制、活動拠点、実績、メディア掲載
   - 固有CSS: なし（完全に共通スタイルのみで構成）

#### 💡 設計のメリット
- **保守性**: BasePage.css を編集すれば全ページに反映
- **一貫性**: ユーザー体験の統一
- **効率性**: 新規ページ作成時の工数削減
- **拡張性**: ページ固有のスタイルは個別CSSで追加可能

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

2. **NEWS管理システム（NEW！）**
   - 管理画面でのNEWS記事作成・編集・削除
   - カテゴリ管理（イベント、お知らせ、メディア）
   - ステータス管理（下書き、公開、予約公開）
   - リアルタイムプレビュー
   - フィルター・検索・CSV出力
   - Google Sheets バックエンド連携

3. **管理画面**
   - 予約一覧・詳細表示
   - NEWS記事管理
   - 統計ダッシュボード
   - CSV出力機能
   - ベーシック認証

4. **多言語対応**
   - 7言語の自動切り替え
   - ブラウザ言語検出
   - モバイル対応メニュー

5. **レスポンシブデザイン**
   - デスクトップ・タブレット・モバイル対応
   - タッチ操作最適化

6. **アクセス解析・コンバージョントラッキング**
   - ページビュー自動トラッキング（全ページ）
   - お問い合わせフォーム送信トラッキング
   - 予約完了トラッキング
   - GA4リアルタイムレポート
   - Google Tag Manager (GTM) 実装
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
│   │   │   ├── Dashboard.jsx    # ダッシュボード
│   │   │   ├── ReservationList.jsx # 予約一覧
│   │   │   ├── NewsList.jsx     # NEWS一覧（NEW）
│   │   │   └── NewsEditor.jsx   # NEWS編集フォーム（NEW）
│   │   ├── ReservationForm.jsx  # 予約フォーム（GTM統合）
│   │   ├── ReservationStatus.jsx # 予約状況表示
│   │   ├── Contact.js       # お問い合わせフォーム（GTM統合）
│   │   └── [各種コンポーネント]
│   ├── pages/
│   │   ├── ke/              # Ke.イベントページ
│   │   ├── admin/           # 管理画面ページ
│   │   ├── NewsPage.js      # NEWSページ（API連携）
│   │   └── [各種ページ]
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
│   ├── GAS_INTEGRATED.gs   # Google Apps Script（予約システム）
│   ├── GAS_NEWS_API.gs     # Google Apps Script（NEWSシステム）NEW
│   ├── GAS_SETUP_GUIDE.md  # GAS セットアップ手順 NEW
│   ├── NEWS_SYSTEM_DESIGN.md # NEWSシステム設計書 NEW
│   ├── NEWS_IMPLEMENTATION_SUMMARY.md # 実装完了レポート NEW
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
- **最新デプロイ**: 2025年10月11日
- **デプロイコミット**: 未デプロイ（ローカル開発中）
- **Vercel自動デプロイ**: ⏳ 待機中
- **本番URL**: https://yolube.jp
- **GTMコンテナ**: GTM-KVZ2B2MX

### 📋 最新実装内容（2025年10月11日）

#### ✅ 第1層ページ共通設計システム構築
1. **BasePage.css作成**
   - 第1層全ページの共通スタイルを統一
   - ヒーローセクション、見出し階層、コンテンツ要素を定義
   - レスポンシブ対応（768px、480px）
   - ファイル: `src/styles/BasePage.css`

2. **NEWSページ作成** (`/NEWS`)
   - BasePage.cssを使用した統一デザイン
   - カテゴリフィルター機能（すべて、イベント、お知らせ、メディア）
   - ニュース一覧表示（横いっぱいのリストデザイン）
   - ファイル: `src/pages/NewsPage.js`、`src/pages/NewsPage.css`

3. **YOLUBEページ作成** (`/YOLUBE`)
   - BasePage.cssのみで構成（個別CSSなし）
   - 組織の基本情報、MISSION/VISION/VALUE、体制、活動拠点、実績、メディア掲載実績
   - ファイル: `src/pages/YolubePage.js`

4. **下層ページナビゲーション統一**
   - Header.jsに`.not-home`クラス追加
   - トップページ: 白文字ナビゲーション（背景画像あり）
   - サブページ: 黒文字ナビゲーション（白背景）
   - スクロール前後で視認性を確保

5. **ルート追加**
   - App.jsに `/NEWS` と `/YOLUBE` ルートを追加

**注**: 未実装ページの詳細は [`tasklist.md`](tasklist.md) を参照してください。

#### ✅ 多言語切り替えUI実装
1. **言語切り替え機能追加**　→完了
2. **実装詳細**　→完了
3. **スタイリング**　→完了

**注**: 多言語対応の残タスクについては [`tasklist.md`](tasklist.md) を参照してください。

#### ✅ Footer統合完了
1. **共通コンポーネント化**
   - SNS・footerセクションをFooter.jsに統合

2. **スタイル統合**
   - Footer.cssにSNS関連スタイルをマージ

3. **効果**
   - Footerを編集すると全ページ（yolube.jp、yolube.jp/ke、yolube.jp/training）に自動反映
   - コードの保守性向上、DRY原則の実現

#### ✅ グローバルナビゲーション ドロップダウンメニュー実装
1. **ナビゲーション構造変更**
2. **実装詳細**
   - Header.js: ドロップダウン状態管理（openDropdown）、toggleDropdown関数
   - Header.css: ドロップダウンメニュー用スタイル、アニメーション
   - デスクトップ: マウスホバーで表示
   - モバイル: クリックで展開/折りたたみ
3. **UI/UX調整**

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
- **CSS**: 約23 kB (gzip圧縮済み)
- **更新ファイル**:
  - src/components/Header.js
  - src/components/Header.css
  - src/components/Footer.js
  - src/components/Footer.css
  - src/components/Training.js
  - src/pages/ke/KeLPWeb3.js
  - src/App.js

---

## 🆕 最新更新情報（2025年10月12日）

### 🎉 NEWS管理システム実装完了

**実装日**: 2025年10月12日
**ステータス**: ✅ GAS APIセットアップ完了・接続テスト成功
**バージョン**: v4.1

#### 📋 実装内容

YOLUBE ウェブサイトに **NEWS投稿管理システム** を実装しました。

##### 主な機能
- ✅ 管理画面（/admin）でのNEWS記事管理
  - NEWS記事の作成・編集・削除
  - カテゴリ分類（イベント、お知らせ、メディア）
  - ステータス管理（下書き、公開、予約公開）
  - NEWバッジ表示制御
  - フィルター・ソート・検索機能
  - CSV出力機能
  - リアルタイムプレビュー機能

- ✅ 公開ページ（/NEWS）のAPI連携化
  - Google SheetsからリアルタイムにNEWS記事を取得
  - カテゴリフィルター機能
  - ローディング・エラー表示
  - レスポンシブデザイン対応

- ✅ Google Apps Script バックエンドAPI
  - 完全なCRUD操作API
  - 公開NEWS取得API（フィルター対応）
  - 統計情報取得API
  - 初期化関数（NEWSシート自動作成）

#### 📁 作成されたファイル

**フロントエンド（7ファイル）**:
- `src/components/admin/NewsList.jsx` + `.css` - NEWS一覧管理画面
- `src/components/admin/NewsEditor.jsx` + `.css` - NEWS作成・編集フォーム
- `src/pages/admin/Admin.jsx` - 管理画面メイン（NEWSタブ追加）
- `src/pages/NewsPage.js` - 公開NEWSページ（API連携化）
- `src/pages/NewsPage.css` - ローディング・エラー表示CSS追加

**バックエンド・ドキュメント（4ファイル）**:
- `docs/NEWS_SYSTEM_DESIGN.md` - システム設計書（データ構造、API仕様、UI設計）
- `docs/GAS_NEWS_API.gs` - Google Apps Script APIコード（コピペ用）
- `docs/GAS_SETUP_GUIDE.md` - GAS セットアップ手順書
- `docs/NEWS_IMPLEMENTATION_SUMMARY.md` - 実装完了レポート

#### ✅ Google Apps Script セットアップ完了

**セットアップ日**: 2025年10月12日

##### セットアップ済み内容

1. **Google Sheets設定**
   - スプレッドシートID: `1Ejs0annRLCGiV0dSTVGwm-1oDWbPHv65s1xLeWyRen8`
   - NEWSシート作成完了（15カラム構成）

2. **Apps Script デプロイ**
   - ファイル: `NEWS_API.gs`
   - ウェブアプリURL: `https://script.google.com/macros/s/AKfycbymI6FuKRcoFu6BP558Dwj7RQFYf1sCDm5dWhHdmHJt6ibEdlseflU-0krlqL2mAG7_/exec`
   - アクセス権限: 全員

3. **React アプリ設定**
   - `src/pages/admin/Admin.jsx`: NEWS_API_URL 設定済み
   - `src/pages/NewsPage.js`: 今後更新予定

4. **API接続テスト**
   - ✅ `getPublishedNews`: 成功
   - ✅ `getNewsStats`: 成功

**注**: NEWS管理システムの今後のタスクについては [`tasklist.md`](tasklist.md) を参照してください。

#### 📖 詳細ドキュメント

| ドキュメント | 内容 |
|------------|------|
| `docs/GAS_SETUP_GUIDE.md` | GASセットアップの詳細手順 |
| `docs/NEWS_IMPLEMENTATION_SUMMARY.md` | 実装の完全レポート |
| `docs/NEWS_SYSTEM_DESIGN.md` | システム設計の詳細 |
| `docs/GAS_NEWS_API.gs` | GASコード（コピペ用） |

#### 💡 使い方（管理者として）

**NEWS記事を作成**:
1. `/admin` → 「NEWS管理」タブ
2. 「➕ 新規作成」ボタン
3. フォーム入力（タイトル、カテゴリ、公開日、概要、本文など）
4. 「作成する」ボタン

**ステータスの使い分け**:
- **下書き**: 非公開（作業中）
- **公開**: 即座に公開ページに表示
- **予約公開**: 指定日以降に自動表示

**画像の掲載方法**:
⚠️ **重要**: 直接の画像アップロード機能は実装されていません。以下の手順で画像を掲載してください。

1. **無料画像ホスティングサービスに画像をアップロード**
   - 推奨サービス:
     - [ImgBB](https://imgbb.com/) - 無料、登録不要、永久保存
     - [Imgur](https://imgur.com/) - 無料、人気サービス
     - [Cloudinary](https://cloudinary.com/) - 無料枠あり、高機能
   
2. **画像URLを取得**
   - アップロード後に表示される画像の直リンク（URL）をコピー
   - 例: `https://i.ibb.co/xxxxxx/image.jpg`

3. **NEWS作成フォームの「画像URL」フィールドに貼り付け**
   - 単一画像: そのまま貼り付け
   - 複数画像: カンマ区切りで入力（例: `URL1, URL2, URL3`）

**複数画像の表示**:
- 複数のURLを入力すると、自動的にスライドショー形式で表示されます
- 左右の矢印ボタンやドットナビゲーションで画像を切り替えられます

#### 🗄️ データベース構造（NEWSシート）

| カラム | データ型 | 必須 | 説明 |
|--------|---------|------|------|
| id | 数値 | ○ | 記事ID（自動採番） |
| createdAt | 日時 | ○ | 作成日時 |
| updatedAt | 日時 | ○ | 更新日時 |
| publishDate | 日付 | ○ | 公開日 |
| category | テキスト | ○ | カテゴリ（イベント/お知らせ/メディア） |
| title | テキスト | ○ | タイトル |
| description | テキスト | ○ | 概要（最大200文字） |
| content | テキスト | ○ | 本文 |
| link | テキスト |  | 関連リンク |
| imageUrl | テキスト |  | 画像URL |
| tags | テキスト |  | タグ（カンマ区切り） |
| status | テキスト | ○ | draft/published/scheduled |
| isNew | 真偽値 | ○ | NEWバッジ表示 |
| author | テキスト |  | 作成者 |
| displayOrder | 数値 |  | 表示順序 |

---

### ✅ UI/UX改善・バグ修正

#### 1. **代表プロフィールページ（/ABOUT）モバイル表示最適化**
- **問題**: スマホで代表プロフィール画像が見切れていた
- **修正内容**:
  - タブレット（768px以下）: 高さ 300px → **550px**
  - スマホ（480px以下）: 高さ 250px → **500px**
  - PC版: 720px（変更なし）
- **ファイル**: `src/pages/AboutPage.css`

#### 2. **YOLUBEページHTML構造修正**
- **問題**: 活動拠点のリンクで不正なHTMLタグ構造（`<a><li>`）
- **修正内容**: 正しい構造（`<li><a>`）に修正
- **ファイル**: `src/pages/YolubePage.js:86-90`
- **影響**: アクセシビリティとSEOの向上

#### 3. **モバイルメニュー 言語切り替えUI改善**
- **実装内容**:
  - アコーディオン形式の言語切り替えボタンを実装
  - 通常時: 🌐 日本語 ▼
  - タップで7言語を展開/折りたたみ
  - メニュー最上部に配置
- **変更ファイル**:
  - `src/components/Header.js`: `isMobileLangOpen` ステート追加、アコーディオンUI実装
  - `src/components/Header.css`: `.mobile-lang-header`、`.mobile-lang-menu` スタイル追加

#### 4. **モバイルメニュー ドロップダウン動作修正**
- **問題**: 「組織概要」のみ動作し、「事業案内」「プロジェクト」が動作しない
- **原因**: デスクトップ用のホバーイベント（`onMouseEnter`/`onMouseLeave`）がモバイルで干渉
- **修正内容**:
  - 画面幅判定（`window.innerWidth > 768`）を追加
  - デスクトップ（769px以上）: ホバーで開く、クリックでも開く
  - モバイル（768px以下）: クリックのみで開く
  - `e.stopPropagation()` でイベント伝播を防止し、各ドロップダウンを独立動作
- **変更ファイル**:
  - `src/components/Header.js:125-190` (3つのドロップダウンすべて修正)
  - `src/components/Header.css:554-604` (モバイル版ドロップダウンスタイル)

#### 5. **モバイルナビゲーション構造最適化**
- **レイアウト改善**:
  - `.nav` に `flex-direction: column` を追加
  - `.nav-list` の padding を `20px` → `0 20px 20px 20px` に変更
  - 言語切り替えとメニュー項目の間の不要な余白を削除
- **表示順序**:
  1. 言語切り替え（🌐 日本語）
  2. ホーム
  3. 新着情報
  4. 組織概要（ドロップダウン）
  5. 事業案内（ドロップダウン）
  6. プロジェクト（ドロップダウン）
  7. お問い合わせ
- **ファイル**: `src/components/Header.css:500-604`

### 📝 重要な注意事項

#### ドロップダウンメニューの動作仕様
- **デスクトップ**: ホバーまたはクリックで開閉
- **モバイル**: クリックのみで開閉（ホバーイベントは無効化）
- **実装方法**: `window.innerWidth > 768` による画面幅判定

#### モバイルメニュー言語切り替え
- **PC版**: 右上の地球アイコンボタン（ドロップダウン）
- **モバイル版**: ハンバーガーメニュー内の最上部（アコーディオン）
- **状態管理**: `isMobileLangOpen` ステート（PC版とは独立）

#### HTML構造のベストプラクティス
- **リスト内のリンク**: 必ず `<li><a>...</a></li>` の順序を守る
- **誤った例**: `<a><li>...</li></a>` ❌
- **正しい例**: `<li><a>...</a></li>` ✅

### 🔧 技術的な変更点

| ファイル | 変更内容 | 理由 |
|---------|---------|------|
| `Header.js` | 画面幅判定ロジック追加 | モバイルでのホバーイベント干渉を防止 |
| `Header.css` | モバイル版ドロップダウンスタイル追加 | アコーディオン形式のUI実装 |
| `AboutPage.css` | スマホ用画像高さ調整 | 画像見切れ問題の解決 |
| `YolubePage.js` | HTML構造修正 | アクセシビリティ・SEO向上 |

---

## 🔧 トラブルシューティング

### よくある問題と解決方法

#### マージコンフリクトによるビルドエラー
- **症状**: Vercelデプロイが失敗、構文エラーが発生
- **原因**: `<<<<<<< HEAD`, `=======`, `>>>>>>>` マーカーが残存
- **解決**:
  ```bash
  # マージマーカーを検索
  grep -r "<<<<<<< HEAD" src/
  
  # ローカルビルドでテスト
  npm run build
  ```

#### 管理画面ログインできない
- **症状**: パスワード `yolube2025` で入れない
- **原因**: AuthContext.jsx の環境変数未設定
- **解決**: AuthContext.jsx でパスワードを直接設定（行6）

#### モバイルメニューが動作しない
- **症状**: ドロップダウンが開かない
- **解決**: Header.js で画面幅判定（`window.innerWidth > 768`）を確認

### デプロイ前チェックリスト
- [ ] `npm run build` でローカルビルド成功
- [ ] マージコンフリクトマーカーがないことを確認
- [ ] git commit & push 実行
- [ ] Vercel Deploymentsページで "Ready" ステータス確認

### 🖼️ NEWS画像機能の実装状況（2025年10月12日）

#### ✅ 実装完了機能
1. **画像サイズ最適化**
   - 最大幅: 800px、最大高さ: 500px
   - レスポンシブ対応で画面幅に自動調整
   - `object-fit: cover` で画像の縦横比を維持

2. **複数画像スライドショー**
   - カンマ区切りで複数URLを入力すると自動でスライドショー表示
   - 左右の矢印ボタンでナビゲーション
   - ドット型インジケーター
   - 画像カウンター表示（例: 1/3）

3. **画像あり/なしでレイアウト切り替え**
   - 画像あり: 余白40px、グラデーション背景、太めの下線
   - 画像なし: 余白25px、コンパクトレイアウト
   - 動的CSSクラスで自動切り替え

#### ⚠️ 制限事項
- **画像の直接アップロード機能は実装されていません**
- 理由: 外部APIサービス（Imgur、ImgBBなど）のAPIキー認証が必要なため
- 代替方法: 無料画像ホスティングサービスを使用してURLを取得

#### 📝 画像掲載の推奨手順
1. [ImgBB](https://imgbb.com/) または [Imgur](https://imgur.com/) に画像をアップロード
2. 画像URLを取得
3. NEWS作成フォームの「画像URL」フィールドに貼り付け
4. 複数画像の場合はカンマ区切りで入力（例: `URL1, URL2, URL3`）

---

## 📝 タスク管理

プロジェクトの残タスクと今後の開発計画については、[`tasklist.md`](tasklist.md) を参照してください。

**主なタスクカテゴリ:**
- 未実装ページ一覧（第1層・第2層）
- 多言語対応の完全実装
- NEWS管理システムの拡張
- 優先度別タスク

---

*最終更新: 2025年10月13日*
*システムバージョン: v4.2 (NEWS画像機能実装、URL入力方式)*