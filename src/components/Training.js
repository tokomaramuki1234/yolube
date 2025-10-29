import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faClock, faBars, faTimes, faChevronUp, faChevronDown, faComments, faExclamationTriangle, faHandshake, faLightbulb, faArrowRight, faArrowDown, faCheckCircle, faQuestionCircle, faGift } from '@fortawesome/free-solid-svg-icons';
import Footer from './Footer';
import './Training.css';

// アニメーション設定定数
const ANIMATION_CONFIG = {
  CHAR_DELAY: 0.04, // 秒
  INTERSECTION_THRESHOLD: 0.2,
  SLIDESHOW_INTERVAL: 4000, // ミリ秒
  SLIDESHOW_COUNT: 6,
};

// アニメーション対象セクションのセレクタ
const ANIMATION_SECTION_SELECTORS = [
  '.training-problem',
  '.training-solution',
  '.training-tablegame-intro',
  '.training-research',
  '.training-features',
  '.training-program',
  '.training-advantage',
  '.training-survey-results',
  '.training-instructor',
  '.training-faq',
  '.training-pricing'
].join(', ');

const Training = () => {
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isReferencesOpen, setIsReferencesOpen] = useState(false);

  // H2見出しのアニメーション用ref
  const h2Refs = useRef([]);

  // 文字列を1文字ずつspan要素で囲むヘルパー関数
  const splitText = (text) => {
    return text.split('').map((char, index) => (
      <span key={index}>{char}</span>
    ));
  };

  // デバイスタイプを検出（PC/タブレット/スマホ）
  const [isMobile, setIsMobile] = useState(() => {
    // 初期値を正確に設定（SSR対応）
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 768;
    }
    return false;
  });

  const [videoSrc, setVideoSrc] = useState('');

  useEffect(() => {
    const checkDevice = () => {
      // タブレットとスマホを同じカテゴリとして扱う（768px以下）
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      // 動画URLを更新
      setVideoSrc(mobile
        ? 'https://page.gensparksite.com/get_upload_url/9777a8c05392943141ff32a764d2a518d905d719b3791598f5bb2f4d31408cd1/default/96355463-781b-4268-b4cd-8b99e9ef2bd6'
        : 'https://page.gensparksite.com/get_upload_url/9777a8c05392943141ff32a764d2a518d905d719b3791598f5bb2f4d31408cd1/default/a911c925-9e8b-43d6-991f-2d5c20962511'
      );
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
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

  // スクロールアニメーション (Intersection Observer)
  useEffect(() => {
    // HTMLタグを保持しながら文字列を1文字ずつspanで囲む関数
    const wrapCharsInSpan = (element) => {
      // 既に処理済みの場合はスキップ
      if (element.dataset.animated === 'true') return;
      
      const text = element.textContent;
      // 長文（100文字以上）はスキップしてブロック単位アニメーションのみ
      if (text.length > 100) {
        element.classList.add('animate-text');
        element.dataset.animated = 'true';
        return;
      }
      
      let charIndex = 0;
      
      const processNode = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const nodeText = node.textContent;
          const temp = document.createElement('div');
          
          // HTML文字列として一括構築
          temp.innerHTML = nodeText.split('').map((char, index) => {
            const delay = (charIndex + index) * ANIMATION_CONFIG.CHAR_DELAY;
            return `<span data-char-index="${charIndex + index}" style="animation-delay: ${delay}s">${char}</span>`;
          }).join('');
          
          const fragment = document.createDocumentFragment();
          fragment.append(...temp.childNodes);
          node.parentNode.replaceChild(fragment, node);
          charIndex += nodeText.length;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          Array.from(node.childNodes).forEach(child => processNode(child));
        }
      };
      
      processNode(element);
      element.dataset.animated = 'true';
    };

    // アニメーションクラスを追加するヘルパー関数
    const addAnimationClass = (elements, className, shouldWrap = false) => {
      elements.forEach(el => {
        if (!el.classList.contains(className)) {
          el.classList.add(className);
          if (shouldWrap) wrapCharsInSpan(el);
        }
      });
    };

    // 主要セクション内の要素にアニメーションクラスを自動付与
    const mainSections = document.querySelectorAll(ANIMATION_SECTION_SELECTORS);
    
    mainSections.forEach(section => {
      // 一度に全要素を取得
      const allElements = section.querySelectorAll('h3, h4, p, li, .training-problem-item, .training-solution-item, .training-flow-item, .training-feature-item, .training-effect-item, .training-issue-item, .training-expertise-item, .training-plan-card, .training-phase');
      
      allElements.forEach(el => {
        const tagName = el.tagName.toLowerCase();
        const hasContent = el.textContent.trim().length > 0;
        
        if (tagName === 'h3' && !el.closest('.training-phase-header')) {
          addAnimationClass([el], 'animate-h3', true);
        } else if (tagName === 'h4') {
          addAnimationClass([el], 'animate-h4', true);
        } else if (tagName === 'p' && hasContent && !el.classList.contains('training-btn') && !el.closest('.training-hero-buttons')) {
          addAnimationClass([el], 'animate-text', false);
        } else if (tagName === 'li' && hasContent) {
          addAnimationClass([el], 'animate-text', false);
        } else if (el.classList.contains('training-problem-item') || el.classList.contains('training-solution-item') || el.classList.contains('training-flow-item') || el.classList.contains('training-feature-item') || el.classList.contains('training-effect-item') || el.classList.contains('training-issue-item') || el.classList.contains('training-expertise-item') || el.classList.contains('training-plan-card') || el.classList.contains('training-phase')) {
          addAnimationClass([el], 'animate-block', false);
        }
      });
    });

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: ANIMATION_CONFIG.INTERSECTION_THRESHOLD
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // 全てのH2見出しを監視対象に追加
    h2Refs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    // H3, H4, P, Li要素、およびブロック要素も監視対象に追加
    const animatedElements = document.querySelectorAll('.animate-h3, .animate-h4, .animate-text, .animate-block');
    animatedElements.forEach(el => observer.observe(el));

    return () => {
      h2Refs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  // スライドショーの自動再生
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % ANIMATION_CONFIG.SLIDESHOW_COUNT);
    }, ANIMATION_CONFIG.SLIDESHOW_INTERVAL);

    return () => clearInterval(timer);
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
      <Helmet>
        <title>遊びが、組織を強くする。コミュニケーション研修 | YOLUBE</title>
        <meta name="description" content="テーブルゲームで実現する、誰もが参加したくなるコミュニケーション研修。社員同士の会話が少ない、部署間の壁が厚い、若手が早期離職してしまう、こうした組織課題を「遊び」で解決します。" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yolube.jp/training" />
        <meta property="og:title" content="遊びが、組織を強くする。コミュニケーション研修 | YOLUBE" />
        <meta property="og:description" content="テーブルゲームで実現する、誰もが参加したくなるコミュニケーション研修。社員同士の会話が少ない、部署間の壁が厚い、若手が早期離職してしまう、こうした組織課題を「遊び」で解決します。" />
        <meta property="og:image" content="https://yolube.jp/images/training-ogp.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://yolube.jp/training" />
        <meta name="twitter:title" content="遊びが、組織を強くする。コミュニケーション研修 | YOLUBE" />
        <meta name="twitter:description" content="テーブルゲームで実現する、誰もが参加したくなるコミュニケーション研修。社員同士の会話が少ない、部署間の壁が厚い、若手が早期離職してしまう、こうした組織課題を「遊び」で解決します。" />
        <meta name="twitter:image" content="https://yolube.jp/images/training-ogp.png" />
      </Helmet>
      
      {/* Header */}
      <header className="ke-header">
        <div className="ke-header-container">
          <div className="ke-logo">
            <a href="https://yolube.jp" target="_blank" rel="noopener noreferrer">
              <img src="/images/YOLUBE_logo.png" alt="YOLUBE" loading="eager" />
            </a>
          </div>
          <nav className={`ke-nav ${isMobileMenuOpen ? 'ke-nav-open' : ''}`}>
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
        {/* 背景動画 */}
        <div className="training-hero-video">
          {videoSrc && (
            <video
              className="training-hero-video-element"
              autoPlay
              loop
              muted
              playsInline
              key={videoSrc}
              src={videoSrc}
            >
              お使いのブラウザは動画再生に対応していません。
            </video>
          )}
        </div>
        <div className="training-hero-overlay"></div>
        <div className="training-container">
          <div className="training-hero-content-center">
            <div className="training-hero-text">

              <h1 className="training-title split-text">
                <span>遊</span><span>び</span><span>が</span><span>、</span><br />
                <span className="training-title-sub split-text-sub"><span>組</span><span>織</span><span>を</span><span>強</span><span>く</span><span>す</span><span>る</span><span>。</span></span>
              </h1>
              <p className="training-subtitle blur-in-text">
                <strong>テーブルゲームで実現する、誰もが参加したくなるコミュニケーション研修</strong></p>
              <div className="training-hero-buttons">
                <a href="#contact" className="training-btn training-btn-primary training-btn-hero">
                  <FontAwesomeIcon icon={faComments} />
                  無料で相談する
                </a>
              </div><br />
              <a href="#limited-offer" className="training-badge">
                秋田県企業様限定特別プラン実施中
              </a>
              
              {/* スクロール促進アイコン */}
              <div className="training-scroll-indicator">
                <a href="#problems" className="training-scroll-icon">
                  <FontAwesomeIcon icon={faChevronDown} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problems" className="training-problem">
        <div className="training-container">
          <div className="training-section-header">
            <h2 className="training-section-title animate-h2" ref={el => h2Refs.current[0] = el}>
              {splitText('こんなお悩みありませんか？')}
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
                <h4>社員の定着率が低い</h4>
                <p>上司/同僚/組織の全体像が伝わらず、先行きに不安を感じさせてしまう</p>
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
              <h2 className="training-section-title animate-h2" ref={el => h2Refs.current[1] = el}>
                {splitText('そのお悩みを')}<br />{splitText('「遊び」で解決します')}
              </h2>
              
              <p>「遊び」という敷居の低さ。<span className="mobile-break"></span>目的に応じた柔軟性。<br />そのどちらも兼ね備えたテーブルゲームを<span className="mobile-break"></span>フル活用してご支援致します</p>
            </div>
          </div>
        </div>
      </section>

      {/* What is Table Game Section */}
      <section className="training-tablegame-intro">
        <div className="training-container">
          <h2 className="training-section-title animate-h2" ref={el => h2Refs.current[2] = el}>
            {splitText('テーブルゲームとは？')}
          </h2>
          
          <div className="training-tablegame-content">
            <div className="training-tablegame-text">
              <p>
                <strong>テーブルゲーム</strong>とは、囲碁・将棋・トランプ・UNOなどの対面で遊ぶゲームの総称です。「ゲームで研修？ただ遊ぶだけじゃないの？」と思われるかもしれませんが、実は<span className="emphasis-benefit">職場の"言いにくいこと"を自然に言える関係づくり</span>に最適なツールなのです。
              </p>
              <p>
                通常の研修では役職や年齢の壁が邪魔をします。しかしテーブルゲームでは、社長も新入社員も対等の立場。「課長、そこは違う手ですよ！」「部長、今のはずるいです（笑）」——こうした<span className="emphasis-benefit">普段は言えない"本音"が笑いと共に飛び交う</span>瞬間が、心理的な壁を溶かします。
              </p>
            </div>

            {/* Table Game Slideshow */}
            <div className="training-tablegame-slideshow">
              <div className="slideshow-container">
                <div className="slideshow-track" style={{transform: `translateX(-${currentSlide * 100}%)`}}>
                  <div className="slideshow-slide">
                    <img src="https://page.gensparksite.com/v1/base64_upload/09a75843134de930ac96d3294bc39eea" alt="横手市内での研修風景" />
                    <p className="slideshow-caption">横手市内での研修風景</p>
                  </div>
                  <div className="slideshow-slide">
                    <img src="https://page.gensparksite.com/v1/base64_upload/821aadd68e790b981414404298b08b81" alt="テーブルゲームに関する様々な書籍" />
                    <p className="slideshow-caption">テーブルゲームに関する様々な書籍</p>
                  </div>
                  <div className="slideshow-slide">
                    <img src="https://page.gensparksite.com/v1/base64_upload/abb43042ad1c4db38c2fd7a9e560705e" alt="賞金付きの世界大会も存在するテーブルゲーム「カタン」の最新作" />
                    <p className="slideshow-caption">賞金付きの世界大会も存在する「カタン」</p>
                  </div>
                  <div className="slideshow-slide">
                    <img src="https://page.gensparksite.com/v1/base64_upload/579539f209a60bc6ad8c1939ee031eed" alt="近年になって３Dプリンタを用いた作品が増加しています" />
                    <p className="slideshow-caption">近年になって３Dプリンタを用いた作品が増加</p>
                  </div>
                  <div className="slideshow-slide">
                    <img src="https://page.gensparksite.com/v1/base64_upload/278cbc3a7b005776512025fb58a1d825" alt="テーブルゲームには３時間以上かかる大作も数多く存在しています" />
                    <p className="slideshow-caption">テーブルゲームには３時間以上かかる大作も数多く存在</p>
                  </div>
                  <div className="slideshow-slide">
                    <img src="https://page.gensparksite.com/v1/base64_upload/c4a30fb6cb5c06bc14f534c325ca88cd" alt="テーブルゲーム業界の有名タイトル「宝石の煌めき」" />
                    <p className="slideshow-caption">テーブルゲーム業界の名作「宝石の煌めき」</p>
                  </div>
                </div>
              </div>
              <div className="slideshow-dots">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <button
                    key={index}
                    className={`slideshow-dot ${currentSlide === index ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`スライド${index + 1}へ移動`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="training-tablegame-link">
            <a href="https://yolube.jp/tablegame" target="_blank" rel="noopener noreferrer">
              テーブルゲームについてより詳しい情報はこちら
            </a>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section className="training-research">
        <div className="training-container">
          <h2 className="training-section-title animate-h2" ref={el => h2Refs.current[3] = el}>
            {splitText('テーブルゲーム研修について')}
          </h2>
          
          <div className="training-research-content">
            <div className="training-research-overview">
              <p>
                「社員同士の会話が少ない」「部署間の壁が厚い」「若手が早期離職してしまう」——こうした組織課題に対し、テーブルゲームを用いたコミュニケーション研修が<span className="emphasis-benefit">学術的な裏付けのある解決策</span>として注目されています。
              </p>
              <p>
                近年の研究では、テーブルゲームが<span className="emphasis-benefit">「協調性・問題解決力・コミュニケーション能力」を効果的に育成する</span>ことが実証され、教育現場だけでなく<span className="emphasis-benefit">社会人基礎力育成の手段として企業研修でも導入が進んでいます</span>。初対面同士でも自然に会話が生まれ、継続参加により人間関係が深まるプロセスが観察されており、<span className="emphasis-benefit">社員エンゲージメント向上・離職率低下・心理的安全性構築に寄与する、科学的根拠のある施策</span>として、中小企業の限られた研修予算の中でも確実な効果が期待できる投資です。
              </p>
              <p>
                海外の研究では、ゲーミフィケーションを取り入れた研修で<span className="highlight">学習者エンゲージメントが60%向上</span>し、また高エンゲージメント組織では<span className="highlight">利益が23%増加</span>することが報告されています（TalentLMS Survey、Gallup調査より）。テーブルゲーム研修は、これらの効果を対面形式で最大化する手法として、今最も注目されているアプローチです。
              </p>
            </div>

            <div className="training-research-references">
              <button 
                className="training-research-references-toggle"
                onClick={() => setIsReferencesOpen(!isReferencesOpen)}
                aria-expanded={isReferencesOpen}
              >
                <span>参考文献・情報源</span>
                <i className={`fas fa-chevron-${isReferencesOpen ? 'up' : 'down'}`}></i>
              </button>
              {isReferencesOpen && (
                <ul className="training-research-references-list">
                  <li><a href="https://www.r-gscefs.jp/?p=10021" target="_blank" rel="noopener noreferrer">立命館大学 地域研究センター</a></li>
                  <li><a href="https://gamescience.jp/2021/Paper/Teramura_2021.pdf" target="_blank" rel="noopener noreferrer">日本ゲーム学会論文誌（寺村, 2021）</a></li>
                  <li><a href="https://www.jstage.jst.go.jp/article/jjske/advpub/0/advpub_TJSKE-D-20-00046/_pdf" target="_blank" rel="noopener noreferrer">日本感性工学会論文誌</a></li>
                  <li><a href="https://gamescience.jp/2022/Paper/Etou_2022.pdf" target="_blank" rel="noopener noreferrer">日本ゲーム学会論文誌（江藤, 2022）</a></li>
                  <li><a href="https://www.jstage.jst.go.jp/article/konpyutariyoukyouiku/31/0/31_34/_pdf" target="_blank" rel="noopener noreferrer">コンピュータ利用教育学会</a></li>
                  <li><a href="https://researchmap.jp/satoruyamakawa/published_papers/33783558/attachment_file.pdf" target="_blank" rel="noopener noreferrer">山川聡「ジェネリックスキルに関する考察」</a></li>
                  <li><a href="https://www.jstage.jst.go.jp/article/digrajproc/11/0/11_35/_pdf/-char/ja" target="_blank" rel="noopener noreferrer">日本デジタルゲーム学会</a></li>
                  <li><a href="https://osu.repo.nii.ac.jp/record/2438/files/011-027.pdf" target="_blank" rel="noopener noreferrer">岡山商科大学リポジトリ</a></li>
                  <li><a href="https://ipsj.ixsq.nii.ac.jp/record/213429/files/IPSJ-GPWS2021008.pdf" target="_blank" rel="noopener noreferrer">情報処理学会論文誌</a></li>
                  <li><a href="https://www.talentlms.com/blog/gamification-survey-results/" target="_blank" rel="noopener noreferrer">TalentLMS「2019 Gamification at Work Survey」（学習者エンゲージメント60%向上データ）</a></li>
                  <li><a href="https://www.gallup.com/workplace/285674/improve-employee-engagement-workplace.aspx" target="_blank" rel="noopener noreferrer">Gallup「How to Improve Employee Engagement in the Workplace」（高エンゲージメント組織の利益23%増加データ）</a></li>
                  <li>その他多数の学術論文・市場調査レポート</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="training-features">
        <div className="training-container">
          <h2 className="training-section-title animate-h2" ref={el => h2Refs.current[4] = el}>
            {splitText('「遊び」がもたらす効果')}
          </h2>
          {/* Process Flow */}
          <div className="training-process-flow">
            <div className="training-flow-item">
              <div className="training-flow-icon">
                <FontAwesomeIcon icon={faUsers} />
              </div>
              <div className="training-flow-label">体験</div>
              <p>テーブルゲームで<br />自然体のまま交流</p>
            </div>
            <div className="training-flow-arrow">
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
            <div className="training-flow-item">
              <div className="training-flow-icon">
                <FontAwesomeIcon icon={faLightbulb} />
              </div>
              <div className="training-flow-label">気づき</div>
              <p>相手の人間性・<br />強みを発見</p>
            </div>
            <div className="training-flow-arrow">
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
            <div className="training-flow-item">
              <div className="training-flow-icon">
                <FontAwesomeIcon icon={faHandshake} />
              </div>
              <div className="training-flow-label">行動</div>
              <p>職場での<br />会話が増える</p>
            </div>
          </div>

          <div className="training-features-grid">
            <div className="training-feature-item">
              <div className="training-feature-image">
                <img src="/images/training_02_01.png" alt="社内交流の活性化" />
              </div>
              <h3>社内交流の活性化</h3>
              <ul>
                <li>組織内に横断的な交流機会を創出。自社への解像度が高まる。</li>
                <li>お互いの「職場以外の一面」を知る機会で相互理解が進む</li>
              </ul>
            </div>
            
            <div className="training-feature-item">
              <div className="training-feature-image">
                <img src="/images/training_02_02.jpeg" alt="エンゲージメント向上" />
              </div>
              <h3>エンゲージメント向上</h3>
              <ul>
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
          <h2 className="training-section-title animate-h2" ref={el => h2Refs.current[5] = el}>
            {splitText('研修プログラムの流れ')}
          </h2>
          <p className="training-section-subtitle">
            <span className="desktop-only">全員参加型経営におけるモデルケース：年６回の研修を通して実施した場合</span>
            <span className="mobile-only"><strong>全員参加型経営におけるモデルケース</strong><br />年６回の研修を通して実施した場合</span>
          </p>

          {/* Program Phases */}
          <div className="training-program-phases">
            <div className="training-phase">
              <div className="training-phase-header">
                <h3>
                  <span className="desktop-only">【第1～4回】アイスブレイク＆情報収集フェーズ</span>
                  <span className="mobile-only">【第1～4回】<br />アイスブレイク<br />＆情報収集フェーズ</span>
                </h3>
                <p className="training-phase-purpose">
                  <strong className="mobile-tablet-block">目的：</strong>
                  <span className="desktop-only">社内コミュニケーション円滑化・エンゲージメント向上</span>
                  <span className="mobile-tablet-only">社内コミュニケーション円滑化・エンゲージメント向上</span>
                </p>
                <p className="training-phase-purpose">
                  <strong className="mobile-tablet-block">実施内容：</strong>
                  <span className="desktop-only">テーブルゲームを通じて、多面的に相互理解を得る機会を提供。毎回の研修後にアンケートにて効果測定。</span>
                  <span className="mobile-tablet-only">テーブルゲームを通じて、多面的に相互理解を得る機会を提供。毎回の研修後にアンケートにて効果測定。</span>
                </p>
              </div>

              <div className="training-phase-images">
                <div className="training-phase-image">
                  <img src="/images/training/phase1_game.jpg" alt="YOLUBEゲーム研修 - 達成感と喜びを共有する参加者たち" />
                  <p className="training-image-caption">盛り上がること間違いなしのテーブルゲーム研修。</p>
                </div>
                <div className="training-phase-image">
                  <img src="/images/training/phase1_survey.jpg" alt="YOLUBE研修アンケート結果 - 新人社員テーブルゲーム研修の効果" />
                  <p className="training-image-caption">集計結果は回答者を特定しにくい形で貴社に報告します。</p>
                </div>
              </div>

              <div className="training-effects">
                <h4>期待できる効果</h4>
                
                <div className="training-effect-item">
                  <h5>1. 相互理解が進む</h5>
                  <p>研修では参加者がフラットな状態（＝職場でのペルソナが役に立たない状態）で臨むため、良くも悪くも人間性が表面化しやすくなります。この"職場では見えなかった一面"について相互理解が深まるほど、個々の強み・弱みを補完できる組織づくりを目指しやすくなります。</p>
                  
                </div>
                
                <div className="training-effect-item">
                  <h5>2. 成功体験を共有する</h5>
                  <p>研修の参加者同士が共有する成功体験は、その後の何気ない日常の中でも思い返されることとなります。研修を重ねることでチームメンバーとの成功体験も増え、自然とポジティブな話題が増えていきます。</p>
                </div>
                <div className="training-effect-item">
                  <h5>3. エンゲージメントの向上</h5>
                  <p>相互理解・成功体験の共有が進む中で、社員一人一人が社内の人間関係を理解していきます。「この会社は〇〇だから××だと思う」という先入観が減り、風通しも良くなることで離職率低下にも寄与します。</p>
                </div>
              </div>
            </div>
            
            <div className="training-phase">
              <div className="training-phase-header">
                <h3>
                  <span className="desktop-only">【第5～6回】実践活用フェーズ</span>
                  <span className="mobile-only">【第5～6回】<br />実践活用フェーズ</span>
                </h3>
                <p className="training-phase-purpose">
                  <strong className="mobile-tablet-block">目的：</strong>
                  <span className="desktop-only">全員参加型での経営分析・戦略立案</span>
                  <span className="mobile-tablet-only">全員参加型での経営分析・戦略立案</span>
                </p>
                <p className="training-phase-purpose">
                  <strong className="mobile-tablet-block">実施内容：</strong>
                  <span className="desktop-only">第1～4回で構築した信頼関係を活かし、ブレインストーミング研修と経営分析研修を実施。</span>
                  <span className="mobile-tablet-only">第1～4回で構築した信頼関係を活かし、ブレインストーミング研修と経営分析研修を実施。</span>
                </p>
              </div>

              <div className="training-phase-images">
                <div className="training-phase-image">
                  <img src="/images/training/phase2_brainstorm.jpg" alt="コミュニケーションを表現したアート作品 - ブレインストーミング研修のイメージ" />
                  <p className="training-image-caption">形骸化したただのアイディア出しで終わらせるのではなく、参加者が主体的に取り組める環境づくりからデザインします。</p>
                </div>
                <div className="training-phase-image">
                  <img src="/images/training/phase2_swot.jpg" alt="SWOT分析図 - 経営戦略研修のイメージ" />
                  <p className="training-image-caption">SWOT分析はファシリテーターが居てこそ進めやすいもの。YOLUBEがしっかりご支援致します。</p>
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
                  <p>ブレインストーミングや経営分析といった実践的な手法を体験することで、問題解決力や論理的思考力が向上します。研修で学んだスキルは、日常業務やプロジェクト管理にも活かせます。</p>
                </div>
              </div>
            </div>
          </div>

          {/* Before After Comparison */}
          <div className="training-before-after">
            <h3 className="training-subsection-title">研修前・研修後の変化</h3>
            <div className="training-comparison-grid">
              <div className="training-comparison-before">
                <div className="training-comparison-image">
                  <img src="/images/training/before_training.jpg" alt="研修前：固い雰囲気のオフィス" />
                </div>
                <div className="training-comparison-header">
                  <FontAwesomeIcon icon={faExclamationTriangle} />
                  <h4>研修前</h4>
                </div>
                <ul>
                  <li>社内の人間関係が薄っぺらい</li>
                  <li>部署間の情報共有が不足している</li>
                  <li>経営に対する当事者意識が欠如している</li>
                  <li>研修が座学中心で退屈。惰性で参加してしまう。</li>
                  <li>意見を言いづらい雰囲気に包まれている</li>
                  <li>ヒューマンスキルが伸び悩む</li>
                </ul>
              </div>

              <div className="training-comparison-arrow desktop-only">
                <FontAwesomeIcon icon={faArrowRight} />
              </div>

              <div className="training-comparison-arrow-mobile mobile-tablet-only">
                <FontAwesomeIcon icon={faArrowDown} />
              </div>

              <div className="training-comparison-after">
                <div className="training-comparison-image">
                  <img src="/images/training/after_training.png" alt="研修後：笑顔で協力し合うチーム" />
                </div>
                <div className="training-comparison-header">
                  <FontAwesomeIcon icon={faCheckCircle} />
                  <h4>研修後</h4>
                </div>
                <ul>
                  <li>社内の人間関係に関心を持つ</li>
                  <li>部署を越えた交流が活性化する</li>
                  <li>経営への当事者意識の向上</li>
                  <li>研修への積極的参加</li>
                  <li>他者に相談しやすい環境が育まれる</li>
                  <li>ヒューマンスキルの向上</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Competitive Advantage Section */}
      <section className="training-advantage">
        <div className="training-container">
          <h2 className="training-section-title animate-h2" ref={el => h2Refs.current[6] = el}>
            {splitText('なぜテーブルゲーム研修')}<span className="mobile-break">{splitText('なのか？')}</span>
          </h2>

          {/* 構成１：一般的な研修の課題（左：画像、右：テキスト） */}
          <div className="training-comparison-row" data-bg-row="1" style={{'--bg-image': 'url(/images/training/traditional_training.jpg)'}}>
            <div className="training-comparison-image-left">
              <img src="/images/training/traditional_training.jpg" alt="座学型の一般的な研修風景 - 受動的な学習環境" />
            </div>
            <div className="training-comparison-content-right">
              <h4>一般的な研修の課題</h4>
              <div className="training-issue-item">
                <h5>単発型</h5>
                <p>効果が定着しにくい。また、根深い課題に対しアプローチしにくい。</p>
              </div>
              <div className="training-issue-item">
                <h5>座学型</h5>
                <p>受動的な学習で定着率が低く、実践的なコミュニケーション機会がない。</p>
              </div>
              <div className="training-issue-item">
                <h5>オンライン研修</h5>
                <p>画面越しでは本質的な人間関係構築が困難。</p>
              </div>
              <div className="training-issue-item">
                <h5>既存のチームビルディング</h5>
                <p>一時的な効果に留まり、継続性に欠ける。</p>
              </div>
            </div>
          </div>
          
          <h4 className="training-unique-title">テーブルゲーム研修の強み</h4>
          
          {/* 構成２：職場のペルソナ（左：テキスト、右：画像） */}
          <div className="training-comparison-row" data-bg-row="3" style={{'--bg-image': 'url(/images/training/persona_worklife.jpg)'}}>
            <div className="training-comparison-content-left">
              <h5>
                <span className="desktop-only">"職場の仮面"を脱いで本音で向き合える稀有な研修</span>
                <span className="mobile-only">"職場の仮面"を脱いで本音で向き合える<br />稀有な研修</span>
              </h5>
              <p>従来研修では職場での立場や先入観が邪魔をしますが、テーブルゲームでは参加者全員がフラットな状態になります。ゲーム中は職位や部署に関係なく、純粋な人間性が表面化するため、<strong>"職場では見えなかった一面"</strong> での相互理解が深まります。</p>
            </div>
            <div className="training-comparison-image-right">
              <img src="/images/training/persona_worklife.jpg" alt="仕事と家庭の両面を持つ女性 - 職場のペルソナを超えた理解" />
            </div>
          </div>

          {/* 構成３：PDCAサイクル（左：画像、右：テキスト） */}
          <div className="training-comparison-row" data-bg-row="4" style={{'--bg-image': 'url(/images/training/pdca_cycle.jpg)'}}>
            <div className="training-comparison-image-left">
              <img src="/images/training/pdca_cycle.jpg" alt="PDCAサイクル図解 - Plan Do Check Act の継続的改善プロセス" />
            </div>
            <div className="training-comparison-content-right">
              <h5>段階的PDCAサイクルで確実な成果創出</h5>
              <ul>
                <li><strong>第1～4回：</strong> アイスブレイク＆情報収集で土壌づくり</li>
                <li><strong>毎回のアンケート分析</strong> で次回研修を最適化</li>
                <li><strong>第5～6回：</strong> 構築された信頼関係を活用した本格的経営分析</li>
                <li><strong>年間を通じた継続的改善</strong> で一時的でない組織変革を実現</li>
              </ul>
            </div>
          </div>
          
          {/* 構成４：共有される成功体験（左：テキスト、右：画像） */}
          <div className="training-comparison-row" data-bg-row="5" style={{'--bg-image': 'url(/images/training/shared_success.jpg)'}}>
            <div className="training-comparison-content-left">
              <h5>成功体験の共有が組織文化を変える</h5>
              <p>研修中に体験した“ほかの社員との成功体験”は日常業務でも思い返され、「あの時の〇〇は楽しかったね！」と言った会話が自然に増えます。忘年会や日常会話でも共通の話題としやすく、<strong>組織全体の雰囲気を根本から改善</strong>します。</p>
            </div>
            <div className="training-comparison-image-right">
              <img src="/images/training/shared_success.jpg" alt="笑顔で協力し合うビジネスチーム - 共有される成功体験" />
            </div>
          </div>
        </div>
      </section>

      {/* Survey Results Section */}
      <section className="training-survey-results">
        <div className="training-container">
          <h2 className="training-section-title animate-h2" ref={el => h2Refs.current[7] = el}>
            {splitText('研修参加者アンケート結果')}
          </h2>
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
          <h2 className="training-section-title animate-h2" ref={el => h2Refs.current[8] = el}>
            {splitText('研修講師・ファシリテーター')}
          </h2>

          <div className="training-instructor-profile">
            <div className="training-instructor-header">
              <div className="training-instructor-image">
                <img src="/images/makoto.jpg" alt="木村 允" />
              </div>
              <div className="training-instructor-name-section">
                <h4>木村 允</h4>
                <p className="training-instructor-name-en">KIMURA MAKOTO</p>
                <p className="training-instructor-title">YOLUBE 代表 /<br />テーブルゲームイノベーター /<br /><a href="https://www.mitsulu.style/" target="_blank" rel="noopener noreferrer">IT系便利屋 三流</a> 代表</p>
              </div>
            </div>

            <div className="training-instructor-content">
              <div className="training-instructor-expertise">
                <h5><FontAwesomeIcon icon={faCheckCircle} /> 講師としての強み</h5>
                <div className="training-expertise-grid">
                  <div className="training-expertise-item">
                    <div className="training-expertise-number">1,000+</div>
                    <div className="training-expertise-label">イベント来場者数</div>
                    <p>2023年より<a href="https://yolube.jp/ke" target="_blank" rel="noopener noreferrer" className="training-link">テーブルゲーム交流会：Ke.</a>を運営。累計参加者数約<strong className="highlight">1,100名超</strong>のイベントの中で、数多の参加者へテーブルゲームのルール説明等を実施。</p>
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
                  ベトナムのIT企業で、異文化チームのマネジメントを経験する中で、<span className="emphasis-benefit">言葉や立場を超えた「本質的なコミュニケーション」の重要性</span>を学んでまいりました。SNSやチャットツールが発達した現代でも、対面でしか築けない信頼関係があります。
                </p>
                <p>
                  テーブルゲーム研修では、「遊び」を通じて参加者の素の人間性が表れます。この<span className="highlight">「職場の仮面を脱いだ状態」での交流</span>こそが、真の相互理解と組織変革の第一歩だと考えています。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="training-faq">
        <div className="training-container">
          <h2 className="training-section-title animate-h2" ref={el => h2Refs.current[9] = el}>
            {splitText('よくあるご質問')}
          </h2>
          <p className="training-section-subtitle">
            研修導入前の疑問にお答えします
          </p>

          <div className="training-faq-list">
            <div className="training-faq-item">
              <div className="training-faq-question">
                <FontAwesomeIcon icon={faQuestionCircle} />
                <h4>料金以外に追加費用はかかりますか？</h4>
              </div>
              <div className="training-faq-answer">
                <p>
                  <strong>いいえ、かかりません。</strong>提示している料金には、講師料・ゲーム貸出料・教材費・アンケート分析費がすべて含まれています。秋田市内なら交通費も無料、秋田県内一律5,000円のみです。追加料金なしで安心してご利用いただけます。ただし、別途で研修会場が必要となった場合のみ会場費をご負担いただきます。
                </p>
              </div>
            </div>

            <div className="training-faq-item">
              <div className="training-faq-question">
                <FontAwesomeIcon icon={faQuestionCircle} />
                <h4>参加人数に制限はありますか？</h4>
              </div>
              <div className="training-faq-answer">
                <p>
                  基本プランは<strong>10名まで</strong>対応しています。それ以上の参加者は、5名ごとに7,500円（税込8,250円）の追加料金で対応可能です。小規模（3〜5名）から中規模（30名程度）まで、幅広い人数でご利用いただけます。
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
                <h4>会場はどこで実施しますか？</h4>
              </div>
              <div className="training-faq-answer">
                <p>
                  <strong>貴社の会議室や社内スペース</strong>で実施可能です。机と椅子があれば十分です。秋田市内であれば交通費無料、秋田県内一律5,000円で伺います。県外の場合は別途ご相談ください。また、YOLUBEの拠点（<a href="https://maps.app.goo.gl/wYrJSoRWovWHiD997" target="_blank" rel="noopener noreferrer" className="training-location-link">秋田ベイパラダイス</a>、<a href="https://maps.app.goo.gl/fEy86N2gPsf6FSEs5" target="_blank" rel="noopener noreferrer" className="training-location-link">みんなの実家 門脇家</a>）でも実施可能です。
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
                  年間契約プラン（ライト／スタンダード／プレミアム）の途中解約は原則として承っておりません。ただし、やむを得ない事情がある場合はご相談ください。まずはお試しプラン（単発）で体験いただき、効果を実感された上で年間契約をご検討いただくことをおすすめします。
                </p>
              </div>
            </div>
          </div>

          <div className="training-faq-cta">
            <p>その他のご質問は、お気軽にお問い合わせください</p>
            <a href="#contact" className="training-btn training-btn-primary">
              <FontAwesomeIcon icon={faComments} />
              無料相談はこちら
            </a>
          </div>
        </div>
      </section>

      {/* Target & Pricing Section */}
      <section id="pricing" className="training-pricing">
        <div className="training-container">
          <h2 className="training-section-title animate-h2" ref={el => h2Refs.current[10] = el}>
            {splitText('料金プラン')}
          </h2>
          
          {/* Limited Offer Banner */}
          <div id="limited-offer" className="training-limited-offer">
            <div className="training-offer-badge">
              <FontAwesomeIcon icon={faExclamationTriangle} />
              期間限定キャンペーン
            </div>
            <h3>
              <FontAwesomeIcon icon={faGift} style={{ color: 'rgb(220, 53, 69)', marginRight: '0.5rem' }} />
              初回導入5社限定
              <FontAwesomeIcon icon={faGift} style={{ color: 'rgb(220, 53, 69)', marginLeft: '0.5rem' }} />
            </h3>
            <p className="training-offer-discount">スタンダードプラン15%OFF</p>
            <p>
              <span className="desktop-only">今なら<strong>50万円 → 42.5万円（税別）</strong>で年間6回の研修を導入可能！</span>
              <span className="mobile-tablet-only">今なら<strong>50万円 → 42.5万円（税別）</strong><br />で年間6回の研修を導入可能！</span>
            </p>
            <p className="training-offer-price-detail">（6回：2ヶ月に1回実施）</p>
            
            <div className="training-offer-conditions">
              <h4>【適用条件】</h4>
              <ul>
                <li>秋田県内の企業様</li>
                <li>初めて当団体の研修を導入される企業様</li>
                <li>2025年度内に研修を開始できる企業様</li>
              </ul>
            </div>
            
            <p className="training-offer-deadline">
              <FontAwesomeIcon icon={faClock} style={{ marginRight: '0.5rem' }} />
              【申込期限】<span className="training-offer-remaining">2025年3月31日まで</span>
              <br />
              <strong>残り<span className="training-offer-remaining">5社</span>限定！お早めにお申し込みください。</strong>
            </p>
          </div>
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
                </div>
                <div className="training-price-tax">(税込 33,000円)</div>
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
              <div className="training-price-tax">(税込 330,000円)</div>
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
                <span className="value-tax">(税込 110,000円)</span>
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
              <div className="training-price-tax">(税込 550,000円)</div>
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
                <span className="value-tax">(税込 91,300円)</span>
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
              <div className="training-price-tax">(税込 880,000円)</div>
              <div className="training-plan-features">
                <ul>
                  <li><FontAwesomeIcon icon={faCheckCircle} /> 本格的な組織変革を目指す企業様向け</li>
                  <li><FontAwesomeIcon icon={faCheckCircle} /> 研修参加者10名まで</li>
                  <li><FontAwesomeIcon icon={faCheckCircle} /> 研修内容、スケジュールを自由にカスタマイズ可能</li>
                  <li><FontAwesomeIcon icon={faCheckCircle} /> 6ヶ月無料相談サポート付</li>
                </ul>
              </div>
              <div className="training-plan-value">
                <span className="value-label">1回あたり</span>
                <span className="value-amount">6.7万円</span>
                <span className="value-tax">(税込 73,700円)</span>
                <span className="value-discount">33%OFF</span>
              </div>
            </div>
          </div>
          
          <div className="training-pricing-notes">
            <h4>料金詳細</h4>
            <div className="pricing-notes-grid">
              <div className="pricing-note-item">
                <div className="pricing-note-label">追加参加者料金</div>
                <div className="pricing-note-value">5名まで7,500円 <span className="pricing-tax-small">(税込 8,250円)</span></div>
                <div className="pricing-note-detail">例）26名参加の場合: 追加16名 → 7,500円×4 = 30,000円 <span className="pricing-tax-small">(税込 33,000円)</span></div>
              </div>
              <div className="pricing-note-item">
                <div className="pricing-note-label">交通費</div>
                <div className="pricing-note-value">
                  <span className="fee-item">秋田市内: 無料</span>
                  <span className="fee-item">秋田県内: 一律5,000円 <span className="pricing-tax-small">(税込 5,500円)</span></span>
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