import React, { createContext, useContext, useState, useEffect } from 'react';

// Master records interface
export interface MasterRecord {
  id: string;
  status: 'Active' | 'Inactive' | 'Archived';
  [key: string]: any;
}

// Global master state
export interface MasterDataState {
  destinations: MasterRecord[];
  hotels: MasterRecord[];
  transport: MasterRecord[];
  vehicles: MasterRecord[];
  venues: MasterRecord[];
  staff: MasterRecord[];
  vendors: MasterRecord[];
  suppliers: MasterRecord[];
  packages: MasterRecord[];
  categories: MasterRecord[];
  eventTypes: MasterRecord[];
  activities: MasterRecord[];
  mealPlans: MasterRecord[];
  seasons: MasterRecord[];
  countries: MasterRecord[];
  states: MasterRecord[];
  cities: MasterRecord[];
  currencies: MasterRecord[];
  guests: MasterRecord[];
  customers: MasterRecord[];
  regions: MasterRecord[];
  cruises: MasterRecord[];
  flights: MasterRecord[];
  pricingRules: MasterRecord[];
  mealOptions: MasterRecord[];
}

export type MasterName = keyof MasterDataState;

interface MasterDataContextType {
  masters: MasterDataState;
  addRecord: (master: MasterName, record: Omit<MasterRecord, 'id'>) => void;
  addRecords: (master: MasterName, records: Omit<MasterRecord, 'id'>[]) => void;
  updateRecord: (master: MasterName, id: string, record: Partial<MasterRecord>) => void;
  deleteRecord: (master: MasterName, id: string) => void;
  bulkDelete: (master: MasterName, ids: string[]) => void;
  bulkUpdateStatus: (master: MasterName, ids: string[], status: 'Active' | 'Inactive' | 'Archived') => void;
}

const MasterDataContext = createContext<MasterDataContextType | undefined>(undefined);

// Helper for initial default datasets
const defaultState: MasterDataState = {
  destinations: [
    { id: 'dest-1', name: 'Paris, France', description: 'City of Light, gourmet dining, and fashion.', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=250&fit=crop', status: 'Active' },
    { id: 'dest-2', name: 'Tokyo, Japan', description: 'Neon skylines, ancient temples, and sushi masters.', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=250&fit=crop', status: 'Active' },
    { id: 'dest-3', name: 'Amalfi Coast, Italy', description: 'Dramatic cliffs, azure waters, and cliffside hotels.', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400&h=250&fit=crop', status: 'Active' },
    { id: 'dest-4', name: 'Reykjavik, Iceland', description: 'Volcanic landscapes, hot springs, and Northern lights.', image: 'https://images.unsplash.com/photo-1504829857797-ddff28127792?w=400&h=250&fit=crop', status: 'Active' },
    { id: 'dest-5', name: 'Bali, Indonesia', description: 'Tropical forests, pristine beaches, and spiritual retreats.', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=250&fit=crop', status: 'Active' },
  ],
  hotels: [
    { id: 'h-ritz', name: 'Ritz-Carlton Reserve', price: 600, stars: 5, description: 'Exclusive oceanfront sanctuary with private butler service.', location: 'Paris Opera', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&h=150&fit=crop', status: 'Active' },
    { id: 'h-grand', name: 'Grand Palace Hotel', price: 450, stars: 5, description: 'Historic grandeur meeting modern ultra-luxury amenities.', location: 'Paris Central', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=200&h=150&fit=crop', status: 'Active' },
    { id: 'h-marriott', name: 'Paris Marriott Opera', price: 350, stars: 4, description: 'Charming boutique style in the heart of the theater district.', location: 'Paris Opera', image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=200&h=150&fit=crop', status: 'Active' },
    { id: 'h-hyatt', name: 'Tokyo Park Hyatt', price: 500, stars: 5, description: 'Iconic high-rise luxury with panoramic skyline views.', location: 'Shinjuku, Tokyo', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=200&h=150&fit=crop', status: 'Active' },
    { id: 'h-glacier', name: 'Reykjavik Glacier Resort', price: 420, stars: 4, description: 'Eco-conscious design situated on hot spring thermal waters.', location: 'Reykjavik, Iceland', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=200&h=150&fit=crop', status: 'Active' },
  ],
  transport: [
    { id: 't1', name: 'Luxe Jet Charters', rating: 4.9, location: 'Geneva, Switzerland', roomRate: 2500, confRate: 150, breakfast: false, tier: 'Tier 1', image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=1000', recommended: true, contractNo: '#2290', terms: 'Private aircraft charters. Standard 48h scheduling required. Tax Excl. Flexible cancellation up to 48 hours.', status: 'Active' },
    { id: 't2', name: 'Swift Ground Logistics', rating: 4.6, location: 'Zurich, Switzerland', roomRate: 120, confRate: 45, breakfast: false, tier: 'Tier 2', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1000', recommended: false, contractNo: '#1834', terms: 'Luxury coach and sprinter vans. Hourly billing with 4h minimum. Tax Included.', status: 'Active' },
  ],
  vehicles: [
    { id: 'v1', name: 'Maybach S-Class', type: 'Luxury Sedan', status: 'Active' },
    { id: 'v2', name: 'Mercedes Sprinter VIP', type: 'Luxury Van', status: 'Active' },
    { id: 'v3', name: 'Range Rover Autobiography', type: 'Premium SUV', status: 'Active' },
  ],
  venues: [
    { id: 'vn1', name: 'Palais Garnier Private Lounge', location: 'Paris, France', status: 'Active' },
    { id: 'vn2', name: 'Villa d\'Este Gardens', location: 'Como, Italy', status: 'Active' },
    { id: 'vn3', name: 'Obsidian Sky Bar', location: 'Berlin, Germany', status: 'Active' },
  ],
  staff: [
    { id: 's1', name: 'Marcus Thorne', role: 'Driver', status: 'Active' },
    { id: 's2', name: 'Elena Rodriguez', role: 'Driver', status: 'Active' },
    { id: 's3', name: 'Jordan Smith', role: 'Driver', status: 'Active' },
    { id: 's4', name: 'David Chen', role: 'Tour Manager', status: 'Active' },
    { id: 's5', name: 'Sarah Wu', role: 'Coordinator', status: 'Active' },
  ],
  vendors: [
    { id: 'c1', name: 'Michelin Events Co.', rating: 5.0, location: 'Paris, France', roomRate: 180, confRate: 90, breakfast: false, tier: 'Tier 1', image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1000', recommended: true, contractNo: '#9921', terms: 'Custom fine dining menu curation. Minimum spend 10k EUR applies. Staffing and tableware included. Tax Excl.', status: 'Active' },
    { id: 'c2', name: 'Alpine Gourmet Catering', rating: 4.7, location: 'Innsbruck, Austria', roomRate: 85, confRate: 40, breakfast: false, tier: 'Tier 2', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1000', recommended: false, contractNo: '#8812', terms: 'Locally sourced traditional dishes. Setup and cleaning included. Tax Included.', status: 'Active' },
  ],
  suppliers: [
    { id: 'sup-1', name: 'Luxury Transport Services Ltd', email: 'ops@luxurytransport.local', phone: '+15550199', status: 'Active' },
    { id: 'sup-2', name: 'Grand Hotel Europe', email: 'booking@grandhoteleurope.local', phone: '+15550200', status: 'Active' },
  ],
  packages: [
    { id: 'pkg-default-1', name: 'Golden Triangle Tour', code: 'PKG-GTT01', status: 'Active' },
    { id: 'pkg-default-2', name: 'Kerala Backwaters', code: 'PKG-KKB02', status: 'Active' },
    { id: 'pkg-default-3', name: 'Kashmir Escape', code: 'PKG-KME03', status: 'Active' },
    { id: 'pkg-default-4', name: 'Goa Weekend Getaway', code: 'PKG-GWG04', status: 'Active' },
    { id: 'pkg-default-5', name: 'Rajasthan Heritage Tour', code: 'PKG-RHT05', status: 'Active' },
  ],
  categories: [
    { id: 'cat-1', name: 'Luxury Elite', status: 'Active' },
    { id: 'cat-2', name: 'Adventure', status: 'Active' },
    { id: 'cat-3', name: 'Wellness Retreat', status: 'Active' },
  ],
  eventTypes: [
    { id: 'ev-1', name: 'Guided Sightseeing', status: 'Active' },
    { id: 'ev-2', name: 'Welcome Dinner', status: 'Active' },
    { id: 'ev-3', name: 'Sunset Cruise', status: 'Active' },
  ],
  activities: [
    { id: 'act-eiffel', name: 'Eiffel Tower Tour', price: 240, description: 'Private Tour, Skip-the-line VIP entry.', category: 'Luxury', duration: '3 Hours', image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=150&h=150&fit=crop', destinations: ['Paris'], status: 'Active' },
    { id: 'act-seine', name: 'Seine River Cruise', price: 185, description: 'Dinner Cruise, 3-course gourmet dinner.', category: 'Dining', duration: '4 Hours', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=150&h=150&fit=crop', destinations: ['Paris'], status: 'Active' },
    { id: 'act-louvre', name: 'Louvre Art Guide', price: 290, description: 'Guided tour of masterpieces with curator.', category: 'Cultural', duration: '3.5 Hours', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=150&h=150&fit=crop', destinations: ['Paris'], status: 'Active' },
    { id: 'goa-scuba', name: 'Scuba Diving at Grand Island', price: 150, description: 'Explore vibrant marine life and coral reefs in Goa with a certified PADI guide.', category: 'Adventure', duration: '4 Hours', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=150&h=150&fit=crop', destinations: ['Goa'], status: 'Active' },
    { id: 'goa-parasail', name: 'Parasailing at Calangute Beach', price: 60, description: 'Fly high above the Arabian Sea and experience a thrilling panoramic view.', category: 'Adventure', duration: '1 Hour', image: 'https://images.unsplash.com/photo-1596701062351-df5f8af54363?w=150&h=150&fit=crop', destinations: ['Goa'], status: 'Active' },
    { id: 'goa-sunset-cruise', name: 'Luxury Yacht Sunset Cruise', price: 200, description: 'Gourmet dinner, champagne toast, and jazz music while watching the sunset.', category: 'Luxury', duration: '3 Hours', image: 'https://images.unsplash.com/photo-1505080856163-26759dcd7d13?w=150&h=150&fit=crop', destinations: ['Goa'], status: 'Active' },
    { id: 'ud-palace', name: 'City Palace Guided Tour', price: 50, description: 'Marvel at beautiful miniature paintings, mirror work, and central courtyards.', category: 'Cultural', duration: '2 Hours', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=150&h=150&fit=crop', destinations: ['Udaipur'], status: 'Active' },
    { id: 'ud-boat', name: 'Boat Ride on Lake Pichola', price: 40, description: 'Sunset luxury ferry boat cruise around Jag Mandir Palace island.', category: 'Leisure', duration: '1.5 Hours', image: 'https://images.unsplash.com/photo-1595658658481-d53d3f999874?w=150&h=150&fit=crop', destinations: ['Udaipur'], status: 'Active' }
  ],
  mealPlans: [
    { id: 'meal-1', name: 'Continental Breakfast', status: 'Active' },
    { id: 'meal-2', name: 'Buffet Dinner', status: 'Active' },
    { id: 'meal-3', name: 'Five-course Tasting Menu', status: 'Active' },
  ],
  seasons: [
    { id: 'sea-1', name: 'Peak', adjustmentFactor: '1.0', status: 'Active' },
    { id: 'sea-2', name: 'Shoulder', adjustmentFactor: '0.5', status: 'Active' },
    { id: 'sea-3', name: 'Off-peak', adjustmentFactor: '-0.25', status: 'Active' },
  ],
  countries: [
    { id: 'c-fr', name: 'France', code: 'FR', status: 'Active' },
    { id: 'c-jp', name: 'Japan', code: 'JP', status: 'Active' },
    { id: 'c-it', name: 'Italy', code: 'IT', status: 'Active' },
  ],
  states: [
    { id: 's-idf', name: 'Ile-de-France', countryId: 'c-fr', status: 'Active' },
    { id: 's-tok', name: 'Tokyo Prefecture', countryId: 'c-jp', status: 'Active' },
    { id: 's-ven', name: 'Veneto', countryId: 'c-it', status: 'Active' },
  ],
  cities: [
    { id: 'ct-par', name: 'Paris', stateId: 's-idf', status: 'Active' },
    { id: 'ct-tok', name: 'Tokyo', stateId: 's-tok', status: 'Active' },
    { id: 'ct-ven', name: 'Venice', stateId: 's-ven', status: 'Active' },
  ],
  currencies: [
    { id: 'cur-eur', code: 'EUR', symbol: '€', status: 'Active' },
    { id: 'cur-usd', code: 'USD', symbol: '$', status: 'Active' },
    { id: 'cur-chf', code: 'CHF', symbol: 'CHF', status: 'Active' },
  ],
  guests: [
    { id: 'g-1', firstName: 'Amara', lastName: 'Okafor', email: 'amara.okafor@example.com', phone: '+1 (555) 019-9234', complianceStatus: 'CLEAR', status: 'Active' },
    { id: 'g-2', firstName: 'Sebastian', lastName: 'Vance', email: 'sebastian.vance@example.com', phone: '+1 (555) 020-0345', complianceStatus: 'PENDING', status: 'Active' },
    { id: 'g-3', firstName: 'Elena', lastName: 'Rodriguez', email: 'elena.rodriguez@example.com', phone: '+1 (555) 030-0456', complianceStatus: 'CLEAR', status: 'Active' },
  ],
  customers: [
    { id: 'cust-1', name: 'Globex International', email: 'corporate@globex.local', phone: '+15551212', status: 'Active' },
    { id: 'cust-2', name: 'Wayne Enterprises', email: 'procurement@wayne.local', phone: '+15551313', status: 'Active' },
  ],
  regions: [
    { id: 'reg-goa', name: 'Goa', status: 'Active' },
    { id: 'reg-raj', name: 'Rajasthan', status: 'Active' },
    { id: 'reg-rajk', name: 'Rajkot', status: 'Active' },
    { id: 'reg-rajs', name: 'Rajsamand', status: 'Active' },
    { id: 'reg-gor', name: 'Gorakhpur', status: 'Active' },
    { id: 'reg-gon', name: 'Gondia', status: 'Active' },
    { id: 'reg-lon', name: 'London', status: 'Active' },
    { id: 'reg-lonb', name: 'Long Beach', status: 'Active' },
    { id: 'reg-par', name: 'Paris', status: 'Active' },
    { id: 'reg-it', name: 'Italy', status: 'Active' },
    { id: 'reg-fr', name: 'France', status: 'Active' },
    { id: 'reg-jp', name: 'Japan', status: 'Active' },
    { id: 'reg-ama', name: 'Amalfi Coast', status: 'Active' },
    { id: 'reg-ice', name: 'Iceland', status: 'Active' },
    { id: 'reg-bali', name: 'Bali', status: 'Active' }
  ],
  cruises: [
    {
      id: 'cr-royal-caribbean',
      name: 'Western Caribbean Symphony Voyage',
      cruiseLine: 'Royal Caribbean',
      shipName: 'Symphony of the Seas',
      destination: 'Caribbean',
      departurePort: 'Miami, USA',
      arrivalPort: 'Miami, USA',
      durationNights: 7,
      startingPriceInterior: 699,
      startingPriceOceanView: 849,
      startingPriceBalcony: 1099,
      startingPriceSuite: 2299,
      taxes: 145,
      rating: 4.8,
      status: 'Active'
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
      startingPriceInterior: 1299,
      startingPriceOceanView: 1599,
      startingPriceBalcony: 1999,
      startingPriceSuite: 4599,
      taxes: 180,
      rating: 4.9,
      status: 'Active'
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
      startingPriceInterior: 549,
      startingPriceOceanView: 799,
      startingPriceBalcony: 999,
      startingPriceSuite: 1899,
      taxes: 210,
      rating: 4.6,
      status: 'Active'
    }
  ],
  flights: [
    { id: 'fl-1', airline: 'Air India', flightClass: 'Economy', airport: 'Chhatrapati Shivaji Maharaj Airport (BOM)', route: 'BOM → DEL', status: 'Active' },
    { id: 'fl-2', airline: 'Emirates', flightClass: 'Business', airport: 'Dubai International (DXB)', route: 'DXB → LHR', status: 'Active' },
    { id: 'fl-3', airline: 'Air France', flightClass: 'First Class', airport: 'Charles de Gaulle (CDG)', route: 'CDG → JFK', status: 'Active' }
  ],
  pricingRules: [
    { id: 'pr-1', name: 'Peak Season Pricing Surcharge', seasonalPricing: 20, discountRules: 'None', taxRules: 12, serviceCharges: 5, markups: 15, currencySettings: 'INR (₹)', status: 'Active' },
    { id: 'pr-2', name: 'Early Bird Dynamic Discount', seasonalPricing: 0, discountRules: '10% off for 90 days lead time', taxRules: 12, serviceCharges: 5, markups: 10, currencySettings: 'INR (₹)', status: 'Active' },
    { id: 'pr-3', name: 'Monsoon Off-Peak Offset', seasonalPricing: -15, discountRules: 'None', taxRules: 12, serviceCharges: 5, markups: 8, currencySettings: 'INR (₹)', status: 'Active' }
  ],
  mealOptions: [
    { id: 'mo-1', name: 'Continental Breakfast Option', type: 'Breakfast', veg: true, nonVeg: true, jain: false, vegan: true, glutenFree: true, status: 'Active' },
    { id: 'mo-2', name: 'Deluxe Indian Lunch Buffet', type: 'Lunch', veg: true, nonVeg: true, jain: true, vegan: false, glutenFree: false, status: 'Active' },
    { id: 'mo-3', name: 'Chef Special Five-Course Dinner', type: 'Dinner', veg: true, nonVeg: true, jain: true, vegan: true, glutenFree: true, status: 'Active' }
  ],
};

export const MasterDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [masters, setMasters] = useState<MasterDataState>(() => {
    const saved = localStorage.getItem('eh_master_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...defaultState, ...parsed };
      } catch (err) {
        console.error('Error parsing saved master data, using default:', err);
      }
    }
    return defaultState;
  });

  useEffect(() => {
    localStorage.setItem('eh_master_data', JSON.stringify(masters));
  }, [masters]);

  const addRecord = (master: MasterName, record: Omit<MasterRecord, 'id'>) => {
    const newRecord: MasterRecord = {
      ...record,
      id: `${master.substring(0, 3)}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'Admin',
      modifiedBy: 'Admin'
    } as unknown as MasterRecord;
    setMasters(prev => ({
      ...prev,
      [master]: [...prev[master], newRecord],
    }));
  };

  const addRecords = (master: MasterName, records: Omit<MasterRecord, 'id'>[]) => {
    const newRecords = records.map((record, idx) => ({
      ...record,
      id: `${master.substring(0, 3)}-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'Admin',
      modifiedBy: 'Admin'
    } as unknown as MasterRecord));
    setMasters(prev => ({
      ...prev,
      [master]: [...prev[master], ...newRecords],
    }));
  };

  const updateRecord = (master: MasterName, id: string, record: Partial<MasterRecord>) => {
    setMasters(prev => ({
      ...prev,
      [master]: prev[master].map(r => (r.id === id ? { 
        ...r, 
        ...record, 
        updatedAt: new Date().toISOString(),
        modifiedBy: 'Admin'
      } : r)),
    }));
  };

  const deleteRecord = (master: MasterName, id: string) => {
    setMasters(prev => ({
      ...prev,
      [master]: prev[master].filter(r => r.id !== id),
    }));
  };

  const bulkDelete = (master: MasterName, ids: string[]) => {
    setMasters(prev => ({
      ...prev,
      [master]: prev[master].filter(r => !ids.includes(r.id)),
    }));
  };

  const bulkUpdateStatus = (master: MasterName, ids: string[], status: 'Active' | 'Inactive' | 'Archived') => {
    setMasters(prev => ({
      ...prev,
      [master]: prev[master].map(r => ids.includes(r.id) ? { 
        ...r, 
        status,
        updatedAt: new Date().toISOString(),
        modifiedBy: 'Admin'
      } : r),
    }));
  };

  return (
    <MasterDataContext.Provider value={{ masters, addRecord, addRecords, updateRecord, deleteRecord, bulkDelete, bulkUpdateStatus }}>
      {children}
    </MasterDataContext.Provider>
  );
};

export const useMasterData = () => {
  const context = useContext(MasterDataContext);
  if (!context) {
    throw new Error('useMasterData must be used within a MasterDataProvider');
  }
  return context;
};
