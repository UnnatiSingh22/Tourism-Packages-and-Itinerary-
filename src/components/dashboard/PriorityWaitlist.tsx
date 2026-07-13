import React from 'react';

export function PriorityWaitlist({ selectedMonth = 'September 2024' }: { selectedMonth?: string }) {
  const waitlistData = {
    'September 2024': [
      { id: 'wt-sep-1', initials: 'JD', name: 'Julianne Devoir', tier: 'Platinum', detail: 'Requesting: Alps Expedition (Sep 12)', time: 'Added 2h ago', bg: 'bg-amber-50 text-amber-600' },
      { id: 'wt-sep-2', initials: 'MK', name: 'Marcus Knight', tier: '', detail: 'Requesting: Safari Private (Sep 13)', time: 'Added 5h ago', bg: 'bg-purple-50 text-purple-600' }
    ],
    'October 2024': [
      { id: 'wt-oct-1', initials: 'JD', name: 'Julianne Devoir', tier: 'Platinum', detail: 'Requesting: Kyoto Autumn (Oct 14)', time: 'Added 1h ago', bg: 'bg-amber-50 text-amber-600' },
      { id: 'wt-oct-2', initials: 'MK', name: 'Marcus Knight', tier: '', detail: 'Requesting: Tuscany Wine Tour (Oct 15)', time: 'Added 4h ago', bg: 'bg-purple-50 text-purple-600' }
    ],
    'November 2024': [
      { id: 'wt-nov-1', initials: 'JD', name: 'Julianne Devoir', tier: 'Platinum', detail: 'Requesting: Alps Expedition (Nov 12)', time: 'Added 3h ago', bg: 'bg-amber-50 text-amber-600' },
      { id: 'wt-nov-2', initials: 'MK', name: 'Marcus Knight', tier: '', detail: 'Requesting: Tuscany Wine Tour (Nov 15)', time: 'Added 6h ago', bg: 'bg-purple-50 text-purple-600' }
    ]
  };

  const list = waitlistData[selectedMonth as keyof typeof waitlistData] || waitlistData['September 2024'];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
        <h2 className="text-sm font-bold text-gray-900">Priority Waitlist</h2>
        <button 
          onClick={() => window.location.href = '/guests/waitlist'}
          className="text-xs font-bold text-[#BC2C2C] hover:text-[#8B2020] transition-colors"
        >
          View All Waitlists
        </button>
      </div>

      <div className="space-y-4">
        {list.map((item) => (
          <div key={item.id} className="flex items-center justify-between pb-4 border-b border-gray-50 last:border-0 last:pb-0">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full font-bold flex items-center justify-center text-xs ${item.bg}`}>
                {item.initials}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-bold text-gray-900">{item.name}</span>
                  {item.tier && (
                    <span className="text-[9px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded tracking-widest uppercase">{item.tier}</span>
                  )}
                </div>
                <p className="text-[11px] font-medium text-gray-500">{item.detail}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-[10px] font-bold text-gray-400">{item.time}</span>
              <button 
                onClick={() => window.location.href = '/guests/waitlist'}
                className="px-4 py-1.5 bg-[#FDF3F2] text-[#BC2C2C] text-xs font-bold rounded-lg hover:bg-red-50 transition-colors"
              >
                Assign Seat
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
