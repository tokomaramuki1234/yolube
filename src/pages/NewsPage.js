import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import '../styles/BasePage.css';
import './NewsPage.css';

const NewsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newsItems, setNewsItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // ★ NEWS API URL（Admin.jsxと同じURL）
  const NEWS_API_URL = 'https://script.google.com/macros/s/AKfycbxZRZSDGyg_Z1rGcuD9xymlMXB4vV3Cz8EVTOWS2GvP-bLKeYcq7q122ixPQKV71Xg6iQ/exec';

  // NEWS データ取得
  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const newsUrl = `${NEWS_API_URL}?action=getPublishedNews`;
        const response = await fetch(newsUrl);
        const result = await response.json();

        if (result.success) {
          setNewsItems(result.data || []);
        } else {
          setError('ニュースの取得に失敗しました');
        }
      } catch (err) {
        console.error('NEWS取得エラー:', err);
        setError('ニュースの取得に失敗しました');
        // フォールバック: エラー時は空配列を表示
        setNewsItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  // 以下はフォールバック用のハードコードデータ（API未設定時のみ使用）
  const fallbackNewsItems = [
    {
      id: 1,
      date: '2025.07.14',
      category: 'イベント',
      title: '秋田ベイパラダイスにてテーブルゲーム交流会：Ke.を開催します',
      description: '7月26日（土）10:00より、秋田市土崎の秋田ベイパラダイスにてテーブルゲーム交流会：Ke.を開催いたします！いつも通り参加費無料、予約不要、途中入退室自由です！',
      content: '秋田ベイパラダイスでの開催は今回で3回目となります。多様なテーブルゲームを用意しており、初めての方でもスタッフが丁寧にルール説明いたしますので、お気軽にご参加ください。当日は飲食の持ち込みも可能です。',
      isNew: true,
      link: '/ke'
    },
    {
      id: 2,
      date: '2025.07.13',
      category: 'お知らせ',
      title: 'YOLUBEオフィシャルウェブサイトをリニューアルしました',
      description: 'より使いやすく、見やすいデザインに生まれ変わりました。今後ともよろしくお願いいたします。',
      content: '今回のリニューアルでは、スマートフォン対応の強化、イベント予約システムの導入、多言語対応など、多くの機能を追加いたしました。引き続き、皆様により良い情報をお届けできるよう努めてまいります。',
      isNew: true
    },
    {
      id: 3,
      date: '2025.07.05',
      category: 'メディア',
      title: '秋田魁新報にYOLUBEの活動が掲載されました',
      description: '地域活性化の取り組みについて取り上げていただきました。',
      content: '秋田県内での地域活性化活動、特にテーブルゲームを通じた世代間交流の取り組みについて、詳細に紹介していただきました。記事では、活動の背景や今後の展開についても触れられています。',
      isNew: false
    },
    {
      id: 4,
      date: '2025.06.28',
      category: 'イベント',
      title: 'みんなの実家門脇家での交流イベントが終了しました',
      description: '多くの方にご参加いただき、ありがとうございました。次回開催もお楽しみに。',
      content: '当日は天候にも恵まれ、幅広い年齢層の方々にご参加いただきました。参加者の皆様からは「新しいゲームとの出会いがあった」「世代を超えて楽しめた」などの感想をいただいております。次回開催については、SNSおよび本サイトにてお知らせいたします。',
      isNew: false
    },
    {
      id: 5,
      date: '2025.06.15',
      category: 'お知らせ',
      title: '企業研修プログラムの提供を開始しました',
      description: 'テーブルゲームを活用したコミュニケーション研修プログラムの提供を開始いたしました。',
      content: 'チームビルディングやコミュニケーション活性化を目的とした企業研修プログラムを開発しました。テーブルゲームの特性を活かし、楽しみながら学べる実践的な内容となっております。詳細はお問い合わせください。',
      isNew: false,
      link: '/training'
    },
    {
      id: 6,
      date: '2025.06.01',
      category: 'イベント',
      title: '秋田市内でテーブルゲーム体験会を開催しました',
      description: '50名以上の方にご参加いただき、盛況のうちに終了いたしました。',
      content: '初心者向けのゲーム説明会から、経験者向けの戦略ゲームまで、多様なプログラムを用意しました。参加者同士の交流も生まれ、新しいコミュニティの形成にもつながりました。',
      isNew: false
    },
    {
      id: 7,
      date: '2025.05.20',
      category: 'メディア',
      title: 'ABS秋田放送「えび☆ステ」に出演しました',
      description: 'YOLUBEの活動について紹介していただきました。',
      content: '放送では、テーブルゲームの魅力や地域活性化への取り組みについて、代表の木村がお話しさせていただきました。放送後、多くの方からお問い合わせをいただき、テーブルゲーム文化への関心の高さを実感しております。',
      isNew: false
    },
    {
      id: 8,
      date: '2025.05.10',
      category: 'お知らせ',
      title: 'YOLUBE設立1周年を迎えました',
      description: '皆様のご支援のおかげで無事1周年を迎えることができました。',
      content: 'この1年間で、延べ500名以上の方にイベントにご参加いただきました。今後も地域に根ざした活動を続け、テーブルゲーム文化の醸成と地域活性化に貢献してまいります。引き続きご支援のほど、よろしくお願いいたします。',
      isNew: false
    }
  ];

  const categories = [
    { value: 'all', label: 'すべて' },
    { value: 'イベント', label: 'イベント' },
    { value: 'お知らせ', label: 'お知らせ' },
    { value: 'メディア', label: 'メディア' }
  ];

  const filteredNews = selectedCategory === 'all'
    ? newsItems
    : newsItems.filter(item => item.category === selectedCategory);

  return (
    <>
      <Helmet>
        <title>新着情報 | YOLUBE</title>
        <meta name="description" content="YOLUBEの最新情報、イベント開催情報、メディア掲載情報などをお届けします。" />
      </Helmet>

      <Header />

      <div className="base-page">
        {/* ページヒーロー */}
        <section className="base-hero">
          <div className="container">
            <h1 className="base-hero-title">新着情報</h1>
          </div>
        </section>

        {/* カテゴリフィルター */}
        <section className="news-filter-section">
          <div className="container">
            <div className="news-filter">
              {categories.map(cat => (
                <button
                  key={cat.value}
                  className={`filter-btn ${selectedCategory === cat.value ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.value)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ニュース一覧 */}
        <section className="news-list-section">
          <div className="container">
            {/* ローディング表示 */}
            {isLoading && (
              <div className="news-loading">
                <div className="news-spinner"></div>
                <p>ニュースを読み込み中...</p>
              </div>
            )}

            {/* エラー表示 */}
            {error && !isLoading && (
              <div className="news-error">
                <p>{error}</p>
                <button onClick={() => window.location.reload()} className="news-reload-btn">
                  再読み込み
                </button>
              </div>
            )}

            {/* ニュース一覧 */}
            {!isLoading && !error && (
              <>
                <div className="news-grid">
                  {filteredNews.map(item => (
                    <article key={item.id} className="news-card">
                      <div className="news-card-header">
                        <time className="news-card-date">{item.date}</time>
                        <div className="news-card-labels">
                          <span className={`news-card-category category-${item.category}`}>
                            {item.category}
                          </span>
                          {item.isNew && <span className="news-card-badge">NEW</span>}
                        </div>
                      </div>

                      <h2 className="news-card-title">{item.title}</h2>
                      <p className="news-card-description">{item.description}</p>
                      <p className="news-card-content">{item.content}</p>

                      {item.link && (
                        <a href={item.link} className="news-card-link">
                          詳しく見る
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </a>
                      )}
                    </article>
                  ))}
                </div>

                {filteredNews.length === 0 && (
                  <div className="news-empty">
                    <p>該当する新着情報はありません</p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>

      <Footer />
      <BackToTop />
    </>
  );
};

export default NewsPage;
