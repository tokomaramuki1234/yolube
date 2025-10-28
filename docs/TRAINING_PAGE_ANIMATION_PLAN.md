# Training Page - WebGL風アニメーション実装計画

**作成日**: 2025年10月28日  
**対象ページ**: `/training` (企業研修LP)  
**目的**: ページ全体にWebGL風アニメーションを追加してユーザーエンゲージメント向上

---

## 📋 実装ステータス

| Phase | セクション | ステータス | 実装日 |
|-------|----------|---------|--------|
| Phase 1 | ヒーローセクション | ✅ 完了 | 2025-10-28 |
| Phase 2 | ページ全体 | 🔄 計画中 | - |

---

## 🎯 Phase 1完了: ヒーローセクション

**実装内容**:
- パターン4「分裂→集合」アニメーション採用
- メインタイトル: 文字が画面外のランダムな位置から集まる
- サブタイトル: ブラーインエフェクト
- 実装ファイル: `Training.js`, `Training.css`

---

## 📊 Phase 2計画: ページ要素カテゴライズ

### セクション構造一覧

| # | セクション名 | ID/Class | 行番号 | 説明 |
|---|------------|---------|--------|------|
| 1 | ヒーロー | `.training-hero` | 158-205 | ✅ Phase 1完了 |
| 2 | 課題提示 | `#problems` | 208-248 | お悩み3点 |
| 3 | 解決策提示 | `.training-solution` | 251-261 | 遊びで解決 |
| 4 | テーブルゲーム紹介 | `.training-tablegame-intro` | 264-327 | スライドショー含む |
| 5 | 調査研究動向 | `.training-research` | 330-370 | 学術的根拠 |
| 6 | 効果説明 | `#features` | 373-432 | プロセスフロー＋効果2点 |
| 7 | 研修プログラム | `#program` | 435-594 | 2フェーズ＋前後比較 |
| 8 | 競合優位性 | `.training-advantage` | 597-672 | 一般研修との比較 |
| 9 | アンケート結果 | `.training-survey-results` | 675-755 | 統計データ |
| 10 | 講師紹介 | `.training-instructor` | 758-808 | プロフィール |
| 11 | FAQ | `#faq` | 811-912 | よくある質問7件 |
| 12 | 料金プラン | `#pricing` | 915-1088 | 4プラン＋特典 |
| 13 | お問い合わせ | `#contact` | 1091-1166 | フォーム |

---

## 🎨 要素カテゴリ分類

### カテゴリ1: セクション見出し（Section Titles）

**対象要素**: `<h2>` タグ（全13箇所）

| セクション | 見出しテキスト | クラス |
|-----------|--------------|-------|
| 課題提示 | こんなお悩みありませんか？ | `.training-section-title` |
| 解決策 | そのお悩みを「遊び」で解決します | `.training-section-title` |
| TG紹介 | テーブルゲームとは？ | `.training-section-title` |
| 調査研究 | テーブルゲームの調査・研究動向 | `.training-section-title` |
| 効果 | 「遊び」がもたらす効果 | `.training-section-title` |
| プログラム | 研修プログラムの流れ | `.training-section-title` |
| 優位性 | なぜテーブルゲーム研修なのか？ | `.training-section-title` |
| アンケート | 研修参加者アンケート結果 | `.training-section-title` |
| 講師 | 研修講師・ファシリテーター | `.training-section-title` |
| FAQ | よくあるご質問 | `.training-section-title` |
| 料金 | 料金プラン | `.training-section-title` |

**推奨アニメーション**:
- **フェードイン＋上からスライド** (`fadeInUp`)
- スクロール時に発火（Intersection Observer）
- 控えめで読みやすさを損なわない

---

### カテゴリ2: サブ見出し（Sub Titles）

**対象要素**: `<h3>`, `<h4>` タグ

**H3レベル** (6箇所):
- 社内交流の活性化
- エンゲージメント向上
- 【第1～4回】アイスブレイク＆情報収集フェーズ
- 【第5～6回】実践活用フェーズ
- 研修前・研修後の変化
- 参加者の具体的な評価

**H4レベル** (多数):
- 話しかける人の固定化
- 部署間の情報共有不足
- 新人を襲う漠然とした不安
- 期待できる効果
- 一般的な研修の課題
- 研修前/研修後
- Q1/Q2...（FAQ質問）
- お試しプラン/ライトプラン/スタンダードプラン/プレミアムプラン
- 料金詳細

**推奨アニメーション**:
- **左からスライドイン** (`slideInLeft`)
- H3: やや大きめの動き
- H4: 控えめの動き

---

### カテゴリ3: 本文テキスト（Body Text）

**対象要素**: `<p>`, `<li>` タグ

**段落テキスト**:
- セクション説明文（`.training-solution-text`, `.training-tablegame-text`, etc.）
- フェーズ説明文
- FAQ回答文
- プラン説明文

**リストテキスト**:
- 課題項目の説明（`<ul><li>`）
- 効果項目の説明
- 研修前後の比較項目
- プラン特徴の箇条書き

**推奨アニメーション**:
- **シンプルフェードイン** (`fadeIn`)
- 遅延を最小限に（0.1s程度）
- 可読性を最優先

---

### カテゴリ4: 静止画像（Static Images）

**対象要素**: `<img>` タグ（スライドショー以外）

| セクション | 画像数 | 用途 |
|-----------|--------|------|
| 課題提示 | 3 | 課題イラスト |
| 効果 | 2 | 特徴イメージ |
| プログラム Phase1 | 2 | ゲーム風景・アンケート |
| プログラム Phase2 | 2 | ブレスト・SWOT図 |
| 前後比較 | 2 | 研修前・研修後 |
| 優位性 | 4 | 一般研修・ペルソナ・PDCA・成功体験 |
| 講師紹介 | 1 | プロフィール写真 |

**計16枚**

**推奨アニメーション**:
- **スケールアップ＋フェードイン** (`scaleUpFadeIn`)
- 画像が中心からやや拡大しながら表示
- ホバー時に軽く拡大（既存の`:hover`効果維持）

---

### カテゴリ5: スライドショー画像（Slideshow Images）

**対象要素**: `.training-tablegame-slideshow` 内の `<img>` タグ

**画像数**: 6枚（自動切り替え4秒間隔）

**現在の実装**:
- 横スライドアニメーション（`translateX`）
- ドットナビゲーション
- キャプション付き

**推奨アニメーション**:
- **既存の横スライドを維持**
- 追加提案: 切り替え時に軽いフェードイン効果
- 画像ロード時の最初の1枚に `fadeIn` 適用

---

### カテゴリ6: カード要素（Cards）

**対象要素**: カード型コンポーネント

| セクション | カード数 | クラス | 内容 |
|-----------|---------|-------|------|
| 課題提示 | 3 | `.training-problem-item` | 課題カード（画像＋見出し＋説明） |
| 効果 | 2 | `.training-feature-item` | 効果カード（画像＋見出し＋箇条書き） |
| 料金プラン | 4 | `.training-pricing-plan` | プランカード（価格＋特徴） |
| FAQ | 7 | `.training-faq-item` | FAQカード（質問＋回答） |

**計16カード**

**推奨アニメーション**:
- **下からスライドアップ＋フェードイン** (`fadeInUp`)
- カードごとに0.1s遅延でシーケンシャル表示
- ホバー時の既存効果（`:hover { transform: translateY(-5px) }`）を維持

---

### カテゴリ7: アイコン要素（Icons）

**対象要素**: FontAwesome アイコン

| セクション | アイコン数 | 用途 |
|-----------|-----------|------|
| プロセスフロー | 3 | 体験→気づき→行動 |
| FAQ | 7 | 質問マーク |
| 各種ボタン | 多数 | CTAアイコン |

**推奨アニメーション**:
- **回転＋スケール** (`rotateScale`)
- プロセスフローアイコンは順次表示
- FAQアイコンは質問カードと同時表示

---

### カテゴリ8: 統計数値（Statistics）

**対象要素**: 数値表示

| セクション | 数値 | クラス |
|-----------|------|-------|
| アンケート結果（大） | 2 | `.training-survey-percentage` | 87.2%, 96.2% |
| アンケート結果（小） | 6 | `.bar-percentage` | 各質問の選択肢割合 |

**推奨アニメーション**:
- **カウントアップアニメーション** (`countUp`)
- 0から目標値までアニメーション
- スクロール時に1回のみ発火

---

### カテゴリ9: CTAボタン（Call-to-Action Buttons）

**対象要素**: ボタン要素

| 種類 | クラス | 場所 |
|------|-------|------|
| メインCTA | `.training-btn-primary` | ヒーロー、フローティング、FAQ後、料金後 |
| アウトラインボタン | `.training-btn-outline` | （使用なし） |
| 特別バッジ | `.training-badge` | 限定プラン案内 |

**推奨アニメーション**:
- **パルスエフェクト** (`pulse`) - 既存のアニメーション維持
- ホバー時の拡大効果維持
- スクロール検知でアニメーション再発火

---

### カテゴリ10: プロセスフロー（Process Flow）

**対象要素**: `.training-process-flow`

**構成**:
- アイコン3個（体験・気づき・行動）
- 矢印2個
- ラベル＋説明文

**推奨アニメーション**:
- **左から右へシーケンシャル表示** (`flowSequence`)
- ①体験（0.2s遅延） → 矢印1 → ②気づき（0.4s遅延） → 矢印2 → ③行動（0.6s遅延）
- アイコンは回転しながら拡大

---

### カテゴリ11: 比較要素（Comparison）

**対象要素**: Before/After, 一般研修 vs TG研修

| セクション | 構造 | クラス |
|-----------|------|-------|
| 研修前後 | 2カラム＋矢印 | `.training-comparison-grid` |
| 優位性 | 画像＋テキスト（左右交互） | `.training-comparison-row` |

**推奨アニメーション**:
- **スプリットアニメーション** (`splitReveal`)
- 左右から同時にスライドイン
- 矢印は遅延して表示（既存のアニメーション維持）

---

### カテゴリ12: フォーム要素（Form Elements）

**対象要素**: お問い合わせフォーム

**構成**:
- 入力フィールド4個
- テキストエリア1個
- 送信ボタン1個

**推奨アニメーション**:
- **フィールドごとにフェードイン** (`fadeInStagger`)
- フォーカス時に軽く拡大（インタラクション強調）
- エラー時の振動効果（オプション）

---

## 🛠️ 実装技術スタック

### 使用技術

1. **CSS Animations**
   - `@keyframes` によるアニメーション定義
   - `transform`, `opacity`, `filter` の活用
   - GPU加速（`transform`, `opacity`優先）

2. **Intersection Observer API**
   - スクロール検知によるアニメーション発火
   - `threshold` 設定で表示タイミング調整
   - 1回のみ発火（`unobserve`）

3. **React Hooks**
   - `useEffect` - Observer初期化
   - `useRef` - DOM要素参照
   - `useState` - アニメーション状態管理

4. **CSS Custom Properties**
   - `--animation-delay` - 遅延時間制御
   - `--animation-duration` - 再生時間制御

---

## 📐 アニメーション命名規則

### CSSクラス名

```css
/* パターン: .animate-[effect]-[direction] */

/* フェード系 */
.animate-fade-in          /* シンプルフェードイン */
.animate-fade-in-up       /* 下から上にフェードイン */
.animate-fade-in-down     /* 上から下にフェードイン */
.animate-fade-in-left     /* 右から左にフェードイン */
.animate-fade-in-right    /* 左から右にフェードイン */

/* スケール系 */
.animate-scale-up         /* 中心から拡大 */
.animate-scale-up-fade    /* 拡大＋フェードイン */

/* スライド系 */
.animate-slide-in-left    /* 左からスライドイン */
.animate-slide-in-right   /* 右からスライドイン */
.animate-slide-in-up      /* 下からスライドアップ */

/* 回転系 */
.animate-rotate-scale     /* 回転＋スケール */
.animate-rotate-in        /* 回転しながら登場 */

/* 特殊効果 */
.animate-count-up         /* カウントアップ（JS制御） */
.animate-pulse            /* パルス（繰り返し） */
.animate-flow-sequence    /* シーケンシャル表示 */
.animate-split-reveal     /* 左右分割表示 */
```

---

## ⚡ パフォーマンス考慮事項

### GPU加速の活用

**推奨プロパティ**:
- `transform` (translate, scale, rotate)
- `opacity`
- `filter` (blur - 使用を最小限に)

**非推奨プロパティ**:
- `width`, `height` - レイアウト再計算が発生
- `top`, `left` - 再描画が発生
- `margin`, `padding` - レイアウトシフト

### will-change の適切な使用

```css
/* アニメーション開始直前にのみ適用 */
.animate-ready {
  will-change: transform, opacity;
}

/* アニメーション終了後に削除 */
.animate-complete {
  will-change: auto;
}
```

### モバイル最適化

- アニメーション時間を短縮（PC: 0.8s → Mobile: 0.5s）
- 複雑なアニメーションを簡略化
- `prefers-reduced-motion` メディアクエリ対応

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 📝 実装優先順位

### Phase 2-A: 高優先度（即座に実装）

1. **セクション見出し** (H2) - 全セクション共通
2. **カード要素** - 視覚的インパクト大
3. **統計数値** - カウントアップでユーザーエンゲージメント向上
4. **プロセスフロー** - ストーリー性の強調

### Phase 2-B: 中優先度（順次実装）

5. **静止画像** - 画像の印象向上
6. **サブ見出し** (H3, H4) - 階層構造の明確化
7. **比較要素** - Before/After、競合比較の強調
8. **CTAボタン** - コンバージョン率向上

### Phase 2-C: 低優先度（オプション）

9. **本文テキスト** - 可読性優先、控えめに
10. **フォーム要素** - ユーザビリティ優先
11. **アイコン** - 装飾的要素
12. **スライドショー** - 既存アニメーション維持

---

## 🧪 テスト計画

### テスト項目

1. **ブラウザ互換性**
   - Chrome, Firefox, Safari, Edge（最新版＋1つ前のバージョン）
   - iOS Safari, Android Chrome

2. **デバイステスト**
   - デスクトップ（1920x1080）
   - タブレット（768x1024）
   - スマートフォン（375x667, 414x896）

3. **パフォーマンステスト**
   - 初回ロード時間 < 3秒
   - アニメーション実行時のFPS > 50fps
   - Lighthouse Performance Score > 90

4. **アクセシビリティ**
   - `prefers-reduced-motion` 対応
   - スクリーンリーダー対応（ARIA属性）
   - キーボードナビゲーション

---

## 📅 実装スケジュール（提案）

| フェーズ | 内容 | 想定工数 |
|---------|------|---------|
| Phase 2-A | 高優先度要素 | 3-4時間 |
| Phase 2-B | 中優先度要素 | 2-3時間 |
| Phase 2-C | 低優先度要素 | 1-2時間 |
| テスト・調整 | 全体テスト・微調整 | 2-3時間 |

**合計想定工数**: 8-12時間

---

## 📚 参考資料

### 既存実装

- **ヒーローアニメーション**: `Training.css` 4055行以降
- **デモページ**: `src/components/HeroDemo.js`, `HeroDemo.css`

### CSS Animations リファレンス

- [MDN - CSS Animations](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_Animations)
- [MDN - transform](https://developer.mozilla.org/ja/docs/Web/CSS/transform)
- [Intersection Observer API](https://developer.mozilla.org/ja/docs/Web/API/Intersection_Observer_API)

### アニメーションライブラリ参考

- Animate.css（参考パターン）
- AOS (Animate On Scroll)（実装思想）

---

*最終更新: 2025年10月28日*
*作成者: AI Assistant*
