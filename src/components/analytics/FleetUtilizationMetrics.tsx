import React from 'react';
import { Car, Wrench, BatteryCharging, ShieldCheck } from 'lucide-react';

export function FleetUtilizationMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {/* Metric 1 */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-600 flex items-center justify-center">
            <Car className="w-5 h-5" />
          </div>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold tracking-widest uppercase rounded">
            92% Active
          </span>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">Total Fleet Size</p>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl font-extrabold text-gray-900 leading-none">124</span>
          </div>
          <p className="text-xs text-gray-500 font-medium">Premium Vehicles</p>
        </div>
      </div>

      {/* Metric 2 */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">On the Road</p>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl font-extrabold text-gray-900 leading-none">86</span>
          </div>
          <p className="text-xs text-gray-500 font-medium">Currently deployed</p>
        </div>
      </div>

      {/* Metric 3 */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
            <Wrench className="w-5 h-5" />
          </div>
          <span className="text-orange-500 text-[11px] font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span> 3 Critical
          </span>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">Maintenance</p>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl font-extrabold text-gray-900 leading-none">12</span>
          </div>
          <p className="text-xs text-gray-500 font-medium">Scheduled service</p>
        </div>
      </div>

      {/* Metric 4 */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
            <BatteryCharging className="w-5 h-5" />
          </div>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">EV Charge Status</p>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl font-extrabold text-gray-900 leading-none">94%</span>
          </div>
          <p className="text-xs text-gray-500 font-medium">Average fleet level</p>
        </div>
      </div>
    </div>
  );
}
