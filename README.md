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
2. [重要な設定情報](#重要な設定情報)
3. [Google Apps Script統合システム](#google-apps-script統合システム)
4. [予約システムアーキテクチャ](#予約システムアーキテクチャ)
5. [ドキュメント一覧](#ドキュメント一覧)
6. [デザインシステム](#デザインシステム)
7. [トラブルシューティング](#トラブルシューティング)

---

## システム概要

### サイト構成

| URL | 説明 | 主要機能 |
|-----|------|---------|
| `/` | メインページ | ヒーロー、About、Services、実績、プロフィール、お問い合わせ |
| `/ke` | Ke.イベントページ | イベント紹介、予約状況、予約フォーム、ギャラリー |
| `/training` | 企業研修ページ | コミュニケーション研修のランディングページ |
| `/admin` | 管理画面 | 予約一覧、統計ダッシュボード（認証あり） |

### 技術スタック

- **フロントエンド**: React 18.2.0（SPA）
- **スタイル**: CSS3（カスタムプロパティ、グリッド、フレックスボックス）
- **バックエンド**: Google Apps Script（GAS）
- **データベース**: Google Sheets（2つのスプレッドシート）
- **デプロイ**: Vercel（GitHub連携自動デプロイ）
- **フォント**: Noto Sans JP（Google Fonts）
- **SEO/OGP**: react-helmet-async（動的メタタグ管理）

---

## 重要な設定情報

### 🔑 必須情報（AI作業時に必ず確認）

#### 1. スプレッドシート構成（2つのシート - 重要！）

**⚠️ 超重要**: データは2つの異なるスプレッドシートに分離保存されている

##### スプレッドシート #1: イベントスケジュール（公開）
- **スプレッドシートID**: `14roOdnMm4kdnL64OWkXdgMJ_qSampUuzr-tvEGeGhb4`
- **URL**: https://docs.google.com/spreadsheets/d/14roOdnMm4kdnL64OWkXdgMJ_qSampUuzr-tvEGeGhb4/edit
- **シート名**: `YOLUBE Event Schedule`
- **用途**: イベント日程・会場情報の管理（誰でも閲覧可能）
- **理由**: 第三者にYOLUBEのイベントスケジュールを知ってもらうため
- **列構成**:
  - A列: 日付（例: "2025年10月18日(土)"）
  - B列: 時間（例: "10:00-18:00"）
  - C列: 会場名（例: "秋田ベイパラダイス"）
  - D列: 備考欄（例: "テーブルゲーム交流会：Ke."）
  - E列: 開催回数（例: "Vol-064"）
  - F列: 定員（例: "50"）
  - ヘッダー: 3行（4行目からデータ開始）

##### スプレッドシート #2: 予約・お問い合わせデータ（非公開）
- **スプレッドシートID**: `1Ejs0annRLCGiV0dSTVGwm-1oDWbPHv65s1xLeWyRen8`
- **URL**: https://docs.google.com/spreadsheets/d/1Ejs0annRLCGiV0dSTVGwm-1oDWbPHv65s1xLeWyRen8/edit
- **用途**: 予約データ・お問い合わせデータの保存（管理者のみ閲覧可能）
- **理由**: 個人情報保護（個人情報保護の観点から非公開）
- **シート構成**:
  - `reservation` (gid=799375987): 予約データ（15列構成）
  - `home`: ホームページお問い合わせ
  - `ke`: Ke.イベント参加申し込み
  - `training`: 研修お問い合わせ

**⚠️ データ分離の理由**:
- **イベント情報**: 公開して多くの人に知ってもらう必要がある
- **予約情報**: 個人情報を含むため非公開にする必要がある
- この設計は意図的なものであり、変更してはならない

#### 2. 予約データの列構成（v3.15以降 - 超重要！）

**スプレッドシート #2の`reservation`シート**の列構成：

```
A列: 送信日時        例: '2025-10-07 12:34:56  (文字列 - 先頭にシングルクォート)
B列: 開催日          例: 2025年10月18日(土)
C列: 時間            例: 10:00-18:00
D列: 備考欄          例: テーブルゲーム交流会：Ke.
E列: 開催場所        例: 秋田ベイパラダイス
F列: 開催回数        例: Vol-064
G列: 定員            例: 50
H列: お名前          例: 木村 允
I列: メールアドレス  例: tokomaramuki@gmail.com
J列: 同行者数        例: 2
K列: 来場予定時刻    例: 14:00
L列: 遊びたいゲーム  例: カタン、モノポリー
M列: 特記事項        例: 車椅子利用
N列: ステータス      例: confirmed / cancelled
O列: ID              例: 1
```

**重要な変更履歴**:
- v3.15 (2025-10-07): イベント情報を個別列に分離（eventId → 6つの個別フィールド）
- v3.12 (2025-10-07): A列を文字列として保存（#NUM!エラー回避）

#### 3. GAS WebアプリURL（本番環境）

```
https://script.google.com/macros/s/AKfycbxZRZSDGyg_Z1rGcuD9xymlMXB4vV3Cz8EVTOWS2GvP-bLKeYcq7q122ixPQKV71Xg6iQ/exec
```

**現在のバージョン**: v3.25（2025年10月7日デプロイ）

**主要機能**:
- お問い合わせ処理（formType=home/ke/training）
- 予約作成（action=createReservation）
- 予約一覧取得（action=getAllReservations）
- 予約統計取得（action=getReservationStats）
- 管理統計取得（action=getAdminStats）
- 自動返信メール送信
- 管理者通知メール送信

#### 4. GAS作業時の注意事項

**⚠️ 超重要**: GAS作業時は必ず以下を遵守すること

1. **シークレットモードで作業**:
   - 単一のアカウント（txgame.akita@gmail.com）でのみGASへアクセス
   - 複数アカウントでの同時アクセスは権限エラーの原因となる

2. **デプロイ手順**:
   - 必ず「新バージョン」を作成してデプロイ
   - バージョン説明に変更内容を明記
   - デプロイ後、URLが変更されていないか確認

3. **バックアップ**:
   - デプロイ前に必ず現行バージョンをバックアップ
   - `cursor/docs/GAS_INTEGRATED.gs` は常に最新版を保持

---

## Google Apps Script統合システム

### GAS v3.22 - 最新バージョン（2025年10月7日）

#### アーキテクチャ概要

**デュアルパラメータシステム**:
- `formType` パラメータ: 既存お問い合わせシステム（home/ke/training/reservation）
- `action` パラメータ: 予約システムAPI（createReservation/getReservations等）

#### API エンドポイント一覧

##### お問い合わせシステム（formType）
```
POST ?formType=home          # ホームページお問い合わせ
POST ?formType=ke            # Ke.イベント参加申し込み
POST ?formType=training      # 研修お問い合わせ
```

##### 予約システム（action）
```
POST ?action=createReservation              # 予約作成
GET  ?action=getAllReservations             # 全予約取得（confirmed のみ）
GET  ?action=getReservations&eventId={id}   # イベント別予約取得
GET  ?action=getReservationStats            # 予約統計取得
GET  ?action=getAdminStats                  # 管理統計取得
```

#### 予約フォーム送信パラメータ（v3.14以降）

**重要**: 予約フォームは以下の個別パラメータで送信される

```javascript
{
  action: 'createReservation',
  eventdate: '2025年10月18日(土)',          // スケジュールシートA列
  eventtime: '10:00-18:00',                  // スケジュールシートB列
  eventname: 'テーブルゲーム交流会：Ke.',  // スケジュールシートD列
  eventarea: '秋田ベイパラダイス',          // スケジュールシートC列
  eventvol: 'Vol-064',                       // スケジュールシートE列
  eventcapacity: '50',                       // スケジュールシートF列
  name: '木村 允',
  email: 'tokomaramuki@gmail.com',
  companionCount: '2',
  arrivalTime: '14:00',
  desiredGame: 'カタン、モノポリー',
  notes: '車椅子利用'
}
```

#### レスポンス形式

**予約作成時**: HTML確認画面（v3.19以降）
```html
<!DOCTYPE html>
<html>
  <!-- 予約完了ページ -->
  <!-- テーブル形式で予約内容を表示 -->
</html>
```

**API取得時**: JSON形式
```json
{
  "success": true,
  "timestamp": "2025-10-07T12:34:56.789Z",
  "data": { /* データ */ }
}
```

#### メール機能

**自動返信メール**:
- 送信者: `txgame.akita@gmail.com`（Gmail アカウント）
- 返信先: `info@yolube.jp`（replyTo設定）
- 件名: 【YOLUBE】Ke.イベント予約完了のお知らせ
- 内容: 予約内容の詳細、イベント情報、注意事項

**管理者通知メール**:
- 宛先: `info@yolube.jp`
- 返信先: ユーザーのメールアドレス
- 件名: 【YOLUBE】新規予約通知
- 内容: 予約者情報、イベント情報

---

## 予約システムアーキテクチャ

### Phase 1-4 完了（2025年10月）

#### Phase 1: バックエンドAPI・データベース構築 ✅
- GAS統合システム v3.0作成
- 予約API 5エンドポイント実装
- スプレッドシート構造設計

#### Phase 2: 予約フォーム実装 ✅
- `ReservationForm.jsx` コンポーネント作成
- イベント自動取得（Google Sheets連携）
- HTMLフォーム送信（CORS回避）

#### Phase 3: 予約状況表示実装 ✅
- `ReservationStatus.jsx` コンポーネント作成
- リアルタイム予約状況表示
- 30秒間隔自動更新

#### Phase 4: UI/UX改善・デザイン統一 ✅
- 予約完了画面HTML化
- テーブル形式デザイン統一
- 管理画面実装

### 予約フォームの表示ロジック

**イベント選択肢の表示形式**:
```
[開催日] [備考欄][開催回数] [会場名]

例: 2025年10月18日(土) テーブルゲーム交流会：Ke.Vol-064 秋田ベイパラダイス
```

**デフォルト値**:
- 備考欄が空欄の場合: "テーブルゲーム交流会：Ke."

**表示件数**: 次の6件のイベント

**22時切り替え機能**:
- 22時未満: 今日のイベントを含める
- 22時以降: 明日以降のイベントのみ表示

### 管理画面

**URL**: `/admin`

**認証**: ベーシック認証（admin / yolube2025）

**機能**:
- ダッシュボード（統計カード、イベント別統計、最新予約）
- 予約一覧（検索、フィルタ、CSV出力、ページネーション）
- 予約詳細（イベント別の参加者一覧）

**データ取得**:
- `getAllReservations`: confirmed ステータスのみ取得（v3.17修正）
- `getAdminStats`: 全体統計、イベント別統計、最新5件

---

## SNSシェア機能（v3.25）

### 予約完了画面のSNSシェア

予約完了後、X（Twitter）とFacebookでイベント参加をシェアできる機能を実装。

**シェアテキスト例**:
```
テーブルゲーム交流会：Ke.Vol-064への参加予約をしました！🎲

📅 開催日時: 2025/10/18 10:00-20:00
📍 会場: 秋田ベイパラダイス
🕐 来場予定: 14:00

一緒に遊ぼう！！
#YOLUBE #Ke #ボードゲーム #テーブルゲーム
https://yolube.jp/ke
```

**実装詳細**:
- **X（Twitter）**: Web Intent URLを使用（`https://twitter.com/intent/tweet`）
- **Facebook**: シェアダイアログを使用（`https://www.facebook.com/sharer/sharer.php`）
- **Instagram**: Web APIなし（手動投稿推奨）

**関連ファイル**:
- `docs/GAS_INTEGRATED.gs`: `getTwitterShareUrl()`, `getFacebookShareUrl()` 関数
- `docs/GAS_INTEGRATED.gs`: `createReservationSuccessHtml()` でSNSボタン表示

---

## OGP（Open Graph Protocol）設定

### 各SNS用のOGP画像

**画像ファイル**:
```
public/images/
├── OGP_FB.jpg              # Facebook用（メインサイト）
├── OGP_X.jpg               # X (Twitter)用（メインサイト）
├── OGP_Instagram.jpg       # Instagram用（メインサイト）
├── OGP_ke_FB.jpg           # Facebook用（Ke.ページ）
├── OGP_ke_X.jpg            # X (Twitter)用（Ke.ページ）
└── OGP_ke_Instagram.jpg    # Instagram用（Ke.ページ）
```

**推奨サイズ**: 1200×630px（Facebook/X共通）

### メタタグ設定

**メインサイト（index.html）**:
```html
<meta property="og:image" content="https://yolube.jp/images/OGP_FB.jpg" />
<meta name="twitter:image" content="https://yolube.jp/images/OGP_X.jpg" />
```

**Ke.ページ（KeLPWeb3.js）**:
```jsx
<Helmet>
  <meta property="og:image" content="https://yolube.jp/images/OGP_ke_FB.jpg" />
  <meta name="twitter:image" content="https://yolube.jp/images/OGP_ke_X.jpg" />
</Helmet>
```

**react-helmet-async**:
- `App.js` で `<HelmetProvider>` を設定
- 各ページで `<Helmet>` コンポーネントを使用
- 動的にメタタグを変更可能

---

## 予約詳細ページ（/ke/reservations/:eventId）

### 機能

**URL**: `/ke/reservations/Vol-064`（イベントIDで指定）

**表示内容**:
- ページタイトル: `[開催日][イベント名]-予約者一覧`
  - 例: `[2025/10/18][テーブルゲーム交流会：Ke.]-予約者一覧`
- イベント概要（2段2列グリッドレイアウト）:
  - イベント名
  - 日時（日付 + 時間）
  - 会場
  - 予約数
- 予約者一覧テーブル:
  - 予約者名
  - 同行者数
  - 来場予定時刻
  - 遊びたいゲーム

**アクセス方法**:
- 予約状況セクションの「詳細を見る」ボタンをクリック
- 新しいタブで開く（`target="_blank"`）

**データ取得API**:
- `getReservations`: イベント別予約一覧取得
- `getEventInfo`: イベント情報取得（日時、会場、定員など）

**関連ファイル**:
- `src/components/ReservationDetail.jsx`
- `src/components/ReservationDetail.css`
- `docs/GAS_INTEGRATED.gs`: `getEventInfoFromSchedule()` 関数

---

## UI/UX改善履歴

### 「当日の流れ」セクション（2025-10-07）

**変更内容**:
- 全てのSTEP（1-4）を左側に統一配置
- アイコン削除（シンプルなレイアウトに変更）
- 背景色統一（`#f8f9fa`）

**変更前**:
- 偶数STEPが右側配置（`flex-direction: row-reverse`）
- 各STEPにFontAwesomeアイコン表示
- 偶数STEPは緑背景・白文字

**変更後**:
- 全STEP左側配置
- アイコンなし
- 全STEPグレー背景

**関連ファイル**:
- `src/pages/ke/KeLPWeb3.js`: `.ke-flow-icon` 削除
- `src/pages/ke/KeLP.css`: `.ke-flow-step:nth-child(even)` 削除

---

## ドキュメント一覧

### 📁 cursor/docs/ ディレクトリ

#### GASコードファイル

| ファイル名 | 説明 | 重要度 |
|-----------|------|--------|
| `GAS_INTEGRATED.gs` | **統合GASコード v3.25（本番稼働中）** - お問い合わせ + 予約システム + SNSシェア | ⭐⭐⭐⭐⭐ |
| `GAS_EXISTING_BACKUP.gs` | 既存GASコード v2.2のバックアップ（お問い合わせシステムのみ） | ⭐⭐⭐ |
| `GAS_RESERVATION_SYSTEM.gs` | 予約システム単体コード（Phase 1初期版、現在は未使用） | ⭐⭐ |

**AI作業時の注意**:
- **必ず `GAS_INTEGRATED.gs` を編集対象とすること**
- `GAS_EXISTING_BACKUP.gs` は参照のみ（編集禁止）
- `GAS_RESERVATION_SYSTEM.gs` は古いバージョン（参照のみ）

#### ドキュメントファイル

| ファイル名 | 説明 | いつ読むか |
|-----------|------|----------|
| `GAS_INTEGRATED_DOCUMENTATION.md` | GAS統合システムの完全ドキュメント（関数一覧、API仕様、データ構造） | GAS機能を理解する時 |
| `GAS_DEPLOYMENT_GUIDE.md` | GASデプロイ手順書（ステップバイステップ） | GASをデプロイする時 |
| `GAS_BACKUP_GUIDE.md` | GASコードバックアップ手順書 | GASを編集する前 |
| `API_TEST_CASES.md` | APIエンドポイントテストケース集 | GAS APIをテストする時 |
| `RESERVATION_SYSTEM_SETUP_GUIDE.md` | 予約システムセットアップガイド | 予約システムを初めてセットアップする時 |
| `RESERVATION_SYSTEM_PHASE1.md` | Phase 1設計書（データベース設計、API設計） | Phase 1の設計を理解する時 |
| `PHASE1_SUMMARY.md` | Phase 1完了報告（成果物、テスト結果） | Phase 1の成果を確認する時 |
| `PHASE2_SUMMARY.md` | Phase 2完了報告（予約フォーム実装） | Phase 2の成果を確認する時 |
| `PHASE3_SUMMARY.md` | Phase 3完了報告（予約状況表示実装） | Phase 3の成果を確認する時 |
| `PHASE4_SUMMARY.md` | Phase 4完了報告（UI/UX改善） | Phase 4の成果を確認する時 |

#### その他の重要ファイル

| ファイル名 | 場所 | 説明 |
|-----------|------|------|
| `GAS_CORS_Fixed_Complete.gs` | `public/` | 古いGASコードバックアップ（参照のみ） |

---

## デザインシステム

### カラーパレット

```css
--primary: #8BC780        /* メインブランドカラー（グリーン） */
--primary-dark: #6BA563   /* ダークグリーン */
--primary-light: #A5D59C  /* ライトグリーン */
--secondary: #FF6B6B      /* セカンダリカラー（レッド） */
--accent: #FFD93D         /* アクセントカラー（イエロー） */
```

### 予約完了画面の配色（v3.20-3.22）

```css
--reservation-bg: #3a3a3a           /* 予約内容エリア背景 */
--reservation-border: #ffffff       /* 予約内容エリアボーダー */
--reservation-text: #ffffff         /* 予約内容エリアテキスト */
--email-status-bg: #ffa9f0          /* 確認メールエリア背景 */
--email-status-text: #3a3a3a        /* 確認メールエリアテキスト */
--table-header-bg: #2e7d2e          /* テーブルヘッダー背景 */
```

### 🚫 使用禁止の装飾（重要！）

#### 削除済み装飾
- **border-left装飾**: `border-left: 4px solid #color` スタイルは使用しない
  - 理由: セクションの左側に縦線を引く装飾は、yolube.jpのデザイン方針に合わない
  - 代替: `border: 2px solid #ffffff` などの全周ボーダーを使用

**適用箇所**:
- 予約完了画面（GAS HTMLレスポンス）
- お問い合わせ完了画面（GAS HTMLレスポンス）
- その他すべてのHTMLページ

**実装日**: 2025年10月7日

### フォント

- **日本語**: Noto Sans JP（Google Fonts）
- **英語**: Helvetica Neue, Arial

### コンポーネント

- **game-card**: ボードゲーム風のカードデザイン
- **btn**: アニメーション付きボタン
- **section**: 統一されたセクションレイアウト
- **ke-***: Ke.ページ専用コンポーネントクラス

---

## トラブルシューティング

### 🚨 よくある問題と解決方法

#### 1. 予約データが管理画面に表示されない

**症状**: 予約フォームを送信したが、管理画面（/admin）に予約が表示されない

**原因**:
- GAS v3.17以前: `getAllReservations` が全データを返していた（confirmed + cancelled）
- 管理画面側でフィルタリングが正しく動作していなかった

**解決**: GAS v3.17で修正済み（`getAllReservations` で confirmed のみ返す）

#### 2. 予約IDがnullになる

**症状**: 予約完了画面で「予約ID: #null」と表示される

**原因**: `getNextReservationId()` が ##NUM! などの無効な値を読み取って NaN を返していた

**解決**: GAS v3.18で修正済み（無効な値を無視して最大ID+1を返す）

#### 3. 予約フォーム送信後にJSONが表示される

**症状**: 予約フォーム送信後、HTML確認画面ではなくJSON形式のレスポンスが表示される

**原因**: `handleCreateReservation` が JSON レスポンスを返していた

**解決**: GAS v3.19で修正済み（HTML確認画面を返すように変更）

#### 4. #NUM!エラーがA列に表示される

**症状**: 予約データのA列（送信日時）に `#NUM!` エラーが表示される

**原因**: 送信日時が数値として解釈されていた

**解決**: GAS v3.12で修正済み（A列に文字列として保存 `"'" + reservation.reservationDate`）

#### 5. GAS作業時の権限エラー

**症状**: GASコードを編集・デプロイしようとすると権限エラーが発生する

**原因**: 複数のGoogleアカウントで同時にGASにアクセスしている

**解決**:
1. すべてのブラウザタブを閉じる
2. シークレットモードで新しいウィンドウを開く
3. `txgame.akita@gmail.com` のみでログイン
4. GASエディタにアクセス

#### 6. CORS エラー

**症状**: React側からGAS APIへのfetchリクエストがCORSポリシーでブロックされる

**原因**: GAS WebアプリはCORS preflight requestに対応していない

**解決**: HTMLフォーム送信方式を使用（`form.submit()` + `target="_blank"`）

#### 7. メール送信エラー

**症状**: 自動返信メールが送信されない

**原因**: Gmail APIの権限がない、または送信エイリアスが未設定

**解決**:
- GAS側でGmail送信権限を承認
- `from` オプションを削除、`replyTo` のみ使用

### 🔧 開発環境のリセット

```bash
rm -rf node_modules package-lock.json
npm install
npm start
```

---

## 連絡先・組織情報

### 組織情報
- **団体名**: YOLUBE
- **代表者**: 木村 允
- **電話**: 090-2841-3926
- **メール**: info@yolube.jp

### 技術設定
- **本番URL**: https://yolube.jp
- **デプロイ方式**: GitHub連携自動デプロイ（Vercel）
- **GAS権限**: Gmail送信、Google Sheets編集
- **対応時間**: 3営業日以内

---

## 重要な更新履歴

### v3.25 (2025-10-07) - SNSシェア機能追加
- 予約完了画面にSNSシェアボタン追加（X, Facebook）
- シェアテキスト自動生成（イベント名、開催日時、会場、来場予定時刻、URL）
- ハッシュタグ追加（#YOLUBE #Ke #ボードゲーム #テーブルゲーム）

### v3.24 (2025-10-07) - 来場予定時刻フォーマット修正
- `getReservations`/`getReservation`で来場予定時刻をHH:mm形式で返すように修正
- Date型からHH:mm形式（例: 14:00）への変換処理追加

### v3.23 (2025-10-07) - 日付フォーマット変更
- `getEventInfoFromSchedule`日付フォーマット変更（yyyy/MM/dd形式、日本時間対応）
- A列のDate型をyyyy/MM/dd形式の文字列に変換

### v3.22 (2025-10-07) - イベント情報取得拡張
- `getEventInfoFromSchedule`にB列（時間）、D列（イベント名）、E列（開催回数）を追加
- 予約詳細ページで完全なイベント情報を表示可能に

### v3.21 (2025-10-07)
- 予約完了画面の予約内容をテーブル形式に変更

### v3.20 (2025-10-07)
- 予約完了画面の表示形式変更（イベント名 開催回数 形式に統一）

### v3.19 (2025-10-07)
- 予約フォーム送信後にHTML確認画面を表示するよう修正

### v3.18 (2025-10-07)
- getNextReservationId 関数で無効な値を無視するよう修正

### v3.17 (2025-10-07)
- getAllReservations API で確定予約のみを返すように修正

### v3.16 (2025-10-07)
- 管理用API更新（getAllReservations/getAdminStatsを新列構成に対応）

### v3.15 (2025-10-07)
- スプレッドシート列構成を完全変更（イベント情報を個別列に保存）

### v3.14 (2025-10-07)
- フォーム送信パラメータ変更（eventId→個別パラメータ化）

### v3.10 (2025-10-07)
- スプレッドシート分離設計（個人情報保護）- 予約データ非公開、イベント公開

---

## プロジェクト構造

```
yolube_web/cursor/
├── src/
│   ├── components/
│   │   ├── ReservationForm.jsx/.css    # 予約フォーム（v3.14対応）
│   │   ├── ReservationStatus.jsx/.css  # 予約状況表示
│   │   ├── admin/
│   │   │   ├── Dashboard.jsx/.css      # 管理ダッシュボード
│   │   │   └── ReservationList.jsx/.css # 予約一覧
│   │   ├── Header.js/.css
│   │   ├── Hero.js/.css
│   │   ├── About.js/.css
│   │   ├── Services.js/.css
│   │   ├── Contact.js/.css              # お問い合わせフォーム
│   │   └── Footer.js/.css
│   ├── pages/
│   │   ├── ke/
│   │   │   ├── KeLPWeb3.js             # Ke.ページ（予約フォーム統合済み）
│   │   │   └── KeLP.css
│   │   └── admin/
│   │       ├── Admin.jsx                # 管理画面メインページ
│   │       └── Login.jsx                # 管理画面ログイン
│   ├── services/
│   │   └── googleSheets.js              # Google Sheets連携
│   ├── App.js
│   └── index.js
├── public/
│   ├── images/                          # 画像ファイル
│   └── docs/PDF/                        # PDF資料
├── cursor/docs/                         # ドキュメント・GASコード
│   ├── GAS_INTEGRATED.gs               # ⭐ 統合GASコード v3.22
│   ├── GAS_INTEGRATED_DOCUMENTATION.md # GAS完全ドキュメント
│   ├── GAS_DEPLOYMENT_GUIDE.md         # デプロイ手順書
│   ├── API_TEST_CASES.md               # APIテストケース
│   └── PHASE1-4_SUMMARY.md             # Phase完了報告書
└── README.md                            # ⭐ このファイル
```

---

## ライセンス

© 2025 YOLUBE. All rights reserved.
