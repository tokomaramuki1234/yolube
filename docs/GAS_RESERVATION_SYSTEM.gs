/**
 * YOLUBE予約システム - Google Apps Script
 * Phase 1: バックエンドAPI実装
 *
 * スプレッドシートID: 14roOdnMm4kdnL64OWkXdgMJ_qSampUuzr-tvEGeGhb4
 * シート名: reservations
 */

// ==========================================
// 定数定義
// ==========================================

const SPREADSHEET_ID = '14roOdnMm4kdnL64OWkXdgMJ_qSampUuzr-tvEGeGhb4';
const RESERVATIONS_SHEET_NAME = 'reservations';
const SCHEDULE_SHEET_NAME = 'YOLUBE Event Schedule';
const ADMIN_EMAIL = 'info@yolube.jp';

// 列インデックス（0始まり）
const COLUMNS = {
  ID: 0,
  EVENT_ID: 1,
  NAME: 2,
  EMAIL: 3,
  COMPANION_COUNT: 4,
  ARRIVAL_TIME: 5,
  DESIRED_GAME: 6,
  NOTES: 7,
  RESERVATION_DATE: 8,
  STATUS: 9
};

// ==========================================
// メインハンドラー
// ==========================================

/**
 * POSTリクエストハンドラー
 */
function doPost(e) {
  try {
    Logger.log('POST Request received');
    Logger.log('Parameters: ' + JSON.stringify(e.parameter));

    // CORS対応
    const output = handleCorsRequest(e);
    if (output) return output;

    const action = e.parameter.action;

    // 既存のお問い合わせフォーム処理（formType指定の場合）
    if (e.parameter.formType) {
      return handleContactForm(e);
    }

    // 予約システムのアクション処理
    switch (action) {
      case 'createReservation':
        return handleCreateReservation(e);

      case 'cancelReservation':
        return handleCancelReservation(e);

      default:
        return createJsonResponse(false, null, 'Invalid action');
    }

  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    return createJsonResponse(false, null, error.toString());
  }
}

/**
 * GETリクエストハンドラー
 */
function doGet(e) {
  try {
    Logger.log('GET Request received');
    Logger.log('Parameters: ' + JSON.stringify(e.parameter));

    // CORS対応
    const output = handleCorsRequest(e);
    if (output) return output;

    const action = e.parameter.action;

    switch (action) {
      case 'getReservations':
        return handleGetReservations(e);

      case 'getReservation':
        return handleGetReservation(e);

      case 'getEventInfo':
        return handleGetEventInfo(e);

      default:
        return createJsonResponse(false, null, 'Invalid action');
    }

  } catch (error) {
    Logger.log('Error in doGet: ' + error.toString());
    return createJsonResponse(false, null, error.toString());
  }
}

// ==========================================
// 予約CRUD操作
// ==========================================

/**
 * 予約作成処理
 */
function handleCreateReservation(e) {
  try {
    // リクエストボディからデータ取得
    const data = JSON.parse(e.postData.contents);

    // バリデーション
    const validation = validateReservationData(data);
    if (!validation.valid) {
      return createJsonResponse(false, null, validation.message);
    }

    // 予約作成
    const reservation = createReservation(data);

    // メール送信
    sendReservationConfirmationEmail(reservation);
    sendAdminNotificationEmail(reservation);

    return createJsonResponse(true, {
      reservationId: reservation.id,
      message: '予約が完了しました',
      data: {
        id: reservation.id,
        eventId: reservation.eventId,
        name: reservation.name,
        email: reservation.email,
        status: reservation.status
      }
    });

  } catch (error) {
    Logger.log('Error in handleCreateReservation: ' + error.toString());
    return createJsonResponse(false, null, error.toString());
  }
}

/**
 * 予約一覧取得処理
 */
function handleGetReservations(e) {
  try {
    const eventId = e.parameter.eventId;

    if (!eventId) {
      return createJsonResponse(false, null, 'eventIdは必須です');
    }

    const reservations = getReservations(eventId);

    return createJsonResponse(true, {
      count: reservations.length,
      data: reservations
    });

  } catch (error) {
    Logger.log('Error in handleGetReservations: ' + error.toString());
    return createJsonResponse(false, null, error.toString());
  }
}

/**
 * 予約詳細取得処理
 */
function handleGetReservation(e) {
  try {
    const id = parseInt(e.parameter.id);

    if (!id) {
      return createJsonResponse(false, null, 'idは必須です');
    }

    const reservation = getReservation(id);

    if (!reservation) {
      return createJsonResponse(false, null, '予約が見つかりません');
    }

    return createJsonResponse(true, { data: reservation });

  } catch (error) {
    Logger.log('Error in handleGetReservation: ' + error.toString());
    return createJsonResponse(false, null, error.toString());
  }
}

/**
 * 予約キャンセル処理
 */
function handleCancelReservation(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const id = parseInt(data.id);
    const email = data.email;

    if (!id || !email) {
      return createJsonResponse(false, null, 'idとemailは必須です');
    }

    const result = cancelReservation(id, email);

    if (!result.success) {
      return createJsonResponse(false, null, result.message);
    }

    // キャンセルメール送信
    sendCancellationEmail(result.reservation);

    return createJsonResponse(true, {
      message: '予約がキャンセルされました',
      data: {
        id: id,
        status: 'cancelled'
      }
    });

  } catch (error) {
    Logger.log('Error in handleCancelReservation: ' + error.toString());
    return createJsonResponse(false, null, error.toString());
  }
}

/**
 * イベント情報取得処理
 */
function handleGetEventInfo(e) {
  try {
    const eventId = e.parameter.eventId;

    if (!eventId) {
      return createJsonResponse(false, null, 'eventIdは必須です');
    }

    const eventInfo = getEventInfoFromSchedule(eventId);
    const reservationCount = countReservationsByEvent(eventId);

    return createJsonResponse(true, {
      data: {
        eventId: eventId,
        ...eventInfo,
        currentReservations: reservationCount
      }
    });

  } catch (error) {
    Logger.log('Error in handleGetEventInfo: ' + error.toString());
    return createJsonResponse(false, null, error.toString());
  }
}

// ==========================================
// データベース操作関数
// ==========================================

/**
 * 予約シートを取得
 */
function getReservationsSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(RESERVATIONS_SHEET_NAME);

  // シートが存在しない場合は作成
  if (!sheet) {
    sheet = ss.insertSheet(RESERVATIONS_SHEET_NAME);
    // ヘッダー行を設定
    const headers = ['ID', 'イベントID', '予約者名', 'メールアドレス', '同行者数',
                     '来場予定時刻', '希望ゲーム', '特記事項', '予約日時', 'ステータス'];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
  }

  return sheet;
}

/**
 * 次の予約IDを取得
 */
function getNextReservationId() {
  const sheet = getReservationsSheet();
  const lastRow = sheet.getLastRow();

  if (lastRow <= 1) {
    return 1; // 初回予約
  }

  const lastId = sheet.getRange(lastRow, COLUMNS.ID + 1).getValue();
  return parseInt(lastId) + 1;
}

/**
 * 予約を作成
 */
function createReservation(data) {
  const sheet = getReservationsSheet();
  const id = getNextReservationId();
  const now = new Date();

  const reservation = {
    id: id,
    eventId: data.eventId,
    name: data.name,
    email: data.email,
    companionCount: data.companionCount || 0,
    arrivalTime: data.arrivalTime || '',
    desiredGame: data.desiredGame || '',
    notes: data.notes || '',
    reservationDate: Utilities.formatDate(now, 'Asia/Tokyo', 'yyyy-MM-dd HH:mm:ss'),
    status: 'confirmed'
  };

  // シートに追加
  const rowData = [
    reservation.id,
    reservation.eventId,
    reservation.name,
    reservation.email,
    reservation.companionCount,
    reservation.arrivalTime,
    reservation.desiredGame,
    reservation.notes,
    reservation.reservationDate,
    reservation.status
  ];

  sheet.appendRow(rowData);

  Logger.log('Reservation created: ' + JSON.stringify(reservation));

  return reservation;
}

/**
 * イベントIDで予約一覧を取得
 */
function getReservations(eventId) {
  const sheet = getReservationsSheet();
  const lastRow = sheet.getLastRow();

  if (lastRow <= 1) {
    return []; // データなし
  }

  const data = sheet.getRange(2, 1, lastRow - 1, 10).getValues();

  return data
    .filter(row => row[COLUMNS.EVENT_ID] === eventId && row[COLUMNS.STATUS] === 'confirmed')
    .map(row => ({
      id: row[COLUMNS.ID],
      eventId: row[COLUMNS.EVENT_ID],
      name: row[COLUMNS.NAME],
      email: row[COLUMNS.EMAIL],
      companionCount: row[COLUMNS.COMPANION_COUNT],
      arrivalTime: row[COLUMNS.ARRIVAL_TIME],
      desiredGame: row[COLUMNS.DESIRED_GAME],
      notes: row[COLUMNS.NOTES],
      reservationDate: row[COLUMNS.RESERVATION_DATE],
      status: row[COLUMNS.STATUS]
    }));
}

/**
 * IDで予約詳細を取得
 */
function getReservation(id) {
  const sheet = getReservationsSheet();
  const lastRow = sheet.getLastRow();

  if (lastRow <= 1) {
    return null;
  }

  const data = sheet.getRange(2, 1, lastRow - 1, 10).getValues();
  const row = data.find(r => r[COLUMNS.ID] === id);

  if (!row) {
    return null;
  }

  return {
    id: row[COLUMNS.ID],
    eventId: row[COLUMNS.EVENT_ID],
    name: row[COLUMNS.NAME],
    email: row[COLUMNS.EMAIL],
    companionCount: row[COLUMNS.COMPANION_COUNT],
    arrivalTime: row[COLUMNS.ARRIVAL_TIME],
    desiredGame: row[COLUMNS.DESIRED_GAME],
    notes: row[COLUMNS.NOTES],
    reservationDate: row[COLUMNS.RESERVATION_DATE],
    status: row[COLUMNS.STATUS]
  };
}

/**
 * 予約をキャンセル
 */
function cancelReservation(id, email) {
  const sheet = getReservationsSheet();
  const lastRow = sheet.getLastRow();

  if (lastRow <= 1) {
    return { success: false, message: '予約が見つかりません' };
  }

  // 予約を検索
  for (let i = 2; i <= lastRow; i++) {
    const rowId = sheet.getRange(i, COLUMNS.ID + 1).getValue();
    const rowEmail = sheet.getRange(i, COLUMNS.EMAIL + 1).getValue();

    if (rowId === id) {
      // メールアドレス確認
      if (rowEmail !== email) {
        return { success: false, message: 'メールアドレスが一致しません' };
      }

      // ステータスを更新
      sheet.getRange(i, COLUMNS.STATUS + 1).setValue('cancelled');

      const reservation = getReservation(id);
      Logger.log('Reservation cancelled: ' + id);

      return { success: true, reservation: reservation };
    }
  }

  return { success: false, message: '予約が見つかりません' };
}

/**
 * イベントIDで予約数をカウント
 */
function countReservationsByEvent(eventId) {
  const reservations = getReservations(eventId);
  return reservations.length;
}

// ==========================================
// イベント情報取得（既存機能との連携）
// ==========================================

/**
 * スケジュールシートからイベント情報を取得
 */
function getEventInfoFromSchedule(eventId) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SCHEDULE_SHEET_NAME);

    if (!sheet) {
      return {
        date: '',
        venue: '',
        venueAddress: '',
        availableSlots: 50
      };
    }

    const lastRow = sheet.getLastRow();
    const data = sheet.getRange(4, 1, lastRow - 3, 5).getValues(); // ヘッダー3行をスキップ

    // イベントIDで検索（E列）
    for (let i = 0; i < data.length; i++) {
      if (data[i][4] === eventId) { // E列（インデックス4）
        return {
          date: data[i][0], // A列: 日付
          venue: data[i][2], // C列: 会場名
          venueAddress: getVenueAddress(data[i][2]),
          availableSlots: 50 // 固定値（将来的に変更可能）
        };
      }
    }

    // 見つからない場合はデフォルト値
    return {
      date: '',
      venue: '',
      venueAddress: '',
      availableSlots: 50
    };

  } catch (error) {
    Logger.log('Error in getEventInfoFromSchedule: ' + error.toString());
    return {
      date: '',
      venue: '',
      venueAddress: '',
      availableSlots: 50
    };
  }
}

/**
 * 会場名から住所を取得
 */
function getVenueAddress(venueName) {
  const addresses = {
    '秋田ベイパラダイス': '秋田県秋田市土崎港西1-10-45',
    'みんなの実家　門脇家': '秋田県秋田市上新城中片野３６−３５',
    '秋田市文化創造館': '秋田県秋田市千秋明徳町3-16'
  };

  return addresses[venueName] || '';
}

// ==========================================
// バリデーション
// ==========================================

/**
 * 予約データのバリデーション
 */
function validateReservationData(data) {
  // 必須項目チェック
  if (!data.eventId || !data.name || !data.email) {
    return {
      valid: false,
      message: 'eventId, name, emailは必須です'
    };
  }

  // メールアドレス形式チェック
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return {
      valid: false,
      message: 'メールアドレスの形式が正しくありません'
    };
  }

  // 同行者数の範囲チェック
  if (data.companionCount && (data.companionCount < 0 || data.companionCount > 10)) {
    return {
      valid: false,
      message: '同行者数は0〜10の範囲で指定してください'
    };
  }

  // 時刻形式チェック（HH:MM）
  if (data.arrivalTime) {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(data.arrivalTime)) {
      return {
        valid: false,
        message: '来場予定時刻はHH:MM形式で指定してください'
      };
    }
  }

  return { valid: true };
}

// ==========================================
// メール送信
// ==========================================

/**
 * 予約確認メール送信（ユーザー宛）
 */
function sendReservationConfirmationEmail(reservation) {
  try {
    const eventInfo = getEventInfoFromSchedule(reservation.eventId);

    const subject = '【YOLUBE】Ke.イベント予約完了のお知らせ';
    const body = `
${reservation.name} 様

テーブルゲーム交流会：Ke. へのご予約ありがとうございます。

■ 予約内容
予約番号: ${reservation.id}
イベント: ${reservation.eventId}
来場予定時刻: ${reservation.arrivalTime || '未定'}
同行者数: ${reservation.companionCount}名
希望ゲーム: ${reservation.desiredGame || 'なし'}

■ イベント情報
日時: ${eventInfo.date}
会場: ${eventInfo.venue}
住所: ${eventInfo.venueAddress}

※ 予約をキャンセルされる場合は、このメールに返信してください。

ご質問がございましたら、お気軽にお問い合わせください。

――――――――――――――――
YOLUBE
Email: info@yolube.jp
Tel: 090-2841-3926
Web: https://yolube.jp
――――――――――――――――
`;

    GmailApp.sendEmail(reservation.email, subject, body, {
      replyTo: ADMIN_EMAIL,
      name: 'YOLUBE'
    });

    Logger.log('Confirmation email sent to: ' + reservation.email);

  } catch (error) {
    Logger.log('Error sending confirmation email: ' + error.toString());
  }
}

/**
 * 管理者通知メール送信
 */
function sendAdminNotificationEmail(reservation) {
  try {
    const eventInfo = getEventInfoFromSchedule(reservation.eventId);

    const subject = `【YOLUBE】新規予約受付 - ${reservation.eventId}`;
    const body = `
新規予約が登録されました。

■ 予約情報
予約ID: ${reservation.id}
イベント: ${reservation.eventId}
予約者: ${reservation.name}
メール: ${reservation.email}
来場予定: ${reservation.arrivalTime || '未定'}
同行者: ${reservation.companionCount}名
希望ゲーム: ${reservation.desiredGame || 'なし'}
特記事項: ${reservation.notes || 'なし'}

予約日時: ${reservation.reservationDate}

■ イベント情報
日時: ${eventInfo.date}
会場: ${eventInfo.venue}

現在の予約数: ${countReservationsByEvent(reservation.eventId)}件
`;

    GmailApp.sendEmail(ADMIN_EMAIL, subject, body, {
      replyTo: reservation.email,
      name: 'YOLUBE予約システム'
    });

    Logger.log('Admin notification email sent');

  } catch (error) {
    Logger.log('Error sending admin email: ' + error.toString());
  }
}

/**
 * キャンセルメール送信（ユーザー宛）
 */
function sendCancellationEmail(reservation) {
  try {
    const eventInfo = getEventInfoFromSchedule(reservation.eventId);

    const subject = '【YOLUBE】Ke.イベント予約キャンセル完了';
    const body = `
${reservation.name} 様

テーブルゲーム交流会：Ke. の予約キャンセルを承りました。

■ キャンセルされた予約
予約番号: ${reservation.id}
イベント: ${reservation.eventId}
日時: ${eventInfo.date}
会場: ${eventInfo.venue}

またのご参加をお待ちしております。

――――――――――――――――
YOLUBE
Email: info@yolube.jp
Tel: 090-2841-3926
Web: https://yolube.jp
――――――――――――――――
`;

    GmailApp.sendEmail(reservation.email, subject, body, {
      replyTo: ADMIN_EMAIL,
      name: 'YOLUBE'
    });

    Logger.log('Cancellation email sent to: ' + reservation.email);

  } catch (error) {
    Logger.log('Error sending cancellation email: ' + error.toString());
  }
}

// ==========================================
// CORS対応・レスポンス生成
// ==========================================

/**
 * CORSリクエストハンドリング
 */
function handleCorsRequest(e) {
  if (e && e.parameter && e.parameter.cors === 'preflight') {
    const output = ContentService.createTextOutput('');
    output.setMimeType(ContentService.MimeType.TEXT);
    output.setHeader('Access-Control-Allow-Origin', '*');
    output.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    output.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return output;
  }
  return null;
}

/**
 * JSON形式のレスポンスを生成
 */
function createJsonResponse(success, data, error = null) {
  const response = {
    success: success,
    timestamp: new Date().toISOString()
  };

  if (success) {
    Object.assign(response, data);
  } else {
    response.error = error || 'Unknown error';
    if (data && data.message) {
      response.message = data.message;
    }
  }

  const output = ContentService.createTextOutput(JSON.stringify(response));
  output.setMimeType(ContentService.MimeType.JSON);
  output.setHeader('Access-Control-Allow-Origin', '*');
  output.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  output.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  return output;
}

/**
 * HTML形式のレスポンスを生成
 */
function createHtmlResponse(title, message) {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>
    body {
      font-family: 'Noto Sans JP', sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
      background: linear-gradient(135deg, #8BC780 0%, #A5D59C 100%);
    }
    .container {
      background: white;
      padding: 40px;
      border-radius: 20px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
      text-align: center;
      max-width: 500px;
    }
    h1 {
      color: #8BC780;
      margin-bottom: 20px;
    }
    p {
      color: #333;
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>${title}</h1>
    <p>${message}</p>
  </div>
</body>
</html>
`;

  const output = HtmlService.createHtmlOutput(html);
  output.setTitle(title);

  return output;
}

// ==========================================
// 既存お問い合わせフォーム処理（互換性維持）
// ==========================================

/**
 * 既存のお問い合わせフォーム処理
 * ※ 既存システムとの互換性を保つため、この関数は既存のコードを使用してください
 */
function handleContactForm(e) {
  // TODO: 既存のお問い合わせフォーム処理コードをここに統合
  // formType: 'home', 'ke', 'training' の処理

  Logger.log('Contact form processing (formType: ' + e.parameter.formType + ')');

  // 暫定的なレスポンス
  return createHtmlResponse('お問い合わせ受付完了', 'お問い合わせありがとうございます。');
}
