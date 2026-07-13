import React from 'react';

export function VehicleStatusTable() {
  const vehicles = [
    { id: 'V-882', model: 'Mercedes-Benz S-Class', type: 'Luxury Sedan', driver: 'Marcus Thorne', status: 'In Transit', statusColor: 'bg-blue-50 text-blue-600', fuel: '78%', nextService: '12,000 mi' },
    { id: 'V-104', model: 'Cadillac Escalade', type: 'Premium SUV', driver: 'Unassigned', status: 'Idle', statusColor: 'bg-gray-100 text-gray-600', fuel: '100%', nextService: '15,500 mi' },
    { id: 'V-559', model: 'BMW i7', type: 'Electric Sedan', driver: 'Elena Rodriguez', status: 'Charging', statusColor: 'bg-emerald-50 text-emerald-600', fuel: '45%', nextService: '8,000 mi' },
    { id: 'V-331', model: 'Mercedes Sprinter', type: 'Executive Van', driver: 'Jordan Smith', status: 'Maintenance', statusColor: 'bg-orange-50 text-orange-600', fuel: 'N/A', nextService: 'In Shop' },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-900">Live Vehicle Status</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Vehicle</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Driver</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Fuel/Battery</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Next Service</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v, idx) => (
              <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <p className="text-sm font-bold text-gray-900">{v.model}</p>
                  <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">{v.id} • {v.type}</p>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-600">{v.driver}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${v.statusColor}`}>
                    {v.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-600">{v.fuel}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-600">{v.nextService}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
