import React from 'react';
import { TrendingDown, Tag, Clock, CheckCircle2 } from 'lucide-react';
import { formatRupee } from '../../lib/utils';

export function SupplierMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {/* Metric 1 */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
            <TrendingDown className="w-5 h-5" />
          </div>
          <span className="flex items-center gap-1 text-emerald-500 text-[11px] font-bold">
            <TrendingDown className="w-3 h-3" /> 4.2%
          </span>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">Avg Rate Change</p>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl font-extrabold text-gray-900 leading-none">{formatRupee(-124.5, 2)}</span>
          </div>
          <p className="text-xs text-gray-500 font-medium">vs. previous fiscal quarter</p>
        </div>
      </div>

      {/* Metric 2 */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-600 flex items-center justify-center">
            <Tag className="w-5 h-5" />
          </div>
          <span className="px-3 py-1 bg-yellow-50 text-yellow-700 border border-yellow-100 text-[9px] font-bold tracking-widest uppercase rounded">
            Best Value
          </span>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">Lowest Quote</p>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl font-extrabold text-gray-900 leading-none">{formatRupee(4200, 2)}</span>
          </div>
          <p className="text-xs text-gray-500 font-medium">Grand Heritage Resort & Spa</p>
        </div>
      </div>

      {/* Metric 3 */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <span className="text-gray-400 text-[11px] font-bold flex items-center gap-1">
            <Clock className="w-3 h-3" /> 12m
          </span>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">Rate Stability</p>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl font-extrabold text-gray-900 leading-none">High</span>
          </div>
          <p className="text-xs text-gray-500 font-medium">Predictable seasonal fluctuations</p>
        </div>
      </div>

      {/* Metric 4 */}
      <div className="bg-red-50 rounded-3xl p-6 shadow-sm border border-red-100 flex flex-col justify-between">
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-xl bg-white text-red-500 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <span className="text-red-600 text-[10px] font-bold tracking-widest uppercase">
            New Contract
          </span>
        </div>
        <div>
          <p className="text-[10px] font-bold text-red-800 tracking-widest uppercase mb-1">Savings Opportunity</p>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl font-extrabold text-red-600 leading-none">{formatRupee(12400)}</span>
          </div>
          <p className="text-xs text-red-800/80 font-medium">Bundled transport & logistics</p>
        </div>
      </div>
    </div>
  );
}
