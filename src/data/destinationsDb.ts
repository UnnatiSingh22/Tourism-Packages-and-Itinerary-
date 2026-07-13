export interface DestinationStat {
  name: string;
  location: string;
  region: string;
  bookings: number;
  revenue: number;
  occupancy: string;
  avgPkgValue: number;
  satisfaction: string;
  cancellationRate: string;
  growth: string;
  costPerGuest: number;
  alert: string;
  weather: {
    temp: string;
    desc: string;
    forecast: { day: string; temp: string; desc: string }[];
    advisory: string;
  };
  trend: string;
  trendColor: string;
  img: string;
  type: string;
  typeColor: string;
}

export const DESTINATIONS_DB: Record<string, DestinationStat> = {
  'French Riviera': {
    name: 'French Riviera',
    location: 'Cannes & Nice',
    region: 'Europe',
    bookings: 420,
    revenue: 1420000,
    occupancy: '92%',
    avgPkgValue: 3380,
    satisfaction: '4.85/5',
    cancellationRate: '1.8%',
    growth: '+18%',
    costPerGuest: 180,
    alert: 'Flight delays (LCCs)',
    weather: {
      temp: '24°C',
      desc: 'Sunny & Breeze',
      forecast: [
        { day: 'Mon', temp: '24°C', desc: 'Sunny' },
        { day: 'Tue', temp: '25°C', desc: 'Sunny' },
        { day: 'Wed', temp: '23°C', desc: 'Partly Cloudy' },
        { day: 'Thu', temp: '22°C', desc: 'Showers' },
        { day: 'Fri', temp: '24°C', desc: 'Clear Sky' }
      ],
      advisory: 'Minor flight delays expected due to coastal traffic controls.'
    },
    trend: '+12%',
    trendColor: 'text-emerald-500',
    img: 'https://images.unsplash.com/photo-1533676802871-eca1ae998cd5?w=100&h=100&fit=crop',
    type: 'Gala Awards',
    typeColor: 'bg-purple-50 text-purple-600'
  },
  'Switzerland': {
    name: 'Switzerland',
    location: 'Zermatt & Geneva',
    region: 'Europe',
    bookings: 180,
    revenue: 2950000,
    occupancy: '94%',
    avgPkgValue: 16380,
    satisfaction: '4.96/5',
    cancellationRate: '1.1%',
    growth: '+14%',
    costPerGuest: 580,
    alert: 'Alpine track closures',
    weather: {
      temp: '16°C',
      desc: 'Crisp & Clear',
      forecast: [
        { day: 'Mon', temp: '16°C', desc: 'Clear' },
        { day: 'Tue', temp: '15°C', desc: 'Partly Cloudy' },
        { day: 'Wed', temp: '14°C', desc: 'Light Rain' },
        { day: 'Thu', temp: '15°C', desc: 'Sunny' },
        { day: 'Fri', temp: '17°C', desc: 'Sunny' }
      ],
      advisory: 'High-altitude railway construction near Zermatt, plan transfers early.'
    },
    trend: '+16%',
    trendColor: 'text-emerald-500',
    img: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=100&h=100&fit=crop',
    type: 'Alpine Luxury',
    typeColor: 'bg-blue-50 text-blue-600'
  },
  'Kyoto': {
    name: 'Kyoto',
    location: 'Higashiyama District',
    region: 'Asia',
    bookings: 290,
    revenue: 985500,
    occupancy: '78%',
    avgPkgValue: 3400,
    satisfaction: '4.90/5',
    cancellationRate: '2.4%',
    growth: '+12%',
    costPerGuest: 205,
    alert: 'Peak crowd congestion',
    weather: {
      temp: '21°C',
      desc: 'Overcast',
      forecast: [
        { day: 'Mon', temp: '20°C', desc: 'Overcast' },
        { day: 'Tue', temp: '22°C', desc: 'Partly Cloudy' },
        { day: 'Wed', temp: '23°C', desc: 'Sunny' },
        { day: 'Thu', temp: '21°C', desc: 'Light Rain' },
        { day: 'Fri', temp: '22°C', desc: 'Clear' }
      ],
      advisory: 'Heavy crowd congestion at Bamboo Forest. Recommended morning departures.'
    },
    trend: 'Stable',
    trendColor: 'text-gray-500',
    img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=100&h=100&fit=crop',
    type: 'Executive Retreat',
    typeColor: 'bg-amber-50 text-amber-700'
  },
  'Bali': {
    name: 'Bali',
    location: 'Ubud & Seminyak',
    region: 'Asia',
    bookings: 380,
    revenue: 1420000,
    occupancy: '82%',
    avgPkgValue: 3730,
    satisfaction: '4.80/5',
    cancellationRate: '2.2%',
    growth: '+15%',
    costPerGuest: 160,
    alert: 'Beach tide warnings',
    weather: {
      temp: '29°C',
      desc: 'Tropical Humidity',
      forecast: [
        { day: 'Mon', temp: '29°C', desc: 'Humid' },
        { day: 'Tue', temp: '30°C', desc: 'Thunderstorms' },
        { day: 'Wed', temp: '28°C', desc: 'Rain' },
        { day: 'Thu', temp: '29°C', desc: 'Partly Cloudy' },
        { day: 'Fri', temp: '30°C', desc: 'Sunny' }
      ],
      advisory: 'High tides alert at Uluwatu Cliff. Coastal operations paused after 17:00.'
    },
    trend: '+15%',
    trendColor: 'text-emerald-500',
    img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=100&h=100&fit=crop',
    type: 'Wellness Retreat',
    typeColor: 'bg-emerald-50 text-emerald-600'
  },
  'Thailand': {
    name: 'Thailand',
    location: 'Bangkok & Phuket',
    region: 'Asia',
    bookings: 450,
    revenue: 1250000,
    occupancy: '85%',
    avgPkgValue: 2780,
    satisfaction: '4.75/5',
    cancellationRate: '2.5%',
    growth: '+17%',
    costPerGuest: 140,
    alert: 'Monsoon heavy rain',
    weather: {
      temp: '28°C',
      desc: 'Heavy Rain Showers',
      forecast: [
        { day: 'Mon', temp: '28°C', desc: 'Rain' },
        { day: 'Tue', temp: '27°C', desc: 'Heavy Rain' },
        { day: 'Wed', temp: '29°C', desc: 'Showers' },
        { day: 'Thu', temp: '30°C', desc: 'Partly Cloudy' },
        { day: 'Fri', temp: '30°C', desc: 'Sunny' }
      ],
      advisory: 'Heavy rainfall in Phuket. Water sports and boat transfers suspended.'
    },
    trend: '+17%',
    trendColor: 'text-emerald-500',
    img: 'https://images.unsplash.com/photo-1528181304800-2f5353a98ef3?w=100&h=100&fit=crop',
    type: 'Beach Adventure',
    typeColor: 'bg-teal-50 text-teal-600'
  },
  'Japan': {
    name: 'Japan',
    location: 'Tokyo & Kyoto',
    region: 'Asia',
    bookings: 340,
    revenue: 2080000,
    occupancy: '90%',
    avgPkgValue: 6110,
    satisfaction: '4.88/5',
    cancellationRate: '1.6%',
    growth: '+25%',
    costPerGuest: 320,
    alert: 'Train signal delay',
    weather: {
      temp: '18°C',
      desc: 'Cool & Sunny',
      forecast: [
        { day: 'Mon', temp: '17°C', desc: 'Sunny' },
        { day: 'Tue', temp: '18°C', desc: 'Sunny' },
        { day: 'Wed', temp: '19°C', desc: 'Clear' },
        { day: 'Thu', temp: '16°C', desc: 'Chilly' },
        { day: 'Fri', temp: '18°C', desc: 'Sunny' }
      ],
      advisory: 'Standard operations. Shinkansen services running with 2 min average delay.'
    },
    trend: '+22%',
    trendColor: 'text-emerald-500',
    img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&h=100&fit=crop',
    type: 'Cultural Immersion',
    typeColor: 'bg-pink-50 text-pink-600'
  },
  'Singapore': {
    name: 'Singapore',
    location: 'Marina Bay & Sentosa',
    region: 'Asia',
    bookings: 280,
    revenue: 1650000,
    occupancy: '86%',
    avgPkgValue: 5890,
    satisfaction: '4.82/5',
    cancellationRate: '1.9%',
    growth: '+20%',
    costPerGuest: 280,
    alert: 'Haze advisory',
    weather: {
      temp: '31°C',
      desc: 'Humid & Overcast',
      forecast: [
        { day: 'Mon', temp: '31°C', desc: 'Humid' },
        { day: 'Tue', temp: '32°C', desc: 'Afternoon Showers' },
        { day: 'Wed', temp: '31°C', desc: 'Overcast' },
        { day: 'Thu', temp: '30°C', desc: 'Rain' },
        { day: 'Fri', temp: '31°C', desc: 'Sunny' }
      ],
      advisory: 'Slight haze detected. Outdoor walking tours may offer masks if API index exceeds 100.'
    },
    trend: '+20%',
    trendColor: 'text-emerald-500',
    img: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=100&h=100&fit=crop',
    type: 'City Shopping',
    typeColor: 'bg-indigo-50 text-indigo-600'
  },
  'Dubai': {
    name: 'Dubai',
    location: 'Downtown & Marina',
    region: 'Middle East',
    bookings: 580,
    revenue: 2105000,
    occupancy: '88%',
    avgPkgValue: 3630,
    satisfaction: '4.70/5',
    cancellationRate: '3.1%',
    growth: '+24%',
    costPerGuest: 290,
    alert: 'Extreme thermal warnings',
    weather: {
      temp: '38°C',
      desc: 'Extreme Heat',
      forecast: [
        { day: 'Mon', temp: '38°C', desc: 'Sunny' },
        { day: 'Tue', temp: '39°C', desc: 'Sunny' },
        { day: 'Wed', temp: '37°C', desc: 'Clear' },
        { day: 'Thu', temp: '36°C', desc: 'Windy' },
        { day: 'Fri', temp: '38°C', desc: 'Sunny' }
      ],
      advisory: 'Desert Safaris delayed to post-16:30 departures due to heat index.'
    },
    trend: '+24%',
    trendColor: 'text-emerald-500',
    img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=100&h=100&fit=crop',
    type: 'Tech Summit',
    typeColor: 'bg-red-50 text-red-600'
  },
  'Rajasthan': {
    name: 'Rajasthan',
    location: 'Jaipur & Udaipur',
    region: 'India',
    bookings: 490,
    revenue: 1680000,
    occupancy: '84%',
    avgPkgValue: 3420,
    satisfaction: '4.60/5',
    cancellationRate: '2.0%',
    growth: '+31%',
    costPerGuest: 195,
    alert: 'Local sandstorms',
    weather: {
      temp: '32°C',
      desc: 'Dry & Sunny',
      forecast: [
        { day: 'Mon', temp: '32°C', desc: 'Sunny' },
        { day: 'Tue', temp: '33°C', desc: 'Dry Heat' },
        { day: 'Wed', temp: '34°C', desc: 'Clear' },
        { day: 'Thu', temp: '31°C', desc: 'Dust Storm' },
        { day: 'Fri', temp: '32°C', desc: 'Sunny' }
      ],
      advisory: 'Advising hydration packs for Amber Fort climb. Air filters check on Volvo coaches.'
    },
    trend: '+31%',
    trendColor: 'text-emerald-500',
    img: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=100&h=100&fit=crop',
    type: 'Heritage Tour',
    typeColor: 'bg-orange-50 text-orange-600'
  },
  'Goa': {
    name: 'Goa',
    location: 'North & South Goa',
    region: 'India',
    bookings: 520,
    revenue: 950000,
    occupancy: '80%',
    avgPkgValue: 1820,
    satisfaction: '4.78/5',
    cancellationRate: '2.8%',
    growth: '+23%',
    costPerGuest: 95,
    alert: 'Beach high swell alert',
    weather: {
      temp: '30°C',
      desc: 'Humid & Overcast',
      forecast: [
        { day: 'Mon', temp: '30°C', desc: 'Humid' },
        { day: 'Tue', temp: '29°C', desc: 'Showers' },
        { day: 'Wed', temp: '28°C', desc: 'Heavy Rain' },
        { day: 'Thu', temp: '30°C', desc: 'Partly Cloudy' },
        { day: 'Fri', temp: '31°C', desc: 'Sunny' }
      ],
      advisory: 'High swell warning for watersports. Beach shacks closed early.'
    },
    trend: '+23%',
    trendColor: 'text-emerald-500',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=100&h=100&fit=crop',
    type: 'Leisure Beach',
    typeColor: 'bg-blue-50 text-blue-600'
  },
  'Kerala': {
    name: 'Kerala',
    location: 'Alleppey & Munnar',
    region: 'India',
    bookings: 320,
    revenue: 1120000,
    occupancy: '88%',
    avgPkgValue: 3500,
    satisfaction: '4.89/5',
    cancellationRate: '2.1%',
    growth: '+19%',
    costPerGuest: 180,
    alert: 'Canal maintenance delays',
    weather: {
      temp: '27°C',
      desc: 'Tropical Showers',
      forecast: [
        { day: 'Mon', temp: '27°C', desc: 'Showers' },
        { day: 'Tue', temp: '26°C', desc: 'Rain' },
        { day: 'Wed', temp: '28°C', desc: 'Overcast' },
        { day: 'Thu', temp: '27°C', desc: 'Humid' },
        { day: 'Fri', temp: '29°C', desc: 'Clear' }
      ],
      advisory: 'Houseboat locks maintenance in Vembanad. Slight delays expected in narrow channels.'
    },
    trend: '+33%',
    trendColor: 'text-emerald-500',
    img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=100&h=100&fit=crop',
    type: 'Backwaters',
    typeColor: 'bg-teal-50 text-teal-600'
  },
  'Maldives': {
    name: 'Maldives',
    location: 'North Male Atoll',
    region: 'Asia',
    bookings: 310,
    revenue: 3240000,
    occupancy: '96%',
    avgPkgValue: 10450,
    satisfaction: '4.95/5',
    cancellationRate: '1.2%',
    growth: '+22%',
    costPerGuest: 450,
    alert: 'Monsoon high swells',
    weather: {
      temp: '28°C',
      desc: 'Humid & Wind',
      forecast: [
        { day: 'Mon', temp: '28°C', desc: 'Showers' },
        { day: 'Tue', temp: '29°C', desc: 'Sunny' },
        { day: 'Wed', temp: '28°C', desc: 'Overcast' },
        { day: 'Thu', temp: '27°C', desc: 'Windy' },
        { day: 'Fri', temp: '29°C', desc: 'Clear' }
      ],
      advisory: 'Sea plane flights delayed by 1 hour due to high winds.'
    },
    trend: '+18%',
    trendColor: 'text-emerald-500',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=100&h=100&fit=crop',
    type: 'Luxury Beach',
    typeColor: 'bg-blue-50 text-blue-600'
  },
  'Amalfi Coast': {
    name: 'Amalfi Coast',
    location: 'Positano & Ravello',
    region: 'Europe',
    bookings: 210,
    revenue: 1850000,
    occupancy: '90%',
    avgPkgValue: 8800,
    satisfaction: '4.92/5',
    cancellationRate: '1.5%',
    growth: '+29%',
    costPerGuest: 410,
    alert: 'Narrow pass road work',
    weather: {
      temp: '22°C',
      desc: 'Mediterranean Breeze',
      forecast: [
        { day: 'Mon', temp: '22°C', desc: 'Sunny' },
        { day: 'Tue', temp: '23°C', desc: 'Clear' },
        { day: 'Wed', temp: '21°C', desc: 'Overcast' },
        { day: 'Thu', temp: '20°C', desc: 'Chilly' },
        { day: 'Fri', temp: '22°C', desc: 'Sunny' }
      ],
      advisory: 'Positano road work causing minor bus shuttle delays.'
    },
    trend: '+31%',
    trendColor: 'text-emerald-500',
    img: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=100&h=100&fit=crop',
    type: 'Coastline VIP',
    typeColor: 'bg-orange-50 text-orange-600'
  }
};
