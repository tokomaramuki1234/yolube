import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Dashboard from '../../components/admin/Dashboard';
import ReservationList from '../../components/admin/ReservationList';
import NewsEditor from '../../components/admin/NewsEditor';
import './Admin.css';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [adminStats, setAdminStats] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [news, setNews] = useState([]);
  const [editingNews, setEditingNews] = useState(null);
  const [showNewsEditor, setShowNewsEditor] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();

  // GAS API エンドポイント（環境変数から取得）
  const GAS_WEB_APP_URL = process.env.REACT_APP_GAS_ENDPOINT || 
    'https://script.google.com/macros/s/AKfycbyt2adBouUjz5D_IOOvTjE-VpJK6Cx9VsqIJIBPPfng94bqtSQn8ph00t9dbOQvcYYPUw/exec';
  const NEWS_API_URL = process.env.REACT_APP_GAS_ENDPOINT || 
    'https://script.google.com/macros/s/AKfycbyt2adBouUjz5D_IOOvTjE-VpJK6Cx9VsqIJIBPPfng94bqtSQn8ph00t9dbOQvcYYPUw/exec';

  // 初回ロード時にデータ取得
  useEffect(() => {
    fetchAdminData();
  }, []);

  // 管理データ取得
  const fetchAdminData = async () => {
    setIsLoading(true);
    try {

      // 統計データ取得
      const statsUrl = `${GAS_WEB_APP_URL}?action=getAdminStats`;

      const statsResponse = await fetch(statsUrl);
      const statsResult = await statsResponse.json();


      if (statsResult.success) {
        // GAS v3.7 以降は data プロパティに統計情報がネストされている
        setAdminStats(statsResult.data);
      }

      // 全予約データ取得
      const reservationsUrl = `${GAS_WEB_APP_URL}?action=getAllReservations`;

      const reservationsResponse = await fetch(reservationsUrl);
      const reservationsResult = await reservationsResponse.json();


      if (reservationsResult.success) {
        // こちらも同様に data プロパティが存在するか確認
        setReservations(reservationsResult.data || []);
      }

      // NEWS データ取得
      await fetchNewsData();

    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  // NEWS データ取得
  const fetchNewsData = async () => {
    try {
      const newsUrl = `${NEWS_API_URL}?action=getAllNews`;
      const newsResponse = await fetch(newsUrl);
      const newsResult = await newsResponse.json();

      if (newsResult.success) {
        setNews(newsResult.data || []);
      }
    } catch (error) {
      console.error('NEWS取得エラー:', error);
    }
  };

  // NEWS 作成・更新
  const handleSaveNews = async (newsData) => {
    try {
      const action = newsData.id ? 'updateNews' : 'createNews';
      const url = `${NEWS_API_URL}?action=${action}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newsData)
      });

      const result = await response.json();

      if (result.success) {
        alert(result.message || '保存しました');
        await fetchNewsData();
        setShowNewsEditor(false);
        setEditingNews(null);
      } else {
        alert(result.message || '保存に失敗しました');
      }
    } catch (error) {
      console.error('NEWS保存エラー:', error);
      alert('保存に失敗しました');
    }
  };

  // NEWS 削除
  const handleDeleteNews = async (newsId) => {
    try {
      const url = `${NEWS_API_URL}?action=deleteNews`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: newsId })
      });

      const result = await response.json();

      if (result.success) {
        alert(result.message || '削除しました');
        await fetchNewsData();
      } else {
        alert(result.message || '削除に失敗しました');
      }
    } catch (error) {
      console.error('NEWS削除エラー:', error);
      alert('削除に失敗しました');
    }
  };

  // NEWS 編集開始
  const handleEditNews = (newsItem) => {
    setEditingNews(newsItem);
    setShowNewsEditor(true);
  };

  // NEWS エディタキャンセル
  const handleCancelEdit = () => {
    setShowNewsEditor(false);
    setEditingNews(null);
  };

  // ログアウト処理
  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // データ再読み込み
  const handleRefresh = () => {
    fetchAdminData();
  };

  return (
    <div className="admin-container">
      {/* サイドバー */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-title">YOLUBE</h2>
          <p className="sidebar-subtitle">管理画面</p>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <span className="nav-icon">📊</span>
            ダッシュボード
          </button>

          <button
            className={`nav-item ${activeTab === 'reservations' ? 'active' : ''}`}
            onClick={() => setActiveTab('reservations')}
          >
            <span className="nav-icon">📋</span>
            予約一覧
          </button>

          <button
            className={`nav-item ${activeTab === 'news' ? 'active' : ''}`}
            onClick={() => setActiveTab('news')}
          >
            <span className="nav-icon">📰</span>
            NEWS管理
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <span className="nav-icon">🚪</span>
            ログアウト
          </button>
        </div>
      </aside>

      {/* メインコンテンツ */}
      <main className="admin-main">
        <header className="admin-header">
          <h1 className="admin-page-title">
            {activeTab === 'dashboard' ? 'ダッシュボード' : 
             activeTab === 'reservations' ? '予約一覧' : 
             'NEWS管理'}
          </h1>
          {!showNewsEditor && (
            <button className="refresh-btn" onClick={handleRefresh} disabled={isLoading}>
              🔄 {isLoading ? '更新中...' : '更新'}
            </button>
          )}
        </header>

        <div className="admin-content">
          {isLoading && !adminStats && activeTab !== 'news' ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>データを読み込み中...</p>
            </div>
          ) : (
            <>
              {activeTab === 'dashboard' && (
                <Dashboard adminStats={adminStats} reservations={reservations} />
              )}

              {activeTab === 'reservations' && (
                <ReservationList reservations={reservations} onRefresh={fetchAdminData} />
              )}

              {activeTab === 'news' && (
                <NewsEditor newsApiUrl={NEWS_API_URL} />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;
