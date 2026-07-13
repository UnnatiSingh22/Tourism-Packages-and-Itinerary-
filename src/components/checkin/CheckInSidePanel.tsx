import React from 'react';
import { Sun, AlertTriangle, FileWarning, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

export function CheckInRouteCard() {
  return (
    <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-gradient-to-br from-slate-500 via-slate-600 to-slate-700 text-white">
      <div className="p-5">
        <p className="text-[10px] font-bold text-white/60 tracking-widest uppercase mb-1">Current Route</p>
        <p className="text-[15px] font-bold">Paris Le Bourget (LBG)</p>
      </div>

      <div className="bg-white/10 backdrop-blur-sm p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-[12px] text-white/70 font-medium">Weather Conditions</p>
          <div className="flex items-center gap-1.5">
            <Sun className="w-4 h-4 text-amber-300" />
            <span className="text-[12px] font-semibold">Clear Skies, 22°C</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-[12px] text-white/70 font-medium">Departure</p>
          <span className="text-[12px] font-semibold">14:30 (Scheduled)</span>
        </div>
        <div className="flex items-center justify-between -mt-3">
          <p className="text-[12px] text-white/70 font-medium">ETA</p>
          <span className="text-[12px] font-semibold"></span>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-[12px] text-white/70 font-medium">Gate Status</p>
          <span className="px-2.5 py-1 bg-emerald-400/20 text-emerald-300 text-[10px] font-bold rounded-full uppercase tracking-wide">
            Open
          </span>
        </div>
      </div>
    </div>
  );
}

export function CheckInVerificationAlerts() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-4 h-4 text-[#BC2C2C]" />
        <h2 className="text-[14px] font-bold text-gray-900">Verification Alerts</h2>
      </div>

      <div className="flex flex-col gap-3">
        <div className="bg-red-50 border border-red-100 rounded-xl p-3.5">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-[12.5px] font-bold text-gray-900 leading-snug">Passport Expiry Alert</p>
              <p className="text-[12px] text-gray-600 leading-snug mt-0.5">
                David Chen (09B) - Document expires in 48 hours.
              </p>
              <button className="text-[11px] font-bold text-[#BC2C2C] uppercase tracking-wide mt-1.5 hover:text-[#8B2020] transition-colors">
                Contact Agent
              </button>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 border border-orange-100 rounded-xl p-3.5">
          <div className="flex items-start gap-2">
            <FileWarning className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-[12.5px] font-bold text-gray-900 leading-snug">Missing Health Doc</p>
              <p className="text-[12px] text-gray-600 leading-snug mt-0.5">
                3 Travelers haven't uploaded required health forms.
              </p>
              <button className="text-[11px] font-bold text-orange-600 uppercase tracking-wide mt-1.5 hover:text-orange-700 transition-colors">
                Resend Notification
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const activity = [
  { icon: CheckCircle2, color: 'text-emerald-500', text: "System verified Julia Vane's passport.", time: '2 minutes ago' },
  { icon: AlertCircle, color: 'text-red-500', text: 'Marcus Thorne arrived at the VIP Lounge.', time: '16 minutes ago' },
  { icon: Clock, color: 'text-amber-500', text: 'Alex Rivera updated flight FL-9022 gate info.', time: '1 hour ago' },
];

export function CheckInLiveActivity() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <h2 className="text-[14px] font-bold text-gray-900 mb-4">Live Activity</h2>
      <div className="flex flex-col gap-4">
        {activity.map((a, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <a.icon className={`w-4 h-4 mt-0.5 shrink-0 ${a.color}`} />
            <div>
              <p className="text-[12.5px] font-semibold text-gray-800 leading-snug">{a.text}</p>
              <p className="text-[11px] text-gray-400 mt-0.5">{a.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
