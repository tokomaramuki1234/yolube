import React from 'react';
import './StyleGuide.css';

const StyleGuide = () => {
  return (
    <div className="style-guide">
      <div className="container">
        {/* ヘッダーセクション */}
        <header className="guide-header">
          <h1>スタイルガイド</h1>
          <p className="guide-description">
            このページは、YOLUBEサイトで使用する各種デザインパーツのサンプルを掲載しています。
          </p>
        </header>

        {/* 見出しセクション */}
        <section className="guide-section">
          <h2 className="section-title">見出し（Headings）</h2>
          <div className="component-group">
            <h1 className="ttl_3d">H1: メインタイトル</h1>
            <h2>H2: セクションタイトル</h2>
            <h3>H3: サブセクションタイトル</h3>
            <h4>H4: 小見出し</h4>
            <h5>H5: 詳細見出し</h5>
          </div>
        </section>

        {/* テキストスタイルセクション */}
        <section className="guide-section">
          <h2 className="section-title">テキストスタイル（Text Styles）</h2>
          <div className="component-group">
            <p>これは通常のテキストです。段落として使用されます。</p>
            <p><strong>これは太字（Bold）のテキストです。</strong></p>
            <p><em>これは斜体（Italic）のテキストです。</em></p>
            <p><u>これは下線（Underline）のテキストです。</u></p>
            <p><span className="highlight">これはハイライト表示のテキストです。</span></p>
            <p><code>これはコードスタイルのテキストです。</code></p>
            <p className="small-text">これは小さいテキストです。</p>
            <p className="large-text">これは大きいテキストです。</p>
          </div>
        </section>

        {/* 引用セクション */}
        <section className="guide-section">
          <h2 className="section-title">引用（Blockquote）</h2>
          <div className="component-group">
            <blockquote>
              <p>
                「遊びは学習の最高の形である」
              </p>
              <cite>— プラトン</cite>
            </blockquote>
            
            <blockquote className="blockquote-accent">
              <p>
                テーブルゲームを通じて地域を活性化し、人々の繋がりを深める。
                それがYOLUBEの使命です。
              </p>
              <cite>— YOLUBE代表メッセージ</cite>
            </blockquote>
          </div>
        </section>

        {/* リストセクション */}
        <section className="guide-section">
          <h2 className="section-title">リスト（Lists）</h2>
          <div className="component-group">
            <div className="list-examples">
              <div className="list-column">
                <h3>順序なしリスト</h3>
                <ul>
                  <li>テーブルゲーム企画</li>
                  <li>地域イベント開催</li>
                  <li>コミュニティ運営</li>
                  <li>教育プログラム</li>
                </ul>
              </div>
              <div className="list-column">
                <h3>順序付きリスト</h3>
                <ol>
                  <li>企画・準備</li>
                  <li>参加者募集</li>
                  <li>イベント実施</li>
                  <li>結果分析・改善</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* リンクセクション */}
        <section className="guide-section">
          <h2 className="section-title">リンク（Links）</h2>
          <div className="component-group">
            <p>
              <button className="link-primary">プライマリリンク</button>
            </p>
            <p>
              <button className="link-secondary">セカンダリリンク</button>
            </p>
            <p>
              <button className="link-accent">アクセントリンク</button>
            </p>
            <p>
              通常のテキストに<button className="inline-link">インラインリンク</button>が含まれています。
            </p>
          </div>
        </section>

        {/* ボタンセクション */}
        <section className="guide-section">
          <h2 className="section-title">ボタン（Buttons）</h2>
          <div className="component-group">
            <div className="button-examples">
              <button className="btn-primary">プライマリボタン</button>
              <button className="btn-secondary">セカンダリボタン</button>
              <button className="btn-accent">アクセントボタン</button>
              <button className="btn-outline">アウトラインボタン</button>
              <button className="btn-small">小さいボタン</button>
              <button className="btn-large">大きいボタン</button>
            </div>
          </div>
        </section>

        {/* カードセクション */}
        <section className="guide-section">
          <h2 className="section-title">カード（Cards）</h2>
          <div className="component-group">
            <div className="card-examples">
              <div className="card">
                <h3>基本カード</h3>
                <p>これは基本的なカードコンポーネントです。</p>
              </div>
              <div className="card card-accent">
                <h3>アクセントカード</h3>
                <p>これはアクセント付きのカードです。</p>
              </div>
              <div className="card card-shadow">
                <h3>シャドウカード</h3>
                <p>これは影付きのカードです。</p>
              </div>
            </div>
          </div>
        </section>

        {/* テーブルセクション */}
        <section className="guide-section">
          <h2 className="section-title">テーブル（Tables）</h2>
          <div className="component-group">
            <table className="sample-table">
              <thead>
                <tr>
                  <th>イベント名</th>
                  <th>開催日</th>
                  <th>参加者数</th>
                  <th>状態</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ボードゲーム大会</td>
                  <td>2024年1月15日</td>
                  <td>25名</td>
                  <td><span className="status-active">開催済み</span></td>
                </tr>
                <tr>
                  <td>地域交流会</td>
                  <td>2024年2月10日</td>
                  <td>18名</td>
                  <td><span className="status-pending">準備中</span></td>
                </tr>
                <tr>
                  <td>テーブルゲーム体験会</td>
                  <td>2024年3月5日</td>
                  <td>30名</td>
                  <td><span className="status-cancelled">延期</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* フォーム要素セクション */}
        <section className="guide-section">
          <h2 className="section-title">フォーム要素（Form Elements）</h2>
          <div className="component-group">
            <div className="form-examples">
              <div className="form-group">
                <label htmlFor="sample-input">テキスト入力</label>
                <input type="text" id="sample-input" placeholder="入力してください" />
              </div>
              <div className="form-group">
                <label htmlFor="sample-email">メールアドレス</label>
                <input type="email" id="sample-email" placeholder="example@yolube.com" />
              </div>
              <div className="form-group">
                <label htmlFor="sample-textarea">テキストエリア</label>
                <textarea id="sample-textarea" placeholder="メッセージを入力してください" rows="4"></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="sample-select">選択肢</label>
                <select id="sample-select">
                  <option value="">選択してください</option>
                  <option value="option1">ボードゲーム</option>
                  <option value="option2">カードゲーム</option>
                  <option value="option3">パズルゲーム</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* 色・パレットセクション */}
        <section className="guide-section">
          <h2 className="section-title">カラーパレット（Color Palette）</h2>
          <div className="component-group">
            <div className="color-palette">
              <div className="color-item">
                <div className="color-box color-primary"></div>
                <p>プライマリ<br/><code>#2563eb</code></p>
              </div>
              <div className="color-item">
                <div className="color-box color-secondary"></div>
                <p>セカンダリ<br/><code>#64748b</code></p>
              </div>
              <div className="color-item">
                <div className="color-box color-accent"></div>
                <p>アクセント<br/><code>#f59e0b</code></p>
              </div>
              <div className="color-item">
                <div className="color-box color-success"></div>
                <p>成功<br/><code>#10b981</code></p>
              </div>
              <div className="color-item">
                <div className="color-box color-warning"></div>
                <p>警告<br/><code>#f59e0b</code></p>
              </div>
              <div className="color-item">
                <div className="color-box color-error"></div>
                <p>エラー<br/><code>#ef4444</code></p>
              </div>
            </div>
          </div>
        </section>

        {/* アイコンセクション */}
        <section className="guide-section">
          <h2 className="section-title">アイコン（Icons）</h2>
          <div className="component-group">
            <div className="icon-examples">
              <div className="icon-item">
                <div className="icon-box">🎲</div>
                <p>ゲーム</p>
              </div>
              <div className="icon-item">
                <div className="icon-box">🏠</div>
                <p>地域</p>
              </div>
              <div className="icon-item">
                <div className="icon-box">👥</div>
                <p>コミュニティ</p>
              </div>
              <div className="icon-item">
                <div className="icon-box">🎯</div>
                <p>目標</p>
              </div>
              <div className="icon-item">
                <div className="icon-box">💡</div>
                <p>アイデア</p>
              </div>
              <div className="icon-item">
                <div className="icon-box">🚀</div>
                <p>成長</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StyleGuide; 