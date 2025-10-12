import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import '../styles/BasePage.css';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>代表プロフィール | YOLUBE</title>
        <meta name="description" content="YOLUBE代表 木村允のプロフィール。テーブルゲームイノベーターとして地域社会の課題解決に取り組んでいます。" />
      </Helmet>

      <Header />

      <div className="base-page">
        {/* ヒーローセクション */}
        <section className="base-hero">
          <div className="container">
            <h1 className="base-hero-title">代表プロフィール</h1>
          </div>
        </section>

        {/* コンテンツセクション */}
        <section className="base-content">
          <div className="container">
            <div className="base-content-inner">

              <h2>代表プロフィール</h2>

              <div className="profile-header">
                <div className="profile-card-container">
                  <img src="/images/makoto.jpg" alt="木村 允" />
                  <div className="profile-overlay">
                    <p className="profile-name-ja">木村 允</p>
                    <p className="profile-name-en">KIMURA MAKOTO</p>
                    <p className="profile-role">YOLUBE 代表 / テーブルゲームイノベーター</p>
                  </div>
                </div>
              </div>

              <h3>出身</h3>
              <p>1982年、秋田県秋田市河辺生まれ</p>

              <h3>略歴</h3>
              <p>
                日系IT企業の駐在員として赴任したベトナムで"日本人のコミュニケーション能力"に関心を持つようになる。SNSやチャットに依存する現代社会で、対面コミュニケーション能力の重要性を痛感し、テーブルゲームをその解決策として位置づける。
              </p>
              <p>
                その後、地元秋田県の社会問題・地域問題に対してテーブルゲームの有用性を見出し、２０２３年２月にTxGAME（ティーバイゲーム）を発足。同団体が主催するイベント「テーブルゲーム交流会：Ke.」を通じて２年間で累計約１０００名の来場者数を獲得。２０２５年７月１日、団体名を「YOLUBE」に改称。
              </p>
              <p>
                現在は秋田県の観光PRを目的とするテーブルゲーム「Hometown traveler」を開発中。
              </p>

            </div>
          </div>
        </section>
      </div>

      <Footer />
      <BackToTop />
    </>
  );
};

export default AboutPage;
