import React, { useState } from 'react';
import { SupplierMetrics } from '../components/vendors/SupplierMetrics';
import { formatRupee } from '../lib/utils';
import { SupplierCards, type Supplier } from '../components/vendors/SupplierCards';
import { RateTrendAnalysis } from '../components/vendors/RateTrendAnalysis';
import { ContractSummary } from '../components/vendors/ContractSummary';
import { Download, X, ShieldCheck, Award, GitMerge, Check, Eye } from 'lucide-react';
import { useMasterData } from '../context/MasterDataContext';

export function SupplierComparisonPage() {
  const { masters } = useMasterData();
  const [activeTab, setActiveTab] = useState<'hotels' | 'transport' | 'catering'>('hotels');
  
  // Extended mock data details for comparison sheet
  const suppliersData: (Supplier & { availability: string; amenities: string; distance: string; reviews: string; policy: string })[] = [
    ...masters.hotels.filter(h => h.status === 'Active').map((h, i) => ({
      id: h.id,
      category: 'hotels' as const,
      name: h.name,
      rating: h.stars || 4.5,
      location: h.location || 'Local',
      roomRate: h.price || 300,
      confRate: Math.round((h.price || 300) * 0.25),
      breakfast: true,
      tier: (h.stars || 5) >= 5 ? 'Tier 1' : 'Tier 2',
      image: h.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000',
      recommended: h.recommended || false,
      contractNo: h.contractNo || `#H-${h.id.substring(0, 4)}`,
      terms: h.description || 'Standard luxury hotel contract terms apply.',
      availability: i % 2 === 0 ? '92%' : '84%',
      amenities: i % 2 === 0 ? 'Spa, Pool, Free Breakfast, Gym' : 'Pool, Lounge, High-Speed WiFi',
      distance: `${(1.2 + i * 0.7).toFixed(1)} km`,
      reviews: i % 2 === 0 ? 'Excellent (4.8/5)' : 'Very Good (4.4/5)',
      policy: i % 2 === 0 ? 'Free Cancellation 48h before' : 'Non-refundable booking lock'
    })),
    ...masters.transport.filter(t => t.status === 'Active').map((t, i) => ({
      id: t.id,
      category: 'transport' as const,
      name: t.name,
      rating: t.rating || 4.5,
      location: t.location || 'Local',
      roomRate: t.roomRate || 500,
      confRate: t.confRate || 50,
      breakfast: false,
      tier: t.tier || 'Tier 1',
      image: t.image || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1000',
      recommended: t.recommended || false,
      contractNo: t.contractNo || `#T-${t.id.substring(0, 4)}`,
      terms: t.terms || 'Standard ground transport logistics agreement terms apply.',
      availability: '100%',
      amenities: 'Chauffeur, Wi-Fi, Charging Ports',
      distance: '0.0 km (Airport Dispatch)',
      reviews: 'Exceptional (4.9/5)',
      policy: 'Standard 24h dispatch release policy'
    })),
    ...masters.vendors.filter(v => v.status === 'Active').map((v, i) => ({
      id: v.id,
      category: 'catering' as const,
      name: v.name,
      rating: v.rating || 4.5,
      location: v.location || 'Local',
      roomRate: v.roomRate || 100,
      confRate: v.confRate || 30,
      breakfast: false,
      tier: v.tier || 'Tier 1',
      image: v.image || 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1000',
      recommended: v.recommended || false,
      contractNo: v.contractNo || `#C-${v.id.substring(0, 4)}`,
      terms: v.terms || 'Standard custom catering service level agreement terms apply.',
      availability: '88%',
      amenities: 'Tasting Bar, Custom Menus, Service Staff',
      distance: '4.5 km',
      reviews: 'Delightful (4.7/5)',
      policy: '50% refund on cancellations under 7 days'
    }))
  ];

  const activeCategorySuppliers = suppliersData.filter(s => s.category === activeTab);
  
  const defaultSelectedId = activeCategorySuppliers.length > 0 ? activeCategorySuppliers[0].id : '';
  const [selectedId, setSelectedId] = useState<string>('');
  
  const currentSelectedId = selectedId && activeCategorySuppliers.some(s => s.id === selectedId) 
    ? selectedId 
    : defaultSelectedId;

  const [activeContractSupplier, setActiveContractSupplier] = useState<Supplier | null>(null);
  const selectedSupplier = suppliersData.find(s => s.id === currentSelectedId);

  // Compare Checklist State
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const handleTabChange = (tab: 'hotels' | 'transport' | 'catering') => {
    setActiveTab(tab);
    setCompareIds([]); // Clear selection on category swap
    const categorySuppliers = suppliersData.filter(s => s.category === tab);
    const recommended = categorySuppliers.find(s => s.recommended) || categorySuppliers[0];
    if (recommended) {
      setSelectedId(recommended.id);
    }
  };

  const toggleCompareSelect = (id: string) => {
    setCompareIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,Category,Vendor Name,Rating,Base Rate,Conf Rate,Tier,Contract Number,Availability,Amenities,Distance to Venue,Cancellation Policy\n" +
      suppliersData.map(s => `"${s.category}","${s.name}","${s.rating}","${s.roomRate}","${s.confRate}","${s.tier}","${s.contractNo}","${s.availability}","${s.amenities}","${s.distance}","${s.policy}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Vendor_Rate_Comparison.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const compareSuppliers = suppliersData.filter(s => compareIds.includes(s.id));

  return (
    <div className="animate-in fade-in duration-500 pb-12 relative flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="max-w-2xl">
          <h1 className="text-[22px] font-semibold text-gray-900 tracking-tight mb-2">
            Supplier Rate Comparison Center
          </h1>
          <p className="text-sm text-gray-500">
            Analyze and benchmark seasonal rates, availability metrics, distance, and booking policy clauses across suppliers.
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          {compareIds.length > 1 && (
            <button 
              onClick={() => setShowCompareModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-[#BC2C2C] text-white text-sm font-semibold rounded-xl shadow-md hover:bg-[#8B2020] transition-colors h-12"
            >
              <GitMerge className="w-4 h-4" /> Compare Side-by-Side ({compareIds.length})
            </button>
          )}

          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm h-12"
          >
            <Download className="w-4 h-4 text-[#BC2C2C]" /> Export Analysis
          </button>
        </div>
      </div>

      <SupplierMetrics />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column */}
        <div className="flex-1 min-w-0 flex flex-col gap-6">
          {/* Checkboxes selection bar */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 flex flex-wrap gap-4 items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Select Multiple for Comparison:</span>
            <div className="flex flex-wrap gap-3">
              {activeCategorySuppliers.map(s => {
                const isSelected = compareIds.includes(s.id);
                return (
                  <button
                    key={s.id}
                    onClick={() => toggleCompareSelect(s.id)}
                    className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-xl border font-semibold transition-all ${
                      isSelected 
                        ? 'bg-red-50 border-red-200 text-[#BC2C2C]' 
                        : 'bg-gray-50 border-gray-100 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {isSelected ? <Check className="w-3.5 h-3.5" /> : null}
                    {s.name}
                  </button>
                );
              })}
            </div>
          </div>

          <SupplierCards
            activeTab={activeTab}
            setActiveTab={handleTabChange}
            selectedId={currentSelectedId}
            setSelectedId={setSelectedId}
            onViewContract={setActiveContractSupplier}
            suppliers={suppliersData}
          />
          <RateTrendAnalysis />
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-[320px] xl:w-[380px] shrink-0">
          <ContractSummary selectedSupplier={selectedSupplier} />
        </div>
      </div>

      {/* Side-by-Side Comparison Modal */}
      {showCompareModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowCompareModal(false)}>
          <div 
            className="bg-white rounded-3xl w-full max-w-4xl p-6 shadow-2xl border border-gray-100 flex flex-col gap-4 animate-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <div>
                <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <GitMerge className="w-5 h-5 text-[#BC2C2C]" /> Side-by-Side Supplier Benchmarking
                </h3>
                <p className="text-xs text-gray-500 mt-0.5 font-medium">Detailed specifications, rates, amenities, and policies comparison</p>
              </div>
              <button onClick={() => setShowCompareModal(false)} className="text-gray-400 hover:text-gray-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Benchmarking Grid */}
            <div className="overflow-x-auto text-xs font-semibold text-gray-700">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Comparison Criteria</th>
                    {compareSuppliers.map(s => (
                      <th key={s.id} className="px-4 py-3 text-gray-900 font-bold w-1/3">{s.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <tr>
                    <td className="px-4 py-3 font-bold text-gray-500">Contract Reference</td>
                    {compareSuppliers.map(s => (
                      <td key={s.id} className="px-4 py-3 font-mono text-gray-900">{s.contractNo}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-gray-500">Quality Rating</td>
                    {compareSuppliers.map(s => (
                      <td key={s.id} className="px-4 py-3 text-amber-500 font-bold">{s.rating} ★</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-gray-500">Base Unit Rate</td>
                    {compareSuppliers.map(s => (
                      <td key={s.id} className="px-4 py-3 text-gray-900 font-black">{formatRupee(s.roomRate)}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-gray-500">Event / Conference Rate</td>
                    {compareSuppliers.map(s => (
                      <td key={s.id} className="px-4 py-3 text-gray-900 font-black">{formatRupee(s.confRate)}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-gray-500">Guaranteed Availability</td>
                    {compareSuppliers.map(s => (
                      <td key={s.id} className="px-4 py-3 text-emerald-600 font-black">{s.availability}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-gray-500">Included Amenities</td>
                    {compareSuppliers.map(s => (
                      <td key={s.id} className="px-4 py-3 text-gray-600 font-medium leading-relaxed">{s.amenities}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-gray-500">Distance to Venue</td>
                    {compareSuppliers.map(s => (
                      <td key={s.id} className="px-4 py-3 text-gray-700">{s.distance}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-gray-500">Guest Review Index</td>
                    {compareSuppliers.map(s => (
                      <td key={s.id} className="px-4 py-3 text-gray-900 font-black">{s.reviews}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-gray-500">Cancellation Clause Policy</td>
                    {compareSuppliers.map(s => (
                      <td key={s.id} className="px-4 py-3 text-red-600 font-bold leading-normal">{s.policy}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
              <button 
                onClick={handleExportCSV}
                className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-bold"
              >
                Download Comparison CSV
              </button>
              <button 
                onClick={() => setShowCompareModal(false)}
                className="px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-bold"
              >
                Close Comparison
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contract Terms Details Modal */}
      {activeContractSupplier && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-xl border border-gray-100 flex flex-col gap-4 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest">Supplier Contract Agreement</span>
                <h3 className="text-lg font-bold text-gray-900">{activeContractSupplier.name}</h3>
              </div>
              <button 
                onClick={() => setActiveContractSupplier(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 my-2 text-sm text-gray-600">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 border border-gray-100 rounded-2xl flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Contract Reference</span>
                  <span className="text-sm font-bold text-gray-900 mt-0.5">{activeContractSupplier.contractNo}</span>
                </div>
                <div className="p-3 bg-gray-50 border border-gray-100 rounded-2xl flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Vendor Tier</span>
                  <span className="text-sm font-bold text-red-600 mt-0.5">{activeContractSupplier.tier}</span>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-gray-50 pb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" /> Standard Legal Clauses
                </h4>
                <div className="space-y-2 text-xs leading-relaxed">
                  <p>
                    <strong>1. Rate Structure:</strong> Rates quoted are valid for Q3/Q4 2024 operations and subject to standard volume multipliers. Base rate of <span className="font-semibold text-gray-900">{formatRupee(activeContractSupplier.roomRate)}</span> and event rate of <span className="font-semibold text-gray-900">{formatRupee(activeContractSupplier.confRate)}</span> are locked under contract guidelines.
                  </p>
                  <p>
                    <strong>2. Specific Terms:</strong> {activeContractSupplier.terms}
                  </p>
                  <p>
                    <strong>3. Indemnification & Liability:</strong> Both parties agree to standard mutual indemnification policies. Incidents related to Force Majeure shall release both parties from immediate contract liability under 48-hour notification conditions.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-red-50/50 border border-red-100 rounded-2xl flex items-start gap-3">
                <Award className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-red-900">Preferred Procurement Terms</h5>
                  <p className="text-[11px] text-red-700/80 leading-relaxed mt-0.5">
                    This contract complies with EventHub 360 gold supplier standards. Procurement volume rebates are calculated annually.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={() => setActiveContractSupplier(null)}
                className="flex-1 py-3 bg-gray-900 hover:bg-gray-800 text-white text-sm font-bold rounded-xl shadow-sm transition-colors text-center"
              >
                Close Contract Viewer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

