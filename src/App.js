import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import Header from './components/Header';
import Hero from './components/Hero';
import News from './components/News';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

import KeLP from './pages/ke/KeLPWeb3';
import RadarLP from './pages/radar/RadarLPWeb';
import Training from './components/Training';
import ReservationDetail from './components/ReservationDetail';
import NewsPage from './pages/NewsPage';
import YolubePage from './pages/YolubePage';
import AboutPage from './pages/AboutPage';
import AchievementPage from './pages/AchievementPage';
import FosterPage from './pages/FosterPage';
import RRPPage from './pages/RRPPage';
import DEVPage from './pages/DEVPage';
import CSTPage from './pages/CSTPage';
import IIDPage from './pages/IIDPage';
import TableGamePage from './pages/TableGamePage';
import DetailFeatures from './pages/tablegame/DetailFeatures';
import DetailEconomics from './pages/tablegame/DetailEconomics';
import DetailCases from './pages/tablegame/DetailCases';
import DetailEffects from './pages/tablegame/DetailEffects';
import NotFoundPage from './pages/NotFoundPage';
import MaintenancePage from './pages/MaintenancePage';

// 管理画面
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/admin/Login';
import Admin from './pages/admin/Admin';

// GTMユーティリティ
import { trackPageView } from './utils/gtm';

// Font Awesomeライブラリにアイコンを追加
library.add(fas, far, fab);

// ページビュートラッカー
const PageViewTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const pageTitle = document.title;
    trackPageView(location.pathname + location.search, pageTitle);
  }, [location]);

  return null;
};

// 認証保護ルート
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="loading-container">読み込み中...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

// ホームページコンポーネント
const HomePage = () => (
  <>
    <Hero />
    <News />
    <About />
    <Services />
    <Contact />
  </>
);

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <PageViewTracker />
          <div className="App">
            <Routes>
            <Route path="/" element={
              <>
                <Header />
                <HomePage />
                <Footer />
                <BackToTop />
              </>
            } />
            <Route path="/NEWS" element={<NewsPage />} />
            <Route path="/YOLUBE" element={<YolubePage />} />
            <Route path="/ABOUT" element={<AboutPage />} />
            <Route path="/ACHIEVEMENT" element={<AchievementPage />} />
            <Route path="/FOSTER" element={<FosterPage />} />
            <Route path="/RRP" element={<RRPPage />} />
            <Route path="/DEV" element={<DEVPage />} />
            <Route path="/CST" element={<CSTPage />} />
            <Route path="/IID" element={<IIDPage />} />
            <Route path="/tablegame" element={<TableGamePage />} />
            <Route path="/tablegame/detail-features" element={<DetailFeatures />} />
            <Route path="/tablegame/detail-economics" element={<DetailEconomics />} />
            <Route path="/tablegame/detail-cases" element={<DetailCases />} />
            <Route path="/tablegame/detail-effects" element={<DetailEffects />} />

            {/* 制作中ページ */}
            <Route path="/HT" element={<MaintenancePage />} />
            <Route path="/NNBNB" element={<MaintenancePage />} />
            <Route path="/KanTo" element={<MaintenancePage />} />

            <Route path="/ke" element={<KeLP />} />
            <Route path="/ke/reservations/:eventId" element={<ReservationDetail />} />
            <Route path="/radar" element={<RadarLP />} />
            <Route path="/training" element={<Training />} />

            {/* 管理画面ルート */}
            <Route path="/admin/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />

            {/* 404ページ */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          </div>
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App; 