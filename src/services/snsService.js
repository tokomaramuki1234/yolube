/**
 * SNS Auto Post Service
 * SNS自動投稿API との通信を管理
 */

// GAS API エンドポイント（環境変数から取得、なければデフォルトを使用）
const GAS_ENDPOINT = process.env.REACT_APP_GAS_ENDPOINT ||
  'https://script.google.com/macros/s/AKfycbxZRZSDGyg_Z1rGcuD9xymlMXB4vV3Cz8EVTOWS2GvP-bLKeYcq7q122ixPQKV71Xg6iQ/exec';

class SNSService {
  /**
   * APIリクエストを送信する共通メソッド
   */
  async sendRequest(action, params = {}) {
    try {
      const url = new URL(GAS_ENDPOINT);
      url.searchParams.append('action', action);

      const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || data.error || 'Unknown error occurred');
      }

      return data.data || data;
    } catch (error) {
      console.error('SNSService API Error:', error);
      throw error;
    }
  }

  /**
   * 全SNSに投稿
   */
  async postToAllSNS(newsData) {
    return await this.sendRequest('snsPostToAll', {
      category: newsData.category,
      title: newsData.title,
      description: newsData.description || newsData.summary,
      link: newsData.link || newsData.url || 'https://yolube.jp/NEWS',
      imageUrl: newsData.imageUrl || 'https://yolube.jp/images/OGP_FB.jpg'
    });
  }

  /**
   * Facebookに投稿
   */
  async postToFacebook(newsData) {
    return await this.sendRequest('snsPostToFacebook', {
      category: newsData.category,
      title: newsData.title,
      description: newsData.description || newsData.summary,
      link: newsData.link || newsData.url || 'https://yolube.jp/NEWS'
    });
  }

  /**
   * Instagramに投稿
   */
  async postToInstagram(newsData) {
    return await this.sendRequest('snsPostToInstagram', {
      category: newsData.category,
      title: newsData.title,
      description: newsData.description || newsData.summary,
      imageUrl: newsData.imageUrl || 'https://yolube.jp/images/OGP_FB.jpg'
    });
  }

  /**
   * Xに投稿
   */
  async postToX(newsData) {
    return await this.sendRequest('snsPostToX', {
      category: newsData.category,
      title: newsData.title,
      description: newsData.description || newsData.summary,
      link: newsData.link || newsData.url || 'https://yolube.jp/NEWS'
    });
  }

  /**
   * テスト投稿
   */
  async testPost(platform = 'all') {
    return await this.sendRequest('snsTestPost', { platform });
  }

  /**
   * 自動投稿ON/OFF切り替え
   */
  async toggleAutoPost(enabled) {
    return await this.sendRequest('snsToggleAutoPost', { enabled: enabled });
  }

  /**
   * SNSステータス取得
   */
  async getSNSStatus() {
    try {
      return await this.sendRequest('snsGetStatus');
    } catch (error) {
      // SNS機能が未設定の場合はデフォルト値を返す
      console.warn('SNS status not available, using defaults');
      return {
        autoPostEnabled: false,
        configured: false
      };
    }
  }
}

// シングルトンインスタンスをエクスポート
const snsService = new SNSService();
export default snsService;
