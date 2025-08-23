import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Movie } from '@/types';
import { MovieService } from '@/lib/movies';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { toast } from 'sonner';

export default function Admin() {
  const { currentUser } = useAuth();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'Movie',
    genre: '',
    releaseYear: new Date().getFullYear(),
    duration: 0,
    imageUrl: '',
    videoUrl: ''
  });

  useEffect(() => {
    const allMovies = MovieService.getMovies();
    setMovies(allMovies);
  }, []);

  if (!currentUser?.isAdmin) {
    return <Navigate to="/login" replace />;
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      type: 'Movie',
      genre: '',
      releaseYear: new Date().getFullYear(),
      duration: 0,
      imageUrl: '',
      videoUrl: ''
    });
    setShowAddForm(false);
    setEditingMovie(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.genre) {
      toast.error('Please fill in all required fields');
      return;
    }

    const genreArray = formData.genre.split(',').map(g => g.trim()).filter(g => g);
    
    if (editingMovie) {
      const updatedMovie = MovieService.updateMovie(editingMovie.id, {
        ...formData,
        genre: genreArray,
        rating: editingMovie.rating,
        totalRatings: editingMovie.totalRatings
      });
      
      if (updatedMovie) {
        setMovies(movies.map(m => m.id === editingMovie.id ? updatedMovie : m));
        toast.success('Movie updated successfully!');
      }
    } else {
      const newMovie = MovieService.addMovie({
        ...formData,
        genre: genreArray,
        rating: 0,
        totalRatings: 0
      });
      
      setMovies([...movies, newMovie]);
      toast.success('Movie added successfully!');
    }
    
    resetForm();
  };

  const handleEdit = (movie: Movie) => {
    setFormData({
      title: movie.title,
      description: movie.description,
      type: movie.type,
      genre: movie.genre.join(', '),
      releaseYear: movie.releaseYear,
      duration: movie.duration,
      imageUrl: movie.imageUrl,
      videoUrl: movie.videoUrl
    });
    setEditingMovie(movie);
    setShowAddForm(true);
  };

  const handleDelete = (movieId: string) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      const success = MovieService.deleteMovie(movieId);
      if (success) {
        setMovies(movies.filter(m => m.id !== movieId));
        toast.success('Movie deleted successfully!');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-orange-500 hover:bg-orange-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Movie/Series
          </Button>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <Card className="bg-gray-900 border-gray-800 mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">
                  {editingMovie ? 'Edit Movie/Series' : 'Add New Movie/Series'}
                </CardTitle>
                <Button variant="ghost" onClick={resetForm} className="text-gray-400 hover:text-white">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-white">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="bg-gray-800 border-gray-700 text-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type" className="text-white">Type</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="Movie">Movie</SelectItem>
                        <SelectItem value="Series">Series</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="releaseYear" className="text-white">Release Year</Label>
                    <Input
                      id="releaseYear"
                      type="number"
                      value={formData.releaseYear}
                      onChange={(e) => setFormData({ ...formData, releaseYear: parseInt(e.target.value) })}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration" className="text-white">Duration (minutes)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="genre" className="text-white">Genres (comma-separated) *</Label>
                    <Input
                      id="genre"
                      value={formData.genre}
                      onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="Action, Drama, Comedy"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="imageUrl" className="text-white">Image URL</Label>
                    <Input
                      id="imageUrl"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="/images/ImageUpload.jpg"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="videoUrl" className="text-white">Video URL</Label>
                  <Input
                    id="videoUrl"
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="https://example.com/video.mp4"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-white">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    rows={4}
                    required
                  />
                </div>
                <div className="flex gap-4">
                  <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                    <Save className="w-4 h-4 mr-2" />
                    {editingMovie ? 'Update' : 'Add'} Movie
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm} className="border-gray-600 text-white hover:bg-gray-800">
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Movies List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Manage Movies & Series ({movies.length})</h2>
          <div className="grid gap-4">
            {movies.map((movie) => (
              <Card key={movie.id} className="bg-gray-900 border-gray-800">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={movie.imageUrl}
                      alt={movie.title}
                      className="w-24 h-36 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-white font-semibold text-lg">{movie.title}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary">{movie.type}</Badge>
                            <span className="text-gray-400 text-sm">{movie.releaseYear}</span>
                            <span className="text-gray-400 text-sm">{movie.duration}min</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(movie)}
                            className="border-gray-600 text-white hover:bg-gray-800"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(movie.id)}
                            className="border-red-600 text-red-400 hover:bg-red-900/20"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm mb-3 line-clamp-2">{movie.description}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {movie.genre.map((genre) => (
                          <span
                            key={genre}
                            className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>Rating: {movie.rating}/5</span>
                        <span>Reviews: {movie.totalRatings}</span>
                        <span>Added: {new Date(movie.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {movies.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No movies added yet</p>
              <p className="text-gray-500">Click "Add Movie/Series" to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}