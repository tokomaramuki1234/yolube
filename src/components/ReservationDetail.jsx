import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import './ReservationDetail.css';

const ReservationDetail = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [reservations, setReservations] = useState([]);
  const [eventInfo, setEventInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const currentLanguage = searchParams.get('lang') || 'ja';

  // 翻訳データ
  const translations = {
    ja: {
      loading: '予約詳細を読み込み中...',
      backBtn: '戻る',
      backToList: '← 予約状況に戻る',
      title: '予約者一覧',
      eventLabel: 'イベント:',
      dateLabel: '日時:',
      venueLabel: '会場:',
      reservationCountLabel: '予約数:',
      people: '名',
      noReservations: 'このイベントには予約がありません。',
      nameHeader: '予約者名',
      companionHeader: '同行者',
      arrivalTimeHeader: '来場予定時刻',
      gameHeader: '遊びたいゲーム',
      none: 'なし',
      undecided: '未定',
      noSpecified: '指定なし',
      errorMessage: '予約詳細の取得に失敗しました。しばらくしてから再度お試しください。'
    },
    en: {
      loading: 'Loading reservation details...',
      backBtn: 'Back',
      backToList: '← Back to Reservation Status',
      title: 'Reservation List',
      eventLabel: 'Event:',
      dateLabel: 'Date:',
      venueLabel: 'Venue:',
      reservationCountLabel: 'Reservations:',
      people: '',
      noReservations: 'There are no reservations for this event.',
      nameHeader: 'Name',
      companionHeader: 'Companions',
      arrivalTimeHeader: 'Arrival Time',
      gameHeader: 'Desired Game',
      none: 'None',
      undecided: 'TBD',
      noSpecified: 'None',
      errorMessage: 'Failed to load reservation details. Please try again later.'
    },
    vi: {
      loading: 'Đang tải chi tiết đặt chỗ...',
      backBtn: 'Quay lại',
      backToList: '← Quay lại Tình Trạng Đặt Chỗ',
      title: 'Danh Sách Đặt Chỗ',
      eventLabel: 'Sự Kiện:',
      dateLabel: 'Ngày:',
      venueLabel: 'Địa Điểm:',
      reservationCountLabel: 'Đặt Chỗ:',
      people: ' người',
      noReservations: 'Không có đặt chỗ nào cho sự kiện này.',
      nameHeader: 'Tên',
      companionHeader: 'Người Đi Cùng',
      arrivalTimeHeader: 'Thời Gian Đến',
      gameHeader: 'Trò Chơi Mong Muốn',
      none: 'Không',
      undecided: 'Chưa Quyết Định',
      noSpecified: 'Không Có',
      errorMessage: 'Không tải được chi tiết đặt chỗ. Vui lòng thử lại sau.'
    },
    de: {
      loading: 'Reservierungsdetails werden geladen...',
      backBtn: 'Zurück',
      backToList: '← Zurück zum Reservierungsstatus',
      title: 'Reservierungsliste',
      eventLabel: 'Veranstaltung:',
      dateLabel: 'Datum:',
      venueLabel: 'Veranstaltungsort:',
      reservationCountLabel: 'Reservierungen:',
      people: '',
      noReservations: 'Es gibt keine Reservierungen für diese Veranstaltung.',
      nameHeader: 'Name',
      companionHeader: 'Begleiter',
      arrivalTimeHeader: 'Ankunftszeit',
      gameHeader: 'Gewünschtes Spiel',
      none: 'Keine',
      undecided: 'Noch offen',
      noSpecified: 'Keine Angabe',
      errorMessage: 'Fehler beim Laden der Reservierungsdetails. Bitte versuchen Sie es später erneut.'
    },
    ko: {
      loading: '예약 세부정보 로딩 중...',
      backBtn: '뒤로',
      backToList: '← 예약 현황으로 돌아가기',
      title: '예약자 목록',
      eventLabel: '이벤트:',
      dateLabel: '날짜:',
      venueLabel: '장소:',
      reservationCountLabel: '예약 수:',
      people: '명',
      noReservations: '이 이벤트에 대한 예약이 없습니다.',
      nameHeader: '이름',
      companionHeader: '동반자',
      arrivalTimeHeader: '도착 시간',
      gameHeader: '원하는 게임',
      none: '없음',
      undecided: '미정',
      noSpecified: '지정 없음',
      errorMessage: '예약 세부정보를 불러오는데 실패했습니다. 나중에 다시 시도해주세요.'
    },
    zh: {
      loading: '正在加载预约详情...',
      backBtn: '返回',
      backToList: '← 返回预约状态',
      title: '预约名单',
      eventLabel: '活动：',
      dateLabel: '日期：',
      venueLabel: '地点：',
      reservationCountLabel: '预约数：',
      people: '人',
      noReservations: '此活动暂无预约。',
      nameHeader: '姓名',
      companionHeader: '同行者',
      arrivalTimeHeader: '到达时间',
      gameHeader: '想玩的游戏',
      none: '无',
      undecided: '待定',
      noSpecified: '未指定',
      errorMessage: '加载预约详情失败。请稍后再试。'
    },
    fr: {
      loading: 'Chargement des détails de réservation...',
      backBtn: 'Retour',
      backToList: '← Retour à l\'état des réservations',
      title: 'Liste des réservations',
      eventLabel: 'Événement:',
      dateLabel: 'Date:',
      venueLabel: 'Lieu:',
      reservationCountLabel: 'Réservations:',
      people: '',
      noReservations: 'Il n\'y a aucune réservation pour cet événement.',
      nameHeader: 'Nom',
      companionHeader: 'Accompagnants',
      arrivalTimeHeader: 'Heure d\'arrivée',
      gameHeader: 'Jeu souhaité',
      none: 'Aucun',
      undecided: 'À déterminer',
      noSpecified: 'Non spécifié',
      errorMessage: 'Échec du chargement des détails de réservation. Veuillez réessayer plus tard.'
    }
  };

  const t = translations[currentLanguage];

  const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxZRZSDGyg_Z1rGcuD9xymlMXB4vV3Cz8EVTOWS2GvP-bLKeYcq7q122ixPQKV71Xg6iQ/exec';

  // 予約者一覧とイベント情報を取得
  useEffect(() => {
    const fetchReservationDetails = async () => {
      try {
        setError('');

        console.log('=== Reservation Detail Debug ===');
        console.log('EventID from URL:', eventId);
        console.log('EventID type:', typeof eventId);

        // 予約者一覧を取得
        const reservationsUrl = `${GAS_WEB_APP_URL}?action=getReservations&eventId=${eventId}`;
        console.log('Fetching reservations from:', reservationsUrl);

        const reservationsResponse = await fetch(reservationsUrl);

        if (!reservationsResponse.ok) {
          throw new Error('予約者一覧の取得に失敗しました');
        }

        const reservationsResult = await reservationsResponse.json();
        console.log('Reservations API Response:', reservationsResult);

        if (reservationsResult.success) {
          console.log('Reservations data:', reservationsResult.data);
          console.log('Reservations count:', reservationsResult.data?.length || 0);
          setReservations(reservationsResult.data || []);
        } else {
          console.error('Reservations API error:', reservationsResult.error);
          throw new Error(reservationsResult.error || '予約者一覧の取得に失敗しました');
        }

        // イベント情報を取得
        const eventInfoUrl = `${GAS_WEB_APP_URL}?action=getEventInfo&eventId=${eventId}`;
        console.log('Fetching event info from:', eventInfoUrl);

        const eventInfoResponse = await fetch(eventInfoUrl);

        if (!eventInfoResponse.ok) {
          throw new Error('イベント情報の取得に失敗しました');
        }

        const eventInfoResult = await eventInfoResponse.json();
        console.log('Event Info API Response:', eventInfoResult);

        if (eventInfoResult.success) {
          console.log('Event info data:', eventInfoResult.data);
          setEventInfo(eventInfoResult.data);
        }

        setIsLoading(false);
      } catch (err) {
        console.error('Failed to fetch reservation details:', err);
        setError(t.errorMessage);
        setIsLoading(false);
      }
    };

    fetchReservationDetails();
  }, [eventId, t.errorMessage]);

  if (isLoading) {
    return (
      <section className="reservation-detail">
        <div className="detail-container">
          <div className="loading-message">
            <div className="spinner"></div>
            <p>{t.loading}</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="reservation-detail">
        <div className="detail-container">
          <div className="error-message">
            <p>{error}</p>
            <button onClick={() => navigate('/ke')} className="back-btn">
              {t.backBtn}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="reservation-detail">
      <div className="detail-container">
        <div className="detail-header">
          <button onClick={() => navigate('/ke')} className="back-btn">
            {t.backToList}
          </button>
          <h2 className="detail-title">
            {eventInfo ? `[${eventInfo.date}][${eventInfo.eventName}]-${t.title}` : t.title}
          </h2>
          {eventInfo && (
            <div className="event-summary">
              <div className="event-summary-item">
                <span className="label">{t.eventLabel}</span>
                <span className="value">{eventInfo.eventName} {eventInfo.eventVol}</span>
              </div>
              <div className="event-summary-item">
                <span className="label">{t.dateLabel}</span>
                <span className="value">{eventInfo.date} {eventInfo.time}</span>
              </div>
              <div className="event-summary-item">
                <span className="label">{t.venueLabel}</span>
                <span className="value">{eventInfo.venue}</span>
              </div>
              <div className="event-summary-item">
                <span className="label">{t.reservationCountLabel}</span>
                <span className="value">{reservations.length}{t.people} / {eventInfo.availableSlots}{t.people}</span>
              </div>
            </div>
          )}
        </div>

        {reservations.length === 0 ? (
          <div className="no-reservations-message">
            <p>{t.noReservations}</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="reservation-detail-table">
              <thead>
                <tr>
                  <th>{t.nameHeader}</th>
                  <th className="center">{t.companionHeader}</th>
                  <th className="center">{t.arrivalTimeHeader}</th>
                  <th>{t.gameHeader}</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation, index) => (
                  <tr key={index}>
                    <td data-label={t.nameHeader} className="name-cell">
                      {reservation.name}
                    </td>
                    <td data-label={t.companionHeader} className="center companion-cell">
                      {reservation.companionCount > 0 ? `${reservation.companionCount}${t.people}` : t.none}
                    </td>
                    <td data-label={t.arrivalTimeHeader} className="center arrival-time-cell">
                      {reservation.arrivalTime || t.undecided}
                    </td>
                    <td data-label={t.gameHeader} className="game-cell">
                      {reservation.desiredGame || t.noSpecified}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default ReservationDetail;
