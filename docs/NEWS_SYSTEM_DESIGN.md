# NEWS管理システム設計書

## 1. システム概要

### 目的
- NEWS記事の作成・編集・削除・公開管理を行う
- 既存の管理画面（/admin）にNEWS管理機能を追加
- Google Sheets + GAS APIを活用した既存アーキテクチャとの統合

### 対象ユーザー
- YOLUBE管理者（既存の認証システムを利用）

---

## 2. データベース設計（Google Sheets）

### シート名: `NEWS`

### カラム構成

| No | カラム名 | データ型 | 必須 | 説明 | 例 |
|----|----------|----------|------|------|-----|
| A | id | 数値 | ○ | 記事ID（自動採番） | 1 |
| B | createdAt | 日時 | ○ | 作成日時 | 2025-07-14 10:30:00 |
| C | updatedAt | 日時 | ○ | 更新日時 | 2025-07-15 14:20:00 |
| D | publishDate | 日付 | ○ | 公開日 | 2025-07-26 |
| E | category | テキスト | ○ | カテゴリ | イベント, お知らせ, メディア |
| F | title | テキスト | ○ | タイトル | 秋田ベイパラダイスにて... |
| G | description | テキスト | ○ | 概要（短い説明） | 7月26日（土）10:00より... |
| H | content | テキスト | ○ | 本文 | 秋田ベイパラダイスでの... |
| I | link | テキスト |  | 関連リンク | /ke, https://example.com |
| J | imageUrl | テキスト |  | 画像URL | https://... |
| K | tags | テキスト |  | タグ（カンマ区切り） | イベント,秋田,Ke. |
| L | status | テキスト | ○ | ステータス | draft, published, scheduled |
| M | isNew | 真偽値 | ○ | NEWバッジ表示 | TRUE, FALSE |
| N | author | テキスト |  | 作成者 | admin |
| O | displayOrder | 数値 |  | 表示順序（大きい方が上） | 100 |

### ステータス定義

| ステータス | 説明 |
|-----------|------|
| draft | 下書き（公開されない） |
| published | 公開済み（即座に表示） |
| scheduled | 予約公開（publishDate以降に表示） |

---

## 3. Google Apps Script API設計

### ベースURL
```
https://script.google.com/macros/s/[DEPLOYMENT_ID]/exec
```

### エンドポイント一覧

#### 3.1 NEWS記事取得（公開用）
```
GET ?action=getPublishedNews
GET ?action=getPublishedNews&category=イベント
GET ?action=getPublishedNews&limit=10
```

**レスポンス**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "date": "2025.07.14",
      "category": "イベント",
      "title": "秋田ベイパラダイスにて...",
      "description": "7月26日（土）10:00より...",
      "content": "秋田ベイパラダイスでの...",
      "link": "/ke",
      "imageUrl": "https://...",
      "isNew": true,
      "tags": ["イベント", "秋田", "Ke."]
    }
  ]
}
```

#### 3.2 NEWS記事一覧取得（管理用）
```
GET ?action=getAllNews
GET ?action=getAllNews&status=draft
```

**レスポンス**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "createdAt": "2025-07-14 10:30:00",
      "updatedAt": "2025-07-15 14:20:00",
      "publishDate": "2025-07-26",
      "category": "イベント",
      "title": "秋田ベイパラダイスにて...",
      "description": "7月26日（土）10:00より...",
      "content": "秋田ベイパラダイスでの...",
      "link": "/ke",
      "imageUrl": "https://...",
      "tags": "イベント,秋田,Ke.",
      "status": "published",
      "isNew": true,
      "author": "admin",
      "displayOrder": 100
    }
  ]
}
```

#### 3.3 NEWS記事詳細取得
```
GET ?action=getNewsById&id=1
```

**レスポンス**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "createdAt": "2025-07-14 10:30:00",
    "updatedAt": "2025-07-15 14:20:00",
    "publishDate": "2025-07-26",
    "category": "イベント",
    "title": "秋田ベイパラダイスにて...",
    "description": "7月26日（土）10:00より...",
    "content": "秋田ベイパラダイスでの...",
    "link": "/ke",
    "imageUrl": "https://...",
    "tags": "イベント,秋田,Ke.",
    "status": "published",
    "isNew": true,
    "author": "admin",
    "displayOrder": 100
  }
}
```

#### 3.4 NEWS記事作成
```
POST ?action=createNews
Content-Type: application/json

{
  "publishDate": "2025-07-26",
  "category": "イベント",
  "title": "秋田ベイパラダイスにて...",
  "description": "7月26日（土）10:00より...",
  "content": "秋田ベイパラダイスでの...",
  "link": "/ke",
  "imageUrl": "https://...",
  "tags": "イベント,秋田,Ke.",
  "status": "published",
  "isNew": true
}
```

**レスポンス**
```json
{
  "success": true,
  "message": "NEWS記事を作成しました",
  "data": {
    "id": 9
  }
}
```

#### 3.5 NEWS記事更新
```
POST ?action=updateNews
Content-Type: application/json

{
  "id": 1,
  "publishDate": "2025-07-26",
  "category": "イベント",
  "title": "秋田ベイパラダイスにて...",
  "description": "7月26日（土）10:00より...",
  "content": "秋田ベイパラダイスでの...",
  "link": "/ke",
  "imageUrl": "https://...",
  "tags": "イベント,秋田,Ke.",
  "status": "published",
  "isNew": false
}
```

**レスポンス**
```json
{
  "success": true,
  "message": "NEWS記事を更新しました"
}
```

#### 3.6 NEWS記事削除
```
POST ?action=deleteNews
Content-Type: application/json

{
  "id": 1
}
```

**レスポンス**
```json
{
  "success": true,
  "message": "NEWS記事を削除しました"
}
```

#### 3.7 NEWS統計情報取得
```
GET ?action=getNewsStats
```

**レスポンス**
```json
{
  "success": true,
  "data": {
    "totalNews": 25,
    "publishedNews": 18,
    "draftNews": 5,
    "scheduledNews": 2,
    "categoryStats": [
      { "category": "イベント", "count": 10 },
      { "category": "お知らせ", "count": 8 },
      { "category": "メディア", "count": 7 }
    ],
    "recentNews": [
      {
        "id": 1,
        "title": "秋田ベイパラダイスにて...",
        "publishDate": "2025-07-26",
        "category": "イベント",
        "status": "published"
      }
    ]
  }
}
```

---

## 4. フロントエンド設計

### 4.1 管理画面コンポーネント構成

```
src/
├── components/
│   └── admin/
│       ├── Dashboard.jsx (既存)
│       ├── ReservationList.jsx (既存)
│       ├── NewsList.jsx (新規)
│       ├── NewsEditor.jsx (新規)
│       └── NewsStats.jsx (新規)
└── pages/
    └── admin/
        └── Admin.jsx (既存を拡張)
```

### 4.2 Admin.jsx の拡張

既存の`activeTab`に`news`を追加:
- `dashboard`: ダッシュボード
- `reservations`: 予約一覧
- `news`: **NEWS管理（新規）**

サイドバーナビゲーションに「NEWS管理」ボタンを追加

### 4.3 NewsList.jsx（NEWS一覧管理画面）

**機能**
- NEWS記事の一覧表示（ページネーション付き）
- フィルター機能
  - カテゴリ（イベント、お知らせ、メディア、すべて）
  - ステータス（公開、下書き、予約、すべて）
  - 検索（タイトル、内容）
- ソート機能
  - 公開日（新しい順/古い順）
  - 更新日（新しい順/古い順）
  - 表示順序
- アクション
  - 新規作成ボタン
  - 編集ボタン
  - 削除ボタン（確認ダイアログ付き）
  - ステータス変更（クイックアクション）
  - CSV出力

**UIデザイン**
- ReservationList.jsx と同様のデザイン言語を踏襲
- テーブル表示
  - ID
  - タイトル
  - カテゴリ
  - ステータス
  - 公開日
  - 更新日
  - アクション

### 4.4 NewsEditor.jsx（NEWS作成・編集画面）

**機能**
- フォーム項目
  - タイトル（必須、テキスト）
  - カテゴリ（必須、セレクト: イベント/お知らせ/メディア）
  - 公開日（必須、日付ピッカー）
  - 概要（必須、テキストエリア、最大200文字）
  - 本文（必須、テキストエリア）
  - 関連リンク（任意、テキスト）
  - 画像URL（任意、テキスト）
  - タグ（任意、カンマ区切りテキスト）
  - NEWバッジ表示（真偽値、チェックボックス）
  - 表示順序（任意、数値）
  - ステータス（必須、ラジオボタン: 下書き/公開/予約公開）
- アクション
  - 保存ボタン
  - キャンセルボタン
  - プレビューボタン（モーダル表示）
- バリデーション
  - 必須項目チェック
  - 文字数制限チェック
  - URL形式チェック

**UIデザイン**
- 2カラムレイアウト
  - 左: 入力フォーム
  - 右: プレビュー（リアルタイム更新）
- モーダル表示でフルスクリーンプレビュー可能

### 4.5 NewsStats.jsx（NEWS統計ダッシュボード）

**機能**
- 統計カード
  - 総記事数
  - 公開記事数
  - 下書き記事数
  - 予約記事数
- カテゴリ別統計グラフ
- 最新記事一覧（最新5件）

**UIデザイン**
- Dashboard.jsx と同様のカード型デザイン

---

## 5. 実装手順

### Phase 1: データベース & API構築
1. ✅ 設計書作成（このドキュメント）
2. Google Sheetsに`NEWS`シートを作成
3. Google Apps Scriptで以下を実装:
   - `getPublishedNews()` - 公開記事取得
   - `getAllNews()` - 全記事取得（管理用）
   - `getNewsById()` - 記事詳細取得
   - `createNews()` - 記事作成
   - `updateNews()` - 記事更新
   - `deleteNews()` - 記事削除
   - `getNewsStats()` - 統計情報取得
4. GAS APIをデプロイ & URLを取得

### Phase 2: 管理画面UI実装
1. `NewsList.jsx` 実装
   - 記事一覧表示
   - フィルター・ソート機能
   - 削除機能
2. `NewsEditor.jsx` 実装
   - フォームUI
   - バリデーション
   - 作成・更新機能
3. `NewsStats.jsx` 実装
   - 統計カード表示
4. `Admin.jsx` 拡張
   - NEWSタブ追加
   - ルーティング設定

### Phase 3: 公開ページ連携
1. `NewsPage.js` を API連携に変更
   - `getPublishedNews()` API呼び出し
   - ローディング状態の実装
   - エラーハンドリング
2. 既存のハードコードデータを削除

### Phase 4: テスト & デプロイ
1. 管理画面での CRUD 操作テスト
2. 公開ページでの表示確認
3. フィルター・ソート機能テスト
4. レスポンシブデザイン確認
5. 本番環境デプロイ
6. README.md更新

---

## 6. 将来の拡張機能（オプション）

### 画像アップロード機能
- Google Driveとの連携
- 画像のリサイズ・最適化
- 画像ライブラリ管理

### リッチテキストエディタ
- WYSIWYG エディタの導入
- Markdown対応
- 画像の埋め込み

### SNS自動投稿
- Facebook Graph API連携
- Instagram Graph API連携
- X (Twitter) API連携
- 投稿スケジューリング

### SEO強化
- メタタグ管理
- OGP設定
- サイトマップ自動生成

### アクセス解析
- 記事別PV数表示
- 人気記事ランキング
- GA4データ連携

---

## 7. 既存システムとの整合性

### 認証
- 既存の`AuthContext`をそのまま利用
- パスワード保護は既存の管理画面と共通

### API通信
- 既存の予約システムと同じパターン
  ```javascript
  const GAS_WEB_APP_URL = 'https://script.google.com/...';
  const response = await fetch(`${GAS_WEB_APP_URL}?action=getPublishedNews`);
  ```

### UIデザイン
- 既存の管理画面（Admin.css, Dashboard.css, ReservationList.css）と同じデザイン言語
- カラーパレット: `--primary-color`, `--accent-color` など

### エラーハンドリング
- 既存コードと同様のtry-catchパターン
- ローディング状態の管理

---

## 8. セキュリティ考慮事項

### 認証・認可
- 管理機能は認証済みユーザーのみアクセス可能
- セッション有効期限: 24時間

### データバリデーション
- フロントエンド: 入力値の形式チェック
- バックエンド (GAS): 必須項目チェック、データ型チェック

### XSS対策
- ユーザー入力のサニタイズ
- HTMLタグのエスケープ

### CSRF対策
- GAS APIの適切な認証設定
- Same-Originポリシーの活用

---

## 9. まとめ

本設計書に基づき、既存のYOLUBEウェブサイトにNEWS管理システムを統合します。
Google Sheets + GAS という既存のアーキテクチャを最大限活用し、
スムーズな開発とメンテナンスを実現します。

**完成イメージ:**
- 管理者は`/admin`にログイン → NEWSタブでニュース記事を管理
- 訪問者は`/NEWS`でリアルタイムに公開されたニュース記事を閲覧

---

**作成日**: 2025年10月12日
**作成者**: Claude Code
**バージョン**: v1.0
