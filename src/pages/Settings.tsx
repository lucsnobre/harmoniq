import { useState } from 'react';
import { FiSun, FiMoon, FiVolume2, FiDownload, FiHardDrive, FiInfo } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { usePlayer } from '../context/PlayerContext';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { volume, setVolume } = usePlayer();

  const [streamingQuality, setStreamingQuality] = useState('high');
  const [downloadQuality, setDownloadQuality] = useState('high');
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const [normalizationEnabled, setNormalizationEnabled] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const [cacheSize, setCacheSize] = useState(2); // GB
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSaveSettings = () => {
    // In a real app, this would save settings to localStorage or a database
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const clearCache = () => {
    // Simulate clearing cache
    console.log("Clearing cache...");
    setCacheSize(0);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold text-shadow-glow mb-8">Settings</h1>

      <div className="space-y-8 max-w-3xl">
        {/* Appearance Section */}
        <section className="glass-card overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center">
            <FiSun className="mr-2 text-aero-orange" size={20} />
            <h2 className="text-xl font-semibold">Appearance</h2>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Theme</h3>
                <p className="text-sm text-aero-gray-dark mt-1">
                  Choose between light and dark mode
                </p>
              </div>

              <div className="glass rounded-aero overflow-hidden flex">
                <button
                  className={`px-4 py-2 flex items-center ${
                    theme === 'light' ? 'bg-aero-blue/20' : ''
                  }`}
                  onClick={() => theme === 'dark' && toggleTheme()}
                >
                  <FiSun className="mr-2" />
                  Light
                </button>
                <button
                  className={`px-4 py-2 flex items-center ${
                    theme === 'dark' ? 'bg-aero-blue/20' : ''
                  }`}
                  onClick={() => theme === 'light' && toggleTheme()}
                >
                  <FiMoon className="mr-2" />
                  Dark
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Playback Section */}
        <section className="glass-card overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center">
            <FiVolume2 className="mr-2 text-aero-blue" size={20} />
            <h2 className="text-xl font-semibold">Playback</h2>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Default Volume</h3>
                <p className="text-sm text-aero-gray-dark mt-1">
                  Set your preferred default volume level
                </p>
              </div>

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-48 accent-aero-blue"
              />
            </div>

            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Streaming Quality</h3>
                <p className="text-sm text-aero-gray-dark mt-1">
                  Higher quality uses more data
                </p>
              </div>

              <select
                value={streamingQuality}
                onChange={(e) => setStreamingQuality(e.target.value)}
                className="glass px-4 py-2 rounded-aero focus:outline-none focus:ring-2 focus:ring-aero-blue"
              >
                <option value="low">Low (96 kbps)</option>
                <option value="medium">Medium (160 kbps)</option>
                <option value="high">High (320 kbps)</option>
              </select>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Autoplay</h3>
                <p className="text-sm text-aero-gray-dark mt-1">
                  Automatically play music when app starts
                </p>
              </div>

              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={autoplayEnabled}
                  onChange={() => setAutoplayEnabled(!autoplayEnabled)}
                />
                <div className="relative w-12 h-6 glass peer-focus:ring-aero-blue rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-aero-blue"></div>
              </label>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Volume Normalization</h3>
                <p className="text-sm text-aero-gray-dark mt-1">
                  Balance volume levels between songs
                </p>
              </div>

              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={normalizationEnabled}
                  onChange={() => setNormalizationEnabled(!normalizationEnabled)}
                />
                <div className="relative w-12 h-6 glass peer-focus:ring-aero-blue rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-aero-blue"></div>
              </label>
            </div>
          </div>
        </section>

        {/* Downloads Section */}
        <section className="glass-card overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center">
            <FiDownload className="mr-2 text-aero-green" size={20} />
            <h2 className="text-xl font-semibold">Downloads</h2>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Download Quality</h3>
                <p className="text-sm text-aero-gray-dark mt-1">
                  Higher quality uses more storage
                </p>
              </div>

              <select
                value={downloadQuality}
                onChange={(e) => setDownloadQuality(e.target.value)}
                className="glass px-4 py-2 rounded-aero focus:outline-none focus:ring-2 focus:ring-aero-blue"
              >
                <option value="medium">Medium (160 kbps)</option>
                <option value="high">High (320 kbps)</option>
                <option value="lossless">Lossless (FLAC)</option>
              </select>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Offline Mode</h3>
                <p className="text-sm text-aero-gray-dark mt-1">
                  Only show downloaded content
                </p>
              </div>

              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={offlineMode}
                  onChange={() => setOfflineMode(!offlineMode)}
                />
                <div className="relative w-12 h-6 glass peer-focus:ring-aero-blue rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-aero-blue"></div>
              </label>
            </div>
          </div>
        </section>

        {/* Storage Section */}
        <section className="glass-card overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center">
            <FiHardDrive className="mr-2 text-aero-cyan" size={20} />
            <h2 className="text-xl font-semibold">Storage</h2>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <h3 className="font-medium">Cache Size</h3>
              <p className="text-sm text-aero-gray-dark mt-1">
                Current cache: {cacheSize} GB
              </p>
              <div className="mt-3 bg-glass h-3 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-aero-blue to-aero-cyan"
                  style={{ width: `${(cacheSize / 4) * 100}%` }}
                ></div>
              </div>
              <div className="mt-1 text-xs text-aero-gray-dark flex justify-between">
                <span>0 GB</span>
                <span>Maximum: 4 GB</span>
              </div>
              <button
                className="glass-button mt-4"
                onClick={clearCache}
              >
                Clear Cache
              </button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="glass-card overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center">
            <FiInfo className="mr-2 text-aero-orange" size={20} />
            <h2 className="text-xl font-semibold">About</h2>
          </div>

          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 glass rounded-aero flex items-center justify-center mr-3">
                <span className="text-aero-blue font-bold text-xl">FM</span>
              </div>
              <div>
                <h3 className="font-semibold">Frutiger Music</h3>
                <p className="text-sm text-aero-gray-dark">Version 1.0.0</p>
              </div>
            </div>
            <p className="text-sm mb-4">
              A Y2K-inspired music player with Frutiger Aero aesthetic. Featuring glassmorphism,
              reflections, and nostalgic vibes from the Windows Vista era.
            </p>
            <div className="flex space-x-2">
              <button className="glass-button text-sm px-3 py-1">
                Terms of Service
              </button>
              <button className="glass-button text-sm px-3 py-1">
                Privacy Policy
              </button>
              <button className="glass-button text-sm px-3 py-1">
                Credits
              </button>
            </div>
          </div>
        </section>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            className="glass-button bg-aero-blue/20 px-6 py-3 text-lg"
            onClick={handleSaveSettings}
          >
            Save Settings
          </button>
        </div>

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="fixed bottom-6 right-6 glass rounded-aero p-4 bg-aero-green/20 shadow-aero animate-scaleUp">
            <p className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Settings saved successfully!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
