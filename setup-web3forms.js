#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// カラー出力用の定数
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m'
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function colorLog(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function setupWeb3Forms() {
  colorLog('cyan', '\n🚀 YOLUBE Web3Forms セットアップウィザード');
  colorLog('white', '='.repeat(50));
  
  try {
    // Step 1: アクセスキーの入力
    colorLog('yellow', '\n📝 ステップ1: Web3Formsアクセスキーを入力してください');
    colorLog('white', 'Web3Forms (https://web3forms.com) で取得したアクセスキーを入力：');
    
    const accessKey = await askQuestion('アクセスキー: ');
    
    if (!accessKey || accessKey === '') {
      colorLog('red', '❌ アクセスキーが入力されていません。');
      process.exit(1);
    }

    // アクセスキーの形式チェック（UUID形式）
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(accessKey)) {
      colorLog('yellow', '⚠️  入力されたキーがUUID形式ではありません。続行しますか？ (y/N)');
      const proceed = await askQuestion('');
      if (proceed.toLowerCase() !== 'y') {
        colorLog('red', '❌ セットアップを中止しました。');
        process.exit(1);
      }
    }

    // Step 2: ファイル更新
    colorLog('yellow', '\n🔧 ステップ2: ファイルを更新中...');

    // ContactWeb3.js を更新
    const contactWeb3Path = path.join(__dirname, 'src', 'components', 'ContactWeb3.js');
    if (fs.existsSync(contactWeb3Path)) {
      let contactContent = fs.readFileSync(contactWeb3Path, 'utf8');
      contactContent = contactContent.replace(
        'YOUR_WEB3FORMS_ACCESS_KEY',
        accessKey
      );
      fs.writeFileSync(contactWeb3Path, contactContent);
      colorLog('green', '✅ ContactWeb3.js を更新しました');
    } else {
      colorLog('red', '❌ ContactWeb3.js が見つかりません');
    }

    // KeLPWeb3.js を更新
    const keLPWeb3Path = path.join(__dirname, 'src', 'pages', 'ke', 'KeLPWeb3.js');
    if (fs.existsSync(keLPWeb3Path)) {
      let keContent = fs.readFileSync(keLPWeb3Path, 'utf8');
      keContent = keContent.replace(
        'YOUR_WEB3FORMS_ACCESS_KEY',
        accessKey
      );
      fs.writeFileSync(keLPWeb3Path, keContent);
      colorLog('green', '✅ KeLPWeb3.js を更新しました');
    } else {
      colorLog('red', '❌ KeLPWeb3.js が見つかりません');
    }

    // Step 3: App.js の更新確認
    colorLog('yellow', '\n🔄 ステップ3: App.jsを更新しますか？');
    colorLog('white', 'これにより、従来のフォームからWeb3Formsに切り替わります。');
    
    const updateApp = await askQuestion('App.jsを更新しますか？ (y/N): ');
    
    if (updateApp.toLowerCase() === 'y') {
      const appJsPath = path.join(__dirname, 'src', 'App.js');
      if (fs.existsSync(appJsPath)) {
        let appContent = fs.readFileSync(appJsPath, 'utf8');
        
        // バックアップ作成
        const backupPath = `${appJsPath}.backup.${Date.now()}`;
        fs.writeFileSync(backupPath, appContent);
        colorLog('blue', `📁 バックアップ作成: ${backupPath}`);
        
        // import文を更新
        appContent = appContent.replace(
          "import Contact from './components/Contact';",
          "import Contact from './components/ContactWeb3';"
        );
        
        // Ke.ページの import も確認
        if (appContent.includes("import KeLP from './pages/ke/KeLP';")) {
          appContent = appContent.replace(
            "import KeLP from './pages/ke/KeLP';",
            "import KeLP from './pages/ke/KeLPWeb3';"
          );
        }
        
        fs.writeFileSync(appJsPath, appContent);
        colorLog('green', '✅ App.js を更新しました');
      } else {
        colorLog('red', '❌ App.js が見つかりません');
      }
    }

    // Step 4: 設定完了
    colorLog('green', '\n🎉 Web3Forms セットアップ完了！');
    colorLog('white', '='.repeat(50));
    
    colorLog('cyan', '\n📋 次のステップ:');
    colorLog('white', '1. npm start でサーバーを起動');
    colorLog('white', '2. http://localhost:3000 でフォームをテスト');
    colorLog('white', '3. info@yolube.jp でメール受信を確認');
    
    colorLog('blue', '\n📚 詳細情報:');
    colorLog('white', '- Web3Forms Dashboard: https://web3forms.com/dashboard');
    colorLog('white', '- 設定ガイド: ./WEB3FORMS_SETUP_GUIDE.md');
    
    colorLog('yellow', '\n⚠️  重要:');
    colorLog('white', 'アクセスキーは機密情報です。GitHub等にコミットしないでください。');

  } catch (error) {
    colorLog('red', `\n❌ エラーが発生しました: ${error.message}`);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// スクリプト実行
if (require.main === module) {
  setupWeb3Forms().catch((error) => {
    console.error('Unexpected error:', error);
    process.exit(1);
  });
}

module.exports = { setupWeb3Forms }; 