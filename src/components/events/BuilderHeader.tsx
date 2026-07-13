import React from 'react';
import { PackageOpen, Calendar, MapPin } from 'lucide-react';

interface BuilderHeaderProps {
  packageName?: string;
  packageCode?: string;
  duration?: number;
}

export function BuilderHeader({
  packageName = 'Parisian Summer Romance',
  packageCode = 'PKG-PARIS',
  duration = 7,
}: BuilderHeaderProps) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-wrap gap-6 mb-8">
      <div className="flex items-center gap-3 pr-6 border-r border-gray-100">
        <div className="w-10 h-10 rounded-xl bg-[#FDF3F2] text-[#E65A4B] flex items-center justify-center">
          <PackageOpen className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-0.5">Package</p>
          <p className="text-sm font-bold text-gray-900">{packageName}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 pr-6 border-r border-gray-100">
        <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-600 flex items-center justify-center">
          <Calendar className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-0.5">Duration</p>
          <p className="text-sm font-bold text-gray-900">{duration} Days</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-600 flex items-center justify-center">
          <MapPin className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-0.5">Code</p>
          <p className="text-sm font-bold text-gray-900">{packageCode}</p>
        </div>
      </div>
    </div>
  );
}
