import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import '../styles/BasePage.css';

const AchievementPage = () => {
  return (
    <>
      <Helmet>
        <title>活動実績 | YOLUBE</title>
        <meta name="description" content="YOLUBEの活動実績とメディア掲載情報をご紹介します。" />
      </Helmet>

      <Header />

      <div className="base-page">
        {/* ヒーローセクション */}
        <section className="base-hero">
          <div className="container">
            <h1 className="base-hero-title">活動実績</h1>
          </div>
        </section>

        {/* コンテンツセクション */}
        <section className="base-content">
          <div className="container">
            <div className="base-content-inner">

              {/* 実績 */}
              <h2>実績</h2>
              <ul>
                <li><strong>定例会「テーブルゲーム交流会：Ke.」</strong>: 64回開催（2025/10/11時点）</li>
                <li><strong>臨時／コラボイベント</strong>: 約17回開催（2025/10/11時点）</li>
                <li><strong>累計参加者数</strong>: 1,100名以上（2025/10/11時点）</li>
              </ul>

              {/* メディア掲載実績 */}
              <h2>新聞・雑誌・テレビ等の掲載実績</h2>
              <ul>
                <li>
                  <strong>2025年8月15日</strong> 秋田魁新報社 朝刊にてYOLUBE相談役 庄司 作 「KanTo」をご紹介頂きました。
                </li>
                <li>
                  <strong>2025年7月2日</strong> 秋田魁新報社 朝刊「秋田元気印」コーナーにて代表の活動を取り上げていただきました。
                </li>
                <li>
                  <strong>2025年4月2日</strong> NHK秋田放送 ニュースこまち「こま特」にて<a href="https://yolube.jp/HT">ホームタウントラベラー</a>をご紹介頂きました。
                </li>
                <li>
                  <strong>2024年12月16日</strong> ABSラジオ 「まちなかsessionエキマイク」にて当団体の活動を取り上げていただきました。
                </li>
                <li>
                  <strong>2024年7月30日</strong> <a href="https://kankei.a-iju.jp/projects/p3772" target="_blank" rel="noopener noreferrer">あきコネ</a>にて当団体の活動を取り上げていただきました。
                </li>
                <li>
                  <strong>2024年3月10日</strong> <a href="https://news.ntv.co.jp/n/abs/category/society/abe11f96808d404166bb9f1f3933cb0e96" target="_blank" rel="noopener noreferrer">ABS秋田放送</a>にて当団体の活動を取り上げていただきました。
                </li>
                <li>
                  <strong>2023年10月26日</strong> ABS秋田放送にて当団体の活動を取り上げていただきました。
                </li>
                <li>
                  <strong>2023年9月19日</strong> <a href="https://www.youtube.com/watch?v=ZHqfxGehI8w&t" target="_blank" rel="noopener noreferrer">CNA秋田ケーブルテレビ「し〜なチャン」</a>にて当団体の活動を取り上げていただきました。
                </li>
                <li>
                  <strong>2023年4月10日</strong> ABSラジオ 「まちなかsessionエキマイク」にて当団体の活動を取り上げていただきました。
                </li>
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

export default AchievementPage;
