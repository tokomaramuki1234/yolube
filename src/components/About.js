import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faUsers } from '@fortawesome/free-solid-svg-icons';
import './About.css';

const About = () => {
  const heroRef = useRef(null);
  const [flowingIcons, setFlowingIcons] = useState([]);
  const iconIdRef = useRef(0);
  const usedImageTypesRef = useRef(new Set());
  const occupiedSlotsRef = useRef(new Set());

  // 画像タイプから画像名を取得
  const getImageName = (type) => {
    const imageNames = [
      'yomopulu', 'sake', 'hotspring', 'namahage', 'junsai', 
      'hinai-jidori', 'akitainu', 'hatahata', 'dice', 'ke', 
      'bear', 'engagement', 'human'
    ];
    return imageNames[type - 1];
  };

  // グリッドスロット管理
  const getAvailableSlot = () => {
    const cols = 6;
    const rows = 3;
    const totalSlots = cols * rows;
    const occupiedSlots = occupiedSlotsRef.current;
    
    // 利用可能なスロットを見つける
    const availableSlots = [];
    for (let i = 0; i < totalSlots; i++) {
      if (!occupiedSlots.has(i)) {
        availableSlots.push(i);
      }
    }
    
    if (availableSlots.length === 0) {
      // すべてのスロットが埋まっている場合、最も古いものをクリア
      occupiedSlots.clear();
      return Math.floor(Math.random() * totalSlots);
    }
    
    return availableSlots[Math.floor(Math.random() * availableSlots.length)];
  };

  // 重複しない画像タイプを取得
  const getUniqueImageType = () => {
    const usedTypes = usedImageTypesRef.current;
    
    // すべての画像タイプが使用されている場合、古いものから削除
    if (usedTypes.size >= 8) {
      const oldestTypes = Array.from(usedTypes).slice(0, 3);
      oldestTypes.forEach(type => usedTypes.delete(type));
    }
    
    // 利用可能な画像タイプを取得
    const availableTypes = [];
    for (let i = 1; i <= 13; i++) {
      if (!usedTypes.has(i)) {
        availableTypes.push(i);
      }
    }
    
    // 利用可能なタイプからランダム選択、なければリセット
    let imageType;
    if (availableTypes.length > 0) {
      imageType = availableTypes[Math.floor(Math.random() * availableTypes.length)];
    } else {
      usedTypes.clear();
      imageType = Math.floor(Math.random() * 13) + 1;
    }
    
    usedTypes.add(imageType);
    return imageType;
  };

  // 新しいアイコンを生成する関数
  const createNewIcon = useCallback(() => {
    const imageType = getUniqueImageType();
    const slotIndex = getAvailableSlot();
    
    // グリッド計算
    const cols = 6;
    const rows = 3;
    const row = Math.floor(slotIndex / cols);
    const col = slotIndex % cols;
    
    // スロット内でのランダム位置
    const cellWidth = 100 / cols;
    const cellHeight = 100 / rows;
    const startX = col * cellWidth + cellWidth * (0.2 + Math.random() * 0.6);
    const startY = row * cellHeight + cellHeight * (0.2 + Math.random() * 0.6) - 30; // 上から開始
    
    const size = Math.random() * 30 + 70; // 70-100px（少し小さく）
    const duration = Math.random() * 2 + 9; // 9-11秒でアニメーション
    
    const newIcon = {
      id: iconIdRef.current++,
      imageType,
      startX,
      startY,
      duration,
      size,
      slotIndex
    };

    // スロットを占有状態にする
    occupiedSlotsRef.current.add(slotIndex);

    setFlowingIcons(prev => [...prev, newIcon]);

    // アニメーション完了後にアイコンとスロットを解放
    setTimeout(() => {
      setFlowingIcons(prev => prev.filter(icon => icon.id !== newIcon.id));
      occupiedSlotsRef.current.delete(slotIndex);
      // 使用された画像タイプも一定時間後に解放
      setTimeout(() => {
        usedImageTypesRef.current.delete(imageType);
      }, 3000);
    }, duration * 1000);
  }, []);

  useEffect(() => {
    // 初期アイコンを生成（段階的に）
    for (let i = 0; i < 8; i++) {
      setTimeout(() => createNewIcon(), i * 800);
    }

    // 定期的に新しいアイコンを生成
    const interval = setInterval(() => {
      createNewIcon();
    }, 1500); // 1.5秒間隔で新しいアイコンを生成

    return () => clearInterval(interval);
  }, [createNewIcon]);

  return (
    <section id="about" className="about section">
      {/* ヒーローセクション */}
      <div className="about-hero" ref={heroRef}>
        <div className="hero-content">
          <div className="hero-text">
            <h2 className="section-title">MISSION</h2>
            <div className="hero-vision">
              <div className="vision-main">遊び心で社会を変える</div>
              <div className="vision-subtitle">テーブルゲームの魅力を最大限に活かして、地域社会の課題解決に取り組みます</div>
            </div>
          </div>
        </div>
        {/* 流れるアイコンのレンダリング */}
        {flowingIcons.map(icon => (
          <div
            key={icon.id}
            className="flowing-icon"
            style={{
              backgroundImage: `url(/images/svg_${getImageName(icon.imageType)}.svg)`,
              '--size': `${icon.size}px`,
              '--duration': `${icon.duration}s`,
              '--start-x': `${icon.startX}%`,
              '--start-y': `${icon.startY}%`,
            }}
          />
        ))}
      </div>

      {/* VISIONセクション */}
      <div className="about-purposes">
        <div className="section-container">
          <h2 className="section-title">VISION</h2>
          <div className="purposes-grid">
            <div className="purpose-card">
              <div className="purpose-image">
                <img src="https://picsum.photos/600/400?random=5" alt="社会を変える" />
              </div>
              <div className="purpose-content">
                <h4>すべてを乗り越える交流文化を創る</h4>
                <p>年齢、性別、世代、立場を超えたフラットな交流文化を築きます。</p>
              </div>
            </div>
            
            <div className="purpose-card">
              <div className="purpose-image">
                <img src="https://picsum.photos/600/400?random=6" alt="遊び心の実現" />
              </div>
              <div className="purpose-content">
                <h4>体験交流型観光資源を創る</h4>
                <p>テーブルゲームの交流文化自体を新たな観光資源とし、地域経済に貢献します。</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VALUEセクション */}
      <div className="about-values">
        <div className="section-container">
          <h2 className="section-title">VALUE</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <FontAwesomeIcon icon={faUsers} />
              </div>
              <div className="value-content">
                <h4>遊び × 社会課題解決</h4>
                <p>テーブルゲームを通じて企業のエンゲージメント向上、自殺予防、認知症予防、経済活性化など、様々な社会課題への寄与を目指します。</p>
              </div>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <FontAwesomeIcon icon={faBuilding} />
              </div>
              <div className="value-content">
                <h4>遊び × 地域活性化</h4>
                <p>テーブルゲームが創り出す様々な形のコミュニケーションで人と人との繋がりを深め、地域活性化へ貢献します。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 