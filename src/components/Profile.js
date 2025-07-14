import React from 'react';
import './Profile.css';

const Profile = () => {
  return (
    <section id="profile" className="profile section">
      <div className="section-container">
        <h2 className="section-title">代表者プロフィール</h2>

        <div className="profile-content">
          <div className="profile-card">
            <div className="profile-image">
              <img src="/images/makoto.jpg" alt="木村 允" />
            </div>
            
            <div className="profile-info">
              <h3 className="profile-name">木村 允</h3>
              <p className="profile-title">YOLUBE 代表 / テーブルゲームイノベーター</p>
              
              <div className="profile-details">
                <div className="detail-item">
                  <span className="detail-label">出身</span>
                  <span className="detail-value">1982年、秋田県秋田市河辺生まれ</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">略歴</span>
                  <span className="detail-value">日系IT企業の駐在員として赴任したベトナムで”日本人のコミュニケーション能力”に関心を持つようになる。SNSやチャットに依存する現代社会で、対面コミュニケーション能力の重要性を痛感し、テーブルゲームをその解決策として位置づける。
その後、地元秋田県の社会問題・地域問題に対してテーブルゲームの有用性を見出し、２０２３年２月にTxGAME（ティーバイゲーム）を発足。同団体が主催するイベント「テーブルゲーム交流会：Ke.」を通じて２年間で累計約１０００名の来場者数を獲得。２０２５年７月１日、団体名を「YOLUBE」に改称。
現在は秋田県の観光PRを目的とするテーブルゲーム「Hometown traveler」を開発中。</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile; 