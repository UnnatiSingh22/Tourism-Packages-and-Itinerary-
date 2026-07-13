import React from 'react';
import { Bed, Utensils, MapPin } from 'lucide-react';

export function ResourceStatusCard() {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 relative">
      <h3 className="text-sm font-semibold text-gray-800 mb-6">Resource Status</h3>
      
      <div className="space-y-6 mb-8">
        {/* Accommodations */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-[#E65A4B]">
              <Bed className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Accommodations</p>
              <p className="text-xs text-gray-500">Brunton Boatyard Hotel</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full">
            Ready
          </span>
        </div>

        {/* Dining Suppliers */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Dining Suppliers</p>
              <p className="text-xs text-gray-500">4/6 Partners Confirmed</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-yellow-100/60 text-yellow-700 text-xs font-bold rounded-full text-center leading-tight">
            Action<br/>Needed
          </span>
        </div>
      </div>

      {/* Progress */}
      <div>
        <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2 relative">
          <div className="bg-[#E65A4B] h-1.5 rounded-full" style={{ width: '75%' }}></div>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-[10px] text-gray-400 font-medium italic">Next checkpoint: 24h before arrival</p>
          <span className="text-xs font-bold text-gray-700">75%</span>
        </div>
      </div>

      {/* Floating Map Pin Action */}
      <button className="absolute -right-3 bottom-12 w-12 h-12 bg-gradient-to-r from-[#E65A4B] to-[#F17361] rounded-full shadow-lg flex items-center justify-center text-white hover:scale-105 transition-transform">
        <MapPin className="w-5 h-5" />
        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-white rounded-full flex items-center justify-center">
          <span className="w-1.5 h-1.5 bg-[#E65A4B] rounded-full"></span>
        </span>
      </button>
    </div>
  );
}
