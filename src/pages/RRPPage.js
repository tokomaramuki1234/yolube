import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import '../styles/BasePage.css';

const RRPPage = () => {
  return (
    <>
      <Helmet>
        <title>地域活性化事業 | YOLUBE</title>
        <meta name="description" content="YOLUBEの地域活性化事業。テーブルゲームによる集客及び顧客満足度の向上機会を提供します。" />
      </Helmet>

      <Header />

      <div className="base-page">
        {/* ヒーローセクション */}
        <section className="base-hero">
          <div className="container">
            <h1 className="base-hero-title">地域活性化事業</h1>
          </div>
        </section>

        {/* コンテンツセクション */}
        <section className="base-content">
          <div className="container">
            <div className="base-content-inner">

              <h2>目的</h2>
              <p>テーブルゲームによる集客及び顧客満足度の向上機会提供</p>

              <h2>内容</h2>
              <p>地域に根差すサービス業とのコラボ企画</p>

              <h2>ターゲット</h2>
              <p>飲食店、保育園、介護施設等</p>

              <h2>基本方針</h2>
              <p>ターゲット側の課題に応じて提案内容を調整</p>

            </div>
          </div>
        </section>
      </div>

      <Footer />
      <BackToTop />
    </>
  );
};

export default RRPPage;
