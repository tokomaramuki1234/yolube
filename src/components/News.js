import React from 'react';
import './News.css';

const News = () => {
  const newsItems = [
    {
      id: 1,
      date: '2025.07.14',
      category: 'イベント',
      title: '秋田ベイパラダイスにてテーブルゲーム交流会：Ke.を開催します',
      description: '7月26日（土）10:00より、秋田市土崎の秋田ベイパラダイスにてテーブルゲーム交流会：Ke.を開催いたします！いつも通り参加費無料、予約不要、途中入退室自由です！',
      isNew: true
    },
    {
      id: 2,
      date: '2025.07.13',
      category: 'お知らせ',
      title: 'YOLUBEオフィシャルウェブサイトをリニューアルしました',
      description: 'より使いやすく、見やすいデザインに生まれ変わりました。今後ともよろしくお願いいたします。',
      isNew: true
    },
    {
      id: 3,
      date: '2025.07.05',
      category: 'メディア',
      title: '秋田魁新報にYOLUBEの活動が掲載されました',
      description: '地域活性化の取り組みについて取り上げていただきました。',
      isNew: false
    },
    {
      id: 4,
      date: '2025.06.28',
      category: 'イベント',
      title: 'みんなの実家門脇家での交流イベントが終了しました',
      description: '多くの方にご参加いただき、ありがとうございました。次回開催もお楽しみに。',
      isNew: false
    }
  ];

  return (
    <section id="news" className="news">
      <div className="container">
        <div className="news-header">
          <h2 className="section-title">NEWS</h2>
        </div>
        
        <div className="news-content">
          <div className="news-list">
            {newsItems.map(item => (
              <article key={item.id} className="news-item">
                <div className="news-meta">
                  <time className="news-date">{item.date}</time>
                  <span className={`news-category category-${item.category}`}>
                    {item.category}
                  </span>
                  {item.isNew && <span className="news-badge">NEW</span>}
                </div>
                
                <div className="news-content-wrapper">
                  <h3 className="news-title">{item.title}</h3>
                  <p className="news-description">{item.description}</p>
                </div>
                
                <div className="news-arrow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </article>
            ))}
          </div>
          
          <div className="news-more">
            <button className="btn-more">
              すべての新着情報を見る
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default News; 