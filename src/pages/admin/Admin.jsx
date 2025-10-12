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
  const [isLoading, setIsLoading] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxZRZSDGyg_Z1rGcuD9xymlMXB4vV3Cz8EVTOWS2GvP-bLKeYcq7q122ixPQKV71Xg6iQ/exec';
  const NEWS_API_URL = 'https://script.google.com/macros/s/AKfycbymI6FuKRcoFu6BP558Dwj7RQFYf1sCDm5dWhHdmHJt6ibEdlseflU-0krlqL2mAG7_/exec';

  // 初回ロード時にデータ取得
  useEffect(() => {
    fetchAdminData();
  }, []);

  // 管理データ取得
  const fetchAdminData = async () => {
    setIsLoading(true);
    try {
      console.log('=== Admin Data Fetch Debug ===');

      // 統計データ取得
      const statsUrl = `${GAS_WEB_APP_URL}?action=getAdminStats`;
      console.log('Fetching admin stats from:', statsUrl);

      const statsResponse = await fetch(statsUrl);
      const statsResult = await statsResponse.json();

      console.log('Admin Stats Response:', statsResult);

      if (statsResult.success) {
        // GAS v3.7 以降は data プロパティに統計情報がネストされている
        console.log('Admin Stats Data:', statsResult.data);
        setAdminStats(statsResult.data);
      }

      // 全予約データ取得
      const reservationsUrl = `${GAS_WEB_APP_URL}?action=getAllReservations`;
      console.log('Fetching all reservations from:', reservationsUrl);

      const reservationsResponse = await fetch(reservationsUrl);
      const reservationsResult = await reservationsResponse.json();

      console.log('All Reservations Response:', reservationsResult);

      if (reservationsResult.success) {
        // こちらも同様に data プロパティが存在するか確認
        console.log('Reservations Data:', reservationsResult.data || reservationsResult);
        setReservations(reservationsResult.data || []);
      }

    } catch (error) {
      console.error('Failed to fetch admin data:', error);
    } finally {
      setIsLoading(false);
    }
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
            お知らせ管理
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
             'お知らせ管理'}
          </h1>
          <button className="refresh-btn" onClick={handleRefresh} disabled={isLoading}>
            🔄 {isLoading ? '更新中...' : '更新'}
          </button>
        </header>

        <div className="admin-content">
          {isLoading && !adminStats ? (
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
