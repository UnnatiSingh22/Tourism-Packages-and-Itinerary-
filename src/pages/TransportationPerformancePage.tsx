import React, { useState } from 'react';
import { PerformanceMetrics } from '../components/analytics/PerformanceMetrics';
import { RevenueChartCard } from '../components/analytics/RevenueChartCard';
import { RegionalPerformance } from '../components/analytics/RegionalPerformance';
import { DriverRankings } from '../components/analytics/DriverRankings';
import { GuestSatisfaction } from '../components/analytics/GuestSatisfaction';
import { FileText, Download, PlaySquare, X, Check, Search } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

const MOCK_LOGISTICS_ROWS = [
  { route: 'Cannes Coastline VIP Run', driver: 'Marcus Thorne', vehicle: 'Mercedes-Benz S-Class', occ: '85%', fuelEff: '14.2 km/L', delay: '0 min' },
  { route: 'Nice Airport Transfer', driver: 'Marcus Thorne', vehicle: 'Mercedes Sprinter', occ: '92%', fuelEff: '10.8 km/L', delay: '5 min' },
  { route: 'Naples Heritage Loop', driver: 'Elena Rodriguez', vehicle: 'BMW i7', occ: '68%', fuelEff: '4.8 km/kWh', delay: '2 min' },
  { route: 'Amalfi Coastal Shuttle', driver: 'Jordan Smith', vehicle: 'Mercedes Sprinter', occ: '100%', fuelEff: '10.2 km/L', delay: '12 min' },
  { route: 'Rajasthan Forts Expedition', driver: 'Priya Nair', vehicle: 'Volvo Coach 9700', occ: '74%', fuelEff: '4.1 km/L', delay: '0 min' }
];

export function TransportationPerformancePage() {
  const { activeHeaderTab } = useCurrency();
  const [showBuilder, setShowBuilder] = useState(false);

  // Custom Report Builder Form State
  const [regionFilter, setRegionFilter] = useState('All');
  const [driverFilter, setDriverFilter] = useState('All');
  const [vehicleFilter, setVehicleFilter] = useState('All');
  const [occFilter, setOccFilter] = useState('All');
  const [reportFormat, setReportFormat] = useState('CSV');
  const [searchQuery, setSearchQuery] = useState('');

  const handleExportPDF = () => {
    const element = document.createElement("a");
    const file = new Blob(["%PDF-1.4\n%mock PDF content for EventHub360 Transportation Performance Report"], {type: 'application/pdf'});
    element.href = URL.createObjectURL(file);
    element.download = "Transportation_Performance_Report.pdf";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleExportExcel = () => {
    const csvContent = "data:text/csv;charset=utf-8,Month,Revenue,Expenses,Utilisation\nJan,120000,85000,78%\nFeb,145000,90000,82%\nMar,190000,95000,88%\nApr,220000,105000,90%\nMay,310000,110000,92%\nJun,450000,120000,94%\nJul,440000,115000,93%\n";
    const encodedUri = encodeURI(csvContent);
    const element = document.createElement("a");
    element.setAttribute("href", encodedUri);
    element.setAttribute("download", "Transportation_Performance_Report.csv");
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleBuildCustomReport = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter rows based on user input and build custom CSV
    const filteredRows = MOCK_LOGISTICS_ROWS.filter(r => {
      const matchDriver = driverFilter === 'All' || r.driver.toLowerCase().includes(driverFilter.toLowerCase());
      const matchVehicle = vehicleFilter === 'All' || r.vehicle.toLowerCase().includes(vehicleFilter.toLowerCase());
      return matchDriver && matchVehicle;
    });

    const csvContent = "data:text/csv;charset=utf-8,Active Route Run,Driver assigned,Vehicle deployed,Occupancy Ratio,Fuel Battery Efficiency,Delay Index\n" +
      filteredRows.map(r => `"${r.route}","${r.driver}","${r.vehicle}","${r.occ}","${r.fuelEff}","${r.delay}"`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Custom_Logistics_Report.${reportFormat.toLowerCase()}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowBuilder(false);
  };

  const filteredLogistics = MOCK_LOGISTICS_ROWS.filter(r => 
    r.route.toLowerCase().includes(searchQuery.toLowerCase()) || r.driver.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-in fade-in duration-500 pb-12 relative flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-1">
            Transportation Performance
          </h1>
          <p className="text-sm text-gray-500">
            Hospitality logistics, route fuel efficiency, and fleet dispatch audit ledgers.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <FileText className="w-4 h-4" /> Export PDF
          </button>
          <button 
            onClick={handleExportExcel}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" /> Excel
          </button>
          <button 
            onClick={() => setShowBuilder(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-semibold shadow-sm hover:shadow-md transition-shadow"
          >
            <PlaySquare className="w-4 h-4" /> Generate Custom Report
          </button>
        </div>
      </div>

      {activeHeaderTab === 'overview' ? (
        <>
          <PerformanceMetrics />

          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            <div className="w-full lg:w-2/3">
              <RevenueChartCard />
            </div>
            <div className="w-full lg:w-1/3">
              <RegionalPerformance />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-2/3">
              <DriverRankings />
            </div>
            <div className="w-full lg:w-1/3">
              <GuestSatisfaction />
            </div>
          </div>
        </>
      ) : (
        /* Reports view */
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col gap-6 animate-in fade-in duration-300">
          <div className="flex justify-between items-center pb-4 border-b border-gray-100 flex-wrap gap-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Custom Logistics Report Auditor</h2>
              <p className="text-xs text-gray-500 mt-0.5 font-medium">Logistics route tracking, average passenger occupancies and delay indexes</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search routes or drivers..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-1.5 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#BC2C2C]/30 w-48"
                />
              </div>

              <button 
                onClick={handleExportExcel}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-[#BC2C2C] hover:bg-[#8B2020] text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
              >
                <Download className="w-3.5 h-3.5" /> Download Full Ledger
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50/50">
                  <th className="px-6 py-3">Route Assignment</th>
                  <th className="px-6 py-3">Driver Name</th>
                  <th className="px-6 py-3">Vehicle Model</th>
                  <th className="px-6 py-3">Route Occupancy</th>
                  <th className="px-6 py-3">Fuel / Energy Eff.</th>
                  <th className="px-6 py-3">Average Delay</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredLogistics.length === 0 ? (
                  <tr><td colSpan={6} className="px-6 py-8 text-center text-xs text-gray-400">No route logs found matching filters.</td></tr>
                ) : filteredLogistics.map((l, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/30 transition-colors text-xs text-gray-700 font-semibold">
                    <td className="px-6 py-4 text-gray-900 font-bold">{l.route}</td>
                    <td className="px-6 py-4 text-gray-900 font-bold">{l.driver}</td>
                    <td className="px-6 py-4 text-gray-500">{l.vehicle}</td>
                    <td className="px-6 py-4 text-gray-700">{l.occ}</td>
                    <td className="px-6 py-4 font-mono text-gray-400">{l.fuelEff}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[9px] font-bold border ${
                        l.delay === '0 min' 
                          ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
                          : 'bg-red-50 border-red-100 text-red-600'
                      }`}>
                        {l.delay}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Custom Report Builder Modal */}
      {showBuilder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowBuilder(false)}>
          <div 
            className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-gray-100 flex flex-col gap-4 animate-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <div>
                <h3 className="text-base font-bold text-gray-900">Custom Report Builder</h3>
                <p className="text-xs text-gray-500 mt-0.5">Filter route, vehicle and occupancy categories to output logistics reports</p>
              </div>
              <button onClick={() => setShowBuilder(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBuildCustomReport} className="space-y-4 text-xs font-semibold text-gray-700">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Region Scope</label>
                <select 
                  value={regionFilter} 
                  onChange={e => setRegionFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
                >
                  <option value="All">All Regions</option>
                  <option value="Europe">Europe Cluster</option>
                  <option value="Asia">Asia Pacific</option>
                  <option value="Americas">Americas</option>
                  <option value="India">India</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Driver Assignment</label>
                <select 
                  value={driverFilter} 
                  onChange={e => setDriverFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
                >
                  <option value="All">All Active Drivers</option>
                  <option value="Marcus Thorne">Marcus Thorne</option>
                  <option value="Elena Rodriguez">Elena Rodriguez</option>
                  <option value="Jordan Smith">Jordan Smith</option>
                  <option value="Priya Nair">Priya Nair</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Vehicle Fleet Category</label>
                <select 
                  value={vehicleFilter} 
                  onChange={e => setVehicleFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
                >
                  <option value="All">All Fleet Units</option>
                  <option value="Mercedes-Benz S-Class">Mercedes Sedan</option>
                  <option value="BMW i7">BMW Electric</option>
                  <option value="Mercedes Sprinter">Mercedes Sprinter</option>
                  <option value="Volvo Coach 9700">Volvo Tour Bus</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Occupancy Rate Cutoff</label>
                  <select 
                    value={occFilter} 
                    onChange={e => setOccFilter(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
                  >
                    <option value="All">All Occupancies</option>
                    <option value=">50%">&gt; 50% occupied</option>
                    <option value=">75%">&gt; 75% occupied</option>
                    <option value=">90%">&gt; 90% occupied</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Report Output Format</label>
                  <select 
                    value={reportFormat} 
                    onChange={e => setReportFormat(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
                  >
                    <option value="CSV">CSV Format</option>
                    <option value="PDF">PDF Dossier</option>
                    <option value="Excel">Excel Sheet</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowBuilder(false)}
                  className="flex-1 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-2.5 bg-[#BC2C2C] hover:bg-[#8B2020] text-white rounded-xl transition-colors font-bold shadow-sm"
                >
                  Build & Export
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
