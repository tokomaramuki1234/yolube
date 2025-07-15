import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    // EmailJS設定（実際の値は後で設定）
    const serviceId = 'service_yolube'; // EmailJSサービスID
    const templateId = 'template_contact'; // EmailJSテンプレートID  
    const publicKey = 'YOUR_PUBLIC_KEY'; // EmailJS公開キー

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
    <section id="contact" className="contact section">
      <div className="section-container">
        <h2 className="section-title">お問い合わせ</h2>
        <p className="section-subtitle">
          ご質問やご相談はお気軽にご連絡ください
        </p>

        <div className="contact-content">
          <div className="form-card">
            <h3 className="contact-title">お問い合わせフォーム</h3>
            
            <form ref={form} onSubmit={sendEmail} className="contact-form-content">
              <div className="form-group">
                <label htmlFor="name">お名前 <span className="required">*</span></label>
                <input 
                  type="text" 
                  id="name" 
                  name="user_name" 
                  required 
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">メールアドレス <span className="required">*</span></label>
                <input 
                  type="email" 
                  id="email" 
                  name="user_email" 
                  required 
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">お電話番号</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="user_phone" 
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">お問い合わせ内容 <span className="required">*</span></label>
                <select 
                  id="subject" 
                  name="inquiry_type" 
                  required 
                  disabled={isLoading}
                >
                  <option value="">選択してください</option>
                  <option value="event">テーブルゲーム交流会：Ke.について</option>
                  <option value="collaboration">協同企画について</option>
                  <option value="sponsorship">協賛、後援について</option>
                  <option value="game-development">テーブルゲーム開発について</option>
                  <option value="training">ゲーム研修について</option>
                  <option value="other">その他</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">メッセージ <span className="required">*</span></label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="6" 
                  required 
                  disabled={isLoading}
                ></textarea>
              </div>

              {message && (
                <div className={`form-message ${message.includes('エラー') ? 'error' : 'success'}`}>
                  {message}
                </div>
              )}

              <button 
                type="submit" 
                className={`btn ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? '送信中...' : '送信する'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 