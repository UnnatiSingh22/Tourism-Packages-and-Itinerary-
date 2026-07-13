import React, { useState } from 'react';
import { Filter, CheckCircle2, Download, Users, X, ChevronDown } from 'lucide-react';

interface Traveler {
  initials: string;
  avatar: string;
  name: string;
  seat: string;
  pnr: string;
  status: 'Checked-In' | 'Pending' | 'Not Started';
  docs: 'verified' | 'missing-visa' | 'expiring-doc' | 'none';
  readiness: string;
  readinessColor: string;
}

const ALL_TRAVELERS: Traveler[] = [
  { initials: 'JV', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=faces', name: 'Julian Vane', seat: 'Seat 04A', pnr: 'PNR: XV90', status: 'Checked-In', docs: 'verified', readiness: 'Boarding Ready', readinessColor: 'text-emerald-500' },
  { initials: 'ER', avatar: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=100&h=100&fit=crop', name: 'Elena Rodriguez', seat: 'Seat 12C', pnr: 'PNR: QW22', status: 'Pending', docs: 'missing-visa', readiness: 'Action Required', readinessColor: 'text-red-500' },
  { initials: 'MT', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=faces', name: 'Marcus Thorne', seat: 'Seat 01B', pnr: 'PNR: LK78', status: 'Checked-In', docs: 'expiring-doc', readiness: 'Alert: Verify', readinessColor: 'text-orange-500' },
  { initials: 'SJ', avatar: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=150&h=150&fit=crop', name: 'Sarah Jenkins', seat: 'Seat 22F', pnr: 'PNR: PL44', status: 'Not Started', docs: 'none', readiness: 'Waiting', readinessColor: 'text-gray-400' },
  { initials: 'RK', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop', name: 'Rohan Kapoor', seat: 'Seat 07D', pnr: 'PNR: MN55', status: 'Pending', docs: 'verified', readiness: 'Docs Pending', readinessColor: 'text-amber-500' },
  { initials: 'AL', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop', name: 'Amina Larsen', seat: 'Seat 16B', pnr: 'PNR: TR91', status: 'Checked-In', docs: 'verified', readiness: 'Boarding Ready', readinessColor: 'text-emerald-500' },
  { initials: 'PW', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', name: 'Philip Walsh', seat: 'Seat 03C', pnr: 'PNR: BG34', status: 'Not Started', docs: 'none', readiness: 'Waiting', readinessColor: 'text-gray-400' },
  { initials: 'NS', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop', name: 'Nadia Sharma', seat: 'Seat 19A', pnr: 'PNR: KQ12', status: 'Checked-In', docs: 'verified', readiness: 'Boarding Ready', readinessColor: 'text-emerald-500' },
];

const STATUS_STYLES: Record<Traveler['status'], string> = {
  'Checked-In': 'text-emerald-600 bg-emerald-50',
  'Pending': 'text-amber-600 bg-amber-50',
  'Not Started': 'text-indigo-500 bg-indigo-50',
};

function DocsBadge({ docs }: { docs: Traveler['docs'] }) {
  if (docs === 'verified') return <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-500" /><CheckCircle2 className="w-4 h-4 text-emerald-500" /></span>;
  if (docs === 'missing-visa') return <span className="px-2 py-0.5 bg-red-50 text-red-600 text-[9px] font-bold rounded uppercase tracking-wide">Missing Visa</span>;
  if (docs === 'expiring-doc') return <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /><span className="px-2 py-0.5 bg-orange-50 text-orange-600 text-[9px] font-bold rounded uppercase tracking-wide">Expiring Doc</span></span>;
  return <span className="text-gray-300 text-sm">···</span>;
}

// Download manifest as CSV
function downloadManifest(travelers: Traveler[], selected: Set<string>) {
  const rows = travelers.filter(t => selected.size === 0 || selected.has(t.name));
  const csv = ['Name,Seat,PNR,Status,Documents,Readiness',
    ...rows.map(t => `"${t.name}","${t.seat}","${t.pnr}","${t.status}","${t.docs}","${t.readiness}"`)
  ].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'Traveler_Manifest.csv';
  a.click();
}

interface CheckInManifestTableProps {
  travelersList?: Traveler[];
  onUpdateTravelers?: React.Dispatch<React.SetStateAction<Traveler[]>>;
  selectedNames?: Set<string>;
  onUpdateSelected?: React.Dispatch<React.SetStateAction<Set<string>>>;
}

export function CheckInManifestTable({ 
  travelersList = ALL_TRAVELERS, 
  onUpdateTravelers, 
  selectedNames = new Set(), 
  onUpdateSelected 
}: CheckInManifestTableProps) {
  const [statusFilter, setStatusFilter] = useState('All');
  const [docsFilter, setDocsFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [batchSuccess, setBatchSuccess] = useState(false);

  const filtered = travelersList.filter(t => {
    const matchStatus = statusFilter === 'All' || t.status === statusFilter;
    const matchDocs = docsFilter === 'All' || t.docs === docsFilter;
    const matchSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        t.pnr.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchDocs && matchSearch;
  });

  const allSelected = filtered.length > 0 && filtered.every(t => selectedNames.has(t.name));

  const toggleAll = () => {
    if (allSelected) {
      onUpdateSelected?.(new Set());
    } else {
      onUpdateSelected?.(new Set(filtered.map(t => t.name)));
    }
  };

  const toggleOne = (name: string) => {
    onUpdateSelected?.(prev => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  const handleBatchCheckIn = () => {
    onUpdateTravelers?.(prev => prev.map(t =>
      selectedNames.has(t.name) ? { ...t, status: 'Checked-In' as const, readiness: 'Boarding Ready', readinessColor: 'text-emerald-500' } : t
    ));
    onUpdateSelected?.(new Set());
    setBatchSuccess(true);
    setTimeout(() => setBatchSuccess(false), 3000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col">
      {/* Header with controls */}
      <div className="p-5 border-b border-gray-100 flex flex-wrap justify-between items-center gap-3">
        <h2 className="text-[15px] font-bold text-gray-900">Traveler Manifest</h2>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Manifest Search */}
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search guest or PNR..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-3 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#BC2C2C]/30 w-36"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="appearance-none pl-3 pr-7 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 focus:outline-none cursor-pointer"
            >
              <option value="All">All Status</option>
              <option value="Checked-In">Checked-In</option>
              <option value="Pending">Pending</option>
              <option value="Not Started">Not Started</option>
            </select>
            <ChevronDown className="w-3 h-3 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Docs Filter */}
          <div className="relative">
            <select
              value={docsFilter}
              onChange={e => setDocsFilter(e.target.value)}
              className="appearance-none pl-3 pr-7 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 focus:outline-none cursor-pointer"
            >
              <option value="All">All Docs</option>
              <option value="verified">Verified</option>
              <option value="missing-visa">Missing Visa</option>
              <option value="expiring-doc">Expiring Doc</option>
              <option value="none">No Docs</option>
            </select>
            <ChevronDown className="w-3 h-3 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Download Manifest */}
          <button
            onClick={() => downloadManifest(filtered, selectedNames)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> Export
          </button>

          {/* Batch Check-In */}
          {selectedNames.size > 0 && (
            <button
              onClick={handleBatchCheckIn}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-lg transition-colors"
            >
              <Users className="w-3.5 h-3.5" /> Check-In {selectedNames.size}
            </button>
          )}
        </div>
      </div>

      {/* Success banner */}
      {batchSuccess && (
        <div className="mx-4 mt-3 p-3 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span className="text-xs font-bold text-emerald-700">Batch check-in successful!</span>
          <button onClick={() => setBatchSuccess(false)} className="ml-auto text-emerald-400 hover:text-emerald-600"><X className="w-3.5 h-3.5" /></button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="px-5 py-3">
                <input type="checkbox" checked={allSelected} onChange={toggleAll} className="w-4 h-4 rounded border-gray-300 cursor-pointer accent-[#BC2C2C]" />
              </th>
              <th className="px-3 py-3 text-[10px] font-bold text-gray-400 tracking-wider uppercase">Traveler</th>
              <th className="px-3 py-3 text-[10px] font-bold text-gray-400 tracking-wider uppercase">Status</th>
              <th className="px-3 py-3 text-[10px] font-bold text-gray-400 tracking-wider uppercase">Documents</th>
              <th className="px-3 py-3 text-[10px] font-bold text-gray-400 tracking-wider uppercase">Readiness</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.name} className={`border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors ${selectedNames.has(t.name) ? 'bg-blue-50/30' : ''}`}>
                <td className="px-5 py-4">
                  <input type="checkbox" checked={selectedNames.has(t.name)} onChange={() => toggleOne(t.name)} className="w-4 h-4 rounded border-gray-300 cursor-pointer accent-[#BC2C2C]" />
                </td>
                <td className="px-3 py-4">
                  <div className="flex items-center gap-3">
                    <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <p className="text-[13px] font-bold text-gray-900">{t.name}</p>
                      <p className="text-[11px] text-gray-500">{t.seat} • {t.pnr}</p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${STATUS_STYLES[t.status]}`}>{t.status}</span>
                </td>
                <td className="px-3 py-4"><DocsBadge docs={t.docs} /></td>
                <td className="px-3 py-4">
                  <span className={`text-[12px] font-semibold flex items-center gap-1 ${t.readinessColor}`}>{t.readiness}</span>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="py-8 text-center text-sm text-gray-400">No travelers match this filter.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-white rounded-b-2xl">
        <span className="text-xs text-gray-500">Showing {filtered.length} of {travelersList.length} travelers</span>
        <button
          onClick={() => downloadManifest(filtered, new Set())}
          className="flex items-center gap-1.5 text-[13px] font-semibold text-[#BC2C2C] hover:text-[#8B2020] transition-colors bg-transparent border-0 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" /> Download Full Manifest
        </button>
      </div>
    </div>
  );
}
