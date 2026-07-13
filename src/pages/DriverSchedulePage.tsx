import React, { useState } from 'react';
import { AvailableDrivers } from '../components/crm/AvailableDrivers';
import { PendingRequests } from '../components/crm/PendingRequests';
import { ScheduleCalendar } from '../components/crm/ScheduleCalendar';
import { AttendanceLog } from '../components/crm/AttendanceLog';
import { DriverInsights } from '../components/crm/DriverInsights';
import { Download, CheckCircle2, ShieldAlert, Bus, Search } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

const MOCK_DRIVER_LEADER = [
  { driver: 'Marcus Thorne', license: 'DL-908122', status: 'On Duty', hoursMTD: 148, vehicle: 'Mercedes Sprinter #204', phone: '+91 98765 44021' },
  { driver: 'Elena Rodriguez', license: 'DL-772198', status: 'Resting', hoursMTD: 120, vehicle: 'Toyota Coaster #012', phone: '+91 87654 32901' },
  { driver: 'Marcus Chen', license: 'DL-110294', status: 'On Duty', hoursMTD: 160, vehicle: 'BMW 7-Series #LIMO-05', phone: '+91 76543 21008' },
  { driver: 'Priya Nair', license: 'DL-344912', status: 'Off Duty', hoursMTD: 94, vehicle: 'Volvo Coach #BUS-088', phone: '+91 98210 55421' }
];

export function DriverSchedulePage() {
  const { activeHeaderTab } = useCurrency();
  const [searchQuery, setSearchQuery] = useState('');

  const handleDownloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,Driver,License Number,Duty Status,Hours worked MTD,Assigned Fleet Unit,Contact\n" +
      MOCK_DRIVER_LEADER.map(d => `"${d.driver}","${d.license}","${d.status}","${d.hoursMTD}","${d.vehicle}","${d.phone}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Driver_Duty_Schedules.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredDrivers = MOCK_DRIVER_LEADER.filter(d => 
    d.driver.toLowerCase().includes(searchQuery.toLowerCase()) || d.vehicle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-in fade-in duration-500 pb-12 flex flex-col gap-6">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-1">
            Driver & Dispatch Center
          </h1>
          <p className="text-sm text-gray-500">
            Real-time tracking of driver availability, attendance clocks and active itineraries.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={handleDownloadCSV}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Download className="w-4 h-4 text-[#BC2C2C]" /> Export Roster
          </button>
        </div>
      </div>

      {activeHeaderTab === 'overview' ? (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="w-full lg:w-[280px] shrink-0 border-r border-gray-100 pr-8 hidden xl:block">
            <AvailableDrivers />
            <PendingRequests />
          </div>

          {/* Middle Column */}
          <div className="flex-1 flex flex-col min-w-0">
            <ScheduleCalendar />
            <AttendanceLog />
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-[280px] shrink-0">
            <DriverInsights />
          </div>
        </div>
      ) : (
        /* Reports view */
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col gap-6 animate-in fade-in duration-300">
          <div className="flex justify-between items-center pb-4 border-b border-gray-100 flex-wrap gap-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Driver Roster Shift Logs</h2>
              <p className="text-xs text-gray-500 mt-0.5 font-medium">Historical audit of driver shifts, license validation audits and cumulative monthly hours</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search drivers or vehicles..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-1.5 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#BC2C2C]/30 w-48"
                />
              </div>

              <button 
                onClick={handleDownloadCSV}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-[#BC2C2C] hover:bg-[#8B2020] text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
              >
                <Download className="w-3.5 h-3.5" /> Download PDF/CSV Roster
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50/50">
                  <th className="px-6 py-3">Driver Name</th>
                  <th className="px-6 py-3">Commercial License</th>
                  <th className="px-6 py-3">Assigned Vehicle</th>
                  <th className="px-6 py-3">Hours Worked (MTD)</th>
                  <th className="px-6 py-3">Contact Number</th>
                  <th className="px-6 py-3">Duty Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredDrivers.length === 0 ? (
                  <tr><td colSpan={6} className="px-6 py-8 text-center text-xs text-gray-400">No matching drivers found.</td></tr>
                ) : filteredDrivers.map((d, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/30 transition-colors text-xs text-gray-700 font-semibold">
                    <td className="px-6 py-4 text-gray-900 font-bold">{d.driver}</td>
                    <td className="px-6 py-4 font-mono text-gray-400">{d.license}</td>
                    <td className="px-6 py-4 text-gray-600">{d.vehicle}</td>
                    <td className="px-6 py-4 font-black">{d.hoursMTD} hours</td>
                    <td className="px-6 py-4 text-gray-500">{d.phone}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[9px] font-bold border ${
                        d.status === 'On Duty' 
                          ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
                          : d.status === 'Resting'
                            ? 'bg-amber-50 border-amber-100 text-amber-600'
                            : 'bg-gray-100 border-gray-200 text-gray-500'
                      }`}>
                        {d.status}
                      </span>
                    </td>
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
