import axios from 'axios';
import { Song } from '../context/PlayerContext';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'https://dummyjson.com', // Using dummyjson as a placeholder API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Generate a random duration between 2-5 minutes in seconds
const getRandomDuration = () => Math.floor(Math.random() * (300 - 120) + 120);

// Mock data transformation
const transformToSong = (item: any): Song => ({
  id: item.id.toString(),
  title: item.title || 'Unknown Title',
  artist: item.author || item.brand || 'Unknown Artist',
  album: item.category || 'Unknown Album',
  cover: item.thumbnail || item.images?.[0] || 'https://via.placeholder.com/300/67A9D7/FFFFFF?text=Cover',
  audio: 'https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3', // Sample audio URL
  duration: getRandomDuration(),
});

// Music API service
export const musicService = {
  // Get featured songs
  getFeaturedSongs: async (): Promise<Song[]> => {
    try {
      const response = await api.get('/products?limit=10');
      return response.data.products.map(transformToSong);
    } catch (error) {
      console.error('Error fetching featured songs:', error);
      return [];
    }
  },

  // Get songs by artist
  getSongsByArtist: async (artist: string): Promise<Song[]> => {
    try {
      const response = await api.get(`/products/category/${artist}`);
      return response.data.products.map(transformToSong);
    } catch (error) {
      console.error(`Error fetching songs by artist ${artist}:`, error);
      return [];
    }
  },

  // Get albums
  getAlbums: async (): Promise<{ id: string; title: string; artist: string; cover: string }[]> => {
    try {
      const response = await api.get('/products/categories');
      return response.data.slice(0, 10).map((category: string, index: number) => ({
        id: index.toString(),
        title: category.charAt(0).toUpperCase() + category.slice(1),
        artist: 'Various Artists',
        cover: `https://via.placeholder.com/300/${Math.floor(Math.random() * 16777215).toString(16)}/FFFFFF?text=${category}`,
      }));
    } catch (error) {
      console.error('Error fetching albums:', error);
      return [];
    }
  },

  // Get artists
  getArtists: async (): Promise<{ id: string; name: string; image: string }[]> => {
    try {
      const response = await api.get('/users?limit=10');
      return response.data.users.map((user: any) => ({
        id: user.id.toString(),
        name: `${user.firstName} ${user.lastName}`,
        image: user.image,
      }));
    } catch (error) {
      console.error('Error fetching artists:', error);
      return [];
    }
  },

  // Search for content
  searchContent: async (query: string): Promise<{ songs: Song[]; albums: any[]; artists: any[] }> => {
    try {
      const response = await api.get(`/products/search?q=${query}`);
      const songs = response.data.products.map(transformToSong);

      return {
        songs,
        albums: [],
        artists: [],
      };
    } catch (error) {
      console.error(`Error searching for ${query}:`, error);
      return { songs: [], albums: [], artists: [] };
    }
  },

  // Get song details
  getSong: async (id: string): Promise<Song | null> => {
    try {
      const response = await api.get(`/products/${id}`);
      return transformToSong(response.data);
    } catch (error) {
      console.error(`Error fetching song ${id}:`, error);
      return null;
    }
  },
};

export default api;
