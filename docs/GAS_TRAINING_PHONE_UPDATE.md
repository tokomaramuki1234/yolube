# GAS更新ガイド: Training フォームに電話番号フィールド追加

**更新日**: 2025年10月25日
**対象ファイル**: `GAS_INTEGRATED.gs`
**バージョン**: v3.31 → v3.32

---

## 📋 概要

Training（企業研修）お問い合わせフォームに「電話番号」フィールドを追加しました。
フロントエンド（React）側の更新は完了しているため、GAS側も更新が必要です。

---

## 🔧 必要な修正箇所

### 1. ヘッダー設定の修正（337-338行目）

**修正前:**
```javascript
case 'training':
  headers.push('会社名・団体名', 'メッセージ');
  break;
```

**修正後:**
```javascript
case 'training':
  headers.push('会社名・団体名', '電話番号', 'メッセージ');
  break;
```

---

### 2. データ行作成の修正（370-374行目）

**修正前:**
```javascript
case 'training':
  row.push(
    formData.company_name || '',
    formData.message || ''
  );
  break;
```

**修正後:**
```javascript
case 'training':
  row.push(
    formData.company_name || '',
    formData.user_phone || '',
    formData.message || ''
  );
  break;
```

---

### 3. 自動返信メール本文の修正

`createAutoReplyBody` 関数内の `training` ケースを探して修正してください。

**修正箇所を探す:**
```javascript
function createAutoReplyBody(formData) {
  // ...省略...
  switch (formData.formType) {
    case 'training':
      // ここを修正
```

**修正例:**
```javascript
case 'training':
  return `
${formData.user_name} 様

この度は、YOLUBEの企業研修プログラムにお問い合わせいただき、誠にありがとうございます。

以下の内容で承りました。

【お問い合わせ内容】
会社名・団体名: ${formData.company_name}
ご担当者名: ${formData.user_name}
メールアドレス: ${formData.user_email}
電話番号: ${formData.user_phone || '未入力'}
お問い合わせ内容:
${formData.message}

3営業日以内に担当者よりご連絡いたします。
今しばらくお待ちくださいませ。

※本メールは自動送信されています。
ご返信いただいても確認できませんのでご了承ください。

---
YOLUBE
Email: info@yolube.jp
Tel: 090-2841-3926
Web: https://yolube.jp
`;
  break;
```

---

## 📝 更新手順

### Step 1: Google Apps Script エディタを開く

1. Google Apps Scriptエディタにアクセス:
   https://script.google.com/home

2. プロジェクト「YOLUBE統合システム」を開く

### Step 2: コードを修正

上記の3箇所を修正してください。

### Step 3: バージョン更新

ファイル先頭のバージョン番号を更新:
```javascript
/**
 * ============================================
 * YOLUBE統合システム - Google Apps Script
 * ============================================
 *
 * 統合バージョン: v3.32  ← ここを変更
 * 統合日: 2025-10-25     ← ここを変更
```

更新履歴を追加:
```javascript
 * 【更新履歴】
 * v3.32 (2025-10-25): Trainingフォームに電話番号フィールド追加
 * v3.31 (2025-10-07): Logger.log()強化（ログ機能改善）。主要関数にトラブルシューティング用ログ追加
```

### Step 4: 保存とデプロイ

1. **保存**: Ctrl + S
2. **デプロイ**: 「デプロイ」→「新しいデプロイ」→「バージョン」
3. **説明**: "v3.32 - Training電話番号フィールド追加"
4. **デプロイ**ボタンをクリック

---

## ✅ 動作確認

### 1. フロントエンドでテスト送信

http://localhost:3000/training にアクセスして、以下を入力:

- 会社名・団体名: テスト株式会社
- ご担当者名: 山田太郎
- メールアドレス: test@example.com
- **電話番号: 090-1234-5678** ← 新規フィールド
- お問い合わせ内容: テスト送信

### 2. スプレッドシートを確認

1. スプレッドシートを開く:
   https://docs.google.com/spreadsheets/d/1Ejs0annRLCGiV0dSTVGwm-1oDWbPHv65s1xLeWyRen8/edit

2. 「training」シートを確認

3. 以下の列が表示されているか確認:
   - A列: 送信日時
   - B列: フォーム種別
   - C列: お名前
   - D列: メールアドレス
   - E列: 会社名・団体名
   - **F列: 電話番号** ← 新規
   - G列: メッセージ

4. テストデータが正しく保存されているか確認

### 3. 自動返信メールを確認

1. test@example.com（テスト送信したメールアドレス）の受信トレイを確認

2. YOLUBEからの自動返信メールが届いているか確認

3. メール本文に **電話番号: 090-1234-5678** が含まれているか確認

---

## 🚨 トラブルシューティング

### 問題1: スプレッドシートにデータが保存されない

**原因**: ヘッダー列数とデータ列数が一致していない

**解決策**:
1. 「training」シートを一度削除
2. GASを再実行してシートを自動生成
3. 新しいヘッダーが正しく作成される

### 問題2: 電話番号が空欄で保存される

**原因**: フロントエンドからのパラメータ名が一致していない

**確認事項**:
- フロントエンド: `name="user_phone"`
- GAS: `formData.user_phone`

両方が一致しているか確認してください。

### 問題3: 自動返信メールに電話番号が表示されない

**原因**: `createAutoReplyBody` 関数の修正漏れ

**解決策**:
- メール本文生成部分に `${formData.user_phone}` が含まれているか再確認

---

## 📊 変更ファイル一覧

| ファイル | 変更内容 | ステータス |
|---------|---------|---------|
| `src/components/Training.js` | フォームに電話番号フィールド追加 | ✅ 完了 |
| `docs/GAS_INTEGRATED.gs` | GAS側で電話番号を受信・保存・メール送信 | ⏳ 要対応 |

---

## 📞 サポート

質問や問題がある場合は、以下にお問い合わせください:
- Email: info@yolube.jp
- Tel: 090-2841-3926

---

*最終更新: 2025年10月25日*
