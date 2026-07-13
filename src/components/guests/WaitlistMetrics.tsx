import React from 'react';
import { Armchair, ListTree, Zap, Timer } from 'lucide-react';

interface WaitlistMetricsProps {
  availableSeats?: number;
  waitlistDepth?: number;
  autoPromotions?: number;
  conversionRate?: string;
}

export function WaitlistMetrics({
  availableSeats = 12,
  waitlistDepth = 84,
  autoPromotions = 29,
  conversionRate = '68%'
}: WaitlistMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {/* Metric 1 */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
            <Armchair className="w-5 h-5" />
          </div>
          <span className="text-emerald-500 text-xs font-bold">+4 Today</span>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">Available Seats</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-gray-900 leading-none">{availableSeats}</span>
          </div>
        </div>
      </div>

      {/* Metric 2 */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
            <ListTree className="w-5 h-5" />
          </div>
          <span className="px-3 py-1 bg-red-50 text-red-600 text-[10px] font-bold uppercase rounded tracking-wider">
            High Demand
          </span>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">Waitlist Depth</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-gray-900 leading-none">{waitlistDepth}</span>
          </div>
        </div>
      </div>

      {/* Metric 3 */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Zap className="w-5 h-5 fill-purple-600" />
          </div>
          <span className="px-3 py-1 bg-gray-50 text-gray-600 text-[10px] font-bold uppercase rounded tracking-wider">
            Active
          </span>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">Auto-Promotions</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-gray-900 leading-none">{autoPromotions}</span>
          </div>
        </div>
      </div>

      {/* Metric 4 */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
            <Timer className="w-5 h-5" />
          </div>
          <span className="text-gray-500 text-xs font-bold">Avg 14h</span>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">Conversion Rate</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-gray-900 leading-none">{conversionRate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
