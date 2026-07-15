import React from 'react';
import { Users, Flag, PlaneTakeoff, CheckSquare } from 'lucide-react';

export function CommandCenterMetrics({ selectedRegion = 'All' }: { selectedRegion?: string }) {
  const metricsData = {
    All: { travelers: '1,284', tours: '42', departures: '08', tasks: '16' },
    Europe: { travelers: '642', tours: '21', departures: '04', tasks: '08' },
    Asia: { travelers: '412', tours: '14', departures: '03', tasks: '05' },
    Americas: { travelers: '230', tours: '07', departures: '01', tasks: '03' },
    Goa: { travelers: '384', tours: '12', departures: '03', tasks: '04' },
    Rajasthan: { travelers: '410', tours: '15', departures: '04', tasks: '05' },
    Rajkot: { travelers: '120', tours: '05', departures: '01', tasks: '02' },
    Kashmir: { travelers: '290', tours: '08', departures: '02', tasks: '03' },
    Kerala: { travelers: '310', tours: '10', departures: '02', tasks: '04' },
    Bali: { travelers: '440', tours: '14', departures: '03', tasks: '05' },
    Dubai: { travelers: '520', tours: '18', departures: '04', tasks: '06' }
  };

  const current = metricsData[selectedRegion as keyof typeof metricsData] || metricsData.All;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-red-50 text-[#BC2C2C] flex items-center justify-center shrink-0">
          <Users className="w-6 h-6" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">In-Field Travelers</p>
          <span className="text-2xl font-extrabold text-gray-900 leading-none">{current.travelers}</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
          <Flag className="w-6 h-6" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Active Tours</p>
          <span className="text-2xl font-extrabold text-gray-900 leading-none">{current.tours}</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
          <PlaneTakeoff className="w-6 h-6" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Scheduled Departures</p>
          <span className="text-2xl font-extrabold text-gray-900 leading-none">{current.departures}</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
          <CheckSquare className="w-6 h-6" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Pending Tasks</p>
          <span className="text-2xl font-extrabold text-gray-900 leading-none">{current.tasks}</span>
        </div>
      </div>
    </div>
  );
}
