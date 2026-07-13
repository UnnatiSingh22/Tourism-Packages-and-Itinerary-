import React from 'react';
import { MessageSquare } from 'lucide-react';

export function ConciergeCard() {
  return (
    <div className="bg-white rounded-3xl shadow-md border-2 border-transparent p-1 bg-gradient-to-br from-[#E65A4B] to-[#F17361] overflow-hidden">
      <div className="bg-white rounded-[22px] p-5 h-full">
        <div className="flex items-center gap-3 mb-4">
          <img 
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
            alt="Concierge" 
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-bold text-gray-900 text-sm">Marco Rossi</p>
            <p className="text-xs text-gray-500 font-medium">Lead Guest Experience</p>
          </div>
        </div>

        <p className="text-sm text-gray-600 italic mb-5 leading-relaxed">
          "I've personally vetted the yacht captain and kitchen staff for Day 2. Everything is set for an unforgettable launch."
        </p>

        <button className="w-full py-3 bg-gray-50 hover:bg-gray-100 transition-colors rounded-xl flex items-center justify-center gap-2 text-sm font-semibold text-gray-700">
          <MessageSquare className="w-4 h-4" />
          Instant Message
        </button>
      </div>
    </div>
  );
}
