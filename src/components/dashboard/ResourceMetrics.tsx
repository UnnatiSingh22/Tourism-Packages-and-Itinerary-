import React from 'react';
import { Bed, Bus, Activity, TrendingUp, AlertCircle } from 'lucide-react';

export function ResourceMetrics({ timeframe = 'month' }: { timeframe?: 'week' | 'month' | 'quarter' }) {
  const metricsData = {
    week: {
      hotelPct: 65,
      hotelStatus: 'Paris HQ: Stable capacity (75%)',
      hotelStatusColor: 'text-emerald-600 bg-emerald-50',
      transportPct: 82,
      transportLabel: '82%',
      transportColor: 'bg-emerald-500',
      transportTextClass: 'text-emerald-600',
      transportStatus: 'Normal availability: No over-bookings',
      transportStatusColor: 'text-emerald-600 bg-emerald-50 border-emerald-100',
      guidesCount: 142,
      guidesActive: 80
    },
    month: {
      hotelPct: 82,
      hotelStatus: 'Paris HQ: Near capacity (96%)',
      hotelStatusColor: 'text-red-600 bg-red-50',
      transportPct: 104,
      transportLabel: '104%',
      transportColor: 'bg-red-500',
      transportTextClass: 'text-red-600',
      transportStatus: 'Critical: 4 Over-bookings. Action required for London Tour #442',
      transportStatusColor: 'text-[#BC2C2C] bg-[#FFF4F3] border-[#FFE4E1]',
      guidesCount: 142,
      guidesActive: 118
    },
    quarter: {
      hotelPct: 91,
      hotelStatus: 'Paris HQ: Near capacity (98%)',
      hotelStatusColor: 'text-red-600 bg-red-50',
      transportPct: 98,
      transportLabel: '98%',
      transportColor: 'bg-amber-500',
      transportTextClass: 'text-amber-600',
      transportStatus: 'Warning: 1 Over-booking. Action suggested for Berlin Tour #119',
      transportStatusColor: 'text-amber-700 bg-amber-50 border-amber-100',
      guidesCount: 142,
      guidesActive: 135
    }
  };

  const current = metricsData[timeframe] || metricsData.month;

  return (
    <div className="flex flex-col gap-6">
      {/* Hotels */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
            <Bed className="w-5 h-5" />
          </div>
          <span className="flex items-center gap-1 text-emerald-500 text-[11px] font-bold">
            <TrendingUp className="w-3 h-3" /> 4.2%
          </span>
        </div>
        <h3 className="text-sm font-bold text-gray-900 mb-1">Hotels ({timeframe})</h3>
        <p className="text-xs text-gray-500 font-medium mb-6">Room block utilization in major hubs.</p>
        
        <div className="mb-4">
          <div className="flex justify-between items-end mb-1.5">
            <span className="text-xs font-bold text-gray-700">Luxury Suites</span>
            <span className="text-xs font-bold text-gray-900">{current.hotelPct}%</span>
          </div>
          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-gray-900 h-full rounded-full transition-all duration-500" style={{ width: `${current.hotelPct}%` }}></div>
          </div>
        </div>

        <div className={`rounded-xl p-3 flex gap-2 items-start mt-2 transition-all ${current.hotelStatusColor}`}>
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <p className="text-[11px] font-semibold leading-tight">{current.hotelStatus}</p>
        </div>
      </div>

      {/* Transport */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center">
            <Bus className="w-5 h-5" />
          </div>
          <span className="text-red-500 text-[11px] font-bold">
            {timeframe === 'week' ? 'Steady' : '! Alert'}
          </span>
        </div>
        <h3 className="text-sm font-bold text-gray-900 mb-1">Transport ({timeframe})</h3>
        <p className="text-xs text-gray-500 font-medium mb-6">Fleet and chauffeur availability.</p>
        
        <div className="mb-4">
          <div className="flex justify-between items-end mb-1.5">
            <span className="text-xs font-bold text-gray-700">Fleet Utilization</span>
            <span className={`text-xs font-bold ${current.transportTextClass}`}>{current.transportLabel}</span>
          </div>
          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-500 ${current.transportColor}`} style={{ width: `${Math.min(current.transportPct, 100)}%` }}></div>
          </div>
        </div>

        <div className={`border rounded-xl p-3 flex gap-2 items-start mt-2 transition-all ${current.transportStatusColor}`}>
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <p className="text-[11px] font-bold leading-tight mb-0.5">{current.transportStatus}</p>
          </div>
        </div>
      </div>

      {/* Activities */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
            <Activity className="w-5 h-5" />
          </div>
          <span className="text-gray-500 text-[11px] font-bold">
            Steady
          </span>
        </div>
        <h3 className="text-sm font-bold text-gray-900 mb-1">Activities ({timeframe})</h3>
        <p className="text-xs text-gray-500 font-medium mb-6">Experience bookings & guide ratios.</p>
        
        <div className="flex justify-between mb-6">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Guides</p>
            <p className="text-lg font-bold text-gray-900">{current.guidesCount}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Active</p>
            <p className="text-lg font-bold text-emerald-500">{current.guidesActive}</p>
          </div>
        </div>

        <button className="w-full py-2.5 bg-white border border-red-200 text-red-600 text-sm font-bold rounded-xl hover:bg-red-50 transition-colors mt-auto">
          View Guide Schedule
        </button>
      </div>
    </div>
  );
}
