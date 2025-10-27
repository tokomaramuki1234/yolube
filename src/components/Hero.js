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
      image: '/images/slider1/image1.png',
      alt: '秋田県とYOMOPULU',
      title: '遊び心で社会を変える',
      subtitle: 'テーブルゲームの力で地域社会の課題解決に取り組みます',
      cta: 'YOLUBEについて',
      label: 'About YOLUBE'
    },
    {
      id: 2,
      image: '/images/slider2/image1.png',
      alt: 'テーブルゲーム交流会：Ke.のシンボル',
      title: 'ノーボーダーな\nテーブルゲーム交流会',
      subtitle: '世代・性別・国籍を超えた交流文化を秋田に築きます',
      cta: '『け』について',
      label: 'テーブルゲーム文化醸成事業'
    },
    {
      id: 3,
      image: '/images/slider3/image1.png',
      alt: 'YOLUBEが自主制作しているテーブルゲームのサンプル画像',
      title: '「秋田」で遊びを創り出す',
      subtitle: '地元の魅力を伝えるテーブルゲームを開発します',
      cta: 'ゲームについて',
      label: 'ゲーム開発事業'
    },
    {
      id: 4,
      image: '/images/slider4/training_new.jpg',
      alt: 'テーブルゲームを活用した企業研修の様子',
      title: '遊び心いっぱいの研修、\n試してみませんか？',
      subtitle: '主体的に学び、多角的に考える研修を目指します',
      cta: '企業研修について',
      label: '企業研修事業'
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
                      {slide.title.split('\n').map((line, index) => (
                        <span key={index}>
                          {line}
                          {index < slide.title.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </h1>
                    <p className="slide-subtitle">
                      {slide.subtitle}
                    </p>
                    <div className="slide-buttons">
                      <button 
                        className="btn btn-primary"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          
                          // 条件分岐
                          if (slide.cta === 'YOLUBEについて') {
                            scrollToSection('about');
                          } else if (slide.cta === '『け』について') {
                            window.location.href = 'https://yolube.jp/ke';
                          } else if (slide.cta === 'ゲームについて') {
                            scrollToSection('achievements');
                          } else if (slide.cta === '企業研修について') {
                            window.location.href = '/training';
                          }
                        }}
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