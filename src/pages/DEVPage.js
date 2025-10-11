import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import '../styles/BasePage.css';

const DEVPage = () => {
  return (
    <>
      <Helmet>
        <title>テーブルゲーム開発事業 | YOLUBE</title>
        <meta name="description" content="YOLUBEのテーブルゲーム開発事業。秋田県の観光資源、文化等の認知度向上及びインバウンド機会創出を目的としています。" />
      </Helmet>

      <Header />

      <div className="base-page">
        {/* ヒーローセクション */}
        <section className="base-hero">
          <div className="container">
            <h1 className="base-hero-title">テーブルゲーム開発事業</h1>
          </div>
        </section>

        {/* コンテンツセクション */}
        <section className="base-content">
          <div className="container">
            <div className="base-content-inner">

              <h2>目的</h2>
              <p>秋田県の観光資源、文化等の認知度向上及びインバウンド機会創出</p>

              <h2>内容</h2>
              <p>秋田県の観光PRにつながるテーブルゲームの開発及び普及</p>

              <h2>ターゲット</h2>
              <p>全般</p>

              <h2>基本方針</h2>
              <p>目的とゲーム性のバランスを重視し、「テーブルゲーム風の教材」は絶対に作らない</p>

            </div>
          </div>
        </section>
      </div>

      <Footer />
      <BackToTop />
    </>
  );
};

export default DEVPage;
