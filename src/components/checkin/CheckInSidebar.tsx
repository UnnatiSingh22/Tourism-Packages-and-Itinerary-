import React from 'react';
import {
  LayoutDashboard,
  Users,
  Calendar,
  TrendingUp,
  Building2,
  ClipboardList,
  Bot,
  Settings,
  HelpCircle,
  LogOut,
  Plus,
} from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: Users, label: 'Guests', active: true },
  { icon: Calendar, label: 'Events' },
  { icon: TrendingUp, label: 'Sales' },
  { icon: Building2, label: 'Hotels' },
  { icon: ClipboardList, label: 'Analytics' },
  { icon: Bot, label: 'AI Hub' },
];

export function CheckInSidebar() {
  return (
    <aside className="w-[220px] shrink-0 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0">
      {/* Brand */}
      <div className="px-6 pt-6 pb-5">
        <h2 className="text-[#BC2C2C] text-lg font-bold tracking-tight">EventHub360</h2>
        <p className="text-[10px] font-medium text-gray-400 tracking-wide">Premium Concierge</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 flex flex-col gap-1">
        {navItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-colors',
              item.active
                ? 'bg-red-50 text-[#BC2C2C]'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
            )}
          >
            <item.icon className="w-[17px] h-[17px]" />
            {item.label}
          </a>
        ))}

        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
        >
          <Settings className="w-[17px] h-[17px]" />
          Settings
        </a>
      </nav>

      {/* CTA */}
      <div className="px-3 mb-4">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#A02020] hover:bg-[#8B2020] text-white text-[13px] font-semibold rounded-xl transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          Create Event
        </button>
      </div>

      {/* Footer links */}
      <div className="px-3 mb-6 flex flex-col gap-1 border-t border-gray-100 pt-4">
        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
        >
          <HelpCircle className="w-[17px] h-[17px]" />
          Help Center
        </a>
        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
        >
          <LogOut className="w-[17px] h-[17px]" />
          Logout
        </a>
      </div>
    </aside>
  );
}
