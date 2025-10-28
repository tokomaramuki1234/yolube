import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './HeroDemo.css';

// パターン1: 文字が波打つように動く
const Pattern1 = () => {
  return (
    <div className="pattern-container pattern-1">
      <h1 className="demo-title wave-text">
        遊びが、<br />
        <span className="demo-title-sub">組織を強くする。</span>
      </h1>
      <p className="demo-subtitle fade-in-text">
        <strong>テーブルゲームで実現する、誰もが参加したくなる企業研修</strong>
      </p>
    </div>
  );
};

// パターン2: 文字が1文字ずつ落ちてくる
const Pattern2 = () => {
  const text1 = "遊びが、";
  const text2 = "組織を強くする。";
  const text3 = "テーブルゲームで実現する、誰もが参加したくなる企業研修";

  return (
    <div className="pattern-container pattern-2">
      <h1 className="demo-title">
        <span className="drop-text">
          {text1.split('').map((char, i) => (
            <span key={i} style={{ animationDelay: `${i * 0.1}s` }}>{char}</span>
          ))}
        </span>
        <br />
        <span className="demo-title-sub drop-text">
          {text2.split('').map((char, i) => (
            <span key={i} style={{ animationDelay: `${(text1.length + i) * 0.1}s` }}>{char}</span>
          ))}
        </span>
      </h1>
      <p className="demo-subtitle">
        <strong className="drop-text-slow">
          {text3.split('').map((char, i) => (
            <span key={i} style={{ animationDelay: `${i * 0.05}s` }}>{char}</span>
          ))}
        </strong>
      </p>
    </div>
  );
};

// パターン3: 文字が3D回転しながら登場
const Pattern3 = () => {
  return (
    <div className="pattern-container pattern-3">
      <h1 className="demo-title rotate-3d-text">
        遊びが、<br />
        <span className="demo-title-sub">組織を強くする。</span>
      </h1>
      <p className="demo-subtitle scale-in-text">
        <strong>テーブルゲームで実現する、誰もが参加したくなる企業研修</strong>
      </p>
    </div>
  );
};

// パターン4: 文字が分裂してから集まる
const Pattern4 = () => {
  const text1 = "遊びが、";
  const text2 = "組織を強くする。";
  
  return (
    <div className="pattern-container pattern-4">
      <h1 className="demo-title">
        <span className="split-text">
          {text1.split('').map((char, i) => (
            <span key={i} style={{ animationDelay: `${i * 0.1}s` }}>{char}</span>
          ))}
        </span>
        <br />
        <span className="demo-title-sub split-text">
          {text2.split('').map((char, i) => (
            <span key={i} style={{ animationDelay: `${i * 0.1}s` }}>{char}</span>
          ))}
        </span>
      </h1>
      <p className="demo-subtitle blur-in-text">
        <strong>テーブルゲームで実現する、誰もが参加したくなる企業研修</strong>
      </p>
    </div>
  );
};

// パターン5: 文字が光りながらフェードイン
const Pattern5 = () => {
  return (
    <div className="pattern-container pattern-5">
      <h1 className="demo-title glow-text">
        遊びが、<br />
        <span className="demo-title-sub">組織を強くする。</span>
      </h1>
      <p className="demo-subtitle shimmer-text">
        <strong>テーブルゲームで実現する、誰もが参加したくなる企業研修</strong>
      </p>
    </div>
  );
};

const HeroDemo = () => {
  const [currentPattern, setCurrentPattern] = useState(1);

  const patterns = [
    { id: 1, name: 'パターン1: 波打つテキスト', component: Pattern1 },
    { id: 2, name: 'パターン2: 落下テキスト', component: Pattern2 },
    { id: 3, name: 'パターン3: 3D回転', component: Pattern3 },
    { id: 4, name: 'パターン4: 分裂→集合', component: Pattern4 },
    { id: 5, name: 'パターン5: グロー効果', component: Pattern5 },
  ];

  const CurrentPatternComponent = patterns.find(p => p.id === currentPattern)?.component || Pattern1;

  const nextPattern = () => {
    setCurrentPattern((prev) => (prev >= 5 ? 1 : prev + 1));
  };

  const prevPattern = () => {
    setCurrentPattern((prev) => (prev <= 1 ? 5 : prev - 1));
  };

  return (
    <div className="hero-demo-page">
      <div className="demo-nav">
        <h1>🎨 テキストアニメーション - 5パターン比較</h1>
        <div className="demo-description">
          <p>WebGLライクなテキスト演出パターンを比較できます</p>
        </div>
      </div>

      <div className="pattern-selector">
        <button className="pattern-btn" onClick={prevPattern}>
          <FontAwesomeIcon icon={faArrowLeft} /> 前のパターン
        </button>
        <div className="pattern-info">
          <h2>{patterns.find(p => p.id === currentPattern)?.name}</h2>
          <p>パターン {currentPattern} / 5</p>
        </div>
        <button className="pattern-btn" onClick={nextPattern}>
          次のパターン <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>

      <section className="demo-hero">
        <div className="demo-hero-background">
          {/* 動画背景プレビュー */}
          <div className="video-placeholder">
            <p>背景: 動画が入る想定</p>
          </div>
        </div>
        <div className="demo-hero-overlay"></div>
        
        <div className="demo-hero-content">
          <CurrentPatternComponent key={currentPattern} />
        </div>
      </section>

      <div className="demo-info">
        <h2>📋 パターン詳細</h2>
        
        <div className="pattern-details-grid">
          <div className="pattern-detail-card">
            <h3>パターン1: 波打つテキスト</h3>
            <ul>
              <li>文字が波のように上下に動く</li>
              <li>CSS transform: translateY</li>
              <li>軽量で滑らか</li>
              <li>視認性: ★★★★☆</li>
            </ul>
          </div>

          <div className="pattern-detail-card">
            <h3>パターン2: 落下テキスト</h3>
            <ul>
              <li>1文字ずつ上から落ちてくる</li>
              <li>タイポグラフィ的なインパクト</li>
              <li>順次表示で注目を集める</li>
              <li>視認性: ★★★★★</li>
            </ul>
          </div>

          <div className="pattern-detail-card">
            <h3>パターン3: 3D回転</h3>
            <ul>
              <li>3D空間で回転しながら登場</li>
              <li>CSS transform: rotateX/rotateY</li>
              <li>立体感のある演出</li>
              <li>視認性: ★★★☆☆</li>
            </ul>
          </div>

          <div className="pattern-detail-card">
            <h3>パターン4: 分裂→集合</h3>
            <ul>
              <li>文字がバラバラから集まる</li>
              <li>ダイナミックな動き</li>
              <li>インパクト大</li>
              <li>視認性: ★★★★☆</li>
            </ul>
          </div>

          <div className="pattern-detail-card">
            <h3>パターン5: グロー効果</h3>
            <ul>
              <li>光りながらフェードイン</li>
              <li>text-shadow + animation</li>
              <li>高級感のある演出</li>
              <li>視認性: ★★★★★</li>
            </ul>
          </div>
        </div>

        <div className="recommendation-section">
          <h3>💡 推奨パターン</h3>
          <div className="recommendation-content">
            <p><strong>ビジネス研修向けなら:</strong></p>
            <ul>
              <li><strong>パターン1（波打つ）</strong> - 動きがあるが落ち着いている、視認性良好</li>
              <li><strong>パターン5（グロー）</strong> - 高級感があり、企業向けに最適</li>
            </ul>
            <p><strong>インパクト重視なら:</strong></p>
            <ul>
              <li><strong>パターン2（落下）</strong> - 強い印象、記憶に残りやすい</li>
              <li><strong>パターン4（分裂集合）</strong> - ダイナミック、先進的なイメージ</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="pattern-navigation-footer">
        <button className="pattern-btn pattern-btn-large" onClick={prevPattern}>
          <FontAwesomeIcon icon={faArrowLeft} /> 前のパターン
        </button>
        <div className="pattern-indicator">
          {patterns.map(p => (
            <span
              key={p.id}
              className={`indicator-dot ${currentPattern === p.id ? 'active' : ''}`}
              onClick={() => setCurrentPattern(p.id)}
            />
          ))}
        </div>
        <button className="pattern-btn pattern-btn-large" onClick={nextPattern}>
          次のパターン <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default HeroDemo;
