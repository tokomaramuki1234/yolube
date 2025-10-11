import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import '../styles/BasePage.css';
import './NotFoundPage.css';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>お探しのページが見つかりません | YOLUBE</title>
        <meta name="description" content="お探しのページは見つかりませんでした。" />
      </Helmet>

      <Header />

      <div className="base-page">
        {/* ヒーローセクション */}
        <section className="base-hero">
          <div className="container">
            <h1 className="base-hero-title">お探しのページが見つかりません</h1>
          </div>
        </section>

        {/* コンテンツセクション */}
        <section className="base-content">
          <div className="container">
            <div className="base-content-inner notfound-content">

              <img src="/images/YOLUBE_Ke_3D.png" alt="YOLUBE Ke" className="notfound-background" />

              <div className="notfound-content-text">
                <h2>404 not found</h2>
                <p>お探しのページは存在しないか、移動または削除された可能性があります。</p>
                <p>URLをご確認いただくか、下記のボタンからトップページへお戻りください。</p>

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

export default NotFoundPage;
