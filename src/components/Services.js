import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDice, faStore, faBullseye, faHandshake, faGlobe, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './Services.css';

const Services = () => {
  const services = [
    {
      id: 1,
      title: 'テーブルゲーム文化醸成事業',
      description: 'テーブルゲームの認知度向上及び文化醸成を目的とした定期的な交流会「Ke.」を開催',
      icon: faDice,
      link: '/FOSTER',
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
      icon: faStore,
      link: '/RRP',
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
      icon: faBullseye,
      link: '/DEV',
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
      icon: faHandshake,
      link: '/CST',
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
      icon: faGlobe,
      link: '/IID',
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

        <div className="services-grid">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className="service-card-grid"
              data-service-id={service.id}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="service-card-icon">
                <FontAwesomeIcon icon={service.icon} />
              </div>
              <h3 className="service-card-title">{service.title}</h3>
              <p className="service-card-description">{service.description}</p>
              <div className="service-card-features">
                {service.features.map((feature, featureIndex) => (
                  <span key={featureIndex} className="service-card-tag">{feature}</span>
                ))}
              </div>
              <a href={service.link} className="service-card-button">
                詳しく見る
                <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services; 