// ============================================
// ファイル名: 既存GASコード (お問い合わせフォームシステム)
// バックアップ日時: 2025-10-06
// バージョン: v2.2 (CORS修正版)
// ============================================

// YOLUBE お問い合わせフォーム統合システム v2.2 (CORS修正版)
// HTMLフォーム送信対応・成功ページ返却

// ===== 設定 =====
const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/1Ejs0annRLCGiV0dSTVGwm-1oDWbPHv65s1xLeWyRen8/edit?usp=sharing';
const COMPANY_EMAIL = 'info@yolube.jp';
const COMPANY_NAME = 'YOLUBE';

// ===== メイン処理 =====
function doGet(e) {
  return ContentService
    .createTextOutput('YOLUBE Contact Form System - Ready!')
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    // フォームデータの取得（URLエンコード対応）
    let formData = {};
    if (e.parameter) {
      Object.keys(e.parameter).forEach(k => formData[k] = e.parameter[k]);
    }

    console.log('Received form data:', formData);

    const validFormTypes = ['home', 'ke', 'training'];
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
    console.error('Main error:', error);
    return createErrorPage('システムエラーが発生しました: ' + error.toString());
  }
}

// ===== スプレッドシート保存 =====
function saveToSpreadsheet(formData) {
  try {
    const spreadsheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
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
        headers.push('会社名・団体名', 'メッセージ');
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
        formData.message || ''
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
メッセージ: ${formData.message || '未入力'}

詳細につきましては、担当者よりご連絡させていただきます。`;
      break;

    case 'training':
      specific = `
会社名・団体名: ${formData.company_name || '未入力'}
メッセージ: ${formData.message || '未入力'}

研修の詳細につきましては、担当者よりご連絡させていただきます。`;
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
TEL              : 090-2841-3926
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
  }

  body += `

■ スプレッドシート ■
データは以下のシートに保存されました:
${SPREADSHEET_URL}

───────────────────
YOLUBE Contact System
───────────────────`;

  return body;
}

// ===== 成功ページHTML生成 =====
function createSuccessPage(formData, emailSent) {
  const formTypeNames = {
    home: 'ホームページ',
    ke: 'Ke.イベント参加申し込み',
    training: '研修お問い合わせ'
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
          <p>担当者より<strong>3営業日以内</strong>にご連絡させていただきます。</p>
          <p>お急ぎの場合は、直接お電話にてお問い合わせください。</p>
          <div style="margin-top: 15px;">
            <p><strong>電話:</strong> 090-2841-3926</p>
            <p><strong>メール:</strong> info@yolube.jp</p>
          </div>
        </div>

        <div class="footer">
          <a href="https://yolube.jp" class="button">TOPに戻る</a>
          <p style="margin-top: 20px; font-size: 0.9em;">
            © 2025 YOLUBE. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  return HtmlService.createHtmlOutput(html);
}

// ===== エラーページHTML生成 =====
function createErrorPage(errorMessage) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>送信エラー - YOLUBE</title>
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
          <p><strong>電話:</strong> 090-2841-3926<br>
          <strong>メール:</strong> info@yolube.jp</p>
        </div>

        <div class="footer">
          <a href="https://yolube.jp" class="button">TOPに戻る</a>
          <p style="margin-top: 20px; font-size: 0.9em;">
            © 2025 YOLUBE. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  return HtmlService.createHtmlOutput(html);
}

// ===== テスト関数 =====
function testContactForm() {
  const testData = {
    formType: 'home',
    user_name: 'テスト太郎',
    user_email: 'txgame.akita@gmail.com',  // 実際のGmailアドレスに変更
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

function testFixedEmailSending() {
  const testData = {
    formType: 'home',
    user_name: 'テスト太郎',
    user_email: 'txgame.akita@gmail.com',  // 実際のGmailアドレスに変更
    user_phone: '090-1234-5678',
    inquiry_type: 'テスト',
    message: 'これは修正版メール送信テストです。'
  };

  console.log('=== Testing Fixed Email Sending ===');
  const result = sendAutoReply(testData);
  console.log('Fixed email test result:', result);
  return result;
}

// ============================================
// ファイル終了: 既存GASコード
// ============================================
