import React from 'react';
import { ArrowUp, ArrowRight, FileText, Download, PlaySquare } from 'lucide-react';

export function PerformanceMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {/* Metric 1 */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-center">
        <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-4">Net Margin</p>
        <div className="flex items-end gap-3 mb-4">
          <span className="text-3xl font-extrabold text-gray-900 leading-none">32.4%</span>
          <span className="text-sm font-bold text-emerald-500 mb-0.5 flex items-center">
            <ArrowUp className="w-3 h-3 mr-0.5" /> 4.2%
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-1.5 flex mt-auto">
          <div className="bg-orange-300 h-1.5 rounded-full w-[32%]"></div>
        </div>
      </div>

      {/* Metric 2 */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-center">
        <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-4">Customer NPS</p>
        <div className="flex items-end gap-3 mb-2">
          <span className="text-3xl font-extrabold text-gray-900 leading-none">78</span>
          <span className="text-sm font-bold text-emerald-500 mb-0.5 flex items-center">
            <ArrowUp className="w-3 h-3 mr-0.5" /> 12
          </span>
        </div>
        <p className="text-[10px] font-medium text-gray-400 italic mt-auto">Highest in 'Airport Transfers'</p>
      </div>

      {/* Metric 3 */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-center">
        <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-4">Fleet Reliability</p>
        <div className="flex items-end gap-3 mb-4">
          <span className="text-3xl font-extrabold text-gray-900 leading-none">99.2%</span>
          <span className="text-xs font-bold text-gray-500 mb-0.5 uppercase tracking-widest">Stable</span>
        </div>
        <div className="flex gap-1 mt-auto">
          <div className="h-1.5 flex-1 bg-gray-900 rounded-full"></div>
          <div className="h-1.5 flex-1 bg-gray-900 rounded-full"></div>
          <div className="h-1.5 flex-1 bg-gray-900 rounded-full"></div>
          <div className="h-1.5 flex-1 bg-gray-900 rounded-full"></div>
          <div className="h-1.5 flex-1 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Floating Card */}
      <div className="bg-[#FFF4F3] rounded-3xl p-6 shadow-sm border border-[#FFE4E1] flex flex-col justify-center">
        <p className="text-sm font-medium text-gray-800 leading-relaxed mb-4">
          Your fleet reached a new record in efficiency last Tuesday.
        </p>
        <button className="text-sm font-bold text-[#E65A4B] flex items-center gap-1.5 hover:text-red-700 transition-colors mt-auto">
          View Insight <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
