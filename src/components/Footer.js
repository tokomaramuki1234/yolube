import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-logo">
              <img src="/images/YOLUBE_logo.png" alt="YOLUBE" />
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-section">
              <h4>事業内容</h4>
              <ul>
                <li><a href="#services">テーブルゲーム文化醸成事業</a></li>
                <li><a href="#services">地域活性化事業</a></li>
                <li><a href="#services">テーブルゲーム開発事業</a></li>
                <li><a href="#services">ゲーム研修事業</a></li>
                <li><a href="#services">インバウンド基盤開発事業</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>情報</h4>
              <ul>
                <li><a href="#about">ABOUT</a></li>
                <li><a href="#achievements">実績</a></li>
                <li><a href="#profile">プロフィール</a></li>
                <li><a href="#contact">お問い合わせ</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 