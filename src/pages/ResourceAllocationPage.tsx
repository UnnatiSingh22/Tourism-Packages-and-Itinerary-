import React, { useState } from 'react';
import { ResourceMetrics } from '../components/dashboard/ResourceMetrics';
import { CapacityHeatmap } from '../components/dashboard/CapacityHeatmap';
import { ResourceAlerts } from '../components/dashboard/ResourceAlerts';
import { AllocationChanges } from '../components/dashboard/AllocationChanges';
import { GuideScheduleModal } from '../components/dashboard/GuideScheduleModal';
import { Filter, X, Calendar, Users, Bus, Building2, Compass, Download, CheckCircle2, AlertTriangle, Search } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

type AllocationCategory = 'all' | 'staff' | 'vehicle' | 'hotel' | 'guide';

const CATEGORY_FILTERS: { id: AllocationCategory; label: string; icon: React.ReactNode; color: string }[] = [
  { id: 'all', label: 'All Resources', icon: <Filter className="w-3.5 h-3.5" />, color: 'bg-gray-900 text-white' },
  { id: 'staff', label: 'Staff', icon: <Users className="w-3.5 h-3.5" />, color: 'bg-blue-500 text-white' },
  { id: 'vehicle', label: 'Vehicles', icon: <Bus className="w-3.5 h-3.5" />, color: 'bg-emerald-500 text-white' },
  { id: 'hotel', label: 'Hotels', icon: <Building2 className="w-3.5 h-3.5" />, color: 'bg-purple-500 text-white' },
  { id: 'guide', label: 'Guides', icon: <Compass className="w-3.5 h-3.5" />, color: 'bg-amber-500 text-white' },
];

const MOCK_ALLOCATIONS_REPORT = [
  { resource: 'Rajesh Verma', category: 'Guide', location: 'Jaipur, Rajasthan', status: 'Assigned', tour: 'Rajasthan Heritage Circuit', load: '92%', updateTime: '2026-07-12' },
  { resource: 'Coach Bus #88', category: 'Vehicle', location: 'Jaipur, Rajasthan', status: 'Assigned', tour: 'Rajasthan Heritage Circuit', load: '85%', updateTime: '2026-07-12' },
  { resource: 'Ananya Singh', category: 'Guide', location: 'Sonamarg, Kashmir', status: 'Assigned', tour: 'Kashmir Trek', load: '100%', updateTime: '2026-07-11' },
  { resource: 'Toyota Coaster #12', category: 'Vehicle', location: 'Sonamarg, Kashmir', status: 'Grounded', tour: 'None (Maintenance)', load: '0%', updateTime: '2026-07-10' },
  { resource: 'Grand Hyatt Goa', category: 'Hotel', location: 'Bambolim, Goa', status: 'Active', tour: 'Goa Beaches Escape', load: '74%', updateTime: '2026-07-12' },
  { resource: 'Mohammed Al-Farsi', category: 'Guide', location: 'Dubai Hub', status: 'Assigned', tour: 'Dubai Luxury Immersion', load: '65%', updateTime: '2026-07-12' },
  { resource: 'Priya Nair', category: 'Guide', location: 'Alleppey, Kerala', status: 'Assigned', tour: 'Kerala Backwaters Tour', load: '88%', updateTime: '2026-07-12' }
];

export function ResourceAllocationPage() {
  const { activeHeaderTab } = useCurrency();
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'quarter'>('month');
  const [category, setCategory] = useState<AllocationCategory>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showGuideSchedule, setShowGuideSchedule] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleDownloadReport = () => {
    const csvContent = "data:text/csv;charset=utf-8,Resource,Category,Location,Status,Tour Circuit,Load Rate,Last Updated\n" +
      MOCK_ALLOCATIONS_REPORT.map(a => `"${a.resource}","${a.category}","${a.location}","${a.status}","${a.tour}","${a.load}","${a.updateTime}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Resource_Allocation_Summary_${timeframe}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredAllocations = MOCK_ALLOCATIONS_REPORT.filter(a => {
    const matchesSearch = a.resource.toLowerCase().includes(searchQuery.toLowerCase()) || a.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = category === 'all' || a.category.toLowerCase() === category.toLowerCase() || (category === 'guide' && a.category === 'Guide');
    return matchesSearch && matchesCat;
  });

  return (
    <div className="animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
        <div className="max-w-2xl">
          <h1 className="text-[22px] font-semibold text-gray-900 tracking-tight mb-2">
            Resource Allocation
          </h1>
          <p className="text-[15px] text-gray-600 leading-relaxed">
            Real-time capacity tracking across global tour circuits.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="flex bg-white rounded-xl shadow-sm border border-gray-100 p-1">
            {(['week', 'month', 'quarter'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-4 py-2 text-xs font-bold transition-all rounded-lg capitalize ${timeframe === t ? 'bg-[#BC2C2C] text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
              >
                {t}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowGuideSchedule(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#1F2937] hover:bg-[#111827] text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
          >
            <Compass className="w-4 h-4 text-amber-400" />
            View Guide Schedule
          </button>

          <button 
            onClick={handleDownloadReport}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Download className="w-4 h-4 text-[#E65A4B]" />
            Download Summary
          </button>

          <button
            onClick={() => setShowFilters(p => !p)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm border ${showFilters ? 'bg-[#BC2C2C] text-white border-[#BC2C2C]' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="mb-6 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-900">Filter by Allocation Category</h3>
            <button onClick={() => setShowFilters(false)} className="text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORY_FILTERS.map(c => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  category === c.id
                    ? `${c.color} shadow-sm border-transparent`
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300'
                }`}
              >
                {c.icon}
                {c.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {activeHeaderTab === 'overview' ? (
        <>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-[300px] xl:w-[340px] shrink-0">
              <ResourceMetrics timeframe={timeframe} />
            </div>

            <div className="flex-1 min-w-0 flex flex-col">
              <CapacityHeatmap timeframe={timeframe} />
              <ResourceAlerts />
            </div>
          </div>

          <AllocationChanges />
        </>
      ) : (
        /* Reports view */
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col gap-6 animate-in fade-in duration-300">
          <div className="flex justify-between items-center pb-4 border-b border-gray-100 flex-wrap gap-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Resource Assignment Ledger</h2>
              <p className="text-xs text-gray-500 mt-0.5">Comprehensive audit trail of active personnel, hotel capacities and transportation fleet routing</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-1.5 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#BC2C2C]/30 w-48"
                />
              </div>

              <button 
                onClick={handleDownloadReport}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-[#BC2C2C] hover:bg-[#8B2020] text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
              >
                <Download className="w-3.5 h-3.5" /> Export Ledger
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50/50">
                  <th className="px-6 py-3">Resource Asset</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Circuit Base</th>
                  <th className="px-6 py-3">Assigned Tour</th>
                  <th className="px-6 py-3">Load Rate</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Last Checked</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredAllocations.length === 0 ? (
                  <tr><td colSpan={7} className="px-6 py-8 text-center text-xs text-gray-400">No records found.</td></tr>
                ) : filteredAllocations.map((a, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/30 transition-colors text-xs text-gray-700 font-semibold">
                    <td className="px-6 py-4 text-gray-900 font-bold">{a.resource}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-lg">{a.category}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{a.location}</td>
                    <td className="px-6 py-4 font-mono text-[#BC2C2C]">{a.tour}</td>
                    <td className="px-6 py-4 font-black">{a.load}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-[10px] font-bold border ${
                        a.status === 'Assigned' || a.status === 'Active' 
                          ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
                          : 'bg-red-50 border-red-100 text-red-600'
                      }`}>
                        {a.status === 'Assigned' || a.status === 'Active' ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                        {a.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400">{a.updateTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showGuideSchedule && <GuideScheduleModal onClose={() => setShowGuideSchedule(false)} />}
    </div>
  );
}
