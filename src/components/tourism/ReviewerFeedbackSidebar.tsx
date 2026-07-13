import React from 'react';
import { Send, Plus } from 'lucide-react';

export function ReviewerFeedbackSidebar() {
  const feedback = [
    {
      author: 'Sarah Jenkins',
      time: '2h ago',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      text: 'The pricing for the private yacht in Amalfi seems a bit under-quoted compared to our latest vendor list. Please verify.',
      isSelf: false
    },
    {
      author: 'Me',
      time: '1h ago',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      text: 'Checking with the local concierge team now. Will update the line item by EOD.',
      isSelf: true
    },
    {
      author: 'Kevin Lee',
      time: '45m ago',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      text: 'Itinerary looks solid. Just ensure the VIP helicopter transfer has a backup landing site in Capri.',
      isSelf: false
    }
  ];

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full relative">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-900">Reviewer Feedback</h2>
        <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded">3 NEW</span>
      </div>
      
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        {feedback.map((msg, idx) => (
          <div key={idx} className={`flex flex-col ${msg.isSelf ? 'items-end' : 'items-start'}`}>
            <div className="flex items-center gap-2 mb-1.5 px-1">
              {!msg.isSelf && <img src={msg.avatar} alt={msg.author} className="w-5 h-5 rounded-full" />}
              <span className={`text-[10px] font-bold ${msg.isSelf ? 'text-[#BC2C2C]' : 'text-gray-900'}`}>{msg.author}</span>
              <span className="text-[9px] font-medium text-gray-400">{msg.time}</span>
              {msg.isSelf && <span className="text-[8px] px-1 bg-red-100 text-red-600 rounded ml-1 font-bold">YOU</span>}
            </div>
            <div className={`p-4 rounded-2xl text-xs leading-relaxed max-w-[85%] ${msg.isSelf ? 'bg-[#FDF3F2] text-[#8B2020] rounded-tr-sm' : 'bg-gray-50 text-gray-600 rounded-tl-sm'}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Add Button */}
      <button className="absolute right-6 bottom-24 w-12 h-12 bg-gradient-to-r from-[#BC2C2C] to-[#E65A4B] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow z-10">
        <Plus className="w-6 h-6" />
      </button>

      <div className="p-4 border-t border-gray-100 bg-white rounded-b-3xl">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Add a comment..." 
            className="w-full bg-gray-50 border-none rounded-xl pl-4 pr-10 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#BC2C2C]/30"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#BC2C2C] hover:text-[#8B2020] transition-colors p-1">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
