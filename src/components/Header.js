import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
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

  const handlePageChange = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isHomePage = location.pathname === '/';
  const isKePage = location.pathname === '/ke';

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <div className="logo clickable" onClick={() => handlePageChange('/')}>
            <img src="/images/YOLUBE_logo.png" alt="YOLUBE" className="logo-img" />
          </div>
          
          <nav className={`nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              <li>
                <a 
                  href="#home" 
                  onClick={(e) => {
                    e.preventDefault();
                    if (isHomePage) {
                      scrollToSection('home');
                    } else {
                      handlePageChange('/');
                    }
                  }}
                  className={isHomePage ? 'active' : ''}
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
                >
                  お問い合わせ
                </a>
              </li>
              <li>
                <a 
                  href="/ke" 
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange('/ke');
                  }}
                  className={isKePage ? 'active' : ''}
                >
                  『け』
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