import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = ({ currentPage, setCurrentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <img src="/images/YOLUBE_logo.png" alt="YOLUBE" className="logo-img" />
          </div>
          
          <nav className={`nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              <li>
                <a 
                  href="#home" 
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage === 'home') {
                      scrollToSection('home');
                    } else {
                      handlePageChange('home');
                    }
                  }}
                  className={currentPage === 'home' ? 'active' : ''}
                >
                  ホーム
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('about');
                  }}
                  className={currentPage === 'home' ? '' : 'disabled'}
                >
                  ABOUT
                </a>
              </li>
              <li>
                <a 
                  href="#services" 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('services');
                  }}
                  className={currentPage === 'home' ? '' : 'disabled'}
                >
                  サービス
                </a>
              </li>
              <li>
                <a 
                  href="#achievements" 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('achievements');
                  }}
                  className={currentPage === 'home' ? '' : 'disabled'}
                >
                  実績
                </a>
              </li>
              <li>
                <a 
                  href="#profile" 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('profile');
                  }}
                  className={currentPage === 'home' ? '' : 'disabled'}
                >
                  プロフィール
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('contact');
                  }}
                  className={currentPage === 'home' ? '' : 'disabled'}
                >
                  お問い合わせ
                </a>
              </li>
              <li>
                <a 
                  href="#styleguide" 
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange('styleguide');
                  }}
                  className={currentPage === 'styleguide' ? 'active' : ''}
                >
                  スタイルガイド
                </a>
              </li>
            </ul>
          </nav>

          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 