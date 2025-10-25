import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCalendarAlt, faClock, faHeart, faBars, faTimes, faChevronUp, faComments, faExclamationTriangle, faHandshake, faLightbulb, faChartLine, faBuilding, faArrowRight, faArrowDown, faCheckCircle, faStar, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import Footer from './Footer';
import './Training.css';

const Training = () => {
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);

  // 背景画像のプリロード
  useEffect(() => {
    const imageUrls = [
      'https://images.unsplash.com/photo-1611891487253-156f9817e54d?w=1200&h=675&fit=crop&q=80&fm=webp',
      'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=1200&h=675&fit=crop&q=80&fm=webp',
      'https://images.unsplash.com/photo-1566694271453-390536dd1f0d?w=1200&h=675&fit=crop&q=80&fm=webp'
    ];

    imageUrls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = url;
      document.head.appendChild(link);
    });
  }, []);

  // スクロール位置を監視
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowBackToTop(scrollTop > 300);
      
      // ヒーローセクションを過ぎたら追従ボタンを表示
      setShowFloatingCTA(scrollTop > 600);
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

  // お問い合わせセクションへスクロール
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    // GAS WebアプリのURL（環境変数から取得）
    const GAS_WEB_APP_URL = process.env.REACT_APP_GAS_WEB_APP_URL || 'https://script.google.com/macros/s/AKfycbwGhOV6W4DoMTK9Zagbdjqq0KVx0KVThPqFtIzbFG__fine1Kez4_EmO7G9TwMiYrIGbg/exec';

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
      user_phone: form.current.user_phone.value,
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
        {/* 背景スライドショー */}
        <div className="training-hero-slideshow">
          <div className="training-hero-slide training-hero-slide-1"></div>
          <div className="training-hero-slide training-hero-slide-2"></div>
          <div className="training-hero-slide training-hero-slide-3"></div>
        </div>
        <div className="training-hero-overlay"></div>
        <div className="training-container">
          <div className="training-hero-content-center">
            <div className="training-hero-text">

              <h1 className="training-title">
                遊びが、<br />
                <span className="training-title-sub">組織を強くする。</span>
              </h1>
              <p className="training-subtitle">
                <strong>"楽しい"が生み出す、本物の社内交流</strong><br />
                テーブルゲームで実現する、誰もが参加したくなる企業研修
              </p>
              <div className="training-hero-buttons">
                <a href="#contact" className="training-btn training-btn-primary training-btn-hero">
                  <FontAwesomeIcon icon={faComments} />
                  お申し込みはこちら
                </a>
              </div><br />
              <a href="#limited-offer" className="training-badge">
                秋田県企業様限定特別プラン実施中
              </a>
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
                <h4>話しかける人の固定化</h4>
                <p>組織内で一部の人同士だけでコミュニケーションを取るため、重要な情報が全体に共有されない</p>
              </div>
            </div>
            
            <div className="training-problem-item">
              <div className="training-problem-image">
                <img src="/images/training_01_02.png" alt="部署間の情報共有が欠けている様子" />
              </div>
              <div className="training-problem-content">
                <h4>部署間の情報共有不足</h4>
                <p>関連部署とのコミュニケーション不足で予期せぬトラブルが発生</p>
              </div>
            </div>
            
            <div className="training-problem-item">
              <div className="training-problem-image">
                <img src="/images/training_01_03.jpeg" alt="新入社員が不安を感じている様子" />
              </div>
              <div className="training-problem-content">
                <h4>新人を襲う漠然とした不安</h4>
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
              <h2 className="training-section-title">そのお悩みを<br />「遊び」で解決します</h2>
              
              <p>「遊び」という敷居の低さ。目的に応じた柔軟性。<br />そのどちらも兼ね備えたテーブルゲームをフル活用してご支援致します</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="training-features">
        <div className="training-container">
          <h2 className="training-section-title">遊びがもたらす二つの効果</h2>
              <p className="training-section-subtitle">テーブルゲームによるコミュニケーション研修を通じて下記の2点へ寄与してまいります。</p>
          <div className="training-features-grid">
            <div className="training-feature-item">
              <div className="training-feature-image">
                <img src="/images/training_02_01.png" alt="社内交流の活性化" />
              </div>
              <h3>社内交流の活性化</h3>
              <ul>
                <li>組織内に横断的な交流機会を創出</li>
                <li>お互いの「職場以外の一面」を知る機会で相互理解が進む</li>
                <li>職位を超えた交流機会が自社への解像度を高める</li>
              </ul>
            </div>
            
            <div className="training-feature-item">
              <div className="training-feature-image">
                <img src="/images/training_02_02.jpeg" alt="エンゲージメント向上" />
              </div>
              <h3>エンゲージメント向上</h3>
              <ul>
                <li>相互理解によってコミュニケーション感度を高め、社員の定着率を向上</li>
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
          <h2 className="training-section-title">研修プログラムの流れ</h2>
          <p className="training-section-subtitle">
            モデルケース：年６回の研修を通して実施した場合
          </p>

          {/* Timeline Visual */}
          <div className="training-timeline">
            <div className="training-timeline-item">
              <div className="training-timeline-arrow">
                <FontAwesomeIcon icon={faArrowDown} />
                <div className="training-timeline-line"></div>
              </div>
              <div className="training-timeline-image">
                <img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop&q=80" alt="アイスブレイク" />
              </div>
              <div className="training-timeline-content">
                <div className="training-timeline-badge">第1回</div>
                <h4>アイスブレイク</h4>
                <p>心理的安全性の構築、緊張の解きほぐし</p>
              </div>
            </div>

            <div className="training-timeline-item">
              <div className="training-timeline-arrow">
                <FontAwesomeIcon icon={faArrowDown} />
                <div className="training-timeline-line"></div>
              </div>
              <div className="training-timeline-image">
                <img src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=300&fit=crop&q=80" alt="コミュニケーション強化" />
              </div>
              <div className="training-timeline-content">
                <div className="training-timeline-badge">第2回</div>
                <h4>コミュニケーション強化</h4>
                <p>言語化能力・傾聴力の向上</p>
              </div>
            </div>

            <div className="training-timeline-item">
              <div className="training-timeline-arrow">
                <FontAwesomeIcon icon={faArrowDown} />
                <div className="training-timeline-line"></div>
              </div>
              <div className="training-timeline-image">
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop&q=80" alt="チームワーク構築" />
              </div>
              <div className="training-timeline-content">
                <div className="training-timeline-badge">第3回</div>
                <h4>チームワーク構築</h4>
                <p>協力と役割分担の理解</p>
              </div>
            </div>

            <div className="training-timeline-item">
              <div className="training-timeline-arrow">
                <FontAwesomeIcon icon={faArrowDown} />
                <div className="training-timeline-line"></div>
              </div>
              <div className="training-timeline-image">
                <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop&q=80" alt="信頼関係の確立" />
              </div>
              <div className="training-timeline-content">
                <div className="training-timeline-badge">第4回</div>
                <h4>信頼関係の確立</h4>
                <p>成功体験の共有、相互理解の深化</p>
              </div>
            </div>

            <div className="training-timeline-item">
              <div className="training-timeline-arrow">
                <FontAwesomeIcon icon={faArrowDown} />
                <div className="training-timeline-line"></div>
              </div>
              <div className="training-timeline-image">
                <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop&q=80" alt="ブレインストーミング" />
              </div>
              <div className="training-timeline-content">
                <div className="training-timeline-badge">第5回</div>
                <h4>ブレインストーミング</h4>
                <p>構築された土壌で自由な発想を引き出す</p>
              </div>
            </div>

            <div className="training-timeline-item">
              <div className="training-timeline-arrow training-timeline-arrow-final">
                <FontAwesomeIcon icon={faArrowDown} />
              </div>
              <div className="training-timeline-image">
                <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop&q=80" alt="経営分析・戦略立案" />
              </div>
              <div className="training-timeline-content">
                <div className="training-timeline-badge">第6回</div>
                <h4>経営分析・戦略立案</h4>
                <p>全員参加型でSWOT分析、組織変革の完成</p>
              </div>
            </div>
          </div>

          {/* Before After Comparison */}
          <div className="training-before-after">
            <h3 className="training-subsection-title">研修前・研修後の変化</h3>
            <div className="training-comparison-grid">
              <div className="training-comparison-before">
                <div className="training-comparison-image">
                  <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop&q=80" alt="お互いに無関心な雰囲気のサラリーマンたち" />
                </div>
                <div className="training-comparison-header">
                  <FontAwesomeIcon icon={faExclamationTriangle} />
                  <h4>研修前</h4>
                </div>
                <ul>
                  <li>話しかける人が固定化</li>
                  <li>部署間の情報共有不足</li>
                  <li>新入社員の不安感</li>
                  <li>研修が座学中心で退屈</li>
                  <li>上司への相談がしづらい</li>
                  <li>意見を言いづらい雰囲気</li>
                </ul>
              </div>

              <div className="training-comparison-arrow">
                <FontAwesomeIcon icon={faArrowRight} />
              </div>

              <div className="training-comparison-after">
                <div className="training-comparison-image">
                  <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop&q=80" alt="一緒に笑い合っているサラリーマンたち" />
                </div>
                <div className="training-comparison-header">
                  <FontAwesomeIcon icon={faCheckCircle} />
                  <h4>研修後</h4>
                </div>
                <ul>
                  <li>自然な会話が生まれる</li>
                  <li>部署を越えた情報交換</li>
                  <li>先輩に相談しやすい環境</li>
                  <li>研修への積極的参加</li>
                  <li>心理的安全性の確保</li>
                  <li>ボトムアップが機能する</li>
                </ul>
              </div>
            </div>
          </div>

          <h3 className="training-subsection-title" style={{marginTop: '4rem'}}>プログラム詳細</h3>
          <div className="training-program-phases">
            <div className="training-phase">
              <div className="training-phase-header">
                <h3>【第1～4回】アイスブレイク＆情報収集フェーズ</h3>
                <p className="training-phase-purpose"><strong>目的：</strong> 社内コミュニケーション円滑化・エンゲージメント向上</p>
                <p className="training-phase-purpose"><strong>実施内容：</strong> テーブルゲームを通じて、多面的に相互理解を得る機会を提供。毎回の研修後にアンケートにて効果測定。</p>
              </div>

              <div className="training-phase-images">
                <div className="training-phase-image">
                  <img src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=350&fit=crop&q=80" alt="ゲームを楽しむ会社員、OLたち" />
                  <p className="training-image-caption">ゲームを楽しむ会社員、OLたち</p>
                </div>
                <div className="training-phase-image">
                  <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=350&fit=crop&q=80" alt="オンラインアンケート集計中" />
                  <p className="training-image-caption">オンラインアンケート集計中</p>
                </div>
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
                <div className="training-effect-item">
                  <h5>3. ボトムアップの下地作り</h5>
                  <p>アイスブレイクのなかでアンケート実施するため、研修内容自体がPDCAサイクルを堅持しやすくなります。本丸であるエンゲージメント向上への道筋を探りやすくなります。</p>
                </div>
              </div>
            </div>
            
            <div className="training-phase">
              <div className="training-phase-header">
                <h3>【第5～6回】実践活用フェーズ</h3>
                <p className="training-phase-purpose"><strong>目的：</strong> 全員参加型での経営分析・戦略立案</p>
                <p className="training-phase-purpose"><strong>実施内容：</strong> 第1～4回で構築した信頼関係を活かし、ブレインストーミング研修と経営分析研修を実施。</p>
              </div>

              <div className="training-phase-images">
                <div className="training-phase-image">
                  <img src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&h=350&fit=crop&q=80" alt="ブレインストーミング実施風景" />
                  <p className="training-image-caption">ブレインストーミング実施風景</p>
                </div>
                <div className="training-phase-image">
                  <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=350&fit=crop&q=80" alt="SWOT分析に関する画像" />
                  <p className="training-image-caption">SWOT分析に関する画像</p>
                </div>
              </div>

              <div className="training-effects">
                <h4>期待できる効果</h4>

                <div className="training-effect-item">
                  <h5>1. 全員参加型の意思決定を実現</h5>
                  <p>第1～4回で構築した「意見を出しやすい土壌」を活かし、経営層だけでなく現場社員も含めた全員参加型の意思決定プロセスを実現します。多様な視点からの意見が集まることで、より実効性の高い戦略立案が可能になります。</p>
                </div>

                <div className="training-effect-item">
                  <h5>2. 組織への理解度向上</h5>
                  <p>SWOT分析等の経営分析手法を実践することで、社員一人一人が自社の強み・弱み・機会・脅威を深く理解できるようになります。自社に対する解像度が高まることで、日常業務においても戦略的な判断ができるようになります。</p>
                </div>

                <div className="training-effect-item">
                  <h5>3. 実践的なビジネススキルの習得</h5>
                  <p>ブレインストーミングや経営分析といった実践的な手法を体験することで、問題解決力や論理的思考力が向上します。研修で学んだスキルは、日常業務やプロジェクトマネジメントにも応用可能です。</p>
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

          <div className="training-comparison">
            <div className="training-traditional">
              <div className="training-traditional-image">
                <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=400&fit=crop&q=80" alt="一般的な研修風景" />
              </div>
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
              <div className="training-unique-image">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&q=80" alt="ペルソナを連想させる画像" />
              </div>
              <h5>1. 「職場のペルソナ」を無効化する稀有な研修</h5>
              <p>従来研修では職場での立場や先入観が邪魔をしますが、テーブルゲームでは参加者全員がフラットな状態になります。ゲーム中は職位や部署に関係なく、純粋な人間性が表面化するため、<strong>"職場では見えなかった一面"</strong> での相互理解が深まります。</p>
            </div>

            <div className="training-unique-item">
              <div className="training-unique-image">
                <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop&q=80" alt="PDCAサイクルを表すイラスト" />
              </div>
              <h5>2. 段階的PDCAサイクルで確実な成果創出</h5>
              <ul>
                <li><strong>第1～4回：</strong> アイスブレイク＆情報収集で土壌づくり</li>
                <li><strong>毎回のアンケート分析</strong> で次回研修を最適化</li>
                <li><strong>第5～6回：</strong> 構築された信頼関係を活用した本格的経営分析</li>
                <li><strong>年間を通じた継続的改善</strong> で一時的でない組織変革を実現</li>
              </ul>
            </div>
            
            <div className="training-unique-item">
              <div className="training-unique-image">
                <img src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop&q=80" alt="ボードゲームで盛り上がる人たちの画像" />
              </div>
              <h5>3. 共有される成功体験が組織文化を変える</h5>
              <p>研修で生まれた成功体験は日常業務でも思い返され、自然とポジティブな話題が増加。忘年会や日常会話でも話題となり、<strong>組織全体の雰囲気を根本から改善</strong>します。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Survey Results Section */}
      <section className="training-survey-results">
        <div className="training-container">
          <h2 className="training-section-title">研修参加者アンケート結果</h2>
          <p className="training-section-subtitle">
            実際の参加者の声をデータで可視化しました
          </p>

          {/* Survey Stats */}
          <div className="training-survey-stats-grid">
            <div className="training-survey-stat-large">
              <div className="training-survey-percentage">87.2%</div>
              <div className="training-survey-label">「コミュニケーションが取りやすくなった」と回答</div>
              <div className="training-survey-detail">業務改善効果を実感</div>
            </div>
            <div className="training-survey-stat-large">
              <div className="training-survey-percentage">96.2%</div>
              <div className="training-survey-label">「また参加したい」</div>
              <div className="training-survey-detail">継続意欲が非常に高い</div>
            </div>
          </div>

          {/* Detailed Survey Results */}
          <div className="training-survey-details">
            <h3 className="training-subsection-title">参加者の具体的な評価</h3>
            
            <div className="training-survey-question">
              <h4>Q1. コミュニケーションが取りやすくなりましたか？</h4>
              <div className="training-survey-bars">
                <div className="training-survey-bar">
                  <span className="bar-label">とても取りやすくなった</span>
                  <div className="bar-container">
                    <div className="bar-fill" style={{width: '44.9%'}}></div>
                    <span className="bar-percentage">44.9%</span>
                  </div>
                </div>
                <div className="training-survey-bar">
                  <span className="bar-label">取りやすくなった</span>
                  <div className="bar-container">
                    <div className="bar-fill" style={{width: '42.3%'}}></div>
                    <span className="bar-percentage">42.3%</span>
                  </div>
                </div>
                <div className="training-survey-bar">
                  <span className="bar-label">変わらない</span>
                  <div className="bar-container">
                    <div className="bar-fill" style={{width: '12.8%'}}></div>
                    <span className="bar-percentage">12.8%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="training-survey-question">
              <h4>Q2. また参加したいと思いますか？</h4>
              <div className="training-survey-bars">
                <div className="training-survey-bar">
                  <span className="bar-label">ぜひ参加したい</span>
                  <div className="bar-container">
                    <div className="bar-fill" style={{width: '70.5%'}}></div>
                    <span className="bar-percentage">70.5%</span>
                  </div>
                </div>
                <div className="training-survey-bar">
                  <span className="bar-label">参加したい</span>
                  <div className="bar-container">
                    <div className="bar-fill" style={{width: '25.7%'}}></div>
                    <span className="bar-percentage">25.7%</span>
                  </div>
                </div>
                <div className="training-survey-bar">
                  <span className="bar-label">どちらでもない</span>
                  <div className="bar-container">
                    <div className="bar-fill" style={{width: '3.8%'}}></div>
                    <span className="bar-percentage">3.8%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructor Section */}
      <section className="training-instructor">
        <div className="training-container">
          <h2 className="training-section-title">研修講師・ファシリテーター</h2>

          <div className="training-instructor-profile">
            <div className="training-instructor-header">
              <div className="training-instructor-image">
                <img src="/images/makoto.jpg" alt="木村 允" />
              </div>
              <div className="training-instructor-name-section">
                <h4>木村 允</h4>
                <p className="training-instructor-name-en">KIMURA MAKOTO</p>
                <p className="training-instructor-title">YOLUBE 代表 / テーブルゲームイノベーター / <a href="https://www.mitsulu.style/" target="_blank" rel="noopener noreferrer">IT系便利屋 三流</a> 代表</p>
              </div>
            </div>

            <div className="training-instructor-content">
              <div className="training-instructor-expertise">
                <h5><FontAwesomeIcon icon={faCheckCircle} /> 講師としての強み</h5>
                <div className="training-expertise-grid">
                  <div className="training-expertise-item">
                    <div className="training-expertise-number">1,000+</div>
                    <div className="training-expertise-label">イベント来場者数</div>
                    <p>2023年より「テーブルゲーム交流会：Ke.」を運営。累計参加者数約<strong className="highlight">1,100名超</strong>のイベントの中で、数多の参加者へテーブルゲームのルール説明等を実施。</p>
                  </div>
                  <div className="training-expertise-item">
                    <div className="training-expertise-number">87.2%</div>
                    <div className="training-expertise-label">業務改善効果</div>
                    <p>研修目的のテーブルゲーム選定に定評あり。参加者の<strong className="highlight">87%以上</strong>がコミュニケーション改善を実感し、<strong className="highlight">96%が継続参加</strong>を希望するなど高評価を得ている。</p>
                  </div>
                  <div className="training-expertise-item">
                    <div className="training-expertise-number">実践経験</div>
                    <div className="training-expertise-label">組織マネジメント</div>
                    <p>本業としてIT企業でのマネジメント経験を持つ。駐在員として赴任したベトナムで60名超のベトナム人チームと日本人チーム30名との間に生じた<strong className="highlight">コミュニケーション課題を解決</strong>。</p>
                  </div>
                </div>
              </div>

              <div className="training-instructor-message">
                <h5>研修への想い</h5>
                <p>
                  ベトナムのIT企業で、異文化チームのマネジメントを経験する中で、<strong className="highlight">言葉や立場を超えた「本質的なコミュニケーション」の重要性</strong>に気づきました。SNSやチャットツールが発達した現代でも、<strong className="highlight">対面でしか築けない信頼関係</strong>があります。
                </p>
                <p>
                  テーブルゲーム研修では、「遊び」という安全な環境の中で、<strong className="highlight">参加者の素の人間性</strong>が表れます。この<strong className="highlight">「職場のペルソナを脱いだ状態」での交流こそが、真の相互理解と組織変革の第一歩</strong>だと考えています。
                </p>
                <p>
                  2年間のKe.イベント運営で培った<strong className="highlight">1,000名以上へのファシリテーション経験</strong>を活かし、貴社の組織課題に寄り添った研修を設計いたします。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="training-faq">
        <div className="training-container">
          <h2 className="training-section-title">よくあるご質問</h2>
          <p className="training-section-subtitle">
            研修導入前の疑問にお答えします
          </p>

          <div className="training-faq-list">
            <div className="training-faq-item">
              <div className="training-faq-question">
                <FontAwesomeIcon icon={faQuestionCircle} />
                <h4>オンラインでの実施は可能ですか？</h4>
              </div>
              <div className="training-faq-answer">
                <p>
                  申し訳ございません、当研修は<strong>対面実施のみ</strong>となっております。テーブルゲーム研修の最大の価値は、実際に顔を合わせて遊ぶことで生まれる「本物のコミュニケーション」です。画面越しでは得られない、表情・雰囲気・空気感を共有することで、組織の関係性が根本から変わります。
                </p>
              </div>
            </div>

            <div className="training-faq-item">
              <div className="training-faq-question">
                <FontAwesomeIcon icon={faQuestionCircle} />
                <h4>ボードゲーム初心者でも大丈夫ですか？</h4>
              </div>
              <div className="training-faq-answer">
                <p>
                  <strong>まったく問題ありません！</strong>むしろ初心者の方こそ効果を実感いただけます。使用するゲームはルールが簡単で、誰でもすぐに楽しめるものを厳選しています。ファシリテーターが丁寧にサポートしますので、ゲーム経験ゼロの方でも安心してご参加いただけます。
                </p>
              </div>
            </div>

            <div className="training-faq-item">
              <div className="training-faq-question">
                <FontAwesomeIcon icon={faQuestionCircle} />
                <h4>1回の研修時間はどれくらいですか？</h4>
              </div>
              <div className="training-faq-answer">
                <p>
                  <strong>標準2〜3時間</strong>を想定しています。参加人数や実施内容によって調整可能です。半日コース（4時間）や、業務後の夕方実施（1.5時間×複数回）など、貴社のご都合に合わせて柔軟に対応いたします。
                </p>
              </div>
            </div>

            <div className="training-faq-item">
              <div className="training-faq-question">
                <FontAwesomeIcon icon={faQuestionCircle} />
                <h4>会場はどこで実施しますか？</h4>
              </div>
              <div className="training-faq-answer">
                <p>
                  <strong>貴社の会議室や社内スペース</strong>で実施可能です。机と椅子があれば十分です。秋田市内であれば交通費無料、秋田県内一律5,000円で伺います。県外の場合は別途ご相談ください。また、YOLUBEの拠点（秋田ベイパラダイス）でも実施可能です。
                </p>
              </div>
            </div>

            <div className="training-faq-item">
              <div className="training-faq-question">
                <FontAwesomeIcon icon={faQuestionCircle} />
                <h4>単発での実施も可能ですか？</h4>
              </div>
              <div className="training-faq-answer">
                <p>
                  <strong>可能です！</strong>お試しプラン（3万円/回）で単発実施いただけます。ただし、継続研修（年6回）の方が効果は圧倒的に高くなります。1〜4回で信頼関係の土壌を作り、5〜6回で本格的な経営分析を行う設計のため、単発では得られない組織変革を実感いただけます。
                </p>
              </div>
            </div>

            <div className="training-faq-item">
              <div className="training-faq-question">
                <FontAwesomeIcon icon={faQuestionCircle} />
                <h4>効果測定はどのように行いますか？</h4>
              </div>
              <div className="training-faq-answer">
                <p>
                  毎回の研修後に<strong>参加者アンケート</strong>を実施し、満足度・気づき・改善点を収集します。このデータをもとに次回研修を最適化するPDCAサイクルを回します。また、初回と最終回でエンゲージメントスコアを測定し、数値で効果を可視化することも可能です。
                </p>
              </div>
            </div>

            <div className="training-faq-item">
              <div className="training-faq-question">
                <FontAwesomeIcon icon={faQuestionCircle} />
                <h4>途中解約は可能ですか？</h4>
              </div>
              <div className="training-faq-answer">
                <p>
                  年間契約プラン（スタンダード・プレミアム）の途中解約は原則として承っておりません。ただし、やむを得ない事情がある場合はご相談ください。まずはお試しプラン（単発）で体験いただき、効果を実感された上で年間契約をご検討いただくことをおすすめします。
                </p>
              </div>
            </div>
          </div>

          <div className="training-faq-cta">
            <p>その他のご質問は、お気軽にお問い合わせください</p>
            <a href="#contact" className="training-btn training-btn-primary">
              <FontAwesomeIcon icon={faComments} />
              無料相談で詳しく聞く
            </a>
          </div>
        </div>
      </section>

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
          
          {/* Limited Offer Banner */}
          <div id="limited-offer" className="training-limited-offer">
            <div className="training-offer-badge">
              <FontAwesomeIcon icon={faExclamationTriangle} />
              期間限定キャンペーン
            </div>
            <h3>🎉 初回導入5社限定：スタンダードプラン15%OFF 🎉</h3>
            <p>今なら<strong>50万円 → 42.5万円（税別）</strong>で年間6回の研修を導入可能！</p>
            <p className="training-offer-price-detail">（6回・2ヶ月に1回実施、1回あたり7.1万円）</p>
            
            <div className="training-offer-conditions">
              <h4>【適用条件】</h4>
              <ul>
                <li>秋田県内の企業様</li>
                <li>初めて当団体の研修を導入される企業様</li>
                <li>2025年度内に研修を開始できる企業様</li>
              </ul>
            </div>
            
            <p className="training-offer-deadline">
              ※ 5社に達し次第、または2025年12月31日まで（いずれか早い方）で受付終了となります
            </p>
          </div>

          <h3 className="training-subsection-title">料金プラン</h3>
          <p className="training-pricing-intro">
            まずはお試しから。効果を実感いただいてから本格導入をご検討ください。
          </p>

          {/* お試しプラン - 特別レイアウト */}
          <div className="training-trial-special">
            <div className="training-trial-badge-wrapper">
              <div className="training-plan-badge-new">初めての方におすすめ</div>
            </div>
            <div className="training-trial-content">
              <div className="training-trial-left">
                <h4>お試しプラン</h4>
                <p className="training-trial-subtitle">1回限りの体験研修</p>
                <div className="training-trial-price">
                  <span className="training-price-amount">3万円</span>
                  <span className="training-price-unit">／1回</span>
                </div>
                <div className="training-trial-note">
                  ※ご満足いただけなかった場合、お試しプランの研修費用は全額返金いたします。
                </div>
              </div>
              <div className="training-trial-right">
                <ul>
                  <li><FontAwesomeIcon icon={faCheckCircle} /> まずは試してみたい企業様向け</li>
                  <li><FontAwesomeIcon icon={faCheckCircle} /> 研修参加者10名まで</li>
                  <li><FontAwesomeIcon icon={faCheckCircle} /> 2時間の体験研修</li>
                  <li><FontAwesomeIcon icon={faCheckCircle} /> アンケート実施・分析レポート付</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 通常プラン */}
          <div className="training-pricing-grid">
            <div className="training-pricing-plan">
              <div className="training-plan-header">
                <h4>ライトプラン</h4>
                <p className="training-plan-subtitle">3回セット</p>
              </div>
              <div className="training-plan-price">
                <span className="training-price-amount">30万円</span>
                <span className="training-price-unit">（3回・月1回実施）</span>
              </div>
              <div className="training-plan-features">
                <ul>
                  <li><FontAwesomeIcon icon={faCheckCircle} /> 短期集中で効果を実感</li>
                  <li><FontAwesomeIcon icon={faCheckCircle} /> 研修参加者10名まで</li>
                  <li><FontAwesomeIcon icon={faCheckCircle} /> アイスブレイク～コミュニケーション強化</li>
                  <li><FontAwesomeIcon icon={faCheckCircle} /> 毎回アンケート＆改善提案</li>
                </ul>
              </div>
              <div className="training-plan-value">
                <span className="value-label">1回あたり</span>
                <span className="value-amount">10万円</span>
              </div>
            </div>
            
            <div className="training-pricing-plan training-recommended">
              <div className="training-plan-badge">おすすめ</div>
              <div className="training-plan-header">
                <h4>スタンダードプラン</h4>
                <p className="training-plan-subtitle">6回セット</p>
              </div>
              <div className="training-plan-price">
                <span className="training-price-original">60万円</span>
                <span className="training-price-amount">50万円</span>
                <span className="training-price-unit">（6回・2ヶ月に1回実施）</span>
              </div>
              <div className="training-plan-features">
                <ul>
                  <li><FontAwesomeIcon icon={faCheckCircle} /> 継続的な効果を実感したい企業様向け</li>
                  <li><FontAwesomeIcon icon={faCheckCircle} /> 研修参加者10名まで</li>
                  <li><FontAwesomeIcon icon={faCheckCircle} /> 完全プログラム（経営分析まで）</li>
                  <li><FontAwesomeIcon icon={faCheckCircle} /> 3ヶ月無料相談サポート付</li>
                </ul>
              </div>
              <div className="training-plan-value">
                <span className="value-label">1回あたり</span>
                <span className="value-amount">8.3万円</span>
                <span className="value-discount">17%OFF</span>
              </div>
            </div>
            
            <div className="training-pricing-plan">
              <div className="training-plan-header">
                <h4>プレミアムプラン</h4>
                <p className="training-plan-subtitle">12回セット</p>
              </div>
              <div className="training-plan-price">
                <span className="training-price-original">120万円</span>
                <span className="training-price-amount">80万円</span>
                <span className="training-price-unit">（12回・毎月実施）</span>
              </div>
              <div className="training-plan-features">
                <ul>
                  <li><FontAwesomeIcon icon={faCheckCircle} /> 本格的な組織変革を目指す企業様向け</li>
                  <li><FontAwesomeIcon icon={faCheckCircle} /> 研修参加者10名まで</li>
                  <li><FontAwesomeIcon icon={faCheckCircle} /> 完全プログラム×2周</li>
                  <li><FontAwesomeIcon icon={faCheckCircle} /> 6ヶ月無料相談サポート付</li>
                </ul>
              </div>
              <div className="training-plan-value">
                <span className="value-label">1回あたり</span>
                <span className="value-amount">6.7万円</span>
                <span className="value-discount">33%OFF</span>
              </div>
            </div>
          </div>
          
          <div className="training-pricing-notes">
            <h4>料金詳細</h4>
            <div className="pricing-notes-grid">
              <div className="pricing-note-item">
                <div className="pricing-note-label">追加参加者料金</div>
                <div className="pricing-note-value">5名まで7,500円</div>
                <div className="pricing-note-detail">例）26名参加の場合: 追加16名 → 7,500円×4 = 30,000円</div>
              </div>
              <div className="pricing-note-item">
                <div className="pricing-note-label">交通費</div>
                <div className="pricing-note-value">
                  <span className="fee-item">秋田市内: 無料</span>
                  <span className="fee-item">秋田県内: 一律5,000円</span>
                  <span className="fee-item">県外: 応相談</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <a href="#contact" className="training-btn training-btn-primary training-btn-hero">
              <FontAwesomeIcon icon={faComments} />
              お申し込みはこちら
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
                  <label>会社名・団体名 <span className="required-mark">*</span></label>
                  <input
                    type="text"
                    name="company_name"
                    placeholder="株式会社○○"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="training-form-group">
                  <label>ご担当者名 <span className="required-mark">*</span></label>
                  <input
                    type="text"
                    name="user_name"
                    placeholder="山田 太郎"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="training-form-group">
                  <label>メールアドレス <span className="required-mark">*</span></label>
                  <input
                    type="email"
                    name="user_email"
                    placeholder="example@company.com"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="training-form-group">
                  <label>電話番号 <span className="required-mark">*</span></label>
                  <input
                    type="tel"
                    name="user_phone"
                    placeholder="090-1234-5678"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="training-form-group">
                  <label>備考 <span className="optional-mark">（任意）</span></label>
                  <textarea
                    rows="4"
                    name="message"
                    placeholder="研修についてのご質問や、組織の課題についてお聞かせください"
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

      {/* Floating CTA Button */}
      {showFloatingCTA && (
        <button
          className="training-floating-cta"
          onClick={scrollToContact}
          aria-label="お申し込みはこちら"
        >
          <FontAwesomeIcon icon={faComments} />
          <span>お申し込みはこちら</span>
        </button>
      )}

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

      {/* Footer (共通コンポーネント) */}
      <Footer />
    </div>
  );
};

export default Training;