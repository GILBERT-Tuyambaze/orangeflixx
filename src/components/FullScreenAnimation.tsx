import { useEffect, useState } from 'react';

export default function FullScreenAnimation() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-orange-400/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-full blur-3xl animate-pulse" 
           style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse" 
           style={{ animationDuration: '5s', animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-orange-400/5 to-yellow-400/5 rounded-full blur-2xl animate-pulse" 
           style={{ animationDuration: '6s', animationDelay: '1s' }} />

      {/* Moving lines */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent animate-pulse" 
             style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent animate-pulse" 
             style={{ animationDuration: '4s', animationDelay: '1.5s' }} />
        <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-orange-500/20 to-transparent animate-pulse" 
             style={{ animationDuration: '5s', animationDelay: '0.5s' }} />
        <div className="absolute right-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-yellow-500/20 to-transparent animate-pulse" 
             style={{ animationDuration: '3.5s', animationDelay: '2s' }} />
      </div>

      {/* Rotating elements */}
      <div className="absolute top-1/3 right-1/3">
        <div className="w-32 h-32 border border-orange-500/10 rounded-full animate-spin" 
             style={{ animationDuration: '20s' }}>
          <div className="w-16 h-16 border border-yellow-500/20 rounded-full m-8 animate-spin" 
               style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
        </div>
      </div>

      <div className="absolute bottom-1/3 left-1/3">
        <div className="w-24 h-24 border border-yellow-500/10 rounded-full animate-spin" 
             style={{ animationDuration: '25s', animationDirection: 'reverse' }}>
          <div className="w-12 h-12 border border-orange-500/20 rounded-full m-6 animate-spin" 
               style={{ animationDuration: '18s' }} />
        </div>
      </div>

      {/* Floating shapes */}
      <div className="absolute top-1/5 left-1/5 w-8 h-8 bg-gradient-to-br from-orange-400/10 to-yellow-400/10 transform rotate-45 animate-bounce" 
           style={{ animationDuration: '3s', animationDelay: '1s' }} />
      <div className="absolute bottom-1/5 right-1/5 w-6 h-6 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 rounded-full animate-bounce" 
           style={{ animationDuration: '4s', animationDelay: '2s' }} />
      <div className="absolute top-2/3 left-1/6 w-4 h-4 bg-gradient-to-br from-orange-500/15 to-yellow-500/15 transform rotate-12 animate-pulse" 
           style={{ animationDuration: '2s' }} />

      {/* Wavy animations */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
          <path
            d="M0 400 Q300 200 600 400 T1200 400"
            stroke="url(#gradient1)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M0 500 Q400 300 800 500 T1200 500"
            stroke="url(#gradient2)"
            strokeWidth="1"
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '1s' }}
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0" />
              <stop offset="50%" stopColor="#f97316" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#eab308" stopOpacity="0" />
              <stop offset="50%" stopColor="#eab308" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#eab308" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}