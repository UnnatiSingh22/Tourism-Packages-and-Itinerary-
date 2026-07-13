import React from 'react';
import { TrendingUp, BedDouble, Calendar, Clock } from 'lucide-react';

interface PricingMetricsProps {
  category?: string;
  destination?: string;
  advanced?: boolean;
  minOccupancy?: number;
}

export function PricingMetrics({ category = 'All', destination = 'All', advanced = false, minOccupancy = 0 }: PricingMetricsProps) {
  let adr = 2450;
  let occupancy = 78.2;
  let leadTime = 42;
  let peakSeason = 'Oct - Dec';

  // Apply destination filters
  if (destination === 'Paris, France') {
    adr = 3120;
    occupancy = 84.6;
    leadTime = 38;
    peakSeason = 'May - Sep';
  } else if (destination === 'Tokyo, Japan') {
    adr = 2780;
    occupancy = 81.2;
    leadTime = 45;
    peakSeason = 'Mar - May';
  } else if (destination === 'Amalfi Coast, Italy') {
    adr = 4150;
    occupancy = 88.4;
    leadTime = 55;
    peakSeason = 'Jun - Aug';
  }

  // Apply category filters
  if (category === 'Luxury Elite') {
    adr += 800;
    occupancy += 4;
  } else if (category === 'Adventure') {
    adr -= 600;
    leadTime -= 12;
    occupancy -= 6;
  } else if (category === 'Wellness Retreat') {
    adr += 300;
    occupancy += 2;
    leadTime += 5;
  }

  // Apply advanced filter
  if (advanced) {
    adr = Math.round(adr * 1.15); // surcharge
  }

  // Apply min occupancy filter
  if (minOccupancy > 0) {
    occupancy = Math.max(occupancy, minOccupancy);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-2 text-gray-500">
            <TrendingUp className="w-4 h-4 text-[#BC2C2C]" />
            <span className="text-[11px] font-bold tracking-widest uppercase">Avg. ADR</span>
          </div>
        </div>
        <div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl font-extrabold text-gray-900 leading-none">${adr.toLocaleString()}</span>
          </div>
          <span className="text-emerald-500 text-[10px] font-bold">↑ +12.4% vs LY</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-2 text-gray-500">
            <BedDouble className="w-4 h-4" />
            <span className="text-[11px] font-bold tracking-widest uppercase">Occupancy</span>
          </div>
        </div>
        <div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl font-extrabold text-gray-900 leading-none">{occupancy.toFixed(1)}%</span>
          </div>
          <span className="text-gray-400 text-[10px] font-bold">— Stable</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 border-l-4 border-l-[#BC2C2C]">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-2 text-gray-500">
            <Calendar className="w-4 h-4 text-purple-500" />
            <span className="text-[11px] font-bold tracking-widest uppercase">Peak Season</span>
          </div>
        </div>
        <div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl font-extrabold text-gray-900 leading-none">{peakSeason}</span>
          </div>
          <span className="text-[#BC2C2C] text-[10px] font-bold tracking-wide">High Demand Alert</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-2 text-gray-500">
            <Clock className="w-4 h-4 text-emerald-500" />
            <span className="text-[11px] font-bold tracking-widest uppercase">Lead Time</span>
          </div>
        </div>
        <div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl font-extrabold text-gray-900 leading-none">{leadTime} Days</span>
          </div>
          <span className="text-emerald-500 text-[10px] font-bold">Optimized</span>
        </div>
      </div>
    </div>
  );
}
