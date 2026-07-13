import React, { useState } from 'react';
import { ChevronRight, X, TrendingUp, Clock, Car, Star, BarChart3 } from 'lucide-react';

const REGIONS = [
  {
    name: 'North India Corridor',
    summary: '1,284 Trips • 96% On-time',
    color: 'border-l-red-500',
    badge: 'bg-red-50 text-red-600',
    routes: [
      { label: 'Delhi–Agra Express', trips: 642 },
      { label: 'Delhi–Jaipur Circuit', trips: 384 },
      { label: 'Delhi–Mathura Drop', trips: 258 },
    ],
    insights: {
      onTime: '96.2%', avgTime: '3h 14m', satisfaction: 4.8,
      topVehicle: 'Mercedes Sprinter', topDriver: 'Amit Joshi', revenue: '₹42.6L',
      trend: '+14% vs last month', busyHour: '7:00 AM – 10:00 AM',
      chart: [60, 75, 84, 92, 96, 88, 95, 98, 91, 96, 97, 99],
    },
  },
  {
    name: 'Airport Transfers Hub',
    summary: '2,104 Trips • 98% On-time',
    color: 'border-l-amber-500',
    badge: 'bg-amber-50 text-amber-600',
    routes: [
      { label: 'IGI Terminal 3', trips: 890 },
      { label: 'Chhatrapati Shivaji Int\'l', trips: 742 },
      { label: 'Kempegowda Int\'l', trips: 472 },
    ],
    insights: {
      onTime: '98.4%', avgTime: '45m', satisfaction: 4.9,
      topVehicle: 'Toyota Innova Crysta', topDriver: 'Rajiv Nair', revenue: '₹68.4L',
      trend: '+22% vs last month', busyHour: '5:00 AM – 9:00 AM',
      chart: [70, 80, 90, 95, 98, 94, 97, 98, 99, 98, 97, 99],
    },
  },
  {
    name: 'South India Coastal',
    summary: '842 Trips • 94% On-time',
    color: 'border-l-emerald-500',
    badge: 'bg-emerald-50 text-emerald-600',
    routes: [
      { label: 'Kochi–Alleppey Houseboat', trips: 320 },
      { label: 'Chennai–Mahabalipuram', trips: 284 },
      { label: 'Mysuru–Ooty Mountain', trips: 238 },
    ],
    insights: {
      onTime: '94.1%', avgTime: '2h 38m', satisfaction: 4.7,
      topVehicle: 'Tempo Traveller', topDriver: 'Priya Nair', revenue: '₹28.2L',
      trend: '+18% vs last month', busyHour: '8:00 AM – 12:00 PM',
      chart: [55, 65, 78, 82, 90, 86, 92, 94, 90, 93, 95, 94],
    },
  },
  {
    name: 'Luxury Private Circuits',
    summary: '312 Trips • 99% On-time',
    color: 'border-l-purple-500',
    badge: 'bg-purple-50 text-purple-600',
    routes: [
      { label: 'Mumbai VIP Escort', trips: 128 },
      { label: 'Udaipur Heritage Drive', trips: 104 },
      { label: 'Goa Beach Limousine', trips: 80 },
    ],
    insights: {
      onTime: '99.1%', avgTime: '1h 52m', satisfaction: 5.0,
      topVehicle: 'Mercedes S-Class Maybach', topDriver: 'Sonal Iyer', revenue: '₹84.8L',
      trend: '+31% vs last month', busyHour: '6:00 PM – 10:00 PM',
      chart: [80, 88, 92, 96, 99, 98, 99, 100, 98, 99, 99, 99],
    },
  },
];

function InsightsModal({ region, onClose }: { region: typeof REGIONS[0]; onClose: () => void }) {
  const { insights } = region;
  const max = Math.max(...insights.chart);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-900">{region.name}</h2>
            <p className="text-xs text-gray-500 mt-0.5">{region.summary}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors"><X className="w-4 h-4 text-gray-400" /></button>
        </div>

        <div className="p-6 space-y-6">
          {/* KPI Row */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: <Clock className="w-4 h-4 text-blue-500" />, label: 'On-Time Rate', value: insights.onTime },
              { icon: <Car className="w-4 h-4 text-purple-500" />, label: 'Avg Trip Time', value: insights.avgTime },
              { icon: <Star className="w-4 h-4 text-amber-500" />, label: 'Satisfaction', value: `${insights.satisfaction} / 5.0` },
            ].map((kpi, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">{kpi.icon}</div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{kpi.label}</p>
                  <p className="text-lg font-extrabold text-gray-900">{kpi.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Monthly Activity Chart */}
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2"><BarChart3 className="w-3.5 h-3.5" /> Monthly On-Time Trend (%)</p>
            <div className="flex items-end gap-1.5 h-20">
              {insights.chart.map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full rounded-sm bg-gradient-to-t from-[#BC2C2C] to-[#E65A4B]" style={{ height: `${(val / max) * 72}px` }}></div>
                  <span className="text-[8px] text-gray-400 font-bold">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Top Vehicle', value: insights.topVehicle },
              { label: 'Top Driver', value: insights.topDriver },
              { label: 'Revenue MTD', value: insights.revenue },
              { label: 'Busiest Hour', value: insights.busyHour },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{item.label}</p>
                  <p className="text-sm font-semibold text-gray-900">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Routes */}
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Top Routes</p>
            {region.routes.map((r, i) => (
              <div key={i} className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-sm text-gray-700">{r.label}</span>
                <span className="text-sm font-bold text-gray-900">{r.trips} trips</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-xl">
            <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
            <p className="text-xs font-semibold text-emerald-700">{insights.trend}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RegionalPerformance() {
  const [activeInsights, setActiveInsights] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<number | null>(1); // Airport expanded by default

  return (
    <>
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 h-full">
        <h2 className="text-lg font-bold text-gray-900 mb-5">Regional Performance</h2>
        <div className="space-y-3">
          {REGIONS.map((region, i) => (
            <div
              key={i}
              className={`rounded-2xl border border-gray-100 overflow-hidden transition-all ${expanded === i ? 'border-gray-200 bg-gray-50' : ''}`}
            >
              <div
                className="p-4 flex items-center justify-between cursor-pointer group hover:bg-gray-50 transition-colors"
                onClick={() => setExpanded(expanded === i ? null : i)}
              >
                <div>
                  <h3 className="text-sm font-bold text-gray-900">{region.name}</h3>
                  <p className="text-xs text-gray-500 font-medium">{region.summary}</p>
                </div>
                <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${expanded === i ? 'rotate-90' : ''}`} />
              </div>

              {expanded === i && (
                <div className={`px-4 pb-4 border-l-2 ml-4 ${region.color} space-y-2 animate-in fade-in duration-150`}>
                  {region.routes.map((r, j) => (
                    <div key={j} className="flex justify-between items-center py-1.5">
                      <span className="text-xs text-gray-600 font-medium">{r.label}</span>
                      <span className="text-xs font-bold text-gray-900">{r.trips} trips</span>
                    </div>
                  ))}
                  <button
                    onClick={(e) => { e.stopPropagation(); setActiveInsights(i); }}
                    className="mt-2 w-full py-2 bg-[#BC2C2C]/5 hover:bg-[#BC2C2C]/10 text-[#BC2C2C] text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <BarChart3 className="w-3.5 h-3.5" /> View Insights
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {activeInsights !== null && (
        <InsightsModal region={REGIONS[activeInsights]} onClose={() => setActiveInsights(null)} />
      )}
    </>
  );
}
