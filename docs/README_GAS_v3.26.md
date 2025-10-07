# GAS_INTEGRATED.gs v3.26 デプロイ手順

## バージョン情報
- **バージョン**: v3.26
- **更新日**: 2025-10-07
- **更新内容**: 予約完了/エラーページにviewportタグ追加、モバイル最適化CSS適用（iPhone Chrome対応）

## 変更内容

### 1. 予約完了ページ（createReservationSuccessHtml）
#### 追加・変更点
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">` 追加
- `* { box-sizing: border-box; }` 追加
- `body` のマージン・パディング調整（モバイル対応）
  - `margin: 0 auto` + `padding: 20px`
- `.container` のパディング調整
  - `padding: 30px 20px`
- `.success h1` フォントサイズ縮小
  - `font-size: 1.8em`
- `.reservation-id` のフォントサイズ・改行調整
  - `font-size: 1.1em`
  - `word-break: break-all` 追加
- `.reservation-table` のモバイル最適化
  - `th`, `td` のパディング縮小: `padding: 10px`
  - フォントサイズ調整: `font-size: 0.9em`
  - `td` に `word-break: break-word` 追加
  - `th` の幅調整: `width: 35%`
- `.sns-btn` のサイズ調整
  - `gap: 6px`, `padding: 10px 16px`, `font-size: 0.9em`
- `.sns-buttons` のギャップ調整
  - `gap: 10px`

### 2. エラーページ（createErrorPage）
#### 追加・変更点
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">` 追加
- `* { box-sizing: border-box; }` 追加
- `body` のマージン・パディング調整（モバイル対応）
  - `margin: 0 auto` + `padding: 20px`
- `.container` のパディング調整
  - `padding: 30px 20px`
- `.error h1` フォントサイズ縮小
  - `font-size: 1.8em`
- `.info` のモバイル最適化
  - `word-break: break-word` 追加
  - `h3` に `font-size: 1.1em` 追加
  - `p` に `font-size: 0.95em` 追加
- `.button` のサイズ調整
  - `padding: 12px 24px`, `font-size: 0.95em`

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
4. 説明欄に「v3.26: モバイル表示最適化（viewport追加）」と入力
5. 「次のユーザーとして実行」: 自分（あなたのGoogleアカウント）
6. 「アクセスできるユーザー」: 全員
7. 「デプロイ」をクリック

### 4. 確認
1. デプロイ完了後、ウェブアプリURLをコピー
2. 実際にiPhoneやAndroidで予約フォームから送信テストを実施
3. 完了画面が適切にモバイル表示されることを確認

## テスト項目

### iPhone（Safari/Chrome）
- [ ] 予約完了画面が適切なサイズで表示される
- [ ] テキストが読みやすい大きさである
- [ ] 予約IDが改行される
- [ ] 予約テーブルが横スクロールせずに表示される
- [ ] SNSシェアボタンが適切に配置される
- [ ] 「TOPに戻る」ボタンがタップできる

### Android（Chrome）
- [ ] 予約完了画面が適切なサイズで表示される
- [ ] テキストが読みやすい大きさである
- [ ] 予約IDが改行される
- [ ] 予約テーブルが横スクロールせずに表示される
- [ ] SNSシェアボタンが適切に配置される
- [ ] 「TOPに戻る」ボタンがタップできる

### エラーページ
- [ ] エラーページもモバイル表示が最適化されている

## トラブルシューティング

### 問題: 画面が縮小表示される
- **原因**: ブラウザのキャッシュが残っている可能性
- **解決**: シークレットモード/プライベートブラウジングで確認

### 問題: 変更が反映されない
- **原因**: デプロイ時に「新しいデプロイ」ではなく既存を更新した
- **解決**: 必ず「新しいデプロイ」を作成してください

## 関連ファイル
- `docs/GAS_INTEGRATED.gs` - 本体コード
- `src/components/ReservationForm.jsx` - フロントエンドフォーム
- `src/api/reservationApi.js` - API通信処理

## 備考
- 前バージョン（v3.25）からの変更は**HTMLレスポンス部分のみ**
- スプレッドシート操作やAPI処理ロジックに変更なし
- 既存の予約データに影響なし
