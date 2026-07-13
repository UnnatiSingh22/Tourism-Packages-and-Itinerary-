import React from 'react';
import { Clock, Users, Sun, SunDim, MapPin } from 'lucide-react';

export function ImmediateActionsSidebar({ selectedMonth = 'September 2024' }: { selectedMonth?: string }) {
  const monthAbbr = selectedMonth.split(' ')[0].substring(0, 3); // 'Sep', 'Oct', 'Nov'

  const actionsData = {
    'September 2024': {
      action1: { day: '12', title: 'Swiss Alps Hiking Expedition', time: 'Departs 08:30 AM', pct: '95% Confirmed', percent: '95%', statusLabel: 'Manifest Status' },
      action2: { day: '13', title: 'Serengeti Safari Classic', time: 'Departs 06:15 AM', pct: '2 Pending', percent: '80%', statusLabel: 'Payment Status' }
    },
    'October 2024': {
      action1: { day: '14', title: 'Kyoto Zen & Gardens Tour', time: 'Departs 09:00 AM', pct: '100% Confirmed', percent: '100%', statusLabel: 'Manifest Status' },
      action2: { day: '15', title: 'Tuscany Vineyards Private', time: 'Departs 10:30 AM', pct: '1 Pending', percent: '90%', statusLabel: 'Payment Status' }
    },
    'November 2024': {
      action1: { day: '12', title: 'Swiss Alps Winter Retreat', time: 'Departs 08:00 AM', pct: '60% Confirmed', percent: '60%', statusLabel: 'Manifest Status' },
      action2: { day: '15', title: 'Tuscany Autumna Wine Trail', time: 'Departs 11:00 AM', pct: '5 Pending', percent: '50%', statusLabel: 'Payment Status' }
    }
  };

  const current = actionsData[selectedMonth as keyof typeof actionsData] || actionsData['September 2024'];

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex-1 relative overflow-hidden">
        {/* Subtle background element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-full pointer-events-none z-0"></div>

        <div className="relative z-10">
          <h2 className="text-sm font-bold text-gray-900 mb-1">Immediate Actions</h2>
          <p className="text-xs font-medium text-gray-500 mb-6">Departing in the next 24 hours</p>

          <div className="space-y-6">
            {/* Action 1 */}
            <div className="relative">
              <div className="flex gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex flex-col items-center justify-center shrink-0">
                  <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest">{monthAbbr}</span>
                  <span className="text-lg font-extrabold text-gray-900 leading-none">{current.action1.day}</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">{current.action1.title}</h3>
                  <div className="flex items-center gap-1 text-[11px] font-medium text-gray-500">
                    <Clock className="w-3 h-3" /> {current.action1.time}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{current.action1.statusLabel}</span>
                  <span className="text-[10px] font-bold text-emerald-500">{current.action1.pct}</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex -space-x-2">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces" alt="Guest" className="w-6 h-6 rounded-full border-2 border-white" />
                    <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=faces" alt="Guest" className="w-6 h-6 rounded-full border-2 border-white" />
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=faces" alt="Guest" className="w-6 h-6 rounded-full border-2 border-white" />
                    <div className="w-6 h-6 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-blue-600">+15</div>
                  </div>
                </div>
                <button className="w-full py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                  Send Final Reminder
                </button>
              </div>
            </div>

            <div className="h-px bg-gray-100 w-full"></div>

            {/* Action 2 */}
            <div className="relative">
              <div className="flex gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex flex-col items-center justify-center shrink-0">
                  <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest">{monthAbbr}</span>
                  <span className="text-lg font-extrabold text-gray-900 leading-none">{current.action2.day}</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">{current.action2.title}</h3>
                  <div className="flex items-center gap-1 text-[11px] font-medium text-gray-500">
                    <Clock className="w-3 h-3" /> {current.action2.time}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{current.action2.statusLabel}</span>
                  <span className="text-[10px] font-bold text-[#BC2C2C]">{current.action2.pct}</span>
                </div>
                <div className="w-full h-1.5 bg-gray-200 rounded-full mb-4 overflow-hidden flex">
                  <div className="h-full bg-emerald-500 w-[80%]"></div>
                  <div className="h-full bg-[#BC2C2C] w-[20%]"></div>
                </div>
                <button className="w-full py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                  Call Lead Guest
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Active Regions Card */}
      <div className="bg-gradient-to-br from-gray-400 to-gray-500 rounded-3xl p-6 shadow-sm relative overflow-hidden text-white">
        {/* Subtle Map Overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <path d="M10,50 Q40,10 90,40 T150,50" fill="none" stroke="white" strokeWidth="2" />
            <path d="M-10,30 Q30,80 80,20 T130,60" fill="none" stroke="white" strokeWidth="2" />
            <circle cx="50" cy="50" r="3" fill="white" />
            <circle cx="80" cy="30" r="3" fill="white" />
          </svg>
        </div>

        <div className="relative z-10">
          <h3 className="text-xs font-bold uppercase tracking-widest mb-1">Active Regions</h3>
          <p className="text-sm font-semibold text-[#8B2020] mb-6">Global Reach</p>
          
          <div className="space-y-3">
            <div className="bg-white rounded-2xl p-4 text-gray-900 flex justify-between items-center shadow-sm">
              <div>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Interlaken, CH</p>
                <p className="text-sm font-bold">18°C Clear</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E65A4B] to-[#BC2C2C] text-white flex items-center justify-center">
                <Sun className="w-4 h-4" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 text-gray-900 flex justify-between items-center shadow-sm">
              <div>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Tuscany, IT</p>
                <p className="text-sm font-bold">24°C Sunny</p>
              </div>
              <div className="text-orange-400">
                <SunDim className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
