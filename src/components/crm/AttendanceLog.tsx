import React from 'react';
import { Filter, Download } from 'lucide-react';

export function AttendanceLog() {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 flex-1">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-900">Daily<br/>Attendance<br/>Log</h2>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors">
            <Filter className="w-3.5 h-3.5" /> Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Driver</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Clock-in/out</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F5F0FF] text-[#8338EC] flex items-center justify-center text-xs font-bold shrink-0">MT</div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Marcus Thorne</p>
                    <p className="text-[10px] text-gray-500">Shift: 08:00 - 16:00</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold tracking-widest uppercase rounded">On Duty</span>
              </td>
              <td className="px-6 py-4">
                <p className="text-xs font-bold text-gray-900">IN: 07:54 AM</p>
                <p className="text-xs text-gray-400">OUT: --:--</p>
              </td>
            </tr>
            <tr className="border-b border-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FFF0F5] text-[#FF7096] flex items-center justify-center text-xs font-bold shrink-0">ER</div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Elena Rodriguez</p>
                    <p className="text-[10px] text-gray-500">Shift: 09:00 - 17:00</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 bg-orange-50 text-orange-600 text-[10px] font-bold tracking-widest uppercase rounded">Resting</span>
              </td>
              <td className="px-6 py-4">
                <p className="text-xs font-bold text-gray-900">IN: 08:58 AM</p>
                <p className="text-xs text-gray-400">OUT: --:--</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
