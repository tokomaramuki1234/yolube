import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import '../styles/BasePage.css';

const IIDPage = () => {
  return (
    <>
      <Helmet>
        <title>インバウンド基盤開発事業 | YOLUBE</title>
        <meta name="description" content="YOLUBEのインバウンド基盤開発事業。小規模団体のインバウンド対応課題をテーブルゲーム×Web×ITで解決します。" />
      </Helmet>

      <Header />

      <div className="base-page">
        {/* ヒーローセクション */}
        <section className="base-hero">
          <div className="container">
            <h1 className="base-hero-title">インバウンド基盤開発事業</h1>
          </div>
        </section>

        {/* コンテンツセクション */}
        <section className="base-content">
          <div className="container">
            <div className="base-content-inner">

              <h2>目的</h2>
              <p>小規模団体のインバウンド対応課題をテーブルゲーム×Web×ITで解決</p>

              <h2>内容</h2>
              <p>県内の観光資源管理団体のインバウンド支援</p>

              <h2>ターゲット</h2>
              <p>秋田県内の観光資源管理団体</p>

              <h2>基本方針</h2>
              <p>英語対応が難しい、外国人対応が難しいといった課題への支援を基本とし、「インバウンドに起因するトラブル」への対策をゲーム、IT技術を駆使して支援する。</p>

            </div>
          </div>
        </section>
      </div>

      <Footer />
      <BackToTop />
    </>
  );
};

export default IIDPage;
