import { useState, useEffect } from 'react';
import { Movie } from '@/types';
import { MovieService } from '@/lib/movies';
import MovieCard from '@/components/MovieCard';

export default function Series() {
  const [series, setSeries] = useState<Movie[]>([]);

  useEffect(() => {
    const allMovies = MovieService.getMovies();
    const seriesOnly = allMovies.filter(movie => movie.type.toLowerCase() === 'series');
    setSeries(seriesOnly);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">TV Series</h1>
        
        {series.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {series.map((show) => (
              <MovieCard key={show.id} movie={show} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No TV series available</p>
          </div>
        )}
      </div>
    </div>
  );
}