import React from 'react';

interface MonthlyPricingMatrixProps {
  category?: string;
  destination?: string;
  advanced?: boolean;
  onClickCell?: (venue: string, month: string, price: string, occupancy: number) => void;
}

export function MonthlyPricingMatrix({ category = 'All', destination = 'All', advanced = false, onClickCell }: MonthlyPricingMatrixProps) {
  const baseData = [
    { category: 'Grand Ballroom', filterType: 'Luxury Elite, Adventure', prices: [4.2, 4.5, 5.8, 8.2, 9.0, 6.5, 10.2], colors: ['bg-blue-50', 'bg-blue-100', 'bg-amber-100', 'bg-[#8B2020] text-white', 'bg-[#BC2C2C] text-white', 'bg-orange-100', 'bg-[#8B2020] text-white'] },
    { category: 'Penthouse Suite', filterType: 'Luxury Elite, Wellness Retreat', prices: [2.1, 1.8, 1.9, 2.4, 3.8, 4.2, 2.9], colors: ['bg-amber-100', 'bg-blue-50', 'bg-blue-100', 'bg-orange-50', 'bg-orange-100', 'bg-amber-100', 'bg-blue-50'] },
    { category: 'Executive Lounge', filterType: 'Adventure', prices: [1.5, 1.6, 1.2, 0.8, 0.9, 1.1, 0.8], colors: ['bg-[#BC2C2C] text-white', 'bg-[#8B2020] text-white', 'bg-orange-100', 'bg-blue-50', 'bg-blue-50', 'bg-amber-50', 'bg-blue-50'] },
    { category: 'Garden Atrium', filterType: 'Adventure, Wellness Retreat', prices: [3.1, 3.8, 5.2, 6.0, 4.5, 3.2, 3.0], colors: ['bg-blue-50', 'bg-amber-100', 'bg-[#8B2020] text-white', 'bg-[#BC2C2C] text-white', 'bg-amber-100', 'bg-blue-100', 'bg-blue-50'] },
  ];

  // Destination factor
  let destFactor = 1.0;
  if (destination === 'Paris, France') destFactor = 1.3;
  else if (destination === 'Tokyo, Japan') destFactor = 1.15;
  else if (destination === 'Amalfi Coast, Italy') destFactor = 1.55;

  // Advanced surcharge factor
  const advancedFactor = advanced ? 1.15 : 1.0;
  const totalFactor = destFactor * advancedFactor;

  // Category filter
  const filteredData = baseData.filter(row => {
    if (category === 'All') return true;
    return row.filterType.includes(category);
  });

  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL'];

  // Mock occupancy map
  const occupancies = [58, 62, 74, 91, 94, 78, 96];

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 overflow-hidden h-full">
      <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Monthly Pricing & Demand Matrix</h2>
          <p className="text-xs font-medium text-gray-500 mt-1">Projected pricing tiers based on historical occupancy data.</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest"><span className="w-2 h-2 rounded-full bg-[#BC2C2C]"></span> High</div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest"><span className="w-2 h-2 rounded-full bg-amber-400"></span> Medium</div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest"><span className="w-2 h-2 rounded-full bg-blue-100"></span> Low</div>
        </div>
      </div>
      
      <div className="overflow-x-auto pb-4">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr>
              <th className="px-4 py-2 text-[10px] font-bold text-gray-400 tracking-widest uppercase w-40">Venue Category</th>
              {months.map(m => (
                <th key={m} className="px-2 py-2 text-[10px] font-bold text-gray-400 tracking-widest uppercase text-center w-16">{m}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-8 text-sm font-semibold text-gray-400">
                  No venues match the selected category.
                </td>
              </tr>
            ) : (
              filteredData.map((row, idx) => (
                <tr key={idx} className="transition-all duration-300">
                  <td className="px-4 py-3 text-xs font-bold text-gray-700 bg-white">{row.category}</td>
                  {row.prices.map((price, pIdx) => {
                    const finalPrice = (price * totalFactor).toFixed(1);
                    const cellOcc = occupancies[pIdx];
                    return (
                      <td key={pIdx} className="px-1 py-1">
                        <div 
                          onClick={() => onClickCell?.(row.category, months[pIdx], finalPrice, cellOcc)}
                          className={`w-full h-8 flex items-center justify-center text-[10px] font-bold rounded-lg transition-all duration-300 cursor-pointer hover:scale-105 shadow-sm hover:shadow-md ${row.colors[pIdx]}`}
                        >
                          ${finalPrice}k
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
