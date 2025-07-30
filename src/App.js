import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

// Font Awesomeライブラリにアイコンを追加
library.add(fas, far, fab);

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
          <Route path="/training" element={
            <>
              <Header />
              <Training />
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 