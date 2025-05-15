import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';

export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  cover: string;
  audio: string;
  duration: number;
}

interface PlayerContextType {
  currentSong: Song | null;
  playlist: Song[];
  isPlaying: boolean;
  volume: number;
  progress: number;
  duration: number;
  setCurrentSong: (song: Song) => void;
  setPlaylist: (songs: Song[]) => void;
  togglePlay: () => void;
  pause: () => void;
  play: () => void;
  playNext: () => void;
  playPrevious: () => void;
  setVolume: (volume: number) => void;
  seekTo: (time: number) => void;
  addToPlaylist: (song: Song) => void;
  removeFromPlaylist: (songId: string) => void;
  toggleRepeat: () => void;
  toggleShuffle: () => void;
  repeat: boolean;
  shuffle: boolean;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const usePlayer = (): PlayerContextType => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};

interface PlayerProviderProps {
  children: ReactNode;
}

export const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();

    // Set up event listeners
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      if (audio) {
        setProgress(audio.currentTime);
      }
    };

    const handleLoadedMetadata = () => {
      if (audio) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      if (repeat) {
        // Restart the song
        if (audio) {
          audio.currentTime = 0;
          audio.play().catch(err => console.error("Error playing audio:", err));
        }
      } else {
        playNext();
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    // Cleanup
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, [repeat]);

  // Update audio source when currentSong changes
  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.src = currentSong.audio;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(err => console.error("Error playing audio:", err));
      }
    }
  }, [currentSong]);

  // Update audio volume when volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Update play state
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(err => console.error("Error playing audio:", err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Save volume to localStorage
  useEffect(() => {
    localStorage.setItem('musicPlayerVolume', volume.toString());
  }, [volume]);

  // Load volume from localStorage on init
  useEffect(() => {
    const savedVolume = localStorage.getItem('musicPlayerVolume');
    if (savedVolume) {
      setVolume(parseFloat(savedVolume));
    }
  }, []);

  const play = () => {
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  };

  const playNext = () => {
    if (!currentSong || playlist.length === 0) return;

    const currentIndex = playlist.findIndex(song => song.id === currentSong.id);
    let nextIndex;

    if (shuffle) {
      // Get random index that is not the current one
      do {
        nextIndex = Math.floor(Math.random() * playlist.length);
      } while (nextIndex === currentIndex && playlist.length > 1);
    } else {
      // Get next index or loop back to beginning
      nextIndex = (currentIndex + 1) % playlist.length;
    }

    setCurrentSong(playlist[nextIndex]);
  };

  const playPrevious = () => {
    if (!currentSong || playlist.length === 0) return;

    const currentIndex = playlist.findIndex(song => song.id === currentSong.id);
    let prevIndex;

    if (shuffle) {
      // Get random index that is not the current one
      do {
        prevIndex = Math.floor(Math.random() * playlist.length);
      } while (prevIndex === currentIndex && playlist.length > 1);
    } else {
      // Get previous index or loop back to end
      prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    }

    setCurrentSong(playlist[prevIndex]);
  };

  const addToPlaylist = (song: Song) => {
    // Check if the song is already in the playlist
    if (!playlist.some(item => item.id === song.id)) {
      setPlaylist([...playlist, song]);
    }
  };

  const removeFromPlaylist = (songId: string) => {
    setPlaylist(playlist.filter(song => song.id !== songId));
  };

  const toggleRepeat = () => {
    setRepeat(!repeat);
  };

  const toggleShuffle = () => {
    setShuffle(!shuffle);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        playlist,
        isPlaying,
        volume,
        progress,
        duration,
        setCurrentSong,
        setPlaylist,
        togglePlay,
        pause,
        play,
        playNext,
        playPrevious,
        setVolume,
        seekTo,
        addToPlaylist,
        removeFromPlaylist,
        toggleRepeat,
        toggleShuffle,
        repeat,
        shuffle,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
