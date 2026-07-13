import React from 'react';
import { LocateFixed, Map as MapIcon, Satellite } from 'lucide-react';

export function TelemetryMap({ selectedRegion = 'All' }: { selectedRegion?: string }) {
  const getMarkers = () => {
    switch (selectedRegion) {
      case 'Europe':
        return [
          { name: 'Palais Garnier', top: '33%', left: '33%', color: 'bg-purple-500' },
          { name: '20th Arr.', top: '50%', left: '50%', color: 'bg-emerald-500' },
          { name: 'Tour Eiffel', top: '66%', left: '25%', color: 'bg-[#BC2C2C]', pulse: true }
        ];
      case 'Asia':
        return [
          { name: 'Kyoto Temple', top: '35%', left: '60%', color: 'bg-purple-500' },
          { name: 'Tokyo Tower', top: '48%', left: '72%', color: 'bg-[#BC2C2C]', pulse: true },
          { name: 'Shibuya Crossing', top: '62%', left: '65%', color: 'bg-emerald-500' }
        ];
      case 'Americas':
        return [
          { name: 'Times Square', top: '38%', left: '20%', color: 'bg-[#BC2C2C]', pulse: true },
          { name: 'Central Park', top: '28%', left: '24%', color: 'bg-emerald-500' },
          { name: 'Brooklyn Bridge', top: '48%', left: '22%', color: 'bg-purple-500' }
        ];
      default:
        return [
          { name: 'Palais Garnier', top: '33%', left: '33%', color: 'bg-purple-500' },
          { name: '20th Arr.', top: '50%', left: '50%', color: 'bg-emerald-500' },
          { name: 'Tour Eiffel', top: '66%', left: '25%', color: 'bg-[#BC2C2C]', pulse: true },
          { name: 'Tokyo Tower', top: '48%', left: '72%', color: 'bg-[#BC2C2C]', pulse: true },
          { name: 'Times Square', top: '38%', left: '20%', color: 'bg-[#BC2C2C]', pulse: true }
        ];
    }
  };

  const getVehicleCount = () => {
    switch (selectedRegion) {
      case 'Europe': return 21;
      case 'Asia': return 14;
      case 'Americas': return 7;
      default: return 42;
    }
  };

  const markers = getMarkers();

  return (
    <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 mb-6 flex-1 min-h-[400px] relative overflow-hidden flex flex-col">
      {/* Map visual mockup */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80" 
          alt="Map Background" 
          className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
        />
        {/* Subtle grid/overlay */}
        <div className="absolute inset-0 bg-blue-50/30 mix-blend-multiply"></div>
      </div>

      {/* Map Controls */}
      <div className="absolute top-8 left-8 z-10 flex flex-col gap-2">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
          <button className="p-3 hover:bg-gray-50 text-gray-700 border-b border-gray-100">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          </button>
          <button className="p-3 hover:bg-gray-50 text-gray-700">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
          </button>
        </div>
        <button className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 p-3 hover:bg-gray-50 text-gray-700 mt-2">
          <LocateFixed className="w-4 h-4" />
        </button>
      </div>

      {/* Map Pins */}
      {markers.map((marker, idx) => (
        <div 
          key={idx} 
          className="absolute z-10 flex items-center justify-center transition-all duration-500" 
          style={{ top: marker.top, left: marker.left }}
        >
          {marker.pulse && (
            <div className={`w-8 h-8 rounded-full ${marker.color}/20 animate-ping absolute`}></div>
          )}
          <div className={`w-3.5 h-3.5 rounded-full ${marker.color} border-2 border-white shadow-sm relative z-10`}></div>
          <div className="absolute top-full mt-1 bg-white px-2 py-1 rounded text-[9px] font-bold text-gray-700 shadow-sm border border-gray-100 flex items-center gap-1 whitespace-nowrap">
            <span className={`w-1.5 h-1.5 rounded-full ${marker.color}`}></span> {marker.name}
          </div>
        </div>
      ))}

      {/* Floating Panel: Real-Time Telemetry */}
      <div className="absolute bottom-8 left-8 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-gray-100 max-w-xs">
        <h3 className="text-xs font-bold text-gray-900 mb-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#BC2C2C] animate-pulse"></span> Real-Time Telemetry
        </h3>
        <p className="text-[11px] font-medium text-gray-600 leading-relaxed">
          GPS tracking active for all {getVehicleCount()} vehicles in {selectedRegion === 'All' ? 'global circuits' : selectedRegion}. Next sync in <span className="font-bold text-gray-900">12s</span>.
        </p>
      </div>

      {/* Map Style Toggles */}
      <div className="absolute bottom-8 right-8 z-20 flex gap-2">
        <button className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-sm border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors">
          <Satellite className="w-4 h-4" /> Satellite
        </button>
        <button className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-sm border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors">
          <MapIcon className="w-4 h-4" /> Traffic
        </button>
      </div>
    </div>
  );
}
