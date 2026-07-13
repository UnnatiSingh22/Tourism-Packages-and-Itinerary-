import React from 'react';
import { ArrowRight, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatRupee } from '../../lib/utils';

export function InsuranceSnapshot({ onAddSafetyReview }: { onAddSafetyReview?: () => void }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col lg:flex-row gap-8 relative w-full">
      {/* Floating Plus Button intersecting the Dark Card */}
      <button 
        onClick={onAddSafetyReview}
        className="absolute right-6 lg:right-auto lg:left-[calc(55%-24px)] top-[-24px] lg:top-12 z-20 w-12 h-12 bg-gray-900 hover:bg-gray-800 rounded-full flex items-center justify-center text-white shadow-xl transition-transform hover:scale-105 border-4 border-white flex"
        title="Log Safety Review"
      >
        <Plus className="w-5 h-5" />
      </button>

      {/* Left Dark Card: Insurance Snapshot */}
      <div className="bg-[#1A1F36] rounded-3xl p-8 relative overflow-hidden w-full lg:w-[55%] flex flex-col justify-between z-10 shadow-lg">
        {/* Decorative Badge Shape in BG */}
        <div className="absolute right-[-40px] top-[40px] opacity-10 pointer-events-none">
          <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>

        <div className="relative z-10">
          <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-3">Insurance Snapshot</p>
          <h2 className="text-3xl font-bold text-white leading-tight mb-4">
            Quarterly Safety Review &<br/>Risk Assessment
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed max-w-md">
            Your current fleet insurance premium is optimized based on a 94.8 safety score. Resolving the 3 open incidents will further decrease liability risks.
          </p>
        </div>

        <div className="flex gap-4 mt-8 relative z-10">
          <div className="bg-white/10 backdrop-blur rounded-2xl p-4 flex-1">
            <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">Premium Savings</p>
            <p className="text-xl font-bold text-white">{formatRupee(103000, 2)}</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-2xl p-4 flex-1">
            <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">Risk Level</p>
            <p className="text-xl font-bold text-emerald-400">Low Risk</p>
          </div>
        </div>
      </div>

      {/* Right White Card: Incident Distribution */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 w-full lg:w-[45%] flex flex-col justify-between z-0 pl-8 lg:pl-12">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">Incident Distribution</h3>
          <p className="text-xs text-gray-500 mb-8">Breakdown of report types this month</p>
          
          <div className="space-y-6">
            {/* Row 1 */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-gray-800 tracking-widest uppercase">Mechanical Failures</span>
                <span className="text-xs font-bold text-gray-600">45%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div className="bg-gray-900 h-1.5 rounded-full w-[45%]"></div>
              </div>
            </div>

            {/* Row 2 */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-gray-800 tracking-widest uppercase">Traffic Violations</span>
                <span className="text-xs font-bold text-gray-600">30%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div className="bg-gray-900 h-1.5 rounded-full w-[30%]"></div>
              </div>
            </div>

            {/* Row 3 */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-gray-800 tracking-widest uppercase">Minor Scrapes</span>
                <span className="text-xs font-bold text-gray-600">25%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div className="bg-gray-900 h-1.5 rounded-full w-[25%]"></div>
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={() => navigate('/analytics/performance')}
          className="w-full py-4 mt-8 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
        >
          View Full Analysis <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
