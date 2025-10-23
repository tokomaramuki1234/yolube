import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper, faTv, faRadio, faGlobe, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './Press.css';

const Press = () => {
  const getMediaIcon = (media) => {
    if (media.includes('新聞') || media.includes('魁')) return faNewspaper;
    if (media.includes('テレビ') || media.includes('NHK') || media.includes('ABS') || media.includes('CNA')) return faTv;
    if (media.includes('ラジオ')) return faRadio;
    return faGlobe;
  };

  const pressItems = [
    {
      id: 1,
      date: '2025.08.15',
      media: '秋田魁新報社 朝刊',
      title: 'YOLUBE相談役 庄司 作「KanTo」をご紹介',
      link: null
    },
    {
      id: 2,
      date: '2025.07.02',
      media: '秋田魁新報社 朝刊',
      title: '「秋田元気印」コーナーにて代表の活動を取り上げ',
      link: null
    },
    {
      id: 3,
      date: '2025.04.02',
      media: 'NHK秋田放送',
      title: 'ニュースこまち「こま特」にて「ホームタウントラベラー」をご紹介',
      link: 'https://yolube.jp/HT'
    },
    {
      id: 4,
      date: '2024.12.16',
      media: 'ABSラジオ',
      title: '「まちなかsessionエキマイク」にて当団体の活動を取り上げ',
      link: null
    },
    {
      id: 5,
      date: '2024.07.30',
      media: 'あきコネ',
      title: '当団体の活動を取り上げ',
      link: 'https://kankei.a-iju.jp/projects/p3772'
    }
  ];

  return (
    <section id="press" className="press section">
      <div className="section-container">
        <h2 className="section-title">メディア掲載実績</h2>
        <p className="section-subtitle-en">Press Coverage</p>

        <div className="press-list">
          {pressItems.map((item, index) => (
            <article 
              key={item.id} 
              className="press-item"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="press-icon">
                <FontAwesomeIcon icon={getMediaIcon(item.media)} />
              </div>
              
              <div className="press-content">
                <div className="press-meta">
                  <time className="press-date">{item.date}</time>
                  <span className="press-media">{item.media}</span>
                </div>
                <h3 className="press-title">{item.title}</h3>
              </div>

              {item.link && (
                <a 
                  href={item.link} 
                  className="press-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="記事を見る"
                >
                  <FontAwesomeIcon icon={faArrowRight} />
                </a>
              )}
            </article>
          ))}
        </div>

        <div className="press-more">
          <a href="/ACHIEVEMENT" className="btn btn-outline">
            すべてのメディア掲載を見る
            <FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '0.5rem' }} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Press;
