import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ReservationDetail.css';

const ReservationDetail = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [eventInfo, setEventInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

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
        setError('予約詳細の取得に失敗しました。しばらくしてから再度お試しください。');
        setIsLoading(false);
      }
    };

    fetchReservationDetails();
  }, [eventId]);

  if (isLoading) {
    return (
      <section className="reservation-detail">
        <div className="detail-container">
          <div className="loading-message">
            <div className="spinner"></div>
            <p>予約詳細を読み込み中...</p>
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
              戻る
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
            ← 予約状況に戻る
          </button>
          <h2 className="detail-title">
            {eventInfo ? `[${eventInfo.date}][${eventInfo.eventName}]-予約者一覧` : '予約者一覧'}
          </h2>
          {eventInfo && (
            <div className="event-summary">
              <div className="event-summary-item">
                <span className="label">イベント:</span>
                <span className="value">{eventInfo.eventName} {eventInfo.eventVol}</span>
              </div>
              <div className="event-summary-item">
                <span className="label">日時:</span>
                <span className="value">{eventInfo.date} {eventInfo.time}</span>
              </div>
              <div className="event-summary-item">
                <span className="label">会場:</span>
                <span className="value">{eventInfo.venue}</span>
              </div>
              <div className="event-summary-item">
                <span className="label">予約数:</span>
                <span className="value">{reservations.length}名 / {eventInfo.availableSlots}名</span>
              </div>
            </div>
          )}
        </div>

        {reservations.length === 0 ? (
          <div className="no-reservations-message">
            <p>このイベントには予約がありません。</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="reservation-detail-table">
              <thead>
                <tr>
                  <th>予約者名</th>
                  <th className="center">同行者</th>
                  <th className="center">来場予定時刻</th>
                  <th>遊びたいゲーム</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation, index) => (
                  <tr key={index}>
                    <td data-label="予約者名" className="name-cell">
                      {reservation.name}
                    </td>
                    <td data-label="同行者" className="center companion-cell">
                      {reservation.companionCount > 0 ? `${reservation.companionCount}名` : 'なし'}
                    </td>
                    <td data-label="来場予定時刻" className="center arrival-time-cell">
                      {reservation.arrivalTime || '未定'}
                    </td>
                    <td data-label="遊びたいゲーム" className="game-cell">
                      {reservation.desiredGame || '指定なし'}
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
