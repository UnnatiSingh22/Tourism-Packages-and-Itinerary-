import React, { useState, useMemo } from 'react';
import { X, Search, ChevronLeft, ChevronRight, Clock, User, Activity, Filter, CheckCircle2, AlertCircle, RefreshCw, Download } from 'lucide-react';

const ALL_HISTORY: {
  id: string; timestamp: string; user: string; action: string; module: string; status: 'Success' | 'Failed' | 'Pending' | 'Warning';
}[] = [
  { id: 'h1', timestamp: '2026-07-04 14:52:01', user: 'Arjun Mehta', action: 'Approved Amalfi Coast Luxury Escape package', module: 'Approvals', status: 'Success' },
  { id: 'h2', timestamp: '2026-07-04 14:48:33', user: 'Priya Sharma', action: 'Updated departure manifest for Goa Weekend', module: 'Departures', status: 'Success' },
  { id: 'h3', timestamp: '2026-07-04 14:41:09', user: 'Ravi Kumar', action: 'Applied early-bird discount to Kashmir Deluxe', module: 'Pricing', status: 'Success' },
  { id: 'h4', timestamp: '2026-07-04 14:35:57', user: 'Sonal Patel', action: 'Promoted waitlist traveler #WT-0291 to confirmed', module: 'Waitlist', status: 'Success' },
  { id: 'h5', timestamp: '2026-07-04 14:28:12', user: 'Arjun Mehta', action: 'Flagged compliance rule violation – Passport expiry < 6M', module: 'Compliance', status: 'Warning' },
  { id: 'h6', timestamp: '2026-07-04 14:20:44', user: 'System', action: 'Auto-reconcile route optimization for Paris Circuit', module: 'Routes', status: 'Success' },
  { id: 'h7', timestamp: '2026-07-04 14:15:03', user: 'Priya Sharma', action: 'Submitted incident report #INC-1182 – Vehicle breakdown', module: 'Incidents', status: 'Pending' },
  { id: 'h8', timestamp: '2026-07-04 14:08:29', user: 'Ravi Kumar', action: 'Batch check-in completed – 32 passengers for Rajasthan Heritage', module: 'Check-In', status: 'Success' },
  { id: 'h9', timestamp: '2026-07-04 13:59:11', user: 'Amit Joshi', action: 'Export manifest PDF – Japan Sakura Tour', module: 'Departures', status: 'Success' },
  { id: 'h10', timestamp: '2026-07-04 13:50:48', user: 'System', action: 'Yield efficiency recalculation triggered – Q3 data sync', module: 'Analytics', status: 'Success' },
  { id: 'h11', timestamp: '2026-07-04 13:42:06', user: 'Sonal Patel', action: 'Created new compliance rule – Visa validity check', module: 'Compliance', status: 'Success' },
  { id: 'h12', timestamp: '2026-07-04 13:35:29', user: 'Arjun Mehta', action: 'Rejected Singapore Premium package – Missing hotel confirmation', module: 'Approvals', status: 'Failed' },
  { id: 'h13', timestamp: '2026-07-04 13:28:14', user: 'Priya Sharma', action: 'Assigned guide Rajesh V. to Kerala Backwaters tour', module: 'Resources', status: 'Success' },
  { id: 'h14', timestamp: '2026-07-04 13:21:52', user: 'System', action: 'Dynamic pricing surge applied – Diwali peak window detected', module: 'Pricing', status: 'Success' },
  { id: 'h15', timestamp: '2026-07-04 13:14:37', user: 'Ravi Kumar', action: 'Vehicle inspection completed – MH12-AB-4521 passed', module: 'Fleet', status: 'Success' },
  { id: 'h16', timestamp: '2026-07-04 13:07:19', user: 'Amit Joshi', action: 'Guest profile updated – Meera Kapoor (loyalty tier: Gold)', module: 'Guests', status: 'Success' },
  { id: 'h17', timestamp: '2026-07-04 12:58:41', user: 'Sonal Patel', action: 'Resolved incident #INC-1179 – Driver delay Dubai route', module: 'Incidents', status: 'Success' },
  { id: 'h18', timestamp: '2026-07-04 12:50:03', user: 'System', action: 'Waitlist auto-promotion check – 3 slots released Europe Highlights', module: 'Waitlist', status: 'Success' },
  { id: 'h19', timestamp: '2026-07-04 12:43:22', user: 'Arjun Mehta', action: 'Updated seasonal pricing – shoulder season markup +18%', module: 'Pricing', status: 'Success' },
  { id: 'h20', timestamp: '2026-07-04 12:36:55', user: 'Priya Sharma', action: 'Supplier comparison finalized – Hilton vs Marriott Bali', module: 'Vendors', status: 'Success' },
  { id: 'h21', timestamp: '2026-07-04 12:29:14', user: 'Ravi Kumar', action: 'Itinerary day 3 tasks marked complete – Thailand Escape', module: 'Itinerary', status: 'Success' },
  { id: 'h22', timestamp: '2026-07-04 12:21:47', user: 'System', action: 'Emergency alert cleared – Cyclone warning Goa lifted', module: 'Command Center', status: 'Success' },
  { id: 'h23', timestamp: '2026-07-04 12:14:08', user: 'Amit Joshi', action: 'Full manifest downloaded – Kashmir Deluxe (48 pax)', module: 'Check-In', status: 'Success' },
  { id: 'h24', timestamp: '2026-07-04 12:07:33', user: 'Sonal Patel', action: 'New package created – Dubai Desert Safari Premium 8D', module: 'Packages', status: 'Pending' },
  { id: 'h25', timestamp: '2026-07-04 11:58:20', user: 'Arjun Mehta', action: 'Fleet utilization report exported – Q2 2026', module: 'Fleet', status: 'Success' },
  { id: 'h26', timestamp: '2026-07-04 11:51:44', user: 'System', action: 'Route optimization re-run – London West cluster', module: 'Routes', status: 'Warning' },
  { id: 'h27', timestamp: '2026-07-04 11:45:09', user: 'Priya Sharma', action: 'Assigned Riyaz M. to incident investigation #INC-1180', module: 'Incidents', status: 'Success' },
  { id: 'h28', timestamp: '2026-07-04 11:38:37', user: 'Ravi Kumar', action: 'Applied blackout dates – Holi festival 25–26 Mar 2027', module: 'Pricing', status: 'Success' },
  { id: 'h29', timestamp: '2026-07-04 11:31:15', user: 'Amit Joshi', action: 'Compliance audit scan completed – 2 violations found', module: 'Compliance', status: 'Warning' },
  { id: 'h30', timestamp: '2026-07-04 11:24:02', user: 'System', action: 'Data sync completed – 1,847 records updated from backend', module: 'System', status: 'Success' },
];

const MODULES = ['All Modules', 'Approvals', 'Departures', 'Pricing', 'Waitlist', 'Compliance', 'Routes', 'Incidents', 'Check-In', 'Analytics', 'Resources', 'Fleet', 'Guests', 'Vendors', 'Itinerary', 'Command Center', 'Packages', 'System'];
const STATUSES = ['All Statuses', 'Success', 'Failed', 'Pending', 'Warning'];
const PAGE_SIZE = 10;

const statusConfig = {
  Success: { color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100', icon: <CheckCircle2 className="w-3 h-3" /> },
  Failed: { color: 'text-red-600', bg: 'bg-red-50 border-red-100', icon: <AlertCircle className="w-3 h-3" /> },
  Warning: { color: 'text-amber-600', bg: 'bg-amber-50 border-amber-100', icon: <AlertCircle className="w-3 h-3" /> },
  Pending: { color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100', icon: <RefreshCw className="w-3 h-3" /> },
};

interface Props { onClose: () => void; }

export function ActivityHistoryModal({ onClose }: Props) {
  const [search, setSearch] = useState('');
  const [moduleFilter, setModuleFilter] = useState('All Modules');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [sortDesc, setSortDesc] = useState(true);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let data = [...ALL_HISTORY];
    if (search) data = data.filter(h => h.action.toLowerCase().includes(search.toLowerCase()) || h.user.toLowerCase().includes(search.toLowerCase()));
    if (moduleFilter !== 'All Modules') data = data.filter(h => h.module === moduleFilter);
    if (statusFilter !== 'All Statuses') data = data.filter(h => h.status === statusFilter);
    data.sort((a, b) => sortDesc ? b.timestamp.localeCompare(a.timestamp) : a.timestamp.localeCompare(b.timestamp));
    return data;
  }, [search, moduleFilter, statusFilter, sortDesc]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageData = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#BC2C2C]" /> Activity History
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">{filtered.length} records found</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 px-6 py-4 border-b border-gray-50 shrink-0 bg-gray-50/50">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search actions or users..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#BC2C2C]/20"
            />
          </div>
          <select
            value={moduleFilter}
            onChange={e => { setModuleFilter(e.target.value); setPage(1); }}
            className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 focus:outline-none cursor-pointer"
          >
            {MODULES.map(m => <option key={m}>{m}</option>)}
          </select>
          <select
            value={statusFilter}
            onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
            className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 focus:outline-none cursor-pointer"
          >
            {STATUSES.map(s => <option key={s}>{s}</option>)}
          </select>
          <button
            onClick={() => setSortDesc(p => !p)}
            className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Clock className="w-4 h-4" />
            {sortDesc ? 'Newest First' : 'Oldest First'}
          </button>
          <button
            onClick={() => {
              const csvContent = "data:text/csv;charset=utf-8,ID,Timestamp,User,Action,Module,Status\n" +
                filtered.map(row => `"${row.id}","${row.timestamp}","${row.user}","${row.action}","${row.module}","${row.status}"`).join("\n");
              const encodedUri = encodeURI(csvContent);
              const link = document.createElement("a");
              link.setAttribute("href", encodedUri);
              link.setAttribute("download", "Activity_History_Audit_Report.csv");
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="flex items-center gap-2 px-3 py-2 bg-[#BC2C2C] text-white rounded-xl text-sm font-semibold hover:bg-[#8B2020] transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            Export History
          </button>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-left">
            <thead className="sticky top-0 bg-white border-b border-gray-100 z-10">
              <tr>
                <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Timestamp</th>
                <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">User</th>
                <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Action</th>
                <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Module</th>
                <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {pageData.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-sm text-gray-400">No records match your filters.</td></tr>
              ) : pageData.map(row => {
                const sc = statusConfig[row.status];
                return (
                  <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-xs font-mono text-gray-500 whitespace-nowrap">{row.timestamp}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#BC2C2C] to-[#E65A4B] flex items-center justify-center text-white text-[9px] font-bold shrink-0">
                          {row.user === 'System' ? 'SYS' : row.user.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-xs font-semibold text-gray-700 whitespace-nowrap">{row.user}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-600 max-w-xs">{row.action}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-lg">{row.module}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-[10px] font-bold rounded-lg border ${sc.bg} ${sc.color}`}>
                        {sc.icon} {row.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-white shrink-0">
          <span className="text-xs text-gray-500">
            Showing {filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length} entries
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${p === currentPage ? 'bg-[#BC2C2C] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
