import logger from '../utils/logger';

// 有効な会場リスト
const VALID_VENUES = [
  '秋田ベイパラダイス',
  'みんなの実家　門脇家',
  '秋田市文化創造館'
];

// 会場の住所マッピング
const VENUE_ADDRESSES = {
  '秋田ベイパラダイス': '秋田県秋田市土崎港西1-10-45',
  'みんなの実家　門脇家': '秋田県秋田市上新城中片野３６−３５',
  '秋田市文化創造館': '秋田県秋田市千秋明徳町3-16'
};

class GoogleSheetsService {
  constructor() {
    this.spreadsheetId = process.env.REACT_APP_SPREADSHEET_ID || '14roOdnMm4kdnL64OWkXdgMJ_qSampUuzr-tvEGeGhb4';
    this.apiKey = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY;
  }

  // Google Sheets APIクライアントを初期化（ブラウザ用）
  async initialize() {
    try {
      logger.log('Initializing Google Sheets service...');
      return true;
    } catch (error) {
      logger.error('Google Sheets API initialization failed:', error);
      return false;
    }
  }

  // スプレッドシートからデータを取得（公開スプレッドシート用）
  async getSheetData() {
    try {
      logger.log('Fetching spreadsheet data...');

      // 公開スプレッドシートからCSV形式でデータを取得
      const csvUrl = `https://docs.google.com/spreadsheets/d/${this.spreadsheetId}/export?format=csv&gid=0`;

      const response = await fetch(csvUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const csvText = await response.text();
      logger.log('CSV data received:', csvText);

      // CSVをパース
      const rows = csvText.split('\n').map(row => {
        // 簡単なCSVパース（カンマ区切り）
        return row.split(',').map(cell => cell.replace(/"/g, '').trim());
      });

      logger.log('Parsed rows:', rows);

      return rows.filter(row => row.length > 0 && row[0]); // 空行を除外
    } catch (error) {
      logger.error('Failed to fetch spreadsheet data:', error);
      throw error;
    }
  }

  // 日付文字列をDateオブジェクトに変換
  parseDate(dateString) {
    if (!dateString) return null;

    logger.log('Parsing date:', dateString);

    // 日本語形式の日付をパース: "2025年8月9日(土)" → "2025/8/9"
    const match = dateString.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);
    if (match) {
      const [, year, month, day] = match;
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      logger.log('Parsed date:', date);
      return date;
    }

    // フォールバック: 一般的な日付形式
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  }

  // 今日より未来の日付の中で最も近い日付を検索
  findNextEvent(data) {
    const now = new Date();
    const currentHour = now.getHours();

    // 22時未満の場合は今日のイベントを含める、22時以降は明日以降のイベントのみ
    const cutoffDate = new Date();
    if (currentHour >= 22) {
      // 22時以降は明日の0:00:00を基準にする
      cutoffDate.setDate(cutoffDate.getDate() + 1);
    }
    cutoffDate.setHours(0, 0, 0, 0);

    logger.log('Current time:', now);
    logger.log('Current hour:', currentHour);
    logger.log('Cutoff date:', cutoffDate);
    logger.log('Valid venues:', VALID_VENUES);

    let candidates = [];

    // データをフィルタリング（ヘッダー行を除く）
    for (let i = 3; i < data.length; i++) { // ヘッダーが3行目まであるので4行目から
      const row = data[i];
      if (!row || row.length < 5) continue;

      const dateStr = row[0]; // A列
      const venue = row[2];   // C列
      const eventCount = row[4]; // E列

      logger.log(`Row ${i}:`, { dateStr, venue, eventCount });

      const eventDate = this.parseDate(dateStr);
      if (!eventDate) {
        logger.log('Failed to parse date:', dateStr);
        continue;
      }

      if (eventDate < cutoffDate) {
        logger.log('Date is before cutoff:', dateStr, eventDate);
        continue;
      }

      candidates.push({
        date: eventDate,
        dateString: dateStr,
        venue: venue,
        eventCount: eventCount,
        rowIndex: i
      });
    }

    logger.log('Future candidates:', candidates);

    // 日付順にソート
    candidates.sort((a, b) => a.date - b.date);

    // 有効な会場を持つ最初のイベントを検索
    for (const candidate of candidates) {
      logger.log('Checking venue:', candidate.venue, 'Valid?', VALID_VENUES.includes(candidate.venue));
      if (VALID_VENUES.includes(candidate.venue)) {
        logger.log('Found valid event:', candidate);
        return candidate;
      }
    }

    // 有効な会場が見つからない場合は最も近い日付のイベントを返す
    logger.log('No valid venue found, returning first candidate:', candidates[0]);
    return candidates.length > 0 ? candidates[0] : null;
  }

  // 日付を表示用フォーマットに変換
  formatDate(date) {
    const months = ['1月', '2月', '3月', '4月', '5月', '6月', 
                   '7月', '8月', '9月', '10月', '11月', '12月'];
    const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
    
    return {
      month: months[date.getMonth()],
      day: date.getDate() + '日',
      weekday: weekdays[date.getDay()]
    };
  }

  // 次回イベント情報を取得
  async getNextEventInfo() {
    try {
      const data = await this.getSheetData();
      const nextEvent = this.findNextEvent(data);
      
      if (!nextEvent) {
        return null;
      }
      
      const formattedDate = this.formatDate(nextEvent.date);
      
      // 回数フォーマット変換: "Vol-058" → "第58回"
      let eventCount = nextEvent.eventCount;
      if (eventCount && eventCount.startsWith('Vol-')) {
        const number = eventCount.replace('Vol-', '');
        eventCount = `第${parseInt(number)}回`;
      }

      // 会場の住所を取得
      const venueAddress = VENUE_ADDRESSES[nextEvent.venue] || '';

      return {
        eventCount: eventCount,
        date: formattedDate,
        venue: nextEvent.venue,
        venueAddress: venueAddress,
        rawDate: nextEvent.date,
        dateString: nextEvent.dateString
      };
    } catch (error) {
      logger.error('Failed to get next event info:', error);
      throw error;
    }
  }
}

export default GoogleSheetsService;