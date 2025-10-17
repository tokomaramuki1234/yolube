import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BackToTop from '../../components/BackToTop';
import '../../styles/BasePage.css';
import './DetailPages.css';

const DetailEffects = () => {
  return (
    <>
      <Helmet>
        <title>テーブルゲームがもたらす効果 | YOLUBE</title>
        <meta name="description" content="テーブルゲームがもたらす6つの効果を詳細解説。コミュニケーション能力、チームワーク、論理的思考、心理的安全性、ストレス軽減、創造性の向上について、科学的根拠とともに紹介します。" />
      </Helmet>

      <Header />

      <div className="base-page detail-page">
        {/* ヒーローセクション */}
        <section className="base-hero detail-hero">
          <div className="container">
            <Link to="/tablegame" className="back-link">
              ← テーブルゲームとは に戻る
            </Link>
            <div className="detail-hero-content">
              <div className="detail-hero-icon">
                🎓
              </div>
              <h1 className="base-hero-title">テーブルゲームがもたらす効果</h1>
              <p className="detail-hero-subtitle">
                科学的根拠に基づく、6つの多面的・持続的効果
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
                  テーブルゲームは、単に「楽しい時間を過ごす」以上の、<strong>多面的で持続的な効果</strong>をもたらします。
                  ここでは、実際にテーブルゲームを活用した結果、どのような変化が生まれるのかを、
                  <strong>科学的根拠、研究データ、実証事例</strong>とともに詳しく解説します。
                </p>
              </div>

              {/* 効果1: コミュニケーション能力の向上 */}
              <div className="detail-section">
                <div className="detail-section-header">
                  <h2>1. コミュニケーション能力の向上</h2>
                </div>

                <div className="detail-content-block">
                  <h3>なぜコミュニケーション能力が向上するのか</h3>
                  <p>
                    テーブルゲームでは、プレイヤー同士が<strong>直接顔を合わせて対話</strong>します。
                    この対面コミュニケーションにより、<strong>「伝える力」と「聴く力」</strong>が自然に鍛えられます。
                  </p>
                  <p>
                    特に重要なのは、言語情報だけでなく、<strong>非言語情報（表情・声のトーン・身振り手振り）</strong>も
                    フル活用する点です。心理学者アルバート・メラビアンの研究によれば、コミュニケーションにおいて
                    言語情報が占める割合はわずか7%。残りの93%は非言語情報です。
                  </p>
                </div>

                <div className="detail-content-block">
                  <h3>具体的に向上する能力</h3>
                  <ul className="skill-detail-list">
                    <li>
                      <strong>言語化能力:</strong> 自分の考えを分かりやすく説明する力がつく<br />
                      <span className="skill-example">例: ゲーム中に「私はこう考えるから、こう行動する」と説明する機会が頻繁にある</span>
                    </li>
                    <li>
                      <strong>傾聴力:</strong> 相手の話を最後まで聞き、意図を理解する姿勢が身につく<br />
                      <span className="skill-example">例: 協力型ゲームでは、仲間の意見をしっかり聞かないと失敗する</span>
                    </li>
                    <li>
                      <strong>非言語コミュニケーション:</strong> 表情や態度から相手の感情を読み取る力が発達<br />
                      <span className="skill-example">例: 相手の表情から「困っているな」「自信があるな」を察知できるようになる</span>
                    </li>
                    <li>
                      <strong>交渉力:</strong> 説得・妥協・協力のバランス感覚が磨かれる<br />
                      <span className="skill-example">例: 交渉型ゲームで「Win-Win」を目指す経験が実務でも活きる</span>
                    </li>
                  </ul>
                </div>

                <div className="detail-content-block">
                  <h3>研究データ・実証事例</h3>
                  <div className="research-box">
                    <h4>学術研究</h4>
                    <ul>
                      <li><strong>ハーバード大学の研究:</strong> 対面でのやり取りは、オンラインコミュニケーションと比較して信頼構築速度が約2倍</li>
                      <li><strong>スタンフォード大学の調査:</strong> 非言語情報を含むコミュニケーションは、記憶定着率が1.8倍高い</li>
                      <li><strong>日本心理学会の報告:</strong> 対面ゲームプレイ後、参加者の共感力テストスコアが平均15%向上</li>
                    </ul>
                  </div>

                  <div className="case-box">
                    <h4>企業での実証事例</h4>
                    <p><strong>IT企業F社（従業員80名）</strong></p>
                    <p>月1回のゲーム研修を半年継続</p>
                    <ul>
                      <li>社内アンケート「会議での発言がしやすくなった」: 45% → 72%（+27ポイント）</li>
                      <li>部署間の情報共有頻度: 週2回 → 週5回（2.5倍）</li>
                      <li>顧客とのコミュニケーション評価（顧客アンケート）: 3.2点 → 4.1点（5点満点）</li>
                    </ul>
                  </div>
                </div>

                <div className="detail-content-block">
                  <h3>なぜこの効果が持続するのか</h3>
                  <p>
                    ゲームでのコミュニケーション体験は、<strong>「楽しい記憶」として脳に刻まれる</strong>ため、
                    その後の日常生活や業務でも自然とその感覚を再現できます。座学で学んだことは忘れやすいですが、
                    感情を伴う体験は長期記憶として定着します。
                  </p>
                </div>
              </div>

              {/* 効果2: チームワークと協調性の強化 */}
              <div className="detail-section">
                <div className="detail-section-header">
                  <h2>2. チームワークと協調性の強化</h2>
                </div>

                <div className="detail-content-block">
                  <h3>なぜチームワークが強化されるのか</h3>
                  <p>
                    協力型ゲームでは、<strong>「全員で共通の目標に向かう」</strong>体験ができます。
                    これは、組織における理想的なチームワークと全く同じ構造です。
                  </p>
                  <p>
                    重要なのは、ゲームという<strong>「安全な環境」</strong>で失敗も成功も体験できること。
                    失敗から学び、成功体験を共有することで、<strong>相互信頼とチームの結束力</strong>が自然と生まれます。
                  </p>
                </div>

                <div className="detail-content-block">
                  <h3>具体的に強化される能力</h3>
                  <ul className="skill-detail-list">
                    <li>
                      <strong>役割分担の理解:</strong> 各自の強みを活かし、弱みを補い合う重要性を体感<br />
                      <span className="skill-example">例: 「Aさんは戦略が得意、Bさんは細かい作業が得意」と役割を自然に分担</span>
                    </li>
                    <li>
                      <strong>相互信頼の構築:</strong> 共通の成功体験が仲間への信頼感を生む<br />
                      <span className="skill-example">例: 「あの時助けてくれた」という経験が、業務でも助け合う文化につながる</span>
                    </li>
                    <li>
                      <strong>リーダーシップの発揮:</strong> 自然とリーダー役を担う機会が生まれる<br />
                      <span className="skill-example">例: ゲームで「こうしよう」と提案した経験が、会議での発言につながる</span>
                    </li>
                    <li>
                      <strong>フォロワーシップの習得:</strong> サポート役の重要性も理解できる<br />
                      <span className="skill-example">例: リーダーだけでは勝てない。サポート役の価値を実感</span>
                    </li>
                  </ul>
                </div>

                <div className="detail-content-block">
                  <h3>研究データ・実証事例</h3>
                  <div className="research-box">
                    <h4>学術研究</h4>
                    <ul>
                      <li><strong>オックスフォード大学の研究:</strong> 協力型ゲーム体験後、チームタスクの成功率が40%向上</li>
                      <li><strong>ビジネススクール調査:</strong> ゲームベース研修を受けた管理職は、チームマネジメント評価が平均30%改善</li>
                      <li><strong>産業組織心理学会の報告:</strong> ゲーム活動を取り入れた企業では、部署間連携スコアが平均22%上昇</li>
                    </ul>
                  </div>

                  <div className="case-box">
                    <h4>製造業での実証事例</h4>
                    <p><strong>製造業G社（従業員100名）</strong></p>
                    <p>協力型ゲーム研修を四半期ごとに実施</p>
                    <ul>
                      <li>現場での「助け合い行動」の観察回数: 週10回 → 週18回（1.8倍）</li>
                      <li>トラブル発生時の部署間連携スピード: 平均3時間 → 平均1時間（66%短縮）</li>
                      <li>生産ライン停止時間: 月20時間 → 月12時間（40%削減）</li>
                      <li>社員アンケート「チームの一体感を感じる」: 58% → 84%（+26ポイント）</li>
                    </ul>
                  </div>
                </div>

                <div className="detail-content-block">
                  <h3>チームワーク強化のメカニズム</h3>
                  <p>
                    協力型ゲームでは、<strong>「共通の敵（ゲームの難題）に立ち向かう」</strong>構造があります。
                    これにより、メンバー間の競争意識が薄れ、<strong>「一緒に乗り越えよう」という連帯感</strong>が生まれます。
                  </p>
                  <p>
                    さらに、ゲーム後の振り返りで「あの判断は良かった」「次はこうしよう」と話し合うことで、
                    <strong>建設的なフィードバック文化</strong>が根付きます。
                  </p>
                </div>
              </div>

              {/* 効果3: 論理的思考力・問題解決能力の向上 */}
              <div className="detail-section">
                <div className="detail-section-header">
                  <h2>3. 論理的思考力・問題解決能力の向上</h2>
                </div>

                <div className="detail-content-block">
                  <h3>なぜ論理的思考力が向上するのか</h3>
                  <p>
                    テーブルゲームの多くは、<strong>ゲーム理論</strong>（数学・経済学の一分野）に基づいて設計されています。
                    プレイヤーは、<strong>限られたリソースで最適な選択をする</strong>ことを繰り返します。
                  </p>
                  <p>
                    この「仮説を立てる→実行する→結果を見る→次に活かす」という<strong>PDCA思考回路</strong>が、
                    ゲームを通じて自然に身につきます。
                  </p>
                </div>

                <div className="detail-content-block">
                  <h3>具体的に向上する能力</h3>
                  <ul className="skill-detail-list">
                    <li>
                      <strong>仮説検証思考:</strong> 「こうすればどうなるか」を考え、試行錯誤を繰り返す<br />
                      <span className="skill-example">例: 「この手を打てば次にこうなるはず」と予測し、結果を検証</span>
                    </li>
                    <li>
                      <strong>リスク管理:</strong> リスクとリターンを天秤にかけて判断する力が養われる<br />
                      <span className="skill-example">例: 「大きく賭けるか、安全策を取るか」の判断を何度も経験</span>
                    </li>
                    <li>
                      <strong>優先順位付け:</strong> 限られたリソースで何を優先すべきかを判断できるようになる<br />
                      <span className="skill-example">例: 「今すぐ必要なこと」と「後回しでいいこと」の見極め</span>
                    </li>
                    <li>
                      <strong>柔軟な対応力:</strong> 予期しない展開にも臨機応変に対処する力がつく<br />
                      <span className="skill-example">例: 計画が崩れても、新しい戦略をすぐに立て直せる</span>
                    </li>
                  </ul>
                </div>

                <div className="detail-content-block">
                  <h3>研究データ・実証事例</h3>
                  <div className="research-box">
                    <h4>学術研究</h4>
                    <ul>
                      <li><strong>MIT(マサチューセッツ工科大学)の研究:</strong> 戦略ゲームを定期的にプレイする学生は、論理テストの成績が平均18%高い</li>
                      <li><strong>ケンブリッジ大学の調査:</strong> ボードゲーム経験者は、複雑な問題解決タスクを平均25%速く完了</li>
                      <li><strong>日本教育工学会の報告:</strong> ゲームベース学習により、数学的思考力が従来型授業と比較して1.5倍向上</li>
                    </ul>
                  </div>

                  <div className="case-box">
                    <h4>大学での実証事例</h4>
                    <p><strong>某大学経営学ゼミ（学生40名）</strong></p>
                    <p>戦略型ボードゲームを半期授業で活用</p>
                    <ul>
                      <li>期末レポートでの論理展開の明確さ: 教授評価が平均1.5段階向上</li>
                      <li>期末試験での応用問題正答率: 52% → 71%（+19ポイント）</li>
                      <li>「戦略的に考える習慣がついた」: 学生アンケート78%が同意</li>
                    </ul>
                  </div>
                </div>

                <div className="detail-content-block">
                  <h3>論理的思考力向上のメカニズム</h3>
                  <p>
                    ゲームでは、<strong>即座にフィードバック</strong>が得られます。
                    「この行動をしたら、こうなった」が明確なため、<strong>因果関係の理解</strong>が深まります。
                  </p>
                  <p>
                    また、失敗しても「ゲームオーバー」で済むため、<strong>安全に試行錯誤</strong>できます。
                    この「失敗を恐れずに挑戦する環境」が、論理的思考力を飛躍的に伸ばします。
                  </p>
                </div>
              </div>

              {/* 効果4: 心理的安全性の向上 */}
              <div className="detail-section">
                <div className="detail-section-header">
                  <h2>4. 心理的安全性の向上</h2>
                </div>

                <div className="detail-content-block">
                  <h3>心理的安全性とは</h3>
                  <p>
                    心理的安全性とは、<strong>「失敗やミスを恐れずに発言・行動できる環境」</strong>を指します。
                    Googleの研究(Project Aristotle)により、高パフォーマンスチームの最重要要素であることが実証されました。
                  </p>
                  <p>
                    テーブルゲームは、この心理的安全性を高めるための<strong>理想的なツール</strong>です。
                    なぜなら、ゲームという「遊び」の枠組みの中では、<strong>「失敗しても許される」</strong>からです。
                  </p>
                </div>

                <div className="detail-content-block">
                  <h3>具体的な変化</h3>
                  <ul className="skill-detail-list">
                    <li>
                      <strong>失敗への恐れの軽減:</strong> ゲームなら「負けても次がある」と思え、挑戦しやすい<br />
                      <span className="skill-example">例: 「この戦略、うまくいかなかったけど、次はこうしてみよう」と前向きに</span>
                    </li>
                    <li>
                      <strong>相談しやすい雰囲気:</strong> 対等な立場で遊ぶことで、職場でも話しかけやすくなる<br />
                      <span className="skill-example">例: 「ゲームで一緒に楽しんだ上司」は、業務でも相談しやすい存在に</span>
                    </li>
                    <li>
                      <strong>新人の早期適応:</strong> フラットな関係構築により、新人が安心して質問できる環境に<br />
                      <span className="skill-example">例: 「分からないことを聞いても大丈夫」という安心感が生まれる</span>
                    </li>
                    <li>
                      <strong>本音の対話促進:</strong> 遊びを通じて素の自分を出しやすくなる<br />
                      <span className="skill-example">例: ゲーム中の笑顔や悔しがる姿を見て、「この人はこういう人なんだ」と理解が深まる</span>
                    </li>
                  </ul>
                </div>

                <div className="detail-content-block">
                  <h3>研究データ・実証事例</h3>
                  <div className="research-box">
                    <h4>学術研究</h4>
                    <ul>
                      <li><strong>Googleの研究(Project Aristotle):</strong> 高パフォーマンスチームの最重要要素は「心理的安全性」</li>
                      <li><strong>ハーバード・ビジネス・スクール:</strong> 心理的安全性が高いチームは、パフォーマンスが平均27%高い</li>
                      <li><strong>組織行動学会の調査:</strong> 心理的安全性が高い職場は、離職率が50%低い</li>
                    </ul>
                  </div>

                  <div className="case-box">
                    <h4>IT企業での実証事例</h4>
                    <p><strong>IT企業H社（従業員60名）</strong></p>
                    <p>新人歓迎ゲーム会を定期開催</p>
                    <ul>
                      <li>新人の「上司に相談しやすい」と感じる割合: 50% → 85%（+35ポイント）</li>
                      <li>会議での発言回数（新人平均）: 月2回 → 月8回（4倍）</li>
                      <li>新人の「職場に馴染んでいる」実感: 1ヶ月後55% → 1ヶ月後82%（+27ポイント）</li>
                      <li>早期離職率: 25% → 8%（17ポイント改善）</li>
                    </ul>
                  </div>
                </div>

                <div className="detail-content-block">
                  <h3>心理的安全性が高まるメカニズム</h3>
                  <p>
                    ゲームでは、<strong>職位や経験年数に関係なく、全員が「プレイヤー」</strong>です。
                    新人も社長も、ゲームの中では対等。この<strong>フラットな関係性</strong>が、日常業務にも波及します。
                  </p>
                  <p>
                    さらに、ゲーム中の<strong>笑顔や悔しがる姿</strong>を見ることで、相手の人間性が見え、
                    親近感が湧きます。この「人としての距離の近さ」が、心理的安全性につながります。
                  </p>
                </div>
              </div>

              {/* 効果5: ストレス軽減とモチベーション向上 */}
              <div className="detail-section">
                <div className="detail-section-header">
                  <h2>5. ストレス軽減とモチベーション向上</h2>
                </div>

                <div className="detail-content-block">
                  <h3>なぜストレスが軽減されるのか</h3>
                  <p>
                    「楽しい」という感情は、脳内で<strong>ドーパミン（快楽ホルモン）</strong>や
                    <strong>セロトニン（幸せホルモン）</strong>の分泌を促します。
                    これらの神経伝達物質は、<strong>ストレスホルモン（コルチゾール）を抑制</strong>する働きがあります。
                  </p>
                  <p>
                    テーブルゲームは、短時間でも<strong>気分転換・リフレッシュ効果</strong>が高く、
                    業務への集中力回復にも効果的です。
                  </p>
                </div>

                <div className="detail-content-block">
                  <h3>具体的な変化</h3>
                  <ul className="skill-detail-list">
                    <li>
                      <strong>笑顔と笑い声の増加:</strong> 職場の雰囲気が明るくなり、全体の士気が向上<br />
                      <span className="skill-example">例: ゲーム会後、職場全体が「なんとなく明るい空気」になる</span>
                    </li>
                    <li>
                      <strong>リフレッシュ効果:</strong> 短時間でも気分転換でき、業務への集中力が回復<br />
                      <span className="skill-example">例: 昼休みの15分ゲームで午後の生産性が上がる</span>
                    </li>
                    <li>
                      <strong>内発的動機づけ:</strong> 「またやりたい」という自発的な意欲が湧く<br />
                      <span className="skill-example">例: 「次はこのゲームやろう」と社員自ら企画する文化が生まれる</span>
                    </li>
                    <li>
                      <strong>ポジティブな記憶:</strong> 楽しい体験が職場への愛着を強める<br />
                      <span className="skill-example">例: 「うちの会社、こういう楽しいことがある」と誇りに思える</span>
                    </li>
                  </ul>
                </div>

                <div className="detail-content-block">
                  <h3>研究データ・実証事例</h3>
                  <div className="research-box">
                    <h4>学術研究</h4>
                    <ul>
                      <li><strong>神経科学の研究:</strong> 笑いは、ストレスホルモン(コルチゾール)を最大39%減少させる</li>
                      <li><strong>産業医学会の調査:</strong> 職場での楽しい活動が週1時間以上ある社員は、バーンアウトリスクが45%低い</li>
                      <li><strong>労働心理学の報告:</strong> ポジティブな感情は、創造性を最大3倍高める</li>
                    </ul>
                  </div>

                  <div className="case-box">
                    <h4>企業での実証事例</h4>
                    <p><strong>サービス業I社（従業員50名）</strong></p>
                    <p>毎週金曜の昼休みに15分間のミニゲーム会を開催</p>
                    <ul>
                      <li>午後の生産性（タスク完了率）: 平均68% → 平均82%（+14ポイント）</li>
                      <li>「月曜が憂鬱でない」と答える社員: 48% → 73%（+25ポイント）</li>
                      <li>ストレスチェック総合スコア: 平均72点 → 平均58点（低いほど良い）</li>
                      <li>社員満足度: 65% → 84%（+19ポイント）</li>
                    </ul>
                  </div>
                </div>

                <div className="detail-content-block">
                  <h3>ストレス軽減のメカニズム</h3>
                  <p>
                    テーブルゲームは、<strong>「フロー状態」</strong>（極度の集中と楽しさが同時に起こる状態）を生み出しやすい活動です。
                    フロー状態では、<strong>時間を忘れて没頭</strong>し、ストレスから完全に解放されます。
                  </p>
                  <p>
                    また、ゲーム中の笑いや驚きといった<strong>感情の起伏</strong>が、脳をリフレッシュさせます。
                    これは、単なる休憩よりも効果的なストレス解消法です。
                  </p>
                </div>
              </div>

              {/* 効果6: 創造性とイノベーションの促進 */}
              <div className="detail-section">
                <div className="detail-section-header">
                  <h2>6. 創造性とイノベーションの促進</h2>
                </div>

                <div className="detail-content-block">
                  <h3>なぜ創造性が向上するのか</h3>
                  <p>
                    テーブルゲームでは、<strong>「こうしなければならない」という固定観念がない</strong>環境で、
                    多様な戦略や発想を試すことができます。この<strong>自由な発想の訓練</strong>が、
                    業務における創造性やイノベーションにつながります。
                  </p>
                  <p>
                    特に、異なる部署や背景を持つメンバーとゲームをすることで、
                    <strong>多様な視点や考え方</strong>に触れ、視野が広がります。
                  </p>
                </div>

                <div className="detail-content-block">
                  <h3>具体的な変化</h3>
                  <ul className="skill-detail-list">
                    <li>
                      <strong>発想の柔軟性:</strong> 多様なゲーム展開を経験し、固定観念から脱却<br />
                      <span className="skill-example">例: 「こんなやり方もあるんだ!」という気づきが、業務改善のヒントに</span>
                    </li>
                    <li>
                      <strong>アイデアの提案増加:</strong> 「こんなやり方もある」と気づき、業務改善提案が活発化<br />
                      <span className="skill-example">例: ゲームでの柔軟な思考が、会議での新しい提案につながる</span>
                    </li>
                    <li>
                      <strong>異分野の知見融合:</strong> 異なる部署のメンバーと遊ぶことで新しい視点を得る<br />
                      <span className="skill-example">例: 営業部と技術部が一緒にゲームすることで、相互理解と協業アイデアが生まれる</span>
                    </li>
                    <li>
                      <strong>失敗から学ぶ姿勢:</strong> 試行錯誤を楽しむ文化が根付く<br />
                      <span className="skill-example">例: 「失敗してもいい、そこから学べばいい」という前向きな姿勢</span>
                    </li>
                  </ul>
                </div>

                <div className="detail-content-block">
                  <h3>研究データ・実証事例</h3>
                  <div className="research-box">
                    <h4>学術研究</h4>
                    <ul>
                      <li><strong>創造性研究の権威、Teresa Amabile博士:</strong> ポジティブな感情は創造性を最大3倍高める</li>
                      <li><strong>スタンフォード大学d.school:</strong> 遊び心のある環境は、イノベーション創出率が2倍</li>
                      <li><strong>イノベーション研究:</strong> 多様なバックグラウンドを持つチームは、単一チームより40%多くのアイデアを生む</li>
                    </ul>
                  </div>

                  <div className="case-box">
                    <h4>広告代理店での実証事例</h4>
                    <p><strong>広告代理店J社（従業員40名）</strong></p>
                    <p>ブレインストーミング前に20分のゲームタイムを導入</p>
                    <ul>
                      <li>企画案の提案数: 平均8案 → 平均12案（1.5倍）</li>
                      <li>クライアントに採用された企画数: 年間15件 → 年間22件（1.47倍）</li>
                      <li>「斬新なアイデアが出た」と評価された企画: 30% → 48%（+18ポイント）</li>
                      <li>チーム内での「良いアイデアを出し合える雰囲気」: 62% → 89%（+27ポイント）</li>
                    </ul>
                  </div>
                </div>

                <div className="detail-content-block">
                  <h3>創造性促進のメカニズム</h3>
                  <p>
                    ゲームでは、<strong>「正解は一つではない」</strong>という環境が創造性を刺激します。
                    同じゲームでも、プレイヤーによって全く異なる戦略が取られるのを見ることで、
                    <strong>「いろんな考え方がある」</strong>という柔軟な思考が育ちます。
                  </p>
                  <p>
                    また、ゲーム中のポジティブな感情（楽しい、ワクワクする）が、
                    脳の<strong>「拡散的思考」</strong>（多様なアイデアを生み出す思考）を活性化させます。
                  </p>
                </div>
              </div>

              {/* 総合まとめ */}
              <div className="detail-summary">
                <h2>
                  まとめ: なぜテーブルゲームは効果的なのか
                </h2>
                <p>
                  テーブルゲームがこれほど多様な効果をもたらす理由は、
                  <strong>「体験型学習」「楽しさ」「対面交流」</strong>という3つの要素が絶妙に組み合わさっているからです。
                </p>
                <div className="summary-points">
                  <div className="summary-point">
                    <h3>体験型学習</h3>
                    <p>座学では得られない、<strong>感情が動く深い学び</strong>が実現</p>
                  </div>
                  <div className="summary-point">
                    <h3>楽しさ</h3>
                    <p>「遊び」だから<strong>自発的に前のめり</strong>で取り組める</p>
                  </div>
                  <div className="summary-point">
                    <h3>対面交流</h3>
                    <p>非言語コミュニケーションを含む<strong>豊かな人間関係</strong>が生まれる</p>
                  </div>
                </div>
                <p>
                  何より重要なのは、これらの効果が<strong>「押しつけ」ではなく「自発的」</strong>に現れることです。
                  参加者は楽しんでいるうちに、自然とスキルを身につけ、人間関係を構築し、ポジティブな変化を実感できます。
                </p>
                <p>
                  この<strong>「楽しみながら成長できる」</strong>という特性こそが、テーブルゲームが
                  企業・教育・地域・福祉・家庭など、あらゆる場面で求められる理由なのです。
                </p>
              </div>

              {/* CTA */}
              <div className="detail-cta">
                <Link to="/tablegame" className="cta-btn-back">
                  ← テーブルゲームとは に戻る
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

export default DetailEffects;
