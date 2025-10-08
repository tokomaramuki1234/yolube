/**
 * Google Tag Manager (GTM) ユーティリティ関数
 * 
 * このファイルは、GTMとの連携を管理し、イベントトラッキングを簡素化します。
 */

/**
 * dataLayerにイベントをプッシュする共通関数
 * @param {string} eventName - イベント名
 * @param {object} eventData - イベントデータ（オプション）
 */
export const pushDataLayer = (eventName, eventData = {}) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventData,
      timestamp: new Date().toISOString()
    });
    
    // デバッグ用ログ（本番環境では削除可能）
    if (process.env.NODE_ENV === 'development') {
      console.log('[GTM Event]', eventName, eventData);
    }
  }
};

/**
 * ページビュー追跡
 * @param {string} pagePath - ページパス（例: '/about'）
 * @param {string} pageTitle - ページタイトル
 */
export const trackPageView = (pagePath, pageTitle) => {
  pushDataLayer('page_view', {
    page_path: pagePath,
    page_title: pageTitle,
    page_location: window.location.href
  });
};

/**
 * お問い合わせフォーム送信追跡
 * @param {object} formData - フォームデータ
 */
export const trackContactFormSubmit = (formData = {}) => {
  pushDataLayer('contact_form_submit', {
    form_type: 'contact',
    form_name: formData.name || '',
    form_email: formData.email || '',
    inquiry_type: formData.inquiry_type || '',
    page_location: window.location.href
  });
};

/**
 * 予約完了追跡
 * @param {object} reservationData - 予約データ
 */
export const trackReservationComplete = (reservationData = {}) => {
  pushDataLayer('reservation_complete', {
    event_name: reservationData.eventName || '',
    event_date: reservationData.eventDate || '',
    participant_count: reservationData.participantCount || 1,
    page_location: window.location.href
  });
};

/**
 * 外部リンククリック追跡
 * @param {string} url - リンク先URL
 * @param {string} linkText - リンクテキスト
 */
export const trackExternalLinkClick = (url, linkText = '') => {
  pushDataLayer('external_link_click', {
    link_url: url,
    link_text: linkText,
    page_location: window.location.href
  });
};

/**
 * SNSシェアボタンクリック追跡
 * @param {string} platform - SNSプラットフォーム（例: 'twitter', 'facebook'）
 * @param {string} contentType - シェアされるコンテンツタイプ
 */
export const trackSocialShare = (platform, contentType = '') => {
  pushDataLayer('social_share', {
    social_platform: platform,
    content_type: contentType,
    page_location: window.location.href
  });
};

/**
 * カスタムイベント追跡
 * @param {string} eventName - イベント名
 * @param {object} eventData - イベントデータ
 */
export const trackCustomEvent = (eventName, eventData = {}) => {
  pushDataLayer(eventName, eventData);
};
