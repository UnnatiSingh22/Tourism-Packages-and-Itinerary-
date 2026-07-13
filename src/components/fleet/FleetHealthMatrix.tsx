import React from 'react';
import { Activity, Cog, Droplet, CheckSquare } from 'lucide-react';

export function FleetHealthMatrix() {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 h-full flex flex-col">
      <div className="flex items-center gap-3 text-gray-900 mb-8">
        <Activity className="w-5 h-5" />
        <h2 className="text-sm font-bold">Fleet Health Matrix</h2>
      </div>

      <div className="space-y-6 flex-1">
        {/* Engine Health */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
              <Cog className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-gray-800">Engine Health</span>
          </div>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold tracking-widest uppercase rounded-md border border-emerald-100">
            Optimal
          </span>
        </div>

        {/* Tire Pressure */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-gray-800">Tire Pressure</span>
          </div>
          <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold tracking-widest uppercase rounded-md border border-blue-100">
            98% AVG
          </span>
        </div>

        {/* Cleanliness */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center">
              <Droplet className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-gray-800">Cleanliness</span>
          </div>
          <span className="px-3 py-1 bg-purple-50 text-purple-600 text-[10px] font-bold tracking-widest uppercase rounded-md border border-purple-100">
            Pristine
          </span>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-50">
        <p className="text-[11px] text-gray-500 italic leading-relaxed">
          "Last automated telemetry sync completed 4 minutes ago. All systems within hospitality thresholds."
        </p>
      </div>
    </div>
  );
}
