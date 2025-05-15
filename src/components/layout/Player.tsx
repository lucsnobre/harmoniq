import { useState, useRef, useEffect } from 'react';
import {
  FiPlay,
  FiPause,
  FiSkipBack,
  FiSkipForward,
  FiVolume2,
  FiVolumeX,
  FiRepeat,
  FiShuffle,
  FiMusic,
} from 'react-icons/fi';
import { usePlayer } from '../../context/PlayerContext';

const Player = () => {
  const {
    currentSong,
    isPlaying,
    volume,
    progress,
    duration,
    togglePlay,
    playNext,
    playPrevious,
    setVolume,
    seekTo,
    repeat,
    shuffle,
    toggleRepeat,
    toggleShuffle,
  } = usePlayer();

  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const volumeTimeoutRef = useRef<number | null>(null);

  // Format time as MM:SS
  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle seeking in the progress bar
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !duration) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const newProgress = clickPosition * duration;

    seekTo(newProgress);
  };

  // Handle volume control timeout
  useEffect(() => {
    return () => {
      if (volumeTimeoutRef.current) clearTimeout(volumeTimeoutRef.current);
    };
  }, []);

  // Show volume control and hide after timeout
  const handleVolumeIconClick = () => {
    setShowVolumeControl(true);

    if (volumeTimeoutRef.current) clearTimeout(volumeTimeoutRef.current);

    volumeTimeoutRef.current = setTimeout(() => {
      setShowVolumeControl(false);
    }, 3000);
  };

  // Handle mute/unmute
  const toggleMute = () => {
    if (volume > 0) {
      setVolume(0);
    } else {
      setVolume(0.7);
    }
  };

  // Calculate progress percentage
  const progressPercentage = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <div className="glass sticky bottom-0 z-30 border-t border-white/10 p-3">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          {/* Song Info */}
          <div className="flex items-center w-full md:w-1/4 mb-3 md:mb-0">
            {currentSong ? (
              <>
                <div className="w-12 h-12 glass rounded-aero overflow-hidden shadow-aero-button mr-3">
                  <img
                    src={currentSong.cover}
                    alt={`${currentSong.title} album art`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="truncate">
                  <h4 className="text-sm font-semibold truncate">{currentSong.title}</h4>
                  <p className="text-xs text-aero-gray-dark truncate">{currentSong.artist}</p>
                </div>
              </>
            ) : (
              <div className="flex items-center">
                <div className="w-12 h-12 glass rounded-aero mr-3 flex items-center justify-center">
                  <FiMusic className="text-aero-blue" size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Not Playing</h4>
                  <p className="text-xs text-aero-gray-dark">Select a song to play</p>
                </div>
              </div>
            )}
          </div>

          {/* Player Controls */}
          <div className="flex flex-col items-center w-full md:w-2/4">
            {/* Controls */}
            <div className="flex items-center space-x-4">
              <button
                className={`player-control ${shuffle ? 'bg-aero-green' : ''}`}
                onClick={toggleShuffle}
                disabled={!currentSong}
                aria-label="Toggle shuffle"
              >
                <FiShuffle size={16} />
              </button>

              <button
                className="player-control"
                onClick={playPrevious}
                disabled={!currentSong}
                aria-label="Previous track"
              >
                <FiSkipBack size={16} />
              </button>

              <button
                className="player-control w-12 h-12"
                onClick={togglePlay}
                disabled={!currentSong}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <FiPause size={20} /> : <FiPlay size={20} />}
              </button>

              <button
                className="player-control"
                onClick={playNext}
                disabled={!currentSong}
                aria-label="Next track"
              >
                <FiSkipForward size={16} />
              </button>

              <button
                className={`player-control ${repeat ? 'bg-aero-green' : ''}`}
                onClick={toggleRepeat}
                disabled={!currentSong}
                aria-label="Toggle repeat"
              >
                <FiRepeat size={16} />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="w-full flex items-center space-x-2 mt-3">
              <span className="text-xs">{formatTime(progress)}</span>

              <div
                ref={progressBarRef}
                className="progress-bar flex-1"
                onClick={handleProgressClick}
              >
                <div
                  className="progress-bar-fill"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>

              <span className="text-xs">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center justify-end w-full md:w-1/4 mt-3 md:mt-0">
            <div className="relative">
              <button
                className="player-control"
                onClick={toggleMute}
                onMouseEnter={handleVolumeIconClick}
                aria-label={volume === 0 ? "Unmute" : "Mute"}
              >
                {volume === 0 ? <FiVolumeX size={18} /> : <FiVolume2 size={18} />}
              </button>

              {showVolumeControl && (
                <div
                  className="absolute bottom-full mb-2 glass p-2 rounded-aero shadow-aero"
                  onMouseEnter={() => {
                    if (volumeTimeoutRef.current) clearTimeout(volumeTimeoutRef.current);
                  }}
                  onMouseLeave={() => {
                    volumeTimeoutRef.current = setTimeout(() => {
                      setShowVolumeControl(false);
                    }, 1000);
                  }}
                >
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-24 accent-aero-blue"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
