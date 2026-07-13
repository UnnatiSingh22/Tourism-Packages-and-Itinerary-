import React, { useState } from 'react';
import { CheckInFlightBar, CheckInMetrics } from '../components/checkin/CheckInFlightBar';
import { CheckInManifestTable } from '../components/checkin/CheckInManifestTable';
import {
  CheckInRouteCard,
  CheckInVerificationAlerts,
  CheckInLiveActivity,
} from '../components/checkin/CheckInSidePanel';
import { X, Search, ShieldAlert, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';

interface Traveler {
  initials: string;
  avatar: string;
  name: string;
  seat: string;
  pnr: string;
  status: 'Checked-In' | 'Pending' | 'Not Started';
  docs: 'verified' | 'missing-visa' | 'expiring-doc' | 'none';
  readiness: string;
  readinessColor: string;
}

const INITIAL_TRAVELERS: Traveler[] = [
  { initials: 'JV', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=faces', name: 'Julian Vane', seat: 'Seat 04A', pnr: 'PNR: XV90', status: 'Checked-In', docs: 'verified', readiness: 'Boarding Ready', readinessColor: 'text-emerald-500' },
  { initials: 'ER', avatar: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=100&h=100&fit=crop', name: 'Elena Rodriguez', seat: 'Seat 12C', pnr: 'PNR: QW22', status: 'Pending', docs: 'missing-visa', readiness: 'Action Required', readinessColor: 'text-red-500' },
  { initials: 'MT', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=faces', name: 'Marcus Thorne', seat: 'Seat 01B', pnr: 'PNR: LK78', status: 'Checked-In', docs: 'expiring-doc', readiness: 'Alert: Verify', readinessColor: 'text-orange-500' },
  { initials: 'SJ', avatar: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=150&h=150&fit=crop', name: 'Sarah Jenkins', seat: 'Seat 22F', pnr: 'PNR: PL44', status: 'Not Started', docs: 'none', readiness: 'Waiting', readinessColor: 'text-gray-400' },
  { initials: 'RK', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop', name: 'Rohan Kapoor', seat: 'Seat 07D', pnr: 'PNR: MN55', status: 'Pending', docs: 'verified', readiness: 'Docs Pending', readinessColor: 'text-amber-500' },
  { initials: 'AL', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop', name: 'Amina Larsen', seat: 'Seat 16B', pnr: 'PNR: TR91', status: 'Checked-In', docs: 'verified', readiness: 'Boarding Ready', readinessColor: 'text-emerald-500' }
];

export function CheckInDashboardPage() {
  const [travelers, setTravelers] = useState<Traveler[]>(INITIAL_TRAVELERS);
  const [selectedNames, setSelectedNames] = useState<Set<string>>(new Set());
  const [showCompare, setShowCompare] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleBatchCheckInHeader = () => {
    if (selectedNames.size === 0) {
      // Check in all pending/not-started travelers
      setTravelers(prev => prev.map(t => ({
        ...t,
        status: 'Checked-In',
        readiness: 'Boarding Ready',
        readinessColor: 'text-emerald-500'
      })));
      triggerToast("✓ Batch Check-In: All travelers checked in successfully!");
    } else {
      setTravelers(prev => prev.map(t =>
        selectedNames.has(t.name) ? { ...t, status: 'Checked-In', readiness: 'Boarding Ready', readinessColor: 'text-emerald-500' } : t
      ));
      triggerToast(`✓ Batch Check-In: ${selectedNames.size} selected travelers checked in!`);
      setSelectedNames(new Set());
    }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-12 relative flex flex-col gap-2">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white text-xs px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-in slide-in-from-bottom-2 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="font-bold">{toastMsg}</span>
        </div>
      )}

      <CheckInFlightBar 
        onCompare={() => setShowCompare(true)}
        onBatchCheckIn={handleBatchCheckInHeader}
        onToggleFilters={() => triggerToast("Filters toggled: Use inline table filters.")}
      />
      <CheckInMetrics />

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6 items-start">
        <CheckInManifestTable 
          travelersList={travelers} 
          onUpdateTravelers={setTravelers}
          selectedNames={selectedNames}
          onUpdateSelected={setSelectedNames}
        />

        <div className="flex flex-col gap-6">
          <CheckInRouteCard />
          <CheckInVerificationAlerts />
          <CheckInLiveActivity />
        </div>
      </div>

      {/* Discrepancy Comparison Modal */}
      {showCompare && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowCompare(false)}>
          <div 
            className="bg-white rounded-3xl w-full max-w-2xl p-6 shadow-2xl border border-gray-100 flex flex-col gap-4 animate-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <div>
                <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-red-500" /> Flight vs Event Registration Comparison
                </h3>
                <p className="text-xs text-gray-500 mt-0.5 font-medium">Reconciling commercial airliner manifests with EventHub360 local guest rosters</p>
              </div>
              <button onClick={() => setShowCompare(false)} className="text-gray-400 hover:text-gray-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Comparison Audit List */}
            <div className="overflow-x-auto text-xs font-semibold text-gray-700">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50/50">
                    <th className="px-4 py-2">Guest Name</th>
                    <th className="px-4 py-2">Flight Manifest Record</th>
                    <th className="px-4 py-2">Event Registration Database</th>
                    <th className="px-4 py-2">Status Flag</th>
                    <th className="px-4 py-2 text-right">Escalation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <tr className="hover:bg-gray-50/30">
                    <td className="px-4 py-3 text-gray-900 font-bold">Julian Vane</td>
                    <td className="px-4 py-3 text-emerald-600">Seat 04A (Confirmed)</td>
                    <td className="px-4 py-3 text-emerald-600">VIP Ticket (Paid)</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-lg text-[9px]">Matched</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="text-[10px] text-gray-400 cursor-not-allowed">Reconciled</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50/30">
                    <td className="px-4 py-3 text-gray-900 font-bold">Elena Rodriguez</td>
                    <td className="px-4 py-3 text-amber-600">Seat 12C (Pending)</td>
                    <td className="px-4 py-3 text-red-500">Unregistered (Draft Room Only)</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 bg-red-50 text-red-700 rounded-lg text-[9px] flex items-center gap-1 w-20">
                        <AlertTriangle className="w-3 h-3 shrink-0" /> Reg Missing
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button 
                        onClick={() => triggerToast("📧 Verification email dispatched to Elena Rodriguez!")}
                        className="text-[10px] text-[#BC2C2C] hover:underline"
                      >
                        Force Invite
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50/30">
                    <td className="px-4 py-3 text-gray-900 font-bold">Sarah Jenkins</td>
                    <td className="px-4 py-3 text-red-500">No Booking Record</td>
                    <td className="px-4 py-3 text-emerald-600">VIP Speaker (Confirmed)</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 bg-red-50 text-red-700 rounded-lg text-[9px] flex items-center gap-1 w-20">
                        <AlertTriangle className="w-3 h-3 shrink-0" /> Flight Missing
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button 
                        onClick={() => triggerToast("✈️ Auto-booking flight ticket for Sarah Jenkins...")}
                        className="text-[10px] text-[#BC2C2C] hover:underline"
                      >
                        Auto-Book Flight
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50/30">
                    <td className="px-4 py-3 text-gray-900 font-bold">Rohan Kapoor</td>
                    <td className="px-4 py-3 text-amber-600">Seat 07D (Pending)</td>
                    <td className="px-4 py-3 text-amber-600">Exhibitor (Pending Payment)</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded-lg text-[9px]">Unpaid Balance</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button 
                        onClick={() => triggerToast("💸 Invoice reminder dispatched to Rohan Kapoor.")}
                        className="text-[10px] text-[#BC2C2C] hover:underline"
                      >
                        Send Invoice
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
              <button 
                onClick={() => setShowCompare(false)}
                className="px-5 py-2 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-gray-800"
              >
                Close Comparison
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
