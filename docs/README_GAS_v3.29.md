# GAS_INTEGRATED.gs v3.29 デプロイ手順

## バージョン情報
- **バージョン**: v3.29
- **更新日**: 2025-10-07
- **更新内容**: CONFIG オブジェクト導入（設定値の一元管理）

## 変更内容

### 1. CONFIG オブジェクトの追加（重要な改善）

すべてのハードコードされた設定値を一元管理する`CONFIG`オブジェクトを追加しました。

#### CONFIG の構造

```javascript
const CONFIG = {
  // 会社情報
  COMPANY: {
    NAME: 'YOLUBE',
    EMAIL: 'info@yolube.jp',
    PHONE: '090-2841-3926'
  },

  // URL
  URLS: {
    HOME: 'https://yolube.jp',
    KE_PAGE: 'https://yolube.jp/ke',
    FACEBOOK_SHARE: 'https://m.facebook.com/sharer.php',
    TWITTER_SHARE: 'https://twitter.com/intent/tweet'
  },

  // 制限値
  LIMITS: {
    MAX_COMPANIONS: 10,              // 同行者最大人数
    DEFAULT_CAPACITY: 50,            // デフォルト定員
    RECENT_RESERVATIONS_LIMIT: 6,   // 最近の予約表示件数
    MAX_NAME_LENGTH: 50,             // 名前最大文字数
    MAX_MESSAGE_LENGTH: 500          // メッセージ最大文字数
  },

  // スプレッドシート
  SPREADSHEET: {
    RESERVATIONS_ID: '1Ejs0annRLCGiV0dSTVGwm-1oDWbPHv65s1xLeWyRen8',
    RESERVATIONS_URL: 'https://docs.google.com/spreadsheets/d/...',
    SCHEDULE_ID: '14roOdnMm4kdnL64OWkXdgMJ_qSampUuzr-tvEGeGhb4',
    SHEET_NAMES: {
      CONTACT: 'contact',
      RESERVATION: 'reservation',
      SCHEDULE: 'YOLUBE Event Schedule'
    }
  },

  // 列インデックス（予約シート）
  COLUMNS: { ... },

  // メール設定
  EMAIL: {
    FROM_NAME: 'YOLUBE イベント予約システム',
    SUBJECT_PREFIX: '[YOLUBE]',
    CONTACT_SUBJECT: 'お問い合わせを受け付けました',
    RESERVATION_SUBJECT: 'イベント予約完了のお知らせ'
  },

  // SNS設定
  SNS: {
    HASHTAGS: '#YOLUBE #Ke #ボードゲーム #テーブルゲーム'
  }
};
```

### 2. 置き換えた箇所

#### SNSシェアURL（Line 1928-1932, 1940-1942）
```javascript
// 変更前
text += `#YOLUBE #Ke #ボードゲーム #テーブルゲーム`;
const url = 'https://yolube.jp/ke';
return 'https://twitter.com/intent/tweet?text=' + ...

// 変更後
text += CONFIG.SNS.HASHTAGS;
const url = CONFIG.URLS.KE_PAGE;
return CONFIG.URLS.TWITTER_SHARE + '?text=' + ...
```

#### 会社情報（メールテンプレート、HTML）
```javascript
// 変更前
TEL: 090-2841-3926
Email: info@yolube.jp
Web: https://yolube.jp

// 変更後
TEL: ${CONFIG.COMPANY.PHONE}
Email: ${CONFIG.COMPANY.EMAIL}
Web: ${CONFIG.URLS.HOME}
```

#### HTMLリンク（全4箇所）
```html
<!-- 変更前 -->
<a href="https://yolube.jp" class="button">TOPに戻る</a>
© 2025 YOLUBE. All rights reserved.

<!-- 変更後 -->
<a href="${CONFIG.URLS.HOME}" class="button">TOPに戻る</a>
© 2025 ${CONFIG.COMPANY.NAME}. All rights reserved.
```

### 3. 後方互換性の維持

既存のコードが動作し続けるよう、旧定数も保持しています：

```javascript
// 後方互換性のための旧定数（非推奨: 新しいコードではCONFIGを使用）
const CONTACT_SPREADSHEET_URL = CONFIG.SPREADSHEET.RESERVATIONS_URL;
const COMPANY_EMAIL = CONFIG.COMPANY.EMAIL;
const COMPANY_NAME = CONFIG.COMPANY.NAME;
const RESERVATION_SPREADSHEET_ID = CONFIG.SPREADSHEET.RESERVATIONS_ID;
const RESERVATIONS_SHEET_NAME = CONFIG.SPREADSHEET.SHEET_NAMES.RESERVATION;
const SCHEDULE_SPREADSHEET_ID = CONFIG.SPREADSHEET.SCHEDULE_ID;
const SCHEDULE_SHEET_NAME = CONFIG.SPREADSHEET.SHEET_NAMES.SCHEDULE;
const COLUMNS = CONFIG.COLUMNS;
```

**重要**: 既存コードはそのまま動作します。段階的に`CONFIG`への移行が可能です。

## このバージョンのメリット

### 1. 保守性の向上
- **会社情報変更**: `CONFIG.COMPANY`の1箇所を変更するだけ
- **URL変更**: `CONFIG.URLS`の1箇所を変更するだけ
- **電話番号変更**: 複数ファイルを grep する必要なし

### 2. 設定値の可視化
- すべての設定が `CONFIG` オブジェクトに集約
- 「設定を変更したい」→ `CONFIG` を見るだけ

### 3. 将来の拡張性
- 環境変数への移行が容易
- PropertiesService への移行が容易
- テスト環境と本番環境の切り替えが容易

## デプロイ手順

### 1. Google Apps Script エディタを開く
1. [Google Apps Script](https://script.google.com/) にアクセス
2. プロジェクト「YOLUBE統合システム」を開く

### 2. コードを更新
1. エディタで `GAS_INTEGRATED.gs` を開く
2. ローカルの `docs/GAS_INTEGRATED.gs` の内容を**全選択してコピー**
3. エディタ内の既存コードを**全削除**
4. コピーした内容を**貼り付け**
5. **`Ctrl+S` で保存**

### 3. デプロイ
1. 右上「デプロイ」→「**新しいデプロイ**」
2. 種類: ウェブアプリ
3. 説明: `v3.29: CONFIG オブジェクト導入（設定値一元管理）`
4. 実行ユーザー: 自分
5. アクセス: 全員
6. **「デプロイ」をクリック**

### 4. 動作確認
1. 予約フォームから送信テスト
2. メール受信確認（会社情報が正しく表示されているか）
3. SNSシェアボタン動作確認
4. HTMLの「TOPに戻る」ボタン動作確認

## テスト項目

### 機能テスト
- [ ] 予約フォーム送信が正常に完了する
- [ ] 確認メールが届く
- [ ] メール内の電話番号・URL が正しい（`${CONFIG...}`ではなく実際の値）
- [ ] 予約完了画面が表示される
- [ ] 「TOPに戻る」ボタンが動作する
- [ ] Xシェアボタンが動作する（ハッシュタグが正しい）
- [ ] Facebookシェアボタンが動作する
- [ ] モバイルブラウザで正常に表示される（v3.28の修正が維持されている）

### 設定値確認
- [ ] HTMLに`${CONFIG.COMPANY.PHONE}`などのテンプレート文字列が表示されていない
- [ ] 実際の値（090-2841-3926）が表示されている
- [ ] 会社名が「YOLUBE」と表示されている
- [ ] URLが「https://yolube.jp」と表示されている

## トラブルシューティング

### 問題: メールやHTMLに `${CONFIG.COMPANY.EMAIL}` とそのまま表示される

#### 原因
JavaScriptのテンプレートリテラル（バッククォート `` ` ``）が正しく機能していない

#### 解決
1. GASエディタで保存したか確認
2. デプロイが完了したか確認
3. シークレットモードで再テスト

### 問題: 旧バージョンと動作が変わった

#### 原因
意図しない置き換えミス

#### 確認方法
```javascript
// GASエディタのコンソールで確認
Logger.log(CONFIG.COMPANY.EMAIL);  // → 'info@yolube.jp' と表示されるはず
Logger.log(CONFIG.URLS.HOME);       // → 'https://yolube.jp' と表示されるはず
```

#### 解決
v3.28にロールバックして、問題を報告

## 今後の改善提案

### 将来的な拡張（v3.30以降で検討）

1. **PropertiesServiceへの移行**
```javascript
// スクリプトプロパティに設定を保存
const CONFIG = JSON.parse(
  PropertiesService.getScriptProperties().getProperty('CONFIG')
);
```

2. **環境別設定**
```javascript
const ENV = 'production'; // or 'staging'
const CONFIG = ENV === 'production' ? PROD_CONFIG : STAGING_CONFIG;
```

3. **設定妥当性チェック関数**
```javascript
function validateConfig() {
  if (!CONFIG.COMPANY.EMAIL.includes('@')) {
    throw new Error('Invalid email');
  }
  // ...
}
```

## 変更の影響範囲

### 影響なし（既存機能維持）
- ✅ 予約システム全機能
- ✅ お問い合わせフォーム
- ✅ メール送信
- ✅ スプレッドシート操作
- ✅ イベント情報取得

### 影響あり（改善）
- ✅ 設定値の変更が容易になった
- ✅ コードの可読性が向上した
- ✅ 将来の保守性が向上した

## 前バージョンからの変更まとめ

### v3.28 → v3.29
1. **CONFIG オブジェクト追加**
2. **SNS URL の CONFIG 化**
3. **会社情報の CONFIG 化**
4. **HTML内リンクの CONFIG 化**
5. **後方互換性維持**（既存の定数も保持）

## 関連ファイル
- `docs/GAS_INTEGRATED.gs` - 本体コード
- `docs/README_GAS_v3.28.md` - 前バージョンのREADME

## 備考
- スプレッドシート操作やAPI処理ロジックに変更なし
- 既存の予約データに影響なし
- 設定値の一元管理のみの変更
- 機能追加・変更なし（リファクタリングのみ）

## 設定変更の例

今後、会社情報を変更する場合：

```javascript
// 電話番号を変更する場合
const CONFIG = {
  COMPANY: {
    PHONE: '090-XXXX-XXXX'  // ← ここだけ変更
  }
  // 他の設定は変更不要
};

// デプロイするだけで、以下の箇所が自動的に更新される：
// - メールテンプレート内の電話番号
// - エラーページの電話番号
// - 署名の電話番号
// 全て自動更新！
```
