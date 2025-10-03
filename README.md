# YOLUBE ウェブサイト

遊び心で社会を変える - YOLUBEのオフィシャルウェブサイト

## 概要

YOLUBEは「遊び心で社会を変える」という理念のもと、テーブルゲームの力で地域社会の課題解決に取り組む革新的な団体です。このウェブサイトは、YOLUBEの事業内容、実績、プロフィールを紹介するReactベースのSPA（Single Page Application）です。

## 特徴

- **レスポンシブデザイン**: スマートフォンからデスクトップまで対応
- **ボードゲーム風デザイン**: テーブルゲームを連想させる視覚的なテイスト
- **アニメーション**: 遊び心のある動きとエフェクト
- **アクセシビリティ**: 日本語フォントとユーザビリティの最適化
- **SEO対応**: メタタグとOGPタグの設定
- **統合お問い合わせシステム**: GAS（Google Apps Script）による自動化

## 現在の技術スタック

- React 18.2.0
- CSS3（カスタムプロパティ、グリッド、フレックスボックス）
- Google Fonts（Noto Sans JP）
- Google Apps Script（お問い合わせフォーム統合システム）
- Gmail API（自動返信メール）
- Google Sheets API（データ保存）

## プロジェクト構成

### メインサイト構成
```
src/
├── components/
│   ├── Header.js/.css        # ナビゲーションヘッダー
│   ├── Hero.js/.css          # メインビジュアル（スライダー）
│   ├── About.js/.css         # 事業概要
│   ├── Services.js/.css      # サービス紹介
│   ├── Achievements.js/.css  # 実績紹介
│   ├── Profile.js/.css       # プロフィール
│   ├── Contact.js/.css       # お問い合わせフォーム（GAS統合）
│   ├── Training.js/.css      # 企業研修ページ（GAS統合）
│   └── Footer.js/.css        # フッター
├── pages/ke/
│   ├── KeLPWeb3.js           # Ke.イベント参加申し込み（GAS統合）
│   ├── KeLP.css             # Ke.ページスタイル
│   └── index.js             # Ke.ページルーティング
├── services/
│   └── googleSheets.js      # Google Sheets連携（現在未使用）
├── utils/
│   └── imageLoader.js       # 画像読み込みユーティリティ
├── App.js                   # メインアプリケーション
├── App.css                  # 共通スタイル
└── index.js                 # エントリーポイント

public/
├── images/                  # 画像ファイル
│   ├── slider1/             # トップページスライダー画像1
│   ├── slider2/             # トップページスライダー画像2
│   ├── slider3/             # トップページスライダー画像3
│   ├── slider4/             # トップページスライダー画像4
│   ├── ke_gallery/          # Ke.イベントギャラリー
│   ├── favicon.png          # ファビコン
│   ├── YOLUBE_logo.png      # ロゴ
│   ├── YOLUBE_Symbol.png    # シンボル
│   └── makoto.jpg           # プロフィール画像
├── docs/PDF/
│   └── trainingv1.1.pdf     # 研修資料
├── GAS_CORS_Fixed_Complete.gs # Google Apps Script バックアップ
└── index.html               # HTMLテンプレート
```

## お問い合わせフォーム統合システム

### 概要
3つのお問い合わせフォーム（ホーム、Ke.イベント、研修）をGoogle Apps Script（GAS）で統合し、以下の機能を実装：

1. **自動データ保存**: Google Sheetsに種別ごとに整理して保存
2. **自動返信メール**: フォーム種別に応じたカスタマイズメール送信
3. **管理者通知**: 新規問い合わせの即座通知
4. **美しい成功ページ**: HTMLベースの確認画面表示
5. **CORS対応**: HTMLフォーム送信でCORS問題を解決
＊ 必ずシークレットモードで「単一のアカウントでのみGASへアクセスしている状態」で作業すること。
### GAS WebアプリURL
```
https://script.google.com/macros/s/AKfycbwGhOV6W4DoMTK9Zagbdjqq0KVx0KVThPqFtIzbFG__fine1Kez4_EmO7G9TwMiYrIGbg/exec
```

### データ保存先
```
https://docs.google.com/spreadsheets/d/1Ejs0annRLCGiV0dSTVGwm-1oDWbPHv65s1xLeWyRen8/edit
```

### フォーム種別
- **home**: ホームページお問い合わせ（電話番号、お問い合わせ内容、メッセージ）
- **ke**: Ke.イベント参加申し込み（電話番号、参加希望日、参加回数、メッセージ）
- **training**: 研修お問い合わせ（会社名・団体名、メッセージ）

## Google Sheets連携システム

### 概要
Ke.ページの次回イベント情報を、Google Sheetsから自動取得して表示する機能。

### スプレッドシートID
```
14roOdnMm4kdnL64OWkXdgMJ_qSampUuzr-tvEGeGhb4
```

### データ構造
- **A列**: 日付 (例: "2025年8月9日(土)")
- **C列**: 会場名
- **E列**: 回数 (例: "Vol-058")
- **ヘッダー**: 3行（4行目からデータ開始）

### 有効な会場リスト
- 秋田ベイパラダイス
- みんなの実家　門脇家
- 秋田市文化創造館

### イベント表示ロジック（22時切り替え機能）

次回イベントの表示は、現在時刻に基づいて自動的に切り替わります：

**22時未満の場合**:
- 今日のイベントを含める（今日 0:00:00以降のイベント）
- 例: 10/4 (土) 15:00 → 10/4のイベントが表示される

**22時以降の場合**:
- 明日以降のイベントのみ表示（明日 0:00:00以降のイベント）
- 例: 10/4 (土) 22:30 → 10/5のイベントが表示される

**実装場所**: `src/services/googleSheets.js` の `findNextEvent()` メソッド

**理由**: イベントは基本的に22時まで開催されるため、22時以降は自動的に次の日のイベントに切り替わる仕様。

## セットアップ

1. 依存関係をインストール:
   ```bash
   npm install
   ```

2. 開発サーバーを起動:
   ```bash
   npm start
   ```

3. ブラウザで http://localhost:3000 にアクセス

### 利用可能なURL
- `/` - メインページ
- `/ke` - テーブルゲーム交流会：Ke.
- `/training` - 企業研修ページ（ランディングページ）

### リダイレクト設定（vercel.json）
本番環境でのリダイレクト設定は削除済み：
- `/training` → Trainingコンポーネントが表示される（PDFリダイレクトは無効化）
- 開発環境・本番環境ともに通常のTrainingコンポーネントが表示される

## ビルド・デプロイ

本番環境用にビルドする場合:

```bash
npm run build
```

Git経由で本番環境にデプロイ:
```bash
git add .
git commit -m "コミットメッセージ"
git push origin master
```

## 開発履歴・重要な修正

### 🔧 主要な実装・修正履歴

#### 1. GAS統合お問い合わせフォームシステム実装 (2025年1月)
- EmailJS/Web3Forms依存を完全除去
- 3つのフォームをGAS統合システムに移行
- CORS問題をHTMLフォーム送信方式で解決
- 自動返信メール機能とスプレッドシート自動保存機能を実装
- Gmail送信権限問題を解決（fromオプション削除、replyTo使用）

#### 2. 企業研修ページの大幅リニューアル (2025年1月)
- Training.jsを完全リライト（PDFドキュメント仕様に基づく）
- コミュニケーション研修ランディングページに変更
- CSSの大幅追加（ke-problems, ke-impact, ke-solution, ke-monitorセクション）

#### 3. 不要ファイルのクリーンアップ
- **削除ファイル**: ContactDirect.js, ContactWeb3.js, StyleGuide.js, StyleGuide.css, KeLP.js
- 重複画像ファイル群の削除
- setup-web3forms.js などの不要スクリプト削除

#### 4. 研修ページカスタム画像対応 (2025年1月)
- カスタム研修画像の追加（training_01_01-03.jpeg, training_02_01-02.jpeg/png）
- 問題セクションでPlaceholder画像から実際の画像に差し替え
- 特徴セクションに画像追加、FontAwesomeアイコン削除
- レスポンシブデザインとレイアウトの改善
- お問い合わせフォームの中央配置
- ソリューションセクションのコンテンツとレイアウト更新

#### 5. PDFリダイレクト削除 (2025年1月)
- vercel.jsonから`/training`のPDFリダイレクト設定を削除
- 本番環境でTrainingランディングページが表示されるように変更
- 開発環境・本番環境ともに統一された動作に変更

### ⚠️ 重要な注意事項・過去の問題

#### スライダー画像のランダム表示問題
**問題**: Hero.jsでimageLoader.jsを使用してランダム画像システムを実装していたため、トップページのスライダー画像が毎回異なるPicsum画像で表示されていた。

**解決**: 
- Hero.jsからランダム画像システムを削除
- 固定画像パス（/images/slider1/image1.png など）に変更
- imageLoader.jsの機能を固定画像パスマッピングに変更

**教訓**: スライダー画像は固定パスを使用し、ランダム要素は避ける。変更時は必ず本番環境で表示確認を行う。

#### CORS問題
**問題**: React側のfetch()によるGAS WebアプリへのPOSTリクエストがCORSポリシーでブロックされていた。

**解決**: 
- fetch/AJAX送信をHTMLフォーム送信（form.submit()）に変更
- GAS側で成功/エラーページのHTMLを返却
- target="_blank"で新しいタブに結果表示

#### Gmail送信権限問題
**問題**: GmailApp.sendEmailのfromオプションで送信エイリアス未設定エラーが発生。

**解決**:
- fromオプションを削除
- replyToオプションのみ使用
- 管理者通知メールのreplyToをユーザーメールアドレスに設定

#### メール送信者アドレス問題 (未解決)
**問題**: 申込者へ届く自動返信メールの送信者が`info@yolube.jp`ではなく`txgame.akita@gmail.com`になっている。

**原因**: 
- `info@yolube.jp`がGmailアカウントの送信エイリアスとして設定されていない
- GAS側で`fromオプション`が削除され、`replyTo`のみ使用している現在の設定

**解決方法（次回対応予定）**:
1. **推奨**: Gmailで`info@yolube.jp`を送信エイリアスとして追加・認証
2. **代替**: 現在の設定を維持（送信者は`txgame.akita@gmail.com`、返信先は`info@yolube.jp`）

### 📋 次回作業予定

#### 🔧 メール送信者アドレス修正
**優先度**: 高
**作業内容**:
1. Gmail設定で`info@yolube.jp`を送信エイリアスとして追加
   - `txgame.akita@gmail.com`にログイン
   - 設定 → アカウントとインポート → 他のメールアドレスを追加
   - `info@yolube.jp`の認証設定
2. GAS側でfromオプションの復活とテスト
3. 自動返信メールの送信者表示確認

#### 📝 その他改善案
- 研修ページのコンテンツ最適化
- 問い合わせフォームのバリデーション強化
- モバイル表示の微調整

### 📂 バックアップファイル
- `public/GAS_CORS_Fixed_Complete.gs`: 最新のGASコードバックアップ
- デスクトップにも各種バックアップファイルを保持

## デザインシステム

### カラーパレット

- **プライマリカラー**: #8BC780 (メインブランドカラー)
- **プライマリダーク**: #6BA563
- **プライマリライト**: #A5D59C
- **セカンダリカラー**: #FF6B6B
- **アクセントカラー**: #FFD93D

### フォント

- **日本語**: Noto Sans JP
- **英語**: Helvetica Neue, Arial

### コンポーネント

- **game-card**: ボードゲーム風のカードデザイン
- **btn**: アニメーション付きボタン
- **section**: 統一されたセクションレイアウト
- **ke-***: Ke.ページ専用コンポーネントクラス

## 連絡先・設定情報

### 組織情報
- **団体名**: YOLUBE
- **代表者**: 木村 允
- **電話**: 090-2841-3926
- **メール**: info@yolube.jp

### 技術設定
- **本番URL**: https://yolube.jp
- **デプロイ方式**: GitHub連携自動デプロイ
- **GAS権限**: Gmail送信、Google Sheets編集
- **対応時間**: 3営業日以内

## トラブルシューティング

### よくある問題
1. **スライダー画像が表示されない**: publicフォルダの画像パスを確認
2. **フォーム送信エラー**: GAS WebアプリのURLが正しいか確認
3. **自動返信メールが届かない**: GAS側のGmail権限を確認
4. **CORS エラー**: HTMLフォーム送信方式を使用しているか確認

### 開発環境のリセット
```bash
rm -rf node_modules package-lock.json
npm install
npm start
```

## ライセンス

© 2025 YOLUBE. All rights reserved.