import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Dashboard from '../../components/admin/Dashboard';
import ReservationList from '../../components/admin/ReservationList';
import './Admin.css';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [adminStats, setAdminStats] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxZRZSDGyg_Z1rGcuD9xymlMXB4vV3Cz8EVTOWS2GvP-bLKeYcq7q122ixPQKV71Xg6iQ/exec';

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

    } catch (error) {
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
            {activeTab === 'dashboard' ? 'ダッシュボード' : '予約一覧'}
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
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;
