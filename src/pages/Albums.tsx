import { useState, useEffect } from 'react';
import { FiGrid, FiList, FiSearch } from 'react-icons/fi';
import { musicService } from '../services/api';
import { usePlayer } from '../context/PlayerContext';
import { Song } from '../context/PlayerContext';

import MusicCard from '../components/ui/MusicCard';
import Modal from '../components/ui/Modal';

const Albums = () => {
  const [albums, setAlbums] = useState<any[]>([]);
  const [featuredSongs, setFeaturedSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAlbum, setSelectedAlbum] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const { setCurrentSong } = usePlayer();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch albums
        const albumsData = await musicService.getAlbums();
        setAlbums(albumsData);

        // Fetch some songs for album details
        const songsData = await musicService.getFeaturedSongs();
        setFeaturedSongs(songsData);
      } catch (error) {
        console.error('Error fetching albums data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const openAlbumModal = (album: any) => {
    setSelectedAlbum(album);
  };

  const closeModal = () => {
    setSelectedAlbum(null);
  };

  // Filter albums based on search query
  const filteredAlbums = albums.filter(album =>
    album.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Format time as MM:SS
  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="py-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-shadow-glow">Albums</h1>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-64">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-aero-gray-dark" />
            <input
              type="text"
              placeholder="Search albums..."
              className="glass w-full py-2 pl-10 pr-4 rounded-aero focus:outline-none focus:ring-2 focus:ring-aero-blue"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* View Toggle */}
          <div className="glass rounded-aero flex">
            <button
              className={`p-2 rounded-l-aero ${viewMode === 'grid' ? 'bg-aero-blue/20' : ''}`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
            >
              <FiGrid size={20} />
            </button>
            <button
              className={`p-2 rounded-r-aero ${viewMode === 'list' ? 'bg-aero-blue/20' : ''}`}
              onClick={() => setViewMode('list')}
              aria-label="List view"
            >
              <FiList size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Albums Display */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="glass-card animate-pulse aspect-square"></div>
          ))}
        </div>
      ) : viewMode === 'grid' ? (
        // Grid View
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredAlbums.map((album) => (
            <MusicCard
              key={album.id}
              item={{
                id: album.id,
                title: album.title,
                subtitle: album.artist,
                image: album.cover,
              }}
              type="album"
              onClick={() => openAlbumModal(album)}
            />
          ))}
        </div>
      ) : (
        // List View
        <div className="glass-card overflow-hidden">
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-4 py-3 text-left">Cover</th>
                <th className="px-4 py-3 text-left">Album</th>
                <th className="px-4 py-3 text-left">Artist</th>
                <th className="px-4 py-3 text-left">Year</th>
                <th className="px-4 py-3 text-left">Songs</th>
              </tr>
            </thead>
            <tbody>
              {filteredAlbums.map((album) => (
                <tr
                  key={album.id}
                  className="border-b border-white/10 hover:bg-white/5 transition-colors cursor-pointer"
                  onClick={() => openAlbumModal(album)}
                >
                  <td className="px-4 py-3">
                    <img
                      src={album.cover}
                      alt={album.title}
                      className="w-12 h-12 rounded-aero object-cover"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium">{album.title}</td>
                  <td className="px-4 py-3">{album.artist}</td>
                  <td className="px-4 py-3 text-aero-gray-dark">2023</td>
                  <td className="px-4 py-3 text-aero-gray-dark">12 songs</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredAlbums.length === 0 && (
        <div className="glass-card p-8 text-center">
          <h3 className="text-xl font-semibold mb-2">No Albums Found</h3>
          <p className="text-aero-gray-dark">
            We couldn't find any albums matching your search. Try a different query.
          </p>
        </div>
      )}

      {/* Album Detail Modal */}
      {selectedAlbum && (
        <Modal
          isOpen={!!selectedAlbum}
          onClose={closeModal}
          title="Album Details"
          size="lg"
        >
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 mb-4 md:mb-0 md:mr-6">
              <div className="glass rounded-aero overflow-hidden">
                <img
                  src={selectedAlbum.cover}
                  alt={selectedAlbum.title}
                  className="w-full aspect-square object-cover"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold">{selectedAlbum.title}</h3>
                <p className="text-aero-gray-dark">{selectedAlbum.artist}</p>
                <div className="mt-2 flex items-center text-sm text-aero-gray-dark">
                  <span>2023</span>
                  <span className="mx-2">•</span>
                  <span>{featuredSongs.length} songs</span>
                  <span className="mx-2">•</span>
                  <span>46 min</span>
                </div>
                <div className="flex space-x-2 mt-4">
                  <button className="glass-button bg-aero-blue/20 flex-1">
                    Play All
                  </button>
                  <button className="glass-button flex-1">
                    Add to Playlist
                  </button>
                </div>
              </div>
            </div>
            <div className="md:w-2/3">
              <div className="glass rounded-aero overflow-hidden">
                <div className="p-4 border-b border-white/10">
                  <h4 className="font-semibold">Tracks</h4>
                </div>
                <ul className="divide-y divide-white/10">
                  {featuredSongs.map((song, index) => (
                    <li
                      key={song.id}
                      className="p-3 hover:bg-white/5 transition-colors flex items-center cursor-pointer"
                      onClick={() => setCurrentSong(song)}
                    >
                      <span className="w-8 text-center text-aero-gray-dark">{index + 1}</span>
                      <div className="flex-1 ml-2">
                        <p className="font-medium">{song.title}</p>
                        <p className="text-sm text-aero-gray-dark">{song.artist}</p>
                      </div>
                      <span className="text-aero-gray-dark">{formatTime(song.duration)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Albums;
