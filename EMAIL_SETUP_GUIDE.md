# EmailJS設定ガイド - YOLUBEお問い合わせフォーム

## 📧 概要

YOLUBEウェブサイトのお問い合わせフォームからのメールが `info@yolube.jp` に自動送信されるよう、EmailJSを使用して実装済みです。

## 🔧 EmailJS設定手順

### 1. EmailJSアカウント作成

1. [EmailJS公式サイト](https://www.emailjs.com/) にアクセス
2. **「Sign Up」** でアカウントを作成
3. メールアドレス認証を完了

### 2. Email Service設定

1. EmailJSダッシュボードで **「Email Services」** をクリック
2. **「Add New Service」** をクリック
3. **Gmail** または **Outlook** を選択（推奨：Gmail）
4. サービスに接続：
   - **Gmail**: `info@yolube.jp` でGoogleアカウントでログイン
   - **Service ID**: `service_yolube` に設定
5. **「Create Service」** をクリック

### 3. Email Template作成

#### トップページ用テンプレート
1. **「Email Templates」** → **「Create New Template」**
2. **Template ID**: `template_contact`
3. **Template設定**:

```html
件名: 【YOLUBE】お問い合わせ - {{inquiry_type}}

本文:
YOLUBEお問い合わせフォームから新しいメッセージが届きました。

■ お客様情報
お名前: {{user_name}}
メールアドレス: {{user_email}}
電話番号: {{user_phone}}
お問い合わせ種別: {{inquiry_type}}

■ メッセージ内容
{{message}}

---
このメールはYOLUBE公式サイトのお問い合わせフォームから自動送信されました。
送信日時: {{sent_at}}
```

#### Ke.ページ用テンプレート
1. **Template ID**: `template_ke_contact`
2. **Template設定**:

```html
件名: 【YOLUBE】テーブルゲーム交流会：Ke. お問い合わせ

本文:
テーブルゲーム交流会：Ke. のお問い合わせフォームから新しいメッセージが届きました。

■ お客様情報
お名前: {{user_name}}
メールアドレス: {{user_email}}

■ メッセージ内容
{{message}}

---
このメールはYOLUBE「テーブルゲーム交流会：Ke.」ページから自動送信されました。
送信日時: {{sent_at}}
```

### 4. Public Key取得

1. EmailJSダッシュボードで **「Account」** → **「General」**
2. **「Public Key」** をコピー

### 5. コード設定

以下のファイルでEmailJS設定値を更新：

#### src/components/Contact.js
```javascript
// 15行目付近
const serviceId = 'service_yolube'; // 作成したService ID
const templateId = 'template_contact'; // 作成したTemplate ID  
const publicKey = 'YOUR_ACTUAL_PUBLIC_KEY'; // 取得したPublic Key
```

#### src/pages/ke/KeLP.js
```javascript
// 19行目付近
const serviceId = 'service_yolube'; // 作成したService ID
const templateId = 'template_ke_contact'; // 作成したTemplate ID  
const publicKey = 'YOUR_ACTUAL_PUBLIC_KEY'; // 取得したPublic Key
```

## 📋 設定後のテスト

### 1. 動作確認
1. 開発サーバー起動: `npm start`
2. トップページのお問い合わせフォームでテスト送信
3. Ke.ページのお問い合わせフォームでテスト送信
4. `info@yolube.jp` にメールが届くことを確認

### 2. 確認ポイント
- ✅ フォーム送信時に「送信中...」表示
- ✅ 送信完了時に成功メッセージ表示
- ✅ フォームのリセット
- ✅ メール受信確認

## 🚨 トラブルシューティング

### よくある問題

#### 1. メールが届かない
- **確認事項**:
  - Service IDが正しく設定されているか
  - Template IDが正しく設定されているか
  - Public Keyが正しく設定されているか
  - EmailJSサービスが正しく接続されているか

#### 2. 送信エラーが発生する
- **対処法**:
  - ブラウザのConsoleでエラーメッセージを確認
  - EmailJSの使用制限（無料プランは月200通）を確認
  - インターネット接続を確認

#### 3. テンプレート変数が反映されない
- **対処法**:
  - HTMLフォームの`name`属性とテンプレート変数名が一致しているか確認
  - テンプレートで`{{variable_name}}`形式で記述されているか確認

## 💰 料金プラン

### 無料プラン
- **月間送信数**: 200通
- **基本機能**: すべて利用可能
- **制限**: EmailJSブランディング付き

### 有料プラン（推奨）
- **Personal**: $15/月（月5,000通）
- **Business**: $35/月（月15,000通）
- **メリット**: ブランディング削除、優先サポート

## 🔒 セキュリティ

### Public Keyの管理
- Public Keyは公開されても安全
- ただし、Template IDとService IDの組み合わせに注意
- 本番環境では環境変数での管理を推奨

### スパム対策
- EmailJSにはreCAPTCHA連携機能あり
- 必要に応じて実装を検討

## 📞 サポート

### 設定でお困りの場合
1. EmailJS公式ドキュメント: https://www.emailjs.com/docs/
2. EmailJSサポート: support@emailjs.com
3. 開発チームに相談

---

**設定完了後は、このガイドファイルを適切な場所に保管してください。**

**最終更新**: 2025年1月27日  
**担当者**: YOLUBE開発チーム 