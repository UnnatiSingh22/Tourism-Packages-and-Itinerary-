import React, { useState } from 'react';
import { ComplianceMetrics } from '../components/analytics/ComplianceMetrics';
import { ComplianceTable } from '../components/analytics/ComplianceTable';
import { Download, RefreshCw, Search, ShieldAlert, CheckCircle } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useMasterData } from '../context/MasterDataContext';

export function TravelCompliancePage() {
  const { activeHeaderTab } = useCurrency();
  const { masters } = useMasterData();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock Ruleset for reports list
  const COMPLIANCE_RULESET = [
    { name: 'Schengen Passport 6-Month Expiry', type: 'Passport Validity', trigger: 'Less than 6 months', action: 'Flag & Alert', severity: 'Critical', destinations: 'Europe' },
    { name: 'US ESTA Verification', type: 'Visa Validity', trigger: 'No active visa dossier', action: 'Block Dispatch', severity: 'Critical', destinations: 'Americas' },
    { name: 'Yellow Fever Health Clearance', type: 'Vaccination', trigger: 'No health card uploaded', action: 'Notify Passenger', severity: 'Warning', destinations: 'Africa' },
    { name: 'Schengen Corporate Insurance', type: 'Travel Insurance', trigger: 'Coverage below EUR 30k', action: 'Flag & Email', severity: 'Warning', destinations: 'Europe' }
  ];

  const handleDownloadCSV = () => {
    // Generate csv data from masters guest list
    const travelers = masters.guests.filter(g => g.status === 'Active').map((guest, idx) => {
      const status = idx === 0 ? 'Critical Risk' : idx === 1 ? 'Warning' : 'Verified';
      const dest = masters.destinations[idx % masters.destinations.length]?.name || 'London, UK';
      const passport = idx === 1 ? '4.2 Years' : idx === 0 ? '12 Days' : '62 Days';
      const visa = idx === 1 ? 'Business Standard' : idx === 0 ? 'COE Missing' : 'Schengen Pending';
      return {
        name: `${guest.firstName} ${guest.lastName}`,
        destination: dest,
        status,
        passportValidity: passport,
        visaStatus: visa
      };
    });

    const csvContent = "data:text/csv;charset=utf-8,Traveler Name,Target Destination,Risk Status,Passport Expiry,Visa Clearance Status\n" +
      travelers.map(t => `"${t.name}","${t.destination}","${t.status}","${t.passportValidity}","${t.visaStatus}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Traveler_Compliance_Audit.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredRules = COMPLIANCE_RULESET.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.destinations.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-in fade-in duration-500 pb-12 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="max-w-2xl">
          <h1 className="text-[22px] font-semibold text-gray-900 tracking-tight mb-2">
            Travel Compliance Monitoring
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            Real-time oversight of global traveler documentation, visa validity, and health compliance protocols.
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <button 
            onClick={handleDownloadCSV}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm h-12"
          >
            <Download className="w-4 h-4 text-[#BC2C2C]" /> Export Report
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-[#BC2C2C] text-white rounded-xl text-sm font-semibold shadow-sm hover:bg-[#A02020] transition-colors h-12">
            <RefreshCw className="w-4 h-4" /> Force Sync
          </button>
        </div>
      </div>

      {activeHeaderTab === 'overview' ? (
        <>
          <ComplianceMetrics />
          <ComplianceTable />
        </>
      ) : (
        /* Reports view */
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col gap-6 animate-in fade-in duration-300">
          <div className="flex justify-between items-center pb-4 border-b border-gray-100 flex-wrap gap-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Custom Screening Rules & Triggers</h2>
              <p className="text-xs text-gray-500 mt-0.5 font-medium">Global rules, visa verification alerts and compliance checks active for event routes</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search rules or zones..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-1.5 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#BC2C2C]/30 w-48"
                />
              </div>

              <button 
                onClick={handleDownloadCSV}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-[#BC2C2C] hover:bg-[#8B2020] text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
              >
                <Download className="w-3.5 h-3.5" /> Download Rules CSV
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50/50">
                  <th className="px-6 py-3">Rule Identifier</th>
                  <th className="px-6 py-3">Compliance Domain</th>
                  <th className="px-6 py-3">Trigger Condition</th>
                  <th className="px-6 py-3">Action Escalation</th>
                  <th className="px-6 py-3">Applied Zones</th>
                  <th className="px-6 py-3">Criticality</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredRules.length === 0 ? (
                  <tr><td colSpan={6} className="px-6 py-8 text-center text-xs text-gray-400">No matching screening rules found.</td></tr>
                ) : filteredRules.map((r, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/30 transition-colors text-xs text-gray-700 font-semibold">
                    <td className="px-6 py-4 text-gray-900 font-bold">{r.name}</td>
                    <td className="px-6 py-4 text-gray-500">{r.type}</td>
                    <td className="px-6 py-4 font-mono text-gray-600">{r.trigger}</td>
                    <td className="px-6 py-4 text-gray-600">{r.action}</td>
                    <td className="px-6 py-4 text-gray-500 font-bold">{r.destinations}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[9px] font-bold border ${
                        r.severity === 'Critical' 
                          ? 'bg-red-50 border-red-100 text-red-600'
                          : 'bg-amber-50 border-amber-100 text-amber-600'
                      }`}>
                        {r.severity === 'Critical' ? <ShieldAlert className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                        {r.severity}
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
