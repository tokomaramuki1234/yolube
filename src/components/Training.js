import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faUsers, faComments, faExclamationTriangle, faHandshake, faLightbulb, faChartLine, faClock, faHeart, faBuilding, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './Training.css';

const Training = () => {
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    // GAS WebアプリのURL
    const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwGhOV6W4DoMTK9Zagbdjqq0KVx0KVThPqFtIzbFG__fine1Kez4_EmO7G9TwMiYrIGbg/exec';

    // HTMLフォーム送信でCORS回避
    const hiddenForm = document.createElement('form');
    hiddenForm.method = 'POST';
    hiddenForm.action = GAS_WEB_APP_URL;
    hiddenForm.target = '_blank'; // 新しいタブで結果ページを開く

    // フォームデータを追加
    const formData = {
      formType: 'training',
      company_name: form.current.company_name.value,
      user_name: form.current.user_name.value,
      user_email: form.current.user_email.value,
      message: form.current.message.value
    };

    Object.keys(formData).forEach(key => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = formData[key] || '';
      hiddenForm.appendChild(input);
    });

    // フォームを送信
    document.body.appendChild(hiddenForm);
    hiddenForm.submit();
    document.body.removeChild(hiddenForm);

    // ユーザーフィードバック
    setMessage('研修お問い合わせを送信いたしました。確認画面が新しいタブで開きます。自動返信メールをご確認ください。');
    form.current.reset();
    setIsLoading(false);
  };

  return (
    <div className="ke-lp">
      {/* Header */}
      <header className="ke-header">
        <div className="ke-header-container">
          <div className="ke-logo">
            <img src="/images/YOLUBE_logo.png" alt="YOLUBE" />
          </div>
          <nav className="ke-nav">
            <a href="#about">研修について</a>
            <a href="#schedule">お悩み・解決策</a>
            <a href="#access">研修プログラム</a>
            <a href="#contact">お申し込み</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="ke-hero">
        <div className="ke-hero-bg">
          <div className="ke-hero-content">
            <div className="ke-hero-text">
              <div className="hero-badge">ただいまモニター様を募集中！</div>
              <h1 className="ke-title">
                <span className="ke-title-main">社内コミュニケーション、</span>
                <span className="ke-title-sub">遊びながら強化しませんか？</span>
              </h1>
              <p className="ke-subtitle">
                対話が生まれる。組織が変わる。<br />
                <strong>TABLE GAME</strong> × <strong>コミュニケーション研修</strong>
              </p>
              <div className="ke-hero-stats">
                <div className="ke-tagline">
                  <h2>そのお悩み、テーブルゲームで支援いたします！</h2>
                </div>
                <div className="ke-description-text">
                  <p>テーブルゲームが様々な形のコミュニケーション機会をご提供。楽しみながら共通体験を得るため、参加者同士のなかで自然な結束が生まれます。</p>
                  <p>また、組織の中で「話しかけやすい雰囲気」を創り、経営陣が求めている現場の声を拾いやすくします。ゲームを通じて社員の意外な一面を垣間見ることも出来、エンゲージメント向上やリスキリング機会提供のきっかけ作りにも最適です。</p>
                </div>
              </div>
              <div className="ke-hero-buttons">
                <a href="#contact" className="ke-btn ke-btn-primary">
                  <FontAwesomeIcon icon={faComments} />
                  お問い合わせ
                </a>
                <a href="/docs/PDF/trainingv1.1.pdf" target="_blank" rel="noopener noreferrer" className="ke-btn ke-btn-outline">
                  研修資料をダウンロード
                </a>
              </div>
            </div>
            <div className="ke-hero-image">
              <div className="ke-game-cards">
                <div className="ke-card ke-card-1">
                  <FontAwesomeIcon icon={faGamepad} />
                </div>
                <div className="ke-card ke-card-2">
                  <FontAwesomeIcon icon={faUsers} />
                </div>
                <div className="ke-card ke-card-3">
                  <FontAwesomeIcon icon={faHandshake} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section id="about" className="ke-problems">
        <div className="ke-container">
          <div className="ke-problems-grid">
            <div className="ke-problem-item">
              <div className="ke-problem-icon">
                <FontAwesomeIcon icon={faUsers} />
              </div>
              <h3>話しかける人が固定化している</h3>
              <p>組織内で一部の人だけがコミュニケーションをするため、重要な情報が全体に共有されない</p>
            </div>
            <div className="ke-problem-item">
              <div className="ke-problem-icon">
                <FontAwesomeIcon icon={faBuilding} />
              </div>
              <h3>部署間の情報共有が欠けている</h3>
              <p>関連部署とのコミュニケーション不足で予期せぬトラブルが発生</p>
            </div>
            <div className="ke-problem-item">
              <div className="ke-problem-icon">
                <FontAwesomeIcon icon={faExclamationTriangle} />
              </div>
              <h3>新入社員が不安を感じる</h3>
              <p>コミュニケーション不足により上司/同僚/組織の全体像が見えない</p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="schedule" className="ke-impact">
        <div className="ke-container">
          <div className="ke-impact-content">
            <div className="ke-impact-items">
              <div className="ke-impact-item">
                <FontAwesomeIcon icon={faClock} />
                <div>
                  <h3>社内の情報が遅回りすることによる</h3>
                  <h2>スピード低下</h2>
                </div>
              </div>
              <div className="ke-impact-item">
                <FontAwesomeIcon icon={faHeart} />
                <div>
                  <h3>人間関係の悪化による</h3>
                  <h2>離職率の上昇</h2>
                </div>
              </div>
              <div className="ke-impact-item">
                <FontAwesomeIcon icon={faExclamationTriangle} />
                <div>
                  <h3>受動的・他責的な</h3>
                  <h2>組織体質に...</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="ke-solution">
        <div className="ke-container">
          <div className="ke-solution-content">
            <div className="ke-solution-text">
              <h2>テーブルゲームが様々な形のコミュニケーション機会をご提供。</h2>
              <p>楽しみながら共通体験を得るため、参加者同士のなかで自然な結束が生まれます。また、組織の中で「話しかけやすい雰囲気」を創り、経営陣が求めている現場の声を拾いやすくします。</p>
              <p>ゲームを通じて社員の意外な一面を垣間見ることも出来、エンゲージメント向上やリスキリング機会提供のきっかけ作りにも最適です。</p>
            </div>
            <div className="ke-solution-features">
              <div className="ke-solution-feature">
                <FontAwesomeIcon icon={faHandshake} />
                <span>自然な結束の形成</span>
              </div>
              <div className="ke-solution-feature">
                <FontAwesomeIcon icon={faComments} />
                <span>話しかけやすい雰囲気</span>
              </div>
              <div className="ke-solution-feature">
                <FontAwesomeIcon icon={faLightbulb} />
                <span>意外な一面の発見</span>
              </div>
              <div className="ke-solution-feature">
                <FontAwesomeIcon icon={faChartLine} />
                <span>エンゲージメント向上</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Monitor Section */}
      <section id="access" className="ke-monitor">
        <div className="ke-container">
          <div className="ke-monitor-content">
            <h2 className="ke-section-title">ただいまモニター様を募集中！</h2>
            <div className="ke-monitor-cta">
              <div className="ke-monitor-info">
                <p>テーブルゲームの力で地域社会の課題に取り組みます。</p>
                <div className="ke-brand-tagline">遊び心で社会を変える</div>
              </div>
              <div className="ke-monitor-action">
                <a href="#contact" className="ke-btn ke-btn-large">
                  お問い合わせ →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="ke-contact">
        <div className="ke-container">
          <div className="ke-contact-content">
            <div className="ke-contact-info">
              <div className="ke-contact-direct">
                <div className="ke-contact-item">
                  <FontAwesomeIcon icon={faPhone} />
                  <div>
                    <h4>Tel</h4>
                    <p>090-2841-3926</p>
                  </div>
                </div>
                <div className="ke-contact-item">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <div>
                    <h4>Mail</h4>
                    <p>INFO@YOLUBE.JP</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="ke-contact-form">
              <h3>お問い合わせフォーム</h3>
              <form ref={form} onSubmit={sendEmail} className="ke-form">
                <div className="ke-form-group">
                  <label>会社名・団体名</label>
                  <input 
                    type="text" 
                    name="company_name" 
                    placeholder="株式会社○○" 
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="ke-form-group">
                  <label>ご担当者名</label>
                  <input 
                    type="text" 
                    name="user_name" 
                    placeholder="山田 太郎" 
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="ke-form-group">
                  <label>メールアドレス</label>
                  <input 
                    type="email" 
                    name="user_email" 
                    placeholder="example@company.com" 
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="ke-form-group">
                  <label>お問い合わせ内容</label>
                  <textarea 
                    rows="4" 
                    name="message" 
                    placeholder="研修についてのご質問や、組織の課題についてお聞かせください"
                    required
                    disabled={isLoading}
                  ></textarea>
                </div>
                
                {message && (
                  <div className={`ke-form-message ${message.includes('エラー') ? 'error' : 'success'}`}>
                    {message}
                  </div>
                )}

                <button 
                  type="submit" 
                  className={`ke-btn ke-btn-primary ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? '送信中...' : '送信する'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="ke-footer">
        <div className="ke-container">
          <div className="ke-footer-content">
            <div className="ke-footer-logo">
              <img src="/images/YOLUBE_logo.png" alt="YOLUBE" />
            </div>
            <div className="ke-footer-contact">
              <p><strong>Tel：</strong>090-2841-3926</p>
              <p><strong>Mail：</strong>INFO@YOLUBE.JP</p>
            </div>
          </div>
          <div className="ke-footer-bottom">
            <p>&copy; 2025 YOLUBE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Training;