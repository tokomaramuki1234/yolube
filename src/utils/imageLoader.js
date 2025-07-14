// src フォルダ内の画像を動的に読み込むユーティリティ

// 各スライダーフォルダから画像を動的に取得する関数
export const getImagesFromSliderFolder = (folderName) => {
  try {
    // webpack の require.context を使用してスライダーフォルダ内の画像を動的取得
    const context = require.context('../assets/images/', true, /\.(png|jpe?g|gif|webp)$/i);
    
    // 指定フォルダ内の画像ファイルを取得
    const folderImages = context.keys()
      .filter(key => {
        const folderPath = key.replace('./', '');
        return folderPath.startsWith(`${folderName}/`) && 
               /\.(png|jpe?g|gif|webp)$/i.test(folderPath);
      })
      .map(key => context(key));
    
    console.log(`Found ${folderImages.length} images in ${folderName}:`, folderImages);
    return folderImages;
  } catch (error) {
    console.warn(`Could not load images from ${folderName}:`, error);
    return [];
  }
};

// ランダム画像選択関数（srcフォルダ対応）
export const selectRandomImagesForSliders = () => {
  const sliderFolders = ['slider1', 'slider2', 'slider3', 'slider4'];
  
  return sliderFolders.map((folder, index) => {
    const availableImages = getImagesFromSliderFolder(folder);
    
    if (availableImages.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableImages.length);
      return availableImages[randomIndex];
    } else {
      // フォルダに画像がない場合は異なるプレースホルダー画像
      return `https://picsum.photos/1920/1080?random=${101 + index}`;
    }
  });
};

// フォールバック画像のURL生成
export const generateFallbackImage = (slideIndex) => {
  return `https://picsum.photos/1920/1080?random=${101 + slideIndex}`;
}; 