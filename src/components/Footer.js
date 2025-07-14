import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faBuilding } from '@fortawesome/free-solid-svg-icons';
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
            
            <div className="footer-description">
              <p>遊び心で社会を変える</p>
              <p>テーブルゲームの力で地域社会の課題解決に取り組んでいます</p>
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

            <div className="footer-section">
              <h4>連絡先</h4>
              <ul>
                <li>
                  <FontAwesomeIcon icon={faPhone} />
                  <a href="tel:090-2841-3926">090-2841-3926</a>
                </li>
                <li>
                  <FontAwesomeIcon icon={faEnvelope} />
                  <a href="mailto:info@yolube.jp">info@yolube.jp</a>
                </li>
                <li>
                  <FontAwesomeIcon icon={faBuilding} />
                  <span>YOLUBE</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="footer-copyright">
            <p>&copy; 2025 YOLUBE. All rights reserved.</p>
            <p>本事業計画書は2025年7月時点での計画です。</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 