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
      description: '様々なコラボイベント'
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
        '秋田県内小学校全校への寄贈を予定'
      ],
      status: '現在開発中'
    },
    {
      title: 'ねねばねべ',
      description: '秋田弁の「～ね」「～ば」「～べ」を使って遊ぶカードタイプのテーブルゲーム。',
      features: [
        '実際の秋田弁を使用したゲーム展開',
        'ナマハゲ・レイジ要素によるユニークな体験',
        '地域文化の継承と楽しさの融合'
      ],
      status: '現在開発中'
    },
    {
      title: 'KANTO',
      description: '秋田市の伝統芸能「竿灯」をモチーフに制作したカードタイプのテーブルゲーム。',
      features: [
        '竿灯会所属者による実体験ベース',
        '運と戦略の絶妙なバランス',
        '伝統芸能への理解を深める'
      ],
      status: '完成'
    }
  ];

  return (
    <section id="achievements" className="achievements section">
      <h2 className="section-title">実績</h2>
      <p className="section-subtitle">
        これまでの活動実績と代表作品をご紹介します
      </p>

      <div className="achievements-content">
        <div className="stats-section">
          <h3 className="subsection-title">活動実績</h3>
                       <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card game-card">
                <div className="stat-icon">
                  <FontAwesomeIcon icon={stat.icon} />
                </div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-description">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="games-section">
          <h3 className="subsection-title">代表作品</h3>
          
          <div className="games-showcase">
            <div className="showcase-images">
              <img 
                src="https://picsum.photos/400/300?random=8" 
                alt="2024年10月に秋田県観光PR用テーブルゲーム「Hometown Traveler」の試作版をテストプレイしている参加者たち"
                className="showcase-img main-img"
              />
              <div className="sub-images">
                <img 
                  src="https://picsum.photos/200/150?random=9" 
                  alt="秋田弁カードゲーム「ねねばねべ」のカードデザインとゲームコンポーネント一式"
                  className="showcase-img sub-img"
                />
                <img 
                  src="https://picsum.photos/200/150?random=10" 
                  alt="竿灯をテーマにしたカードゲーム「KANTO」をプレイ中の地元住民の様子"
                  className="showcase-img sub-img"
                />
              </div>
            </div>
            <div className="showcase-text">
              <h4>テーブルゲーム開発への想い</h4>
              <p>
                私たちは単なるゲーム制作にとどまらず、地域の魅力や文化を
                「遊び」という形で表現し、多くの人に伝えることを目指しています。
                各作品には秋田の特色が込められており、プレイヤーが楽しみながら
                地域について学べる設計となっています。
              </p>
            </div>
          </div>

          <div className="games-grid">
            {games.map((game, index) => (
              <div key={index} className="game-card">
                <div className="game-header">
                  <h4 className="game-title">{game.title}</h4>
                  <span className={`game-status ${game.status === '完成' ? 'completed' : 'in-progress'}`}>
                    {game.status}
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
    </section>
  );
};

export default Achievements; 