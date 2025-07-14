// 各スライダーフォルダ内の画像ファイル一覧
// フォルダに新しい画像を追加したら、ここにファイル名を追加してください

const imageConfig = {
  slider1: [
    // 文化醸成関連の画像ファイル名を追加（例）
    // 'event1.png',
    // 'workshop2024.png',
    // 'community_game.png',
  ],
  slider2: [
    // 地域活性化関連の画像ファイル名を追加（例）
    // 'local_event1.png',
    // 'festival2024.png',
    // 'community_activity.png',
  ],
  slider3: [
    // ゲーム開発関連の画像ファイル名を追加（例）
    // 'game_development1.png',
    // 'prototype_testing.png',
  ],
  slider4: [
    // 企業研修関連の画像ファイル名を追加（例）
    // 'corporate_training1.png',
    // 'team_building.png',
  ]
};

// フォルダからランダム画像を選択する関数
export const getRandomImageFromFolder = (folderName) => {
  const images = imageConfig[folderName] || [];
  
  if (images.length === 0) {
    // フォルダに画像がない場合はプレースホルダー画像
    return `https://picsum.photos/1920/1080?random=${Math.floor(Math.random() * 100)}`;
  }
  
  const randomIndex = Math.floor(Math.random() * images.length);
  const selectedImage = images[randomIndex];
  return `/images/${folderName}/${selectedImage}`;
};

// 全スライダーのランダム画像を取得
export const selectRandomImagesForAllSliders = () => {
  const sliderFolders = ['slider1', 'slider2', 'slider3', 'slider4'];
  return sliderFolders.map(folder => getRandomImageFromFolder(folder));
};

export default imageConfig; 