import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Heart, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Movie } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { MovieService } from '@/lib/movies';
import { toast } from 'sonner';

interface HeroSliderProps {
  movies: Movie[];
}

export default function HeroSlider({ movies }: HeroSliderProps) {
  const { currentUser } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (movies.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % movies.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [movies.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % movies.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + movies.length) % movies.length);
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

  const currentMovie = movies[currentSlide];

  return (
    <div className="relative h-[70vh] overflow-hidden rounded-2xl mb-12 group">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out transform scale-105"
        style={{ 
          backgroundImage: `url(${currentMovie.imageUrl})`,
          filter: 'brightness(0.3)',
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-2xl animate-in fade-in slide-in-from-bottom duration-700">
            <div className="flex items-center space-x-2 mb-4">
              <span className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Featured
              </span>
              <span className="text-orange-400 font-medium">{currentMovie.type}</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {currentMovie.title}
            </h1>
            
            <p className="text-xl text-gray-200 mb-8 leading-relaxed line-clamp-3">
              {currentMovie.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-4 mb-8 text-gray-300">
              <div className="flex items-center space-x-1">
                <span className="text-yellow-400 text-lg">★</span>
                <span className="font-semibold">{currentMovie.rating}</span>
                <span>({currentMovie.totalRatings} reviews)</span>
              </div>
              <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
              <span>{currentMovie.releaseYear}</span>
              <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
              <span>{currentMovie.duration}min</span>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-8 py-3 text-lg font-semibold shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105"
              >
                <Link to={`/watch/${currentMovie.id}`}>
                  <Play className="w-5 h-5 mr-2" />
                  Watch Now
                </Link>
              </Button>
              
              {currentUser && (
                <>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => addToFavorites(currentMovie.id)}
                    className="border-orange-500/30 text-orange-400 hover:bg-orange-500/20 px-6 backdrop-blur-sm"
                  >
                    <Heart className={`w-5 h-5 mr-2 ${MovieService.isFavorite(currentMovie.id, currentUser.id) ? 'fill-current' : ''}`} />
                    {MovieService.isFavorite(currentMovie.id, currentUser.id) ? 'Favorited' : 'Add to Favorites'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => addToWatchLater(currentMovie.id)}
                    className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20 px-6 backdrop-blur-sm"
                  >
                    <Clock className="w-5 h-5 mr-2" />
                    Watch Later
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-orange-500 scale-125' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}