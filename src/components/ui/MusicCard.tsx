import { useState } from 'react';
import { FiPlay, FiPause, FiHeart, FiMoreHorizontal } from 'react-icons/fi';
import { usePlayer } from '../../context/PlayerContext';
import { Song } from '../../context/PlayerContext';

interface MusicCardProps {
  item: {
    id: string;
    title: string;
    subtitle?: string;
    image: string;
  };
  type: 'song' | 'album' | 'playlist' | 'artist';
  song?: Song;
  onClick?: () => void;
}

const MusicCard = ({ item, type, song, onClick }: MusicCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { currentSong, isPlaying, setCurrentSong, togglePlay } = usePlayer();

  const isCurrentlyPlaying = song && currentSong?.id === song.id && isPlaying;

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (song) {
      if (currentSong?.id === song.id) {
        togglePlay();
      } else {
        setCurrentSong(song);
      }
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleToggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowContextMenu(!showContextMenu);
  };

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowContextMenu(false);
      }}
    >
      <div
        className="glass-card overflow-hidden card-hover flex flex-col"
        onClick={onClick}
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden rounded-t-aero">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Overlay on hover */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            {/* Play Button Overlay */}
            {song && (
              <button
                className="absolute inset-0 m-auto w-12 h-12 flex items-center justify-center bg-aero-blue rounded-full shadow-aero-button transition-all duration-300 transform"
                style={{
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? 'scale(1)' : 'scale(0.8)',
                }}
                onClick={handlePlayPause}
                aria-label={isCurrentlyPlaying ? 'Pause' : 'Play'}
              >
                {isCurrentlyPlaying ? <FiPause size={20} color="white" /> : <FiPlay size={20} color="white" />}
              </button>
            )}
          </div>

          {/* Playing indicator */}
          {isCurrentlyPlaying && (
            <div className="absolute top-2 right-2 w-3 h-3 bg-aero-green rounded-full animate-pulse" />
          )}
        </div>

        {/* Text Content */}
        <div className="p-3 flex-1 flex flex-col">
          <h3 className="font-semibold text-base truncate">{item.title}</h3>
          {item.subtitle && (
            <p className="text-sm text-aero-gray-dark truncate mt-1">{item.subtitle}</p>
          )}
        </div>

        {/* Actions Bar */}
        <div className={`px-3 py-2 border-t border-white/10 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-40'}`}>
          <div className="flex justify-between items-center">
            <button
              className={`p-2 rounded-full transition-colors duration-200 ${isFavorite ? 'text-red-500' : 'hover:text-aero-blue'}`}
              onClick={handleToggleFavorite}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <FiHeart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>

            <div className="relative">
              <button
                className="p-2 rounded-full hover:text-aero-blue transition-colors duration-200"
                onClick={handleToggleMenu}
                aria-label="More options"
              >
                <FiMoreHorizontal size={18} />
              </button>

              {/* Context Menu */}
              {showContextMenu && (
                <div className="absolute bottom-full right-0 mb-2 glass rounded-aero shadow-aero p-1 min-w-40 z-10">
                  <ul>
                    <li>
                      <button className="w-full text-left px-3 py-2 rounded-aero hover:bg-white/10 transition-colors">
                        Add to playlist
                      </button>
                    </li>
                    <li>
                      <button className="w-full text-left px-3 py-2 rounded-aero hover:bg-white/10 transition-colors">
                        View {type === 'song' ? 'artist' : type === 'album' ? 'songs' : 'details'}
                      </button>
                    </li>
                    <li>
                      <button className="w-full text-left px-3 py-2 rounded-aero hover:bg-white/10 transition-colors">
                        Share
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reflection */}
      <div className="absolute inset-x-0 -bottom-4 h-4 glass opacity-30 blur-sm scale-95 rounded-b-aero mx-auto" />
    </div>
  );
};

export default MusicCard;
