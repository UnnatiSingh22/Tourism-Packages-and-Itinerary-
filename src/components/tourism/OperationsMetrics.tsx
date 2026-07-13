import React from 'react';
import { CreditCard, MousePointerClick, Users, DollarSign } from 'lucide-react';
import { formatRupee } from '../../lib/utils';

export function OperationsMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-[#BC2C2C] flex items-center justify-center">
            <CreditCard className="w-5 h-5" />
          </div>
          <span className="text-emerald-500 text-xs font-bold">+14% ~</span>
        </div>
        <div>
          <p className="text-[11px] font-bold text-gray-500 mb-1">Total Revenue (Tourism)</p>
          <span className="text-3xl font-extrabold text-gray-900 leading-none">{formatRupee(1248500)}</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <MousePointerClick className="w-5 h-5" />
          </div>
          <span className="text-gray-400 text-xs font-bold">vs last month</span>
        </div>
        <div>
          <p className="text-[11px] font-bold text-gray-500 mb-1">Package Conversion</p>
          <span className="text-3xl font-extrabold text-gray-900 leading-none">12.4%</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <span className="text-[#BC2C2C] text-xs font-bold">88% ♡</span>
        </div>
        <div>
          <p className="text-[11px] font-bold text-gray-500 mb-1">Departure Occupancy</p>
          <span className="text-3xl font-extrabold text-gray-900 leading-none">88%</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
          <span className="text-gray-500 text-xs font-bold">Target: {formatRupee(420)}</span>
        </div>
        <div>
          <p className="text-[11px] font-bold text-gray-500 mb-1">Avg. Profit per Traveler</p>
          <span className="text-3xl font-extrabold text-gray-900 leading-none">{formatRupee(450)}</span>
        </div>
      </div>
    </div>
  );
}

