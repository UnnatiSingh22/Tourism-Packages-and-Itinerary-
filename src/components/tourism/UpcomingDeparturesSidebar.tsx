import React from 'react';
import { CalendarDays, Sparkles } from 'lucide-react';

export function UpcomingDeparturesSidebar() {
  const departures = [
    { name: 'Swiss Alps Retreat', date: 'Oct 15', pax: '12 Pax', status: 'FULLY BOOKED', statusColor: 'bg-emerald-500', barWidth: '100%', img: 'https://images.unsplash.com/photo-1531366936337-77cf3a2278e3?w=100&h=100&fit=crop' },
    { name: 'Bali Wellness Journey', date: 'Oct 22', pax: '8 Pax', status: '2 Slots Remaining', statusColor: 'bg-[#BC2C2C]', barWidth: '80%', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=100&h=100&fit=crop' },
    { name: 'Icelandic Aurora Tour', date: 'Nov 05', pax: '6 Pax', status: '8 Slots Remaining', statusColor: 'bg-[#BC2C2C]', barWidth: '40%', img: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=100&h=100&fit=crop' }
  ];

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-900 leading-tight">Upcoming<br/>Departures</h2>
          <CalendarDays className="w-5 h-5 text-[#BC2C2C]" />
        </div>

        <div className="space-y-6 flex-1">
          {departures.map((dep, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <img src={dep.img} alt={dep.name} className="w-12 h-12 rounded-xl object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-bold text-gray-900 truncate">{dep.name}</h3>
                <p className="text-[10px] font-medium text-gray-500 mb-2">{dep.date} • {dep.pax}</p>
                <div className="w-full h-1.5 bg-gray-100 rounded-full mb-1">
                  <div className={`h-full rounded-full ${dep.statusColor}`} style={{ width: dep.barWidth }}></div>
                </div>
                <p className={`text-[8px] font-bold uppercase tracking-widest ${dep.status === 'FULLY BOOKED' ? 'text-emerald-500' : 'text-gray-500'}`}>{dep.status}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-6 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
          Manage All Departures
        </button>
      </div>

      <div className="bg-gradient-to-br from-[#FF6B6B] to-[#BC2C2C] rounded-3xl p-6 shadow-sm text-white relative overflow-hidden">
        <Sparkles className="absolute right-0 bottom-0 w-32 h-32 text-white/10 translate-x-1/4 translate-y-1/4" />
        <div className="relative z-10">
          <h3 className="text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
            <div className="p-1.5 bg-white/20 rounded-md"><Sparkles className="w-3 h-3" /></div>
            Concierge AI Insight
          </h3>
          <p className="text-sm font-medium text-white/90 leading-relaxed italic">
            "High demand detected for Mediterranean packages in Q1. Recommend early bird launch for Athens & Greek Isles Discovery."
          </p>
        </div>
      </div>
    </div>
  );
}
