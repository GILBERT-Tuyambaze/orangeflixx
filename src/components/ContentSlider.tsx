import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Play, Heart, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Movie } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { MovieService } from '@/lib/movies';
import { toast } from 'sonner';

interface ContentSliderProps {
  title: string;
  movies: Movie[];
  subtitle?: string;
}

export default function ContentSlider({ title, movies, subtitle }: ContentSliderProps) {
  const { currentUser } = useAuth();
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      setScrollPosition(scrollLeft);
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < maxScroll - 10);
    };

    container.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => container.removeEventListener('scroll', handleScroll);
  }, [movies]);

  const scroll = (direction: 'left' | 'right') => {
    const container = containerRef.current;
    if (!container) return;

    const cardWidth = 300; // Approximate card width
    const scrollAmount = cardWidth * 3; // Scroll 3 cards at a time
    const newPosition = direction === 'left' 
      ? Math.max(0, scrollPosition - scrollAmount)
      : scrollPosition + scrollAmount;

    container.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
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

  if (movies.length === 0) return null;

  return (
    <div className="mb-12 group">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
          {subtitle && (
            <p className="text-gray-400 text-lg">{subtitle}</p>
          )}
        </div>
        
        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="outline"
            size="sm"
            onClick={() => scroll('left')}
            disabled={!showLeftArrow}
            className="border-orange-500/30 text-orange-400 hover:bg-orange-500/20 disabled:opacity-30"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => scroll('right')}
            disabled={!showRightArrow}
            className="border-orange-500/30 text-orange-400 hover:bg-orange-500/20 disabled:opacity-30"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div 
        ref={containerRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {movies.map((movie) => (
          <Card 
            key={movie.id} 
            className="flex-shrink-0 w-72 bg-gray-900/50 border-orange-500/20 backdrop-blur-sm hover:bg-gray-900/70 hover:border-orange-500/40 transition-all duration-300 group/card overflow-hidden transform hover:scale-105"
          >
            <div className="relative">
              <img
                src={movie.imageUrl}
                alt={movie.title}
                className="w-full h-40 object-cover group-hover/card:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="grid grid-cols-3 gap-1">
                    <Button
                      size="sm"
                      asChild
                      className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white col-span-3 text-xs"
                    >
                      <Link to={`/watch/${movie.id}`}>
                        <Play className="w-3 h-3 mr-1" />
                        Watch
                      </Link>
                    </Button>
                    {currentUser && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addToFavorites(movie.id)}
                          className="border-orange-500/30 text-orange-400 hover:bg-orange-500/20 col-span-2 text-xs"
                        >
                          <Heart className={`w-3 h-3 ${MovieService.isFavorite(movie.id, currentUser.id) ? 'fill-current' : ''}`} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addToWatchLater(movie.id)}
                          className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20 text-xs"
                        >
                          <Clock className="w-3 h-3" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-base line-clamp-1 group-hover/card:text-orange-400 transition-colors duration-300">
                {movie.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                <span className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 text-orange-400 px-2 py-1 rounded-full text-xs border border-orange-500/30">
                  {movie.type}
                </span>
                <span>{movie.releaseYear}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-white text-sm font-medium">{movie.rating}</span>
                </div>
                <span className="text-gray-400 text-sm">{movie.duration}min</span>
              </div>
              <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">{movie.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}