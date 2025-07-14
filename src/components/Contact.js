import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faBuilding, faUser, faMapMarkerAlt, faHome, faBullseye } from '@fortawesome/free-solid-svg-icons';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact section">
      <div className="section-container">
        <h2 className="section-title">お問い合わせ</h2>
        <p className="section-subtitle">
          ご質問やご相談はお気軽にご連絡ください
        </p>

        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-card">
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

            <div className="location-card">
              <h3 className="contact-title">活動エリア</h3>
              
              <div className="locations">
                <div className="location-item">
                  <div className="location-icon">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                  </div>
                  <div className="location-name">秋田県秋田市</div>
                </div>
                
                <div className="location-item">
                  <div className="location-icon">
                    <FontAwesomeIcon icon={faHome} />
                  </div>
                  <div className="location-name">秋田県内全域</div>
                </div>
                
                <div className="location-item">
                  <div className="location-icon">
                    <FontAwesomeIcon icon={faBullseye} />
                  </div>
                  <div className="location-name">その他地域（要相談）</div>
                </div>
              </div>
            </div>
          </div>

          <div className="form-card">
            <h3 className="contact-title">お問い合わせフォーム</h3>
            
            <form className="contact-form-content">
              <div className="form-group">
                <label htmlFor="name">お名前 <span className="required">*</span></label>
                <input type="text" id="name" name="name" required />
              </div>

              <div className="form-group">
                <label htmlFor="email">メールアドレス <span className="required">*</span></label>
                <input type="email" id="email" name="email" required />
              </div>

              <div className="form-group">
                <label htmlFor="phone">お電話番号</label>
                <input type="tel" id="phone" name="phone" />
              </div>

              <div className="form-group">
                <label htmlFor="subject">お問い合わせ内容 <span className="required">*</span></label>
                <select id="subject" name="subject" required>
                  <option value="">選択してください</option>
                  <option value="event">イベント開催について</option>
                  <option value="collaboration">コラボレーションについて</option>
                  <option value="game-development">ゲーム開発について</option>
                  <option value="training">研修について</option>
                  <option value="other">その他</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">メッセージ <span className="required">*</span></label>
                <textarea id="message" name="message" rows="6" required></textarea>
              </div>

              <button type="submit" className="btn">送信する</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 