import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faUsers, faCalendarAlt, faMapMarkerAlt, faClock, faHeart, faDice, faBars, faTimes, faChevronUp, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './KeLP.css';

const KeLPWeb3 = () => {
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState('ja');

  // 多言語テキストデータ
  const translations = {
    ja: {
      nav: {
        about: 'イベントについて',
        schedule: '開催スケジュール',
        access: 'アクセス',
        contact: 'お問い合わせ'
      },
      hero: {
        title1: '世界中のテーブルゲームで',
        title2: '遊ぼう！',
        badge1: '参加費無料',
        badge2: '初参加・未経験者歓迎',
        badge3: '年齢性別関係なし！',
        aboutTitle: 'テーブルゲーム交流会：Ke.について',
        description1: 'テーブルゲーム交流会：Ke.は年齢、世代、立場を問わず遊べる交流会です。',
        description2: '「ルールが難しそう...」「ついていけるかな？」そんな心配は無用！経験豊富なスタッフが一からやさしく教えるので、未経験者でも安心して楽しめます。新しい友達づくりや、50代以上の方の新しい趣味探しにもぴったり！３才から９０才まで幅広い年齢層からご参加いただいています。',
        btn1: '次回イベントに参加する',
        btn2: 'SNSで最新の情報をキャッチ'
      },
      sponsors: {
        cooperation: '協力',
        support: '後援'
      },
      gallery: {
        title: 'イベントの様子'
      },
      backToTop: 'トップへ戻る'
    },
    en: {
      nav: {
        about: 'About Event',
        schedule: 'Schedule',
        access: 'Access',
        contact: 'Contact'
      },
      hero: {
        title1: 'Play with board games',
        title2: 'from around the world!',
        badge1: 'Free participation',
        badge2: 'Beginners welcome',
        badge3: 'All ages and genders!',
        aboutTitle: 'About Tabletop Game Social: Ke.',
        description1: 'Tabletop Game Social: Ke. is a social event where people can play regardless of age, generation, or position.',
        description2: '"The rules seem difficult..." "Can I keep up?" No need to worry! Experienced staff will teach you from the basics, so even beginners can enjoy with confidence. Perfect for making new friends or finding new hobbies for people over 50! Participants range from 3 to 90 years old.',
        btn1: 'Join the next event',
        btn2: 'Get latest info on SNS'
      },
      sponsors: {
        cooperation: 'Cooperation',
        support: 'Support'
      },
      gallery: {
        title: 'Event Photos'
      },
      backToTop: 'Back to Top'
    },
    vi: {
      nav: {
        about: 'Về Sự Kiện',
        schedule: 'Lịch Trình',
        access: 'Đường Đi',
        contact: 'Liên Hệ'
      },
      hero: {
        title1: 'Chơi board game',
        title2: 'từ khắp thế giới!',
        badge1: 'Tham gia miễn phí',
        badge2: 'Chào đón người mới',
        badge3: 'Mọi lứa tuổi và giới tính!',
        aboutTitle: 'Về Câu Lạc Bộ Board Game Giao Lưu: Ke.',
        description1: 'Câu Lạc Bộ Board Game Giao Lưu: Ke. là sự kiện giao lưu mà mọi người có thể chơi bất kể tuổi tác, thế hệ hay vị trí.',
        description2: '"Luật chơi có vẻ khó..." "Liệu mình có theo kịp không?" Đừng lo lắng! Đội ngũ có kinh nghiệm sẽ hướng dẫn từ cơ bản, vì vậy ngay cả người mới bắt đầu cũng có thể tận hưởng một cách tự tin. Hoàn hảo để kết bạn mới hoặc tìm sở thích mới cho những người trên 50 tuổi! Người tham gia từ 3 đến 90 tuổi.',
        btn1: 'Tham gia sự kiện tiếp theo',
        btn2: 'Nhận thông tin mới nhất trên SNS'
      },
      sponsors: {
        cooperation: 'Hợp Tác',
        support: 'Hỗ Trợ'
      },
      gallery: {
        title: 'Hình Ảnh Sự Kiện'
      },
      backToTop: 'Về Đầu Trang'
    }
  };

  // 現在の言語のテキストを取得
  const t = translations[currentLanguage];

  // 言語切り替え関数
  const changeLanguage = (lang) => {
    setCurrentLanguage(lang);
  };

  // ギャラリー用の画像データ
  const galleryImages = [
    {
      src: '/images/ke_gallery/image1.png',
      alt: '６０代のテーブルゲーム初心者たちが遊ぶ風景',
      caption: 'お子様からご高齢者様まで、年齢関係なく楽しめます！'
    },
    {
      src: '/images/ke_gallery/image2.png', 
      alt: 'ふれあーるAKITA(あきた文化交流発信センター)でのイベント風景',
      caption: 'YOLUBEの活動は「け」以外のイベントにもご招待いただいております。'
    },
    {
      src: '/images/ke_gallery/image3.png',
      alt: 'ボートピア河辺で定期開催しているイベント「わとわいち」でのイベント風景',
      caption: 'YOLUBEの活動は「け」以外のイベントにもご招待いただいております。'
    },
    {
      src: '/images/ke_gallery/image4.png',
      alt: '名作「ticket to the ride」',
      caption: '名作「ticket to the ride」'
    },
    {
      src: '/images/ke_gallery/image5.png',
      alt: 'レーダー作戦ゲーム',
      caption: '1960年代に日本へ上陸した「レーダー作戦ゲーム」も遊べます'
    },
    {
      src: '/images/ke_gallery/image6.png',
      alt: '遊び方は無限大！',
      caption: 'ゲームによっては自分なりにアレンジして楽しめる。これもテーブルゲームの魅力。'
    }
  ];

  // スクロール位置を監視
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowBackToTop(scrollTop > 300); // 300px以上スクロールしたら表示
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

  // スライダーナビゲーション関数
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      // フォームデータを準備
      const formData = new FormData(form.current);
      
      // Web3Formsのアクセスキーを追加
      const accessKey = process.env.REACT_APP_WEB3FORMS_ACCESS_KEY || "YOUR_WEB3FORMS_ACCESS_KEY";
      
      // アクセスキーが設定されていない場合のチェック
      if (accessKey === "YOUR_WEB3FORMS_ACCESS_KEY") {
        console.error('Web3Forms アクセスキーが設定されていません');
        setMessage('フォームの設定に問題があります。管理者にお問い合わせください。');
        return;
      }
      
      formData.append("access_key", accessKey);
      
      // 追加設定（Ke.ページ用）
      formData.append("subject", "【YOLUBE】テーブルゲーム交流会：Ke. お問い合わせ");
      formData.append("from_name", "テーブルゲーム交流会：Ke. お問い合わせフォーム");
      formData.append("replyto", formData.get('user_email'));

      // Web3Forms APIに送信
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const result = await response.json();
      
      if (result.success) {
        console.log('✅ Ke.ページ メール送信成功:', result);
        setMessage('お問い合わせを送信いたしました。ありがとうございます！');
        form.current.reset();
      } else {
        console.error('❌ Web3Forms エラー:', result);
        setMessage('送信中にエラーが発生しました。もう一度お試しください。');
      }
    } catch (error) {
      console.error('❌ 送信エラー:', error);
      setMessage('送信中にエラーが発生しました。もう一度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ke-lp">
      {/* Header */}
      <header className="ke-header">
        <div className="ke-header-container">
          <div className="ke-logo">
            <a href="https://yolube.jp" target="_blank" rel="noopener noreferrer">
              <img src="/images/YOLUBE_logo.png" alt="YOLUBE" />
            </a>
          </div>
          <nav className={`ke-nav ${isMobileMenuOpen ? 'ke-nav-open' : ''}`}>
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.about}</a>
            <a href="#schedule" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.schedule}</a>
            <a href="#access" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.access}</a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.contact}</a>
          </nav>
          
          {/* Language Switcher */}
          <div className="ke-language-switcher">
            <button 
              className={`ke-lang-btn ${currentLanguage === 'ja' ? 'active' : ''}`}
              onClick={() => changeLanguage('ja')}
            >
              日本語
            </button>
            <button 
              className={`ke-lang-btn ${currentLanguage === 'en' ? 'active' : ''}`}
              onClick={() => changeLanguage('en')}
            >
              English
            </button>
            <button 
              className={`ke-lang-btn ${currentLanguage === 'vi' ? 'active' : ''}`}
              onClick={() => changeLanguage('vi')}
            >
              Tiếng Việt
            </button>
          </div>
          <button 
            className="ke-mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
          </button>
        </div>
      </header>

      {/* Top Logo Section */}
      <section className="ke-top-logo">
        <div className="ke-container">
          <div className="ke-logo-container">
            <img src="/images/ke_mainImage.svg" alt="Ke. ロゴ" className="ke-main-logo" />
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="ke-sponsors">
        <div className="ke-container">
          <div className="ke-sponsors-content">
            <div className="ke-sponsor-group">
              <h3 className="ke-sponsor-title">{t.sponsors.cooperation}</h3>
              <div className="ke-sponsor-list">
                <a href="https://all-akita-furusato.jp/" target="_blank" rel="noopener noreferrer">
                  <span>みんなの実家 門脇家</span>
                </a>
                <a href="https://rise.webu.jp/" target="_blank" rel="noopener noreferrer">
                  <span>立志塾RISE</span>
                </a>
                <a href="http://baypara.jp/" target="_blank" rel="noopener noreferrer">
                  <span>秋田ベイパラダイス</span>
                </a>
              </div>
            </div>
            <div className="ke-sponsor-group">
              <h3 className="ke-sponsor-title">{t.sponsors.support}</h3>
              <div className="ke-sponsor-list">
                <a href="https://www.pref.akita.lg.jp/" target="_blank" rel="noopener noreferrer">
                  <span>秋田県</span>
                </a>
                <a href="https://www.pref.akita.lg.jp/pages/education" target="_blank" rel="noopener noreferrer">
                  <span>秋田県教育委員会</span>
                </a>
                <a href="https://www.city.akita.lg.jp/" target="_blank" rel="noopener noreferrer">
                  <span>秋田市</span>
                </a>
                <a href="https://youthpal-akita.com/" target="_blank" rel="noopener noreferrer">
                  <span>一般財団法人秋田県青年会館</span>
                </a>
                <a href="https://www.akita-abs.co.jp/" target="_blank" rel="noopener noreferrer">
                  <span>ABS秋田放送</span>
                </a>
                <a href="https://www.cna.ne.jp/" target="_blank" rel="noopener noreferrer">
                  <span>CNA秋田ケーブルテレビ</span>
                </a>
                <a href="https://www.sakigake.jp/" target="_blank" rel="noopener noreferrer">
                  <span>秋田魁新報社</span>
                </a>
                <a href="https://mutsumi-l.co.jp/" target="_blank" rel="noopener noreferrer">
                  <span>むつみ造園土木株式会社</span>
                </a>
                <a href="https://kitaho.or.jp/yg88/news/4885.html" target="_blank" rel="noopener noreferrer">
                  <span>株式会社EGEN</span>
                </a>
                <a href="https://x.com/icepick_yokote" target="_blank" rel="noopener noreferrer">
                  <span>一般社団法人ICEPICK</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="ke-hero">
        <div className="ke-hero-bg">
          <div className="ke-hero-content">
            <div className="ke-hero-text">
              <h1 className="ke-title">
                <span className="ke-title-main">{t.hero.title1}</span>
                <span className="ke-title-sub">{t.hero.title2}</span>
              </h1>
              <div className="ke-hero-badges">
                <div className="ke-badge">
                  <span>{t.hero.badge1}</span>
                </div>
                <div className="ke-badge">
                  <span>{t.hero.badge2}</span>
                </div>
                <div className="ke-badge">
                  <span>{t.hero.badge3}</span>
                </div>
              </div>
              <div className="ke-hero-stats">
                <div id="about" className="ke-anchor-point"></div>
                <div className="ke-description-text">
                  <p>{t.hero.aboutTitle}</p>
                  <p>{t.hero.description1}</p>
                  <p>{t.hero.description2}</p>
                  <p>スマホから離れて顔を合わせ、みんなでワイワイ盛り上がってみませんか？普段出会えない世代の方との交流も、ゲームを通して自然と生まれます。頭を使う戦略ゲームから、みんなで笑えるパーティーゲームまで、様々な種類をご用意しています。</p>
                  <p>まずは見学からでもOK！秋田の新しいコミュニティスペースで、心温まる交流のひとときを一緒に過ごしませんか？</p>
                </div>
              </div>
              <div className="ke-hero-buttons">
                <a href="#contact" className="ke-btn ke-btn-primary">
                  <FontAwesomeIcon icon={faGamepad} />
                  {t.hero.btn1}
                </a>
                <a href="#sns" className="ke-btn ke-btn-outline">
                  {t.hero.btn2}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="ke-problem">
        <div className="ke-container">
          <h2 className="ke-section-title">こんなお悩みありませんか？</h2>
          <div className="ke-problem-grid">
            <div className="ke-problem-item">
              <div className="ke-problem-icon">
                <FontAwesomeIcon icon={faUsers} />
              </div>
              <h3>新しい友達が欲しい</h3>
              <p>秋田で新しい友達を作りたいけど、なかなか出会いの場がない...</p>
            </div>
            <div className="ke-problem-item">
              <div className="ke-problem-icon">
                <FontAwesomeIcon icon={faGamepad} />
              </div>
              <h3>テーブルゲームに興味がある</h3>
              <p>テーブルゲームをやってみたいけど、ルールがわからない、一緒にやる人がいない...</p>
            </div>
            <div className="ke-problem-item">
              <div className="ke-problem-icon">
                <FontAwesomeIcon icon={faClock} />
              </div>
              <h3>週末の過ごし方がマンネリ</h3>
              <p>いつも同じことの繰り返しで、新しい趣味や楽しみを見つけたい...</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="ke-solution">
        <div className="ke-container">
          <h2 className="ke-section-title">そんなあなた、<br />「け」に来てみませんか？</h2>
          <div className="ke-solution-content">
            <div className="ke-solution-text">
              <p className="ke-solution-lead">
                テーブルゲームはコミュニケーションを楽しむゲーム。<strong>画面越しではなく「リアルな人とのつながり」</strong>を楽しめます。<br />
                相手の表情や声のトーン、その場の空気感や予想外の出来事など、様々な人の意外な一面をうかがえる場です。<br />
                赤の他人同士が数分後には打ち解けていたりする、不思議な魅力をもつ遊び。それがテーブルゲームです。
              </p>
              <div className="ke-features">
                <div className="ke-feature">
                  <div className="ke-feature-icon">
                    <FontAwesomeIcon icon={faUsers} />
                  </div>
                  <div className="ke-feature-content">
                    <h3>五感を使った豊かな体験</h3>
                    <p>駒を手で動かす触感、みんなの笑い声、普段は考えもしない行動の連続。その場の雰囲気を全身で楽しめます。</p>
                  </div>
                </div>
                <div className="ke-feature">
                  <div className="ke-feature-icon">
                    <FontAwesomeIcon icon={faHeart} />
                  </div>
                  <div className="ke-feature-content">
                    <h3>自然な出会いと友達作り</h3>
                    <p>ゲームを通じて自然に会話が生まれ、世代や職業を超えた新しい交流が生れます。日常の喧騒から離れ、自然体で遊んでみましょう。</p>
                  </div>
                </div>
                <div className="ke-feature">
                  <div className="ke-feature-icon">
                    <FontAwesomeIcon icon={faGamepad} />
                  </div>
                  <div className="ke-feature-content">
                    <h3>初心者も安心サポート</h3>
                    <p>ゲーム選びは非常に重要！スタッフが参加者の経験や好みからベストなゲームをご提案します。初参加・未経験者が６割以上のイベントです！</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="ke-benefits">
        <div className="ke-container">
          <h2 className="ke-section-title">テーブルゲーム交流会で得られる3つの魅力</h2>
          <div className="ke-benefits-grid">
            <div className="ke-benefit-item">
              <div className="ke-benefit-number">01</div>
              <div className="ke-benefit-content">
                <h4>五感を使った豊かな体験</h4>
                <p>駒を手で動かす触感、みんなの笑い声、普段は考えもしない行動の連続。その場の雰囲気を全身で楽しめます。</p>
              </div>
            </div>
            <div className="ke-benefit-item">
              <div className="ke-benefit-number">02</div>
              <div className="ke-benefit-content">
                <h4>自然な出会いと友達作り</h4>
                <p>ゲームを通じて自然に会話が生まれ、世代や職業を超えた新しい交流が生れます。日常の喧騒から離れ、自然体で遊んでみましょう。</p>
              </div>
            </div>
            <div className="ke-benefit-item">
              <div className="ke-benefit-number">03</div>
              <div className="ke-benefit-content">
                <h4>初心者も安心サポート</h4>
                <p>ゲーム選びは非常に重要！スタッフが参加者の経験や好みからベストなゲームをご提案します。初参加・未経験者が６割以上のイベントです！</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Flow Section */}
      <section className="ke-flow">
        <div className="ke-container">
          <h2 className="ke-section-title">当日の流れ</h2>
          <div className="ke-flow-steps">
            <div className="ke-flow-step">
              <div className="ke-flow-number">STEP 1</div>
              <div className="ke-flow-content">
                <h3>受付・会場到着</h3>
                <p>まずは受付にて参加登録！その後、ゲーム中で呼び合うための「ニックネームを書いた名札」を作成！</p>
              </div>
              <div className="ke-flow-icon">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
              </div>
            </div>
            <div className="ke-flow-step">
              <div className="ke-flow-number">STEP 2</div>
              <div className="ke-flow-content">
                <h3>ゲーム選定</h3>
                <p>150種類以上のゲーム＋参加者の持ち込みゲームがいっぱい！初めてのお方はスタッフにお声かけください！年齢やご経験をもとにお勧めのゲームを提案いたします！また、ゲームを遊ぶ上での人数調整もサポート致します！</p>
              </div>
              <div className="ke-flow-icon">
                <FontAwesomeIcon icon={faUsers} />
              </div>
            </div>
            <div className="ke-flow-step">
              <div className="ke-flow-number">STEP 3</div>
              <div className="ke-flow-content">
                <h3>ルール学習＆ゲームプレイ</h3>
                <p>説明書を読むか、外箱の右下にあるQRからルール説明動画を視聴してルールを学習！もしも不安であればスタッフへお声かけください！初心者にはスタッフがルール説明致します。あとはどんどん遊んでみましょう！気付けば数時間経っていることも・・ 笑</p>
              </div>
              <div className="ke-flow-icon">
                <FontAwesomeIcon icon={faGamepad} />
              </div>
            </div>
            <div className="ke-flow-step">
              <div className="ke-flow-number">STEP 4</div>
              <div className="ke-flow-content">
                <h3>片づけ＆退出</h3>
                <p>遊び終わったゲームは片づけましょう！もしも片づけ方が分からない場合はお近くのスタッフにお声かけください！（たくさんの参加者に遊んでいただくためにも、ゲームは１作品ずつ遊ぶようご協力願います！）</p>
                <p>入退出は自由です。お帰りの際は名札を受付にお返しください。</p>

              </div>
              <div className="ke-flow-icon">
                <FontAwesomeIcon icon={faHeart} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="ke-schedule">
        <div className="ke-container">
          <h2 className="ke-section-title">開催スケジュール</h2>
          <div className="ke-schedule-content">
            <div className="ke-schedule-info">
              <div className="ke-schedule-item">
                <FontAwesomeIcon icon={faCalendarAlt} />
                <div>
                  <h3>開催頻度</h3>
                  <p>月２回</p>
                </div>
              </div>
              <div className="ke-schedule-item">
                <FontAwesomeIcon icon={faClock} />
                <div>
                  <h3>開催時間</h3>
                  <p>10:00 - 20:00（10時間）</p>
                </div>
              </div>
              <div className="ke-schedule-item">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <div>
                  <h3>会場</h3>
                  <p>秋田ベイパラダイス</p>
                </div>
              </div>
            </div>
            <div className="ke-next-event">
              <h3>次回開催予定</h3>
              <div className="ke-event-card">
                <div className="ke-event-date">
                  <span className="ke-month">7月</span>
                  <span className="ke-day">26日</span>
                  <span className="ke-weekday">土</span>
                </div>
                <div className="ke-event-details">
                  <h4>第57回 テーブルゲーム交流会：Ke.</h4>
                  <p><FontAwesomeIcon icon={faClock} /> 10:00 - 20:00</p>
                  <p><FontAwesomeIcon icon={faMapMarkerAlt} /> 秋田ベイパラダイス</p>
                  <p><FontAwesomeIcon icon={faUsers} /> 参加費：無料</p>
                </div>
                <div className="ke-event-status">
                  <span className="ke-status-badge">募集中</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="ke-testimonials">
        <div className="ke-container">
          <h2 className="ke-section-title">参加者の声</h2>
          <div className="ke-testimonials-grid">
            <div className="ke-testimonial">
              <div className="ke-testimonial-content">
                <div className="ke-testimonial-avatar">
                  <img src="/images/60old_man.png" alt="60代男性" />
                  <div className="ke-testimonial-avatar-badge">60代男性</div>
                </div>
                <div className="ke-testimonial-text">
                  <p>秋田にこんなイベントがあるなんて知らなかった！囲碁や将棋だけかと思っていましたが沢山のゲームに驚きました。</p>
                </div>
              </div>
            </div>
            <div className="ke-testimonial ke-testimonial-medium">
              <div className="ke-testimonial-content">
                <div className="ke-testimonial-avatar">
                  <img src="/images/40old_man.png" alt="40代男性" />
                  <div className="ke-testimonial-avatar-badge">40代男性</div>
                </div>
                <div className="ke-testimonial-text">
                  <p>転勤族ですが、ここで友だちができました。また遊びに来ます！</p>
                </div>
              </div>
            </div>
            <div className="ke-testimonial ke-testimonial-medium">
              <div className="ke-testimonial-content">
                <div className="ke-testimonial-avatar">
                  <img src="/images/30oldwoman.png" alt="30代女性" />
                  <div className="ke-testimonial-avatar-badge">30代女性</div>
                </div>
                <div className="ke-testimonial-text">
                  <p>ゲーム初心者の親子でも楽しめました！</p>
                </div>
              </div>
            </div>
            <div className="ke-testimonial ke-testimonial-short">
              <div className="ke-testimonial-content">
                <div className="ke-testimonial-avatar">
                  <img src="/images/10oldboy.png" alt="10代男性" />
                  <div className="ke-testimonial-avatar-badge">10代男性</div>
                </div>
                <div className="ke-testimonial-text">
                  <p>ぜんぶ楽しかった！</p>
                </div>
              </div>
            </div>
            <div className="ke-testimonial">
              <div className="ke-testimonial-content">
                <div className="ke-testimonial-avatar">
                  <img src="/images/40oldwoman.png" alt="40代女性" />
                  <div className="ke-testimonial-avatar-badge">40代女性</div>
                </div>
                <div className="ke-testimonial-text">
                  <p>子どもがボードゲームをつかって遊ぶ場があるといいなぁと思っていたので、すごく楽しかったです。</p>
                </div>
              </div>
            </div>
            <div className="ke-testimonial">
              <div className="ke-testimonial-content">
                <div className="ke-testimonial-avatar">
                  <img src="/images/20oldwoman.png" alt="20代女性" />
                  <div className="ke-testimonial-avatar-badge">20代女性</div>
                </div>
                <div className="ke-testimonial-text">
                  <p>程よく難しく、シンプルに遊べるのがよかった。人と楽しくコミュニケーションとれる感じがよかった。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="ke-gallery">
        <div className="ke-container">
          <h2 className="ke-section-title">{t.gallery.title}</h2>
          <div className="ke-gallery-slider">
            <div className="ke-slider-container">
              <div 
                className="ke-slider-wrapper" 
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {galleryImages.map((image, index) => (
                  <div key={index} className="ke-slide">
                    <img 
                      src={image.src} 
                      alt={image.alt}
                      onError={(e) => {
                        // 画像がない場合のプレースホルダー表示
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                    <div className="ke-slide-placeholder" style={{ display: 'none' }}>
                      <FontAwesomeIcon icon={faHeart} />
                      <span>{image.caption}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Navigation Buttons */}
              <button className="ke-slider-btn ke-slider-prev" onClick={prevSlide}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button className="ke-slider-btn ke-slider-next" onClick={nextSlide}>
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
            
            {/* Indicators */}
            <div className="ke-slider-indicators">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  className={`ke-indicator ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
            
            {/* Caption */}
            <div className="ke-slider-caption">
              <p>{galleryImages[currentSlide]?.caption}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Access Section */}
      <section id="access" className="ke-access">
        <div className="ke-container">
          <h2 className="ke-section-title">アクセス</h2>
          <div className="ke-access-content">
            <div className="ke-access-info">
              <h3>秋田ベイパラダイス</h3>
              <div className="ke-access-item">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <div>
                  <h4>住所</h4>
                  <p>〒011-0945 秋田県秋田市土崎港西1-10-45</p>
                </div>
              </div>
              <div className="ke-access-item">
                <FontAwesomeIcon icon={faCalendarAlt} />
                <div>
                  <h4>アクセス</h4>
                  <p>JR土崎駅より徒歩約10分</p>
                  <p>駐車場：無料駐車場あり</p>
                </div>
              </div>
            </div>
            <div className="ke-map-container">
              <iframe
                src="https://maps.google.com/maps?q=秋田県秋田市土崎港西1-10-45&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="300"
                style={{border: 0}}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="秋田ベイパラダイスの地図"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="ke-faq">
        <div className="ke-container">
          <h2 className="ke-section-title">よくある質問</h2>
          <div className="ke-faq-list">
            <div className="ke-faq-item">
              <div className="ke-faq-question">
                <h3>本当に参加費は無料ですか？</h3>
                <span className="ke-faq-toggle">+</span>
              </div>
              <div className="ke-faq-answer">
                <p>はい、完全に無料です。手ぶらでお越しいただけます。未経験者にテーブルゲームの魅力を伝えたいという目的の元、会場設営費用等はすべて主催者側で負担しています。募金・協賛等は大歓迎です！笑</p>
              </div>
            </div>
            <div className="ke-faq-item">
              <div className="ke-faq-question">
                <h3>そもそもゲーム自体が未経験者です。それでも参加できますか？</h3>
                <span className="ke-faq-toggle">+</span>
              </div>
              <div className="ke-faq-answer">
                <p>もちろんです！初心者・未経験者大歓迎です。スタッフが丁寧にルールを説明しますので、安心してご参加ください。</p>
              </div>
            </div>
            <div className="ke-faq-item">
              <div className="ke-faq-question">
                <h3>事前申し込みは必要ですか？</h3>
                <span className="ke-faq-toggle">+</span>
              </div>
              <div className="ke-faq-answer">
                <p>事前申し込みは不要です。当日会場に直接お越しいただければ参加できます。
                ただし、混雑状況によりお待ちいただく場合があります。
                予め遊びたいゲームが決まっている場合は申し込みフォームから申請してください。</p>
              </div>
            </div>
            <div className="ke-faq-item">
              <div className="ke-faq-question">
                <h3>年齢制限はありますか？</h3>
                <span className="ke-faq-toggle">+</span>
              </div>
              <div className="ke-faq-answer">
                <p>年齢制限はありません。3歳から90歳代まで幅広い年代の方が参加されています。どなたでも歓迎いたします。
                ただし小学生２年生以下のお子様とご参加の場合は必ず保護者と一緒に参加願います。お子様はご両親と一緒に遊びたいはずです。スタッフに育児を丸投げするような行為は固くお断りしております。</p>
              </div>
            </div>
            <div className="ke-faq-item">
              <div className="ke-faq-question">
                <h3>途中参加・途中退場は可能ですか？</h3>
                <span className="ke-faq-toggle">+</span>
              </div>
              <div className="ke-faq-answer">
                <p>はい、可能です。10:00-20:00の開催時間内であれば、いつでも参加・退場いただけます。お気軽にお越しください。</p>
              </div>
            </div>
            <div className="ke-faq-item">
              <div className="ke-faq-question">
                <h3>駐車場はありますか？</h3>
                <span className="ke-faq-toggle">+</span>
              </div>
              <div className="ke-faq-answer">
                <p>みんなの実家 門脇家、秋田ベイパラダイスのどちらにも無料駐車場がございます。お車でのご来場も安心です。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="ke-contact">
        <div className="ke-container">
          <h2 className="ke-section-title">お申し込み・お問い合わせ</h2>
          <div className="ke-contact-content">
            <div className="ke-contact-form">
              <form ref={form} onSubmit={handleSubmit} className="ke-form">
                {/* ハニーポット（スパム対策） */}
                <input type="checkbox" name="botcheck" className="hidden" style={{display: 'none'}} />
                
                <div className="ke-form-group">
                  <label>お名前</label>
                  <input 
                    type="text" 
                    name="user_name" 
                    placeholder="寄辺 寄蔵" 
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="ke-form-group">
                  <label>メールアドレス</label>
                  <input 
                    type="email" 
                    name="user_email" 
                    placeholder="example@email.com" 
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="ke-form-group">
                  <label>お問い合わせ内容</label>
                  <textarea 
                    rows="4" 
                    name="message" 
                    placeholder="ご質問やご相談をお気軽にお聞かせください"
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

      {/* SNS Links Section */}
      <section id="sns" className="ke-sns">
        <div className="ke-container">
          <div className="ke-sns-content">
            <h2 className="ke-sns-title">最新情報をSNSでチェック！</h2>
            <p className="ke-sns-subtitle">
              イベントの最新情報や参加者の様子をお届けしています
            </p>
            <div className="ke-sns-links">
              <a 
                href="https://x.com/_YOLUBE_" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="ke-sns-link ke-sns-x"
              >
                <div className="ke-sns-icon">
                  <img src="/images/SVG/sns_x.svg" alt="X (Twitter)" />
                </div>
                <div className="ke-sns-text">
                  <h3>X (Twitter)</h3>
                </div>
              </a>
              <a 
                href="https://www.facebook.com/YOLUBE.AKITA" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="ke-sns-link ke-sns-facebook"
              >
                <div className="ke-sns-icon">
                  <img src="/images/SVG/sns_fb.svg" alt="Facebook" />
                </div>
                <div className="ke-sns-text">
                  <h3>Facebook</h3>
                </div>
              </a>
              <a 
                href="https://www.instagram.com/_yolube_/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="ke-sns-link ke-sns-instagram"
              >
                <div className="ke-sns-icon">
                  <img src="/images/SVG/sns_insta.svg" alt="Instagram" />
                </div>
                <div className="ke-sns-text">
                  <h3>Instagram</h3>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button 
          className="ke-back-to-top" 
          onClick={scrollToTop}
          aria-label="トップへ戻る"
        >
          <FontAwesomeIcon icon={faChevronUp} />
        </button>
      )}

      {/* Footer */}
      <footer className="ke-footer">
        <div className="ke-container">
          <div className="ke-footer-content">
            <div className="ke-footer-logo">
              <a href="https://yolube.jp" target="_blank" rel="noopener noreferrer">
                <img src="/images/YOLUBE_logo.png" alt="YOLUBE" />
              </a>
            </div>
            <div className="ke-footer-text">
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

export default KeLPWeb3; 