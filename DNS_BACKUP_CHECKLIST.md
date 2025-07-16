# DNS設定変更前 完全バックアップチェックリスト

## 📋 **変更前に必ず記録すること**

### **Xserver現在のDNS設定**

```
【記録必須】現在の設定をコピー＆ペーストで保存

=== Aレコード ===
ホスト名: 
種別: A
値: 
TTL: 

=== CNAMEレコード ===
ホスト名: www
種別: CNAME
値: 
TTL: 

=== MXレコード ===
ホスト名: 
種別: MX
値: 
優先度: 
TTL: 

=== TXTレコード ===
ホスト名: 
種別: TXT
値: 
TTL: 

=== その他レコード ===
（全て記録）
```

### **Vercel現在の設定**

```
【Vercelダッシュボードで確認】

Project: yolube_web
Domain: yolube.jp
DNS設定: 
- Type: 
- Name: 
- Value: 

カスタムドメイン設定:
- Domain: yolube.jp
- Status: ✓ Valid Configuration
- Nameservers: 
```

### **動作確認**

```
【変更前テスト】

✅ yolube.jp でWebサイト正常表示
✅ www.yolube.jp でWebサイト正常表示  
✅ Vercelデプロイメント正常動作
✅ GitHubからのpush→自動デプロイ確認
```

---

## 🔄 **復旧用設定値保管**

### **緊急復旧コマンド**

```bash
# DNS確認コマンド（復旧時使用）
nslookup yolube.jp
nslookup www.yolube.jp
nslookup -type=MX yolube.jp
nslookup -type=CNAME www.yolube.jp

# Vercel CLI復旧（必要時）
vercel domains ls
vercel domains add yolube.jp
```

### **Xserverサポート連絡用**

```
【Xserverサポート緊急連絡用】

ドメイン: yolube.jp
アカウント: [アカウント名]
変更日時: [記録]
変更内容: DNS設定復旧依頼
元の設定: [上記バックアップ内容]

連絡先: 06-6147-2580
```

---

**📝 変更実行前に、このチェックリストを完了してください！** 