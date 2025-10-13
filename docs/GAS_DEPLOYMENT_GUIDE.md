# 統合GASコードのデプロイ手順書

## バージョン情報
- **現在のバージョン**: v3.4
- **最終更新日**: 2025-10-07

## 📋 目次

1. [事前準備](#事前準備)
2. [統合GASコードのデプロイ](#統合gasコードのデプロイ)
3. [reservationsシートの作成](#reservationsシートの作成)
4. [Web Appとしてデプロイ](#web-appとしてデプロイ)
5. [動作確認とテスト](#動作確認とテスト)
6. [トラブルシューティング](#トラブルシューティング)
7. [v3.4 変更履歴](#v34-変更履歴)

---

## 事前準備

### 必要なもの

- ✅ Googleアカウント（既存のGASプロジェクトへのアクセス権限）
- ✅ インターネット接続
- ✅ Chromeまたは他のモダンブラウザ
- ✅ 統合GASコードファイル: `cursor/docs/GAS_INTEGRATED.gs`

### ⚠️ 重要な注意事項

**必ずシークレットモードで作業してください**

> 複数のGoogleアカウントでログインしていると、権限エラーやアクセス問題が発生する可能性があります。

### バックアップ確認

デプロイ前に、以下のバックアップファイルが存在することを確認してください：

```
cursor/docs/
├── GAS_EXISTING_BACKUP.gs        ← 既存GASコードのバックアップ
├── GAS_RESERVATION_SYSTEM.gs     ← 新規予約システムコード
└── GAS_INTEGRATED.gs             ← 統合GASコード（デプロイするファイル）
```

---

## 統合GASコードのデプロイ

### ステップ 1: Apps Scriptプロジェクトを開く

#### オプションA: 既存のGASプロジェクトを使用する場合

1. **シークレットモードでブラウザを開く**
   - Chrome: `Ctrl + Shift + N` (Windows) / `Cmd + Shift + N` (Mac)

2. **Googleアカウントにログイン**
   - https://accounts.google.com にアクセス
   - 既存GASプロジェクトへのアクセス権限があるアカウントでログイン

3. **Apps Scriptプロジェクトにアクセス**
   - 方法1: https://script.google.com にアクセスして、既存プロジェクトを選択
   - 方法2: Google Sheetsから「拡張機能」→「Apps Script」

#### オプションB: 新規Apps Scriptプロジェクトを作成する場合

1. https://script.google.com にアクセス
2. 左上の「新しいプロジェクト」をクリック
3. プロジェクト名を「YOLUBE統合システム v3.3」に変更

### ステップ 2: 統合GASコードをコピー

1. **`cursor/docs/GAS_INTEGRATED.gs` ファイルを開く**
   - メモ帳やテキストエディタで開く

2. **すべてのコードを選択してコピー**
   - `Ctrl + A` (Windows) / `Cmd + A` (Mac) で全選択
   - `Ctrl + C` (Windows) / `Cmd + C` (Mac) でコピー

### ステップ 3: Apps Scriptエディタにペースト

1. **Apps Scriptエディタで既存のコードをすべて削除**
   - エディタ内で `Ctrl + A` → `Delete`

2. **コピーした統合GASコードをペースト**
   - `Ctrl + V` (Windows) / `Cmd + V` (Mac)

3. **ファイル名を変更（任意）**
   - 左側のファイル一覧で「コード.gs」をダブルクリック
   - 「Integrated.gs」などに変更

4. **保存**
   - `Ctrl + S` または上部の「💾」アイコンをクリック

### ステップ 4: スプレッドシートIDの確認

統合GASコードでは2つのスプレッドシートを使用します：

```javascript
// お問い合わせフォームシステム用
const CONTACT_SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/1Ejs0annRLCGiV0dSTVGwm-1oDWbPHv65s1xLeWyRen8/edit?usp=sharing';

// 予約システム用
const RESERVATION_SPREADSHEET_ID = '14roOdnMm4kdnL64OWkXdgMJ_qSampUuzr-tvEGeGhb4';
```

これらの値が正しいことを確認してください。

---

## reservationsシートの作成

### 自動作成（推奨）

統合GASコードは、初回実行時に自動的に `reservations` シートを作成します。

**手動でシートを作成する必要はありません。**

初めて予約APIを呼び出すと、以下のヘッダーを持つシートが自動作成されます：

| 列 | ヘッダー名 |
|----|-----------|
| A  | ID |
| B  | イベントID |
| C  | 予約者名 |
| D  | メールアドレス |
| E  | 同行者数 |
| F  | 来場予定時刻 |
| G  | 希望ゲーム |
| H  | 特記事項 |
| I  | 予約日時 |
| J  | ステータス |

### 手動作成（任意）

事前に作成したい場合：

1. スプレッドシート（ID: `14roOdnMm4kdnL64OWkXdgMJ_qSampUuzr-tvEGeGhb4`）を開く
2. 左下の「+」アイコンをクリック → 新しいシートを作成
3. シート名を `reservations` に変更
4. 1行目にヘッダーを入力（上記の表を参照）

---

## Web Appとしてデプロイ

### ステップ 1: デプロイメニューを開く

1. Apps Scriptエディタの右上「デプロイ」ボタンをクリック
2. 「新しいデプロイ」を選択

### ステップ 2: デプロイの種類を選択

1. 「種類の選択」で「ウェブアプリ」を選択
2. 以下の設定を入力：

```
説明: YOLUBE統合システム v3.4
次のユーザーとして実行: 自分（your-email@gmail.com）
アクセスできるユーザー: 全員
```

**重要**: 「アクセスできるユーザー」は**必ず「全員」**を選択してください。

### ステップ 3: デプロイを実行

1. 「デプロイ」ボタンをクリック
2. 初回の場合、権限の承認が求められます：
   - 「承認」をクリック
   - アカウントを選択
   - 「詳細」→「（プロジェクト名）に移動」をクリック
   - 「許可」をクリック

### ステップ 4: Web App URLを取得

デプロイ完了後、以下のような画面が表示されます：

```
デプロイID: AKfycby...
ウェブアプリURL: https://script.google.com/macros/s/AKfycby.../exec
```

**ウェブアプリURL**をコピーして保存してください。

このURLがAPIエンドポイントになります。

---

## 動作確認とテスト

### テスト 1: お問い合わせフォーム（既存システム）

既存のお問い合わせフォームが正常に動作することを確認します。

#### Webブラウザでテスト

以下のHTMLファイルを作成してテストします：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>お問い合わせフォームテスト</title>
</head>
<body>
  <h1>お問い合わせフォームテスト</h1>
  <form action="YOUR_WEB_APP_URL" method="POST">
    <input type="hidden" name="formType" value="home">
    <p>お名前: <input type="text" name="user_name" value="テスト太郎" required></p>
    <p>メールアドレス: <input type="email" name="user_email" value="test@example.com" required></p>
    <p>電話番号: <input type="tel" name="user_phone" value="090-1234-5678"></p>
    <p>お問い合わせ内容: <input type="text" name="inquiry_type" value="テスト"></p>
    <p>メッセージ: <textarea name="message">これはテストです</textarea></p>
    <button type="submit">送信</button>
  </form>
</body>
</html>
```

**`YOUR_WEB_APP_URL`** を実際のWeb App URLに置き換えてください。

#### 期待される結果

- ✅ 成功ページが表示される
- ✅ スプレッドシート（1Ejs0a...）の「home」シートにデータが保存される
- ✅ 自動返信メールが送信される
- ✅ 管理者にメール通知が送信される

### テスト 2: 予約システム（新規システム）

予約システムのAPIが正常に動作することを確認します。

#### Apps Scriptコンソールでテスト

1. Apps Scriptエディタで「実行」→「testReservationSystem」を選択
2. 実行ログを確認

```
=== Testing Reservation System ===
Validation: { valid: true }
Created reservation: { id: 1, eventId: 'TEST_001', ... }
Retrieved reservation: { id: 1, eventId: 'TEST_001', ... }
=== Test Complete ===
```

#### curlコマンドでテスト（予約作成）

```bash
curl -X POST "YOUR_WEB_APP_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "createReservation",
    "eventId": "TEST_001",
    "name": "テスト次郎",
    "email": "test@example.com",
    "companionCount": 2,
    "arrivalTime": "18:00",
    "desiredGame": "カタン",
    "notes": "テスト予約です"
  }'
```

#### 期待される結果

```json
{
  "success": true,
  "timestamp": "2025-10-06T12:00:00.000Z",
  "reservationId": 1,
  "message": "予約が完了しました",
  "data": {
    "id": 1,
    "eventId": "TEST_001",
    "name": "テスト次郎",
    "email": "test@example.com",
    "status": "confirmed"
  }
}
```

### テスト 3: イベント情報取得

```bash
curl "YOUR_WEB_APP_URL?action=getEventInfo&eventId=TEST_001"
```

#### 期待される結果

```json
{
  "success": true,
  "timestamp": "2025-10-06T12:00:00.000Z",
  "data": {
    "eventId": "TEST_001",
    "date": "",
    "venue": "",
    "venueAddress": "",
    "availableSlots": 50,
    "currentReservations": 1
  }
}
```

---

## トラブルシューティング

### 問題 1: デプロイ時に権限エラーが発生する

**原因**: 必要な権限が承認されていない

**解決方法**:
1. Apps Scriptエディタで「実行」→「doPost」を選択
2. 権限の承認を求められるので「承認」をクリック
3. 「詳細」→「（プロジェクト名）に移動」→「許可」

### 問題 2: Web App URLにアクセスしても何も表示されない

**原因**: GETリクエストに対するレスポンスが設定されていない

**解決方法**:
1. Web App URLにブラウザでアクセス
2. 「YOLUBE Integrated System v3.3 - Ready!」と表示されればOK

### 問題 3: POSTリクエストが失敗する

**原因1**: Content-Typeが正しく設定されていない

**解決方法**:
- HTMLフォームの場合: `enctype="application/x-www-form-urlencoded"` (デフォルト)
- JSONリクエストの場合: `Content-Type: application/json` ヘッダーを設定

**原因2**: CORSエラー

**解決方法**:
- 統合GASコードには既にCORS対応が含まれています
- `Access-Control-Allow-Origin: *` ヘッダーが設定されています

### 問題 4: メールが送信されない

**原因**: GmailApp.sendEmailの制限

**解決方法**:
1. Gmailの送信制限を確認（1日100通まで）
2. Apps Scriptの実行ログを確認
3. スクリプトの権限を再確認

### 問題 5: スプレッドシートにデータが保存されない

**原因**: スプレッドシートIDが間違っている

**解決方法**:
1. GASコード内のスプレッドシートIDを確認
2. スプレッドシートへのアクセス権限を確認
3. 実行ログでエラーメッセージを確認

---

## 次のステップ

デプロイが完了したら：

1. ✅ Web App URLを保存
2. ✅ すべてのAPIエンドポイントをテスト
3. ✅ フロントエンド（React）でWeb App URLを設定
4. ✅ Phase 2（フロントエンド実装）へ進む

---

## デプロイ完了チェックリスト

- [ ] 統合GASコードをApps Scriptにペースト完了
- [ ] プロジェクトを保存
- [ ] Web Appとしてデプロイ完了
- [ ] Web App URLを取得・保存
- [ ] お問い合わせフォーム（既存システム）のテスト成功
- [ ] 予約システム（新規システム）のテスト成功
- [ ] メール送信のテスト成功
- [ ] スプレッドシートへのデータ保存確認
- [ ] README.mdに Web App URL を記録

---

**デプロイ完了後、必ず README.md を更新してください。**

---

## v3.4 変更履歴

### 主な変更点（2025-10-07）

#### 1. 予約システムの修正
- **`handleGetAllReservations()`関数の改善**
  - 空行を除外する`.filter(row => row[COLUMNS.ID])`を追加
  - 各予約にイベント情報を自動付加（`reservation.eventInfo`）
  - 管理画面での予約表示が正常に動作するように修正

#### 2. 住所取得の動的化
- **`getVenueAddress()`関数の改善**
  - ハードコードされた住所マッピングを削除
  - Addressシート（B列: 施設名, C列: 住所）から動的に取得
  - より柔軟な会場管理が可能に

#### 3. フォーム成功ページの改善
- **`createSuccessPage()`関数の改善**
  - formTypeNames に `reservation: 'イベント参加予約'` を追加
  - `ke` フォームの表示名を「イベントに関するお問い合わせ」に変更
  - 予約フォーム専用の「今後の流れ」メッセージを追加
    - 「当日は受付にてユーザー名と予約した旨をお伝えください。」

#### 4. フロントエンド連携
- **ReservationForm.jsx の修正**
  - API呼び出しを `formType: 'reservation'` から `action: 'createReservation'` に変更
  - フィールド名を統一（user_name → name, companions_count → companionCount等）
  - イベント選択肢を3件から6件に拡大

- **新規ページの追加**
  - ReservationDetail.jsx: 予約詳細ページ
  - 各イベントの予約者一覧を表示
  - ルート: `/ke/reservations/:eventId`

### デプロイ後の確認項目

#### ✅ 必須テスト

1. **予約フォームテスト**
   - `/ke`ページで予約フォームを送信
   - 成功ページで「お問い合わせ内容: イベント参加予約」が表示されることを確認
   - 「当日は受付にてユーザー名と予約した旨をお伝えください。」が表示されることを確認

2. **管理画面テスト**
   - `/admin`ページで予約管理タブを開く
   - 予約一覧が正しく表示されることを確認
   - イベント情報（日付、会場等）が各予約に表示されることを確認

3. **予約詳細ページテスト**
   - `/ke`ページの予約状況セクションで「詳細を見る」ボタンをクリック
   - 予約者一覧が表示されることを確認
   - 予約者名、同行者数、遊びたいゲームが表示されることを確認

4. **住所取得テスト**
   - Apps Scriptで以下を実行:
   ```javascript
   function testAddressFetch() {
     Logger.log(getVenueAddress('秋田ベイパラダイス'));
   }
   ```
   - Addressシートからの住所が正しく取得されることを確認

### トラブルシューティング（v3.4固有）

#### 問題: 予約が管理画面に表示されない

**原因**: 古いバージョンのGASがデプロイされている

**解決方法**:
1. GAS_INTEGRATED.gs v3.4を再デプロイ
2. 759-780行目に以下のコードがあることを確認:
```javascript
const reservations = data
  .filter(row => row[COLUMNS.ID]) // この行が重要
  .map(row => {
    // ...
    const eventInfo = getEventInfoFromSchedule(reservation.eventId);
    reservation.eventInfo = eventInfo; // この行も重要
    return reservation;
  });
```

#### 問題: フォーム成功ページに「フォーム種別: reservation」と表示される

**原因**: formTypeNamesが古い

**解決方法**:
1. 1344-1349行目を確認:
```javascript
const formTypeNames = {
  home: 'ホームページ',
  ke: 'イベントに関するお問い合わせ',
  training: '研修お問い合わせ',
  reservation: 'イベント参加予約'  // この行があるか確認
};
```

#### 問題: 予約フォーム送信後、別のスプレッドシートに保存される

**原因**: フロントエンドが `formType: 'reservation'` を使用している

**解決方法**:
1. ReservationForm.jsx を確認
2. 159-162行目が以下になっているか確認:
```javascript
const submitData = {
  action: 'createReservation',  // formTypeではなくaction
  ...formData
};
```

### バージョン管理

| バージョン | リリース日 | 主な変更 |
|-----------|-----------|---------|
| v3.4 | 2025-10-07 | 予約システム修正、住所動的取得、フォームページ改善 |
| v3.3 | 以前 | 予約システム基本機能、管理画面API |

---

**v3.4 デプロイ完了後は、必ず上記の「必須テスト」をすべて実施してください。**
