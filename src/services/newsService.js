/**
 * NEWS API Service
 * Google Apps Script NEWS API との通信を管理
 */

// GAS API エンドポイント（環境変数から取得、なければデフォルトを使用）
const GAS_ENDPOINT = process.env.REACT_APP_GAS_ENDPOINT || 
  'https://script.google.com/macros/s/AKfycbxZRZSDGyg_Z1rGcuD9xymlMXB4vV3Cz8EVTOWS2GvP-bLKeYcq7q122ixPQKV71Xg6iQ/exec';

class NewsService {
  /**
   * GETリクエストを送信する共通メソッド
   */
  async sendGetRequest(action, params = {}) {
    try {
      const url = new URL(GAS_ENDPOINT);
      url.searchParams.append('action', action);
      
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          url.searchParams.append(key, params[key]);
        }
      });

      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || data.error || 'Unknown error occurred');
      }

      return data.data;
    } catch (error) {
      console.error('NewsService GET Error:', error);
      throw error;
    }
  }

  /**
   * POSTリクエストを送信する共通メソッド
   */
  async sendPostRequest(action, params = {}) {
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
      console.error('NewsService POST Error:', error);
      throw error;
    }
  }

  /**
   * 全てのNEWS記事を取得（管理画面用 - 下書きも含む）
   */
  async getAllNews() {
    return await this.sendGetRequest('getAllNews');
  }

  /**
   * 公開済みNEWS記事のみ取得（公開ページ用）
   */
  async getPublishedNews() {
    return await this.sendGetRequest('getPublishedNews');
  }

  /**
   * 特定のNEWS記事を取得
   */
  async getNewsById(id) {
    return await this.sendGetRequest('getNewsById', { id });
  }

  /**
   * NEWS記事を作成
   */
  async createNews(newsData) {
    return await this.sendPostRequest('createNews', newsData);
  }

  /**
   * NEWS記事を更新
   */
  async updateNews(id, newsData) {
    return await this.sendPostRequest('updateNews', { id, ...newsData });
  }

  /**
   * NEWS記事を削除
   */
  async deleteNews(id) {
    return await this.sendPostRequest('deleteNews', { id });
  }
}

// シングルトンインスタンスをエクスポート
const newsService = new NewsService();
export default newsService;
