import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faUsers, faCalendarAlt, faMapMarkerAlt, faClock, faHeart, faDice } from '@fortawesome/free-solid-svg-icons';
import emailjs from '@emailjs/browser';
import GoogleSheetsService from '../../services/googleSheets';
import './KeLP.css';

const KeLP = () => {
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [eventData, setEventData] = useState({
    eventCount: '第47回',
    date: { month: '3月', day: '8日', weekday: '土' },
    venue: '秋田市民交流プラザALVE'
  });
  const [eventLoading, setEventLoading] = useState(true);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    // EmailJS設定値のチェック
    const serviceId = 'service_yolube';
    const templateId = 'template_ke_contact';  
    const publicKey = 'YOUR_PUBLIC_KEY'; // EmailJS公開キー

    // EmailJSが正しく設定されているかチェック
    if (publicKey === 'YOUR_PUBLIC_KEY') {
      // 開発・テスト用：EmailJS未設定時のシミュレーション
      console.log('📧 Ke.ページ テストモード: EmailJS未設定のため、送信をシミュレートします');
      console.log('フォームデータ:', {
        name: form.current.user_name.value,
        email: form.current.user_email.value,
        message: form.current.message.value
      });
      
      // 2秒後に成功メッセージを表示（実際の送信をシミュレート）
      setTimeout(() => {
        setMessage('✅ テスト送信完了！EmailJS設定後に実際のメール送信が有効になります。');
        form.current.reset();
        setIsLoading(false);
      }, 2000);
      
      return;
    }

    // 本番用：EmailJS実際の送信
    emailjs.sendForm(serviceId, templateId, form.current, publicKey)
      .then((result) => {
        console.log('メール送信成功:', result.text);
        setMessage('お問い合わせを送信いたしました。ありがとうございます！');
        form.current.reset();
      }, (error) => {
        console.log('メール送信エラー:', error.text);
        setMessage('送信中にエラーが発生しました。もう一度お試しください。');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Google Sheetsからイベントデータを取得
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const sheetsService = new GoogleSheetsService();
        const nextEvent = await sheetsService.getNextEventInfo();
        
        if (nextEvent) {
          setEventData({
            eventCount: nextEvent.eventCount,
            date: nextEvent.date,
            venue: nextEvent.venue
          });
        }
      } catch (error) {
        console.error('Failed to fetch event data:', error);
        // エラー時はデフォルト値を使用
      } finally {
        setEventLoading(false);
      }
    };

    fetchEventData();
  }, []);

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
                <div className="ke-description-text">
                  <p>テーブルゲーム交流会：Ke.について</p>
                  <p>テーブルゲーム交流会：Ke.は年齢、世代、立場を問わず遊べる交流会です。</p>
                  <p>「ルールが難しそう...」「ついていけるかな？」そんな心配は無用！経験豊富なスタッフが一からやさしく教えるので、未経験者でも安心して楽しめます。新しい友達づくりや、50代以上の方の新しい趣味探しにもぴったり！３才から９０才まで幅広い年齢層からご参加いただいています。</p>
                  <p>スマホから離れて顔を合わせ、みんなでワイワイ盛り上がってみませんか？普段出会えない世代の方との交流も、ゲームを通して自然と生まれます。頭を使う戦略ゲームから、みんなで笑えるパーティーゲームまで、様々な種類をご用意しています。</p>
                  <p>まずは見学からでもOK！秋田の新しいコミュニティスペースで、心温まる交流のひとときを一緒に過ごしませんか？</p>
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
                  SNSで最新の情報をキャッチ
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
              {eventLoading ? (
                <div className="ke-event-loading">
                  <p>次回イベント情報を読み込み中...</p>
                </div>
              ) : (
                <div className="ke-event-card">
                  <div className="ke-event-date">
                    <span className="ke-month">{eventData.date.month}</span>
                    <span className="ke-day">{eventData.date.day}</span>
                    <span className="ke-weekday">{eventData.date.weekday}</span>
                  </div>
                  <div className="ke-event-details">
                    <h4>{eventData.eventCount} テーブルゲーム交流会：Ke.</h4>
                    <p><FontAwesomeIcon icon={faClock} /> 13:00 - 17:00</p>
                    <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {eventData.venue}</p>
                    <p><FontAwesomeIcon icon={faUsers} /> 参加費：500円</p>
                  </div>
                  <div className="ke-event-status">
                    <span className="ke-status-badge">募集中</span>
                  </div>
                </div>
              )}
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
              <form ref={form} onSubmit={sendEmail} className="ke-form">
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

export default KeLP; 