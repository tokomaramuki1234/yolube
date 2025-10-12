# YOLUBE統合システム - GAS_INTEGRATED.gs 詳細ドキュメント

## 📋 目次
- [概要](#概要)
- [システム構成](#システム構成)
- [定数定義](#定数定義)
- [メインハンドラー](#メインハンドラー)
- [お問い合わせフォームシステム](#お問い合わせフォームシステム)
- [予約システム](#予約システム)
- [管理機能](#管理機能)
- [ユーティリティ関数](#ユーティリティ関数)
- [テスト関数](#テスト関数)

---

## 概要

### バージョン情報
- **統合バージョン**: v3.4
- **統合日**: 2025-10-06
- **総行数**: 1,638行
- **関数数**: 37個

### 統合内容

#### 1. 既存お問い合わせフォームシステム (v2.2)
- **パラメータ**: `formType` (home/ke/training/reservation)
- **スプレッドシートID**: `1Ejs0annRLCGiV0dSTVGwm-1oDWbPHv65s1xLeWyRen8`
- **レスポンス形式**: HTML（成功/エラーページ）

#### 2. 予約システム (Phase 1-4)
- **パラメータ**: `action` (createReservation/getReservations/getReservationStats等)
- **スプレッドシートID**: `14roOdnMm4kdnL64OWkXdgMJ_qSampUuzr-tvEGeGhb4`
- **レスポンス形式**: JSON

### 更新履歴
| バージョン | 日付 | 内容 |
|-----------|------|------|
| v3.4 | 2025-10-06 | Phase 4 - 管理用API追加 (getAllReservations, getAdminStats), setHeaderエラー修正, Addressシート連携 |
| v3.3 | 2025-10-06 | F列（定員）を参照するように変更（固定値50から動的取得へ） |
| v3.2 | 2025-10-06 | Phase 3 - 予約統計取得API追加 (getReservationStats) |
| v3.1 | 2025-10-06 | Phase 2 - formType='reservation'対応 |
| v3.0 | 2025-10-06 | 統合システム初版 |

---

## システム構成

### 使用スプレッドシート

#### 1. お問い合わせデータシート
- **スプレッドシートID**: `1Ejs0annRLCGiV0dSTVGwm-1oDWbPHv65s1xLeWyRen8`
- **URL**: https://docs.google.com/spreadsheets/d/1Ejs0annRLCGiV0dSTVGwm-1oDWbPHv65s1xLeWyRen8/edit
- **シート構成**:
  - `home` - ホームページお問い合わせ
  - `ke` - Ke.イベント参加申し込み
  - `training` - 研修お問い合わせ
  - `reservation` - 予約データ（v3.1以降）

#### 2. イベントスケジュール・予約管理シート
- **スプレッドシートID**: `14roOdnMm4kdnL64OWkXdgMJ_qSampUuzr-tvEGeGhb4`
- **シート構成**:
  - `YOLUBE Event Schedule` - イベント日程・会場情報
  - `reservations` - 予約データ（Phase 1で自動作成）
  - `Address` - 会場住所マスタ（v3.4で追加連携）

### データ構造

#### イベントスケジュールシート構造
| 列 | 項目 | 例 |
|----|------|-----|
| A | 日付 | 2025年10月19日(日) |
| B | 時間 | 09:30-15:30 |
| C | 会場名 | 秋田市河辺市民サービスセンター |
| D | イベント名 | 河辺まるごと祭り＋ |
| E | イベントID（回数） | Vol-058 |
| F | 定員 | 50 |

**注**: ヘッダー3行（4行目からデータ開始）

#### Addressシート構造（v3.4追加）
| 列 | 項目 | 例 |
|----|------|-----|
| B | 施設名 | 秋田ベイパラダイス |
| C | 住所 | 秋田県秋田市土崎港西1-10-45 |
| D | Google Map URL | https://maps.google.com/... |

#### 予約データシート構造
| 列インデックス | 項目 | 説明 |
|--------------|------|------|
| 0 | ID | 予約ID（例: RSV_20251006_001） |
| 1 | EVENT_ID | イベントID（E列の値） |
| 2 | NAME | 予約者名 |
| 3 | EMAIL | メールアドレス |
| 4 | COMPANION_COUNT | 同行者数 |
| 5 | ARRIVAL_TIME | 到着予定時刻 |
| 6 | DESIRED_GAME | 遊びたいゲーム |
| 7 | NOTES | 特記事項 |
| 8 | RESERVATION_DATE | 予約日時 |
| 9 | STATUS | ステータス（active/cancelled） |

---

## 定数定義

### お問い合わせフォームシステム用
```javascript
const CONTACT_SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/1Ejs0annRLCGiV0dSTVGwm-1oDWbPHv65s1xLeWyRen8/edit?usp=sharing';
const COMPANY_EMAIL = 'info@yolube.jp';
const COMPANY_NAME = 'YOLUBE';
```

### 予約システム用
```javascript
const RESERVATION_SPREADSHEET_ID = '14roOdnMm4kdnL64OWkXdgMJ_qSampUuzr-tvEGeGhb4';
const RESERVATIONS_SHEET_NAME = 'reservations';
const SCHEDULE_SHEET_NAME = 'YOLUBE Event Schedule';
```

### 列インデックス（予約システム用）
```javascript
const COLUMNS = {
  ID: 0,
  EVENT_ID: 1,
  NAME: 2,
  EMAIL: 3,
  COMPANION_COUNT: 4,
  ARRIVAL_TIME: 5,
  DESIRED_GAME: 6,
  NOTES: 7,
  RESERVATION_DATE: 8,
  STATUS: 9
};
```

---

## メインハンドラー

### doGet(e)
**機能**: GETリクエストを処理するメインハンドラー

**処理フロー**:
1. リクエストパラメータから`action`を取得
2. `action`に応じて適切なハンドラーを呼び出し
3. デフォルトレスポンス（バージョン情報）を返却

**対応action**:
| action | 呼び出しハンドラー | 説明 |
|--------|------------------|------|
| `getReservations` | handleGetReservations | イベントの予約一覧取得 |
| `getReservation` | handleGetReservation | 予約詳細取得 |
| `getEventInfo` | handleGetEventInfo | イベント情報取得 |
| `getReservationStats` | handleGetReservationStats | 予約状況統計取得 |
| `getAllReservations` | handleGetAllReservations | 全予約データ取得（管理者用） |
| `getAdminStats` | handleGetAdminStats | 管理統計取得 |

**デフォルトレスポンス**:
```
YOLUBE Integrated System v3.4 - Ready!
```

---

### doPost(e)
**機能**: POSTリクエストを処理するメインハンドラー

**処理フロー**:
1. リクエストパラメータから`formType`と`action`を取得
2. `action`がある場合 → 予約システム処理
3. `formType`がある場合 → お問い合わせフォーム処理

**対応action**:
| action | 呼び出しハンドラー | 説明 |
|--------|------------------|------|
| `createReservation` | handleCreateReservation | 予約作成 |
| `cancelReservation` | handleCancelReservation | 予約キャンセル |

**対応formType**:
| formType | 呼び出しハンドラー | 説明 |
|----------|------------------|------|
| `home` | handleContactForm | ホームページお問い合わせ |
| `ke` | handleContactForm | Ke.イベント申込 |
| `training` | handleContactForm | 研修お問い合わせ |
| `reservation` | handleContactForm | 予約フォーム（v3.1追加） |

---

## お問い合わせフォームシステム

### handleContactForm(e)
**機能**: お問い合わせフォームのデータを処理

**パラメータ**:
- `formType`: フォーム種別 (home/ke/training/reservation)
- `user_name`: ユーザー名
- `user_email`: メールアドレス
- その他フォーム種別ごとの固有項目

**処理フロー**:
1. フォームデータの取得・検証
2. スプレッドシートへの保存
3. 自動返信メール送信
4. 管理者通知メール送信
5. 成功/エラーページの表示

**レスポンス**: HTML（成功ページまたはエラーページ）

---

### saveToSpreadsheet(formData)
**機能**: フォームデータをスプレッドシートに保存

**処理内容**:
1. スプレッドシートを開く
2. フォーム種別に応じたシートを取得または作成
3. ヘッダー行のセットアップ
4. データ行の追加

**formType別のデータ構造**:

#### home（ホームページお問い合わせ）
| 列 | 項目 |
|----|------|
| A | タイムスタンプ |
| B | 名前 |
| C | メールアドレス |
| D | 電話番号 |
| E | お問い合わせ種別 |
| F | メッセージ |

#### ke（Ke.イベント申込）
| 列 | 項目 |
|----|------|
| A | タイムスタンプ |
| B | 名前 |
| C | メールアドレス |
| D | 電話番号 |
| E | 参加希望日 |
| F | 参加回数 |
| G | メッセージ |

#### training（研修お問い合わせ）
| 列 | 項目 |
|----|------|
| A | タイムスタンプ |
| B | 名前 |
| C | メールアドレス |
| D | 会社名・団体名 |
| E | メッセージ |

#### reservation（予約フォーム）
| 列 | 項目 |
|----|------|
| A | タイムスタンプ |
| B | 名前 |
| C | メールアドレス |
| D | イベントID |
| E | 同行者数 |
| F | 到着予定時刻 |
| G | 遊びたいゲーム |
| H | 特記事項 |

**戻り値**: `{ success: true/false, message: string }`

---

### getOrCreateSheet(spreadsheet, formType)
**機能**: 指定されたシートを取得、存在しない場合は新規作成

**処理**:
1. シート名がformTypeと一致するシートを検索
2. 存在しない場合は新規シート作成
3. シートヘッダーをセットアップ

**戻り値**: Sheetオブジェクト

---

### setupSheetHeaders(sheet, formType)
**機能**: フォーム種別に応じたヘッダー行をセットアップ

**ヘッダー構成**:
- **共通**: タイムスタンプ、名前、メールアドレス
- **home**: 電話番号、お問い合わせ種別、メッセージ
- **ke**: 電話番号、参加希望日、参加回数、メッセージ
- **training**: 会社名・団体名、メッセージ
- **reservation**: イベントID、同行者数、到着予定時刻、遊びたいゲーム、特記事項

**スタイリング**:
- 背景色: #4A90E2
- フォント色: 白
- フォントウェイト: Bold

---

### createDataRow(formData)
**機能**: フォームデータから行データ配列を生成

**共通データ**:
- タイムスタンプ（現在時刻）
- ユーザー名
- メールアドレス

**formType別の追加データ**: setupSheetHeadersと同じ構成

**戻り値**: Array（スプレッドシートの行データ）

---

### sendAutoReply(formData)
**機能**: 申込者への自動返信メールを送信

**メール構成**:
- **送信元**: GASアカウント（txgame.akita@gmail.com）
- **返信先**: info@yolube.jp（replyToで設定）
- **件名**: フォーム種別に応じた件名
- **本文**: HTML形式、フォーム種別に応じた内容

**件名一覧**:
| formType | 件名 |
|----------|------|
| home | 【YOLUBE】お問い合わせありがとうございます |
| ke | 【YOLUBE】Ke.イベント参加申し込みを受け付けました |
| training | 【YOLUBE】研修お問い合わせを受け付けました |
| reservation | 【YOLUBE】Ke.イベント予約完了のお知らせ |

**エラー処理**: メール送信失敗時はログに記録、処理は継続

---

### sendAdminNotification(formData)
**機能**: 管理者への通知メールを送信

**メール構成**:
- **宛先**: info@yolube.jp
- **返信先**: 申込者のメールアドレス
- **件名**: `【新規${formTypeName}】${user_name}様`
- **本文**: 申込者情報とフォームデータ

**通知内容**:
- 申込種別
- 申込者情報（名前、メール、電話など）
- フォーム固有データ
- Google Sheetsへのリンク

---

### createSuccessPage(formData, emailSent)
**機能**: フォーム送信成功ページのHTMLを生成

**ページ構成**:
- ✅ 成功アイコン
- フォーム種別に応じたメッセージ
- メール送信状況の表示
- ホームページへの戻るボタン
- 5秒後の自動リダイレクト

**デザイン**:
- レスポンシブデザイン
- グラデーション背景
- カードスタイルのコンテナ
- プライマリカラー: #8BC780

---

### createErrorPage(errorMessage)
**機能**: エラーページのHTMLを生成

**ページ構成**:
- ❌ エラーアイコン
- エラーメッセージ
- 戻るボタン

**デザイン**: createSuccessPageと同様のスタイル

---

## 予約システム

### handleCreateReservation(e)
**機能**: 新規予約を作成

**リクエストパラメータ**:
```json
{
  "action": "createReservation",
  "eventId": "Vol-058",
  "name": "山田太郎",
  "email": "example@example.com",
  "companionCount": 2,
  "arrivalTime": "18:00",
  "desiredGame": "カタン",
  "notes": "初参加です"
}
```

**処理フロー**:
1. リクエストデータの取得
2. バリデーション
3. 予約データの作成
4. スプレッドシートへの保存
5. 確認メール送信
6. 管理者通知メール送信

**レスポンス**:
```json
{
  "success": true,
  "reservation": {
    "id": "RSV_20251006_001",
    "eventId": "Vol-058",
    "name": "山田太郎",
    "email": "example@example.com",
    "companionCount": 2,
    "arrivalTime": "18:00",
    "desiredGame": "カタン",
    "notes": "初参加です",
    "reservationDate": "2025-10-06T12:34:56.789Z",
    "status": "active"
  },
  "timestamp": "2025-10-06T12:34:56.789Z"
}
```

---

### handleGetReservations(e)
**機能**: 指定イベントの予約一覧を取得

**リクエストパラメータ**:
```
GET ?action=getReservations&eventId=Vol-058
```

**レスポンス**:
```json
{
  "success": true,
  "data": [
    {
      "id": "RSV_20251006_001",
      "eventId": "Vol-058",
      "name": "山田太郎",
      "email": "example@example.com",
      "companionCount": 2,
      "arrivalTime": "18:00",
      "desiredGame": "カタン",
      "notes": "初参加です",
      "reservationDate": "2025-10-06T12:34:56.789Z",
      "status": "active"
    }
  ],
  "timestamp": "2025-10-06T12:34:56.789Z"
}
```

---

### handleGetReservation(e)
**機能**: 予約詳細を取得

**リクエストパラメータ**:
```
GET ?action=getReservation&id=RSV_20251006_001
```

**レスポンス**:
```json
{
  "success": true,
  "data": {
    "id": "RSV_20251006_001",
    "eventId": "Vol-058",
    "name": "山田太郎",
    // ...その他の予約データ
  },
  "timestamp": "2025-10-06T12:34:56.789Z"
}
```

---

### handleCancelReservation(e)
**機能**: 予約をキャンセル

**リクエストパラメータ**:
```json
{
  "action": "cancelReservation",
  "id": "RSV_20251006_001",
  "email": "example@example.com"
}
```

**処理**:
1. 予約IDとメールアドレスの確認
2. ステータスを"cancelled"に更新
3. キャンセル通知メール送信

**レスポンス**:
```json
{
  "success": true,
  "message": "予約がキャンセルされました",
  "timestamp": "2025-10-06T12:34:56.789Z"
}
```

---

### handleGetEventInfo(e)
**機能**: イベント情報を取得

**リクエストパラメータ**:
```
GET ?action=getEventInfo&eventId=Vol-058
```

**処理**:
1. スケジュールシートからイベント情報取得
2. Addressシートから住所情報取得（v3.4）
3. 予約数のカウント

**レスポンス**:
```json
{
  "success": true,
  "data": {
    "eventId": "Vol-058",
    "date": "2025年10月19日(日)",
    "venue": "秋田市河辺市民サービスセンター",
    "venueAddress": "秋田県秋田市河辺...",
    "availableSlots": 50,
    "currentReservations": 15
  },
  "timestamp": "2025-10-06T12:34:56.789Z"
}
```

---

### handleGetReservationStats(e)
**機能**: 予約統計情報を取得（Phase 3で追加）

**リクエストパラメータ**:
```
GET ?action=getReservationStats
```

**処理**:
1. スケジュールシートから全イベントを取得
2. 過去イベントのフィルタリング（22時基準）
3. 各イベントの予約数カウント
4. 予約率の計算
5. 直近6件に制限
6. 日付でソート

**22時切り替えロジック**:
- **22時未満**: 今日0:00以降のイベントを表示
- **22時以降**: 明日0:00以降のイベントを表示

**レスポンス**:
```json
{
  "success": true,
  "reservations": [
    {
      "event_info": "2025年10月19日(日)  09:30-15:30",
      "venue": "秋田市河辺市民サービスセンター  河辺まるごと祭り＋",
      "current_reservations": 15,
      "capacity": 50,
      "reservation_rate": 30,
      "event_date": "2025-10-19"
    }
  ],
  "last_updated": "2025-10-06 12:34:56",
  "timestamp": "2025-10-06T12:34:56.789Z"
}
```

**表示ルール**:
- **event_info**: A列（日付） + B列（時間）
- **venue**: C列（会場名） + D列（イベント名）
- **capacity**: F列（定員）
- **reservation_rate**: 予約数 ÷ 定員 × 100（小数点以下切り捨て）

---

## 管理機能

### handleGetAllReservations(e)
**機能**: 全予約データを取得（管理者用、Phase 4で追加）

**リクエストパラメータ**:
```
GET ?action=getAllReservations
```

**処理**:
1. reservationsシートから全データ取得
2. 各予約にイベント情報を付加
3. 予約日時でソート（降順）

**レスポンス**:
```json
{
  "success": true,
  "data": [
    {
      "id": "RSV_20251006_001",
      "eventId": "Vol-058",
      "name": "山田太郎",
      "email": "example@example.com",
      "companionCount": 2,
      "arrivalTime": "18:00",
      "desiredGame": "カタン",
      "notes": "初参加です",
      "reservationDate": "2025-10-06T12:34:56.789Z",
      "status": "active",
      "eventInfo": {
        "date": "2025年10月19日(日)",
        "venue": "秋田市河辺市民サービスセンター",
        "venueAddress": "秋田県秋田市河辺...",
        "availableSlots": 50
      }
    }
  ],
  "timestamp": "2025-10-06T12:34:56.789Z"
}
```

---

### handleGetAdminStats(e)
**機能**: 管理統計情報を取得（Phase 4で追加）

**リクエストパラメータ**:
```
GET ?action=getAdminStats
```

**処理**:
1. 全予約数カウント
2. 有効予約数カウント（status: active）
3. キャンセル数カウント（status: cancelled）
4. 今日の予約数カウント

**レスポンス**:
```json
{
  "success": true,
  "totalReservations": 150,
  "activeReservations": 135,
  "cancelledReservations": 15,
  "todayReservations": 5,
  "timestamp": "2025-10-06T12:34:56.789Z"
}
```

---

## ユーティリティ関数

### getReservationsSheet()
**機能**: reservationsシートを取得または作成

**処理**:
1. スプレッドシートを開く
2. reservationsシートを検索
3. 存在しない場合は新規作成
4. ヘッダー行をセットアップ

**ヘッダー構成**:
```
ID | イベントID | 名前 | メールアドレス | 同行者数 | 到着予定時刻 | 遊びたいゲーム | 特記事項 | 予約日時 | ステータス
```

**戻り値**: Sheetオブジェクト

---

### getNextReservationId()
**機能**: 次の予約IDを生成

**ID形式**: `RSV_YYYYMMDD_NNN`
- `RSV`: プレフィックス（Reservation）
- `YYYYMMDD`: 日付（例: 20251006）
- `NNN`: 連番（001-999）

**例**: `RSV_20251006_001`

**処理**:
1. 当日の予約を検索
2. 最大連番を取得
3. 1を加算してゼロパディング

**戻り値**: String（予約ID）

---

### createReservation(data)
**機能**: 予約データをスプレッドシートに保存

**パラメータ**:
```javascript
{
  eventId: "Vol-058",
  name: "山田太郎",
  email: "example@example.com",
  companionCount: 2,
  arrivalTime: "18:00",
  desiredGame: "カタン",
  notes: "初参加です"
}
```

**処理**:
1. 予約IDの生成
2. 予約オブジェクトの作成
3. スプレッドシートへの追加
4. 確認メール送信
5. 管理者通知送信

**戻り値**: 予約オブジェクト

---

### getReservations(eventId)
**機能**: イベントIDで予約一覧を取得

**処理**:
1. reservationsシートから全データ取得
2. eventIdでフィルタリング
3. status='active'のみ抽出

**戻り値**: Array（予約オブジェクトの配列）

---

### getReservation(id)
**機能**: 予約IDで予約詳細を取得

**処理**:
1. reservationsシートから全データ取得
2. IDで検索

**戻り値**: 予約オブジェクト（見つからない場合はnull）

---

### cancelReservation(id, email)
**機能**: 予約をキャンセル

**処理**:
1. 予約の存在確認
2. メールアドレスの照合
3. ステータスを'cancelled'に更新
4. キャンセル通知メール送信

**戻り値**: `{ success: true/false, message: string }`

---

### countReservationsByEvent(eventId)
**機能**: イベントの有効予約数をカウント

**処理**:
1. getReservations(eventId)を呼び出し
2. 配列の長さを返却

**戻り値**: Number（予約数）

---

### getEventInfoFromSchedule(eventId)
**機能**: スケジュールシートからイベント情報を取得

**処理**:
1. YOLUBE Event Scheduleシートを開く
2. E列（イベントID）で検索
3. 該当行から情報を抽出
4. getVenueAddress()で住所取得

**戻り値**:
```javascript
{
  date: "2025年10月19日(日)",
  venue: "秋田市河辺市民サービスセンター",
  venueAddress: "秋田県秋田市河辺...",
  availableSlots: 50
}
```

---

### getVenueAddress(venueName)
**機能**: 会場名から住所を取得（v3.4でAddressシート連携に変更）

**旧実装（v3.3以前）**: ハードコードされた住所マップ
```javascript
const addresses = {
  '秋田ベイパラダイス': '秋田県秋田市土崎港西1-10-45',
  // ...
};
```

**新実装（v3.4）**: Addressシートから動的取得
```javascript
1. Addressシートを開く
2. B列（施設名）で検索
3. C列（住所）を返却
```

**メリット**:
- 会場追加時にコード修正不要
- Google Sheets上で住所管理が可能
- メンテナンス性の向上

**戻り値**: String（住所、見つからない場合は空文字）

---

### validateReservationData(data)
**機能**: 予約データのバリデーション

**検証項目**:
- eventId: 必須
- name: 必須
- email: 必須、メール形式
- companionCount: 0以上の整数
- arrivalTime: 必須

**戻り値**:
```javascript
{
  valid: true/false,
  errors: [エラーメッセージの配列]
}
```

---

### sendReservationConfirmationEmail(reservation)
**機能**: 予約確認メールを送信

**メール構成**:
- **宛先**: 予約者のメールアドレス
- **返信先**: info@yolube.jp
- **件名**: 【YOLUBE】Ke.イベント予約完了のお知らせ
- **本文**: HTML形式

**メール内容**:
- 予約ID
- 予約者情報
- イベント情報（日時、会場、住所）
- 注意事項
- キャンセル方法

**HTML形式**: 表形式で見やすく整形

---

### sendReservationAdminNotification(reservation)
**機能**: 予約の管理者通知メールを送信

**メール構成**:
- **宛先**: info@yolube.jp
- **返信先**: 予約者のメールアドレス
- **件名**: 【新規予約】${予約者名}様 - ${イベントID}
- **本文**: 予約詳細とスプレッドシートリンク

---

### sendCancellationEmail(reservation)
**機能**: キャンセル通知メールを送信

**メール構成**:
- **宛先**: 予約者のメールアドレス
- **返信先**: info@yolube.jp
- **件名**: 【YOLUBE】予約キャンセル完了のお知らせ
- **本文**: HTML形式、キャンセルされた予約の詳細

---

### createJsonResponse(success, data, error)
**機能**: JSON形式のレスポンスを生成

**v3.4重要変更**: setHeader()削除
- **削除理由**: ContentService.setHeader()は存在しないメソッド
- **影響**: なし（CORSはdoGet/doPostレベルで処理）

**レスポンス構造**:
```javascript
// 成功時
{
  success: true,
  ...data,
  timestamp: "2025-10-06T12:34:56.789Z"
}

// エラー時
{
  success: false,
  error: "エラーメッセージ",
  timestamp: "2025-10-06T12:34:56.789Z"
}
```

**MIMEタイプ**: application/json

**戻り値**: ContentServiceのTextOutputオブジェクト

---

## テスト関数

### testContactForm()
**機能**: お問い合わせフォームシステムのテスト

**テストデータ**:
```javascript
{
  formType: 'home',
  user_name: 'テスト太郎',
  user_email: 'txgame.akita@gmail.com',
  user_phone: '090-1234-5678',
  inquiry_type: 'テスト',
  message: 'これはテストメッセージです。'
}
```

**テスト項目**:
1. スプレッドシートへの保存
2. メール送信（実際には送信しない）

**実行方法**: GASエディタで関数を選択して実行

**ログ出力**:
```
=== Testing Contact Form ===
Save result: { success: true, message: "..." }
Email test - would send to: txgame.akita@gmail.com
=== Test Complete ===
```

---

### testReservationSystem()
**機能**: 予約システムのテスト

**テストデータ**:
```javascript
{
  eventId: 'TEST_001',
  name: 'テスト次郎',
  email: 'test@example.com',
  companionCount: 2,
  arrivalTime: '18:00',
  desiredGame: 'カタン',
  notes: 'テスト予約です'
}
```

**テスト項目**:
1. バリデーション
2. 予約作成
3. 予約取得

**実行方法**: GASエディタで関数を選択して実行

**ログ出力**:
```
=== Testing Reservation System ===
Validation: { valid: true, errors: [] }
Created reservation: { id: "RSV_...", ... }
Retrieved reservation: { id: "RSV_...", ... }
=== Test Complete ===
```

---

## エラーハンドリング

### 共通エラー処理パターン

#### try-catch構造
全ての主要な関数でtry-catchを使用:
```javascript
try {
  // 処理
} catch (error) {
  Logger.log('Error in functionName: ' + error.toString());
  return createJsonResponse(false, null, error.toString());
}
```

#### バリデーションエラー
```json
{
  "success": false,
  "error": "バリデーションエラー",
  "message": "エラー詳細",
  "timestamp": "..."
}
```

#### データ未検出エラー
```json
{
  "success": false,
  "error": "予約が見つかりません",
  "timestamp": "..."
}
```

---

## パフォーマンス最適化

### スプレッドシート読み込み
- **一括読み込み**: getValues()で範囲を一度に取得
- **不要な列を除外**: 必要な列のみ取得

### データキャッシュ
- 同一リクエスト内でのスプレッドシート再読み込みを回避
- イベント情報は一度取得したら再利用

### メール送信の非同期性
- メール送信失敗時も処理を継続
- エラーログを記録して後から確認可能

---

## セキュリティ

### メールアドレス検証
- 予約キャンセル時にメールアドレスを照合
- 他人の予約を勝手にキャンセルできない仕組み

### 入力値検証
- validateReservationData()で全入力値を検証
- SQLインジェクション等の攻撃を防止（GASは自動的に防御）

### 権限管理
- スプレッドシートへのアクセスはGASアカウントの権限に依存
- 管理者機能（getAllReservations, getAdminStats）は認証なし（今後の拡張課題）

---

## 今後の拡張案

### Phase 5（将来）
1. **認証機能**: 管理者API用の認証
2. **予約編集機能**: 参加者情報の変更
3. **予約振替機能**: イベント間の振替
4. **統計レポート**: グラフ付き統計ダッシュボード
5. **通知機能強化**: LINE通知、Slack通知
6. **QRコード**: 予約確認用QRコード生成

---

## トラブルシューティング

### よくある問題

#### 1. メール送信エラー
**症状**: メールが送信されない
**原因**: Gmail APIの権限不足
**解決**: GASプロジェクトでGmail送信権限を再承認

#### 2. スプレッドシート読み込みエラー
**症状**: データが取得できない
**原因**: スプレッドシートIDの誤り、シート名の誤り
**解決**:
- スプレッドシートIDを確認
- シート名（YOLUBE Event Schedule, Address等）を確認

#### 3. 予約ID重複エラー
**症状**: 同じ予約IDが生成される
**原因**: getNextReservationId()の連番ロジックの問題
**解決**: reservationsシートのデータを確認、手動で連番を修正

#### 4. 住所が取得できない
**症状**: venueAddressが空文字
**原因**: Addressシートに該当施設がない、施設名が一致しない
**解決**:
- Addressシートに施設を追加
- 施設名の表記を完全一致させる（全角/半角、スペースに注意）

---

## バックアップ手順

### 事前準備

#### 必要なもの
- ✅ Googleアカウント（スプレッドシートへのアクセス権限があるアカウント）
- ✅ インターネット接続
- ✅ Chromeまたは他のモダンブラウザ

#### ⚠️ 重要な注意事項
**必ずシークレットモードで作業してください**

複数のGoogleアカウントでログインしていると、権限エラーやアクセス問題が発生する可能性があります。

### Apps Scriptエディタへのアクセス

#### ステップ 1: シークレットモードでブラウザを開く

**Chromeの場合**:
1. Chromeを開く
2. 右上の「︙」（3点メニュー）をクリック
3. 「新しいシークレット ウィンドウ」をクリック
   - または、キーボードショートカット: `Ctrl + Shift + N` (Windows) / `Cmd + Shift + N` (Mac)

#### ステップ 2: スプレッドシートを開く

以下のURLにアクセス：
```
https://docs.google.com/spreadsheets/d/14roOdnMm4kdnL64OWkXdgMJ_qSampUuzr-tvEGeGhb4/edit
```

#### ステップ 3: Apps Scriptエディタを開く

1. 画面上部のメニューバーから「拡張機能」→「Apps Script」をクリック
2. 新しいタブで Apps Script エディタが開きます

### コードのバックアップ

#### 方法1: すべてのコードを1つのファイルにコピー（推奨）

1. **新しいテキストファイルを作成**
   - デスクトップに新しいテキストファイルを作成
   - ファイル名を `GAS_BACKUP_YYYYMMDD.txt` に変更（日付を入れる）

2. **各ファイルのコードをコピー**
   - 左側パネルで各 `.gs` ファイルをクリック
   - 右側エディタで `Ctrl + A` → `Ctrl + C`
   - バックアップファイルに以下の形式でペースト：

```javascript
// ============================================
// ファイル名: コード.gs
// バックアップ日時: 2025-10-06
// ============================================

[ここにコードをペースト]

// ============================================
// ファイル終了: コード.gs
// ============================================
```

3. **バックアップファイルを保存**
   - メモ帳の「ファイル」→「上書き保存」（`Ctrl + S`）
   - 複数箇所に保存（デスクトップ、クラウドストレージ等）

### バックアップ確認チェックリスト

- [ ] すべての `.gs` ファイルがバックアップされている
- [ ] ファイル名に日付が含まれている
- [ ] ファイルサイズが 0KB より大きい
- [ ] テキストエディタでバックアップファイルを開いて、コードが正しく保存されていることを確認
- [ ] バックアップファイルを安全な場所（複数箇所）に保存

---

## デプロイ手順

### 事前準備

#### 必要なもの
- ✅ Googleアカウント（既存のGASプロジェクトへのアクセス権限）
- ✅ インターネット接続
- ✅ Chromeまたは他のモダンブラウザ
- ✅ 統合GASコードファイル: `GAS_INTEGRATED.gs`

#### バックアップ確認
デプロイ前に、既存GASコードのバックアップが存在することを確認してください。

### GASコードのデプロイ

#### ステップ 1: Apps Scriptプロジェクトを開く

**既存プロジェクトを使用する場合**:
1. シークレットモードでブラウザを開く（`Ctrl + Shift + N`）
2. Googleアカウントにログイン
3. Apps Scriptプロジェクトにアクセス
   - https://script.google.com から既存プロジェクトを選択
   - または Google Sheetsから「拡張機能」→「Apps Script」

**新規プロジェクトを作成する場合**:
1. https://script.google.com にアクセス
2. 左上の「新しいプロジェクト」をクリック
3. プロジェクト名を「YOLUBE統合システム v3.4」に変更

#### ステップ 2: 統合GASコードをコピー

1. `GAS_INTEGRATED.gs` ファイルを開く
2. すべてのコードを選択してコピー（`Ctrl + A` → `Ctrl + C`）

#### ステップ 3: Apps Scriptエディタにペースト

1. Apps Scriptエディタで既存のコードをすべて削除（`Ctrl + A` → `Delete`）
2. コピーした統合GASコードをペースト（`Ctrl + V`）
3. 保存（`Ctrl + S` または上部の「💾」アイコンをクリック）

#### ステップ 4: スプレッドシートIDの確認

統合GASコードでは2つのスプレッドシートを使用します：

```javascript
// お問い合わせフォームシステム用
const CONTACT_SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/1Ejs0annRLCGiV0dSTVGwm-1oDWbPHv65s1xLeWyRen8/edit?usp=sharing';

// 予約システム用
const RESERVATION_SPREADSHEET_ID = '14roOdnMm4kdnL64OWkXdgMJ_qSampUuzr-tvEGeGhb4';
```

これらの値が正しいことを確認してください。

### Web Appとしてデプロイ

#### ステップ 1: デプロイメニューを開く

1. Apps Scriptエディタの右上「デプロイ」ボタンをクリック
2. 「新しいデプロイ」を選択

#### ステップ 2: デプロイの種類を選択

1. 「種類の選択」で「ウェブアプリ」を選択
2. 以下の設定を入力：

```
説明: YOLUBE統合システム v3.4
次のユーザーとして実行: 自分（your-email@gmail.com）
アクセスできるユーザー: 全員
```

**重要**: 「アクセスできるユーザー」は**必ず「全員」**を選択してください。

#### ステップ 3: デプロイを実行

1. 「デプロイ」ボタンをクリック
2. 初回の場合、権限の承認が求められます：
   - 「承認」をクリック
   - アカウントを選択
   - 「詳細」→「（プロジェクト名）に移動」をクリック
   - 「許可」をクリック

#### ステップ 4: Web App URLを取得

デプロイ完了後、以下のような画面が表示されます：

```
デプロイID: AKfycby...
ウェブアプリURL: https://script.google.com/macros/s/AKfycby.../exec
```

**ウェブアプリURL**をコピーして保存してください。このURLがAPIエンドポイントになります。

### デプロイ後の動作確認

#### テスト 1: お問い合わせフォーム（既存システム）

Web App URLにブラウザでアクセス:
- 「YOLUBE Integrated System v3.4 - Ready!」と表示されればOK

#### テスト 2: 予約システム（新規システム）

Apps Scriptエディタで「実行」→「testReservationSystem」を選択して実行ログを確認：

```
=== Testing Reservation System ===
Validation: { valid: true }
Created reservation: { id: 1, eventId: 'TEST_001', ... }
Retrieved reservation: { id: 1, eventId: 'TEST_001', ... }
=== Test Complete ===
```

### デプロイ完了チェックリスト

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

#### 4. フロントエンド連携
- **ReservationForm.jsx の修正**
  - API呼び出しを `formType: 'reservation'` から `action: 'createReservation'` に変更
  - フィールド名を統一（user_name → name, companions_count → companionCount等）
  - イベント選択肢を3件から6件に拡大

### バージョン管理

| バージョン | リリース日 | 主な変更 |
|-----------|-----------|---------|
| v3.4 | 2025-10-07 | 予約システム修正、住所動的取得、フォームページ改善 |
| v3.3 | 2025-10-06 | F列（定員）を参照するように変更（固定値50から動的取得へ） |
| v3.2 | 2025-10-06 | Phase 3 - 予約統計取得API追加 (getReservationStats) |
| v3.1 | 2025-10-06 | Phase 2 - formType='reservation'対応 |
| v3.0 | 2025-10-06 | 統合システム初版 |

---

## 補足資料

### 関連ドキュメント
- `API_TEST_CASES.md`: APIテストケース
- `GTM_IMPLEMENTATION.md`: GTM実装ガイド
- `NEWS_IMPLEMENTATION_SUMMARY.md`: NEWS管理システム実装サマリー

### バックアップ推奨事項
- デスクトップにバックアップを保存
- 重要な変更前にバージョン番号を更新
- 変更履歴をヘッダーコメントに記録
- クラウドストレージにも保存（Google Drive, OneDrive等）

---

**最終更新日**: 2025-10-12
**ドキュメントバージョン**: 2.0
**対応GASバージョン**: v3.4
