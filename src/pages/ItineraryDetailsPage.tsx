import React from 'react';
import { Download, Share2, Users, Calendar, MapPin, Award, Star } from 'lucide-react';
import { DaySection, type DayData } from '../components/itinerary/DaySection';
import { DaySummaryCard } from '../components/itinerary/DaySummaryCard';
import { LocationMapCard } from '../components/itinerary/LocationMapCard';

const mockItinerary = {
  title: "6-Day Golden Triangle Expedition",
  travelers: 8,
  dates: "November 12 - November 17, 2026",
  location: "Delhi – Agra – Jaipur, India",
  days: [
    {
      id: "day-1",
      dayNumber: 1,
      title: "Royal Arrival in Jaipur",
      tag: "ARRIVAL DAY",
      activities: [
        {
          id: "act-1",
          category: "TRANSFER",
          image: "https://images.unsplash.com/photo-1599687267812-35c05ff70ee9?auto=format&fit=crop&q=80&w=800",
          time: "10:30 AM - 11:45 AM",
          statusType: "confirmed",
          statusLabel: "SUPPLIER CONFIRMED",
          title: "Chauffeured Luxury SUV Transfer to Rambagh Palace",
          description: "Personal airport greeting at Jaipur International (JAI). Toyota Vellfire luxury transport with fresh cooling towels and spiced chai refreshment...",
          context: {
            type: "avatars",
            avatars: [
              { img: "https://i.pravatar.cc/100?img=12" },
              { img: "https://i.pravatar.cc/100?img=15" },
              { img: "https://i.pravatar.cc/100?img=17", moreCount: 6 }
            ]
          },
          actions: [
            { label: "View Details", icon: "external", type: "text" }
          ]
        },
        {
          id: "act-2",
          category: "ACCOMMODATION",
          image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
          time: "02:00 PM - CHECK-IN",
          statusType: "secured",
          statusLabel: "RESERVATION SECURED",
          title: "Check-in at The Rambagh Palace, Place Vendôme Suite",
          description: "Exclusive royal welcome with fresh rose petal shower, traditional tilak ceremony, and personal butler assignment. Group housed in historical Palace Suites.",
          context: {
            type: "tags",
            items: ["4 Royal Suites", "Personal Butler Services"]
          },
          actions: [
            { label: "View Voucher", icon: "download", type: "text" }
          ]
        }
      ]
    },
    {
      id: "day-2",
      dayNumber: 2,
      title: "Amber Fort & Astronomical Marvels",
      tag: "CONFIRMED",
      activities: [
        {
          id: "act-3",
          category: "CULTURAL",
          image: "https://images.unsplash.com/photo-1477584308802-dd4537b4e68e?auto=format&fit=crop&q=80&w=800",
          time: "08:30 AM - 01:00 PM",
          statusType: "pending",
          statusLabel: "PENDING APPROVAL",
          title: "Amber Fort Expedition & Jeep Ascent",
          description: "Private guided tour of the Mughal-Rajput fortress. Features access to the Sheesh Mahal (Mirror Palace) and a masterclass on ancient astronomy at Jantar Mantar.",
          context: {
            type: "tags",
            items: ["Local Archeology Expert", "Private Jeep Transfer"]
          },
          actions: [
            { icon: "edit", type: "icon" },
            { icon: "delete", type: "danger" }
          ]
        },
        {
          id: "act-4",
          category: "GASTRONOMY",
          image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=800",
          time: "07:30 PM - 10:30 PM",
          statusType: "confirmed",
          statusLabel: "CONFIRMED",
          title: "Imperial Dining at Suvarna Mahal Restaurant",
          description: "Traditional Rajasthani Thali feast served on gold-plated dinnerware. Under the crystal chandeliers of the palace's historic banquet room.",
          context: {
            type: "tags",
            items: ["Dietary: Gluten Free Options Available"]
          },
          actions: [
            { label: "Menu Details", icon: "menu", type: "text" }
          ]
        }
      ]
    }
  ]
};

export function ItineraryDetailsPage() {
  return (
    <div className="animate-in fade-in duration-500 pb-12">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm font-medium text-gray-500 mb-6">
        <a href="#" className="hover:text-gray-900 transition-colors">Tourism</a>
        <span className="mx-2 text-gray-300">&gt;</span>
        <span className="text-gray-900">Itineraries</span>
      </nav>

      {/* Header Section */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">
            {mockItinerary.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-gray-600">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-400" />
              {mockItinerary.travelers} Travelers
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              {mockItinerary.dates}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              {mockItinerary.location}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
            <Download className="w-4 h-4 text-gray-500" />
            Export PDF
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#E65A4B] to-[#F17361] text-white rounded-xl text-sm font-semibold shadow-soft hover:shadow-lg transition-shadow">
            <Share2 className="w-4 h-4" />
            Share Itinerary
          </button>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column (70%) */}
        <div className="w-full lg:w-[70%]">
          {mockItinerary.days.map((day) => (
            <DaySection key={day.id} day={day as DayData} />
          ))}
        </div>

        {/* Right Column (30%) */}
        <div className="w-full lg:w-[30%] space-y-6">
          {/* Guide Profile Bio-sketch */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="Karan Singh" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <h4 className="text-xs font-black text-gray-900">Karan Singh</h4>
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Expert Tour Historian</p>
              </div>
            </div>

            <p className="text-[11px] text-gray-600 leading-relaxed font-semibold">
              Karan holds a PhD in Rajput Architecture and pre-colonial military history. Born and raised in Jaipur, he has hosted VIP delegates, archeologists, and film teams across Rajasthan's palaces for over 12 years.
            </p>

            <div className="pt-3 border-t border-gray-50 flex items-center justify-between text-[10px] font-bold text-gray-500">
              <div className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> 4.98 Rating</div>
              <span>Jaipur Archeology Guild</span>
            </div>
          </div>

          <DaySummaryCard />
          <LocationMapCard />
        </div>
      </div>
    </div>
  );
}
