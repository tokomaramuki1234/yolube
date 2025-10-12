import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import '../styles/BasePage.css';

const CSTPage = () => {
  return (
    <>
      <Helmet>
        <title>コミュニケーション研修事業 | YOLUBE</title>
        <meta name="description" content="YOLUBEのコミュニケーション研修事業。テーブルゲームを活用した社員研修で、社内コミュニケーション機会創出とエンゲージメント向上を支援します。" />
      </Helmet>

      <Header />

      <div className="base-page">
        {/* ヒーローセクション */}
        <section className="base-hero">
          <div className="container">
            <h1 className="base-hero-title">コミュニケーション研修事業</h1>
          </div>
        </section>

        {/* コンテンツセクション */}
        <section className="base-content">
          <div className="container">
            <div className="base-content-inner">

              <h2>目的</h2>
              <p>社内コミュニケーション機会創出によるエンゲージメント向上および社員が主体的に事業へ取り組む仕組み作りを支援</p>

              <h2>内容</h2>
              <p>テーブルゲームを活用した社員研修事業</p>

              <h2>ターゲット</h2>
              <p>主に社歴の浅い新卒・中途採用及び役員</p>

              <h2>基本方針</h2>
              <p>テンプレートのような研修は行わない。クライアントごとの課題意識を尊重して研修内容を決定。詳細は<a href="/training">こちらをご参照願います。</a></p>

            </div>
          </div>
        </section>
      </div>

      <Footer />
      <BackToTop />
    </>
  );
};

export default CSTPage;
