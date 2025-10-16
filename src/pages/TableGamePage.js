import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faUsers, faLightbulb, faStar, faHeart, faRocket, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import '../styles/BasePage.css';
import './TableGamePage.css';

const TableGamePage = () => {
  return (
    <>
      <Helmet>
        <title>テーブルゲームって何? | YOLUBE</title>
        <meta name="description" content="友達と盛り上がれるテーブルゲームの魅力を紹介!対面で楽しむボードゲーム・カードゲームで、コミュニケーション力もアップ。初心者でも簡単に始められる遊びの世界へようこそ!" />
        <meta property="og:title" content="テーブルゲームって何? | YOLUBE" />
        <meta property="og:description" content="友達と盛り上がれるテーブルゲームの魅力を紹介!" />
        <meta property="og:image" content="https://yolube.jp/images/OGP.png" />
      </Helmet>

      <Header />

      <div className="base-page tablegame-page-fun">
        {/* ヒーローセクション */}
        <section className="tablegame-fun-hero">
          <div className="container">
            <div className="fun-hero-content">
              <div className="fun-hero-emoji">🎲</div>
              <h1 className="fun-hero-title">
                テーブルゲームとは?
              </h1>
              <p className="fun-hero-catch">
                スマホを置いて、友達と顔を見合わせて<br />
                笑いながら遊ぶ。それだけで、とても楽しいです。
              </p>
              <div className="fun-hero-tags">
                <span className="tag">#盛り上がる</span>
                <span className="tag">#新しい友達できる</span>
                <span className="tag">#頭使う</span>
                <span className="tag">#ストレス解消</span>
              </div>
            </div>
          </div>
        </section>

        {/* コンテンツセクション */}
        <section className="base-content">
          <div className="container">
            <div className="base-content-inner">

              {/* テーブルゲームってなに? */}
              <div className="fun-section">
                <div className="fun-section-header">
                  <div className="fun-icon">
                    <FontAwesomeIcon icon={faGamepad} />
                  </div>
                  <h2>テーブルゲームってなに?</h2>
                </div>

                <div className="fun-text-block">
                  <p>
                    <strong>テーブルゲーム</strong>とは、簡単に言えば<br />
                    <span className="highlight-text">「机の上で、みんなで遊ぶゲーム」</span>のことです。
                  </p>
                  <p>
                    ボードゲーム、カードゲーム、パーティーゲーム…呼び方はいろいろありますが、<br />
                    共通しているのは<strong>「友達と直接顔を合わせて、ワイワイ楽しむ」</strong>ということです。
                  </p>
                  <p>
                    スマホゲームも楽しいですが、<br />
                    <strong>画面越しではなく、隣にいる友達の笑顔や反応を見ながら遊ぶ</strong>というのは、<br />
                    全く違う楽しさがあります。
                  </p>
                </div>

                <div className="fun-types-grid">
                  <div className="fun-type-card">
                    <div className="type-emoji">🎴</div>
                    <h3>ボードゲーム</h3>
                    <p>盤面やボードを使って遊ぶゲームです。<br />人生ゲーム、モノポリー、カタンなどがあります。</p>
                  </div>
                  <div className="fun-type-card">
                    <div className="type-emoji">🃏</div>
                    <h3>カードゲーム</h3>
                    <p>カードで遊ぶゲームです。<br />UNO、トランプ、ナナトカなどがあります。</p>
                  </div>
                  <div className="fun-type-card">
                    <div className="type-emoji">🎉</div>
                    <h3>パーティーゲーム</h3>
                    <p>大人数で盛り上がれる軽快なゲームです。<br />ワードウルフ、ジェスチャーなどがあります。</p>
                  </div>
                </div>

                <div className="fun-fact-box">
                  <div className="fact-icon">💡</div>
                  <p>
                    世界中で<strong>20万種類以上</strong>のテーブルゲームがあることをご存知ですか?<br />
                    毎年数千種類の新しいゲームが発売されており、飽きることがありません。
                  </p>
                </div>
              </div>

              {/* なんで楽しいの? */}
              <div className="fun-section">
                <div className="fun-section-header">
                  <div className="fun-icon">
                    <FontAwesomeIcon icon={faStar} />
                  </div>
                  <h2>なんでこんなに楽しいの?</h2>
                </div>

                <div className="fun-reasons-grid">
                  <div className="fun-reason-card">
                    <div className="reason-emoji">😆</div>
                    <h3>とにかく盛り上がる!</h3>
                    <p>
                      「それはやめて!」<br />
                      「勝った!」<br />
                      「本当に?!」<br /><br />
                      こんな会話が自然に生まれ、とても盛り上がります。<br />
                      時間を忘れて没頭できるため、ストレス解消にも最適です。
                    </p>
                    <Link to="/tablegame/detail-effects" className="detail-link">
                      <FontAwesomeIcon icon={faArrowRight} />
                      もっと詳しく(効果の科学)
                    </Link>
                  </div>

                  <div className="fun-reason-card">
                    <div className="reason-emoji">👥</div>
                    <h3>友達との距離が縮まる</h3>
                    <p>
                      初対面でも、ゲームを一緒にやると<br />
                      すぐに打ち解けられます。<br /><br />
                      協力して目標をクリアしたり、<br />
                      お互いの戦略を読み合ったりする中で、<br />
                      相手の性格や考え方が分かり、<br />
                      自然と仲良くなれます。
                    </p>
                    <Link to="/tablegame/detail-features" className="detail-link">
                      <FontAwesomeIcon icon={faArrowRight} />
                      もっと詳しく(特徴の解説)
                    </Link>
                  </div>

                  <div className="fun-reason-card">
                    <div className="reason-emoji">🧠</div>
                    <h3>頭を使うのが楽しい</h3>
                    <p>
                      「この手はどうでしょう?」<br />
                      「次はどうしますか?」<br /><br />
                      戦略を考えたり、相手の動きを予測したり。<br />
                      でも「勉強」とか「難しい」という感じではなく、<br />
                      <strong>楽しみながら自然と頭が回る</strong>感覚です。<br />
                      これがとても心地良いです。
                    </p>
                    <Link to="/tablegame/detail-features" className="detail-link">
                      <FontAwesomeIcon icon={faArrowRight} />
                      もっと詳しく(特徴の解説)
                    </Link>
                  </div>

                  <div className="fun-reason-card">
                    <div className="reason-emoji">🌟</div>
                    <h3>誰でも楽しめる</h3>
                    <p>
                      年齢、性別、経験は関係ありません。<br />
                      初心者でもベテランでも、みんな対等です。<br /><br />
                      「ゲームが上手い」と自慢できますし、<br />
                      「初めてでも勝てた!」という喜びもあります。<br />
                      それぞれの楽しみ方があります。
                    </p>
                    <Link to="/tablegame/detail-features" className="detail-link">
                      <FontAwesomeIcon icon={faArrowRight} />
                      もっと詳しく(特徴の解説)
                    </Link>
                  </div>
                </div>
              </div>

              {/* どこで遊べるの? */}
              <div className="fun-section">
                <div className="fun-section-header">
                  <div className="fun-icon">
                    <FontAwesomeIcon icon={faUsers} />
                  </div>
                  <h2>どこで遊べるの?</h2>
                </div>

                <div className="fun-text-block">
                  <p>
                    「楽しそうだけど、どこで遊べるの?」と思われた方もいるでしょう。<br />
                    実は、意外といろんな場所で遊べます。
                  </p>
                </div>

                <div className="fun-places-grid">
                  <div className="fun-place-card">
                    <div className="place-emoji">🏠</div>
                    <h3>家や友達の家</h3>
                    <p>
                      まずは家で友達と遊ぶのが定番です。<br />
                      UNOやトランプなら、誰でも持っているでしょう。<br />
                      新しいゲームを買ってみるのも楽しいです。
                    </p>
                  </div>

                  <div className="fun-place-card">
                    <div className="place-emoji">☕</div>
                    <h3>ボードゲームカフェ</h3>
                    <p>
                      最近、全国に増えている「ボードゲームカフェ」。<br />
                      何百種類ものゲームが置いてあり、<br />
                      店員さんがルールも教えてくれます。<br />
                      初心者でも安心です。
                    </p>
                  </div>

                  <div className="fun-place-card">
                    <div className="place-emoji">🎓</div>
                    <h3>学校やサークル</h3>
                    <p>
                      大学のサークルや、放課後の友達同士で<br />
                      テーブルゲームを楽しむ人も増えています。<br />
                      新しい友達を作るきっかけにもなります。
                    </p>
                  </div>

                  <div className="fun-place-card">
                    <div className="place-emoji">🌍</div>
                    <h3>イベント・ゲーム会</h3>
                    <p>
                      地域のイベントやゲーム会に参加すれば、<br />
                      初対面の人とも一緒に楽しめます。<br />
                      共通の趣味を持つ仲間に出会えるチャンスです。
                    </p>
                  </div>
                </div>

                <Link to="/tablegame/detail-cases" className="fun-section-link">
                  <FontAwesomeIcon icon={faArrowRight} />
                  いろんな場所での活用事例を見る
                </Link>
              </div>

              {/* 実はすごい効果もある */}
              <div className="fun-section fun-section-benefit">
                <div className="fun-section-header">
                  <div className="fun-icon">
                    <FontAwesomeIcon icon={faRocket} />
                  </div>
                  <h2>実は、すごい効果もあるんだって</h2>
                </div>

                <div className="fun-text-block">
                  <p>
                    「ただ遊んでいるだけ」と思われるかもしれませんが、<br />
                    テーブルゲームには、実は様々な効果があります。
                  </p>
                </div>

                <div className="fun-benefits-grid">
                  <div className="fun-benefit-card">
                    <div className="benefit-emoji">💬</div>
                    <h3>コミュ力アップ</h3>
                    <p>
                      相手の話を聞いたり、<br />
                      自分の考えを伝えたり。<br />
                      自然と会話が生まれるため、<br />
                      コミュニケーション能力が<br />
                      知らないうちに向上しています。
                    </p>
                  </div>

                  <div className="fun-benefit-card">
                    <div className="benefit-emoji">🤝</div>
                    <h3>チームワーク</h3>
                    <p>
                      協力型ゲームでは、<br />
                      「みんなで勝つ」ために<br />
                      役割分担したり、<br />
                      助け合ったりします。<br />
                      これは社会に出ても重要です。
                    </p>
                  </div>

                  <div className="fun-benefit-card">
                    <div className="benefit-emoji">🧩</div>
                    <h3>問題解決能力</h3>
                    <p>
                      「どうすれば勝てるか?」<br />
                      「次の手は?」<br />
                      戦略を考えることで、<br />
                      論理的に考える力が<br />
                      自然と身につきます。
                    </p>
                  </div>

                  <div className="fun-benefit-card">
                    <div className="benefit-emoji">😌</div>
                    <h3>ストレス解消</h3>
                    <p>
                      笑ったり、盛り上がったり。<br />
                      楽しい時間を過ごすだけで、<br />
                      心がリフレッシュされます。<br />
                      勉強や仕事の合間にも最適です。
                    </p>
                  </div>
                </div>

                <div className="fun-cta-box">
                  <h3>もっと詳しく知りたい人へ</h3>
                  <p>
                    「どんな効果があるの?」「なぜそうなるの?」と気になった方は、<br />
                    詳しい解説ページもご用意しています。研究データや事例も掲載していますので、<br />
                    レポートや発表資料にもご活用いただけます。
                  </p>
                  <div className="cta-links-grid">
                    <Link to="/tablegame/detail-features" className="cta-link-btn">
                      <FontAwesomeIcon icon={faStar} />
                      5つの特徴
                    </Link>
                    <Link to="/tablegame/detail-effects" className="cta-link-btn">
                      <FontAwesomeIcon icon={faHeart} />
                      得られる効果
                    </Link>
                    <Link to="/tablegame/detail-economics" className="cta-link-btn">
                      <FontAwesomeIcon icon={faLightbulb} />
                      経済的効果
                    </Link>
                    <Link to="/tablegame/detail-cases" className="cta-link-btn">
                      <FontAwesomeIcon icon={faUsers} />
                      活用事例
                    </Link>
                  </div>
                </div>
              </div>

              {/* 最後のCTA */}
              <div className="fun-final-cta">
                <div className="final-cta-content">
                  <h2>さあ、始めてみましょう!</h2>
                  <p>
                    テーブルゲームの世界は、<br />
                    思っている以上に広く、楽しく、奥が深いです。
                  </p>
                  <p>
                    まずは友達と、家にあるUNOやトランプから始めてみてください。<br />
                    「もっと遊びたい!」と思ったら、<br />
                    ボードゲームカフェに行ってみたり、新しいゲームを買ってみましょう。
                  </p>
                  <p className="final-cta-message">
                    <strong>スマホを置いて、友達の顔を見て、笑いましょう。</strong><br />
                    それだけで、今日がもっと楽しくなります。
                  </p>
                  <div className="final-cta-buttons">
                    <a href="/training" className="final-cta-btn primary">
                      <FontAwesomeIcon icon={faRocket} />
                      企業研修プログラムを見る
                    </a>
                    <a href="/#contact" className="final-cta-btn secondary">
                      <FontAwesomeIcon icon={faUsers} />
                      お問い合わせ
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>

      <Footer />
      <BackToTop />
    </>
  );
};

export default TableGamePage;
