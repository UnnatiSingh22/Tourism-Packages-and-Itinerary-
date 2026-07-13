import React, { useState } from 'react';
import { Check, X, ShieldAlert } from 'lucide-react';
import { useMasterData } from '../../context/MasterDataContext';

export function PendingRequests() {
  const { masters } = useMasterData();
  const [requests, setRequests] = useState(() => {
    const activeDrivers = masters.staff.filter(s => s.role === 'Driver' && s.status === 'Active');
    const driverName1 = activeDrivers[0]?.name || 'David Chen';
    const driverName2 = activeDrivers[1]?.name || 'A. Miller';
    const driverName3 = activeDrivers[2]?.name || 'S. Wu';

    return [
      {
        id: 1,
        type: 'Leave Request: June 15',
        driver: driverName1,
        detail: 'Personal',
        color: 'border-l-[#8338EC]',
        status: 'pending' // 'pending', 'approved', 'rejected'
      },
      {
        id: 2,
        type: 'Shift Swap Request',
        driver: `${driverName2} → ${driverName3}`,
        detail: 'Shift Swap',
        color: 'border-l-[#FF7096]',
        status: 'pending'
      }
    ];
  });

  const handleAction = (id: number, action: 'approved' | 'rejected') => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: action } : r));
  };

  const pendingCount = requests.filter(r => r.status === 'pending').length;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Pending Requests</h3>
        {pendingCount > 0 ? (
          <span className="w-5 h-5 rounded-full bg-[#8338EC] text-white text-[10px] font-bold flex items-center justify-center transition-all duration-300">
            {pendingCount}
          </span>
        ) : (
          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[9px] font-bold uppercase rounded border border-emerald-100">
            All Clear
          </span>
        )}
      </div>

      <div className="space-y-4">
        {requests.map(req => {
          const isPending = req.status === 'pending';
          const isApproved = req.status === 'approved';
          const isRejected = req.status === 'rejected';

          return (
            <div 
              key={req.id} 
              className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 border-l-[3px] transition-all duration-300 ${req.color} ${
                isApproved 
                  ? 'opacity-80 bg-emerald-50/10' 
                  : isRejected 
                    ? 'opacity-80 bg-red-50/10' 
                    : ''
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className={`text-sm font-bold transition-all ${isRejected ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                  {req.type}
                </h4>
                
                <div className="flex gap-2 shrink-0">
                  {isPending ? (
                    <>
                      <button 
                        onClick={() => handleAction(req.id, 'approved')}
                        className="text-gray-400 hover:text-emerald-600 transition-colors p-1"
                        title="Approve Request"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleAction(req.id, 'rejected')}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        title="Reject Request"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : isApproved ? (
                    <span className="text-[9px] bg-emerald-50 text-emerald-600 font-bold px-1.5 py-0.5 rounded border border-emerald-100 uppercase tracking-wider">
                      Approved
                    </span>
                  ) : (
                    <span className="text-[9px] bg-red-50 text-red-600 font-bold px-1.5 py-0.5 rounded border border-red-100 uppercase tracking-wider">
                      Rejected
                    </span>
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-500">{req.driver} • {req.detail}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
