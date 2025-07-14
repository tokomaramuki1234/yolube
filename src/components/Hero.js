import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './Hero.css';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const slides = [
    {
      id: 1,
      image: 'https://picsum.photos/1920/1080?random=1',
      alt: '木村允代表が2024年春の秋田市文化創造館で参加者30名とテーブルゲーム交流会を開催している様子',
      title: '遊び心で社会を変える',
      subtitle: 'テーブルゲームの力で地域社会の課題解決に取り組みます',
      cta: '事業について',
      label: '文化醸成'
    },
    {
      id: 2,
      image: 'https://picsum.photos/1920/1080?random=2',
      alt: '2024年夏にみんなの実家門脇家で地域住民と子どもたちが一緒にカードゲームを楽しんでいる風景',
      title: 'すべてを乗り越える交流文化',
      subtitle: '世代・性別・国籍を超えた地域交流文化を創造します',
      cta: '実績を見る',
      label: '地域活性化'
    },
    {
      id: 3,
      image: 'https://picsum.photos/1920/1080?random=3',
      alt: '2024年秋田県観光PR用テーブルゲーム「Hometown Traveler」のプロトタイプを制作中の木村代表の作業風景',
      title: '体験交流型観光資源',
      subtitle: 'テーブルゲームを通じた新しい観光体験を提供します',
      cta: 'ゲームを見る',
      label: 'ゲーム開発'
    },
    {
      id: 4,
      image: 'https://picsum.photos/1920/1080?random=4',
      alt: '2024年冬に秋田ベイパラダイスで企業研修として実施されたテーブルゲームセッションの様子',
      title: 'エンゲージメント向上',
      subtitle: 'テーブルゲームを活用した革新的な企業研修を提供します',
      cta: '研修について',
      label: '企業研修'
    }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    setCurrentSlide(prev => (prev + 1) % slides.length);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000); // フェード用に1秒に調整
  }, [isTransitioning, slides.length]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000); // フェード用に1秒に調整
  }, [isTransitioning, slides.length]);

  const goToSlide = (index) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    
    setCurrentSlide(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  };

  // タッチ/スワイプ操作
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  // マウスホバーで自動再生停止
  const handleMouseEnter = () => {
    setIsAutoPlay(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlay(true);
  };

  // 自動再生
  useEffect(() => {
    if (!isTransitioning && isAutoPlay) {
      const interval = setInterval(() => {
        nextSlide();
      }, 6000); // フェード時間を考慮して6秒に延長

      return () => clearInterval(interval);
    }
  }, [currentSlide, isTransitioning, isAutoPlay, nextSlide]);

  return (
    <section 
      id="home" 
      className="hero"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="hero-slider">
        <div className="slides-container">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`slide ${index === currentSlide ? 'active' : ''} ${isTransitioning ? 'transitioning' : ''}`}
            >
              <div className="slide-overlay"></div>
              <div className="slide-content">
                <div className="container">
                  <div className="slide-text">
                    <h1 className="slide-title">
                      {slide.title}
                    </h1>
                    <p className="slide-subtitle">
                      {slide.subtitle}
                    </p>
                    <div className="slide-buttons">
                      <button 
                        className="btn btn-primary"
                        onClick={() => scrollToSection(slide.id === 1 ? 'about' : slide.id === 2 ? 'achievements' : slide.id === 3 ? 'achievements' : 'services')}
                      >
                        {slide.cta}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <img src={slide.image} alt={slide.alt} className="slide-bg-image" />
            </div>
          ))}
        </div>

        <div className="slider-controls">
          <button className="slider-btn prev" onClick={prevSlide}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button className="slider-btn next" onClick={nextSlide}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>

        <div className="slider-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero; 