import React from 'react';
import { BedDouble, Bus, Activity } from 'lucide-react';

export function AllocationChanges() {
  const changes = [
    { icon: <BedDouble className="w-4 h-4 text-blue-500" />, type: 'Marriott Grand', location: 'New York, US', status: 'Increased', statusColor: 'bg-emerald-50 text-emerald-600', date: 'Today, 10:24 AM', requestedBy: 'Sarah Jenkins' },
    { icon: <Bus className="w-4 h-4 text-purple-500" />, type: 'Executive Van Fleet', location: 'Tokyo, JP', status: 'Over-Allocated', statusColor: 'bg-red-50 text-red-600', date: 'Yesterday, 4:15 PM', requestedBy: 'Kenji Sato' },
    { icon: <Activity className="w-4 h-4 text-orange-500" />, type: 'Museum Private Tour', location: 'Rome, IT', status: 'Stable', statusColor: 'bg-gray-100 text-gray-600', date: 'June 8, 2024', requestedBy: 'Marco Rossi' },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex flex-col mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-sm font-bold text-gray-900">Recent Allocation Changes</h2>
        <button className="text-xs font-bold text-red-600 hover:text-red-800 transition-colors">
          Download Report
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Resource Type</th>
              <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Location</th>
              <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Allocation Status</th>
              <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Change Date</th>
              <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Requested By</th>
            </tr>
          </thead>
          <tbody>
            {changes.map((item, idx) => (
              <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span className="text-sm font-bold text-gray-900">{item.type}</span>
                  </div>
                </td>
                <td className="py-4 text-sm font-medium text-gray-600">{item.location}</td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${item.statusColor}`}>
                    {item.status}
                  </span>
                </td>
                <td className="py-4 text-sm font-medium text-gray-500">{item.date}</td>
                <td className="py-4 text-sm font-bold text-gray-900 text-right">{item.requestedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
