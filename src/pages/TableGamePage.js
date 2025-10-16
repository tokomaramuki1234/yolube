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
                テーブルゲームって<br />
                知ってる?
              </h1>
              <p className="fun-hero-catch">
                スマホを置いて、友達と顔を見合わせて<br />
                笑いながら遊ぶ。それだけで、めっちゃ楽しい。
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
                    <strong>テーブルゲーム</strong>っていうのは、簡単に言えば<br />
                    <span className="highlight-text">「机の上で、みんなで遊ぶゲーム」</span>のこと!
                  </p>
                  <p>
                    ボードゲーム、カードゲーム、パーティーゲーム…呼び方はいろいろあるけど、<br />
                    共通してるのは<strong>「友達と直接顔を合わせて、ワイワイ楽しむ」</strong>ってこと。
                  </p>
                  <p>
                    スマホゲームも楽しいけど、<br />
                    <strong>画面越しじゃなくて、隣にいる友達の笑顔や反応を見ながら遊ぶ</strong>って、<br />
                    全然違う楽しさがあるんだよね。
                  </p>
                </div>

                <div className="fun-types-grid">
                  <div className="fun-type-card">
                    <div className="type-emoji">🎴</div>
                    <h3>ボードゲーム</h3>
                    <p>盤面やボードを使って遊ぶゲーム。<br />人生ゲーム、モノポリー、カタンとか!</p>
                  </div>
                  <div className="fun-type-card">
                    <div className="type-emoji">🃏</div>
                    <h3>カードゲーム</h3>
                    <p>カードで遊ぶゲーム。<br />UNO、トランプ、ナナトカとか!</p>
                  </div>
                  <div className="fun-type-card">
                    <div className="type-emoji">🎉</div>
                    <h3>パーティーゲーム</h3>
                    <p>大人数で盛り上がれる軽快なゲーム。<br />ワードウルフ、ジェスチャーとか!</p>
                  </div>
                </div>

                <div className="fun-fact-box">
                  <div className="fact-icon">💡</div>
                  <p>
                    世界中で<strong>20万種類以上</strong>のテーブルゲームがあるって知ってた?<br />
                    毎年数千種類の新しいゲームが発売されてて、絶対に飽きないよ!
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
                      「うわ、それやめてー!」<br />
                      「よっしゃ、勝った!」<br />
                      「マジで?!(笑)」<br /><br />
                      こんな会話が自然に生まれて、めっちゃ笑える。<br />
                      時間を忘れて没頭できるから、ストレス解消にも最高!
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
                      すぐに打ち解けられる。<br /><br />
                      協力して目標をクリアしたり、<br />
                      お互いの戦略を読み合ったりする中で、<br />
                      「この人ってこういう性格なんだ」って分かって、<br />
                      自然と仲良くなれるんだよね。
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
                      「この手、どうかな?」<br />
                      「次どうする?」<br /><br />
                      戦略を考えたり、相手の動きを予測したり。<br />
                      でも「勉強」とか「難しい」って感じじゃなくて、<br />
                      <strong>楽しみながら自然と頭が回る</strong>感じ。<br />
                      これが気持ちいい!
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
                      年齢、性別、経験、全然関係ない。<br />
                      初心者でもベテランでも、みんな対等。<br /><br />
                      「ゲームが上手い」って自慢できるし、<br />
                      「初めてでも勝てた!」って喜びもある。<br />
                      それぞれの楽しみ方があるんだ。
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
                    「楽しそうだけど、どこで遊べるの?」って思ったよね。<br />
                    実は、意外といろんな場所で遊べるよ!
                  </p>
                </div>

                <div className="fun-places-grid">
                  <div className="fun-place-card">
                    <div className="place-emoji">🏠</div>
                    <h3>家や友達の家</h3>
                    <p>
                      まずは家で友達と遊ぶのが定番!<br />
                      UNOやトランプなら、誰でも持ってるはず。<br />
                      新しいゲームを買ってみるのも楽しいよ。
                    </p>
                  </div>

                  <div className="fun-place-card">
                    <div className="place-emoji">☕</div>
                    <h3>ボードゲームカフェ</h3>
                    <p>
                      最近、全国に増えてる「ボードゲームカフェ」。<br />
                      何百種類ものゲームが置いてあって、<br />
                      店員さんがルールも教えてくれる!<br />
                      初心者でも安心。
                    </p>
                  </div>

                  <div className="fun-place-card">
                    <div className="place-emoji">🎓</div>
                    <h3>学校やサークル</h3>
                    <p>
                      大学のサークルや、放課後の友達同士で<br />
                      テーブルゲームを楽しむ人も増えてる!<br />
                      新しい友達を作るきっかけにもなるよ。
                    </p>
                  </div>

                  <div className="fun-place-card">
                    <div className="place-emoji">🌍</div>
                    <h3>イベント・ゲーム会</h3>
                    <p>
                      地域のイベントやゲーム会に参加すれば、<br />
                      初対面の人とも一緒に楽しめる。<br />
                      共通の趣味を持つ仲間に出会えるチャンス!
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
                    「ただ遊んでるだけ」って思うかもしれないけど、<br />
                    テーブルゲームって、実はめっちゃいろんな効果があるらしい。
                  </p>
                </div>

                <div className="fun-benefits-grid">
                  <div className="fun-benefit-card">
                    <div className="benefit-emoji">💬</div>
                    <h3>コミュ力アップ</h3>
                    <p>
                      相手の話を聞いたり、<br />
                      自分の考えを伝えたり。<br />
                      自然と会話が生まれるから、<br />
                      コミュニケーション能力が<br />
                      知らないうちに上がってる。
                    </p>
                  </div>

                  <div className="fun-benefit-card">
                    <div className="benefit-emoji">🤝</div>
                    <h3>チームワーク</h3>
                    <p>
                      協力型ゲームでは、<br />
                      「みんなで勝つ」ために<br />
                      役割分担したり、<br />
                      助け合ったり。<br />
                      これって社会に出ても超大事。
                    </p>
                  </div>

                  <div className="fun-benefit-card">
                    <div className="benefit-emoji">🧩</div>
                    <h3>問題解決能力</h3>
                    <p>
                      「どうすれば勝てる?」<br />
                      「次の手は?」<br />
                      戦略を考えることで、<br />
                      論理的に考える力が<br />
                      自然と身につく。
                    </p>
                  </div>

                  <div className="fun-benefit-card">
                    <div className="benefit-emoji">😌</div>
                    <h3>ストレス解消</h3>
                    <p>
                      笑ったり、盛り上がったり。<br />
                      楽しい時間を過ごすだけで、<br />
                      心がリフレッシュされる。<br />
                      勉強や仕事の合間にも最適!
                    </p>
                  </div>
                </div>

                <div className="fun-cta-box">
                  <h3>もっと詳しく知りたい人へ</h3>
                  <p>
                    「どんな効果があるの?」「なんでそうなるの?」って気になったら、<br />
                    詳しい解説ページもあるよ。研究データや事例も載ってるから、<br />
                    レポートや発表資料にも使えるかも!
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
                  <h2>さあ、始めてみよう!</h2>
                  <p>
                    テーブルゲームの世界は、<br />
                    思ってる以上に広くて、楽しくて、奥が深い。
                  </p>
                  <p>
                    まずは友達と、家にあるUNOやトランプから始めてみて。<br />
                    それで「もっと遊びたい!」って思ったら、<br />
                    ボードゲームカフェに行ってみたり、新しいゲームを買ってみよう!
                  </p>
                  <p className="final-cta-message">
                    <strong>スマホを置いて、友達の顔を見て、笑おう。</strong><br />
                    それだけで、今日がもっと楽しくなるから。
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
