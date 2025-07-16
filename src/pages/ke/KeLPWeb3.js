import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faUsers, faCalendarAlt, faMapMarkerAlt, faClock, faHeart, faDice } from '@fortawesome/free-solid-svg-icons';
import './KeLP.css';

const KeLPWeb3 = () => {
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      // フォームデータを準備
      const formData = new FormData(form.current);
      
      // Web3Formsのアクセスキーを追加
      formData.append("access_key", "YOUR_WEB3FORMS_ACCESS_KEY");
      
      // 追加設定（Ke.ページ用）
      formData.append("subject", "【YOLUBE】テーブルゲーム交流会：Ke. お問い合わせ");
      formData.append("from_name", "テーブルゲーム交流会：Ke. お問い合わせフォーム");
      formData.append("replyto", formData.get('user_email'));

      // Web3Forms APIに送信
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const result = await response.json();
      
      if (result.success) {
        console.log('✅ Ke.ページ メール送信成功:', result);
        setMessage('お問い合わせを送信いたしました。ありがとうございます！');
        form.current.reset();
      } else {
        console.error('❌ Web3Forms エラー:', result);
        setMessage('送信中にエラーが発生しました。もう一度お試しください。');
      }
    } catch (error) {
      console.error('❌ 送信エラー:', error);
      setMessage('送信中にエラーが発生しました。もう一度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ke-lp">
      {/* Header */}
      <header className="ke-header">
        <div className="ke-header-container">
          <div className="ke-logo">
            <img src="/images/YOLUBE_logo.png" alt="YOLUBE" />
          </div>
          <nav className="ke-nav">
            <a href="#about">イベントについて</a>
            <a href="#schedule">開催スケジュール</a>
            <a href="#access">アクセス</a>
            <a href="#contact">お申し込み</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="ke-hero">
        <div className="ke-hero-bg">
          <div className="ke-hero-content">
            <div className="ke-hero-text">
              <h1 className="ke-title">
                <span className="ke-title-main">テーブルゲーム交流会</span>
                <span className="ke-title-sub">：Ke.</span>
              </h1>
              <p className="ke-subtitle">
                遊びを通じて、新しい出会いとつながりを<br />
                秋田で楽しむテーブルゲームコミュニティ
              </p>
              <div className="ke-hero-stats">
                <div className="ke-stat">
                  <FontAwesomeIcon icon={faUsers} />
                  <span>累計参加者<strong>1000名+</strong></span>
                </div>
                <div className="ke-stat">
                  <FontAwesomeIcon icon={faCalendarAlt} />
                  <span>開催実績<strong>2年間</strong></span>
                </div>
              </div>
              <div className="ke-hero-buttons">
                <a href="#contact" className="ke-btn ke-btn-primary">
                  <FontAwesomeIcon icon={faGamepad} />
                  次回イベントに参加する
                </a>
                <a href="#about" className="ke-btn ke-btn-outline">
                  イベントについて詳しく
                </a>
              </div>
            </div>
            <div className="ke-hero-image">
              <div className="ke-game-cards">
                <div className="ke-card ke-card-1">
                  <FontAwesomeIcon icon={faDice} />
                </div>
                <div className="ke-card ke-card-2">
                  <FontAwesomeIcon icon={faUsers} />
                </div>
                <div className="ke-card ke-card-3">
                  <FontAwesomeIcon icon={faHeart} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="ke-about">
        <div className="ke-container">
          <h2 className="ke-section-title">テーブルゲーム交流会：Ke.とは？</h2>
          <div className="ke-about-content">
            <div className="ke-about-text">
              <p className="ke-about-lead">
                「Ke.」は秋田県で開催されているテーブルゲーム交流イベントです。
                年齢や職業を問わず、誰でも気軽に参加できるアットホームな雰囲気が自慢です。
              </p>
              <div className="ke-features">
                <div className="ke-feature">
                  <div className="ke-feature-icon">
                    <FontAwesomeIcon icon={faUsers} />
                  </div>
                  <div className="ke-feature-content">
                    <h3>初心者大歓迎</h3>
                    <p>テーブルゲームが初めての方でも、経験豊富なスタッフがルールを丁寧に説明します。</p>
                  </div>
                </div>
                <div className="ke-feature">
                  <div className="ke-feature-icon">
                    <FontAwesomeIcon icon={faHeart} />
                  </div>
                  <div className="ke-feature-content">
                    <h3>新しい出会い</h3>
                    <p>様々な年代・職業の方が参加されており、自然な形で新しい友達ができます。</p>
                  </div>
                </div>
                <div className="ke-feature">
                  <div className="ke-feature-icon">
                    <FontAwesomeIcon icon={faGamepad} />
                  </div>
                  <div className="ke-feature-content">
                    <h3>豊富なゲーム</h3>
                    <p>定番から最新作まで、50種類以上のテーブルゲームをご用意しています。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="ke-schedule">
        <div className="ke-container">
          <h2 className="ke-section-title">開催スケジュール</h2>
          <div className="ke-schedule-content">
            <div className="ke-schedule-info">
              <div className="ke-schedule-item">
                <FontAwesomeIcon icon={faCalendarAlt} />
                <div>
                  <h3>開催頻度</h3>
                  <p>月2回（第2・第4土曜日）</p>
                </div>
              </div>
              <div className="ke-schedule-item">
                <FontAwesomeIcon icon={faClock} />
                <div>
                  <h3>開催時間</h3>
                  <p>13:00 - 17:00（4時間）</p>
                </div>
              </div>
              <div className="ke-schedule-item">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <div>
                  <h3>会場</h3>
                  <p>秋田市内コミュニティセンター</p>
                </div>
              </div>
            </div>
            <div className="ke-next-event">
              <h3>次回開催予定</h3>
              <div className="ke-event-card">
                <div className="ke-event-date">
                  <span className="ke-month">3月</span>
                  <span className="ke-day">8日</span>
                  <span className="ke-weekday">土</span>
                </div>
                <div className="ke-event-details">
                  <h4>第47回 テーブルゲーム交流会：Ke.</h4>
                  <p><FontAwesomeIcon icon={faClock} /> 13:00 - 17:00</p>
                  <p><FontAwesomeIcon icon={faMapMarkerAlt} /> 秋田市民交流プラザALVE</p>
                  <p><FontAwesomeIcon icon={faUsers} /> 参加費：500円</p>
                </div>
                <div className="ke-event-status">
                  <span className="ke-status-badge">募集中</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="ke-gallery">
        <div className="ke-container">
          <h2 className="ke-section-title">イベントの様子</h2>
          <div className="ke-gallery-grid">
            <div className="ke-gallery-item">
              <div className="ke-gallery-placeholder">
                <FontAwesomeIcon icon={faUsers} />
                <span>参加者同士の交流</span>
              </div>
            </div>
            <div className="ke-gallery-item">
              <div className="ke-gallery-placeholder">
                <FontAwesomeIcon icon={faGamepad} />
                <span>ゲームプレイ中</span>
              </div>
            </div>
            <div className="ke-gallery-item">
              <div className="ke-gallery-placeholder">
                <FontAwesomeIcon icon={faHeart} />
                <span>笑顔あふれる会場</span>
              </div>
            </div>
            <div className="ke-gallery-item">
              <div className="ke-gallery-placeholder">
                <FontAwesomeIcon icon={faDice} />
                <span>豊富なゲーム</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Access Section */}
      <section id="access" className="ke-access">
        <div className="ke-container">
          <h2 className="ke-section-title">アクセス</h2>
          <div className="ke-access-content">
            <div className="ke-access-info">
              <h3>秋田市民交流プラザALVE</h3>
              <div className="ke-access-item">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <div>
                  <h4>住所</h4>
                  <p>〒010-0001 秋田県秋田市東通仲町4-1</p>
                </div>
              </div>
              <div className="ke-access-item">
                <FontAwesomeIcon icon={faCalendarAlt} />
                <div>
                  <h4>アクセス</h4>
                  <p>JR秋田駅東口より徒歩2分</p>
                  <p>駐車場：ALVE駐車場をご利用ください</p>
                </div>
              </div>
            </div>
            <div className="ke-map-placeholder">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <span>マップ</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="ke-contact">
        <div className="ke-container">
          <h2 className="ke-section-title">お申し込み・お問い合わせ</h2>
          <div className="ke-contact-content">
            <div className="ke-contact-info">
              <h3>参加申し込み</h3>
              <p>事前申し込みは不要です。当日会場に直接お越しください。</p>
              <div className="ke-contact-details">
                <div className="ke-contact-item">
                  <FontAwesomeIcon icon={faUsers} />
                  <div>
                    <h4>参加費</h4>
                    <p>500円（飲み物・お菓子付き）</p>
                  </div>
                </div>
                <div className="ke-contact-item">
                  <FontAwesomeIcon icon={faGamepad} />
                  <div>
                    <h4>持ち物</h4>
                    <p>特になし（手ぶらでOK）</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="ke-contact-form">
              <h3>お問い合わせ</h3>
              <p className="form-description">
                送信されたメッセージは info@yolube.jp に直接送信されます。
              </p>
              <form ref={form} onSubmit={handleSubmit} className="ke-form">
                {/* ハニーポット（スパム対策） */}
                <input type="checkbox" name="botcheck" className="hidden" style={{display: 'none'}} />
                
                <div className="ke-form-group">
                  <label>お名前</label>
                  <input 
                    type="text" 
                    name="user_name" 
                    placeholder="山田 太郎" 
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="ke-form-group">
                  <label>メールアドレス</label>
                  <input 
                    type="email" 
                    name="user_email" 
                    placeholder="example@email.com" 
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="ke-form-group">
                  <label>お問い合わせ内容</label>
                  <textarea 
                    rows="4" 
                    name="message" 
                    placeholder="ご質問やご相談をお気軽にお聞かせください"
                    required
                    disabled={isLoading}
                  ></textarea>
                </div>
                
                {message && (
                  <div className={`ke-form-message ${message.includes('エラー') ? 'error' : 'success'}`}>
                    {message}
                  </div>
                )}

                <button 
                  type="submit" 
                  className={`ke-btn ke-btn-primary ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? '送信中...' : '送信する'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="ke-footer">
        <div className="ke-container">
          <div className="ke-footer-content">
            <div className="ke-footer-logo">
              <img src="/images/YOLUBE_logo.png" alt="YOLUBE" />
            </div>
            <div className="ke-footer-text">
              <p>主催：YOLUBE（ヨルベ）</p>
              <p>テーブルゲーム交流会：Ke.は、秋田県のテーブルゲームコミュニティ発展を目指す取り組みです。</p>
            </div>
          </div>
          <div className="ke-footer-bottom">
            <p>&copy; 2025 YOLUBE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default KeLPWeb3; 