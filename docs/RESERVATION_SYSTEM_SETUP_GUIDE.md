# YOLUBE予約システム - Phase 1 実装ガイド

## 📋 目次

1. [事前準備](#事前準備)
2. [Google Sheetsセットアップ](#google-sheetsセットアップ)
3. [GASコード実装](#gasコード実装)
4. [テスト手順](#テスト手順)
5. [トラブルシューティング](#トラブルシューティング)

---

## 事前準備

### 必要なアクセス権限
- [ ] Google Sheetsへの編集権限
- [ ] Google Apps Scriptの実行権限
- [ ] Gmail送信権限

### 確認事項
- [ ] スプレッドシートID: `14roOdnMm4kdnL64OWkXdgMJ_qSampUuzr-tvEGeGhb4`
- [ ] GAS WebアプリURL: `https://script.google.com/macros/s/AKfycbw.../exec`
- [ ] 管理者メール: `info@yolube.jp`

---

## Google Sheetsセットアップ

### ステップ 1: スプレッドシートを開く

1. 以下のURLにアクセス
   ```
   https://docs.google.com/spreadsheets/d/14roOdnMm4kdnL64OWkXdgMJ_qSampUuzr-tvEGeGhb4/edit
   ```

2. **重要**: シークレットモードで、単一のGoogleアカウントでのみアクセスしていることを確認

### ステップ 2: 「reservations」タブを作成

1. スプレッドシートの下部にある「+」ボタンをクリック
2. 新しいシート名を「reservations」に変更
3. シートを選択した状態で次のステップへ

### ステップ 3: ヘッダー行を設定

A1セルから順に以下の値を入力：

| 列 | ヘッダー名 |
|----|-----------|
| A1 | ID |
| B1 | イベントID |
| C1 | 予約者名 |
| D1 | メールアドレス |
| E1 | 同行者数 |
| F1 | 来場予定時刻 |
| G1 | 希望ゲーム |
| H1 | 特記事項 |
| I1 | 予約日時 |
| J1 | ステータス |

### ステップ 4: ヘッダー行をフォーマット（オプション）

1. 1行目を選択
2. 太字にする（Ctrl/Cmd + B）
3. 背景色を設定（推奨: #8BC780）
4. 文字色を白に設定
5. 「表示」→「固定」→「1行」でヘッダーを固定

### ステップ 5: データ検証を設定（オプション）

#### E列（同行者数）の検証
1. E2セルを選択
2. 「データ」→「データの入力規則」
3. 条件: 「次の範囲の数値」→ 0〜10
4. 「完了」

#### J列（ステータス）の検証
1. J2セルを選択
2. 「データ」→「データの入力規則」
3. 条件: 「リストを範囲で指定」
4. リスト: `confirmed, cancelled`
5. 「完了」

### 完成イメージ

```
+----+------------+----------+-------------------+----------+---------------+-------------+----------+---------------------+-----------+
| ID | イベントID | 予約者名 | メールアドレス    | 同行者数 | 来場予定時刻  | 希望ゲーム  | 特記事項 | 予約日時            | ステータス |
+----+------------+----------+-------------------+----------+---------------+-------------+----------+---------------------+-----------+
|    |            |          |                   |          |               |             |          |                     |           |
+----+------------+----------+-------------------+----------+---------------+-------------+----------+---------------------+-----------+
```

---

## GASコード実装

### ステップ 1: Apps Scriptエディタを開く

1. スプレッドシート上部メニュー「拡張機能」→「Apps Script」をクリック
2. 既存のコードエディタが開く

### ステップ 2: 既存コードのバックアップ

⚠️ **重要**: 既存のコードを必ずバックアップしてください

1. エディタ内の全コードをコピー
2. デスクトップに `GAS_BACKUP_[日付].gs` として保存
3. または、別のGoogle Docにペースト保存

### ステップ 3: 新しいコードを追加

#### オプションA: 既存コードに追加する場合

1. 既存のコードの**最後**に、`docs/GAS_RESERVATION_SYSTEM.gs` の内容を追加
2. `handleContactForm()` 関数は、既存のお問い合わせフォーム処理関数に置き換える

#### オプションB: 新しいファイルとして追加する場合

1. エディタ左側の「+」→「スクリプト」をクリック
2. ファイル名を「ReservationSystem」に変更
3. `docs/GAS_RESERVATION_SYSTEM.gs` の内容をペースト

### ステップ 4: 定数の確認

コード内の以下の定数を確認・修正：

```javascript
const SPREADSHEET_ID = '14roOdnMm4kdnL64OWkXdgMJ_qSampUuzr-tvEGeGhb4';
const RESERVATIONS_SHEET_NAME = 'reservations';
const SCHEDULE_SHEET_NAME = 'YOLUBE Event Schedule';
const ADMIN_EMAIL = 'info@yolube.jp';
```

✅ **確認済み**: スケジュールシート名は `YOLUBE Event Schedule` に設定されています。

### ステップ 5: 既存コードとの統合

`handleContactForm()` 関数を既存のお問い合わせフォーム処理に置き換え：

```javascript
function handleContactForm(e) {
  // 既存のお問い合わせフォーム処理コードをここに配置
  // formType: 'home', 'ke', 'training' の処理

  const formType = e.parameter.formType;

  // ... 既存の処理 ...

  return createHtmlResponse('お問い合わせ受付完了', 'お問い合わせありがとうございます。');
}
```

### ステップ 6: 保存とデプロイ

1. **保存**: Ctrl/Cmd + S または「💾」アイコンをクリック
2. **デプロイ**:
   - 右上「デプロイ」→「新しいデプロイ」
   - 「種類の選択」→「ウェブアプリ」
   - 説明: 「予約システムPhase1追加」
   - 次のユーザーとして実行: 「自分」
   - アクセスできるユーザー: 「全員」
   - 「デプロイ」をクリック

3. **承認**:
   - 「アクセスを承認」をクリック
   - Googleアカウントを選択
   - 「詳細」→「[プロジェクト名]（安全ではないページ）に移動」
   - 「許可」をクリック

4. **WebアプリURLを記録**:
   - デプロイ完了後に表示されるURLをコピー
   - README.mdに記載

---

## テスト手順

### テスト環境

#### 方法1: Postman / Insomnia を使用

#### 方法2: ブラウザのコンソールを使用

#### 方法3: curlコマンドを使用（推奨）

### テストケース1: 予約作成

```bash
curl -X POST "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=createReservation" \
  -H "Content-Type: application/json" \
  -d '{
    "eventId": "Vol-058",
    "name": "山田 太郎",
    "email": "yamada.test@example.com",
    "companionCount": 2,
    "arrivalTime": "14:00",
    "desiredGame": "カタン",
    "notes": "初参加です"
  }'
```

**期待される結果**:
```json
{
  "success": true,
  "reservationId": 1,
  "message": "予約が完了しました",
  "data": {
    "id": 1,
    "eventId": "Vol-058",
    "name": "山田 太郎",
    "email": "yamada.test@example.com",
    "status": "confirmed"
  },
  "timestamp": "2025-10-06T12:34:56.789Z"
}
```

**確認事項**:
- [ ] Google Sheetsの`reservations`タブに新しい行が追加されている
- [ ] 予約者のメールアドレスに確認メールが届いている
- [ ] 管理者メールアドレス（info@yolube.jp）に通知メールが届いている

---

### テストケース2: 予約一覧取得

```bash
curl -X GET "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=getReservations&eventId=Vol-058"
```

**期待される結果**:
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 1,
      "eventId": "Vol-058",
      "name": "山田 太郎",
      "email": "yamada.test@example.com",
      "companionCount": 2,
      "arrivalTime": "14:00",
      "desiredGame": "カタン",
      "notes": "初参加です",
      "reservationDate": "2025-10-06 15:30:45",
      "status": "confirmed"
    }
  ],
  "timestamp": "2025-10-06T12:35:00.000Z"
}
```

---

### テストケース3: 予約詳細取得

```bash
curl -X GET "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=getReservation&id=1"
```

**期待される結果**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "eventId": "Vol-058",
    "name": "山田 太郎",
    "email": "yamada.test@example.com",
    "companionCount": 2,
    "arrivalTime": "14:00",
    "desiredGame": "カタン",
    "notes": "初参加です",
    "reservationDate": "2025-10-06 15:30:45",
    "status": "confirmed"
  },
  "timestamp": "2025-10-06T12:35:05.000Z"
}
```

---

### テストケース4: イベント情報取得

```bash
curl -X GET "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=getEventInfo&eventId=Vol-058"
```

**期待される結果**:
```json
{
  "success": true,
  "data": {
    "eventId": "Vol-058",
    "date": "2025年8月9日(土)",
    "venue": "秋田ベイパラダイス",
    "venueAddress": "秋田県秋田市土崎港西1-10-45",
    "availableSlots": 50,
    "currentReservations": 1
  },
  "timestamp": "2025-10-06T12:35:10.000Z"
}
```

---

### テストケース5: 予約キャンセル

```bash
curl -X POST "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=cancelReservation" \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "email": "yamada.test@example.com"
  }'
```

**期待される結果**:
```json
{
  "success": true,
  "message": "予約がキャンセルされました",
  "data": {
    "id": 1,
    "status": "cancelled"
  },
  "timestamp": "2025-10-06T12:35:15.000Z"
}
```

**確認事項**:
- [ ] Google Sheetsの該当行のステータスが`cancelled`に変更されている
- [ ] 予約者のメールアドレスにキャンセル確認メールが届いている

---

### テストケース6: エラーハンドリング

#### 必須項目不足エラー
```bash
curl -X POST "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=createReservation" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "山田 太郎"
  }'
```

**期待される結果**:
```json
{
  "success": false,
  "error": "eventId, name, emailは必須です",
  "timestamp": "2025-10-06T12:35:20.000Z"
}
```

#### 不正なメールアドレス形式エラー
```bash
curl -X POST "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=createReservation" \
  -H "Content-Type: application/json" \
  -d '{
    "eventId": "Vol-058",
    "name": "山田 太郎",
    "email": "invalid-email"
  }'
```

**期待される結果**:
```json
{
  "success": false,
  "error": "メールアドレスの形式が正しくありません",
  "timestamp": "2025-10-06T12:35:25.000Z"
}
```

---

## トラブルシューティング

### 問題1: 「このスクリプトには承認が必要です」エラー

**原因**: GASが初回実行時に権限を要求している

**解決方法**:
1. 「詳細」をクリック
2. 「[プロジェクト名]（安全ではないページ）に移動」をクリック
3. 「許可」をクリック

---

### 問題2: CORS エラー

**症状**:
```
Access to fetch at '...' from origin '...' has been blocked by CORS policy
```

**原因**: GAS側でCORSヘッダーが設定されていない

**解決方法**:
1. GASコード内の `createJsonResponse()` 関数を確認
2. 以下のヘッダーが設定されていることを確認:
   ```javascript
   output.setHeader('Access-Control-Allow-Origin', '*');
   output.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
   output.setHeader('Access-Control-Allow-Headers', 'Content-Type');
   ```

---

### 問題3: メールが送信されない

**原因**: Gmail送信権限がない、またはエイリアス未設定

**解決方法**:
1. GASエディタで「実行ログ」を確認
2. エラーメッセージを確認
3. `GmailApp.sendEmail()` の `from` オプションを削除し、`replyTo` のみ使用

---

### 問題4: スプレッドシートにデータが追加されない

**原因**: シート名が間違っている、または権限がない

**解決方法**:
1. `SPREADSHEET_ID` が正しいか確認
2. `RESERVATIONS_SHEET_NAME` が正しいか確認
3. 「実行ログ」でエラーメッセージを確認
4. スプレッドシートの編集権限があるか確認

---

### 問題5: 既存のお問い合わせフォームが動作しない

**原因**: `doPost()` の統合が不完全

**解決方法**:
1. `doPost()` 関数内で `formType` パラメータの有無を確認
2. `formType` がある場合は、既存の `handleContactForm()` を呼び出すように修正
3. 既存のフォーム機能をテストして動作を確認

---

## テスト完了チェックリスト

Phase 1のテストが完了したら、以下をチェックしてください:

- [ ] Google Sheetsに「reservations」タブが作成されている
- [ ] ヘッダー行が正しく設定されている
- [ ] GASコードがデプロイされている
- [ ] 予約作成APIが動作する
- [ ] 予約一覧取得APIが動作する
- [ ] 予約詳細取得APIが動作する
- [ ] 予約キャンセルAPIが動作する
- [ ] イベント情報取得APIが動作する
- [ ] 予約確認メールが送信される
- [ ] 管理者通知メールが送信される
- [ ] キャンセルメールが送信される
- [ ] エラーハンドリングが適切に動作する
- [ ] 既存のお問い合わせフォームが引き続き動作する

全てチェックが完了したら、**Phase 1完了**です！

---

## 次のステップ: Phase 2

Phase 1が完了したら、Phase 2（フロントエンド実装）に進みます。

Phase 2では以下を実装します:
- React予約フォームコンポーネント
- 予約一覧表示UI
- 予約詳細・キャンセル機能
- リアルタイム空席状況表示

Phase 2の実装ガイドは別途提供します。
