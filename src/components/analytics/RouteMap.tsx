import React, { useState } from 'react';
import { Layers, TrafficCone, AlertTriangle, AlertCircle, X, MapPin } from 'lucide-react';

export function RouteMap() {
  const [selectedRoute, setSelectedRoute] = useState<'main' | 'alternate'>('main');

  return (
    <div className="relative w-full h-[600px] bg-[#111827] rounded-3xl overflow-hidden shadow-inner border border-gray-800">
      {/* Mock Map Background Layer */}
      <div 
        className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')]"
        style={{ backgroundSize: 'cover', backgroundPosition: 'center', filter: 'invert(1) contrast(1.2)' }}
      />
      
      {/* Grid line overlay to simulate map coordinates */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* Realistic street road lines and animations */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 600">
        <defs>
          <linearGradient id="mainRouteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="altRouteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>

        {/* Gray Background Street Network Grid */}
        <path 
          d="M 50 100 H 750 M 50 250 H 750 M 50 400 H 750 M 50 520 H 750 M 150 50 V 550 M 350 50 V 550 M 550 50 V 550 M 680 50 V 550" 
          fill="none" 
          stroke="#1f2937" 
          strokeWidth="1.5" 
        />

        {/* Diagonal avenues to simulate complex urban grid */}
        <path 
          d="M 50 50 L 750 520 M 750 50 L 50 520" 
          fill="none" 
          stroke="#1f2937" 
          strokeWidth="1" 
        />

        {/* SELECTED ROUTE: MAIN (GLOWING EMERALD ROAD SEGMENTS) */}
        {selectedRoute === 'main' ? (
          <>
            {/* Outline Glow */}
            <path 
              d="M 150 250 H 350 V 100 H 550 V 400 H 680 V 520" 
              fill="none" 
              stroke="#10B981" 
              strokeWidth="6" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="opacity-25"
            />
            {/* Core Road */}
            <path 
              id="mainPath"
              d="M 150 250 H 350 V 100 H 550 V 400 H 680 V 520" 
              fill="none" 
              stroke="url(#mainRouteGrad)" 
              strokeWidth="3.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            
            {/* Animated Car Node moving along path */}
            <circle r="6" fill="#ffffff" stroke="#10B981" strokeWidth="2.5" className="shadow-lg">
              <animateMotion dur="14s" repeatCount="indefinite" rotate="auto">
                <mpath href="#mainPath" />
              </animateMotion>
            </circle>
          </>
        ) : (
          /* ALTERNATE ROUTE (GLOWING AMBER ROAD SEGMENTS) */
          <>
            {/* Outline Glow */}
            <path 
              d="M 150 250 V 400 H 350 V 520 H 680" 
              fill="none" 
              stroke="#F59E0B" 
              strokeWidth="6" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="opacity-25"
            />
            {/* Core Road */}
            <path 
              id="altPath"
              d="M 150 250 V 400 H 350 V 520 H 680" 
              fill="none" 
              stroke="url(#altRouteGrad)" 
              strokeWidth="3.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />

            {/* Animated Car Node moving along alternate path */}
            <circle r="6" fill="#ffffff" stroke="#F59E0B" strokeWidth="2.5" className="shadow-lg">
              <animateMotion dur="11s" repeatCount="indefinite" rotate="auto">
                <mpath href="#altPath" />
              </animateMotion>
            </circle>
          </>
        )}

        {/* Traffic Jam Alert Section (Glowing Red Segment) */}
        <path 
          d="M 550 220 V 320" 
          fill="none" 
          stroke="#EF4444" 
          strokeWidth="4" 
          strokeLinecap="round"
          className="animate-pulse"
        />

        {/* Route Nodes Pin Markers */}
        <circle cx="150" cy="250" r="7" fill="#10B981" stroke="#ffffff" strokeWidth="2" />
        <circle cx="680" cy="520" r="7" fill="#EF4444" stroke="#ffffff" strokeWidth="2" />

        {/* Map Label Overlays */}
        <text x="160" y="240" fill="#9CA3AF" fontSize="9" fontWeight="bold" fontFamily="monospace">DEP: Cannes Plaza</text>
        <text x="690" y="515" fill="#9CA3AF" fontSize="9" fontWeight="bold" fontFamily="monospace">DEST: Nice Terminal</text>
        
        {/* Street names text along the grid */}
        <text x="210" y="90" fill="#4B5563" fontSize="8" fontWeight="bold">Rue de l'Aéroport</text>
        <text x="410" y="240" fill="#4B5563" fontSize="8" fontWeight="bold">Boulevard de la Côte</text>
        <text x="560" y="380" fill="#EF4444" fontSize="8" fontWeight="black" className="animate-pulse">Avenue Congestion</text>
      </svg>

      {/* Route Switcher overlay */}
      <div className="absolute top-6 right-6 bg-gray-900/90 backdrop-blur-md rounded-2xl border border-gray-800 p-2.5 flex items-center gap-2 shadow-lg">
        <button 
          onClick={() => setSelectedRoute('main')}
          className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${selectedRoute === 'main' ? 'bg-[#10B981] text-white shadow' : 'text-gray-400 hover:text-white'}`}
        >
          Main Route
        </button>
        <button 
          onClick={() => setSelectedRoute('alternate')}
          className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${selectedRoute === 'alternate' ? 'bg-[#F59E0B] text-white shadow' : 'text-gray-400 hover:text-white'}`}
        >
          Alt Route
        </button>
      </div>

      {/* Map Controls */}
      <div className="absolute top-6 left-6 flex flex-col gap-2">
        <button className="w-10 h-10 bg-gray-900/90 backdrop-blur border border-gray-800 rounded-xl shadow-sm flex items-center justify-center text-gray-400 hover:text-white transition-colors">
          <Layers className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 bg-gray-900/90 backdrop-blur border border-gray-800 rounded-xl shadow-sm flex items-center justify-center text-gray-400 hover:text-white transition-colors">
          <TrafficCone className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom Alerts overlay */}
      <div className="absolute bottom-6 left-6 flex flex-col gap-3 w-[320px]">
        {/* Alert 1 */}
        <div className="bg-gray-900/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border-l-4 border-red-500 border border-gray-800 relative">
          <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-300"><X className="w-4 h-4"/></button>
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-white leading-tight mb-1">Heavy Traffic: Avenue Congestion</p>
              <p className="text-[10px] text-gray-400 leading-relaxed font-semibold">Port logistics closure. Main route detour active.</p>
              <p className="text-[10px] font-bold text-[#10B981] mt-0.5">Est. delay: +12 mins.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
