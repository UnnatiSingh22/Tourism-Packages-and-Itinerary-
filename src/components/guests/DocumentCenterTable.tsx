import React from 'react';
import { FileText, CheckCircle2, Clock, AlertCircle, Eye, Upload } from 'lucide-react';

export function DocumentCenterTable() {
  const documents = [
    { 
      name: 'Passport_Scan_Rossi_2024.pdf', 
      type: 'Passport Copy', 
      typeColor: 'bg-indigo-50 text-indigo-600',
      status: 'Verified', 
      statusColor: 'text-emerald-500',
      icon: CheckCircle2,
      lastAudit: 'Mar 12, 2024',
      action: 'Audit'
    },
    { 
      name: 'Shengen_Visa_2025.pdf', 
      type: 'Visa', 
      typeColor: 'bg-purple-50 text-purple-600',
      status: 'Verified', 
      statusColor: 'text-emerald-500',
      icon: CheckCircle2,
      lastAudit: 'Jan 05, 2024',
      action: 'Audit'
    },
    { 
      name: 'Rossi_Allianz_Care_24.pdf', 
      type: 'Insurance', 
      typeColor: 'bg-amber-50 text-amber-600',
      status: 'Pending', 
      statusColor: 'text-orange-500',
      icon: Clock,
      lastAudit: '-',
      action: 'Verify'
    }
  ];

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Document Center</h2>
          <p className="text-xs font-medium text-gray-500 mt-1">Manage and audit all traveler certifications and travel documents.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 text-sm font-bold rounded-xl hover:bg-indigo-100 transition-colors">
          <Upload className="w-4 h-4" />
          Upload New
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100 bg-white">
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 tracking-widest uppercase">Document Name</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 tracking-widest uppercase text-center">Type</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 tracking-widest uppercase">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 tracking-widest uppercase">Last Audit</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 tracking-widest uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc, idx) => (
              <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-indigo-400" />
                    <span className="text-sm font-semibold text-gray-900">{doc.name}</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-center">
                  <span className={`px-3 py-1 rounded text-[10px] font-bold ${doc.typeColor}`}>
                    {doc.type}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <span className={`text-xs font-bold flex items-center gap-1.5 ${doc.statusColor}`}>
                    <doc.icon className="w-4 h-4" />
                    {doc.status}
                  </span>
                </td>
                <td className="px-6 py-5 text-sm font-medium text-gray-600">{doc.lastAudit}</td>
                <td className="px-6 py-5 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <button className={`text-xs font-bold ${doc.status === 'Pending' ? 'text-emerald-600 hover:text-emerald-700' : 'text-[#BC2C2C] hover:text-[#8B2020]'}`}>
                      {doc.action}
                    </button>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
