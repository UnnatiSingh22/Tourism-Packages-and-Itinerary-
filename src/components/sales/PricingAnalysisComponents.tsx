import React from 'react';
import { Calculator, TrendingUp, Sparkles, Eye, Loader2 } from 'lucide-react';
import { formatRupee } from '../../lib/utils';

interface PricingProps {
  inputs: {
    paxCount: number;
    childCount: number;
    infantCount: number;
    addOnsTotal: number;
  };
  onChangeInputs: (newInputs: any) => void;
  pricingResult: any;
  selectedPackage: any;
  loading?: boolean;
}

export function MarginCalculator({ inputs, onChangeInputs, pricingResult, selectedPackage, loading = false }: PricingProps) {
  const basePrice = selectedPackage ? Number(selectedPackage.basePrice) : 0;
  const marginPerPax = selectedPackage?.pricing ? Number(selectedPackage.pricing.marginPerPax) : 0;
  const seasonalAdjustment = selectedPackage?.pricing ? Number(selectedPackage.pricing.seasonalAdjustment) : 0;

  // Simple handler
  const updateInput = (key: string, value: number) => {
    onChangeInputs({
      ...inputs,
      [key]: isNaN(value) ? 0 : Math.max(0, value),
    });
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center justify-between">
        <span className="flex items-center gap-2">
          <Calculator className="w-4 h-4 text-amber-500" /> Dynamic Pricing Inputs
        </span>
        {loading && <Loader2 className="w-3.5 h-3.5 animate-spin text-[#BC2C2C]" />}
      </h3>

      <div className="space-y-4">
        {/* Package configuration (readonly in simulator) */}
        <div className="grid grid-cols-3 gap-2 bg-gray-50/50 p-2.5 rounded-xl border border-gray-100">
          <div>
            <span className="block text-[9px] font-bold text-gray-400 uppercase">Base Price</span>
            <span className="text-xs font-bold text-gray-900">{formatRupee(basePrice)}</span>
          </div>
          <div>
            <span className="block text-[9px] font-bold text-gray-400 uppercase">Pax Margin</span>
            <span className="text-xs font-bold text-gray-900">{formatRupee(marginPerPax)}</span>
          </div>
          <div>
            <span className="block text-[9px] font-bold text-gray-400 uppercase">Seasonal</span>
            <span className="text-xs font-bold text-gray-900">{formatRupee(seasonalAdjustment)}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-[10px] font-bold text-gray-500 mb-1">Adults</label>
            <input
              type="number"
              min="1"
              value={inputs.paxCount}
              onChange={(e) => updateInput('paxCount', parseInt(e.target.value))}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-xs font-bold text-gray-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
          
          <div>
            <label className="block text-[10px] font-bold text-gray-500 mb-1">Children</label>
            <input
              type="number"
              min="0"
              value={inputs.childCount}
              onChange={(e) => updateInput('childCount', parseInt(e.target.value))}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-xs font-bold text-gray-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-500 mb-1">Infants</label>
            <input
              type="number"
              min="0"
              value={inputs.infantCount}
              onChange={(e) => updateInput('infantCount', parseInt(e.target.value))}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-xs font-bold text-gray-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-gray-500 mb-1">Custom Add-Ons (₹)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">₹</span>
            <input
              type="number"
              min="0"
              value={inputs.addOnsTotal}
              onChange={(e) => updateInput('addOnsTotal', parseFloat(e.target.value))}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-7 pr-3 py-2 text-xs font-bold text-gray-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
        <span className="text-xs font-bold text-gray-500">Markup Margin per Guest</span>
        <div className="flex items-center gap-1.5 text-amber-600">
          <span className="text-sm font-extrabold">
            {basePrice > 0 ? ((marginPerPax / basePrice) * 100).toFixed(1) : '0.0'}%
          </span>
          <TrendingUp className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}

export function SimulationPreview({ inputs, onChangeInputs, pricingResult, selectedPackage, loading = false }: PricingProps) {
  const result = pricingResult || {
    adultCount: 0,
    adultUnitPrice: 0,
    adultTotal: 0,
    childCount: 0,
    childUnitPrice: 0,
    childTotal: 0,
    infantCount: 0,
    infantUnitPrice: 0,
    infantTotal: 0,
    totalAddOns: 0,
    grandTotal: 0,
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
      <div>
        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#BC2C2C]" /> Real-time Calculation Breakdown
          </span>
          {loading && <Loader2 className="w-3.5 h-3.5 animate-spin text-[#BC2C2C]" />}
        </h3>

        <div className="space-y-3.5 text-xs text-gray-600">
          <div className="flex justify-between items-center">
            <span>Adults ({result.adultCount} x {formatRupee(result.adultUnitPrice, 2)})</span>
            <span className="font-bold text-gray-900">{formatRupee(result.adultTotal, 2)}</span>
          </div>
          
          {result.childCount > 0 && (
            <div className="flex justify-between items-center">
              <span>Children ({result.childCount} x {formatRupee(result.childUnitPrice, 2)})</span>
              <span className="font-bold text-gray-900">{formatRupee(result.childTotal, 2)}</span>
            </div>
          )}

          {result.infantCount > 0 && (
            <div className="flex justify-between items-center">
              <span>Infants ({result.infantCount} x {formatRupee(result.infantUnitPrice, 2)})</span>
              <span className="font-bold text-gray-900">{formatRupee(result.infantTotal, 2)}</span>
            </div>
          )}

          <div className="flex justify-between items-center pb-4 border-b border-gray-100">
            <span>Total Add-Ons</span>
            <span className="font-bold text-gray-900">{formatRupee(result.totalAddOns, 2)}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl bg-gradient-to-br from-[#E65A4B] to-[#BC2C2C] p-5 text-white relative overflow-hidden">
        <Sparkles className="absolute right-0 top-0 w-24 h-24 text-white/10 translate-x-1/4 -translate-y-1/4" />
        <div className="relative z-10">
          <p className="text-[9px] font-bold uppercase tracking-widest mb-1 opacity-90">Simulated Package Total</p>
          <div className="flex items-baseline gap-1 mb-4">
            <span className="text-2xl font-black">{formatRupee(result.grandTotal, 2)}</span>
            <span className="text-[10px] font-medium opacity-80">est. total</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold opacity-90">Auto-Apply to Live Quotes</span>
            {/* Mock Toggle */}
            <div className="w-8 h-4 bg-white/30 rounded-full relative cursor-pointer">
              <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface YieldChartProps {
  selectedSeason?: 'peak' | 'shoulder' | 'off-peak';
  paxCount?: number;
}

export function YieldAnalysisChart({ selectedSeason = 'peak', paxCount = 2 }: YieldChartProps) {
  // Scale factor based on season and pax count
  let seasonFactor = 1.0;
  if (selectedSeason === 'shoulder') seasonFactor = 0.75;
  else if (selectedSeason === 'off-peak') seasonFactor = 0.5;

  const paxBonus = Math.min(20, (paxCount || 1) * 2.5); // Pax count increases yield slightly
  
  const baseHeights = [40, 70, 30, 60, 80, 40];
  const scaledHeights = baseHeights.map(h => Math.min(100, Math.max(10, Math.round(h * seasonFactor + paxBonus))));

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex-1">
        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-6">Market Yield Analysis</h3>
        <div className="h-40 flex items-end justify-around gap-2 px-4 pb-6 border-b border-gray-100 mb-2 relative">
          <div className="w-8 bg-blue-100 rounded-t-sm transition-all duration-500" style={{ height: `${scaledHeights[0]}%` }}></div>
          <div className="w-8 bg-blue-200 rounded-t-sm transition-all duration-500" style={{ height: `${scaledHeights[1]}%` }}></div>
          <div className="w-8 bg-amber-100 rounded-t-sm transition-all duration-500" style={{ height: `${scaledHeights[2]}%` }}></div>
          <div className="w-8 bg-amber-200 rounded-t-sm transition-all duration-500" style={{ height: `${scaledHeights[3]}%` }}></div>
          <div className="w-8 bg-[#E65A4B] rounded-t-sm transition-all duration-500" style={{ height: `${scaledHeights[4]}%` }}></div>
          <div className="w-8 bg-blue-50 rounded-t-sm transition-all duration-500" style={{ height: `${scaledHeights[5]}%` }}></div>
        </div>
        <div className="flex justify-between px-4 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
          <span>Week 01</span><span>Week 05</span><span>Week 10</span>
        </div>
      </div>

      <div className="bg-[#1A1A24] rounded-3xl p-6 shadow-sm text-white shrink-0 md:w-64 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <h3 className="text-[11px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2 text-red-400">
            <Sparkles className="w-4 h-4" /> AI Forecasting
          </h3>
          <p className="text-xs font-medium text-gray-400 leading-relaxed">
            Based on historical data, we recommend increasing the 'Heritage Group' rate by 8.4% for July.
          </p>
        </div>
        <button className="w-full mt-6 py-3 bg-white/10 hover:bg-white/20 transition-colors text-white text-xs font-bold rounded-xl backdrop-blur-sm relative z-10 border border-white/10">
          Apply Suggestion
        </button>
      </div>
    </div>
  );
}
