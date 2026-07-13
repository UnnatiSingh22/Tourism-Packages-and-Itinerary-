import React from 'react';
import { Tag, Plane, Users, Medal, Plus } from 'lucide-react';

export function Promotions() {
  const promos = [
    {
      id: 1,
      icon: <Plane className="w-4 h-4" />,
      title: 'Early Bird 2024',
      subtitle: 'Ends in 12 days',
      badge: '20%',
      badgeColor: 'bg-red-50 text-[#E65A4B]'
    },
    {
      id: 2,
      icon: <Users className="w-4 h-4" />,
      title: 'Family Summer Pack',
      subtitle: 'Active',
      badge: 'Buy 3\nGet 1',
      badgeColor: 'bg-red-50 text-[#E65A4B]'
    },
    {
      id: 3,
      icon: <Medal className="w-4 h-4" />,
      title: 'VIP Referral',
      subtitle: 'Active',
      badge: '10%',
      badgeColor: 'bg-red-50 text-[#E65A4B]'
    }
  ];

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-6">
      <div className="flex items-center gap-3 text-gray-800 mb-6">
        <div className="p-2 bg-red-50 rounded-lg text-[#E65A4B]">
          <Tag className="w-5 h-5" />
        </div>
        <h2 className="text-sm font-semibold">Promotions</h2>
      </div>

      <div className="space-y-3 mb-6">
        {promos.map((promo) => (
          <div key={promo.id} className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#E65A4B]">
                {promo.icon}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{promo.title}</p>
                <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">{promo.subtitle}</p>
              </div>
            </div>
            <div className={`px-3 py-1.5 rounded-lg text-xs font-bold text-center leading-tight ${promo.badgeColor}`}>
              {promo.badge}
            </div>
          </div>
        ))}
      </div>

      <button className="w-full py-3 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-semibold text-sm hover:border-gray-300 hover:text-gray-500 transition-colors flex items-center justify-center gap-2">
        <Plus className="w-4 h-4" /> New Promotion
      </button>
    </div>
  );
}
