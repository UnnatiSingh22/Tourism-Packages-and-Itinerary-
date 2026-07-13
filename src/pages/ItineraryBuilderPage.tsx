import React, { useState, useEffect } from 'react';
import { BuilderHeader } from '../components/events/BuilderHeader';
import { BuilderTimeline } from '../components/events/BuilderTimeline';
import { VipPreferences } from '../components/events/VipPreferences';
import { AvailableResources } from '../components/events/AvailableResources';
import { Save, Share2, Send, RefreshCw } from 'lucide-react';
import { getPackages, getItinerary, createItineraryDay, deleteItineraryDay, approvePackage, reorderItinerary } from '../lib/api';

export function ItineraryBuilderPage() {
  const [packages, setPackages] = useState<any[]>([]);
  const [selectedPackageId, setSelectedPackageId] = useState<string>('');
  const [selectedPackageDetails, setSelectedPackageDetails] = useState<any | null>(null);
  const [days, setDays] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [localItineraryDays, setLocalItineraryDays] = useState<Record<string, any[]>>({});

  // 1. Load packages
  useEffect(() => {
    async function loadPackages() {
      try {
        const data = await getPackages();
        const list = data.data || data;
        
        const defaultPackages = [
          { id: 'pkg-default-1', name: 'Golden Triangle (Delhi – Agra – Jaipur)', code: 'PKG-GTT01', status: 'DRAFT', duration: 4, basePrice: 1500 },
          { id: 'pkg-default-2', name: 'Kerala Backwaters', code: 'PKG-KKB02', status: 'PUBLISHED', duration: 3, basePrice: 1200 },
          { id: 'pkg-default-3', name: 'Kashmir Escape', code: 'PKG-KME03', status: 'DRAFT', duration: 2, basePrice: 1800 },
          { id: 'pkg-default-4', name: 'Bali Honeymoon', code: 'PKG-BHM04', status: 'PUBLISHED', duration: 2, basePrice: 2100 },
          { id: 'pkg-default-5', name: 'Dubai Explorer', code: 'PKG-DXP05', status: 'DRAFT', duration: 2, basePrice: 1900 },
          { id: 'pkg-default-6', name: 'Thailand Adventure', code: 'PKG-THA06', status: 'PUBLISHED', duration: 2, basePrice: 1300 },
          { id: 'pkg-default-7', name: 'Rajasthan Heritage', code: 'PKG-RJH07', status: 'DRAFT', duration: 2, basePrice: 2200 },
          { id: 'pkg-default-8', name: 'Japan Sakura Tour', code: 'PKG-JST08', status: 'PUBLISHED', duration: 2, basePrice: 3200 },
          { id: 'pkg-default-9', name: 'Singapore Highlights', code: 'PKG-SGH09', status: 'DRAFT', duration: 2, basePrice: 1100 },
          { id: 'pkg-default-10', name: 'Europe Grand Tour', code: 'PKG-EGT10', status: 'PUBLISHED', duration: 3, basePrice: 4800 },
        ];

        const mergedList = [...list];
        defaultPackages.forEach(dp => {
          if (!mergedList.some(p => p.id === dp.id || p.name === dp.name)) {
            mergedList.push(dp);
          }
        });

        setPackages(mergedList);
        if (mergedList.length > 0 && !selectedPackageId) {
          setSelectedPackageId(mergedList[0].id);
        }
      } catch (err) {
        console.error('Failed to load packages:', err);
        const defaultPackages = [
          { id: 'pkg-default-1', name: 'Golden Triangle (Delhi – Agra – Jaipur)', code: 'PKG-GTT01', status: 'DRAFT', duration: 4, basePrice: 1500 },
          { id: 'pkg-default-2', name: 'Kerala Backwaters', code: 'PKG-KKB02', status: 'PUBLISHED', duration: 3, basePrice: 1200 },
          { id: 'pkg-default-3', name: 'Kashmir Escape', code: 'PKG-KME03', status: 'DRAFT', duration: 2, basePrice: 1800 },
          { id: 'pkg-default-4', name: 'Bali Honeymoon', code: 'PKG-BHM04', status: 'PUBLISHED', duration: 2, basePrice: 2100 },
          { id: 'pkg-default-5', name: 'Dubai Explorer', code: 'PKG-DXP05', status: 'DRAFT', duration: 2, basePrice: 1900 },
          { id: 'pkg-default-6', name: 'Thailand Adventure', code: 'PKG-THA06', status: 'PUBLISHED', duration: 2, basePrice: 1300 },
          { id: 'pkg-default-7', name: 'Rajasthan Heritage', code: 'PKG-RJH07', status: 'DRAFT', duration: 2, basePrice: 2200 },
          { id: 'pkg-default-8', name: 'Japan Sakura Tour', code: 'PKG-JST08', status: 'PUBLISHED', duration: 2, basePrice: 3200 },
          { id: 'pkg-default-9', name: 'Singapore Highlights', code: 'PKG-SGH09', status: 'DRAFT', duration: 2, basePrice: 1100 },
          { id: 'pkg-default-10', name: 'Europe Grand Tour', code: 'PKG-EGT10', status: 'PUBLISHED', duration: 3, basePrice: 4800 },
        ];
        setPackages(defaultPackages);
        if (!selectedPackageId) {
          setSelectedPackageId(defaultPackages[0].id);
        }
      }
    }
    loadPackages();
  }, [refreshTrigger]);

  // 2. Load itinerary days
  useEffect(() => {
    if (!selectedPackageId) return;

    const found = packages.find(p => p.id === selectedPackageId);
    if (found) {
      setSelectedPackageDetails(found);
    }

    async function loadItinerary() {
      setLoading(true);
      try {
        let data: any[] = [];
        if (selectedPackageId.startsWith('pkg-default')) {
          if (localItineraryDays[selectedPackageId]) {
            data = localItineraryDays[selectedPackageId];
          } else {
            const packageItineraries: Record<string, { title: string; description: string }[]> = {
              'pkg-default-1': [
                { title: 'Arrival in Delhi & Heritage Tour', description: 'Airport transfers to Imperial Hotel. Guided tour of Old Delhi and rickshaw ride through Chandni Chowk.' },
                { title: 'Taj Mahal Sunset Tour in Agra', description: 'Morning drive to Agra. Check-in at Oberoi Amarvilas. Guided sunset tour of the Taj Mahal.' },
                { title: 'Agra Fort & Drive to Jaipur', description: 'Visit Agra Fort. Drive to Jaipur with a stop at Fatehpur Sikri. Check-in at Rambagh Palace.' },
                { title: 'Jaipur Fort Palace Exploration', description: 'Morning jeep ascent to Amber Fort. Afternoon tour of City Palace and Jantar Mantar observatory.' }
              ],
              'pkg-default-2': [
                { title: 'Kochi Arrival & Heritage Walk', description: 'Greeting at Kochi airport, transfer to Brunton Boatyard. Evening Fort Kochi walk and Kathakali show.' },
                { title: 'Houseboat Boarding & Alleppey Cruise', description: 'Drive to Alleppey. Board luxury private Kettuvallam houseboat. Vembanad lake cruise.' },
                { title: 'Munnar Tea Plantation Estates', description: 'Disembark houseboat, drive to Munnar hills. Check-in at tea resort and estate walking tour.' }
              ],
              'pkg-default-3': [
                { title: 'Srinagar Arrival & Shikara Ride', description: 'Fly to Srinagar, luxury transfer to private houseboat on Dal Lake. Sunset Shikara ride.' },
                { title: 'Gulmarg Gondola & Alpine Valleys', description: 'Full-day tour to Gulmarg. High-altitude Gondola ride to Apharwat Peak for stunning views.' }
              ],
              'pkg-default-4': [
                { title: 'Denpasar Arrival & Uluwatu Cliff Temple', description: 'Transfer to luxury villa in Jimbaran. Evening sunset visit to Uluwatu Temple with Kecak fire dance.' },
                { title: 'Ubud Sacred Monkey Forest & Rice Terraces', description: 'Day trip to Ubud. Tour Tegallalang rice terraces, holy spring temple, and local art markets.' }
              ],
              'pkg-default-5': [
                { title: 'Dubai Arrival & Burj Khalifa VIP Access', description: 'Transfer to Armani Hotel. Skip-the-line VIP access to Burj Khalifa 148th floor observatory.' },
                { title: 'Desert Conservation Reserve & Dune Dinner', description: 'Luxury 4x4 desert safari. Sunset falconry show and gourmet private dining under the stars.' }
              ],
              'pkg-default-6': [
                { title: 'Bangkok Grand Palace & Temples', description: 'Visit Temple of Emerald Buddha and Wat Pho. Evening private Chao Phraya river dinner cruise.' },
                { title: 'Phuket Yacht Charter & Phi Phi Islands', description: 'Flight to Phuket. Board private catamaran to Phi Phi Leh lagoon and Maya Beach snorkeling.' }
              ],
              'pkg-default-7': [
                { title: 'Udaipur Lake Palace Welcome', description: 'Welcome tilak ceremony at Taj Lake Palace. Afternoon boat ride on Lake Pichola.' },
                { title: 'Jodhpur Blue City Heritage Walk', description: 'Drive to Jodhpur. Guided walk through blue-painted lanes and private tour of Mehrangarh Fort.' }
              ],
              'pkg-default-8': [
                { title: 'Tokyo Neon Nights & Shinjuku Gardens', description: 'Arrive in Tokyo. Tour Shinjuku Gyoen national garden and evening Shibuya crossing skydeck.' },
                { title: 'Kyoto Temple Trails & Cherry Blossoms', description: 'Bullet train to Kyoto. Visit Kiyomizu-dera temple and Gion historic district walk.' }
              ],
              'pkg-default-9': [
                { title: 'Gardens by the Bay & Marina SkyPark', description: 'Walk through Flower Dome and Cloud Forest. Evening light show and skybridge dining.' },
                { title: 'Sentosa Private Beach Cabana', description: 'Cable car ride to Sentosa. Private beachfront cabana and Universal Studios VIP pass.' }
              ],
              'pkg-default-10': [
                { title: 'London Tower Bridge & Private Eye Capsule', description: 'Arrive in London. VIP private capsule ride on the London Eye. Dinner at Savoy Grill.' },
                { title: 'Paris Louvre Guided Tour & Eiffel Dining', description: 'Eurostar train to Paris. Curator-guided tour of Louvre Museum. Sunset dining at Eiffel Tower.' },
                { title: 'Rome Colosseum Arena & Vatican Galleries', description: 'Fly to Rome. Exclusive archaeologist-led access to Colosseum arena floor and Vatican museums.' }
              ]
            };

            const selectedItin = packageItineraries[selectedPackageId] || [
              { title: 'Arrival & Welcome Dinner', description: 'VIP transfers from airport, check-in, evening cocktails & welcome dinner.' },
              { title: 'Historical Guided Circuit', description: 'Morning guided exploration of major historical sights.' }
            ];

            data = selectedItin.map((day, index) => ({
              id: `day-${index + 1}`,
              dayNumber: index + 1,
              title: day.title,
              description: day.description,
              activities: []
            }));
            setLocalItineraryDays(prev => ({
              ...prev,
              [selectedPackageId]: data
            }));
          }
        } else {
          data = await getItinerary(selectedPackageId);
        }
        // Sort days by dayNumber
        const sorted = (data || []).sort((a: any, b: any) => a.dayNumber - b.dayNumber);
        setDays(sorted);
      } catch (err) {
        console.error('Failed to load itinerary:', err);
        setDays([]);
      } finally {
        setLoading(false);
      }
    }
    loadItinerary();
  }, [selectedPackageId, packages, refreshTrigger]);

  // 3. Add a new day/block
  const handleAddDay = async (dayData: any) => {
    if (!selectedPackageId) return;
    try {
      setLoading(true);
      if (selectedPackageId.startsWith('pkg-default')) {
        const newBlock = {
          id: `day-${Date.now()}`,
          dayNumber: Number(dayData.dayNumber),
          title: dayData.title,
          description: dayData.description,
          accommodation: dayData.accommodation || '',
          activities: []
        };
        const currentDays = localItineraryDays[selectedPackageId] || [
          { id: 'day-1', dayNumber: 1, title: 'Arrival & Welcome Dinner', description: 'VIP transfers from airport, check-in, evening cocktails & welcome dinner.', activities: [] },
          { id: 'day-2', dayNumber: 2, title: 'Historical Guided Circuit', description: 'Morning guided exploration of major historical sights and private gallery viewings.', activities: [] },
          { id: 'day-3', dayNumber: 3, title: 'Leisure Day & Yacht Cruise', description: 'Private sunset yacht cruise with catered dining and champagne.', activities: [] }
        ];
        const updatedDays = [...currentDays, newBlock].sort((a: any, b: any) => a.dayNumber - b.dayNumber);
        setLocalItineraryDays(prev => ({
          ...prev,
          [selectedPackageId]: updatedDays
        }));
        setDays(updatedDays);
      } else {
        await createItineraryDay(selectedPackageId, dayData);
        setRefreshTrigger(prev => prev + 1);
      }
    } catch (err: any) {
      alert(`Failed to add block: ${err.message || err}`);
    } finally {
      setLoading(false);
    }
  };

  // 4. Delete day/block
  const handleDeleteDay = async (dayId: string) => {
    if (!confirm('Are you sure you want to delete this itinerary block?')) return;
    try {
      setLoading(true);
      if (selectedPackageId.startsWith('pkg-default')) {
        const currentDays = localItineraryDays[selectedPackageId] || [];
        const updatedDays = currentDays.filter((d: any) => d.id !== dayId);
        setLocalItineraryDays(prev => ({
          ...prev,
          [selectedPackageId]: updatedDays
        }));
        setDays(updatedDays);
      } else {
        await deleteItineraryDay(dayId);
        setRefreshTrigger(prev => prev + 1);
      }
    } catch (err: any) {
      alert(`Failed to delete block: ${err.message || err}`);
    } finally {
      setLoading(false);
    }
  };

  // 5. Reorder days
  const handleReorderDays = async (dayIds: string[]) => {
    if (!selectedPackageId) return;
    try {
      setLoading(true);
      if (selectedPackageId.startsWith('pkg-default')) {
        const currentDays = localItineraryDays[selectedPackageId] || [];
        const reordered = dayIds.map(id => currentDays.find((d: any) => d.id === id)).filter(Boolean);
        const updatedDays = reordered.map((d: any, idx) => ({ ...d, dayNumber: idx + 1 }));
        setLocalItineraryDays(prev => ({
          ...prev,
          [selectedPackageId]: updatedDays
        }));
        setDays(updatedDays);
      } else {
        await reorderItinerary(selectedPackageId, dayIds);
        setRefreshTrigger(prev => prev + 1);
      }
    } catch (err: any) {
      alert(`Reordering failed: ${err.message || err}`);
    } finally {
      setLoading(false);
    }
  };

  // 6. Publish Itinerary
  const handlePublish = async () => {
    if (!selectedPackageId) return;
    if (selectedPackageId.startsWith('pkg-default')) {
      alert('Mock itinerary package successfully published!');
      return;
    }
    try {
      setLoading(true);
      await approvePackage(selectedPackageId);
      alert('Itinerary package successfully published!');
      setRefreshTrigger(prev => prev + 1);
    } catch (err: any) {
      alert(`Publish failed: ${err.message || err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-12 flex flex-col h-[calc(100vh-6rem)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-1">
            Itinerary Builder
          </h1>
          <p className="text-sm text-gray-500">
            Design and manage premium guest experiences.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Select Package</span>
            <select
              value={selectedPackageId}
              onChange={(e) => setSelectedPackageId(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E65A4B]"
            >
              {packages.length === 0 ? (
                <option value="">No packages available</option>
              ) : (
                packages.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.status})
                  </option>
                ))
              )}
            </select>
          </div>

          <button
            onClick={() => setRefreshTrigger(prev => prev + 1)}
            className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 shadow-sm transition-colors mt-5"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          {selectedPackageDetails?.status !== 'PUBLISHED' && (
            <button
              onClick={handlePublish}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#E65A4B] to-[#F17361] text-white rounded-xl text-sm font-semibold shadow-sm hover:shadow-md transition-shadow mt-5 disabled:opacity-50"
            >
              <Send className="w-4 h-4" /> Publish Itinerary
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 flex-1 min-h-0">
        {/* Left Column: Timeline Builder */}
        <div className="w-full lg:w-[65%] xl:w-[70%] flex flex-col h-full">
          <BuilderHeader 
            packageName={selectedPackageDetails?.name}
            packageCode={selectedPackageDetails?.code}
            duration={selectedPackageDetails?.duration}
          />
          <div className="flex-1 overflow-y-auto pr-4 scrollbar-hide">
            <BuilderTimeline 
              days={days}
              onAddDay={handleAddDay}
              onDeleteDay={handleDeleteDay}
              onReorderDays={handleReorderDays}
              loading={loading}
            />
          </div>
        </div>

        {/* Right Column: Tools & Resources */}
        <div className="w-full lg:w-[35%] xl:w-[30%] flex flex-col h-full">
          <VipPreferences />
          <AvailableResources />
        </div>
      </div>
    </div>
  );
}
