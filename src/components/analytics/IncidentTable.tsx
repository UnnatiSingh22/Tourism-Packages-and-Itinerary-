import React, { useState } from 'react';
import { Filter, Check, Eye, Pencil, UserPlus, Download, X } from 'lucide-react';

interface Incident {
  id: number; type: string; desc: string; date: string;
  driver: string; vehicle: string; avatar: string;
  severity: string; sevColor: string; sevBg: string; status: string;
}

interface IncidentTableProps {
  incidents: Incident[];
  onResolve?: (id: number) => void;
}

// View Detail Modal
function ViewModal({ incident, onClose }: { incident: Incident; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2"><Eye className="w-5 h-5 text-[#BC2C2C]" /> Incident Detail</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg"><X className="w-4 h-4 text-gray-400" /></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
            <img src={incident.avatar} alt={incident.driver} className="w-12 h-12 rounded-full object-cover" />
            <div>
              <p className="font-bold text-gray-900">{incident.driver}</p>
              <p className="text-xs text-gray-500">{incident.vehicle}</p>
            </div>
            <span className={`ml-auto px-2 py-1 text-[10px] font-bold rounded-lg border ${incident.status === 'RESOLVED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : incident.status === 'IN REVIEW' ? 'bg-purple-50 text-purple-600 border-purple-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>{incident.status}</span>
          </div>
          {[
            { label: 'Incident Type', value: incident.type },
            { label: 'Description', value: incident.desc },
            { label: 'Date & Time', value: incident.date.replace('\n', ' ') },
            { label: 'Severity', value: incident.severity },
          ].map((row, i) => (
            <div key={i} className="flex items-start gap-4">
              <span className="w-28 shrink-0 text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">{row.label}</span>
              <span className="text-sm font-semibold text-gray-800">{row.value}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-end px-6 pb-6">
          <button onClick={onClose} className="px-5 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-black transition-colors">Close</button>
        </div>
      </div>
    </div>
  );
}

// Edit Modal
function EditModal({ incident, onSave, onClose }: { incident: Incident; onSave: (updated: Incident) => void; onClose: () => void }) {
  const [form, setForm] = useState({ type: incident.type, desc: incident.desc, severity: incident.severity, status: incident.status });
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2"><Pencil className="w-5 h-5 text-amber-500" /> Edit Incident</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg"><X className="w-4 h-4 text-gray-400" /></button>
        </div>
        <form className="p-6 space-y-4" onSubmit={e => { e.preventDefault(); onSave({ ...incident, ...form }); }}>
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Incident Type</label>
            <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none">
              <option>Traffic Violations</option><option>Minor Scrapes</option><option>Mechanical Failures</option><option>Route Deviation</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Description</label>
            <textarea value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm h-20 resize-none focus:outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Severity</label>
              <select value={form.severity} onChange={e => setForm({ ...form, severity: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none">
                <option>LOW</option><option>MEDIUM</option><option>HIGH</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Status</label>
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none">
                <option>OPEN</option><option>IN REVIEW</option><option>RESOLVED</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-5 py-2.5 bg-gray-50 border border-gray-200 text-sm font-bold text-gray-700 rounded-xl">Cancel</button>
            <button type="submit" className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold rounded-xl">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Assign Modal
function AssignModal({ incident, onClose }: { incident: Incident; onClose: () => void }) {
  const [assignee, setAssignee] = useState('Priya Sharma');
  const [note, setNote] = useState('');
  const [done, setDone] = useState(false);
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2"><UserPlus className="w-5 h-5 text-blue-500" /> Assign Incident</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg"><X className="w-4 h-4 text-gray-400" /></button>
        </div>
        {done ? (
          <div className="p-8 flex flex-col items-center gap-3">
            <Check className="w-12 h-12 text-emerald-500" />
            <p className="text-base font-bold text-gray-900">Incident Assigned!</p>
            <p className="text-sm text-gray-500">#{incident.id} assigned to {assignee}</p>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Assign To</label>
              <select value={assignee} onChange={e => setAssignee(e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none">
                <option>Priya Sharma</option><option>Ravi Kumar</option><option>Arjun Mehta</option><option>Sonal Patel</option><option>Amit Joshi</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Note (Optional)</label>
              <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Add context for the assignee..." className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm h-20 resize-none focus:outline-none" />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button onClick={onClose} className="px-5 py-2.5 bg-gray-50 border border-gray-200 text-sm font-bold text-gray-700 rounded-xl">Cancel</button>
              <button onClick={() => setDone(true)} className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold rounded-xl">Assign Now</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function IncidentTable({ incidents: externalIncidents, onResolve }: IncidentTableProps) {
  const [incidentsCopy, setIncidentsCopy] = useState(externalIncidents);
  const [severityFilter, setSeverityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewingId, setViewingId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [assigningId, setAssigningId] = useState<number | null>(null);
  const PAGE_SIZE = 3;

  // Sync with parent-updated list
  React.useEffect(() => { setIncidentsCopy(externalIncidents); }, [externalIncidents]);

  const filtered = incidentsCopy.filter(inc => {
    const matchSev = severityFilter === 'All' || inc.severity === severityFilter.toUpperCase();
    const matchStatus = statusFilter === 'All' || inc.status === statusFilter.toUpperCase().replace(' ', '_').replace('IN_REVIEW', 'IN REVIEW');
    return matchSev && matchStatus;
  });

  const totalPages = Math.max(Math.ceil(filtered.length / PAGE_SIZE), 1);
  React.useEffect(() => { setCurrentPage(1); }, [severityFilter, statusFilter, externalIncidents.length]);

  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleEdit = (updated: Incident) => {
    setIncidentsCopy(prev => prev.map(i => i.id === updated.id ? { ...updated, sevColor: updated.severity === 'HIGH' ? 'text-red-500' : updated.severity === 'MEDIUM' ? 'text-orange-500' : 'text-blue-500', sevBg: updated.severity === 'HIGH' ? 'bg-red-500' : updated.severity === 'MEDIUM' ? 'bg-orange-500' : 'bg-blue-500' } : i));
    setEditingId(null);
  };

  const handleDownload = (incident: Incident) => {
    const txt = `INCIDENT REPORT\n================\nID: ${incident.id}\nType: ${incident.type}\nDescription: ${incident.desc}\nDate: ${incident.date.replace('\n', ' ')}\nDriver: ${incident.driver}\nVehicle: ${incident.vehicle}\nSeverity: ${incident.severity}\nStatus: ${incident.status}\n`;
    const blob = new Blob([txt], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `Incident_Report_${incident.id}.txt`;
    a.click();
  };

  const viewingIncident = incidentsCopy.find(i => i.id === viewingId);
  const editingIncident = incidentsCopy.find(i => i.id === editingId);
  const assigningIncident = incidentsCopy.find(i => i.id === assigningId);

  return (
    <>
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 mb-8 flex flex-col">
        {/* Filters Bar */}
        <div className="p-6 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-500 text-sm font-semibold">
              <Filter className="w-4 h-4" /> Filters:
            </div>
            <select value={severityFilter} onChange={e => setSeverityFilter(e.target.value)} className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg px-4 py-2 font-medium focus:outline-none cursor-pointer">
              <option value="All">All Severities</option><option value="Low">Low</option><option value="Medium">Medium</option><option value="High">High</option>
            </select>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg px-4 py-2 font-medium focus:outline-none cursor-pointer">
              <option value="All">All Statuses</option><option value="Open">Open</option><option value="In Review">In Review</option><option value="Resolved">Resolved</option>
            </select>
            <button onClick={() => { setSeverityFilter('All'); setStatusFilter('All'); }} className="text-xs font-bold text-gray-500 hover:text-gray-900 tracking-widest uppercase transition-colors">Clear All</button>
          </div>
          <div className="text-sm font-medium text-gray-500">Showing <span className="font-bold text-gray-900">{filtered.length}</span> reports</div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-4 pt-6 pl-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Incident Details</th>
                <th className="pb-4 pt-6 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date & Time</th>
                <th className="pb-4 pt-6 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Driver & Vehicle</th>
                <th className="pb-4 pt-6 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Severity</th>
                <th className="pb-4 pt-6 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="pb-4 pt-6 pr-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-8 text-sm font-semibold text-gray-400">No matching incidents.</td></tr>
              ) : paginated.map(incident => (
                <tr key={incident.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-5 pl-6">
                    <p className="text-sm font-bold text-gray-900 mb-0.5">{incident.type}</p>
                    <p className="text-xs text-gray-500">{incident.desc}</p>
                  </td>
                  <td className="py-5 px-4 text-xs font-medium text-gray-600 whitespace-pre-wrap leading-relaxed">{incident.date}</td>
                  <td className="py-5 px-4">
                    <div className="flex items-center gap-3">
                      <img src={incident.avatar} alt={incident.driver} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <p className="text-sm font-bold text-gray-900 mb-0.5">{incident.driver}</p>
                        <p className="text-xs text-gray-500">{incident.vehicle}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-4">
                    <div className="flex items-center justify-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${incident.sevBg}`} />
                      <span className={`text-[10px] font-bold tracking-widest uppercase ${incident.sevColor}`}>{incident.severity}</span>
                    </div>
                  </td>
                  <td className="py-5 px-4">
                    <span className={`text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border ${incident.status === 'RESOLVED' ? 'text-emerald-700 bg-emerald-50 border-emerald-100' : incident.status === 'IN REVIEW' ? 'text-purple-700 bg-purple-50 border-purple-100' : 'text-amber-700 bg-amber-50 border-amber-100'}`}>
                      {incident.status}
                    </span>
                  </td>
                  <td className="py-5 pr-6">
                    <div className="flex items-center justify-end gap-1.5">
                      <button onClick={() => setViewingId(incident.id)} title="View" className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-700 transition-colors">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => setEditingId(incident.id)} title="Edit" className="p-1.5 hover:bg-amber-50 rounded-lg text-gray-400 hover:text-amber-600 transition-colors">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      {incident.status !== 'RESOLVED' && (
                        <>
                          <button onClick={() => onResolve?.(incident.id)} title="Resolve" className="p-1.5 hover:bg-emerald-50 rounded-lg text-gray-400 hover:text-emerald-600 transition-colors">
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => setAssigningId(incident.id)} title="Assign" className="p-1.5 hover:bg-blue-50 rounded-lg text-gray-400 hover:text-blue-600 transition-colors">
                            <UserPlus className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                      <button onClick={() => handleDownload(incident)} title="Download Report" className="p-1.5 hover:bg-purple-50 rounded-lg text-gray-400 hover:text-purple-600 transition-colors">
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 flex justify-between items-center text-xs font-semibold bg-white rounded-b-3xl">
          <span className="text-gray-500 pl-2">Showing {filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length} results</span>
          <div className="flex items-center gap-1">
            <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className={`px-3 py-1.5 ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-gray-900'}`}>Previous</button>
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(p => (
              <button key={p} onClick={() => setCurrentPage(p)} className={`w-8 h-8 rounded-lg font-bold transition-all ${p === currentPage ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}>{p}</button>
            ))}
            <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className={`px-3 py-1.5 ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-gray-900'}`}>Next</button>
          </div>
        </div>
      </div>

      {viewingIncident && <ViewModal incident={viewingIncident} onClose={() => setViewingId(null)} />}
      {editingIncident && <EditModal incident={editingIncident} onSave={handleEdit} onClose={() => setEditingId(null)} />}
      {assigningIncident && <AssignModal incident={assigningIncident} onClose={() => setAssigningId(null)} />}
    </>
  );
}
