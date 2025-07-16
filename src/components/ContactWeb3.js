import React, { useState, useRef } from 'react';
import './Contact.css';

const ContactWeb3 = () => {
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
      
      // Web3Formsのアクセスキーを追加（後で実際のキーに置き換え）
      formData.append("access_key", "YOUR_WEB3FORMS_ACCESS_KEY");
      
      // 追加設定
      formData.append("subject", `【YOLUBE】お問い合わせ - ${formData.get('inquiry_type')}`);
      formData.append("from_name", "YOLUBE お問い合わせフォーム");
      formData.append("replyto", formData.get('user_email'));

      // Web3Forms APIに送信
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const result = await response.json();
      
      if (result.success) {
        console.log('✅ メール送信成功:', result);
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
              送信されたメッセージは info@yolube.jp に直接送信されます。
            </p>
            
            <form ref={form} onSubmit={handleSubmit} className="contact-form-content">
              {/* ハニーポット（スパム対策） */}
              <input type="checkbox" name="botcheck" className="hidden" style={{display: 'none'}} />
              
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

            {/* 代替連絡手段 */}
            <div className="direct-contact">
              <h4>お急ぎの場合は直接ご連絡ください</h4>
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

export default ContactWeb3; 