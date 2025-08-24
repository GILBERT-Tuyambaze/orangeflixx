import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const footerElement = document.getElementById('footer');
    if (footerElement) {
      observer.observe(footerElement);
    }

    return () => {
      if (footerElement) {
        observer.unobserve(footerElement);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer id="footer" className="bg-gradient-to-r from-black via-gray-900 to-black text-white mt-16 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-500/10 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-10 w-32 h-32 bg-orange-400/5 rounded-full animate-bounce"></div>
        <div className="absolute bottom-10 left-1/4 w-24 h-24 bg-orange-600/8 rounded-full animate-spin"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-orange-300/6 rounded-full animate-ping"></div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-orange-500/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute top-4 right-4 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:rotate-180 animate-bounce"
      >
        <ChevronUp size={20} />
      </button>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
          {/* Brand Section */}
          <div className="space-y-4 animate-slide-in-left">
            <div className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center transform group-hover:rotate-360 transition-transform duration-1000 animate-pulse">
                <span className="text-white font-bold text-sm">OF</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent animate-glow">OrangeFlix</span>
            </div>
            <p className="text-gray-300 text-sm animate-type-writer">
              Your ultimate destination for movies and TV series. Stream the latest content with the best viewing experience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-orange-500 transition-all duration-300 transform hover:scale-125 hover:rotate-12 animate-float">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-orange-500 transition-all duration-300 transform hover:scale-125 hover:-rotate-12 animate-float" style={{animationDelay: '0.5s'}}>
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-orange-500 transition-all duration-300 transform hover:scale-125 hover:rotate-12 animate-float" style={{animationDelay: '1s'}}>
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-orange-500 transition-all duration-300 transform hover:scale-125 hover:-rotate-12 animate-float" style={{animationDelay: '1.5s'}}>
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4 animate-slide-in-up" style={{animationDelay: '0.2s'}}>
            <h3 className="text-lg font-semibold text-orange-500 animate-pulse">Browse</h3>
            <ul className="space-y-2">
              <li className="transform hover:translate-x-2 transition-all duration-300">
                <Link to="/movies" className="text-gray-300 hover:text-white hover:bg-orange-500/10 px-2 py-1 rounded transition-all duration-300 text-sm flex items-center group">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">🎬</span>
                  Movies
                </Link>
              </li>
              <li className="transform hover:translate-x-2 transition-all duration-300">
                <Link to="/series" className="text-gray-300 hover:text-white hover:bg-orange-500/10 px-2 py-1 rounded transition-all duration-300 text-sm flex items-center group">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">📺</span>
                  TV Series
                </Link>
              </li>
              <li className="transform hover:translate-x-2 transition-all duration-300">
                <Link to="/trending" className="text-gray-300 hover:text-white hover:bg-orange-500/10 px-2 py-1 rounded transition-all duration-300 text-sm flex items-center group">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">🔥</span>
                  Trending
                </Link>
              </li>
              <li className="transform hover:translate-x-2 transition-all duration-300">
                <Link to="/new" className="text-gray-300 hover:text-white hover:bg-orange-500/10 px-2 py-1 rounded transition-all duration-300 text-sm flex items-center group">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">✨</span>
                  New Releases
                </Link>
              </li>
              <li className="transform hover:translate-x-2 transition-all duration-300">
                <Link to="/favorites" className="text-gray-300 hover:text-white hover:bg-orange-500/10 px-2 py-1 rounded transition-all duration-300 text-sm flex items-center group">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">❤️</span>
                  My Favorites
                </Link>
              </li>
              <li className="transform hover:translate-x-2 transition-all duration-300">
                <Link to="/watchlater" className="text-gray-300 hover:text-white hover:bg-orange-500/10 px-2 py-1 rounded transition-all duration-300 text-sm flex items-center group">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">🕐</span>
                  Watch Later
                </Link>
              </li>
            </ul>
          </div>

          {/* Account Links */}
          <div className="space-y-4 animate-slide-in-up" style={{animationDelay: '0.4s'}}>
            <h3 className="text-lg font-semibold text-orange-500 animate-bounce">Account</h3>
            <ul className="space-y-2">
              <li className="transform hover:scale-105 transition-all duration-300">
                <Link to="/profile" className="text-gray-300 hover:text-white hover:shadow-lg hover:shadow-orange-500/20 px-2 py-1 rounded transition-all duration-300 text-sm block">
                  👤 My Profile
                </Link>
              </li>
              <li className="transform hover:scale-105 transition-all duration-300">
                <Link to="/login" className="text-gray-300 hover:text-white hover:shadow-lg hover:shadow-orange-500/20 px-2 py-1 rounded transition-all duration-300 text-sm block">
                  🔐 Sign In
                </Link>
              </li>
              <li className="transform hover:scale-105 transition-all duration-300">
                <Link to="/register" className="text-gray-300 hover:text-white hover:shadow-lg hover:shadow-orange-500/20 px-2 py-1 rounded transition-all duration-300 text-sm block">
                  📝 Create Account
                </Link>
              </li>
              <li className="transform hover:scale-105 transition-all duration-300">
                <a href="#" className="text-gray-300 hover:text-white hover:shadow-lg hover:shadow-orange-500/20 px-2 py-1 rounded transition-all duration-300 text-sm block">
                  🆘 Help Center
                </a>
              </li>
              <li className="transform hover:scale-105 transition-all duration-300">
                <a href="#" className="text-gray-300 hover:text-white hover:shadow-lg hover:shadow-orange-500/20 px-2 py-1 rounded transition-all duration-300 text-sm block">
                  🔒 Privacy Policy
                </a>
              </li>
              <li className="transform hover:scale-105 transition-all duration-300">
                <a href="#" className="text-gray-300 hover:text-white hover:shadow-lg hover:shadow-orange-500/20 px-2 py-1 rounded transition-all duration-300 text-sm block">
                  📋 Terms of Service
                </a>
              </li>
            
            <li className="transform hover:scale-105 transition-all duration-300">
                <a href="https://gilbert-tuyambaze.vercel.app" className="text-gray-300 hover:text-white hover:shadow-lg hover:shadow-orange-500/20 px-2 py-1 rounded transition-all duration-300 text-sm block">
                  Powered by Gilbert TUYAMBAZE
                </a>
            </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 animate-slide-in-right" style={{animationDelay: '0.6s'}}>
            <h3 className="text-lg font-semibold text-orange-500 animate-glow">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 group hover:bg-orange-500/5 p-2 rounded transition-all duration-300">
                <Mail size={16} className="text-orange-500 animate-pulse group-hover:animate-bounce" />
                <span className="text-gray-300 text-sm group-hover:text-white transition-colors">support@orangeflix.com</span>
              </div>
              <div className="flex items-center space-x-2 group hover:bg-orange-500/5 p-2 rounded transition-all duration-300">
                <Phone size={16} className="text-orange-500 animate-pulse group-hover:animate-bounce" />
                <span className="text-gray-300 text-sm group-hover:text-white transition-colors">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 group hover:bg-orange-500/5 p-2 rounded transition-all duration-300">
                <MapPin size={16} className="text-orange-500 animate-pulse group-hover:animate-bounce" />
                <span className="text-gray-300 text-sm group-hover:text-white transition-colors">Los Angeles, CA</span>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-200 mb-2 animate-fade-in">Download Our App</h4>
              <div className="flex space-x-2">
                <a href="#" className="bg-gradient-to-r from-gray-800 to-gray-700 hover:from-orange-600 hover:to-orange-500 px-3 py-2 rounded text-xs transition-all duration-500 transform hover:scale-110 hover:shadow-lg animate-pulse">
                  📱 App Store
                </a>
                <a href="#" className="bg-gradient-to-r from-gray-800 to-gray-700 hover:from-orange-600 hover:to-orange-500 px-3 py-2 rounded text-xs transition-all duration-500 transform hover:scale-110 hover:shadow-lg animate-pulse" style={{animationDelay: '0.5s'}}>
                  🤖 Google Play
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm animate-type-writer">
              © {new Date().getFullYear()} OrangeFlix. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-all duration-300 transform hover:scale-110 hover:rotate-3 relative overflow-hidden group">
                <span className="relative z-10">Privacy</span>
                <span className="absolute inset-0 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-all duration-300 transform hover:scale-110 hover:-rotate-3 relative overflow-hidden group">
                <span className="relative z-10">Terms</span>
                <span className="absolute inset-0 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-all duration-300 transform hover:scale-110 hover:rotate-3 relative overflow-hidden group">
                <span className="relative z-10">Cookies</span>
                <span className="absolute inset-0 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-all duration-300 transform hover:scale-110 hover:-rotate-3 relative overflow-hidden group">
                <span className="relative z-10">Accessibility</span>
                <span className="absolute inset-0 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
