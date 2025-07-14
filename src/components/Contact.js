import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faBuilding, faUser, faMapMarkerAlt, faHome, faBullseye } from '@fortawesome/free-solid-svg-icons';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact section">
      <h2 className="section-title">お問い合わせ</h2>
      <p className="section-subtitle">
        ご質問やご相談はお気軽にご連絡ください
      </p>

      <div className="contact-content">
        <div className="contact-info">
          <div className="contact-card game-card">
            <h3 className="contact-title">連絡先</h3>
            
            <div className="contact-items">
              <div className="contact-item">
                <div className="contact-icon">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <div className="contact-details">
                  <div className="contact-label">お電話</div>
                  <div className="contact-value">
                    <a href="tel:090-2841-3926">090-2841-3926</a>
                  </div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div className="contact-details">
                  <div className="contact-label">メール</div>
                  <div className="contact-value">
                    <a href="mailto:info@yolube.jp">info@yolube.jp</a>
                  </div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <FontAwesomeIcon icon={faBuilding} />
                </div>
                <div className="contact-details">
                  <div className="contact-label">団体名</div>
                  <div className="contact-value">YOLUBE</div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div className="contact-details">
                  <div className="contact-label">代表者</div>
                  <div className="contact-value">木村 允</div>
                </div>
              </div>
            </div>
          </div>

          <div className="location-card game-card">
            <h3 className="contact-title">主な活動拠点</h3>
            
            <div className="locations">
              <div className="location-item">
                <div className="location-icon">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                </div>
                <div className="location-name">秋田市文化創造館</div>
              </div>

              <div className="location-item">
                <div className="location-icon">
                  <FontAwesomeIcon icon={faHome} />
                </div>
                <div className="location-name">みんなの実家門脇家</div>
              </div>

              <div className="location-item">
                <div className="location-icon">
                  <FontAwesomeIcon icon={faBullseye} />
                </div>
                <div className="location-name">秋田ベイパラダイス</div>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <div className="form-card game-card">
            <h3 className="contact-title">お問い合わせフォーム</h3>
            
            <form className="contact-form-content">
              <div className="form-group">
                <label htmlFor="name">お名前 *</label>
                <input type="text" id="name" name="name" required />
              </div>

              <div className="form-group">
                <label htmlFor="email">メールアドレス *</label>
                <input type="email" id="email" name="email" required />
              </div>

              <div className="form-group">
                <label htmlFor="company">会社名・団体名</label>
                <input type="text" id="company" name="company" />
              </div>

              <div className="form-group">
                <label htmlFor="subject">件名 *</label>
                <select id="subject" name="subject" required>
                  <option value="">選択してください</option>
                  <option value="service">サービスについて</option>
                  <option value="event">イベント参加について</option>
                  <option value="collaboration">コラボレーション</option>
                  <option value="media">メディア取材</option>
                  <option value="other">その他</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">メッセージ *</label>
                <textarea id="message" name="message" rows="6" required></textarea>
              </div>

              <button type="submit" className="btn btn-primary">
                送信する
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 