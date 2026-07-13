import React from 'react';

export function DriverInsights() {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Quick Insights</h3>

      {/* Fleet Utilization */}
      <div className="bg-gradient-to-r from-[#FF7096] to-[#FF8FAB] rounded-2xl p-6 shadow-sm text-white">
        <p className="text-[10px] font-bold tracking-widest uppercase mb-1 opacity-90">Fleet Utilization</p>
        <p className="text-4xl font-extrabold mb-4">84%</p>
        <div className="w-full bg-white/30 h-1.5 rounded-full overflow-hidden">
          <div className="bg-white h-full w-[84%] rounded-full"></div>
        </div>
      </div>

      {/* Total Trips Today */}
      <div className="bg-gradient-to-r from-[#8338EC] to-[#9D4EDD] rounded-2xl p-6 shadow-sm text-white relative overflow-hidden">
        <p className="text-[10px] font-bold tracking-widest uppercase mb-1 opacity-90">Total Trips Today</p>
        <p className="text-4xl font-extrabold mb-2">142</p>
        <div className="absolute right-6 bottom-6 px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold backdrop-blur-sm">
          +12% vs LW
        </div>
      </div>

      {/* Duty Distribution */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Duty Distribution</p>
        
        <div className="mb-4">
          <div className="flex justify-between items-end mb-1.5">
            <span className="text-xs font-bold text-gray-700">On Duty</span>
            <span className="text-xs font-bold text-gray-900">18 Drivers</span>
          </div>
          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#8338EC] h-full w-[82%] rounded-full"></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-end mb-1.5">
            <span className="text-xs font-bold text-gray-700">Resting</span>
            <span className="text-xs font-bold text-gray-900">4 Drivers</span>
          </div>
          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-orange-400 h-full w-[18%] rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Vehicle Health */}
      <div className="rounded-2xl overflow-hidden relative shadow-sm h-40">
        <img 
          src="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=1000" 
          alt="Vehicle Health" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-5">
          <p className="text-sm font-bold text-white mb-0.5">Vehicle Health</p>
          <p className="text-[10px] font-medium text-gray-300">98% Fleet Operational</p>
        </div>
      </div>
    </div>
  );
}
