import React, { useState, useRef, useEffect } from 'react';
import GoogleSheetsService from '../services/googleSheets';
import './ReservationForm.css';

const ReservationForm = () => {
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [hasCompanions, setHasCompanions] = useState(false);
  const [charCount, setCharCount] = useState({ games: 0, notes: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitCooldown, setSubmitCooldown] = useState(false);

  // イベント一覧を取得
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const sheetsService = new GoogleSheetsService();
        const data = await sheetsService.getSheetData();

        // 次の6つのイベントを取得
        const events = getUpcomingEventsList(sheetsService, data, 6);
        setUpcomingEvents(events);
      } catch (error) {
        console.error('Failed to fetch events:', error);
        // デフォルトのイベントリストを設定
        setUpcomingEvents([
          {
            eventId: 'event_001',
            displayName: '次回開催予定のイベント',
            date: '近日開催予定',
            venue: '未定'
          }
        ]);
      }
    };

    fetchEvents();
  }, []);

  // 複数の近日開催イベントを取得するヘルパー関数
  const getUpcomingEventsList = (sheetsService, data, limit = 6) => {
    const now = new Date();
    const currentHour = now.getHours();

    const cutoffDate = new Date();
    if (currentHour >= 22) {
      cutoffDate.setDate(cutoffDate.getDate() + 1);
    }
    cutoffDate.setHours(0, 0, 0, 0);

    let candidates = [];

    // データをフィルタリング
    for (let i = 3; i < data.length; i++) {
      const row = data[i];
      if (!row || row.length < 5) continue;

      const dateStr = row[0]; // A列
      const timeStr = row[1]; // B列
      const venue = row[2];   // C列
      const eventName = row[3]; // D列
      const eventId = row[4]; // E列（イベントID）

      // イベントIDが空の行はスキップ
      if (!eventId) continue;

      const eventDate = sheetsService.parseDate(dateStr);
      if (!eventDate || eventDate < cutoffDate) continue;

      // 定員を取得（F列）
      const capacity = row[5] || 50; // デフォルト50

      candidates.push({
        date: eventDate,
        dateString: dateStr,
        timeString: timeStr,
        venue: venue,
        eventName: eventName,
        eventId: eventId,
        capacity: capacity
      });
    }

    // 日付順にソート
    candidates.sort((a, b) => a.date - b.date);

    // 上限数まで取得
    const limitedEvents = candidates.slice(0, limit);

    // 表示用フォーマットに変換
    return limitedEvents.map((event) => {
      // 表示名を作成（日付 + 備考 + 開催回数 + 会場）
      let displayName = event.dateString;

      // 備考欄を追加（空欄の場合はデフォルト値）
      const eventNameDisplay = event.eventName || 'テーブルゲーム交流会：Ke.';
      displayName += ' ' + eventNameDisplay;

      // 開催回数を追加（E列）
      if (event.eventId) {
        displayName += event.eventId;
      }

      // 会場名を追加
      if (event.venue) {
        displayName += ' ' + event.venue;
      }

      return {
        eventId: event.eventId,           // E列: 開催回数
        displayName: displayName,          // 表示用
        eventdate: event.dateString,       // A列: 開催日
        eventtime: event.timeString || '', // B列: 時間
        eventarea: event.venue || '',      // C列: 開催場所
        eventname: event.eventName || '',  // D列: 備考欄
        eventvol: event.eventId || '',     // E列: 開催回数
        eventcapacity: event.capacity || 50 // F列: 定員
      };
    });
  };

  // 来場時刻の選択肢（10:00-18:00、30分刻み）
  const timeSlots = [];
  for (let hour = 10; hour <= 18; hour++) {
    timeSlots.push(`${String(hour).padStart(2, '0')}:00`);
    if (hour < 18) {
      timeSlots.push(`${String(hour).padStart(2, '0')}:30`);
    }
  }

  // 同行者数の選択肢（0-10人）
  const companionCounts = Array.from({ length: 11 }, (_, i) => i);

  // 文字数カウント
  const handleTextChange = (e, field) => {
    const { value } = e.target;
    setCharCount(prev => ({ ...prev, [field]: value.length }));
  };

  // フォーム送信
  const handleSubmit = (e) => {
    e.preventDefault();

    // 二重送信防止チェック
    if (isSubmitting || submitCooldown) {
      return;
    }

    setIsSubmitting(true);
    setIsLoading(true);
    setMessage('');

    // 選択されたイベントの情報を取得
    const selectedEventId = form.current.event_id.value;
    const selectedEvent = upcomingEvents.find(event => event.eventId === selectedEventId);

    if (!selectedEvent) {
      setMessage('イベントを選択してください。');
      setIsLoading(false);
      setIsSubmitting(false);
      return;
    }

    // バリデーション
    const formData = {
      eventdate: selectedEvent.eventdate,
      eventtime: selectedEvent.eventtime,
      eventname: selectedEvent.eventname || 'テーブルゲーム交流会：Ke.',
      eventarea: selectedEvent.eventarea,
      eventvol: selectedEvent.eventvol,
      eventcapacity: selectedEvent.eventcapacity,
      name: form.current.user_name.value,
      email: form.current.user_email.value,
      companionCount: hasCompanions ? form.current.companions_count.value : '0',
      arrivalTime: form.current.arrival_time.value,
      desiredGame: form.current.games_request.value,
      notes: form.current.special_notes.value
    };

    console.log('=== Reservation Form Submit Debug ===');
    console.log('Selected Event:', selectedEvent);
    console.log('Form Data:', formData);

    // 文字数チェック
    if (formData.name.length > 50) {
      setMessage('お名前は50文字以内で入力してください。');
      setIsLoading(false);
      setIsSubmitting(false);
      return;
    }

    if (formData.desiredGame.length > 2000) {
      setMessage('遊びたいゲームは2000文字以内で入力してください。');
      setIsLoading(false);
      setIsSubmitting(false);
      return;
    }

    // GAS WebアプリのURL
    const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxZRZSDGyg_Z1rGcuD9xymlMXB4vV3Cz8EVTOWS2GvP-bLKeYcq7q122ixPQKV71Xg6iQ/exec';

    // HTMLフォーム送信でCORS回避
    const hiddenForm = document.createElement('form');
    hiddenForm.method = 'POST';
    hiddenForm.action = GAS_WEB_APP_URL;
    hiddenForm.target = '_blank'; // 新しいタブで結果ページを開く

    // actionパラメータを使用（予約システムAPI）
    const submitData = {
      action: 'createReservation',
      ...formData
    };

    Object.keys(submitData).forEach(key => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = submitData[key] || '';
      hiddenForm.appendChild(input);
    });

    // フォームを送信
    document.body.appendChild(hiddenForm);
    hiddenForm.submit();
    document.body.removeChild(hiddenForm);

    // ユーザーフィードバック
    setMessage('予約を送信しました。確認画面が新しいタブで開きます。自動返信メールをご確認ください。');
    form.current.reset();
    setHasCompanions(false);
    setCharCount({ games: 0, notes: 0 });
    setIsLoading(false);

    // 送信成功後、5秒間のクールダウンを設定
    setSubmitCooldown(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitCooldown(false);
    }, 5000);
  };

  return (
    <section id="reservation" className="reservation section">
      <div className="section-container">
        <h2 className="section-title">イベント予約</h2>
        <p className="section-subtitle">
          Ke.イベントへの参加予約はこちらから
        </p>

        <div className="reservation-content">
          <div className="form-card reservation-card">
            <h3 className="reservation-title">参加予約フォーム</h3>

            <form ref={form} onSubmit={handleSubmit} className="reservation-form-content">
              {/* イベント選択 */}
              <div className="form-group">
                <label htmlFor="event_id">予約するイベント <span className="required">*</span></label>
                <select
                  id="event_id"
                  name="event_id"
                  required
                  disabled={isLoading || upcomingEvents.length === 0}
                >
                  <option value="">選択してください</option>
                  {upcomingEvents.map((event) => (
                    <option key={event.eventId} value={event.eventId}>
                      {event.displayName}
                    </option>
                  ))}
                </select>
                {upcomingEvents.length === 0 && (
                  <small className="form-hint">イベント情報を読み込み中...</small>
                )}
              </div>

              {/* 氏名 */}
              <div className="form-group">
                <label htmlFor="user_name">お名前 <span className="required">*</span></label>
                <input
                  type="text"
                  id="user_name"
                  name="user_name"
                  maxLength="50"
                  required
                  disabled={isLoading}
                  placeholder="山田 太郎"
                />
                <small className="form-hint">50文字以内</small>
              </div>

              {/* メールアドレス */}
              <div className="form-group">
                <label htmlFor="user_email">メールアドレス <span className="required">*</span></label>
                <input
                  type="email"
                  id="user_email"
                  name="user_email"
                  required
                  disabled={isLoading}
                  placeholder="example@email.com"
                />
                <small className="form-hint">予約確認メールが送信されます</small>
              </div>

              {/* 同行者の有無 */}
              <div className="form-group">
                <label>同行者の有無 <span className="required">*</span></label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="has_companions"
                      value="no"
                      checked={!hasCompanions}
                      onChange={() => setHasCompanions(false)}
                      disabled={isLoading}
                    />
                    <span>なし（1人で参加）</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="has_companions"
                      value="yes"
                      checked={hasCompanions}
                      onChange={() => setHasCompanions(true)}
                      disabled={isLoading}
                    />
                    <span>あり</span>
                  </label>
                </div>
              </div>

              {/* 同行者数（条件付き表示） */}
              {hasCompanions && (
                <div className="form-group companion-count-group">
                  <label htmlFor="companions_count">同行者数 <span className="required">*</span></label>
                  <select
                    id="companions_count"
                    name="companions_count"
                    disabled={isLoading}
                    defaultValue="1"
                  >
                    {companionCounts.slice(1).map((count) => (
                      <option key={count} value={count}>
                        {count}人
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* 来場予定時刻 */}
              <div className="form-group">
                <label htmlFor="arrival_time">来場予定時刻</label>
                <select
                  id="arrival_time"
                  name="arrival_time"
                  disabled={isLoading}
                >
                  <option value="">未定</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                <small className="form-hint">おおよその到着時刻をお選びください</small>
              </div>

              {/* 遊びたいゲーム */}
              <div className="form-group">
                <label htmlFor="games_request">遊びたいゲーム</label>
                <textarea
                  id="games_request"
                  name="games_request"
                  rows="4"
                  maxLength="2000"
                  disabled={isLoading}
                  placeholder="例：カタン、モノポリー、人狼ゲームなど"
                  onChange={(e) => handleTextChange(e, 'games')}
                ></textarea>
                <small className="form-hint char-count">
                  {charCount.games} / 2000文字
                </small>
              </div>

              {/* 特記事項 */}
              <div className="form-group">
                <label htmlFor="special_notes">特記事項</label>
                <textarea
                  id="special_notes"
                  name="special_notes"
                  rows="3"
                  disabled={isLoading}
                  placeholder="アレルギー、車椅子利用、その他ご要望など"
                  onChange={(e) => handleTextChange(e, 'notes')}
                ></textarea>
              </div>

              {/* メッセージ表示 */}
              {message && (
                <div className={`form-message ${message.includes('エラー') || message.includes('ください') ? 'error' : 'success'}`}>
                  {message}
                </div>
              )}

              {/* 送信ボタン */}
              <button
                type="submit"
                className={`btn reservation-btn ${isLoading ? 'loading' : ''}`}
                disabled={isLoading || isSubmitting || submitCooldown || upcomingEvents.length === 0}
              >
                {isLoading ? '送信中...' : submitCooldown ? '送信完了（5秒待機中）' : '予約する'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReservationForm;
