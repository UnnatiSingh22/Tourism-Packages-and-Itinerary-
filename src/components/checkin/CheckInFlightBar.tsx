import React from 'react';
import { Plane, SlidersHorizontal, ScanLine } from 'lucide-react';

interface CheckInFlightBarProps {
  onCompare?: () => void;
  onBatchCheckIn?: () => void;
  onToggleFilters?: () => void;
}

export function CheckInFlightBar({ onCompare, onBatchCheckIn, onToggleFilters }: CheckInFlightBarProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-[20px] font-bold text-gray-900 mb-2 font-sans tracking-tight">Check-In Dashboard</h1>
        <div className="flex items-center gap-3 text-[13px]">
          <span className="flex items-center gap-1.5 px-3 py-1 bg-red-50 text-[#BC2C2C] font-bold rounded-full">
            <Plane className="w-3.5 h-3.5" />
            FL-9022 PARIS-LE BOURGET
          </span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-600 font-semibold">Scheduled: 14:30 PM Today</span>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <button 
          onClick={onToggleFilters}
          className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm h-11"
        >
          <SlidersHorizontal className="w-4 h-4 text-gray-400" />
          Filters
        </button>
        <button 
          onClick={onCompare}
          className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors shadow-sm h-11"
        >
          <ScanLine className="w-4 h-4 text-emerald-400" />
          Compare Manifest Report
        </button>
        <button 
          onClick={onBatchCheckIn}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#BC2C2C] hover:bg-[#A02020] text-white text-sm font-semibold rounded-xl transition-colors shadow-sm h-11"
        >
          <Plane className="w-4 h-4" />
          Batch Check-In Checked
        </button>
      </div>
    </div>
  );
}

export function CheckInMetrics() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total Travelers */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-2">Total Travelers</p>
        <p className="text-2xl font-extrabold text-gray-900 mb-2">148</p>
        <p className="text-[11px] font-medium text-emerald-500">+12% from last flight</p>
      </div>

      {/* Checked In */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-2">Checked In</p>
        <p className="text-2xl font-extrabold text-gray-900 mb-2">92/148</p>
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-[#BC2C2C] rounded-full" style={{ width: '62%' }} />
        </div>
      </div>

      {/* Missing Docs */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-2">Missing Docs</p>
        <p className="text-2xl font-extrabold text-gray-900 mb-2">14</p>
        <p className="text-[11px] font-medium text-orange-500">⚠ Requires attention</p>
      </div>

      {/* Boarding Ready */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-2">Boarding Ready</p>
        <p className="text-2xl font-extrabold text-gray-900 mb-2">78</p>
        <p className="text-[11px] font-medium text-emerald-500">✓ Verification complete</p>
      </div>
    </div>
  );
}
