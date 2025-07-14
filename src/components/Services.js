import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDice, faStore, faBullseye, faHandshake, faGlobe } from '@fortawesome/free-solid-svg-icons';
import './Services.css';

const Services = () => {
  const services = [
    {
      id: 1,
      title: 'テーブルゲーム文化醸成事業',
      description: 'テーブルゲームの認知度向上及び文化醸成を目的とした定期的な交流会を開催',
      image: 'https://picsum.photos/600/400?random=15',
      icon: faDice,
      color: 'primary',
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
      color: 'secondary',
      features: [
        '飲食店とのコラボ企画',
        '保育園・介護施設での活動',
        '地域課題に応じたカスタマイズ提案'
      ]
    },
    {
      id: 3,
      title: 'テーブルゲーム開発事業',
      description: '秋田県の観光資源、文化等の認知度向上及びインバウンド機会創出',
      image: 'https://picsum.photos/600/400?random=17',
      icon: faBullseye,
      color: 'accent',
      features: [
        '観光PRテーブルゲーム制作',
        '地域文化をテーマにしたオリジナルゲーム',
        '「遊び」と「学び」の融合'
      ]
    },
    {
      id: 4,
      title: 'ゲーム研修事業',
      description: '社内コミュニケーション機会創出によるエンゲージメント向上',
      image: 'https://picsum.photos/600/400?random=18',
      icon: faHandshake,
      color: 'success',
      features: [
        '新卒・中途社員と役員の交流促進',
        'チームビルディング強化',
        '県内企業向けカスタマイズ研修'
      ]
    },
    {
      id: 5,
      title: 'インバウンド基盤開発事業',
      description: '小規模団体のインバウンド対応課題をテーブルゲーム×Webで解決',
      image: 'https://picsum.photos/600/400?random=19',
      icon: faGlobe,
      color: 'info',
      features: [
        '多言語対応の観光情報サイト',
        'QRコード連携システム',
        '観光資源管理団体への支援'
      ]
    }
  ];

  return (
    <section id="services" className="services section">
      <h2 className="section-title">事業内容</h2>
      <p className="section-subtitle">
        5つの主要事業で地域社会の課題解決に取り組んでいます
      </p>



      <div className="services-grid">
        {services.map((service) => (
          <div key={service.id} className={`service-tile ${service.color}`}>
            <div className="tile-image">
              <img src={service.image} alt={service.title} />
              <div className="tile-overlay">
                <div className="tile-icon">
                  <FontAwesomeIcon icon={service.icon} />
                </div>
              </div>
            </div>
            <div className="tile-content">
              <h3 className="tile-title">{service.title}</h3>
              <p className="tile-description">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services; 