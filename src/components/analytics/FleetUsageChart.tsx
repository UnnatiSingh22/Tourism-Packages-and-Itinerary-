import React, { useState } from 'react';

const PERIOD_DATA = {
  Today: {
    daily: [
      { time: '06:00', value: 30 },
      { time: '08:00', value: 75 },
      { time: '10:00', value: 85 },
      { time: '12:00', value: 65 },
      { time: '14:00', value: 90 },
      { time: '16:00', value: 95 },
      { time: '18:00', value: 80 },
      { time: '20:00', value: 40 },
    ],
    peak: [
      { label: 'Morning Peak', value: 75 },
      { label: 'Midday Lunch', value: 60 },
      { label: 'Afternoon Peak', value: 90 },
      { label: 'Evening Rush', value: 85 },
    ]
  },
  Yesterday: {
    daily: [
      { time: '06:00', value: 25 },
      { time: '08:00', value: 60 },
      { time: '10:00', value: 90 },
      { time: '12:00', value: 75 },
      { time: '14:00', value: 85 },
      { time: '16:00', value: 90 },
      { time: '18:00', value: 70 },
      { time: '20:00', value: 30 },
    ],
    peak: [
      { label: 'Morning Peak', value: 65 },
      { label: 'Midday Lunch', value: 70 },
      { label: 'Afternoon Peak', value: 85 },
      { label: 'Evening Rush', value: 75 },
    ]
  },
  'This Week': {
    daily: [
      { time: '06:00', value: 40 },
      { time: '08:00', value: 70 },
      { time: '10:00', value: 80 },
      { time: '12:00', value: 70 },
      { time: '14:00', value: 85 },
      { time: '16:00', value: 90 },
      { time: '18:00', value: 75 },
      { time: '20:00', value: 45 },
    ],
    peak: [
      { label: 'Morning Peak', value: 80 },
      { label: 'Midday Lunch', value: 68 },
      { label: 'Afternoon Peak', value: 88 },
      { label: 'Evening Rush', value: 82 },
    ]
  },
  'This Month': {
    daily: [
      { time: '06:00', value: 50 },
      { time: '08:00', value: 65 },
      { time: '10:00', value: 75 },
      { time: '12:00', value: 80 },
      { time: '14:00', value: 90 },
      { time: '16:00', value: 85 },
      { time: '18:00', value: 80 },
      { time: '20:00', value: 50 },
    ],
    peak: [
      { label: 'Morning Peak', value: 72 },
      { label: 'Midday Lunch', value: 78 },
      { label: 'Afternoon Peak', value: 82 },
      { label: 'Evening Rush', value: 80 },
    ]
  }
};

export function FleetUsageChart() {
  const [selectedPeriod, setSelectedPeriod] = useState<keyof typeof PERIOD_DATA>('Today');

  const currentData = PERIOD_DATA[selectedPeriod];

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-8">
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">Fleet Utilization & Peak Analysis</h2>
          <p className="text-sm text-gray-500">Active vs Idle duty cycles across vehicles</p>
        </div>
        <select 
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value as keyof typeof PERIOD_DATA)}
          className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#BC2C2C]/30"
        >
          <option value="Today">Today</option>
          <option value="Yesterday">Yesterday</option>
          <option value="This Week">This Week</option>
          <option value="This Month">This Month</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
        {/* Daily Utilization Chart */}
        <div className="border border-gray-50 p-6 rounded-2xl bg-gray-50/20">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Daily Utilization</h3>
          <div className="h-64 flex items-end gap-2 sm:gap-3 justify-between">
            {currentData.daily.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-3 h-full justify-end">
                <div className="w-full relative h-48 flex items-end justify-center group">
                  <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded z-20">
                    {data.value}%
                  </div>
                  <div 
                    className={`w-full max-w-[32px] rounded-t-lg transition-all duration-500 ${
                      data.value > 80 ? 'bg-[#A02020]' : 'bg-gray-200 group-hover:bg-[#BC2C2C]'
                    }`}
                    style={{ height: `${data.value}%` }}
                  ></div>
                </div>
                <span className="text-[9px] font-bold text-gray-400">{data.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Peak Analysis Chart */}
        <div className="border border-gray-50 p-6 rounded-2xl bg-gray-50/20">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Peak Hour Analysis</h3>
          <div className="h-64 flex items-end gap-4 justify-around">
            {currentData.peak.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-3 h-full justify-end">
                <div className="w-full relative h-48 flex items-end justify-center group">
                  <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded z-20">
                    {data.value}% Load
                  </div>
                  <div 
                    className="w-full max-w-[48px] rounded-t-lg bg-orange-400 group-hover:bg-orange-500 transition-all duration-500"
                    style={{ height: `${data.value}%` }}
                  ></div>
                </div>
                <span className="text-[9px] font-bold text-gray-500 text-center leading-normal max-w-[70px]">{data.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
