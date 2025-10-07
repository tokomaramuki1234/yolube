# GAS_INTEGRATED.gs v3.28 デプロイ手順

## バージョン情報
- **バージョン**: v3.28
- **更新日**: 2025-10-07
- **更新内容**: setSandboxMode(IFRAME)追加、viewport詳細設定、html/bodyにwidth/min-width明示（モバイル表示完全対応）

## 変更内容

### 1. HtmlService SandboxMode 設定追加（重要）
#### 問題
- v3.27で`.setXFrameOptionsMode(ALLOWALL)`を追加したが、まだモバイル表示が改善されない
- GASのデフォルトサンドボックスモード（NATIVE）がモバイルブラウザのviewportを無視

#### 解決策
全てのHTML出力に`.setSandboxMode(HtmlService.SandboxMode.IFRAME)`を追加：

```javascript
// v3.27
return HtmlService.createHtmlOutput(html)
  .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);

// v3.28（修正後）
return HtmlService.createHtmlOutput(html)
  .setSandboxMode(HtmlService.SandboxMode.IFRAME)
  .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
```

#### 対象関数（4箇所）
1. `createContactFormSuccessHtml()` - Line 1729-1731
2. `createErrorPage()` - Line 1846-1848
3. `createReservationSuccessHtml()` - Line 2134-2136
4. `createReservationErrorHtml()` - Line 2234-2236

### 2. Viewport メタタグ詳細設定
#### 変更前
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

#### 変更後（Line 1896-1897, 2156-2157）
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
```

**理由**:
- `maximum-scale=5.0`: ユーザーが必要に応じてズーム可能（アクセシビリティ）
- `minimum-scale=1.0`: 縮小表示を防止
- `X-UA-Compatible`: IE互換モード指定（念のため）

### 3. HTML/Body CSS 改善
#### 変更前
```css
body {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  ...
}
```

#### 変更後（Line 1900-1918）
```css
* {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
html {
  width: 100%;
  height: 100%;
}
body {
  width: 100%;
  min-width: 320px;
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  ...
}
```

**追加した理由**:
- `html { width: 100%; }`: ルート要素の幅を明示
- `body { width: 100%; min-width: 320px; }`: ボディの最小幅を保証
- `-webkit-box-sizing`: Safari/Chrome対応

### 4. Facebookシェア URL（v3.27から継続）
```javascript
// Line 1881
return 'https://m.facebook.com/sharer.php?u=' + encodeURIComponent(url);
```

モバイル専用のFacebookシェアURLを使用。

## デプロイ手順

### ⚠️ 重要: 必ず「新しいデプロイ」を作成してください

1. [Google Apps Script](https://script.google.com/) を開く
2. プロジェクト「YOLUBE統合システム」を開く
3. エディタで `GAS_INTEGRATED.gs` を開く
4. ローカルの `docs/GAS_INTEGRATED.gs` の内容を**全選択してコピー**
5. エディタ内の既存コードを**全削除**
6. コピーした内容を**貼り付け**
7. **`Ctrl+S` で保存**
8. 右上「デプロイ」→「**新しいデプロイ**」（重要！）
9. 種類: ウェブアプリ
10. 説明: `v3.28: setSandboxMode追加、モバイル表示完全対応`
11. 実行ユーザー: 自分
12. アクセス: 全員
13. **「デプロイ」をクリック**
14. 表示されたウェブアプリURLをコピー

### デプロイ確認チェックリスト
- [ ] GASエディタで保存した
- [ ] 「新しいデプロイ」を作成した（既存を更新ではない）
- [ ] バージョン説明に「v3.28」と入力した
- [ ] デプロイURLをコピーした

## テスト手順

### 1. キャッシュクリアテスト（必須）
1. **シークレットモード/プライベートブラウジング**でアクセス
2. 予約フォームから送信
3. 完了画面を確認

### 2. 確認項目

#### iPhone（Safari/Chrome）
- [ ] 予約完了画面が**画面幅いっぱい**に表示される
- [ ] 文字が小さすぎない（読みやすい）
- [ ] 予約IDや長いメールアドレスが改行される
- [ ] 予約テーブルが横スクロールなしで表示
- [ ] SNSシェアボタンがタップ可能
- [ ] Xシェアが正常動作
- [ ] Facebookシェアが正常動作（エラーにならない）

#### Android（Chrome/標準ブラウザ）
- [ ] 予約完了画面が**画面幅いっぱい**に表示される
- [ ] 文字が小さすぎない
- [ ] 予約テーブルが正しく表示
- [ ] SNSシェアボタンが動作
- [ ] Facebookシェアが正常動作

### 3. デスクトップでも確認
- [ ] デスクトップ（PC）でも正常表示（max-width: 700px）
- [ ] レイアウトが崩れていない

## トラブルシューティング

### 問題: まだ縮小表示される

#### 原因1: 古いキャッシュ
**解決**:
1. シークレットモード/プライベートブラウジングで確認
2. それでもダメなら、別のブラウザで確認
3. 別の端末で確認

#### 原因2: 古いデプロイURLにアクセスしている
**確認方法**:
1. GASエディタを開く
2. 「デプロイ」→「デプロイを管理」
3. 最新のデプロイ（v3.28）のURLをコピー
4. フロントエンド（`reservationApi.js`）のURLが最新か確認

**解決**:
```javascript
// src/api/reservationApi.js
const GAS_URL = "https://script.google.com/macros/s/xxxxx/exec"; // 最新のURLに更新
```

#### 原因3: デプロイが正しく完了していない
**確認方法**:
1. GASエディタ「デプロイ」→「デプロイを管理」
2. v3.28が表示されているか確認

**解決**:
もう一度「新しいデプロイ」を作成

### 問題: Facebookシェアがまだエラー

#### 原因1: FacebookのOGPキャッシュ
**解決**:
1. [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)を開く
2. `https://yolube.jp/ke` を入力
3. 「Scrape Again」をクリック
4. キャッシュクリア完了

#### 原因2: Facebook側の一時的な問題
**解決**:
- 数分待ってから再試行
- Facebook Statusページで障害がないか確認

### 問題: デプロイ後も何も変わらない

#### 確認事項
1. **本当に保存したか？** → Ctrl+S を押したか確認
2. **「新しいデプロイ」を作成したか？** → 既存の更新ではダメ
3. **正しいURLにアクセスしているか？** → 最新のデプロイURLを使用
4. **キャッシュクリアしたか？** → シークレットモードで確認

## 技術的詳細

### SandboxMode の種類

GASのHtmlServiceには3つのサンドボックスモードがあります：

| モード | 説明 | モバイル対応 |
|--------|------|--------------|
| `NATIVE` | デフォルト。Caja を使用した厳格なサンドボックス | ❌ viewportが無視される |
| `IFRAME` | 標準的な iframe サンドボックス | ✅ viewportが機能する |
| `EMULATED` | 古いモード（非推奨） | ⚠️ 使用非推奨 |

**v3.28で使用**: `IFRAME` モード

### なぜ IFRAME モードが必要か？

1. **NATIVE モード（デフォルト）の問題**:
   - Cajaサンドボックスがviewportメタタグを無視
   - モバイルブラウザが縮小表示してしまう

2. **IFRAME モードの利点**:
   - 標準的なHTMLとして扱われる
   - viewportメタタグが正常に機能
   - モバイルブラウザが適切にレンダリング

### XFrameOptionsMode との組み合わせ

```javascript
.setSandboxMode(HtmlService.SandboxMode.IFRAME)
.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
```

- `setSandboxMode(IFRAME)`: iframe内でレンダリング
- `setXFrameOptionsMode(ALLOWALL)`: iframe内での表示制限を解除

**両方が必要な理由**:
- `setSandboxMode`だけでは、iframe制限により一部のブラウザで表示されない
- 両方を設定することで、モバイルブラウザで完全に動作

## 前バージョンからの変更まとめ

### v3.27 → v3.28
1. **`.setSandboxMode(HtmlService.SandboxMode.IFRAME)` 追加**（4箇所）
2. **Viewport詳細設定**（maximum-scale, minimum-scale追加）
3. **X-UA-Compatible メタタグ追加**
4. **html/body CSS改善**（width, min-width明示、-webkit-box-sizing追加）

## 関連ファイル
- `docs/GAS_INTEGRATED.gs` - 本体コード
- `src/api/reservationApi.js` - GAS URL設定
- `src/components/ReservationForm.jsx` - フロントエンドフォーム

## 備考
- スプレッドシート操作やAPI処理ロジックに変更なし
- 既存の予約データに影響なし
- HTML出力とレンダリング設定のみの変更

## 最終確認
デプロイ後、以下を実施してください：
1. ✅ シークレットモードでiPhoneから予約送信
2. ✅ 完了画面が画面幅いっぱいに表示されることを確認
3. ✅ Facebookシェアボタンをタップして動作確認
4. ✅ Xシェアボタンをタップして動作確認
