import { useState, useEffect } from 'react';
import { FiMusic, FiDisc, FiUser } from 'react-icons/fi';
import { musicService } from '../services/api';
import { usePlayer } from '../context/PlayerContext';
import { Song } from '../context/PlayerContext';

import MusicCard from '../components/ui/MusicCard';
import SectionHeader from '../components/ui/SectionHeader';
import Modal from '../components/ui/Modal';

const Home = () => {
  const [featuredSongs, setFeaturedSongs] = useState<Song[]>([]);
  const [albums, setAlbums] = useState<any[]>([]);
  const [artists, setArtists] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [modalType, setModalType] = useState<'song' | 'album' | 'artist' | null>(null);

  const { setCurrentSong, setPlaylist } = usePlayer();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch featured songs
        const songs = await musicService.getFeaturedSongs();
        setFeaturedSongs(songs);
        setPlaylist(songs);

        // Fetch albums
        const albumsData = await musicService.getAlbums();
        setAlbums(albumsData);

        // Fetch artists
        const artistsData = await musicService.getArtists();
        setArtists(artistsData);
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [setPlaylist]);

  const handleItemClick = (item: any, type: 'song' | 'album' | 'artist') => {
    setSelectedItem(item);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalType(null);
  };

  return (
    <div className="py-6">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="glass-card overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-aero-blue-light/30 to-aero-orange-light/30 dark:from-aero-blue-dark/30 dark:to-aero-orange-dark/30"></div>
          <div className="relative z-10 p-6 md:p-10 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-shadow-glow">
                Welcome to Frutiger Music
              </h1>
              <p className="text-lg mb-6">
                Experience music with a nostalgic Y2K aesthetic. Discover new tracks, create playlists, and enjoy your favorite tunes.
              </p>
              <button
                className="glass-button bg-aero-blue/20 text-lg"
                onClick={() => featuredSongs.length > 0 && setCurrentSong(featuredSongs[0])}
              >
                Start Listening
              </button>
            </div>
            <div className="md:w-1/2 flex justify-center md:justify-end">
              <div className="relative w-64 h-64 rounded-aero-lg overflow-hidden shadow-aero">
                <img
                  src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
                  alt="Music Visualization"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <p className="text-white text-xl font-bold">Discover Music</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Songs Section */}
      <section className="mb-12">
        <SectionHeader title="Featured Songs" viewAllLink="/playlists">
          <div className="ml-2 p-1 glass rounded-full">
            <FiMusic size={20} className="text-aero-blue" />
          </div>
        </SectionHeader>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="glass-card animate-pulse aspect-square"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {featuredSongs.slice(0, 5).map((song) => (
              <MusicCard
                key={song.id}
                item={{
                  id: song.id,
                  title: song.title,
                  subtitle: song.artist,
                  image: song.cover,
                }}
                type="song"
                song={song}
                onClick={() => handleItemClick(song, 'song')}
              />
            ))}
          </div>
        )}
      </section>

      {/* Top Albums Section */}
      <section className="mb-12">
        <SectionHeader title="Top Albums" viewAllLink="/albums">
          <div className="ml-2 p-1 glass rounded-full">
            <FiDisc size={20} className="text-aero-cyan" />
          </div>
        </SectionHeader>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="glass-card animate-pulse aspect-square"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {albums.slice(0, 4).map((album) => (
              <MusicCard
                key={album.id}
                item={{
                  id: album.id,
                  title: album.title,
                  subtitle: album.artist,
                  image: album.cover,
                }}
                type="album"
                onClick={() => handleItemClick(album, 'album')}
              />
            ))}
          </div>
        )}
      </section>

      {/* Popular Artists Section */}
      <section>
        <SectionHeader title="Popular Artists" viewAllLink="/artists">
          <div className="ml-2 p-1 glass rounded-full">
            <FiUser size={20} className="text-aero-green" />
          </div>
        </SectionHeader>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="glass-card animate-pulse aspect-square rounded-full"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {artists.slice(0, 6).map((artist) => (
              <div
                key={artist.id}
                className="glass-card overflow-hidden flex flex-col items-center p-4 card-hover"
                onClick={() => handleItemClick(artist, 'artist')}
              >
                <div className="w-24 h-24 rounded-full overflow-hidden mb-3">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-center">{artist.name}</h3>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Detail Modals */}
      {selectedItem && modalType === 'song' && (
        <Modal
          isOpen={!!selectedItem}
          onClose={closeModal}
          title="Song Details"
          size="md"
        >
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 mb-4 md:mb-0 md:mr-6">
              <div className="glass rounded-aero overflow-hidden">
                <img
                  src={selectedItem.cover}
                  alt={selectedItem.title}
                  className="w-full aspect-square object-cover"
                />
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold mb-2">{selectedItem.title}</h3>
              <p className="text-aero-gray-dark mb-4">{selectedItem.artist}</p>
              <p className="mb-4">Album: {selectedItem.album}</p>
              <button
                className="glass-button bg-aero-blue/20 mb-4"
                onClick={() => {
                  setCurrentSong(selectedItem);
                  closeModal();
                }}
              >
                Play Now
              </button>
              <div className="glass rounded-aero p-4">
                <h4 className="font-semibold mb-2">About this track</h4>
                <p className="text-sm">
                  This is a sample track visualization. In a real application, this would contain
                  detailed information about the song, including lyrics, production credits, and more.
                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {selectedItem && modalType === 'album' && (
        <Modal
          isOpen={!!selectedItem}
          onClose={closeModal}
          title="Album Details"
          size="lg"
        >
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 mb-4 md:mb-0 md:mr-6">
              <div className="glass rounded-aero overflow-hidden">
                <img
                  src={selectedItem.cover}
                  alt={selectedItem.title}
                  className="w-full aspect-square object-cover"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold">{selectedItem.title}</h3>
                <p className="text-aero-gray-dark">{selectedItem.artist}</p>
                <button className="glass-button bg-aero-blue/20 mt-4 w-full">
                  Play Album
                </button>
              </div>
            </div>
            <div className="md:w-2/3">
              <div className="glass rounded-aero overflow-hidden">
                <div className="p-4 border-b border-white/10">
                  <h4 className="font-semibold">Tracks</h4>
                </div>
                <ul className="divide-y divide-white/10">
                  {featuredSongs.slice(0, 5).map((song, index) => (
                    <li key={song.id} className="p-3 hover:bg-white/5 transition-colors flex items-center">
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

      {selectedItem && modalType === 'artist' && (
        <Modal
          isOpen={!!selectedItem}
          onClose={closeModal}
          title="Artist Details"
          size="lg"
        >
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 mb-4 md:mb-0 md:mr-6">
              <div className="glass rounded-aero-lg overflow-hidden">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full aspect-square object-cover"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold">{selectedItem.name}</h3>
                <button className="glass-button bg-aero-blue/20 mt-4 w-full">
                  Follow Artist
                </button>
              </div>
            </div>
            <div className="md:w-2/3">
              <div className="glass rounded-aero p-4 mb-6">
                <h4 className="font-semibold mb-2">About</h4>
                <p>
                  This is a sample artist profile. In a real application, this would contain
                  detailed information about the artist, including biography, statistics, and more.
                </p>
              </div>

              <h4 className="font-semibold mb-4">Popular Songs</h4>
              <div className="glass rounded-aero overflow-hidden">
                <ul className="divide-y divide-white/10">
                  {featuredSongs.slice(0, 4).map((song, index) => (
                    <li key={song.id} className="p-3 hover:bg-white/5 transition-colors flex items-center">
                      <span className="w-8 text-center text-aero-gray-dark">{index + 1}</span>
                      <div className="flex-1 ml-2">
                        <p className="font-medium">{song.title}</p>
                        <p className="text-sm text-aero-gray-dark">{song.album}</p>
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

// Format time as MM:SS
const formatTime = (time: number) => {
  if (isNaN(time)) return '0:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export default Home;
