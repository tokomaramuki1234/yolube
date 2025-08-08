import React, { useState, useRef } from 'react';
import './Contact.css';

const Contact = () => {
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // GAS WebアプリのURL
    const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwGhOV6W4DoMTK9Zagbdjqq0KVx0KVThPqFtIzbFG__fine1Kez4_EmO7G9TwMiYrIGbg/exec';

    // HTMLフォーム送信でCORS回避
    const hiddenForm = document.createElement('form');
    hiddenForm.method = 'POST';
    hiddenForm.action = GAS_WEB_APP_URL;
    hiddenForm.target = '_blank'; // 新しいタブで結果ページを開く

    // フォームデータを追加
    const formData = {
      formType: 'home',
      user_name: form.current.user_name.value,
      user_email: form.current.user_email.value,
      user_phone: form.current.user_phone.value,
      inquiry_type: form.current.inquiry_type.value,
      message: form.current.message.value
    };

    Object.keys(formData).forEach(key => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = formData[key] || '';
      hiddenForm.appendChild(input);
    });

    // フォームを送信
    document.body.appendChild(hiddenForm);
    hiddenForm.submit();
    document.body.removeChild(hiddenForm);

    // ユーザーフィードバック
    setMessage('お問い合わせを送信いたしました。確認画面が新しいタブで開きます。自動返信メールをご確認ください。');
    form.current.reset();
    setIsLoading(false);
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
                  <option value="training">コミュニケーション研修について</option>
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