import React from 'react';
import { GitBranch, Plus, Edit2, Trash2, ArrowRightLeft } from 'lucide-react';
import { formatRupee } from '../../lib/utils';

export function RuleBuilder() {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3 text-gray-800">
          <div className="p-2 bg-red-50 rounded-lg text-[#E65A4B]">
            <GitBranch className="w-5 h-5" />
          </div>
          <h2 className="text-sm font-semibold">Rule Builder</h2>
        </div>
        <button className="text-[#E65A4B] text-xs font-bold flex items-center gap-1.5 hover:text-red-700 transition-colors">
          <Plus className="w-4 h-4" /> Add New Rule
        </button>
      </div>

      <div className="space-y-4 flex-1">
        {/* Destination Discount Rule */}
        <div className="border border-red-200 rounded-2xl p-5 relative bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-bold text-gray-800 tracking-widest uppercase">Active Rule: Destination Discount</h3>
            <div className="flex gap-3 text-gray-400">
              <button className="hover:text-gray-700 transition-colors"><Edit2 className="w-4 h-4" /></button>
              <button className="hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2.5 text-sm">
            <span className="px-3 py-1 bg-yellow-100/60 text-yellow-700 font-bold rounded-md">IF</span>
            <span className="text-gray-600 font-medium italic">Destination is</span>
            <span className="px-3 py-1 bg-red-50 text-[#E65A4B] font-bold rounded-md shadow-sm border border-red-100">Santorini, Greece</span>
            
            <span className="px-3 py-1 bg-yellow-100/60 text-yellow-700 font-bold rounded-md">AND</span>
            <span className="text-gray-600 font-medium italic">Duration is {'>'}</span>
            <span className="px-3 py-1 bg-purple-50 text-purple-600 font-bold rounded-md shadow-sm border border-purple-100">5 Nights</span>
            
            <span className="px-3 py-1 bg-[#E65A4B] text-white font-bold rounded-md ml-2">THEN</span>
            <span className="text-gray-600 font-medium italic">Apply discount of</span>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 font-bold rounded-md shadow-sm border border-emerald-100">15% OFF</span>
          </div>
        </div>

        {/* Group Pricing Rule */}
        <div className="border border-emerald-200 rounded-2xl p-5 relative bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-bold text-gray-800 tracking-widest uppercase">Active Rule: Group Pricing</h3>
            <div className="flex gap-3 text-gray-400">
              <button className="hover:text-gray-700 transition-colors"><Edit2 className="w-4 h-4" /></button>
              <button className="hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2.5 text-sm">
            <span className="px-3 py-1 bg-yellow-100/60 text-yellow-700 font-bold rounded-md">IF</span>
            <span className="text-gray-600 font-medium italic">Guest Count is ≥</span>
            <span className="px-3 py-1 bg-purple-50 text-purple-600 font-bold rounded-md shadow-sm border border-purple-100">10 Adults</span>
            
            <span className="px-3 py-1 bg-[#E65A4B] text-white font-bold rounded-md ml-2">THEN</span>
            <span className="text-gray-600 font-medium italic">Reduce base price by</span>
            <span className="px-3 py-1 bg-teal-50 text-teal-600 font-bold rounded-md shadow-sm border border-teal-100">{formatRupee(200)} Fixed</span>
          </div>
        </div>

        {/* Drag and Drop Zone */}
        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center text-gray-400 bg-gray-50/50 mt-6">
          <ArrowRightLeft className="w-6 h-6 mb-3 text-gray-300" />
          <p className="text-sm font-semibold text-gray-500">Drag logic blocks here to define new pricing behaviors</p>
        </div>
      </div>
    </div>
  );
}
