import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faUsers, faCalendarAlt, faMapMarkerAlt, faClock, faHeart, faDice, faBuilding, faChartLine, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import emailjs from '@emailjs/browser';
import './Training.css';

const Training = () => {
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    // EmailJS設定値のチェック
    const serviceId = 'service_yolube';
    const templateId = 'template_training_contact';  
    const publicKey = 'YOUR_PUBLIC_KEY'; // EmailJS公開キー

    // EmailJSが正しく設定されているかチェック
    if (publicKey === 'YOUR_PUBLIC_KEY') {
      // 開発・テスト用：EmailJS未設定時のシミュレーション
      console.log('📧 Training研修 テストモード: EmailJS未設定のため、送信をシミュレートします');
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

  return (
    <div className="ke-lp">
      {/* Header */}
      <header className="ke-header">
        <div className="ke-header-container">
          <div className="ke-logo">
            <img src="/images/YOLUBE_logo.png" alt="YOLUBE" />
          </div>
          <nav className="ke-nav">
            <a href="#about">研修について</a>
            <a href="#schedule">お悩み・解決策</a>
            <a href="#access">研修プログラム</a>
            <a href="#contact">お申し込み</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="ke-hero">
        <div className="ke-hero-bg">
          <div className="ke-hero-content">
            <div className="ke-hero-text">
              <div className="hero-badge">現在モニター様募集中！</div>
              <h1 className="ke-title">
                <span className="ke-title-main">社内コミュニケーション、</span>
                <span className="ke-title-sub">遊びながら強化しませんか？</span>
              </h1>
              <p className="ke-subtitle">
                対話が生まれる。組織が変わる。<br />
                TABLE GAME × コミュニケーション研修
              </p>
              <div className="ke-hero-stats">
                <div className="ke-description-text">
                  <p>テーブルゲームコミュニケーション研修について</p>
                  <p>テーブルゲームが様々な形のコミュニケーション機会をご提供。楽しみながら共通体験を得るため、参加者同士のなかで自然な結束が生まれます。</p>
                  <p>また、組織の中で「話しかけやすい雰囲気」を創り、経営陣が求めている現場の声を拾いやすくします。ゲームを通じて社員の意外な一面を垣間見ることも出来、エンゲージメント向上やリスキリング機会提供のきっかけ作りにも最適です。</p>
                  <p>組織内コミュニケーション不足による情報共有の遅れ、部署間連携の問題、新入社員の不安などの課題を、テーブルゲームの力で解決します。</p>
                  <p>まずはモニター研修からでもOK！企業様のニーズに合わせたカスタマイズ研修で、組織の結束力向上を一緒に実現しませんか？</p>
                </div>
                <div className="ke-stat">
                  <FontAwesomeIcon icon={faBuilding} />
                  <span>企業研修<strong>実績多数</strong></span>
                </div>
              </div>
              <div className="ke-hero-buttons">
                <a href="#contact" className="ke-btn ke-btn-primary">
                  <FontAwesomeIcon icon={faGamepad} />
                  研修プログラムに申し込む
                </a>
                <a href="#about" className="ke-btn ke-btn-outline">
                  研修資料をダウンロード
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
          <h2 className="ke-section-title">こんなお悩みありませんか？</h2>
          <div className="ke-about-content">
            <div className="ke-about-text">
              <p className="ke-about-lead">
                組織内のコミュニケーション課題は多くの企業が抱える共通の問題です。
                これらの課題がビジネスに与える影響は計り知れません。
              </p>
              <div className="ke-features">
                <div className="ke-feature">
                  <div className="ke-feature-icon">
                    <FontAwesomeIcon icon={faUsers} />
                  </div>
                  <div className="ke-feature-content">
                    <h3>話しかける人が固定化している</h3>
                    <p>組織内で一部の人だけがコミュニケーションをするため、重要な情報が全体に共有されない</p>
                  </div>
                </div>
                <div className="ke-feature">
                  <div className="ke-feature-icon">
                    <FontAwesomeIcon icon={faBuilding} />
                  </div>
                  <div className="ke-feature-content">
                    <h3>部署間の情報共有が欠けている</h3>
                    <p>関連部署とのコミュニケーション不足で予期せぬトラブルが発生</p>
                  </div>
                </div>
                <div className="ke-feature">
                  <div className="ke-feature-icon">
                    <FontAwesomeIcon icon={faHeart} />
                  </div>
                  <div className="ke-feature-content">
                    <h3>新入社員が不安を感じる</h3>
                    <p>コミュニケーション不足により上司/同僚/組織の全体像が見えない</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section - 問題の影響 */}
      <section id="schedule" className="ke-schedule">
        <div className="ke-container">
          <h2 className="ke-section-title">これらの問題が引き起こすこと</h2>
          <div className="ke-schedule-content">
            <div className="ke-schedule-info">
              <div className="ke-schedule-item">
                <FontAwesomeIcon icon={faChartLine} />
                <div>
                  <h3>スピード低下</h3>
                  <p>社内の情報が遅回りすることによる業務効率の悪化</p>
                </div>
              </div>
              <div className="ke-schedule-item">
                <FontAwesomeIcon icon={faHeart} />
                <div>
                  <h3>離職率上昇</h3>
                  <p>人間関係の悪化による従業員の離職率増加</p>
                </div>
              </div>
              <div className="ke-schedule-item">
                <FontAwesomeIcon icon={faBuilding} />
                <div>
                  <h3>組織体質の悪化</h3>
                  <p>受動的・他責的な組織体質への変化</p>
                </div>
              </div>
            </div>
            <div className="ke-next-event">
              <h3>そのお悩み、テーブルゲームで支援いたします！</h3>
              <div className="ke-event-card">
                <div className="ke-event-date">
                  <span className="ke-month">解決</span>
                  <span className="ke-day">策</span>
                  <span className="ke-weekday">提案</span>
                </div>
                <div className="ke-event-details">
                  <h4>TABLE GAME コミュニケーション研修</h4>
                  <p><FontAwesomeIcon icon={faGamepad} /> 楽しみながら学習</p>
                  <p><FontAwesomeIcon icon={faLightbulb} /> 話しかけやすい雰囲気作り</p>
                  <p><FontAwesomeIcon icon={faUsers} /> 自然な結束の形成</p>
                </div>
                <div className="ke-event-status">
                  <span className="ke-status-badge">モニター募集中</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section - 研修の特徴 */}
      <section className="ke-gallery">
        <div className="ke-container">
          <h2 className="ke-section-title">研修プログラムの特徴</h2>
          <div className="ke-gallery-grid">
            <div className="ke-gallery-item">
              <div className="ke-gallery-placeholder">
                <FontAwesomeIcon icon={faGamepad} />
                <span>楽しみながら学習</span>
              </div>
            </div>
            <div className="ke-gallery-item">
              <div className="ke-gallery-placeholder">
                <FontAwesomeIcon icon={faLightbulb} />
                <span>話しかけやすい雰囲気作り</span>
              </div>
            </div>
            <div className="ke-gallery-item">
              <div className="ke-gallery-placeholder">
                <FontAwesomeIcon icon={faUsers} />
                <span>新たな発見</span>
              </div>
            </div>
            <div className="ke-gallery-item">
              <div className="ke-gallery-placeholder">
                <FontAwesomeIcon icon={faChartLine} />
                <span>エンゲージメント向上</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Access Section - モニター募集 */}
      <section id="access" className="ke-access">
        <div className="ke-container">
          <h2 className="ke-section-title">ただいまモニター様を募集中！</h2>
          <div className="ke-access-content">
            <div className="ke-access-info">
              <h3>研修プログラム詳細資料</h3>
              <div className="ke-access-item">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <div>
                  <h4>研修資料ダウンロード</h4>
                  <p><a href="/docs/PDF/trainingv1.1.pdf" target="_blank" rel="noopener noreferrer">trainingv1.1.pdf</a></p>
                </div>
              </div>
              <div className="ke-access-item">
                <FontAwesomeIcon icon={faCalendarAlt} />
                <div>
                  <h4>モニター特典</h4>
                  <p>✓ 特別価格でのご提供</p>
                  <p>✓ カスタマイズ対応可能</p>
                  <p>✓ 詳細なフィードバック</p>
                </div>
              </div>
            </div>
            <div className="ke-map-placeholder">
              <FontAwesomeIcon icon={faBuilding} />
              <span>企業研修</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="ke-contact">
        <div className="ke-container">
          <h2 className="ke-section-title">研修のお申し込み・お問い合わせ</h2>
          <div className="ke-contact-content">
            <div className="ke-contact-info">
              <h3>研修申し込み</h3>
              <p>研修プログラムについてのご質問や、お申し込みはお気軽にお問い合わせください。貴社のニーズに合わせたカスタマイズも承ります。</p>
              <div className="ke-contact-details">
                <div className="ke-contact-item">
                  <FontAwesomeIcon icon={faUsers} />
                  <div>
                    <h4>対象</h4>
                    <p>企業・団体・組織</p>
                  </div>
                </div>
                <div className="ke-contact-item">
                  <FontAwesomeIcon icon={faGamepad} />
                  <div>
                    <h4>形式</h4>
                    <p>オンサイト研修・オンライン研修</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="ke-contact-form">
              <h3>お問い合わせ</h3>
              <form ref={form} onSubmit={sendEmail} className="ke-form">
                <div className="ke-form-group">
                  <label>会社名・団体名</label>
                  <input 
                    type="text" 
                    name="company_name" 
                    placeholder="株式会社○○" 
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="ke-form-group">
                  <label>ご担当者名</label>
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
                    placeholder="example@company.com" 
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="ke-form-group">
                  <label>お問い合わせ内容</label>
                  <textarea 
                    rows="4" 
                    name="message" 
                    placeholder="研修についてのご質問や、組織の課題についてお聞かせください"
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
              <p>TABLE GAME コミュニケーション研修は、企業の組織課題解決を目指す研修プログラムです。</p>
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

export default Training;