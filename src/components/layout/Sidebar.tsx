import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import {
  FiHome,
  FiMusic,
  FiUser,
  FiDisc,
  FiSettings,
  FiHeart,
  FiX,
} from 'react-icons/fi';
import classNames from 'classnames';

interface SidebarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

const Sidebar = ({ isMobileMenuOpen, setIsMobileMenuOpen }: SidebarProps) => {
  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('sidebar');
      const header = document.getElementById('mobile-menu-button');

      if (
        isMobileMenuOpen &&
        sidebar &&
        !sidebar.contains(event.target as Node) &&
        header &&
        !header.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen, setIsMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { path: '/', icon: <FiHome size={20} />, label: 'Home' },
    { path: '/playlists', icon: <FiMusic size={20} />, label: 'Playlists' },
    { path: '/artists', icon: <FiUser size={20} />, label: 'Artists' },
    { path: '/albums', icon: <FiDisc size={20} />, label: 'Albums' },
    { path: '/favorites', icon: <FiHeart size={20} />, label: 'Favorites' },
    { path: '/settings', icon: <FiSettings size={20} />, label: 'Settings' },
  ];

  const sidebarClasses = classNames(
    'glass fixed lg:static lg:translate-x-0 z-30 h-full w-64 transition-all duration-300 ease-in-out',
    {
      'translate-x-0': isMobileMenuOpen,
      '-translate-x-full': !isMobileMenuOpen,
    }
  );

  return (
    <>
      {/* Backdrop overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside id="sidebar" className={sidebarClasses}>
        <div className="flex flex-col h-full">
          {/* Close button - Mobile only */}
          <div className="flex justify-end p-4 lg:hidden">
            <button
              onClick={closeMobileMenu}
              className="glass-button p-2"
              aria-label="Close menu"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="px-3 py-4">
            <h2 className="px-4 text-lg font-semibold mb-6">Menu</h2>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      classNames(
                        'flex items-center px-4 py-3 rounded-aero transition-all duration-200',
                        {
                          'glass-button bg-aero-blue-light/10': isActive,
                          'hover:glass-button': !isActive,
                        }
                      )
                    }
                  >
                    <span className="text-aero-blue">{item.icon}</span>
                    <span className="ml-3">{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* User Playlists Section */}
          <div className="mt-auto px-3 py-4 border-t border-white/10">
            <h2 className="px-4 text-lg font-semibold mb-3">Your Playlists</h2>
            <ul className="space-y-1 max-h-48 overflow-y-auto">
              {['Chill Vibes', 'Workout Mix', 'Coding Focus', 'Road Trip'].map((playlist) => (
                <li key={playlist}>
                  <button className="w-full text-left px-4 py-2 rounded-aero hover:bg-glass transition-all duration-200">
                    {playlist}
                  </button>
                </li>
              ))}
            </ul>
            <button className="w-full glass-button text-center mt-3">
              Create Playlist
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
