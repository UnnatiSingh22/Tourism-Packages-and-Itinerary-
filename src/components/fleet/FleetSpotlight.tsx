import React from 'react';

interface FleetSpotlightProps {
  onReview?: () => void;
  onViewSpecs?: () => void;
}

export function FleetSpotlight({ onReview, onViewSpecs }: FleetSpotlightProps) {
  return (
    <div className="mt-8 relative rounded-3xl overflow-hidden bg-gray-900 h-[280px]">
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center"
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
      
      <div className="relative z-10 p-10 h-full flex flex-col justify-center max-w-2xl">
        <div className="mb-4">
          <span className="px-3 py-1 bg-white/10 backdrop-blur border border-white/20 text-white text-[10px] font-bold tracking-widest uppercase rounded-md">
            Fleet Spotlight
          </span>
        </div>
        
        <h2 className="text-3xl font-extrabold text-white mb-3 tracking-tight">
          Master Elite Limo 05 -<br/>Maintenance Success
        </h2>
        
        <p className="text-sm text-gray-300 leading-relaxed mb-8 max-w-lg">
          Successfully completed its 50,000-mile inspection cycle with zero critical failures. The vehicle is certified for the upcoming Global VIP Summit.
        </p>

        <div className="flex items-center gap-4">
          <button 
            onClick={onReview}
            className="px-6 py-2.5 bg-white text-gray-900 rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors shadow-sm"
          >
            Review Logs
          </button>
          <button 
            onClick={onViewSpecs}
            className="px-6 py-2.5 bg-transparent border border-white/30 text-white rounded-xl text-sm font-bold hover:bg-white/10 transition-colors"
          >
            Vehicle Specs
          </button>
        </div>
      </div>
    </div>
  );
}
