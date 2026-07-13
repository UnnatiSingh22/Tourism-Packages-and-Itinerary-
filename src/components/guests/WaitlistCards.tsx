import React from 'react';
import { Zap, GitPullRequest, Info } from 'lucide-react';

export function BoostAvailabilityCard({ onBoost }: { onBoost?: () => void }) {
  return (
    <div className="rounded-3xl p-8 shadow-sm relative overflow-hidden bg-gradient-to-br from-[#BC2C2C] to-[#E65A4B] text-white">
      {/* Background Graphic */}
      <Zap className="absolute -right-6 -bottom-6 w-48 h-48 text-white opacity-10" />
      
      <div className="relative z-10">
        <h2 className="text-2xl font-bold mb-3">Boost Seat Availability</h2>
        <p className="text-sm text-white/90 leading-relaxed max-w-md mb-6">
          Our AI engine has identified 12 luxury suites with low conversion probability. Reallocate these to the waitlist now?
        </p>
        <div className="flex gap-4">
          <button 
            onClick={onBoost}
            className="px-6 py-2.5 bg-white text-[#BC2C2C] text-sm font-bold rounded-xl shadow-sm hover:bg-gray-50 transition-colors"
          >
            Optimize Now
          </button>
          <button className="px-6 py-2.5 bg-white/20 text-white text-sm font-bold rounded-xl hover:bg-white/30 transition-colors">
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}

export function PromotionRulesCard() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-6">
        <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
          <GitPullRequest className="w-5 h-5" />
        </div>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <Info className="w-4 h-4" />
        </button>
      </div>
      
      <h3 className="text-lg font-bold text-gray-900 mb-2">Promotion Rules</h3>
      <p className="text-sm text-gray-600 leading-relaxed mb-6">
        Active: Tier Priority First, then Duration in Queue.
      </p>
      
      <button className="text-sm font-bold text-[#BC2C2C] flex items-center gap-1 hover:text-[#8B2020] transition-colors">
        Edit Workflow Logic <span className="text-lg leading-none">→</span>
      </button>
    </div>
  );
}
