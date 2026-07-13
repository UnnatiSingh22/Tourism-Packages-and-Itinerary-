import React from 'react';
import { CheckCircle2, Bell, Mail, RefreshCw } from 'lucide-react';

export function WaitlistAlertTimeline() {
  const alerts = [
    {
      icon: CheckCircle2,
      iconColor: 'text-emerald-500 bg-emerald-50',
      title: 'Promotion Successful',
      time: '2m ago',
      desc: 'Julianne Devis (Platinum) was automatically promoted to Confirmed status for Paris Getaway #204.'
    },
    {
      icon: Bell,
      iconColor: 'text-[#BC2C2C] bg-[#FDF3F2]',
      title: 'Capacity Alert',
      time: '45m ago',
      desc: "Available seats for 'Tokyo Tech Summit' reached critical levels (0 seats)."
    },
    {
      icon: Mail,
      iconColor: 'text-purple-600 bg-purple-50',
      title: 'Waitlist Invitation',
      time: '1h ago',
      desc: 'Manual promotion invitation sent to Marcus Knight. Awaiting traveler confirmation.'
    },
    {
      icon: RefreshCw,
      iconColor: 'text-gray-500 bg-gray-100',
      title: 'Workflow Update',
      time: '3h ago',
      desc: 'Auto-promotion logic was enabled for Alpine Skiing Retreat events.'
    }
  ];

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <RefreshCw className="w-5 h-5 text-[#BC2C2C]" />
          Alert Timeline
        </h2>
      </div>
      
      <div className="p-6 flex-1">
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gray-100">
          {alerts.map((alert, idx) => (
            <div key={idx} className="relative flex items-start justify-between">
              <div className="flex gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 outline outline-4 outline-white ${alert.iconColor}`}>
                  <alert.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-sm font-bold text-gray-900">{alert.title}</h3>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed max-w-[200px]">{alert.desc}</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-gray-400 shrink-0">{alert.time}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-gray-100 bg-gray-50/50 rounded-b-3xl">
        <button className="w-full text-center text-xs font-bold text-[#BC2C2C] hover:text-[#8B2020] transition-colors py-2">
          View All Activity
        </button>
      </div>
    </div>
  );
}
