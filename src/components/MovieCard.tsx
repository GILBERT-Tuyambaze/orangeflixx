import { Movie } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Heart, Star, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { MovieService } from '@/lib/movies';
import { toast } from 'sonner';
import { useState } from 'react';

interface MovieCardProps {
  movie: Movie;
  onFavoriteChange?: () => void;
}

export default function MovieCard({ movie, onFavoriteChange }: MovieCardProps) {
  const { currentUser } = useAuth();
  const [isHovered, setIsHovered] = useState(false);

  const toggleFavorite = () => {
    if (!currentUser) {
      toast.error('Please login to add favorites');
      return;
    }

    const isFav = MovieService.isFavorite(movie.id, currentUser.id);
    if (isFav) {
      MovieService.removeFromFavorites(movie.id, currentUser.id);
      toast.success('Removed from favorites');
    } else {
      MovieService.addToFavorites(movie.id, currentUser.id);
      toast.success('Added to favorites');
    }
    onFavoriteChange?.();
  };

  const toggleWatchLater = () => {
    if (!currentUser) {
      toast.error('Please login to add to watch later');
      return;
    }

    const isInWatchLater = MovieService.isInWatchLater(movie.id, currentUser.id);
    if (isInWatchLater) {
      MovieService.removeFromWatchLater(movie.id, currentUser.id);
      toast.success('Removed from Watch Later');
    } else {
      MovieService.addToWatchLater(movie.id, currentUser.id);
      toast.success('Added to Watch Later');
    }
  };

  return (
    <Card 
      className="bg-gray-900/50 border-orange-500/20 backdrop-blur-sm hover:bg-gray-900/70 hover:border-orange-500/40 transition-all duration-500 group overflow-hidden transform hover:scale-105 hover:-translate-y-3 animate-zoom-in relative card-hover-effect neon-border"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated border glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg animate-gradient-shift gradient-animated"></div>
      
      <div className="relative">
        <img
          src={movie.imageUrl}
          alt={movie.title}
          className={`w-full h-64 object-cover transition-all duration-500 ${isHovered ? 'scale-110 brightness-110 animate-breathe' : 'scale-100'}`}
        />
        
        {/* Floating particles on hover */}
        {isHovered && (
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-orange-500/60 rounded-full animate-float"
                style={{
                  left: `${10 + i * 10}%`,
                  top: `${20 + (i % 3) * 20}%`,
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: `${2 + Math.random()}s`
                }}
              ></div>
            ))}
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 animate-fade-in">
          <div className="absolute bottom-4 left-4 right-4 animate-slide-in-up">
            <div className="grid grid-cols-3 gap-2">
              <Button
                size="sm"
                asChild
                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white col-span-3 transform hover:scale-110 transition-all duration-300 animate-elastic-bounce shadow-lg hover:shadow-orange-500/50"
              >
                <Link to={`/watch/${movie.id}`}>
                  <Play className="w-4 h-4 mr-1 animate-spin" />
                  <span className="animate-pulse">Watch</span>
                </Link>
              </Button>
              {currentUser && (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={toggleFavorite}
                    className={`border-orange-500/30 text-orange-400 hover:bg-orange-500/20 col-span-2 transform hover:scale-110 transition-all duration-300 ${
                      MovieService.isFavorite(movie.id, currentUser.id) ? 'animate-heartbeat' : 'animate-float'
                    }`}
                    aria-label={MovieService.isFavorite(movie.id, currentUser.id) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Heart
                      className={`w-4 h-4 mr-1 transition-all duration-300 ${
                        MovieService.isFavorite(movie.id, currentUser.id) ? 'fill-current animate-pulse' : 'hover:animate-wiggle'
                      }`}
                    />
                    <span className="text-xs animate-glow">Fav</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={toggleWatchLater}
                    className={`border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20 transform hover:scale-110 transition-all duration-300 ${
                      MovieService.isInWatchLater(movie.id, currentUser.id) ? 'animate-pulse' : 'animate-breathe'
                    }`}
                    aria-label={MovieService.isInWatchLater(movie.id, currentUser.id) ? 'Remove from watch later' : 'Add to watch later'}
                  >
                    <Clock className="w-4 h-4 hover:animate-spin transition-all duration-300" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <CardHeader className="pb-2 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <CardTitle className="text-white text-lg line-clamp-1 group-hover:text-orange-400 transition-all duration-500 relative z-10 animate-glow group-hover:animate-neon-flicker">
          {movie.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-0 relative">
        <div className="flex items-center justify-between text-sm text-gray-400 mb-2 animate-slide-in-left">
          <span className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 text-orange-400 px-2 py-1 rounded-full text-xs border border-orange-500/30 animate-shimmer shimmer-bg group-hover:animate-pulse">
            {movie.type}
          </span>
          <span className="animate-float">{movie.releaseYear}</span>
        </div>
        <div className="flex items-center justify-between mb-2 animate-slide-in-right">
          <div className="flex items-center space-x-1 group-hover:animate-bounce">
            <Star className="w-4 h-4 text-yellow-400 fill-current animate-spin hover:animate-wiggle" />
            <span className="text-white text-sm font-medium animate-pulse">{movie.rating}</span>
            <span className="text-gray-500 text-xs animate-fade-in">({movie.totalRatings})</span>
          </div>
          <span className="text-gray-400 text-sm animate-float" style={{animationDelay: '0.3s'}}>{movie.duration}min</span>
        </div>
        <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed animate-type-writer group-hover:text-gray-300 transition-colors duration-300">{movie.description}</p>
      </CardContent>
    </Card>
  );
}