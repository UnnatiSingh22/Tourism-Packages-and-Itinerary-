import React from 'react';
import { Leaf, Clock, Map } from 'lucide-react';

export function RouteMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {/* Metric 1 */}
      <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex items-center gap-5">
        <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-700 shrink-0 border border-gray-200">
          <Leaf className="w-6 h-6" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">Fuel Savings (AI)</p>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-gray-900">€12,480</span>
            <span className="text-sm font-bold text-emerald-500 mb-1">↑ 14%</span>
          </div>
        </div>
      </div>

      {/* Metric 2 */}
      <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex items-center gap-5">
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0 border border-emerald-100">
          <Clock className="w-6 h-6" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">On-Time Performance</p>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-gray-900">98.2%</span>
            <span className="text-sm font-bold text-emerald-500 mb-1">↑ 2.1%</span>
          </div>
        </div>
      </div>

      {/* Metric 3 */}
      <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex items-center gap-5">
        <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-400 shrink-0 border border-orange-100">
          <Map className="w-6 h-6" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">Avg Route Density</p>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-gray-900">4.8</span>
            <span className="text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-wide">stops/hr</span>
          </div>
        </div>
      </div>
    </div>
  );
}
