import React, { useState } from 'react';
import './H2Demo.css';

// パターン1: スライドイン (左から)
const Pattern1 = () => (
  <div className="h2-demo-container">
    <h2 className="h2-pattern-1">
      <span>こ</span><span>れ</span><span>は</span><span>見</span><span>出</span><span>し</span><span>で</span><span>す</span>
    </h2>
    <div className="pattern-info">
      <h3>パターン1: スライドイン (左から)</h3>
      <p><strong>動き:</strong> 文字が左から順番にスライドして現れる</p>
      <p><strong>用途:</strong> 安定感があり、読みやすさを重視したい見出し</p>
      <p><strong>技術:</strong> translateX + opacity + sequential delay</p>
    </div>
  </div>
);

// パターン2: フェードイン + 上昇
const Pattern2 = () => (
  <div className="h2-demo-container">
    <h2 className="h2-pattern-2">
      <span>こ</span><span>れ</span><span>は</span><span>見</span><span>出</span><span>し</span><span>で</span><span>す</span>
    </h2>
    <div className="pattern-info">
      <h3>パターン2: フェードイン + 上昇</h3>
      <p><strong>動き:</strong> 文字が下から浮き上がりながらフェードイン</p>
      <p><strong>用途:</strong> エレガントで洗練された印象を与える見出し</p>
      <p><strong>技術:</strong> translateY + opacity + ease-out</p>
    </div>
  </div>
);

// パターン3: 回転フェードイン
const Pattern3 = () => (
  <div className="h2-demo-container">
    <h2 className="h2-pattern-3">
      <span>こ</span><span>れ</span><span>は</span><span>見</span><span>出</span><span>し</span><span>で</span><span>す</span>
    </h2>
    <div className="pattern-info">
      <h3>パターン3: 回転フェードイン</h3>
      <p><strong>動き:</strong> 文字が回転しながら現れる</p>
      <p><strong>用途:</strong> ダイナミックで印象的な見出し</p>
      <p><strong>技術:</strong> rotateY + opacity + transform-origin</p>
    </div>
  </div>
);

// パターン4: スケール (拡大)
const Pattern4 = () => (
  <div className="h2-demo-container">
    <h2 className="h2-pattern-4">
      <span>こ</span><span>れ</span><span>は</span><span>見</span><span>出</span><span>し</span><span>で</span><span>す</span>
    </h2>
    <div className="pattern-info">
      <h3>パターン4: スケール (拡大)</h3>
      <p><strong>動き:</strong> 文字が小さい状態から拡大して現れる</p>
      <p><strong>用途:</strong> インパクトのある見出し、重要な情報</p>
      <p><strong>技術:</strong> scale + opacity + elastic ease</p>
    </div>
  </div>
);

// パターン5: タイプライター風
const Pattern5 = () => (
  <div className="h2-demo-container">
    <h2 className="h2-pattern-5">
      <span>こ</span><span>れ</span><span>は</span><span>見</span><span>出</span><span>し</span><span>で</span><span>す</span>
    </h2>
    <div className="pattern-info">
      <h3>パターン5: タイプライター風</h3>
      <p><strong>動き:</strong> 文字が1文字ずつタイプされるように現れる</p>
      <p><strong>用途:</strong> ストーリー性のある見出し、段階的に読ませたい情報</p>
      <p><strong>技術:</strong> width clip + opacity + linear timing</p>
    </div>
  </div>
);

// パターン6: 波打ち (縦方向)
const Pattern6 = () => (
  <div className="h2-demo-container">
    <h2 className="h2-pattern-6">
      <span>こ</span><span>れ</span><span>は</span><span>見</span><span>出</span><span>し</span><span>で</span><span>す</span>
    </h2>
    <div className="pattern-info">
      <h3>パターン6: 波打ち (縦方向)</h3>
      <p><strong>動き:</strong> 文字が波のように上下に動きながら現れる</p>
      <p><strong>用途:</strong> 親しみやすく、リズム感のある見出し</p>
      <p><strong>技術:</strong> translateY wave + opacity + sequential delay</p>
    </div>
  </div>
);

const H2Demo = () => {
  const [currentPattern, setCurrentPattern] = useState(1);

  const patterns = [
    { id: 1, name: 'パターン1: スライドイン (左から)', component: Pattern1 },
    { id: 2, name: 'パターン2: フェードイン + 上昇', component: Pattern2 },
    { id: 3, name: 'パターン3: 回転フェードイン', component: Pattern3 },
    { id: 4, name: 'パターン4: スケール (拡大)', component: Pattern4 },
    { id: 5, name: 'パターン5: タイプライター風', component: Pattern5 },
    { id: 6, name: 'パターン6: 波打ち (縦方向)', component: Pattern6 },
  ];

  const CurrentPattern = patterns.find(p => p.id === currentPattern).component;

  const handleReplay = () => {
    const temp = currentPattern;
    setCurrentPattern(0);
    setTimeout(() => setCurrentPattern(temp), 50);
  };

  return (
    <div className="h2-demo-page">
      <header className="h2-demo-header">
        <div className="h2-demo-header-content">
          <h1>H2見出しアニメーション - 6パターン</h1>
          <p>Section Headings用のWebGLアニメーションサンプル</p>
          <a href="/training" className="back-link">← Training ページに戻る</a>
        </div>
      </header>

      <nav className="h2-demo-nav">
        <div className="h2-pattern-buttons">
          {patterns.map(pattern => (
            <button
              key={pattern.id}
              onClick={() => setCurrentPattern(pattern.id)}
              className={currentPattern === pattern.id ? 'active' : ''}
            >
              {pattern.name}
            </button>
          ))}
        </div>
        <button onClick={handleReplay} className="replay-button">
          🔄 アニメーション再生
        </button>
      </nav>

      <main className="h2-demo-main">
        {currentPattern !== 0 && <CurrentPattern key={currentPattern} />}
      </main>

      <section className="h2-demo-comparison">
        <h2>パターン比較表</h2>
        <table>
          <thead>
            <tr>
              <th>パターン</th>
              <th>動きの特徴</th>
              <th>印象</th>
              <th>推奨用途</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>パターン1</td>
              <td>左からスライド</td>
              <td>安定感・信頼性</td>
              <td>プロフェッショナルなセクション</td>
            </tr>
            <tr>
              <td>パターン2</td>
              <td>下から上昇</td>
              <td>エレガント・洗練</td>
              <td>高級感を出したいセクション</td>
            </tr>
            <tr>
              <td>パターン3</td>
              <td>回転フェードイン</td>
              <td>ダイナミック・印象的</td>
              <td>強調したい重要セクション</td>
            </tr>
            <tr>
              <td>パターン4</td>
              <td>拡大</td>
              <td>インパクト・重要性</td>
              <td>キーメッセージ、CTA近辺</td>
            </tr>
            <tr>
              <td>パターン5</td>
              <td>タイプライター</td>
              <td>ストーリー性・順序</td>
              <td>説明的なセクション</td>
            </tr>
            <tr>
              <td>パターン6</td>
              <td>波打ち</td>
              <td>親しみやすさ・リズム</td>
              <td>ユーザー体験、FAQ、事例紹介</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="h2-demo-notes">
        <h2>実装上の注意点</h2>
        <ul>
          <li><strong>色・フォントサイズは維持:</strong> 既存の `.training-section-title` のスタイルを保持</li>
          <li><strong>GPU加速:</strong> `transform` と `opacity` のみを使用してパフォーマンス最適化</li>
          <li><strong>モバイル対応:</strong> スマホでは短めのアニメーション時間に調整</li>
          <li><strong>アクセシビリティ:</strong> `prefers-reduced-motion` に対応</li>
          <li><strong>スクロール連動:</strong> Intersection Observer APIで画面内に入ったタイミングで発火</li>
        </ul>
      </section>
    </div>
  );
};

export default H2Demo;
