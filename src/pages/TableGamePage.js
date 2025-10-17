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
                スマホを置いて、遊び相手と顔を見合わせる。<br />
                ともに悩み、ともにドキドキし、ともに笑顔になる。<br />
                そんな素敵な時間を提供してくれるのが、<br />
                <strong>テーブルゲーム</strong>です。
              </p>
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
                  <h2>テーブルゲームってなに?</h2>
                </div>

                <div className="fun-text-block">
                  <p>
                    <strong>テーブルゲーム</strong>とは、簡単に言えば<span className="highlight-text">「机の上で遊ぶゲーム」</span>のことです。
                  </p>
                  <p>
                    ボードゲーム、カードゲーム、パーティーゲーム、アナログゲーム…呼び方はいろいろありますが、共通しているのは<strong>「友達と直接顔を合わせて、ワイワイ楽しむ」</strong>ということです。
                  </p>
                  <p>
                    スマホゲームも楽しいですが、<strong>画面越しではなく、隣にいる友達の笑顔や反応を見ながら遊ぶ</strong>というのは、全く違う楽しさがあります。
                  </p>
                </div>
              </div>

              {/* なんで楽しいの? */}
              <div className="fun-section">
                <div className="fun-section-header">
                  <h2>なんでこんなに楽しいの?</h2>
                </div>

                <div className="fun-text-block">
                  <h3>🌟 誰でも楽しめる</h3>
                  <p>
                    年齢、性別、経験は関係ありません。初心者でもベテランでも、みんな対等です。おおむね３歳くらいから遊べますし、100歳でも10代の子たちと対等に遊べます。
                  </p>
                  <p>
                    テーブルゲームでは様々なテーマを取り扱っているので、ソロ向けから協力型のゲーム、ワイワイ楽しむパーティーゲーム、知育・脳トレなどの教育系ゲーム、囲碁や将棋のように真剣勝負のゲームなど様々あります。
                  </p>
                  <p>
                    <Link to="/tablegame/detail-features" className="detail-link">
                      もっと詳しく(特徴の解説) →
                    </Link>
                  </p>  
                  <h3>😆 とにかく盛り上がる!</h3>
                  <p>
                    <strong>「それはやめて!」「勝った!」「本当に?!」</strong>
                  </p>
                  <p>
                    <strong>ゲーム中はお互いにフラットな人間関係</strong>なので、こんな会話が自然に生まれます。上司や部下の顔色を伺う必要はありません。</p>
                  <p>YOLUBEのイベントにお越しいただいたお方々は「テーブルゲームは初めてなので20～30分だけ遊んでみます」と仰られるケースも多いのですが、大半はそのまま２～３時間以上遊んでいたりします。      
                  </p>
                  <p>
                    <Link to="/tablegame/detail-effects" className="detail-link">
                      もっと詳しく(効果の科学) →
                    </Link>
                  </p>

                  <h3>👥 人間関係の距離が縮まる</h3>
                  <p>
                    人間関係の距離感はどうやって決まるのでしょうか？所説あると思いますが、<strong>相互理解、共通の体験や思い出を共有することが大きな要素</strong>であると言われています。
                  </p>
                  <p>
                    テーブルゲームでは初対面同士であってもゲームを一緒にやるとすぐに打ち解けられます。これは、<strong>ゲームが共通の話題を提供し、自然なコミュニケーションを促進する</strong>からです。
                  </p>
                  <p>
                    協力して目標をクリアしたり、お互いの戦略を読み合ったりする中で、相手の性格や考え方が分かり、自然と仲良くなります。
                  </p>
                  <p>
                    一緒に遊んでいると<br />
                    <strong>「この人はこんな考え方をするんだな」<br />
                    「こういう時に盛り上がるんだね」<br />
                    「こういう時に助けてくれるんだ」</strong><br />
                    といった相手の人となりがゲームを通じて伝わってきます。
                  </p>
                  <p>
                    <Link to="/tablegame/detail-features" className="detail-link">
                      もっと詳しく(特徴の解説) →
                    </Link>
                  </p>

                  <h3>🧠 普段とは違う頭の使い方を楽しめる</h3>
                  <p>
                    「この手はどうでしょう?」「次はどうしますか?」「ここで協力しましょう!」
                  </p>
                  <p>
                    戦略を考えたり、相手の動きを予測したり。でも「勉強」とか「難しい」という感じではなく、<strong>楽しみながら自然と頭が回る</strong>感覚。これがとても心地良いとおっしゃるお方も多いです。
                  </p>
                  <p>
                    ゲームは「ルール」で構成されています。<br />
                    <strong>[しゃべっちゃだめ]<br />
                    [見ちゃだめ]<br />
                    [必ず〇〇を使う]<br />
                    [手番は時計回り]</strong><br />
                    などなど。<br />
                    ルールの中で最適な行動を考えたり、相手の行動を予測したり、戦略を練ったり。<br />
                    こうした思考プロセスは、普段の生活や仕事とは異なる脳の使い方を促します。ある種の非日常的な空間の中で、<strong>新しい視点や発想を得る</strong>ことができます。<br />
                    10年来の友人が意外にもこちらの予想外の行動を取ってみたり、普段は静かな人が実は大胆な戦略家だったり。<br />
                    新しい刺激を受けながら脳をフル回転させているとあっという間に時間が過ぎてしまいます。ゲームを終えたころには心地よい疲労感が訪れているかもしれません。
                  </p>
                  <p>
                    <Link to="/tablegame/detail-features" className="detail-link">
                      もっと詳しく(特徴の解説) →
                    </Link>
                  </p>
                </div>
              </div>

              {/* どこで遊べるの? */}
              <div className="fun-section">
                <div className="fun-section-header">
                  <h2>どこで遊べるの?</h2>
                </div>

                <div className="fun-text-block">
                  <p>
                    「楽しそうだけど、どこで遊べるの?」と思われた方もいるでしょう。実は、意外といろんな場所で遊べます。
                  </p>

                  <h3>🏠 家や友達の家</h3>
                  <p>
                    まずは家で友達と遊ぶのが定番です。UNOやトランプなら、誰でも持っているでしょう。新しいゲームを買ってみるのも楽しいです。
                  </p>

                  <h3>☕ ボードゲームカフェ</h3>
                  <p>
                    最近、全国に増えている「ボードゲームカフェ」。何百種類ものゲームが置いてあり、店員さんがルールも教えてくれます。初心者でも安心です。
                  </p>

                  <h3>🎓 学校やサークル</h3>
                  <p>
                    大学のサークルや、放課後の友達同士でテーブルゲームを楽しむ人も増えています。新しい友達を作るきっかけにもなります。
                  </p>

                  <h3>🌍 イベント・ゲーム会</h3>
                  <p>
                    地域のイベントやゲーム会に参加すれば、初対面の人とも一緒に楽しめます。共通の趣味を持つ仲間に出会えるチャンスです。
                  </p>

                  <p>
                    <Link to="/tablegame/detail-cases" className="detail-link">
                      いろんな場所での活用事例を見る →
                    </Link>
                  </p>
                </div>
              </div>

              {/* 実はすごい効果もある */}
              <div className="fun-section fun-section-benefit">
                <div className="fun-section-header">
                  <h2>テーブルゲームの知られざる効果</h2>
                </div>

                <div className="fun-text-block">
                  <p>
                    「ただ遊んでいるだけ」と思われるかもしれませんが、テーブルゲームには、実は様々な効果があります。
                  </p>

                  <h3>💬 コミュ力アップ</h3>
                  <p>
                    相手の話を聞いたり、自分の考えを伝えたり。自然と会話が生まれるため、コミュニケーション能力が知らないうちに向上しています。専門的に言えば「非認知能力」が育まれると言われています。
                  </p>
                  <p>
                   非認知能力の例<br />
                   ・自己制御力（感情や行動をコントロールする力）<br />
                   ・共感力（他人の気持ちを理解し、共感する力）<br />
                   ・協調性（他人と協力して目標を達成する力）<br />
                   ・意欲、やる気（困難に直面しても挑戦し続ける力）<br />
                   ・リーダーシップ（集団をまとめ、導く力）<br />
                   ・忍耐力（困難やストレスに耐える力）<br />
                   ・創造性（新しいアイデアや解決策を生み出す力）<br />                   
                  </p>
                  <p>
                    これらは、学力や知能テストでは測れない、人間性や社会性に関わる能力です。
                  </p>
                  <h3>🤝 チームワーク</h3>
                  <p>
                    協力型ゲームでは、「みんなで勝つ」ために役割分担したり、助け合ったりします。また、協力ゲームでなくとも「共同戦線」を考え、提案したりする場合もあります。これらは社会に出ても重宝する処世術と呼べるでしょう。
                  </p>
                  <p>
                    しかも一緒に遊ぶ相手は年齢も性別も違うかもしれません。様々な人と一緒に遊ぶことで、多様な価値観や考え方を理解し、受け入れる力も養われます。
                  </p>
                  <p>
                    テーブルゲームにはこの「価値観の違い」を逆手に取った作品も多数存在し、大いに楽しまれています。
                  </p>
                  <h3>🧩 問題解決能力</h3>
                  <p>
                    「どうすれば勝てるか?」「次の手は?」戦略を考えることで、論理的に考える力が自然と身につきます。ゲームの中なので、いくら失敗しても構いません。むしろ失敗から学ぶことが多いかもしれません。
                  </p>
                  <p>
                    物事には様々な角度からの見え方があり、正解が必ずしも一つだけではない場合もあります。テーブルゲームでは、いわゆる「重量級ゲーム（プレイ時間2時間以上の作品）」で特に求められるシチュエーションです。<strong>多角的な視点で問題を見る力</strong>が養われるかもしれません。
                  </p>
                  <h3>😌 ストレス解消</h3>
                  <p>
                    つい先ほどあったばかりの人達とくだらないことで笑ったり、盛り上がったり。テーブルゲームの中にはいわゆる「パーティーゲーム」と呼ばれるカテゴリーがあります。「人生ゲーム」などが有名です。<br />
                    これらは運の要素が大きく競技性に欠けますが、その分だけ純粋に遊びを楽しめます。「近頃笑ってないなぁ・・・」と感じたなら、ぜひパーティーゲームで遊んでみてください！
                  </p>

                  <h3>もっと詳しく知りたい人へ</h3>
                  <p>
                    「どんな効果があるの?」「なぜそうなるの?」と気になった方は、詳しい解説ページもご用意しています。研究データや事例も掲載していますので、レポートや発表資料にもご活用いただけます。
                  </p>
                  <p>
                    <Link to="/tablegame/detail-features" className="detail-link">
                      5つの特徴 →
                    </Link><br />

                    <Link to="/tablegame/detail-effects" className="detail-link">
                      得られる効果 →
                    </Link><br />

                    <Link to="/tablegame/detail-economics" className="detail-link">
                      経済的効果 →
                    </Link><br />

                    <Link to="/tablegame/detail-cases" className="detail-link">
                      活用事例 →
                    </Link>
                  </p>
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
                      企業研修プログラムを見る
                    </a>
                    <a href="/#contact" className="final-cta-btn secondary">
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
