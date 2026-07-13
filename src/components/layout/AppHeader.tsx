import React from 'react';
import { Search, Bell, MessageSquare } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import { useLocation } from 'react-router-dom';

export function AppHeader() {
  const { currency, setCurrency, activeHeaderTab, setActiveHeaderTab } = useCurrency();
  const location = useLocation();

  const handleGlobalExport = () => {
    const pageName = location.pathname.split('/').pop() || 'dashboard';
    const csvContent = `data:text/csv;charset=utf-8,Export Type,Timestamp,Scope,Currency,Tab Mode\nEventHub360 Global Export,${new Date().toISOString()},${pageName},${currency},${activeHeaderTab}\n`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `eventhub360_${pageName}_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <header className="fixed top-0 right-0 left-[240px] h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 z-10 flex items-center justify-between px-8">
      {/* Left: Search & Nav */}
      <div className="flex items-center gap-8 flex-1">
        <div className="relative w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search analytics..."
            className="w-full pl-9 pr-4 py-2 bg-transparent border-none text-sm focus:outline-none placeholder:text-gray-400"
          />
        </div>

        <nav className="flex items-center gap-6 text-sm font-medium text-gray-500 h-full">
          <button 
            onClick={() => setActiveHeaderTab('overview')} 
            className={`h-20 flex items-center transition-colors border-b-2 ${activeHeaderTab === 'overview' ? 'text-[#BC2C2C] border-[#BC2C2C] font-bold' : 'border-transparent hover:text-gray-900'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveHeaderTab('reports')} 
            className={`h-20 flex items-center transition-colors border-b-2 ${activeHeaderTab === 'reports' ? 'text-[#BC2C2C] border-[#BC2C2C] font-bold' : 'border-transparent hover:text-gray-900'}`}
          >
            Reports
          </button>
        </nav>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4 text-gray-400 mr-2">
          <button className="hover:text-gray-600 transition-colors relative">
            <Bell className="w-5 h-5" />
          </button>
          <button className="hover:text-gray-600 transition-colors">
            <MessageSquare className="w-5 h-5" />
          </button>
        </div>

        {/* Currency Selector */}
        <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl p-1 shrink-0">
          <button
            onClick={() => setCurrency('INR')}
            className={`px-3 py-1.5 text-xs font-black transition-all rounded-lg ${currency === 'INR' ? 'bg-[#BC2C2C] text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
          >
            ₹ INR
          </button>
          <button
            onClick={() => setCurrency('USD')}
            className={`px-3 py-1.5 text-xs font-black transition-all rounded-lg ${currency === 'USD' ? 'bg-[#BC2C2C] text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
          >
            $ USD
          </button>
          <button
            onClick={() => setCurrency('EUR')}
            className={`px-3 py-1.5 text-xs font-black transition-all rounded-lg ${currency === 'EUR' ? 'bg-[#BC2C2C] text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
          >
            € EUR
          </button>
        </div>

        <button 
          onClick={handleGlobalExport}
          className="px-5 py-2.5 bg-[#A02020] hover:bg-[#8B2020] text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
        >
          Export Data
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-gray-200 cursor-pointer group">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Profile"
            className="w-9 h-9 rounded-full ring-2 ring-transparent group-hover:ring-gray-200 transition-all object-cover"
          />
        </div>
      </div>
    </header>
  );
}
