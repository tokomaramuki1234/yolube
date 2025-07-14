import React from 'react';
import './Profile.css';

const Profile = () => {
  return (
    <section id="profile" className="profile section">
      <h2 className="section-title">代表者プロフィール</h2>
      <p className="section-subtitle">
        遊び心で社会を変える取り組みを推進する代表をご紹介します
      </p>

      <div className="profile-content">
        <div className="profile-card game-card">
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
                <span className="detail-label">学歴</span>
                <span className="detail-value">秋田経済短期大学 商業経済科卒</span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">職歴</span>
                <span className="detail-value">IT業界でプロジェクトマネジャーとして12年間、<br/>ベトナムをはじめとする海外チームと協働</span>
              </div>
            </div>
          </div>
        </div>



        <div className="history-info">
          <h3 className="history-title">沿革</h3>
          <div className="history-timeline">
            <div className="timeline-item">
              <div className="timeline-date">2023年2月10日</div>
              <div className="timeline-content">
                <h4>TxGAME 発足</h4>
                <p>テーブルゲームを通じた地域活性化を目指し活動を開始</p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-date">2025年7月</div>
              <div className="timeline-content">
                <h4>YOLUBE に改称</h4>
                <p>「遊び心で社会を変える」理念のもと、新たなブランドとして生まれ変わる</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile; 