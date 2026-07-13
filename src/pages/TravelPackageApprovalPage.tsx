import React, { useState, useMemo } from 'react';
import { ReviewerFeedbackSidebar } from '../components/tourism/ReviewerFeedbackSidebar';
import { Filter, UploadCloud, X, ChevronDown, Check, CheckCircle2, AlertTriangle, Eye, Plane, Utensils, Hotel, Camera, Clock, Users, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

// Mock Queue data
const INITIAL_QUEUE = [
  { ref: '#PKG-8890', name: 'Nordic Aurora Safari', dest: 'Tromsø, Norway', category: 'Adventure', budget: 185000, creator: 'Ananya S.', inclusions: [Plane, Utensils, Hotel], risk: 'Low', riskColor: 'text-emerald-500 bg-emerald-50', desc: 'Experience the magic of the Northern Lights in Tromsø, Norway. 6 Days of arctic safari, luxury domes and husky sledding.' },
  { ref: '#PKG-9012', name: 'Safari Majesty Tour', dest: 'Maasai Mara, Kenya', category: 'Wildlife', budget: 220000, creator: 'Ravi K.', inclusions: [Camera, Hotel], risk: 'Medium', riskColor: 'text-orange-500 bg-orange-50', desc: '5 Days luxury wildlife reserve safari in Maasai Mara. Gourmet dining, private guide and safari transfers.' },
  { ref: '#PKG-7728', name: 'Tokyo Tech & Tradition', dest: 'Tokyo, Japan', category: 'Cultural', budget: 148000, creator: 'Priya N.', inclusions: [Hotel, Utensils], risk: 'Low', riskColor: 'text-emerald-500 bg-emerald-50', desc: 'Contrast historic temples with futuristic tech. 7 Days exploring Tokyo, Kyoto and Hakone hot springs.' },
  { ref: '#PKG-9145', name: 'Patagonia Wilderness Trek', dest: 'Patagonia, Argentina', category: 'Adventure', budget: 195000, creator: 'Arjun M.', inclusions: [Plane, Camera, Hotel], risk: 'High', riskColor: 'text-red-500 bg-red-50', desc: 'Exquisite 8-day private mountaineering circuit through Los Glaciares National Park.' },
  { ref: '#PKG-9201', name: 'Maldives Overwater Escape', dest: 'Maldives', category: 'Luxury', budget: 310000, creator: 'Sonal P.', inclusions: [Hotel, Utensils], risk: 'Low', riskColor: 'text-emerald-500 bg-emerald-50', desc: 'Overwater luxury suite at Velaa Private Island. Premium spa packages and private chefs.' },
  { ref: '#PKG-9310', name: 'Peru Inca Trail Premium', dest: 'Cusco, Peru', category: 'Heritage', budget: 162000, creator: 'Amit J.', inclusions: [Plane, Camera], risk: 'Medium', riskColor: 'text-orange-500 bg-orange-50', desc: 'Exquisite hiking circuit along the ancient Inca Trail with top class heritage guides.' }
];

export function TravelPackageApprovalPage() {
  const { format } = useCurrency();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: 'All', priority: 'All', category: 'All', destination: 'All',
    creator: 'All', budget: 'All', department: 'All',
  });

  // State Management for Approval Workflow
  const [pendingQueue, setPendingQueue] = useState(INITIAL_QUEUE);
  const [activePackage, setActivePackage] = useState<any>({
    ref: '#PKG-7721',
    name: 'The Amalfi Serenity',
    dest: 'Amalfi Coast, Italy',
    category: 'Luxury Seascape Retreat',
    budget: 245000,
    creator: 'Marco V.',
    desc: 'A 5-day ultra-premium itinerary across Positano, Ravello, and Capri. Includes private yacht charters, Michelin-starred dining, and 5-star heritage villa stays.',
    stage: 1
  });
  const [approvedToday, setApprovedToday] = useState(18);
  const [pendingCount, setPendingCount] = useState(24);
  const [selectedQueueRefs, setSelectedQueueRefs] = useState<string[]>([]);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleNextInQueue = () => {
    if (pendingQueue.length > 0) {
      const nextPkg = pendingQueue[0];
      setActivePackage({
        ref: nextPkg.ref,
        name: nextPkg.name,
        dest: nextPkg.dest,
        category: nextPkg.category,
        budget: nextPkg.budget,
        creator: nextPkg.creator,
        desc: nextPkg.desc,
        stage: 1
      });
      setPendingQueue(prev => prev.slice(1));
    } else {
      setActivePackage(null);
    }
  };

  const handleApprove = () => {
    if (!activePackage) return;

    if (activePackage.stage < 3) {
      // Advance stage
      setActivePackage((prev: any) => ({ ...prev, stage: prev.stage + 1 }));
      triggerToast(`Package ${activePackage.ref} advanced to Stage ${activePackage.stage + 1}`);
    } else {
      // Publish & load next
      setApprovedToday(prev => prev + 1);
      setPendingCount(prev => Math.max(0, prev - 1));
      triggerToast(`🎉 Package ${activePackage.name} (${activePackage.ref}) approved & published successfully!`);
      handleNextInQueue();
    }
  };

  const handleReject = () => {
    if (!activePackage) return;
    triggerToast(`❌ Package ${activePackage.ref} rejected. Returned to draft status.`);
    handleNextInQueue();
  };

  const handleSelectRow = (ref: string) => {
    setSelectedQueueRefs(prev => 
      prev.includes(ref) ? prev.filter(r => r !== ref) : [...prev, ref]
    );
  };

  const handleBulkPublish = () => {
    if (selectedQueueRefs.length === 0) {
      alert("Please select one or more packages from the queue to publish.");
      return;
    }
    const count = selectedQueueRefs.length;
    setApprovedToday(prev => prev + count);
    setPendingCount(prev => Math.max(0, prev - count));
    setPendingQueue(prev => prev.filter(p => !selectedQueueRefs.includes(p.ref)));
    triggerToast(`🚀 Bulk Published ${count} packages in queue successfully!`);
    setSelectedQueueRefs([]);
  };

  const updateFilter = (key: string, val: string) => setFilters(prev => ({ ...prev, [key]: val }));
  const activeFilterCount = Object.values(filters).filter(v => v !== 'All').length;
  const clearFilters = () => setFilters({ status: 'All', priority: 'All', category: 'All', destination: 'All', creator: 'All', budget: 'All', department: 'All' });

  return (
    <div className="animate-in fade-in duration-500 pb-12 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white text-xs px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-in slide-in-from-bottom-2 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-4">
        <span>Tourism</span><span>›</span><span className="text-[#BC2C2C]">Approval Center</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Travel Package Approval</h1>
          <p className="text-[15px] text-gray-600 leading-relaxed">Manage draft proposals and verify high-tier luxury itineraries.</p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={() => setShowFilters(p => !p)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm border relative ${showFilters ? 'bg-[#BC2C2C] text-white border-[#BC2C2C]' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
          >
            <Filter className="w-4 h-4" />
            Advanced Filters
            {activeFilterCount > 0 && (
              <span className={`absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-[10px] font-extrabold flex items-center justify-center ${showFilters ? 'bg-white text-[#BC2C2C]' : 'bg-[#BC2C2C] text-white'}`}>{activeFilterCount}</span>
            )}
          </button>
          <button 
            onClick={handleBulkPublish}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#BC2C2C] to-[#E65A4B] text-white text-sm font-semibold rounded-xl hover:shadow-lg transition-all shadow-sm"
          >
            <UploadCloud className="w-4 h-4" /> Bulk Publish ({selectedQueueRefs.length})
          </button>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <div className="mb-6 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-bold text-gray-900">Advanced Filters</h3>
              {activeFilterCount > 0 && (
                <button onClick={clearFilters} className="flex items-center gap-1 text-xs font-bold text-[#BC2C2C] hover:text-[#8B2020] transition-colors">
                  <X className="w-3.5 h-3.5" /> Clear All ({activeFilterCount})
                </button>
              )}
            </div>
            <button onClick={() => setShowFilters(false)} className="text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { key: 'status', label: 'Status', options: ['All', 'Draft', 'Under Review', 'Pending Approval', 'Approved', 'Rejected', 'Published'] },
              { key: 'priority', label: 'Priority', options: ['All', 'High', 'Medium', 'Low'] },
              { key: 'category', label: 'Category', options: ['All', 'Luxury', 'Adventure', 'Cultural', 'Wildlife', 'Heritage', 'Wellness'] },
              { key: 'destination', label: 'Destination', options: ['All', 'Europe', 'Asia Pacific', 'Middle East', 'Africa', 'Americas', 'India', 'Oceania'] },
              { key: 'creator', label: 'Created By', options: ['All', 'Ananya S.', 'Ravi K.', 'Priya N.', 'Arjun M.', 'Sonal P.', 'Amit J.', 'Marco V.'] },
              { key: 'budget', label: 'Budget Range', options: ['All', 'Below 1L', '1L-2L', '2L-3L', 'Above 3L'] },
              { key: 'department', label: 'Department', options: ['All', 'Operations', 'Sales', 'Luxury', 'Adventure', 'Corporate'] },
            ].map(f => (
              <div key={f.key}>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{f.label}</label>
                <div className="relative">
                  <select
                    value={filters[f.key as keyof typeof filters]}
                    onChange={e => updateFilter(f.key, e.target.value)}
                    className={`w-full px-3 py-2 pr-8 rounded-xl text-sm font-semibold focus:outline-none appearance-none border cursor-pointer transition-colors ${filters[f.key as keyof typeof filters] !== 'All' ? 'bg-[#BC2C2C]/5 border-[#BC2C2C]/30 text-[#BC2C2C]' : 'bg-gray-50 border-gray-200 text-gray-700'}`}
                  >
                    {f.options.map(o => <option key={o}>{o}</option>)}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">Pending Queue</p>
          <span className="text-4xl font-extrabold text-gray-900 leading-none">{pendingCount}</span>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">Draft Packages</p>
          <span className="text-4xl font-extrabold text-gray-900 leading-none">158</span>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">Approved Today</p>
          <span className="text-4xl font-extrabold text-gray-900 leading-none">{approvedToday}</span>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">Rejection Rate</p>
          <span className="text-4xl font-extrabold text-gray-900 leading-none">4.2%</span>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-1 min-w-0 flex flex-col gap-6">
          {/* Active Review Card */}
          {activePackage ? (
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
                  <h2 className="text-xl font-bold text-gray-900">Active Review: "{activePackage.name}"</h2>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-red-50 text-red-600 text-xs font-bold rounded">High Priority</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded">{activePackage.ref}</span>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="shrink-0 relative">
                  <img src="https://images.unsplash.com/photo-1533676802871-eca1ae998cd5?w=300&fit=crop" alt="Active Package" className="w-full md:w-48 h-32 object-cover rounded-xl shadow-sm" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4 gap-4">
                    <div>
                      <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">Category</p>
                      <p className="text-sm font-semibold text-gray-900">{activePackage.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">Estimated Budget</p>
                      <p className="text-xl font-extrabold text-[#BC2C2C]">{format(activePackage.budget)}</p>
                    </div>
                  </div>
                  <div className="mb-6">
                    <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">Itinerary Overview</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{activePackage.desc}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <p className="text-[9px] font-bold text-gray-400 tracking-widest uppercase mb-0.5">Assigned Reviewer Stage</p>
                      <p className="text-xs font-bold text-gray-900">Stage {activePackage.stage}: {activePackage.stage === 1 ? 'Design Verification' : activePackage.stage === 2 ? 'Pricing Audit' : 'Executive Board Approval'}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <p className="text-[9px] font-bold text-gray-400 tracking-widest uppercase mb-0.5">Author</p>
                      <p className="text-xs font-bold text-gray-900">{activePackage.creator}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Milestones */}
              <div className="mt-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-3">Approval Milestones Progress</p>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  {['Tour Planning Review', 'Costing & Yield Audit', 'Executive Board Sign-off'].map((label, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${activePackage.stage > i + 1 ? 'bg-emerald-500 text-white' : activePackage.stage === i + 1 ? 'bg-[#BC2C2C] text-white' : 'bg-gray-200 text-gray-500'}`}>
                        {activePackage.stage > i + 1 ? <Check className="w-3.5 h-3.5" /> : i + 1}
                      </div>
                      <span className={`text-xs font-semibold ${activePackage.stage === i + 1 ? 'text-gray-900 font-bold' : 'text-gray-400'}`}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-100">
                <button onClick={() => setShowPreviewModal(true)} className="flex items-center gap-1.5 text-xs font-bold text-[#BC2C2C] hover:text-[#8B2020] transition-colors">
                  <Eye className="w-4 h-4" /> Full Preview Itinerary
                </button>
                <div className="flex gap-4">
                  <button onClick={handleReject} className="px-5 py-2 bg-white border border-[#BC2C2C] text-[#BC2C2C] text-xs font-bold rounded-xl hover:bg-red-50 transition-colors">Reject Proposal</button>
                  <button onClick={handleApprove} className="px-5 py-2 bg-[#BC2C2C] text-white text-xs font-bold rounded-xl hover:bg-[#8B2020] transition-colors shadow-sm">
                    {activePackage.stage === 3 ? 'Approve & Publish' : 'Approve & Continue'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center py-16">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900">All Queue Packages Reviewed</h2>
              <p className="text-sm text-gray-500 mt-2">There are no more pending package proposals requiring immediate review.</p>
              <button 
                onClick={() => {
                  setPendingQueue(INITIAL_QUEUE);
                  setPendingCount(24);
                  setActivePackage({
                    ref: '#PKG-7721',
                    name: 'The Amalfi Serenity',
                    dest: 'Amalfi Coast, Italy',
                    category: 'Luxury Seascape Retreat',
                    budget: 245000,
                    creator: 'Marco V.',
                    desc: 'A 5-day ultra-premium itinerary across Positano, Ravello, and Capri.',
                    stage: 1
                  });
                }}
                className="mt-6 px-6 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-xs font-bold transition-all"
              >
                Reload Mock Queue
              </button>
            </div>
          )}

          {/* Pending Approval Queue */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-t-3xl">
              <h2 className="text-sm font-bold text-gray-900">Pending Approval Queue ({pendingQueue.length})</h2>
              <span className="text-[10px] text-gray-400 font-bold">Select rows to Bulk Publish</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50/30">
                    <th className="px-6 py-4 w-12">
                      <input 
                        type="checkbox" 
                        checked={pendingQueue.length > 0 && selectedQueueRefs.length === pendingQueue.length}
                        onChange={(e) => {
                          if (e.target.checked) setSelectedQueueRefs(pendingQueue.map(p => p.ref));
                          else setSelectedQueueRefs([]);
                        }}
                        className="rounded cursor-pointer"
                      />
                    </th>
                    <th className="px-6 py-4">Reference</th>
                    <th className="px-6 py-4">Package Name</th>
                    <th className="px-6 py-4">Destination</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Budget</th>
                    <th className="px-6 py-4">Risk</th>
                    <th className="px-6 py-4">Creator</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-xs font-semibold text-gray-700">
                  {pendingQueue.length === 0 ? (
                    <tr><td colSpan={8} className="text-center py-12 text-gray-400">Queue is currently empty.</td></tr>
                  ) : pendingQueue.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/30 transition-colors">
                      <td className="px-6 py-4">
                        <input 
                          type="checkbox"
                          checked={selectedQueueRefs.includes(item.ref)}
                          onChange={() => handleSelectRow(item.ref)}
                          className="rounded cursor-pointer"
                        />
                      </td>
                      <td className="px-6 py-4 font-mono text-[#BC2C2C]">{item.ref}</td>
                      <td className="px-6 py-4 text-gray-900 font-bold">{item.name}</td>
                      <td className="px-6 py-4 text-gray-500">{item.dest}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-lg">{item.category}</span>
                      </td>
                      <td className="px-6 py-4 font-black">{format(item.budget)}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-[10px] font-bold border ${item.riskColor}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${item.risk === 'Low' ? 'bg-emerald-500' : item.risk === 'Medium' ? 'bg-orange-500' : 'bg-red-500'}`}></span>
                          {item.risk}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400">{item.creator}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="w-full xl:w-[320px] shrink-0 h-[800px]">
          <ReviewerFeedbackSidebar />
        </div>
      </div>

      {/* Itinerary Preview Modal */}
      {showPreviewModal && activePackage && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowPreviewModal(false)}>
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[85vh] p-6 shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Itinerary Preview: {activePackage.name}</h3>
                <p className="text-xs text-gray-500">{activePackage.dest} • Creator: {activePackage.creator}</p>
              </div>
              <button onClick={() => setShowPreviewModal(false)} className="p-2 hover:bg-gray-50 rounded-xl text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 text-sm text-gray-600 overflow-y-auto">
              <p><strong>Package Description:</strong> {activePackage.desc}</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Base Costing Plan</span>
                  <p className="text-lg font-extrabold text-[#BC2C2C] mt-1">{format(activePackage.budget)} / Pax</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Review Stage</span>
                  <p className="text-sm font-bold text-gray-950 mt-1">Milestone {activePackage.stage} of 3</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 italic">This is an active workflow container. Final review records will be updated upon board sign-off.</p>
            </div>
            <div className="pt-4 border-t border-gray-100 flex justify-end gap-3 shrink-0">
              <button onClick={() => setShowPreviewModal(false)} className="px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold rounded-xl">Close Preview</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
