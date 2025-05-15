import { useState, useEffect } from 'react';
import { FiFilter, FiChevronDown } from 'react-icons/fi';
import { musicService } from '../services/api';
import Modal from '../components/ui/Modal';

const Artists = () => {
  const [artists, setArtists] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedArtist, setSelectedArtist] = useState<any>(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [currentFilter, setCurrentFilter] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const artistsData = await musicService.getArtists();
        setArtists(artistsData);
      } catch (error) {
        console.error('Error fetching artists:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const openArtistModal = (artist: any) => {
    setSelectedArtist(artist);
  };

  const closeModal = () => {
    setSelectedArtist(null);
  };

  const toggleFilterMenu = () => {
    setShowFilterMenu(!showFilterMenu);
  };

  const handleFilterChange = (filter: string) => {
    setCurrentFilter(filter);
    setShowFilterMenu(false);
  };

  const filters = ['All', 'Popular', 'New', 'A-Z'];

  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-shadow-glow">Artists</h1>

        {/* Filter Dropdown */}
        <div className="relative">
          <button
            className="glass-button flex items-center"
            onClick={toggleFilterMenu}
          >
            <FiFilter className="mr-2" />
            {currentFilter}
            <FiChevronDown className="ml-2" />
          </button>

          {showFilterMenu && (
            <div className="absolute right-0 top-full mt-2 glass rounded-aero shadow-aero w-40 z-20">
              <ul>
                {filters.map((filter) => (
                  <li key={filter}>
                    <button
                      className={`w-full text-left px-4 py-2 hover:bg-white/10 ${
                        currentFilter === filter ? 'bg-aero-blue/20' : ''
                      }`}
                      onClick={() => handleFilterChange(filter)}
                    >
                      {filter}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Artists Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="glass-card animate-pulse flex flex-col items-center p-6">
              <div className="rounded-full bg-aero-gray-light/20 h-32 w-32 mb-4" />
              <div className="h-4 bg-aero-gray-light/20 w-24 rounded-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {artists.map((artist) => (
            <div
              key={artist.id}
              className="glass-card flex flex-col items-center p-6 card-hover cursor-pointer"
              onClick={() => openArtistModal(artist)}
            >
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-gradient-to-br from-aero-blue-light/20 to-aero-green-light/20">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-center">{artist.name}</h3>
              <p className="text-sm text-aero-gray-dark mt-1">Artist</p>
            </div>
          ))}
        </div>
      )}

      {/* Alphabet Quick Nav (desktop only) */}
      <div className="hidden md:flex justify-center mt-12 glass rounded-aero p-2">
        {Array.from({ length: 26 }).map((_, i) => (
          <button
            key={i}
            className="w-8 h-8 flex items-center justify-center hover:bg-aero-blue/20 rounded-full transition-colors"
          >
            {String.fromCharCode(65 + i)}
          </button>
        ))}
      </div>

      {/* Artist Detail Modal */}
      {selectedArtist && (
        <Modal
          isOpen={!!selectedArtist}
          onClose={closeModal}
          title="Artist Details"
          size="lg"
        >
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 mb-4 md:mb-0 md:mr-6">
              <div className="glass rounded-aero-lg overflow-hidden">
                <img
                  src={selectedArtist.image}
                  alt={selectedArtist.name}
                  className="w-full aspect-square object-cover"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold">{selectedArtist.name}</h3>
                <p className="text-aero-gray-dark mt-1">Artist</p>
                <div className="flex space-x-2 mt-4">
                  <button className="glass-button bg-aero-blue/20 flex-1">
                    Follow
                  </button>
                  <button className="glass-button flex-1">
                    Share
                  </button>
                </div>
              </div>
            </div>
            <div className="md:w-2/3">
              <div className="glass rounded-aero p-4 mb-6">
                <h4 className="font-semibold mb-2">About</h4>
                <p>
                  This is a sample artist profile. In a real application, this would contain
                  detailed information about the artist, including biography, statistics, and more.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="glass px-3 py-1 rounded-full text-sm">Pop</span>
                  <span className="glass px-3 py-1 rounded-full text-sm">Electronic</span>
                  <span className="glass px-3 py-1 rounded-full text-sm">Dance</span>
                </div>
              </div>

              <div className="glass rounded-aero overflow-hidden">
                <div className="p-4 border-b border-white/10 flex justify-between items-center">
                  <h4 className="font-semibold">Popular Songs</h4>
                  <button className="text-sm text-aero-blue">See All</button>
                </div>

                <ul className="divide-y divide-white/10">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <li key={index} className="p-4 hover:bg-white/5 transition-colors flex items-center">
                      <span className="w-8 text-center text-aero-gray-dark">{index + 1}</span>
                      <div className="flex-1 ml-2">
                        <p className="font-medium">Sample Song {index + 1}</p>
                        <p className="text-sm text-aero-gray-dark">Album Name</p>
                      </div>
                      <span className="text-aero-gray-dark">3:45</span>
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

export default Artists;
