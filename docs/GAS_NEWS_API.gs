/**
 * YOLUBE NEWS管理システム - Google Apps Script API
 * バージョン: v1.0
 * 作成日: 2025年10月12日
 *
 * 【デプロイ手順】
 * 1. Google Sheetsで「拡張機能」→「Apps Script」を開く
 * 2. このコードを貼り付け
 * 3. 「デプロイ」→「新しいデプロイ」
 * 4. 種類: ウェブアプリ
 * 5. 実行ユーザー: 自分
 * 6. アクセス: 全員
 * 7. デプロイURLをReactアプリに設定
 */

// スプレッドシートとシート名の定義
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE'; // ★要設定
const NEWS_SHEET_NAME = 'NEWS';

/**
 * メインエントリーポイント（GET/POSTリクエスト処理）
 */
function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

/**
 * リクエストハンドラー
 */
function handleRequest(e) {
  try {
    const action = e.parameter.action;

    // CORS対応
    const output = ContentService.createTextOutput();
    output.setMimeType(ContentService.MimeType.JSON);

    let result;

    switch(action) {
      // 公開NEWS記事取得（フロント表示用）
      case 'getPublishedNews':
        result = getPublishedNews(e.parameter);
        break;

      // 全NEWS記事取得（管理画面用）
      case 'getAllNews':
        result = getAllNews(e.parameter);
        break;

      // NEWS記事詳細取得
      case 'getNewsById':
        result = getNewsById(e.parameter);
        break;

      // NEWS記事作成
      case 'createNews':
        result = createNews(e);
        break;

      // NEWS記事更新
      case 'updateNews':
        result = updateNews(e);
        break;

      // NEWS記事削除
      case 'deleteNews':
        result = deleteNews(e);
        break;

      // NEWS統計情報取得
      case 'getNewsStats':
        result = getNewsStats();
        break;

      default:
        result = {
          success: false,
          message: 'Invalid action parameter'
        };
    }

    output.setContent(JSON.stringify(result));
    return output;

  } catch (error) {
    const errorOutput = ContentService.createTextOutput();
    errorOutput.setMimeType(ContentService.MimeType.JSON);
    errorOutput.setContent(JSON.stringify({
      success: false,
      message: 'Server error: ' + error.toString()
    }));
    return errorOutput;
  }
}

/**
 * 公開NEWS記事取得（フロント表示用）
 * - status が 'published' または 'scheduled'（公開日が過去）の記事のみ
 * - NEWバッジは公開日から7日以内
 */
function getPublishedNews(params) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(NEWS_SHEET_NAME);

    if (!sheet) {
      return { success: false, message: 'NEWSシートが見つかりません' };
    }

    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const rows = data.slice(1);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // フィルタリング条件
    const category = params.category || null;
    const limit = params.limit ? parseInt(params.limit) : null;

    const newsItems = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const newsItem = {};

      headers.forEach((header, index) => {
        newsItem[header] = row[index];
      });

      // 公開判定
      const status = newsItem.status;
      const publishDate = new Date(newsItem.publishDate);
      publishDate.setHours(0, 0, 0, 0);

      const isPublished =
        status === 'published' ||
        (status === 'scheduled' && publishDate <= today);

      if (!isPublished) continue;

      // カテゴリフィルター
      if (category && newsItem.category !== category) continue;

      // 公開日から7日以内はNEWバッジ表示
      const daysSincePublish = Math.floor((today - publishDate) / (1000 * 60 * 60 * 24));
      const autoIsNew = daysSincePublish <= 7;

      // フォーマット変換
      const formattedItem = {
        id: newsItem.id,
        date: formatDate(publishDate),
        category: newsItem.category,
        title: newsItem.title,
        description: newsItem.description,
        content: newsItem.content,
        link: newsItem.link || null,
        imageUrl: newsItem.imageUrl || null,
        isNew: newsItem.isNew === 'TRUE' || newsItem.isNew === true || autoIsNew,
        tags: newsItem.tags ? newsItem.tags.split(',').map(t => t.trim()) : []
      };

      newsItems.push(formattedItem);
    }

    // 表示順序でソート（大きい方が上）→ 公開日でソート（新しい方が上）
    newsItems.sort((a, b) => {
      const orderA = parseInt(a.displayOrder) || 0;
      const orderB = parseInt(b.displayOrder) || 0;
      if (orderA !== orderB) return orderB - orderA;

      const dateA = new Date(a.date.replace(/\./g, '-'));
      const dateB = new Date(b.date.replace(/\./g, '-'));
      return dateB - dateA;
    });

    // 件数制限
    const result = limit ? newsItems.slice(0, limit) : newsItems;

    return {
      success: true,
      data: result
    };

  } catch (error) {
    return {
      success: false,
      message: 'データ取得エラー: ' + error.toString()
    };
  }
}

/**
 * 全NEWS記事取得（管理画面用）
 */
function getAllNews(params) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(NEWS_SHEET_NAME);

    if (!sheet) {
      return { success: false, message: 'NEWSシートが見つかりません' };
    }

    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const rows = data.slice(1);

    const statusFilter = params.status || null;
    const newsItems = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const newsItem = {};

      headers.forEach((header, index) => {
        newsItem[header] = row[index];
      });

      // ステータスフィルター
      if (statusFilter && newsItem.status !== statusFilter) continue;

      // 日付フォーマット
      newsItem.createdAt = formatDateTime(newsItem.createdAt);
      newsItem.updatedAt = formatDateTime(newsItem.updatedAt);
      newsItem.publishDate = formatDate(new Date(newsItem.publishDate));

      newsItems.push(newsItem);
    }

    // IDの降順でソート（新しい記事が上）
    newsItems.sort((a, b) => b.id - a.id);

    return {
      success: true,
      data: newsItems
    };

  } catch (error) {
    return {
      success: false,
      message: 'データ取得エラー: ' + error.toString()
    };
  }
}

/**
 * NEWS記事詳細取得
 */
function getNewsById(params) {
  try {
    const id = parseInt(params.id);

    if (!id) {
      return { success: false, message: 'IDが指定されていません' };
    }

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(NEWS_SHEET_NAME);

    if (!sheet) {
      return { success: false, message: 'NEWSシートが見つかりません' };
    }

    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const rows = data.slice(1);

    const idIndex = headers.indexOf('id');

    for (let i = 0; i < rows.length; i++) {
      if (rows[i][idIndex] === id) {
        const newsItem = {};
        headers.forEach((header, index) => {
          newsItem[header] = rows[i][index];
        });

        // 日付フォーマット
        newsItem.createdAt = formatDateTime(newsItem.createdAt);
        newsItem.updatedAt = formatDateTime(newsItem.updatedAt);
        newsItem.publishDate = formatDate(new Date(newsItem.publishDate));

        return {
          success: true,
          data: newsItem
        };
      }
    }

    return {
      success: false,
      message: '指定されたIDの記事が見つかりません'
    };

  } catch (error) {
    return {
      success: false,
      message: 'データ取得エラー: ' + error.toString()
    };
  }
}

/**
 * NEWS記事作成
 */
function createNews(e) {
  try {
    const params = JSON.parse(e.postData.contents);

    // バリデーション
    if (!params.title || !params.category || !params.description || !params.content) {
      return {
        success: false,
        message: '必須項目が入力されていません'
      };
    }

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(NEWS_SHEET_NAME);

    if (!sheet) {
      return { success: false, message: 'NEWSシートが見つかりません' };
    }

    // 新しいIDを採番
    const lastRow = sheet.getLastRow();
    const newId = lastRow > 1 ? sheet.getRange(lastRow, 1).getValue() + 1 : 1;

    const now = new Date();
    const publishDate = params.publishDate ? new Date(params.publishDate) : now;

    // 新規行追加
    const newRow = [
      newId,                                    // A: id
      now,                                      // B: createdAt
      now,                                      // C: updatedAt
      publishDate,                              // D: publishDate
      params.category || '',                    // E: category
      params.title || '',                       // F: title
      params.description || '',                 // G: description
      params.content || '',                     // H: content
      params.link || '',                        // I: link
      params.imageUrl || '',                    // J: imageUrl
      params.tags || '',                        // K: tags
      params.status || 'draft',                 // L: status
      params.isNew === true ? 'TRUE' : 'FALSE', // M: isNew
      'admin',                                  // N: author
      params.displayOrder || 0                  // O: displayOrder
    ];

    sheet.appendRow(newRow);

    return {
      success: true,
      message: 'NEWS記事を作成しました',
      data: { id: newId }
    };

  } catch (error) {
    return {
      success: false,
      message: '作成エラー: ' + error.toString()
    };
  }
}

/**
 * NEWS記事更新
 */
function updateNews(e) {
  try {
    const params = JSON.parse(e.postData.contents);
    const id = parseInt(params.id);

    if (!id) {
      return { success: false, message: 'IDが指定されていません' };
    }

    // バリデーション
    if (!params.title || !params.category || !params.description || !params.content) {
      return {
        success: false,
        message: '必須項目が入力されていません'
      };
    }

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(NEWS_SHEET_NAME);

    if (!sheet) {
      return { success: false, message: 'NEWSシートが見つかりません' };
    }

    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const idIndex = headers.indexOf('id');

    // 該当行を検索
    for (let i = 1; i < data.length; i++) {
      if (data[i][idIndex] === id) {
        const rowNumber = i + 1;
        const now = new Date();
        const publishDate = params.publishDate ? new Date(params.publishDate) : new Date(data[i][3]);

        // 更新データ
        const updatedRow = [
          id,                                       // A: id
          data[i][1],                               // B: createdAt (変更なし)
          now,                                      // C: updatedAt (更新)
          publishDate,                              // D: publishDate
          params.category || '',                    // E: category
          params.title || '',                       // F: title
          params.description || '',                 // G: description
          params.content || '',                     // H: content
          params.link || '',                        // I: link
          params.imageUrl || '',                    // J: imageUrl
          params.tags || '',                        // K: tags
          params.status || 'draft',                 // L: status
          params.isNew === true ? 'TRUE' : 'FALSE', // M: isNew
          data[i][13],                              // N: author (変更なし)
          params.displayOrder || 0                  // O: displayOrder
        ];

        sheet.getRange(rowNumber, 1, 1, updatedRow.length).setValues([updatedRow]);

        return {
          success: true,
          message: 'NEWS記事を更新しました'
        };
      }
    }

    return {
      success: false,
      message: '指定されたIDの記事が見つかりません'
    };

  } catch (error) {
    return {
      success: false,
      message: '更新エラー: ' + error.toString()
    };
  }
}

/**
 * NEWS記事削除
 */
function deleteNews(e) {
  try {
    const params = JSON.parse(e.postData.contents);
    const id = parseInt(params.id);

    if (!id) {
      return { success: false, message: 'IDが指定されていません' };
    }

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(NEWS_SHEET_NAME);

    if (!sheet) {
      return { success: false, message: 'NEWSシートが見つかりません' };
    }

    const data = sheet.getDataRange().getValues();
    const idIndex = 0; // A列

    // 該当行を検索して削除
    for (let i = 1; i < data.length; i++) {
      if (data[i][idIndex] === id) {
        sheet.deleteRow(i + 1);
        return {
          success: true,
          message: 'NEWS記事を削除しました'
        };
      }
    }

    return {
      success: false,
      message: '指定されたIDの記事が見つかりません'
    };

  } catch (error) {
    return {
      success: false,
      message: '削除エラー: ' + error.toString()
    };
  }
}

/**
 * NEWS統計情報取得
 */
function getNewsStats() {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(NEWS_SHEET_NAME);

    if (!sheet) {
      return { success: false, message: 'NEWSシートが見つかりません' };
    }

    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const rows = data.slice(1);

    let totalNews = 0;
    let publishedNews = 0;
    let draftNews = 0;
    let scheduledNews = 0;

    const categoryCounts = {};
    const recentNews = [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const newsItem = {};

      headers.forEach((header, index) => {
        newsItem[header] = row[index];
      });

      totalNews++;

      // ステータス集計
      if (newsItem.status === 'published') {
        publishedNews++;
      } else if (newsItem.status === 'draft') {
        draftNews++;
      } else if (newsItem.status === 'scheduled') {
        scheduledNews++;
      }

      // カテゴリ集計
      const category = newsItem.category;
      if (category) {
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      }

      // 最新5件を収集
      if (recentNews.length < 5) {
        recentNews.push({
          id: newsItem.id,
          title: newsItem.title,
          publishDate: formatDate(new Date(newsItem.publishDate)),
          category: newsItem.category,
          status: newsItem.status
        });
      }
    }

    // カテゴリ統計を配列に変換
    const categoryStats = Object.keys(categoryCounts).map(category => ({
      category: category,
      count: categoryCounts[category]
    }));

    return {
      success: true,
      data: {
        totalNews: totalNews,
        publishedNews: publishedNews,
        draftNews: draftNews,
        scheduledNews: scheduledNews,
        categoryStats: categoryStats,
        recentNews: recentNews
      }
    };

  } catch (error) {
    return {
      success: false,
      message: '統計情報取得エラー: ' + error.toString()
    };
  }
}

/**
 * 日付フォーマット（YYYY.MM.DD）
 */
function formatDate(date) {
  if (!date || !(date instanceof Date)) return '';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
}

/**
 * 日時フォーマット（YYYY-MM-DD HH:MM:SS）
 */
function formatDateTime(date) {
  if (!date || !(date instanceof Date)) return '';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * シート初期化関数（初回セットアップ用）
 * 【使い方】
 * 1. Apps Scriptエディタで「initializeNewsSheet」関数を選択
 * 2. 実行ボタンをクリック
 * 3. NEWSシートが作成され、ヘッダー行が設定されます
 */
function initializeNewsSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  // 既存のNEWSシートを削除（注意！）
  const existingSheet = ss.getSheetByName(NEWS_SHEET_NAME);
  if (existingSheet) {
    ss.deleteSheet(existingSheet);
  }

  // 新しいNEWSシートを作成
  const sheet = ss.insertSheet(NEWS_SHEET_NAME);

  // ヘッダー行を設定
  const headers = [
    'id', 'createdAt', 'updatedAt', 'publishDate', 'category',
    'title', 'description', 'content', 'link', 'imageUrl',
    'tags', 'status', 'isNew', 'author', 'displayOrder'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // ヘッダー行のスタイル設定
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground('#8BC780')
    .setFontWeight('bold')
    .setFontColor('#FFFFFF');

  // 列幅の調整
  sheet.setColumnWidth(1, 60);   // id
  sheet.setColumnWidth(2, 150);  // createdAt
  sheet.setColumnWidth(3, 150);  // updatedAt
  sheet.setColumnWidth(4, 120);  // publishDate
  sheet.setColumnWidth(5, 100);  // category
  sheet.setColumnWidth(6, 300);  // title
  sheet.setColumnWidth(7, 400);  // description
  sheet.setColumnWidth(8, 500);  // content
  sheet.setColumnWidth(9, 200);  // link
  sheet.setColumnWidth(10, 200); // imageUrl
  sheet.setColumnWidth(11, 200); // tags
  sheet.setColumnWidth(12, 100); // status
  sheet.setColumnWidth(13, 80);  // isNew
  sheet.setColumnWidth(14, 100); // author
  sheet.setColumnWidth(15, 100); // displayOrder

  // 行を固定
  sheet.setFrozenRows(1);

  Logger.log('NEWSシートの初期化が完了しました');
}
