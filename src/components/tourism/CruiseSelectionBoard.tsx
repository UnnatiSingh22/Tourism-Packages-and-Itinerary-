import { useState } from 'react';
import { Anchor, Calendar, Clock, Star, MapPin, Filter } from 'lucide-react';
import { useMasterData } from '../../context/MasterDataContext';
import type { CruiseRecord } from '../../data/tourismData';

import { formatRupee } from '../../lib/utils';

interface CruiseSelectionBoardProps {
  selectedCruise: CruiseRecord | null;
  selectedCabin: string | null;
  onSelectCruise: (cruise: CruiseRecord | null) => void;
  onSelectCabin: (cabin: string | null) => void;
}

export function CruiseSelectionBoard({
  selectedCruise,
  selectedCabin,
  onSelectCruise,
  onSelectCabin
}: CruiseSelectionBoardProps) {
  const { masters } = useMasterData();
  const [filterLine, setFilterLine] = useState('');
  const [filterDuration, setFilterDuration] = useState('');
  const [filterMonth, setFilterMonth] = useState('');
  const [maxPrice, setMaxPrice] = useState(5000);

  const activeCruises: any[] = masters.cruises.filter(c => c.status === 'Active').map(c => ({
    id: c.id,
    name: c.name,
    cruiseLine: c.cruiseLine || 'Royal Caribbean',
    shipName: c.shipName || 'Symphony of the Seas',
    destination: c.destination || 'Caribbean',
    departurePort: c.departurePort || 'Miami, USA',
    arrivalPort: c.arrivalPort || 'Miami, USA',
    durationNights: Number(c.durationNights || 7),
    departureMonth: (c as any).departureMonth || 'December',
    startingPrice: {
      interior: Number(c.startingPriceInterior || 699),
      oceanView: Number(c.startingPriceOceanView || 849),
      balcony: Number(c.startingPriceBalcony || 1099),
      suite: Number(c.startingPriceSuite || 2299),
    },
    taxes: Number(c.taxes || 145),
    rating: Number(c.rating || 4.8),
    highlights: (c as any).highlights || ['CocoCay Private Island', 'Bahamas', 'Broadway Shows'],
    routeOverview: (c as any).routeOverview || 'Miami → Nassau → CocoCay → Miami',
  }));

  // Apply filters
  const filteredCruises = activeCruises.filter(cruise => {
    if (filterLine && cruise.cruiseLine !== filterLine) return false;
    if (filterMonth && cruise.departureMonth !== filterMonth) return false;
    
    if (filterDuration) {
      const days = parseInt(filterDuration);
      if (days === 7 && cruise.durationNights !== 7) return false;
      if (days === 10 && cruise.durationNights !== 10) return false;
    }

    // Check if at least one cabin is below max price
    const minCabinPrice = Math.min(
      cruise.startingPrice.interior,
      cruise.startingPrice.oceanView,
      cruise.startingPrice.balcony,
      cruise.startingPrice.suite
    );
    if (minCabinPrice > maxPrice) return false;

    return true;
  });

  const cabinNames = [
    { key: 'interior', label: 'Interior' },
    { key: 'oceanView', label: 'Ocean View' },
    { key: 'balcony', label: 'Balcony' },
    { key: 'suite', label: 'Suite' }
  ];

  return (
    <div className="space-y-6">
      {/* Search Filters Panel */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#BC2C2C]" />
          <span className="text-xs font-black text-gray-900 uppercase tracking-wider">Cruise Finder Filters</span>
        </div>

        <div className="flex flex-wrap gap-3 items-center flex-1 justify-end">
          {/* Cruise Line Filter */}
          <select
            value={filterLine}
            onChange={(e) => setFilterLine(e.target.value)}
            className="bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-xs font-bold text-gray-700 focus:outline-none cursor-pointer"
          >
            <option value="">All Cruise Lines</option>
            <option value="Royal Caribbean">Royal Caribbean</option>
            <option value="Celebrity Cruises">Celebrity Cruises</option>
            <option value="Princess Cruises">Princess Cruises</option>
          </select>

          {/* Duration Filter */}
          <select
            value={filterDuration}
            onChange={(e) => setFilterDuration(e.target.value)}
            className="bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-xs font-bold text-gray-700 focus:outline-none cursor-pointer"
          >
            <option value="">All Durations</option>
            <option value="7">7 Nights</option>
            <option value="10">10 Nights</option>
          </select>

          {/* Month Filter */}
          <select
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
            className="bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-xs font-bold text-gray-700 focus:outline-none cursor-pointer"
          >
            <option value="">All Months</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="December">December</option>
          </select>

          {/* Price Range Filter */}
          <div className="flex items-center gap-2 pl-2">
            <span className="text-[10px] text-gray-400 font-bold uppercase">Max Price: {formatRupee(maxPrice)}</span>
            <input
              type="range"
              min="800"
              max="5000"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              className="w-24 accent-[#BC2C2C] cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Cruise Results List */}
      <div className="space-y-6">
        {filteredCruises.map((cruise) => {
          const isCruiseSelected = selectedCruise?.id === cruise.id;

          return (
            <div 
              key={cruise.id}
              className={`bg-white rounded-3xl p-6 shadow-sm border transition-all duration-300 relative flex flex-col xl:flex-row gap-6 ${
                isCruiseSelected ? 'border-[#BC2C2C] ring-1 ring-[#BC2C2C]/20' : 'border-gray-150'
              }`}
            >
              {/* Image & Badges */}
              <div className="w-full xl:w-72 h-48 shrink-0 rounded-2xl overflow-hidden relative shadow-xs">
                <img src={cruise.image} alt={cruise.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                  {cruise.isPopular && (
                    <span className="px-2 py-0.5 bg-amber-500 text-white text-[8px] font-black uppercase tracking-wider rounded-md">
                      Popular
                    </span>
                  )}
                  {cruise.isFamilyFriendly && (
                    <span className="px-2 py-0.5 bg-emerald-500 text-white text-[8px] font-black uppercase tracking-wider rounded-md">
                      Family Pick
                    </span>
                  )}
                  {cruise.isLuxury && (
                    <span className="px-2 py-0.5 bg-indigo-600 text-white text-[8px] font-black uppercase tracking-wider rounded-md">
                      Elite Luxury
                    </span>
                  )}
                </div>
                <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-white/95 rounded-md text-[9px] font-extrabold text-gray-800 flex items-center gap-0.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" /> {cruise.rating}
                </div>
              </div>

              {/* Main specifications */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                        {cruise.cruiseLine} • {cruise.shipName}
                      </span>
                      <h4 className="text-sm font-black text-gray-900 mt-0.5 leading-tight">{cruise.name}</h4>
                    </div>

                    <div className="text-right">
                      <span className="text-[9px] text-emerald-600 font-bold uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                        {cruise.availability}
                      </span>
                    </div>
                  </div>

                  {/* Ports info & duration */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-3 bg-gray-50/50 rounded-2xl px-4 border border-gray-100 text-xs font-bold text-gray-800 my-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#BC2C2C]" />
                      <div>
                        <span className="text-[8px] text-gray-400 block uppercase font-bold">Duration</span>
                        <span>{cruise.durationNights} Nights</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#BC2C2C]" />
                      <div>
                        <span className="text-[8px] text-gray-400 block uppercase font-bold">Departure</span>
                        <span>{cruise.departureMonth}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Anchor className="w-4 h-4 text-indigo-500" />
                      <div>
                        <span className="text-[8px] text-gray-400 block uppercase font-bold">From Port</span>
                        <span>{cruise.departurePort.split(',')[0]}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-500" />
                      <div>
                        <span className="text-[8px] text-gray-400 block uppercase font-bold">To Port</span>
                        <span>{cruise.arrivalPort.split(',')[0]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {cruise.highlights?.map((h: any, i: number) => (
                      <span key={i} className="text-[9px] bg-indigo-50 text-indigo-700 font-extrabold px-2 py-0.5 rounded-full border border-indigo-100/50">
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* Route Overview */}
                  <div className="text-[10px] text-gray-500 font-semibold mb-4 bg-red-50/20 border border-red-100/40 p-2.5 rounded-xl flex items-center gap-2">
                    <span className="font-extrabold text-[#BC2C2C] uppercase tracking-wider">Itinerary:</span>
                    <span>{cruise.routeOverview}</span>
                  </div>
                </div>

                {/* Cabin Selection System */}
                <div className="border-t border-gray-100 pt-4 mt-auto">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-2.5">
                    Select Cabin Category to Book
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {cabinNames.map(cab => {
                      const price = (cruise.startingPrice as any)[cab.key] || 0;
                      const isCabinSelected = isCruiseSelected && selectedCabin === cab.key;

                      return (
                        <button
                          key={cab.key}
                          type="button"
                          onClick={() => {
                            onSelectCruise(cruise);
                            onSelectCabin(cab.key);
                          }}
                          className={`p-2.5 rounded-xl border text-center transition-all flex flex-col justify-between h-16 ${
                            isCabinSelected
                              ? 'border-[#BC2C2C] bg-[#BC2C2C]/5 text-[#BC2C2C] ring-1 ring-[#BC2C2C]/20 shadow-xs'
                              : 'border-gray-150 bg-white hover:bg-gray-50 hover:border-gray-200'
                          }`}
                        >
                          <span className="text-[10px] font-bold text-gray-600 uppercase block">{cab.label}</span>
                          <span className={`text-xs font-black block mt-1 ${isCabinSelected ? 'text-[#BC2C2C]' : 'text-gray-900'}`}>
                            {formatRupee(price)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
