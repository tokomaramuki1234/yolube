import React, { useState } from 'react';
import './Footer.css';

/**
 * Footerコンポーネント
 * SNSセクションとフッター情報を含む
 * @component
 * @returns {JSX.Element} Footer全体（SNS + フッター）
 */
const Footer = () => {
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);

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
            <div className="footer-logo">
              <img src="/images/YOLUBE_logo.png" alt="YOLUBE" />
            </div>

            <div className="footer-links">
              <div className="footer-section">
                <h4>サイト情報</h4>
                <ul>
                  <li><a href="/">ホーム</a></li>
                  <li><a href="/NEWS">新着情報</a></li>
                  <li><a href="#contact">お問い合わせ</a></li>
                </ul>
              </div>

              <div className="footer-section">
                <h4>組織概要</h4>
                <ul>
                  <li><a href="/YOLUBE">YOLUBEについて</a></li>
                  <li><a href="/ABOUT">代表プロフィール</a></li>
                  <li><a href="/ACHIEVEMENT">活動実績</a></li>
                </ul>
              </div>

              <div className="footer-section">
                <h4>事業案内</h4>
                <ul>
                  <li><a href="/FOSTER">テーブルゲーム文化醸成事業</a></li>
                  <li><a href="/RRP">地域活性化事業</a></li>
                  <li><a href="/DEV">テーブルゲーム開発事業</a></li>
                  <li><a href="/CST">コミュニケーション研修事業</a></li>
                  <li><a href="/IID">インバウンド基盤開発事業</a></li>
                </ul>
              </div>

              <div className="footer-section footer-section-accordion">
                <h4
                  className="footer-accordion-header"
                  onClick={() => setIsProjectsOpen(!isProjectsOpen)}
                >
                  プロジェクト
                  <span className={`footer-accordion-icon ${isProjectsOpen ? 'open' : ''}`}>▼</span>
                </h4>
                <ul className={`footer-accordion-content ${isProjectsOpen ? 'open' : ''}`}>
                  <li><a href="/ke">『け』</a></li>
                  <li><a href="/HT">ホームタウントラベラー</a></li>
                  <li><a href="/NNBNB">ねねばねべ</a></li>
                  <li><a href="/KanTo">KanTo</a></li>
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