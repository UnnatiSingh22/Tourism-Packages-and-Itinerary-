import React from 'react';

export function GuestSatisfaction() {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 h-full flex flex-col justify-between">
      <h2 className="text-lg font-bold text-gray-900 mb-8">Guest Satisfaction by Trip</h2>
      
      <div className="flex flex-col sm:flex-row items-center gap-8 mb-8">
        {/* Donut Chart Mock */}
        <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="64" cy="64" r="56" stroke="#f3f4f6" strokeWidth="12" fill="none" />
            <circle cx="64" cy="64" r="56" stroke="#111827" strokeWidth="12" fill="none" strokeDasharray="351.8" strokeDashoffset="35.18" strokeLinecap="round" />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-3xl font-extrabold text-gray-900 leading-none">90%</span>
            <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mt-1">Overall</span>
          </div>
        </div>

        {/* Breakdown Bars */}
        <div className="flex-1 w-full space-y-4">
          <div>
            <div className="flex justify-between items-end mb-1.5">
              <span className="text-xs font-bold text-gray-700">Punctuality</span>
              <span className="text-xs font-bold text-gray-900">96%</span>
            </div>
            <div className="w-full bg-gray-100 h-1.5 rounded-full">
              <div className="bg-gray-900 h-1.5 rounded-full" style={{ width: '96%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-end mb-1.5">
              <span className="text-xs font-bold text-gray-700">Vehicle Cleanliness</span>
              <span className="text-xs font-bold text-gray-900">92%</span>
            </div>
            <div className="w-full bg-gray-100 h-1.5 rounded-full">
              <div className="bg-gray-900 h-1.5 rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-end mb-1.5">
              <span className="text-xs font-bold text-gray-700">Driver Professionalism</span>
              <span className="text-xs font-bold text-gray-900">88%</span>
            </div>
            <div className="w-full bg-gray-100 h-1.5 rounded-full">
              <div className="bg-orange-300 h-1.5 rounded-full" style={{ width: '88%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-end mb-1.5">
              <span className="text-xs font-bold text-gray-700">Ride Comfort</span>
              <span className="text-xs font-bold text-gray-900">84%</span>
            </div>
            <div className="w-full bg-gray-100 h-1.5 rounded-full">
              <div className="bg-orange-300 h-1.5 rounded-full" style={{ width: '84%' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 mt-auto">
        <p className="text-[11px] text-gray-500 italic leading-relaxed">
          "The airport transfer was seamless. The driver held a sign clearly and the vehicle was pristine. Highly professional service that matches our hotel standard."
          <span className="block mt-2 font-bold text-gray-700 not-italic">— VIP Guest, Suite 402</span>
        </p>
      </div>
    </div>
  );
}
