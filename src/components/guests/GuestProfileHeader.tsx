import React from 'react';
import { Mail, Phone, ShieldCheck } from 'lucide-react';

export function GuestProfileHeader() {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 mb-6 relative overflow-hidden">
      {/* Decorative background blob */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FDF3F2] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-60 pointer-events-none"></div>

      <div className="shrink-0 relative z-10">
        <img 
          src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" 
          alt="Isabella Rossi" 
          className="w-32 h-32 rounded-2xl object-cover shadow-sm"
        />
      </div>

      <div className="flex-1 relative z-10 flex flex-col justify-center">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Isabella Rossi</h1>
            <p className="text-sm font-semibold text-gray-600">
              Global Citizen • Platinum Explorer • Milan, IT
            </p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold shadow-sm border border-emerald-100/50">
            <ShieldCheck className="w-4 h-4" />
            Verified Profile
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mt-6">
          <div>
            <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1.5">Contact Information</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Mail className="w-4 h-4 text-[#BC2C2C]" />
                isabella.rossi@traveler.com
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Phone className="w-4 h-4 text-[#BC2C2C]" />
                +39 333 456 7890
              </div>
            </div>
          </div>
          
          <div>
            <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1.5">Emergency Contact</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                Marco Rossi (Brother)
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                +39 347 112 2334
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
