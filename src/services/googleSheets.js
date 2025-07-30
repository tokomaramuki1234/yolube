// 有効な会場リスト
const VALID_VENUES = [
  '秋田ベイパラダイス',
  'みんなの実家　門脇家',
  '秋田市文化創造館'
];

class GoogleSheetsService {
  constructor() {
    this.spreadsheetId = '14roOdnMm4kdnL64OWkXdgMJ_qSampUuzr-tvEGeGhb4';
    this.apiKey = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY;
  }

  // Google Sheets APIクライアントを初期化（ブラウザ用）
  async initialize() {
    try {
      console.log('Initializing Google Sheets service...');
      return true;
    } catch (error) {
      console.error('Google Sheets API initialization failed:', error);
      return false;
    }
  }

  // スプレッドシートからデータを取得（公開スプレッドシート用）
  async getSheetData() {
    try {
      console.log('Fetching spreadsheet data...');
      
      // 公開スプレッドシートからCSV形式でデータを取得
      const csvUrl = `https://docs.google.com/spreadsheets/d/${this.spreadsheetId}/export?format=csv&gid=0`;
      
      const response = await fetch(csvUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const csvText = await response.text();
      console.log('CSV data received:', csvText);
      
      // CSVをパース
      const rows = csvText.split('\n').map(row => {
        // 簡単なCSVパース（カンマ区切り）
        return row.split(',').map(cell => cell.replace(/"/g, '').trim());
      });
      
      console.log('Parsed rows:', rows);
      
      return rows.filter(row => row.length > 0 && row[0]); // 空行を除外
    } catch (error) {
      console.error('Failed to fetch spreadsheet data:', error);
      throw error;
    }
  }

  // 日付文字列をDateオブジェクトに変換
  parseDate(dateString) {
    if (!dateString) return null;
    
    console.log('Parsing date:', dateString);
    
    // 日本語形式の日付をパース: "2025年8月9日(土)" → "2025/8/9"
    const match = dateString.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);
    if (match) {
      const [, year, month, day] = match;
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      console.log('Parsed date:', date);
      return date;
    }
    
    // フォールバック: 一般的な日付形式
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  }

  // 今日より未来の日付の中で最も近い日付を検索
  findNextEvent(data) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 時間をリセット
    
    console.log('Today:', today);
    console.log('Valid venues:', VALID_VENUES);
    
    let candidates = [];
    
    // データをフィルタリング（ヘッダー行を除く）
    for (let i = 3; i < data.length; i++) { // ヘッダーが3行目まであるので4行目から
      const row = data[i];
      if (!row || row.length < 5) continue;
      
      const dateStr = row[0]; // A列
      const venue = row[2];   // C列  
      const eventCount = row[4]; // E列
      
      console.log(`Row ${i}:`, { dateStr, venue, eventCount });
      
      const eventDate = this.parseDate(dateStr);
      if (!eventDate) {
        console.log('Failed to parse date:', dateStr);
        continue;
      }
      
      if (eventDate <= today) {
        console.log('Date is in the past:', dateStr, eventDate);
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
    
    console.log('Future candidates:', candidates);
    
    // 日付順にソート
    candidates.sort((a, b) => a.date - b.date);
    
    // 有効な会場を持つ最初のイベントを検索
    for (const candidate of candidates) {
      console.log('Checking venue:', candidate.venue, 'Valid?', VALID_VENUES.includes(candidate.venue));
      if (VALID_VENUES.includes(candidate.venue)) {
        console.log('Found valid event:', candidate);
        return candidate;
      }
    }
    
    // 有効な会場が見つからない場合は最も近い日付のイベントを返す
    console.log('No valid venue found, returning first candidate:', candidates[0]);
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
      
      return {
        eventCount: eventCount,
        date: formattedDate,
        venue: nextEvent.venue,
        rawDate: nextEvent.date,
        dateString: nextEvent.dateString
      };
    } catch (error) {
      console.error('Failed to get next event info:', error);
      throw error;
    }
  }
}

export default GoogleSheetsService;