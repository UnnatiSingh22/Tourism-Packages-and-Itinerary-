import React, { useState } from 'react';
import { formatRupee } from '../../lib/utils';

const REVENUE_DATA = {
  'Current Year': {
    months: [
      { name: 'Jan', rev: 45, exp: 30 },
      { name: 'Feb', rev: 38, exp: 28 },
      { name: 'Mar', rev: 52, exp: 35 },
      { name: 'Apr', rev: 68, exp: 42 },
      { name: 'May', rev: 75, exp: 45 },
      { name: 'Jun', rev: 84, exp: 50 },
    ],
    totalRev: 362000,
    totalExp: 240000,
  },
  'Previous Year': {
    months: [
      { name: 'Jan', rev: 38, exp: 25 },
      { name: 'Feb', rev: 32, exp: 22 },
      { name: 'Mar', rev: 45, exp: 28 },
      { name: 'Apr', rev: 55, exp: 35 },
      { name: 'May', rev: 62, exp: 38 },
      { name: 'Jun', rev: 70, exp: 42 },
    ],
    totalRev: 302000,
    totalExp: 190000,
  }
};

export function RevenueChartCard() {
  const [selectedYear, setSelectedYear] = useState<keyof typeof REVENUE_DATA>('Current Year');

  const current = REVENUE_DATA[selectedYear];

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 h-full flex flex-col justify-between">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">Monthly Revenue vs. Expense</h2>
          <p className="text-xs text-gray-500">Consolidated logistical performance statistics</p>
        </div>
        <select 
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value as keyof typeof REVENUE_DATA)}
          className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#BC2C2C]/30"
        >
          <option value="Current Year">Current Year</option>
          <option value="Previous Year">Previous Year</option>
        </select>
      </div>

      <div className="flex-1 relative min-h-[260px] flex items-end justify-between px-4 pb-4">
        {/* Horizontal gridlines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-12">
          <div className="w-full border-b border-gray-100/50"></div>
          <div className="w-full border-b border-gray-100/50"></div>
          <div className="w-full border-b border-gray-100/50"></div>
          <div className="w-full border-b border-gray-100"></div>
        </div>

        {/* Side-by-side Bars */}
        <div className="w-full h-full flex items-end justify-between z-10">
          {current.months.map((m) => (
            <div key={m.name} className="flex-1 flex flex-col items-center gap-3">
              <div className="h-44 w-full flex items-end justify-center gap-1.5 group relative">
                {/* Custom Tooltip */}
                <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-[9px] font-bold px-2 py-1 rounded z-20 pointer-events-none flex flex-col shadow">
                  <span>Rev: {formatRupee(m.rev * 1000, 0, true)}</span>
                  <span>Exp: {formatRupee(m.exp * 1000, 0, true)}</span>
                </div>
                {/* Revenue Bar */}
                <div 
                  className="w-3 sm:w-4 rounded-t bg-gray-900 group-hover:bg-[#BC2C2C] transition-all duration-500"
                  style={{ height: `${m.rev}%` }}
                ></div>
                {/* Expense Bar */}
                <div 
                  className="w-3 sm:w-4 rounded-t bg-orange-300 group-hover:bg-orange-400 transition-all duration-500"
                  style={{ height: `${m.exp}%` }}
                ></div>
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{m.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-8 mt-auto pt-6 border-t border-gray-50 z-10">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-gray-900"></div>
          <span className="text-xs font-semibold text-gray-700">Total Revenue: <span className="font-bold text-gray-900">{formatRupee(current.totalRev, 0, true)}</span></span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-orange-300"></div>
          <span className="text-xs font-semibold text-gray-700">Total Expenses: <span className="font-bold text-gray-900">{formatRupee(current.totalExp, 0, true)}</span></span>
        </div>
      </div>
    </div>
  );
}
