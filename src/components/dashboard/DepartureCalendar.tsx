import React from 'react';
import { Calendar, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

export function DepartureCalendar({ selectedMonth = 'September 2024' }: { selectedMonth?: string }) {
  const calendarData = {
    'September 2024': {
      mon: { code: 'TR-882', title: 'Alps Expedition', count: '18/20', pct: '90%', barColor: 'bg-emerald-500', bgColor: 'bg-emerald-50', textColor: 'text-emerald-600', edgeColor: 'bg-emerald-400', progressColor: 'bg-emerald-200' },
      tue: { code: 'TR-104', title: 'Safari Private', count: '8/12', pct: '66%', barColor: 'bg-[#BC2C2C]', bgColor: 'bg-red-50', textColor: 'text-[#BC2C2C]', edgeColor: 'bg-[#BC2C2C]', progressColor: 'bg-red-200' },
      wed: null,
      thu: { code: 'TR-551', title: 'Tuscany Wine Tour', count: '24/24', pct: '100%', barColor: 'bg-purple-500', bgColor: 'bg-purple-50', textColor: 'text-purple-600', edgeColor: 'bg-purple-500', progressColor: 'bg-purple-200' }
    },
    'October 2024': {
      mon: { code: 'TR-882', title: 'Alps Expedition', count: '12/20', pct: '60%', barColor: 'bg-emerald-500', bgColor: 'bg-emerald-50', textColor: 'text-emerald-600', edgeColor: 'bg-emerald-400', progressColor: 'bg-emerald-200' },
      tue: { code: 'TR-104', title: 'Safari Private', count: '10/12', pct: '83%', barColor: 'bg-emerald-500', bgColor: 'bg-emerald-50', textColor: 'text-emerald-600', edgeColor: 'bg-emerald-400', progressColor: 'bg-emerald-200' },
      wed: { code: 'TR-990', title: 'Kyoto Autumn', count: '5/10', pct: '50%', barColor: 'bg-amber-500', bgColor: 'bg-amber-50', textColor: 'text-amber-600', edgeColor: 'bg-amber-400', progressColor: 'bg-amber-200' },
      thu: { code: 'TR-551', title: 'Tuscany Wine Tour', count: '12/24', pct: '50%', barColor: 'bg-amber-500', bgColor: 'bg-amber-50', textColor: 'text-amber-600', edgeColor: 'bg-amber-400', progressColor: 'bg-amber-200' }
    },
    'November 2024': {
      mon: { code: 'TR-882', title: 'Alps Expedition', count: '4/20', pct: '20%', barColor: 'bg-[#BC2C2C]', bgColor: 'bg-[#FDF3F2]', textColor: 'text-[#BC2C2C]', edgeColor: 'bg-[#BC2C2C]', progressColor: 'bg-red-200' },
      tue: { code: 'TR-104', title: 'Safari Private', count: '2/12', pct: '16%', barColor: 'bg-[#BC2C2C]', bgColor: 'bg-[#FDF3F2]', textColor: 'text-[#BC2C2C]', edgeColor: 'bg-[#BC2C2C]', progressColor: 'bg-red-200' },
      wed: null,
      thu: { code: 'TR-551', title: 'Tuscany Wine Tour', count: '8/24', pct: '33%', barColor: 'bg-[#BC2C2C]', bgColor: 'bg-[#FDF3F2]', textColor: 'text-[#BC2C2C]', edgeColor: 'bg-[#BC2C2C]', progressColor: 'bg-red-200' }
    }
  };

  const current = calendarData[selectedMonth as keyof typeof calendarData] || calendarData['September 2024'];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col mb-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-[#BC2C2C]" />
          <h2 className="text-lg font-bold text-gray-900">{selectedMonth}</h2>
        </div>
        <div className="flex bg-gray-50 rounded-lg p-1 border border-gray-100">
          <button className="px-4 py-1 text-xs font-bold text-[#BC2C2C] bg-white rounded-md shadow-sm">Week</button>
          <button className="px-4 py-1 text-xs font-medium text-gray-500 hover:text-gray-700">Month</button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 flex-1">
        {/* Column 1 */}
        <div className="flex flex-col border border-gray-50 rounded-2xl bg-gray-50/30 overflow-hidden">
          <div className="py-3 text-center bg-gray-50 border-b border-gray-100">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Mon 12</span>
          </div>
          <div className="p-3">
            {current.mon ? (
              <div className={`${current.mon.bgColor} rounded-xl p-3 border border-gray-200/50 shadow-sm relative overflow-hidden`}>
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${current.mon.edgeColor}`}></div>
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[10px] font-bold ${current.mon.textColor} bg-white/60 px-2 py-0.5 rounded`}>{current.mon.code}</span>
                  <CheckCircle2 className={`w-4 h-4 ${current.mon.textColor}`} />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-2">{current.mon.title}</h3>
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">Capacity</span>
                  <span className="text-[10px] font-bold text-gray-900">{current.mon.count}</span>
                </div>
                <div className={`w-full h-1.5 ${current.mon.progressColor} rounded-full mt-1.5`}>
                  <div className={`h-full ${current.mon.barColor} rounded-full`} style={{ width: current.mon.pct }}></div>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col border border-gray-50 rounded-2xl bg-gray-50/30 overflow-hidden">
          <div className="py-3 text-center bg-gray-50 border-b border-gray-100">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tue 13</span>
          </div>
          <div className="p-3">
            {current.tue ? (
              <div className={`${current.tue.bgColor} rounded-xl p-3 border border-gray-200/50 shadow-sm relative overflow-hidden`}>
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${current.tue.edgeColor}`}></div>
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[10px] font-bold ${current.tue.textColor} bg-white/60 px-2 py-0.5 rounded`}>{current.tue.code}</span>
                  <AlertCircle className={`w-4 h-4 ${current.tue.textColor}`} />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-2">{current.tue.title}</h3>
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">Capacity</span>
                  <span className="text-[10px] font-bold text-gray-900">{current.tue.count}</span>
                </div>
                <div className={`w-full h-1.5 ${current.tue.progressColor} rounded-full mt-1.5`}>
                  <div className={`h-full ${current.tue.barColor} rounded-full`} style={{ width: current.tue.pct }}></div>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col border border-gray-50 rounded-2xl bg-gray-50/30 overflow-hidden">
          <div className="py-3 text-center bg-gray-50 border-b border-gray-100">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Wed 14</span>
          </div>
          <div className="p-3">
            {current.wed ? (
              <div className={`${current.wed.bgColor} rounded-xl p-3 border border-gray-200/50 shadow-sm relative overflow-hidden`}>
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${current.wed.edgeColor}`}></div>
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[10px] font-bold ${current.wed.textColor} bg-white/60 px-2 py-0.5 rounded`}>{current.wed.code}</span>
                  <Clock className={`w-4 h-4 ${current.wed.textColor}`} />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-2">{current.wed.title}</h3>
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">Capacity</span>
                  <span className="text-[10px] font-bold text-gray-900">{current.wed.count}</span>
                </div>
                <div className={`w-full h-1.5 ${current.wed.progressColor} rounded-full mt-1.5`}>
                  <div className={`h-full ${current.wed.barColor} rounded-full`} style={{ width: current.wed.pct }}></div>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Column 4 */}
        <div className="flex flex-col border border-gray-50 rounded-2xl bg-gray-50/30 overflow-hidden">
          <div className="py-3 text-center bg-gray-50 border-b border-gray-100">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Thu 15</span>
          </div>
          <div className="p-3">
            {current.thu ? (
              <div className={`${current.thu.bgColor} rounded-xl p-3 border border-gray-200/50 shadow-sm relative overflow-hidden`}>
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${current.thu.edgeColor}`}></div>
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[10px] font-bold ${current.thu.textColor} bg-white/60 px-2 py-0.5 rounded`}>{current.thu.code}</span>
                  <Clock className={`w-4 h-4 ${current.thu.textColor}`} />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-2">{current.thu.title}</h3>
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">Capacity</span>
                  <span className="text-[10px] font-bold text-gray-900">{current.thu.count}</span>
                </div>
                <div className={`w-full h-1.5 ${current.thu.progressColor} rounded-full mt-1.5`}>
                  <div className={`h-full ${current.thu.barColor} rounded-full`} style={{ width: current.thu.pct }}></div>
                </div>
              </div>
            ) : null}
          </div>
        </div>

      </div>
    </div>
  );
}
