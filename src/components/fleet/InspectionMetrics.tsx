import React from 'react';
import { Calendar, AlertCircle, TrendingUp } from 'lucide-react';

export function InspectionMetrics() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 mb-8">
      {/* Metric 1: Inspection Status */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex-1 relative overflow-hidden">
        <h3 className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-4">Inspection Status</h3>
        <div className="mb-8">
          <span className="text-4xl font-extrabold text-gray-900 leading-none">94%</span>
          <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold mt-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+2.4% from last month</span>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-xs font-bold mb-2">
            <span className="text-gray-600">Fleet Health</span>
            <span className="text-gray-900">Excellent</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 flex">
            <div className="bg-gray-900 h-2 rounded-full w-[94%]"></div>
          </div>
        </div>
      </div>

      {/* Metric 2: Upcoming Maintenance */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 w-full lg:w-[280px]">
        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-600 mb-6 border border-gray-100">
          <Calendar className="w-5 h-5" />
        </div>
        <h3 className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-2">Upcoming Maintenance</h3>
        <p className="text-2xl font-bold text-gray-900 mb-3">12 Vehicles</p>
        <p className="text-xs text-gray-500 leading-relaxed pr-4">
          Scheduled for deep check-ups within the next 48 hours.
        </p>
      </div>

      {/* Metric 3: Critical Alerts */}
      <div className="bg-red-50/30 rounded-3xl p-6 shadow-sm border border-red-100 w-full lg:w-[280px]">
        <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-500 mb-6 border border-red-100">
          <AlertCircle className="w-5 h-5" />
        </div>
        <h3 className="text-[10px] font-bold text-red-400 tracking-widest uppercase mb-2">Critical Alerts</h3>
        <p className="text-2xl font-bold text-red-500 mb-3">3 Failed</p>
        <p className="text-xs text-gray-600 leading-relaxed pr-4">
          Safety protocols require immediate grounding of tagged assets.
        </p>
      </div>
    </div>
  );
}
