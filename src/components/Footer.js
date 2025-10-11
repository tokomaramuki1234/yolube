import React from 'react';
import './Footer.css';

/**
 * Footerコンポーネント
 * SNSセクションとフッター情報を含む
 * @component
 * @returns {JSX.Element} Footer全体（SNS + フッター）
 */
const Footer = () => {
  return (
    <>
      {/* SNSセクション */}
      <section id="sns" className="sns">
        <div className="section-container">
          <div className="sns-content">
            <h2 className="sns-title">
              最新情報を<span className="mobile-br"><br /></span>SNSでチェック！
            </h2>
            <p className="sns-subtitle">
              イベントの最新情報や参加者の様子を<span className="mobile-br"><br /></span>お届けしています
            </p>
            <div className="sns-links">
              <a
                href="https://x.com/_YOLUBE_"
                target="_blank"
                rel="noopener noreferrer"
                className="sns-link sns-x"
                aria-label="X (Twitter)で最新情報をチェック"
              >
                <img src="/images/SVG/sns_x.svg" alt="X (Twitter)" />
              </a>
              <a
                href="https://www.facebook.com/YOLUBE.AKITA"
                target="_blank"
                rel="noopener noreferrer"
                className="sns-link sns-facebook"
                aria-label="Facebookで最新情報をチェック"
              >
                <img src="/images/SVG/sns_fb.svg" alt="Facebook" />
              </a>
              <a
                href="https://www.instagram.com/_yolube_/"
                target="_blank"
                rel="noopener noreferrer"
                className="sns-link sns-instagram"
                aria-label="Instagramで最新情報をチェック"
              >
                <img src="/images/SVG/sns_insta.svg" alt="Instagram" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* フッターセクション */}
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
    </>
  );
};

export default Footer; 