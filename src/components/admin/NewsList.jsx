import React, { useState } from 'react';
import './NewsList.css';

const NewsList = ({ news, onRefresh, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState(null);
  const itemsPerPage = 10;

  // フィルタリング
  const filteredNews = news.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      filterCategory === 'all' || item.category === filterCategory;

    const matchesStatus =
      filterStatus === 'all' || item.status === filterStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // ページネーション
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNews = filteredNews.slice(startIndex, endIndex);

  // 削除確認モーダル
  const handleDeleteClick = (newsItem) => {
    setNewsToDelete(newsItem);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (newsToDelete) {
      await onDelete(newsToDelete.id);
      setShowDeleteModal(false);
      setNewsToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setNewsToDelete(null);
  };

  // ステータスの表示名
  const getStatusLabel = (status) => {
    switch(status) {
      case 'published': return '公開中';
      case 'draft': return '下書き';
      case 'scheduled': return '予約公開';
      default: return status;
    }
  };

  // CSV出力
  const handleExportCSV = () => {
    const headers = ['ID', '作成日時', '更新日時', '公開日', 'カテゴリ', 'タイトル', '概要', '本文', 'リンク', '画像URL', 'タグ', 'ステータス', 'NEWバッジ', '作成者', '表示順序'];
    const csvData = filteredNews.map(item => [
      item.id,
      item.createdAt,
      item.updatedAt,
      item.publishDate,
      item.category,
      item.title,
      item.description,
      item.content,
      item.link || '',
      item.imageUrl || '',
      item.tags || '',
      item.status,
      item.isNew ? 'TRUE' : 'FALSE',
      item.author || '',
      item.displayOrder || 0
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `news_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div className="news-list">
      {/* フィルターバー */}
      <div className="news-filter-bar">
        <input
          type="text"
          className="news-search-input"
          placeholder="タイトル、内容で検索..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />

        <select
          className="news-category-filter"
          value={filterCategory}
          onChange={(e) => {
            setFilterCategory(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">すべてのカテゴリ</option>
          <option value="イベント">イベント</option>
          <option value="お知らせ">お知らせ</option>
          <option value="メディア">メディア</option>
        </select>

        <select
          className="news-status-filter"
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">すべてのステータス</option>
          <option value="published">公開中</option>
          <option value="draft">下書き</option>
          <option value="scheduled">予約公開</option>
        </select>

        <button className="news-export-btn" onClick={handleExportCSV}>
          📥 CSV出力
        </button>

        <button className="news-create-btn" onClick={() => onEdit(null)}>
          ➕ 新規作成
        </button>
      </div>

      {/* 記事件数表示 */}
      <div className="news-count">
        {filteredNews.length}件の記事
      </div>

      {/* 記事テーブル */}
      {currentNews.length > 0 ? (
        <div className="news-table-container">
          <table className="news-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>タイトル</th>
                <th>カテゴリ</th>
                <th>ステータス</th>
                <th>公開日</th>
                <th>更新日</th>
                <th>アクション</th>
              </tr>
            </thead>
            <tbody>
              {currentNews.map((newsItem) => (
                <tr key={newsItem.id}>
                  <td className="news-id-cell">#{newsItem.id}</td>
                  <td className="news-title-cell">
                    <div className="news-title-wrapper">
                      <span className="news-title-text">{newsItem.title}</span>
                      {newsItem.isNew && (
                        <span className="news-new-badge">NEW</span>
                      )}
                    </div>
                  </td>
                  <td className="news-category-cell">
                    <span className={`news-category-badge category-${newsItem.category}`}>
                      {newsItem.category}
                    </span>
                  </td>
                  <td className="news-status-cell">
                    <span className={`news-status-badge status-${newsItem.status}`}>
                      {getStatusLabel(newsItem.status)}
                    </span>
                  </td>
                  <td className="news-date-cell">{newsItem.publishDate}</td>
                  <td className="news-date-cell">{newsItem.updatedAt}</td>
                  <td className="news-action-cell">
                    <button
                      className="news-edit-btn"
                      onClick={() => onEdit(newsItem)}
                      title="編集"
                    >
                      ✏️
                    </button>
                    <button
                      className="news-delete-btn"
                      onClick={() => handleDeleteClick(newsItem)}
                      title="削除"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="news-empty-table">
          <p>記事データがありません</p>
        </div>
      )}

      {/* ページネーション */}
      {totalPages > 1 && (
        <div className="news-pagination">
          <button
            className="news-pagination-btn"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            ← 前へ
          </button>

          <span className="news-pagination-info">
            ページ {currentPage} / {totalPages}
          </span>

          <button
            className="news-pagination-btn"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            次へ →
          </button>
        </div>
      )}

      {/* 削除確認モーダル */}
      {showDeleteModal && (
        <div className="news-modal-overlay" onClick={handleDeleteCancel}>
          <div className="news-modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="news-modal-title">記事を削除</h3>
            <p className="news-modal-message">
              「{newsToDelete?.title}」を削除してもよろしいですか？
            </p>
            <p className="news-modal-warning">
              ⚠️ この操作は取り消せません
            </p>
            <div className="news-modal-actions">
              <button
                className="news-modal-cancel-btn"
                onClick={handleDeleteCancel}
              >
                キャンセル
              </button>
              <button
                className="news-modal-confirm-btn"
                onClick={handleDeleteConfirm}
              >
                削除する
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsList;
