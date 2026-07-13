import { useState } from 'react';
import { BedDouble, Check, Star, ShieldAlert, ArrowRightLeft, Plane, MapPin, X } from 'lucide-react';
import { formatRupee } from '../../lib/utils';
import { useMasterData } from '../../context/MasterDataContext';
import type { HotelDetails } from '../../data/tourismData';

interface Hotel {
  id: string;
  name: string;
  price: number;
  stars: number;
  image?: string;
  city?: string;
}

interface HotelRecommendationBoardProps {
  selectedHotels: Hotel[];
  onUpdateHotels: (hotels: Hotel[]) => void;
  selectedDestinations: { name: string }[];
}

export function HotelRecommendationBoard({
  selectedHotels,
  onUpdateHotels,
  selectedDestinations
}: HotelRecommendationBoardProps) {
  const { masters } = useMasterData();
  const [comparedIds, setComparedIds] = useState<string[]>([]);
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  // Extract selected cities
  const selectedCities = selectedDestinations.map(d => d.name.split(',')[0].trim());

  const activeHotels = masters.hotels.filter(h => h.status === 'Active').map(h => ({
    id: h.id,
    name: h.name,
    city: h.location?.split(',')[0].trim() || 'Jaipur',
    country: h.location?.split(',')[1]?.trim() || 'India',
    stars: h.stars || 4,
    address: h.location || 'Central Area',
    area: h.location || 'Central Area',
    direction: 'Central',
    distCenter: '1.5 km',
    distAirport: '10 km',
    amenities: (h as any).amenities || ['Spa', 'Pool', 'Gourmet Dining', 'Wifi'],
    startingPrice: h.price || 300,
    roomTypes: ['Standard Room', 'Deluxe Room', 'Executive Suite'],
    guestRating: (h as any).guestRating || 4.7,
    image: h.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&h=150&fit=crop',
    description: h.description || ''
  }));

  // Filter recommendations based on active destination selections
  const getFilteredHotels = (): HotelDetails[] => {
    if (selectedCities.length === 0) {
      return activeHotels; // Return all if none selected
    }
    return activeHotels.filter(h => 
      selectedCities.some(city => city.toLowerCase() === h.city.toLowerCase())
    );
  };

  const recommendedHotels = getFilteredHotels();

  const handleToggleSelect = (hotel: HotelDetails) => {
    const isAlreadySelected = selectedHotels.some(h => h.id === hotel.id);
    if (isAlreadySelected) {
      onUpdateHotels(selectedHotels.filter(h => h.id !== hotel.id));
    } else {
      onUpdateHotels([...selectedHotels, {
        id: hotel.id,
        name: hotel.name,
        price: hotel.startingPrice,
        stars: hotel.stars,
        image: hotel.image,
        city: hotel.city
      }]);
    }
  };

  const handleToggleCompare = (id: string) => {
    setComparedIds(prev => {
      if (prev.includes(id)) {
        const next = prev.filter(x => x !== id);
        if (next.length === 0) setCompareModalOpen(false);
        return next;
      }
      if (prev.length >= 3) return prev; // Limit comparison to 3 hotels
      return [...prev, id];
    });
  };

  const comparedHotels = activeHotels.filter(h => comparedIds.includes(h.id));

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
      <div className="flex justify-between items-center mb-6 border-b border-gray-50 pb-3">
        <div>
          <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <BedDouble className="w-4 h-4 text-rose-500" /> Premium Hotel recommendations
          </h3>
          <p className="text-xs text-gray-400 font-medium mt-1">Curated stays matching selected destinations.</p>
        </div>

        {comparedIds.length > 0 && (
          <button
            type="button"
            onClick={() => setCompareModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 border border-indigo-150 text-[10px] font-extrabold text-indigo-700 rounded-xl hover:bg-indigo-100 transition-colors"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" /> Compare ({comparedIds.length}/3)
          </button>
        )}
      </div>

      {recommendedHotels.length === 0 ? (
        <div className="p-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <ShieldAlert className="w-8 h-8 text-gray-300 mx-auto mb-2" />
          <p className="text-xs font-bold text-gray-500">No hotels matching selected destinations.</p>
          <p className="text-[10px] text-gray-400 mt-1 font-semibold">Please select destinations in Step 1 to populate hotels list.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendedHotels.map((hotel) => {
            const isSelected = selectedHotels.some(h => h.id === hotel.id);
            const isCompared = comparedIds.includes(hotel.id);

            return (
              <div 
                key={hotel.id}
                className={`border rounded-2xl p-4 transition-all duration-300 relative flex flex-col md:flex-row gap-4 bg-white hover:shadow-md ${
                  isSelected ? 'border-rose-500 bg-rose-50/5 ring-1 ring-rose-500/20' : 'border-gray-150'
                }`}
              >
                <div className="w-full md:w-32 h-32 shrink-0 rounded-xl overflow-hidden relative">
                  <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-white/95 rounded text-[8px] font-extrabold text-gray-700 border border-gray-100 flex items-center gap-0.5">
                    <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-500" /> {hotel.guestRating} Rating
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h4 className="text-xs font-black text-gray-900 leading-tight">{hotel.name}</h4>
                        <div className="flex items-center gap-0.5 mt-1">
                          {Array.from({ length: hotel.stars }).map((_, i) => (
                            <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-gray-400 block font-bold">Starting Price</span>
                        <span className="text-sm font-black text-rose-600">{formatRupee(hotel.startingPrice)}/night</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-3 text-[10px] font-bold text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#BC2C2C]" /> {hotel.area} ({hotel.direction})
                      </span>
                      <span className="flex items-center gap-1">
                        <BedDouble className="w-3 h-3 text-indigo-500" /> {hotel.distCenter} to Center
                      </span>
                      <span className="flex items-center gap-1 col-span-2">
                        <Plane className="w-3 h-3 text-emerald-500" /> {hotel.distAirport} to Airport
                      </span>
                    </div>

                    {/* Amenities list */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                        <span key={idx} className="text-[8px] bg-gray-50 text-gray-500 font-extrabold px-1.5 py-0.5 rounded border border-gray-100 uppercase">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="flex items-center gap-2 mt-4 border-t border-gray-50 pt-3">
                    <button
                      type="button"
                      onClick={() => handleToggleSelect(hotel)}
                      className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg transition-all flex items-center justify-center gap-1 ${
                        isSelected
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                          : 'bg-[#BC2C2C] text-white hover:bg-[#8B2020]'
                      }`}
                    >
                      {isSelected ? <Check className="w-3 h-3" /> : null}
                      {isSelected ? 'Stay Booked' : 'Select Stay'}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleToggleCompare(hotel.id)}
                      className={`px-2 py-1.5 rounded-lg border text-[10px] font-bold transition-all flex items-center gap-1 ${
                        isCompared 
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                          : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      <ArrowRightLeft className="w-3 h-3" />
                      {isCompared ? 'Comparing' : 'Compare'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Comparison Modal Catcher Drawer */}
      {compareModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl p-6 relative overflow-hidden animate-in zoom-in-95 duration-250">
            <button
              onClick={() => setCompareModalOpen(false)}
              className="absolute right-4 top-4 p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-sm font-black text-gray-900 mb-6 flex items-center gap-2">
              <ArrowRightLeft className="w-5 h-5 text-indigo-600" /> Hotel Side-by-Side Comparison
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs font-semibold text-gray-700 border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-left">
                    <th className="py-3 px-4 text-gray-400 uppercase tracking-widest text-[9px] font-bold">Feature</th>
                    {comparedHotels.map(h => (
                      <th key={h.id} className="py-3 px-4 font-black text-gray-950">{h.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <tr>
                    <td className="py-3 px-4 text-gray-400 font-bold">Star Class</td>
                    {comparedHotels.map(h => (
                      <td key={h.id} className="py-3 px-4">
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: h.stars }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-400 font-bold">Starting Price</td>
                    {comparedHotels.map(h => (
                      <td key={h.id} className="py-3 px-4 text-rose-600 font-black">{formatRupee(h.startingPrice)}/night</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-400 font-bold">Guest Rating</td>
                    {comparedHotels.map(h => (
                      <td key={h.id} className="py-3 px-4 text-gray-900 font-black">{h.guestRating} / 5.0</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-400 font-bold">Area / Zone</td>
                    {comparedHotels.map(h => (
                      <td key={h.id} className="py-3 px-4">{h.area} ({h.direction})</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-400 font-bold">Airport Distance</td>
                    {comparedHotels.map(h => (
                      <td key={h.id} className="py-3 px-4">{h.distAirport}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-400 font-bold">Center Distance</td>
                    {comparedHotels.map(h => (
                      <td key={h.id} className="py-3 px-4">{h.distCenter}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-400 font-bold">Amenities Included</td>
                    {comparedHotels.map(h => (
                      <td key={h.id} className="py-3 px-4">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {h.amenities.map((a: any, i: number) => (
                            <span key={i} className="text-[8px] bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded uppercase font-bold">
                              {a}
                            </span>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-400 font-bold">Room Categories</td>
                    {comparedHotels.map(h => (
                      <td key={h.id} className="py-3 px-4">
                        <span className="text-[10px] text-gray-500 font-medium block">{h.roomTypes.join(' | ')}</span>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={() => setCompareModalOpen(false)}
                className="px-5 py-2.5 bg-[#BC2C2C] text-white text-xs font-bold rounded-xl"
              >
                Close Comparison
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
