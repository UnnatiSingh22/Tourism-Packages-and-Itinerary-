import React, { useState } from 'react';
import { X, ClipboardList, Wrench, CheckCircle2, AlertTriangle, XCircle, Calendar, User, Car, Download, Search } from 'lucide-react';

interface InspectionLog {
  id: string;
  vehicle: string;
  technician: string;
  status: string;
  resultTag: string;
  resultColor: string;
  notes: string;
  date: string;
  mileage: string;
  nextService: string;
  items: string[];
}

function VehicleLogModal({ record, onClose }: { record: InspectionLog; onClose: () => void }) {
  const statusIcon = record.status === 'pass' ? <CheckCircle2 className="w-6 h-6 text-emerald-500" />
    : record.status === 'fail' ? <XCircle className="w-6 h-6 text-red-500" />
    : <AlertTriangle className="w-6 h-6 text-yellow-500" />;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            {statusIcon}
            <div>
              <h2 className="text-lg font-bold text-gray-900">Vehicle Log: {record.id}</h2>
              <p className="text-xs text-gray-500">{record.vehicle}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Meta Info */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: <User className="w-3.5 h-3.5 text-gray-400" />, label: 'Technician', value: record.technician },
              { icon: <Car className="w-3.5 h-3.5 text-gray-400" />, label: 'Odometer', value: record.mileage },
              { icon: <Calendar className="w-3.5 h-3.5 text-gray-400" />, label: 'Inspection Date', value: record.date.replace('\n', ' ') },
              { icon: <Wrench className="w-3.5 h-3.5 text-gray-400" />, label: 'Next Service', value: record.nextService },
            ].map((row, i) => (
              <div key={i} className="flex items-start gap-2 p-3 bg-gray-50 rounded-xl">
                <div className="mt-0.5">{row.icon}</div>
                <div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{row.label}</p>
                  <p className="text-sm font-semibold text-gray-800">{row.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Inspection Checklist */}
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <ClipboardList className="w-3.5 h-3.5" /> Inspection Checklist
            </p>
            <div className="space-y-2">
              {record.items.map((item, i) => {
                const isFail = item.includes('❌') || item.includes('Fail');
                const isWarn = item.includes('⚠️') || item.includes('Warning');
                return (
                  <div key={i} className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium ${isFail ? 'bg-red-50 text-red-700' : isWarn ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`}>
                    {isFail ? <XCircle className="w-4 h-4 shrink-0" /> : isWarn ? <AlertTriangle className="w-4 h-4 shrink-0" /> : <CheckCircle2 className="w-4 h-4 shrink-0" />}
                    {item}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Notes */}
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Technician Notes</p>
            <p className="text-sm text-gray-700 italic">{record.notes}</p>
          </div>

          {/* Result badge */}
          <div className="flex justify-between items-center">
            <span className={`px-4 py-2 text-xs font-bold tracking-widest uppercase rounded-xl border ${record.resultColor}`}>Final Result: {record.resultTag}</span>
            <button onClick={onClose} className="px-5 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-black transition-colors">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface InspectionHistoryProps {
  logs: InspectionLog[];
}

export function InspectionHistory({ logs }: InspectionHistoryProps) {
  const [viewLog, setViewLog] = useState<InspectionLog | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const handleDownloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,Asset ID,Vehicle,Technician,Status,Notes,Date,Odometer Mileage,Next Service Due\n" +
      logs.map(l => `"${l.id}","${l.vehicle}","${l.technician}","${l.status.toUpperCase()}","${l.notes}","${l.date.replace('\n', ' ')}","${l.mileage}","${l.nextService}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Fleet_Inspection_Logs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLogs = logs.filter(l => {
    const matchSearch = l.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) || l.id.toLowerCase().includes(searchQuery.toLowerCase()) || l.technician.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'All' || l.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <>
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex flex-col gap-6">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h2 className="text-base font-bold text-gray-900">Service & Inspection History Logs</h2>
            <p className="text-xs text-gray-500 mt-0.5">Asset health indices and safety validation status</p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search by asset, vehicle..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-1.5 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#BC2C2C]/30 w-44"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="bg-white border border-gray-200 text-gray-700 text-xs rounded-xl px-3 py-1.5 hover:bg-gray-50 transition-colors cursor-pointer focus:outline-none"
            >
              <option value="All">All Results</option>
              <option value="pass">Pass</option>
              <option value="warning">Warning</option>
              <option value="fail">Fail</option>
            </select>

            <button 
              onClick={handleDownloadCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#BC2C2C] hover:bg-[#8B2020] text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" /> Export Logs
            </button>
          </div>
        </div>

        {/* Visual Audit Timeline widget */}
        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col gap-3">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Visual Inspection Timeline (Recent Audits)</p>
          <div className="flex items-center gap-2 overflow-x-auto py-2">
            {logs.slice(0, 5).map((log, idx) => (
              <div key={idx} className="flex items-center shrink-0">
                <div 
                  onClick={() => setViewLog(log)}
                  className={`px-3 py-2 rounded-xl border text-[11px] font-bold cursor-pointer transition-transform hover:scale-105 flex flex-col gap-0.5 ${
                    log.status === 'pass' 
                      ? 'bg-emerald-50 border-emerald-100 text-emerald-700' 
                      : log.status === 'fail' 
                        ? 'bg-red-50 border-red-100 text-red-700' 
                        : 'bg-amber-50 border-amber-100 text-amber-700'
                  }`}
                >
                  <span>{log.id}</span>
                  <span className="text-[9px] opacity-75">{log.date.replace('\n', ' ')}</span>
                </div>
                {idx < 4 && idx < logs.length - 1 && <span className="text-gray-300 px-1 font-bold">→</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <th className="pb-3">Asset ID</th>
                <th className="pb-3">Vehicle</th>
                <th className="pb-3">Technician</th>
                <th className="pb-3">Result</th>
                <th className="pb-3">Notes</th>
                <th className="pb-3 text-right pr-2">Date</th>
                <th className="pb-3 text-right">Log</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${row.status === 'pass' ? 'bg-emerald-500' : row.status === 'fail' ? 'bg-red-500' : 'bg-yellow-500'}`} />
                      <span className="text-sm font-bold text-gray-900">{row.id}</span>
                    </div>
                  </td>
                  <td className="py-4 text-xs text-gray-600 font-medium">{row.vehicle}</td>
                  <td className="py-4 text-sm text-gray-700 font-medium">{row.technician}</td>
                  <td className="py-4">
                    <span className={`px-2.5 py-1 text-[9px] font-bold tracking-widest uppercase rounded border ${row.resultColor}`}>
                      {row.resultTag}
                    </span>
                  </td>
                  <td className="py-4 text-xs text-gray-500 italic max-w-[160px] leading-relaxed">{row.notes}</td>
                  <td className="py-4 text-xs font-medium text-gray-500 whitespace-pre-wrap text-right pr-2">{row.date}</td>
                  <td className="py-4 text-right">
                    <button
                      onClick={() => setViewLog(row)}
                      className="text-xs font-bold text-[#BC2C2C] hover:text-[#8B2020] transition-colors"
                    >
                      View Log
                    </button>
                  </td>
                </tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr><td colSpan={7} className="py-8 text-center text-xs text-gray-400">No matching inspection records.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {viewLog && <VehicleLogModal record={viewLog} onClose={() => setViewLog(null)} />}
    </>
  );
}
