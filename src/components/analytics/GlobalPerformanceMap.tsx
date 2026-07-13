import React, { useState } from 'react';
import { ExternalLink, MapPin, TrendingUp } from 'lucide-react';
import { formatRupee } from '../../lib/utils';

interface GlobalPerformanceMapProps {
  timeFilter?: 'Q1' | '6M' | 'Yearly';
}

export function GlobalPerformanceMap({ timeFilter = '6M' }: GlobalPerformanceMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  // Region stats based on time filter
  const regionStats = {
    europe: {
      name: 'Europe Cluster (Paris & Amalfi)',
      revenue: timeFilter === 'Q1' ? 540000 : timeFilter === 'Yearly' ? 4200000 : 2400000,
      growth: timeFilter === 'Q1' ? '+8%' : '+18%',
      occupancy: timeFilter === 'Q1' ? '74%' : timeFilter === 'Yearly' ? '94%' : '88%',
    },
    japan: {
      name: 'East Asia Cluster (Kyoto & Tokyo)',
      revenue: timeFilter === 'Q1' ? 320000 : timeFilter === 'Yearly' ? 2100000 : 1200000,
      growth: timeFilter === 'Q1' ? '+5%' : '+12%',
      occupancy: timeFilter === 'Q1' ? '70%' : timeFilter === 'Yearly' ? '86%' : '80%',
    },
    dubai: {
      name: 'Middle East Cluster (Dubai Central)',
      revenue: timeFilter === 'Q1' ? 180000 : timeFilter === 'Yearly' ? 1100000 : 600000,
      growth: timeFilter === 'Q1' ? '+10%' : '+24%',
      occupancy: timeFilter === 'Q1' ? '72%' : timeFilter === 'Yearly' ? '92%' : '85%',
    }
  };

  // Adjust dot size factors based on timeFilter
  const sizeClass = timeFilter === 'Q1' ? 'scale-75' : timeFilter === 'Yearly' ? 'scale-125' : 'scale-100';

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col h-full">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Global Performance Map</h2>
          <p className="text-xs font-medium text-gray-500 mt-1">Top clusters by revenue density ({timeFilter === 'Q1' ? 'Q1' : timeFilter === 'Yearly' ? 'Full Year' : '6 Months'}).</p>
        </div>
        <button className="flex items-center gap-1 text-xs font-bold text-[#BC2C2C] hover:text-[#8B2020] transition-colors">
          View Full Report <ExternalLink className="w-3 h-3" />
        </button>
      </div>

      {/* Map Area */}
      <div className="flex-1 bg-slate-100/50 rounded-2xl relative overflow-hidden flex items-center justify-center min-h-[350px]">
        {/* World Map Background (using an SVG outline via data URI for fidelity) */}
        <div className="absolute inset-4 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 500'%3E%3Cpath fill='%2364748b' d='M882,109c0,0-17-7-25-3c-8,3-8,9-8,9s-5,5-9,3c-5-2-12-13-12-13s0-8,6-13c5-5,21-5,21-5s5,0,8,6C866,100,882,109,882,109z M135,166c-5,5-17,7-17,7s-20,0-15-8c5-9,17-27,24-27c8,0,15,6,15,6s11,8,7,12C145,160,135,166,135,166z M707,247c-2,8-16,14-16,14s-14,0-12-7c2-7,8-16,12-16C694,238,708,240,707,247z M518,348c-3,4-10,4-10,4s-9-3-6-8c3-4,10-12,12-12C516,333,521,344,518,348z M465,110c-3,3-14,3-14,3s-9-4-6-7c3-3,8-10,12-10C460,96,469,106,465,110z M273,269c-2,6-14,6-14,6s-11-2-9-8c2-6,8-18,12-18C265,248,276,262,273,269z M240,119c-3,4-14,2-14,2s-10-6-6-10c4-3,10-14,14-14C238,98,244,115,240,119z M540,195c-3,5-16,3-16,3s-9-6-6-10c3-5,8-18,12-18C534,170,544,188,540,195z M852,277c-2,5-14,4-14,4s-8-5-5-10c3-5,10-17,13-17C849,255,855,272,852,277z M415,247c-3,5-16,4-16,4s-10-6-5-11c5-5,12-21,17-21C415,218,420,241,415,247z'/%3E%3Cpath fill='%2364748b' opacity='0.5' d='M800,150 Q850,100 900,150 T950,150 M700,200 Q750,150 800,200 M100,100 Q150,50 200,100 M200,250 Q250,200 300,250'/%3E%3C/svg%3E")`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}></div>

        {/* Radar Map Elements (Grid lines) */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(200,200,200,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,200,200,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>

        {/* Animated Flight/Tour Connections overlay */}
        <svg viewBox="0 0 1000 500" className="absolute inset-0 w-full h-full pointer-events-none z-10">
          {/* Europe to Dubai */}
          <path 
            d="M 450,175 Q 500,200 550,250" 
            fill="none" 
            stroke="#BC2C2C" 
            strokeWidth="2" 
            strokeDasharray="6 4" 
            className="opacity-70"
          >
            <animate attributeName="stroke-dashoffset" values="40;0" dur="3s" repeatCount="indefinite" />
          </path>
          {/* Dubai to Japan */}
          <path 
            d="M 550,250 Q 650,210 750,200" 
            fill="none" 
            stroke="#BC2C2C" 
            strokeWidth="2" 
            strokeDasharray="6 4" 
            className="opacity-70"
          >
            <animate attributeName="stroke-dashoffset" values="40;0" dur="4s" repeatCount="indefinite" />
          </path>
          {/* Europe to Japan */}
          <path 
            d="M 450,175 Q 600,120 750,200" 
            fill="none" 
            stroke="rgba(230,90,75,0.6)" 
            strokeWidth="1.5" 
            strokeDasharray="6 4"
          >
            <animate attributeName="stroke-dashoffset" values="50;0" dur="5s" repeatCount="indefinite" />
          </path>
        </svg>

        {/* Region Dot 1: Europe */}
        <div 
          onMouseEnter={() => setHoveredRegion('europe')}
          onMouseLeave={() => setHoveredRegion(null)}
          className={`absolute top-[35%] left-[45%] flex items-center justify-center cursor-pointer transition-all duration-300 ${sizeClass}`}
        >
          <div className="w-12 h-12 rounded-full bg-[#BC2C2C]/20 animate-ping absolute"></div>
          <div className="w-4 h-4 rounded-full bg-[#BC2C2C] border-2 border-white relative z-10 shadow-lg group-hover:scale-110 transition-transform"></div>
          
          {hoveredRegion === 'europe' && (
            <div className="absolute bottom-6 left-0 bg-gray-900/95 backdrop-blur-sm text-white text-[10px] p-3 rounded-xl shadow-xl z-50 border border-gray-800 w-44 pointer-events-none transition-all duration-200">
              <span className="font-bold text-red-400 block mb-1 flex items-center gap-1"><MapPin className="w-3 h-3" /> {regionStats.europe.name}</span>
              <span className="block">Rev: <span className="font-extrabold text-white">{formatRupee(regionStats.europe.revenue, 0, true)}</span></span>
              <span className="block">Growth: <span className="font-bold text-emerald-400">{regionStats.europe.growth}</span></span>
              <span className="block">Occupancy: <span className="font-bold text-white">{regionStats.europe.occupancy}</span></span>
            </div>
          )}
        </div>

        {/* Region Dot 2: Japan */}
        <div 
          onMouseEnter={() => setHoveredRegion('japan')}
          onMouseLeave={() => setHoveredRegion(null)}
          className={`absolute top-[40%] right-[25%] flex items-center justify-center cursor-pointer transition-all duration-300 ${sizeClass}`}
        >
          <div className="w-10 h-10 rounded-full bg-[#BC2C2C]/20 animate-ping absolute" style={{ animationDelay: '0.5s' }}></div>
          <div className="w-3.5 h-3.5 rounded-full bg-[#BC2C2C] border-2 border-white relative z-10 shadow-lg"></div>
          
          {hoveredRegion === 'japan' && (
            <div className="absolute bottom-6 left-0 bg-gray-900/95 backdrop-blur-sm text-white text-[10px] p-3 rounded-xl shadow-xl z-50 border border-gray-800 w-44 pointer-events-none transition-all duration-200">
              <span className="font-bold text-red-400 block mb-1 flex items-center gap-1"><MapPin className="w-3 h-3" /> {regionStats.japan.name}</span>
              <span className="block">Rev: <span className="font-extrabold text-white">{formatRupee(regionStats.japan.revenue, 0, true)}</span></span>
              <span className="block">Growth: <span className="font-bold text-emerald-400">{regionStats.japan.growth}</span></span>
              <span className="block">Occupancy: <span className="font-bold text-white">{regionStats.japan.occupancy}</span></span>
            </div>
          )}
        </div>

        {/* Region Dot 3: Dubai */}
        <div 
          onMouseEnter={() => setHoveredRegion('dubai')}
          onMouseLeave={() => setHoveredRegion(null)}
          className={`absolute top-[50%] left-[55%] flex items-center justify-center cursor-pointer transition-all duration-300 ${sizeClass}`}
        >
          <div className="w-14 h-14 rounded-full bg-orange-400/20 animate-ping absolute" style={{ animationDelay: '1s' }}></div>
          <div className="w-4 h-4 rounded-full bg-orange-400 border-2 border-white relative z-10 shadow-lg"></div>
          
          {hoveredRegion === 'dubai' && (
            <div className="absolute bottom-6 left-0 bg-gray-900/95 backdrop-blur-sm text-white text-[10px] p-3 rounded-xl shadow-xl z-50 border border-gray-800 w-44 pointer-events-none transition-all duration-200">
              <span className="font-bold text-orange-400 block mb-1 flex items-center gap-1"><MapPin className="w-3 h-3" /> {regionStats.dubai.name}</span>
              <span className="block">Rev: <span className="font-extrabold text-white">{formatRupee(regionStats.dubai.revenue, 0, true)}</span></span>
              <span className="block">Growth: <span className="font-bold text-emerald-400">{regionStats.dubai.growth}</span></span>
              <span className="block">Occupancy: <span className="font-bold text-white">{regionStats.dubai.occupancy}</span></span>
            </div>
          )}
        </div>

        {/* Legend Card */}
        <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-white/50 z-10">
          <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Revenue Scale</h4>
          <div className="space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#BC2C2C]"></div>
              <span className="text-[11px] font-bold text-gray-700">{formatRupee(1000000, 0, true)}+ High Value</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-orange-400"></div>
              <span className="text-[11px] font-semibold text-gray-600">{formatRupee(500000, 0, true)} - {formatRupee(999000, 0, true)}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-amber-600"></div>
              <span className="text-[11px] font-semibold text-gray-600">&lt; {formatRupee(500000, 0, true)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
