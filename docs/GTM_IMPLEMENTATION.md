# Google Tag Manager (GTM) 実装ガイド

## 📋 実装概要

YOLUBEウェブサイトにGoogle Tag Manager (GTM) を実装し、包括的なアクセス解析とコンバージョン追跡を実現しました。

**実装日**: 2025年10月8日  
**GTMコンテナID**: GTM-KVZ2B2MX  
**コミット**: 5b21bab

---

## 🎯 追跡イベント一覧

### 1. ページビュー追跡（自動）

**イベント名**: `page_view`

**トリガー**: 全ページ遷移時に自動送信

**パラメータ**:
- `page_path`: ページパス（例: `/`, `/ke`, `/training`）
- `page_title`: ページタイトル
- `page_location`: 完全なURL
- `timestamp`: イベント発生時刻（ISO 8601形式）

**実装ファイル**: 
- `src/App.js` - PageViewTrackerコンポーネント
- `src/utils/gtm.js` - trackPageView()関数

**動作例**:
```javascript
{
  event: 'page_view',
  page_path: '/ke',
  page_title: 'Ke. - YOLUBE',
  page_location: 'https://yolube.jp/ke',
  timestamp: '2025-10-08T12:34:56.789Z'
}
```

---

### 2. お問い合わせフォーム送信

**イベント名**: `contact_form_submit`

**トリガー**: お問い合わせフォームの送信完了時

**パラメータ**:
- `form_type`: 'contact'（固定値）
- `form_name`: 送信者の名前
- `form_email`: 送信者のメールアドレス
- `inquiry_type`: お問い合わせ種類（例: '企業研修', 'イベント参加'）
- `page_location`: フォーム送信元URL
- `timestamp`: イベント発生時刻

**実装ファイル**: 
- `src/components/Contact.js` - sendEmail()関数内
- `src/utils/gtm.js` - trackContactFormSubmit()関数

**動作例**:
```javascript
{
  event: 'contact_form_submit',
  form_type: 'contact',
  form_name: '山田太郎',
  form_email: 'yamada@example.com',
  inquiry_type: '企業研修について',
  page_location: 'https://yolube.jp/',
  timestamp: '2025-10-08T12:34:56.789Z'
}
```

---

### 3. イベント予約完了

**イベント名**: `reservation_complete`

**トリガー**: Ke.イベントの予約フォーム送信完了時

**パラメータ**:
- `event_name`: イベント名（例: 'テーブルゲーム交流会：Ke.'）
- `event_date`: イベント開催日（例: '2025/10/15（火）'）
- `participant_count`: 参加人数（本人+同行者数）
- `page_location`: 予約フォーム送信元URL
- `timestamp`: イベント発生時刻

**実装ファイル**: 
- `src/components/ReservationForm.jsx` - handleSubmit()関数内
- `src/utils/gtm.js` - trackReservationComplete()関数

**動作例**:
```javascript
{
  event: 'reservation_complete',
  event_name: 'テーブルゲーム交流会：Ke.',
  event_date: '2025/10/15（火）',
  participant_count: 3,
  page_location: 'https://yolube.jp/ke',
  timestamp: '2025-10-08T12:34:56.789Z'
}
```

---

## 🛠️ 技術的な実装詳細

### GTMコンテナコードの配置

**ファイル**: `public/index.html`

```html
<!-- Google Tag Manager - <head>内 -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KVZ2B2MX');</script>

<!-- Google Tag Manager (noscript) - <body>直後 -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KVZ2B2MX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
```

### GTMユーティリティ関数

**ファイル**: `src/utils/gtm.js`

主要な関数:
- `pushDataLayer(eventName, eventData)` - dataLayerへのイベント送信
- `trackPageView(pagePath, pageTitle)` - ページビュー追跡
- `trackContactFormSubmit(formData)` - お問い合わせ完了追跡
- `trackReservationComplete(reservationData)` - 予約完了追跡

開発環境では、コンソールにイベント内容がログ出力されます:
```javascript
[GTM Event] contact_form_submit { name: '山田太郎', email: '...' }
```

---

## 🎬 次のステップ: GTM管理画面での設定

### 1. Google Analytics 4 (GA4) のセットアップ

1. **GA4プロパティの作成**
   - Google Analyticsにログイン: https://analytics.google.com/
   - 管理 → プロパティを作成
   - プロパティ名: 「YOLUBE - yolube.jp」
   - タイムゾーン: 日本
   - 通貨: 日本円（JPY）

2. **測定IDの取得**
   - 作成したプロパティから「データストリーム」をクリック
   - 「ウェブ」を選択
   - ウェブサイトURL: `https://yolube.jp`
   - 測定ID（G-XXXXXXXXXX形式）をコピー

---

### 2. GTM管理画面でのタグ設定

GTM管理画面にアクセス: https://tagmanager.google.com/

#### タグ1: GA4 Configuration（基本設定）

**種類**: Google アナリティクス: GA4 設定

**設定**:
- 測定ID: `G-XXXXXXXXXX`（GA4から取得した測定ID）
- 設定フィールド（オプション）:
  - `cookie_domain`: `auto`
  - `anonymize_ip`: `true`（IPアドレス匿名化）

**トリガー**: All Pages（すべてのページ）

---

#### タグ2: Page View Event（ページビュー）

**種類**: Google アナリティクス: GA4 イベント

**設定**:
- 設定タグ: GA4 Configuration（上記で作成したタグ）
- イベント名: `page_view`
- イベントパラメータ:
  | パラメータ名 | 値 |
  |------------|---|
  | page_path | `{{Page Path}}` |
  | page_title | `{{Page Title}}` |
  | page_location | `{{Page URL}}` |

**トリガー**: カスタムイベント
- イベント名: `page_view`

---

#### タグ3: Contact Form Submit（お問い合わせ完了）

**種類**: Google アナリティクス: GA4 イベント

**設定**:
- 設定タグ: GA4 Configuration
- イベント名: `contact_form_submit`
- イベントパラメータ:
  | パラメータ名 | 値 |
  |------------|---|
  | form_type | `{{dlv - form_type}}` |
  | inquiry_type | `{{dlv - inquiry_type}}` |
  | page_location | `{{dlv - page_location}}` |

**トリガー**: カスタムイベント
- イベント名: `contact_form_submit`

**データレイヤー変数の作成**:
1. 変数 → 新規作成
2. 種類: データレイヤー変数
3. 変数名: `dlv - form_type`
4. データレイヤー変数名: `form_type`
5. 同様に`inquiry_type`, `page_location`も作成

---

#### タグ4: Reservation Complete（予約完了）

**種類**: Google アナリティクス: GA4 イベント

**設定**:
- 設定タグ: GA4 Configuration
- イベント名: `reservation_complete`
- イベントパラメータ:
  | パラメータ名 | 値 |
  |------------|---|
  | event_name | `{{dlv - event_name}}` |
  | event_date | `{{dlv - event_date}}` |
  | participant_count | `{{dlv - participant_count}}` |
  | page_location | `{{dlv - page_location}}` |

**トリガー**: カスタムイベント
- イベント名: `reservation_complete`

**データレイヤー変数の作成**:
1. `dlv - event_name`
2. `dlv - event_date`
3. `dlv - participant_count`
4. `dlv - page_location`（既存を再利用可能）

---

### 3. GTMプレビュー・テストモード

1. GTM管理画面右上の「プレビュー」をクリック
2. テストURL: `https://yolube.jp` を入力
3. ブラウザで新しいタブが開き、GTMデバッグモードが起動

**確認項目**:
- [ ] ページ読み込み時に`page_view`イベントが発火
- [ ] お問い合わせフォーム送信時に`contact_form_submit`イベントが発火
- [ ] 予約フォーム送信時に`reservation_complete`イベントが発火
- [ ] 各イベントパラメータが正しく送信されている
- [ ] GA4タグが正常に発火している

**テスト手順**:
```
1. トップページにアクセス → page_viewイベント確認
2. /keページに遷移 → page_viewイベント確認
3. お問い合わせフォームを送信 → contact_form_submitイベント確認
4. 予約フォームを送信 → reservation_completeイベント確認
```

---

### 4. 本番公開

テストが完了したら:
1. GTM管理画面右上の「送信」をクリック
2. バージョン名: 「GTM初期実装 - ページビュー・コンバージョン追跡」
3. バージョンの説明を記入
4. 「公開」をクリック

**注意**: 本番公開後、変更が反映されるまで数分かかる場合があります。

---

### 5. GA4での変換設定

GA4管理画面で変換イベントを設定:

1. GA4 → 管理 → イベント
2. 「変換としてマークを付ける」をクリック
3. 以下のイベントを変換としてマーク:
   - `contact_form_submit`
   - `reservation_complete`

これにより、GA4レポートで変換数を確認できるようになります。

---

## 📊 レポート・分析の活用方法

### GA4レポートでの確認項目

1. **リアルタイムレポート**
   - 現在のアクティブユーザー数
   - ページビュー
   - イベント発生状況

2. **エンゲージメントレポート**
   - ページビュー数（ページ別）
   - 平均エンゲージメント時間
   - ユーザー行動フロー

3. **コンバージョンレポート**
   - お問い合わせ完了数
   - 予約完了数
   - コンバージョン率

4. **カスタムレポート作成**
   - イベント別の詳細分析
   - ユーザー属性別のコンバージョン率
   - デバイス別の行動分析

---

## 🔍 トラブルシューティング

### dataLayerイベントが送信されない

**確認項目**:
1. ブラウザのコンソールを開く（F12キー）
2. コンソールに `[GTM Event]` のログが表示されているか確認
3. GTMプレビューモードでdataLayerの内容を確認

### GA4にデータが届かない

**確認項目**:
1. GTMプレビューモードでGA4タグが発火しているか確認
2. GA4測定IDが正しく設定されているか確認
3. GA4のリアルタイムレポートで確認（反映まで数分かかる場合あり）

### イベントパラメータが正しく送信されない

**確認項目**:
1. GTMのデータレイヤー変数が正しく作成されているか確認
2. 変数名とdataLayerのキー名が一致しているか確認
3. GTMプレビューモードで変数の値を確認

---

## 📝 メンテナンス情報

### ファイル変更時の影響

以下のファイルを変更した場合は、GTM実装への影響を確認してください:

- `public/index.html` - GTMコンテナコードの削除に注意
- `src/App.js` - PageViewTrackerコンポーネントの削除に注意
- `src/utils/gtm.js` - 関数名変更時はインポート元も更新
- `src/components/Contact.js` - trackContactFormSubmit()の呼び出し削除に注意
- `src/components/ReservationForm.jsx` - trackReservationComplete()の呼び出し削除に注意

### 新しいイベント追跡の追加方法

1. `src/utils/gtm.js` に新しい関数を追加:
```javascript
export const trackNewEvent = (eventData = {}) => {
  pushDataLayer('new_event_name', {
    param1: eventData.param1 || '',
    param2: eventData.param2 || '',
    page_location: window.location.href
  });
};
```

2. 追跡したいコンポーネントでインポート:
```javascript
import { trackNewEvent } from '../utils/gtm';
```

3. 適切なタイミングで呼び出し:
```javascript
trackNewEvent({ param1: 'value1', param2: 'value2' });
```

4. GTM管理画面で新しいタグとトリガーを設定

---

## 📚 参考リソース

- [Google Tag Manager 公式ドキュメント](https://support.google.com/tagmanager)
- [Google Analytics 4 公式ドキュメント](https://support.google.com/analytics/answer/10089681)
- [dataLayer リファレンス](https://developers.google.com/tag-platform/tag-manager/datalayer)
- [GTMプレビューモード使用方法](https://support.google.com/tagmanager/answer/6107056)

---

*最終更新: 2025年10月8日*  
*作成者: YOLUBE開発チーム*
