import React from 'react';
import './Dashboard.css';

const Dashboard = ({ adminStats, reservations }) => {
  if (!adminStats) {
    return <div className="dashboard-empty">統計データがありません</div>;
  }

  const {
    totalReservations,
    confirmedReservations,
    cancelledReservations,
    eventStats,
    recentReservations
  } = adminStats;

  // キャンセル率を計算
  const cancellationRate = totalReservations > 0
    ? ((cancelledReservations / totalReservations) * 100).toFixed(1)
    : 0;

  return (
    <div className="dashboard">
      {/* 統計カード */}
      <div className="stats-grid">
        <div className="stat-card stat-card-primary">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3 className="stat-value">{totalReservations}</h3>
            <p className="stat-label">総予約数</p>
          </div>
        </div>

        <div className="stat-card stat-card-success">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3 className="stat-value">{confirmedReservations}</h3>
            <p className="stat-label">確定予約</p>
          </div>
        </div>

        <div className="stat-card stat-card-warning">
          <div className="stat-icon">❌</div>
          <div className="stat-content">
            <h3 className="stat-value">{cancelledReservations}</h3>
            <p className="stat-label">キャンセル</p>
          </div>
        </div>

        <div className="stat-card stat-card-info">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <h3 className="stat-value">{cancellationRate}%</h3>
            <p className="stat-label">キャンセル率</p>
          </div>
        </div>
      </div>

      {/* イベント別統計 */}
      <div className="dashboard-section">
        <h2 className="section-title">イベント別予約状況</h2>
        {eventStats && eventStats.length > 0 ? (
          <div className="event-stats-grid">
            {eventStats.map((event, index) => (
              <div key={index} className="event-stat-card">
                <div className="event-stat-header">
                  <h3 className="event-id">{event.eventVol || event.eventId}</h3>
                  <p className="event-detail">{event.eventDate} @ {event.eventArea}</p>
                  {event.eventName && <p className="event-name">{event.eventName}</p>}
                </div>
                <div className="event-stat-body">
                  <div className="event-stat-item">
                    <span className="event-stat-label">予約件数</span>
                    <span className="event-stat-value">{event.count}件</span>
                  </div>
                  <div className="event-stat-item">
                    <span className="event-stat-label">総参加者数</span>
                    <span className="event-stat-value">{event.totalParticipants}名</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-message">イベント別統計データがありません</p>
        )}
      </div>

      {/* 最新予約 */}
      <div className="dashboard-section">
        <h2 className="section-title">最新の予約</h2>
        {recentReservations && recentReservations.length > 0 ? (
          <div className="recent-reservations-list">
            {recentReservations.map((reservation, index) => (
              <div key={index} className="recent-reservation-item">
                <div className="recent-reservation-info">
                  <span className="recent-reservation-id">#{reservation.id}</span>
                  <span className="recent-reservation-name">{reservation.name}</span>
                  <span className="recent-reservation-event">
                    {reservation.eventVol} @ {reservation.eventArea}
                  </span>
                  <span className="recent-reservation-date-info">{reservation.eventDate}</span>
                </div>
                <div className="recent-reservation-meta">
                  <span className="recent-reservation-date">{reservation.reservationDate}</span>
                  <span className={`recent-reservation-status status-${reservation.status}`}>
                    {reservation.status === 'confirmed' ? '確定' : 'キャンセル'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-message">最新の予約がありません</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
