/**
 * ============================================
 * YOLUBE統合システム - Google Apps Script
 * ============================================
 *
 * 統合バージョン: v3.32
 * 統合日: 2025-10-25
 *
 * 【統合内容】
 * 1. 既存お問い合わせフォームシステム (v2.2)
 *    - formType パラメータで処理 (home/ke/training/reservation)
 *    - スプレッドシートID: 1Ejs0annRLCGiV0dSTVGwm-1oDWbPHv65s1xLeWyRen8
 *    - HTML形式レスポンス
 *
 * 2. 予約システム (Phase 1, 2, 3, 4)
 *    - action パラメータで処理 (createReservation/getReservations/getReservationStats/getAllReservations/getAdminStats等)
 *    - 予約データ保存先: 1Ejs0annRLCGiV0dSTVGwm-1oDWbPHv65s1xLeWyRen8 (非公開・個人情報保護)
 *    - イベントスケジュール: 14roOdnMm4kdnL64OWkXdgMJ_qSampUuzr-tvEGeGhb4 (公開)
 *    - シート名: reservation (gid=799375987)
 *    - JSON形式レスポンス
 *
 * 【更新履歴】
 * v3.32 (2025-10-25): Trainingフォームに電話番号フィールド追加（ヘッダー、データ保存、自動返信メール対応）
 * v3.31 (2025-10-07): Logger.log()強化（ログ機能改善）。主要関数にトラブルシューティング用ログ追加
 * v3.30 (2025-10-07): LockService導入（予約ID生成時の競合対策）。同時アクセス時のID重複を防止
 * v3.29 (2025-10-07): CONFIG オブジェクト導入（設定値の一元管理）。会社情報、URL、制限値、メール設定、SNS設定を統合
 * v3.28 (2025-10-07): setSandboxMode(IFRAME)追加、viewport詳細設定、html/bodyにwidth/min-width明示（モバイル表示完全対応）
 * v3.27 (2025-10-07): HtmlService.setXFrameOptionsMode(ALLOWALL)追加、Facebookシェアをm.facebook.comに変更（モバイル対応）
 * v3.26 (2025-10-07): 予約完了/エラーページにviewportタグ追加、モバイル最適化CSS適用（iPhone Chrome対応）
 * v3.25 (2025-10-07): 予約完了画面にSNSシェアボタン追加（X, Facebook）
 * v3.24 (2025-10-07): getReservations/getReservationで来場予定時刻をHH:mm形式で返すように修正
 * v3.23 (2025-10-07): getEventInfoFromSchedule日付フォーマット変更（yyyy/MM/dd形式、日本時間対応）
 * v3.22 (2025-10-07): getEventInfoFromScheduleにB列（時間）、D列（イベント名）、E列（開催回数）を追加
 * v3.21 (2025-10-07): 予約完了画面HTML改善（テーブル形式、配色変更）
 * v3.20 (2025-10-07): 予約完了画面のデザイン改善
 * v3.19 (2025-10-07): 予約フォーム送信結果をJSON→HTML形式に変更
 * v3.18 (2025-10-07): getNextReservationId修正（無効なID値をフィルタリング）
 * v3.17 (2025-10-07): 予約ID生成バグ修正
 * v3.16 (2025-10-07): 管理用API更新（getAllReservations/getAdminStatsを新列構成に対応）
 * v3.15 (2025-10-07): スプレッドシート列構成を完全変更（イベント情報を個別列に保存：A=送信日時,B=開催日,C=時間,D=備考欄,E=開催場所,F=開催回数,G=定員,H=お名前,I=メール,J=同行者,K=来場時刻,L=ゲーム,M=特記,N=ステータス,O=ID）
 * v3.14 (2025-10-07): フォーム送信パラメータ変更（eventId→個別パラメータ化：eventdate/eventtime/eventname/eventarea/eventvol/eventcapacity）
 * v3.13 (2025-10-07): イベントIDをE列からK列（内部管理用）へ移動
 * v3.12 (2025-10-07): 送信日時を文字列として保存（#NUM!エラー修正）
 * v3.11 (2025-10-07): 予約シート列構成変更 - B列をイベント詳細（日付+会場+備考+回数）に変更
 * v3.10 (2025-10-07): スプレッドシート分離設計（個人情報保護）- 予約データ非公開、イベント公開
 * v3.9 (2025-10-07): 重大バグ修正 - handleCreateReservationでHTMLフォーム送信対応（e.parameter使用）
 * v3.8-debug (2025-10-07): doPost詳細デバッグログ追加（action/formType判定強化）
 * v3.7 (2025-10-07): API戻り値構造の統一 (handleGetAdminStatsをdata構造に変更)、デバッグログ追加
 * v3.6-debug (2025-10-07): デバッグログ追加 (getReservations詳細ログ、debugAllReservations関数)
 * v3.5 (2025-10-07): eventID型比較の修正 (getReservations, getEventInfoFromSchedule)
 * v3.4 (2025-10-07): Phase 4 - 管理用API追加 (getAllReservations, getAdminStats)
 * v3.3 (2025-10-06): F列（定員）を参照するように変更（固定値50から動的取得へ）
 * v3.2 (2025-10-06): Phase 3 - 予約統計取得API追加 (getReservationStats)
 * v3.1 (2025-10-06): Phase 2 - formType='reservation'対応
 * v3.0 (2025-10-06): 統合システム初版
 *
 * ============================================
 */

// ==========================================
// 設定管理
// ==========================================

/**
 * 設定管理オブジェクト
 * すべての設定値を一元管理
 */
const CONFIG = {
  // 会社情報
  COMPANY: {
    NAME: 'YOLUBE',
    EMAIL: 'info@yolube.jp',
    PHONE: '090-2841-3926'
  },

  // URL
  URLS: {
    HOME: 'https://yolube.jp',
    KE_PAGE: 'https://yolube.jp/ke',
    FACEBOOK_SHARE: 'https://m.facebook.com/sharer.php',
    TWITTER_SHARE: 'https://twitter.com/intent/tweet'
  },

  // 制限値
  LIMITS: {
    MAX_COMPANIONS: 10,              // 同行者最大人数
    DEFAULT_CAPACITY: 50,            // デフォルト定員
    RECENT_RESERVATIONS_LIMIT: 6,   // 最近の予約表示件数
    MAX_NAME_LENGTH: 50,             // 名前最大文字数
    MAX_MESSAGE_LENGTH: 500          // メッセージ最大文字数
  },

  // スプレッドシート
  SPREADSHEET: {
    // お問い合わせ・予約データ（非公開）
    RESERVATIONS_ID: '1Ejs0annRLCGiV0dSTVGwm-1oDWbPHv65s1xLeWyRen8',
    RESERVATIONS_URL: 'https://docs.google.com/spreadsheets/d/1Ejs0annRLCGiV0dSTVGwm-1oDWbPHv65s1xLeWyRen8/edit?usp=sharing',

    // イベントスケジュール（公開）
    SCHEDULE_ID: '14roOdnMm4kdnL64OWkXdgMJ_qSampUuzr-tvEGeGhb4',

    // シート名
    SHEET_NAMES: {
      CONTACT: 'contact',
      RESERVATION: 'reservation',          // gid=799375987
      SCHEDULE: 'YOLUBE Event Schedule'
    }
  },

  // 列インデックス（予約シート）
  COLUMNS: {
    RESERVATION_DATE: 0,  // A列: 送信日時
    EVENT_DATE: 1,         // B列: 開催日
    EVENT_TIME: 2,         // C列: 時間
    EVENT_NAME: 3,         // D列: 備考欄
    EVENT_AREA: 4,         // E列: 開催場所
    EVENT_VOL: 5,          // F列: 開催回数
    EVENT_CAPACITY: 6,     // G列: 定員
    NAME: 7,               // H列: お名前
    EMAIL: 8,              // I列: メールアドレス
    COMPANION_COUNT: 9,    // J列: 同行者数
    ARRIVAL_TIME: 10,      // K列: 来場予定時刻
    DESIRED_GAME: 11,      // L列: 遊びたいゲーム
    NOTES: 12,             // M列: 特記事項
    STATUS: 13,            // N列: ステータス（内部管理用）
    ID: 14                 // O列: ID（内部管理用）
  },

  // メール設定
  EMAIL: {
    FROM_NAME: 'YOLUBE イベント予約システム',
    SUBJECT_PREFIX: '[YOLUBE]',
    CONTACT_SUBJECT: 'お問い合わせを受け付けました',
    RESERVATION_SUBJECT: 'イベント予約完了のお知らせ'
  },

  // SNS設定
  SNS: {
    HASHTAGS: '#YOLUBE #Ke #ボードゲーム #テーブルゲーム'
  }
};

// 後方互換性のための旧定数（非推奨: 新しいコードではCONFIGを使用）
const CONTACT_SPREADSHEET_URL = CONFIG.SPREADSHEET.RESERVATIONS_URL;
const COMPANY_EMAIL = CONFIG.COMPANY.EMAIL;
const COMPANY_NAME = CONFIG.COMPANY.NAME;
const RESERVATION_SPREADSHEET_ID = CONFIG.SPREADSHEET.RESERVATIONS_ID;
const RESERVATIONS_SHEET_NAME = CONFIG.SPREADSHEET.SHEET_NAMES.RESERVATION;
const SCHEDULE_SPREADSHEET_ID = CONFIG.SPREADSHEET.SCHEDULE_ID;
const SCHEDULE_SHEET_NAME = CONFIG.SPREADSHEET.SHEET_NAMES.SCHEDULE;
const COLUMNS = CONFIG.COLUMNS;

// ==========================================
// メインハンドラー
// ==========================================

/**
 * GETリクエストハンドラー
 */
function doGet(e) {
  try {
    Logger.log('GET Request received');
    Logger.log('Parameters: ' + JSON.stringify(e.parameter));

    const action = e.parameter.action;

    // 予約システムのGETリクエスト
    if (action) {
      switch (action) {
        case 'getReservations':
          return handleGetReservations(e);

        case 'getReservation':
          return handleGetReservation(e);

        case 'getEventInfo':
          return handleGetEventInfo(e);

        case 'getReservationStats':
          return handleGetReservationStats(e);

        case 'getAllReservations':
          return handleGetAllReservations(e);

        case 'getAdminStats':
          return handleGetAdminStats(e);

        default:
          return createJsonResponse(false, null, 'Invalid action');
      }
    }

    // デフォルトレスポンス（既存システムとの互換性）
    return ContentService
      .createTextOutput('YOLUBE Integrated System v3.10 - Ready!')
      .setMimeType(ContentService.MimeType.TEXT);

  } catch (error) {
    Logger.log('Error in doGet: ' + error.toString());
    return createJsonResponse(false, null, error.toString());
  }
}

/**
 * POSTリクエストハンドラー
 */
function doPost(e) {
  try {
    Logger.log('=== POST Request Debug ===');
    Logger.log('e.parameter: ' + JSON.stringify(e.parameter));
    Logger.log('e.postData: ' + JSON.stringify(e.postData));
    Logger.log('e.postData.contents: ' + (e.postData ? e.postData.contents : 'null'));

    // actionパラメータの存在確認
    const action = e.parameter ? e.parameter.action : null;
    Logger.log('action parameter: ' + action);

    // 既存のお問い合わせフォーム処理（formType指定の場合）
    if (e.parameter && e.parameter.formType) {
      Logger.log('Routing to handleContactForm (formType: ' + e.parameter.formType + ')');
      return handleContactForm(e);
    }

    // 予約システムのアクション処理
    if (action) {
      Logger.log('Processing action: ' + action);

      switch (action) {
        case 'createReservation':
          Logger.log('Routing to handleCreateReservation');
          return handleCreateReservation(e);

        case 'cancelReservation':
          Logger.log('Routing to handleCancelReservation');
          return handleCancelReservation(e);

        default:
          Logger.log('Invalid action: ' + action);
          return createJsonResponse(false, null, 'Invalid action: ' + action);
      }
    }

    // actionもformTypeもない場合
    Logger.log('No action or formType found');
    return createJsonResponse(false, null, 'Missing action or formType parameter');

  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    return createErrorPage('システムエラーが発生しました: ' + error.toString());
  }
}

// ==========================================
// 既存お問い合わせフォーム処理
// ==========================================

/**
 * 既存のお問い合わせフォーム処理
 */
function handleContactForm(e) {
  try {
    // フォームデータの取得（URLエンコード対応）
    let formData = {};
    if (e.parameter) {
      Object.keys(e.parameter).forEach(k => formData[k] = e.parameter[k]);
    }

    console.log('Received form data:', formData);

    const validFormTypes = ['home', 'ke', 'training', 'reservation'];
    if (!formData.formType || !validFormTypes.includes(formData.formType)) {
      return createErrorPage('フォーム種別が無効です');
    }

    // 基本バリデーション
    if (!formData.user_name || !formData.user_email) {
      return createErrorPage('お名前とメールアドレスは必須です');
    }

    // データをスプレッドシートに保存
    const saveResult = saveToSpreadsheet(formData);
    if (!saveResult.success) {
      return createErrorPage('データ保存に失敗しました: ' + saveResult.message);
    }

    // 自動返信メール送信
    const emailResult = sendAutoReply(formData);
    const notifyResult = sendAdminNotification(formData);

    // 成功ページを返却
    return createSuccessPage(formData, emailResult.success);

  } catch (error) {
    console.error('Contact form error:', error);
    return createErrorPage('システムエラーが発生しました: ' + error.toString());
  }
}

/**
 * スプレッドシートへの保存（お問い合わせフォーム用）
 */
function saveToSpreadsheet(formData) {
  try {
    const spreadsheet = SpreadsheetApp.openByUrl(CONTACT_SPREADSHEET_URL);
    let sheet = getOrCreateSheet(spreadsheet, formData.formType);
    setupSheetHeaders(sheet, formData.formType);
    const row = createDataRow(formData);
    sheet.appendRow(row);

    console.log(`Data saved to ${formData.formType} sheet:`, row);
    return { success: true, message: 'Data saved successfully' };

  } catch (error) {
    console.error('Spreadsheet save error:', error);
    return { success: false, message: 'Failed to save data: ' + error.toString() };
  }
}

function getOrCreateSheet(spreadsheet, formType) {
  let sheet = spreadsheet.getSheetByName(formType);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(formType);
  }
  return sheet;
}

function setupSheetHeaders(sheet, formType) {
  if (sheet.getLastRow() === 0) {
    let headers = ['送信日時', 'フォーム種別', 'お名前', 'メールアドレス'];

    switch (formType) {
      case 'home':
        headers.push('電話番号', 'お問い合わせ内容', 'メッセージ');
        break;
      case 'ke':
        headers.push('電話番号', '参加希望日', '参加回数', 'メッセージ');
        break;
      case 'training':
        headers.push('会社名・団体名', '電話番号', 'メッセージ');
        break;
      case 'reservation':
        headers.push('イベントID', '同行者数', '来場予定時刻', '遊びたいゲーム', '特記事項');
        break;
    }

    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  }
}

function createDataRow(formData) {
  const timestamp = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
  let row = [timestamp, formData.formType, formData.user_name, formData.user_email];

  switch (formData.formType) {
    case 'home':
      row.push(
        formData.user_phone || '',
        formData.inquiry_type || '',
        formData.message || ''
      );
      break;
    case 'ke':
      row.push(
        formData.user_phone || '',
        formData.participation_date || '',
        formData.participation_count || '',
        formData.message || ''
      );
      break;
    case 'training':
      row.push(
        formData.company_name || '',
        formData.user_phone || '',
        formData.message || ''
      );
      break;
    case 'reservation':
      row.push(
        formData.event_id || '',
        formData.companions_count || '0',
        formData.arrival_time || '',
        formData.games_request || '',
        formData.special_notes || ''
      );
      break;
  }

  return row;
}

// ===== 自動返信メール =====
function sendAutoReply(formData) {
  try {
    const subject = getEmailSubject(formData.formType);
    const body = createAutoReplyBody(formData);

    const opts = {
      name: COMPANY_NAME,
      replyTo: COMPANY_EMAIL,
      noReply: false
    };

    GmailApp.sendEmail(formData.user_email, subject, body, opts);
    console.log(`Auto-reply sent to: ${formData.user_email}`);
    return { success: true, message: 'Auto-reply sent successfully' };

  } catch (error) {
    console.error('Auto-reply error:', error);
    return { success: false, message: 'Failed to send auto-reply: ' + error.toString() };
  }
}

function getEmailSubject(formType) {
  switch (formType) {
    case 'home':
      return '【YOLUBE】お問い合わせを承りました';
    case 'ke':
      return '【YOLUBE】テーブルゲーム交流会：Ke.へのお申し込みを承りました';
    case 'training':
      return '【YOLUBE】コミュニケーション研修へのお問い合わせを承りました';
    case 'reservation':
      return '【YOLUBE】Ke.イベント予約完了のお知らせ';
    default:
      return '【YOLUBE】お問い合わせを承りました';
  }
}

function createAutoReplyBody(formData) {
  const common = `
${formData.user_name} 様

この度はお問い合わせいただき誠にありがとうございます。
以下の内容にてお問い合わせを承りました。

■ お問い合わせ内容 ■
送信日時: ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}
お名前: ${formData.user_name}
メールアドレス: ${formData.user_email}`;

  let specific = '';
  switch (formData.formType) {
    case 'home':
      specific = `
電話番号: ${formData.user_phone || '未入力'}
お問い合わせ内容: ${formData.inquiry_type || '未選択'}
メッセージ: ${formData.message || '未入力'}

担当者より3営業日以内にご連絡させていただきます。`;
      break;

    case 'ke':
      specific = `
電話番号: ${formData.user_phone || '未入力'}
参加希望日: ${formData.participation_date || '未入力'}
参加回数: ${formData.participation_count || '未入力'}
メッセージ: ${formData.message || '未入力'}`;
      break;

    case 'training':
      specific = `
会社名・団体名: ${formData.company_name || '未入力'}
電話番号: ${formData.user_phone || '未入力'}
メッセージ: ${formData.message || '未入力'}

研修の詳細につきましては、担当者よりご連絡させていただきます。`;
      break;

    case 'reservation':
      specific = `
イベントID: ${formData.event_id || '未入力'}
同行者数: ${formData.companions_count || '0'}名
来場予定時刻: ${formData.arrival_time || '未定'}
遊びたいゲーム: ${formData.games_request || 'なし'}
特記事項: ${formData.special_notes || 'なし'}

※ 予約をキャンセルされる場合は、このメールに返信してください。

ご質問がございましたら、お気軽にお問い合わせください。`;
      break;
  }

  const footer = `


───────────────────
このメールは自動送信されています。
このメールに心当たりがない場合は、恐れ入りますが
上記連絡先までお知らせください。
───────────────────

------------------------------------------------------------------------
YOLUBE    - ヨルベ
Mission   - Change society through playfulness!
------------------------------------------------------------------------
Name         : 木村 允 < Kimura Makoto >
Role            : YOLUBE's Director
TEL              : ${CONFIG.COMPANY.PHONE}
Email          : mk＠yolube.jp
------------------------------------------------------------------------
X                   : https://x.com/_YOLUBE_
Facebook : https://www.facebook.com/YOLUBE.AKITA/
Instagram : https://www.instagram.com/_yolube_/
------------------------------------------------------------------------
`;

  return common + specific + footer;
}

// ===== 管理者通知メール =====
function sendAdminNotification(formData) {
  try {
    const subject = `【${String(formData.formType || '').toUpperCase()}】新しいお問い合わせ - ${formData.user_name}様`;
    const body = createAdminNotificationBody(formData);

    const opts = {
      name: 'YOLUBE Contact System',
      replyTo: formData.user_email
    };

    GmailApp.sendEmail(COMPANY_EMAIL, subject, body, opts);
    console.log('Admin notification sent');
    return { success: true, message: 'Admin notification sent successfully' };

  } catch (error) {
    console.error('Admin notification error:', error);
    return { success: false, message: 'Failed to send admin notification: ' + error.toString() };
  }
}

function createAdminNotificationBody(formData) {
  let body = `
新しいお問い合わせが届きました。

■ 基本情報 ■
フォーム種別: ${formData.formType.toUpperCase()}
送信日時: ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}
お名前: ${formData.user_name}
メールアドレス: ${formData.user_email}`;

  switch (formData.formType) {
    case 'home':
      body += `
電話番号: ${formData.user_phone || '未入力'}
お問い合わせ内容: ${formData.inquiry_type || '未選択'}
メッセージ: ${formData.message || '未入力'}`;
      break;

    case 'ke':
      body += `
電話番号: ${formData.user_phone || '未入力'}
参加希望日: ${formData.participation_date || '未入力'}
参加回数: ${formData.participation_count || '未入力'}
メッセージ: ${formData.message || '未入力'}`;
      break;

    case 'training':
      body += `
会社名・団体名: ${formData.company_name || '未入力'}
メッセージ: ${formData.message || '未入力'}`;
      break;

    case 'reservation':
      body += `
イベントID: ${formData.event_id || '未入力'}
同行者数: ${formData.companions_count || '0'}名
来場予定時刻: ${formData.arrival_time || '未定'}
遊びたいゲーム: ${formData.games_request || 'なし'}
特記事項: ${formData.special_notes || 'なし'}`;
      break;
  }

  body += `

■ スプレッドシート ■
データは以下のシートに保存されました:
${CONTACT_SPREADSHEET_URL}

───────────────────
YOLUBE Contact System
───────────────────`;

  return body;
}

// ==========================================
// 予約システム - CRUD操作
// ==========================================

/**
 * 予約作成処理
 */
function handleCreateReservation(e) {
  try {
    Logger.log('=== handleCreateReservation Debug ===');
    Logger.log('e.parameter: ' + JSON.stringify(e.parameter));
    Logger.log('e.postData: ' + JSON.stringify(e.postData));

    // データ取得（HTMLフォーム送信とJSON送信の両方に対応）
    let data;

    if (e.postData && e.postData.type === 'application/json') {
      // JSON送信の場合
      data = JSON.parse(e.postData.contents);
      Logger.log('Data source: JSON (e.postData.contents)');
    } else {
      // HTMLフォーム送信の場合（application/x-www-form-urlencoded）
      data = e.parameter;
      Logger.log('Data source: Form (e.parameter)');
    }

    Logger.log('Parsed data: ' + JSON.stringify(data));

    // バリデーション
    const validation = validateReservationData(data);
    if (!validation.valid) {
      Logger.log('Validation failed: ' + validation.message);
      return createJsonResponse(false, null, validation.message);
    }

    Logger.log('Validation passed');

    // 予約作成
    const reservation = createReservation(data);
    Logger.log('Reservation created: ID=' + reservation.id);

    // メール送信
    sendReservationConfirmationEmail(reservation);
    sendReservationAdminNotification(reservation);
    Logger.log('Emails sent');

    // HTML形式で確認画面を返す
    return createReservationSuccessHtml(reservation);

  } catch (error) {
    Logger.log('ERROR in handleCreateReservation: ' + error.toString());
    Logger.log('Stack trace: ' + error.stack);
    Logger.log('=== handleCreateReservation FAILED ===');
    return createReservationErrorHtml(error.toString());
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

/**
 * 予約統計取得処理
 */
function handleGetReservationStats(e) {
  try {
    const now = new Date();
    const lastUpdated = Utilities.formatDate(now, 'Asia/Tokyo', 'yyyy-MM-dd HH:mm:ss');

    // カットオフ日時を計算（20時以降なら翌日、それ以外は今日）
    const currentHour = now.getHours();
    const cutoffDate = new Date(now);
    if (currentHour >= 20) {
      cutoffDate.setDate(cutoffDate.getDate() + 1);
    }
    cutoffDate.setHours(0, 0, 0, 0);

    // スケジュールシートから全イベント情報を取得
    const ss = SpreadsheetApp.openById(SCHEDULE_SPREADSHEET_ID);
    const scheduleSheet = ss.getSheetByName(SCHEDULE_SHEET_NAME);

    if (!scheduleSheet) {
      return createJsonResponse(false, null, 'スケジュールシートが見つかりません');
    }

    const lastRow = scheduleSheet.getLastRow();
    if (lastRow <= 3) {
      // データなし（ヘッダー3行のみ）
      return createJsonResponse(true, {
        reservations: [],
        last_updated: lastUpdated
      });
    }

    const data = scheduleSheet.getRange(4, 1, lastRow - 3, 6).getValues(); // A-F列を取得
    const reservationStats = [];

    // 各イベントの統計を計算
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const eventId = row[4]; // E列: イベントID

      // イベントIDが空の行はスキップ
      if (!eventId) continue;

      const dateA = row[0]; // A列: 日付
      const timeB = row[1]; // B列: 時間
      const venueC = row[2]; // C列: 会場名
      const eventD = row[3]; // D列: イベント名
      const capacity = row[5] || 50; // F列: 定員（デフォルト50）

      // 日付が過去のイベントはスキップ
      if (dateA) {
        const eventDate = new Date(dateA);
        eventDate.setHours(0, 0, 0, 0);
        if (eventDate < cutoffDate) {
          continue; // 過去のイベントはスキップ
        }
      }

      // このイベントの予約数を取得
      const currentReservations = countReservationsByEvent(eventId);
      const reservationRate = capacity > 0 ? Math.round((currentReservations / capacity) * 100) : 0;

      // 開催日情報を作成（A列 + B列）
      let displayDate = '';
      if (dateA) {
        displayDate = Utilities.formatDate(new Date(dateA), 'Asia/Tokyo', 'yyyy年MM月dd日(E)');
      }
      if (timeB) {
        displayDate += (displayDate ? '  ' : '') + timeB;
      }

      // 会場情報を作成（C列 + D列）
      let displayVenue = '';
      if (venueC) {
        displayVenue = venueC;
      }
      if (eventD) {
        displayVenue += (displayVenue ? '  ' : '') + eventD;
      }

      reservationStats.push({
        event_id: eventId,
        event_info: displayDate,
        event_date: dateA, // ソート用に日付を保持
        venue: displayVenue,
        current_reservations: currentReservations,
        capacity: capacity,
        reservation_rate: reservationRate
      });
    }

    // 日付順にソート
    reservationStats.sort((a, b) => {
      const dateA = new Date(a.event_date);
      const dateB = new Date(b.event_date);
      return dateA - dateB;
    });

    // 直近6件のみ返す
    const limitedStats = reservationStats.slice(0, 6);

    return createJsonResponse(true, {
      reservations: limitedStats,
      last_updated: lastUpdated
    });

  } catch (error) {
    Logger.log('Error in handleGetReservationStats: ' + error.toString());
    return createJsonResponse(false, null, error.toString());
  }
}

/**
 * 全予約取得処理（管理用）
 */
function handleGetAllReservations(e) {
  try {
    const sheet = getReservationsSheet();
    const lastRow = sheet.getLastRow();

    if (lastRow <= 1) {
      return createJsonResponse(true, {
        count: 0,
        data: []
      });
    }

    const data = sheet.getRange(2, 1, lastRow - 1, 15).getValues(); // 15列に拡張

    const reservations = data
      .filter(row => row[COLUMNS.ID] && row[COLUMNS.STATUS] === 'confirmed') // 空行を除外 & 確定予約のみ
      .map(row => ({
        id: row[COLUMNS.ID],
        reservationDate: row[COLUMNS.RESERVATION_DATE],
        eventDate: row[COLUMNS.EVENT_DATE],
        eventTime: row[COLUMNS.EVENT_TIME],
        eventName: row[COLUMNS.EVENT_NAME],
        eventArea: row[COLUMNS.EVENT_AREA],
        eventVol: row[COLUMNS.EVENT_VOL],
        eventCapacity: row[COLUMNS.EVENT_CAPACITY],
        name: row[COLUMNS.NAME],
        email: row[COLUMNS.EMAIL],
        companionCount: row[COLUMNS.COMPANION_COUNT],
        arrivalTime: row[COLUMNS.ARRIVAL_TIME],
        desiredGame: row[COLUMNS.DESIRED_GAME],
        notes: row[COLUMNS.NOTES],
        status: row[COLUMNS.STATUS]
      }));

    return createJsonResponse(true, {
      count: reservations.length,
      data: reservations
    });

  } catch (error) {
    Logger.log('Error in handleGetAllReservations: ' + error.toString());
    return createJsonResponse(false, null, error.toString());
  }
}

/**
 * 管理統計取得処理
 */
function handleGetAdminStats(e) {
  try {
    const sheet = getReservationsSheet();
    const lastRow = sheet.getLastRow();

    if (lastRow <= 1) {
      return createJsonResponse(true, {
        data: {
          totalReservations: 0,
          confirmedReservations: 0,
          cancelledReservations: 0,
          eventStats: [],
          recentReservations: []
        }
      });
    }

    const data = sheet.getRange(2, 1, lastRow - 1, 15).getValues(); // 15列に拡張

    // 全体統計
    const totalReservations = data.length;
    const confirmedReservations = data.filter(row => row[COLUMNS.STATUS] === 'confirmed').length;
    const cancelledReservations = data.filter(row => row[COLUMNS.STATUS] === 'cancelled').length;

    // イベント別統計
    const eventMap = {};
    data.forEach(row => {
      if (row[COLUMNS.STATUS] === 'confirmed') {
        const eventVol = row[COLUMNS.EVENT_VOL]; // F列: 開催回数
        if (!eventMap[eventVol]) {
          eventMap[eventVol] = {
            eventId: eventVol,
            eventDate: row[COLUMNS.EVENT_DATE],
            eventArea: row[COLUMNS.EVENT_AREA],
            eventName: row[COLUMNS.EVENT_NAME],
            count: 0,
            totalParticipants: 0
          };
        }
        eventMap[eventVol].count++;
        eventMap[eventVol].totalParticipants += 1 + (parseInt(row[COLUMNS.COMPANION_COUNT]) || 0);
      }
    });

    const eventStats = Object.values(eventMap);

    // 最新予約5件
    const recentReservations = data
      .slice(-5)
      .reverse()
      .map(row => ({
        id: row[COLUMNS.ID],
        eventVol: row[COLUMNS.EVENT_VOL],
        eventDate: row[COLUMNS.EVENT_DATE],
        eventArea: row[COLUMNS.EVENT_AREA],
        name: row[COLUMNS.NAME],
        reservationDate: row[COLUMNS.RESERVATION_DATE],
        status: row[COLUMNS.STATUS]
      }));

    return createJsonResponse(true, {
      data: {
        totalReservations: totalReservations,
        confirmedReservations: confirmedReservations,
        cancelledReservations: cancelledReservations,
        eventStats: eventStats,
        recentReservations: recentReservations
      }
    });

  } catch (error) {
    Logger.log('Error in handleGetAdminStats: ' + error.toString());
    return createJsonResponse(false, null, error.toString());
  }
}

// ==========================================
// 予約システム - データベース操作
// ==========================================

/**
 * 予約シートを取得
 */
function getReservationsSheet() {
  const ss = SpreadsheetApp.openById(RESERVATION_SPREADSHEET_ID);
  let sheet = ss.getSheetByName(RESERVATIONS_SHEET_NAME);

  // シートが存在しない場合は作成
  if (!sheet) {
    sheet = ss.insertSheet(RESERVATIONS_SHEET_NAME);
    // ヘッダー行を設定（新しい列順）
    const headers = [
      '送信日時',        // A列
      '開催日',          // B列
      '時間',            // C列
      '備考欄',          // D列
      '開催場所',        // E列
      '開催回数',        // F列
      '定員',            // G列
      'お名前',          // H列
      'メールアドレス',  // I列
      '同行者数',        // J列
      '来場予定時刻',    // K列
      '遊びたいゲーム',  // L列
      '特記事項',        // M列
      'ステータス',      // N列（内部管理用）
      'ID'               // O列（内部管理用）
    ];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
  }

  return sheet;
}

/**
 * 次の予約IDを生成（競合対策版）
 * LockServiceを使用して同時アクセス時のID重複を防止
 */
function getNextReservationId() {
  const lock = LockService.getScriptLock();

  try {
    // ロック取得を試行（最大30秒待機）
    const hasLock = lock.tryLock(30000);

    if (!hasLock) {
      throw new Error('予約が集中しています。しばらくしてから再度お試しください。');
    }

    const sheet = getReservationsSheet();
    const lastRow = sheet.getLastRow();

    if (lastRow <= 1) {
      return 1; // 初回予約
    }

    // O列（ID列）の全ての値を取得
    const idColumn = sheet.getRange(2, COLUMNS.ID + 1, lastRow - 1, 1).getValues();

    // 有効なID（数値）のみを抽出して最大値を取得
    const validIds = idColumn
      .map(row => parseInt(row[0]))
      .filter(id => !isNaN(id) && id > 0);

    if (validIds.length === 0) {
      return 1; // 有効なIDがない場合は1から開始
    }

    const maxId = Math.max(...validIds);
    const nextId = maxId + 1;

    Logger.log(`Generated reservation ID: ${nextId} (lock acquired)`);
    return nextId;

  } catch (error) {
    Logger.log('Error in getNextReservationId: ' + error.toString());
    throw error;
  } finally {
    // 必ずロックを解放
    lock.releaseLock();
  }
}

/**
 * 予約を作成
 */
function createReservation(data) {
  Logger.log('=== createReservation START ===');
  Logger.log('Input data - EventID: ' + data.eventvol + ', Name: ' + data.name + ', Email: ' + data.email);

  try {
    const sheet = getReservationsSheet();
    const id = getNextReservationId();
    const now = new Date();

    const reservation = {
      id: id,
      eventdate: data.eventdate || '',
      eventtime: data.eventtime || '',
      eventname: data.eventname || '',
      eventarea: data.eventarea || '',
      eventvol: data.eventvol || '',
      eventcapacity: data.eventcapacity || '',
      name: data.name,
      email: data.email,
      companionCount: data.companionCount || 0,
      arrivalTime: data.arrivalTime || '',
      desiredGame: data.desiredGame || '',
      notes: data.notes || '',
      reservationDate: Utilities.formatDate(now, 'Asia/Tokyo', 'yyyy-MM-dd HH:mm:ss'),
      status: 'confirmed'
    };

    // シートに追加（新しい列順）
    const rowData = [
      "'" + reservation.reservationDate,  // A列: 送信日時
      reservation.eventdate,               // B列: 開催日
      reservation.eventtime,               // C列: 時間
      reservation.eventname,               // D列: 備考欄
      reservation.eventarea,               // E列: 開催場所
      reservation.eventvol,                // F列: 開催回数
      reservation.eventcapacity,           // G列: 定員
      reservation.name,                    // H列: お名前
      reservation.email,                   // I列: メールアドレス
      reservation.companionCount,          // J列: 同行者数
      reservation.arrivalTime,             // K列: 来場予定時刻
      reservation.desiredGame,             // L列: 遊びたいゲーム
      reservation.notes,                   // M列: 特記事項
      reservation.status,                  // N列: ステータス
      reservation.id                       // O列: ID
    ];

    sheet.appendRow(rowData);

    Logger.log('SUCCESS: Reservation created - ID=' + reservation.id + ', EventVol=' + reservation.eventvol);
    Logger.log('=== createReservation END ===');

    return reservation;

  } catch (error) {
    Logger.log('ERROR in createReservation: ' + error.toString());
    Logger.log('Stack trace: ' + error.stack);
    Logger.log('=== createReservation FAILED ===');
    throw error;
  }
}

/**
 * イベントIDで予約一覧を取得
 */
function getReservations(eventId) {
  const sheet = getReservationsSheet();
  const lastRow = sheet.getLastRow();

  Logger.log('=== getReservations Debug ===');
  Logger.log('Requested eventId: ' + eventId);
  Logger.log('eventId type: ' + typeof eventId);
  Logger.log('Last row: ' + lastRow);

  if (lastRow <= 1) {
    Logger.log('No data found (lastRow <= 1)');
    return []; // データなし
  }

  const data = sheet.getRange(2, 1, lastRow - 1, 15).getValues(); // 15列に拡張
  Logger.log('Total rows in sheet: ' + data.length);

  // eventIdを文字列に変換して比較
  const eventIdStr = String(eventId);
  Logger.log('eventIdStr: "' + eventIdStr + '"');

  // デバッグ: 全ての行のeventVolとstatusをログ出力
  for (let i = 0; i < data.length; i++) {
    const rowEventVol = String(data[i][COLUMNS.EVENT_VOL]);
    const rowStatus = data[i][COLUMNS.STATUS];
    Logger.log('Row ' + i + ': eventVol="' + rowEventVol + '", status="' + rowStatus + '", match=' + (rowEventVol === eventIdStr));
  }

  const filtered = data.filter(row => {
    const rowEventVol = String(row[COLUMNS.EVENT_VOL]);
    const rowStatus = row[COLUMNS.STATUS];
    return rowEventVol === eventIdStr && rowStatus === 'confirmed';
  });

  Logger.log('Filtered reservations count: ' + filtered.length);

  return filtered.map(row => {
    // 来場予定時刻を文字列に変換
    let arrivalTimeStr = '';
    if (row[COLUMNS.ARRIVAL_TIME]) {
      if (row[COLUMNS.ARRIVAL_TIME] instanceof Date) {
        // Date型の場合は "HH:mm" 形式に変換
        arrivalTimeStr = Utilities.formatDate(row[COLUMNS.ARRIVAL_TIME], 'Asia/Tokyo', 'HH:mm');
      } else {
        // 文字列の場合はそのまま使用
        arrivalTimeStr = String(row[COLUMNS.ARRIVAL_TIME]);
      }
    }

    return {
      id: row[COLUMNS.ID],
      eventId: row[COLUMNS.EVENT_VOL],  // F列: 開催回数をeventIdとして返す
      name: row[COLUMNS.NAME],
      email: row[COLUMNS.EMAIL],
      companionCount: row[COLUMNS.COMPANION_COUNT],
      arrivalTime: arrivalTimeStr,
      desiredGame: row[COLUMNS.DESIRED_GAME],
      notes: row[COLUMNS.NOTES],
      reservationDate: row[COLUMNS.RESERVATION_DATE],
      status: row[COLUMNS.STATUS]
    };
  });
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

  const data = sheet.getRange(2, 1, lastRow - 1, 15).getValues(); // 15列に拡張
  const row = data.find(r => r[COLUMNS.ID] === id);

  if (!row) {
    return null;
  }

  // 来場予定時刻を文字列に変換
  let arrivalTimeStr = '';
  if (row[COLUMNS.ARRIVAL_TIME]) {
    if (row[COLUMNS.ARRIVAL_TIME] instanceof Date) {
      // Date型の場合は "HH:mm" 形式に変換
      arrivalTimeStr = Utilities.formatDate(row[COLUMNS.ARRIVAL_TIME], 'Asia/Tokyo', 'HH:mm');
    } else {
      // 文字列の場合はそのまま使用
      arrivalTimeStr = String(row[COLUMNS.ARRIVAL_TIME]);
    }
  }

  return {
    id: row[COLUMNS.ID],
    eventId: row[COLUMNS.EVENT_ID],
    name: row[COLUMNS.NAME],
    email: row[COLUMNS.EMAIL],
    companionCount: row[COLUMNS.COMPANION_COUNT],
    arrivalTime: arrivalTimeStr,
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
// イベント情報取得
// ==========================================

/**
 * 予約用：スケジュールシートからイベント詳細を取得
 * 戻り値: {eventDetails: "日付 会場 備考 回数"}
 */
function getEventInfoFromScheduleForReservation(eventId) {
  try {
    const ss = SpreadsheetApp.openById(SCHEDULE_SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SCHEDULE_SHEET_NAME);

    if (!sheet) {
      return { eventDetails: eventId }; // フォールバック
    }

    const lastRow = sheet.getLastRow();
    const data = sheet.getRange(4, 1, lastRow - 3, 6).getValues(); // A-F列

    // eventIdを文字列に変換して比較
    const eventIdStr = String(eventId);

    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const rowEventId = String(row[4]); // E列

      if (rowEventId === eventIdStr) {
        const dateStr = row[0]; // A列: 開催日
        const venue = row[2];   // C列: 開催場所
        const remarks = row[3]; // D列: 備考
        const count = row[4];   // E列: 開催回数

        // イベント詳細を構成（A列+C列+D列+E列）
        let eventDetails = '';

        if (dateStr) {
          const formattedDate = Utilities.formatDate(new Date(dateStr), 'Asia/Tokyo', 'yyyy年MM月dd日(E)');
          eventDetails += formattedDate;
        }

        if (venue) {
          eventDetails += (eventDetails ? ' ' : '') + venue;
        }

        if (remarks) {
          eventDetails += (eventDetails ? ' ' : '') + remarks;
        }

        if (count) {
          eventDetails += (eventDetails ? ' ' : '') + count;
        }

        return { eventDetails: eventDetails };
      }
    }

    // 見つからない場合
    return { eventDetails: eventId };

  } catch (error) {
    Logger.log('Error in getEventInfoFromScheduleForReservation: ' + error.toString());
    return { eventDetails: eventId };
  }
}

/**
 * スケジュールシートからイベント情報を取得
 */
function getEventInfoFromSchedule(eventId) {
  try {
    const ss = SpreadsheetApp.openById(SCHEDULE_SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SCHEDULE_SHEET_NAME);

    if (!sheet) {
      return {
        date: '',
        time: '',
        venue: '',
        eventName: '',
        eventVol: '',
        venueAddress: '',
        availableSlots: 50
      };
    }

    const lastRow = sheet.getLastRow();
    const data = sheet.getRange(4, 1, lastRow - 3, 6).getValues(); // ヘッダー3行をスキップ、A-F列を取得

    // eventIdを文字列に変換して比較
    const eventIdStr = String(eventId);

    // イベントIDで検索（E列）
    for (let i = 0; i < data.length; i++) {
      const rowEventId = String(data[i][4]); // E列（インデックス4）
      if (rowEventId === eventIdStr) {
        // A列の日付を適切にフォーマット
        let dateStr = '';
        if (data[i][0]) {
          if (data[i][0] instanceof Date) {
            // Date型の場合は "YYYY/MM/DD" 形式に変換（日本時間）
            dateStr = Utilities.formatDate(data[i][0], 'Asia/Tokyo', 'yyyy/MM/dd');
          } else {
            // 文字列の場合はそのまま使用
            dateStr = String(data[i][0]);
          }
        }

        return {
          date: dateStr, // A列: 日付（文字列）
          time: data[i][1] || '', // B列: 時間
          venue: data[i][2], // C列: 会場名
          eventName: data[i][3] || 'テーブルゲーム交流会：Ke.', // D列: 備考欄（イベント名）
          eventVol: data[i][4] || '', // E列: 開催回数
          venueAddress: getVenueAddress(data[i][2]),
          availableSlots: data[i][5] || 50 // F列: 定員（デフォルト50）
        };
      }
    }

    // 見つからない場合はデフォルト値
    return {
      date: '',
      time: '',
      venue: '',
      eventName: '',
      eventVol: '',
      venueAddress: '',
      availableSlots: 50
    };

  } catch (error) {
    Logger.log('Error in getEventInfoFromSchedule: ' + error.toString());
    return {
      date: '',
      time: '',
      venue: '',
      eventName: '',
      eventVol: '',
      venueAddress: '',
      availableSlots: 50
    };
  }
}

/**
 * 会場名から住所を取得（Addressシートから動的取得）
 */
function getVenueAddress(venueName) {
  try {
    const ss = SpreadsheetApp.openById(SCHEDULE_SPREADSHEET_ID);
    const addressSheet = ss.getSheetByName('Address');

    if (!addressSheet) {
      Logger.log('Address sheet not found');
      return '';
    }

    const lastRow = addressSheet.getLastRow();
    if (lastRow < 2) {
      return '';
    }

    // B列（施設名）、C列（住所）を取得
    const data = addressSheet.getRange(2, 2, lastRow - 1, 2).getValues();

    // 施設名で検索
    for (let i = 0; i < data.length; i++) {
      if (data[i][0] === venueName) {
        return data[i][1] || ''; // C列: 住所
      }
    }

    return '';

  } catch (error) {
    Logger.log('Error in getVenueAddress: ' + error.toString());
    return '';
  }
}

// ==========================================
// バリデーション
// ==========================================

/**
 * 予約データのバリデーション
 */
function validateReservationData(data) {
  // 必須項目チェック
  if (!data.eventdate || !data.eventvol || !data.name || !data.email) {
    return {
      valid: false,
      message: 'eventdate, eventvol, name, emailは必須です'
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
// メール送信（予約システム用）
// ==========================================

/**
 * 予約確認メール送信（ユーザー宛）
 */
function sendReservationConfirmationEmail(reservation) {
  Logger.log('=== sendReservationConfirmationEmail START ===');
  Logger.log('Sending to: ' + reservation.email + ', ReservationID: ' + reservation.id);

  try {
    const eventInfo = getEventInfoFromSchedule(reservation.eventId);
    Logger.log('Event info retrieved for EventID: ' + reservation.eventId);

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
${CONFIG.COMPANY.NAME}
Email: ${CONFIG.COMPANY.EMAIL}
Tel: ${CONFIG.COMPANY.PHONE}
Web: ${CONFIG.URLS.HOME}
――――――――――――――――
`;

    GmailApp.sendEmail(reservation.email, subject, body, {
      replyTo: COMPANY_EMAIL,
      name: 'YOLUBE'
    });

    Logger.log('SUCCESS: Confirmation email sent to ' + reservation.email);
    Logger.log('=== sendReservationConfirmationEmail END ===');

  } catch (error) {
    Logger.log('ERROR in sendReservationConfirmationEmail: ' + error.toString());
    Logger.log('Stack trace: ' + error.stack);
    Logger.log('=== sendReservationConfirmationEmail FAILED ===');
    throw error;
  }
}

/**
 * 管理者通知メール送信（予約システム用）
 */
function sendReservationAdminNotification(reservation) {
  try {
    const eventInfo = getEventInfoFromSchedule(reservation.eventId);

    const subject = `【YOLUBE予約】新規予約受付 - ${reservation.eventId}`;
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

    GmailApp.sendEmail(COMPANY_EMAIL, subject, body, {
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
${CONFIG.COMPANY.NAME}
Email: ${CONFIG.COMPANY.EMAIL}
Tel: ${CONFIG.COMPANY.PHONE}
Web: ${CONFIG.URLS.HOME}
――――――――――――――――
`;

    GmailApp.sendEmail(reservation.email, subject, body, {
      replyTo: COMPANY_EMAIL,
      name: 'YOLUBE'
    });

    Logger.log('Cancellation email sent to: ' + reservation.email);

  } catch (error) {
    Logger.log('Error sending cancellation email: ' + error.toString());
  }
}

// ==========================================
// レスポンス生成
// ==========================================

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

  return output;
}

/**
 * 成功ページHTML生成（お問い合わせフォーム用）
 */
function createSuccessPage(formData, emailSent) {
  const formTypeNames = {
    home: 'ホームページ',
    ke: 'イベントに関するお問い合わせ',
    training: '研修お問い合わせ',
    reservation: 'イベント参加予約'
  };

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>送信完了 - YOLUBE</title>
      <style>
        body {
          font-family: 'Hiragino Sans', 'ヒラギノ角ゴシック', 'Yu Gothic', '游ゴシック', 'Meiryo', 'メイリオ', sans-serif;
          max-width: 700px;
          margin: 50px auto;
          padding: 30px;
          line-height: 1.6;
          color: #333;
          background-color: #f9f9f9;
        }
        .container {
          background: white;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .success {
          color: #4CAF50;
          text-align: center;
          border-bottom: 2px solid #4CAF50;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .success h1 {
          font-size: 2em;
          margin-bottom: 10px;
        }
        .info {
          background: #f0f8f0;
          padding: 20px;
          margin: 20px 0;
          border-radius: 8px;
          border-left: 4px solid #4CAF50;
        }
        .info h3 {
          margin-top: 0;
          color: #2e7d2e;
        }
        .button {
          display: inline-block;
          padding: 12px 30px;
          background: linear-gradient(135deg, #4CAF50, #45a049);
          color: white;
          text-decoration: none;
          border-radius: 25px;
          margin: 10px 5px;
          transition: all 0.3s;
          font-weight: bold;
        }
        .button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        .email-status {
          padding: 10px;
          border-radius: 5px;
          margin: 10px 0;
        }
        .email-success {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }
        .email-warning {
          background: #fff3cd;
          color: #856404;
          border: 1px solid #ffeaa7;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #eee;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="success">
          <h1>お問い合わせを承りました</h1>
        </div>

        <div class="info">
          <h3>📝 送信内容</h3>
          <p><strong>フォーム種別:</strong> ${formTypeNames[formData.formType] || formData.formType}</p>
          <p><strong>お名前:</strong> ${formData.user_name}</p>
          <p><strong>メールアドレス:</strong> ${formData.user_email}</p>
          ${formData.company_name ? '<p><strong>会社名・団体名:</strong> ' + formData.company_name + '</p>' : ''}
          ${formData.user_phone ? '<p><strong>電話番号:</strong> ' + formData.user_phone + '</p>' : ''}
          ${formData.inquiry_type ? '<p><strong>お問い合わせ内容:</strong> ' + formData.inquiry_type + '</p>' : ''}
        </div>

        <div class="${emailSent ? 'email-status email-success' : 'email-status email-warning'}">
          ${emailSent ?
            '✅ <strong>自動返信メールをお送りしました。</strong><br>メールボックスをご確認ください。' :
            '⚠️ <strong>自動返信メールの送信でエラーが発生しましたが、お問い合わせは正常に受理されました。</strong>'}
        </div>

        <div class="info">
          <h3>今後の流れ</h3>
          ${formData.formType === 'reservation' ?
            '<p>当日は受付にて<strong>ユーザー名と予約した旨</strong>をお伝えください。</p>' :
            '<p>担当者より<strong>3営業日以内</strong>にご連絡させていただきます。</p><p>お急ぎの場合は、直接お電話にてお問い合わせください。</p>'}
          </div>
        </div>

        <div class="footer">
          <a href="${CONFIG.URLS.HOME}" class="button">TOPに戻る</a>
          <p style="margin-top: 20px; font-size: 0.9em;">
            © 2025 ${CONFIG.COMPANY.NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  return HtmlService.createHtmlOutput(html)
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * エラーページHTML生成
 */
function createErrorPage(errorMessage) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>送信エラー - YOLUBE</title>
      <style>
        * {
          box-sizing: border-box;
        }
        body {
          font-family: 'Hiragino Sans', 'ヒラギノ角ゴシック', 'Yu Gothic', '游ゴシック', 'Meiryo', 'メイリオ', sans-serif;
          max-width: 700px;
          margin: 0 auto;
          padding: 20px;
          line-height: 1.6;
          color: #333;
          background-color: #f9f9f9;
        }
        .container {
          background: white;
          padding: 30px 20px;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .error {
          color: #f44336;
          text-align: center;
          border-bottom: 2px solid #f44336;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .error h1 {
          font-size: 1.8em;
          margin-bottom: 10px;
        }
        .info {
          background: #ffebee;
          padding: 20px;
          margin: 20px 0;
          border-radius: 8px;
          border-left: 4px solid #f44336;
          word-break: break-word;
        }
        .info h3 {
          margin-top: 0;
          font-size: 1.1em;
        }
        .info p {
          margin: 10px 0;
          font-size: 0.95em;
        }
        .button {
          display: inline-block;
          padding: 12px 24px;
          background: linear-gradient(135deg, #f44336, #d32f2f);
          color: white;
          text-decoration: none;
          border-radius: 25px;
          margin: 10px 5px;
          transition: all 0.3s;
          font-weight: bold;
          font-size: 0.95em;
        }
        .button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #eee;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="error">
          <h1>❌ 送信エラー</h1>
          <p>申し訳ございません。送信中にエラーが発生しました。</p>
        </div>

        <div class="info">
          <h3>エラー内容</h3>
          <p><code>${errorMessage}</code></p>
          <p>しばらく時間をおいて再度お試しいただくか、直接お電話にてお問い合わせください。</p>
        </div>

        <div class="info">
          <h3>📞 直接お問い合わせ</h3>
          <p><strong>電話:</strong> ${CONFIG.COMPANY.PHONE}<br>
          <strong>メール:</strong> ${CONFIG.COMPANY.EMAIL}</p>
        </div>

        <div class="footer">
          <a href="${CONFIG.URLS.HOME}" class="button">TOPに戻る</a>
          <p style="margin-top: 20px; font-size: 0.9em;">
            © 2025 ${CONFIG.COMPANY.NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  return HtmlService.createHtmlOutput(html)
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * X（Twitter）シェアURL生成
 */
function getTwitterShareUrl(reservation) {
  const eventName = reservation.eventname || 'テーブルゲーム交流会：Ke.';
  const eventVol = reservation.eventvol || '';
  const eventDate = reservation.eventdate || '';
  const eventTime = reservation.eventtime || '';
  const eventArea = reservation.eventarea || '';
  const arrivalTime = reservation.arrivalTime || '';

  // シェアテキスト作成
  let text = `${eventName}${eventVol}への参加予約をしました！🎲\n\n`;
  text += `📅 開催日時: ${eventDate} ${eventTime}\n`;
  text += `📍 会場: ${eventArea}\n`;
  if (arrivalTime) {
    text += `🕐 来場予定: ${arrivalTime}\n`;
  }
  text += `\n一緒に遊ぼう！！\n`;
  text += CONFIG.SNS.HASHTAGS;

  const url = CONFIG.URLS.KE_PAGE;

  return CONFIG.URLS.TWITTER_SHARE + '?text=' + encodeURIComponent(text) + '&url=' + encodeURIComponent(url);
}

/**
 * FacebookシェアURL生成
 * モバイル対応: Facebook Appまたはモバイルウェブシェアダイアログ
 */
function getFacebookShareUrl() {
  const url = CONFIG.URLS.KE_PAGE;
  // モバイルブラウザではm.facebook.comのダイアログを使用
  return CONFIG.URLS.FACEBOOK_SHARE + '?u=' + encodeURIComponent(url);
}

/**
 * 予約完了ページHTML生成
 */
function createReservationSuccessHtml(reservation) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>予約完了 - YOLUBE Ke.イベント</title>
      <style>
        * {
          box-sizing: border-box;
          -webkit-box-sizing: border-box;
        }
        html {
          width: 100%;
          height: 100%;
        }
        body {
          font-family: 'Hiragino Sans', 'ヒラギノ角ゴシック', 'Yu Gothic', '游ゴシック', 'Meiryo', 'メイリオ', sans-serif;
          width: 100%;
          min-width: 320px;
          max-width: 700px;
          margin: 0 auto;
          padding: 20px;
          line-height: 1.6;
          color: #333;
          background-color: #f9f9f9;
        }
        .container {
          background: white;
          padding: 30px 20px;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .success {
          color: #4CAF50;
          text-align: center;
          border-bottom: 2px solid #4CAF50;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .success h1 {
          font-size: 1.8em;
          margin-bottom: 10px;
        }
        .reservation-id {
          background: linear-gradient(135deg, #4CAF50, #45a049);
          color: white;
          padding: 15px;
          border-radius: 8px;
          text-align: center;
          font-size: 1.1em;
          margin: 20px 0;
          font-weight: bold;
          word-break: break-all;
        }
        .info {
          background: #f0f8f0;
          padding: 20px;
          margin: 20px 0;
          border-radius: 8px;
          border: 2px solid #ffffff;
        }
        .info h3 {
          margin-top: 0;
          color: #2e7d2e;
        }
        .info p {
          margin: 10px 0;
          color: #333;
        }
        .reservation-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 15px;
        }
        .reservation-table th {
          background: #3a3a3a;
          color: #ffffff;
          padding: 10px;
          text-align: left;
          font-weight: bold;
          width: 35%;
          font-size: 0.9em;
        }
        .reservation-table td {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          background: white;
          word-break: break-word;
          font-size: 0.9em;
        }
        .reservation-table tr:last-child td {
          border-bottom: none;
        }
        .button {
          display: inline-block;
          padding: 12px 30px;
          background: linear-gradient(135deg, #4CAF50, #45a049);
          color: white;
          text-decoration: none;
          border-radius: 25px;
          margin: 10px 5px;
          transition: all 0.3s;
          font-weight: bold;
        }
        .button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        .email-status {
          padding: 15px;
          border-radius: 5px;
          margin: 15px 0;
          background: #ffa9f0;
          color: #3a3a3a;
          border: 1px solid #ffa9f0;
          text-align: center;
        }
        .sns-share {
          background: #f5f5f5;
          padding: 20px;
          margin: 20px 0;
          border-radius: 8px;
          text-align: center;
        }
        .sns-share h3 {
          margin-top: 0;
          color: #333;
          font-size: 1.1em;
        }
        .sns-buttons {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 15px;
          flex-wrap: wrap;
        }
        .sns-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 16px;
          border-radius: 25px;
          text-decoration: none;
          color: white;
          font-weight: bold;
          transition: all 0.3s;
          font-size: 0.9em;
        }
        .sns-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        .sns-btn-twitter {
          background: #1DA1F2;
        }
        .sns-btn-facebook {
          background: #1877F2;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #eee;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="success">
          <h1>🎉 予約が完了しました 🎉</h1>
        </div>

        <div class="reservation-id">
          予約ID: #${reservation.id}
        </div>

        <div class="info">
          <h3>📝 予約内容</h3>
          <table class="reservation-table">
            <tr>
              <th>イベント名</th>
              <td>${reservation.eventname || 'テーブルゲーム交流会：Ke.'} ${reservation.eventvol}</td>
            </tr>
            <tr>
              <th>開催日</th>
              <td>${reservation.eventdate}</td>
            </tr>
            <tr>
              <th>開催場所</th>
              <td>${reservation.eventarea}</td>
            </tr>
            <tr>
              <th>お名前</th>
              <td>${reservation.name}</td>
            </tr>
            <tr>
              <th>メールアドレス</th>
              <td>${reservation.email}</td>
            </tr>
            <tr>
              <th>同行者</th>
              <td>${reservation.companionCount > 0 ? reservation.companionCount + '名' : 'なし'}</td>
            </tr>
            ${reservation.arrivalTime ? '<tr><th>来場予定時刻</th><td>' + reservation.arrivalTime + '</td></tr>' : ''}
          </table>
        </div>

        <div class="email-status">
          確認メールをお送りしました。<br>
          メールボックスをご確認ください。
        </div>

        <div class="sns-share">
          <h3>📢 SNSでシェア</h3>
          <p style="color: #666; font-size: 0.9em; margin: 10px 0;">予約したことをみんなに知らせよう！</p>
          <div class="sns-buttons">
            <a href="${getTwitterShareUrl(reservation)}" target="_blank" class="sns-btn sns-btn-twitter">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Xでシェア
            </a>
            <a href="${getFacebookShareUrl()}" target="_blank" class="sns-btn sns-btn-facebook">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebookでシェア
            </a>
          </div>
        </div>

        <div class="info">
          <h3 style="text-align: center;">当日のご案内</h3>
          <p style="text-align: center;">当日は受付にてユーザー名と予約した旨をお伝えください。</p>
          <p style="text-align: center;">キャンセルの場合は、確認メールに記載されているメールアドレスまでご連絡ください。</p>
        </div>

        <div class="footer">
          <a href="${CONFIG.URLS.HOME}" class="button">TOPに戻る</a>
          <p style="margin-top: 20px; font-size: 0.9em;">
            © 2025 ${CONFIG.COMPANY.NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  return HtmlService.createHtmlOutput(html)
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * 予約エラーページHTML生成
 */
function createReservationErrorHtml(errorMessage) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>予約エラー - YOLUBE Ke.イベント</title>
      <style>
        * {
          box-sizing: border-box;
          -webkit-box-sizing: border-box;
        }
        html {
          width: 100%;
          height: 100%;
        }
        body {
          font-family: 'Hiragino Sans', 'ヒラギノ角ゴシック', 'Yu Gothic', '游ゴシック', 'Meiryo', 'メイリオ', sans-serif;
          width: 100%;
          min-width: 320px;
          max-width: 700px;
          margin: 0 auto;
          padding: 20px;
          line-height: 1.6;
          color: #333;
          background-color: #f9f9f9;
        }
        .container {
          background: white;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .error {
          color: #f44336;
          text-align: center;
          border-bottom: 2px solid #f44336;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .error h1 {
          font-size: 2em;
          margin-bottom: 10px;
        }
        .info {
          background: #ffebee;
          padding: 20px;
          margin: 20px 0;
          border-radius: 8px;
          border-left: 4px solid #f44336;
        }
        .button {
          display: inline-block;
          padding: 12px 30px;
          background: linear-gradient(135deg, #f44336, #d32f2f);
          color: white;
          text-decoration: none;
          border-radius: 25px;
          margin: 10px 5px;
          transition: all 0.3s;
          font-weight: bold;
        }
        .button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #eee;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="error">
          <h1>⚠️ 予約処理でエラーが発生しました</h1>
        </div>

        <div class="info">
          <p><strong>エラー内容:</strong></p>
          <p>${errorMessage}</p>
        </div>

        <div class="info">
          <p>お手数ですが、もう一度お試しいただくか、お問い合わせフォームからご連絡ください。</p>
        </div>

        <div class="footer">
          <a href="javascript:history.back()" class="button">戻る</a>
          <a href="${CONFIG.URLS.HOME}" class="button">TOPに戻る</a>
          <p style="margin-top: 20px; font-size: 0.9em;">
            © 2025 ${CONFIG.COMPANY.NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  return HtmlService.createHtmlOutput(html)
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// ==========================================
// デバッグ・テスト関数
// ==========================================

/**
 * 予約データを全件ログ出力（デバッグ用）
 */
function debugAllReservations() {
  const sheet = getReservationsSheet();
  const lastRow = sheet.getLastRow();

  Logger.log('=== Debug All Reservations ===');
  Logger.log('Sheet name: ' + RESERVATIONS_SHEET_NAME);
  Logger.log('Last row: ' + lastRow);

  if (lastRow <= 1) {
    Logger.log('No reservations found');
    return;
  }

  const data = sheet.getRange(2, 1, lastRow - 1, 15).getValues(); // 15列に拡張

  Logger.log('Total reservations: ' + data.length);
  Logger.log('---');

  for (let i = 0; i < data.length; i++) {
    Logger.log('Row ' + (i + 2) + ':');
    Logger.log('  ID: ' + data[i][COLUMNS.ID]);
    Logger.log('  EventID: "' + data[i][COLUMNS.EVENT_ID] + '" (type: ' + typeof data[i][COLUMNS.EVENT_ID] + ')');
    Logger.log('  Name: ' + data[i][COLUMNS.NAME]);
    Logger.log('  Email: ' + data[i][COLUMNS.EMAIL]);
    Logger.log('  Status: "' + data[i][COLUMNS.STATUS] + '"');
    Logger.log('---');
  }
}

/**
 * 特定のeventIdで予約を検索（デバッグ用）
 */
function debugGetReservationsByEventId(eventId) {
  Logger.log('=== Debug Get Reservations By EventId ===');
  Logger.log('Search eventId: "' + eventId + '" (type: ' + typeof eventId + ')');

  const reservations = getReservations(eventId);

  Logger.log('Found ' + reservations.length + ' reservations');
  Logger.log('Result: ' + JSON.stringify(reservations));
}

// ==========================================
// テスト関数
// ==========================================

/**
 * お問い合わせフォームのテスト
 */
function testContactForm() {
  const testData = {
    formType: 'home',
    user_name: 'テスト太郎',
    user_email: 'txgame.akita@gmail.com',
    user_phone: '090-1234-5678',
    inquiry_type: 'テスト',
    message: 'これはテストメッセージです。'
  };

  console.log('=== Testing Contact Form ===');

  const saveResult = saveToSpreadsheet(testData);
  console.log('Save result:', saveResult);

  console.log('Email test - would send to:', testData.user_email);
  console.log('=== Test Complete ===');

  return 'Test completed successfully';
}

/**
 * 予約システムのテスト
 */
function testReservationSystem() {
  const testData = {
    eventId: 'TEST_001',
    name: 'テスト次郎',
    email: 'test@example.com',
    companionCount: 2,
    arrivalTime: '18:00',
    desiredGame: 'カタン',
    notes: 'テスト予約です'
  };

  console.log('=== Testing Reservation System ===');

  const validation = validateReservationData(testData);
  console.log('Validation:', validation);

  if (validation.valid) {
    const reservation = createReservation(testData);
    console.log('Created reservation:', reservation);

    const retrieved = getReservation(reservation.id);
    console.log('Retrieved reservation:', retrieved);
  }

  console.log('=== Test Complete ===');

  return 'Test completed successfully';
}
