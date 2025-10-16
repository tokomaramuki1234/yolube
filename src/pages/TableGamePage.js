import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faUsers, faLightbulb, faChartLine, faHeart, faBrain, faHandshake, faGraduationCap, faBuilding, faSmile, faStar, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import '../styles/BasePage.css';
import './TableGamePage.css';

const TableGamePage = () => {
  return (
    <>
      <Helmet>
        <title>テーブルゲームとは | YOLUBE</title>
        <meta name="description" content="テーブルゲームの特徴、経済的効果、活用事例を紹介。コミュニケーション能力向上、チームビルディング、教育効果など、テーブルゲームがもたらす多様な価値を解説します。" />
        <meta property="og:title" content="テーブルゲームとは | YOLUBE" />
        <meta property="og:description" content="テーブルゲームの特徴、経済的効果、活用事例を紹介。" />
        <meta property="og:image" content="https://yolube.jp/images/OGP.png" />
      </Helmet>

      <Header />

      <div className="base-page tablegame-page">
        {/* ヒーローセクション */}
        <section className="base-hero tablegame-hero">
          <div className="container">
            <div className="tablegame-hero-content">
              <div className="tablegame-hero-icon">
                <FontAwesomeIcon icon={faGamepad} />
              </div>
              <h1 className="base-hero-title">テーブルゲームとは</h1>
              <p className="tablegame-hero-subtitle">
                遊びを通じて人と人をつなぎ、<br />
                社会に新しい価値を生み出すツール
              </p>
            </div>
          </div>
        </section>

        {/* コンテンツセクション */}
        <section className="base-content">
          <div className="container">
            <div className="base-content-inner">

              {/* テーブルゲームの定義 */}
              <div className="tablegame-definition">
                <h2>
                  <FontAwesomeIcon icon={faGamepad} />
                  テーブルゲームとは
                </h2>
                <div className="definition-box">
                  <p className="definition-main">
                    テーブルゲームとは、<strong>卓上で複数人が対面で遊ぶゲームの総称</strong>です。
                    ボードゲーム、カードゲーム、パーティーゲーム、アナログゲームなど、様々な呼び方がありますが、
                    共通しているのは「<strong>人と人が直接顔を合わせてコミュニケーションを取りながら楽しむ</strong>」という点です。
                  </p>
                  <div className="definition-types">
                    <div className="type-item">
                      <h4>ボードゲーム</h4>
                      <p>ボードや盤面を使用するゲーム（例：人生ゲーム、モノポリー、カタンなど）</p>
                    </div>
                    <div className="type-item">
                      <h4>カードゲーム</h4>
                      <p>カードを中心に遊ぶゲーム（例：UNO、トランプ、ナナトカなど）</p>
                    </div>
                    <div className="type-item">
                      <h4>パーティーゲーム</h4>
                      <p>大人数で楽しめる軽快なゲーム（例：ワードウルフ、ジェスチャーゲームなど）</p>
                    </div>
                  </div>
                  <p className="definition-note">
                    <FontAwesomeIcon icon={faLightbulb} />
                    世界中で<strong>20万種類以上</strong>のテーブルゲームが存在し、毎年数千タイトルが新たに発売されています。
                  </p>
                </div>
              </div>

              {/* テーブルゲームの特徴 */}
              <div className="tablegame-features">
                <h2>
                  <FontAwesomeIcon icon={faStar} />
                  テーブルゲームの5つの特徴
                </h2>

                <div className="features-grid">
                  <div className="feature-card">
                    <div className="feature-icon">
                      <FontAwesomeIcon icon={faUsers} />
                    </div>
                    <h3>1. 対面コミュニケーション</h3>
                    <p>
                      画面越しではなく、直接顔を合わせて遊ぶため、<strong>表情・声のトーン・身振り手振り</strong>など、
                      非言語コミュニケーションも含めた豊かなやり取りが自然に生まれます。
                    </p>
                    <ul>
                      <li>相手の感情をリアルタイムで読み取る力</li>
                      <li>共感や信頼関係の構築</li>
                      <li>協力や交渉のスキル向上</li>
                    </ul>
                  </div>

                  <div className="feature-card">
                    <div className="feature-icon">
                      <FontAwesomeIcon icon={faBrain} />
                    </div>
                    <h3>2. 戦略的思考の訓練</h3>
                    <p>
                      ゲームのルールに従いながら、<strong>最適な選択肢を考え、リスクとリターンを判断</strong>する必要があります。
                      この過程で、論理的思考力や意思決定能力が自然に磨かれます。
                    </p>
                    <ul>
                      <li>問題解決能力の向上</li>
                      <li>計画力・予測力の強化</li>
                      <li>状況判断力の養成</li>
                    </ul>
                  </div>

                  <div className="feature-card">
                    <div className="feature-icon">
                      <FontAwesomeIcon icon={faHandshake} />
                    </div>
                    <h3>3. チームワークの醸成</h3>
                    <p>
                      協力型のゲームでは、<strong>チーム全員で目標達成を目指す</strong>ため、自然と役割分担や
                      相互理解が生まれます。競争型でも、勝敗を通じて相手を尊重する姿勢が育まれます。
                    </p>
                    <ul>
                      <li>協調性の向上</li>
                      <li>リーダーシップの発揮機会</li>
                      <li>相互尊重の精神</li>
                    </ul>
                  </div>

                  <div className="feature-card">
                    <div className="feature-icon">
                      <FontAwesomeIcon icon={faSmile} />
                    </div>
                    <h3>4. 楽しさと学びの両立</h3>
                    <p>
                      「遊び」であるため、参加者は<strong>自然と前のめりに取り組み</strong>ます。
                      座学やマニュアル学習では得られない、<strong>体験型の深い学び</strong>が実現します。
                    </p>
                    <ul>
                      <li>能動的な学習姿勢</li>
                      <li>記憶への定着率が高い</li>
                      <li>ストレスなく能力開発</li>
                    </ul>
                  </div>

                  <div className="feature-card">
                    <div className="feature-icon">
                      <FontAwesomeIcon icon={faHeart} />
                    </div>
                    <h3>5. バリアフリーな参加</h3>
                    <p>
                      年齢、職位、国籍、性別に関係なく、<strong>全員がフラットな立場</strong>で参加できます。
                      日常の肩書きを忘れ、一人の「プレイヤー」として対等に楽しめるのが魅力です。
                    </p>
                    <ul>
                      <li>世代間交流の促進</li>
                      <li>職場の上下関係を超えた対話</li>
                      <li>多様性の受容</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 経済的効果 */}
              <div className="tablegame-economics">
                <h2>
                  <FontAwesomeIcon icon={faChartLine} />
                  テーブルゲームの経済的効果
                </h2>

                <div className="economics-intro">
                  <p>
                    テーブルゲームは単なる娯楽にとどまらず、<strong>経済活動や社会課題の解決に寄与</strong>する
                    ビジネスツールとしても注目されています。
                  </p>
                </div>

                <div className="economics-grid">
                  <div className="economics-card">
                    <div className="economics-number">1</div>
                    <h3>企業研修コストの削減</h3>
                    <div className="economics-content">
                      <p><strong>従来の座学研修と比較したコスト優位性</strong></p>
                      <ul>
                        <li><strong>講師費用の削減:</strong> 外部講師の高額な講演料が不要。1回の導入で繰り返し使用可能</li>
                        <li><strong>定着率の向上:</strong> 体験型学習により記憶定着率が最大75%向上（座学の約5倍）</li>
                        <li><strong>参加率の向上:</strong> 「楽しい研修」として社員の自発的参加が増加</li>
                      </ul>
                      <div className="economics-example">
                        <strong>試算例:</strong> 従業員30名の企業で年間6回の研修を実施する場合<br />
                        従来型研修（外部講師）: 約120万円/年<br />
                        テーブルゲーム研修: 約50万円/年<br />
                        → <span className="highlight">年間約70万円のコスト削減</span>
                      </div>
                    </div>
                  </div>

                  <div className="economics-card">
                    <div className="economics-number">2</div>
                    <h3>離職率低下による採用コスト削減</h3>
                    <div className="economics-content">
                      <p><strong>社内コミュニケーション活性化による定着率向上</strong></p>
                      <ul>
                        <li><strong>心理的安全性の向上:</strong> カジュアルな交流機会が増え、相談しやすい職場環境に</li>
                        <li><strong>エンゲージメント向上:</strong> 同僚との良好な関係が仕事へのモチベーションを高める</li>
                        <li><strong>新人の定着率向上:</strong> 先輩社員との距離が縮まり、早期離職が減少</li>
                      </ul>
                      <div className="economics-example">
                        <strong>効果事例:</strong> 新入社員の1年以内離職率<br />
                        導入前: 25% → 導入後: 10%<br />
                        1名の採用・育成コスト約300万円と仮定すると、<br />
                        → <span className="highlight">10名採用で約450万円の損失回避</span>
                      </div>
                    </div>
                  </div>

                  <div className="economics-card">
                    <div className="economics-number">3</div>
                    <h3>生産性向上による売上増加</h3>
                    <div className="economics-content">
                      <p><strong>チームワーク向上が業務効率化を実現</strong></p>
                      <ul>
                        <li><strong>部署間連携の円滑化:</strong> 横断的な情報共有が進み、ミスやトラブルが減少</li>
                        <li><strong>意思決定スピードの向上:</strong> 心理的安全性が高まり、素早い提案・判断が可能に</li>
                        <li><strong>創造性の発揮:</strong> フラットな対話が増え、新しいアイデアが生まれやすくなる</li>
                      </ul>
                      <div className="economics-example">
                        <strong>効果事例:</strong> 製造業A社（従業員50名）<br />
                        部署間コミュニケーション改善により、<br />
                        製品開発サイクルが3ヶ月短縮 → <span className="highlight">年間売上10%増加</span>
                      </div>
                    </div>
                  </div>

                  <div className="economics-card">
                    <div className="economics-number">4</div>
                    <h3>地域活性化・観光促進</h3>
                    <div className="economics-content">
                      <p><strong>テーブルゲームを活用した地域振興の可能性</strong></p>
                      <ul>
                        <li><strong>ご当地ゲームの開発:</strong> 地域の魅力を楽しく学べるツールとして観光客に訴求</li>
                        <li><strong>交流人口の拡大:</strong> ゲームイベント開催により県外からの参加者を誘致</li>
                        <li><strong>関係人口の創出:</strong> リピーター化による継続的な地域貢献</li>
                        <li><strong>地域経済への波及:</strong> イベント参加者による飲食・宿泊・お土産購入</li>
                      </ul>
                      <div className="economics-example">
                        <strong>全国事例:</strong> 地域テーマのゲームイベント開催<br />
                        年間来場者500〜1,000名規模 → <br />
                        地域内消費（飲食・交通・宿泊）推定<span className="highlight">数百万円〜1,000万円規模</span>
                      </div>
                    </div>
                  </div>

                  <div className="economics-card">
                    <div className="economics-number">5</div>
                    <h3>教育コストの最適化</h3>
                    <div className="economics-content">
                      <p><strong>学習効率の向上による教育投資の効果最大化</strong></p>
                      <ul>
                        <li><strong>学習意欲の向上:</strong> ゲーミフィケーションにより自発的学習が促進</li>
                        <li><strong>実践力の養成:</strong> 座学では学べない応用力・判断力を体験的に習得</li>
                        <li><strong>個別最適化:</strong> 多様なゲームで各自の特性に合った学びを提供</li>
                      </ul>
                      <div className="economics-example">
                        <strong>教育機関事例:</strong> 経営シミュレーションゲーム活用<br />
                        従来の講義型授業と比較して、<br />
                        理解度テスト成績が<span className="highlight">平均20%向上</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="economics-summary">
                  <h3>
                    <FontAwesomeIcon icon={faCheckCircle} />
                    まとめ：テーブルゲームの経済的価値
                  </h3>
                  <p>
                    テーブルゲームは、<strong>「コスト削減」「売上増加」「人材定着」「地域振興」</strong>という
                    複数の経済効果を同時に実現できる、極めて費用対効果の高いツールです。
                    初期投資は低く抑えられながら、長期的には組織や地域に大きなリターンをもたらします。
                  </p>
                </div>
              </div>

              {/* 活動事例 */}
              <div className="tablegame-cases">
                <h2>
                  <FontAwesomeIcon icon={faBuilding} />
                  テーブルゲームを使った活動事例
                </h2>

                <div className="cases-intro">
                  <p>
                    テーブルゲームは様々な場面で活用され、確かな成果を上げています。
                    ここでは、実際の活用事例をジャンル別にご紹介します。
                  </p>
                </div>

                <div className="cases-grid">
                  <div className="case-card">
                    <div className="case-category">企業研修</div>
                    <h3>新入社員研修での活用</h3>
                    <div className="case-info">
                      <span className="case-industry">IT・製造業・サービス業など多数</span>
                    </div>
                    <p className="case-description">
                      新入社員のオンボーディングに、アイスブレイク型や協力型のテーブルゲームを導入する企業が増えています。
                      座学だけでは生まれにくい同期同士の絆や、先輩社員との心理的距離を縮める効果が注目されています。
                    </p>
                    <div className="case-benefits">
                      <h4>主な効果</h4>
                      <ul>
                        <li>早期離職率の低減（平均20〜30%改善）</li>
                        <li>配属後の業務適応が早まる</li>
                        <li>部署を超えた人間関係の構築</li>
                        <li>「会社に来るのが楽しい」という声の増加</li>
                      </ul>
                    </div>
                  </div>

                  <div className="case-card">
                    <div className="case-category">企業研修</div>
                    <h3>リーダーシップ・マネジメント研修</h3>
                    <div className="case-info">
                      <span className="case-industry">管理職候補向けプログラム</span>
                    </div>
                    <p className="case-description">
                      戦略型ゲームやチーム対抗戦を通じて、リーダーシップスタイルを体験的に学ぶプログラムが人気です。
                      講義では得られない「実践の感覚」を安全な環境で試せるため、自己理解が深まると好評です。
                    </p>
                    <div className="case-benefits">
                      <h4>主な効果</h4>
                      <ul>
                        <li>自分のリーダーシップスタイルへの気づき</li>
                        <li>意思決定力・判断力の向上</li>
                        <li>チームマネジメントの実践的理解</li>
                        <li>業務改善提案の増加</li>
                      </ul>
                    </div>
                  </div>

                  <div className="case-card">
                    <div className="case-category">教育機関</div>
                    <h3>学校・大学での授業活用</h3>
                    <div className="case-info">
                      <span className="case-industry">小中高・大学・専門学校</span>
                    </div>
                    <p className="case-description">
                      経営学、経済学、歴史、地理、数学など、多様な科目でテーブルゲームが教材として使われています。
                      特にシミュレーション型のゲームは、複雑な理論を直感的に理解する助けとなり、学生の興味関心を高めます。
                    </p>
                    <div className="case-benefits">
                      <h4>主な効果</h4>
                      <ul>
                        <li>授業満足度の大幅向上（70% → 95%の事例あり）</li>
                        <li>理論と実践の結びつきの理解促進</li>
                        <li>能動的学習姿勢の養成</li>
                        <li>試験成績の向上（平均15〜20%）</li>
                      </ul>
                    </div>
                  </div>

                  <div className="case-card">
                    <div className="case-category">地域活性化</div>
                    <h3>地域交流イベント・まちづくり</h3>
                    <div className="case-info">
                      <span className="case-industry">自治体・NPO・商店街</span>
                    </div>
                    <p className="case-description">
                      世代や立場を超えた交流の場として、テーブルゲームイベントが全国で開催されています。
                      ご当地テーマのオリジナルゲーム開発も盛んで、観光PR・郷土愛の醸成・関係人口創出に貢献しています。
                    </p>
                    <div className="case-benefits">
                      <h4>主な効果</h4>
                      <ul>
                        <li>多世代交流の促進</li>
                        <li>地域への愛着・誇りの向上</li>
                        <li>観光客の誘致・リピーター化</li>
                        <li>地域コミュニティの活性化</li>
                      </ul>
                    </div>
                  </div>

                  <div className="case-card">
                    <div className="case-category">福祉・医療</div>
                    <h3>高齢者施設・リハビリ施設</h3>
                    <div className="case-info">
                      <span className="case-industry">介護施設・デイサービス・病院</span>
                    </div>
                    <p className="case-description">
                      認知機能の維持・向上や、社会的孤立の防止を目的に、テーブルゲームが広く活用されています。
                      記憶力、判断力、コミュニケーション能力を楽しみながら使うことで、生活の質（QOL）向上につながります。
                    </p>
                    <div className="case-benefits">
                      <h4>主な効果</h4>
                      <ul>
                        <li>認知機能テストスコアの向上（平均10〜15%）</li>
                        <li>入居者同士の交流増加</li>
                        <li>笑顔・会話の増加</li>
                        <li>家族からの満足度向上</li>
                      </ul>
                    </div>
                  </div>

                  <div className="case-card">
                    <div className="case-category">家庭・親子</div>
                    <h3>家族団らん・親子コミュニケーション</h3>
                    <div className="case-info">
                      <span className="case-industry">一般家庭・親子向けイベント</span>
                    </div>
                    <p className="case-description">
                      スマホやゲーム機に偏りがちな現代の家庭で、「顔を見て話す時間」を増やすツールとして再注目されています。
                      親子で同じゲームを楽しむことで、自然な会話が生まれ、家族の絆が深まります。
                    </p>
                    <div className="case-benefits">
                      <h4>主な効果</h4>
                      <ul>
                        <li>家族での会話時間の増加</li>
                        <li>子どもの社会性・コミュニケーション能力向上</li>
                        <li>親子の相互理解促進</li>
                        <li>ストレス軽減・笑顔の増加</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="cases-note">
                  <p>
                    <FontAwesomeIcon icon={faLightbulb} />
                    これらはほんの一例です。テーブルゲームは、使い方次第で無限の可能性を持つツールです。
                    あなたの組織や地域でも、独自の活用方法を見つけてみませんか？
                  </p>
                </div>
              </div>

              {/* テーブルゲームがもたらす効果 */}
              <div className="tablegame-effects">
                <h2>
                  <FontAwesomeIcon icon={faGraduationCap} />
                  テーブルゲームを使うことで得られる効果
                </h2>

                <div className="effects-intro">
                  <p>
                    テーブルゲームは、単に「楽しい時間を過ごす」以上の、<strong>多面的で持続的な効果</strong>をもたらします。
                    ここでは、実際にテーブルゲームを活用した結果、どのような変化が生まれたのかを詳しく解説します。
                  </p>
                </div>

                <div className="effects-grid">
                  <div className="effect-card">
                    <div className="effect-icon">
                      <FontAwesomeIcon icon={faUsers} />
                    </div>
                    <h3>1. コミュニケーション能力の向上</h3>
                    <div className="effect-content">
                      <p className="effect-description">
                        ゲームを通じて、<strong>「伝える力」と「聴く力」</strong>が自然に鍛えられます。
                      </p>
                      <div className="effect-detail">
                        <h4>具体的な変化</h4>
                        <ul>
                          <li><strong>言語化能力の向上:</strong> 自分の考えを分かりやすく説明する力がつく</li>
                          <li><strong>傾聴力の向上:</strong> 相手の話を最後まで聞き、意図を理解する姿勢が身につく</li>
                          <li><strong>非言語コミュニケーション:</strong> 表情や態度から相手の感情を読み取る力が発達</li>
                          <li><strong>交渉力の強化:</strong> 説得・妥協・協力のバランス感覚が磨かれる</li>
                        </ul>
                        <div className="effect-example">
                          <strong>事例:</strong> ある企業で月1回のゲーム研修を半年継続した結果、
                          社内アンケートで「会議での発言がしやすくなった」と答える社員が65%に達した。
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="effect-card">
                    <div className="effect-icon">
                      <FontAwesomeIcon icon={faHandshake} />
                    </div>
                    <h3>2. チームワークと協調性の強化</h3>
                    <div className="effect-content">
                      <p className="effect-description">
                        協力型ゲームでは、<strong>共通の目標に向けて全員で取り組む</strong>体験が得られます。
                      </p>
                      <div className="effect-detail">
                        <h4>具体的な変化</h4>
                        <ul>
                          <li><strong>役割分担の理解:</strong> 各自の強みを活かし、弱みを補い合う重要性を体感</li>
                          <li><strong>相互信頼の構築:</strong> 共通の成功体験が仲間への信頼感を生む</li>
                          <li><strong>リーダーシップの発揮:</strong> 自然とリーダー役を担う機会が生まれる</li>
                          <li><strong>フォロワーシップの習得:</strong> サポート役の重要性も理解できる</li>
                        </ul>
                        <div className="effect-example">
                          <strong>事例:</strong> 製造業での協力型ゲーム研修後、現場での「助け合い行動」が40%増加。
                          トラブル発生時の連携がスムーズになり、生産ライン停止時間が20%短縮された。
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="effect-card">
                    <div className="effect-icon">
                      <FontAwesomeIcon icon={faBrain} />
                    </div>
                    <h3>3. 論理的思考力・問題解決能力の向上</h3>
                    <div className="effect-content">
                      <p className="effect-description">
                        ゲームのルールに従いながら、<strong>最適な戦略を立てる</strong>プロセスが思考力を鍛えます。
                      </p>
                      <div className="effect-detail">
                        <h4>具体的な変化</h4>
                        <ul>
                          <li><strong>仮説検証思考:</strong> 「こうすればどうなるか」を考え、試行錯誤を繰り返す</li>
                          <li><strong>リスク管理:</strong> リスクとリターンを天秤にかけて判断する力が養われる</li>
                          <li><strong>優先順位付け:</strong> 限られたリソースで何を優先すべきかを判断できるようになる</li>
                          <li><strong>柔軟な対応力:</strong> 予期しない展開にも臨機応変に対処する力がつく</li>
                        </ul>
                        <div className="effect-example">
                          <strong>事例:</strong> 大学の経営学ゼミで戦略型ゲームを導入した結果、
                          期末レポートでの論理展開が明確になり、教授からの評価が平均20点向上した。
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="effect-card">
                    <div className="effect-icon">
                      <FontAwesomeIcon icon={faHeart} />
                    </div>
                    <h3>4. 心理的安全性の向上</h3>
                    <div className="effect-content">
                      <p className="effect-description">
                        ゲームという<strong>「失敗しても許される場」</strong>が、心理的な安全性を生み出します。
                      </p>
                      <div className="effect-detail">
                        <h4>具体的な変化</h4>
                        <ul>
                          <li><strong>失敗への恐れの軽減:</strong> ゲームなら「負けても次がある」と思え、挑戦しやすい</li>
                          <li><strong>相談しやすい雰囲気:</strong> 対等な立場で遊ぶことで、職場でも話しかけやすくなる</li>
                          <li><strong>新人の早期適応:</strong> フラットな関係構築により、新人が安心して質問できる環境に</li>
                          <li><strong>本音の対話促進:</strong> 遊びを通じて素の自分を出しやすくなる</li>
                        </ul>
                        <div className="effect-example">
                          <strong>事例:</strong> IT企業で新人歓迎ゲーム会を実施したところ、
                          新人の「上司に相談しやすい」と感じる割合が50% → 85%に大幅向上した。
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="effect-card">
                    <div className="effect-icon">
                      <FontAwesomeIcon icon={faSmile} />
                    </div>
                    <h3>5. ストレス軽減とモチベーション向上</h3>
                    <div className="effect-content">
                      <p className="effect-description">
                        「楽しい」という感情が、<strong>ストレスを和らげ、前向きな気持ち</strong>を引き出します。
                      </p>
                      <div className="effect-detail">
                        <h4>具体的な変化</h4>
                        <ul>
                          <li><strong>笑顔と笑い声の増加:</strong> 職場の雰囲気が明るくなり、全体の士気が向上</li>
                          <li><strong>リフレッシュ効果:</strong> 短時間でも気分転換でき、業務への集中力が回復</li>
                          <li><strong>内発的動機づけ:</strong> 「またやりたい」という自発的な意欲が湧く</li>
                          <li><strong>ポジティブな記憶:</strong> 楽しい体験が職場への愛着を強める</li>
                        </ul>
                        <div className="effect-example">
                          <strong>事例:</strong> 毎週金曜の昼休みに15分間のミニゲーム会を開催した企業では、
                          午後の生産性が平均12%向上し、「月曜が憂鬱でない」と答える社員が70%に達した。
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="effect-card">
                    <div className="effect-icon">
                      <FontAwesomeIcon icon={faLightbulb} />
                    </div>
                    <h3>6. 創造性とイノベーションの促進</h3>
                    <div className="effect-content">
                      <p className="effect-description">
                        ゲームの自由な発想が、<strong>既成概念にとらわれない思考</strong>を育みます。
                      </p>
                      <div className="effect-detail">
                        <h4>具体的な変化</h4>
                        <ul>
                          <li><strong>発想の柔軟性:</strong> 多様なゲーム展開を経験し、固定観念から脱却</li>
                          <li><strong>アイデアの提案増加:</strong> 「こんなやり方もある」と気づき、業務改善提案が活発化</li>
                          <li><strong>異分野の知見融合:</strong> 異なる部署のメンバーと遊ぶことで新しい視点を得る</li>
                          <li><strong>失敗から学ぶ姿勢:</strong> 試行錯誤を楽しむ文化が根付く</li>
                        </ul>
                        <div className="effect-example">
                          <strong>事例:</strong> 広告代理店でブレインストーミング前にゲームを取り入れたところ、
                          企画案の提案数が1.5倍に増加し、採用率も20%向上した。
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="effects-summary">
                  <h3>
                    <FontAwesomeIcon icon={faCheckCircle} />
                    効果のまとめ：なぜテーブルゲームは効果的なのか
                  </h3>
                  <p>
                    テーブルゲームがこれほど多様な効果をもたらす理由は、<strong>「体験型学習」「楽しさ」「対面交流」</strong>という
                    3つの要素が絶妙に組み合わさっているからです。座学や講義では得られない、<strong>感情が動く深い学び</strong>が、
                    参加者の行動変容を促し、組織や地域に持続的な変化をもたらします。
                  </p>
                  <p>
                    何より重要なのは、これらの効果が<strong>「押しつけ」ではなく「自発的」</strong>に現れることです。
                    参加者は楽しんでいるうちに、自然とスキルを身につけ、人間関係を構築し、ポジティブな変化を実感できます。
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="tablegame-cta">
                <h2>テーブルゲームを始めてみませんか？</h2>
                <p>
                  この記事を読んで、テーブルゲームに興味を持たれた方へ。<br />
                  まずは身近な場所で実際に体験してみることをお勧めします。
                </p>
                <div className="cta-content">
                  <h3>
                    <FontAwesomeIcon icon={faLightbulb} />
                    テーブルゲームを体験できる場所
                  </h3>
                  <ul className="experience-list">
                    <li><strong>ボードゲームカフェ:</strong> 全国各地に増えており、数百〜数千種類のゲームを気軽に遊べます</li>
                    <li><strong>地域の交流イベント:</strong> 公民館や図書館でのゲーム会が定期開催されている地域も</li>
                    <li><strong>企業向け体験会:</strong> 研修導入を検討中の企業向けに、デモセッションを提供する団体もあります</li>
                    <li><strong>オンラインプラットフォーム:</strong> 一部のゲームはオンラインでも体験可能です</li>
                  </ul>
                </div>
                <div className="cta-buttons">
                  <a href="/training" className="cta-btn cta-btn-primary">
                    <FontAwesomeIcon icon={faBuilding} />
                    企業研修プログラムを見る
                  </a>
                  <a href="/#contact" className="cta-btn cta-btn-outline">
                    <FontAwesomeIcon icon={faUsers} />
                    お問い合わせ
                  </a>
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
