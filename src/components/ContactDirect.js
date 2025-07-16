import React, { useState, useRef } from 'react';
import './Contact.css';

const ContactDirect = () => {
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(form.current);
    
    const name = formData.get('user_name');
    const email = formData.get('user_email');
    const phone = formData.get('user_phone');
    const inquiryType = formData.get('inquiry_type');
    const messageText = formData.get('message');

    // メール件名と本文を構築
    const subject = `【YOLUBE】お問い合わせ - ${inquiryType} (${name}様より)`;
    const body = `
YOLUBEお問い合わせフォームからのメッセージです。

■ お客様情報
お名前: ${name}
メールアドレス: ${email}
電話番号: ${phone || '未入力'}
お問い合わせ種別: ${inquiryType}

■ メッセージ内容
${messageText}

---
※このメールは自動生成されました。
送信者: ${name} <${email}>
`;

    // mailto:リンクを生成
    const mailtoUrl = `mailto:info@yolube.jp?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // ユーザーに説明を表示
    setMessage('メールソフトが開きます。送信ボタンを押してお問い合わせを完了してください。');
    
    // メールソフトを開く
    setTimeout(() => {
      window.location.href = mailtoUrl;
      setIsLoading(false);
      
      // フォームをリセット
      setTimeout(() => {
        form.current.reset();
        setMessage('');
      }, 3000);
    }, 1000);
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
            <p className="form-description">
              フォーム送信時にお使いのメールソフトが開きます。
            </p>
            
            <form ref={form} onSubmit={handleSubmit} className="contact-form-content">
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
                  <option value="テーブルゲーム交流会：Ke.について">テーブルゲーム交流会：Ke.について</option>
                  <option value="協同企画について">協同企画について</option>
                  <option value="協賛、後援について">協賛、後援について</option>
                  <option value="テーブルゲーム開発について">テーブルゲーム開発について</option>
                  <option value="ゲーム研修について">ゲーム研修について</option>
                  <option value="その他">その他</option>
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
                <div className="form-message success">
                  {message}
                </div>
              )}

              <button 
                type="submit" 
                className={`btn ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'メールソフトを開いています...' : 'メールソフトで送信'}
              </button>
            </form>

            {/* 直接連絡先 */}
            <div className="direct-contact">
              <h4>または直接ご連絡ください</h4>
              <div className="contact-methods">
                <div className="contact-method">
                  <strong>📧 メール:</strong>
                  <a href="mailto:info@yolube.jp">info@yolube.jp</a>
                </div>
                <div className="contact-method">
                  <strong>📞 電話:</strong>
                  <a href="tel:090-2841-3926">090-2841-3926</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactDirect; 