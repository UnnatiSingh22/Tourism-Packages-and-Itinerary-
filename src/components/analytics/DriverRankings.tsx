import React from 'react';
import { Star } from 'lucide-react';

export function DriverRankings() {
  const drivers = [
    {
      name: 'Julian Moretti',
      rating: 4.95,
      idle: '1.2m / trip',
      fuel: '98%',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      name: 'Elena Fischer',
      rating: 4.88,
      idle: '1.4m / trip',
      fuel: '94%',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      name: 'Marc Durand',
      rating: 4.82,
      idle: '2.1m / trip',
      fuel: '89%',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  ];

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-lg font-bold text-gray-900">Driver Efficiency Rankings</h2>
        <span className="px-3 py-1 bg-orange-50 text-orange-600 text-[10px] font-bold tracking-widest uppercase rounded-lg">
          Top 10%
        </span>
      </div>

      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Driver Name</th>
              <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Trip Rating</th>
              <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Idle Time</th>
              <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Fuel Score</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver, idx) => (
              <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <img src={driver.avatar} alt={driver.name} className="w-8 h-8 rounded-full object-cover" />
                    <span className="text-sm font-bold text-gray-900">{driver.name}</span>
                  </div>
                </td>
                <td className="py-4 text-center">
                  <div className="flex items-center justify-center gap-1.5 text-sm font-bold text-gray-700">
                    <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                    {driver.rating}
                  </div>
                </td>
                <td className="py-4 text-xs text-gray-500 font-medium text-center">
                  {driver.idle}
                </td>
                <td className="py-4 text-sm font-extrabold text-gray-900 text-right">
                  {driver.fuel}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
