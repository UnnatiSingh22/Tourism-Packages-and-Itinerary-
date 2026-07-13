import React from 'react';
import { ClipboardList, Mail, CheckCircle2, XCircle } from 'lucide-react';

export function ApprovalMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-[#BC2C2C] flex items-center justify-center">
            <ClipboardList className="w-5 h-5" />
          </div>
          <span className="text-emerald-500 text-xs font-bold">+12%</span>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">Pending Queue</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-gray-900 leading-none">24</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <span className="text-gray-400 text-xs font-bold">Stable</span>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">Draft Packages</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-gray-900 leading-none">158</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <span className="text-emerald-500 text-xs font-bold">+5</span>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">Approved Today</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-gray-900 leading-none">18</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
            <XCircle className="w-5 h-5" />
          </div>
          <span className="text-red-500 text-xs font-bold">-2%</span>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">Rejection Rate</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-gray-900 leading-none">4.2%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
