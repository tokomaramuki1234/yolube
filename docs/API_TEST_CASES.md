# YOLUBE統合システム - APIテストケース

## 📋 目次

1. [テスト環境の準備](#テスト環境の準備)
2. [お問い合わせフォームAPI（既存システム）](#お問い合わせフォームapi既存システム)
3. [予約システムAPI（新規システム）](#予約システムapi新規システム)
4. [エラーケースのテスト](#エラーケースのテスト)
5. [統合テストシナリオ](#統合テストシナリオ)

---

## テスト環境の準備

### 必要な情報

```bash
# Web App URL（デプロイ時に取得）
export WEB_APP_URL="https://script.google.com/macros/s/AKfycby.../exec"

# テスト用メールアドレス
export TEST_EMAIL="test@example.com"
```

### テストツール

- **curl**: コマンドラインHTTPクライアント
- **Postman**: GUI HTTPクライアント（任意）
- **ブラウザ**: HTMLフォームのテスト用

---

## お問い合わせフォームAPI（既存システム）

既存のお問い合わせフォームシステムのテストケース（formTypeパラメータを使用）

### エンドポイント: doPost（formType: home）

#### テストケース 1: ホームページお問い合わせフォーム

**リクエスト**:
```bash
curl -X POST "${WEB_APP_URL}" \
  -d "formType=home" \
  -d "user_name=テスト太郎" \
  -d "user_email=${TEST_EMAIL}" \
  -d "user_phone=090-1234-5678" \
  -d "inquiry_type=サービスについて" \
  -d "message=これはテストメッセージです"
```

**期待される結果**:
- ✅ HTTP 200 OK
- ✅ HTML成功ページが返却される
- ✅ スプレッドシート（1Ejs0a...）の「home」シートにデータが保存される
- ✅ ユーザー宛に自動返信メールが送信される
- ✅ 管理者宛に通知メールが送信される

**確認項目**:
1. スプレッドシートの「home」シート最終行を確認
2. ${TEST_EMAIL} のメールボックスを確認（件名: 【YOLUBE】お問い合わせを承りました）
3. info@yolube.jp のメールボックスを確認（件名: 【HOME】新しいお問い合わせ - テスト太郎様）

---

### エンドポイント: doPost（formType: ke）

#### テストケース 2: Ke.イベント参加申し込みフォーム

**リクエスト**:
```bash
curl -X POST "${WEB_APP_URL}" \
  -d "formType=ke" \
  -d "user_name=テスト花子" \
  -d "user_email=${TEST_EMAIL}" \
  -d "user_phone=090-9876-5432" \
  -d "participation_date=2025-11-01" \
  -d "participation_count=初めて" \
  -d "message=楽しみにしています"
```

**期待される結果**:
- ✅ HTTP 200 OK
- ✅ HTML成功ページが返却される
- ✅ スプレッドシート（1Ejs0a...）の「ke」シートにデータが保存される
- ✅ 件名: 【YOLUBE】テーブルゲーム交流会：Ke.へのお申し込みを承りました

---

### エンドポイント: doPost（formType: training）

#### テストケース 3: 研修お問い合わせフォーム

**リクエスト**:
```bash
curl -X POST "${WEB_APP_URL}" \
  -d "formType=training" \
  -d "user_name=テスト次郎" \
  -d "user_email=${TEST_EMAIL}" \
  -d "company_name=株式会社テスト" \
  -d "message=研修について詳しく知りたいです"
```

**期待される結果**:
- ✅ HTTP 200 OK
- ✅ HTML成功ページが返却される
- ✅ スプレッドシート（1Ejs0a...）の「training」シートにデータが保存される
- ✅ 件名: 【YOLUBE】コミュニケーション研修へのお問い合わせを承りました

---

## 予約システムAPI（新規システム）

新規予約システムのテストケース（actionパラメータを使用）

### エンドポイント: POST /createReservation

#### テストケース 4: 予約作成（正常系）

**リクエスト**:
```bash
curl -X POST "${WEB_APP_URL}" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "createReservation",
    "eventId": "20251101_bay",
    "name": "山田太郎",
    "email": "'"${TEST_EMAIL}"'",
    "companionCount": 2,
    "arrivalTime": "18:00",
    "desiredGame": "カタン",
    "notes": "初めて参加します"
  }'
```

**期待されるレスポンス**:
```json
{
  "success": true,
  "timestamp": "2025-10-06T12:00:00.000Z",
  "reservationId": 1,
  "message": "予約が完了しました",
  "data": {
    "id": 1,
    "eventId": "20251101_bay",
    "name": "山田太郎",
    "email": "test@example.com",
    "status": "confirmed"
  }
}
```

**確認項目**:
1. スプレッドシート（14roOd...）の「reservations」シートに新規行が追加されている
2. ${TEST_EMAIL} に予約確認メールが届く（件名: 【YOLUBE】Ke.イベント予約完了のお知らせ）
3. info@yolube.jp に管理者通知メールが届く（件名: 【YOLUBE予約】新規予約受付 - 20251101_bay）

---

#### テストケース 5: 予約作成（最小限のデータ）

**リクエスト**:
```bash
curl -X POST "${WEB_APP_URL}" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "createReservation",
    "eventId": "20251102_kadowaki",
    "name": "佐藤花子",
    "email": "'"${TEST_EMAIL}"'"
  }'
```

**期待されるレスポンス**:
```json
{
  "success": true,
  "timestamp": "2025-10-06T12:00:00.000Z",
  "reservationId": 2,
  "message": "予約が完了しました",
  "data": {
    "id": 2,
    "eventId": "20251102_kadowaki",
    "name": "佐藤花子",
    "email": "test@example.com",
    "status": "confirmed"
  }
}
```

**確認項目**:
- companionCount: 0（デフォルト値）
- arrivalTime: ''（空文字）
- desiredGame: ''（空文字）
- notes: ''（空文字）

---

### エンドポイント: GET /getReservations

#### テストケース 6: イベントIDで予約一覧を取得

**リクエスト**:
```bash
curl "${WEB_APP_URL}?action=getReservations&eventId=20251101_bay"
```

**期待されるレスポンス**:
```json
{
  "success": true,
  "timestamp": "2025-10-06T12:00:00.000Z",
  "count": 1,
  "data": [
    {
      "id": 1,
      "eventId": "20251101_bay",
      "name": "山田太郎",
      "email": "test@example.com",
      "companionCount": 2,
      "arrivalTime": "18:00",
      "desiredGame": "カタン",
      "notes": "初めて参加します",
      "reservationDate": "2025-10-06 12:00:00",
      "status": "confirmed"
    }
  ]
}
```

**確認項目**:
- ✅ count が正しい数値である
- ✅ data 配列に予約データが含まれている
- ✅ status が "confirmed" の予約のみ返される

---

### エンドポイント: GET /getReservation

#### テストケース 7: 予約IDで詳細を取得

**リクエスト**:
```bash
curl "${WEB_APP_URL}?action=getReservation&id=1"
```

**期待されるレスポンス**:
```json
{
  "success": true,
  "timestamp": "2025-10-06T12:00:00.000Z",
  "data": {
    "id": 1,
    "eventId": "20251101_bay",
    "name": "山田太郎",
    "email": "test@example.com",
    "companionCount": 2,
    "arrivalTime": "18:00",
    "desiredGame": "カタン",
    "notes": "初めて参加します",
    "reservationDate": "2025-10-06 12:00:00",
    "status": "confirmed"
  }
}
```

---

### エンドポイント: POST /cancelReservation

#### テストケース 8: 予約キャンセル（正常系）

**リクエスト**:
```bash
curl -X POST "${WEB_APP_URL}" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "cancelReservation",
    "id": 1,
    "email": "'"${TEST_EMAIL}"'"
  }'
```

**期待されるレスポンス**:
```json
{
  "success": true,
  "timestamp": "2025-10-06T12:00:00.000Z",
  "message": "予約がキャンセルされました",
  "data": {
    "id": 1,
    "status": "cancelled"
  }
}
```

**確認項目**:
1. スプレッドシートの該当行の「ステータス」列が "cancelled" に変更されている
2. ${TEST_EMAIL} にキャンセル完了メールが届く（件名: 【YOLUBE】Ke.イベント予約キャンセル完了）

---

### エンドポイント: GET /getEventInfo

#### テストケース 9: イベント情報取得

**リクエスト**:
```bash
curl "${WEB_APP_URL}?action=getEventInfo&eventId=20251101_bay"
```

**期待されるレスポンス**:
```json
{
  "success": true,
  "timestamp": "2025-10-06T12:00:00.000Z",
  "data": {
    "eventId": "20251101_bay",
    "date": "2025-11-01",
    "venue": "秋田ベイパラダイス",
    "venueAddress": "秋田県秋田市土崎港西1-10-45",
    "availableSlots": 50,
    "currentReservations": 1
  }
}
```

**注意**:
- イベントIDがスケジュールシートに存在しない場合、date/venue/venueAddressは空文字になります

---

## エラーケースのテスト

### エラーケース 1: 必須パラメータ不足（お問い合わせフォーム）

**リクエスト**:
```bash
curl -X POST "${WEB_APP_URL}" \
  -d "formType=home" \
  -d "user_name=テスト太郎"
  # user_emailが不足
```

**期待されるレスポンス**:
- ✅ HTML エラーページ
- ✅ エラーメッセージ: "お名前とメールアドレスは必須です"

---

### エラーケース 2: 無効なformType

**リクエスト**:
```bash
curl -X POST "${WEB_APP_URL}" \
  -d "formType=invalid" \
  -d "user_name=テスト太郎" \
  -d "user_email=${TEST_EMAIL}"
```

**期待されるレスポンス**:
- ✅ HTML エラーページ
- ✅ エラーメッセージ: "フォーム種別が無効です"

---

### エラーケース 3: 必須パラメータ不足（予約システム）

**リクエスト**:
```bash
curl -X POST "${WEB_APP_URL}" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "createReservation",
    "eventId": "20251101_bay",
    "name": "山田太郎"
    // emailが不足
  }'
```

**期待されるレスポンス**:
```json
{
  "success": false,
  "timestamp": "2025-10-06T12:00:00.000Z",
  "error": "eventId, name, emailは必須です"
}
```

---

### エラーケース 4: 無効なメールアドレス形式

**リクエスト**:
```bash
curl -X POST "${WEB_APP_URL}" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "createReservation",
    "eventId": "20251101_bay",
    "name": "山田太郎",
    "email": "invalid-email"
  }'
```

**期待されるレスポンス**:
```json
{
  "success": false,
  "timestamp": "2025-10-06T12:00:00.000Z",
  "error": "メールアドレスの形式が正しくありません"
}
```

---

### エラーケース 5: 同行者数の範囲外

**リクエスト**:
```bash
curl -X POST "${WEB_APP_URL}" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "createReservation",
    "eventId": "20251101_bay",
    "name": "山田太郎",
    "email": "'"${TEST_EMAIL}"'",
    "companionCount": 15
  }'
```

**期待されるレスポンス**:
```json
{
  "success": false,
  "timestamp": "2025-10-06T12:00:00.000Z",
  "error": "同行者数は0〜10の範囲で指定してください"
}
```

---

### エラーケース 6: 無効な時刻形式

**リクエスト**:
```bash
curl -X POST "${WEB_APP_URL}" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "createReservation",
    "eventId": "20251101_bay",
    "name": "山田太郎",
    "email": "'"${TEST_EMAIL}"'",
    "arrivalTime": "25:00"
  }'
```

**期待されるレスポンス**:
```json
{
  "success": false,
  "timestamp": "2025-10-06T12:00:00.000Z",
  "error": "来場予定時刻はHH:MM形式で指定してください"
}
```

---

### エラーケース 7: 予約キャンセル時のメールアドレス不一致

**リクエスト**:
```bash
curl -X POST "${WEB_APP_URL}" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "cancelReservation",
    "id": 1,
    "email": "wrong@example.com"
  }'
```

**期待されるレスポンス**:
```json
{
  "success": false,
  "timestamp": "2025-10-06T12:00:00.000Z",
  "error": "メールアドレスが一致しません"
}
```

---

### エラーケース 8: 存在しない予約ID

**リクエスト**:
```bash
curl "${WEB_APP_URL}?action=getReservation&id=99999"
```

**期待されるレスポンス**:
```json
{
  "success": false,
  "timestamp": "2025-10-06T12:00:00.000Z",
  "error": "予約が見つかりません"
}
```

---

### エラーケース 9: 無効なアクション

**リクエスト**:
```bash
curl -X POST "${WEB_APP_URL}" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "invalidAction"
  }'
```

**期待されるレスポンス**:
```json
{
  "success": false,
  "timestamp": "2025-10-06T12:00:00.000Z",
  "error": "Invalid action or missing parameters"
}
```

---

## 統合テストシナリオ

### シナリオ 1: イベント予約の完全フロー

1. **イベント情報を取得**
   ```bash
   curl "${WEB_APP_URL}?action=getEventInfo&eventId=20251101_bay"
   ```

2. **予約を作成**
   ```bash
   curl -X POST "${WEB_APP_URL}" \
     -H "Content-Type: application/json" \
     -d '{
       "action": "createReservation",
       "eventId": "20251101_bay",
       "name": "統合テスト",
       "email": "'"${TEST_EMAIL}"'",
       "companionCount": 1,
       "arrivalTime": "18:30"
     }'
   ```

3. **予約一覧を取得して確認**
   ```bash
   curl "${WEB_APP_URL}?action=getReservations&eventId=20251101_bay"
   ```

4. **予約詳細を取得（IDは手順2のレスポンスから取得）**
   ```bash
   curl "${WEB_APP_URL}?action=getReservation&id=1"
   ```

5. **予約をキャンセル**
   ```bash
   curl -X POST "${WEB_APP_URL}" \
     -H "Content-Type: application/json" \
     -d '{
       "action": "cancelReservation",
       "id": 1,
       "email": "'"${TEST_EMAIL}"'"
     }'
   ```

6. **予約一覧を再取得（キャンセル後は0件になる）**
   ```bash
   curl "${WEB_APP_URL}?action=getReservations&eventId=20251101_bay"
   ```

---

### シナリオ 2: 既存システムと新規システムの混在テスト

1. **お問い合わせフォームを送信（既存システム）**
   ```bash
   curl -X POST "${WEB_APP_URL}" \
     -d "formType=ke" \
     -d "user_name=混在テスト" \
     -d "user_email=${TEST_EMAIL}" \
     -d "participation_date=2025-11-01"
   ```

2. **予約を作成（新規システム）**
   ```bash
   curl -X POST "${WEB_APP_URL}" \
     -H "Content-Type: application/json" \
     -d '{
       "action": "createReservation",
       "eventId": "20251101_bay",
       "name": "混在テスト2",
       "email": "'"${TEST_EMAIL}"'"
     }'
   ```

3. **両方のデータが正しく保存されているか確認**
   - スプレッドシート（1Ejs0a...）の「ke」シートを確認
   - スプレッドシート（14roOd...）の「reservations」シートを確認

---

## テスト実行チェックリスト

### お問い合わせフォームAPI（既存システム）
- [ ] formType=home のテスト成功
- [ ] formType=ke のテスト成功
- [ ] formType=training のテスト成功
- [ ] 無効なformTypeのエラーハンドリング確認
- [ ] 必須パラメータ不足のエラーハンドリング確認

### 予約システムAPI（新規システム）
- [ ] createReservation（正常系）のテスト成功
- [ ] createReservation（最小限データ）のテスト成功
- [ ] getReservations のテスト成功
- [ ] getReservation のテスト成功
- [ ] cancelReservation のテスト成功
- [ ] getEventInfo のテスト成功

### エラーケース
- [ ] 必須パラメータ不足のエラー確認
- [ ] 無効なメールアドレスのエラー確認
- [ ] 同行者数範囲外のエラー確認
- [ ] 無効な時刻形式のエラー確認
- [ ] キャンセル時のメール不一致エラー確認
- [ ] 存在しない予約IDのエラー確認
- [ ] 無効なアクションのエラー確認

### メール送信
- [ ] 予約確認メール受信確認
- [ ] 管理者通知メール受信確認
- [ ] キャンセルメール受信確認
- [ ] お問い合わせ自動返信メール受信確認

### データ保存
- [ ] お問い合わせデータの保存確認（1Ejs0a...）
- [ ] 予約データの保存確認（14roOd...）
- [ ] キャンセル後のステータス更新確認

---

**すべてのテストケースが成功したら、Phase 1は完了です！**
