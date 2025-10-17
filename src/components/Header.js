import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState('ja');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isMobileLangOpen, setIsMobileLangOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const changeLanguage = (lang) => {
    setCurrentLanguage(lang);
    setIsLangMenuOpen(false);
  };

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
    setOpenDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const isHomePage = location.pathname === '/';
  const isKePage = location.pathname === '/ke';

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''} ${!isHomePage ? 'not-home' : ''}`}>
      <div className="container">
        <div className="header-content">
          <div className="logo clickable" onClick={() => handlePageChange('/')}>
            <img src="/images/YOLUBE_logo.png" alt="YOLUBE" className="logo-img" />
          </div>
          
          <nav className={`nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
            <div className="mobile-lang-switcher">
              <div className="mobile-lang-header" onClick={() => setIsMobileLangOpen(!isMobileLangOpen)}>
                <FontAwesomeIcon icon={faGlobe} />
                <span className="current-lang">
                  {currentLanguage === 'ja' && '日本語'}
                  {currentLanguage === 'en' && 'English'}
                  {currentLanguage === 'vi' && 'Tiếng Việt'}
                  {currentLanguage === 'de' && 'Deutsch'}
                  {currentLanguage === 'ko' && '한국어'}
                  {currentLanguage === 'zh' && '中文'}
                  {currentLanguage === 'fr' && 'Français'}
                </span>
                <i className={`dropdown-arrow ${isMobileLangOpen ? 'open' : ''}`}></i>
              </div>
              <div className={`mobile-lang-menu ${isMobileLangOpen ? 'open' : ''}`}>
                <button onClick={() => { changeLanguage('ja'); setIsMobileLangOpen(false); }}>日本語</button>
                <button onClick={() => { changeLanguage('en'); setIsMobileLangOpen(false); }}>English</button>
                <button onClick={() => { changeLanguage('vi'); setIsMobileLangOpen(false); }}>Tiếng Việt</button>
                <button onClick={() => { changeLanguage('de'); setIsMobileLangOpen(false); }}>Deutsch</button>
                <button onClick={() => { changeLanguage('ko'); setIsMobileLangOpen(false); }}>한국어</button>
                <button onClick={() => { changeLanguage('zh'); setIsMobileLangOpen(false); }}>中文</button>
                <button onClick={() => { changeLanguage('fr'); setIsMobileLangOpen(false); }}>Français</button>
              </div>
            </div>

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
                  href="/NEWS"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange('/NEWS');
                  }}
                >
                  新着情報
                </a>
              </li>
              <li>
                <a
                  href="/tablegame"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange('/tablegame');
                  }}
                >
                  テーブルゲームについて
                </a>
              </li>
              <li
                className="dropdown"
                onMouseEnter={() => window.innerWidth > 768 && setOpenDropdown('organization')}
                onMouseLeave={() => window.innerWidth > 768 && setOpenDropdown(null)}
              >
                <span
                  className="dropdown-toggle"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown('organization');
                  }}
                >
                  組織概要
                  <i className={`dropdown-arrow ${openDropdown === 'organization' ? 'open' : ''}`}></i>
                </span>
                <ul className={`dropdown-menu ${openDropdown === 'organization' ? 'show' : ''}`}>
                  <li><a href="/YOLUBE" onClick={(e) => { e.preventDefault(); handlePageChange('/YOLUBE'); }}>YOLUBEについて</a></li>
                  <li><a href="/ABOUT" onClick={(e) => { e.preventDefault(); handlePageChange('/ABOUT'); }}>代表プロフィール</a></li>
                  <li><a href="/ACHIEVEMENT" onClick={(e) => { e.preventDefault(); handlePageChange('/ACHIEVEMENT'); }}>活動実績</a></li>
                </ul>
              </li>
              <li
                className="dropdown"
                onMouseEnter={() => window.innerWidth > 768 && setOpenDropdown('business')}
                onMouseLeave={() => window.innerWidth > 768 && setOpenDropdown(null)}
              >
                <span
                  className="dropdown-toggle"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown('business');
                  }}
                >
                  事業案内
                  <i className={`dropdown-arrow ${openDropdown === 'business' ? 'open' : ''}`}></i>
                </span>
                <ul className={`dropdown-menu ${openDropdown === 'business' ? 'show' : ''}`}>
                  <li><a href="/FOSTER" onClick={(e) => { e.preventDefault(); handlePageChange('/FOSTER'); }}>テーブルゲーム文化醸成事業</a></li>
                  <li><a href="/RRP" onClick={(e) => { e.preventDefault(); handlePageChange('/RRP'); }}>地域活性化事業</a></li>
                  <li><a href="/DEV" onClick={(e) => { e.preventDefault(); handlePageChange('/DEV'); }}>テーブルゲーム開発事業</a></li>
                  <li><a href="/CST" onClick={(e) => { e.preventDefault(); handlePageChange('/CST'); }}>コミュニケーション研修事業</a></li>
                  <li><a href="/IID" onClick={(e) => { e.preventDefault(); handlePageChange('/IID'); }}>インバウンド基盤開発事業</a></li>
                </ul>
              </li>
              <li
                className="dropdown"
                onMouseEnter={() => window.innerWidth > 768 && setOpenDropdown('project')}
                onMouseLeave={() => window.innerWidth > 768 && setOpenDropdown(null)}
              >
                <span
                  className="dropdown-toggle"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown('project');
                  }}
                >
                  プロジェクト
                  <i className={`dropdown-arrow ${openDropdown === 'project' ? 'open' : ''}`}></i>
                </span>
                <ul className={`dropdown-menu ${openDropdown === 'project' ? 'show' : ''}`}>
                  <li><a href="/ke" onClick={(e) => { e.preventDefault(); handlePageChange('/ke'); }} className={isKePage ? 'active' : ''}>『け』</a></li>
                  <li><a href="/HT" onClick={(e) => { e.preventDefault(); handlePageChange('/HT'); }}>ホームタウントラベラー</a></li>
                  <li><a href="/NNBNB" onClick={(e) => { e.preventDefault(); handlePageChange('/NNBNB'); }}>ねねばねべ</a></li>
                  <li><a href="/KanTo" onClick={(e) => { e.preventDefault(); handlePageChange('/KanTo'); }}>KanTo</a></li>
                </ul>
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
            </ul>
          </nav>

          <div className="language-switcher">
            <button
              className="lang-globe-btn"
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              aria-label="言語を選択"
            >
              <FontAwesomeIcon icon={faGlobe} />
            </button>
            {isLangMenuOpen && (
              <div className="lang-dropdown">
                <button onClick={() => changeLanguage('ja')}>日本語</button>
                <button onClick={() => changeLanguage('en')}>English</button>
                <button onClick={() => changeLanguage('vi')}>Tiếng Việt</button>
                <button onClick={() => changeLanguage('de')}>Deutsch</button>
                <button onClick={() => changeLanguage('ko')}>한국어</button>
                <button onClick={() => changeLanguage('zh')}>中文</button>
                <button onClick={() => changeLanguage('fr')}>Français</button>
              </div>
            )}
          </div>

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