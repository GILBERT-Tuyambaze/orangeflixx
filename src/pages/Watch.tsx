import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Movie, Review } from '@/types';
import { MovieService } from '@/lib/movies';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, Heart, ArrowLeft, Clock, Calendar } from 'lucide-react';
import { toast } from 'sonner';

export default function Watch() {
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useAuth();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState<string>('5');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (id) {
      const foundMovie = MovieService.getMovies().find(m => m.id === id);
      setMovie(foundMovie || null);
      
      if (foundMovie) {
        const movieReviews = MovieService.getReviews(id);
        setReviews(movieReviews);
        
        if (currentUser) {
          setIsFavorite(MovieService.isFavorite(id, currentUser.id));
        }
      }
    }
  }, [id, currentUser]);

  const handleFavoriteToggle = () => {
    if (!currentUser || !movie) {
      toast.error('Please login to add favorites');
      return;
    }

    if (isFavorite) {
      MovieService.removeFromFavorites(movie.id, currentUser.id);
      setIsFavorite(false);
      toast.success('Removed from favorites');
    } else {
      MovieService.addToFavorites(movie.id, currentUser.id);
      setIsFavorite(true);
      toast.success('Added to favorites');
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !movie) {
      toast.error('Please login to leave a review');
      return;
    }

    if (!newReview.trim()) {
      toast.error('Please write a review');
      return;
    }

    const review = MovieService.addReview({
      movieId: movie.id,
      userId: currentUser.id,
      userName: currentUser.name,
      rating: parseInt(newRating),
      comment: newReview
    });

    setReviews([review, ...reviews]);
    setNewReview('');
    setNewRating('5');
    toast.success('Review added successfully!');

    // Update movie rating
    const updatedMovie = MovieService.getMovies().find(m => m.id === movie.id);
    if (updatedMovie) {
      setMovie(updatedMovie);
    }
  };

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-white text-lg">Movie not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Button variant="ghost" asChild className="text-white hover:bg-gray-800">
          <Link to="/movies">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Movies
          </Link>
        </Button>
      </div>

      {/* Video Player */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="aspect-video bg-black rounded-lg overflow-hidden mb-8">
          <video
            controls
            className="w-full h-full"
            poster={movie.imageUrl}
          >
            <source src={movie.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Movie Info */}
          <div className="lg:col-span-2">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{movie.title}</h1>
                <div className="flex items-center space-x-4 text-gray-400 mb-4">
                  <span className="bg-orange-500 text-white px-2 py-1 rounded text-sm">
                    {movie.type}
                  </span>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {movie.releaseYear}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {movie.duration}min
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-current text-yellow-400" />
                    {movie.rating} ({movie.totalRatings} reviews)
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                onClick={handleFavoriteToggle}
                className={`${
                  isFavorite ? 'text-red-500 hover:text-red-400' : 'text-white hover:text-red-400'
                }`}
              >
                <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
              </Button>
            </div>

            <p className="text-gray-300 text-lg mb-6">{movie.description}</p>

            <div className="flex flex-wrap gap-2 mb-8">
              {movie.genre.map((genre) => (
                <span
                  key={genre}
                  className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Reviews Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Reviews ({reviews.length})</h2>

              {/* Add Review Form */}
              {currentUser && (
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Write a Review</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmitReview} className="space-y-4">
                      <div>
                        <label className="text-white block mb-2">Rating</label>
                        <Select value={newRating} onValueChange={setNewRating}>
                          <SelectTrigger className="w-32 bg-gray-800 border-gray-700 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            {[1, 2, 3, 4, 5].map(rating => (
                              <SelectItem key={rating} value={rating.toString()}>
                                {rating} Star{rating !== 1 ? 's' : ''}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Textarea
                        placeholder="Write your review..."
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                        rows={4}
                      />
                      <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                        Submit Review
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id} className="bg-gray-900 border-gray-800">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-white font-semibold">{review.userName}</h4>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-600'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-gray-400 text-sm">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-300">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {reviews.length === 0 && (
                <p className="text-gray-400 text-center py-8">
                  No reviews yet. Be the first to review this {movie.type.toLowerCase()}!
                </p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Movie Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Type:</span>
                  <span className="text-white">{movie.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Release Year:</span>
                  <span className="text-white">{movie.releaseYear}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Duration:</span>
                  <span className="text-white">{movie.duration} min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Rating:</span>
                  <span className="text-white">{movie.rating}/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Reviews:</span>
                  <span className="text-white">{movie.totalRatings}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}