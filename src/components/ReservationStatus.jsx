import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReservationStatus.css';

const ReservationStatus = () => {
  const navigate = useNavigate();
  const [reservationStats, setReservationStats] = useState([]);
  const [lastUpdated, setLastUpdated] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxZRZSDGyg_Z1rGcuD9xymlMXB4vV3Cz8EVTOWS2GvP-bLKeYcq7q122ixPQKV71Xg6iQ/exec';

  // 予約統計データを取得
  const fetchReservationStats = async () => {
    try {
      setError('');
      console.log('=== ReservationStatus Debug ===');
      // キャッシュバスティングのためタイムスタンプを追加
      const url = `${GAS_WEB_APP_URL}?action=getReservationStats&_t=${Date.now()}`;
      console.log('Fetching from:', url);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('データの取得に失敗しました');
      }

      const result = await response.json();
      console.log('ReservationStats API Response:', result);

      if (result.success) {
        // GAS v3.10以降は data プロパティに統計情報がネストされている可能性を確認
        const reservations = result.data?.reservations || result.reservations || [];
        const lastUpdated = result.data?.last_updated || result.last_updated || '';

        console.log('Reservations data:', reservations);
        console.log('Reservations count:', reservations.length);
        console.log('Last updated:', lastUpdated);

        setReservationStats(reservations);
        setLastUpdated(lastUpdated);
      } else {
        console.error('API error:', result.error || result.message);
        throw new Error(result.message || 'データの取得に失敗しました');
      }

      setIsLoading(false);
    } catch (err) {
      console.error('Failed to fetch reservation stats:', err);
      setError('予約状況の取得に失敗しました。しばらくしてから再度お試しください。');
      setIsLoading(false);
    }
  };

  // 初回ロードと30秒ごとの自動更新
  useEffect(() => {
    fetchReservationStats();

    // 30秒ごとに自動更新
    const intervalId = setInterval(() => {
      fetchReservationStats();
    }, 30000);

    // クリーンアップ
    return () => clearInterval(intervalId);
  }, []);

  // 予約率に基づいて色を決定
  const getStatusColor = (rate) => {
    if (rate >= 90) return 'red';
    if (rate >= 70) return 'yellow';
    return 'green';
  };

  if (isLoading) {
    return (
      <section className="reservation-status">
        <div className="section-container">
          <h2 className="section-title">予約状況</h2>
          <p className="section-subtitle">直近6件のイベント予約状況をリアルタイムで確認できます</p>
          <div className="reservation-status-content">
            <div className="loading-message">
              <div className="spinner"></div>
              <p>予約状況を読み込み中...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="reservation-status">
        <div className="section-container">
          <h2 className="section-title">予約状況</h2>
          <p className="section-subtitle">直近6件のイベント予約状況をリアルタイムで確認できます</p>
          <div className="reservation-status-content">
            <div className="error-message">
              <p>{error}</p>
              <button onClick={fetchReservationStats} className="retry-btn">
                再読み込み
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="reservation-status">
      <div className="section-container">
        <h2 className="section-title">予約状況</h2>
        <p className="section-subtitle">直近6件のイベント予約状況をリアルタイムで確認できます</p>

        {reservationStats.length === 0 ? (
          <div className="reservation-status-content">
            <div className="no-events-message">
              <p>現在、予約受付中のイベントはありません。</p>
            </div>
          </div>
        ) : (
          <>
            <div className="table-container">
              <table className="reservation-table">
                <thead>
                  <tr>
                    <th>開催日時</th>
                    <th>会場</th>
                    <th className="center">予約数</th>
                    <th className="center">定員</th>
                    <th className="center">予約率</th>
                    <th className="center">詳細</th>
                  </tr>
                </thead>
                <tbody>
                  {reservationStats.map((stat, index) => {
                    const statusColor = getStatusColor(stat.reservation_rate);

                    return (
                      <tr key={index}>
                        <td data-label="開催日時" className="date-cell">
                          {stat.event_info}
                        </td>
                        <td data-label="会場" className="venue-cell">
                          {stat.venue}
                        </td>
                        <td data-label="予約数" className="center number-cell">
                          {stat.current_reservations}名
                        </td>
                        <td data-label="定員" className="center number-cell">
                          {stat.capacity}名
                        </td>
                        <td data-label="予約率" className="center rate-cell">
                          <div className="rate-bar-container">
                            <div className="rate-bar">
                              <div
                                className={`rate-fill rate-${statusColor}`}
                                style={{ width: `${Math.min(stat.reservation_rate, 100)}%` }}
                              ></div>
                            </div>
                            <span className="rate-text">{stat.reservation_rate}%</span>
                          </div>
                        </td>
                        <td data-label="詳細" className="center detail-cell">
                          <button
                            className="detail-btn"
                            onClick={() => window.open(`/ke/reservations/${stat.event_id}`, '_blank')}
                            disabled={stat.current_reservations === 0}
                          >
                            詳細を見る
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {lastUpdated && (
              <div className="last-updated">
                <p>最終更新: {lastUpdated}</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ReservationStatus;
