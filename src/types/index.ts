export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  createdAt: string;
}

export interface Movie {
  id: string;
  title: string;
  description: string;
  type: string;
  genre: string[];
  releaseYear: number;
  duration: number; // in minutes
  imageUrl: string;
  videoUrl: string;
  rating: number;
  totalRatings: number;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  movieId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Favorite {
  id: string;
  movieId: string;
  userId: string;
  createdAt: string;
}

export interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}