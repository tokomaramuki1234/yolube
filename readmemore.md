# YOLUBE Website - 技術詳細ドキュメント

## 目次
1. [OGP（Open Graph Protocol）設定](#ogp設定)
2. [プロジェクト構成](#プロジェクト構成)
3. [デプロイメント](#デプロイメント)

---

## OGP設定

### 概要
本サイトでは、各ページごとに異なるOGP（Open Graph Protocol）画像とメタデータを設定しています。
Facebook、Twitter、LINEなどのSNSでシェアされた際に、各ページに適した画像とテキストが表示されるようになっています。

### 技術的背景と課題

#### React SPA（Single Page Application）におけるOGP設定の問題

通常、Reactアプリケーション（SPA）では、すべてのルート（`/`, `/training`, `/ke`など）が**同一の`index.html`ファイル**を返します。

```
ユーザーがアクセス → Vercel/サーバー → index.html（1つだけ）を返す
                                      ↓
                              ReactがJavaScriptでページを描画
```

**問題点:**
- FacebookやTwitterなどのSNSクローラーは、**JavaScriptを実行する前の初期HTML（静的HTML）**を読み取る
- react-helmet-asyncなどを使ってクライアントサイドで動的にOGPタグを変更しても、クローラーには認識されない
- すべてのページが同じOGP画像・テキストで共有されてしまう

### 解決策: ページごとに物理的なindex.htmlを配置

本プロジェクトでは、**各ページ専用のindex.htmlを物理的に作成**することで、この問題を解決しています。

#### 実装方法

**1. ディレクトリ構造:**

```
public/
├── index.html              # トップページ（yolube.jp/）用
├── training/
│   └── index.html          # Trainingページ（yolube.jp/training）用
└── ke/
    └── index.html          # KEページ（yolube.jp/ke）用（※要確認）
```

**2. vercel.json設定:**

```json
{
  "routes": [
    {
      "src": "/training",
      "dest": "/training/index.html"
    },
    {
      "src": "/ke",
      "dest": "/ke/index.html"
    },
    {
      "src": "/static/(.*)",
      "dest": "/static/$1"
    },
    {
      "src": "/images/(.*)",
      "dest": "/images/$1"
    },
    {
      "src": "/(.*\\.(js|css|png|jpg|jpeg|gif|svg|ico|json|woff|woff2|ttf|eot))",
      "dest": "/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

**ポイント:**
- `/training`にアクセス → `public/training/index.html`が配信される
- `/ke`にアクセス → `public/ke/index.html`が配信される
- それ以外 → `public/index.html`が配信される
- どのHTMLファイルも、同じReactアプリ（`bundle.js`）を読み込むため、アプリの動作は同じ
- ただし、HTMLの`<head>`内のOGPタグはそれぞれ異なる

### 現在のOGP設定一覧

#### 1. トップページ（yolube.jp/）

**ファイル:** `public/index.html`

| 項目 | 内容 |
|------|------|
| **タイトル** | YOLUBE - 遊び心で社会を変える |
| **説明** | テーブルゲームの力で地域社会の課題解決に挑みます！ |
| **Facebook画像** | https://yolube.jp/images/OGP_FB.jpg |
| **Twitter画像** | https://yolube.jp/images/OGP_X.jpg |
| **画像サイズ** | 1200×630px |

#### 2. Trainingページ（yolube.jp/training）

**ファイル:** `public/training/index.html`

| 項目 | 内容 |
|------|------|
| **タイトル** | 遊びが、組織を強くする。コミュニケーション研修 \| YOLUBE |
| **説明** | テーブルゲームで実現する、誰もが参加したくなるコミュニケーション研修。社員同士の会話が少ない、部署間の壁が厚い、若手が早期離職してしまう、こうした組織課題を「遊び」で解決します。 |
| **画像** | https://yolube.jp/images/training-ogp.png |
| **画像サイズ** | 1200×630px |

#### 3. KEページ（yolube.jp/ke）

**ファイル:** `public/ke/index.html`（※要確認・未実装の可能性あり）

| 項目 | 内容 |
|------|------|
| **タイトル** | （要確認） |
| **説明** | （要確認） |
| **画像** | （要確認） |

### 新しいページにOGPを追加する方法

今後、新しいページ（例: `/events`）を追加する場合、以下の手順でOGP設定を行います：

#### ステップ1: 専用ディレクトリとindex.htmlを作成

```bash
mkdir -p public/events
```

#### ステップ2: public/events/index.htmlを作成

`public/index.html`をベースに、OGPタグ部分を変更します：

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="/images/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#8BC780" />
    <meta name="description" content="あなたのページの説明文" />
    
    <!-- 省略: フォント設定など -->
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://yolube.jp/events" />
    <meta property="og:title" content="イベント情報 | YOLUBE" />
    <meta property="og:description" content="YOLUBEが開催するイベントの情報をお届けします。" />
    <meta property="og:image" content="https://yolube.jp/images/events-ogp.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="https://yolube.jp/events" />
    <meta name="twitter:title" content="イベント情報 | YOLUBE" />
    <meta name="twitter:description" content="YOLUBEが開催するイベントの情報をお届けします。" />
    <meta name="twitter:image" content="https://yolube.jp/images/events-ogp.png" />
    
    <title>イベント情報 | YOLUBE</title>
  </head>
  <body>
    <noscript>正常に表示するには、JavaScriptを有効にしてください。</noscript>
    <div id="root"></div>
  </body>
</html>
```

#### ステップ3: vercel.jsonにルートを追加

```json
{
  "routes": [
    {
      "src": "/events",
      "dest": "/events/index.html"
    },
    // ... 他のルート設定
  ]
}
```

#### ステップ4: OGP画像を作成して配置

- **推奨サイズ:** 1200×630px（Facebook推奨）
- **ファイル名:** `events-ogp.png`
- **配置場所:** `public/images/events-ogp.png`

#### ステップ5: デプロイして検証

```bash
git add public/events/ public/images/events-ogp.png vercel.json
git commit -m "Add: Events page with dedicated OGP settings"
git push origin master
```

**検証方法:**
1. **Facebook Sharing Debugger:** https://developers.facebook.com/tools/debug/
   - URLに `https://yolube.jp/events` を入力
   - 「デバッグ」をクリック
   - 期待通りのOGP画像・タイトル・説明文が表示されるか確認
2. **キャッシュクリア:** 古い情報が表示される場合は「新しい情報をスクレイピング」ボタンをクリック

### OGP画像の仕様

| SNS | 推奨サイズ | アスペクト比 | 最大ファイルサイズ |
|-----|-----------|-------------|------------------|
| **Facebook** | 1200×630px | 1.91:1 | 8MB |
| **Twitter** | 1200×675px または 1200×628px | 16:9 または 1.91:1 | 5MB |
| **LINE** | 1200×630px | 1.91:1 | 制限なし（実質5MB程度推奨） |

**推奨:**
- **1200×630px**を使用すれば、すべてのSNSで最適に表示される
- ファイル形式: **PNG**または**JPG**
- ファイルサイズ: **500KB以下**を推奨（読み込み速度のため）

### トラブルシューティング

#### 問題1: OGP画像が更新されない

**原因:** SNS側でキャッシュされている

**解決策:**
1. Facebook Sharing Debuggerで「新しい情報をスクレイピング」をクリック
2. Twitter Card Validator（https://cards-dev.twitter.com/validator）で再検証
3. それでも更新されない場合は、画像ファイル名を変更（例: `training-ogp-v2.png`）

#### 問題2: react-helmet-asyncのOGPタグが表示される

**原因:** Reactコンポーネント内でHelmetを使ってOGPタグを設定している

**解決策:**
- react-helmet-asyncは、クライアントサイドでの表示用には有効だが、SNSクローラーには無効
- 物理的な`index.html`のOGPタグが優先されるため、Helmet側のOGPタグは削除しても問題ない
- ただし、`<title>`や`<meta name="description">`は残しておいても良い（SEO対策として）

#### 問題3: `/training`にアクセスしても`index.html`のOGPが表示される

**原因:** `vercel.json`のルート設定が間違っている、またはビルド時に`public/training/index.html`が含まれていない

**解決策:**
1. `vercel.json`の`routes`配列で、`/training`ルートが**他のルートより先**に定義されているか確認
2. `public/training/index.html`が存在するか確認
3. ビルド後、`build/training/index.html`が生成されているか確認

### 参考資料

- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Open Graph Protocol 公式サイト](https://ogp.me/)
- [Vercel Routing Documentation](https://vercel.com/docs/projects/project-configuration#routes)

---

## プロジェクト構成

（他のセクションは必要に応じて追加）

---

## デプロイメント

（他のセクションは必要に応じて追加）

---

**最終更新日:** 2025年10月29日
