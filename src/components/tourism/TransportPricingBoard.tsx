import { useState } from 'react';
import { Car, Search, Trash2, Plus, Minus, Check } from 'lucide-react';
import { useMasterData } from '../../context/MasterDataContext';

interface SelectedVehicle {
  id: string;
  name: string;
  rate: number;
  hours: number;
  subtotal: number;
  image?: string;
}

interface TransportPricingBoardProps {
  selectedVehicles: SelectedVehicle[];
  onUpdateVehicles: (vehicles: SelectedVehicle[]) => void;
}

import { formatRupee } from '../../lib/utils';

export function TransportPricingBoard({
  selectedVehicles,
  onUpdateVehicles
}: TransportPricingBoardProps) {
  const { masters } = useMasterData();
  const [searchQuery, setSearchQuery] = useState('');

  const activeVehicles = masters.vehicles.filter(v => v.status === 'Active').map(v => {
    let emoji = '🚗';
    const nameLower = v.name.toLowerCase();
    if (nameLower.includes('suv')) emoji = '🚙';
    else if (nameLower.includes('van') || nameLower.includes('tempo')) emoji = '🚐';
    else if (nameLower.includes('bus') || nameLower.includes('coach')) emoji = '🚌';
    return {
      id: v.id,
      name: v.name,
      rate: Number((v as any).rate || (v as any).price || 500),
      image: emoji
    };
  });

  const filteredRates = activeVehicles.filter(v => 
    v.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleSelect = (vehicle: any) => {
    const isSelected = selectedVehicles.some(v => v.id === vehicle.id);
    if (isSelected) {
      onUpdateVehicles(selectedVehicles.filter(v => v.id !== vehicle.id));
    } else {
      onUpdateVehicles([...selectedVehicles, {
        id: vehicle.id,
        name: vehicle.name,
        rate: vehicle.rate,
        hours: 8, // default to 8 hours
        subtotal: vehicle.rate * 8,
        image: vehicle.image
      }]);
    }
  };

  const handleHoursChange = (id: string, operation: 'inc' | 'dec') => {
    const updated = selectedVehicles.map(v => {
      if (v.id === id) {
        const nextHours = operation === 'inc' ? v.hours + 1 : Math.max(1, v.hours - 1);
        return {
          ...v,
          hours: nextHours,
          subtotal: v.rate * nextHours
        };
      }
      return v;
    });
    onUpdateVehicles(updated);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
      <div className="flex justify-between items-center mb-6 border-b border-gray-50 pb-3">
        <div>
          <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <Car className="w-4 h-4 text-emerald-500" /> Transportation & Fleet Selection
          </h3>
          <p className="text-xs text-gray-400 font-medium mt-1">Assign luxury sedans, SUVs, and coaches calculated hourly.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available Fleet Column */}
        <div className="space-y-4">
          <div>
            <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Search Fleet Vehicles</h4>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search Sedan, SUV, Coach..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#BC2C2C]/30 transition-all" 
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
            {filteredRates.map((vehicle) => {
              const isSelected = selectedVehicles.some(v => v.id === vehicle.id);

              return (
                <div 
                  key={vehicle.id}
                  className={`border rounded-xl p-3.5 flex justify-between items-center transition-all bg-white shadow-xs ${
                    isSelected ? 'border-emerald-500 bg-emerald-50/5' : 'border-gray-150'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{vehicle.image}</span>
                    <div>
                      <span className="block text-xs font-extrabold text-gray-900">{vehicle.name}</span>
                      <span className="block text-[10px] text-gray-400 font-semibold mt-0.5">
                        Hourly Rate: {formatRupee(vehicle.rate)}/hr
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleToggleSelect(vehicle)}
                    className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all flex items-center gap-1 ${
                      isSelected 
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : 'bg-[#BC2C2C] text-white hover:bg-[#8B2020]'
                    }`}
                  >
                    {isSelected ? <Check className="w-3.5 h-3.5" /> : null}
                    {isSelected ? 'Assigned' : 'Assign Vehicle'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Fleet Breakdown Column */}
        <div className="flex flex-col h-full border-t lg:border-t-0 lg:border-l border-gray-100 lg:pl-6 pt-6 lg:pt-0">
          <h4 className="text-[10px] font-bold text-[#BC2C2C] uppercase tracking-widest mb-4 flex items-center justify-between">
            <span>Assigned Fleet ({selectedVehicles.length})</span>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              Total: {formatRupee(selectedVehicles.reduce((sum, v) => sum + v.subtotal, 0))}
            </span>
          </h4>

          <div className="space-y-3 flex-1 overflow-y-auto max-h-[400px]">
            {selectedVehicles.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-gray-50 rounded-2xl border border-dashed border-gray-200 py-12">
                <Car className="w-8 h-8 text-gray-300 mb-2" />
                <p className="text-xs font-semibold text-gray-400 max-w-[200px] leading-relaxed">
                  No vehicles assigned. Click "Assign Vehicle" to configure hours and calculate cost.
                </p>
              </div>
            ) : (
              selectedVehicles.map(v => (
                <div key={v.id} className="bg-white border border-gray-150 rounded-2xl p-4 flex justify-between items-center shadow-xs">
                  <div>
                    <span className="block text-xs font-bold text-gray-900 leading-snug">{v.name}</span>
                    <span className="block text-[10px] text-gray-400 font-semibold mt-0.5">Rate: {formatRupee(v.rate)}/hr</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleHoursChange(v.id, 'dec')}
                        className="w-7 h-7 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-gray-800 min-w-8 text-center">{v.hours} hrs</span>
                      <button
                        type="button"
                        onClick={() => handleHoursChange(v.id, 'inc')}
                        className="w-7 h-7 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right min-w-[70px]">
                      <span className="text-xs font-black text-gray-900 block">{formatRupee(v.subtotal)}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onUpdateVehicles(selectedVehicles.filter(x => x.id !== v.id))}
                      className="text-gray-400 hover:text-red-600 transition-colors p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
