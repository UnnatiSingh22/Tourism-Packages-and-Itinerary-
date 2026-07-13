import React, { useState } from 'react';
import { DepartureCalendar } from '../components/dashboard/DepartureCalendar';
import { YieldEfficiencyChart, SeatInventoryChart } from '../components/dashboard/DepartureCharts';
import { PriorityWaitlist } from '../components/dashboard/PriorityWaitlist';
import { ImmediateActionsSidebar } from '../components/dashboard/ImmediateActionsSidebar';
import { Download, Calendar } from 'lucide-react';

type DateFilter = 'today' | 'week' | 'month' | 'quarter' | 'custom';

const DATE_FILTERS: { id: DateFilter; label: string }[] = [
  { id: 'today', label: 'Today' },
  { id: 'week', label: 'This Week' },
  { id: 'month', label: 'This Month' },
  { id: 'quarter', label: 'This Quarter' },
  { id: 'custom', label: 'Custom Range' },
];

export function DepartureDashboardPage() {
  const [dateFilter, setDateFilter] = useState<DateFilter>('month');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const [showCustom, setShowCustom] = useState(false);

  const handleFilterChange = (f: DateFilter) => {
    setDateFilter(f);
    setShowCustom(f === 'custom');
  };

  return (
    <div className="animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
        <div className="max-w-2xl">
          <h1 className="text-[22px] font-semibold text-gray-900 tracking-tight mb-2">
            Departure Dashboard
          </h1>
          <p className="text-[15px] text-gray-600 leading-relaxed">
            Manage your upcoming luxury tour departures, monitor group occupancy, and handle priority waitlists from one central hub.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <button
            onClick={() => window.location.href = '/guests/checkin'}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#BC2C2C] hover:bg-[#A02020] text-white border border-transparent rounded-xl text-sm font-semibold transition-colors shadow-sm cursor-pointer"
          >
            View All Traveller Manifest
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            Export Manifest
          </button>
        </div>
      </div>

      {/* Date Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest shrink-0">Period:</span>
        <div className="flex flex-wrap gap-2">
          {DATE_FILTERS.map(f => (
            <button
              key={f.id}
              onClick={() => handleFilterChange(f.id)}
              className={`px-4 py-1.5 text-xs font-bold rounded-xl transition-all ${
                dateFilter === f.id
                  ? 'bg-[#BC2C2C] text-white shadow-sm'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-150'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        {showCustom && (
          <div className="flex items-center gap-2 ml-2">
            <input
              type="date"
              value={customStart}
              onChange={e => setCustomStart(e.target.value)}
              className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BC2C2C]/20"
            />
            <span className="text-xs text-gray-400 font-semibold">to</span>
            <input
              type="date"
              value={customEnd}
              onChange={e => setCustomEnd(e.target.value)}
              className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BC2C2C]/20"
            />
          </div>
        )}
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        {/* Left Column */}
        <div className="flex-1 min-w-0 flex flex-col gap-6">
          <DepartureCalendar selectedMonth={dateFilter === 'month' ? 'September 2024' : 'October 2024'} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <YieldEfficiencyChart dateFilter={dateFilter} />
            <SeatInventoryChart dateFilter={dateFilter} />
          </div>

          <PriorityWaitlist selectedMonth={dateFilter === 'month' ? 'September 2024' : 'October 2024'} />
        </div>

        {/* Right Column */}
        <div className="w-full xl:w-[320px] shrink-0">
          <ImmediateActionsSidebar selectedMonth={dateFilter === 'month' ? 'September 2024' : 'October 2024'} />
        </div>
      </div>
    </div>
  );
}
