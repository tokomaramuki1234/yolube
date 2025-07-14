import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBullseye, faCalendarAlt, faDollarSign, faGamepad } from '@fortawesome/free-solid-svg-icons';
import './Achievements.css';

const Achievements = () => {
  const stats = [
    {
      icon: faUsers,
      number: '1,000+',
      label: '累計参加者数',
      description: '2025年6月30日時点'
    },
    {
      icon: faBullseye,
      number: '55',
      label: '定期イベント開催回数',
      description: '「テーブルゲーム交流会：Ke.」'
    },
    {
      icon: faCalendarAlt,
      number: '15+',
      label: '臨時イベント開催回数',
      description: '様々なコラボイベントを展開中'
    },
    {
      icon: faDollarSign,
      number: '300万円',
      label: '2026年度目標年商',
      description: '収益計画による見込み'
    }
  ];

  const games = [
    {
      title: 'Hometown Traveler',
      description: '秋田県の観光PRを目的としたテーブルゲーム。プレイヤーは秋田県へ訪れた旅行者として四季折々の観光スポットを旅する。',
      features: [
        '観光スポット／イベント情報のカード化',
        'QRコード連携による多言語対応',
        '秋田県内小学校全校への寄贈を目指し開発中'
      ],
      status: 'in-progress'
    },
    {
      title: 'ねねばねべ',
      description: '秋田弁の「～ね」「～ば」「～べ」を使って遊ぶカードタイプのテーブルゲーム。',
      features: [
        '実際の秋田弁を使用したゲーム',
        '敗北即ち、ナマハゲ・レイジ激震！',
        '他のボドゲマーヘッズを出し抜くワザマエ試される重篤極まりないゲーム'
      ],
      status: 'completed'
    }
  ];

  return (
    <section id="achievements" className="achievements section">
      <div className="section-container">
        <h2 className="section-title">制作物</h2>
        <p className="section-subtitle">
          これまでの活動実績と開発中のテーブルゲームをご紹介します
        </p>

        <div className="achievements-content">
          {/* 統計情報 */}
          <div className="stats-section">
            <h3 className="subsection-title">活動実績</h3>
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <FontAwesomeIcon icon={stat.icon} className="stat-icon" />
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                  <div className="stat-description">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ゲーム開発実績 */}
          <div className="games-section">
            <h3 className="subsection-title">開発ゲーム</h3>
            
            {/* ショーケース */}
            <div className="games-showcase">
              <div className="showcase-images">
                <img src="https://picsum.photos/600/400?random=20" alt="テーブルゲーム" className="main-img" />
                <div className="sub-images">
                  <img src="https://picsum.photos/300/200?random=21" alt="ゲーム詳細1" className="sub-img" />
                  <img src="https://picsum.photos/300/200?random=22" alt="ゲーム詳細2" className="sub-img" />
                </div>
              </div>
              <div className="showcase-text">
                <h4>地域文化を遊びで学ぶ</h4>
                <p>遊びながら学び、楽しみながら地元を知ることができる体験を提供すべく開発しています。</p>
              </div>
            </div>

            {/* ゲーム詳細 */}
            <div className="games-grid">
              {games.map((game, index) => (
                <div key={index} className="game-card">
                  <div className="game-header">
                    <h4 className="game-title">{game.title}</h4>
                    <span className={`game-status ${game.status}`}>
                      {game.status === 'completed' ? '完成' : '開発中'}
                    </span>
                  </div>
                  <p className="game-description">{game.description}</p>
                  <ul className="game-features">
                    {game.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>
                        <FontAwesomeIcon icon={faGamepad} className="feature-bullet" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements; 