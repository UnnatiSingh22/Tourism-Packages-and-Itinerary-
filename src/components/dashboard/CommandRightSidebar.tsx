import React, { useState } from 'react';
import { MoreHorizontal, CloudRain, Sun, Wind, CloudSun, Eye, Copy, Download, Archive, Share2, Printer, MapPin, Users, Calendar, Phone, Check, AlertTriangle, Compass, Bus, Play, Pause, Trash2, X } from 'lucide-react';
import { useMasterData } from '../../context/MasterDataContext';

interface SidebarProps {
  selectedRegion?: string;
}

// Region-specific weather and resource allocation mock datasets
const REGIONAL_WEATHER = {
  All: { temp: '24°C', condition: 'Partly Cloudy', humidity: '52%', wind: '12 km/h', icon: CloudSun },
  Europe: { temp: '19°C', condition: 'Light Rain', humidity: '78%', wind: '18 km/h', icon: CloudRain },
  Asia: { temp: '27°C', condition: 'Sunny', humidity: '44%', wind: '8 km/h', icon: Sun },
  Americas: { temp: '21°C', condition: 'Windy', humidity: '50%', wind: '28 km/h', icon: Wind },
  'Middle East': { temp: '38°C', condition: 'Clear', humidity: '18%', wind: '14 km/h', icon: Sun },
  India: { temp: '30°C', condition: 'Monsoon Showers', humidity: '92%', wind: '20 km/h', icon: CloudRain },
};

const REGIONAL_RESOURCES = {
  All: { guides: 22, vehicles: 42, coordinators: 6 },
  Europe: { guides: 8, vehicles: 12, coordinators: 2 },
  Asia: { guides: 6, vehicles: 10, coordinators: 2 },
  Americas: { guides: 4, vehicles: 8, coordinators: 1 },
  'Middle East': { guides: 2, vehicles: 6, coordinators: 1 },
  India: { guides: 2, vehicles: 6, coordinators: 1 },
};

const REGIONAL_TOURS = {
  All: [
    { id: 't-1', name: 'Iconic Rajasthan', days: 'Day 4 of 12', pax: 22, image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=100&h=100&fit=crop', status: 'On Track', region: 'India', manager: 'Sarah Wu' },
    { id: 't-2', name: 'Parisian Nights', days: 'Day 2 of 5', pax: 14, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=100&h=100&fit=crop', status: 'Slowed', region: 'Europe', manager: 'David Chen' },
    { id: 't-3', name: 'Kyoto Sakura Trail', days: 'Day 6 of 8', pax: 18, image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=100&h=100&fit=crop', status: 'On Track', region: 'Asia', manager: 'Kenji Tanaka' },
    { id: 't-4', name: 'Broadway VIP Circuit', days: 'Day 3 of 4', pax: 12, image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=100&h=100&fit=crop', status: 'On Track', region: 'Americas', manager: 'Jordan Smith' },
  ],
  Europe: [
    { id: 't-2', name: 'Parisian Nights', days: 'Day 2 of 5', pax: 14, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=100&h=100&fit=crop', status: 'Slowed', region: 'Europe', manager: 'David Chen' },
  ],
  Asia: [
    { id: 't-3', name: 'Kyoto Sakura Trail', days: 'Day 6 of 8', pax: 18, image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=100&h=100&fit=crop', status: 'On Track', region: 'Asia', manager: 'Kenji Tanaka' },
  ],
  Americas: [
    { id: 't-4', name: 'Broadway VIP Circuit', days: 'Day 3 of 4', pax: 12, image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=100&h=100&fit=crop', status: 'On Track', region: 'Americas', manager: 'Jordan Smith' },
  ],
  'Middle East': [
    { id: 't-5', name: 'Desert Safari Deluxe', days: 'Day 1 of 3', pax: 8, image: 'https://images.unsplash.com/photo-1505080856163-26759dcd7d13?w=100&h=100&fit=crop', status: 'On Track', region: 'Middle East', manager: 'Elena Rodriguez' }
  ],
  India: [
    { id: 't-1', name: 'Iconic Rajasthan', days: 'Day 4 of 12', pax: 22, image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=100&h=100&fit=crop', status: 'On Track', region: 'India', manager: 'Sarah Wu' }
  ]
};

export function CommandRightSidebar({ selectedRegion = 'All' }: SidebarProps) {
  const { masters } = useMasterData();
  const [tours, setTours] = useState(REGIONAL_TOURS);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [manageTour, setManageTour] = useState<any | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Form edit fields
  const [selectedGuide, setSelectedGuide] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [tourStatus, setTourStatus] = useState('');

  const weather = REGIONAL_WEATHER[selectedRegion as keyof typeof REGIONAL_WEATHER] || REGIONAL_WEATHER.All;
  const WeatherIcon = weather.icon;

  const resources = REGIONAL_RESOURCES[selectedRegion as keyof typeof REGIONAL_RESOURCES] || REGIONAL_RESOURCES.All;
  
  const currentRegionTours = tours[selectedRegion as keyof typeof tours] || [];

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleOpenManage = (tour: any) => {
    setManageTour(tour);
    setSelectedGuide('');
    setSelectedVehicle('');
    setTourStatus(tour.status);
    setActiveMenuId(null);
  };

  const handleSaveManage = () => {
    if (!manageTour) return;

    // Update locally
    const updatedToursList = Object.keys(tours).reduce((acc, key) => {
      const regionTours = tours[key as keyof typeof tours].map(t => {
        if (t.id === manageTour.id) {
          const guideObj = masters.staff.find(s => s.id === selectedGuide);
          const vehicleObj = masters.vehicles.find(v => v.id === selectedVehicle);
          return {
            ...t,
            status: tourStatus,
            guideName: guideObj ? guideObj.name : (t as any).guideName,
            vehicleName: vehicleObj ? vehicleObj.name : (t as any).vehicleName
          } as any;
        }
        return t;
      });
      acc[key as keyof typeof tours] = regionTours;
      return acc;
    }, {} as typeof tours);

    setTours(updatedToursList);
    setManageTour(null);
    showNotification(`Tour "${manageTour.name}" configuration updated!`);
  };

  const handleAction = (action: string, tourName: string) => {
    setActiveMenuId(null);
    showNotification(`Successfully executed: ${action} on "${tourName}"`);
  };

  const handleStatusChange = (status: string) => {
    if (!manageTour) return;
    setTourStatus(status);
    showNotification(`Tour status updated to ${status}`);
  };

  return (
    <div className="flex flex-col gap-6 h-full relative">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white text-xs px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in slide-in-from-bottom-2 duration-300">
          <Check className="w-4 h-4 text-emerald-400" />
          <span className="font-bold">{notification}</span>
        </div>
      )}

      {/* Weather Info */}
      <div className="bg-gradient-to-br from-blue-50/70 to-indigo-50/40 rounded-3xl p-5 shadow-sm border border-blue-100/50">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Regional Weather ({selectedRegion})</h3>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#BC2C2C] shadow-sm">
            <WeatherIcon className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <p className="text-lg font-black text-gray-900 leading-tight">{weather.temp}</p>
            <p className="text-xs text-gray-500 font-bold">{weather.condition}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-blue-100/30 text-[11px] font-semibold text-gray-500">
          <div>Humidity: <span className="text-gray-900 font-bold">{weather.humidity}</span></div>
          <div>Wind Speed: <span className="text-gray-900 font-bold">{weather.wind}</span></div>
        </div>
      </div>

      {/* Resource Allocation */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Resource Capacity</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gray-50 rounded-2xl p-3 text-center border border-gray-100">
            <Compass className="w-4 h-4 text-amber-500 mx-auto mb-1" />
            <p className="text-xs font-black text-gray-900 leading-none">{resources.guides}</p>
            <span className="text-[8px] font-bold text-gray-400 uppercase">Guides</span>
          </div>
          <div className="bg-gray-50 rounded-2xl p-3 text-center border border-gray-100">
            <Bus className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
            <p className="text-xs font-black text-gray-900 leading-none">{resources.vehicles}</p>
            <span className="text-[8px] font-bold text-gray-400 uppercase">Vehicles</span>
          </div>
          <div className="bg-gray-50 rounded-2xl p-3 text-center border border-gray-100">
            <Users className="w-4 h-4 text-blue-500 mx-auto mb-1" />
            <p className="text-xs font-black text-gray-900 leading-none">{resources.coordinators}</p>
            <span className="text-[8px] font-bold text-gray-400 uppercase">Staff</span>
          </div>
        </div>
      </div>

      {/* Active Tours */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex-1">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-sm font-bold text-gray-900">Active Tours ({selectedRegion})</h2>
          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[9px] font-bold uppercase rounded border border-emerald-200">
            {currentRegionTours.length} Live
          </span>
        </div>

        <div className="space-y-4">
          {currentRegionTours.length === 0 ? (
            <p className="text-xs font-medium text-gray-400 text-center py-8">No active tours in this region.</p>
          ) : (
            currentRegionTours.map((t) => (
              <div key={t.id} className="p-4 bg-gray-50/80 rounded-2xl border border-gray-100 flex gap-4 relative">
                <img src={t.image} alt={t.name} className="w-16 h-16 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1 gap-1">
                    <h3 className="text-sm font-bold text-gray-900 leading-tight truncate">{t.name}</h3>
                    <div className="relative">
                      <button 
                        onClick={() => setActiveMenuId(activeMenuId === t.id ? null : t.id)}
                        className="text-gray-400 hover:text-gray-600 shrink-0"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>

                      {/* Three-Dot Menu Dropdown */}
                      {activeMenuId === t.id && (
                        <div className="absolute right-0 top-6 bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-1.5 w-36 animate-in fade-in slide-in-from-top-2 duration-100">
                          {[
                            { icon: Eye, label: 'Details', action: 'View Details' },
                            { icon: Copy, label: 'Duplicate', action: 'Duplicate' },
                            { icon: Download, label: 'Export', action: 'Export' },
                            { icon: Archive, label: 'Archive', action: 'Archive' },
                            { icon: Share2, label: 'Share', action: 'Share' },
                            { icon: Printer, label: 'Print', action: 'Print' },
                          ].map((item, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleAction(item.action, t.name)}
                              className="w-full flex items-center gap-2 px-3 py-1.5 text-[11px] font-semibold text-gray-600 hover:bg-gray-50 hover:text-gray-950 transition-colors"
                            >
                              <item.icon className="w-3.5 h-3.5" />
                              {item.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{t.days} • {t.pax} Pax</p>
                  
                  <div className="flex justify-between items-center">
                    <span className={`px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-widest rounded ${
                      t.status === 'On Track' ? 'bg-emerald-50 text-emerald-600' 
                      : t.status === 'Slowed' ? 'bg-orange-50 text-orange-600' 
                      : 'bg-red-50 text-red-600'
                    }`}>
                      {t.status}
                    </span>
                    <button 
                      onClick={() => handleOpenManage(t)}
                      className="text-[10px] font-bold text-[#BC2C2C] hover:text-[#8B2020]"
                    >
                      Manage
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Tour Operations Management Modal */}
      {manageTour && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl border border-gray-100 flex flex-col gap-4 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start pb-2 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-extrabold text-[#BC2C2C] uppercase tracking-widest">Active Operations Console</span>
                <h3 className="text-lg font-bold text-gray-900 mt-0.5">{manageTour.name}</h3>
              </div>
              <button 
                onClick={() => setManageTour(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 my-2 text-sm text-gray-600">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Current Cycle</span>
                  <span className="text-xs font-bold text-gray-900 mt-0.5">{manageTour.days}</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Total Travelers</span>
                  <span className="text-xs font-bold text-gray-900 mt-0.5">{manageTour.pax} Guests</span>
                </div>
              </div>

              {/* Assignment Controls */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-amber-500" /> Assign Personnel & Fleet
                </h4>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Tour Guide</label>
                    <select
                      value={selectedGuide}
                      onChange={e => setSelectedGuide(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none"
                    >
                      <option value="">Select Tour Guide</option>
                      {masters.staff.filter(s => s.role.includes('Guide') || s.role.includes('Coordinator')).map(g => (
                        <option key={g.id} value={g.id}>{g.name} ({g.role})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Transit Vehicle</label>
                    <select
                      value={selectedVehicle}
                      onChange={e => setSelectedVehicle(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none"
                    >
                      <option value="">Select Vehicle</option>
                      {masters.vehicles.map(v => (
                        <option key={v.id} value={v.id}>{v.name} ({v.type})</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Tour Controls (Pause, Cancel, Contact) */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-red-500" /> Operations Action Center
                </h4>
                
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => handleStatusChange('On Track')}
                    className={`flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold border transition-colors ${
                      tourStatus === 'On Track' ? 'bg-emerald-500 border-emerald-600 text-white' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5" /> Resume Tour
                  </button>
                  <button 
                    onClick={() => handleStatusChange('Paused')}
                    className={`flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold border transition-colors ${
                      tourStatus === 'Paused' ? 'bg-amber-500 border-amber-600 text-white' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Pause className="w-3.5 h-3.5" /> Pause Tour
                  </button>
                  <button 
                    onClick={() => handleStatusChange('Cancelled')}
                    className={`flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold border transition-colors ${
                      tourStatus === 'Cancelled' ? 'bg-red-500 border-red-600 text-white' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Cancel Tour
                  </button>
                </div>
              </div>

              {/* Contact Manager */}
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900 font-bold">Tour Manager</p>
                    <p className="text-[11px] text-gray-500">{manageTour.manager}</p>
                  </div>
                </div>
                <button 
                  onClick={() => showNotification(`Contacting Tour Manager ${manageTour.manager}...`)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5" /> Contact Manager
                </button>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={() => setManageTour(null)}
                className="flex-1 py-2.5 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-50 transition-colors text-center"
              >
                Close
              </button>
              <button
                onClick={handleSaveManage}
                className="flex-1 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold rounded-xl transition-colors text-center shadow-sm"
              >
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
