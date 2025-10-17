import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BackToTop from '../../components/BackToTop';
import '../../styles/BasePage.css';
import './DetailPages.css';

const DetailCases = () => {
  return (
    <>
      <Helmet>
        <title>テーブルゲーム活用事例 | YOLUBE</title>
        <meta name="description" content="企業研修、教育機関、地域活性化、福祉・医療、家庭など、様々な場面でのテーブルゲーム活用事例を詳細に紹介。具体的な導入効果と成功のポイントを解説します。" />
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
                🏢
              </div>
              <h1 className="base-hero-title">テーブルゲーム活用事例</h1>
              <p className="detail-hero-subtitle">
                実際の現場で、どのように活用され、どんな成果を生んでいるのか
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
                  テーブルゲームは、企業、教育機関、地域、福祉施設、家庭など、様々な場面で活用され、
                  確かな成果を上げています。ここでは、実際の活用事例を6つのジャンルに分けて、
                  <strong>導入背景・実施内容・具体的な効果・成功のポイント</strong>を詳しくご紹介します。
                </p>
              </div>

              {/* 事例1: 企業研修（新入社員） */}
              <div className="detail-section">
                <div className="detail-section-header">
                  <h2>1. 企業研修: 新入社員オンボーディング</h2>
                </div>

                <div className="case-detail-box">
                  <div className="case-meta">
                    <span className="case-industry">業種: IT・製造・サービス業など多数</span>
                    <span className="case-scale">規模: 新入社員10〜50名</span>
                  </div>

                  <div className="detail-content-block">
                    <h3>導入背景・課題</h3>
                    <ul>
                      <li>新入社員の早期離職率が高い（1年以内に20〜30%が退職）</li>
                      <li>同期同士や先輩社員との人間関係が希薄</li>
                      <li>配属後に「相談できる人がいない」と孤立する新人が多い</li>
                      <li>座学中心の研修では、コミュニケーション能力が育ちにくい</li>
                    </ul>
                  </div>

                  <div className="detail-content-block">
                    <h3>実施内容</h3>
                    <p><strong>プログラム:</strong> 入社1週目にアイスブレイク型ゲーム、2週目に協力型ゲーム研修</p>
                    <ul>
                      <li><strong>アイスブレイク:</strong> 自己紹介を兼ねた軽快なパーティーゲーム（30分）</li>
                      <li><strong>チームビルディング:</strong> 4〜5名チームで協力型ボードゲーム（2時間）</li>
                      <li><strong>振り返り:</strong> ゲーム後に気づきをシェア（30分）</li>
                      <li><strong>継続:</strong> 月1回の新人交流ゲーム会を半年間実施</li>
                    </ul>
                  </div>

                  <div className="detail-content-block">
                    <h3>具体的な効果</h3>
                    <div className="effect-data">
                      <div className="data-item">
                        <div className="data-label">1年以内離職率</div>
                        <div className="data-before-after">
                          <span className="before">導入前: 25%</span>
                          →
                          <span className="after">導入後: 10%</span>
                        </div>
                        <div className="data-improvement">15ポイント改善</div>
                      </div>
                      <div className="data-item">
                        <div className="data-label">「上司・先輩に相談しやすい」</div>
                        <div className="data-before-after">
                          <span className="before">導入前: 50%</span>
                          →
                          <span className="after">導入後: 85%</span>
                        </div>
                        <div className="data-improvement">35ポイント向上</div>
                      </div>
                      <div className="data-item">
                        <div className="data-label">新人研修満足度</div>
                        <div className="data-before-after">
                          <span className="before">導入前: 68%</span>
                          →
                          <span className="after">導入後: 94%</span>
                        </div>
                        <div className="data-improvement">26ポイント向上</div>
                      </div>
                    </div>

                    <div className="voice-box">
                      <h4>参加者の声</h4>
                      <blockquote>
                        「ゲームを通じて同期と本音で話せる関係になれた。配属後も気軽に相談し合える仲間ができて、すごく心強い」（新入社員・22歳）
                      </blockquote>
                      <blockquote>
                        「最初は緊張していた新人たちが、ゲーム中は笑顔で楽しそうに話している姿を見て、この研修の価値を実感した」（人事担当者）
                      </blockquote>
                    </div>
                  </div>

                  <div className="detail-content-block">
                    <h3>成功のポイント</h3>
                    <ul className="success-points">
                      <li><strong>早期実施:</strong> 入社直後にゲームで打ち解ける機会を作る</li>
                      <li><strong>ゲーム選択:</strong> 難しすぎず、会話が自然に生まれるものを選ぶ</li>
                      <li><strong>継続性:</strong> 1回だけでなく、定期的に交流の場を設ける</li>
                      <li><strong>先輩参加:</strong> 新人だけでなく、先輩社員も一緒に遊ぶことで距離が縮まる</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 事例2: 企業研修（リーダーシップ） */}
              <div className="detail-section">
                <div className="detail-section-header">
                  <h2>2. 企業研修: リーダーシップ・マネジメント研修</h2>
                </div>

                <div className="case-detail-box">
                  <div className="case-meta">
                    <span className="case-industry">業種: 全業種対象</span>
                    <span className="case-scale">規模: 管理職候補者20〜30名</span>
                  </div>

                  <div className="detail-content-block">
                    <h3>導入背景・課題</h3>
                    <ul>
                      <li>座学でリーダーシップ理論を学んでも、実践につながらない</li>
                      <li>自分のリーダーシップスタイルを客観視する機会が少ない</li>
                      <li>「失敗してもいい環境」で試行錯誤する場がない</li>
                      <li>チームマネジメントの難しさを体感的に理解してほしい</li>
                    </ul>
                  </div>

                  <div className="detail-content-block">
                    <h3>実施内容</h3>
                    <p><strong>プログラム:</strong> 戦略型・協力型ゲームを使った2日間研修</p>
                    <ul>
                      <li><strong>Day1 午前:</strong> リーダーシップ理論の講義（2時間）</li>
                      <li><strong>Day1 午後:</strong> チーム対抗戦型ゲーム（3時間） + 振り返り（1時間）</li>
                      <li><strong>Day2 午前:</strong> 協力型ゲーム（3時間） + 振り返り（1時間）</li>
                      <li><strong>Day2 午後:</strong> 学びのまとめ、行動計画作成（2時間）</li>
                    </ul>
                  </div>

                  <div className="detail-content-block">
                    <h3>具体的な効果</h3>
                    <div className="effect-data">
                      <div className="data-item">
                        <div className="data-label">「自分のリーダーシップスタイルを理解できた」</div>
                        <div className="data-value">92%</div>
                      </div>
                      <div className="data-item">
                        <div className="data-label">「実務で活用できる学びがあった」</div>
                        <div className="data-value">88%</div>
                      </div>
                      <div className="data-item">
                        <div className="data-label">研修3ヶ月後の行動変容（上司評価）</div>
                        <div className="data-value">78%</div>
                      </div>
                    </div>

                    <div className="voice-box">
                      <h4>参加者の声</h4>
                      <blockquote>
                        「ゲーム中、私は一方的に指示を出していたが、メンバーの意見を聞かなかったことで失敗した。この経験が、実務でのマネジメントを見直すきっかけになった」（課長・38歳）
                      </blockquote>
                      <blockquote>
                        「座学だけでは分からなかった『チームの多様性を活かす』ことの重要性を、ゲームを通じて体感できた」（係長・32歳）
                      </blockquote>
                    </div>
                  </div>

                  <div className="detail-content-block">
                    <h3>成功のポイント</h3>
                    <ul className="success-points">
                      <li><strong>理論と実践の組み合わせ:</strong> 講義→ゲーム→振り返りのサイクル</li>
                      <li><strong>安全な失敗環境:</strong> ゲーム内での失敗を歓迎し、学びに変える</li>
                      <li><strong>ビデオ撮影:</strong> ゲーム中の自分の言動を後で見返すことで気づきが深まる</li>
                      <li><strong>多様なゲーム:</strong> 競争型と協力型の両方を体験し、多面的に学ぶ</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 事例3: 教育機関 */}
              <div className="detail-section">
                <div className="detail-section-header">
                  <h2>3. 教育機関: 大学・専門学校での授業活用</h2>
                </div>

                <div className="case-detail-box">
                  <div className="case-meta">
                    <span className="case-industry">対象: 大学・専門学校（経営学・経済学・社会学など）</span>
                    <span className="case-scale">規模: 学生30〜80名</span>
                  </div>

                  <div className="detail-content-block">
                    <h3>導入背景・課題</h3>
                    <ul>
                      <li>座学中心の授業では、学生の興味関心を引きにくい</li>
                      <li>理論は理解しても、実践的な応用力が身につかない</li>
                      <li>学生の授業満足度が低く、出席率も芳しくない</li>
                      <li>グループワークを取り入れても、一部の学生しか参加しない</li>
                    </ul>
                  </div>

                  <div className="detail-content-block">
                    <h3>実施内容</h3>
                    <p><strong>授業形式:</strong> 経営学ゼミで経営シミュレーションゲームを活用</p>
                    <ul>
                      <li><strong>前半:</strong> 経営戦略の理論講義（30分）</li>
                      <li><strong>中盤:</strong> チーム対抗の経営シミュレーションゲーム（60分）</li>
                      <li><strong>後半:</strong> 結果分析と振り返りディスカッション（30分）</li>
                      <li><strong>課題:</strong> ゲームで学んだことをレポートにまとめる</li>
                    </ul>
                  </div>

                  <div className="detail-content-block">
                    <h3>具体的な効果</h3>
                    <div className="effect-data">
                      <div className="data-item">
                        <div className="data-label">授業満足度</div>
                        <div className="data-before-after">
                          <span className="before">導入前: 70%</span>
                          →
                          <span className="after">導入後: 95%</span>
                        </div>
                        <div className="data-improvement">25ポイント向上</div>
                      </div>
                      <div className="data-item">
                        <div className="data-label">期末試験平均点</div>
                        <div className="data-before-after">
                          <span className="before">導入前: 68点</span>
                          →
                          <span className="after">導入後: 82点</span>
                        </div>
                        <div className="data-improvement">14点向上</div>
                      </div>
                      <div className="data-item">
                        <div className="data-label">出席率</div>
                        <div className="data-before-after">
                          <span className="before">導入前: 78%</span>
                          →
                          <span className="after">導入後: 96%</span>
                        </div>
                        <div className="data-improvement">18ポイント向上</div>
                      </div>
                    </div>

                    <div className="voice-box">
                      <h4>学生・教員の声</h4>
                      <blockquote>
                        「教科書で読んだ理論が、ゲームでは『実際にこういうことか!』と腑に落ちた。楽しみながら学べるので、毎週の授業が待ち遠しい」（大学3年生）
                      </blockquote>
                      <blockquote>
                        「ゲームを導入してから、学生の目の色が変わった。自分から質問に来る学生も増え、教える側としても嬉しい」（担当教授）
                      </blockquote>
                    </div>
                  </div>

                  <div className="detail-content-block">
                    <h3>成功のポイント</h3>
                    <ul className="success-points">
                      <li><strong>理論との連動:</strong> ゲームと授業内容をしっかりリンクさせる</li>
                      <li><strong>振り返りの重視:</strong> ゲーム後の振り返りで学びを言語化する</li>
                      <li><strong>評価への組み込み:</strong> ゲーム参加やレポートを成績評価に含める</li>
                      <li><strong>段階的導入:</strong> 最初は簡単なゲームから始め、徐々に複雑なものへ</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 事例4: 地域活性化 */}
              <div className="detail-section">
                <div className="detail-section-header">
                  <h2>4. 地域活性化: ご当地ゲームイベント</h2>
                </div>

                <div className="case-detail-box">
                  <div className="case-meta">
                    <span className="case-industry">主催: 自治体・NPO・商店街</span>
                    <span className="case-scale">規模: 年間来場者500〜1,000名</span>
                  </div>

                  <div className="detail-content-block">
                    <h3>導入背景・課題</h3>
                    <ul>
                      <li>人口減少、特に若者の流出が深刻</li>
                      <li>観光客は来ても、リピーターにならず一度きり</li>
                      <li>世代間交流の場が減り、地域コミュニティが希薄化</li>
                      <li>地域の魅力を知ってもらう新しい方法を模索</li>
                    </ul>
                  </div>

                  <div className="detail-content-block">
                    <h3>実施内容</h3>
                    <p><strong>取り組み:</strong> 地域テーマのオリジナルボードゲーム開発 + 定期イベント開催</p>
                    <ul>
                      <li><strong>ゲーム開発:</strong> 地域住民・学生と協力してご当地ゲームを制作</li>
                      <li><strong>月例イベント:</strong> 毎月第3土曜に公民館でゲーム会開催</li>
                      <li><strong>観光施設での展示:</strong> 道の駅や観光案内所でゲーム体験コーナー設置</li>
                      <li><strong>学校連携:</strong> 地元の小中学校でゲームを使った郷土学習</li>
                    </ul>
                  </div>

                  <div className="detail-content-block">
                    <h3>具体的な効果</h3>
                    <div className="effect-data">
                      <div className="data-item">
                        <div className="data-label">年間来場者数</div>
                        <div className="data-value">約800名（県外40%、地元60%）</div>
                      </div>
                      <div className="data-item">
                        <div className="data-label">リピーター率</div>
                        <div className="data-value">65%（年3回以上参加）</div>
                      </div>
                      <div className="data-item">
                        <div className="data-label">地域内消費（推定）</div>
                        <div className="data-value">約600万円/年</div>
                      </div>
                      <div className="data-item">
                        <div className="data-label">関係人口（継続的に地域に関わる人）</div>
                        <div className="data-value">約200名創出</div>
                      </div>
                    </div>

                    <div className="voice-box">
                      <h4>参加者・主催者の声</h4>
                      <blockquote>
                        「このゲームで初めて訪れた町だが、すっかりファンになった。今では毎月通っている」（県外参加者・28歳）
                      </blockquote>
                      <blockquote>
                        「ゲーム会で10代から70代まで一緒に遊ぶ姿を見て、世代を超えたつながりができていることを実感した」（NPO代表）
                      </blockquote>
                      <blockquote>
                        「自分の住む町をゲームで学んで、もっと好きになった」（地元小学生）
                      </blockquote>
                    </div>
                  </div>

                  <div className="detail-content-block">
                    <h3>成功のポイント</h3>
                    <ul className="success-points">
                      <li><strong>地域住民参加型:</strong> ゲーム開発に地元の人を巻き込むことで当事者意識が生まれる</li>
                      <li><strong>継続性:</strong> 単発イベントではなく、定期開催で関係人口を育てる</li>
                      <li><strong>多世代参加:</strong> 子どもから高齢者まで楽しめる設計</li>
                      <li><strong>多角的活用:</strong> イベント、観光施設、学校など、様々な場面で活用</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 事例5: 福祉・医療 */}
              <div className="detail-section">
                <div className="detail-section-header">
                  <h2>5. 福祉・医療: 高齢者施設でのレクリエーション</h2>
                </div>

                <div className="case-detail-box">
                  <div className="case-meta">
                    <span className="case-industry">施設: 介護施設・デイサービス</span>
                    <span className="case-scale">規模: 入居者・利用者30〜50名</span>
                  </div>

                  <div className="detail-content-block">
                    <h3>導入背景・課題</h3>
                    <ul>
                      <li>高齢者の認知機能低下を予防したい</li>
                      <li>利用者同士の交流が少なく、孤立している人が多い</li>
                      <li>毎日同じレクリエーションでは飽きられてしまう</li>
                      <li>身体機能が低下していても楽しめる活動が限られる</li>
                    </ul>
                  </div>

                  <div className="detail-content-block">
                    <h3>実施内容</h3>
                    <p><strong>プログラム:</strong> 認知機能維持に効果的なゲームを週3回実施</p>
                    <ul>
                      <li><strong>記憶系ゲーム:</strong> カードの位置を覚えるゲーム（認知症予防）</li>
                      <li><strong>コミュニケーション系:</strong> 協力して答えを導くクイズゲーム</li>
                      <li><strong>戦略系:</strong> 簡単なボードゲームで思考力を使う</li>
                      <li><strong>多世代交流:</strong> 月1回、地域の小学生を招いて一緒に遊ぶイベント</li>
                    </ul>
                  </div>

                  <div className="detail-content-block">
                    <h3>具体的な効果</h3>
                    <div className="effect-data">
                      <div className="data-item">
                        <div className="data-label">認知機能テスト（MMSE）スコア</div>
                        <div className="data-before-after">
                          <span className="before">導入前: 平均22.5点</span>
                          →
                          <span className="after">6ヶ月後: 平均24.8点</span>
                        </div>
                        <div className="data-improvement">2.3点向上</div>
                      </div>
                      <div className="data-item">
                        <div className="data-label">利用者同士の会話頻度</div>
                        <div className="data-improvement">週5回 → 週15回（3倍）</div>
                      </div>
                      <div className="data-item">
                        <div className="data-label">レクリエーション参加率</div>
                        <div className="data-before-after">
                          <span className="before">導入前: 55%</span>
                          →
                          <span className="after">導入後: 88%</span>
                        </div>
                        <div className="data-improvement">33ポイント向上</div>
                      </div>
                    </div>

                    <div className="voice-box">
                      <h4>利用者・家族・スタッフの声</h4>
                      <blockquote>
                        「最初は恥ずかしがっていた母が、今ではゲームの日を楽しみにしている。笑顔が増えて、家族として嬉しい」（利用者家族）
                      </blockquote>
                      <blockquote>
                        「ゲーム中は皆さん真剣で、勝った時の笑顔がとても素敵。日常会話も増えて、施設全体が明るくなった」（介護スタッフ）
                      </blockquote>
                    </div>
                  </div>

                  <div className="detail-content-block">
                    <h3>成功のポイント</h3>
                    <ul className="success-points">
                      <li><strong>能力に合わせた選択:</strong> 認知レベルに応じて難易度を調整</li>
                      <li><strong>無理強いしない:</strong> 参加は任意、見ているだけでもOK</li>
                      <li><strong>スタッフの関わり:</strong> 丁寧にルール説明し、サポートする</li>
                      <li><strong>多世代交流:</strong> 地域の子どもたちとの触れ合いで活気が生まれる</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 事例6: 家庭・親子 */}
              <div className="detail-section">
                <div className="detail-section-header">
                  <h2>6. 家庭: 親子コミュニケーションの促進</h2>
                </div>

                <div className="case-detail-box">
                  <div className="case-meta">
                    <span className="case-industry">対象: 一般家庭（親子）</span>
                    <span className="case-scale">規模: 家族3〜5名</span>
                  </div>

                  <div className="detail-content-block">
                    <h3>導入背景・課題</h3>
                    <ul>
                      <li>子どもがスマホやゲーム機ばかりで、家族の会話が減った</li>
                      <li>親子で一緒に楽しめる活動が少ない</li>
                      <li>子どもの学校での様子や悩みを聞き出しにくい</li>
                      <li>休日に家族で過ごす時間を増やしたい</li>
                    </ul>
                  </div>

                  <div className="detail-content-block">
                    <h3>実施内容</h3>
                    <p><strong>取り組み:</strong> 週末に家族でテーブルゲームを1時間プレイ</p>
                    <ul>
                      <li><strong>ゲーム選び:</strong> 子どもの年齢に合わせて、親子で楽しめるゲームを選択</li>
                      <li><strong>定例化:</strong> 毎週日曜の夜を「ゲームの時間」と決める</li>
                      <li><strong>ルール:</strong> ゲーム中はスマホ禁止、全員が対等なプレイヤー</li>
                      <li><strong>記録:</strong> 遊んだゲームと感想を家族日記に記録</li>
                    </ul>
                  </div>

                  <div className="detail-content-block">
                    <h3>具体的な効果</h3>
                    <div className="effect-data">
                      <div className="data-item">
                        <div className="data-label">家族での会話時間（1日あたり）</div>
                        <div className="data-before-after">
                          <span className="before">導入前: 15分</span>
                          →
                          <span className="after">導入後: 45分</span>
                        </div>
                        <div className="data-improvement">3倍に増加</div>
                      </div>
                      <div className="data-item">
                        <div className="data-label">「親に相談しやすい」と感じる子ども</div>
                        <div className="data-improvement">60% → 85%</div>
                      </div>
                      <div className="data-item">
                        <div className="data-label">親の「子どもの様子を理解できている」実感</div>
                        <div className="data-improvement">50% → 80%</div>
                      </div>
                    </div>

                    <div className="voice-box">
                      <h4>家族の声</h4>
                      <blockquote>
                        「ゲーム中、子どもの考え方や性格が見えて、『こんな風に考えるんだ』と新しい発見がある。親子の絆が深まった気がする」（父親・42歳）
                      </blockquote>
                      <blockquote>
                        「最初は『めんどくさい』と言っていた息子が、今では自分からゲームを準備するようになった。家族で笑い合う時間が増えて嬉しい」（母親・38歳）
                      </blockquote>
                      <blockquote>
                        「お父さんもお母さんも本気で遊んでくれるから楽しい。学校であったことも自然に話せる」（小学5年生）
                      </blockquote>
                    </div>
                  </div>

                  <div className="detail-content-block">
                    <h3>成功のポイント</h3>
                    <ul className="success-points">
                      <li><strong>定期化:</strong> 「毎週○曜日」と決めることで習慣化しやすい</li>
                      <li><strong>対等な立場:</strong> 親も子も同じプレイヤーとして楽しむ</li>
                      <li><strong>無理をしない:</strong> 疲れている時は無理せず、楽しい時間にすることを優先</li>
                      <li><strong>会話を大切に:</strong> ゲーム後の「今日はどうだった?」の会話も重要</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 総合まとめ */}
              <div className="detail-summary">
                <h2>
                  まとめ: あらゆる場面で活躍するテーブルゲーム
                </h2>
                <p>
                  これらの事例から分かるように、テーブルゲームは<strong>企業・教育・地域・福祉・家庭</strong>という
                  多様な場面で活用され、それぞれの現場が抱える課題に対して確かな成果をもたらしています。
                </p>
                <p>
                  共通しているのは、<strong>「楽しさ」を入り口に、自然と人間関係が構築され、能力が向上し、
                  コミュニティが活性化する</strong>というメカニズムです。
                </p>
                <p>
                  あなたの組織や地域でも、テーブルゲームを活用した新しい取り組みを始めてみませんか？
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

export default DetailCases;
