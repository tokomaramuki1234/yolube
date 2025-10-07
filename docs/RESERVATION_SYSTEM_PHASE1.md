# YOLUBE予約システム開発 - Phase 1 設計書

## 📋 概要

Phase 1では、Google Apps Script（GAS）とGoogle Sheetsを使用した予約システムのバックエンドAPIとデータベース構造を構築します。

## 🎯 Phase 1の目標

- [ ] 予約データ用Google Sheetsの設計
- [ ] GAS APIエンドポイント設計
- [ ] 基本的なCRUD操作関数の実装
- [ ] 既存お問い合わせGASとの統合

---

## 📊 Google Sheets設計

### スプレッドシート情報
- **スプレッドシートID**: `14roOdnMm4kdnL64OWkXdgMJ_qSampUuzr-tvEGeGhb4`
- **URL**: https://docs.google.com/spreadsheets/d/14roOdnMm4kdnL64OWkXdgMJ_qSampUuzr-tvEGeGhb4/edit

### 新規タブ: 「reservations」

| 列 | 項目名 | データ型 | 説明 | 例 |
|---|--------|---------|------|-----|
| A | ID | 数値（自動連番） | 予約ID | 1, 2, 3... |
| B | イベントID | 文字列 | スケジュールシート行番号 | "Vol-058" |
| C | 予約者名 | 文字列 | フルネーム | "山田 太郎" |
| D | メールアドレス | 文字列 | 連絡用メール | "example@email.com" |
| E | 同行者数 | 数値 | 本人含まない人数 | 0, 1, 2... |
| F | 来場予定時刻 | 文字列 | 時刻（HH:MM形式） | "14:00" |
| G | 希望ゲーム | 文字列 | 遊びたいゲーム名 | "カタン" |
| H | 特記事項 | 文字列 | その他メッセージ | "初参加です" |
| I | 予約日時 | 日時 | 予約登録日時 | "2025-10-06 15:30:45" |
| J | ステータス | 文字列 | confirmed/cancelled | "confirmed" |

#### ヘッダー行（1行目）
```
ID | イベントID | 予約者名 | メールアドレス | 同行者数 | 来場予定時刻 | 希望ゲーム | 特記事項 | 予約日時 | ステータス
```

#### データ開始行
- 2行目からデータ

#### 初期データ例
```
1 | Vol-058 | 山田 太郎 | yamada@example.com | 2 | 14:00 | カタン | 初参加です | 2025-10-06 15:30:45 | confirmed
```

---

## 🔌 GAS APIエンドポイント設計

### ベースURL
```
https://script.google.com/macros/s/AKfycbwGhOV6W4DoMTK9Zagbdjqq0KVx0KVThPqFtIzbFG__fine1Kez4_EmO7G9TwMiYrIGbg/exec
```

### エンドポイント一覧

#### 1. 予約作成（POST）
**パス**: `?action=createReservation`

**リクエストボディ**:
```json
{
  "eventId": "Vol-058",
  "name": "山田 太郎",
  "email": "yamada@example.com",
  "companionCount": 2,
  "arrivalTime": "14:00",
  "desiredGame": "カタン",
  "notes": "初参加です"
}
```

**レスポンス（成功）**:
```json
{
  "success": true,
  "reservationId": 1,
  "message": "予約が完了しました",
  "data": {
    "id": 1,
    "eventId": "Vol-058",
    "name": "山田 太郎",
    "email": "yamada@example.com",
    "status": "confirmed"
  }
}
```

**レスポンス（エラー）**:
```json
{
  "success": false,
  "error": "必須項目が不足しています",
  "message": "eventId, name, emailは必須です"
}
```

---

#### 2. 予約一覧取得（GET）
**パス**: `?action=getReservations&eventId=Vol-058`

**クエリパラメータ**:
- `eventId` (必須): イベントID

**レスポンス**:
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "eventId": "Vol-058",
      "name": "山田 太郎",
      "email": "yamada@example.com",
      "companionCount": 2,
      "arrivalTime": "14:00",
      "desiredGame": "カタン",
      "notes": "初参加です",
      "reservationDate": "2025-10-06 15:30:45",
      "status": "confirmed"
    }
  ]
}
```

---

#### 3. 予約詳細取得（GET）
**パス**: `?action=getReservation&id=1`

**クエリパラメータ**:
- `id` (必須): 予約ID

**レスポンス**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "eventId": "Vol-058",
    "name": "山田 太郎",
    "email": "yamada@example.com",
    "companionCount": 2,
    "arrivalTime": "14:00",
    "desiredGame": "カタン",
    "notes": "初参加です",
    "reservationDate": "2025-10-06 15:30:45",
    "status": "confirmed"
  }
}
```

---

#### 4. 予約キャンセル（POST）
**パス**: `?action=cancelReservation`

**リクエストボディ**:
```json
{
  "id": 1,
  "email": "yamada@example.com"
}
```

**レスポンス**:
```json
{
  "success": true,
  "message": "予約がキャンセルされました",
  "data": {
    "id": 1,
    "status": "cancelled"
  }
}
```

---

#### 5. イベント情報取得（GET）※既存機能との連携
**パス**: `?action=getEventInfo&eventId=Vol-058`

**レスポンス**:
```json
{
  "success": true,
  "data": {
    "eventId": "Vol-058",
    "date": "2025年8月9日(土)",
    "venue": "秋田ベイパラダイス",
    "venueAddress": "秋田県秋田市土崎港西1-10-45",
    "availableSlots": 50,
    "currentReservations": 12
  }
}
```

---

## 🛠️ GAS関数設計

### 主要関数一覧

```javascript
// メインハンドラー
function doPost(e)
function doGet(e)

// 予約CRUD操作
function createReservation(data)
function getReservations(eventId)
function getReservation(id)
function cancelReservation(id, email)

// ヘルパー関数
function getReservationsSheet()
function getNextReservationId()
function validateReservationData(data)
function sendReservationConfirmationEmail(reservationData)
function sendCancellationEmail(reservationData)

// レスポンス生成
function createJsonResponse(success, data, error = null)
function createHtmlResponse(title, message)

// 既存機能との統合
function getEventInfoFromSchedule(eventId)
function countReservationsByEvent(eventId)

// CORS対応
function setCorsHeaders()
```

---

## 🔒 セキュリティ・バリデーション

### 入力バリデーション
- メールアドレス形式チェック
- 必須項目チェック（eventId, name, email）
- 同行者数の範囲チェック（0-10）
- 時刻形式チェック（HH:MM）

### エラーハンドリング
- try-catchによる例外処理
- 詳細なエラーメッセージ
- ログ記録（Logger.log）

### CORS対応
- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET, POST, OPTIONS`
- `Access-Control-Allow-Headers: Content-Type`

---

## 📧 メール通知機能

### 予約完了メール（ユーザー宛）
**件名**: 【YOLUBE】Ke.イベント予約完了のお知らせ

**本文テンプレート**:
```
{name} 様

テーブルゲーム交流会：Ke. へのご予約ありがとうございます。

■ 予約内容
予約番号: {id}
イベント: {eventId}
来場予定時刻: {arrivalTime}
同行者数: {companionCount}名
希望ゲーム: {desiredGame}

■ イベント情報
日時: {eventDate}
会場: {venue}
住所: {venueAddress}

ご質問がございましたら、このメールに返信してください。

YOLUBE
info@yolube.jp
```

### 予約受付通知メール（管理者宛）
**件名**: 【YOLUBE】新規予約受付 - {eventId}

**本文テンプレート**:
```
新規予約が登録されました。

予約ID: {id}
イベント: {eventId}
予約者: {name}
メール: {email}
来場予定: {arrivalTime}
同行者: {companionCount}名
希望ゲーム: {desiredGame}
特記事項: {notes}

予約日時: {reservationDate}
```

---

## 🧪 テストケース

### 1. 予約作成テスト
- ✅ 正常な予約作成
- ✅ 必須項目不足エラー
- ✅ 不正なメールアドレス形式エラー
- ✅ 同行者数範囲外エラー

### 2. 予約取得テスト
- ✅ イベントIDで予約一覧取得
- ✅ 予約IDで詳細取得
- ✅ 存在しない予約IDエラー

### 3. 予約キャンセルテスト
- ✅ 正常なキャンセル
- ✅ メールアドレス不一致エラー
- ✅ 存在しない予約IDエラー

---

## 📝 実装手順

### ステップ1: Google Sheetsセットアップ
1. スプレッドシート（ID: 14roOdnMm4kdnL64OWkXdgMJ_qSampUuzr-tvEGeGhb4）を開く
2. 新しいタブ「reservations」を作成
3. ヘッダー行を設定
4. データ検証ルールを設定（オプション）

### ステップ2: GASコード実装
1. Apps Scriptエディタを開く
2. 既存コードを確認
3. 予約システム用関数を追加
4. doPost/doGetにルーティング追加

### ステップ3: テスト
1. テストデータで予約作成
2. 予約一覧取得確認
3. メール送信確認
4. キャンセル機能確認

### ステップ4: デプロイ
1. 新しいバージョンとしてデプロイ
2. WebアプリURLを確認
3. 既存フォーム機能が動作することを確認

---

## ⚠️ 既存機能との互換性

### 既存のお問い合わせフォーム
- `formType: 'home'` - ホームページお問い合わせ
- `formType: 'ke'` - Ke.イベント参加申し込み
- `formType: 'training'` - 研修お問い合わせ

**これらは既存通り動作を維持します。**

### 新規追加
- `action=createReservation` - 予約作成
- `action=getReservations` - 予約一覧
- `action=getReservation` - 予約詳細
- `action=cancelReservation` - 予約キャンセル
- `action=getEventInfo` - イベント情報取得

---

## 🔗 関連リソース

- **スプレッドシートURL**: https://docs.google.com/spreadsheets/d/14roOdnMm4kdnL64OWkXdgMJ_qSampUuzr-tvEGeGhb4/edit
- **GAS WebアプリURL**: https://script.google.com/macros/s/AKfycbwGhOV6W4DoMTK9Zagbdjqq0KVx0KVThPqFtIzbFG__fine1Kez4_EmO7G9TwMiYrIGbg/exec
- **既存README**: cursor/README.md

---

## 次のフェーズ（Phase 2）への準備

Phase 1完了後、以下の準備が整います：
- ✅ 予約データベース構造
- ✅ REST API風のエンドポイント
- ✅ メール通知機能
- ✅ 基本的なCRUD操作

Phase 2では、フロントエンド（React）で予約フォームUIを構築します。
