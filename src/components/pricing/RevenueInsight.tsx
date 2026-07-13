import React from 'react';

export function RevenueInsight() {
  return (
    <div className="rounded-3xl shadow-md p-6 bg-gradient-to-br from-[#BC2C2C] to-[#8E1818] relative overflow-hidden">
      {/* Background overlay design (like an upward arrow/chart) */}
      <div className="absolute right-0 bottom-0 opacity-10 w-32 h-32 transform translate-x-4 translate-y-4">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 90 L40 50 L60 70 L90 10" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M60 10 L90 10 L90 40" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <h3 className="text-white font-bold text-lg mb-3 relative z-10">Revenue Insight</h3>
      
      <p className="text-red-50 text-sm leading-relaxed mb-6 max-w-[250px] relative z-10 opacity-90">
        Pricing rules applied last month generated an estimated ₹42k in additional revenue compared to static pricing.
      </p>

      <button className="bg-white text-[#9A1E1E] px-6 py-2.5 rounded-full text-sm font-bold shadow-sm hover:shadow-md transition-shadow relative z-10 hover:bg-gray-50">
        View Report
      </button>
    </div>
  );
}
