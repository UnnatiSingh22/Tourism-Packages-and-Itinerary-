import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';

export interface Supplier {
  id: string;
  category: 'hotels' | 'transport' | 'catering';
  name: string;
  rating: number;
  location: string;
  roomRate: number;
  confRate: number;
  breakfast: boolean;
  tier: string;
  image: string;
  recommended: boolean;
  contractNo: string;
  terms: string;
}

export function SupplierCards({
  activeTab,
  setActiveTab,
  selectedId,
  setSelectedId,
  onViewContract,
  suppliers
}: {
  activeTab: 'hotels' | 'transport' | 'catering';
  setActiveTab: (tab: 'hotels' | 'transport' | 'catering') => void;
  selectedId: string;
  setSelectedId: (id: string) => void;
  onViewContract: (supplier: Supplier) => void;
  suppliers: Supplier[];
}) {
  const filteredSuppliers = suppliers.filter(s => s.category === activeTab);

  return (
    <div className="mb-8">
      {/* Tabs */}
      <div className="flex gap-6 mb-6 border-b border-gray-100">
        <button
          onClick={() => setActiveTab('hotels')}
          className={`pb-3 text-sm font-bold transition-colors ${
            activeTab === 'hotels'
              ? 'text-red-600 border-b-2 border-red-600'
              : 'text-gray-500 hover:text-gray-900 font-semibold'
          }`}
        >
          Hotels
        </button>
        <button
          onClick={() => setActiveTab('transport')}
          className={`pb-3 text-sm font-bold transition-colors ${
            activeTab === 'transport'
              ? 'text-red-600 border-b-2 border-red-600'
              : 'text-gray-500 hover:text-gray-900 font-semibold'
          }`}
        >
          Transport
        </button>
        <button
          onClick={() => setActiveTab('catering')}
          className={`pb-3 text-sm font-bold transition-colors ${
            activeTab === 'catering'
              ? 'text-red-600 border-b-2 border-red-600'
              : 'text-gray-500 hover:text-gray-900 font-semibold'
          }`}
        >
          Catering
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSuppliers.map((supplier) => {
          const isSelected = selectedId === supplier.id;
          return (
            <div
              key={supplier.id}
              className={`bg-white rounded-3xl border-2 shadow-sm overflow-hidden flex flex-col relative transition-all ${
                isSelected ? 'border-red-500 ring-2 ring-red-500/20' : 'border-gray-100 hover:border-gray-200'
              }`}
            >
              {supplier.recommended && (
                <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-red-600 text-white text-[10px] font-bold tracking-widest uppercase rounded">
                  Recommended
                </div>
              )}
              
              <div className="relative h-40 bg-gray-100">
                <img
                  src={supplier.image}
                  alt={supplier.name}
                  className="w-full h-full object-cover"
                />
                {!supplier.recommended && (
                  <div className="absolute top-4 right-4 px-2 py-1 bg-white/90 backdrop-blur rounded text-xs font-bold text-gray-900 flex items-center gap-1">
                    <Star className="w-3 h-3 text-gray-900 fill-gray-900" /> {supplier.rating}
                  </div>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-base font-bold text-gray-900">{supplier.name}</h3>
                  <span className="px-2 py-0.5 bg-gray-50 text-gray-500 border border-gray-200 text-[9px] font-bold uppercase tracking-widest rounded shrink-0 ml-2">
                    {supplier.tier}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-6">{supplier.location}</p>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">
                      {activeTab === 'hotels'
                        ? 'Classic Room (Avg)'
                        : activeTab === 'transport'
                        ? 'Charter Rate (Avg)'
                        : 'Menu Per Pax'}
                    </span>
                    <span className={`text-sm font-bold ${isSelected ? 'text-red-600' : 'text-gray-900'}`}>
                      ${supplier.roomRate} {activeTab === 'hotels' ? '/ night' : activeTab === 'transport' ? '/ day' : '/ head'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">
                      {activeTab === 'hotels'
                        ? 'Conference Day Rate'
                        : activeTab === 'transport'
                        ? 'Hourly Wait Rate'
                        : 'Event Setup Fee'}
                    </span>
                    <div className="text-right">
                      <span className="block text-sm font-bold text-gray-900">${supplier.confRate} /</span>
                      <span className="block text-xs text-gray-500">person</span>
                    </div>
                  </div>

                  {activeTab === 'hotels' && (
                    <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                      <span className="text-sm font-medium text-gray-600">Breakfast Inclusive</span>
                      {supplier.breakfast ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <span className="text-xs text-gray-400">Not Incl.</span>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-auto flex gap-3">
                  <button
                    onClick={() => onViewContract(supplier)}
                    className="flex-1 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    View Contract
                  </button>
                  <button
                    onClick={() => setSelectedId(supplier.id)}
                    className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#E65A4B] to-[#F17361] text-white shadow-sm'
                        : 'bg-red-50 text-red-600 hover:bg-red-100'
                    }`}
                  >
                    {isSelected ? 'Selected' : 'Select'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
