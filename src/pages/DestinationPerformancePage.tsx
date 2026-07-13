import React, { useState } from 'react';
import { DestinationMetrics } from '../components/analytics/DestinationMetrics';
import { GlobalPerformanceMap } from '../components/analytics/GlobalPerformanceMap';
import { TravelerSatisfaction, TopDestinationsTable } from '../components/analytics/DestinationAnalyticsCharts';
import { Download, CloudSun, X, AlertTriangle, CloudRain, Sun, Compass, Filter } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { DESTINATIONS_DB } from '../data/destinationsDb';

export function DestinationPerformancePage() {
  const { activeHeaderTab, format } = useCurrency();
  const [timeFilter, setTimeFilter] = useState<'Q1' | '6M' | 'Yearly'>('6M');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedDestination, setSelectedDestination] = useState<string>('All');

  // Weather Modal state
  const [selectedWeatherDest, setSelectedWeatherDest] = useState<any | null>(null);

  // Filtered destination options dropdown list
  const availableDestNames = Object.values(DESTINATIONS_DB)
    .filter(d => selectedRegion === 'All' || d.region === selectedRegion)
    .map(d => d.name);

  // Filtered rows for reports view
  const activeAuditDests = Object.values(DESTINATIONS_DB).filter(d => {
    const matchesRegion = selectedRegion === 'All' || d.region === selectedRegion;
    const matchesDest = selectedDestination === 'All' || d.name === selectedDestination;
    return matchesRegion && matchesDest;
  });

  const handleDownloadAudit = () => {
    const csvContent = "data:text/csv;charset=utf-8,Destination,Location,Region,Total Bookings,Net Revenue,Average Occupancy,Guest Rating,Growth,Operational Warning\n" +
      activeAuditDests.map(a => `"${a.name}","${a.location}","${a.region}","${a.bookings}","${a.revenue}","${a.occupancy}","${a.satisfaction}","${a.growth}","${a.alert}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Destination_Performance_Audit_${selectedRegion}_${selectedDestination}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const weatherDetails = selectedWeatherDest ? DESTINATIONS_DB[selectedWeatherDest.name]?.weather : null;

  return (
    <div className="animate-in fade-in duration-500 pb-12 relative">
      <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-6 mb-8">
        <div className="max-w-2xl">
          <h1 className="text-[22px] font-semibold text-gray-900 tracking-tight mb-2">
            Destination Performance Analytics
          </h1>
          <p className="text-sm text-gray-500">
            Comprehensive market analytics, average occupant ratios, and live weather conditions for premium event clusters.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {/* Region Select */}
          <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-xl px-3 py-1.5 shadow-sm">
            <Filter className="w-3.5 h-3.5 text-gray-400" />
            <select
              value={selectedRegion}
              onChange={(e) => {
                setSelectedRegion(e.target.value);
                setSelectedDestination('All');
              }}
              className="text-xs font-bold text-gray-700 bg-transparent border-none outline-none focus:ring-0 cursor-pointer"
            >
              <option value="All">All Regions</option>
              <option value="Europe">Europe</option>
              <option value="Asia">Asia</option>
              <option value="Middle East">Middle East</option>
              <option value="India">India</option>
            </select>
          </div>

          {/* Destination Select */}
          <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-xl px-3 py-1.5 shadow-sm">
            <Compass className="w-3.5 h-3.5 text-gray-400" />
            <select
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
              className="text-xs font-bold text-gray-700 bg-transparent border-none outline-none focus:ring-0 cursor-pointer"
            >
              <option value="All">All Destinations</option>
              {availableDestNames.map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>

          <button 
            onClick={handleDownloadAudit}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-[#BC2C2C]" /> Export Audit
          </button>

          {/* Time Filters Selector */}
          <div className="flex bg-gray-50/80 rounded-xl p-1 border border-gray-100 shrink-0">
            {['Q1', '6M', 'Yearly'].map(filter => (
              <button 
                key={filter}
                onClick={() => setTimeFilter(filter as any)}
                className={`px-3 py-1.5 text-xs font-bold transition-all rounded-lg ${
                  timeFilter === filter ? 'text-[#BC2C2C] bg-white shadow-sm font-black' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {filter === '6M' ? 'Last 6 Months' : filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeHeaderTab === 'overview' ? (
        <>
          <DestinationMetrics 
            timeFilter={timeFilter} 
            selectedRegion={selectedRegion}
            selectedDestination={selectedDestination}
          />

          <div className="flex flex-col xl:flex-row gap-6">
            <div className="flex-1 min-w-0">
              <GlobalPerformanceMap timeFilter={timeFilter} />
            </div>
            <div className="w-full xl:w-[320px] shrink-0">
              <TravelerSatisfaction 
                timeFilter={timeFilter}
                selectedRegion={selectedRegion}
                selectedDestination={selectedDestination}
              />
            </div>
          </div>

          <TopDestinationsTable 
            timeFilter={timeFilter} 
            selectedRegion={selectedRegion}
            selectedDestination={selectedDestination}
            onViewWeather={(dest) => setSelectedWeatherDest(dest)}
            onExportCSV={handleDownloadAudit}
          />
        </>
      ) : (
        /* Reports view layout */
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col gap-6 animate-in fade-in duration-300">
          <div className="flex justify-between items-center pb-4 border-b border-gray-100 flex-wrap gap-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Destination Performance Ledgers</h2>
              <p className="text-xs text-gray-500 mt-0.5 font-medium">Guest satisfaction ratio index, net revenue yield and logistics warning audits</p>
            </div>
            <button 
              onClick={handleDownloadAudit}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-[#BC2C2C] hover:bg-[#8B2020] text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" /> Download PDF/CSV Audit
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50/50">
                  <th className="px-6 py-3">Destination Cluster</th>
                  <th className="px-6 py-3">Registered Bookings</th>
                  <th className="px-6 py-3">Total Net Revenue</th>
                  <th className="px-6 py-3">Profit Margin</th>
                  <th className="px-6 py-3">Feedback Rating</th>
                  <th className="px-6 py-3">Active Operational Warnings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {activeAuditDests.length > 0 ? (
                  activeAuditDests.map((a, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/30 transition-colors text-xs text-gray-700 font-semibold">
                      <td className="px-6 py-4 text-gray-900 font-bold">{a.name}</td>
                      <td className="px-6 py-4 text-gray-500">{a.bookings} Pax</td>
                      <td className="px-6 py-4 font-mono text-gray-900 font-black">{format(timeFilter === 'Q1' ? Math.round(a.revenue * 0.3) : timeFilter === 'Yearly' ? Math.round(a.revenue * 2.1) : a.revenue)}</td>
                      <td className="px-6 py-4 text-emerald-500 font-extrabold">{timeFilter === 'Q1' ? '24%' : timeFilter === 'Yearly' ? '32%' : '28%'}</td>
                      <td className="px-6 py-4 text-amber-500">{a.satisfaction}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[9px] font-bold bg-amber-50 border border-amber-100 text-amber-600">
                          <AlertTriangle className="w-3 h-3" /> {a.alert}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-sm text-gray-400 font-bold">
                      No records match the selected region or destination filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Forecast Detail Dialog Modal */}
      {selectedWeatherDest && weatherDetails && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedWeatherDest(null)}>
          <div 
            className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-gray-100 flex flex-col gap-4 animate-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-start pb-2 border-b border-gray-100 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#BC2C2C] flex items-center justify-center">
                  <CloudSun className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-gray-900">Weather & Analytics Forecast</h3>
                  <p className="text-[10px] text-gray-500 font-semibold">{selectedWeatherDest.name} ({selectedWeatherDest.location})</p>
                </div>
              </div>
              <button onClick={() => setSelectedWeatherDest(null)} className="text-gray-400 hover:text-gray-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Current temperature */}
            <div className="bg-gradient-to-br from-[#1F2937] to-[#111827] text-white p-5 rounded-2xl flex justify-between items-center shadow-inner">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Live Weather Condition</p>
                <p className="text-2xl font-black mt-1">{weatherDetails.temp}</p>
                <p className="text-xs text-gray-300 font-semibold mt-0.5">{weatherDetails.desc} • Wind: 14 km/h</p>
              </div>
              <Sun className="w-10 h-10 text-amber-400 animate-spin" style={{ animationDuration: '20s' }} />
            </div>

            {/* 5-Day forecast list */}
            <div className="space-y-2">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">5-Day Meteorological Forecast</p>
              
              {weatherDetails.forecast.map((f, i) => (
                <div key={i} className="flex justify-between items-center p-2.5 bg-gray-50 rounded-xl text-xs font-semibold text-gray-700">
                  <span className="w-20 text-gray-900 font-bold">{f.day}</span>
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <CloudSun className="w-4 h-4 text-gray-400" /> <span>{f.desc}</span>
                  </div>
                  <span className="font-mono text-gray-900 font-black">{f.temp}</span>
                </div>
              ))}
            </div>

            {/* Travel warnings alert */}
            <div className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-start gap-2.5 text-[11px] font-semibold text-red-700">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Active Destination Advisories</p>
                <p className="text-red-600/80 mt-0.5 leading-relaxed">{weatherDetails.advisory}</p>
              </div>
            </div>

            <div className="pt-2 flex gap-3 shrink-0">
              <button 
                onClick={() => setSelectedWeatherDest(null)}
                className="w-full py-2 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-colors"
              >
                Acknowledge & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
