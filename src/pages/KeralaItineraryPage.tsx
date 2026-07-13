import React from 'react';
import { Share2, Edit3, Award, Star } from 'lucide-react';
import { KeralaDaySection, type KeralaDay } from '../components/kerala/KeralaDaySection';
import { RouteOverviewCard } from '../components/kerala/RouteOverviewCard';
import { ResourceStatusCard } from '../components/kerala/ResourceStatusCard';
import { ConciergeCard } from '../components/kerala/ConciergeCard';

const mockKeralaData = {
  title: "Kerala Backwaters & Tropical Escape",
  description: "A curated 7-day cruise and wellness expedition through India's spice coastline, tranquil Vembanad lagoon channels, and heritage luxury retreats.",
  packageType: "Premium Ecotourism",
  packageId: "ITN-88430",
  days: [
    {
      dayNumber: "01",
      title: "Arrival & Spice Harbor Welcome",
      subtitle: "Kochi International to Fort Kochi",
      activities: [
        {
          id: "act-1",
          image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=800",
          time: "14:00",
          category: "Private Transport",
          status: "Confirmed",
          title: "Chauffeured EV SUV Transfer to Kochi Port",
          description: "Greeting at Kochi airport (COK) with cardamon-infused drinks. Direct private transfer to the historic Brunton Boatyard Hotel, overlooking Kochi Harbor."
        },
        {
          id: "act-2",
          image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800",
          time: "19:30",
          category: "Dining Experience",
          status: "Confirmed",
          title: "Traditional Malabar Seafood Feast",
          description: "Curated welcome banquet at The History Restaurant, featuring traditional Karimeen Pollichathu (pearl spot fish baked in banana leaf)."
        }
      ]
    },
    {
      dayNumber: "02",
      title: "Vembanad Lake Houseboat Cruise",
      subtitle: "Kettuvallam Private Expedition",
      activities: [
        {
          id: "act-3",
          image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800",
          time: "09:00",
          category: "Nautical Cruises",
          status: "Confirmed",
          title: "Full-day Private Luxury Kettuvallam Charter",
          description: "Board a traditional thatched-roof houseboat. Glide through narrow canals, stop at a local coconut grove, and enjoy a traditional lunch served on banana leaves."
        }
      ]
    }
  ]
};

export function KeralaItineraryPage() {
  return (
    <div className="animate-in fade-in duration-500 pb-12 relative">
      
      {/* Background Vertical Line spanning the left side */}
      <div className="absolute left-[23px] top-[140px] bottom-0 w-[2px] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMiIgaGVpZ2h0PSI4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjQiIGZpbGw9IiNFNjVBNEIiLz48L3N2Zz4=')] bg-repeat-y -z-10 hidden md:block"></div>

      {/* Header Section */}
      <div className="flex flex-col xl:flex-row justify-between gap-6 mb-12">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-orange-100/70 text-orange-700 text-xs font-bold rounded-full">
              {mockKeralaData.packageType}
            </span>
            <span className="text-xs text-gray-400 font-medium">
              • Package ID: {mockKeralaData.packageId}
            </span>
          </div>
          
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            {mockKeralaData.title}
          </h1>
          <p className="text-gray-600 text-base leading-relaxed">
            {mockKeralaData.description}
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
            <Share2 className="w-4 h-4" />
            Share Itinerary
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#E65A4B] to-[#F17361] text-white rounded-xl text-sm font-semibold shadow-soft hover:shadow-lg transition-shadow">
            <Edit3 className="w-4 h-4" />
            Modify Schedule
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Column (Activities) */}
        <div className="w-full lg:w-[65%] xl:w-[70%]">
          {mockKeralaData.days.map((day) => (
            <KeralaDaySection key={day.dayNumber} day={day as KeralaDay} />
          ))}
        </div>

        {/* Right Column (Cards) */}
        <div className="w-full lg:w-[35%] xl:w-[30%] space-y-6">
          {/* Guide Profile Bio-sketch */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="Devi Nair" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <h4 className="text-xs font-black text-gray-900">Devi Nair</h4>
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Naturalist Guide</p>
              </div>
            </div>

            <p className="text-[11px] text-gray-600 leading-relaxed font-semibold">
              Devi is a veteran Kerala ecotourism naturalist guide with over 15 years of experience. She specializes in regional backwater biodiversity, bird migration patterns, and local culinary heritage.
            </p>

            <div className="pt-3 border-t border-gray-50 flex items-center justify-between text-[10px] font-bold text-gray-500">
              <div className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> 4.95 Rating</div>
              <span>Kerala Naturalists Guild</span>
            </div>
          </div>

          <RouteOverviewCard />
          <ResourceStatusCard />
          <ConciergeCard />
        </div>

      </div>
    </div>
  );
}
