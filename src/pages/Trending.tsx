import { MovieService } from '@/lib/movies';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Play, Heart, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Movie } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function Trending() {
  const { currentUser } = useAuth();
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  const loadTrendingMovies = () => {
    const movies = MovieService.getTrendingMovies();
    setTrendingMovies(movies);
    setLoading(false);
  };

  const addToFavorites = (movieId: string) => {
    if (!currentUser) {
      toast.error('Please login to add favorites');
      return;
    }
    
    const isFav = MovieService.isFavorite(movieId, currentUser.id);
    if (isFav) {
      MovieService.removeFromFavorites(movieId, currentUser.id);
      toast.success('Removed from favorites');
    } else {
      MovieService.addToFavorites(movieId, currentUser.id);
      toast.success('Added to favorites');
    }
  };

  const addToWatchLater = (movieId: string) => {
    if (!currentUser) {
      toast.error('Please login to add to watch later');
      return;
    }
    
    const isInWatchLater = MovieService.isInWatchLater(movieId, currentUser.id);
    if (isInWatchLater) {
      MovieService.removeFromWatchLater(movieId, currentUser.id);
      toast.success('Removed from Watch Later');
    } else {
      MovieService.addToWatchLater(movieId, currentUser.id);
      toast.success('Added to Watch Later');
    }
  };

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
        {/* Header */}
        <div className="flex items-center space-x-3 mb-8">
          <TrendingUp className="w-8 h-8 text-orange-400" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Trending Now
          </h1>
        </div>

        <p className="text-gray-400 mb-8 text-lg">
          Discover the most popular movies and series that everyone's talking about
        </p>

        {/* Featured Trending Item */}
        {trendingMovies.length > 0 && (
          <Card className="bg-gradient-to-r from-orange-900/20 to-yellow-900/20 border-orange-500/30 mb-12 overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/3">
                <img
                  src={trendingMovies[0].imageUrl}
                  alt={trendingMovies[0].title}
                  className="w-full h-64 lg:h-full object-cover"
                />
              </div>
              <div className="lg:w-2/3 p-6 lg:p-8">
                <div className="flex items-center space-x-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-orange-400" />
                  <span className="text-orange-400 font-semibold">#1 Trending</span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">{trendingMovies[0].title}</h2>
                <p className="text-gray-300 mb-6 line-clamp-3">{trendingMovies[0].description}</p>
                
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-white font-semibold">{trendingMovies[0].rating}</span>
                    <span className="text-gray-400">({trendingMovies[0].totalRatings} ratings)</span>
                  </div>
                  <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-sm">
                    {trendingMovies[0].type}
                  </span>
                  <span className="text-gray-400">{trendingMovies[0].releaseYear}</span>
                  <span className="text-gray-400">{trendingMovies[0].duration}min</span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button asChild className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600">
                    <Link to={`/watch/${trendingMovies[0].id}`}>
                      <Play className="w-4 h-4 mr-2" />
                      Watch Now
                    </Link>
                  </Button>
                  {currentUser && (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => addToFavorites(trendingMovies[0].id)}
                        className="border-orange-500/30 text-orange-400 hover:bg-orange-500/20"
                      >
                        <Heart className={`w-4 h-4 mr-2 ${MovieService.isFavorite(trendingMovies[0].id, currentUser.id) ? 'fill-current' : ''}`} />
                        {MovieService.isFavorite(trendingMovies[0].id, currentUser.id) ? 'Favorited' : 'Add to Favorites'}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => addToWatchLater(trendingMovies[0].id)}
                        className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20"
                      >
                        <Clock className="w-4 h-4 mr-2" />
                        {MovieService.isInWatchLater(trendingMovies[0].id, currentUser.id) ? 'In Watch Later' : 'Watch Later'}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Trending Grid */}
        <h2 className="text-2xl font-bold text-white mb-6">All Trending Content</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {trendingMovies.map((movie, index) => (
            <Card key={movie.id} className="bg-gray-900/50 border-orange-500/20 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300 group overflow-hidden">
              <div className="relative">
                <img
                  src={movie.imageUrl}
                  alt={movie.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  #{index + 1}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        size="sm"
                        asChild
                        className="bg-orange-500 hover:bg-orange-600 text-white col-span-2"
                      >
                        <Link to={`/watch/${movie.id}`}>
                          <Play className="w-4 h-4 mr-1" />
                          Watch
                        </Link>
                      </Button>
                      {currentUser && (
                        <>
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
                            onClick={() => addToWatchLater(movie.id)}
                            className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20"
                          >
                            <Clock className="w-4 h-4" />
                          </Button>
                        </>
                      )}
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
      </div>
    </div>
  );
}