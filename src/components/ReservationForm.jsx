import React, { useState, useRef, useEffect } from 'react';
import GoogleSheetsService from '../services/googleSheets';
import './ReservationForm.css';

const ReservationForm = ({ currentLanguage = 'ja' }) => {
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [hasCompanions, setHasCompanions] = useState(false);
  const [charCount, setCharCount] = useState({ games: 0, notes: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitCooldown, setSubmitCooldown] = useState(false);

  // 翻訳データ
  const translations = {
    ja: {
      title: 'イベント予約',
      subtitle: 'Ke.イベントへの参加予約はこちらから',
      formTitle: '参加予約フォーム',
      eventLabel: '予約するイベント',
      selectEvent: '選択してください',
      loading: 'イベント情報を読み込み中...',
      nameLabel: 'お名前',
      namePlaceholder: '山田 太郎',
      nameHint: '50文字以内',
      emailLabel: 'メールアドレス',
      emailPlaceholder: 'example@email.com',
      emailHint: '予約確認メールが送信されます',
      companionsLabel: '同行者の有無',
      companionsNo: 'なし（1人で参加）',
      companionsYes: 'あり',
      companionsCount: '同行者数',
      arrivalLabel: '来場予定時刻',
      arrivalUndecided: '未定',
      arrivalHint: 'おおよその到着時刻をお選びください',
      gamesLabel: '遊びたいゲーム',
      gamesPlaceholder: '例：カタン、モノポリー、人狼ゲームなど',
      gamesHint: '文字',
      notesLabel: '特記事項',
      notesPlaceholder: 'アレルギー、車椅子利用、その他ご要望など',
      submitBtn: '予約する',
      submitting: '送信中...',
      cooldown: '送信完了（5秒待機中）',
      required: '*'
    },
    en: {
      title: 'Event Reservation',
      subtitle: 'Reserve your participation in Ke. events here',
      formTitle: 'Participation Reservation Form',
      eventLabel: 'Event to Reserve',
      selectEvent: 'Please select',
      loading: 'Loading event information...',
      nameLabel: 'Name',
      namePlaceholder: 'Taro Yamada',
      nameHint: 'Within 50 characters',
      emailLabel: 'Email',
      emailPlaceholder: 'example@email.com',
      emailHint: 'Confirmation email will be sent',
      companionsLabel: 'Companions',
      companionsNo: 'None (Solo participation)',
      companionsYes: 'Yes',
      companionsCount: 'Number of Companions',
      arrivalLabel: 'Expected Arrival Time',
      arrivalUndecided: 'Undecided',
      arrivalHint: 'Please select approximate arrival time',
      gamesLabel: 'Games You Want to Play',
      gamesPlaceholder: 'e.g., Catan, Monopoly, Werewolf, etc.',
      gamesHint: 'characters',
      notesLabel: 'Special Notes',
      notesPlaceholder: 'Allergies, wheelchair use, other requests, etc.',
      submitBtn: 'Reserve',
      submitting: 'Submitting...',
      cooldown: 'Submitted (5 sec wait)',
      required: '*'
    },
    vi: {
      title: 'Đặt Chỗ Sự Kiện',
      subtitle: 'Đặt chỗ tham gia sự kiện Ke. tại đây',
      formTitle: 'Mẫu Đặt Chỗ Tham Gia',
      eventLabel: 'Sự Kiện Đặt Chỗ',
      selectEvent: 'Vui lòng chọn',
      loading: 'Đang tải thông tin sự kiện...',
      nameLabel: 'Tên',
      namePlaceholder: 'Taro Yamada',
      nameHint: 'Trong vòng 50 ký tự',
      emailLabel: 'Email',
      emailPlaceholder: 'example@email.com',
      emailHint: 'Email xác nhận sẽ được gửi',
      companionsLabel: 'Người Đi Cùng',
      companionsNo: 'Không (Tham gia một mình)',
      companionsYes: 'Có',
      companionsCount: 'Số Người Đi Cùng',
      arrivalLabel: 'Thời Gian Đến Dự Kiến',
      arrivalUndecided: 'Chưa quyết định',
      arrivalHint: 'Vui lòng chọn thời gian đến gần đúng',
      gamesLabel: 'Trò Chơi Bạn Muốn Chơi',
      gamesPlaceholder: 'VD: Catan, Monopoly, Ma Sói, v.v.',
      gamesHint: 'ký tự',
      notesLabel: 'Ghi Chú Đặc Biệt',
      notesPlaceholder: 'Dị ứng, sử dụng xe lăn, yêu cầu khác, v.v.',
      submitBtn: 'Đặt Chỗ',
      submitting: 'Đang gửi...',
      cooldown: 'Đã gửi (Chờ 5 giây)',
      required: '*'
    },
    de: {
      title: 'Veranstaltungsreservierung',
      subtitle: 'Reservieren Sie hier Ihre Teilnahme an Ke. Veranstaltungen',
      formTitle: 'Teilnahme-Reservierungsformular',
      eventLabel: 'Zu reservierende Veranstaltung',
      selectEvent: 'Bitte auswählen',
      loading: 'Veranstaltungsinformationen werden geladen...',
      nameLabel: 'Name',
      namePlaceholder: 'Max Mustermann',
      nameHint: 'Maximal 50 Zeichen',
      emailLabel: 'E-Mail',
      emailPlaceholder: 'beispiel@email.com',
      emailHint: 'Bestätigungs-E-Mail wird gesendet',
      companionsLabel: 'Begleitpersonen',
      companionsNo: 'Keine (Alleinige Teilnahme)',
      companionsYes: 'Ja',
      companionsCount: 'Anzahl der Begleitpersonen',
      arrivalLabel: 'Voraussichtliche Ankunftszeit',
      arrivalUndecided: 'Unentschieden',
      arrivalHint: 'Bitte ungefähre Ankunftszeit auswählen',
      gamesLabel: 'Spiele, die Sie spielen möchten',
      gamesPlaceholder: 'z.B. Catan, Monopoly, Werwolf usw.',
      gamesHint: 'Zeichen',
      notesLabel: 'Besondere Hinweise',
      notesPlaceholder: 'Allergien, Rollstuhlnutzung, andere Wünsche usw.',
      submitBtn: 'Reservieren',
      submitting: 'Wird gesendet...',
      cooldown: 'Gesendet (5 Sek. warten)',
      required: '*'
    },
    ko: {
      title: '이벤트 예약',
      subtitle: 'Ke. 이벤트 참여 예약은 여기에서',
      formTitle: '참여 예약 양식',
      eventLabel: '예약할 이벤트',
      selectEvent: '선택해주세요',
      loading: '이벤트 정보를 로딩 중...',
      nameLabel: '이름',
      namePlaceholder: '홍길동',
      nameHint: '50자 이내',
      emailLabel: '이메일',
      emailPlaceholder: 'example@email.com',
      emailHint: '확인 이메일이 전송됩니다',
      companionsLabel: '동반자',
      companionsNo: '없음 (단독 참여)',
      companionsYes: '있음',
      companionsCount: '동반자 수',
      arrivalLabel: '예상 도착 시간',
      arrivalUndecided: '미정',
      arrivalHint: '대략적인 도착 시간을 선택해주세요',
      gamesLabel: '플레이하고 싶은 게임',
      gamesPlaceholder: '예: 카탄, 모노폴리, 마피아 등',
      gamesHint: '자',
      notesLabel: '특별 사항',
      notesPlaceholder: '알레르기, 휠체어 이용, 기타 요청사항 등',
      submitBtn: '예약하기',
      submitting: '전송 중...',
      cooldown: '전송 완료 (5초 대기)',
      required: '*'
    },
    zh: {
      title: '活动预约',
      subtitle: '在此预约参加 Ke. 活动',
      formTitle: '参与预约表格',
      eventLabel: '预约活动',
      selectEvent: '请选择',
      loading: '正在加载活动信息...',
      nameLabel: '姓名',
      namePlaceholder: '张三',
      nameHint: '50个字符以内',
      emailLabel: '电子邮箱',
      emailPlaceholder: 'example@email.com',
      emailHint: '将发送确认邮件',
      companionsLabel: '同伴',
      companionsNo: '无 (单独参加)',
      companionsYes: '有',
      companionsCount: '同伴人数',
      arrivalLabel: '预计到达时间',
      arrivalUndecided: '未定',
      arrivalHint: '请选择大致到达时间',
      gamesLabel: '想玩的游戏',
      gamesPlaceholder: '例如：卡坦岛、大富翁、狼人杀等',
      gamesHint: '字符',
      notesLabel: '特别说明',
      notesPlaceholder: '过敏、轮椅使用、其他需求等',
      submitBtn: '预约',
      submitting: '提交中...',
      cooldown: '已提交 (等待5秒)',
      required: '*'
    },
    fr: {
      title: 'Réservation d\'Événement',
      subtitle: 'Réservez votre participation aux événements Ke. ici',
      formTitle: 'Formulaire de Réservation de Participation',
      eventLabel: 'Événement à Réserver',
      selectEvent: 'Veuillez sélectionner',
      loading: 'Chargement des informations de l\'événement...',
      nameLabel: 'Nom',
      namePlaceholder: 'Jean Dupont',
      nameHint: 'Maximum 50 caractères',
      emailLabel: 'E-mail',
      emailPlaceholder: 'exemple@email.com',
      emailHint: 'Un e-mail de confirmation sera envoyé',
      companionsLabel: 'Accompagnants',
      companionsNo: 'Aucun (Participation seule)',
      companionsYes: 'Oui',
      companionsCount: 'Nombre d\'Accompagnants',
      arrivalLabel: 'Heure d\'Arrivée Prévue',
      arrivalUndecided: 'Indécis',
      arrivalHint: 'Veuillez sélectionner l\'heure d\'arrivée approximative',
      gamesLabel: 'Jeux Que Vous Souhaitez Jouer',
      gamesPlaceholder: 'par ex. Catan, Monopoly, Loup-Garou, etc.',
      gamesHint: 'caractères',
      notesLabel: 'Notes Spéciales',
      notesPlaceholder: 'Allergies, utilisation de fauteuil roulant, autres demandes, etc.',
      submitBtn: 'Réserver',
      submitting: 'Envoi en cours...',
      cooldown: 'Envoyé (Attendre 5 sec)',
      required: '*'
    }
  };

  const t = translations[currentLanguage];

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
        <h2 className="section-title">{t.title}</h2>
        <p className="section-subtitle">
          {t.subtitle}
        </p>

        <div className="reservation-content">
          <div className="form-card reservation-card">
            <h3 className="reservation-title">{t.formTitle}</h3>

            <form ref={form} onSubmit={handleSubmit} className="reservation-form-content">
              {/* イベント選択 */}
              <div className="form-group">
                <label htmlFor="event_id">{t.eventLabel} <span className="required">{t.required}</span></label>
                <select
                  id="event_id"
                  name="event_id"
                  required
                  disabled={isLoading || upcomingEvents.length === 0}
                >
                  <option value="">{t.selectEvent}</option>
                  {upcomingEvents.map((event) => (
                    <option key={event.eventId} value={event.eventId}>
                      {event.displayName}
                    </option>
                  ))}
                </select>
                {upcomingEvents.length === 0 && (
                  <small className="form-hint">{t.loading}</small>
                )}
              </div>

              {/* 氏名 */}
              <div className="form-group">
                <label htmlFor="user_name">{t.nameLabel} <span className="required">{t.required}</span></label>
                <input
                  type="text"
                  id="user_name"
                  name="user_name"
                  maxLength="50"
                  required
                  disabled={isLoading}
                  placeholder={t.namePlaceholder}
                />
                <small className="form-hint">{t.nameHint}</small>
              </div>

              {/* メールアドレス */}
              <div className="form-group">
                <label htmlFor="user_email">{t.emailLabel} <span className="required">{t.required}</span></label>
                <input
                  type="email"
                  id="user_email"
                  name="user_email"
                  required
                  disabled={isLoading}
                  placeholder={t.emailPlaceholder}
                />
                <small className="form-hint">{t.emailHint}</small>
              </div>

              {/* 同行者の有無 */}
              <div className="form-group">
                <label>{t.companionsLabel} <span className="required">{t.required}</span></label>
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
                    <span>{t.companionsNo}</span>
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
                    <span>{t.companionsYes}</span>
                  </label>
                </div>
              </div>

              {/* 同行者数（条件付き表示） */}
              {hasCompanions && (
                <div className="form-group companion-count-group">
                  <label htmlFor="companions_count">{t.companionsCount} <span className="required">{t.required}</span></label>
                  <select
                    id="companions_count"
                    name="companions_count"
                    disabled={isLoading}
                    defaultValue="1"
                  >
                    {companionCounts.slice(1).map((count) => (
                      <option key={count} value={count}>
                        {count}
                        {currentLanguage === 'ja' ? '人' :
                         currentLanguage === 'vi' ? ' người' :
                         currentLanguage === 'ko' ? '명' :
                         currentLanguage === 'zh' ? '人' :
                         currentLanguage === 'de' ? (count === 1 ? ' Person' : ' Personen') :
                         currentLanguage === 'fr' ? (count === 1 ? ' personne' : ' personnes') :
                         ' people'}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* 来場予定時刻 */}
              <div className="form-group">
                <label htmlFor="arrival_time">{t.arrivalLabel}</label>
                <select
                  id="arrival_time"
                  name="arrival_time"
                  disabled={isLoading}
                >
                  <option value="">{t.arrivalUndecided}</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                <small className="form-hint">{t.arrivalHint}</small>
              </div>

              {/* 遊びたいゲーム */}
              <div className="form-group">
                <label htmlFor="games_request">{t.gamesLabel}</label>
                <textarea
                  id="games_request"
                  name="games_request"
                  rows="4"
                  maxLength="2000"
                  disabled={isLoading}
                  placeholder={t.gamesPlaceholder}
                  onChange={(e) => handleTextChange(e, 'games')}
                ></textarea>
                <small className="form-hint char-count">
                  {charCount.games} / 2000{t.gamesHint}
                </small>
              </div>

              {/* 特記事項 */}
              <div className="form-group">
                <label htmlFor="special_notes">{t.notesLabel}</label>
                <textarea
                  id="special_notes"
                  name="special_notes"
                  rows="3"
                  disabled={isLoading}
                  placeholder={t.notesPlaceholder}
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
                {isLoading ? t.submitting : submitCooldown ? t.cooldown : t.submitBtn}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReservationForm;
