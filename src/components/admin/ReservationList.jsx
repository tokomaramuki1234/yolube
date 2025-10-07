import React, { useState } from 'react';
import './ReservationList.css';

const ReservationList = ({ reservations, onRefresh }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // フィルタリング
  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch =
      reservation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (reservation.eventVol && reservation.eventVol.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (reservation.eventArea && reservation.eventArea.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      filterStatus === 'all' || reservation.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // ページネーション
  const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReservations = filteredReservations.slice(startIndex, endIndex);

  // CSV出力
  const handleExportCSV = () => {
    const headers = ['ID', '送信日時', '開催日', '時間', '備考欄', '開催場所', '開催回数', '定員', 'お名前', 'メールアドレス', '同行者数', '来場予定時刻', '遊びたいゲーム', '特記事項', 'ステータス'];
    const csvData = filteredReservations.map(r => [
      r.id,
      r.reservationDate,
      r.eventDate,
      r.eventTime,
      r.eventName,
      r.eventArea,
      r.eventVol,
      r.eventCapacity,
      r.name,
      r.email,
      r.companionCount,
      r.arrivalTime,
      r.desiredGame,
      r.notes,
      r.status
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `reservations_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div className="reservation-list">
      {/* フィルターバー */}
      <div className="filter-bar">
        <input
          type="text"
          className="search-input"
          placeholder="名前、メール、イベントIDで検索..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />

        <select
          className="status-filter"
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">全て</option>
          <option value="confirmed">確定のみ</option>
          <option value="cancelled">キャンセルのみ</option>
        </select>

        <button className="export-btn" onClick={handleExportCSV}>
          📥 CSV出力
        </button>
      </div>

      {/* 予約件数表示 */}
      <div className="reservation-count">
        {filteredReservations.length}件の予約
      </div>

      {/* 予約テーブル */}
      {currentReservations.length > 0 ? (
        <div className="table-container">
          <table className="reservation-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>開催日</th>
                <th>開催場所</th>
                <th>開催回数</th>
                <th>予約者名</th>
                <th>メール</th>
                <th>同行者</th>
                <th>送信日時</th>
                <th>ステータス</th>
              </tr>
            </thead>
            <tbody>
              {currentReservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td className="id-cell">#{reservation.id}</td>
                  <td className="event-cell">{reservation.eventDate}</td>
                  <td className="event-cell">{reservation.eventArea}</td>
                  <td className="event-cell">{reservation.eventVol}</td>
                  <td className="name-cell">{reservation.name}</td>
                  <td className="email-cell">{reservation.email}</td>
                  <td className="companion-cell">{reservation.companionCount}名</td>
                  <td className="date-cell">{reservation.reservationDate}</td>
                  <td className="status-cell">
                    <span className={`status-badge status-${reservation.status}`}>
                      {reservation.status === 'confirmed' ? '確定' : 'キャンセル'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-table">
          <p>予約データがありません</p>
        </div>
      )}

      {/* ページネーション */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            ← 前へ
          </button>

          <span className="pagination-info">
            ページ {currentPage} / {totalPages}
          </span>

          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            次へ →
          </button>
        </div>
      )}
    </div>
  );
};

export default ReservationList;
