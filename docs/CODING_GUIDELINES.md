# YOLUBE プロジェクト コーディングガイドライン

**バージョン**: 1.0
**最終更新**: 2025年10月11日
**対象**: YOLUBEウェブサイト開発プロジェクト

---

## 📋 目次

1. [基本方針](#1-基本方針)
2. [ファイル構成とディレクトリ構造](#2-ファイル構成とディレクトリ構造)
3. [命名規則](#3-命名規則)
4. [CSS設計方針](#4-css設計方針)
5. [React / JavaScript 規約](#5-react--javascript-規約)
6. [多言語対応の方針](#6-多言語対応の方針)
7. [Git規約](#7-git規約)
8. [使用を推奨/非推奨とする記法](#8-使用を推奨非推奨とする記法)
9. [参考リソース](#9-参考リソース)

---

## 1. 基本方針

### 1.1 ベースガイドライン

本プロジェクトは以下の公開スタイルガイドをベースとします：

- **JavaScript**: [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- **React**: [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react)
- **CSS**: [CSS Guidelines by Harry Roberts](https://cssguidelin.es/)

### 1.2 プロジェクト目標

1. **多言語対応** - 7言語（日本語、英語、中国語、韓国語、ドイツ語、フランス語、スペイン語）をシームレスに提供
2. **高パフォーマンス** - 最適化されたバンドルサイズと高速なレンダリング
3. **保守性** - 明確な命名規則と構造により、誰でも理解・修正できるコード
4. **アクセシビリティ** - 全ユーザーが快適に利用できるUI/UX
5. **レスポンシブ対応** - デスクトップ、タブレット、モバイルの完全対応

### 1.3 3層ガイドライン構造

```
📘 Layer 1: 本ドキュメント (CODING_GUIDELINES.md)
   ↓ プロジェクト固有ルール（毎回参照・必須）

📗 Layer 2: 基礎ガイドライン（Airbnb Style Guide等）
   ↓ プロジェクト開始時に1度熟読

📙 Layer 3: 特殊ケース用リソース
   ↓ 必要時のみWebSearchで検索
```

---

## 2. ファイル構成とディレクトリ構造

### 2.1 プロジェクト構造

```
yolube/cursor/
├── src/
│   ├── components/              # 再利用可能なコンポーネント
│   │   ├── admin/              # 管理画面用コンポーネント
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Dashboard.css
│   │   │   ├── ReservationList.jsx
│   │   │   └── ReservationList.css
│   │   ├── Hero.js             # トップページヒーローセクション
│   │   ├── Hero.css
│   │   ├── ReservationForm.jsx # 予約フォーム
│   │   └── ReservationForm.css
│   ├── pages/                  # ページコンポーネント
│   │   ├── ke/                 # Ke.イベントページ
│   │   │   ├── KeLPWeb3.js
│   │   │   └── KeLP.css
│   │   └── admin/              # 管理画面ページ
│   │       ├── Admin.jsx
│   │       ├── Admin.css
│   │       ├── Login.jsx
│   │       └── Login.css
│   ├── contexts/               # React Context（認証、言語等）
│   │   └── AuthContext.jsx
│   ├── services/               # API連携サービス
│   │   └── googleSheets.js
│   ├── utils/                  # ユーティリティ関数
│   │   └── gtm.js             # Google Tag Manager
│   ├── App.js                  # メインアプリ
│   ├── App.css                 # グローバルスタイル・CSS変数定義
│   ├── index.js                # エントリーポイント
│   └── imageConfig.js          # 画像設定
├── public/
│   ├── images/                 # 画像ファイル
│   ├── docs/PDF/               # PDF資料
│   └── index.html              # HTML エントリーポイント
├── docs/                       # ドキュメント・GASコード
│   ├── GAS_INTEGRATED.gs       # Google Apps Script 統合コード
│   ├── CODING_GUIDELINES.md    # 本ドキュメント
│   ├── GTM_IMPLEMENTATION.md   # GTM実装ガイド
│   └── [技術ドキュメント]
├── scripts/                    # ビルドスクリプト
├── package.json
├── README.md
└── .gitignore
```

### 2.2 ディレクトリの役割

| ディレクトリ | 用途 | 例 |
|-------------|------|-----|
| `src/components/` | 再利用可能なコンポーネント | Header, Footer, Hero, Contact |
| `src/pages/` | ページ単位のコンポーネント | KeLPWeb3.js, Admin.jsx |
| `src/contexts/` | React Context（グローバル状態） | AuthContext.jsx |
| `src/services/` | 外部API連携・データ取得 | googleSheets.js |
| `src/utils/` | 汎用ユーティリティ関数 | gtm.js |
| `public/images/` | 静的画像ファイル | OGP画像、スライド画像 |
| `docs/` | システムドキュメント・GASコード | README_GAS.md, API仕様書 |

---

## 3. 命名規則

### 3.1 ファイル命名規則

| 種類 | 命名規則 | 例 |
|------|---------|-----|
| **Reactコンポーネント** | PascalCase | `Hero.js`, `ReservationForm.jsx`, `Dashboard.jsx` |
| **CSS** | コンポーネント名.css | `Hero.css`, `ReservationForm.css`, `KeLP.css` |
| **ページコンポーネント** | PascalCase + 説明的名前 | `KeLPWeb3.js`, `Admin.jsx` |
| **Context** | PascalCase + Context | `AuthContext.jsx` |
| **Service** | camelCase | `googleSheets.js` |
| **Utility** | camelCase | `gtm.js`, `imageConfig.js` |
| **定数ファイル** | UPPER_SNAKE_CASE | `API_CONSTANTS.js` |

**ファイル拡張子ルール:**
- **`.js`**: 既存コンポーネント（Hero.js, About.js等）
- **`.jsx`**: 新規作成するReactコンポーネント（推奨）
- 一貫性を保つため、既存ファイルの拡張子は変更しない

### 3.2 変数・関数の命名規則

#### JavaScript / React

```javascript
// ✅ 良い例

// 変数: camelCase
const userName = 'John';
const isLoading = true;
const eventData = { date: '2025-10-18' };

// 定数: UPPER_SNAKE_CASE
const API_BASE_URL = 'https://script.google.com/macros/s/...';
const MAX_RETRY_COUNT = 3;

// 関数: camelCase（動詞 + 名詞）
function fetchEventData() { }
function handleSubmit() { }
function validateEmail(email) { }

// React コンポーネント: PascalCase
const ReservationForm = () => { };
const AdminDashboard = () => { };

// React Hooks: use + 動詞/名詞
const [isOpen, setIsOpen] = useState(false);
const [eventData, setEventData] = useState(null);
function useLocalStorage(key) { }

// イベントハンドラ: handle + イベント名
const handleClick = () => { };
const handleFormSubmit = (e) => { };
const handleMenuToggle = () => { };

// Boolean変数: is/has/should + 形容詞
const isVisible = true;
const hasError = false;
const shouldUpdate = true;

// 配列: 複数形
const users = [];
const events = [];
const reservations = [];

// ❌ 悪い例
const UserName = 'John';           // PascalCaseは不可（コンポーネント名と混同）
const api_url = '...';             // snake_caseは不可
function FetchData() { }           // 関数にPascalCaseは不可
const click = () => { };           // イベントハンドラはhandle-で始める
const open = true;                 // Boolean変数はis/has/shouldで始める
```

### 3.3 CSS クラス命名規則

#### BEM (Block Element Modifier) を基本とする

```css
/* ✅ 良い例 */

/* Block（独立したコンポーネント） */
.hero { }
.reservation-form { }

/* Element（Blockの構成要素） */
.hero__title { }
.hero__image { }
.reservation-form__input { }
.reservation-form__button { }

/* Modifier（Blockの状態・バリエーション） */
.hero--dark { }
.hero__button--primary { }
.reservation-form--loading { }

/* プレフィックス付きクラス（ページ固有） */
.ke-header { }           /* Ke.ページのヘッダー */
.ke-nav { }             /* Ke.ページのナビゲーション */
.ke-container { }       /* Ke.ページのコンテナ */

.admin-dashboard { }    /* 管理画面ダッシュボード */
.admin-table { }        /* 管理画面テーブル */

/* 状態クラス（JavaScript連携） */
.is-active { }
.is-open { }
.is-loading { }
.is-disabled { }

/* ユーティリティクラス（App.cssで定義） */
.text-center { }
.text-xs { }
.font-bold { }
.leading-relaxed { }


/* ❌ 悪い例 */
.Hero { }                    /* PascalCaseは不可 */
.hero_title { }              /* アンダースコア1つはNG（BEMは__2つ） */
.heroTitle { }               /* camelCaseは不可 */
.hero-title-dark-mode { }    /* 階層が深すぎる、Modifierを使う */
```

#### プレフィックスのルール

- **`ke-*`**: Ke.イベントページ専用（例: `ke-header`, `ke-gallery`, `ke-flow`）
- **`admin-*`**: 管理画面専用（例: `admin-dashboard`, `admin-table`）
- **プレフィックスなし**: 全ページ共通コンポーネント（例: `hero`, `footer`）

---

## 4. CSS設計方針

### 4.1 CSS変数の使用（必須）

すべての色、フォントサイズ、スペーシングは `App.css` の `:root` で定義されたCSS変数を使用すること。

#### 定義済みCSS変数

```css
/* App.css の :root セクション */

:root {
  /* カラー変数 */
  --primary-color: #8BC780;      /* メインブランドカラー（グリーン） */
  --primary-dark: #6BA563;       /* ダークグリーン */
  --primary-light: #A5D59C;      /* ライトグリーン */
  --secondary-color: #FF6B6B;    /* セカンダリカラー（レッド） */
  --accent-color: #FFD93D;       /* アクセントカラー（イエロー） */
  --text-primary: #2d3748;       /* プライマリテキスト */
  --text-secondary: #4a5568;     /* セカンダリテキスト */
  --text-muted: #718096;         /* 薄いテキスト */
  --bg-white: #fff;
  --bg-light: #f8f9fa;
  --shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  --shadow-hover: 0 4px 30px rgba(0, 0, 0, 0.15);

  /* フォントサイズ階層 */
  --font-size-xs: 0.75rem;     /* 12px */
  --font-size-sm: 0.875rem;    /* 14px */
  --font-size-base: 1rem;      /* 16px */
  --font-size-lg: 1.125rem;    /* 18px */
  --font-size-xl: 1.25rem;     /* 20px */
  --font-size-2xl: 1.5rem;     /* 24px */
  --font-size-3xl: 1.875rem;   /* 30px */
  --font-size-4xl: 2.25rem;    /* 36px */
  --font-size-5xl: 3rem;       /* 48px */
  --font-size-6xl: 3.75rem;    /* 60px */

  /* フォントウェイト */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* 行の高さ */
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.625;
  --line-height-loose: 2;

  /* 文字間隔 */
  --letter-spacing-tight: -0.025em;
  --letter-spacing-normal: 0;
  --letter-spacing-wide: 0.025em;
  --letter-spacing-wider: 0.05em;
}
```

#### 使用例

```css
/* ✅ 良い例 */
.hero-title {
  font-size: var(--font-size-5xl);
  color: var(--primary-color);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
}

.button-primary {
  background-color: var(--primary-color);
  color: var(--bg-white);
  box-shadow: var(--shadow);
}

.button-primary:hover {
  background-color: var(--primary-dark);
  box-shadow: var(--shadow-hover);
}

/* ❌ 悪い例 */
.hero-title {
  font-size: 48px;           /* 直接指定NG、CSS変数を使用すること */
  color: #8BC780;            /* 直接指定NG、CSS変数を使用すること */
}
```

### 4.2 レスポンシブデザインのブレークポイント

統一されたブレークポイントを使用すること。

```css
/* デスクトップファースト（max-width） */

/* タブレット横向き */
@media (max-width: 1024px) {
  /* 1024px以下のスタイル */
}

/* タブレット縦向き */
@media (max-width: 768px) {
  /* 768px以下のスタイル */
}

/* スマートフォン */
@media (max-width: 480px) {
  /* 480px以下のスタイル */
}
```

**ブレークポイント早見表:**

| デバイス | 幅 | メディアクエリ |
|---------|-----|--------------|
| デスクトップ | 1025px~ | デフォルト（メディアクエリ不要） |
| タブレット横 | 769px ~ 1024px | `@media (max-width: 1024px)` |
| タブレット縦 | 481px ~ 768px | `@media (max-width: 768px)` |
| スマートフォン | ~480px | `@media (max-width: 480px)` |

### 4.3 アニメーションの一元管理

共通アニメーションは `App.css` で定義すること。

```css
/* App.css */

/* フェードイン */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* スライドアップ */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 使用例 */
.fade-in {
  animation: fadeIn 0.5s ease-in;
}

.slide-up {
  animation: slideUp 0.6s ease-out;
}
```

### 4.4 多言語フォントシステム

`data-lang` 属性を使用して言語別フォントを適用する。

```css
/* KeLP.css */

/* 日本語（デフォルト） */
.ke-lp {
  font-family: 'Noto Sans JP', sans-serif;
}

/* 英語 */
.ke-lp[data-lang="en"] .ke-hero-title {
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

/* 中国語 */
.ke-lp[data-lang="zh"] .ke-hero-title {
  font-family: 'Noto Sans SC', sans-serif;
}

/* 韓国語 */
.ke-lp[data-lang="ko"] .ke-hero-title {
  font-family: 'Noto Sans KR', sans-serif;
}
```

### 4.5 禁止されたスタイル

以下のスタイルは使用禁止です。

```css
/* ❌ 削除済み装飾（使用禁止） */

/* border-left装飾は使用しない */
.section {
  border-left: 4px solid #color;  /* NG: yolube.jpのデザイン方針に合わない */
}

/* 代替案: 全周ボーダーを使用 */
.section {
  border: 2px solid var(--primary-color);  /* OK */
}
```

**理由**: `border-left` の縦線装飾は、YOLUBEのデザイン方針に合わないため削除されました（2025年10月7日実装）。

---

## 5. React / JavaScript 規約

### 5.1 コンポーネント設計パターン

#### Functional Component + Hooks を使用

```javascript
// ✅ 良い例: Functional Component + Hooks

import React, { useState, useEffect, useRef } from 'react';
import './Hero.css';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    // 副作用処理
  }, [currentSlide]);

  const handleNextSlide = () => {
    setCurrentSlide(prev => prev + 1);
  };

  return (
    <div className="hero" ref={sliderRef}>
      {/* JSX */}
    </div>
  );
};

export default Hero;


// ❌ 悪い例: Class Component（使用禁止）

class Hero extends React.Component {
  // Class Componentは使用しない
}
```

#### コンポーネント構造のテンプレート

```javascript
// ComponentName.jsx

// 1. React/外部ライブラリのインポート
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

// 2. 内部モジュールのインポート
import GoogleSheetsService from '../../services/googleSheets';
import { trackPageView } from '../../utils/gtm';

// 3. スタイルのインポート
import './ComponentName.css';

// 4. コンポーネント定義
const ComponentName = () => {
  // 4-1. State定義
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // 4-2. Ref定義
  const formRef = useRef(null);

  // 4-3. useEffect（副作用）
  useEffect(() => {
    // 初期化処理
  }, []);

  // 4-4. イベントハンドラ
  const handleSubmit = (e) => {
    e.preventDefault();
    // 処理
  };

  // 4-5. ヘルパー関数
  const formatDate = (date) => {
    // 処理
  };

  // 4-6. JSX return
  return (
    <div className="component-name">
      {/* JSX */}
    </div>
  );
};

// 5. エクスポート
export default ComponentName;
```

### 5.2 Hooks の使用方法

#### useState

```javascript
// ✅ 良い例
const [isOpen, setIsOpen] = useState(false);
const [eventData, setEventData] = useState(null);
const [users, setUsers] = useState([]);

// 更新は必ず set関数を使用
setIsOpen(true);
setEventData({ date: '2025-10-18' });

// 前の値を参照する場合はコールバック形式
setCurrentSlide(prev => prev + 1);


// ❌ 悪い例
let isOpen = false;  // stateを使わず直接変数は不可
isOpen = true;       // 直接変更は不可（再レンダリングされない）
```

#### useEffect

```javascript
// ✅ 良い例

// マウント時のみ実行（空配列）
useEffect(() => {
  fetchData();
}, []);

// 依存配列を明示的に指定
useEffect(() => {
  if (eventId) {
    fetchEventData(eventId);
  }
}, [eventId]);

// クリーンアップ関数を使用
useEffect(() => {
  const timer = setInterval(() => {
    fetchData();
  }, 30000);

  return () => clearInterval(timer);  // クリーンアップ
}, []);


// ❌ 悪い例

// 依存配列を省略（無限ループの危険性）
useEffect(() => {
  setCount(count + 1);  // NG: countが変更されるたびに再実行
});

// 依存配列に必要な値を含めない（ESLintエラー）
useEffect(() => {
  fetchEventData(eventId);
}, []);  // NG: eventIdを依存配列に含めるべき
```

#### useRef

```javascript
// ✅ 良い例

// DOM参照
const formRef = useRef(null);
const inputRef = useRef(null);

// 再レンダリングせずに値を保持
const touchStartX = useRef(0);

// 使用例
<form ref={formRef}>
  <input ref={inputRef} />
</form>

// DOM操作
inputRef.current.focus();
```

### 5.3 Props と PropTypes

```javascript
// ✅ 良い例

// Propsの受け取り（分割代入推奨）
const Button = ({ label, onClick, variant = 'primary' }) => {
  return (
    <button
      className={`btn btn--${variant}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

// デフォルト値を指定
Button.defaultProps = {
  variant: 'primary',
  onClick: () => {},
};


// ❌ 悪い例

// Propsを分割代入しない
const Button = (props) => {
  return <button onClick={props.onClick}>{props.label}</button>;  // 冗長
};
```

### 5.4 条件付きレンダリング

```javascript
// ✅ 良い例

// 三項演算子（2つの選択肢）
{isLoading ? <Spinner /> : <Content />}

// 論理AND（1つの条件）
{isError && <ErrorMessage />}
{showModal && <Modal />}

// 早期リターン
if (isLoading) return <Spinner />;
if (error) return <ErrorMessage error={error} />;
return <Content />;


// ❌ 悪い例

// 過度にネストされた三項演算子
{isLoading ? <Spinner /> : isError ? <Error /> : hasData ? <Content /> : null}

// if-elseをJSX内で使用（構文エラー）
{if (isLoading) { return <Spinner />; }}  // NG
```

### 5.5 イベントハンドラ

```javascript
// ✅ 良い例

const handleSubmit = (e) => {
  e.preventDefault();  // デフォルト動作を防止
  // 処理
};

const handleClick = () => {
  // 処理
};

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};

// JSX
<form onSubmit={handleSubmit}>
  <button onClick={handleClick}>Submit</button>
  <input name="email" onChange={handleInputChange} />
</form>


// ❌ 悪い例

// インライン関数（パフォーマンス低下）
<button onClick={() => setCount(count + 1)}>Click</button>

// イベント引数を取らないハンドラ
const handleSubmit = () => {  // NG: eを取るべき
  // e.preventDefault()が使えない
};
```

---

## 6. 多言語対応の方針

### 6.1 翻訳データの管理

翻訳データは `translations` オブジェクトで管理する。

```javascript
// KeLPWeb3.js

const translations = {
  ja: {
    nav: {
      about: 'イベントについて',
      schedule: '開催スケジュール',
      access: 'アクセス',
      contact: 'お問い合わせ'
    },
    hero: {
      title: '世界中のテーブルゲームで遊ぼう！',
      description: 'テーブルゲーム交流会：Ke.は年齢、世代、立場を問わず遊べる交流会です。'
    }
  },
  en: {
    nav: {
      about: 'About Event',
      schedule: 'Schedule',
      access: 'Access',
      contact: 'Contact'
    },
    hero: {
      title: 'Play board games from around the world!',
      description: 'Ke. is a board game social event open to all ages and backgrounds.'
    }
  },
  // 他の言語...
};
```

### 6.2 言語切り替えの実装

```javascript
// State管理
const [currentLanguage, setCurrentLanguage] = useState('ja');

// 翻訳テキストの取得
const t = translations[currentLanguage];

// JSX
<h1>{t.hero.title}</h1>
<p>{t.hero.description}</p>

// 言語切り替えボタン
<button onClick={() => setCurrentLanguage('en')}>English</button>
<button onClick={() => setCurrentLanguage('ja')}>日本語</button>
```

### 6.3 data-lang 属性の使用

```javascript
// トップレベル要素にdata-lang属性を設定
<div className="ke-lp" data-lang={currentLanguage}>
  {/* コンテンツ */}
</div>
```

```css
/* CSS側で言語別スタイルを適用 */

/* 日本語（デフォルト） */
.ke-hero-title {
  font-size: 12rem;
}

/* 英語 */
.ke-lp[data-lang="en"] .ke-hero-title {
  font-size: 11rem;
}

/* 韓国語 */
.ke-lp[data-lang="ko"] .ke-hero-title {
  font-size: 10rem;
}
```

### 6.4 対応言語

| 言語 | コード | フォント |
|-----|-------|---------|
| 日本語 | `ja` | Noto Sans JP |
| 英語 | `en` | Helvetica Neue, Arial |
| 中国語（簡体字） | `zh` | Noto Sans SC |
| 韓国語 | `ko` | Noto Sans KR |
| ドイツ語 | `de` | Helvetica Neue, Arial |
| フランス語 | `fr` | Helvetica Neue, Arial |
| スペイン語 | `es` | Helvetica Neue, Arial |

---

## 7. Git規約

### 7.1 コミットメッセージ形式

**フォーマット:**

```
<type>: <subject>

<body>（オプション）
```

#### type（必須）

| Type | 用途 | 例 |
|------|------|-----|
| `feat` | 新機能の追加 | `feat: Google Tag Manager (GTM) でアクセス解析を実装` |
| `fix` | バグ修正 | `fix: スマートフォンでのタイトル改行を確実に表示` |
| `docs` | ドキュメントのみの変更 | `docs: GTM実装とアクセス解析の詳細をREADMEに追加` |
| `style` | コードの意味に影響しない変更（空白、フォーマット等） | `style: インデントを統一` |
| `refactor` | リファクタリング（機能変更なし） | `refactor: fetchDataをカスタムフックに分離` |
| `test` | テストの追加・修正 | `test: ReservationFormのユニットテスト追加` |
| `chore` | ビルド、設定ファイル等の変更 | `chore: Vercel強制再ビルド - GTM実装の反映` |
| `perf` | パフォーマンス改善 | `perf: 画像サイズを最適化` |

#### subject（必須）

- **50文字以内**で簡潔に
- **命令形**で記述（「〜を追加」「〜を修正」）
- **日本語 or 英語**（プロジェクト内で統一すれば可）
- 句読点は不要

#### body（オプション）

- 詳細な説明が必要な場合のみ記述
- 「なぜ」「何を」変更したかを明確に

**良い例:**

```bash
feat: 予約完了画面にSNSシェアボタン追加

X（Twitter）とFacebookでイベント参加をシェアできる機能を実装。
シェアテキストは自動生成され、イベント名、開催日時、会場を含む。
```

```bash
fix: Android端末でのフォームラベル表示崩れを修正

Android Chromeでinputのplaceholderがラベルと重複する問題を修正。
z-indexとポジショニングを調整し、ラベルを常に上部に表示。
```

```bash
docs: READMEにGTM実装内容と次のステップを追加
```

**悪い例:**

```bash
Update files  // NG: 何を変更したか不明確
```

```bash
feat: added new feature to the reservation form and fixed some bugs and updated README  // NG: 1コミットに複数の変更
```

### 7.2 ブランチ戦略

**シンプルなGit Flow:**

- **`master`**: 本番環境（Vercel自動デプロイ）
- **`develop`**: 開発環境（オプション）
- **`feature/*`**: 新機能開発
- **`fix/*`**: バグ修正

**ブランチ命名例:**

```bash
feature/gtm-implementation     # 新機能: GTM実装
feature/multi-language         # 新機能: 多言語対応
fix/mobile-menu-layout         # バグ修正: モバイルメニューレイアウト
fix/form-validation            # バグ修正: フォームバリデーション
```

### 7.3 コミット頻度

- **小さく頻繁に**コミットする
- 1つのコミットは1つの変更に限定
- 動作するコードのみコミット

**良い例:**

```bash
git commit -m "feat: ページビュートラッキング実装"
git commit -m "feat: お問い合わせフォームトラッキング実装"
git commit -m "feat: 予約完了トラッキング実装"
```

**悪い例:**

```bash
git commit -m "feat: GTM実装完了"  # NG: 複数の変更を1コミットにまとめている
```

---

## 8. 使用を推奨/非推奨とする記法

### 8.1 ✅ 推奨される記法

#### JavaScript / React

```javascript
// ✅ アロー関数（簡潔で読みやすい）
const add = (a, b) => a + b;
const handleClick = () => { /* 処理 */ };

// ✅ 分割代入
const { name, email } = formData;
const [first, second, ...rest] = array;

// ✅ スプレッド演算子
const newArray = [...oldArray, newItem];
const newObject = { ...oldObject, key: newValue };

// ✅ テンプレートリテラル
const message = `Hello, ${userName}!`;
const url = `${API_BASE_URL}/events/${eventId}`;

// ✅ オプショナルチェーン
const userName = user?.profile?.name ?? 'Guest';
const firstItem = array?.[0];

// ✅ Null合体演算子
const count = userCount ?? 0;
const name = userName ?? 'Anonymous';

// ✅ Array メソッド（map, filter, reduce）
const names = users.map(user => user.name);
const adults = users.filter(user => user.age >= 18);
const total = prices.reduce((sum, price) => sum + price, 0);

// ✅ async/await（非同期処理）
const fetchData = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};
```

#### CSS

```css
/* ✅ CSS変数の使用 */
.button {
  color: var(--primary-color);
  font-size: var(--font-size-lg);
}

/* ✅ Flexboxレイアウト */
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

/* ✅ Grid レイアウト */
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

/* ✅ transitionでスムーズなアニメーション */
.button {
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.button:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
}
```

### 8.2 ❌ 非推奨・禁止される記法

#### JavaScript / React

```javascript
// ❌ var（使用禁止、constまたはletを使用）
var count = 0;  // NG
const count = 0;  // OK
let count = 0;    // OK（再代入が必要な場合のみ）

// ❌ function式（アロー関数を使用）
function add(a, b) {  // NG（トップレベル関数以外）
  return a + b;
}
const add = (a, b) => a + b;  // OK

// ❌ 文字列結合（テンプレートリテラルを使用）
const message = 'Hello, ' + userName + '!';  // NG
const message = `Hello, ${userName}!`;       // OK

// ❌ == 演算子（=== を使用）
if (count == '10') { }  // NG
if (count === 10) { }   // OK

// ❌ 直接DOM操作（Reactを使用）
document.getElementById('button').style.color = 'red';  // NG
// Reactのstateとstyleプロパティを使用

// ❌ console.log を本番コードに残す
console.log('Debug message');  // NG: 開発時のみ使用、本番前に削除

// ❌ Class Component（Functional Component + Hooksを使用）
class MyComponent extends React.Component { }  // NG
const MyComponent = () => { };                  // OK
```

#### CSS

```css
/* ❌ !important の濫用 */
.button {
  color: red !important;  /* NG: 特別な理由がない限り使用しない */
}

/* ❌ インラインスタイル（JSX内で直接指定） */
<div style={{ color: 'red', fontSize: '20px' }}>  {/* NG */}

/* ❌ ハードコードされた色・サイズ */
.hero-title {
  color: #8BC780;       /* NG: var(--primary-color)を使用 */
  font-size: 48px;      /* NG: var(--font-size-5xl)を使用 */
}

/* ❌ 過度にネストされたセレクタ（3階層以内） */
.header .nav .menu .item .link {  /* NG: ネストが深すぎる */
}

/* ❌ IDセレクタ（クラスセレクタを使用） */
#hero-section {  /* NG */
}
.hero-section {  /* OK */
}

/* ❌ ベンダープレフィックスの手動追加（自動化ツールを使用） */
.box {
  -webkit-border-radius: 10px;  /* NG: 自動化ツールに任せる */
  -moz-border-radius: 10px;
  border-radius: 10px;
}
```

### 8.3 セキュリティ上の注意

```javascript
// ❌ 機密情報をコードに直接記述
const API_KEY = 'abc123xyz';  // NG: 環境変数を使用

// ✅ 環境変数を使用
const API_KEY = process.env.REACT_APP_API_KEY;  // OK


// ❌ ユーザー入力を直接HTMLに埋め込む（XSS脆弱性）
<div dangerouslySetInnerHTML={{ __html: userInput }} />  // NG

// ✅ Reactのデフォルトエスケープを使用
<div>{userInput}</div>  // OK（自動エスケープ）
```

---

## 9. 参考リソース

### 9.1 基礎ガイドライン（Layer 2）

**プロジェクト開始時に1度熟読:**

- **JavaScript**: [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- **React**: [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react)
- **CSS**: [CSS Guidelines by Harry Roberts](https://cssguidelin.es/)

### 9.2 公式ドキュメント

- **React 公式**: https://react.dev/
- **React Hooks**: https://react.dev/reference/react
- **Create React App**: https://create-react-app.dev/
- **MDN Web Docs (CSS)**: https://developer.mozilla.org/ja/docs/Web/CSS

### 9.3 特殊ケース用リソース（Layer 3）

**必要時のみWebSearchで検索:**

- React 18 Concurrent Rendering
- CSS Grid / Flexbox 複雑なレイアウト
- Web Accessibility (WCAG) ガイドライン
- Google Tag Manager 実装ガイド
- Google Analytics 4 設定

### 9.4 プロジェクト内ドキュメント

- **README.md**: プロジェクト概要、セットアップ手順
- **docs/GAS_INTEGRATED_DOCUMENTATION.md**: Google Apps Script API仕様
- **docs/GTM_IMPLEMENTATION.md**: GTM実装ガイド
- **docs/fixlist.md**: 総点検レポート（改善点リスト）

---

## 📝 改訂履歴

| バージョン | 日付 | 変更内容 |
|-----------|------|---------|
| 1.0 | 2025-10-11 | 初版作成 |

---

## ✅ チェックリスト（開発開始前）

新しいタスクを開始する前に、このチェックリストを確認してください：

- [ ] 本ドキュメント（CODING_GUIDELINES.md）を読んだ
- [ ] Airbnb Style Guide（Layer 2）を1度熟読した
- [ ] プロジェクト構造を理解した
- [ ] 命名規則を確認した
- [ ] CSS変数の使い方を理解した
- [ ] レスポンシブブレークポイントを把握した
- [ ] Gitコミットメッセージ形式を確認した

---

**© 2025 YOLUBE. All rights reserved.**
