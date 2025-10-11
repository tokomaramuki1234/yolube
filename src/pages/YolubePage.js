import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import '../styles/BasePage.css';

const YolubePage = () => {
  return (
    <>
      <Helmet>
        <title>YOLUBEについて | YOLUBE</title>
        <meta name="description" content="YOLUBEの組織概要、ミッション、ビジョン、バリュー、体制、活動実績をご紹介します。" />
      </Helmet>

      <Header />

      <div className="base-page">
        {/* ヒーローセクション */}
        <section className="base-hero">
          <div className="container">
            <h1 className="base-hero-title">YOLUBEについて</h1>
          </div>
        </section>

        {/* コンテンツセクション */}
        <section className="base-content">
          <div className="container">
            <div className="base-content-inner">

              {/* 基本情報 */}
              <h2>基本情報</h2>
              <ul>
                <li><strong>団体名称</strong>: YOLUBE（旧TxGAME）</li>
                <li><strong>発足時期</strong>: 2023年2月10日</li>
                <li><strong>改称時期</strong>: 2025年7月</li>
              </ul>

              {/* MISSION */}
              <h2>MISSION</h2>
              <p style={{ fontSize: '1.3rem', fontWeight: '600', color: 'var(--primary-color)', marginBottom: '15px' }}>
                遊び心で 社会を変える
              </p>
              <p>
                テーブルゲームの魅力を最大限に活かして、地域社会の課題解決に取り組みます
              </p>

              {/* VISION */}
              <h2>VISION</h2>

              <h3>すべてを乗り越える交流文化を創る</h3>
              <p>
                年齢、性別、世代、立場を超えたフラットな交流文化を築きます。
              </p>

              <h3>体験交流型観光資源を創る</h3>
              <p>
                テーブルゲームの交流文化自体を新たな観光資源とし、地域経済に貢献します。
              </p>

              {/* VALUE */}
              <h2>VALUE</h2>

              <h3>遊び × 社会課題解決</h3>
              <p>
                テーブルゲームを通じて企業のエンゲージメント向上、自殺予防、認知症予防、経済活性化など、様々な社会課題への寄与を目指します。
              </p>

              <h3>遊び × 地域活性化</h3>
              <p>
                テーブルゲームが創り出す様々な形のコミュニケーションで人と人との繋がりを深め、地域活性化へ貢献します。
              </p>

              {/* 体制 */}
              <h2>体制</h2>
              <ul>
                <li><strong>代表</strong>: 木村 允</li>
                <li><strong>副代表（兼 相談役）</strong>: しょ～じ（庄司 隆敏）</li>
                <li><strong>副代表</strong>: マキノ（牧野 竜大）</li>
                <li><strong>会計</strong>: たろう</li>
                <li><strong>監事</strong>: 佐藤 存（立志塾RISE）</li>
              </ul>
              <p>他、県内外多数のサポートメンバー様に支えていただいております。</p>

              {/* 主な活動拠点 */}
              <h2>主な活動拠点</h2>
              <ul>
                <li><a href="https://maps.app.goo.gl/LnBeZzxp1t21zozPA" target="_blank" rel="noopener noreferrer">秋田市文化創造館</a></li>
                <li><a href="https://maps.app.goo.gl/acc1Jvyr6Nh3FiHp8" target="_blank" rel="noopener noreferrer">みんなの実家門脇家</a></li>
                <li><a href="https://maps.app.goo.gl/dxKDZeTZYRwiuksL7" target="_blank" rel="noopener noreferrer">秋田ベイパラダイス</a></li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <Footer />
      <BackToTop />
    </>
  );
};

export default YolubePage;
