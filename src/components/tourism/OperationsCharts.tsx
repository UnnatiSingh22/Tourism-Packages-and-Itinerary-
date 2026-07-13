import React from 'react';
import { MoreVertical } from 'lucide-react';

export function RevenueTrendsChart() {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex flex-col h-full min-h-[300px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-900">Revenue Trends</h2>
        <span className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-bold rounded-full border border-gray-100">Last 6 Months</span>
      </div>

      <div className="flex-1 relative mt-4">
        {/* Mock Chart SVG (Smooth line curve with gradient fill) */}
        <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible" preserveAspectRatio="none">
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E65A4B" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#E65A4B" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#E65A4B" />
              <stop offset="100%" stopColor="#BC2C2C" />
            </linearGradient>
          </defs>
          <path d="M0,40 C15,40 25,25 40,35 C55,45 65,10 80,10 C90,10 95,25 100,25" fill="none" stroke="url(#lineGradient)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          <path d="M0,40 C15,40 25,25 40,35 C55,45 65,10 80,10 C90,10 95,25 100,25 L100,50 L0,50 Z" fill="url(#areaGradient)" />
          
          {/* Points */}
          <circle cx="25" cy="30" r="1.5" fill="#BC2C2C" stroke="white" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
          <circle cx="65" cy="22.5" r="1.5" fill="#BC2C2C" stroke="white" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
          <circle cx="95" cy="25" r="1.5" fill="#BC2C2C" stroke="white" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
        </svg>

        <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
        </div>
      </div>
    </div>
  );
}

interface Booking {
  initials: string;
  name: string;
  pkg: string;
  date: string;
  status: string;
  statusColor: string;
  avatarColor: string;
}

export function RecentBookingsTable({ bookings = [], onViewAll }: { bookings?: Booking[]; onViewAll?: () => void }) {
  const defaultBookings = [
    { initials: 'JD', name: 'Jonathan Doe', pkg: 'Alpine Ski Discovery', date: 'Oct 12, 2024', status: 'Confirmed', statusColor: 'text-emerald-500 bg-emerald-50', avatarColor: 'bg-red-50 text-red-600' },
    { initials: 'SM', name: 'Sarah Miller', pkg: 'Riviera Wine Tour', date: 'Oct 14, 2024', status: 'Pending', statusColor: 'text-orange-500 bg-orange-50', avatarColor: 'bg-amber-50 text-amber-600' },
    { initials: 'RK', name: 'Robert King', pkg: 'Kyoto Sakura Trail', date: 'Oct 18, 2024', status: 'Waitlist', statusColor: 'text-gray-500 bg-gray-100', avatarColor: 'bg-purple-50 text-purple-600' },
    { initials: 'EL', name: 'Emma Larsen', pkg: 'Amazon Basin Expedition', date: 'Nov 02, 2024', status: 'Confirmed', statusColor: 'text-emerald-500 bg-emerald-50', avatarColor: 'bg-blue-50 text-blue-600' },
  ];

  const currentBookings = bookings.length > 0 ? bookings : defaultBookings;

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col mt-6">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-900">Recent Bookings</h2>
        <button 
          onClick={onViewAll}
          className="text-[#BC2C2C] text-xs font-bold hover:text-[#8B2020]"
        >
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 tracking-wide">Traveler Name</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 tracking-wide">Package</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 tracking-wide">Departure Date</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 tracking-wide">Status</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {currentBookings.map((b, idx) => (
              <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${b.avatarColor}`}>
                      {b.initials}
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{b.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-600">{b.pkg}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-600">{b.date}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${b.statusColor}`}>
                    {b.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-gray-600"><MoreVertical className="w-5 h-5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
