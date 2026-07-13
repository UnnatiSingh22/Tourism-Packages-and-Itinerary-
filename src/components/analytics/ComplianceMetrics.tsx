import React from 'react';
import { AlertTriangle, FileText, ShieldCheck } from 'lucide-react';

export function ComplianceMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Metric 1 */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <span className="px-3 py-1 bg-red-50 text-[#BC2C2C] text-[11px] font-bold tracking-wide rounded-full">
            +12% vs last week
          </span>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">Passport Expiry Alerts</p>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl font-extrabold text-gray-900 leading-none">24</span>
          </div>
          <p className="text-sm text-gray-500 font-medium">Expiring within 90 days</p>
        </div>
      </div>

      {/* Metric 2 */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <span className="px-3 py-1 bg-orange-100 text-orange-700 text-[11px] font-bold tracking-wide rounded-full">
            Action Required
          </span>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">Missing Documentation</p>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl font-extrabold text-gray-900 leading-none">08</span>
          </div>
          <p className="text-sm text-gray-500 font-medium">Incomplete travel dossiers</p>
        </div>
      </div>

      {/* Metric 3 */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[11px] font-bold tracking-wide rounded-full">
            Healthy
          </span>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">Overall Compliance</p>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl font-extrabold text-gray-900 leading-none">94%</span>
          </div>
          <p className="text-sm text-gray-500 font-medium">Current fleet readiness</p>
        </div>
      </div>
    </div>
  );
}
