import React, { useState, useEffect } from 'react';
import { LocateFixed, Map as MapIcon, Satellite, AlertTriangle, Compass, Bed, MapPin, Plane, Bus, X, CheckSquare, ShieldAlert } from 'lucide-react';

interface MarkerItem {
  id: string;
  type: 'bus' | 'guide' | 'hotel' | 'attraction' | 'airport' | 'incident';
  name: string;
  description: string;
  x: number;
  y: number;
  status?: string;
  extra?: string;
}

interface RouteItem {
  id: string;
  name: string;
  points: [number, number][];
  traffic: 'green' | 'orange' | 'red';
}

interface RegionConfig {
  viewBox: string;
  markers: MarkerItem[];
  routes: RouteItem[];
}

const REGIONAL_CONFIGS: Record<string, RegionConfig> = {
  All: {
    viewBox: '0 0 1000 600',
    markers: [
      { id: 'm-kochi', type: 'airport', name: 'Kochi Airport (COK)', description: 'Active VIP client arrivals.', x: 230, y: 440, status: 'Active', extra: '3 flights enroute' },
      { id: 'm-jaipur', type: 'attraction', name: 'Jaipur Hawa Mahal', description: 'Heritage city palace tour.', x: 120, y: 180, status: 'On Track', extra: '22 travelers in-field' },
      { id: 'm-srinagar', type: 'attraction', name: 'Srinagar Dal Lake', description: 'Luxury Shikara cruise operations.', x: 140, y: 60, status: 'On Track', extra: '10 travelers in-field' },
      { id: 'm-panaji', type: 'attraction', name: 'Panaji Center', description: 'Beaches & Heritage circuits.', x: 140, y: 470, status: 'On Track', extra: '15 travelers in-field' },
      { id: 'm-dubai', type: 'airport', name: 'Dubai Intl (DXB)', description: 'Primary Middle East hub.', x: 620, y: 280, status: 'Active', extra: '20 travelers in-field' },
      { id: 'm-bali', type: 'hotel', name: 'Ubud Bali Lodge', description: 'Resort wellness operations.', x: 820, y: 520, status: 'On Track', extra: '18 travelers in-field' },
      { id: 'm-london', type: 'airport', name: 'London Heathrow (LHR)', description: 'Transit flight manifest check.', x: 450, y: 150, status: 'Active', extra: 'Connecting VIP flight' },
      { id: 'm-paris', type: 'hotel', name: 'Parisian Grand Hotel', description: 'Corporate check-in operations.', x: 480, y: 220, status: 'On Track', extra: '14 travelers in-field' },
      { id: 'm-tokyo', type: 'attraction', name: 'Tokyo Tower', description: 'Cherry Blossom tour routes.', x: 920, y: 230, status: 'On Track', extra: '18 travelers in-field' },
      { id: 'm-jaisalmer-alert', type: 'incident', name: 'Sandstorm Warning: Jaisalmer', description: 'Sandstorm visibility < 50m. Desert safari tours paused.', x: 45, y: 175, status: 'Alert', extra: 'All groups redirected to lounge' }
    ],
    routes: [
      { id: 'r-global-1', name: 'Delhi-Jaipur Corridor', points: [[180, 120], [120, 180]], traffic: 'green' },
      { id: 'r-global-2', name: 'Kochi-Alleppey Cruise', points: [[195, 460], [210, 500]], traffic: 'green' },
      { id: 'r-global-3', name: 'Srinagar-Gulmarg Route', points: [[140, 60], [105, 75]], traffic: 'orange' },
      { id: 'r-global-4', name: 'Dubai-Palm Jumeirah Express', points: [[650, 250], [610, 270]], traffic: 'green' },
      { id: 'r-global-5', name: 'Denpasar-Ubud Corridor', points: [[800, 560], [830, 480]], traffic: 'green' }
    ]
  },
  Kerala: {
    viewBox: '120 380 200 180',
    markers: [
      { id: 'm-ker-1', type: 'airport', name: 'Kochi Intl Airport (COK)', description: 'Primary airport arrival point. Welcome desk active.', x: 180, y: 420, status: 'Active', extra: 'EV SUV shuttle ready' },
      { id: 'm-ker-2', type: 'hotel', name: 'Brunton Boatyard Hotel', description: 'Heritage hotel check-in verified.', x: 195, y: 460, status: 'Confirmed', extra: 'Welcome dinner booked' },
      { id: 'm-ker-3', type: 'attraction', name: 'Munnar Spice Hills', description: 'Scenic high-altitude tea plantations walking tour.', x: 260, y: 440, status: 'Active', extra: 'Guide Devi Nair in-lead' },
      { id: 'm-ker-4', type: 'bus', name: 'Houseboat Kettuvallam #4', description: 'Cruising Vembanad lagoon channels.', x: 210, y: 500, status: 'Cruising 12 knots', extra: '8 Pax, chef on board' },
      { id: 'm-ker-5', type: 'hotel', name: 'Kumarakom Lake Resort', description: 'Villas ready, spa vouchers prepared.', x: 220, y: 520, status: 'Ready', extra: '100% capacity reserved' },
      { id: 'm-ker-6', type: 'incident', name: 'Vembanad High Swell Alert', description: 'Active weather alert. Houseboats docked near resort.', x: 240, y: 530, status: 'Monsoon Alert', extra: 'High wind speed' }
    ],
    routes: [
      { id: 'r-ker-1', name: 'Kochi Airport to Port Transfer', points: [[180, 420], [195, 460]], traffic: 'green' },
      { id: 'r-ker-2', name: 'Kochi-Munnar Highway Route', points: [[195, 460], [260, 440]], traffic: 'orange' },
      { id: 'r-ker-3', name: 'Kochi-Kumarakom Canal Route', points: [[195, 460], [220, 520], [210, 500]], traffic: 'green' }
    ]
  },
  Rajasthan: {
    viewBox: '20 100 200 180',
    markers: [
      { id: 'm-raj-1', type: 'airport', name: 'Delhi IGI Airport (DEL)', description: 'VIP client arrivals and transit transfers.', x: 180, y: 120, status: 'Active', extra: 'Toyota Vellfire dispatched' },
      { id: 'm-raj-2', type: 'hotel', name: 'Rambagh Palace Jaipur', description: 'Royal grand suite allocations.', x: 120, y: 180, status: 'Ready', extra: 'Check-in completed' },
      { id: 'm-raj-3', type: 'attraction', name: 'Amber Fort Palace', description: 'Morning fort elephant/jeep tours.', x: 130, y: 160, status: 'On Track', extra: '22 Pax present' },
      { id: 'm-raj-4', type: 'hotel', name: 'Udaipur Lake Palace', description: 'Lake Pichola heritage hotel.', x: 75, y: 250, status: 'Ready', extra: 'Private dinner at sunset' },
      { id: 'm-raj-5', type: 'attraction', name: 'Mehrangarh Fort Jodhpur', description: 'Blue city heritage walking tour.', x: 65, y: 190, status: 'On Track', extra: 'Guide Sarah Wu leading' },
      { id: 'm-raj-6', type: 'bus', name: 'Rajasthan Coach Bus #8', description: 'Luxury Volvo coach enroute to Ajmer.', x: 95, y: 220, status: 'Enroute 62 km/h', extra: 'Radiator warning monitoring' },
      { id: 'm-raj-7', type: 'incident', name: 'Jaisalmer Sandstorm Warn', description: 'High sandstorm threat. Desert camps grounded.', x: 45, y: 175, status: 'High Threat', extra: 'Wind gusts 55km/h' }
    ],
    routes: [
      { id: 'r-raj-1', name: 'Delhi-Jaipur Highway NH-48', points: [[180, 120], [120, 180]], traffic: 'green' },
      { id: 'r-raj-2', name: 'Jaipur-Jodhpur Corridor', points: [[120, 180], [65, 190]], traffic: 'green' },
      { id: 'r-raj-3', name: 'Jodhpur-Udaipur Mountain Highway', points: [[65, 190], [75, 250]], traffic: 'orange' },
      { id: 'r-raj-4', name: 'Jodhpur-Jaisalmer Desert Bypass', points: [[65, 190], [45, 175]], traffic: 'red' }
    ]
  },
  Rajkot: {
    viewBox: '50 290 100 150',
    markers: [
      { id: 'm-rajk-1', type: 'airport', name: 'Rajkot Hirasar Airport (HSR)', description: 'Regional domestic flight arrivals.', x: 90, y: 310, status: 'Active', extra: 'Shuttle bus waiting' },
      { id: 'm-rajk-2', type: 'attraction', name: 'Watson Museum', description: 'Jubilee Garden history archives.', x: 100, y: 335, status: 'Active', extra: '6 Pax present' },
      { id: 'm-rajk-3', type: 'attraction', name: 'Rotary Dolls Museum', description: 'Interactive cultural toy archives.', x: 80, y: 340, status: 'Active', extra: '4 Pax present' },
      { id: 'm-rajk-4', type: 'hotel', name: 'Gondal Orchard Palace', description: 'Vintage car collection hotel tour.', x: 95, y: 370, status: 'Ready', extra: 'Check-in completed' },
      { id: 'm-rajk-5', type: 'hotel', name: 'Gir Wildlife Lodge', description: 'Sasan Gir forest camp resort.', x: 115, y: 410, status: 'Ready', extra: 'Morning lion safari book' },
      { id: 'm-rajk-6', type: 'attraction', name: 'Somnath Temple Mandir', description: 'Coastal heritage temple tour.', x: 70, y: 420, status: 'Active', extra: 'Aarti ceremony booking' },
      { id: 'm-rajk-7', type: 'guide', name: 'Guide Ramesh Patel', description: 'Lead guide accompanying group.', x: 98, y: 350, status: 'On Track', extra: 'Phone: +91 98251' }
    ],
    routes: [
      { id: 'r-rajk-1', name: 'Rajkot-Gondal Highway Bypass', points: [[90, 310], [100, 335], [95, 370]], traffic: 'green' },
      { id: 'r-rajk-2', name: 'Gondal-Gir-Somnath Corridor', points: [[95, 370], [115, 410], [70, 420]], traffic: 'green' }
    ]
  },
  Goa: {
    viewBox: '100 400 100 150',
    markers: [
      { id: 'm-goa-1', type: 'airport', name: 'Mopa Airport Goa (GOX)', description: 'New North Goa terminal arrivals.', x: 130, y: 420, status: 'Active', extra: 'EV cabs ready' },
      { id: 'm-goa-2', type: 'attraction', name: 'Panaji Town Center', description: 'Historic Fontainhas Latin Quarter walk.', x: 140, y: 455, status: 'Active', extra: '15 Pax present' },
      { id: 'm-goa-3', type: 'hotel', name: 'W Goa Hotel Vagator', description: 'Luxury beachside resort villa rooms.', x: 125, y: 440, status: 'Ready', extra: 'Sunset lounge cocktails' },
      { id: 'm-goa-4', type: 'attraction', name: 'Baga Beach Club', description: 'Coastal water sports and dining.', x: 128, y: 445, status: 'On Track', extra: 'Extreme crowd traffic' },
      { id: 'm-goa-5', type: 'attraction', name: 'Dudhsagar Falls', description: 'Scenic mountain forest waterfall trek.', x: 165, y: 475, status: 'Alert', extra: 'Heavy monsoon flow' },
      { id: 'm-goa-6', type: 'incident', name: 'Dudhsagar Trail Incident', description: 'Waterfall path closed. Safety warnings active.', x: 170, y: 480, status: 'High Water', extra: 'Forest guard alert' },
      { id: 'm-goa-7', type: 'hotel', name: 'South Goa Heritage Resorts', description: 'Taj Exotica luxury villas check-in.', x: 145, y: 510, status: 'Ready', extra: '12 rooms booked' }
    ],
    routes: [
      { id: 'r-goa-1', name: 'Mopa Airport to Vagator Expressway', points: [[130, 420], [125, 440]], traffic: 'orange' },
      { id: 'r-goa-2', name: 'Panaji to Baga Beach Coastal road', points: [[140, 455], [128, 445]], traffic: 'red' },
      { id: 'r-goa-3', name: 'Panaji to South Goa Highway NH-66', points: [[140, 455], [145, 510]], traffic: 'green' }
    ]
  },
  Kashmir: {
    viewBox: '80 20 120 100',
    markers: [
      { id: 'm-kas-1', type: 'airport', name: 'Srinagar Airport (SXR)', description: 'Domestic terminal arrivals.', x: 140, y: 60, status: 'Active', extra: '4x4 SUVs lined up' },
      { id: 'm-kas-2', type: 'hotel', name: 'The Khyber Grand Gulmarg', description: '5-star alpine resort hotel check-in.', x: 105, y: 75, status: 'Ready', extra: 'Heated rooms confirmed' },
      { id: 'm-kas-3', type: 'attraction', name: 'Gulmarg Gondola Summit', description: 'Apharwat Peak high altitude cable car.', x: 95, y: 80, status: 'On Track', extra: 'Active snowfall warning' },
      { id: 'm-kas-4', type: 'hotel', name: 'Pahalgam Pine Resorts', description: 'Lidder river luxury chalet check-in.', x: 175, y: 95, status: 'Ready', extra: 'Spa vouchers activated' },
      { id: 'm-kas-5', type: 'incident', name: 'Sonmarg Landslide block', description: 'Landslide blocked Highway 1D. Road clearing underway.', x: 165, y: 40, status: 'Blocked', extra: 'Srinagar bypass rerouting' },
      { id: 'm-kas-6', type: 'bus', name: 'Kashmir Sprinter Coach #3', description: 'Client transfers climbing Gulmarg pass.', x: 130, y: 70, status: 'Enroute 32 km/h', extra: 'Snow chains equipped' }
    ],
    routes: [
      { id: 'r-kas-1', name: 'Srinagar-Gulmarg Alpine Pass', points: [[140, 60], [105, 75]], traffic: 'orange' },
      { id: 'r-kas-2', name: 'Srinagar-Pahalgam Lidder road', points: [[140, 60], [175, 95]], traffic: 'green' }
    ]
  },
  Bali: {
    viewBox: '760 440 160 160',
    markers: [
      { id: 'm-bali-1', type: 'airport', name: 'Ngurah Rai Airport (DPS)', description: 'Denpasar international flight arrivals.', x: 800, y: 560, status: 'Active', extra: 'Luxury minivan ready' },
      { id: 'm-bali-2', type: 'hotel', name: 'Ubud Hanging Gardens', description: 'Luxury jungle pool villas reservation.', x: 830, y: 480, status: 'Ready', extra: 'Welcome massage ready' },
      { id: 'm-bali-3', type: 'attraction', name: 'Tegallalang Rice Terraces', description: 'Guided jungle walk and swing circuit.', x: 840, y: 470, status: 'On Track', extra: '18 travelers in-field' },
      { id: 'm-bali-4', type: 'hotel', name: 'Seminyak Beach Resort', description: 'Beachfront resort check-in validated.', x: 790, y: 520, status: 'Ready', extra: 'VIP beachbed booked' },
      { id: 'm-bali-5', type: 'attraction', name: 'Uluwatu Cliff Temple', description: 'Scenic sunset Kecak fire dance tour.', x: 775, y: 580, status: 'On Track', extra: 'Coord Made Putu in-lead' },
      { id: 'm-bali-6', type: 'incident', name: 'Mt. Agung Volcanic Alert', description: 'Minor volcanic ash warning. Outskirts closed.', x: 890, y: 450, status: 'Alert Level 2', extra: 'Flight status normal' },
      { id: 'm-bali-7', type: 'bus', name: 'Bali Shuttle Van #9', description: 'Premium commuter coach heading to Ubud.', x: 810, y: 500, status: 'Enroute 45 km/h', extra: 'AC warning check' }
    ],
    routes: [
      { id: 'r-bali-1', name: 'Denpasar-Seminyak-Ubud Bypass', points: [[800, 560], [790, 520], [830, 480]], traffic: 'green' },
      { id: 'r-bali-2', name: 'Ngurah Rai to Uluwatu Temple road', points: [[800, 560], [775, 580]], traffic: 'orange' }
    ]
  },
  Dubai: {
    viewBox: '550 240 160 120',
    markers: [
      { id: 'm-dub-1', type: 'airport', name: 'Dubai Airport (DXB)', description: 'Terminal 3 VIP meet-and-greet arrivals.', x: 650, y: 250, status: 'Active', extra: 'Limo pick-up active' },
      { id: 'm-dub-2', type: 'attraction', name: 'Burj Khalifa High Deck', description: 'Level 148 sky observatory entry.', x: 610, y: 270, status: 'On Track', extra: '20 travelers in-field' },
      { id: 'm-dub-3', type: 'hotel', name: 'Armani Hotel Dubai', description: 'Downtown luxury tower suites check-in.', x: 608, y: 274, status: 'Ready', extra: 'Gourmet dinner booked' },
      { id: 'm-dub-4', type: 'hotel', name: 'Atlantis The Palm Resort', description: 'Iconic Palm Jumeirah beach resort check-in.', x: 560, y: 290, status: 'Ready', extra: 'Aquaventure tickets ready' },
      { id: 'm-dub-5', type: 'attraction', name: 'Dubai Marina Harbour', description: 'Private sunset yacht charter boarding.', x: 575, y: 310, status: 'On Track', extra: '10 Pax cruising' },
      { id: 'm-dub-6', type: 'incident', name: 'Al Qudra Desert storm alert', description: 'Sandstorm warning. Dune bashers halted.', x: 670, y: 330, status: 'Active Storm', extra: 'Redirected to lounge' },
      { id: 'm-dub-7', type: 'bus', name: 'Luxury Limo LIMO-05', description: 'Electric Hybrid Limo transferring VIPs.', x: 590, y: 300, status: 'Enroute 70 km/h', extra: 'Battery status: 84%' }
    ],
    routes: [
      { id: 'r-dub-1', name: 'DXB Airport to Palm Jumeirah Highway', points: [[650, 250], [610, 270], [560, 290]], traffic: 'green' },
      { id: 'r-dub-2', name: 'Sheikh Zayed Rd Marina Route', points: [[610, 270], [575, 310]], traffic: 'green' },
      { id: 'r-dub-3', name: 'Al Qudra Desert Access road', points: [[610, 270], [670, 330]], traffic: 'red' }
    ]
  }
};

export function TelemetryMap({ selectedRegion = 'All' }: { selectedRegion?: string }) {
  const [mapStyle, setMapStyle] = useState<'satellite' | 'traffic'>('traffic');
  const [activeTooltip, setActiveTooltip] = useState<MarkerItem | null>(null);

  // Normalize region string to match record key
  const activeRegionKey = selectedRegion === 'All' ? 'All' : selectedRegion;
  const config = REGIONAL_CONFIGS[activeRegionKey] || REGIONAL_CONFIGS.All;

  // Reset tooltip when region filter changes
  useEffect(() => {
    setActiveTooltip(null);
  }, [selectedRegion]);

  const getMarkerColor = (type: string) => {
    switch (type) {
      case 'bus': return 'bg-[#BC2C2C] text-white';
      case 'incident': return 'bg-orange-500 text-white';
      case 'hotel': return 'bg-blue-500 text-white';
      case 'attraction': return 'bg-purple-500 text-white';
      case 'airport': return 'bg-gray-600 text-white';
      case 'guide': return 'bg-amber-500 text-white';
      default: return 'bg-rose-500 text-white';
    }
  };

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case 'bus': return <Bus className="w-3.5 h-3.5" />;
      case 'incident': return <AlertTriangle className="w-3.5 h-3.5" />;
      case 'hotel': return <Bed className="w-3.5 h-3.5" />;
      case 'attraction': return <MapPin className="w-3.5 h-3.5" />;
      case 'airport': return <Plane className="w-3.5 h-3.5" />;
      case 'guide': return <Compass className="w-3.5 h-3.5" />;
      default: return <MapPin className="w-3.5 h-3.5" />;
    }
  };

  const getRouteColor = (traffic: string) => {
    if (mapStyle === 'satellite') {
      return '#38BDF8'; // Sky blue cyber grids in satellite mode
    }
    switch (traffic) {
      case 'green': return '#10B981'; // Green road
      case 'orange': return '#F59E0B'; // Orange road
      case 'red': return '#EF4444'; // Red road
      default: return '#6B7280';
    }
  };

  return (
    <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 mb-6 flex-1 min-h-[440px] relative overflow-hidden flex flex-col">
      
      {/* Dynamic SVG Map Canvas with Auto ViewBox Zooming */}
      <div className="absolute inset-0 z-0 bg-gray-50 transition-colors duration-500">
        <svg 
          viewBox={config.viewBox} 
          className="w-full h-full object-cover transition-all duration-700 ease-in-out"
          style={{
            background: mapStyle === 'satellite' ? '#0F172A' : '#F8FAFC'
          }}
        >
          {/* Grid Gridlines Background */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke={mapStyle === 'satellite' ? '#1E293B' : '#E2E8F0'} strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Dummy Landmass Outlines to resemble map segments */}
          <path 
            d="M 50 120 Q 150 80 250 150 T 400 300 T 200 480 T 50 420 Z" 
            fill={mapStyle === 'satellite' ? '#1E293B/30' : '#F1F5F9'} 
            stroke={mapStyle === 'satellite' ? '#334155' : '#CBD5E1'} 
            strokeWidth="2" 
            opacity="0.8" 
          />
          <path 
            d="M 500 200 Q 650 150 780 220 T 920 400 T 700 500 T 500 350 Z" 
            fill={mapStyle === 'satellite' ? '#1E293B/30' : '#F1F5F9'} 
            stroke={mapStyle === 'satellite' ? '#334155' : '#CBD5E1'} 
            strokeWidth="2" 
            opacity="0.8" 
          />

          {/* Route lines */}
          {config.routes.map((route) => {
            const pathData = route.points.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${pt[0]} ${pt[1]}`).join(' ');
            return (
              <g key={route.id}>
                {/* Outer Glow Route */}
                <path
                  d={pathData}
                  fill="none"
                  stroke={getRouteColor(route.traffic)}
                  strokeWidth={route.traffic === 'red' ? '6' : '4'}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.25"
                  className={route.traffic === 'red' ? 'animate-pulse' : ''}
                />
                {/* Core Route Line */}
                <path
                  d={pathData}
                  fill="none"
                  stroke={getRouteColor(route.traffic)}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={route.traffic === 'red' ? '4 4' : 'none'}
                  className={route.traffic === 'orange' ? 'stroke-dash' : ''}
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Map Controls */}
      <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
          <button onClick={() => alert("Zooming In...")} className="p-3 hover:bg-gray-50 text-gray-700 border-b border-gray-100 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          </button>
          <button onClick={() => alert("Zooming Out...")} className="p-3 hover:bg-gray-50 text-gray-700 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
          </button>
        </div>
        <button 
          onClick={() => alert(`Resetting view focus to ${selectedRegion === 'All' ? 'global' : selectedRegion} bounds`)}
          className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 p-3 hover:bg-gray-50 text-gray-700 mt-1 transition-colors"
          title="Reset View Bounds"
        >
          <LocateFixed className="w-4 h-4 text-[#BC2C2C]" />
        </button>
      </div>

      {/* Map Style Toggles */}
      <div className="absolute top-6 right-6 z-10 flex gap-2">
        <button 
          onClick={() => setMapStyle('satellite')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold shadow-sm border transition-all ${
            mapStyle === 'satellite' 
              ? 'bg-gray-900 border-gray-950 text-white' 
              : 'bg-white/90 border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Satellite className="w-3.5 h-3.5" /> Satellite
        </button>
        <button 
          onClick={() => setMapStyle('traffic')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold shadow-sm border transition-all ${
            mapStyle === 'traffic' 
              ? 'bg-gray-900 border-gray-950 text-white' 
              : 'bg-white/90 border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <MapIcon className="w-3.5 h-3.5" /> Traffic
        </button>
      </div>

      {/* Render Markers on Top of the Absolute Map Wrapper */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="relative w-full h-full">
          {config.markers.map((marker) => {
            const leftPct = `${(marker.x / 1000) * 100}%`;
            const topPct = `${(marker.y / 600) * 100}%`;
            const isIncident = marker.type === 'incident';
            const isBus = marker.type === 'bus';

            return (
              <div 
                key={marker.id} 
                className="absolute flex items-center justify-center transition-all duration-700 ease-in-out pointer-events-auto cursor-pointer"
                style={{ top: topPct, left: leftPct }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTooltip(marker);
                }}
              >
                {(isIncident || isBus) && (
                  <div className={`w-8 h-8 rounded-full ${isIncident ? 'bg-orange-500' : 'bg-[#BC2C2C]'} opacity-25 animate-ping absolute`}></div>
                )}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-md relative z-10 hover:scale-110 transition-transform ${getMarkerColor(marker.type)}`}>
                  {getMarkerIcon(marker.type)}
                </div>
                <div className="absolute top-full mt-1.5 bg-gray-900/90 text-white px-2 py-0.5 rounded text-[8px] font-bold shadow-sm flex items-center gap-1 whitespace-nowrap z-0">
                  {marker.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Popover Detail Tooltip Card */}
      {activeTooltip && (
        <div 
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 bg-white rounded-2xl p-4 shadow-xl border border-gray-150 max-w-sm w-[90%] md:w-[320px] animate-in slide-in-from-bottom-3 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-start pb-1.5 border-b border-gray-50 mb-2">
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${getMarkerColor(activeTooltip.type)}`}>
                {getMarkerIcon(activeTooltip.type)}
              </div>
              <div>
                <h4 className="text-xs font-black text-gray-900">{activeTooltip.name}</h4>
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">{activeTooltip.type}</span>
              </div>
            </div>
            <button onClick={() => setActiveTooltip(null)} className="text-gray-400 hover:text-gray-600 p-0.5">
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-gray-600 font-medium leading-relaxed mb-3">
            {activeTooltip.description}
          </p>

          <div className="grid grid-cols-2 gap-2 text-[10px] font-semibold text-gray-500 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
            <div>Status: <span className="text-gray-900 font-bold block">{activeTooltip.status || 'ONLINE'}</span></div>
            <div>Telemetry: <span className="text-gray-900 font-bold block">{activeTooltip.extra || 'No details'}</span></div>
          </div>
        </div>
      )}

      {/* Floating Panel: Real-Time Telemetry Summary */}
      <div className="absolute bottom-6 left-6 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-gray-100 max-w-xs hidden md:block">
        <h3 className="text-xs font-bold text-gray-900 mb-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#BC2C2C] animate-pulse"></span> Telemetry Summary
        </h3>
        <p className="text-[10px] font-semibold text-gray-600 leading-relaxed">
          Region: <span className="text-gray-900 font-black uppercase tracking-wider">{selectedRegion === 'All' ? 'Global Overview' : selectedRegion}</span>
          <br />
          Map Mode: <span className="text-[#BC2C2C] font-black uppercase">{mapStyle} Layer</span>
          <br />
          Active Nodes: <span className="text-gray-900 font-bold">{config.markers.length} monitored</span>. Auto-zoom active.
        </p>
      </div>

      {/* Floating Legend Overlay */}
      <div className="absolute bottom-6 right-6 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-md border border-gray-100 text-[9px] font-bold text-gray-500 flex flex-col gap-1.5 min-w-[120px]">
        <div className="text-[8px] text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-1 mb-0.5">Map Legend</div>
        <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#BC2C2C]"></span> Transit Vehicle</div>
        <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Luxury Hotel</div>
        <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Attraction Node</div>
        <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span> Active Incident</div>
        {mapStyle === 'traffic' ? (
          <div className="border-t border-gray-50 pt-1.5 mt-0.5 space-y-1">
            <div className="flex items-center gap-1.5"><span className="w-4 h-0.5 bg-emerald-500 inline-block"></span> Clear Traffic</div>
            <div className="flex items-center gap-1.5"><span className="w-4 h-0.5 bg-amber-500 inline-block"></span> Moderate Delay</div>
            <div className="flex items-center gap-1.5"><span className="w-4 h-0.5 bg-red-500 inline-block"></span> Road Blocked</div>
          </div>
        ) : (
          <div className="border-t border-gray-50 pt-1.5 mt-0.5">
            <div className="flex items-center gap-1.5"><span className="w-4 h-0.5 bg-[#38BDF8] inline-block"></span> Dispatch Grid</div>
          </div>
        )}
      </div>
    </div>
  );
}
