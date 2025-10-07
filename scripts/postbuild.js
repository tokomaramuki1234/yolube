const fs = require('fs');
const path = require('path');

// Build directory
const buildDir = path.join(__dirname, '..', 'build');

// Read the main index.html
const mainIndexPath = path.join(buildDir, 'index.html');
let mainHtml = fs.readFileSync(mainIndexPath, 'utf8');

// Create /ke directory in build
const keDir = path.join(buildDir, 'ke');
if (!fs.existsSync(keDir)) {
  fs.mkdirSync(keDir, { recursive: true });
}

// Replace OGP meta tags for Ke. page
const keHtml = mainHtml
  // Replace title
  .replace(
    /<title>.*?<\/title>/,
    '<title>Ke. テーブルゲーム交流会 - YOLUBE</title>'
  )
  // Replace description
  .replace(
    /<meta name="description" content=".*?"\/>/,
    '<meta name="description" content="毎月開催！テーブルゲーム交流会「Ke.」年齢不問！参加費無料！予約不要！初心者大歓迎！"/>'
  )
  // Replace OG title
  .replace(
    /<meta property="og:title" content=".*?"\/>/,
    '<meta property="og:title" content="Ke. テーブルゲーム交流会 - YOLUBE"/>'
  )
  // Replace OG description
  .replace(
    /<meta property="og:description" content=".*?"\/>/,
    '<meta property="og:description" content="毎月開催！テーブルゲーム交流会「Ke.」年齢不問！参加費無料！予約不要！初心者大歓迎！"/>'
  )
  // Replace OG image
  .replace(
    /<meta property="og:image" content=".*?"\/>/,
    '<meta property="og:image" content="https://yolube.jp/images/OGP_ke_FB.jpg"/>'
  )
  // Replace OG URL
  .replace(
    /<meta property="og:url" content=".*?"\/>/,
    '<meta property="og:url" content="https://yolube.jp/ke"/>'
  )
  // Replace Twitter title
  .replace(
    /<meta name="twitter:title" content=".*?"\/>/,
    '<meta name="twitter:title" content="Ke. テーブルゲーム交流会 - YOLUBE"/>'
  )
  // Replace Twitter description
  .replace(
    /<meta name="twitter:description" content=".*?"\/>/,
    '<meta name="twitter:description" content="毎月開催！テーブルゲーム交流会「Ke.」年齢不問！参加費無料！予約不要！初心者大歓迎！"/>'
  )
  // Replace Twitter image
  .replace(
    /<meta name="twitter:image" content=".*?"\/>/,
    '<meta name="twitter:image" content="https://yolube.jp/images/OGP_ke_X.jpg"/>'
  );

// Write ke/index.html
const keIndexPath = path.join(keDir, 'index.html');
fs.writeFileSync(keIndexPath, keHtml);

console.log('✅ Post-build: Created /ke/index.html with custom OGP tags');
