import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDice, faStore, faBullseye, faHandshake, faGlobe } from '@fortawesome/free-solid-svg-icons';
import './Services.css';

const Services = () => {
  const services = [
    {
      id: 1,
      title: 'テーブルゲーム文化醸成事業',
      description: 'テーブルゲームの認知度向上及び文化醸成を目的とした定期的な交流会「Ke.」を開催',
      image: 'https://picsum.photos/600/400?random=15',
      icon: faDice,
      features: [
        '誰でも無料・予約なしで参加可能',
        '未経験者～中級者をターゲット',
        '定期開催によるコミュニティ形成'
      ]
    },
    {
      id: 2,
      title: '地域活性化事業',
      description: 'テーブルゲームによる集客及び顧客満足度向上の機会を提供',
      image: 'https://picsum.photos/600/400?random=16',
      icon: faStore,
      features: [
        '地元企業とのコラボ企画',
        '主に飲食店・保育園・介護施設での活動',
        '課題に応じたカスタマイズの提案'
      ]
    },
    {
      id: 3,
      title: 'テーブルゲーム開発事業',
      description: '秋田県の観光資源、文化等の認知度向上及びインバウンド機会創出',
      image: 'https://picsum.photos/600/400?random=17',
      icon: faBullseye,
      features: [
        '秋田をテーマにしたオリジナルゲームの制作',
        'ただの教材ではなく、面白いゲーム作りにこだわる',
        '「秋田には何もない」という固定観念を打ち破る'
      ]
    },
    {
      id: 4,
      title: 'ゲーム研修事業',
      description: '社内コミュニケーション機会創出によるエンゲージメント向上',
      image: 'https://picsum.photos/600/400?random=18',
      icon: faHandshake,
      features: [
        '職場では得難いコミュニケーション機会を提供',
        '様々な視座や気付きを得るための支援をゲームで実施',
        '血の通った社内交流の構築を目指す'
      ]
    },
    {
      id: 5,
      title: 'インバウンド事業',
      description: 'テーブルゲームを通じた国際交流促進と文化発信',
      image: 'https://picsum.photos/600/400?random=19',
      icon: faGlobe,
      features: [
        '秋田をテーマに、多言語対応のゲームを開発',
        '県内の観光団体に対し、ゲームとITでインバウンド対策を支援',
        '地元民の想いを正しく伝えることを第一義とする'
      ]
    }
  ];

  return (
    <section id="services" className="services section">
      <div className="section-container">
        <h2 className="section-title">WORKS</h2>
        <p className="section-subtitle">
          テーブルゲームの力で地域と社会に価値を創造する5つの事業を展開しています。
        </p>

        <div className="services-overview">
          <div className="overview-content">
            <div className="overview-text">
              <h3>遊びが創る新しい価値</h3>
              <p>私たちはテーブルゲームを単なる娯楽として捉えるのではなく、コミュニケーションツール、学習ツール、そして地域活性化のためのイノベーションツールとして活用しています。人と人との繋がりを生み出し、地域課題の解決に貢献する持続可能な事業を目指します。</p>
            </div>
            <div className="overview-images">
              <img src="https://picsum.photos/400/300?random=13" alt="テーブルゲーム交流" className="overview-img-1" />
              <img src="https://picsum.photos/400/300?random=14" alt="地域コミュニティ" className="overview-img-2" />
            </div>
          </div>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon">
                <FontAwesomeIcon icon={service.icon} />
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <div className="service-features">
                {service.features.map((feature, index) => (
                  <span key={index} className="service-tag">{feature}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services; 