import React from 'react';
import { formatRupee } from '../../lib/utils';

export function DynamicPricingMatrix({ selectedSeason = 'peak' }: { selectedSeason?: 'peak' | 'shoulder' | 'off-peak' }) {
  const seasonalData = {
    peak: [
      { category: 'Premium Luxe', prices: [1200, 1400, 1900, 2200, 3100, 4500, 4400], colors: ['bg-orange-50', 'bg-orange-100', 'bg-orange-200', 'bg-red-200', 'bg-[#E65A4B] text-white', 'bg-[#BC2C2C] text-white', 'bg-[#8B2020] text-white'] },
      { category: 'Heritage Group', prices: [850, 850, 920, 1100, 1400, 1900, 1800], colors: ['bg-amber-50', 'bg-amber-50', 'bg-amber-100', 'bg-orange-100', 'bg-orange-200', 'bg-orange-300', 'bg-amber-900 text-white'] },
      { category: 'Standard Solo', prices: [400, 400, 450, 520, 680, 950, 920], colors: ['bg-purple-100', 'bg-purple-100', 'bg-purple-200', 'bg-purple-300', 'bg-purple-400 text-white', 'bg-purple-600 text-white', 'bg-purple-500 text-white'] },
    ],
    shoulder: [
      { category: 'Premium Luxe', prices: [1000, 1100, 1400, 1700, 2200, 2900, 2800], colors: ['bg-amber-50', 'bg-amber-50', 'bg-amber-100', 'bg-orange-100', 'bg-orange-200', 'bg-orange-300', 'bg-amber-900 text-white'] },
      { category: 'Heritage Group', prices: [720, 750, 810, 900, 1100, 1400, 1300], colors: ['bg-amber-50', 'bg-amber-50', 'bg-amber-100', 'bg-amber-200', 'bg-orange-100', 'bg-orange-200', 'bg-orange-300'] },
      { category: 'Standard Solo', prices: [320, 340, 390, 450, 550, 720, 700], colors: ['bg-purple-5', 'bg-purple-50', 'bg-purple-100', 'bg-purple-200', 'bg-purple-300', 'bg-purple-400 text-white', 'bg-purple-500 text-white'] },
    ],
    'off-peak': [
      { category: 'Premium Luxe', prices: [800, 850, 1100, 1200, 1600, 2100, 2000], colors: ['bg-blue-50', 'bg-blue-100', 'bg-blue-200', 'bg-purple-100', 'bg-purple-200', 'bg-purple-300', 'bg-purple-500 text-white'] },
      { category: 'Heritage Group', prices: [580, 600, 650, 720, 850, 1000, 980], colors: ['bg-blue-50', 'bg-blue-50', 'bg-blue-100', 'bg-blue-200', 'bg-purple-100', 'bg-purple-200', 'bg-purple-300 text-white'] },
      { category: 'Standard Solo', prices: [250, 280, 310, 350, 420, 520, 500], colors: ['bg-blue-50', 'bg-blue-50', 'bg-blue-100', 'bg-blue-100', 'bg-blue-200', 'bg-blue-300', 'bg-blue-400 text-white'] },
    ]
  };

  const data = seasonalData[selectedSeason] || seasonalData.peak;
  
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL'];

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Pricing Matrix Heatmap</h2>
          <p className="text-xs font-medium text-gray-500 mt-1">Inventory rates cross-referenced by month and group size.</p>
        </div>
        <div className="flex bg-gray-50 rounded-lg p-1 border border-gray-100">
          <button className="px-4 py-1.5 text-xs font-bold text-[#BC2C2C] bg-white rounded-md shadow-sm">Tableau</button>
          <button className="px-4 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700">Visual</button>
        </div>
      </div>

      <div className="overflow-x-auto pb-4 mb-8">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr>
              <th className="px-4 py-2 text-[10px] font-bold text-gray-400 tracking-widest uppercase w-32"></th>
              {months.map(m => (
                <th key={m} className="px-2 py-2 text-[10px] font-bold text-gray-400 tracking-widest uppercase text-center w-16">{m}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx}>
                <td className="px-4 py-3 text-xs font-bold text-gray-700 bg-white leading-tight">
                  {row.category.split(' ').map((word, i) => <React.Fragment key={i}>{word}<br/></React.Fragment>)}
                </td>
                {row.prices.map((price, pIdx) => (
                  <td key={pIdx} className="px-1 py-1">
                    <div className={`w-full h-10 flex items-center justify-center text-[10px] font-bold rounded-lg ${row.colors[pIdx]}`}>
                      {formatRupee(price, 0, true)}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-6 pt-6 border-t border-gray-100">
        <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Heatmap Legend:</span>
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-600"><span className="w-3 h-3 rounded bg-[#BC2C2C]"></span> High Demand</div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-600"><span className="w-3 h-3 rounded bg-orange-200"></span> Shoulder Rates</div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-600"><span className="w-3 h-3 rounded bg-amber-50"></span> Standard</div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-600"><span className="w-3 h-3 rounded bg-blue-50"></span> Off-Peak / Promo</div>
        </div>
      </div>
    </div>
  );
}
