import React, { useState } from 'react';
import { CheckSquare, Square } from 'lucide-react';

export function DocumentSelectionPanel() {
  const [selected, setSelected] = useState<Record<string, boolean>>({
    masterSchedule: true,
    diningGuide: false,
    emergencyList: false,
    grandPlaza: true,
    luxeTransfer: true,
    momaPasses: false,
    operaTickets: false
  });

  const toggle = (key: string) => setSelected(prev => ({ ...prev, [key]: !prev[key] }));

  const CheckboxItem = ({ id, title, subtitle, isChecked }: { id: string, title: string, subtitle: string, isChecked: boolean }) => (
    <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => toggle(id)}>
      <div className="mt-0.5">
        {isChecked ? (
          <CheckSquare className="w-5 h-5 text-[#BC2C2C]" />
        ) : (
          <Square className="w-5 h-5 text-gray-300" />
        )}
      </div>
      <div>
        <h4 className="text-sm font-semibold text-gray-900 leading-tight mb-1">{title}</h4>
        <p className="text-[11px] font-medium text-gray-500">{subtitle}</p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Progress Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-bold text-gray-900">Compilation Progress</h2>
          <span className="text-sm font-bold text-[#BC2C2C]">0%</span>
        </div>
        <div className="w-full h-1.5 bg-gray-100 rounded-full mb-4">
          <div className="h-full bg-blue-100 rounded-full w-[25%] transition-all"></div>
        </div>
        <p className="text-xs font-medium text-gray-500">Select documents to begin...</p>
      </div>

      {/* Selection List Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex-1 overflow-y-auto">
        
        <div className="mb-6">
          <h3 className="text-[11px] font-bold text-[#8B2020] uppercase tracking-widest mb-4">Itinerary Documents</h3>
          <div className="space-y-1">
            <CheckboxItem id="masterSchedule" title="Master Schedule v2.4" subtitle="Confirmed • Updated 2h ago" isChecked={selected.masterSchedule} />
            <CheckboxItem id="diningGuide" title="Local Dining Guide" subtitle="Boutique Curations • PDF" isChecked={selected.diningGuide} />
            <CheckboxItem id="emergencyList" title="Emergency Contact List" subtitle="Standard Protocol" isChecked={selected.emergencyList} />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-[11px] font-bold text-[#8B2020] uppercase tracking-widest mb-4">Service Vouchers</h3>
          <div className="space-y-1">
            <CheckboxItem id="grandPlaza" title="Grand Plaza Hotel Voucher" subtitle="Ref: #GPH-99281 • Paid" isChecked={selected.grandPlaza} />
            <CheckboxItem id="luxeTransfer" title="Luxe Transfer Confirmation" subtitle="Airport Pick-up • VIP" isChecked={selected.luxeTransfer} />
          </div>
        </div>

        <div>
          <h3 className="text-[11px] font-bold text-[#8B2020] uppercase tracking-widest mb-4">Tickets & Admissions</h3>
          <div className="space-y-1">
            <CheckboxItem id="momaPasses" title="Museum of Modern Art Passes" subtitle="Priority Access • 2 Guests" isChecked={selected.momaPasses} />
            <CheckboxItem id="operaTickets" title="Opera House Gala Tickets" subtitle="Front Row • E-Tickets" isChecked={selected.operaTickets} />
          </div>
        </div>

      </div>
    </div>
  );
}
