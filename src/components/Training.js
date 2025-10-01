import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faUsers, faCalendarAlt, faMapMarkerAlt, faClock, faHeart, faBars, faTimes, faChevronUp, faChevronLeft, faChevronRight, faComments, faExclamationTriangle, faHandshake, faLightbulb, faChartLine, faBuilding, faPhone, faEnvelope, faArrowRight, faCheckCircle, faStar, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import './Training.css';

const Training = () => {
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // スクロール位置を監視
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowBackToTop(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // トップへ戻る関数
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    // GAS WebアプリのURL
    const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwGhOV6W4DoMTK9Zagbdjqq0KVx0KVThPqFtIzbFG__fine1Kez4_EmO7G9TwMiYrIGbg/exec';

    // HTMLフォーム送信でCORS回避
    const hiddenForm = document.createElement('form');
    hiddenForm.method = 'POST';
    hiddenForm.action = GAS_WEB_APP_URL;
    hiddenForm.target = '_blank';

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
    <div className="training-lp">
      {/* Header */}
      <header className="ke-header">
        <div className="ke-header-container">
          <div className="ke-logo">
            <a href="https://yolube.jp" target="_blank" rel="noopener noreferrer">
              <img src="/images/YOLUBE_logo.png" alt="YOLUBE" loading="eager" />
            </a>
          </div>
          <nav className={`ke-nav ${isMobileMenuOpen ? 'ke-nav-open' : ''}`}>
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>研修について</a>
            <a href="#features" onClick={() => setIsMobileMenuOpen(false)}>特徴</a>
            <a href="#program" onClick={() => setIsMobileMenuOpen(false)}>プログラム</a>
            <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)}>料金</a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>お問い合わせ</a>
          </nav>
          
          <button 
            className="ke-mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="training-hero">
        <div className="training-container">
          <div className="training-hero-content-center">
            <div className="training-hero-text">
              <h1 className="training-title">
                体験するから、定着する。<br />
                <span className="training-title-sub">ボードゲームで変わる企業研修</span>
              </h1>
              <p className="training-subtitle">
                コミュニケーション・課題解決・チームビルディングを<br />
                <strong>"遊び"の力で変革</strong>
              </p>
              <p className="training-description">
                学びを楽しく、深く、忘れない研修プログラムを提供します。<br />
                対話が生まれる。組織が変わる。
              </p>
              <div className="training-hero-buttons">
                <a href="#contact" className="training-btn training-btn-primary">
                  <FontAwesomeIcon icon={faComments} />
                  無料相談を申し込む
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="about" className="training-problem">
        <div className="training-container">
          <div className="training-section-header">
            <h2 className="training-section-title">
              こんなお悩みありませんか？
            </h2>
          </div>
          
          <div className="training-problems-grid">
            <div className="training-problem-item">
              <div className="training-problem-image">
                <img src="/images/training_01_01.jpeg" alt="話しかける人が固定化している様子" />
              </div>
              <div className="training-problem-content">
                <h4>話しかける人が固定化している</h4>
                <p>組織内で一部の人だけがコミュニケーションを取るため、重要な情報が全体に共有されない</p>
              </div>
            </div>
            
            <div className="training-problem-item">
              <div className="training-problem-image">
                <img src="/images/training_01_02.png" alt="部署間の情報共有が欠けている様子" />
              </div>
              <div className="training-problem-content">
                <h4>部署間の情報共有が欠けている</h4>
                <p>関連部署とのコミュニケーション不足で予期せぬトラブルが発生</p>
              </div>
            </div>
            
            <div className="training-problem-item">
              <div className="training-problem-image">
                <img src="/images/training_01_03.jpeg" alt="新入社員が不安を感じている様子" />
              </div>
              <div className="training-problem-content">
                <h4>新入社員が不安を感じている</h4>
                <p>コミュニケーション不足により上司/同僚/組織の全体像が見えない</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="training-solution">
        <div className="training-container">
          <div className="training-solution-content">
            <div className="training-solution-text">
              <h2 className="training-section-title">"遊び"が社員を動かす。</h2>
              <h3 className="training-subsection-title">遊び心で組織変革を実現する新しい研修スタイル</h3>
              
              <p>YOLUBEの研修ではコミュニケーション機会を創ることにこだわります。</p>
              <p>20万種類ともいわれるテーブルゲームの中から様々な形のコミュニケーション機会を提供。</p>
              <p>楽しみながら共通体験を得るため、参加者同士で自然な結束が生まれます。</p>
              <p>ただ"楽しい"だけでなく、行動変容に直結する設計を行っています。</p>
              <p>また、毎回の研修後に参加者へアンケートを実施することで研修そのものをPDCAサイクルに載せていきます。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="training-features">
        <div className="training-container">
          <h2 className="training-section-title">2つの目的を同時に実現</h2>
              <p>コミュニケーション研修を通じて下記の2点へ寄与してまいります。</p>
          <div className="training-features-grid">
            <div className="training-feature-item">
              <div className="training-feature-image">
                <img src="/images/training_02_01.png" alt="社内交流の活性化" />
              </div>
              <h3>社内交流の活性化</h3>
              <ul>
                <li>組織内に横断的な交流機会を創出</li>
                <li>お互いの「職場以外の一面」を知る機会で相互理解が進む</li>
                <li>職位の関係で交流機会を持たない同僚との会話で自社への解像度を高める</li>
              </ul>
            </div>
            
            <div className="training-feature-item">
              <div className="training-feature-image">
                <img src="/images/training_02_02.jpeg" alt="エンゲージメント向上" />
              </div>
              <h3>エンゲージメント向上</h3>
              <ul>
                <li>ゲームを通じてコミュニケーションへの感度を高め、社員の定着率を向上</li>
                <li>組織の中で「話しかけやすい雰囲気」を創出</li>
                <li>経営陣が求めている現場の声を拾いやすくする</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Program Section */}
      <section id="program" className="training-program">
        <div className="training-container">
          <h2 className="training-section-title">提供内容</h2>
              <p>それぞれのフェーズに目的を持たせながら年６回に分けて研修を実施します。</p>
          <div className="training-program-phases">
            <div className="training-phase">
              <div className="training-phase-header">
                <h3>【第1～4回】アイスブレイク＆情報収集フェーズ</h3>
                <p className="training-phase-purpose"><strong>目的：</strong> 社内コミュニケーション円滑化・エンゲージメント向上</p>
              </div>
              
              <div className="training-effects">
                <h4>期待できる効果</h4>
                
                <div className="training-effect-item">
                  <h5>1. 相互理解が進む</h5>
                  <p>テーブルゲームでは参加者がフラットな状態（＝職場でのペルソナが役に立たない状態）で臨むため、良くも悪くも人間性が表面化しやすくなります。この"職場では見えなかった一面"について相互理解が深まるほど、個々の強み・弱みを補完できる組織づくりを目指しやすくなります。</p>
                  
                </div>
                
                <div className="training-effect-item">
                  <h5>2. 成功体験を共有する</h5>
                  <p>研修の参加者同士が共有する成功体験は、その後の何気ない日常の中でも思い返されることとなります。研修を重ねることでチームメンバーとの成功体験も増え、自然とポジティブな話題が増えていきます。</p>
                </div>
              </div>
            </div>
            
            <div className="training-phase">
              <div className="training-phase-header">
                <h3>【第5～6回】実践活用フェーズ</h3>
                <p className="training-phase-purpose"><strong>目的：</strong> 全員参加型での経営分析・戦略立案</p>
              </div>
              
              <div className="training-phase-details">
                <div className="training-phase-item">
                  <strong>第5回：</strong> ブレインストーミング研修 → 1～4回で構築した「意見を出しやすい土壌」を活かし、効果的なボトムアップを狙います。
                </div>
                <div className="training-phase-item">
                  <strong>第6回：</strong> 経営分析研修 → SWOT分析等の経営分析手法を活用し、<strong>全員参加型での経営分析を実現</strong>。社員一人一人が自社に対する解像度を高く持つことを狙います。
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Competitive Advantage Section */}
      <section className="training-advantage">
        <div className="training-container">
          <h2 className="training-section-title">なぜテーブルゲーム研修なのか？</h2>
          <h3 className="training-subsection-title">従来研修の限界を突破する革新的アプローチ</h3>
          
          <div className="training-comparison">
            <div className="training-traditional">
              <h4>一般的な研修の課題</h4>
              <ul>
                <li><strong>単発型：</strong> 効果が定着しにくい。また、根深い課題に対しアプローチしにくい</li>
                <li><strong>座学型：</strong> 受動的な学習で定着率が低く、実践的なコミュニケーション機会がない</li>
                <li><strong>オンライン研修：</strong> 画面越しでは本質的な人間関係構築が困難</li>
                <li><strong>既存のチームビルディング：</strong> 一時的な効果に留まり、継続性に欠ける</li>
              </ul>
            </div>
          </div>
          
          <h4 className="training-unique-title">テーブルゲーム研修だけの独自価値</h4>
          
          <div className="training-unique-values">
            <div className="training-unique-item">
              <h5>1. 「職場のペルソナ」を無効化する稀有な研修</h5>
              <p>従来研修では職場での立場や先入観が邪魔をしますが、テーブルゲームでは参加者全員がフラットな状態になります。ゲーム中は職位や部署に関係なく、純粋な人間性が表面化するため、<strong>"職場では見えなかった一面"</strong> での相互理解が深まります。</p>
            </div>
            
            <div className="training-unique-item">
              <h5>2. 段階的PDCAサイクルで確実な成果創出</h5>
              <ul>
                <li><strong>第1～4回：</strong> アイスブレイク＆情報収集で土壌づくり</li>
                <li><strong>毎回のアンケート分析</strong> で次回研修を最適化</li>
                <li><strong>第5～6回：</strong> 構築された信頼関係を活用した本格的経営分析</li>
                <li><strong>年間を通じた継続的改善</strong> で一時的でない組織変革を実現</li>
              </ul>
            </div>
            
            <div className="training-unique-item">
              <h5>3. 共有される成功体験が組織文化を変える</h5>
              <p>研修で生まれた成功体験は日常業務でも思い返され、自然とポジティブな話題が増加。忘年会や日常会話でも話題となり、<strong>組織全体の雰囲気を根本から改善</strong>します。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}

      {/* Target & Pricing Section */}
      <section id="pricing" className="training-pricing">
        <div className="training-container">
          <h2 className="training-section-title">こんな企業様におすすめ</h2>
          
          <div className="training-target-companies">
            <ul>
              <li>地方の中小企業（マンパワー不足、エンゲージメント課題）</li>
              <li>初めて本格的な研修導入を検討している企業</li>
              <li>従業員数の少ない新規企業</li>
              <li>福利厚生・人材育成への投資意欲がある中堅〜大企業</li>
              <li>社外交流・インバウンド戦略に関心のある企業</li>
            </ul>
          </div>
          
          <h3 className="training-subsection-title">料金プラン</h3>
          
          <div className="training-pricing-grid">
            <div className="training-pricing-plan">
              <div className="training-plan-header">
                <h4>エントリープラン</h4>
                <p className="training-plan-subtitle">単発研修</p>
              </div>
              <div className="training-plan-price">
                <span className="training-price-amount">10万円</span>
                <span className="training-price-unit">／回</span>
              </div>
              <div className="training-plan-features">
                <p>まずは試してみたい企業様向け</p>
                <p>研修参加者10名まで</p>
              </div>
            </div>
            
            <div className="training-pricing-plan training-recommended">
              <div className="training-plan-badge">おすすめ</div>
              <div className="training-plan-header">
                <h4>スタンダードプラン</h4>
                <p className="training-plan-subtitle">年間契約</p>
              </div>
              <div className="training-plan-price">
                <span className="training-price-amount">50万円</span>
                <span className="training-price-unit">（6回セット・2ヶ月に1回実施）</span>
              </div>
              <div className="training-plan-features">
                <p>継続的な効果を実感したい企業様向け</p>
                <p>研修参加者10名まで</p>
              </div>
            </div>
            
            <div className="training-pricing-plan">
              <div className="training-plan-header">
                <h4>プレミアムプラン</h4>
                <p className="training-plan-subtitle">年間契約</p>
              </div>
              <div className="training-plan-price">
                <span className="training-price-amount">80万円</span>
                <span className="training-price-unit">（12回セット・毎月実施）</span>
              </div>
              <div className="training-plan-features">
                <p>本格的な組織変革を目指す企業様向け</p>
                <p>研修参加者10名まで</p>
              </div>
            </div>
          </div>
          
          <div className="training-pricing-notes">
            <p><strong>追加参加者料金：</strong> 5名まで7,500円</p>
            <p><strong>例）26名参加の場合：</strong> 追加16名 → 7,500円×4 = 30,000円</p>
            <p><strong>交通費：</strong> 秋田市内無料、秋田県内一律5,000円、県外応相談</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="training-cta">
        <div className="training-container">
          <div className="training-cta-content">
            <h2 className="training-section-title">まずは無料相談から</h2>
            <p className="training-section-subtitle">
              貴社の課題に合わせたオリジナル研修のご提案も可能です。
            </p>
            <p className="training-cta-message">
              遊び心で組織を変える新しい研修体験を、ぜひ体験いただけますと幸いです。
            </p>
            <a href="#contact" className="training-btn training-btn-large">
              無料相談・お問い合わせはこちら
              <FontAwesomeIcon icon={faArrowRight} />
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="training-contact">
        <div className="training-container">
          <div className="training-contact-content">
            
            <div className="training-contact-form">
              <h3>お問い合わせフォーム</h3>
              <form ref={form} onSubmit={handleSubmit} className="training-form">
                <div className="training-form-group">
                  <label>会社名・団体名</label>
                  <input 
                    type="text" 
                    name="company_name" 
                    placeholder="株式会社○○" 
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="training-form-group">
                  <label>ご担当者名</label>
                  <input 
                    type="text" 
                    name="user_name" 
                    placeholder="山田 太郎" 
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="training-form-group">
                  <label>メールアドレス</label>
                  <input 
                    type="email" 
                    name="user_email" 
                    placeholder="example@company.com" 
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="training-form-group">
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
                  <div className={`training-form-message ${message.includes('エラー') ? 'error' : 'success'}`}>
                    {message}
                  </div>
                )}

                <button 
                  type="submit" 
                  className={`training-btn training-btn-primary ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? '送信中...' : '無料相談を申し込む'}
                </button>
              </form>
              
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="training-footer">
        <div className="training-container">
          <div className="training-footer-content">
            <div className="training-footer-logo">
              <img src="/images/YOLUBE_logo.png" alt="YOLUBE" />
            </div>
          </div>
          <div className="training-footer-bottom">
            <p>&copy; 2025 YOLUBE. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button 
          className="training-back-to-top" 
          onClick={scrollToTop}
          aria-label="トップへ戻る"
        >
          <FontAwesomeIcon icon={faChevronUp} />
        </button>
      )}
    </div>
  );
};

export default Training;