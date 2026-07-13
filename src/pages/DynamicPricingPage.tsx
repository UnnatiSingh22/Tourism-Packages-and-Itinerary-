import React, { useState, useEffect, useMemo } from 'react';
import { PricingRulesPanel } from '../components/sales/PricingRulesPanel';
import { DynamicPricingMatrix } from '../components/sales/DynamicPricingMatrix';
import { MarginCalculator, SimulationPreview, YieldAnalysisChart } from '../components/sales/PricingAnalysisComponents';
import { Download, Plus, RefreshCw, X, Check, Search } from 'lucide-react';
import { getPackages, calculatePricing } from '../lib/api';
import { useMasterData } from '../context/MasterDataContext';
import { formatRupee } from '../lib/utils';
import { useCurrency } from '../context/CurrencyContext';

// Mock Yield reports dataset
const MOCK_YIELD_REPORT = [
  { pkgName: 'Iconic Rajasthan Tour', baseCost: 45000, margin: 8000, peakPrice: 58000, offPeakPrice: 38000, yieldMTD: '+18.4%' },
  { pkgName: 'Kerala Backwaters Voyage', baseCost: 32000, margin: 6500, peakPrice: 42000, offPeakPrice: 28000, yieldMTD: '+12.1%' },
  { pkgName: 'Kashmir Himalayan Trek', baseCost: 28000, margin: 6000, peakPrice: 39000, offPeakPrice: 24000, yieldMTD: '+8.6%' },
  { pkgName: 'Dubai Luxury Immersion', baseCost: 95000, margin: 22000, peakPrice: 135000, offPeakPrice: 85000, yieldMTD: '+24.5%' },
  { pkgName: 'Amalfi Serenity Escapes', baseCost: 185000, margin: 38000, peakPrice: 245000, offPeakPrice: 165000, yieldMTD: '+31.2%' }
];

export function DynamicPricingPage() {
  const { masters } = useMasterData();
  const { activeHeaderTab, format } = useCurrency();
  const [packages, setPackages] = useState<any[]>([]);
  const [selectedPackageId, setSelectedPackageId] = useState<string>('');
  const [inputs, setInputs] = useState({
    paxCount: 2,
    childCount: 1,
    infantCount: 0,
    addOnsTotal: 100,
  });
  const [pricingResult, setPricingResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [selectedSeason, setSelectedSeason] = useState<'peak' | 'shoulder' | 'off-peak'>('peak');

  // Config Rules Modal State
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [configSeason, setConfigSeason] = useState<'peak' | 'shoulder' | 'off-peak'>('peak');
  const [dateStart, setDateStart] = useState('2026-10-01');
  const [dateEnd, setDateEnd] = useState('2027-03-31');
  const [weekendRule, setWeekendRule] = useState('+12% markup');
  const [festivalSurge, setFestivalSurge] = useState('+35% markup');
  const [holidaySurge, setHolidaySurge] = useState('+25% markup');
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // 1. Fetch Packages
  useEffect(() => {
    async function load() {
      try {
        const data = await getPackages();
        const list = data.data || data;
        
        const defaultPackages = masters.packages.filter(p => p.status === 'Active').map((pkg, i) => ({
          id: pkg.id,
          name: pkg.name,
          code: pkg.code,
          status: pkg.status,
          duration: 5 + (i % 3),
          basePrice: 1000 + (i * 250),
          pricing: {
            marginPerPax: 200 + (i * 50),
            seasonalAdjustment: 100 + (i * 30),
            addOnsTotal: 50 + (i * 15)
          }
        }));

        const mergedList = [...(list || [])];
        defaultPackages.forEach(dp => {
          if (!mergedList.some(p => p.id === dp.id || p.name === dp.name)) {
            mergedList.push(dp);
          }
        });

        setPackages(mergedList);
        if (mergedList.length > 0) {
          setSelectedPackageId(mergedList[0].id);
        }
      } catch (err) {
        console.error('Failed to load packages for pricing:', err);
        const defaultPackages = masters.packages.filter(p => p.status === 'Active').map((pkg, i) => ({
          id: pkg.id,
          name: pkg.name,
          code: pkg.code,
          status: pkg.status,
          duration: 5 + (i % 3),
          basePrice: 1000 + (i * 250),
          pricing: {
            marginPerPax: 200 + (i * 50),
            seasonalAdjustment: 100 + (i * 30),
            addOnsTotal: 50 + (i * 15)
          }
        }));
        setPackages(defaultPackages);
        setSelectedPackageId(defaultPackages.length > 0 ? defaultPackages[0].id : '');
      }
    }
    load();
  }, [refreshTrigger, masters.packages]);

  // 2. Dynamic Calculation
  useEffect(() => {
    if (!selectedPackageId) return;

    async function runCalc() {
      setLoading(true);
      try {
        if (selectedPackageId.startsWith('pkg-default')) {
          setPricingResult({ success: true });
        } else {
          const res = await calculatePricing(selectedPackageId, inputs);
          setPricingResult(res);
        }
      } catch (err) {
        console.error('Failed to calculate pricing:', err);
      } finally {
        setLoading(false);
      }
    }

    const debounceTimer = setTimeout(runCalc, 300);
    return () => clearTimeout(debounceTimer);
  }, [selectedPackageId, inputs]);

  const selectedPackage = packages.find(p => p.id === selectedPackageId);

  // 3. Adjust results and pricing parameters dynamically on client based on selectedSeason
  const adjustedPricingResult = useMemo(() => {
    if (!pricingResult) return null;

    let adjustAmount = 0;
    const baseAdjustment = selectedPackage?.pricing ? Number(selectedPackage.pricing.seasonalAdjustment) : 150;
    
    const seasonRecord = masters.seasons.find(s => s.name.toLowerCase() === selectedSeason.toLowerCase());
    const factor = seasonRecord ? Number(seasonRecord.adjustmentFactor) : (selectedSeason === 'peak' ? 1.0 : selectedSeason === 'shoulder' ? 0.5 : -0.25);
    adjustAmount = baseAdjustment * factor;

    const basePrice = selectedPackage ? Number(selectedPackage.basePrice) : 0;
    const marginPerPax = selectedPackage?.pricing ? Number(selectedPackage.pricing.marginPerPax) : 0;
    
    // Adult Price
    const finalAdultUnitPrice = basePrice + marginPerPax + adjustAmount;
    const adultTotal = inputs.paxCount * finalAdultUnitPrice;
    
    // Child Price (75% of adult price)
    const childUnitPrice = finalAdultUnitPrice * 0.75;
    const childTotal = inputs.childCount * childUnitPrice;
    
    // Infant Price (10% of adult price)
    const infantUnitPrice = finalAdultUnitPrice * 0.10;
    const infantTotal = inputs.infantCount * infantUnitPrice;

    const baseAddOns = selectedPackage?.pricing ? Number(selectedPackage.pricing.addOnsTotal) : 0;
    const manualAddOns = Number(inputs.addOnsTotal || 0);
    const totalAddOns = baseAddOns + manualAddOns;

    const grandTotal = adultTotal + childTotal + infantTotal + totalAddOns;

    return {
      adultCount: inputs.paxCount,
      adultUnitPrice: finalAdultUnitPrice,
      adultTotal,
      childCount: inputs.childCount,
      childUnitPrice,
      childTotal,
      infantCount: inputs.infantCount,
      infantUnitPrice,
      infantTotal,
      totalAddOns,
      grandTotal,
    };
  }, [pricingResult, selectedSeason, selectedPackage, inputs, masters.seasons]);

  // Adjust package information display parameters for MarginCalculator
  const adjustedSelectedPackage = useMemo(() => {
    if (!selectedPackage) return null;
    let adjustAmount = 0;
    const baseAdjustment = selectedPackage.pricing ? Number(selectedPackage.pricing.seasonalAdjustment) : 150;

    const seasonRecord = masters.seasons.find(s => s.name.toLowerCase() === selectedSeason.toLowerCase());
    const factor = seasonRecord ? Number(seasonRecord.adjustmentFactor) : (selectedSeason === 'peak' ? 1.0 : selectedSeason === 'shoulder' ? 0.5 : -0.25);
    adjustAmount = baseAdjustment * factor;

    return {
      ...selectedPackage,
      pricing: {
        ...selectedPackage.pricing,
        seasonalAdjustment: adjustAmount
      }
    };
  }, [selectedPackage, selectedSeason, masters.seasons]);

  const handleDownloadPricingReport = () => {
    const csvContent = "data:text/csv;charset=utf-8,Package,Base Cost,Target Margin,Peak Price,Off-Peak Price,MTD Margin Yield\n" +
      MOCK_YIELD_REPORT.map(y => `"${y.pkgName}","${y.baseCost}","${y.margin}","${y.peakPrice}","${y.offPeakPrice}","${y.yieldMTD}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Seasonal_Pricing_Yield_Report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfigModal(false);
    triggerToast(`Configured rules for ${configSeason} successfully saved!`);
  };

  const filteredYields = MOCK_YIELD_REPORT.filter(y => 
    y.pkgName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-in fade-in duration-500 pb-12 relative">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white text-xs px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-in slide-in-from-bottom-2 duration-300">
          <Check className="w-4 h-4 text-emerald-400" />
          <span className="font-bold">{toastMsg}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
        <div className="max-w-2xl">
          <h1 className="text-[22px] font-semibold text-gray-900 tracking-tight mb-2">
            Dynamic Pricing Center
          </h1>
          <p className="text-[15px] text-gray-600 leading-relaxed">
            Optimize tourism package profitability with real-time occupancy triggers and seasonal intelligence.
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0 flex-wrap">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Select Package</span>
            <select
              value={selectedPackageId}
              onChange={(e) => setSelectedPackageId(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#BC2C2C]"
            >
              {packages.length === 0 ? (
                <option value="">No packages available</option>
              ) : (
                packages.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({format(Number(p.basePrice))})
                  </option>
                ))
              )}
            </select>
          </div>

          <button 
            onClick={handleDownloadPricingReport}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm mt-5"
          >
            <Download className="w-4 h-4 text-[#BC2C2C]" /> Pricing Summary
          </button>

          <button
            onClick={() => setRefreshTrigger(prev => prev + 1)}
            className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 shadow-sm transition-colors mt-5"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {activeHeaderTab === 'overview' ? (
        <div className="flex flex-col xl:flex-row gap-6 mb-6">
          <div className="w-full xl:w-[240px] shrink-0">
            <PricingRulesPanel 
              selectedSeason={selectedSeason}
              onSelectSeason={setSelectedSeason}
              onConfigureDates={() => setShowConfigModal(true)}
            />
          </div>
          
          <div className="flex-1 min-w-0 flex flex-col gap-6">
            <DynamicPricingMatrix selectedSeason={selectedSeason} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MarginCalculator
                inputs={inputs}
                onChangeInputs={setInputs}
                pricingResult={adjustedPricingResult}
                selectedPackage={adjustedSelectedPackage}
                loading={loading}
              />
              <SimulationPreview
                inputs={inputs}
                onChangeInputs={setInputs}
                pricingResult={adjustedPricingResult}
                selectedPackage={adjustedSelectedPackage}
                loading={loading}
              />
            </div>

            <YieldAnalysisChart 
              selectedSeason={selectedSeason}
              paxCount={inputs.paxCount}
            />
          </div>
        </div>
      ) : (
        /* Reports view */
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col gap-6 animate-in fade-in duration-300">
          <div className="flex justify-between items-center pb-4 border-b border-gray-100 flex-wrap gap-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Yield and Margins Audit Report</h2>
              <p className="text-xs text-gray-500 mt-0.5 font-medium">Yield index, peak seasonality adjustment margins, and baseline cost audits</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search package name..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-1.5 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#BC2C2C]/30 w-48"
                />
              </div>

              <button 
                onClick={handleDownloadPricingReport}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-[#BC2C2C] hover:bg-[#8B2020] text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
              >
                <Download className="w-3.5 h-3.5" /> Download Report PDF/CSV
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50/50">
                  <th className="px-6 py-3">Package Route</th>
                  <th className="px-6 py-3">Base Costing</th>
                  <th className="px-6 py-3">Target Margin</th>
                  <th className="px-6 py-3">Estimated Peak Price</th>
                  <th className="px-6 py-3">Estimated Off-Peak Price</th>
                  <th className="px-6 py-3">Yield Rate (MTD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredYields.length === 0 ? (
                  <tr><td colSpan={6} className="px-6 py-8 text-center text-xs text-gray-400">No yield audit matched filters.</td></tr>
                ) : filteredYields.map((y, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/30 transition-colors text-xs text-gray-700 font-semibold">
                    <td className="px-6 py-4 text-gray-900 font-bold">{y.pkgName}</td>
                    <td className="px-6 py-4 text-gray-500">{format(y.baseCost)}</td>
                    <td className="px-6 py-4 font-mono text-gray-400">{format(y.margin)}</td>
                    <td className="px-6 py-4 text-rose-600 font-bold">{format(y.peakPrice)}</td>
                    <td className="px-6 py-4 text-blue-600 font-bold">{format(y.offPeakPrice)}</td>
                    <td className="px-6 py-4 text-emerald-500 font-black">{y.yieldMTD}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Configure Season Rules Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowConfigModal(false)}>
          <div 
            className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl border border-gray-100 flex flex-col gap-4 animate-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <div>
                <h3 className="text-base font-bold text-gray-900">Configure Seasonal Calendar & Rules</h3>
                <p className="text-xs text-gray-500 mt-0.5">Define multipliers and festival pricing surcharges</p>
              </div>
              <button onClick={() => setShowConfigModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveConfig} className="space-y-4 text-xs font-semibold text-gray-700">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Season Target</label>
                <select 
                  value={configSeason} 
                  onChange={e => setConfigSeason(e.target.value as any)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
                >
                  <option value="peak">Peak Season</option>
                  <option value="shoulder">Shoulder Season</option>
                  <option value="off-peak">Off-Peak Season</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Start Date</label>
                  <input 
                    type="date" 
                    value={dateStart} 
                    onChange={e => setDateStart(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">End Date</label>
                  <input 
                    type="date" 
                    value={dateEnd} 
                    onChange={e => setDateEnd(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Weekend Rules Multiplier</label>
                <select 
                  value={weekendRule} 
                  onChange={e => setWeekendRule(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
                >
                  <option value="+10% markup">+10% weekend markup</option>
                  <option value="+12% markup">+12% weekend markup</option>
                  <option value="+15% markup">+15% weekend markup</option>
                  <option value="None">None (flat pricing)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Festival Pricing Surge</label>
                  <select 
                    value={festivalSurge} 
                    onChange={e => setFestivalSurge(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
                  >
                    <option value="+30% markup">+30% festival surge</option>
                    <option value="+35% markup">+35% festival surge</option>
                    <option value="+40% markup">+40% festival surge</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Holiday Pricing Surge</label>
                  <select 
                    value={holidaySurge} 
                    onChange={e => setHolidaySurge(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
                  >
                    <option value="+20% markup">+20% holiday surge</option>
                    <option value="+25% markup">+25% holiday surge</option>
                    <option value="+30% markup">+30% holiday surge</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowConfigModal(false)}
                  className="flex-1 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-black transition-colors"
                >
                  Save Configuration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
