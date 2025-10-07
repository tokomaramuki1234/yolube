import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import Profile from './components/Profile';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

import KeLP from './pages/ke/KeLPWeb3';
import Training from './components/Training';
import ReservationDetail from './components/ReservationDetail';

// 管理画面
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/admin/Login';
import Admin from './pages/admin/Admin';

// Font Awesomeライブラリにアイコンを追加
library.add(fas, far, fab);

// 認証保護ルート
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>読み込み中...</div>;
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
    <Achievements />
    <Profile />
    <Contact />
  </>
);

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
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
            <Route path="/ke" element={<KeLP />} />
            <Route path="/ke/reservations/:eventId" element={<ReservationDetail />} />
            <Route path="/training" element={
              <>
                <Header />
                <Training />
                <Footer />
              </>
            } />

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
          </Routes>
          </div>
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App; 