import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Movie } from '@/types';
import { MovieService } from '@/lib/movies';
import MovieCard from '@/components/MovieCard';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState<Movie[]>([]);

  useEffect(() => {
    if (query) {
      const allMovies = MovieService.getMovies();
      const results = allMovies.filter(movie =>
        movie.title.toLowerCase().includes(query.toLowerCase()) ||
        movie.description.toLowerCase().includes(query.toLowerCase()) ||
        movie.genre.some(g => g.toLowerCase().includes(query.toLowerCase()))
      );
      setSearchResults(results);
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-white mb-4">Search Results</h1>
        <p className="text-gray-400 mb-8">
          {query ? `Results for "${query}"` : 'Enter a search term'}
        </p>
        
        {searchResults.length > 0 ? (
          <>
            <p className="text-gray-400 mb-6">Found {searchResults.length} results</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {searchResults.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </>
        ) : query ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No results found for "{query}"</p>
            <p className="text-gray-500">Try different keywords or browse our categories</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}