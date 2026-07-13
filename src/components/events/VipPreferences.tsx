import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';

export function VipPreferences() {
  return (
    <div className="bg-[#1A1F36] rounded-3xl p-6 shadow-lg mb-6 relative overflow-hidden">
      {/* Decorative BG pattern */}
      <div className="absolute right-[-20px] top-[-20px] opacity-[0.05] pointer-events-none">
        <ShieldAlert className="w-32 h-32 text-white" />
      </div>

      <div className="relative z-10">
        <h2 className="text-sm font-bold text-white mb-6 uppercase tracking-widest">VIP Preferences</h2>
        
        <ul className="space-y-4 mb-6">
          <li className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">Dietary</span>
            <span className="text-sm font-semibold text-white">Strict Vegan</span>
          </li>
          <li className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">Transport</span>
            <span className="text-sm font-semibold text-white">Maybach Only</span>
          </li>
          <li className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">Security</span>
            <span className="text-sm font-semibold text-white">Low Profile</span>
          </li>
        </ul>

        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex gap-3">
          <Info className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <p className="text-xs text-red-200 leading-relaxed font-medium">
            Requires 1h buffer between fittings.
          </p>
        </div>
      </div>
    </div>
  );
}
