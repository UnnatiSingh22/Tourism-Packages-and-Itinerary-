import React from 'react';
import { MoreVertical, Sparkles, AlertTriangle, Filter, List, Clock } from 'lucide-react';

export function OptimizedRoutesList() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6 px-2">
        <h2 className="text-lg font-bold text-gray-900">Optimized Routes</h2>
        <div className="flex gap-2">
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"><Filter className="w-4 h-4" /></button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"><List className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2 pb-24">
        {/* Route Card 1 */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-md tracking-wider">V-1024</span>
              <h3 className="text-sm font-bold text-gray-900">Le Meurice → CDG</h3>
            </div>
            <button className="text-gray-400 hover:text-gray-600"><MoreVertical className="w-5 h-5" /></button>
          </div>
          
          <div className="flex justify-between items-center mb-5">
            <div>
              <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mb-1">Est. Time</p>
              <p className="text-sm font-bold text-gray-900">42 mins</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mb-1">Actual (Live)</p>
              <p className="text-sm font-bold text-emerald-500">44 mins</p>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-gray-50">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[8px] font-bold border-2 border-white">JD</div>
              <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-[8px] font-bold border-2 border-white">ML</div>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-500">
              <Sparkles className="w-3 h-3" /> AI Optimized
            </div>
          </div>
        </div>

        {/* Route Card 2 */}
        <div className="bg-white border border-red-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-md tracking-wider">V-2051</span>
              <h3 className="text-sm font-bold text-gray-900">Tour Eiffel → Ritz</h3>
            </div>
            <button className="text-gray-400 hover:text-gray-600"><MoreVertical className="w-5 h-5" /></button>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mb-1">Est. Time</p>
              <p className="text-sm font-bold text-gray-900">15 mins</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mb-1">Actual (Live)</p>
              <p className="text-sm font-bold text-red-500">26 mins</p>
            </div>
          </div>

          <div className="bg-red-50/50 border border-red-100 rounded-xl p-2.5 flex items-center gap-2 mt-2">
            <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
            <span className="text-[10px] font-bold text-red-600">Traffic Reroute Suggested</span>
          </div>
        </div>

        {/* Route Card 3 */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-md tracking-wider">V-0892</span>
              <h3 className="text-sm font-bold text-gray-900">Gare du Nord → Marais</h3>
            </div>
            <button className="text-gray-400 hover:text-gray-600"><MoreVertical className="w-5 h-5" /></button>
          </div>
          
          <div className="flex justify-between items-center mb-5">
            <div>
              <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mb-1">Est. Time</p>
              <p className="text-sm font-bold text-gray-900">22 mins</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mb-1">Actual (Live)</p>
              <p className="text-sm font-bold text-emerald-500">21 mins</p>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-gray-50">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[8px] font-bold border-2 border-white">AM</div>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500">
              <Clock className="w-3 h-3" /> On Schedule
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action */}
      <div className="absolute bottom-6 right-6 w-[340px]">
        <button className="w-full py-4 bg-white border border-gray-200 rounded-2xl text-sm font-bold text-gray-900 shadow-lg hover:bg-gray-50 transition-colors flex justify-center items-center gap-2">
          <Sparkles className="w-4 h-4" /> Recalculate All Routes
        </button>
      </div>
    </div>
  );
}
