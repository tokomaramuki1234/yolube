import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import '../styles/BasePage.css';

const FosterPage = () => {
  return (
    <>
      <Helmet>
        <title>テーブルゲーム文化醸成事業 | YOLUBE</title>
        <meta name="description" content="YOLUBEのテーブルゲーム文化醸成事業。誰でも無料・予約なしで参加できるテーブルゲーム交流会『け』を定期的に実施しています。" />
      </Helmet>

      <Header />

      <div className="base-page">
        {/* ヒーローセクション */}
        <section className="base-hero">
          <div className="container">
            <h1 className="base-hero-title">テーブルゲーム文化醸成事業</h1>
          </div>
        </section>

        {/* コンテンツセクション */}
        <section className="base-content">
          <div className="container">
            <div className="base-content-inner">

              <h2>目的</h2>
              <p>テーブルゲームの認知度向上及び文化醸成</p>

              <h2>内容</h2>
              <p>誰でも無料・予約なしで参加できるテーブルゲーム交流会<a href="/ke">『け』</a>を定期的に実施</p>

              <h2>ターゲット</h2>
              <p>年齢、性別、国籍問わず未経験者～中級者</p>

              <h2>基本方針</h2>
              <p>事業目的を果たすため収益化は行わず、他事業で予算補填</p>

            </div>
          </div>
        </section>
      </div>

      <Footer />
      <BackToTop />
    </>
  );
};

export default FosterPage;
