# Web3Forms 設定ガイド - YOLUBEお問い合わせフォーム

## 🎉 **Web3Forms の特徴**

✅ **完全無料** - 送信数制限なし  
✅ **設定超簡単** - 5分で完了  
✅ **スパム保護** - 自動対策機能内蔵  
✅ **カスタムメール** - info@yolube.jp 直接送信  
✅ **外部ロゴなし** - ブランディング無し  
✅ **レスポンス高速** - 信頼性の高いAPI  

---

## 🚀 **設定手順（5分で完了）**

### **ステップ1: Web3Formsサイトでアクセスキー取得**

1. **Web3Forms公式サイトにアクセス**
   - URL: https://web3forms.com/

2. **「Get Started」をクリック**
   - 画面中央のボタンをクリック

3. **メールアドレス入力**
   - `info@yolube.jp` を入力
   - 「Create Access Key」をクリック

4. **アクセスキーをコピー**
   - 表示されたアクセスキーをコピー保存
   - 例: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`

### **ステップ2: コードに設定値を反映**

**以下の2つのファイルでアクセスキーを置き換えてください：**

#### **1. トップページのお問い合わせフォーム**
**ファイル**: `src/components/ContactWeb3.js`  
**行番号**: 約19行目

```javascript
// 変更前
formData.append("access_key", "YOUR_WEB3FORMS_ACCESS_KEY");

// 変更後（実際のアクセスキーに置き換え）
formData.append("access_key", "あなたの実際のアクセスキー");
```

#### **2. Ke.ページのお問い合わせフォーム**
**ファイル**: `src/pages/ke/KeLPWeb3.js`  
**行番号**: 約21行目

```javascript
// 変更前
formData.append("access_key", "YOUR_WEB3FORMS_ACCESS_KEY");

// 変更後（実際のアクセスキーに置き換え）
formData.append("access_key", "あなたの実際のアクセスキー");
```

### **ステップ3: フォームを有効化**

**App.js でコンポーネントを置き換えてください：**

```javascript
// src/App.js の import文を変更

// 変更前
import Contact from './components/Contact';
import KeLP from './pages/ke/KeLP';

// 変更後
import Contact from './components/ContactWeb3';
import KeLP from './pages/ke/KeLPWeb3';
```

---

## ✅ **設定後のテスト**

### **1. 動作確認手順**

1. **開発サーバー起動**: `npm start`
2. **ブラウザでアクセス**: `http://localhost:3000`
3. **お問い合わせフォームでテスト送信**
4. **info@yolube.jp にメール到着確認**

### **2. 確認ポイント**

- ✅ フォーム送信時に「送信中...」表示
- ✅ 送信完了時に成功メッセージ表示
- ✅ フォームの自動リセット
- ✅ `info@yolube.jp` にメール受信

### **3. 受信メール例**

**件名**: 【YOLUBE】お問い合わせ - テーブルゲーム交流会：Ke.について  
**送信者**: YOLUBE お問い合わせフォーム  
**本文**:
```
user_name: 山田太郎
user_email: test@example.com
user_phone: 090-1234-5678
inquiry_type: テーブルゲーム交流会：Ke.について
message: イベント参加についてお伺いしたいことがあります。
```

---

## 🛠️ **カスタマイズオプション**

### **メール件名のカスタマイズ**

```javascript
// トップページ用
formData.append("subject", `【YOLUBE】お問い合わせ - ${formData.get('inquiry_type')}`);

// Ke.ページ用
formData.append("subject", "【YOLUBE】テーブルゲーム交流会：Ke. お問い合わせ");
```

### **返信先設定**

```javascript
formData.append("replyto", formData.get('user_email'));
```

### **送信者名設定**

```javascript
formData.append("from_name", "YOLUBE お問い合わせフォーム");
```

---

## 🔒 **セキュリティ機能**

### **1. スパム対策**

**ハニーポット** - 自動実装済み
```html
<input type="checkbox" name="botcheck" className="hidden" style={{display: 'none'}} />
```

### **2. reCAPTCHA（オプション）**

必要に応じてreCAPTCHA v3を追加可能：

```javascript
// reCAPTCHA追加例
formData.append("captcha", await grecaptcha.execute('site_key'));
```

---

## 📊 **利用制限・料金**

### **無料プラン**
- **送信数**: **無制限** 🎉
- **機能**: **フル機能利用可能**
- **制約**: **なし**

### **有料プラン（オプション）**
- **Pro**: $5/月
- **追加機能**: ファイル添付、Webhook、詳細分析

---

## 🚨 **トラブルシューティング**

### **よくある問題と解決法**

#### **1. メールが届かない**

**確認事項:**
- ✅ アクセスキーが正しく設定されているか
- ✅ `info@yolube.jp` の受信設定確認
- ✅ スパムフォルダを確認

**解決法:**
```javascript
// Web3Forms dashboard でメール送信ログを確認
// https://web3forms.com/dashboard
```

#### **2. 送信エラーが発生**

**デバッグ方法:**
```javascript
// ブラウザのConsoleでエラー詳細確認
console.log('送信データ:', formData);
console.log('API応答:', result);
```

#### **3. フォームがリセットされない**

**対処法:**
```javascript
// handleSubmit内でリセット確認
if (result.success) {
  form.current.reset(); // この行が実行されているか確認
}
```

---

## 🔄 **既存EmailJSからの移行**

### **移行手順**

1. **Web3Formsアクセスキー取得**
2. **新しいコンポーネント作成済み**
3. **App.jsでimport変更**
4. **EmailJSライブラリ削除**（オプション）

```bash
# EmailJS削除（必要に応じて）
npm uninstall @emailjs/browser
```

---

## 📈 **実装完了チェックリスト**

- [ ] Web3Formsアクセスキー取得
- [ ] `ContactWeb3.js` にアクセスキー設定
- [ ] `KeLPWeb3.js` にアクセスキー設定  
- [ ] App.jsでコンポーネント置き換え
- [ ] トップページフォームテスト
- [ ] Ke.ページフォームテスト
- [ ] `info@yolube.jp` メール受信確認

---

## 🎯 **Web3Forms Dashboard**

**ダッシュボードURL**: https://web3forms.com/dashboard

**利用可能機能:**
- 📧 送信履歴確認
- 📊 統計情報
- ⚙️ 設定変更
- 🔧 API管理

---

## 📞 **サポート**

### **困った時の連絡先**

1. **Web3Forms公式ドキュメント**: https://docs.web3forms.com/
2. **Web3Formsサポート**: support@web3forms.com
3. **開発チームに相談**

---

**🎉 設定完了後は、完全無料でメール送信機能が利用できます！**

**最終更新**: 2025年1月27日  
**担当者**: YOLUBE開発チーム 