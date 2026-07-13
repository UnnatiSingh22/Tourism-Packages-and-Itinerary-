import React, { useState } from 'react';
import { PricingMetrics } from '../components/analytics/PricingMetrics';
import { MonthlyPricingMatrix } from '../components/analytics/MonthlyPricingMatrix';
import { PricingTrendsChart, OccupancyHealthChart, ProactiveInsightCard } from '../components/analytics/PricingComponents';
import { ChevronDown, Filter, Settings, ShieldAlert, Download, X, Search, CheckCircle2, TrendingUp } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

const MOCK_HEATMAP_REPORT = [
  { month: 'January', venue: 'Grand Ballroom', occupancy: '78%', pricingIndex: '1.05x', competitivePrice: '$4.2k', yieldMTD: '+12.4%' },
  { month: 'February', venue: 'Grand Ballroom', occupancy: '82%', pricingIndex: '1.10x', competitivePrice: '$4.5k', yieldMTD: '+15.1%' },
  { month: 'March', venue: 'Penthouse Suite', occupancy: '94%', pricingIndex: '1.45x', competitivePrice: '$3.8k', yieldMTD: '+28.6%' },
  { month: 'April', venue: 'Executive Lounge', occupancy: '91%', pricingIndex: '1.30x', competitivePrice: '$1.5k', yieldMTD: '+22.4%' },
  { month: 'May', venue: 'Garden Atrium', occupancy: '96%', pricingIndex: '1.55x', competitivePrice: '$4.5k', yieldMTD: '+32.1%' }
];

export function SeasonalPricingPage() {
  const { activeHeaderTab } = useCurrency();
  const [category, setCategory] = useState('All');
  const [destination, setDestination] = useState('All');
  const [destSearch, setDestSearch] = useState('');
  const [advancedActive, setAdvancedActive] = useState(false);
  const [minOccupancy, setMinOccupancy] = useState(0);

  // Cell Details Modal State
  const [selectedCell, setSelectedCell] = useState<any | null>(null);
  const [customMarkup, setCustomMarkup] = useState('10');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleDownloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,Month,Venue Category,Occupancy Rate,Pricing Index Multiplier,Recommended Price,Yield MTD\n" +
      MOCK_HEATMAP_REPORT.map(h => `"${h.month}","${h.venue}","${h.occupancy}","${h.pricingIndex}","${h.competitivePrice}","${h.yieldMTD}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Seasonal_Pricing_Heatmap.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleApplyPricing = (e: React.FormEvent) => {
    e.preventDefault();
    triggerToast(`💰 Dynamic pricing update of +${customMarkup}% applied to ${selectedCell.venue} (${selectedCell.month})!`);
    setSelectedCell(null);
  };

  const filteredHeatmap = MOCK_HEATMAP_REPORT.filter(h => 
    h.venue.toLowerCase().includes(destSearch.toLowerCase()) || h.month.toLowerCase().includes(destSearch.toLowerCase())
  );

  return (
    <div className="animate-in fade-in duration-500 pb-12 relative flex flex-col gap-6">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white text-xs px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-in slide-in-from-bottom-2 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="font-bold">{toastMsg}</span>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-2">
        <span>Analytics</span>
        <span>›</span>
        <span className="text-[#BC2C2C]">Pricing Heatmap</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
            Seasonal Pricing Heatmap
          </h1>
          <p className="text-[15px] text-gray-600 leading-relaxed">
            Real-time demand forecasting and competitive pricing analysis for your premium venue portfolio.
          </p>
        </div>

        {/* Dynamic Styled Dropdowns */}
        <div className="flex items-center gap-4 shrink-0 flex-wrap">
          <button 
            onClick={handleDownloadCSV}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Download className="w-4 h-4 text-[#BC2C2C]" /> Export Matrix
          </button>

          {/* Destination Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text"
              placeholder="Search destination..."
              value={destSearch}
              onChange={e => setDestSearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#BC2C2C] w-40"
            />
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="appearance-none flex items-center gap-2 pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#BC2C2C] cursor-pointer"
            >
              <option value="All">All Categories</option>
              <option value="Luxury Elite">Luxury Elite</option>
              <option value="Adventure">Adventure</option>
              <option value="Wellness Retreat">Wellness Retreat</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* Destination Dropdown */}
          <div className="relative">
            <select 
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="appearance-none flex items-center gap-2 pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#BC2C2C] cursor-pointer"
            >
              <option value="All">All Destinations</option>
              <option value="Paris, France">Paris, France</option>
              <option value="Tokyo, Japan">Tokyo, Japan</option>
              <option value="Amalfi Coast, Italy">Amalfi Coast, Italy</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* Advanced Filter Toggle Button */}
          <button 
            onClick={() => setAdvancedActive(!advancedActive)}
            className={`flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-xl transition-all shadow-sm ${
              advancedActive 
                ? 'bg-gradient-to-r from-red-600 to-[#BC2C2C] shadow-md ring-2 ring-red-200' 
                : 'bg-gradient-to-r from-[#F59E0B] to-[#F97316] hover:shadow-md'
            }`}
          >
            <Filter className="w-4 h-4" />
            {advancedActive ? 'Hide Advanced' : 'Advanced Filters'}
          </button>
        </div>
      </div>

      {/* Advanced Filters Slide-down Panel */}
      {advancedActive && (
        <div className="bg-gradient-to-br from-amber-50 to-orange-50/20 border border-amber-100 rounded-3xl p-6 mb-2 animate-in slide-in-from-top duration-300">
          <h3 className="text-xs font-bold text-amber-900 mb-4 flex items-center gap-2">
            <Settings className="w-4 h-4 text-amber-600" /> Advanced Pricing Filters
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-[10px] font-bold text-amber-800 uppercase tracking-wider mb-2">
                Min Occupancy Filter
              </label>
              <select
                value={minOccupancy}
                onChange={(e) => setMinOccupancy(Number(e.target.value))}
                className="w-full bg-white border border-amber-200 rounded-xl px-4 py-2 text-xs font-semibold text-gray-700 focus:outline-none"
              >
                <option value={0}>Show All Occupancy rates</option>
                <option value={50}>Above 50% Occupancy</option>
                <option value={75}>Above 75% Occupancy</option>
                <option value={90}>Above 90% Occupancy</option>
              </select>
            </div>

            <div className="bg-amber-100/50 rounded-xl p-3 border border-amber-200/50 flex items-start gap-2.5 md:col-span-2">
              <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="text-[11px] text-amber-900 font-medium leading-relaxed">
                <span className="font-bold">Active Surcharge (15%):</span> Surcharge simulation applies peak surcharge adjustments dynamically across all matrices and metrics while advanced mode is enabled.
              </div>
            </div>
          </div>
        </div>
      )}

      {activeHeaderTab === 'overview' ? (
        <>
          {/* Pricing Metrics */}
          <PricingMetrics 
            category={category}
            destination={destination}
            advanced={advancedActive}
            minOccupancy={minOccupancy}
          />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            <div className="xl:col-span-2">
              <MonthlyPricingMatrix 
                category={category}
                destination={destination}
                advanced={advancedActive}
                onClickCell={(venue, month, price, occupancy) => setSelectedCell({ venue, month, price, occupancy })}
              />
            </div>
            <div>
              <PricingTrendsChart />
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <ProactiveInsightCard />
            </div>
            <div>
              <OccupancyHealthChart />
            </div>
          </div>
        </>
      ) : (
        /* Reports view */
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col gap-6 animate-in fade-in duration-300">
          <div className="flex justify-between items-center pb-4 border-b border-gray-100 flex-wrap gap-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Seasonal Occupancy & Multiplier Ledgers</h2>
              <p className="text-xs text-gray-500 mt-0.5 font-medium">Yield simulations, occupancy health rates and recommended list pricing metrics</p>
            </div>
            <button 
              onClick={handleDownloadCSV}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-[#BC2C2C] hover:bg-[#8B2020] text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" /> Download Full Matrix
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50/50">
                  <th className="px-6 py-3">Calendar Month</th>
                  <th className="px-6 py-3">Venue Category</th>
                  <th className="px-6 py-3">Log Occupancy</th>
                  <th className="px-6 py-3">Surcharge Index</th>
                  <th className="px-6 py-3">Recommended Price</th>
                  <th className="px-6 py-3">Margin Yield MTD</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredHeatmap.length === 0 ? (
                  <tr><td colSpan={6} className="px-6 py-8 text-center text-xs text-gray-400">No occupancy logs found matching filters.</td></tr>
                ) : filteredHeatmap.map((h, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/30 transition-colors text-xs text-gray-700 font-semibold">
                    <td className="px-6 py-4 text-gray-900 font-bold">{h.month}</td>
                    <td className="px-6 py-4 text-gray-900 font-bold">{h.venue}</td>
                    <td className="px-6 py-4 text-gray-700">{h.occupancy}</td>
                    <td className="px-6 py-4 font-mono text-gray-400">{h.pricingIndex}</td>
                    <td className="px-6 py-4 text-red-600 font-black">{h.competitivePrice}</td>
                    <td className="px-6 py-4 text-emerald-500 font-black">{h.yieldMTD}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Occupancy Detail / Rate Adjustments Modal */}
      {selectedCell && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedCell(null)}>
          <div 
            className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-gray-100 flex flex-col gap-4 animate-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-start pb-2 border-b border-gray-100 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#BC2C2C] flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-gray-900">Occupancy & Rate Planner</h3>
                  <p className="text-[10px] text-gray-500 font-semibold">{selectedCell.venue} • {selectedCell.month}</p>
                </div>
              </div>
              <button onClick={() => setSelectedCell(null)} className="text-gray-400 hover:text-gray-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-gray-700">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Demand Occupancy</p>
                <p className="text-sm font-black text-gray-900 mt-0.5">{selectedCell.occupancy}% Occupied</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Estimated base price</p>
                <p className="text-sm font-black text-[#BC2C2C] mt-0.5">{selectedCell.price} (k/unit)</p>
              </div>
            </div>

            <form onSubmit={handleApplyPricing} className="space-y-4 text-xs font-semibold text-gray-700">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Apply Dynamic Surcharge Markup (%)</label>
                <select 
                  value={customMarkup} 
                  onChange={e => setCustomMarkup(e.target.value)}
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none cursor-pointer"
                >
                  <option value="5">+5% demand surcharge</option>
                  <option value="10">+10% seasonal markup</option>
                  <option value="15">+15% holiday surge</option>
                  <option value="20">+20% peak capacity cap</option>
                  <option value="-10">-10% off-season discount</option>
                </select>
              </div>

              <div className="pt-2 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setSelectedCell(null)}
                  className="flex-1 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 text-xs font-bold"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-2 bg-[#BC2C2C] hover:bg-[#8B2020] text-white rounded-xl text-xs font-bold shadow-sm transition-colors"
                >
                  Apply Rate Surcharge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
