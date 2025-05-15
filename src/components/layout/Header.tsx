import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiMenu, FiX, FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

interface HeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

const Header = ({ isMobileMenuOpen, setIsMobileMenuOpen }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality
    console.log('Searching for:', searchQuery);
    // Implement search functionality
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-40 glass shadow-aero-button">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center">
            <button
              type="button"
              className="lg:hidden glass-button p-2 mr-2 flex items-center justify-center"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            <Link to="/" className="flex items-center">
              <div className="relative overflow-hidden h-10 w-10 bg-gradient-to-r from-aero-blue to-aero-cyan rounded-aero flex items-center justify-center shadow-aero-button">
                <div className="absolute inset-0 bg-white/10"></div>
                <span className="text-white font-bold text-xl">FM</span>
              </div>
              <span className="ml-2 text-xl font-semibold text-shadow-glow hidden sm:block">
                Frutiger<span className="text-aero-blue">Music</span>
              </span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="relative">
              <div className="flex items-center glass rounded-aero overflow-hidden pl-3 backdrop-blur-aero">
                <FiSearch className="text-aero-blue" />
                <input
                  type="text"
                  placeholder="Search for songs, artists, or albums..."
                  className="w-full py-2 px-3 bg-transparent outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>

          {/* Theme Toggler */}
          <div>
            <button
              onClick={toggleTheme}
              className="glass-button p-2 flex items-center justify-center"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
