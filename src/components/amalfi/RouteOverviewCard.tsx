import React from 'react';

export function RouteOverviewCard() {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-sm font-semibold text-gray-800 mb-4">Route Overview</h3>
      
      <div className="bg-[#F8F9FA] rounded-2xl p-4 relative h-[180px] flex flex-col justify-between">
        {/* Mock Map Image / SVG Area */}
        <div className="absolute inset-0 p-6 pointer-events-none">
          <svg className="w-full h-24 overflow-visible" viewBox="0 0 200 100">
            <path 
              d="M 20 20 Q 100 -20 180 60" 
              fill="none" 
              stroke="#E65A4B" 
              strokeWidth="2" 
              strokeDasharray="5 5" 
            />
            {/* Dots */}
            <circle cx="20" cy="20" r="4" fill="#E65A4B" />
            <circle cx="180" cy="60" r="4" fill="#E65A4B" />
            
            <text x="25" y="10" fontSize="8" fill="#6B7280" fontWeight="600">Naples</text>
            <text x="185" y="50" fontSize="8" fill="#6B7280" fontWeight="600">Positano</text>
          </svg>
        </div>

        <div className="mt-auto flex justify-between items-end">
          <div>
            <p className="text-xs text-gray-400 font-medium">Total Distance</p>
            <p className="text-lg font-bold text-gray-800">74.2 km</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 font-medium">Primary Mode</p>
            <p className="text-sm font-bold text-gray-800">Private<br/>Sea/Land</p>
          </div>
        </div>
      </div>
    </div>
  );
}
