import React from 'react';
import { ArrowRight } from 'lucide-react';

export function PricingTrendsChart() {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
      <h2 className="text-lg font-bold text-gray-900 mb-1">Pricing Trends</h2>
      <p className="text-xs font-medium text-gray-500 mb-8">Market vs. Internal Average</p>
      
      <div className="flex-1 flex flex-col justify-end relative h-40 mb-6">
        {/* Mock Chart SVG */}
        <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible" preserveAspectRatio="none">
          <path d="M0,40 Q25,10 50,30 T100,5" fill="none" stroke="#8338EC" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          <path d="M0,45 Q25,30 50,40 T100,20" fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span>
        </div>
      </div>

      <div className="space-y-3 mt-8">
        <div className="flex justify-between items-center p-3 rounded-xl bg-purple-50">
          <span className="text-xs font-bold text-purple-700">Our Portfolio</span>
          <span className="text-xs font-bold text-purple-700">↑ 14%</span>
        </div>
        <div className="flex justify-between items-center p-3 rounded-xl bg-amber-50">
          <span className="text-xs font-bold text-amber-700">Market Median</span>
          <span className="text-xs font-bold text-amber-700">↑ 8%</span>
        </div>
      </div>
    </div>
  );
}

export function OccupancyHealthChart() {
  return (
    <div className="bg-indigo-50/50 rounded-3xl shadow-sm border border-indigo-50 p-6 flex flex-col h-full">
      <h2 className="text-lg font-bold text-gray-900 mb-1">Occupancy Health</h2>
      <p className="text-xs font-medium text-gray-500 mb-8 leading-relaxed pr-8">
        Distribution across your managed assets
      </p>

      <div className="space-y-6 flex-1">
        <div>
          <div className="flex justify-between text-xs font-bold text-gray-700 mb-2">
            <span>Boutique Hotels</span>
            <span>92%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
            <div className="h-full bg-[#BC2C2C] w-[92%]"></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs font-bold text-gray-700 mb-2">
            <span>Resort Villas</span>
            <span>64%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
            <div className="h-full bg-orange-400 w-[64%]"></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs font-bold text-gray-700 mb-2">
            <span>Urban Lofts</span>
            <span>81%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
            <div className="h-full bg-amber-800 w-[81%]"></div>
          </div>
        </div>
      </div>

      <button className="text-sm font-bold text-[#BC2C2C] flex items-center gap-1 hover:text-[#8B2020] transition-colors mt-6">
        View occupancy details <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

export function ProactiveInsightCard() {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row gap-8 overflow-hidden relative">
      <div className="flex-1 z-10">
        <span className="px-3 py-1 bg-[#FDF3F2] text-[#BC2C2C] text-[10px] font-bold tracking-widest uppercase rounded">Proactive Insight</span>
        <h2 className="text-2xl font-bold text-gray-900 mt-4 mb-4">
          Projected High-Demand Window: Q4 2024
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-8 max-w-sm">
          Historical analysis suggests a 30% surge in wedding bookings for the London and Paris portfolios. We recommend implementing a 15% luxury surcharge on peak weekend dates.
        </p>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-[#8B2020] text-white text-sm font-bold rounded-xl hover:bg-[#721515] transition-colors shadow-sm">
            Apply Dynamic Pricing
          </button>
          <button className="px-6 py-3 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
            Export Report
          </button>
        </div>
      </div>

      <div className="w-full md:w-64 h-48 md:h-auto shrink-0 relative rounded-2xl overflow-hidden shadow-sm z-10">
        <img 
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
          alt="Venue" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
      
      {/* Background Blob */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-red-50 rounded-full blur-3xl translate-y-1/2 translate-x-1/3 opacity-50"></div>
    </div>
  );
}
