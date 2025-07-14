const fs = require('fs');
const path = require('path');

// 画像フォルダのパス
const imagesPath = path.join(__dirname, '../public/images');
const configPath = path.join(__dirname, '../src/imageConfig.js');

// 指定フォルダ内のPNGファイルを取得
function getPngFilesInFolder(folderPath) {
  try {
    if (!fs.existsSync(folderPath)) {
      return [];
    }
    
    const files = fs.readdirSync(folderPath);
    return files.filter(file => file.toLowerCase().endsWith('.png'));
  } catch (error) {
    console.warn(`Could not read folder ${folderPath}:`, error.message);
    return [];
  }
}

// 画像設定ファイルを生成
function generateImageConfig() {
  const sliderFolders = ['slider1', 'slider2', 'slider3', 'slider4'];
  const config = {};
  
  sliderFolders.forEach(folder => {
    const folderPath = path.join(imagesPath, folder);
    const pngFiles = getPngFilesInFolder(folderPath);
    config[folder] = pngFiles;
  });
  
  return config;
}

// 設定ファイルを更新
function updateConfigFile() {
  const imageConfig = generateImageConfig();
  
  const configContent = `// 各スライダーフォルダ内の画像ファイル一覧
// このファイルは自動生成されます。手動編集も可能です。
// 新しい画像を追加した場合: npm run update-images

const imageConfig = ${JSON.stringify(imageConfig, null, 2)};

// フォルダからランダム画像を選択する関数
export const getRandomImageFromFolder = (folderName) => {
  const images = imageConfig[folderName] || [];
  
  if (images.length === 0) {
    // フォルダに画像がない場合はフォールバック画像
    return '/images/makoto.jpg';
  }
  
  const randomIndex = Math.floor(Math.random() * images.length);
  const selectedImage = images[randomIndex];
  return \`/images/\${folderName}/\${selectedImage}\`;
};

// 全スライダーのランダム画像を取得
export const selectRandomImagesForAllSliders = () => {
  const sliderFolders = ['slider1', 'slider2', 'slider3', 'slider4'];
  return sliderFolders.map(folder => getRandomImageFromFolder(folder));
};

export default imageConfig;`;

  fs.writeFileSync(configPath, configContent, 'utf8');
  
  // 結果を表示
  console.log('✅ 画像設定ファイルを更新しました!');
  console.log('\n📁 検出された画像:');
  
  Object.entries(imageConfig).forEach(([folder, images]) => {
    console.log(`${folder}: ${images.length}枚`);
    if (images.length > 0) {
      images.forEach(image => console.log(`  - ${image}`));
    } else {
      console.log('  (画像なし - フォールバック画像を使用)');
    }
  });
}

// スクリプト実行
if (require.main === module) {
  updateConfigFile();
}

module.exports = { updateConfigFile, generateImageConfig }; 