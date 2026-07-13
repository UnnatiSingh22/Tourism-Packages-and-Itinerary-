import React from 'react';
import { History, ArrowRight } from 'lucide-react';

export function AuditTrail() {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 text-gray-800">
          <History className="w-5 h-5 text-gray-500" />
          <h2 className="text-sm font-semibold">Audit Trail</h2>
        </div>
        <span className="text-[10px] text-gray-400 font-medium">Displaying last 24 hours activity</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 mb-6">
        {/* Item 1 */}
        <div className="flex gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors">
          <img 
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
            alt="Sarah Jenkins" 
            className="w-10 h-10 rounded-full object-cover shrink-0"
          />
          <div className="flex flex-col justify-center">
            <p className="text-xs font-bold text-gray-900 leading-tight">Sarah Jenkins</p>
            <p className="text-xs text-gray-500 my-1">Modified 'Peak Summer High' percentage</p>
            <p className="text-[10px] font-bold text-[#E65A4B] uppercase tracking-wider">2 HOURS AGO</p>
          </div>
        </div>

        {/* Item 2 */}
        <div className="flex gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors border-l border-transparent md:border-gray-100">
          <img 
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
            alt="Marcus Thorne" 
            className="w-10 h-10 rounded-full object-cover shrink-0"
          />
          <div className="flex flex-col justify-center">
            <p className="text-xs font-bold text-gray-900 leading-tight">Marcus Thorne</p>
            <p className="text-xs text-gray-500 my-1">Approved 'Early Bird 2024' promotion</p>
            <p className="text-[10px] font-bold text-[#E65A4B] uppercase tracking-wider">5 HOURS AGO</p>
          </div>
        </div>

        {/* Item 3 */}
        <div className="flex gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors border-l border-transparent md:border-gray-100">
          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
            alt="System Automator" 
            className="w-10 h-10 rounded-full object-cover shrink-0"
          />
          <div className="flex flex-col justify-center">
            <p className="text-xs font-bold text-gray-900 leading-tight">System Automator</p>
            <p className="text-xs text-gray-500 my-1">Archived expired rule 'Spring Break special'</p>
            <p className="text-[10px] font-bold text-[#E65A4B] uppercase tracking-wider">YESTERDAY, 11:45 PM</p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-4 text-center">
        <button className="text-xs font-semibold text-gray-500 hover:text-gray-800 transition-colors inline-flex items-center gap-1.5">
          View Complete Modification History <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
