import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Movie } from '@/types';
import { MovieService } from '@/lib/movies';
import MovieCard from '@/components/MovieCard';

export default function Favorites() {
  const { currentUser } = useAuth();
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

  useEffect(() => {
    if (currentUser) {
      const favorites = MovieService.getFavorites(currentUser.id);
      const allMovies = MovieService.getMovies();
      const favoriteMovieList = allMovies.filter(movie => 
        favorites.some(fav => fav.movieId === movie.id)
      );
      setFavoriteMovies(favoriteMovieList);
    }
  }, [currentUser]);

  const handleFavoriteChange = () => {
    if (currentUser) {
      const favorites = MovieService.getFavorites(currentUser.id);
      const allMovies = MovieService.getMovies();
      const favoriteMovieList = allMovies.filter(movie => 
        favorites.some(fav => fav.movieId === movie.id)
      );
      setFavoriteMovies(favoriteMovieList);
    }
  };

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">My Favorites</h1>
        
        {favoriteMovies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {favoriteMovies.map((movie) => (
              <MovieCard 
                key={movie.id} 
                movie={movie} 
                onFavoriteChange={handleFavoriteChange}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-4">No favorites yet</p>
            <p className="text-gray-500">Start adding movies to your favorites to see them here</p>
          </div>
        )}
      </div>
    </div>
  );
}