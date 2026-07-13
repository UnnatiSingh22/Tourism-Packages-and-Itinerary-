import React, { useState } from 'react';
import { FileText, AlertTriangle, Plane, Plus, BarChart2, X, MapPin, Star, Calendar, TrendingUp, Globe, Award } from 'lucide-react';

/* ────────────────── Full Report Modal ────────────────── */
function FullReportModal({ onClose }: { onClose: () => void }) {
  const tripHistory = [
    { year: '2024', destination: 'Maldives — Velaa Private Island', duration: '7 nights', spend: '₹3.2L', rating: 5, badge: 'Platinum Stay' },
    { year: '2024', destination: 'Japan — Kyoto & Osaka', duration: '10 nights', spend: '₹2.8L', rating: 5, badge: 'Cultural Expert' },
    { year: '2023', destination: 'Italy — Amalfi Coast', duration: '12 nights', spend: '₹4.1L', rating: 5, badge: 'Luxury Circuit' },
    { year: '2023', destination: 'Switzerland — Zermatt', duration: '6 nights', spend: '₹2.4L', rating: 4, badge: 'Alpine Seeker' },
    { year: '2023', destination: 'UAE — Dubai & Abu Dhabi', duration: '5 nights', spend: '₹1.8L', rating: 5, badge: 'City Immersion' },
    { year: '2022', destination: 'Bali — Ubud & Seminyak', duration: '8 nights', spend: '₹1.5L', rating: 4, badge: 'Wellness Retreat' },
    { year: '2022', destination: 'France — Paris & Riviera', duration: '11 nights', spend: '₹3.6L', rating: 5, badge: 'Premium Select' },
    { year: '2021', destination: 'South Africa — Cape Town & Safari', duration: '14 nights', spend: '₹4.8L', rating: 5, badge: 'Safari Elite' },
  ];

  const insights = [
    { label: 'Total Trips', value: '42', icon: <Plane className="w-4 h-4 text-blue-500" /> },
    { label: 'Countries Visited', value: '18', icon: <Globe className="w-4 h-4 text-emerald-500" /> },
    { label: 'Lifetime Spend', value: '₹38.6L', icon: <TrendingUp className="w-4 h-4 text-purple-500" /> },
    { label: 'Loyalty Tier', value: 'Diamond', icon: <Award className="w-4 h-4 text-amber-500" /> },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Full Travel Report</h2>
            <p className="text-xs text-gray-500 mt-0.5">Marco Valentini — Diamond Elite Member</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-6 space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {insights.map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-4 flex flex-col gap-2">
                <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-sm">{item.icon}</div>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{item.label}</p>
                <p className="text-xl font-extrabold text-gray-900">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Top Destinations Bar */}
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Spend by Region (%)</p>
            <div className="space-y-2">
              {[
                { region: 'Asia Pacific', pct: 38, color: 'bg-blue-500' },
                { region: 'Europe', pct: 32, color: 'bg-purple-500' },
                { region: 'Middle East', pct: 16, color: 'bg-amber-500' },
                { region: 'Africa', pct: 14, color: 'bg-emerald-500' },
              ].map((r, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-24 text-xs font-medium text-gray-600 shrink-0">{r.region}</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${r.color} rounded-full`} style={{ width: `${r.pct}%` }}></div>
                  </div>
                  <span className="text-xs font-bold text-gray-700 w-8 text-right">{r.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trip History Table */}
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" /> Trip History (Last 3 Years)
            </p>
            <div className="space-y-2">
              {tripHistory.map((trip, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-start gap-3">
                    <span className="text-[10px] font-extrabold text-gray-400 mt-0.5 w-8">{trip.year}</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-[#BC2C2C]" /> {trip.destination}
                      </p>
                      <p className="text-[11px] text-gray-500">{trip.duration} · {trip.spend}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <div className="flex">
                      {Array.from({ length: 5 }, (_, j) => (
                        <Star key={j} className={`w-3 h-3 ${j < trip.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />
                      ))}
                    </div>
                    <span className="text-[9px] font-bold text-[#BC2C2C] bg-red-50 px-2 py-0.5 rounded">{trip.badge}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 flex justify-end gap-3 shrink-0">
          <button
            onClick={() => {
              const txt = tripHistory.map(t => `${t.year} | ${t.destination} | ${t.duration} | ${t.spend} | ★ ${t.rating}`).join('\n');
              const blob = new Blob([`GUEST TRAVEL REPORT — Marco Valentini\n\n${txt}`], { type: 'text/plain' });
              const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'Guest_Travel_Report.txt'; a.click();
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 text-sm font-bold text-gray-700 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <FileText className="w-4 h-4" /> Export Report
          </button>
          <button onClick={onClose} className="px-4 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-black transition-colors">Close</button>
        </div>
      </div>
    </div>
  );
}

/* ────────────────── Passport & Visa ────────────────── */
export function PassportVisaCards() {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold text-gray-900">Passport & Visa</h2>
        <BarChart2 className="w-5 h-5 text-[#BC2C2C]" />
      </div>

      <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center"><FileText className="w-5 h-5" /></div>
          <div><h3 className="text-sm font-bold text-gray-900">Italian Passport</h3><p className="text-[11px] font-medium text-gray-500">Ends in 324 days</p></div>
        </div>
        <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-500">Valid</span>
      </div>

      <div className="flex items-center justify-between p-4 rounded-2xl bg-orange-50/50 border border-orange-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white text-orange-500 flex items-center justify-center shadow-sm"><AlertTriangle className="w-5 h-5" /></div>
          <div><h3 className="text-sm font-bold text-gray-900">US B1/B2 Visa</h3><p className="text-[11px] font-medium text-orange-600">Expires next month</p></div>
        </div>
        <span className="text-[10px] font-bold tracking-widest uppercase text-orange-600">Expiring</span>
      </div>

      <div className="flex items-center justify-between p-4 rounded-2xl bg-red-50/50 border border-red-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white text-red-500 flex items-center justify-center shadow-sm"><AlertTriangle className="w-5 h-5" /></div>
          <div><h3 className="text-sm font-bold text-gray-900">Bali E-VOA</h3><p className="text-[11px] font-medium text-red-600">Required for July trip</p></div>
        </div>
        <span className="px-2 py-1 bg-red-100 rounded text-[10px] font-bold tracking-widest uppercase text-red-600">Missing</span>
      </div>
    </div>
  );
}

/* ────────────────── Active Trips Card ────────────────── */
export function ActiveTripsCard({ trips = [], onAddBookingClick }: { trips?: Array<{ id: string; status: string; date: string; title: string; location: string }>; onAddBookingClick?: () => void }) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-900">Active Trips</h2>
        <Plane className="w-5 h-5 text-[#BC2C2C]" />
      </div>
      <div className="space-y-4">
        {trips.map(trip => (
          <div key={trip.id} className={`border-l-2 ${trip.status === 'Confirmed' ? 'border-[#BC2C2C]' : 'border-amber-400'} pl-4 py-1`}>
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2 py-0.5 ${trip.status === 'Confirmed' ? 'bg-gray-100 text-gray-700' : 'bg-amber-50 text-amber-600'} text-[9px] font-bold tracking-widest uppercase rounded`}>{trip.status}</span>
              <span className="text-xs font-bold text-gray-500">{trip.date}</span>
            </div>
            <h3 className="text-sm font-bold text-gray-900 mb-0.5">{trip.title}</h3>
            <p className="text-xs font-medium text-gray-500">{trip.location}</p>
          </div>
        ))}
        <button onClick={onAddBookingClick} className="w-full flex items-center justify-center gap-2 py-3 mt-4 border border-dashed border-gray-300 rounded-xl text-sm font-bold text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors">
          <Plus className="w-4 h-4" /> Add New Booking
        </button>
      </div>
    </div>
  );
}

/* ────────────────── Travel History Card ────────────────── */
export function TravelHistoryCard() {
  const [showReport, setShowReport] = useState(false);

  return (
    <>
      <div className="rounded-3xl p-6 shadow-sm bg-gradient-to-br from-[#BC2C2C] to-[#8B2020] text-white">
        <h2 className="text-lg font-bold mb-6">Travel History</h2>
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-end border-b border-white/20 pb-2">
            <span className="text-xs font-medium text-white/80">Total Trips</span>
            <span className="text-2xl font-bold">42</span>
          </div>
          <div className="flex justify-between items-end border-b border-white/20 pb-2">
            <span className="text-xs font-medium text-white/80">Countries Visited</span>
            <span className="text-2xl font-bold">18</span>
          </div>
          <div className="flex justify-between items-end border-b border-white/20 pb-2">
            <span className="text-xs font-medium text-white/80">Lifetime Spend</span>
            <span className="text-2xl font-bold">₹38.6L</span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-xs font-medium text-white/80">Loyalty Status</span>
            <span className="px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-lg">Diamond Elite</span>
          </div>
        </div>
        <button
          onClick={() => setShowReport(true)}
          className="w-full py-2.5 bg-white text-[#BC2C2C] text-sm font-bold rounded-xl shadow-sm hover:bg-gray-50 transition-colors"
        >
          View Full Report
        </button>
      </div>

      {showReport && <FullReportModal onClose={() => setShowReport(false)} />}
    </>
  );
}
