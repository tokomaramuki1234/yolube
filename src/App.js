import React, { useState } from 'react';
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
import StyleGuide from './components/StyleGuide';

// Font Awesomeライブラリにアイコンを追加
library.add(fas, far, fab);

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch(currentPage) {
      case 'styleguide':
        return <StyleGuide />;
      default:
        return (
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
    }
  };

  return (
    <div className="App">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
      <Footer />
    </div>
  );
}

export default App; 