import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

export function LocationMapCard() {
  return (
    <div className="bg-white rounded-[24px] shadow-card p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-bold text-gray-900">Location Map</h3>
        <button className="text-[10px] font-bold text-[#E65A4B] uppercase tracking-widest hover:text-red-700 transition-colors">Expand</button>
      </div>

      <div className="w-full h-40 rounded-xl overflow-hidden mb-6 bg-orange-50 relative">
        <img 
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800" 
          alt="Map overview" 
          className="w-full h-full object-cover opacity-60 mix-blend-multiply"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Mock pins */}
          <div className="w-4 h-4 bg-[#E65A4B] rounded-full absolute top-10 left-16 border-2 border-white shadow-sm flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>
          <div className="w-4 h-4 bg-gray-800 rounded-full absolute bottom-12 right-20 border-2 border-white shadow-sm flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>
          <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
             <path d="M 72 48 Q 150 70 240 100" fill="none" stroke="#E65A4B" strokeWidth="2" strokeDasharray="4 4" className="opacity-80" />
          </svg>
        </div>
      </div>

      <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Key Distances</h4>
      
      <div className="space-y-5">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-gray-50 rounded-lg text-gray-500">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">Hotel to Louvre</p>
            <p className="text-xs text-gray-500 font-medium mt-0.5">0.8 km • 12 min walk</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 bg-gray-50 rounded-lg text-gray-500">
            <Navigation className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">Louvre to Restaurant</p>
            <p className="text-xs text-gray-500 font-medium mt-0.5">1.2 km • 8 min drive</p>
          </div>
        </div>
      </div>
    </div>
  );
}
