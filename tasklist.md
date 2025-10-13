# YOLUBE ウェブサイト - タスクリスト

最終更新: 2025年10月13日

---

## 📋 目次

1. [未実装ページ一覧](#未実装ページ一覧)
2. [多言語対応タスク](#多言語対応タスク)
3. [NEWS管理システムタスク](#news管理システムタスク)
4. [優先度別タスク](#優先度別タスク)

---

## 未実装ページ一覧

### 第1層ページ（共通デザイン - BasePage.css使用）

すべてのページは以下の共通構造を使用します：

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

#### 🔜 作成予定のページ

| ページ | URL | 説明 | 優先度 | ステータス |
|-------|-----|------|--------|---------|
| 代表プロフィール | `/ABOUT` | 代表者の詳細プロフィール | 中 | 完了 |
| 活動実績 | `/ACHIEVEMENT` | YOLUBEの活動実績・成果 | 中 | 完了 |
| テーブルゲーム文化醸成事業 | `/FOSTER` | 事業詳細ページ | 低 | 完了 |
| 地域活性化事業 | `/RRP` | 事業詳細ページ | 低 | 完了 |
| テーブルゲーム開発事業 | `/DEV` | 事業詳細ページ | 低 | 完了 |
| コミュニケーション研修事業 | `/CST` | 事業詳細ページ | 低 | 完了 |
| インバウンド基盤開発事業 | `/IID` | 事業詳細ページ | 低 | 完了 |

**注記**: これらすべてのページは `BasePage.css` を使用し、同じ構造・デザインで統一されます。

### 第2層ページ（プロジェクトLP）

| プロジェクト | URL | 優先度 | ステータス |
|------------|-----|--------|---------|
| ホームタウントラベラー | `/HT` | 中 | 🔜 未着手 |
| ねねばねべ | `/NNBNB` | 低 | 🔜 未着手 |
| KanTo | `/KanTo` | 低 | 🔜 未着手 |

---

## 多言語対応タスク

### 🔜 残タスク（多言語対応完全実装）

**注記**: 下記の残タスクは、ページ自体の修正が完了してから着手予定

#### 1. 翻訳オブジェクトの作成

- [ ] 各言語の翻訳テキストオブジェクト作成（/ke実装を参考）
- [ ] 対象言語: ja, en, vi, de, ko, zh, fr
- [ ] 翻訳範囲の確定:
  - [ ] Header（グローバルナビゲーション）
  - [ ] Footer（フッター情報）
  - [ ] 各ページコンテンツ

**参考実装**: `src/pages/ke/KeLPWeb3.js` の翻訳オブジェクト構造

#### 2. 各ページコンポーネントへの翻訳統合

- [ ] 翻訳オブジェクトのインポート
- [ ] currentLanguageに応じたテキスト表示切り替え実装
- [ ] 動的コンテンツの多言語化:
  - [ ] ページタイトル（React Helmet）
  - [ ] メタ情報（description, OGP）
  - [ ] パンくずリスト

#### 対象コンポーネント

- [ ] `src/components/Header.js`
- [ ] `src/components/Footer.js`
- [ ] `src/pages/MainPage.js`
- [ ] `src/pages/NewsPage.js`
- [ ] `src/pages/YolubePage.js`
- [ ] `/ABOUT`, `/ACHIEVEMENT`, `/FOSTER`, `/RRP`, `/DEV`, `/CST`, `/IID` 

---

## NEWS管理システムタスク

### ✅ 完了済み

- ✅ 管理画面でのNEWS記事作成・編集・削除機能
- ✅ カテゴリ管理（イベント、お知らせ、メディア）
- ✅ ステータス管理（下書き、公開、予約公開）
- ✅ Google Apps Script バックエンドAPI
- ✅ 画像サイズ最適化とスライドショー機能
- ✅ 複数画像対応（カンマ区切りURL入力）

### 📝 次のステップ

**1. SNS自動投稿機能の実装（保留中）**
- [ ] Facebook、Instagram、X（Twitter）への自動投稿
- [ ] 自動投稿オン/オフ機能
- [ ] テスト投稿モード

**2. NewsPage.jsのAPI URL更新**
- [ ] `src/pages/NewsPage.js` の 16行目付近のAPI URLを更新
  ```javascript
  const NEWS_API_URL = 'https://script.google.com/macros/s/AKfycbymI6FuKRcoFu6BP558Dwj7RQFYf1sCDm5dWhHdmHJt6ibEdlseflU-0krlqL2mAG7_/exec';
  ```

**3. 動作テスト**
- [ ] ローカル環境でのテスト
  - [ ] http://localhost:3000/admin/login にアクセス
  - [ ] 「NEWS管理」タブをクリック
  - [ ] 新規作成・編集・削除をテスト
  - [ ] http://localhost:3000/NEWS で公開ページを確認
- [ ] 本番環境へのデプロイ

---

## 優先度別タスク

### 優先度: 高 🔴

- [x] **NEWS管理画面：画像アップロード機能のバグ解決** (2025/10/13完了)
  - **調査実施内容**:
    1. 初回テスト: 3つの画像APIすべてでCORSエラー発生を確認
    2. 原因特定: ブラウザ→外部API直接呼び出しによるCORS制限
    3. 解決策選択: GAS Proxyパターンを採用（ブラウザ→GAS→外部API）
    4. GAS実装: `docs/GAS_NEWS_API.gs` に `uploadImage` 関数追加（108行目、831行目）
    5. フロントエンド実装: `NewsEditor.jsx` を GAS Proxy 対応に修正
    6. 重複ファイル発見: `cursor/` ディレクトリ全体が古いコピーだったため削除
    7. CORS設定修正: `doOptions` 関数に明示的なCORSヘッダー追加
    8. 新デプロイ作成: キャッシュ問題回避のため完全新規デプロイ実施
    9. URL更新漏れ発見: `NewsPage.js` の旧URL更新 + 本番ビルド実行
  - **最終結果**:
    - 新GAS URL: `AKfycbzZYxMs2LyWPu6z5BzOJKrlg37j2SUThPomirpOJ2FFrV6guzQ71oaO5dMh9uqCNlz4PQ`
    - `src/pages/admin/Admin.jsx` (21行目) 更新済み
    - `src/pages/NewsPage.js` (89行目) 更新済み
    - `npm run build` 実行完了 → `build/` フォルダ最新化
  - **次のステップ**: 本番環境へデプロイして動作確認
- [ ] X (Twitter) 投稿機能のテスト完了
- [ ] n8n webhook連携の検討

### 優先度: 中 🟡

- [ ] `/ABOUT` ページの作成（代表プロフィール）
- [ ] `/ACHIEVEMENT` ページの作成（活動実績）
- [ ] `/HT` ページの作成（ホームタウントラベラー）
- [ ] X投稿エラーハンドリング強化
- [ ] 管理画面UX改善（投稿履歴表示）
- [ ] 画像直接アップロード機能の実装（Cloudflare R2またはGoogle Drive API連携）

### 優先度: 低 🟢

- [ ] `/FOSTER` ページの作成（テーブルゲーム文化醸成事業）
- [ ] `/RRP` ページの作成（地域活性化事業）
- [ ] `/DEV` ページの作成（テーブルゲーム開発事業）
- [ ] `/CST` ページの作成（コミュニケーション研修事業）
- [ ] `/IID` ページの作成（インバウンド基盤開発事業）
- [ ] `/NNBNB` ページの作成（ねねばねべ）
- [ ] `/KanTo` ページの作成（KanTo）

---

## 📊 進捗サマリー

### 実装済みページ
- ✅ `/` - メインページ
- ✅ `/ke` - Ke.イベントページ
- ✅ `/training` - 企業研修ページ
- ✅ `/NEWS` - 新着情報ページ
- ✅ `/YOLUBE` - 組織情報ページ
- ✅ `/admin` - 管理画面

### 未実装ページ数
- 第1層ページ: 7ページ
- 第2層ページ: 3ページ
- **合計**: 10ページ

### 多言語対応
- ✅ UI実装完了（言語切り替えボタン）
- 🔜 翻訳オブジェクト作成待ち
- 🔜 各ページへの統合待ち

---

## 🔧 技術メモ

### BasePage.css の提供要素
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

### ページ作成時のチェックリスト
- [ ] `BasePage.css` をインポート
- [ ] `.base-page`, `.base-hero`, `.base-content` クラスを使用
- [ ] React Helmet でメタ情報を設定
- [ ] App.js にルートを追加
- [ ] レスポンシブ対応を確認（768px、480px）
- [ ] 多言語対応の準備（翻訳オブジェクト用の構造）

---

*このタスクリストは、プロジェクトの進捗に応じて定期的に更新されます。*
