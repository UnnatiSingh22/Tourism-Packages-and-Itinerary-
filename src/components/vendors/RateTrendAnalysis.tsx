import React from 'react';
import { BarChart3 } from 'lucide-react';

export function RateTrendAnalysis() {
  const trends = [
    { supplier: 'AeroLux Transport', q1: '₹2,400', q2: '₹3,100', q2Highlight: true, q3: '₹2,600', variance: '+8%', varianceColor: 'text-emerald-500', status: 'ACTIVE', statusColor: 'text-emerald-600 bg-emerald-50' },
    { supplier: 'Platinum Chauffeur Co.', q1: '₹2,900', q2: '₹3,200', q2Highlight: false, q3: '₹3,000', variance: '+2%', varianceColor: 'text-emerald-500', status: 'REVIEW', statusColor: 'text-gray-600 bg-gray-100' },
    { supplier: 'Elite Logistics EU', q1: '₹1,850', q2: '₹2,100', q2Highlight: false, q3: '₹1,900', variance: '-5%', varianceColor: 'text-orange-500', status: 'ACTIVE', statusColor: 'text-emerald-600 bg-emerald-50' },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-sm font-bold text-red-600 mb-6 flex items-center gap-2">
        <BarChart3 className="w-4 h-4" /> Yearly Rate Trend Analysis
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="pb-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Supplier Name</th>
              <th className="pb-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest text-right">Q1 Rate</th>
              <th className="pb-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest text-right">Q2 Peak</th>
              <th className="pb-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest text-right">Q3 Rate</th>
              <th className="pb-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest text-right">Variance</th>
              <th className="pb-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {trends.map((item, idx) => (
              <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                <td className="py-4 text-sm font-bold text-gray-900">{item.supplier}</td>
                <td className="py-4 text-sm font-medium text-gray-600 text-right">{item.q1}</td>
                <td className={`py-4 text-sm font-bold text-right ${item.q2Highlight ? 'text-red-600' : 'text-gray-900'}`}>{item.q2}</td>
                <td className="py-4 text-sm font-medium text-gray-600 text-right">{item.q3}</td>
                <td className={`py-4 text-sm font-bold text-right ${item.varianceColor}`}>{item.variance}</td>
                <td className="py-4 text-right">
                  <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold tracking-widest uppercase ${item.statusColor}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
