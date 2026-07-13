import { useState, useMemo } from 'react';
import { Eye, Plane, Utensils, Hotel, Camera, Check, ArrowRight, X, MapPin, Clock, Users, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatRupee } from '../../lib/utils';

/* ─────────────────────────────────────────────────────────────────────────────
   ITINERARY PREVIEW MODAL
───────────────────────────────────────────────────────────────────────────── */
interface ItineraryDay { day: number; title: string; location: string; activities: string[]; hotel: string; meals: string; transport: string; }

const AMALFI_ITINERARY: ItineraryDay[] = [
  { day: 1, title: 'Arrival & Positano Welcome', location: 'Positano, Amalfi Coast', activities: ['Private transfer from Naples airport', 'Check-in at Le Sirenuse 5★ villa', 'Welcome cocktail reception on panoramic terrace'], hotel: 'Le Sirenuse, Positano', meals: 'Welcome Dinner (Michelin 2★)', transport: 'Private Luxury Car' },
  { day: 2, title: 'Positano Coast Exploration', location: 'Positano & Praiano', activities: ['Private boat charter along the coast', 'Snorkeling at Li Galli Islands', 'Sunset cocktails at Da Adolfo beach bar'], hotel: 'Le Sirenuse, Positano', meals: 'Breakfast + Seaside Lunch', transport: 'Private Boat' },
  { day: 3, title: 'Ravello & Villa Rufolo', location: 'Ravello, Amalfi', activities: ['Morning drive to Ravello village', 'Private guided tour of Villa Rufolo gardens', 'Exclusive concert access'], hotel: 'Palazzo Avino, Ravello', meals: 'Full Board', transport: 'Heritage Car' },
  { day: 4, title: 'Capri Island Escape', location: 'Capri Island', activities: ['Helicopter transfer to Capri', 'Blue Grotto boat tour', 'Shopping at Via Camerelle', 'Rooftop dinner at Terrazza Brunella'], hotel: 'Capri Palace, Capri', meals: 'Breakfast + Fine Dining Dinner', transport: 'Helicopter + Water Taxi' },
  { day: 5, title: 'Pompeii & Farewell', location: 'Pompeii & Naples', activities: ['Private guided Pompeii archaeological tour', 'Farewell lunch at Don Alfonso 1890', 'Luxury transfer to Naples airport'], hotel: 'Check-out', meals: 'Breakfast + Farewell Lunch', transport: 'Private Luxury Limousine' },
];

function ItineraryPreviewModal({ onClose }: { onClose: () => void }) {
  const [activeDay, setActiveDay] = useState(1);
  const day = AMALFI_ITINERARY.find(d => d.day === activeDay)!;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="relative h-40 shrink-0 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1533676802871-eca1ae998cd5?w=1200&fit=crop" alt="Amalfi" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
            <div className="flex-1">
              <h2 className="text-2xl font-extrabold text-white">The Amalfi Serenity</h2>
              <p className="text-white/80 text-sm flex items-center gap-2 mt-1">
                <MapPin className="w-3.5 h-3.5" /> Amalfi Coast, Italy &nbsp;·&nbsp; <Clock className="w-3.5 h-3.5" /> 5 Days / 4 Nights &nbsp;·&nbsp; <Users className="w-3.5 h-3.5" /> Max 12 Guests
              </p>
            </div>
            <div className="text-right">
              <p className="text-white/70 text-xs font-bold">From</p>
              <p className="text-2xl font-extrabold text-white">{formatRupee(245000)}</p>
              <p className="text-white/70 text-xs">/ person</p>
            </div>
          </div>
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center transition-colors">
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Overview Chips */}
        <div className="flex flex-wrap gap-2 px-6 py-4 border-b border-gray-100 shrink-0">
          {[
            { icon: <Hotel className="w-3.5 h-3.5" />, label: '4 Hotel Stays', color: 'bg-blue-50 text-blue-600' },
            { icon: <Utensils className="w-3.5 h-3.5" />, label: 'All Dining Included', color: 'bg-amber-50 text-amber-600' },
            { icon: <Plane className="w-3.5 h-3.5" />, label: 'Private Transfers', color: 'bg-purple-50 text-purple-600' },
            { icon: <Camera className="w-3.5 h-3.5" />, label: 'Expert Guided Tours', color: 'bg-emerald-50 text-emerald-600' },
            { icon: <DollarSign className="w-3.5 h-3.5" />, label: 'All Taxes Included', color: 'bg-gray-100 text-gray-600' },
          ].map((chip, i) => (
            <span key={i} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold ${chip.color}`}>
              {chip.icon} {chip.label}
            </span>
          ))}
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Day Selector */}
          <div className="w-32 border-r border-gray-100 flex flex-col shrink-0 overflow-y-auto">
            {AMALFI_ITINERARY.map(d => (
              <button
                key={d.day}
                onClick={() => setActiveDay(d.day)}
                className={`flex flex-col items-center p-4 border-b border-gray-50 transition-colors ${activeDay === d.day ? 'bg-[#BC2C2C] text-white' : 'hover:bg-gray-50'}`}
              >
                <span className={`text-[10px] font-bold uppercase tracking-widest ${activeDay === d.day ? 'text-white/70' : 'text-gray-400'}`}>Day</span>
                <span className={`text-2xl font-extrabold ${activeDay === d.day ? 'text-white' : 'text-gray-900'}`}>{d.day}</span>
              </button>
            ))}
          </div>

          {/* Day Detail */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900">{day.title}</h3>
              <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5"><MapPin className="w-3.5 h-3.5" /> {day.location}</p>
            </div>

            <div className="space-y-3 mb-6">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Activities</p>
              {day.activities.map((a, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-5 h-5 rounded-full bg-[#BC2C2C]/10 text-[#BC2C2C] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[9px] font-extrabold">{i + 1}</span>
                  </div>
                  <p className="text-sm text-gray-700">{a}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { icon: <Hotel className="w-4 h-4 text-blue-500" />, label: 'Accommodation', value: day.hotel },
                { icon: <Utensils className="w-4 h-4 text-amber-500" />, label: 'Meals', value: day.meals },
                { icon: <Plane className="w-4 h-4 text-purple-500" />, label: 'Transport', value: day.transport },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-2 mb-2">{item.icon}<span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{item.label}</span></div>
                  <p className="text-sm font-semibold text-gray-800">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ACTIVE REVIEW CARD
───────────────────────────────────────────────────────────────────────────── */
export function ActiveReviewCard() {
  const [stage, setStage] = useState(1);
  const [showPreview, setShowPreview] = useState(false);

  const stageNames: Record<number, string> = {
    1: 'Stage 1: Tour Planning Review',
    2: 'Stage 2: Costing & Margin Audit',
    3: 'Stage 3: Board Sign-off',
    4: 'Fully Approved & Published',
    [-1]: 'Rejected',
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6 relative overflow-hidden">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <span className="text-red-500 text-xl font-bold">!</span>
          <h2 className="text-xl font-bold text-gray-900">Active Review: "The Amalfi Serenity"</h2>
        </div>
        <div className="flex gap-2">
          {stage === -1 ? <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded">Rejected</span>
            : stage === 4 ? <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded">Published</span>
            : <span className="px-3 py-1 bg-red-50 text-red-600 text-xs font-bold rounded">High Priority</span>}
          <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded">PKG-7721</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="shrink-0 relative">
          <img src="https://images.unsplash.com/photo-1533676802871-eca1ae998cd5?w=300&fit=crop" alt="Amalfi Coast" className="w-full md:w-48 h-32 object-cover rounded-xl shadow-sm" />
          <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold tracking-widest uppercase rounded">Main Visual</div>
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start mb-4">
            <div><p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">Category</p><p className="text-sm font-semibold text-gray-900">Luxury Seascape Retreat</p></div>
            <div className="text-right"><p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">Base Price</p><p className="text-xl font-extrabold text-[#BC2C2C]">{formatRupee(245000)} <span className="text-xs font-medium text-gray-500">/ person</span></p></div>
          </div>
          <div className="mb-6">
            <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">Brief Description</p>
            <p className="text-sm text-gray-600 leading-relaxed">A 5-day ultra-premium itinerary across Positano, Ravello, and Capri. Includes private yacht charters, Michelin-starred dining, and 5-star heritage villa stays.</p>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 p-3 bg-gray-50 rounded-xl border border-gray-100"><p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">Status</p><p className="text-sm font-bold text-gray-900">{stageNames[stage]}</p></div>
            <div className="flex-1 p-3 bg-gray-50 rounded-xl border border-gray-100"><p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">Creator</p><p className="text-sm font-bold text-gray-900">Marco V. <span className="text-xs font-medium text-gray-500">(Senior Designer)</span></p></div>
          </div>
        </div>
      </div>

      {stage !== -1 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-3">Approval Milestones Progress</p>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {['Tour Planning', 'Costing Audit', 'Board Sign-off'].map((label, i) => (
              <div key={i} className="flex items-center gap-2">
                {i > 0 && <ArrowRight className="w-4 h-4 text-gray-300 hidden sm:block" />}
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${stage > i + 1 ? 'bg-emerald-500 text-white' : stage === i + 1 ? 'bg-[#BC2C2C] text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {stage > i + 1 ? <Check className="w-3.5 h-3.5" /> : i + 1}
                </div>
                <span className={`text-xs font-semibold ${stage === i + 1 ? 'text-gray-900 font-bold' : 'text-gray-400'}`}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-100">
        <button onClick={() => setShowPreview(true)} className="flex items-center gap-2 text-sm font-bold text-[#BC2C2C] hover:text-[#8B2020] transition-colors">
          <Eye className="w-4 h-4" /> Full Preview Itinerary
        </button>
        <div className="flex gap-4">
          {stage === -1 || stage === 4 ? (
            <button onClick={() => setStage(1)} className="px-6 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition-colors">Reset Review Workflow</button>
          ) : (
            <>
              <button onClick={() => setStage(-1)} className="px-6 py-2.5 text-[#BC2C2C] border border-[#BC2C2C] text-sm font-bold rounded-xl hover:bg-red-50 transition-colors">Reject Proposal</button>
              <button onClick={() => setStage(p => p < 4 ? p + 1 : p)} className="px-6 py-2.5 bg-[#BC2C2C] text-white text-sm font-bold rounded-xl hover:bg-[#8B2020] shadow-sm transition-colors flex items-center gap-2">
                {stage === 3 ? 'Approve & Publish' : 'Approve & Continue'}
              </button>
            </>
          )}
        </div>
      </div>

      {showPreview && <ItineraryPreviewModal onClose={() => setShowPreview(false)} />}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PENDING APPROVAL QUEUE WITH PAGINATION
───────────────────────────────────────────────────────────────────────────── */
const ALL_QUEUE = [
  { ref: '#PKG-8890', name: 'Nordic Aurora Safari', dest: 'Tromsø, Norway', category: 'Adventure', budget: formatRupee(185000), creator: 'Ananya S.', inclusions: [Plane, Utensils, Hotel], risk: 'Low', riskColor: 'text-emerald-500 bg-emerald-50' },
  { ref: '#PKG-9012', name: 'Safari Majesty Tour', dest: 'Maasai Mara, Kenya', category: 'Wildlife', budget: formatRupee(220000), creator: 'Ravi K.', inclusions: [Camera, Hotel], risk: 'Medium', riskColor: 'text-orange-500 bg-orange-50' },
  { ref: '#PKG-7728', name: 'Tokyo Tech & Tradition', dest: 'Tokyo, Japan', category: 'Cultural', budget: formatRupee(148000), creator: 'Priya N.', inclusions: [Hotel, Utensils], risk: 'Low', riskColor: 'text-emerald-500 bg-emerald-50' },
  { ref: '#PKG-9145', name: 'Patagonia Wilderness Trek', dest: 'Patagonia, Argentina', category: 'Adventure', budget: formatRupee(195000), creator: 'Arjun M.', inclusions: [Plane, Camera, Hotel], risk: 'High', riskColor: 'text-red-500 bg-red-50' },
  { ref: '#PKG-9201', name: 'Maldives Overwater Escape', dest: 'Maldives', category: 'Luxury', budget: formatRupee(310000), creator: 'Sonal P.', inclusions: [Hotel, Utensils], risk: 'Low', riskColor: 'text-emerald-500 bg-emerald-50' },
  { ref: '#PKG-9310', name: 'Peru Inca Trail Premium', dest: 'Cusco, Peru', category: 'Heritage', budget: formatRupee(162000), creator: 'Amit J.', inclusions: [Plane, Camera], risk: 'Medium', riskColor: 'text-orange-500 bg-orange-50' },
  { ref: '#PKG-9402', name: 'Swiss Alps Winter Luxury', dest: 'Zermatt, Switzerland', category: 'Luxury', budget: formatRupee(285000), creator: 'Ananya S.', inclusions: [Hotel, Utensils, Plane], risk: 'Low', riskColor: 'text-emerald-500 bg-emerald-50' },
  { ref: '#PKG-9508', name: 'Bali Spiritual Retreat', dest: 'Ubud, Bali', category: 'Wellness', budget: formatRupee(98000), creator: 'Priya N.', inclusions: [Hotel, Utensils], risk: 'Low', riskColor: 'text-emerald-500 bg-emerald-50' },
  { ref: '#PKG-9619', name: 'Egyptian Pharaoh Circuit', dest: 'Cairo & Luxor, Egypt', category: 'Heritage', budget: formatRupee(142000), creator: 'Ravi K.', inclusions: [Plane, Camera, Hotel], risk: 'Medium', riskColor: 'text-orange-500 bg-orange-50' },
  { ref: '#PKG-9720', name: 'Morocco Desert Odyssey', dest: 'Marrakech & Sahara', category: 'Adventure', budget: formatRupee(132000), creator: 'Amit J.', inclusions: [Hotel, Utensils], risk: 'Low', riskColor: 'text-emerald-500 bg-emerald-50' },
];

const PAGE_SIZE = 5;

export function PendingApprovalQueue() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [previewItem, setPreviewItem] = useState<null | typeof ALL_QUEUE[0]>(null);

  const filtered = useMemo(() => ALL_QUEUE.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.dest.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.ref.toLowerCase().includes(searchTerm.toLowerCase())
  ), [searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageData = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-t-3xl">
        <h2 className="text-lg font-bold text-gray-900">Pending Approval Queue</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Filter queue..."
            value={searchTerm}
            onChange={e => { setSearchTerm(e.target.value); setPage(1); }}
            className="pl-8 pr-4 py-1.5 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#BC2C2C]/30"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="px-6 py-4 text-[10px] font-bold text-[#8B2020] tracking-widest uppercase">Reference</th>
              <th className="px-6 py-4 text-[10px] font-bold text-[#8B2020] tracking-widest uppercase">Package Name</th>
              <th className="px-6 py-4 text-[10px] font-bold text-[#8B2020] tracking-widest uppercase">Destination</th>
              <th className="px-6 py-4 text-[10px] font-bold text-[#8B2020] tracking-widest uppercase">Category</th>
              <th className="px-6 py-4 text-[10px] font-bold text-[#8B2020] tracking-widest uppercase">Budget</th>
              <th className="px-6 py-4 text-[10px] font-bold text-[#8B2020] tracking-widest uppercase">Inclusions</th>
              <th className="px-6 py-4 text-[10px] font-bold text-[#8B2020] tracking-widest uppercase">Risk</th>
              <th className="px-6 py-4 text-[10px] font-bold text-[#8B2020] tracking-widest uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageData.length === 0 ? (
              <tr><td colSpan={8} className="text-center py-8 text-sm font-semibold text-gray-400">No matching packages.</td></tr>
            ) : pageData.map((item, idx) => (
              <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-5 text-sm font-bold text-gray-500">{item.ref}</td>
                <td className="px-6 py-5 text-sm font-semibold text-gray-900">{item.name}</td>
                <td className="px-6 py-5 text-sm font-medium text-gray-600">{item.dest}</td>
                <td className="px-6 py-5"><span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-lg">{item.category}</span></td>
                <td className="px-6 py-5 text-sm font-semibold text-gray-700">{item.budget}</td>
                <td className="px-6 py-5">
                  <div className="flex gap-1.5">
                    {item.inclusions.map((Icon, i) => (
                      <div key={i} className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                        <Icon className="w-3 h-3" />
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 w-max ${item.riskColor}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${item.risk === 'Low' ? 'bg-emerald-500' : item.risk === 'Medium' ? 'bg-orange-500' : 'bg-red-500'}`}></span>
                    {item.risk}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <button onClick={() => setPreviewItem(item)} className="flex items-center gap-1 text-xs font-bold text-[#BC2C2C] hover:text-[#8B2020] transition-colors">
                    <Eye className="w-3.5 h-3.5" /> Preview
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-gray-100 flex justify-between items-center text-xs font-medium text-gray-500">
        <span>Showing {filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length} entries</span>
        <div className="flex gap-1 items-center">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-3 py-1.5 text-gray-500 hover:text-gray-900 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1">
            <ChevronLeft className="w-3.5 h-3.5" /> Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button key={p} onClick={() => setPage(p)} className={`w-7 h-7 rounded font-bold transition-all ${p === currentPage ? 'bg-[#BC2C2C] text-white' : 'hover:bg-gray-100 text-gray-600'}`}>{p}</button>
          ))}
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-3 py-1.5 text-gray-500 hover:text-gray-900 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1">
            Next <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Preview Modal (reuse Amalfi modal for all items for now) */}
      {previewItem && <ItineraryPreviewModal onClose={() => setPreviewItem(null)} />}
    </div>
  );
}
