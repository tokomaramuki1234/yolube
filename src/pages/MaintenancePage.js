import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import '../styles/BasePage.css';
import './MaintenancePage.css';

const MaintenancePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>ページ制作中 | YOLUBE</title>
        <meta name="description" content="このページは現在制作中です。" />
      </Helmet>

      <Header />

      <div className="base-page">
        {/* ヒーローセクション */}
        <section className="base-hero">
          <div className="container">
            <h1 className="base-hero-title">ページ制作中</h1>
          </div>
        </section>

        {/* コンテンツセクション */}
        <section className="base-content">
          <div className="container">
            <div className="base-content-inner maintenance-content">

              <img src="/images/YOLUBE_Ke_3D.png" alt="YOLUBE Ke" className="maintenance-background" />

              <div className="maintenance-content-text">
                <h2>Coming Soon</h2>
                <p>このページは現在制作中です。</p>
                <p>公開までしばらくお待ちください。</p>

                <p style={{ textAlign: 'center', marginTop: '40px' }}>
                  <button
                    onClick={() => navigate('/')}
                    style={{
                      padding: '15px 40px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      color: 'white',
                      background: 'var(--primary-color)',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => e.target.style.background = 'var(--primary-dark)'}
                    onMouseOut={(e) => e.target.style.background = 'var(--primary-color)'}
                  >
                    トップページへ戻る
                  </button>
                </p>
              </div>

            </div>
          </div>
        </section>
      </div>

      <Footer />
      <BackToTop />
    </>
  );
};

export default MaintenancePage;
