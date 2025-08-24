import { Movie, Review, Favorite } from '@/types';

const MOVIES_KEY = 'orangeflix_movies';
const REVIEWS_KEY = 'orangeflix_reviews';
const FAVORITES_KEY = 'orangeflix_favorites';
const WATCHLATER_KEY = 'orangeflix_watchlater';

export interface WatchLater {
  id: string;
  movieId: string;
  userId: string;
  createdAt: string;
}

export class MovieService {
  static getMovies(): Movie[] {
    const movies = localStorage.getItem(MOVIES_KEY);
    if (!movies) {
      // Initialize with some sample movies
      const sampleMovies: Movie[] = [
        {
          id: '1',
          title: 'The Dark Knight',
          description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
          type: 'Movie',
          genre: ['Action', 'Crime', 'Drama'],
          releaseYear: 2008,
          duration: 152,
          imageUrl: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400',
          videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
          rating: 4.5,
          totalRatings: 1250,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Inception',
          description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
          type: 'Movie',
          genre: ['Action', 'Sci-Fi', 'Thriller'],
          releaseYear: 2010,
          duration: 148,
          imageUrl: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400',
          videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
          rating: 4.3,
          totalRatings: 980,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '3',
          title: 'Stranger Things',
          description: 'When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.',
          type: 'Series',
          genre: ['Drama', 'Fantasy', 'Horror'],
          releaseYear: 2016,
          duration: 45,
          imageUrl: 'https://orangeflixx.vercel.app/images/Supernatural.jpg',
          videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
          rating: 4.7,
          totalRatings: 2100,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '4',
          title: 'Avengers: Endgame',
          description: 'The grave course of events set in motion by Thanos that wiped out half the universe and fractured the Avengers ranks compels the remaining Avengers to take one final stand.',
          type: 'Movie',
          genre: ['Action', 'Adventure', 'Drama'],
          releaseYear: 2019,
          duration: 181,
          imageUrl: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400',
          videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
          rating: 4.8,
          totalRatings: 3200,
          createdAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
          updatedAt: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: '5',
          title: 'The Witcher',
          description: 'Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.',
          type: 'Series',
          genre: ['Action', 'Adventure', 'Fantasy'],
          releaseYear: 2023,
          duration: 60,
          imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
          videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
          rating: 4.6,
          totalRatings: 1800,
          createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
          updatedAt: new Date(Date.now() - 172800000).toISOString()
        }
      ];
      this.saveMovies(sampleMovies);
      return sampleMovies;
    }
    return JSON.parse(movies);
  }

  static saveMovies(movies: Movie[]): void {
    localStorage.setItem(MOVIES_KEY, JSON.stringify(movies));
  }

  static addMovie(movie: Omit<Movie, 'id' | 'createdAt' | 'updatedAt'>): Movie {
    const movies = this.getMovies();
    const newMovie: Movie = {
      ...movie,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    movies.push(newMovie);
    this.saveMovies(movies);
    return newMovie;
  }

  static updateMovie(id: string, updates: Partial<Movie>): Movie | null {
    const movies = this.getMovies();
    const index = movies.findIndex(m => m.id === id);
    if (index === -1) return null;
    
    movies[index] = { ...movies[index], ...updates, updatedAt: new Date().toISOString() };
    this.saveMovies(movies);
    return movies[index];
  }

  static deleteMovie(id: string): boolean {
    const movies = this.getMovies();
    const filteredMovies = movies.filter(m => m.id !== id);
    if (filteredMovies.length === movies.length) return false;
    this.saveMovies(filteredMovies);
    return true;
  }

  static getTrendingMovies(): Movie[] {
    const movies = this.getMovies();
    return movies.sort((a, b) => b.rating * b.totalRatings - a.rating * a.totalRatings).slice(0, 10);
  }

  static getNewMovies(): Movie[] {
    const movies = this.getMovies();
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    return movies
      .filter(movie => new Date(movie.createdAt) > oneWeekAgo)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 10);
  }

  static getReviews(movieId?: string): Review[] {
    const reviews = localStorage.getItem(REVIEWS_KEY);
    const allReviews = reviews ? JSON.parse(reviews) : [];
    return movieId ? allReviews.filter((r: Review) => r.movieId === movieId) : allReviews;
  }

  static addReview(review: Omit<Review, 'id' | 'createdAt'>): Review {
    const reviews = this.getReviews();
    const newReview: Review = {
      ...review,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    reviews.push(newReview);
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
    
    // Update movie rating
    this.updateMovieRating(review.movieId);
    
    return newReview;
  }

  static updateMovieRating(movieId: string): void {
    const reviews = this.getReviews(movieId);
    if (reviews.length === 0) return;
    
    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
    this.updateMovie(movieId, { 
      rating: Math.round(averageRating * 10) / 10, 
      totalRatings: reviews.length 
    });
  }

  static getFavorites(userId?: string): Favorite[] {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    const allFavorites = favorites ? JSON.parse(favorites) : [];
    return userId ? allFavorites.filter((f: Favorite) => f.userId === userId) : allFavorites;
  }

  static addToFavorites(movieId: string, userId: string): Favorite {
    const favorites = this.getFavorites();
    const existing = favorites.find(f => f.movieId === movieId && f.userId === userId);
    if (existing) return existing;
    
    const newFavorite: Favorite = {
      id: Date.now().toString(),
      movieId,
      userId,
      createdAt: new Date().toISOString()
    };
    favorites.push(newFavorite);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    return newFavorite;
  }

  static removeFromFavorites(movieId: string, userId: string): boolean {
    const favorites = this.getFavorites();
    const filteredFavorites = favorites.filter(f => !(f.movieId === movieId && f.userId === userId));
    if (filteredFavorites.length === favorites.length) return false;
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(filteredFavorites));
    return true;
  }

  static isFavorite(movieId: string, userId: string): boolean {
    const favorites = this.getFavorites(userId);
    return favorites.some(f => f.movieId === movieId);
  }

  // Watch Later functionality
  static getWatchLater(userId?: string): WatchLater[] {
    const watchLater = localStorage.getItem(WATCHLATER_KEY);
    const allWatchLater = watchLater ? JSON.parse(watchLater) : [];
    return userId ? allWatchLater.filter((w: WatchLater) => w.userId === userId) : allWatchLater;
  }

  static addToWatchLater(movieId: string, userId: string): WatchLater {
    const watchLater = this.getWatchLater();
    const existing = watchLater.find(w => w.movieId === movieId && w.userId === userId);
    if (existing) return existing;
    
    const newWatchLater: WatchLater = {
      id: Date.now().toString(),
      movieId,
      userId,
      createdAt: new Date().toISOString()
    };
    watchLater.push(newWatchLater);
    localStorage.setItem(WATCHLATER_KEY, JSON.stringify(watchLater));
    return newWatchLater;
  }

  static removeFromWatchLater(movieId: string, userId: string): boolean {
    const watchLater = this.getWatchLater();
    const filteredWatchLater = watchLater.filter(w => !(w.movieId === movieId && w.userId === userId));
    if (filteredWatchLater.length === watchLater.length) return false;
    localStorage.setItem(WATCHLATER_KEY, JSON.stringify(filteredWatchLater));
    return true;
  }

  static isInWatchLater(movieId: string, userId: string): boolean {
    const watchLater = this.getWatchLater(userId);
    return watchLater.some(w => w.movieId === movieId);
  }
}
