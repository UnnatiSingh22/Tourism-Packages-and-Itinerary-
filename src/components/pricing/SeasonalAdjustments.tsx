import React, { useState } from 'react';
import { Calendar as CalendarIcon, Filter, MoreHorizontal, X, ChevronDown } from 'lucide-react';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const SEASON_DATA: Record<string, { name: string; color: string; dates: string; change: string; changeColor: string; status: string; statusColor: string; packages: string; revenue: string; occupancy: string; suggestedPrice: string; }[]> = {
  January: [
    { name: 'Winter Off-Peak', color: 'bg-blue-400', dates: 'Nov 01 – Mar 15', change: '-25%', changeColor: 'text-emerald-500', status: 'Active', statusColor: 'bg-emerald-50 text-emerald-600', packages: '12 Tours', revenue: '₹14.2L', occupancy: '38%', suggestedPrice: '₹72,000' },
    { name: 'Republic Day Special', color: 'bg-amber-400', dates: 'Jan 24 – Jan 27', change: '+15%', changeColor: 'text-orange-500', status: 'Active', statusColor: 'bg-emerald-50 text-emerald-600', packages: '6 Tours', revenue: '₹4.8L', occupancy: '89%', suggestedPrice: '₹1,15,000' },
  ],
  March: [
    { name: 'Spring Shoulder', color: 'bg-emerald-400', dates: 'Mar 16 – May 31', change: '+5%', changeColor: 'text-orange-500', status: 'Active', statusColor: 'bg-emerald-50 text-emerald-600', packages: '28 Tours', revenue: '₹28.6L', occupancy: '62%', suggestedPrice: '₹95,000' },
    { name: 'Holi Festival Surge', color: 'bg-pink-400', dates: 'Mar 25 – Mar 26', change: '+40%', changeColor: 'text-orange-500', status: 'Active', statusColor: 'bg-emerald-50 text-emerald-600', packages: '8 Tours', revenue: '₹11.2L', occupancy: '98%', suggestedPrice: '₹1,40,000' },
  ],
  June: [
    { name: 'Peak Summer High', color: 'bg-orange-400', dates: 'Jun 15 – Aug 31', change: '+35%', changeColor: 'text-orange-500', status: 'Active', statusColor: 'bg-emerald-50 text-emerald-600', packages: '48 Tours', revenue: '₹68.4L', occupancy: '92%', suggestedPrice: '₹1,35,000' },
    { name: 'Monsoon Discount', color: 'bg-teal-400', dates: 'Jun 01 – Jun 14', change: '-18%', changeColor: 'text-emerald-500', status: 'Active', statusColor: 'bg-emerald-50 text-emerald-600', packages: '15 Tours', revenue: '₹9.2L', occupancy: '44%', suggestedPrice: '₹68,000' },
  ],
  September: [
    { name: 'Autumn Shoulder', color: 'bg-purple-500', dates: 'Sep 01 – Oct 31', change: '-10%', changeColor: 'text-emerald-500', status: 'Active', statusColor: 'bg-emerald-50 text-emerald-600', packages: '32 Tours', revenue: '₹42.6L', occupancy: '74%', suggestedPrice: '₹90,000' },
    { name: 'Navratri Premium', color: 'bg-yellow-400', dates: 'Sep 29 – Oct 08', change: '+22%', changeColor: 'text-orange-500', status: 'Active', statusColor: 'bg-emerald-50 text-emerald-600', packages: '10 Tours', revenue: '₹18.4L', occupancy: '96%', suggestedPrice: '₹1,22,000' },
  ],
  December: [
    { name: 'Winter Peak Holidays', color: 'bg-red-400', dates: 'Dec 20 – Jan 05', change: '+45%', changeColor: 'text-orange-500', status: 'Active', statusColor: 'bg-emerald-50 text-emerald-600', packages: '38 Tours', revenue: '₹88.2L', occupancy: '99%', suggestedPrice: '₹1,45,000' },
    { name: 'Off-Season Dec Base', color: 'bg-gray-400', dates: 'Dec 01 – Dec 19', change: '+8%', changeColor: 'text-orange-500', status: 'Draft', statusColor: 'bg-blue-50 text-blue-600', packages: '18 Tours', revenue: '₹22.1L', occupancy: '65%', suggestedPrice: '₹1,08,000' },
  ],
};

const DEFAULT_SEASON = [
  { name: 'Peak Summer High', color: 'bg-orange-400', dates: 'Jun 15 – Aug 31', change: '+35%', changeColor: 'text-orange-500', status: 'Active', statusColor: 'bg-emerald-50 text-emerald-600', packages: '48 Tours', revenue: '₹68.4L', occupancy: '92%', suggestedPrice: '₹1,35,000' },
  { name: 'Autumn Shoulder', color: 'bg-purple-500', dates: 'Sep 01 – Oct 31', change: '-10%', changeColor: 'text-emerald-500', status: 'Active', statusColor: 'bg-emerald-50 text-emerald-600', packages: '32 Tours', revenue: '₹42.6L', occupancy: '74%', suggestedPrice: '₹90,000' },
  { name: 'Winter Off-Peak', color: 'bg-blue-400', dates: 'Nov 01 – Mar 15', change: '-25%', changeColor: 'text-emerald-500', status: 'Draft', statusColor: 'bg-blue-50 text-blue-600', packages: '12 Tours', revenue: '₹14.2L', occupancy: '38%', suggestedPrice: '₹72,000' },
];

export function SeasonalAdjustments() {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [showMonthFilter, setShowMonthFilter] = useState(false);

  const seasons = selectedMonth
    ? (SEASON_DATA[selectedMonth] || DEFAULT_SEASON)
    : DEFAULT_SEASON;

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center gap-3 text-gray-800">
          <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold">Seasonal Adjustments</h2>
            {selectedMonth && <p className="text-[11px] text-[#BC2C2C] font-bold">{selectedMonth} filter active</p>}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setShowMonthFilter(p => !p)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-3.5 h-3.5" />
              {selectedMonth || 'Filter By Month'}
              <ChevronDown className="w-3 h-3" />
            </button>
            {showMonthFilter && (
              <div className="absolute top-full right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-20 p-2 w-44 animate-in fade-in zoom-in-95 duration-150">
                <button onClick={() => { setSelectedMonth(''); setShowMonthFilter(false); }} className="w-full text-left px-3 py-2 text-xs font-bold text-gray-500 hover:bg-gray-50 rounded-xl">All Months</button>
                {MONTHS.map(m => (
                  <button
                    key={m}
                    onClick={() => { setSelectedMonth(m); setShowMonthFilter(false); }}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-xl transition-colors ${selectedMonth === m ? 'bg-[#BC2C2C]/10 text-[#BC2C2C]' : 'hover:bg-gray-50 text-gray-700'}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#E65A4B] to-[#F17361] text-white rounded-xl text-xs font-semibold shadow-soft hover:shadow-md transition-shadow">
            Sync With Calendar
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="pb-3 text-[11px] font-bold text-gray-800 uppercase tracking-widest pl-2">Season Name</th>
              <th className="pb-3 text-[11px] font-bold text-gray-800 uppercase tracking-widest">Date Range</th>
              <th className="pb-3 text-[11px] font-bold text-gray-800 uppercase tracking-widest">Adjustment %</th>
              <th className="pb-3 text-[11px] font-bold text-gray-800 uppercase tracking-widest">Revenue</th>
              <th className="pb-3 text-[11px] font-bold text-gray-800 uppercase tracking-widest">Occupancy</th>
              <th className="pb-3 text-[11px] font-bold text-gray-800 uppercase tracking-widest">Suggested Price</th>
              <th className="pb-3 text-[11px] font-bold text-gray-800 uppercase tracking-widest">Status</th>
              <th className="pb-3 text-[11px] font-bold text-gray-800 uppercase tracking-widest">Packages</th>
              <th className="pb-3 text-[11px] font-bold text-gray-800 uppercase tracking-widest text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {seasons.map((season, i) => (
              <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
                <td className="py-4 pl-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${season.color}`}></div>
                    <span className="text-sm font-bold text-gray-900">{season.name}</span>
                  </div>
                </td>
                <td className="py-4 text-xs font-medium text-gray-500 whitespace-nowrap">{season.dates}</td>
                <td className={`py-4 text-sm font-bold ${season.changeColor}`}>{season.change}</td>
                <td className="py-4 text-sm font-semibold text-gray-700">{season.revenue}</td>
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-gray-100 rounded-full">
                      <div className="h-full bg-[#BC2C2C] rounded-full" style={{ width: season.occupancy }}></div>
                    </div>
                    <span className="text-xs font-bold text-gray-700">{season.occupancy}</span>
                  </div>
                </td>
                <td className="py-4 text-sm font-bold text-gray-900">{season.suggestedPrice}</td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${season.statusColor}`}>{season.status}</span>
                </td>
                <td className="py-4 text-xs font-medium text-gray-500">{season.packages}</td>
                <td className="py-4 text-center text-gray-400 hover:text-gray-600 cursor-pointer transition-colors">
                  <MoreHorizontal className="w-5 h-5 mx-auto" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
