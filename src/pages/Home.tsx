import { useState, useEffect } from 'react';
import { Movie } from '@/types';
import { MovieService } from '@/lib/movies';
import MovieCard from '@/components/MovieCard';
import { Button } from '@/components/ui/button';
import { Play, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const allMovies = MovieService.getMovies();
    setMovies(allMovies);
    if (allMovies.length > 0) {
      setFeaturedMovie(allMovies[0]);
    }
  }, []);

  const popularMovies = movies.slice(0, 6);
  const recentMovies = movies.slice().reverse().slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-950 page-transition">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-orange-500/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      {/* Hero Section */}
      {featuredMovie && (
        <div className="relative h-96 md:h-[600px] overflow-hidden animate-blur-in">
          <img
            src={featuredMovie.imageUrl}
            alt={featuredMovie.title}
            className="w-full h-full object-cover animate-zoom-in transform hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent animate-fade-in" />
          
          {/* Animated overlay effects */}
          <div className="absolute inset-0 bg-gradient-to-t from-orange-900/20 via-transparent to-transparent animate-pulse"></div>
          
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl animate-slide-bounce">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-glow text-glow">
                  {featuredMovie.title}
                </h1>
                <p className="text-lg md:text-xl text-gray-200 mb-6 line-clamp-3 animate-type-writer">
                  {featuredMovie.description}
                </p>
                <div className="flex items-center space-x-4 mb-6 animate-slide-in-left">
                  <span className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-3 py-1 rounded text-sm animate-pulse gradient-animated">
                    {featuredMovie.type}
                  </span>
                  <span className="text-gray-300 animate-float">{featuredMovie.releaseYear}</span>
                  <span className="text-gray-300 animate-float" style={{animationDelay: '0.5s'}}>{featuredMovie.duration}min</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 animate-slide-in-up">
                  <Button asChild size="lg" className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 transform hover:scale-110 transition-all duration-500 animate-heartbeat shadow-lg hover:shadow-orange-500/50">
                    <Link to={`/watch/${featuredMovie.id}`}>
                      <Play className="w-5 h-5 mr-2 animate-spin" />
                      Watch Now
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-gray-600 text-white hover:bg-gray-800 transform hover:scale-105 transition-all duration-500 neon-border animate-breathe">
                    <Link to={`/movie/${featuredMovie.id}`}>
                      More Info
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Popular Movies Section */}
      <section className="py-12 relative z-10 animate-fade-in-up scroll-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8 animate-slide-in-left">
            <TrendingUp className="w-6 h-6 text-orange-500 mr-3 animate-spin" />
            <h2 className="text-2xl md:text-3xl font-bold text-white animate-glow text-glow">Popular Movies</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {popularMovies.map((movie, index) => (
              <div 
                key={movie.id} 
                className="animate-zoom-in card-hover-effect"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Additions Section */}
      <section className="py-12 bg-gray-900/50 relative animate-slide-in-up scroll-fade-in">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 bg-orange-500/5 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-yellow-500/5 rounded-full animate-bounce"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 animate-slide-in-right text-rainbow">Recently Added</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {recentMovies.map((movie, index) => (
              <div 
                key={movie.id} 
                className="animate-slide-bounce card-hover-effect"
                style={{animationDelay: `${index * 0.15}s`}}
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse All Section */}
      <section className="py-12 relative animate-blur-in scroll-fade-in">
        {/* Animated matrix-style background */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-20 bg-gradient-to-b from-orange-500 to-transparent animate-matrix-rain"
              style={{
                left: `${i * 10}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: '3s'
              }}
            ></div>
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 animate-elastic-bounce text-glow">
            Discover More Content
          </h2>
          <p className="text-gray-400 mb-8 animate-type-writer">
            Explore our full collection of movies and series
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
            <Button asChild size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800 transform hover:scale-110 transition-all duration-500 neon-border animate-breathe group">
              <Link to="/movies">
                <span className="group-hover:animate-wiggle">🎬 Browse Movies</span>
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800 transform hover:scale-110 transition-all duration-500 neon-border animate-float group">
              <Link to="/series">
                <span className="group-hover:animate-wiggle">📺 Browse Series</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}