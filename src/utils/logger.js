/**
 * 環境変数で制御されるロガー
 *
 * 開発環境ではログを出力し、本番環境では抑制します。
 * エラーログは常に出力されます。
 */
const logger = {
  /**
   * デバッグログ（開発環境のみ）
   */
  log: (...args) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(...args);
    }
  },

  /**
   * エラーログ（常に出力）
   */
  error: (...args) => {
    console.error(...args);
  },

  /**
   * 警告ログ（開発環境のみ）
   */
  warn: (...args) => {
    if (process.env.NODE_ENV === 'development') {
      console.warn(...args);
    }
  },

  /**
   * 情報ログ（開発環境のみ）
   */
  info: (...args) => {
    if (process.env.NODE_ENV === 'development') {
      console.info(...args);
    }
  }
};

export default logger;
