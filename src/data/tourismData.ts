import { 
  Heart, 
  Users, 
  Trees, 
  Sparkles, 
  Gem, 
  Briefcase, 
  Calendar, 
  Globe, 
  GraduationCap, 
  Ship, 
  Activity, 
  Sliders,
  Compass
} from 'lucide-react';

export interface PackageCategory {
  name: string;
  icon: any;
  description: string;
}

export const PACKAGE_CATEGORIES: PackageCategory[] = [
  { name: 'Honeymoon', icon: Heart, description: 'Romantic retreats and luxury getaways for couples' },
  { name: 'Family Retreats', icon: Users, description: 'Comfortable tours tailored for families' },
  { name: 'Adventure & Wildlife', icon: Trees, description: 'Excursions, safaris, and nature trails' },
  { name: 'Religious & Pilgrimage', icon: Sparkles, description: 'Spiritual pathways and holy site tours' },
  { name: 'Luxury', icon: Gem, description: 'Elite accommodations, VIP dining, and charter travel' },
  { name: 'Corporate', icon: Briefcase, description: 'Team outings and corporate leisure retreats' },
  { name: 'Group Tour', icon: Users, description: 'Social tours with guided group itineraries' },
  { name: 'Weekend Getaway', icon: Calendar, description: 'Quick weekend refreshments and local mini-breaks' },
  { name: 'International', icon: Globe, description: 'Global destinations with flight and visa support' },
  { name: 'Educational', icon: GraduationCap, description: 'Curated historical and scientific learning trips' },
  { name: 'Cruise', icon: Ship, description: 'Luxury liners, ocean cruises, and river charters' },
  { name: 'Wellness Retreat', icon: Activity, description: 'Yoga, detox, hot spring resorts, and spas' },
  { name: 'Solo Trips', icon: Compass, description: 'Tailored for independent backpackers and solo travelers' },
  { name: 'Custom Package', icon: Sliders, description: 'Bespoke customer-specific layout and specifications' },
];

export interface AutocompleteItem {
  name: string;
  type: 'City' | 'State' | 'Country' | 'Region' | 'Island' | 'Hill Station' | 'National Park' | 'Tourist Town';
  parent?: string;
}

// Enterprise Autocomplete Base Suggestions (Grouped lookup)
export const AUTOCOMPLETE_SUGGESTIONS: AutocompleteItem[] = [
  // India Seeds
  { name: 'Delhi', type: 'City', parent: 'India' },
  { name: 'Jaipur', type: 'City', parent: 'India' },
  { name: 'Udaipur', type: 'City', parent: 'India' },
  { name: 'Jaisalmer', type: 'City', parent: 'India' },
  { name: 'Rishikesh', type: 'Hill Station', parent: 'India' },
  { name: 'Lansdowne', type: 'Hill Station', parent: 'India' },
  { name: 'Coorg', type: 'Hill Station', parent: 'India' },
  { name: 'Hampi', type: 'Region', parent: 'India' },
  { name: 'Tawang', type: 'Hill Station', parent: 'India' },
  { name: 'Chopta', type: 'Hill Station', parent: 'India' },
  { name: 'Spiti', type: 'Region', parent: 'India' },
  { name: 'Khajuraho', type: 'Region', parent: 'India' },
  { name: 'Orchha', type: 'Region', parent: 'India' },
  { name: 'Diu', type: 'Island', parent: 'India' },
  { name: 'Ziro', type: 'Region', parent: 'India' },

  // International Seeds
  { name: 'Paris', type: 'City', parent: 'France' },
  { name: 'Lucerne', type: 'City', parent: 'Switzerland' },
  { name: 'Interlaken', type: 'City', parent: 'Switzerland' },
  { name: 'Bruges', type: 'City', parent: 'Belgium' },
  { name: 'Hallstatt', type: 'City', parent: 'Austria' },
  { name: 'Positano', type: 'City', parent: 'Italy' },
  { name: 'Santorini', type: 'Island', parent: 'Greece' },
  { name: 'Banff', type: 'National Park', parent: 'Canada' },
  { name: 'Queenstown', type: 'City', parent: 'New Zealand' },
  { name: 'Bergen', type: 'City', parent: 'Norway' },
  { name: 'Reykjavik', type: 'City', parent: 'Iceland' },
  { name: 'Cusco', type: 'City', parent: 'Peru' },
  { name: 'Dubrovnik', type: 'City', parent: 'Croatia' },
  { name: 'India', type: 'Country' },
  { name: 'France', type: 'Country' },
  { name: 'Switzerland', type: 'Country' },
  { name: 'Italy', type: 'Country' },
  { name: 'Iceland', type: 'Country' }
];

// Procedurally generate 2,000+ autocomplete items to support scalability
const generateEnterpriseDatabase = (): AutocompleteItem[] => {
  const result = [...AUTOCOMPLETE_SUGGESTIONS];
  const listTypes: Array<AutocompleteItem['type']> = ['City', 'Hill Station', 'National Park', 'Island', 'Tourist Town'];
  const countries = ['USA', 'UK', 'Germany', 'Australia', 'Spain', 'Japan', 'Canada', 'Thailand', 'Vietnam', 'South Africa', 'New Zealand', 'Norway', 'Brazil'];

  for (let i = 1; i <= 2010; i++) {
    const country = countries[i % countries.length];
    const type = listTypes[i % listTypes.length];
    result.push({
      name: `Dest-${i} ${type} in ${country}`,
      type,
      parent: country
    });
  }
  return result;
};

export const ENTERPRISE_DESTINATIONS_DB = generateEnterpriseDatabase();

export interface DestinationDetails {
  name: string;
  city: string;
  country: string;
  description: string;
  image: string;
  startingPrice: number;
  popularTag: string;
}

export const DESTINATIONS_LIST: DestinationDetails[] = [
  { name: 'Delhi, India', city: 'Delhi', country: 'India', description: 'Blend of historical monuments and lively modern culture.', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=250&fit=crop', startingPrice: 450, popularTag: 'Heritage & Culture' },
  { name: 'Jaipur, India', city: 'Jaipur', country: 'India', description: 'The Pink City featuring royal forts, palaces, and local bazaars.', image: 'https://images.unsplash.com/photo-1477587458883-471a5ed94245?w=400&h=250&fit=crop', startingPrice: 280, popularTag: 'Royal Heritage' },
  { name: 'Udaipur, India', city: 'Udaipur', country: 'India', description: 'The City of Lakes featuring royal palaces and sunset boat rides.', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400&h=250&fit=crop', startingPrice: 320, popularTag: 'Romantic Lakes' },
  { name: 'Jaisalmer, India', city: 'Jaisalmer', country: 'India', description: 'The Golden City featuring fort structures and desert sand dunes.', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=400&h=250&fit=crop', startingPrice: 290, popularTag: 'Desert Safari' },
  { name: 'Coorg, India', city: 'Coorg', country: 'India', description: 'Mist-clad coffee plantations and dramatic waterfalls.', image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=400&h=250&fit=crop', startingPrice: 260, popularTag: 'Hill Station' },
  { name: 'Spiti, India', city: 'Spiti', country: 'India', description: 'Cold desert mountain valley with ancient monasteries.', image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=400&h=250&fit=crop', startingPrice: 400, popularTag: 'Adventure Trail' },
  { name: 'Paris, France', city: 'Paris', country: 'France', description: 'City of Light, gourmet dining, art museums, and fashion.', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=250&fit=crop', startingPrice: 950, popularTag: 'Most Romantic' },
  { name: 'Lucerne, Switzerland', city: 'Lucerne', country: 'Switzerland', description: 'Lake Lucerne vistas, historic Kapellbrücke bridge, and mountain peaks.', image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=250&fit=crop', startingPrice: 1150, popularTag: 'Scenic Lake' },
  { name: 'Interlaken, Switzerland', city: 'Interlaken', country: 'Switzerland', description: 'Adventure capital nestled between Lake Thun and Lake Brienz.', image: 'https://images.unsplash.com/photo-1508849789987-4e5333c12b78?w=400&h=250&fit=crop', startingPrice: 1200, popularTag: 'Adventure Capital' },
  { name: 'Positano, Italy', city: 'Positano', country: 'Italy', description: 'Cliffside colorful villages overlooking the blue Mediterranean Sea.', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400&h=250&fit=crop', startingPrice: 1350, popularTag: 'Amalfi Coast' },
  { name: 'Santorini, Greece', city: 'Santorini', country: 'Greece', description: 'Volcanic cliffs with white-washed villas and stunning sunsets.', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=250&fit=crop', startingPrice: 1100, popularTag: 'Sunset Views' },
  { name: 'Banff, Canada', city: 'Banff', country: 'Canada', description: 'Turquoise glacial lakes and soaring Canadian Rocky peaks.', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=250&fit=crop', startingPrice: 1050, popularTag: 'National Park' },
  { name: 'Goa, India', city: 'Goa', country: 'India', description: 'Golden beaches, historic churches, and water sports.', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=250&fit=crop', startingPrice: 300, popularTag: 'Beaches & Party' }
];

export interface HotelDetails {
  id: string;
  name: string;
  city: string;
  stars: number;
  address: string;
  area: string;
  direction: string;
  distCenter: string;
  distAirport: string;
  amenities: string[];
  startingPrice: number;
  roomTypes: string[];
  guestRating: number;
  image: string;
}

export const HOTELS_RECOMMENDATIONS: HotelDetails[] = [
  // Jaipur Hotels
  { id: 'h-rambagh', name: 'Rambagh Palace', city: 'Jaipur', stars: 5, address: 'Bhawani Singh Road, Jaipur', area: 'Central', direction: 'Central', distCenter: '2.5 km', distAirport: '11 km', amenities: ['Royal Spa', 'Indoor Pool', 'Gourmet Dining', 'Butler Service'], startingPrice: 600, roomTypes: ['Palace Room', 'Historical Suite', 'Grand Royal Suite'], guestRating: 4.9, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&h=150&fit=crop' },
  { id: 'h-itc-rajputana', name: 'ITC Rajputana', city: 'Jaipur', stars: 5, address: 'Palace Road, Jaipur', area: 'Station Area', direction: 'West', distCenter: '1.2 km', distAirport: '12 km', amenities: ['Spa', 'Pool', 'Bar', 'Mughlai Restaurant'], startingPrice: 350, roomTypes: ['Executive Club', 'Rajputana Chamber', 'Rajputana Suite'], guestRating: 4.7, image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=200&h=150&fit=crop' },
  { id: 'h-trident-jaipur', name: 'Trident Jaipur', city: 'Jaipur', stars: 4, address: 'Amber Fort Road, Jaipur', area: 'Jal Mahal', direction: 'North', distCenter: '5.0 km', distAirport: '18 km', amenities: ['Lake View Pool', 'Kids Club', 'Fitness Center', 'Bar'], startingPrice: 220, roomTypes: ['Deluxe Lake View', 'Deluxe Garden View', 'Trident Suite'], guestRating: 4.6, image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=200&h=150&fit=crop' },
  { id: 'h-holiday-inn-jaipur', name: 'Holiday Inn Jaipur', city: 'Jaipur', stars: 4, address: '22 Godam Circle, Jaipur', area: 'C-Scheme', direction: 'South', distCenter: '3.0 km', distAirport: '9.5 km', amenities: ['Rooftop Pool', 'All-day Dining', 'Free Wi-Fi', 'Gym'], startingPrice: 150, roomTypes: ['Standard Queen', 'Deluxe King', 'Executive Suite'], guestRating: 4.4, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=200&h=150&fit=crop' },

  // Goa Hotels
  { id: 'h-taj-exotica', name: 'Taj Exotica Resort & Spa', city: 'Goa', stars: 5, address: 'Benaulim, South Goa', area: 'Benaulim', direction: 'South', distCenter: '35 km from Capital', distAirport: '27 km', amenities: ['Private Beach Access', '9-hole Golf Course', 'Jiva Spa', 'Pool'], startingPrice: 400, roomTypes: ['Garden Villa', 'Sea View Villa', 'Luxury Suite'], guestRating: 4.8, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=200&h=150&fit=crop' },
  { id: 'h-w-goa', name: 'W Goa', city: 'Goa', stars: 5, address: 'Vagator Beach, North Goa', area: 'Vagator', direction: 'North-West', distCenter: '18 km from Capital', distAirport: '42 km', amenities: ['Beach Club', 'Rock Pool', 'FIT Gym', 'WooBar'], startingPrice: 380, roomTypes: ['Wonderful Room', 'Spectacular Cottage', 'Marvelous Suite'], guestRating: 4.7, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=200&h=150&fit=crop' },
  { id: 'h-grand-hyatt-goa', name: 'Grand Hyatt Goa', city: 'Goa', stars: 5, address: 'Bambolim, Central Goa', area: 'Bambolim Bay', direction: 'Central', distCenter: '7 km from Capital', distAirport: '22 km', amenities: ['Indo-Portuguese Spa', 'Sailing Club', 'Indoor & Outdoor Pools', 'Casino Access'], startingPrice: 320, roomTypes: ['Standard King', 'Club View', 'Grand Suite'], guestRating: 4.6, image: 'https://images.unsplash.com/photo-1544124499-58912cbddade?w=200&h=150&fit=crop' },
  { id: 'h-planet-hollywood', name: 'Planet Hollywood Beach Resort', city: 'Goa', stars: 4, address: 'Utorda Beach, South Goa', area: 'Utorda', direction: 'South-East', distCenter: '24 km from Capital', distAirport: '14 km', amenities: ['Pet Friendly Rooms', 'Trance Lounge', 'Beachfront Cabanas', 'Fitness Center'], startingPrice: 190, roomTypes: ['Hollywood Deluxe', 'Premiere Suite', 'Presidential Suite'], guestRating: 4.5, image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=200&h=150&fit=crop' },

  // Paris Hotels
  { id: 'h-ritz-paris', name: 'Ritz Paris', city: 'Paris', stars: 5, address: '15 Place Vendôme, Paris', area: 'Place Vendôme', direction: 'Central', distCenter: '0.5 km', distAirport: '28 km', amenities: ['Michelin Dining', 'Chanel Spa', 'Private Gardens', 'Grand Pool'], startingPrice: 900, roomTypes: ['Superior Room', 'Chopin Suite', 'Imperial Suite'], guestRating: 4.9, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&h=150&fit=crop' },
  { id: 'h-le-bristol', name: 'Le Bristol Paris', city: 'Paris', stars: 5, address: '112 Rue du Faubourg Saint-Honoré, Paris', area: 'Champs-Élysées', direction: 'West', distCenter: '1.5 km', distAirport: '30 km', amenities: ['Spa Le Bristol', 'Rooftop Pool', 'Epicure Restaurant', 'Secret Garden'], startingPrice: 850, roomTypes: ['Deluxe Double', 'Junior Suite', 'Terrace Suite'], guestRating: 4.8, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=200&h=150&fit=crop' },
  { id: 'h-pullman-paris', name: 'Pullman Paris Tour Eiffel', city: 'Paris', stars: 4, address: '18 Avenue de Suffren, Paris', area: 'Trocadéro', direction: 'South-West', distCenter: '3.5 km', distAirport: '32 km', amenities: ['Eiffel Tower Balcony', 'Fitness Center', 'Connectivity Lounge', 'Bar'], startingPrice: 380, roomTypes: ['Classic Room', 'Deluxe Tower View', 'Trocadero Suite'], guestRating: 4.5, image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=200&h=150&fit=crop' },
  { id: 'h-novotel-paris', name: 'Novotel Paris Centre Tour Eiffel', city: 'Paris', stars: 4, address: '61 Quai de Grenelle, Paris', area: 'Grenelle', direction: 'South', distCenter: '4.2 km', distAirport: '31 km', amenities: ['Heated Pool', 'Teppanyaki Restaurant', 'Kids Corner', 'High-speed Wi-Fi'], startingPrice: 240, roomTypes: ['Standard Double', 'Superior Twin', 'Family Suite'], guestRating: 4.3, image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=200&h=150&fit=crop' },

  // Udaipur Hotels
  { id: 'h-taj-lake', name: 'Taj Lake Palace', city: 'Udaipur', stars: 5, address: 'Lake Pichola, Udaipur', area: 'Lake Pichola', direction: 'Central', distCenter: '0.1 km (Island)', distAirport: '24 km', amenities: ['Heritage Royal Spa', 'Floating Restaurant', 'Sunset Yacht', 'Historical Walks'], startingPrice: 650, roomTypes: ['Luxury Room', 'Grand Royal Suite', 'Grand Presidential Suite'], guestRating: 4.9, image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=200&h=150&fit=crop' },
  { id: 'h-oberoi-udaivilas', name: 'The Oberoi Udaivilas', city: 'Udaipur', stars: 5, address: 'Haridasji Ki Magri, Udaipur', area: 'Lake Pichola Shore', direction: 'West', distCenter: '2.0 km', distAirport: '26 km', amenities: ['Private Semiprivate Pools', 'Wildlife Sanctuary Walk', 'Luxury Spa', 'Bar'], startingPrice: 580, roomTypes: ['Premier Room', 'Premier Pool View', 'Kohinoor Suite'], guestRating: 4.9, image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=200&h=150&fit=crop' },

  // Interlaken Hotels
  { id: 'h-victoria-jungfrau', name: 'Victoria-Jungfrau Grand Hotel & Spa', city: 'Interlaken', stars: 5, address: 'Höheweg 41, Interlaken', area: 'Höheweg', direction: 'Central', distCenter: '0.2 km', distAirport: '130 km (Zurich)', amenities: ['5500m² Luxury Spa', 'Tennis Courts', 'Fine Dining', 'Breathtaking Jungfrau View'], startingPrice: 500, roomTypes: ['Superior Double', 'Junior Suite', 'Tower Suite'], guestRating: 4.8, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=200&h=150&fit=crop' }
];

export const MEAL_OPTIONS = [
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'lunch', label: 'Lunch' },
  { value: 'dinner', label: 'Dinner' }
];

export const MEAL_PREFERENCES = [
  { value: 'Veg', label: 'Vegetarian Only' },
  { value: 'Non-Veg', label: 'Non-Vegetarian' },
  { value: 'Both', label: 'Both options (Veg & Non-Veg)' }
];

export const STAFF_ROLES = [
  'Tour Manager',
  'Tour Guide',
  'Local Guide',
  'Driver',
  'Driver Premium',
  'Airport Driver',
  'Tour Coordinator',
  'Photographer',
  'Travel Assistant',
  'Interpreter',
  'Adventure Instructor',
  'Translator'
];

// Employee database with daily / hourly rates
export interface StaffRecord {
  id: string;
  name: string;
  role: string;
  rate: number;
  rateType: 'hour' | 'day';
  avatar: string;
}

export const STAFF_DIRECTORY: StaffRecord[] = [
  { id: 'emp-1', name: 'Elena Rodriguez', role: 'Driver', rate: 350, rateType: 'hour', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
  { id: 'emp-2', name: 'Marcus Thorne', role: 'Driver Premium', rate: 550, rateType: 'hour', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
  { id: 'emp-3', name: 'Jordan Smith', role: 'Airport Driver', rate: 700, rateType: 'hour', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
  { id: 'emp-4', name: 'David Chen', role: 'Tour Manager', rate: 3500, rateType: 'day', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
  { id: 'emp-5', name: 'Sarah Wu', role: 'Tour Guide', rate: 2500, rateType: 'day', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
  { id: 'emp-6', name: 'Vikram Singh', role: 'Local Guide', rate: 2500, rateType: 'day', avatar: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?w=100&h=100&fit=crop' },
  { id: 'emp-7', name: 'Alex Johnson', role: 'Photographer', rate: 4000, rateType: 'day', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' },
  { id: 'emp-8', name: 'Tenzing Norgay', role: 'Adventure Instructor', rate: 5000, rateType: 'day', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop' },
  { id: 'emp-9', name: 'Sophia Ricci', role: 'Tour Coordinator', rate: 2800, rateType: 'day', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop' },
  { id: 'emp-10', name: 'Kenji Tanaka', role: 'Translator', rate: 3200, rateType: 'day', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop' },
];

export interface RecommendedActivity {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Strenuous';
  isOptional: boolean;
  isRecommended: boolean;
  image: string;
  destinations: string[]; // Mapped destinations
  categories: string[];   // Best suited categories
}

export const RECOMMENDED_ACTIVITIES: RecommendedActivity[] = [
  // Goa activities
  { id: 'goa-scuba', name: 'Scuba Diving at Grand Island', price: 150, description: 'Explore vibrant marine life and coral reefs in Goa with a certified PADI guide.', category: 'Adventure', duration: '4 Hours', difficulty: 'Moderate', isOptional: false, isRecommended: true, image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=150&h=150&fit=crop', destinations: ['Goa'], categories: ['Adventure & Wildlife', 'Solo Trips', 'Custom Package'] },
  { id: 'goa-parasail', name: 'Parasailing at Calangute Beach', price: 60, description: 'Fly high above the Arabian Sea and experience a thrilling panoramic view.', category: 'Adventure', duration: '1 Hour', difficulty: 'Easy', isOptional: true, isRecommended: true, image: 'https://images.unsplash.com/photo-1596701062351-df5f8af54363?w=150&h=150&fit=crop', destinations: ['Goa'], categories: ['Adventure & Wildlife', 'Honeymoon', 'Solo Trips'] },
  { id: 'goa-dolphin', name: 'Private Dolphin Cruise', price: 90, description: 'Enjoy a serene morning boat cruise spotting dolphins along the Mandovi River.', category: 'Leisure', duration: '2 Hours', difficulty: 'Easy', isOptional: true, isRecommended: false, image: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?w=150&h=150&fit=crop', destinations: ['Goa'], categories: ['Honeymoon', 'Family Retreats', 'Luxury'] },
  { id: 'goa-party', name: 'Sunset Beach Party Pass', price: 80, description: 'Exclusive VIP access to Goa\'s popular beachfront music and dance events.', category: 'Nightlife', duration: '5 Hours', difficulty: 'Easy', isOptional: true, isRecommended: true, image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=150&h=150&fit=crop', destinations: ['Goa'], categories: ['Solo Trips', 'Group Tour', 'Weekend Getaway'] },
  { id: 'goa-sunset-cruise', name: 'Luxury Yacht Sunset Cruise', price: 200, description: 'Gourmet dinner, champagne toast, and jazz music while watching the sunset.', category: 'Luxury', duration: '3 Hours', difficulty: 'Easy', isOptional: false, isRecommended: true, image: 'https://images.unsplash.com/photo-1505080856163-26759dcd7d13?w=150&h=150&fit=crop', destinations: ['Goa'], categories: ['Honeymoon', 'Luxury', 'Corporate'] },
  { id: 'goa-heritage', name: 'Old Goa Heritage Walk', price: 40, description: 'Guided tour of historical Portuguese churches, basilicas, and museums.', category: 'Cultural', duration: '3 Hours', difficulty: 'Easy', isOptional: false, isRecommended: false, image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=150&h=150&fit=crop', destinations: ['Goa'], categories: ['Family Retreats', 'Educational', 'Religious & Pilgrimage'] },

  // Manali activities
  { id: 'manali-rafting', name: 'White Water Rafting in Beas River', price: 110, description: 'Navigate through rapid level 3-4 waters with high-end safety rafts.', category: 'Adventure', duration: '3 Hours', difficulty: 'Strenuous', isOptional: false, isRecommended: true, image: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=150&h=150&fit=crop', destinations: ['Manali'], categories: ['Adventure & Wildlife', 'Solo Trips', 'Group Tour'] },
  { id: 'manali-paragliding', name: 'Tandem Paragliding in Solang Valley', price: 130, description: 'Soar like a bird over snowy pine forests and rocky valleys.', category: 'Adventure', duration: '1.5 Hours', difficulty: 'Moderate', isOptional: true, isRecommended: true, image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=150&h=150&fit=crop', destinations: ['Manali'], categories: ['Adventure & Wildlife', 'Solo Trips', 'Honeymoon'] },
  { id: 'manali-snow', name: 'Rohtang Pass Snow Adventure', price: 180, description: 'Day-trip to Rohtang Pass for skiing, snow scooter riding, and mountain photography.', category: 'Leisure', duration: '6 Hours', difficulty: 'Easy', isOptional: false, isRecommended: false, image: 'https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?w=150&h=150&fit=crop', destinations: ['Manali'], categories: ['Family Retreats', 'Group Tour', 'Luxury'] },

  // Udaipur activities
  { id: 'ud-palace', name: 'City Palace Guided Tour', price: 50, description: 'Marvel at beautiful miniature paintings, mirror work, and central courtyards.', category: 'Cultural', duration: '2 Hours', difficulty: 'Easy', isOptional: false, isRecommended: true, image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=150&h=150&fit=crop', destinations: ['Udaipur'], categories: ['Family Retreats', 'Luxury', 'Honeymoon'] },
  { id: 'ud-boat', name: 'Boat Ride on Lake Pichola', price: 40, description: 'Sunset luxury ferry boat cruise around Jag Mandir Palace island.', category: 'Leisure', duration: '1.5 Hours', difficulty: 'Easy', isOptional: true, isRecommended: true, image: 'https://images.unsplash.com/photo-1595658658481-d53d3f999874?w=150&h=150&fit=crop', destinations: ['Udaipur'], categories: ['Honeymoon', 'Luxury', 'Family Retreats'] },
  { id: 'ud-museum', name: 'Vintage Car Museum Visit', price: 30, description: 'Inspect the personal collection of vintage cars owned by the Maharana of Udaipur.', category: 'Cultural', duration: '2 Hours', difficulty: 'Easy', isOptional: true, isRecommended: false, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=150&h=150&fit=crop', destinations: ['Udaipur'], categories: ['Family Retreats', 'Corporate'] },
  { id: 'ud-sajjangarh', name: 'Sajjangarh Monsoon Palace Trek', price: 65, description: 'Explore a hilltop palace overlooking Pichola lake and surrounding hills.', category: 'Adventure', duration: '3.5 Hours', difficulty: 'Moderate', isOptional: true, isRecommended: false, image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=150&h=150&fit=crop', destinations: ['Udaipur'], categories: ['Solo Trips', 'Adventure & Wildlife'] },
  { id: 'ud-show', name: 'Dharohar Cultural Folk Dance Show', price: 20, description: 'Watch vibrant traditional puppet shows and Rajasthani folk dances at Bagore Ki Haveli.', category: 'Cultural', duration: '2 Hours', difficulty: 'Easy', isOptional: false, isRecommended: true, image: 'https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?w=150&h=150&fit=crop', destinations: ['Udaipur'], categories: ['Family Retreats', 'Group Tour', 'Solo Trips'] },

  // Interlaken activities
  { id: 'int-sky', name: 'Swiss Alps Skydiving', price: 450, description: '4,000m free-fall over Interlaken lakes and snowy Eiger & Jungfrau peaks.', category: 'Adventure', duration: '3 Hours', difficulty: 'Strenuous', isOptional: true, isRecommended: true, image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=150&h=150&fit=crop', destinations: ['Interlaken'], categories: ['Adventure & Wildlife', 'Solo Trips'] },
  { id: 'int-swing', name: 'Grindelwald Glacier Canyon Swing', price: 160, description: 'Freefall from a platform at 90 meters height, reaching speeds up to 120km/h.', category: 'Adventure', duration: '2 Hours', difficulty: 'Strenuous', isOptional: true, isRecommended: false, image: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=150&h=150&fit=crop', destinations: ['Interlaken'], categories: ['Adventure & Wildlife'] },
  { id: 'int-para', name: 'Paragliding Tandem Flight', price: 180, description: 'Fly over Interlaken and land directly in the city park with spectacular Swiss views.', category: 'Adventure', duration: '1.5 Hours', difficulty: 'Easy', isOptional: false, isRecommended: true, image: 'https://images.unsplash.com/photo-1596701062351-df5f8af54363?w=150&h=150&fit=crop', destinations: ['Interlaken'], categories: ['Adventure & Wildlife', 'Solo Trips', 'Honeymoon'] },
  { id: 'int-jung', name: 'Jungfraujoch - Top of Europe Trip', price: 280, description: 'Scenic cogwheel train ride to Europe\'s highest altitude railway station with Ice Palace views.', category: 'Leisure', duration: '7 Hours', difficulty: 'Easy', isOptional: false, isRecommended: true, image: 'https://images.unsplash.com/photo-1508849789987-4e5333c12b78?w=150&h=150&fit=crop', destinations: ['Interlaken'], categories: ['Family Retreats', 'Luxury', 'Group Tour'] },
  { id: 'int-glac', name: 'Aletsch Glacier Guided Ice Walk', price: 120, description: 'Equip crampons and walk alongside a professional alpine guide across the massive glacier.', category: 'Adventure', duration: '5 Hours', difficulty: 'Moderate', isOptional: true, isRecommended: false, image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=150&h=150&fit=crop', destinations: ['Interlaken'], categories: ['Adventure & Wildlife', 'Educational'] }
];

// Cruise Database
export interface CruiseRecord {
  id: string;
  name: string;
  cruiseLine: string;
  shipName: string;
  destination: string;
  departurePort: string;
  arrivalPort: string;
  durationNights: number;
  departureMonth: string;
  routeOverview: string;
  startingPrice: {
    interior: number;
    oceanView: number;
    balcony: number;
    suite: number;
  };
  taxes: number;
  rating: number;
  isPopular: boolean;
  isFamilyFriendly: boolean;
  isLuxury: boolean;
  highlights: string[];
  availability: 'Available' | 'Selling Fast' | 'Sold Out';
  image: string;
  mapPreview: string;
}

export const CRUISE_DATABASE: CruiseRecord[] = [
  {
    id: 'cr-royal-caribbean',
    name: 'Western Caribbean Symphony Voyage',
    cruiseLine: 'Royal Caribbean',
    shipName: 'Symphony of the Seas',
    destination: 'Caribbean',
    departurePort: 'Miami, USA',
    arrivalPort: 'Miami, USA',
    durationNights: 7,
    departureMonth: 'December',
    routeOverview: 'Miami → Roatan → Cozumel → CocoCay → Miami',
    startingPrice: { interior: 699, oceanView: 849, balcony: 1099, suite: 2299 },
    taxes: 145,
    rating: 4.8,
    isPopular: true,
    isFamilyFriendly: true,
    isLuxury: false,
    highlights: ['Ultimate Abyss Slide', 'Central Park Garden', 'Broadway Musical Shows', 'Surf Simulator'],
    availability: 'Selling Fast',
    image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=400&h=250&fit=crop',
    mapPreview: 'Miami - Cozumel - CocoCay'
  },
  {
    id: 'cr-celebrity-edge',
    name: 'Amalfi Coast & Greece Luxury Cruise',
    cruiseLine: 'Celebrity Cruises',
    shipName: 'Celebrity Edge',
    destination: 'Mediterranean',
    departurePort: 'Civitavecchia (Rome), Italy',
    arrivalPort: 'Civitavecchia (Rome), Italy',
    durationNights: 10,
    departureMonth: 'July',
    routeOverview: 'Rome → Naples → Santorini → Mykonos → Florence → Rome',
    startingPrice: { interior: 1299, oceanView: 1599, balcony: 1999, suite: 4599 },
    taxes: 180,
    rating: 4.9,
    isPopular: true,
    isFamilyFriendly: false,
    isLuxury: true,
    highlights: ['Magic Carpet Deck', 'Infinite Verandas', 'Michelin Star Menus', 'Rooftop Garden'],
    availability: 'Available',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=250&fit=crop',
    mapPreview: 'Rome - Santorini - Florence'
  },
  {
    id: 'cr-princess-alaska',
    name: 'Voyage of the Glaciers Adventure',
    cruiseLine: 'Princess Cruises',
    shipName: 'Majestic Princess',
    destination: 'Alaska',
    departurePort: 'Vancouver, Canada',
    arrivalPort: 'Anchorage, USA',
    durationNights: 7,
    departureMonth: 'August',
    routeOverview: 'Vancouver → Ketchikan → Juneau → Skagway → Glacier Bay → Anchorage',
    startingPrice: { interior: 549, oceanView: 799, balcony: 999, suite: 1899 },
    taxes: 210,
    rating: 4.6,
    isPopular: false,
    isFamilyFriendly: true,
    isLuxury: false,
    highlights: ['Glacier Bay National Park', 'Glass-bottom SeaWalk', 'Fresh Alaska Seafood', 'Outdoor Movie Theater'],
    availability: 'Available',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=250&fit=crop',
    mapPreview: 'Vancouver - Juneau - Glacier Bay'
  }
];

export const VEHICLE_HOURLY_RATES = [
  { id: 'v-sedan', name: 'Sedan', rate: 550, image: '🚗' },
  { id: 'v-suv', name: 'SUV', rate: 850, image: '🚙' },
  { id: 'v-tempo', name: 'Tempo Traveller', rate: 1400, image: '🚐' },
  { id: 'v-coach', name: 'Luxury Coach', rate: 2800, image: '🚌' },
  { id: 'v-minibus', name: 'Mini Bus', rate: 1900, image: '🚎' }
];
