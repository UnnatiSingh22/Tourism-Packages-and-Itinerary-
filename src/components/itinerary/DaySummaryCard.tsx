import React from 'react';
import { MessageSquare } from 'lucide-react';

export function DaySummaryCard() {
  return (
    <div className="bg-white rounded-[24px] shadow-card p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Day Summary</h3>
      
      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500 font-medium">Scheduled Duration</span>
          <span className="font-bold text-gray-900">4.5 Hours</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500 font-medium">Confirmed Suppliers</span>
          <span className="font-bold text-emerald-600">2/2</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500 font-medium">Estimated Spend</span>
          <span className="font-bold text-gray-900">€3,450.00</span>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-100">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Today's Concierge</h4>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
              alt="Concierge" 
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-gray-900 text-sm">Sarah Jenkins</p>
              <p className="text-xs text-gray-500 font-medium">On-Site Coordinator</p>
            </div>
          </div>
          <button className="p-2 text-[#E65A4B] bg-[#FDF3F2] rounded-lg hover:bg-[#FCE7E5] transition-colors">
            <MessageSquare className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
