import React, { useState } from 'react';
import { Calendar, Route, Clock, Users, ShieldCheck, MapPin, X } from 'lucide-react';

interface ScheduleEvent {
  driver: string;
  time: string;
  routeId: string;
  vehicle: string;
  stops: string[];
  passengers: number;
  color: string;
  borderColor: string;
  textColor: string;
  dayNum: number;
  dayName: string;
}

const WEEK_EVENTS: ScheduleEvent[] = [
  { driver: 'Marcus Thorne', time: '08:00 - 16:00', routeId: 'RT-2041', vehicle: 'Mercedes Sprinter #204', stops: ['Paris Airport (CDG)', 'Hyatt Regency', 'Le Bourget Convention Center'], passengers: 14, color: 'bg-indigo-50/90', borderColor: 'border-indigo-100', textColor: 'text-indigo-600', dayNum: 12, dayName: 'Mon' },
  { driver: 'Elena Rodriguez', time: '09:00 - 17:00', routeId: 'RT-0128', vehicle: 'Toyota Coaster #012', stops: ['Orly Airport', 'Ritz-Carlton', 'Le Bourget Expo'], passengers: 28, color: 'bg-pink-50/90', borderColor: 'border-pink-100', textColor: 'text-pink-600', dayNum: 13, dayName: 'Tue' },
  { driver: 'Marcus Chen', time: '14:00 - 22:00', routeId: 'RT-7731', vehicle: 'BMW 7-Series Limo', stops: ['Bourget Executive VIP Gate', 'Shangri-La Hotel', 'Eiffel Event Hall'], passengers: 3, color: 'bg-emerald-50/90', borderColor: 'border-emerald-100', textColor: 'text-emerald-600', dayNum: 13, dayName: 'Tue' },
  { driver: 'Priya Nair', time: '08:00 - 16:00', routeId: 'RT-4482', vehicle: 'Volvo Coach #BUS-088', stops: ['CDG Coach Bay', 'Pullman Hotel', 'Bourget Expo'], passengers: 45, color: 'bg-indigo-50/90', borderColor: 'border-indigo-100', textColor: 'text-indigo-600', dayNum: 14, dayName: 'Wed' },
  { driver: 'Marcus Thorne', time: '12:00 - 20:00', routeId: 'RT-2042', vehicle: 'Mercedes Sprinter #204', stops: ['Le Bourget Expo', 'CDG Airport Departures'], passengers: 12, color: 'bg-pink-50/90', borderColor: 'border-pink-100', textColor: 'text-pink-600', dayNum: 14, dayName: 'Wed' },
  { driver: 'Elena Rodriguez', time: '14:00 - 22:00', routeId: 'RT-0129', vehicle: 'Toyota Coaster #012', stops: ['Le Bourget Expo', 'Pullman Hotel', 'Orly Airport'], passengers: 24, color: 'bg-indigo-50/90', borderColor: 'border-indigo-100', textColor: 'text-indigo-600', dayNum: 15, dayName: 'Thu' }
];

export function ScheduleCalendar() {
  const [viewType, setViewType] = useState<'day' | 'week' | 'month'>('week');
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);

  // Group events by day name for the calendar layout
  const filteredEvents = viewType === 'day' 
    ? WEEK_EVENTS.filter(e => e.dayNum === 13) // Show Tuesday events for 'Day' view
    : WEEK_EVENTS;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6 relative">
      {/* Header and Selectors */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-[20px] font-bold text-gray-900 mb-1 font-sans tracking-tight">Driver Shift Schedule</h2>
          <p className="text-xs text-gray-500 font-semibold flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            {viewType === 'day' && 'June 13, 2026 (Active Tuesday Schedule)'}
            {viewType === 'week' && 'Week of June 12 - June 18, 2026'}
            {viewType === 'month' && 'Month of June 2026 (Operational Calendar)'}
          </p>
        </div>

        <div className="flex bg-gray-50 p-1 rounded-xl">
          {(['day', 'week', 'month'] as const).map(t => (
            <button
              key={t}
              onClick={() => {
                setViewType(t);
                setSelectedEvent(null);
              }}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                viewType === t 
                  ? 'bg-white text-[#BC2C2C] shadow-sm' 
                  : 'text-gray-500 hover:text-gray-900 bg-transparent'
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-4 gap-4">
        {/* Mon */}
        {viewType !== 'day' && (
          <div className="flex flex-col border-r border-gray-50 pr-2">
            <div className="text-center mb-4 pb-2 border-b border-gray-50">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Mon</p>
              <p className="text-base font-bold text-gray-900">12</p>
            </div>
            {filteredEvents.filter(e => e.dayNum === 12).map((ev, i) => (
              <div 
                key={i} 
                onClick={() => setSelectedEvent(ev)}
                className={`border ${ev.borderColor} ${ev.color} rounded-xl p-3 mb-2 cursor-pointer transition-transform hover:scale-[1.02] shadow-sm`}
              >
                <p className="text-xs font-bold text-gray-800">{ev.driver}</p>
                <p className="text-[9px] font-semibold text-gray-500 mt-0.5">{ev.time}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tue */}
        <div className="flex flex-col border-r border-gray-50 pr-2">
          <div className="text-center mb-4 pb-2 border-b border-gray-50">
            <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest mb-1">Tue</p>
            <p className="text-base font-bold text-red-600">13</p>
          </div>
          {filteredEvents.filter(e => e.dayNum === 13).map((ev, i) => (
            <div 
              key={i} 
              onClick={() => setSelectedEvent(ev)}
              className={`border ${ev.borderColor} ${ev.color} rounded-xl p-3 mb-2 cursor-pointer transition-transform hover:scale-[1.02] shadow-sm`}
            >
              <p className="text-xs font-bold text-gray-800">{ev.driver}</p>
              <p className="text-[9px] font-semibold text-gray-500 mt-0.5">{ev.time}</p>
            </div>
          ))}
        </div>

        {/* Wed */}
        {viewType !== 'day' && (
          <div className="flex flex-col border-r border-gray-50 pr-2">
            <div className="text-center mb-4 pb-2 border-b border-gray-50">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Wed</p>
              <p className="text-base font-bold text-gray-900">14</p>
            </div>
            {filteredEvents.filter(e => e.dayNum === 14).map((ev, i) => (
              <div 
                key={i} 
                onClick={() => setSelectedEvent(ev)}
                className={`border ${ev.borderColor} ${ev.color} rounded-xl p-3 mb-2 cursor-pointer transition-transform hover:scale-[1.02] shadow-sm`}
              >
                <p className="text-xs font-bold text-gray-800">{ev.driver}</p>
                <p className="text-[9px] font-semibold text-gray-500 mt-0.5">{ev.time}</p>
              </div>
            ))}
          </div>
        )}

        {/* Thu */}
        {viewType !== 'day' && (
          <div className="flex flex-col">
            <div className="text-center mb-4 pb-2 border-b border-gray-50">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Thu</p>
              <p className="text-base font-bold text-gray-900">15</p>
            </div>
            {filteredEvents.filter(e => e.dayNum === 15).map((ev, i) => (
              <div 
                key={i} 
                onClick={() => setSelectedEvent(ev)}
                className={`border ${ev.borderColor} ${ev.color} rounded-xl p-3 mb-2 cursor-pointer transition-transform hover:scale-[1.02] shadow-sm`}
              >
                <p className="text-xs font-bold text-gray-800">{ev.driver}</p>
                <p className="text-[9px] font-semibold text-gray-500 mt-0.5">{ev.time}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Popover Route Details */}
      {selectedEvent && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl p-5 shadow-2xl border border-gray-100 w-full max-w-sm z-40 animate-in zoom-in-95 duration-200">
          <div className="flex justify-between items-center pb-2 border-b border-gray-100">
            <div>
              <span className="text-[9px] font-bold text-red-600 uppercase tracking-widest flex items-center gap-1">
                <Route className="w-3.5 h-3.5" /> Assigned Dispatch Route Details
              </span>
              <h4 className="text-sm font-bold text-gray-900 mt-0.5">{selectedEvent.driver}</h4>
            </div>
            <button onClick={() => setSelectedEvent(null)} className="text-gray-400 hover:text-gray-600 p-1">
              <X className="w-4.5 h-4.5" />
            </button>
          </div>

          <div className="py-3 space-y-3 text-xs font-semibold text-gray-700">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#BC2C2C] shrink-0" />
              <span>Shift: <strong className="text-gray-900">{selectedEvent.time}</strong></span>
            </div>

            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#BC2C2C] shrink-0" />
              <span>Manifest: <strong className="text-gray-900">{selectedEvent.passengers} passengers</strong></span>
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Status: <strong className="text-emerald-600">Active Duty GPS Lock</strong></span>
            </div>

            <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Assigned Transit Route Stops</p>
              <div className="space-y-1">
                {selectedEvent.stops.map((stop, sIdx) => (
                  <div key={sIdx} className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span className="text-gray-600 font-medium">{stop}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100 flex justify-end">
            <button 
              onClick={() => setSelectedEvent(null)}
              className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-xs font-bold"
            >
              Close Dispatch Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
