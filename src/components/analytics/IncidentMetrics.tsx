import React from 'react';
import { AlertTriangle, Clock, Shield, BarChart3 } from 'lucide-react';

interface IncidentMetricsProps {
  incidentsCount?: number;
}

export function IncidentMetrics({ incidentsCount = 4 }: IncidentMetricsProps) {
  const safetyScore = Math.max(70, 94.8 - (incidentsCount - 4) * 1.5);
  const resolutionTime = Math.max(12, 28.5 - (incidentsCount - 4) * 0.8);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Metric 1 */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden flex flex-col justify-between h-[140px]">
        <div className="absolute right-4 bottom-4 opacity-[0.03] pointer-events-none">
          <BarChart3 className="w-24 h-24" />
        </div>
        <div className="flex justify-between items-start">
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 border border-purple-100 relative z-10">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <span className="px-3 py-1 bg-red-50 text-[#E65A4B] text-[10px] font-bold rounded-lg z-10">
            {incidentsCount} Total Logged
          </span>
        </div>
        <div className="relative z-10">
          <p className="text-xs font-semibold text-gray-500 mb-1">Incident Frequency</p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-gray-900">{(1.0 + incidentsCount * 0.1).toFixed(1)}</span>
            <span className="text-sm font-semibold text-gray-400">/ 1k miles</span>
          </div>
        </div>
      </div>

      {/* Metric 2 */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden flex flex-col justify-between h-[140px]">
        <div className="absolute right-4 bottom-4 opacity-[0.03] pointer-events-none">
          <Clock className="w-24 h-24" />
        </div>
        <div className="flex justify-between items-start">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500 border border-emerald-100 relative z-10">
            <Clock className="w-5 h-5" />
          </div>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-lg z-10">
            +4.2h faster
          </span>
        </div>
        <div className="relative z-10">
          <p className="text-xs font-semibold text-gray-500 mb-1">Avg. Resolution Time</p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-gray-900">{resolutionTime.toFixed(1)}</span>
            <span className="text-sm font-semibold text-gray-400">hours</span>
          </div>
        </div>
      </div>

      {/* Metric 3 */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden flex flex-col justify-between h-[140px]">
        <div className="absolute right-4 bottom-4 opacity-[0.03] pointer-events-none">
          <Shield className="w-24 h-24" />
        </div>
        <div className="flex justify-between items-start">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 border border-blue-100 relative z-10">
            <Shield className="w-5 h-5" />
          </div>
          <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-lg z-10">
            {safetyScore > 90 ? 'Excellent' : 'Good'}
          </span>
        </div>
        <div className="relative z-10">
          <p className="text-xs font-semibold text-gray-500 mb-1">Safety Score</p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-gray-900">{safetyScore.toFixed(1)}</span>
            <span className="text-sm font-semibold text-gray-400">/ 100</span>
          </div>
        </div>
      </div>
    </div>
  );
}
