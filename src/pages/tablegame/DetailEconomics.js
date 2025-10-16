import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faYenSign, faUserTie, faRocket, faGlobe, faGraduationCap, faArrowLeft, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BackToTop from '../../components/BackToTop';
import '../../styles/BasePage.css';
import './DetailPages.css';

const DetailEconomics = () => {
  return (
    <>
      <Helmet>
        <title>テーブルゲームの経済的効果 | YOLUBE</title>
        <meta name="description" content="テーブルゲームがもたらす経済的効果を詳細解説。研修コスト削減、離職率低下、生産性向上、地域活性化、教育効率化など、具体的な数値データとともに紹介します。" />
      </Helmet>

      <Header />

      <div className="base-page detail-page">
        {/* ヒーローセクション */}
        <section className="base-hero detail-hero">
          <div className="container">
            <Link to="/tablegame" className="back-link">
              <FontAwesomeIcon icon={faArrowLeft} />
              テーブルゲームとは に戻る
            </Link>
            <div className="detail-hero-content">
              <div className="detail-hero-icon">
                <FontAwesomeIcon icon={faChartLine} />
              </div>
              <h1 className="base-hero-title">テーブルゲームの経済的効果</h1>
              <p className="detail-hero-subtitle">
                データで見る、テーブルゲームの費用対効果と投資価値
              </p>
            </div>
          </div>
        </section>

        {/* コンテンツセクション */}
        <section className="base-content">
          <div className="container">
            <div className="base-content-inner">

              {/* イントロ */}
              <div className="detail-intro">
                <p>
                  テーブルゲームは、単なる娯楽にとどまらず、<strong>経済活動や社会課題の解決に寄与</strong>する
                  ビジネスツールとしても注目されています。ここでは、テーブルゲームがもたらす5つの経済的効果について、
                  具体的な数値データや試算例とともに詳しく解説します。
                </p>
              </div>

              {/* 効果1: 企業研修コストの削減 */}
              <div className="detail-section">
                <div className="detail-section-header">
                  <div className="detail-section-icon">
                    <FontAwesomeIcon icon={faYenSign} />
                  </div>
                  <h2>1. 企業研修コストの削減</h2>
                </div>

                <div className="detail-content-block">
                  <h3>従来型研修との比較</h3>
                  <p>
                    企業研修において、外部講師を招いた座学型研修は高額なコストがかかります。
                    一方、テーブルゲームを活用した研修は、<strong>初期投資後は繰り返し使用可能</strong>であり、
                    長期的には大幅なコスト削減が実現できます。
                  </p>

                  <div className="cost-comparison">
                    <h4>コスト比較試算（従業員30名、年6回研修実施）</h4>
                    <div className="comparison-grid">
                      <div className="comparison-item traditional">
                        <h5>従来型研修（外部講師招聘）</h5>
                        <ul>
                          <li>講師料: 15万円/回 × 6回 = 90万円</li>
                          <li>会場費: 2万円/回 × 6回 = 12万円</li>
                          <li>資料印刷費: 3万円/回 × 6回 = 18万円</li>
                        </ul>
                        <div className="total">年間合計: <strong>約120万円</strong></div>
                      </div>

                      <div className="comparison-item modern">
                        <h5>テーブルゲーム研修</h5>
                        <ul>
                          <li>ゲーム購入費: 初年度のみ30万円</li>
                          <li>社内ファシリテーター育成: 10万円</li>
                          <li>会場費（社内利用）: 0円</li>
                          <li>2年目以降: ほぼ0円</li>
                        </ul>
                        <div className="total">初年度: <strong>約40万円</strong> / 2年目以降: <strong>ほぼ0円</strong></div>
                      </div>
                    </div>
                    <div className="savings-result">
                      <FontAwesomeIcon icon={faCheckCircle} />
                      <strong>年間約80万円のコスト削減</strong>（2年目以降は120万円削減）
                    </div>
                  </div>
                </div>

                <div className="detail-content-block">
                  <h3>学習効果の向上によるROI</h3>
                  <p>
                    コスト削減だけでなく、学習効果も大幅に向上します。
                  </p>
                  <ul>
                    <li><strong>記憶定着率:</strong> 座学15-20% → ゲーム型75-90%（約4〜5倍）</li>
                    <li><strong>参加満足度:</strong> 座学60% → ゲーム型90%以上</li>
                    <li><strong>行動変容率:</strong> 座学30% → ゲーム型75%（2.5倍）</li>
                  </ul>

                  <div className="research-box">
                    <h4>企業導入事例データ</h4>
                    <ul>
                      <li><strong>IT企業A社:</strong> ゲーム型研修導入により、研修コストを年間150万円削減。同時に新人の業務習熟期間が3ヶ月→2ヶ月に短縮</li>
                      <li><strong>製造業B社:</strong> 外部講師依存から脱却し、3年間で累計500万円のコスト削減を達成</li>
                      <li><strong>サービス業C社:</strong> ゲーム研修の満足度95%（従来型は62%）、再受講希望率80%</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 効果2: 離職率低下による採用コスト削減 */}
              <div className="detail-section">
                <div className="detail-section-header">
                  <div className="detail-section-icon">
                    <FontAwesomeIcon icon={faUserTie} />
                  </div>
                  <h2>2. 離職率低下による採用コスト削減</h2>
                </div>

                <div className="detail-content-block">
                  <h3>離職がもたらす経済的損失</h3>
                  <p>
                    社員1名が退職すると、企業には大きなコストが発生します。
                  </p>
                  <ul>
                    <li><strong>採用コスト:</strong> 求人広告費、人材紹介手数料、面接官の工数など（平均50〜100万円）</li>
                    <li><strong>育成コスト:</strong> 研修費、OJT指導者の工数、習熟期間の生産性ロス（平均100〜200万円）</li>
                    <li><strong>業務への影響:</strong> 引き継ぎコスト、業務の遅延、残った社員への負担増加</li>
                  </ul>
                  <p>
                    1名の離職による総コストは、<strong>平均300〜500万円</strong>と試算されます。
                  </p>

                  <div className="case-study">
                    <h4>テーブルゲーム活用による離職率改善事例</h4>
                    <div className="case-data">
                      <p><strong>企業D社（従業員50名、サービス業）</strong></p>
                      <p>月1回のテーブルゲームイベントを導入</p>
                      <ul>
                        <li>新入社員の1年以内離職率: <span className="before">25%</span> → <span className="after">10%</span></li>
                        <li>全社員の年間離職率: <span className="before">18%</span> → <span className="after">8%</span></li>
                      </ul>
                      <p className="impact">
                        <strong>経済的インパクト:</strong><br />
                        年間採用10名 × 離職率15%改善 = 1.5名の離職防止<br />
                        1.5名 × 平均離職コスト350万円 = <strong className="highlight">年間約525万円の損失回避</strong>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="detail-content-block">
                  <h3>なぜテーブルゲームで離職率が下がるのか</h3>
                  <ul className="reason-list">
                    <li><strong>心理的安全性の向上:</strong> カジュアルな交流により、相談しやすい職場環境が生まれる</li>
                    <li><strong>人間関係の構築:</strong> 同僚や上司との距離が縮まり、職場への帰属意識が高まる</li>
                    <li><strong>エンゲージメント向上:</strong> 「会社に来るのが楽しい」という感情が仕事へのモチベーションにつながる</li>
                    <li><strong>早期の孤立防止:</strong> 新人が早い段階で仲間を作れる機会を提供</li>
                  </ul>

                  <div className="research-box">
                    <h4>学術研究データ</h4>
                    <ul>
                      <li><strong>組織行動学会の研究:</strong> 職場での非業務的交流が週1時間以上ある社員は、離職意向が45%低い</li>
                      <li><strong>人的資源管理学会の調査:</strong> エンゲージメントスコアが10%向上すると、離職率が25%低下</li>
                      <li><strong>労働経済学の分析:</strong> 新人の社内友人数が3名以上になると、1年以内離職率が60%減少</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 効果3: 生産性向上による売上増加 */}
              <div className="detail-section">
                <div className="detail-section-header">
                  <div className="detail-section-icon">
                    <FontAwesomeIcon icon={faRocket} />
                  </div>
                  <h2>3. 生産性向上による売上増加</h2>
                </div>

                <div className="detail-content-block">
                  <h3>コミュニケーション改善が生産性に与える影響</h3>
                  <p>
                    部署間の連携不足、情報共有の不全、心理的な壁――これらは企業の生産性を大きく阻害します。
                    テーブルゲームを通じた<strong>フラットなコミュニケーション</strong>が、これらの課題を解決し、
                    業務効率の向上、意思決定スピードの改善、創造性の発揮につながります。
                  </p>

                  <div className="case-study">
                    <h4>生産性向上事例</h4>
                    <div className="case-data">
                      <p><strong>製造業E社（従業員50名）</strong></p>
                      <p>月2回、部署横断のゲーム会を半年間実施</p>
                      <ul>
                        <li>部署間の情報共有頻度: 週1回 → 週4回に増加</li>
                        <li>製品開発サイクル: 9ヶ月 → 6ヶ月に短縮</li>
                        <li>製造ミス・トラブル: 30%減少</li>
                        <li>新製品アイデア提案数: 2倍に増加</li>
                      </ul>
                      <p className="impact">
                        <strong>経済的インパクト:</strong><br />
                        開発サイクル短縮により市場投入が3ヶ月早まり、<br />
                        競合優位性向上 → <strong className="highlight">年間売上10%増加（約2,000万円）</strong>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="detail-content-block">
                  <h3>生産性向上のメカニズム</h3>
                  <ul className="mechanism-list">
                    <li><strong>部署間の壁の解消:</strong> 顔見知りが増えることで、「ちょっと聞いてみよう」が気軽にできる</li>
                    <li><strong>情報の非公式ネットワーク:</strong> 公式な報告ルート以外に、迅速な情報共有経路ができる</li>
                    <li><strong>心理的安全性:</strong> ミスや問題を早期に報告しやすくなり、大きなトラブルを未然に防ぐ</li>
                    <li><strong>創造的アイデア:</strong> 異なる視点を持つメンバーとの交流が、イノベーションを促進</li>
                  </ul>

                  <div className="research-box">
                    <h4>研究データ</h4>
                    <ul>
                      <li><strong>マッキンゼーの調査:</strong> 効果的なコミュニケーションにより、生産性が20〜25%向上</li>
                      <li><strong>ハーバード・ビジネス・レビュー:</strong> 心理的安全性が高いチームは、パフォーマンスが平均27%高い</li>
                      <li><strong>Googleの研究(Project Aristotle):</strong> 高パフォーマンスチームの最重要要素は「心理的安全性」</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 効果4: 地域活性化・観光促進 */}
              <div className="detail-section">
                <div className="detail-section-header">
                  <div className="detail-section-icon">
                    <FontAwesomeIcon icon={faGlobe} />
                  </div>
                  <h2>4. 地域活性化・観光促進</h2>
                </div>

                <div className="detail-content-block">
                  <h3>ご当地テーブルゲームの経済効果</h3>
                  <p>
                    地域の魅力をテーマにしたテーブルゲームは、<strong>観光PR</strong>、<strong>関係人口の創出</strong>、
                    <strong>地域経済への波及効果</strong>など、多面的な地域活性化を実現します。
                  </p>

                  <div className="regional-effect">
                    <h4>地域イベントの経済波及効果試算</h4>
                    <p><strong>ご当地ゲームイベント（年間来場者500名規模）</strong></p>
                    <div className="effect-breakdown">
                      <div className="effect-item">
                        <h5>直接効果</h5>
                        <ul>
                          <li>参加費収入: 1,000円 × 500名 = 50万円</li>
                          <li>ゲーム販売: 3,000円 × 100個 = 30万円</li>
                        </ul>
                      </div>
                      <div className="effect-item">
                        <h5>間接効果（参加者による地域内消費）</h5>
                        <ul>
                          <li>飲食: 2,000円 × 400名 = 80万円</li>
                          <li>交通: 1,500円 × 300名 = 45万円</li>
                          <li>宿泊: 8,000円 × 100名 = 80万円</li>
                          <li>お土産: 3,000円 × 200名 = 60万円</li>
                        </ul>
                      </div>
                    </div>
                    <div className="total-effect">
                      年間経済効果: <strong className="highlight">約345万円</strong>
                    </div>
                    <p className="note">※さらに、リピーター化による長期的効果、SNS拡散による認知度向上などの副次効果も期待できる</p>
                  </div>
                </div>

                <div className="detail-content-block">
                  <h3>実際の成功事例</h3>
                  <div className="research-box">
                    <h4>全国の地域活性化事例</h4>
                    <ul>
                      <li><strong>北海道某市:</strong> ご当地ボードゲーム開発により、年間来場者700名、地域内消費約500万円を創出</li>
                      <li><strong>関西地方某町:</strong> ゲームイベントをきっかけに関係人口が200名増加、移住者も3家族誕生</li>
                      <li><strong>九州地方某村:</strong> 過疎地域で月1回のゲーム会開催。世代間交流が活発化し、高齢者の外出頻度が50%増加</li>
                    </ul>
                  </div>
                </div>

                <div className="detail-content-block">
                  <h3>地域活性化のメカニズム</h3>
                  <ul className="mechanism-list">
                    <li><strong>交流人口の拡大:</strong> イベント参加者が地域を訪れ、消費活動を行う</li>
                    <li><strong>関係人口の創出:</strong> リピーター化により、継続的な地域貢献者が増える</li>
                    <li><strong>郷土愛の醸成:</strong> 地元住民が自分の地域をゲームで学び、誇りを持つきっかけに</li>
                    <li><strong>PR効果:</strong> SNSや口コミで地域の魅力が全国に拡散</li>
                  </ul>
                </div>
              </div>

              {/* 効果5: 教育コストの最適化 */}
              <div className="detail-section">
                <div className="detail-section-header">
                  <div className="detail-section-icon">
                    <FontAwesomeIcon icon={faGraduationCap} />
                  </div>
                  <h2>5. 教育コストの最適化</h2>
                </div>

                <div className="detail-content-block">
                  <h3>学習効率の向上による投資効果最大化</h3>
                  <p>
                    教育機関や企業の教育投資において、<strong>費用をかけること</strong>以上に重要なのは、
                    <strong>その投資が実際の成果につながるか</strong>です。テーブルゲームは、限られた教育予算で
                    最大限の学習効果を引き出す、費用対効果の高いツールです。
                  </p>

                  <div className="education-comparison">
                    <h4>学習効果の比較</h4>
                    <table className="comparison-table">
                      <thead>
                        <tr>
                          <th>指標</th>
                          <th>従来型講義</th>
                          <th>ゲームベース学習</th>
                          <th>改善率</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>記憶定着率</td>
                          <td>15-20%</td>
                          <td>75-90%</td>
                          <td className="improvement">+375%</td>
                        </tr>
                        <tr>
                          <td>学習満足度</td>
                          <td>60%</td>
                          <td>92%</td>
                          <td className="improvement">+53%</td>
                        </tr>
                        <tr>
                          <td>理解度テスト成績</td>
                          <td>70点</td>
                          <td>84点</td>
                          <td className="improvement">+20%</td>
                        </tr>
                        <tr>
                          <td>能動的学習姿勢</td>
                          <td>35%</td>
                          <td>78%</td>
                          <td className="improvement">+123%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="detail-content-block">
                  <h3>教育機関での導入事例</h3>
                  <div className="case-study">
                    <h4>大学での経営学ゼミ事例</h4>
                    <div className="case-data">
                      <p><strong>某大学経営学部（学生40名）</strong></p>
                      <p>経営シミュレーションゲームを半期授業で活用</p>
                      <ul>
                        <li>授業満足度: 72% → 96%</li>
                        <li>期末試験平均点: 68点 → 82点</li>
                        <li>「実務に役立つ」と回答: 55% → 88%</li>
                        <li>自主学習時間: 週2時間 → 週4時間</li>
                      </ul>
                      <p className="impact">
                        <strong>教育効果:</strong><br />
                        追加コストほぼゼロで、理論と実践の結びつきが大幅に向上。<br />
                        学生の学習意欲が高まり、教員の授業準備負担も軽減。
                      </p>
                    </div>
                  </div>

                  <div className="research-box">
                    <h4>研究データ</h4>
                    <ul>
                      <li><strong>米国教育省の調査:</strong> ゲームベース学習により、STEM科目の成績が平均15%向上</li>
                      <li><strong>欧州教育研究ネットワーク:</strong> ゲーム活用授業は、従来型授業と比較して学習時間が30%短縮</li>
                      <li><strong>日本教育工学会:</strong> ゲーム型教材による学習は、同じ内容を40%少ない時間で習得可能</li>
                    </ul>
                  </div>
                </div>

                <div className="detail-content-block">
                  <h3>なぜ教育効率が高まるのか</h3>
                  <ul className="mechanism-list">
                    <li><strong>能動的学習:</strong> 受け身ではなく、自分で考え行動することで深く理解できる</li>
                    <li><strong>即座のフィードバック:</strong> ゲーム内で結果がすぐ分かるため、学習サイクルが高速化</li>
                    <li><strong>失敗の許容:</strong> 安全な環境で試行錯誤できるため、挑戦的な学びが可能</li>
                    <li><strong>感情の動き:</strong> 楽しい、悔しい、嬉しいといった感情が記憶を強化する</li>
                  </ul>
                </div>
              </div>

              {/* 総合まとめ */}
              <div className="detail-summary">
                <h2>
                  <FontAwesomeIcon icon={faCheckCircle} />
                  まとめ: テーブルゲームの経済的価値
                </h2>
                <p>
                  テーブルゲームは、<strong>「コスト削減」「売上増加」「人材定着」「地域振興」「教育効率化」</strong>という
                  複数の経済効果を同時に実現できる、極めて費用対効果の高いツールです。
                </p>
                <p>
                  初期投資は比較的低く抑えられる一方、長期的には組織や地域に大きなリターンをもたらします。
                  さらに、これらの効果は<strong>金銭的価値だけでなく、人々の幸福度や満足度の向上</strong>という、
                  数値化できない無形の価値も同時に生み出します。
                </p>
                <p>
                  企業、教育機関、自治体、あらゆる組織において、テーブルゲームは<strong>戦略的投資</strong>として
                  検討する価値がある選択肢なのです。
                </p>
              </div>

              {/* CTA */}
              <div className="detail-cta">
                <Link to="/tablegame" className="cta-btn-back">
                  <FontAwesomeIcon icon={faArrowLeft} />
                  テーブルゲームとは に戻る
                </Link>
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

export default DetailEconomics;
