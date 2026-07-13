import React from 'react';

export function CapacityHeatmap({ timeframe = 'month' }: { timeframe?: 'week' | 'month' | 'quarter' }) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const categories = ['Hotels', 'Transport', 'Activities', 'Dining'];

  const datasets = {
    week: [
      [1, 1, 2, 2, 3, 3],
      [2, 2, 3, 3, 3, 2],
      [1, 1, 1, 2, 2, 2],
      [1, 1, 1, 1, 1, 2],
    ],
    month: [
      [1, 2, 3, 4, 3, 4],
      [4, 4, 3, 3, 3, 4],
      [1, 1, 2, 2, 3, 3],
      [1, 1, 1, 1, 2, 2],
    ],
    quarter: [
      [2, 3, 4, 4, 4, 4],
      [3, 4, 4, 4, 4, 4],
      [2, 2, 3, 3, 4, 4],
      [1, 2, 2, 3, 3, 3],
    ]
  };

  const data = datasets[timeframe] || datasets.month;

  const getColor = (val: number) => {
    switch (val) {
      case 1: return 'bg-[#EBF0FF]';
      case 2: return 'bg-[#FFD1D1]';
      case 3: return 'bg-[#FF5A5A]';
      case 4: return 'bg-[#A02020]';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="flex-1 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-6 flex flex-col">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">Capacity Heatmap</h2>
          <p className="text-xs text-gray-500">Global resource pressure by region and service type.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 mr-4">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-[#EBF0FF]"></div><span className="text-[10px] font-bold text-gray-500 uppercase">Low</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-[#FFD1D1]"></div><span className="text-[10px] font-bold text-gray-500 uppercase">Med</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-[#FF5A5A]"></div><span className="text-[10px] font-bold text-gray-500 uppercase">High</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-[#A02020]"></div><span className="text-[10px] font-bold text-gray-500 uppercase">Peak</span></div>
          </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-7 gap-4">
        {/* Empty top-left cell */}
        <div></div>
        
        {/* Header Row */}
        {days.map((day) => (
          <div key={day} className="flex items-center justify-center pb-4">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{day}</span>
          </div>
        ))}

        {/* Matrix rows */}
        {categories.map((cat, rowIndex) => (
          <React.Fragment key={cat}>
            <div className="flex items-center pr-4">
              <span className="text-sm font-bold text-gray-700">{cat}</span>
            </div>
            {data[rowIndex].map((val, colIndex) => (
              <div key={`${rowIndex}-${colIndex}`} className="flex items-center justify-center p-1">
                <div className={`w-full aspect-square rounded-xl ${getColor(val)} transition-transform hover:scale-105 cursor-pointer`}></div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
