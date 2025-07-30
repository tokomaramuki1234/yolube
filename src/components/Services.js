import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDice, faStore, faBullseye, faHandshake, faGlobe, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './Services.css';

const Services = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState('');
  


  const services = [
    {
      id: 1,
      title: 'テーブルゲーム文化醸成事業',
      description: 'テーブルゲームの認知度向上及び文化醸成を目的とした定期的な交流会「Ke.」を開催',
      image: 'https://picsum.photos/600/400?random=15',
      icon: faDice,
      features: [
        '誰でも無料・予約なしで参加可能',
        '未経験者～中級者をターゲット',
        '定期開催によるコミュニティ形成'
      ]
    },
    {
      id: 2,
      title: '地域活性化事業',
      description: 'テーブルゲームによる集客及び顧客満足度向上の機会を提供',
      image: 'https://picsum.photos/600/400?random=16',
      icon: faStore,
      features: [
        '地元企業とのコラボ企画',
        '主に飲食店・保育園・介護施設での活動',
        '課題に応じたカスタマイズの提案'
      ]
    },
    {
      id: 3,
      title: 'テーブルゲーム開発事業',
      description: '秋田県の観光資源、文化等の認知度向上及びインバウンド機会創出',
      image: 'https://picsum.photos/600/400?random=17',
      icon: faBullseye,
      features: [
        '秋田をテーマにしたオリジナルゲームの制作',
        'ただの教材ではなく、面白いゲーム作りにこだわる',
        '「秋田には何もない」という固定観念を打ち破る'
      ]
    },
    {
      id: 4,
      title: 'ゲーム研修事業',
      description: '社内コミュニケーション機会創出によるエンゲージメント向上',
      image: 'https://picsum.photos/600/400?random=18',
      icon: faHandshake,
      features: [
        '職場では得難いコミュニケーション機会を提供',
        '様々な視座や気付きを得るための支援をゲームで実施',
        '血の通った社内交流の構築を目指す'
      ]
    },
    {
      id: 5,
      title: 'インバウンド事業',
      description: 'テーブルゲームを通じた国際交流促進と文化発信',
      image: 'https://picsum.photos/600/400?random=19',
      icon: faGlobe,
      features: [
        '秋田をテーマに、多言語対応のゲームを開発',
        '県内の観光団体に対し、ゲームとITでインバウンド対策を支援',
        '地元民の想いを正しく伝えることを第一義とする'
      ]
    }
  ];

  // カルーセル機能
  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setAnimationDirection('next');
    
    // カード移動のアニメーション中はインデックスを即座に変更
    setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
    
    setTimeout(() => {
      setIsAnimating(false);
      setAnimationDirection('');
    }, 500);
  }, [services.length, isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setAnimationDirection('prev');
    
    // カード移動のアニメーション中はインデックスを即座に変更
    setCurrentIndex((prevIndex) => (prevIndex - 1 + services.length) % services.length);
    
    setTimeout(() => {
      setIsAnimating(false);
      setAnimationDirection('');
    }, 500);
  }, [services.length, isAnimating]);

    // 3秒ごとの自動スライド
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(nextSlide, 3000);
      return () => clearInterval(interval);
    }
  }, [isHovered, nextSlide]);

  // キーボードナビゲーション
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        prevSlide();
      } else if (event.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // 現在のカードを取得
  const getCurrentCard = () => {
    return services[currentIndex];
  };

  return (
    <section id="services" className="services section">
      <div className="section-container">
        <h2 className="section-title">WORKS</h2>
        <p className="section-subtitle">
          テーブルゲームの力で地域と社会に価値を創造する5つの事業を展開しています。
        </p>



        <div 
          className="services-slideshow"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* 左の矢印 */}
          <button 
            className="slideshow-arrow slideshow-arrow-left"
            onClick={prevSlide}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            disabled={isAnimating}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          {/* スライドコンテナ */}
          <div className="slideshow-container">
            <div className={`slideshow-content ${isAnimating ? `sliding-${animationDirection}` : ''}`}>
              <div className="service-slide" data-service-id={getCurrentCard().id}>
                <div className="service-slide-content">
                  <div className="service-slide-icon">
                    <FontAwesomeIcon icon={getCurrentCard().icon} />
                  </div>
                  <div className="service-slide-text">
                    <h3 className="service-slide-title">{getCurrentCard().title}</h3>
                    <p className="service-slide-description">{getCurrentCard().description}</p>
                    <div className="service-slide-features">
                      {getCurrentCard().features.map((feature, featureIndex) => (
                        <span key={featureIndex} className="service-slide-tag">{feature}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 右の矢印 */}
          <button 
            className="slideshow-arrow slideshow-arrow-right"
            onClick={nextSlide}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            disabled={isAnimating}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>

        {/* インジケーター */}
        <div className="slideshow-indicators">
          {services.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => {
                if (!isAnimating && index !== currentIndex) {
                  setIsAnimating(true);
                  setAnimationDirection(index > currentIndex ? 'next' : 'prev');
                  setCurrentIndex(index);
                  setTimeout(() => {
                    setIsAnimating(false);
                    setAnimationDirection('');
                  }, 1000);
                }
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services; 