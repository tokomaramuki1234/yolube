# Google Apps Script & Sheets セットアップガイド

## 📋 概要
このガイドでは、NEWS管理システムのバックエンドとなるGoogle SheetsとGoogle Apps Scriptのセットアップ手順を説明します。

---

## 🚀 セットアップ手順

### ステップ1: Google Sheetsの準備

1. **既存のYOLUBE管理用スプレッドシートを開く**
   - 予約システムで使用しているスプレッドシートを開きます
   - URLから`SPREADSHEET_ID`をコピーして控えておきます
   - 例: `https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit`

2. **スプレッドシートIDを確認**
   - URLの`/d/`と`/edit`の間の文字列がスプレッドシートIDです
   - 例: `1abc2def3ghi4jkl5mno6pqr7stu8vwx9yz0`

### ステップ2: Google Apps Scriptエディタを開く

1. **Apps Scriptを開く**
   - スプレッドシート上部メニューから「拡張機能」→「Apps Script」をクリック

2. **新しいプロジェクトが開く**
   - デフォルトで`Code.gs`というファイルが作成されています

### ステップ3: コードの貼り付けと設定

1. **コードをコピー**
   - `docs/GAS_NEWS_API.gs` ファイルの内容を全てコピーします

2. **既存のコードに追加**
   - Apps Scriptエディタで、既存の予約システムコードの**下**に貼り付けます
   - または、新しいファイル（`NEWS_API.gs`）を作成して貼り付けます
     - 左サイドバーの「＋」ボタン → 「スクリプト」をクリック
     - ファイル名を `NEWS_API` に変更

3. **SPREADSHEET_IDを設定**
   ```javascript
   // 2行目を変更
   const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
   // ↓
   const SPREADSHEET_ID = '1abc2def3ghi4jkl5mno6pqr7stu8vwx9yz0'; // 実際のIDに置き換え
   ```

4. **保存**
   - 「Ctrl + S」または上部の「💾」アイコンをクリックして保存

### ステップ4: NEWSシートの初期化

1. **initializeNewsSheet関数を実行**
   - Apps Scriptエディタ上部の関数選択ドロップダウンから `initializeNewsSheet` を選択
   - 「▶実行」ボタンをクリック

2. **権限の承認**
   - 初回実行時は権限の承認が必要です
   - 「権限を確認」→ Googleアカウントを選択 → 「詳細」→ 「安全ではないページに移動」→ 「許可」

3. **実行ログを確認**
   - 下部の「実行ログ」に「NEWSシートの初期化が完了しました」と表示されればOK

4. **スプレッドシートを確認**
   - スプレッドシートに戻ると、新しく「NEWS」シートが作成されています
   - ヘッダー行（緑色背景）が設定されています

### ステップ5: ウェブアプリとしてデプロイ

1. **デプロイを開始**
   - Apps Scriptエディタ右上の「デプロイ」→「新しいデプロイ」をクリック

2. **デプロイタイプを選択**
   - 左側の「種類を選択」から「ウェブアプリ」を選択

3. **デプロイ設定**
   - **説明**: `YOLUBE NEWS API v1.0`
   - **次のユーザーとして実行**: `自分（あなたのメールアドレス）`
   - **アクセスできるユーザー**: `全員`
     - ⚠️ この設定により、ReactアプリからAPIにアクセスできるようになります

4. **デプロイ実行**
   - 「デプロイ」ボタンをクリック
   - 再度権限の承認が求められた場合は承認します

5. **ウェブアプリURLを取得**
   - デプロイが完了すると、**ウェブアプリURL**が表示されます
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```
   - このURLを**必ずコピーして控えておきます**

6. **完了**
   - 「完了」ボタンをクリック

### ステップ6: Reactアプリへの設定

1. **Admin.jsxを開く**
   - `src/pages/admin/Admin.jsx` を開きます

2. **GAS_WEB_APP_URLを更新**
   ```javascript
   // 既存の予約システムURL
   const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxZRZSDGyg_Z1rGcuD9xymlMXB4vV3Cz8EVTOWS2GvP-bLKeYcq7q122ixPQKV71Xg6iQ/exec';

   // ↑ これはそのまま（予約システム用）

   // ↓ 新しくNEWS用のURLを追加
   const NEWS_API_URL = 'https://script.google.com/macros/s/[YOUR_DEPLOYMENT_ID]/exec';
   ```

---

## 🧪 APIテスト

### ブラウザでテスト

1. **公開NEWS取得**
   ```
   https://script.google.com/macros/s/[YOUR_DEPLOYMENT_ID]/exec?action=getPublishedNews
   ```
   - ブラウザで開いて、JSONレスポンスが返ってくることを確認

2. **統計情報取得**
   ```
   https://script.google.com/macros/s/[YOUR_DEPLOYMENT_ID]/exec?action=getNewsStats
   ```

### サンプルデータの追加（テスト用）

NEWSシートに手動でテストデータを追加してみましょう:

| id | createdAt | updatedAt | publishDate | category | title | description | content | link | imageUrl | tags | status | isNew | author | displayOrder |
|----|-----------|-----------|-------------|----------|-------|-------------|---------|------|----------|------|--------|-------|--------|--------------|
| 1 | 2025-07-14 10:00:00 | 2025-07-14 10:00:00 | 2025-07-26 | イベント | テスト記事1 | これはテスト記事です | テスト本文 | /ke | | テスト,イベント | published | TRUE | admin | 100 |

---

## 🔄 API更新時の対応

コードを変更した場合は、**新しいバージョンとして再デプロイ**が必要です:

1. Apps Scriptエディタで「デプロイ」→「デプロイを管理」
2. 右上の鉛筆アイコン（編集）をクリック
3. 右上のバージョン選択で「新バージョン」を選択
4. 説明を入力（例: `v1.1 - バグ修正`）
5. 「デプロイ」ボタンをクリック

⚠️ ウェブアプリURLは変わりません。既存のReactアプリはそのまま動作します。

---

## ❗ トラブルシューティング

### エラー: "NEWSシートが見つかりません"
- **原因**: `initializeNewsSheet()` が実行されていない
- **解決策**: ステップ4を再度実行

### エラー: "SPREADSHEET_ID が正しくありません"
- **原因**: コード内の `SPREADSHEET_ID` が間違っている
- **解決策**: スプレッドシートのURLから正しいIDをコピーして設定

### APIレスポンスが返ってこない
- **原因**: デプロイ設定が「全員」になっていない
- **解決策**: デプロイ設定を確認し、「アクセスできるユーザー: 全員」に変更

### CORS エラー
- **原因**: GAS側のCORS設定
- **解決策**: コード内で`ContentService.createTextOutput()`を使用しているため、通常は発生しません。発生した場合はブラウザのキャッシュをクリア

---

## 📝 まとめ

セットアップが完了すると、以下の状態になります:

✅ Google Sheetsに`NEWS`シートが作成されている
✅ Google Apps ScriptでNEWS API がデプロイされている
✅ ウェブアプリURLを取得している
✅ ブラウザでAPIテストが成功している

次のステップ: フロントエンド（Reactコンポーネント）の実装に進みます。

---

**作成日**: 2025年10月12日
**バージョン**: v1.0
