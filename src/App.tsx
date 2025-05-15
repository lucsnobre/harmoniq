import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Layout components
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Player from './components/layout/Player';
// Pages
import Home from './pages/Home';
import Playlists from './pages/Playlists';
import Artists from './pages/Artists';
import Albums from './pages/Albums';
import Settings from './pages/Settings';
// Contexts
import { ThemeProvider } from './context/ThemeContext';
import { PlayerProvider } from './context/PlayerContext';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ThemeProvider>
      <PlayerProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
            />

            <div className="flex flex-1 overflow-hidden">
              <Sidebar
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
              />

              <main className="flex-1 overflow-y-auto p-4 md:p-6">
                <div className="max-w-7xl mx-auto">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/playlists" element={<Playlists />} />
                    <Route path="/artists" element={<Artists />} />
                    <Route path="/albums" element={<Albums />} />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                </div>
              </main>
            </div>

            <Player />
          </div>
        </Router>
      </PlayerProvider>
    </ThemeProvider>
  );
}

export default App;
