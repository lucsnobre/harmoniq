import { useState, useEffect } from 'react';
import { FiPlus, FiMusic } from 'react-icons/fi';
import { musicService } from '../services/api';
import { usePlayer } from '../context/PlayerContext';
import { Song } from '../context/PlayerContext';

import MusicCard from '../components/ui/MusicCard';
import SectionHeader from '../components/ui/SectionHeader';
import Modal from '../components/ui/Modal';

const Playlists = () => {
  const [featuredSongs, setFeaturedSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  const { setCurrentSong, setPlaylist } = usePlayer();

  // Sample playlists data
  const samplePlaylists = [
    {
      id: '1',
      title: 'Chill Vibes',
      image: 'https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      songCount: 15,
      duration: '1 hr 23 min',
    },
    {
      id: '2',
      title: 'Workout Mix',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      songCount: 12,
      duration: '58 min',
    },
    {
      id: '3',
      title: 'Coding Focus',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      songCount: 20,
      duration: '1 hr 47 min',
    },
    {
      id: '4',
      title: 'Road Trip',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      songCount: 25,
      duration: '2 hr 15 min',
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch featured songs
        const songs = await musicService.getFeaturedSongs();
        setFeaturedSongs(songs);
      } catch (error) {
        console.error('Error fetching songs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePlayAll = () => {
    if (featuredSongs.length > 0) {
      setPlaylist(featuredSongs);
      setCurrentSong(featuredSongs[0]);
    }
  };

  const handleCreatePlaylist = () => {
    // In a real app, this would save the playlist to a database or localStorage
    console.log('Creating playlist:', newPlaylistName);
    setShowCreateModal(false);
    setNewPlaylistName('');
    // Here you would typically add the new playlist to state
  };

  return (
    <div className="py-6">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-shadow-glow">Your Playlists</h1>
        <button
          className="glass-button bg-aero-blue/20 flex items-center"
          onClick={() => setShowCreateModal(true)}
        >
          <FiPlus className="mr-2" /> Create Playlist
        </button>
      </div>

      {/* Playlists Grid */}
      <section className="mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {samplePlaylists.map((playlist) => (
            <div key={playlist.id} className="glass-card overflow-hidden card-hover">
              <div className="aspect-square">
                <img
                  src={playlist.image}
                  alt={playlist.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">{playlist.title}</h3>
                <div className="flex items-center text-aero-gray-dark text-sm mt-1">
                  <span>{playlist.songCount} songs</span>
                  <span className="mx-2">•</span>
                  <span>{playlist.duration}</span>
                </div>
                <button className="glass-button w-full mt-3 bg-aero-blue/10">
                  Play
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Songs Section */}
      <section>
        <SectionHeader title="Recent Songs">
          <div className="ml-2 p-1 glass rounded-full">
            <FiMusic size={20} className="text-aero-blue" />
          </div>
          <button
            className="ml-4 glass-button px-3 py-1 text-sm bg-aero-blue/10"
            onClick={handlePlayAll}
          >
            Play All
          </button>
        </SectionHeader>

        {isLoading ? (
          <div className="glass-card animate-pulse h-64"></div>
        ) : (
          <div className="glass-card overflow-hidden">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-4 py-3 text-left w-16">#</th>
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-left">Album</th>
                  <th className="px-4 py-3 text-left">Artist</th>
                  <th className="px-4 py-3 text-left w-24">Duration</th>
                </tr>
              </thead>
              <tbody>
                {featuredSongs.map((song, index) => (
                  <tr
                    key={song.id}
                    className="border-b border-white/10 hover:bg-white/5 transition-colors cursor-pointer"
                    onClick={() => setCurrentSong(song)}
                  >
                    <td className="px-4 py-3 text-aero-gray-dark">{index + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <img
                          src={song.cover}
                          alt={song.title}
                          className="w-10 h-10 rounded mr-3"
                        />
                        <span>{song.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{song.album}</td>
                    <td className="px-4 py-3">{song.artist}</td>
                    <td className="px-4 py-3 text-aero-gray-dark">{formatTime(song.duration)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Create Playlist Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Playlist"
        size="sm"
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="playlist-name" className="block mb-2">
              Playlist Name
            </label>
            <input
              id="playlist-name"
              type="text"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              className="glass w-full p-3 rounded-aero focus:outline-none focus:ring-2 focus:ring-aero-blue"
              placeholder="My Awesome Playlist"
            />
          </div>

          <div className="flex items-center space-x-3">
            <button
              className="glass-button bg-aero-blue/20 flex-1"
              onClick={handleCreatePlaylist}
              disabled={!newPlaylistName.trim()}
            >
              Create
            </button>
            <button
              className="glass-button flex-1"
              onClick={() => setShowCreateModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// Format time as MM:SS
const formatTime = (time: number) => {
  if (isNaN(time)) return '0:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export default Playlists;
