import React from 'react';
import { CalendarRange, Activity, DollarSign } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

interface PricingRulesPanelProps {
  selectedSeason?: 'peak' | 'shoulder' | 'off-peak';
  onSelectSeason?: (season: 'peak' | 'shoulder' | 'off-peak') => void;
  onConfigureDates?: () => void;
}

export function PricingRulesPanel({ selectedSeason = 'peak', onSelectSeason, onConfigureDates }: PricingRulesPanelProps) {
  const { currency } = useCurrency();
  const seasons = [
    { id: 'peak', name: 'Peak Season', color: 'bg-[#BC2C2C]', activeBg: 'bg-[#FDF3F2] border-red-200', dotBg: 'bg-[#BC2C2C]' },
    { id: 'shoulder', name: 'Shoulder Season', color: 'bg-orange-500', activeBg: 'bg-orange-50 border-orange-200', dotBg: 'bg-orange-500' },
    { id: 'off-peak', name: 'Off-Peak', color: 'bg-blue-500', activeBg: 'bg-blue-50 border-blue-200', dotBg: 'bg-blue-500' },
  ] as const;

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <CalendarRange className="w-4 h-4 text-gray-500" /> Seasonal Rates
        </h3>
        
        <div className="space-y-3 mb-6">
          {seasons.map((s) => {
            const isActive = selectedSeason === s.id;
            return (
              <div 
                key={s.id}
                onClick={() => onSelectSeason?.(s.id)}
                className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all duration-300 ${
                  isActive 
                    ? `${s.activeBg} font-bold scale-[1.02] shadow-sm` 
                    : 'bg-gray-50 border-gray-100 hover:border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${isActive ? s.dotBg : 'bg-gray-300'}`}></span>
                  <span className={`text-sm ${isActive ? 'text-gray-900 font-bold' : 'text-gray-700 font-semibold'}`}>{s.name}</span>
                </div>
                {/* Interactive Toggle */}
                <div className={`w-8 h-4 rounded-full relative transition-colors duration-300 ${isActive ? s.color : 'bg-gray-200'}`}>
                  <div className={`w-3 h-3 bg-white rounded-full absolute top-0.5 shadow-sm transition-all duration-300 ${
                    isActive ? 'right-0.5' : 'left-0.5'
                  }`}></div>
                </div>
              </div>
            );
          })}
        </div>

        <button 
          onClick={onConfigureDates}
          className="w-full text-center text-sm font-bold text-[#BC2C2C] hover:text-[#8B2020] transition-colors"
        >
          Configure Dates & Rules
        </button>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Activity className="w-4 h-4 text-gray-500" /> Occupancy Rules
        </h3>
        
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-bold text-gray-900">Early Bird Trigger</span>
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Active</span>
            </div>
            <p className="text-[11px] font-medium text-gray-500">Applied when occupancy is below 25%.</p>
          </div>

          <div className="h-px bg-gray-100 w-full"></div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-bold text-gray-900">Last Minute Surge</span>
              <span className="text-[10px] font-bold text-[#BC2C2C] uppercase tracking-widest">Standby</span>
            </div>
            <p className="text-[11px] font-medium text-gray-500">Activates at 90% occupancy.</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-gray-500" /> Market Currency
        </h3>
        
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 mb-3">
          <span className="text-sm font-bold text-gray-900 font-bold">
            {currency} - {currency === 'INR' ? 'Indian Rupee (₹)' : currency === 'USD' ? 'US Dollar ($)' : 'Euro (€)'}
          </span>
        </div>
        <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3 flex justify-between items-center">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Live Exchange Rate</span>
          <span className="text-sm font-bold text-blue-700">
            {currency === 'INR' ? '₹1.00' : currency === 'USD' ? '₹83.45' : '₹91.20'}{' '}
            <span className="text-[10px] text-emerald-500 ml-1">+0.05% ↑</span>
          </span>
        </div>
      </div>
    </div>
  );
}
