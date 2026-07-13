import { useState } from 'react';
import { CommandCenterMetrics } from '../components/dashboard/CommandCenterMetrics';
import { TelemetryMap } from '../components/dashboard/TelemetryMap';
import { OperationalAlerts } from '../components/dashboard/OperationalAlerts';
import { CommandRightSidebar } from '../components/dashboard/CommandRightSidebar';
import { ActivityHistoryModal } from '../components/dashboard/ActivityHistoryModal';
import { Download, ShieldAlert, History, Filter, Search, Calendar, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';
import { useMasterData } from '../context/MasterDataContext';
import { SearchAutocomplete } from '../components/tourism/SearchAutocomplete';
import { useCurrency } from '../context/CurrencyContext';

// Mock historical regional data for reports
const HISTORICAL_INCIDENTS = [
  { id: 'inc-101', date: '2026-07-12', time: '14:32', type: 'Vehicle Breakdown', region: 'Europe', description: 'Sprinter #12 radiator overheat on highway.', status: 'Resolved' },
  { id: 'inc-102', date: '2026-07-11', time: '09:15', type: 'Heavy Traffic', region: 'India', description: 'Gridlock near Old Delhi. Walking tour delayed.', status: 'Resolved' },
  { id: 'inc-103', date: '2026-07-10', time: '18:40', type: 'Weather Warning', region: 'Europe', description: 'Gale force winds at Jungfraujoch. Railway paused.', status: 'Resolved' },
  { id: 'inc-104', date: '2026-07-09', time: '11:00', type: 'Staff Shortage', region: 'Asia', description: 'Local guide absent. Subbed coordinator Elena R.', status: 'Resolved' },
  { id: 'inc-105', date: '2026-07-08', time: '08:22', type: 'Flight Delay', region: 'Americas', description: 'Air France AF-012 delayed 4h. Pickups rescheduled.', status: 'Resolved' },
  { id: 'inc-106', date: '2026-07-06', time: '15:10', type: 'Hotel Overbooking', region: 'Middle East', description: 'Palm Resort overbooked. Guest upgraded to suite.', status: 'Resolved' },
  { id: 'inc-107', date: '2026-07-05', time: '17:45', type: 'Emergency Incident', region: 'Asia', description: 'Guest mild heatstroke in Kyoto temple. First aid given.', status: 'Resolved' },
];

export function CommandCenterPage() {
  const { masters } = useMasterData();
  const { activeHeaderTab } = useCurrency();
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [showHistory, setShowHistory] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  const regionItems = [
    { id: 'reg-all', name: 'All Regions', status: 'Active', type: 'System' },
    ...masters.regions.filter(r => r.status === 'Active').map(r => ({
      id: r.id,
      name: r.name,
      status: r.status,
      type: 'Region'
    }))
  ];

  const handleDownloadReport = () => {
    const csvContent = "data:text/csv;charset=utf-8,Incident ID,Date,Time,Type,Region,Description,Status\n" +
      HISTORICAL_INCIDENTS.map(i => `"${i.id}","${i.date}","${i.time}","${i.type}","${i.region}","${i.description}","${i.status}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Command_Center_Incident_Log_${selectedRegion}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredIncidents = HISTORICAL_INCIDENTS.filter(i => {
    const matchRegion = selectedRegion === 'All' || i.region === selectedRegion;
    const matchSearch = i.description.toLowerCase().includes(searchQuery.toLowerCase()) || i.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchType = typeFilter === 'All' || i.type === typeFilter;
    return matchRegion && matchSearch && matchType;
  });

  return (
    <div className="animate-in fade-in duration-500 pb-12 flex flex-col min-h-[calc(100vh-6rem)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6 shrink-0">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-widest rounded-full border border-emerald-100/50 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            System Live
          </div>
          <span className="text-[10px] font-bold text-gray-400 tracking-widest">V4.0.2-OP</span>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="flex flex-col min-w-[200px] relative z-40">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Region Filter</span>
            <SearchAutocomplete
              value={selectedRegion === 'All' ? 'All Regions' : selectedRegion}
              onChange={(val) => { if (!val) setSelectedRegion('All'); }}
              onSelect={(item) => { setSelectedRegion(item.name === 'All Regions' ? 'All' : item.name); }}
              items={regionItems}
              placeholder="Search region..."
              localStorageKey="region_search"
              className="w-full"
            />
          </div>
          <button
            onClick={() => setShowHistory(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm mt-5"
          >
            <History className="w-4 h-4" />
            View History
          </button>
          <button 
            onClick={handleDownloadReport}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm mt-5"
          >
            <Download className="w-4 h-4" />
            Export Report
          </button>
          <button 
            onClick={() => alert("EMERGENCY SYSTEM ACTIVATED: Response coordinators notified for all circuits.")}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#8B2020] hover:bg-[#721515] text-white text-xs font-bold rounded-xl transition-colors shadow-sm mt-5"
          >
            <ShieldAlert className="w-4 h-4" />
            Emergency Protocol
          </button>
        </div>
      </div>

      <div className="mb-2 shrink-0">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Command Center</h1>
      </div>

      <CommandCenterMetrics selectedRegion={selectedRegion} />

      {activeHeaderTab === 'overview' ? (
        <div className="flex flex-col xl:flex-row gap-6 flex-1 min-h-0">
          {/* Left Column */}
          <div className="flex-1 min-w-0 flex flex-col">
            <TelemetryMap selectedRegion={selectedRegion} />
            <OperationalAlerts selectedRegion={selectedRegion} />
          </div>

          {/* Right Column */}
          <div className="w-full xl:w-[320px] shrink-0 h-full">
            <CommandRightSidebar selectedRegion={selectedRegion} />
          </div>
        </div>
      ) : (
        /* Reports view */
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex-1 flex flex-col gap-6 animate-in fade-in duration-300">
          <div className="flex justify-between items-center pb-4 border-b border-gray-100 flex-wrap gap-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Historical Operational Reports</h2>
              <p className="text-xs text-gray-500 mt-0.5">Audit log of resolved incidents and alarms across global clusters</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search incidents..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-1.5 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#BC2C2C]/30 w-48"
                />
              </div>

              <select 
                value={typeFilter}
                onChange={e => setTypeFilter(e.target.value)}
                className="px-3 py-1.5 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 bg-white"
              >
                <option value="All">All Types</option>
                <option value="Vehicle Breakdown">Vehicle Breakdown</option>
                <option value="Heavy Traffic">Heavy Traffic</option>
                <option value="Weather Warning">Weather Warning</option>
                <option value="Staff Shortage">Staff Shortage</option>
                <option value="Flight Delay">Flight Delay</option>
                <option value="Hotel Overbooking">Hotel Overbooking</option>
              </select>

              <button 
                onClick={handleDownloadReport}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-[#BC2C2C] hover:bg-[#8B2020] text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
              >
                <Download className="w-3.5 h-3.5" /> Download PDF/CSV
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50/50">
                  <th className="px-6 py-3">Incident ID</th>
                  <th className="px-6 py-3">Date & Time</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Region</th>
                  <th className="px-6 py-3">Description</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredIncidents.length === 0 ? (
                  <tr><td colSpan={6} className="px-6 py-8 text-center text-xs text-gray-400">No incident logs matched your filter.</td></tr>
                ) : filteredIncidents.map(i => (
                  <tr key={i.id} className="hover:bg-gray-50/30 transition-colors text-xs text-gray-700 font-semibold">
                    <td className="px-6 py-4 font-mono text-[#BC2C2C]">{i.id}</td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{i.date} {i.time}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-lg">{i.type}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-900 font-bold">{i.region}</td>
                    <td className="px-6 py-4 max-w-sm leading-relaxed">{i.description}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-lg text-[10px] font-bold">
                        <CheckCircle2 className="w-3 h-3" /> {i.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Historical Trends Summary charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <h3 className="text-xs font-bold text-gray-900 mb-2">Regional Incidence Breakdown</h3>
              <div className="flex items-center justify-between mt-4">
                {['Europe', 'Asia', 'Americas', 'Middle East', 'India'].map(reg => {
                  const count = HISTORICAL_INCIDENTS.filter(i => i.region === reg).length;
                  return (
                    <div key={reg} className="text-center flex-1">
                      <div className="w-8 bg-[#BC2C2C] rounded-t-lg mx-auto" style={{ height: `${count * 25}px`, minHeight: '8px' }}></div>
                      <p className="text-[10px] font-bold text-gray-400 mt-2">{reg}</p>
                      <span className="text-xs font-bold text-gray-900">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold text-gray-900 mb-1">Safety SLA Compliance</h3>
                <p className="text-[10px] text-gray-500">Average resolution response duration matches standard Tier 1 limits.</p>
              </div>
              <div className="flex justify-between items-baseline mt-4">
                <div>
                  <span className="text-3xl font-extrabold text-gray-900 leading-none">14.2m</span>
                  <span className="text-[10px] text-emerald-500 font-bold block mt-1">↓ -2.5m from last Qtr</span>
                </div>
                <span className="px-2.5 py-1 bg-emerald-500 text-white rounded-lg text-[10px] font-bold uppercase">100% Resolved</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {showHistory && <ActivityHistoryModal onClose={() => setShowHistory(false)} />}
    </div>
  );
}
