// 画像を動的に読み込むユーティリティ

// 各スライダーフォルダから画像を動的に取得する関数
export const getImagesFromSliderFolder = (folderName) => {
  // 固定画像パスを返す
  const imageMap = {
    slider1: ['/images/slider1/image1.png'],
    slider2: ['/images/slider2/image1.png', '/images/slider2/image2.png', '/images/slider2/image3.png'],
    slider3: ['/images/slider3/image1.png'],
    slider4: ['/images/slider4/image1.png', '/images/slider4/image2.png', '/images/slider4/image3.png']
  };
  
  return imageMap[folderName] || [];
};

// 最初の画像を取得する関数
export const getFirstImageFromSlider = (folderName) => {
  const images = getImagesFromSliderFolder(folderName);
  return images[0] || '/images/YOLUBE_logo.png';
};