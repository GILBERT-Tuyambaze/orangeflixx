import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { Search, User, LogOut, Settings, Heart, Clock, TrendingUp, Plus, Menu, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/components/theme-toggle';
import { useState } from 'react';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const navigationLinks = [
    { to: '/', label: 'Home', icon: null },
    { to: '/movies', label: 'Movies', icon: null },
    { to: '/series', label: 'Series', icon: null },
    { to: '/trending', label: 'Trending', icon: TrendingUp },
    { to: '/new', label: 'New', icon: Plus },
  ];

  return (
    <nav className="bg-gradient-to-r from-orange-900/20 via-yellow-900/20 to-orange-900/20 backdrop-blur-md border-b border-orange-500/20 sticky top-0 z-50 transition-all duration-300 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group animate-slide-in-left">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-orange-500/25 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12 animate-breathe neon-border">
              <span className="text-white font-bold text-xl animate-heartbeat">O</span>
            </div>
            <span className="text-white text-xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent animate-glow group-hover:animate-neon-flicker">
              OrangeFlix
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 animate-slide-in-down">
            {navigationLinks.map((link, index) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-2 rounded-lg text-gray-200 hover:text-white hover:bg-orange-500/20 transition-all duration-500 flex items-center space-x-2 relative group animate-fade-in-up transform hover:scale-110 hover:rotate-2"
                style={{animationDelay: `${index * 0.1}s`}}
                aria-label={`Navigate to ${link.label}`}
              >
                {link.icon && <link.icon className="w-4 h-4 animate-float group-hover:animate-wiggle" />}
                <span className="group-hover:animate-pulse">{link.label}</span>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 animate-shimmer shimmer-bg"></div>
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 transition-opacity duration-500 animate-pulse"></div>
              </Link>
            ))}
            {currentUser?.isAdmin && (
              <Link
                to="/admin"
                className="px-4 py-2 rounded-lg text-orange-400 hover:text-orange-300 hover:bg-orange-500/20 transition-all duration-500 relative group animate-glow transform hover:scale-110"
                aria-label="Navigate to Admin panel"
              >
                <span className="animate-neon-flicker">Admin</span>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </Link>
            )}
          </div>

          {/* Desktop Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center space-x-2 animate-slide-in-up">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 w-4 h-4 animate-pulse group-focus-within:animate-spin transition-all duration-500" />
              <Input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-900/50 border-orange-500/30 text-white placeholder-orange-300/50 w-64 focus:border-orange-400 focus:ring-orange-400/20 transition-all duration-500 focus:scale-105 focus:shadow-lg focus:shadow-orange-500/25 neon-border animate-breathe"
                aria-label="Search movies and series"
              />
              <div className="absolute inset-0 rounded-md bg-gradient-to-r from-orange-500/10 to-yellow-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          </form>

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center space-x-2 animate-slide-in-right">
            <div className="animate-float">
              <ThemeToggle />
            </div>
            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-white hover:bg-orange-500/20 transition-all duration-500 transform hover:scale-105 animate-heartbeat group" aria-label="User menu">
                    <User className="w-5 h-5 mr-2 animate-pulse group-hover:animate-spin" />
                    <span className="hidden lg:inline animate-glow">{currentUser.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-gray-900/95 border-orange-500/20 backdrop-blur-sm">
                  <DropdownMenuItem asChild>
                    <Link to="/favorites" className="text-white hover:bg-orange-500/20 cursor-pointer transition-colors duration-200">
                      <Heart className="w-4 h-4 mr-2" />
                      Favorites
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/watchlater" className="text-white hover:bg-orange-500/20 cursor-pointer transition-colors duration-200">
                      <Clock className="w-4 h-4 mr-2" />
                      Watch Later
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="text-white hover:bg-orange-500/20 cursor-pointer transition-colors duration-200">
                      <Settings className="w-4 h-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-orange-500/20" />
                  <DropdownMenuItem onClick={handleLogout} className="text-white hover:bg-orange-500/20 cursor-pointer transition-colors duration-200">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild className="text-white hover:bg-orange-500/20">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white shadow-lg hover:shadow-orange-500/25 transition-all duration-300">
                  <Link to="/register">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:bg-orange-500/20 p-2"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-900/95 backdrop-blur-sm border-t border-orange-500/20 animate-in slide-in-from-top duration-300">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="px-3 py-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search movies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-800/50 border-orange-500/30 text-white placeholder-orange-300/50 focus:border-orange-400"
                    aria-label="Search movies and series"
                  />
                </div>
              </form>

              {/* Mobile Navigation Links */}
              {navigationLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-200 hover:text-white hover:bg-orange-500/20 transition-all duration-300"
                  aria-label={`Navigate to ${link.label}`}
                >
                  {link.icon && <link.icon className="w-5 h-5" />}
                  <span>{link.label}</span>
                </Link>
              ))}
              
              {currentUser?.isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-3 py-2 rounded-md text-orange-400 hover:text-orange-300 hover:bg-orange-500/20 transition-all duration-300"
                  aria-label="Navigate to Admin panel"
                >
                  <Settings className="w-5 h-5" />
                  <span>Admin</span>
                </Link>
              )}

              {/* Mobile User Menu */}
              {currentUser ? (
                <div className="border-t border-orange-500/20 mt-3 pt-3">
                  <div className="px-3 py-2 text-sm font-medium text-orange-400">
                    {currentUser?.name?.split(" ")[0]}
                  </div>
                  <Link
                    to="/favorites"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-200 hover:text-white hover:bg-orange-500/20 transition-all duration-300"
                    aria-label="View favorites"
                  >
                    <Heart className="w-5 h-5" />
                    <span>Favorites</span>
                  </Link>
                  <Link
                    to="/watchlater"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-200 hover:text-white hover:bg-orange-500/20 transition-all duration-300"
                    aria-label="View watch later list"
                  >
                    <Clock className="w-5 h-5" />
                    <span>Watch Later</span>
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-200 hover:text-white hover:bg-orange-500/20 transition-all duration-300"
                    aria-label="View profile"
                  >
                    <User className="w-5 h-5" />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-200 hover:text-white hover:bg-orange-500/20 transition-all duration-300 w-full text-left"
                    aria-label="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="border-t border-orange-500/20 mt-3 pt-3 flex flex-col space-y-2 px-3">
                  <Button variant="ghost" asChild className="text-white hover:bg-orange-500/20 justify-start">
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                  </Button>
                  <Button asChild className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 justify-start">
                    <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
