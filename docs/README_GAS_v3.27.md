# GAS_INTEGRATED.gs v3.27 デプロイ手順

## バージョン情報
- **バージョン**: v3.27
- **更新日**: 2025-10-07
- **更新内容**: HtmlService.setXFrameOptionsMode(ALLOWALL)追加、Facebookシェアをm.facebook.comに変更（モバイル対応）

## 変更内容

### 1. HtmlService XFrameOptionsMode 設定（重要）
#### 問題
- v3.26でviewportタグを追加したが、GASのデフォルトサンドボックスモードではモバイルブラウザで正しく表示されない
- iPhoneのChromeで画面全体が縮小表示される

#### 解決策
全てのHTML出力に`.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)`を追加：

```javascript
// 修正前
return HtmlService.createHtmlOutput(html);

// 修正後
return HtmlService.createHtmlOutput(html)
  .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
```

#### 対象関数（4箇所）
1. `createContactFormSuccessHtml()` - Line 1728-1729
2. `createErrorPage()` - Line 1844-1845
3. `createReservationSuccessHtml()` - Line 2129-2130
4. `createReservationErrorHtml()` - Line 2228-2229

### 2. Facebookシェア URL修正
#### 問題
- `www.facebook.com/sharer/sharer.php` がモバイルブラウザでエラー
- "Sorry, something went wrong" が表示される

#### 解決策
モバイル専用のFacebookシェアURLに変更：

```javascript
// 修正前
return 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url);

// 修正後（Line 1881）
return 'https://m.facebook.com/sharer.php?u=' + encodeURIComponent(url);
```

## デプロイ手順

### 1. Google Apps Script エディタを開く
1. [Google Apps Script](https://script.google.com/) にアクセス
2. プロジェクト「YOLUBE統合システム」を開く

### 2. コードを更新
1. エディタで `GAS_INTEGRATED.gs` を開く
2. ローカルの `docs/GAS_INTEGRATED.gs` の内容を**全選択してコピー**
3. エディタ内の既存コードを**全削除**
4. コピーした内容を**貼り付け**
5. `Ctrl+S` (Windows) または `Cmd+S` (Mac) で保存

### 3. デプロイ
1. 右上の「デプロイ」ボタンをクリック
2. 「新しいデプロイ」を選択
3. 「種類の選択」で「ウェブアプリ」を選択
4. 説明欄に「v3.27: XFrameOptionsMode修正、モバイル表示対応」と入力
5. 「次のユーザーとして実行」: 自分（あなたのGoogleアカウント）
6. 「アクセスできるユーザー」: 全員
7. 「デプロイ」をクリック

### 4. 確認
1. デプロイ完了後、ウェブアプリURLをコピー
2. **キャッシュクリア**: シークレットモード/プライベートブラウジングで確認
3. 実際にiPhoneやAndroidで予約フォームから送信テストを実施
4. 完了画面が適切にモバイル表示されることを確認
5. Facebookシェアボタンをタップして動作確認

## テスト項目

### iPhone（Safari/Chrome）
- [ ] 予約完了画面が**フルサイズ**で表示される（縮小表示されない）
- [ ] テキストが読みやすい大きさである
- [ ] 予約テーブルがスクロールせずに収まる
- [ ] SNSシェアボタンがタップできる
- [ ] **Facebookシェアが正常に動作する**（エラーにならない）
- [ ] Xシェアが正常に動作する

### Android（Chrome）
- [ ] 予約完了画面が**フルサイズ**で表示される
- [ ] テキストが読みやすい大きさである
- [ ] 予約テーブルがスクロールせずに収まる
- [ ] SNSシェアボタンがタップできる
- [ ] **Facebookシェアが正常に動作する**
- [ ] Xシェアが正常に動作する

## トラブルシューティング

### 問題: 画面がまだ縮小表示される
- **原因1**: ブラウザのキャッシュが残っている
  - **解決**: シークレットモード/プライベートブラウジングで確認
- **原因2**: デプロイが正しく完了していない
  - **解決**: 必ず「**新しいデプロイ**」を作成（既存を更新ではない）
- **原因3**: 古いデプロイURLにアクセスしている
  - **解決**: 最新のデプロイURLを使用しているか確認

### 問題: Facebookシェアがまだエラーになる
- **原因1**: FacebookのOGPキャッシュが残っている
  - **解決**: [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) で `https://yolube.jp/ke` のキャッシュをクリア
- **原因2**: Facebook側のサーバーエラー
  - **解決**: 時間をおいて再試行

### 問題: 変更が反映されない
- **確認1**: GASエディタで保存したか？
- **確認2**: 「新しいデプロイ」を作成したか？（既存の更新ではない）
- **確認3**: 最新のデプロイURLにアクセスしているか？
- **確認4**: シークレットモードで確認したか？

## 技術的詳細

### XFrameOptionsMode について
GASのHtmlServiceは3つのモードがあります：
- `DENY`: iframe内での表示を完全に禁止（デフォルトに近い動作）
- `DEFAULT`: 一部のサンドボックス制限を適用
- `ALLOWALL`: すべての制限を解除（モバイル表示に必要）

**なぜALLOWALLが必要か？**
- モバイルブラウザはviewportメタタグを正しく解釈するために、iframe制限の解除が必要
- iframeサンドボックス内ではviewportが無視されるケースがある

### Facebookシェア URL の違い
- **デスクトップ**: `www.facebook.com/sharer/sharer.php`
- **モバイル**: `m.facebook.com/sharer.php`

モバイル版URLは、Facebookアプリへの自動リダイレクトやモバイルウェブUIに最適化されています。

## 前バージョンからの変更点まとめ

### v3.26 → v3.27
1. **HtmlService出力に`.setXFrameOptionsMode(ALLOWALL)`追加**（4箇所）
2. **FacebookシェアURLを`m.facebook.com`に変更**
3. これらの変更により、モバイルブラウザで正常に表示されるようになる

## 関連ファイル
- `docs/GAS_INTEGRATED.gs` - 本体コード
- `src/components/ReservationForm.jsx` - フロントエンドフォーム
- `src/api/reservationApi.js` - API通信処理

## 備考
- スプレッドシート操作やAPI処理ロジックに変更なし
- 既存の予約データに影響なし
- HTML出力部分のみの変更（4関数）
