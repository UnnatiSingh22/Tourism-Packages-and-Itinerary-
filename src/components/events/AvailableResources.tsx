import React, { useState } from 'react';
import { Search, Car, ShieldCheck, Users } from 'lucide-react';
import { useMasterData } from '../../context/MasterDataContext';

export function AvailableResources() {
  const { masters } = useMasterData();
  const [activeTab, setActiveTab] = useState<'vehicles' | 'venues' | 'staff'>('vehicles');
  const [searchQuery, setSearchQuery] = useState('');

  const resourceData = {
    vehicles: masters.vehicles.filter(v => v.status === 'Active').map(v => ({
      id: v.id,
      icon: Car,
      name: v.name,
      status: 'Available • ' + (v.type || 'Sedan'),
      statusColor: 'text-emerald-500',
      isAvailable: true
    })),
    venues: masters.venues.filter(vn => vn.status === 'Active').map(vn => ({
      id: vn.id,
      icon: ShieldCheck,
      name: vn.name,
      status: 'Available • ' + (vn.location || 'Local'),
      statusColor: 'text-emerald-500',
      isAvailable: true
    })),
    staff: masters.staff.filter(s => s.status === 'Active').map(s => ({
      id: s.id,
      icon: Users,
      name: s.name,
      status: 'Available • ' + (s.role || 'Member'),
      statusColor: 'text-emerald-500',
      isAvailable: true
    }))
  };

  const currentResources = resourceData[activeTab].filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex-1 flex flex-col">
      <h2 className="text-sm font-bold text-gray-900 mb-4">Available Resources</h2>
      
      <div className="relative mb-4">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input 
          type="text" 
          placeholder="Search resources..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-gray-50 border-none rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all placeholder:text-gray-400"
        />
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide">
        <button 
          onClick={() => setActiveTab('vehicles')}
          className={`px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase rounded-lg shrink-0 transition-all ${
            activeTab === 'vehicles' ? 'bg-gray-900 text-white shadow-sm' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          }`}
        >
          Vehicles
        </button>
        <button 
          onClick={() => setActiveTab('venues')}
          className={`px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase rounded-lg shrink-0 transition-all ${
            activeTab === 'venues' ? 'bg-gray-900 text-white shadow-sm' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          }`}
        >
          Venues
        </button>
        <button 
          onClick={() => setActiveTab('staff')}
          className={`px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase rounded-lg shrink-0 transition-all ${
            activeTab === 'staff' ? 'bg-gray-900 text-white shadow-sm' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          }`}
        >
          Staff
        </button>
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto pr-2">
        {currentResources.map((res) => {
          const Icon = res.icon;
          return (
            <div 
              key={res.id} 
              className={`p-3 border border-gray-100 rounded-xl hover:border-gray-200 transition-colors flex gap-3 items-center ${
                res.isAvailable ? 'cursor-grab active:cursor-grabbing' : 'opacity-60 cursor-not-allowed'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-600 shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900">{res.name}</h4>
                <p className={`text-[10px] font-semibold ${res.statusColor}`}>{res.status}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
