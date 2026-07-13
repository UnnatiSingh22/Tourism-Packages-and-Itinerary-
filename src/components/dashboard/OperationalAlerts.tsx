import React, { useState, useEffect } from 'react';
import { AlertTriangle, BriefcaseMedical, Check, Flame, Users, ShieldAlert, AlertCircle, Clock, Truck, Home } from 'lucide-react';

interface AlertItem {
  id: number;
  type: string;
  title: string;
  time: string;
  message: string;
  status: 'Active' | 'Resolved' | 'Escalated';
  region: string;
  icon: any;
}

const INITIAL_ALERTS: AlertItem[] = [
  {
    id: 1,
    type: 'Road Closure',
    title: 'Road Closure: Provence Lavender Route',
    time: '2 mins ago',
    message: 'Highway A7 blocked due to heavy regional protests at Avignon. Directing coaches via secondary D907 roads.',
    status: 'Active',
    region: 'Europe',
    icon: AlertTriangle
  },
  {
    id: 2,
    type: 'Staff Shortage',
    title: 'Staff Shortage: Kyoto Summit Guide',
    time: '14 mins ago',
    message: 'Local guide reported sick. Coordinator Sarah Wu is step-in lead for the 10:00 AM walking tour.',
    status: 'Active',
    region: 'Asia',
    icon: Users
  },
  {
    id: 3,
    type: 'Heavy Traffic',
    title: 'Heavy Traffic: JFK Airport Expressway',
    time: '5 mins ago',
    message: 'Construction bottleneck at Midtown Tunnel. Delays up to 45 mins. Alternate route via bridge advised.',
    status: 'Active',
    region: 'Americas',
    icon: Clock
  },
  {
    id: 4,
    type: 'Weather Warning',
    title: 'Weather Warning: Swiss Alps Gale Alerts',
    time: '1 hour ago',
    message: 'Wind gusts exceeding 80km/h at Jungfraujoch. Cogwheel railway operations suspended. Indoors activity fallback.',
    status: 'Active',
    region: 'Europe',
    icon: AlertCircle
  },
  {
    id: 5,
    type: 'Vehicle Breakdown',
    title: 'Vehicle Breakdown: Rajasthan Coach #8',
    time: '2 hours ago',
    message: 'Engine radiator overheat detected near Ajmer. Replacement luxury sprinter bus dispatched from Jaipur depot.',
    status: 'Active',
    region: 'Asia',
    icon: Truck
  },
  {
    id: 6,
    type: 'Hotel Overbooking',
    title: 'Hotel Overbooking: Ritz-Carlton Reserve',
    time: '4 hours ago',
    message: 'Overbooking error impacted 2 guests. Upgrade to Executive Ocean Suite successfully processed and confirmed.',
    status: 'Active',
    region: 'Europe',
    icon: Home
  },
  {
    id: 7,
    type: 'Emergency Incident',
    title: 'Emergency: Flash Flood Road Damage',
    time: '30 mins ago',
    message: 'Sudden rain washed out section of Highway 9 in Himachal. Local authorities coordinating emergency rerouting.',
    status: 'Active',
    region: 'Asia',
    icon: ShieldAlert
  },
  {
    id: 8,
    type: 'Flight Delay',
    title: 'Flight Delay: LH-421 Frankfurt to JFK',
    time: '45 mins ago',
    message: 'Inbound flight delayed by 3 hours. Concierge notified. Chauffeur transfers rescheduled to 6:30 PM.',
    status: 'Active',
    region: 'Americas',
    icon: AlertTriangle
  },
  {
    id: 9,
    type: 'Emergency Incident',
    title: 'Emergency: Medical Dispatch Dubai',
    time: '10 mins ago',
    message: 'Guest reported acute allergy symptoms. Ambulance dispatched. Hotel manager Elena R. accompanying to clinic.',
    status: 'Active',
    region: 'Middle East',
    icon: BriefcaseMedical
  },
  {
    id: 10,
    type: 'Weather Warning',
    title: 'Weather Warning: Sandstorm Dubai Outskirts',
    time: '1 hour ago',
    message: 'High winds and zero visibility. Desert safari tours paused for 4 hours. Guests redirected to Palm Lounge.',
    status: 'Active',
    region: 'Middle East',
    icon: AlertCircle
  },
  {
    id: 11,
    type: 'Flight Delay',
    title: 'Flight Delay: Air India AI-101 Delhi',
    time: '12 mins ago',
    message: 'Fog delay at IGI Airport. Flight departure deferred by 2 hours. VIP lounge lounge access activated.',
    status: 'Active',
    region: 'India',
    icon: AlertTriangle
  },
  {
    id: 12,
    type: 'Heavy Traffic',
    title: 'Heavy Traffic: Old Delhi Spice Market Tour',
    time: '1 hour ago',
    message: 'Gridlock congestion. Pedestrian walk circuit modified. Directing travelers to Lal Qila parking.',
    status: 'Active',
    region: 'India',
    icon: Clock
  }
];

export function OperationalAlerts({ selectedRegion = 'All' }: { selectedRegion?: string }) {
  const [alerts, setAlerts] = useState<AlertItem[]>(INITIAL_ALERTS);

  const handleResolve = (id: number) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'Resolved' } : a));
  };

  const handleEscalate = (id: number) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'Escalated' } : a));
  };

  const filteredAlerts = alerts.filter(a => selectedRegion === 'All' || a.region === selectedRegion);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex-1 flex flex-col justify-between mt-6">
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-sm font-bold text-gray-900">Operational Alerts ({selectedRegion === 'All' ? 'All Regions' : selectedRegion})</h2>
          <span className="px-2 py-0.5 bg-red-50 text-[#BC2C2C] text-[9px] font-bold uppercase tracking-widest rounded-md border border-red-100/50">
            {filteredAlerts.length} Alerts
          </span>
        </div>

        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
          {filteredAlerts.length === 0 ? (
            <p className="text-xs font-medium text-gray-500 text-center py-8">No active alerts for this region.</p>
          ) : (
            filteredAlerts.map((alert) => {
              const isResolved = alert.status === 'Resolved';
              const isEscalated = alert.status === 'Escalated';
              const Icon = alert.icon;

              return (
                <div 
                  key={alert.id}
                  className={`border rounded-2xl p-4 flex items-start gap-4 transition-all duration-300 ${
                    isResolved 
                      ? 'bg-emerald-50/30 border-emerald-100/50' 
                      : isEscalated
                        ? 'bg-purple-50/30 border-purple-100/50'
                        : alert.type === 'Emergency Incident'
                          ? 'bg-red-50/80 border-red-200'
                          : 'bg-amber-50/50 border-amber-100/50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm mt-1 transition-colors duration-300 ${
                    isResolved 
                      ? 'bg-emerald-500 text-white' 
                      : isEscalated
                        ? 'bg-purple-600 text-white'
                        : alert.type === 'Emergency Incident'
                          ? 'bg-[#BC2C2C] text-white animate-pulse'
                          : 'bg-amber-600 text-white'
                  }`}>
                    {isResolved ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className={`text-sm font-bold transition-all ${isResolved ? 'text-gray-400 line-through' : 'text-gray-900'}`}>{alert.title}</h3>
                      <span className="text-[10px] font-bold text-gray-500">{alert.time}</span>
                    </div>
                    <p className={`text-xs font-medium leading-relaxed mb-3 pr-8 transition-colors ${isResolved ? 'text-gray-400' : 'text-gray-700'}`}>
                      {alert.message}
                    </p>
                    
                    <div className="flex justify-between gap-3 items-center">
                      <span className="text-[9px] font-extrabold text-[#BC2C2C] bg-[#BC2C2C]/5 px-2 py-0.5 rounded uppercase border border-[#BC2C2C]/10">
                        {alert.type}
                      </span>
                      <div className="flex gap-2">
                        {isResolved ? (
                          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase rounded-lg border border-emerald-200">
                            Resolved
                          </span>
                        ) : isEscalated ? (
                          <span className="px-3 py-1 bg-purple-100 text-purple-800 text-[10px] font-bold uppercase rounded-lg border border-purple-200">
                            Escalated
                          </span>
                        ) : (
                          <>
                            <button 
                              onClick={() => handleEscalate(alert.id)}
                              className="px-3 py-1 bg-white border border-purple-200 text-purple-700 text-[10px] font-bold rounded-lg hover:bg-purple-50 transition-colors shadow-sm"
                            >
                              Escalate
                            </button>
                            <button 
                              onClick={() => handleResolve(alert.id)}
                              className="px-3 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded-lg hover:bg-emerald-600 transition-colors shadow-sm"
                            >
                              Resolve
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
