import React, { useState } from 'react';
import { IncidentMetrics } from '../components/analytics/IncidentMetrics';
import { IncidentTable } from '../components/analytics/IncidentTable';
import { InsuranceSnapshot } from '../components/analytics/InsuranceSnapshot';
import { Upload, Plus, X, AlertTriangle, Download, Search, CheckCircle } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

interface Incident {
  id: number;
  type: string;
  desc: string;
  date: string;
  driver: string;
  vehicle: string;
  avatar: string;
  severity: string;
  sevColor: string;
  sevBg: string;
  status: string;
}

export function IncidentReportsPage() {
  const { activeHeaderTab } = useCurrency();
  const [searchQuery, setSearchQuery] = useState('');
  const [incidents, setIncidents] = useState<Incident[]>([
    {
      id: 1,
      type: 'Traffic Violations',
      desc: 'Speeding in school zone',
      date: 'Oct 24, 2023\n09:15 AM',
      driver: 'John Dorsey',
      vehicle: 'Mercedes S-Class (ABC-1234)',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      severity: 'HIGH',
      sevColor: 'text-red-500',
      sevBg: 'bg-red-500',
      status: 'IN REVIEW'
    },
    {
      id: 2,
      type: 'Minor Scrapes',
      desc: 'Curb rash during parking',
      date: 'Oct 23, 2023\n04:40 PM',
      driver: 'Sarah Miller',
      vehicle: 'BMW X7 (XYZ-9876)',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      severity: 'LOW',
      sevColor: 'text-blue-500',
      sevBg: 'bg-blue-500',
      status: 'RESOLVED'
    },
    {
      id: 3,
      type: 'Mechanical Failures',
      desc: 'Engine overheating on highway',
      date: 'Oct 22, 2023\n11:20 AM',
      driver: 'Robert King',
      vehicle: 'Lexus LS (LMN-5544)',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      severity: 'MEDIUM',
      sevColor: 'text-orange-500',
      sevBg: 'bg-orange-500',
      status: 'OPEN'
    },
    {
      id: 4,
      type: 'Traffic Violations',
      desc: 'Illegal U-turn near airport',
      date: 'Oct 21, 2023\n02:10 PM',
      driver: 'Amy Lee',
      vehicle: 'Audi A8 (QRS-1122)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      severity: 'MEDIUM',
      sevColor: 'text-orange-500',
      sevBg: 'bg-orange-500',
      status: 'RESOLVED'
    }
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    type: 'Traffic Violations',
    desc: '',
    driver: '',
    vehicle: '',
    severity: 'MEDIUM',
  });

  const handleResolve = (id: number) => {
    setIncidents(prev => prev.map(inc => inc.id === id ? { ...inc, status: 'RESOLVED' } : inc));
  };

  const handleDownloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,Incident ID,Category,Occurrence Date,Driver Name,Vehicle Details,Description,Severity Level,Status\n" +
      incidents.map(i => `"${i.id}","${i.type}","${i.date.replace('\n', ' ')}","${i.driver}","${i.vehicle}","${i.desc}","${i.severity}","${i.status}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Incident_Insurance_Claims.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.desc || !form.driver || !form.vehicle) {
      alert('Please fill out all incident details.');
      return;
    }

    const sevColors: Record<string, string> = {
      LOW: 'text-blue-500',
      MEDIUM: 'text-orange-500',
      HIGH: 'text-red-500'
    };

    const sevBgs: Record<string, string> = {
      LOW: 'bg-blue-500',
      MEDIUM: 'bg-orange-500',
      HIGH: 'bg-red-500'
    };

    const newInc: Incident = {
      id: Date.now(),
      type: form.type,
      desc: form.desc,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + '\n' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      driver: form.driver,
      vehicle: form.vehicle,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      severity: form.severity,
      sevColor: sevColors[form.severity] || 'text-gray-500',
      sevBg: sevBgs[form.severity] || 'bg-gray-500',
      status: 'OPEN'
    };

    setIncidents(prev => [newInc, ...prev]);
    setModalOpen(false);
    setForm({
      type: 'Traffic Violations',
      desc: '',
      driver: '',
      vehicle: '',
      severity: 'MEDIUM',
    });
  };

  const [showSafetyModal, setShowSafetyModal] = useState(false);
  const [safetyForm, setSafetyForm] = useState({
    date: 'Q3 2026',
    auditor: '',
    score: '95',
    status: 'Compliant',
    observations: ''
  });
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleSaveSafetyReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!safetyForm.auditor) {
      alert('Please enter the Auditor name.');
      return;
    }
    triggerToast(`🛡️ Safety Review by ${safetyForm.auditor} saved successfully with score ${safetyForm.score}%!`);
    setShowSafetyModal(false);
    setSafetyForm({ date: 'Q3 2026', auditor: '', score: '95', status: 'Compliant', observations: '' });
  };

  const filteredIncidents = incidents.filter(i => 
    i.driver.toLowerCase().includes(searchQuery.toLowerCase()) || i.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-in fade-in duration-500 pb-12 relative flex flex-col gap-6">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white text-xs px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-in slide-in-from-bottom-2 duration-300">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span className="font-bold">{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-1">
            Incident & Accident Reports
          </h1>
          <p className="text-sm text-gray-500">
            Monitor fleet safety compliance, track insurance claims, and resolve open logs.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={handleDownloadCSV}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm h-12"
          >
            <Download className="w-4 h-4 text-[#BC2C2C]" /> Export for Insurance
          </button>
          <button 
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl text-sm font-semibold shadow-sm hover:shadow-md transition-shadow h-12"
          >
            <Plus className="w-4 h-4" /> Report New Incident
          </button>
        </div>
      </div>

      {activeHeaderTab === 'overview' ? (
        <>
          <IncidentMetrics incidentsCount={incidents.length} />
          <IncidentTable incidents={incidents} onResolve={handleResolve} />
          <InsuranceSnapshot onAddSafetyReview={() => setShowSafetyModal(true)} />
        </>
      ) : (
        /* Reports view */
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col gap-6 animate-in fade-in duration-300">
          <div className="flex justify-between items-center pb-4 border-b border-gray-100 flex-wrap gap-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Incident Claims & Audit Ledger</h2>
              <p className="text-xs text-gray-500 mt-0.5 font-medium">History of reported passenger deviations, mechanical issues and insurance estimates</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search logs by driver..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-1.5 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#BC2C2C]/30 w-48"
                />
              </div>

              <button 
                onClick={handleDownloadCSV}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-[#BC2C2C] hover:bg-[#8B2020] text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
              >
                <Download className="w-3.5 h-3.5" /> Download Claims CSV
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50/50">
                  <th className="px-6 py-3">Incident ID</th>
                  <th className="px-6 py-3">Category Domain</th>
                  <th className="px-6 py-3">Driver Name</th>
                  <th className="px-6 py-3">Vehicle Details</th>
                  <th className="px-6 py-3">Incident description</th>
                  <th className="px-6 py-3">Severity</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredIncidents.length === 0 ? (
                  <tr><td colSpan={7} className="px-6 py-8 text-center text-xs text-gray-400">No matching logs.</td></tr>
                ) : filteredIncidents.map((i, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/30 transition-colors text-xs text-gray-700 font-semibold">
                    <td className="px-6 py-4 font-mono text-red-600">INC-{i.id}</td>
                    <td className="px-6 py-4 text-gray-900 font-bold">{i.type}</td>
                    <td className="px-6 py-4 text-gray-900 font-bold">{i.driver}</td>
                    <td className="px-6 py-4 text-gray-500">{i.vehicle}</td>
                    <td className="px-6 py-4 text-gray-500">{i.desc}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[9px] font-bold border ${
                        i.severity === 'HIGH' 
                          ? 'bg-red-50 border-red-100 text-red-600'
                          : i.severity === 'MEDIUM'
                            ? 'bg-amber-50 border-amber-100 text-amber-600'
                            : 'bg-blue-50 border-blue-100 text-blue-600'
                      }`}>
                        {i.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      <span className="px-2 py-0.5 bg-gray-100 rounded text-[9px] font-black">{i.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Report New Incident Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-xl border border-gray-100 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" /> Log Fleet Incident
              </h2>
              <button 
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1.5">Incident Type</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#BC2C2C]/30 cursor-pointer"
                >
                  <option value="Traffic Violations">Traffic Violations</option>
                  <option value="Minor Scrapes">Minor Scrapes</option>
                  <option value="Mechanical Failures">Mechanical Failures</option>
                  <option value="Route Deviation">Route Deviation</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1.5">Driver Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Sarah Miller"
                    value={form.driver}
                    onChange={(e) => setForm({ ...form, driver: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#BC2C2C]/30"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1.5">Vehicle License / Model</label>
                  <input
                    type="text"
                    placeholder="e.g., BMW X7 (XYZ-9876)"
                    value={form.vehicle}
                    onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#BC2C2C]/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1.5">Severity Level</label>
                <select
                  value={form.severity}
                  onChange={(e) => setForm({ ...form, severity: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#BC2C2C]/30 cursor-pointer"
                >
                  <option value="LOW">Low Severity</option>
                  <option value="MEDIUM">Medium Severity</option>
                  <option value="HIGH">High Severity</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1.5">Incident Description</label>
                <textarea
                  placeholder="Provide precise details of the occurrence..."
                  value={form.desc}
                  onChange={(e) => setForm({ ...form, desc: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-xs font-medium text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#BC2C2C]/30 h-24 resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-xs font-bold text-gray-700 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#BC2C2C] hover:bg-[#8B2020] text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                >
                  Submit Incident Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quarterly Safety Review Modal */}
      {showSafetyModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowSafetyModal(false)}>
          <div 
            className="bg-white rounded-3xl max-w-md w-full p-6 shadow-xl border border-gray-100 animate-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
              <div>
                <h2 className="text-base font-bold text-gray-900">New safety Assessment</h2>
                <p className="text-[10px] text-gray-500 mt-0.5">Input details for quarterly safety audit and risk scoring</p>
              </div>
              <button 
                onClick={() => setShowSafetyModal(false)}
                className="text-gray-400 hover:text-gray-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSafetyReview} className="space-y-4 text-xs font-semibold text-gray-700">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Audit Quarter</label>
                  <select 
                    value={safetyForm.date} 
                    onChange={e => setSafetyForm({ ...safetyForm, date: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none cursor-pointer"
                  >
                    <option value="Q3 2026">Q3 2026 Audit</option>
                    <option value="Q4 2026">Q4 2026 Audit</option>
                    <option value="Q1 2027">Q1 2027 Audit</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Compliance status</label>
                  <select 
                    value={safetyForm.status} 
                    onChange={e => setSafetyForm({ ...safetyForm, status: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none cursor-pointer"
                  >
                    <option value="Compliant">Compliant</option>
                    <option value="Non-Compliant">Action Required</option>
                    <option value="Under Review">Under Audit</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Auditor Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Captain Vance"
                    value={safetyForm.auditor}
                    onChange={e => setSafetyForm({ ...safetyForm, auditor: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Target Safety Score</label>
                  <select 
                    value={safetyForm.score} 
                    onChange={e => setSafetyForm({ ...safetyForm, score: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none cursor-pointer"
                  >
                    <option value="98">98% Exceptional</option>
                    <option value="95">95% Optimal</option>
                    <option value="90">90% Satisfactory</option>
                    <option value="85">85% Conditional</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Audit Observations</label>
                <textarea 
                  placeholder="Summarize safety score findings and risk warnings..."
                  value={safetyForm.observations}
                  onChange={e => setSafetyForm({ ...safetyForm, observations: e.target.value })}
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none h-20 resize-none font-medium"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowSafetyModal(false)}
                  className="flex-1 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 text-xs font-bold"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-2 bg-[#BC2C2C] hover:bg-[#8B2020] text-white rounded-xl text-xs font-bold shadow-sm transition-colors"
                >
                  Save Assessment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
