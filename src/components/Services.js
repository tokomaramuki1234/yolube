import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './Services.css';

const Services = () => {
  const services = [
    {
      id: 1,
      title: 'テーブルゲーム文化醸成事業',
      description: 'テーブルゲームの認知度向上及び文化醸成を目的とした定期的な交流会「Ke.」を開催しています。誰でも無料・予約なしで参加可能で、未経験者から中級者をターゲットに、定期開催によるコミュニティ形成を目指しています。',
      image: 'https://picsum.photos/800/500?random=1',
      link: '/FOSTER'
    },
    {
      id: 2,
      title: '地域活性化事業',
      description: 'テーブルゲームによる集客及び顧客満足度向上の機会を提供します。地元企業とのコラボ企画を中心に、主に飲食店・保育園・介護施設での活動を展開し、各施設の課題に応じたカスタマイズの提案を行っています。',
      image: 'https://picsum.photos/800/500?random=2',
      link: '/RRP'
    },
    {
      id: 3,
      title: 'テーブルゲーム開発事業',
      description: '秋田県の観光資源、文化等の認知度向上及びインバウンド機会創出を目指しています。秋田をテーマにしたオリジナルゲームの制作を通じて、ただの教材ではなく面白いゲーム作りにこだわり、「秋田には何もない」という固定観念を打ち破ります。',
      image: 'https://picsum.photos/800/500?random=3',
      link: '/DEV'
    },
    {
      id: 4,
      title: 'ゲーム研修事業',
      description: '社内コミュニケーション機会創出によるエンゲージメント向上を支援します。職場では得難いコミュニケーション機会を提供し、様々な視座や気付きを得るための支援をゲームで実施。血の通った社内交流の構築を目指します。',
      image: 'https://picsum.photos/800/500?random=4',
      link: '/CST'
    },
    {
      id: 5,
      title: 'インバウンド事業',
      description: 'テーブルゲームを通じた国際交流促進と文化発信を行っています。秋田をテーマに多言語対応のゲームを開発し、県内の観光団体に対してゲームとITでインバウンド対策を支援。地元民の想いを正しく伝えることを第一義としています。',
      image: 'https://picsum.photos/800/500?random=5',
      link: '/IID'
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
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="service-card-image">
                <img src={service.image} alt={service.title} />
              </div>
              <div className="service-card-content">
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-description">{service.description}</p>
                <a href={service.link} className="service-card-button">
                  詳しく見る
                  <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services; 