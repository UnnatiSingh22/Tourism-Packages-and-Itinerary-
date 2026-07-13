import React from 'react';
import { Lightbulb, ArrowRight, Plane, Utensils } from 'lucide-react';
import type { Supplier } from './SupplierCards';

export function ContractSummary({ selectedSupplier }: { selectedSupplier?: Supplier }) {
  return (
    <div className="flex flex-col gap-6">
      {/* Contract Comparison Summary */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-sm font-bold text-gray-900 mb-6">Contract Comparison Summary</h3>
        
        <div className="space-y-6">
          {selectedSupplier ? (
            <div>
              <h4 className="text-xs font-bold text-red-600 tracking-wide uppercase mb-2">
                Contract {selectedSupplier.contractNo} ({selectedSupplier.name})
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed mb-3">
                {selectedSupplier.terms}
              </p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-red-50 text-red-600 border border-red-100 text-[9px] font-bold uppercase tracking-widest rounded">
                  {selectedSupplier.terms.includes('Excl') ? 'Tax Excl.' : 'Tax Included'}
                </span>
                <span className="px-2 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 text-[9px] font-bold uppercase tracking-widest rounded">
                  {selectedSupplier.terms.toLowerCase().includes('cancel') || selectedSupplier.terms.toLowerCase().includes('refundable') ? 'Flexible' : 'Standard'}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-gray-400">Select a supplier to view details.</p>
          )}

          <div className="border-t border-gray-100 pt-6">
            <h4 className="text-xs font-bold text-gray-600 tracking-wide uppercase mb-2">Benchmarked Market Avg</h4>
            <p className="text-xs text-gray-500 leading-relaxed mb-3">
              Standard contract terms require 30-day notice with 20% non-refundable deposit.
            </p>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-gray-50 text-gray-500 border border-gray-200 text-[9px] font-bold uppercase tracking-widest rounded">Standard Tax</span>
              <span className="px-2 py-1 bg-orange-50 text-orange-600 border border-orange-100 text-[9px] font-bold uppercase tracking-widest rounded">Moderate Risk</span>
            </div>
          </div>
        </div>

        <button className="w-full mt-6 py-3 bg-white border border-red-200 text-red-600 text-sm font-bold rounded-xl hover:bg-red-50 transition-colors">
          Compare Legal Terms
        </button>
      </div>

      {/* Concierge Insight */}
      <div className="bg-[#1A1F36] rounded-3xl p-6 shadow-lg relative overflow-hidden">
        <div className="absolute right-[-30px] bottom-[-30px] opacity-[0.03] pointer-events-none">
          <Lightbulb className="w-40 h-40 text-white" />
        </div>
        <div className="relative z-10">
          <h3 className="text-[10px] font-bold text-orange-300 tracking-widest uppercase mb-4 flex items-center gap-2">
            <Lightbulb className="w-4 h-4" /> Concierge Insight
          </h3>
          <h4 className="text-sm font-bold text-white mb-3">Rate Peak Alert: Q3 Festival Season</h4>
          <p className="text-xs text-gray-300 leading-relaxed mb-6">
            Hotel inventory in Lucerne and Zurich is filling 20% faster than last year. We recommend securing contracts before the end of the month to lock in current Tier 1 pricing.
          </p>
          <button className="text-sm font-bold text-white flex items-center gap-2 hover:text-orange-300 transition-colors">
            View Forecast Report <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Active Negotiations */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-sm font-bold text-gray-900 mb-6">Active Negotiations</h3>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0">
              <Plane className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-bold text-gray-900">Luxe Jet Charters</span>
                <span className="text-xs font-bold text-gray-900">75%</span>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full">
                <div className="bg-red-500 h-1.5 rounded-full w-[75%]"></div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
              <Utensils className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-bold text-gray-900">Michelin Events Co.</span>
                <span className="text-xs font-bold text-gray-900">40%</span>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full">
                <div className="bg-emerald-500 h-1.5 rounded-full w-[40%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
