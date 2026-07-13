import React from 'react';
import { useMasterData } from '../../context/MasterDataContext';

export function AvailableDrivers() {
  const { masters } = useMasterData();
  const drivers = masters.staff
    .filter(s => s.role === 'Driver' && s.status === 'Active')
    .map((s, idx) => {
      const vehicle = masters.vehicles[idx % masters.vehicles.length]?.name || 'Standard Van';
      return {
        name: s.name,
        vehicle: `${vehicle} • V-${100 + idx}`,
        avatar: `https://images.unsplash.com/photo-${1500648767791 + idx}?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`,
        border: idx === 0 ? 'border-l-[3px] border-emerald-500' : 'border-transparent'
      };
    });

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Available Drivers</h3>
        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[9px] font-bold tracking-widest uppercase rounded">12 Active</span>
      </div>

      <div className="space-y-3">
        {drivers.map((driver, idx) => (
          <div key={idx} className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-4 ${driver.border}`}>
            <img src={driver.avatar} alt={driver.name} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <h4 className="text-sm font-bold text-gray-900">{driver.name}</h4>
              <p className="text-xs text-gray-500">{driver.vehicle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
