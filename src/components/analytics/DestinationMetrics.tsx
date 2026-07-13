import React from 'react';
import { CreditCard, BedDouble, Star, TrendingDown } from 'lucide-react';
import { formatRupee } from '../../lib/utils';
import { DESTINATIONS_DB } from '../../data/destinationsDb';

interface DestinationMetricsProps {
  timeFilter?: 'Q1' | '6M' | 'Yearly';
  selectedRegion: string;
  selectedDestination: string;
}

export function DestinationMetrics({ timeFilter = '6M', selectedRegion, selectedDestination }: DestinationMetricsProps) {
  // Get list matching filters
  const activeDests = Object.values(DESTINATIONS_DB).filter(d => {
    const matchesRegion = selectedRegion === 'All' || d.region === selectedRegion;
    const matchesDest = selectedDestination === 'All' || d.name === selectedDestination;
    return matchesRegion && matchesDest;
  });

  // Calculate base values
  let baseRevenue = activeDests.reduce((acc, d) => acc + d.revenue, 0);
  let totalOccNum = activeDests.reduce((acc, d) => acc + parseFloat(d.occupancy), 0);
  let baseOccupancy = activeDests.length > 0 ? totalOccNum / activeDests.length : 84.6;
  let totalSatNum = activeDests.reduce((acc, d) => acc + parseFloat(d.satisfaction), 0);
  let baseSatisfaction = activeDests.length > 0 ? totalSatNum / activeDests.length : 4.92;
  let baseCost = activeDests.length > 0 ? (activeDests.reduce((acc, d) => acc + d.costPerGuest, 0) / activeDests.length) : 214.50;

  // Apply time filters
  let revenue = baseRevenue;
  let revenueTrend = '+12.4% ↑';
  let occupancy = baseOccupancy.toFixed(1) + '%';
  let occupancyTrend = '+5.2% ↑';
  let satisfaction = baseSatisfaction.toFixed(2) + '/5';
  let satisfactionTrend = 'Stable';
  let cost = baseCost;
  let costTrend = '-2.1% ↓';

  if (timeFilter === 'Q1') {
    revenue = Math.round(baseRevenue * 0.3);
    revenueTrend = '+8.5% ↑';
    occupancy = (baseOccupancy * 0.92).toFixed(1) + '%';
    occupancyTrend = '+3.1% ↑';
    satisfaction = (Math.max(baseSatisfaction - 0.05, 1.0)).toFixed(2) + '/5';
    satisfactionTrend = 'Refining';
    cost = baseCost * 1.1;
    costTrend = '+1.4% ↑';
  } else if (timeFilter === 'Yearly') {
    revenue = Math.round(baseRevenue * 2.1);
    revenueTrend = '+15.2% ↑';
    occupancy = (Math.min(baseOccupancy * 1.03, 100)).toFixed(1) + '%';
    occupancyTrend = '+6.5% ↑';
    satisfaction = (Math.min(baseSatisfaction + 0.03, 5.0)).toFixed(2) + '/5';
    satisfactionTrend = 'Outstanding';
    cost = baseCost * 0.95;
    costTrend = '-3.8% ↓';
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-[#BC2C2C] flex items-center justify-center">
            <CreditCard className="w-5 h-5" />
          </div>
          <span className="text-emerald-500 text-xs font-bold">{revenueTrend}</span>
        </div>
        <div>
          <p className="text-[11px] font-bold text-gray-500 mb-1">Total Revenue</p>
          <span className="text-3xl font-extrabold text-gray-900 leading-none">{formatRupee(revenue, 0, true)}</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <BedDouble className="w-5 h-5" />
          </div>
          <span className="text-emerald-500 text-xs font-bold">{occupancyTrend}</span>
        </div>
        <div>
          <p className="text-[11px] font-bold text-gray-500 mb-1">Avg. Occupancy</p>
          <span className="text-3xl font-extrabold text-gray-900 leading-none">{occupancy}</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Star className="w-5 h-5" />
          </div>
          <span className="text-gray-500 text-xs font-bold">{satisfactionTrend}</span>
        </div>
        <div>
          <p className="text-[11px] font-bold text-gray-500 mb-1">Satisfaction Score</p>
          <span className="text-3xl font-extrabold text-gray-900 leading-none">{satisfaction}</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
            <TrendingDown className="w-5 h-5" />
          </div>
          <span className={`text-xs font-bold ${costTrend.includes('-') ? 'text-[#BC2C2C]' : 'text-emerald-500'}`}>{costTrend}</span>
        </div>
        <div>
          <p className="text-[11px] font-bold text-gray-500 mb-1">Cost Per Guest</p>
          <span className="text-3xl font-extrabold text-gray-900 leading-none">{formatRupee(cost, 2)}</span>
        </div>
      </div>
    </div>
  );
}
