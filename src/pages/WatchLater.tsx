import { useAuth } from '@/contexts/AuthContext';
import { MovieService } from '@/lib/movies';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Play, Trash2, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Movie } from '@/types';
import { toast } from 'sonner';

export default function WatchLater() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [watchLaterMovies, setWatchLaterMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    loadWatchLaterMovies();
  }, [currentUser, navigate]);

  const loadWatchLaterMovies = () => {
    if (!currentUser) return;
    
    const watchLaterList = MovieService.getWatchLater(currentUser.id);
    const allMovies = MovieService.getMovies();
    const movies = watchLaterList
      .map(item => allMovies.find(movie => movie.id === item.movieId))
      .filter(Boolean) as Movie[];
    
    setWatchLaterMovies(movies);
    setLoading(false);
  };

  const removeFromWatchLater = (movieId: string) => {
    if (!currentUser) return;
    
    const success = MovieService.removeFromWatchLater(movieId, currentUser.id);
    if (success) {
      setWatchLaterMovies(prev => prev.filter(movie => movie.id !== movieId));
      toast.success('Removed from Watch Later');
    }
  };

  const addToFavorites = (movieId: string) => {
    if (!currentUser) return;
    
    const isFav = MovieService.isFavorite(movieId, currentUser.id);
    if (isFav) {
      MovieService.removeFromFavorites(movieId, currentUser.id);
      toast.success('Removed from favorites');
    } else {
      MovieService.addToFavorites(movieId, currentUser.id);
      toast.success('Added to favorites');
    }
  };

  if (!currentUser) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-orange-950/10 to-yellow-950/10 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-orange-950/10 to-yellow-950/10">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-3 mb-8">
          <Clock className="w-8 h-8 text-orange-400" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Watch Later
          </h1>
        </div>

        {watchLaterMovies.length === 0 ? (
          <Card className="bg-gray-900/50 border-orange-500/20 backdrop-blur-sm">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <Clock className="w-16 h-16 text-orange-400/50 mb-4" />
              <h2 className="text-2xl font-semibold text-white mb-2">Your Watch Later list is empty</h2>
              <p className="text-gray-400 mb-6 max-w-md">
                Browse movies and series to add them to your watch later list for easy access.
              </p>
              <div className="flex space-x-4">
                <Button asChild className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600">
                  <Link to="/movies">Browse Movies</Link>
                </Button>
                <Button variant="outline" asChild className="border-orange-500/30 text-orange-400 hover:bg-orange-500/20">
                  <Link to="/series">Browse Series</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {watchLaterMovies.map((movie) => (
              <Card key={movie.id} className="bg-gray-900/50 border-orange-500/20 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300 group overflow-hidden">
                <div className="relative">
                  <img
                    src={movie.imageUrl}
                    alt={movie.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          asChild
                          className="bg-orange-500 hover:bg-orange-600 text-white flex-1"
                        >
                          <Link to={`/watch/${movie.id}`}>
                            <Play className="w-4 h-4 mr-1" />
                            Watch
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addToFavorites(movie.id)}
                          className="border-orange-500/30 text-orange-400 hover:bg-orange-500/20"
                        >
                          <Heart className={`w-4 h-4 ${MovieService.isFavorite(movie.id, currentUser.id) ? 'fill-current' : ''}`} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeFromWatchLater(movie.id)}
                          className="border-red-500/30 text-red-400 hover:bg-red-500/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg line-clamp-1">{movie.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                    <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full text-xs">
                      {movie.type}
                    </span>
                    <span>{movie.releaseYear}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-white text-sm">{movie.rating}</span>
                    </div>
                    <span className="text-gray-400 text-sm">{movie.duration}min</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}