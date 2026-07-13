import React from 'react';
import { AlertTriangle, BellRing } from 'lucide-react';

export function ResourceAlerts() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-sm font-bold text-gray-900">Resource Alerts</h2>
        <span className="px-3 py-1 bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-widest rounded-lg border border-red-100">
          4 Priority
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex gap-4 items-start">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-1">London Chauffeur Shortage</h4>
            <p className="text-xs text-gray-600 leading-relaxed font-medium">Over-allocated by 15% on June 12-14.</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-orange-50 border border-orange-100 flex gap-4 items-start">
          <div className="w-10 h-10 rounded-xl bg-white text-orange-400 flex items-center justify-center shrink-0 shadow-sm">
            <BellRing className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-orange-900 mb-1">Hotel Block Expiring</h4>
            <p className="text-xs text-orange-800/80 leading-relaxed font-medium">Paris Ritz block releases in 24 hours.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
