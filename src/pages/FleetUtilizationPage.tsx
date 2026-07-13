import React, { useState } from 'react';
import { FleetUtilizationMetrics } from '../components/analytics/FleetUtilizationMetrics';
import { FleetUsageChart } from '../components/analytics/FleetUsageChart';
import { VehicleStatusTable } from '../components/analytics/VehicleStatusTable';
import { Download, Search, Bus, HelpCircle } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

const VEHICLES_DATABASE = [
  { id: 'V-882', model: 'Mercedes-Benz S-Class', type: 'Luxury Sedan', driver: 'Marcus Thorne', status: 'In Transit', fuel: '78%', nextService: '12,000 mi', rating: '4.9★', activeRoute: 'Cannes Coastline Tour' },
  { id: 'V-104', model: 'Cadillac Escalade', type: 'Premium SUV', driver: 'Unassigned', status: 'Idle', fuel: '100%', nextService: '15,500 mi', rating: '4.8★', activeRoute: 'Standby at Depot' },
  { id: 'V-559', model: 'BMW i7', type: 'Electric Sedan', driver: 'Elena Rodriguez', status: 'Charging', fuel: '45%', nextService: '8,000 mi', rating: '4.9★', activeRoute: 'Naples Airport Shuttle' },
  { id: 'V-331', model: 'Mercedes Sprinter', type: 'Executive Van', driver: 'Jordan Smith', status: 'Maintenance', fuel: 'N/A', nextService: 'In Shop', rating: '4.6★', activeRoute: 'Out of Service' },
  { id: 'V-901', model: 'Volvo Coach 9700', type: 'Luxury Tour Bus', driver: 'Priya Nair', status: 'In Transit', fuel: '92%', nextService: '24,000 mi', rating: '4.7★', activeRoute: 'Rajasthan Royal Journey' }
];

export function FleetUtilizationPage() {
  const { activeHeaderTab } = useCurrency();
  const [searchQuery, setSearchQuery] = useState('');

  const handleDownloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,Asset ID,Model,Type,Driver,Duty Status,Fuel Level,Next Service,Guest Rating,Active Route\n" +
      VEHICLES_DATABASE.map(v => `"${v.id}","${v.model}","${v.type}","${v.driver}","${v.status}","${v.fuel}","${v.nextService}","${v.rating}","${v.activeRoute}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Fleet_Utilization_Logs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredVehicles = VEHICLES_DATABASE.filter(v => 
    v.model.toLowerCase().includes(searchQuery.toLowerCase()) || v.driver.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-in fade-in duration-500 pb-12 relative flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="max-w-2xl">
          <h1 className="text-[22px] font-semibold text-gray-900 tracking-tight mb-2">
            Fleet Utilization Analytics
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            Monitor live fleet performance, charging status, operational route logs, and vehicle lifecycle efficiency metrics.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={handleDownloadCSV}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Download className="w-4 h-4 text-[#BC2C2C]" /> Export Fleet Log
          </button>
        </div>
      </div>

      {activeHeaderTab === 'overview' ? (
        <>
          <FleetUtilizationMetrics />
          <FleetUsageChart />
          <VehicleStatusTable />
        </>
      ) : (
        /* Reports view */
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col gap-6 animate-in fade-in duration-300">
          <div className="flex justify-between items-center pb-4 border-b border-gray-100 flex-wrap gap-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Fleet Dispatch & Efficiency Ledger</h2>
              <p className="text-xs text-gray-500 mt-0.5 font-medium">Detailed audit trail of active vehicle duty hours, charging levels, and routing assignments</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search vehicles or drivers..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-1.5 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#BC2C2C]/30 w-48"
                />
              </div>

              <button 
                onClick={handleDownloadCSV}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-[#BC2C2C] hover:bg-[#8B2020] text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
              >
                <Download className="w-3.5 h-3.5" /> Download Fleet CSV
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50/50">
                  <th className="px-6 py-3">Vehicle Details</th>
                  <th className="px-6 py-3">Assigned Driver</th>
                  <th className="px-6 py-3">Duty Status</th>
                  <th className="px-6 py-3">Active Route Route</th>
                  <th className="px-6 py-3">Battery / Fuel</th>
                  <th className="px-6 py-3">Odometer Next Service</th>
                  <th className="px-6 py-3">Driver Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredVehicles.length === 0 ? (
                  <tr><td colSpan={7} className="px-6 py-8 text-center text-xs text-gray-400">No matching fleet logs found.</td></tr>
                ) : filteredVehicles.map((v, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/30 transition-colors text-xs text-gray-700 font-semibold">
                    <td className="px-6 py-4">
                      <p className="text-gray-900 font-bold">{v.model}</p>
                      <p className="text-[10px] text-gray-400 font-mono mt-0.5">{v.id} • {v.type}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-900 font-bold">{v.driver}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[9px] font-bold border ${
                        v.status === 'In Transit' 
                          ? 'bg-blue-50 border-blue-100 text-blue-600'
                          : v.status === 'Charging'
                            ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
                            : v.status === 'Maintenance'
                              ? 'bg-orange-50 border-orange-100 text-orange-600'
                              : 'bg-gray-100 border-gray-200 text-gray-500'
                      }`}>
                        {v.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{v.activeRoute}</td>
                    <td className="px-6 py-4 font-mono text-gray-600">{v.fuel}</td>
                    <td className="px-6 py-4 text-gray-400">{v.nextService}</td>
                    <td className="px-6 py-4 text-amber-500">{v.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
