import React, { useState } from 'react';
import { X, Calendar, Clock, User, MapPin, AlertTriangle, ChevronLeft, ChevronRight, Mail, Phone, CalendarRange, History } from 'lucide-react';

const GUIDES = [
  { 
    id: 'g1', 
    name: 'Rajesh Verma', 
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=facearea&facepad=2', 
    specialty: 'Heritage & Culture', 
    rating: 4.9, 
    available: true,
    phone: '+91 98765 43210',
    email: 'rajesh.v@eventhub360.com',
    leaveStatus: 'On Duty (No pending leaves)',
    recentChanges: [
      { change: 'Assigned to Rajasthan Heritage Circuit D4', date: 'Oct 24, 09:00', by: 'Priya Sharma' },
      { change: 'Removed from standby fleet backup roster', date: 'Oct 22, 14:15', by: 'System' }
    ]
  },
  { 
    id: 'g2', 
    name: 'Ananya Singh', 
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=facearea&facepad=2', 
    specialty: 'Adventure & Trekking', 
    rating: 4.8, 
    available: false,
    phone: '+91 87654 32109',
    email: 'ananya.s@eventhub360.com',
    leaveStatus: 'Planned Leave: Nov 12 - Nov 18',
    recentChanges: [
      { change: 'Assigned to Kashmir Himalayan Trek D2', date: 'Oct 23, 11:30', by: 'Arjun Mehta' },
      { change: 'Conflict raised on Goa Beach Tour scheduling', date: 'Oct 24, 10:45', by: 'Sonal Patel' }
    ]
  },
  { 
    id: 'g3', 
    name: 'Mohammed Al-Farsi', 
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=facearea&facepad=2', 
    specialty: 'Luxury & Hospitality', 
    rating: 4.7, 
    available: true,
    phone: '+971 50 123 4567',
    email: 'm.alfarsi@eventhub360.com',
    leaveStatus: 'On Duty (Active in Dubai)',
    recentChanges: [
      { change: 'Assigned to Dubai Luxury Immersion D1', date: 'Oct 24, 08:00', by: 'Arjun Mehta' },
      { change: 'Confirmed flight transfer to Singapore', date: 'Oct 21, 16:50', by: 'System' }
    ]
  },
  { 
    id: 'g4', 
    name: 'Priya Nair', 
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=facearea&facepad=2', 
    specialty: 'Wildlife & Nature', 
    rating: 4.9, 
    available: true,
    phone: '+91 76543 21098',
    email: 'priya.nair@eventhub360.com',
    leaveStatus: 'Sick Leave request approved: Oct 28',
    recentChanges: [
      { change: 'Assigned to Kerala Backwaters Morning Cruise', date: 'Oct 24, 07:00', by: 'Priya Sharma' },
      { change: 'Rerouted Spice Garden tour schedule slot', date: 'Oct 23, 15:30', by: 'Amit Joshi' }
    ]
  },
];

const SCHEDULE_DATA: Record<string, { time: string; tour: string; location: string; pax: number; status: 'active' | 'upcoming' | 'completed' | 'conflict'; }[]> = {
  g1: [
    { time: '06:30', tour: 'Rajasthan Heritage Circuit – Day 4', location: 'Jaipur City Palace', pax: 18, status: 'completed' },
    { time: '09:00', tour: 'Rajasthan Heritage Circuit – Day 4', location: 'Amber Fort', pax: 18, status: 'active' },
    { time: '13:00', tour: 'Rajasthan Heritage Circuit – Day 4', location: 'Hawa Mahal', pax: 18, status: 'upcoming' },
    { time: '16:00', tour: 'Golden Triangle Express – Briefing', location: 'Hotel Imperial, Jaipur', pax: 22, status: 'upcoming' },
  ],
  g2: [
    { time: '05:00', tour: 'Kashmir Himalayan Trek – Day 2', location: 'Sonamarg Base Camp', pax: 8, status: 'active' },
    { time: '12:00', tour: 'Kashmir Himalayan Trek – Day 2', location: 'Thajiwas Glacier', pax: 8, status: 'upcoming' },
    { time: '15:00', tour: 'Goa Beaches Escape – Check-in', location: 'Grand Hyatt Goa', pax: 14, status: 'conflict' },
  ],
  g3: [
    { time: '08:00', tour: 'Dubai Luxury Immersion – Day 1', location: 'Burj Khalifa', pax: 12, status: 'active' },
    { time: '12:00', tour: 'Dubai Luxury Immersion – Day 1', location: 'Dubai Mall', pax: 12, status: 'upcoming' },
    { time: '19:00', tour: 'Dubai Luxury Immersion – Dinner', location: 'At The Top, Burj Khalifa', pax: 12, status: 'upcoming' },
  ],
  g4: [
    { time: '07:00', tour: 'Kerala Backwaters – Morning Cruise', location: 'Alleppey Houseboat', pax: 20, status: 'active' },
    { time: '11:00', tour: 'Kerala Backwaters – Spice Garden', location: 'Kumbalangi Village', pax: 20, status: 'upcoming' },
  ],
};

const WEEKLY_DATA: Record<string, Record<string, string>> = {
  g1: { Mon: 'Rajasthan Day 4', Tue: 'Rajasthan Day 5', Wed: 'OFF', Thu: 'Golden Triangle', Fri: 'Golden Triangle', Sat: 'Golden Triangle', Sun: 'OFF' },
  g2: { Mon: 'Kashmir Trek D2', Tue: 'Kashmir Trek D3', Wed: 'Kashmir Trek D4', Thu: 'OFF', Fri: 'Goa Beaches', Sat: 'Goa Beaches', Sun: 'OFF' },
  g3: { Mon: 'Dubai Luxury D1', Tue: 'Dubai Luxury D2', Wed: 'Dubai Luxury D3', Thu: 'Flight Home', Fri: 'OFF', Sat: 'Singapore Prep', Sun: 'Singapore Tour' },
  g4: { Mon: 'Kerala Backwaters', Tue: 'Kerala Backwaters', Wed: 'OFF', Thu: 'OFF', Fri: 'Bali Prep', Sat: 'Bali Tour D1', Sun: 'Bali Tour D2' },
};

const STATUS_COLORS = {
  active: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  upcoming: 'bg-blue-50 text-blue-600 border-blue-100',
  completed: 'bg-gray-50 text-gray-400 border-gray-100',
  conflict: 'bg-red-50 text-red-600 border-red-100',
};

type TabType = 'daily' | 'weekly';

interface Props { onClose: () => void; }

export function GuideScheduleModal({ onClose }: Props) {
  const [tab, setTab] = useState<TabType>('daily');
  const [selectedGuide, setSelectedGuide] = useState(GUIDES[0].id);

  const guide = GUIDES.find(g => g.id === selectedGuide)!;
  const schedule = SCHEDULE_DATA[selectedGuide] || [];
  const weekly = WEEKLY_DATA[selectedGuide] || {};
  const conflicts = schedule.filter(s => s.status === 'conflict');
  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 shrink-0">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#BC2C2C]" /> Guide Schedule
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Guide Sidebar */}
          <div className="w-56 border-r border-gray-100 overflow-y-auto bg-gray-50/40 shrink-0">
            {GUIDES.map(g => (
              <button
                key={g.id}
                onClick={() => setSelectedGuide(g.id)}
                className={`w-full flex items-center gap-3 p-4 text-left transition-colors border-b border-gray-100 ${selectedGuide === g.id ? 'bg-white border-l-2 border-l-[#BC2C2C]' : 'hover:bg-white'}`}
              >
                <div className="relative shrink-0">
                  <img src={g.photo} alt={g.name} className="w-9 h-9 rounded-full object-cover" />
                  <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${g.available ? 'bg-emerald-400' : 'bg-gray-300'}`}></span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-gray-900 truncate">{g.name}</p>
                  <p className="text-[9px] text-gray-400 truncate">{g.specialty}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex overflow-hidden">
            {/* Left: Schedule details */}
            <div className="flex-1 flex flex-col overflow-hidden border-r border-gray-100">
              {/* Guide Profile Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white shrink-0">
                <div className="flex items-center gap-3">
                  <img src={guide.photo} alt={guide.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-bold text-gray-900">{guide.name}</p>
                    <p className="text-xs text-gray-500">{guide.specialty} · ★ {guide.rating}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {conflicts.length > 0 && (
                    <span className="flex items-center gap-1 px-3 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-lg border border-red-100">
                      <AlertTriangle className="w-3 h-3" /> {conflicts.length} Conflict{conflicts.length > 1 ? 's' : ''}
                    </span>
                  )}
                  <span className={`px-3 py-1 text-xs font-bold rounded-lg ${guide.available ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500'}`}>
                    {guide.available ? 'Available' : 'Busy'}
                  </span>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-100 px-6 bg-white shrink-0">
                {(['daily', 'weekly'] as TabType[]).map(t => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`px-4 py-3 text-xs font-bold capitalize transition-all border-b-2 -mb-px ${tab === t ? 'border-[#BC2C2C] text-[#BC2C2C]' : 'border-transparent text-gray-400 hover:text-gray-700'}`}
                  >
                    {t === 'daily' ? 'Daily Schedule' : 'Weekly Overview'}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {tab === 'daily' ? (
                  <div className="space-y-3">
                    {schedule.length === 0 ? (
                      <p className="text-sm text-gray-400 text-center py-8">No schedule found for today.</p>
                    ) : schedule.map((item, i) => (
                      <div key={i} className={`flex items-start gap-4 p-4 rounded-2xl border ${STATUS_COLORS[item.status]} bg-white shadow-sm`}>
                        <div className="text-right shrink-0 w-12">
                          <Clock className="w-3 h-3 text-gray-400 mx-auto mb-1" />
                          <p className="text-xs font-extrabold text-gray-700">{item.time}</p>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{item.tour}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="flex items-center gap-1 text-[11px] text-gray-500">
                              <MapPin className="w-3 h-3" /> {item.location}
                            </span>
                            <span className="flex items-center gap-1 text-[11px] text-gray-500">
                              <User className="w-3 h-3" /> {item.pax} pax
                            </span>
                          </div>
                        </div>
                        <span className={`px-2 py-1 text-[9px] font-bold rounded-lg border capitalize ${STATUS_COLORS[item.status]}`}>
                          {item.status === 'conflict' ? '⚠ Conflict' : item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr>
                          <th className="text-left py-2 pr-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Guide</th>
                          {DAYS.map(d => (
                            <th key={d} className="py-2 px-2 text-center text-[10px] font-bold text-gray-400 uppercase tracking-wider">{d}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-3 pr-4">
                            <div className="flex items-center gap-2">
                              <img src={guide.photo} className="w-6 h-6 rounded-full" alt={guide.name} />
                              <span className="text-xs font-semibold text-gray-700 whitespace-nowrap">{guide.name.split(' ')[0]}</span>
                            </div>
                          </td>
                          {DAYS.map(d => (
                            <td key={d} className="py-3 px-2 text-center">
                              {weekly[d] ? (
                                <span className={`inline-block px-2 py-1 text-[9px] font-bold rounded-lg whitespace-nowrap ${weekly[d] === 'OFF' ? 'bg-gray-100 text-gray-400' : 'bg-[#BC2C2C]/10 text-[#BC2C2C]'}`}>
                                  {weekly[d]}
                                </span>
                              ) : (
                                <span className="text-gray-300 text-xs">—</span>
                              )}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Guide Meta Info, Contacts & Logs */}
            <div className="w-72 overflow-y-auto p-6 bg-gray-50/20 flex flex-col gap-6 shrink-0">
              {/* Contact Info */}
              <div className="space-y-3">
                <h3 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Contact Information</h3>
                <div className="space-y-2 text-xs font-semibold text-gray-700">
                  <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-gray-100 shadow-sm">
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    <span>{guide.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-gray-100 shadow-sm">
                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                    <span className="truncate">{guide.email}</span>
                  </div>
                </div>
              </div>

              {/* Leave Status */}
              <div className="space-y-3">
                <h3 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Availability & Leave</h3>
                <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-gray-100 shadow-sm text-xs font-semibold text-gray-700">
                  <CalendarRange className="w-3.5 h-3.5 text-gray-400 animate-pulse" />
                  <span>{guide.leaveStatus}</span>
                </div>
              </div>

              {/* Recent Changes Log */}
              <div className="space-y-3">
                <h3 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                  <History className="w-3.5 h-3.5 text-gray-400" /> Allocation Audit Log
                </h3>
                <div className="space-y-3 text-[11px] font-semibold">
                  {guide.recentChanges.map((change, idx) => (
                    <div key={idx} className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col gap-1">
                      <p className="text-gray-800 leading-normal">{change.change}</p>
                      <div className="flex justify-between text-[9px] text-gray-400 font-bold mt-1">
                        <span>By: {change.by}</span>
                        <span>{change.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
