import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReservationStatus.css';

const ReservationStatus = ({ currentLanguage = 'ja' }) => {
  const navigate = useNavigate();
  const [reservationStats, setReservationStats] = useState([]);
  const [lastUpdated, setLastUpdated] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // 翻訳データ
  const translations = {
    ja: {
      title: '予約状況',
      subtitle: '直近6件のイベント予約状況をリアルタイムで確認できます',
      dateTime: '開催日時',
      venue: '会場',
      reservations: '予約数',
      capacity: '定員',
      rate: '予約率',
      details: '詳細',
      detailBtn: '詳細を見る',
      lastUpdated: '最終更新',
      loading: '読み込み中...',
      error: 'データの読み込みに失敗しました',
      retry: '再試行',
      noEvents: 'イベントがありません',
      people: '名'
    },
    en: {
      title: 'Reservation Status',
      subtitle: 'Check real-time reservation status for the next 6 events',
      dateTime: 'Date & Time',
      venue: 'Venue',
      reservations: 'Reservations',
      capacity: 'Capacity',
      rate: 'Rate',
      details: 'Details',
      detailBtn: 'View Details',
      lastUpdated: 'Last Updated',
      loading: 'Loading...',
      error: 'Failed to load data',
      retry: 'Retry',
      noEvents: 'No events',
      people: ''
    },
    vi: {
      title: 'Tình Trạng Đặt Chỗ',
      subtitle: 'Kiểm tra tình trạng đặt chỗ theo thời gian thực cho 6 sự kiện tiếp theo',
      dateTime: 'Ngày & Giờ',
      venue: 'Địa Điểm',
      reservations: 'Đặt Chỗ',
      capacity: 'Sức Chứa',
      rate: 'Tỷ Lệ',
      details: 'Chi Tiết',
      detailBtn: 'Xem Chi Tiết',
      lastUpdated: 'Cập Nhật Lần Cuối',
      loading: 'Đang tải...',
      error: 'Không tải được dữ liệu',
      retry: 'Thử Lại',
      noEvents: 'Không có sự kiện',
      people: ''
    },
    de: {
      title: 'Reservierungsstatus',
      subtitle: 'Überprüfen Sie den Echtzeit-Reservierungsstatus für die nächsten 6 Veranstaltungen',
      dateTime: 'Datum & Uhrzeit',
      venue: 'Veranstaltungsort',
      reservations: 'Reservierungen',
      capacity: 'Kapazität',
      rate: 'Rate',
      details: 'Details',
      detailBtn: 'Details anzeigen',
      lastUpdated: 'Zuletzt aktualisiert',
      loading: 'Wird geladen...',
      error: 'Daten konnten nicht geladen werden',
      retry: 'Wiederholen',
      noEvents: 'Keine Veranstaltungen',
      people: ''
    },
    ko: {
      title: '예약 현황',
      subtitle: '다음 6개 이벤트의 실시간 예약 현황을 확인하세요',
      dateTime: '날짜 및 시간',
      venue: '장소',
      reservations: '예약',
      capacity: '수용 인원',
      rate: '예약률',
      details: '상세',
      detailBtn: '상세 보기',
      lastUpdated: '마지막 업데이트',
      loading: '로딩 중...',
      error: '데이터를 불러오지 못했습니다',
      retry: '다시 시도',
      noEvents: '이벤트가 없습니다',
      people: '명'
    },
    zh: {
      title: '预约状态',
      subtitle: '实时查看接下来6个活动的预约状态',
      dateTime: '日期与时间',
      venue: '地点',
      reservations: '预约',
      capacity: '容量',
      rate: '预约率',
      details: '详情',
      detailBtn: '查看详情',
      lastUpdated: '最后更新',
      loading: '加载中...',
      error: '无法加载数据',
      retry: '重试',
      noEvents: '没有活动',
      people: '人'
    },
    fr: {
      title: 'État des Réservations',
      subtitle: 'Consultez l\'état des réservations en temps réel pour les 6 prochains événements',
      dateTime: 'Date & Heure',
      venue: 'Lieu',
      reservations: 'Réservations',
      capacity: 'Capacité',
      rate: 'Taux',
      details: 'Détails',
      detailBtn: 'Voir les Détails',
      lastUpdated: 'Dernière Mise à Jour',
      loading: 'Chargement...',
      error: 'Échec du chargement des données',
      retry: 'Réessayer',
      noEvents: 'Aucun événement',
      people: ''
    }
  };

  const t = translations[currentLanguage];

  const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxZRZSDGyg_Z1rGcuD9xymlMXB4vV3Cz8EVTOWS2GvP-bLKeYcq7q122ixPQKV71Xg6iQ/exec';

  // 予約統計データを取得
  const fetchReservationStats = async () => {
    try {
      setError('');
      // キャッシュバスティングのためタイムスタンプを追加
      const url = `${GAS_WEB_APP_URL}?action=getReservationStats&_t=${Date.now()}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('データの取得に失敗しました');
      }

      const result = await response.json();

      if (result.success) {
        // GAS v3.10以降は data プロパティに統計情報がネストされている可能性を確認
        const reservations = result.data?.reservations || result.reservations || [];
        const lastUpdated = result.data?.last_updated || result.last_updated || '';


        setReservationStats(reservations);
        setLastUpdated(lastUpdated);
      } else {
        throw new Error(result.message || 'データの取得に失敗しました');
      }

      setIsLoading(false);
    } catch (err) {
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
          <h2 className="section-title">{t.title}</h2>
          <p className="section-subtitle">{t.subtitle}</p>
          <div className="reservation-status-content">
            <div className="loading-message">
              <div className="spinner"></div>
              <p>{t.loading}</p>
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
          <h2 className="section-title">{t.title}</h2>
          <p className="section-subtitle">{t.subtitle}</p>
          <div className="reservation-status-content">
            <div className="error-message">
              <p>{t.error}</p>
              <button onClick={fetchReservationStats} className="retry-btn">
                {t.retry}
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
        <h2 className="section-title">{t.title}</h2>
        <p className="section-subtitle">{t.subtitle}</p>

        {reservationStats.length === 0 ? (
          <div className="reservation-status-content">
            <div className="no-events-message">
              <p>{t.noEvents}</p>
            </div>
          </div>
        ) : (
          <>
            <div className="table-container">
              <table className="reservation-table">
                <thead>
                  <tr>
                    <th>{t.dateTime}</th>
                    <th>{t.venue}</th>
                    <th className="center">{t.reservations}</th>
                    <th className="center">{t.capacity}</th>
                    <th className="center">{t.rate}</th>
                    <th className="center">{t.details}</th>
                  </tr>
                </thead>
                <tbody>
                  {reservationStats.map((stat, index) => {
                    const statusColor = getStatusColor(stat.reservation_rate);

                    return (
                      <tr key={index}>
                        <td data-label={t.dateTime} className="date-cell">
                          {stat.event_info}
                        </td>
                        <td data-label={t.venue} className="venue-cell">
                          {stat.venue}
                        </td>
                        <td data-label={t.reservations} className="center number-cell">
                          {stat.current_reservations}{t.people}
                        </td>
                        <td data-label={t.capacity} className="center number-cell">
                          {stat.capacity}{t.people}
                        </td>
                        <td data-label={t.rate} className="center rate-cell">
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
                        <td data-label={t.details} className="center detail-cell">
                          <button
                            className="detail-btn"
                            onClick={() => window.open(`/ke/reservations/${stat.event_id}?lang=${currentLanguage}`, '_blank')}
                            disabled={stat.current_reservations === 0}
                          >
                            {t.detailBtn}
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
                <p>{t.lastUpdated}: {lastUpdated}</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ReservationStatus;
