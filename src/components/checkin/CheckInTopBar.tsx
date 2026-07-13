import React from 'react';
import { LayoutGrid, Search, Bell, MessageSquare } from 'lucide-react';

export function CheckInTopBar() {
  return (
    <header className="h-14 bg-[#15161A] flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Left: logo + title */}
      <div className="flex items-center gap-3">
        <LayoutGrid className="w-5 h-5 text-white" />
        <h1 className="text-white text-[15px] font-semibold tracking-tight">
          Traveler Check-In Dashboard
        </h1>
      </div>

      {/* Center: dotted divider (decorative, matches reference) */}
      <div className="hidden lg:flex items-center gap-1.5 flex-1 justify-center px-12">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className="w-1 h-1 rounded-full bg-white/15" />
        ))}
      </div>

      {/* Right: search + nav + profile */}
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-2 text-white/50 w-56">
          <Search className="w-4 h-4" />
          <input
            type="text"
            placeholder="Search travelers or departure ID..."
            className="bg-transparent border-none text-[13px] text-white placeholder:text-white/40 focus:outline-none w-full"
          />
        </div>

        <nav className="hidden md:flex items-center gap-5 text-[13px] font-medium">
          <a href="#" className="text-white/60 hover:text-white transition-colors">Directory</a>
          <a href="#" className="text-[#F0635A] border-b-2 border-[#F0635A] pb-[18px] mt-[18px]">Resources</a>
        </nav>

        <div className="flex items-center gap-3 text-white/50">
          <button className="hover:text-white transition-colors">
            <Bell className="w-[18px] h-[18px]" />
          </button>
          <button className="hover:text-white transition-colors">
            <MessageSquare className="w-[18px] h-[18px]" />
          </button>
        </div>

        <div className="flex items-center gap-2.5 pl-4 border-l border-white/10">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Alex Rivera"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="hidden lg:block leading-tight">
            <p className="text-white text-[12px] font-semibold">Alex Rivera</p>
            <p className="text-white/40 text-[9px] font-bold tracking-wider uppercase">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}
