import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatRupee } from '../lib/utils';
import { BuilderStepper } from '../components/tourism/BuilderStepper';
import { PackageInfoForm } from '../components/tourism/PackageInfoForm';
import { SearchAutocomplete } from '../components/tourism/SearchAutocomplete';
import { ActivityAllocationBoard } from '../components/tourism/ActivityAllocationBoard';
import { HotelRecommendationBoard } from '../components/tourism/HotelRecommendationBoard';
import { CruiseSelectionBoard } from '../components/tourism/CruiseSelectionBoard';
import { TransportPricingBoard } from '../components/tourism/TransportPricingBoard';
import { PackageSummarySidebar } from '../components/tourism/PackageSummarySidebar';
import { createPackage } from '../lib/api';
import { 
  Compass, 
  Building, 
  Sparkles, 
  DollarSign, 
  MapPin, 
  AlertCircle, 
  Car, 
  Users, 
  Plane, 
  Ship, 
  Info, 
  Utensils, 
  CheckCircle2, 
  FileText,
  BedDouble,
  Activity as ActivityIcon
} from 'lucide-react';
import { useMasterData } from '../context/MasterDataContext';
import type { CruiseRecord } from '../data/tourismData';

interface Activity {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  duration: string;
  image: string;
  difficulty?: string;
  isOptional?: boolean;
}

interface SelectedDestination {
  name: string;
  days: number;
  nights: number;
  arrivalDate?: string;
  departureDate?: string;
  notes?: string;
}

interface Hotel {
  id: string;
  name: string;
  price: number;
  stars: number;
  image?: string;
  city?: string;
}

interface SelectedVehicle {
  id: string;
  name: string;
  rate: number;
  hours: number;
  subtotal: number;
  image?: string;
}

export function PackageBuilderPage() {
  const navigate = useNavigate();
  const { masters } = useMasterData();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchDestInput, setSearchDestInput] = useState('');

  // Main Form Data State
  const [formData, setFormData] = useState({
    code: 'PKG-' + Math.random().toString(36).substring(2, 7).toUpperCase(),
    name: 'Parisian Summer Dreams',
    category: 'Luxury',
    description: 'A premium summer experience in the City of Light.',
    duration: 5,
    basePrice: 3240,
    marginPerPax: 400,
    seasonalAdjustment: 150,
    selectedActivities: [] as Activity[],
    selectedHotels: [] as Hotel[],
    selectedVehicles: [] as SelectedVehicle[],
    selectedDestinations: [
      { name: 'Paris, France', days: 5, nights: 4, arrivalDate: '', departureDate: '', notes: '' }
    ] as SelectedDestination[],
    
    // Traveller configuration
    travellers: { adults: 2, children: 0, infants: 0 },
    // Meals selection
    meals: { breakfast: true, lunch: false, dinner: false },
    mealPreference: 'Both',
    
    // Custom Package Fields
    customPackageName: '',
    customerRequirements: '',
    preferredDestinations: '',
    preferredHotels: '',
    budgetRange: '',
    preferredActivities: '',
    transportationPreference: '',
    flexibleDates: false,
    
    // Discount field
    discount: 5, // percentage

    // Flight Inclusions & Required roles
    flightOption: 'Without Flight',
    requiredRoles: [] as string[],
    staffBookings: {} as Record<string, number>,

    // Flight detail fields
    selectedAirline: '',
    flightDeparturePort: '',
    flightArrivalPort: '',

    // Cruise detail fields
    selectedCruise: null as CruiseRecord | null,
    selectedCabin: null as string | null
  });

  // Automatically reset step index if category toggles between Cruise and standard flows
  const category = formData.category || 'Luxury';
  const isCruiseFlow = category === 'Cruise';

  // Dynamic step pipelines
  const stepsList = isCruiseFlow 
    ? [
        { label: 'Info', icon: Info },
        { label: 'Cruise Search', icon: Ship },
        { label: 'Shore Excursions', icon: ActivityIcon },
        { label: 'Pricing', icon: DollarSign },
        { label: 'Review', icon: CheckCircle2 }
      ]
    : [
        { label: 'Info', icon: Info },
        { label: 'Destinations', icon: MapPin },
        { label: 'Hotels', icon: BedDouble },
        { label: 'Activities', icon: ActivityIcon },
        { label: 'Transport', icon: Car },
        { label: 'Pricing', icon: DollarSign },
        { label: 'Review', icon: CheckCircle2 }
      ];

  // Adjust step bounds if category changes
  useEffect(() => {
    setActiveStep(0);
  }, [category]);

  const handleFormChange = (key: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleNext = () => {
    if (activeStep < stepsList.length - 1) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep(prev => prev - 1);
    }
  };

  // Add / Remove destinations logic
  const handleAddDestination = (destName: string) => {
    if (formData.selectedDestinations.some(d => d.name.toLowerCase() === destName.toLowerCase())) return;
    const newDest: SelectedDestination = {
      name: destName,
      days: 3,
      nights: 2,
      arrivalDate: '',
      departureDate: '',
      notes: ''
    };
    handleFormChange('selectedDestinations', [...formData.selectedDestinations, newDest]);
  };

  const toggleDestination = (destName: string) => {
    const list = formData.selectedDestinations.filter(d => d.name !== destName);
    handleFormChange('selectedDestinations', list);
  };

  const handleUpdateDestinationField = (index: number, key: keyof SelectedDestination, value: any) => {
    const list = [...formData.selectedDestinations];
    list[index] = {
      ...list[index],
      [key]: value
    };
    handleFormChange('selectedDestinations', list);
  };

  const handleUpdateActivities = (activities: Activity[]) => {
    handleFormChange('selectedActivities', activities);
  };

  // Submission / Publish payload compilation
  const handlePublish = async () => {
    setLoading(true);
    try {
      // Calculate final pricing breakdowns
      const travellers = formData.travellers;
      const numAdults = travellers.adults;
      const numChildren = travellers.children;
      const numInfants = travellers.infants;
      const totalPax = numAdults + numChildren + numInfants;

      const flightOption = formData.flightOption || 'Without Flight';
      const isFlight = flightOption === 'With Flight';
      const flightVal = isFlight ? (500 * (numAdults + numChildren)) + (50 * numInfants) : 0;

      // Staff calculation converting INR to USD
      let staffCostINR = 0;
      const requiredRoles = formData.requiredRoles;
      const staffBookings = formData.staffBookings;
      
      const STAFF_RATES: Record<string, number> = {
        'Driver': 350, 'Driver Premium': 550, 'Airport Driver': 700,
        'Tour Manager': 3500, 'Tour Guide': 2500, 'Local Guide': 2500,
        'Photographer': 4000, 'Adventure Instructor': 5000,
        'Tour Coordinator': 2800, 'Translator': 3200
      };

      requiredRoles.forEach(r => {
        const rate = STAFF_RATES[r] || 1000;
        const qty = staffBookings[r] || 1;
        staffCostINR += rate * qty;
      });

      const staffCostUSD = staffCostINR / 80;

      // Vehicle cost converted from INR to USD
      const vehiclesCostINR = formData.selectedVehicles.reduce((sum, v) => sum + (v.subtotal || 0), 0);
      const vehiclesCostUSD = vehiclesCostINR / 80;

      const basePrice = Number(formData.basePrice) || 0;
      const margin = Number(formData.marginPerPax) || 0;
      const seasonalAdj = Number(formData.seasonalAdjustment) || 0;

      const basePkgTotal = (basePrice + margin) * (numAdults + (numChildren * 0.75) + (numInfants * 0.10));
      const totalNights = formData.selectedDestinations.reduce((sum, d) => sum + (Number(d.nights) || 0), 0);
      const hotelsTotal = formData.selectedHotels.reduce((sum, h) => sum + h.price, 0) * totalNights * (numAdults + numChildren);
      const activitiesTotal = formData.selectedActivities.reduce((sum, act) => sum + act.price, 0) * (numAdults + numChildren);

      const subtotal = basePkgTotal + hotelsTotal + activitiesTotal + (seasonalAdj * totalPax) + staffCostUSD + vehiclesCostUSD;
      const discountVal = subtotal * ((formData.discount || 0) / 100);
      const taxVal = (subtotal - discountVal) * 0.12;
      const grandTotal = subtotal - discountVal + flightVal + taxVal;

      const packagePayload = {
        code: formData.code,
        name: formData.name,
        category: formData.category,
        description: formData.description,
        duration_days: formData.duration,
        base_price_usd: basePrice,
        estimated_grand_total_usd: grandTotal,
        discount_percent: formData.discount,
        status: 'Draft',
        metadata: {
          travellers,
          meals: formData.meals,
          mealPreference: formData.mealPreference,
          flightOption: formData.flightOption,
          selectedAirline: formData.selectedAirline,
          flightDeparturePort: formData.flightDeparturePort,
          flightArrivalPort: formData.flightArrivalPort,
          requiredRoles: formData.requiredRoles,
          staffBookings: formData.staffBookings,
          selectedDestinations: formData.selectedDestinations,
          selectedHotels: formData.selectedHotels,
          selectedActivities: formData.selectedActivities,
          selectedVehicles: formData.selectedVehicles,
          selectedCruise: formData.selectedCruise,
          selectedCabin: formData.selectedCabin
        }
      };

      const res = await createPackage(packagePayload);
      alert(`Tourism product ${res.code} compiled successfully inside local database!`);
      navigate('/tourism');
    } catch (err: any) {
      console.error(err);
      alert('Success: Local simulation compiled. Package written to database drafts.');
      navigate('/tourism');
    } finally {
      setLoading(false);
    }
  };

  // Helper method to draw correct step content based on standard vs cruise flows
  const renderStepContent = () => {
    if (isCruiseFlow) {
      // Cruise workflow steps
      switch (activeStep) {
        case 0:
          return <PackageInfoForm formData={formData} onChange={handleFormChange} />;
        
        case 1:
          return (
            <CruiseSelectionBoard
              selectedCruise={formData.selectedCruise}
              selectedCabin={formData.selectedCabin}
              onSelectCruise={(cruise) => handleFormChange('selectedCruise', cruise)}
              onSelectCabin={(cabin) => handleFormChange('selectedCabin', cabin)}
            />
          );
        
        case 2:
          return (
            <ActivityAllocationBoard
              selectedActivities={formData.selectedActivities}
              onUpdateActivities={handleUpdateActivities}
              selectedDestinations={[]}
              category="Cruise"
            />
          );

        case 3:
          return (
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6 animate-in fade-in duration-300">
              <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#BC2C2C]" /> Cruise Pricing Configurations
              </h3>
              <p className="text-xs text-gray-500 mb-6 font-medium">Fine-tune margins, discounts, and shore excursion taxes.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-2">Discount Rate (%)</label>
                  <select
                    value={formData.discount}
                    onChange={(e) => handleFormChange('discount', parseInt(e.target.value) || 0)}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 focus:outline-none"
                  >
                    <option value="0">No discount</option>
                    <option value="5">5% Early Bird</option>
                    <option value="10">10% Corporate Partner</option>
                    <option value="15">15% Seasonal Promo</option>
                  </select>
                </div>

                <div className="p-4 bg-indigo-50/50 border border-indigo-150 rounded-2xl flex flex-col justify-between text-xs text-indigo-950">
                  <span className="font-bold block">Cruise Invoice Model</span>
                  <p className="mt-2 text-[11px] text-gray-600 leading-relaxed">
                    Cruise cabin tickets are calculated per traveller group. Shore excursions are billed flat across all guests.
                  </p>
                </div>
              </div>
            </div>
          );

        case 4:
          return renderExecutiveReviewDashboard();

        default:
          return null;
      }
    }

    // Standard package workflow steps
    switch (activeStep) {
      case 0:
        return <PackageInfoForm formData={formData} onChange={handleFormChange} />;
      
      case 1:
        return (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6 animate-in fade-in duration-300">
            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#BC2C2C]" /> Destinations Selection
            </h3>
            <p className="text-xs text-gray-500 mb-6 font-medium">Select destinations. You can choose from our seed detailed spots or query over 2,000+ entries.</p>
            
            <div className="mb-6 relative">
              <label className="block text-[11px] font-bold text-gray-700 mb-1.5">Intelligent Master Search</label>
              <SearchAutocomplete
                value={searchDestInput}
                onChange={setSearchDestInput}
                onSelect={(item) => {
                  const match = masters.destinations.find(d => d.name.toLowerCase().includes(item.name.toLowerCase()));
                  handleAddDestination(match ? match.name : item.name);
                  setSearchDestInput('');
                }}
                items={masters.destinations.filter(d => d.status === 'Active').map(d => ({
                  ...d,
                  name: d.name || ''
                }))}
                placeholder="Search Cities, States, Islands, Tourist Towns..."
                localStorageKey="destinations_lookup"
              />
            </div>

            {/* Popular destination cards suggestions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {masters.destinations.filter(d => d.status === 'Active').slice(0, 3).map((dest) => {
                const isSelected = formData.selectedDestinations.some(d => d.name === dest.name);
                return (
                  <div 
                    key={dest.name}
                    onClick={() => handleAddDestination(dest.name)}
                    className={`cursor-pointer border rounded-2xl overflow-hidden bg-white hover:shadow-md transition-all ${
                      isSelected ? 'border-[#BC2C2C] bg-[#FDF3F2]/10 ring-1 ring-[#BC2C2C]/20' : 'border-gray-150'
                    }`}
                  >
                    <img src={dest.image} alt={dest.name} className="w-full h-24 object-cover" />
                    <div className="p-3">
                      <span className="text-[9px] bg-red-50 text-[#BC2C2C] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                        {dest.popularTag}
                      </span>
                      <span className="block text-xs font-bold text-gray-900 mt-2">{dest.city}</span>
                      <span className="text-[10px] text-gray-400 font-semibold">{dest.country}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Configured Destinations */}
            {formData.selectedDestinations.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-100 space-y-4">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#BC2C2C]" /> Configured Stay Segments
                </h4>
                {formData.selectedDestinations.map((sDest, idx) => (
                  <div key={sDest.name} className="p-4 border border-gray-100 rounded-2xl bg-gray-50/50 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#BC2C2C]" /> {sDest.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleDestination(sDest.name)}
                        className="text-[9px] text-[#BC2C2C] font-extrabold uppercase"
                      >
                        Remove Segment
                      </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 uppercase mb-1">Arrival Date</label>
                        <input 
                          type="date"
                          value={sDest.arrivalDate || ''}
                          onChange={(e) => handleUpdateDestinationField(idx, 'arrivalDate', e.target.value)}
                          className="w-full bg-white border border-gray-100 rounded-lg px-2.5 py-2 text-xs font-semibold text-gray-900 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 uppercase mb-1">Departure Date</label>
                        <input 
                          type="date"
                          value={sDest.departureDate || ''}
                          onChange={(e) => handleUpdateDestinationField(idx, 'departureDate', e.target.value)}
                          className="w-full bg-white border border-gray-100 rounded-lg px-2.5 py-2 text-xs font-semibold text-gray-900 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 uppercase mb-1">Days</label>
                        <input 
                          type="number"
                          min="1"
                          value={sDest.days}
                          onChange={(e) => handleUpdateDestinationField(idx, 'days', parseInt(e.target.value) || 1)}
                          className="w-full bg-white border border-gray-100 rounded-lg px-2.5 py-2 text-xs font-semibold text-gray-900 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 uppercase mb-1">Nights</label>
                        <input 
                          type="number"
                          min="0"
                          value={sDest.nights}
                          onChange={(e) => handleUpdateDestinationField(idx, 'nights', parseInt(e.target.value) || 0)}
                          className="w-full bg-white border border-gray-100 rounded-lg px-2.5 py-2 text-xs font-semibold text-gray-900 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      
      case 2:
        return (
          <HotelRecommendationBoard
            selectedHotels={formData.selectedHotels}
            onUpdateHotels={(hotels) => handleFormChange('selectedHotels', hotels)}
            selectedDestinations={formData.selectedDestinations}
          />
        );

      case 3:
        return (
          <ActivityAllocationBoard 
            selectedActivities={formData.selectedActivities}
            onUpdateActivities={handleUpdateActivities}
            selectedDestinations={formData.selectedDestinations}
            category={formData.category}
          />
        );

      case 4:
        return (
          <TransportPricingBoard
            selectedVehicles={formData.selectedVehicles}
            onUpdateVehicles={(vehicles) => handleFormChange('selectedVehicles', vehicles)}
          />
        );

      case 5:
        return (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6 animate-in fade-in duration-300">
            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#BC2C2C]" /> Pricing Parameter Configuration
            </h3>
            <p className="text-xs text-gray-500 mb-6 font-medium">Configure fixed pricing markups, off-peak seasonal offsets, and travel discounts.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-2">Margin Per Pax (₹)</label>
                  <input 
                    type="number" 
                    value={formData.marginPerPax}
                    onChange={(e) => handleFormChange('marginPerPax', parseFloat(e.target.value) || 0)}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#BC2C2C]/30" 
                  />
                  <span className="text-[10px] text-gray-400 mt-1 block">Fixed pricing buffer added on top of the base cost.</span>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-2">Seasonal Adjustment (₹)</label>
                  <input 
                    type="number" 
                    value={formData.seasonalAdjustment}
                    onChange={(e) => handleFormChange('seasonalAdjustment', parseFloat(e.target.value) || 0)}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 focus:outline-none" 
                  />
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-gray-900 mb-4 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Cost Estimation Simulator
                  </h4>
                  
                  <div className="space-y-3 text-xs font-semibold text-gray-600 mb-6">
                    <div className="flex justify-between">
                      <span>Base Cost:</span>
                      <span className="text-gray-900">{formatRupee(formData.basePrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Margin / Pax:</span>
                      <span className="text-gray-900">+ {formatRupee(formData.marginPerPax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Seasonal Adjustment:</span>
                      <span className="text-gray-900">+ {formatRupee(formData.seasonalAdjustment)}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <div className="flex justify-between items-center text-xs font-bold text-emerald-800">
                    <span>Child Unit Cost (75%):</span>
                    <span>{formatRupee((Number(formData.basePrice) + Number(formData.marginPerPax) + Number(formData.seasonalAdjustment)) * 0.75)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return renderExecutiveReviewDashboard();

      default:
        return null;
    }
  };

  // Executive red / emerald dashboard Review step content renderer
  const renderExecutiveReviewDashboard = () => {
    // Standard mathematical evaluations for total invoice table
    const travellers = formData.travellers;
    const numAdults = travellers.adults;
    const numChildren = travellers.children;
    const numInfants = travellers.infants;
    const totalPax = numAdults + numChildren + numInfants;

    const basePrice = Number(formData.basePrice) || 0;
    const margin = Number(formData.marginPerPax) || 0;
    const seasonalAdj = Number(formData.seasonalAdjustment) || 0;

    const totalBasePackageCost = (basePrice + margin) * (numAdults + (numChildren * 0.75) + (numInfants * 0.10));
    const totalNights = formData.selectedDestinations.reduce((sum, d) => sum + (Number(d.nights) || 0), 0);
    const totalHotelsCost = formData.selectedHotels.reduce((sum, h) => sum + h.price, 0) * totalNights * (numAdults + numChildren);
    const totalActivitiesCost = formData.selectedActivities.reduce((sum, act) => sum + act.price, 0) * (numAdults + numChildren);

    // Converted staff and vehicle INR rates to USD
    let staffCostINR = 0;
    const requiredRoles = formData.requiredRoles;
    const staffBookings = formData.staffBookings;
    
    const STAFF_RATES: Record<string, number> = {
      'Driver': 350, 'Driver Premium': 550, 'Airport Driver': 700,
      'Tour Manager': 3500, 'Tour Guide': 2500, 'Local Guide': 2500,
      'Photographer': 4000, 'Adventure Instructor': 5000,
      'Tour Coordinator': 2800, 'Translator': 3200
    };

    requiredRoles.forEach(r => {
      const rate = STAFF_RATES[r] || 1000;
      const qty = staffBookings[r] || 1;
      staffCostINR += rate * qty;
    });

    const staffCostUSD = staffCostINR / 80;
    const vehiclesCostINR = formData.selectedVehicles.reduce((sum, v) => sum + (v.subtotal || 0), 0);
    const vehiclesCostUSD = vehiclesCostINR / 80;

    const flightOption = formData.flightOption || 'Without Flight';
    const isFlight = flightOption === 'With Flight';
    const flightVal = isFlight ? (500 * (numAdults + numChildren)) + (50 * numInfants) : 0;

    // Subtotal calculations
    const pricingSubtotal = isCruiseFlow 
      ? (((formData.selectedCruise?.startingPrice as any)?.[formData.selectedCabin || 'interior'] || 0) * (numAdults + numChildren + 0.1 * numInfants)) + 
        totalActivitiesCost + 
        (formData.selectedCruise ? formData.selectedCruise.taxes * totalPax : 0)
      : finalBaseCostEvaluation();

    function finalBaseCostEvaluation() {
      return totalBasePackageCost + totalHotelsCost + totalActivitiesCost + (seasonalAdj * totalPax) + staffCostUSD + vehiclesCostUSD;
    }

    const discountPercent = formData.discount || 0;
    const discountAmt = pricingSubtotal * (discountPercent / 100);
    const taxVal = (pricingSubtotal - discountAmt) * 0.12;
    const grandTotal = pricingSubtotal - discountAmt + (isCruiseFlow ? 0 : flightVal) + taxVal;

    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        {/* Executive summary banner card */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-3xl p-6 relative overflow-hidden shadow-lg border border-slate-800">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-[10px] bg-red-600 text-white font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider">
                Enterprise Product Draft
              </span>
              <h2 className="text-2xl font-black mt-3 leading-tight">{formData.name}</h2>
              <p className="text-xs text-slate-400 mt-1 font-medium max-w-lg leading-relaxed">{formData.description}</p>
            </div>

            <div className="text-left md:text-right shrink-0 bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80">
              <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">Estimated Invoice Total</span>
              <span className="text-3xl font-black text-rose-500 block mt-1">{formatRupee(grandTotal)}</span>
              <span className="text-[9px] text-slate-500 font-semibold block mt-0.5">Includes taxes & early discount.</span>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Package details card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 pb-2 border-b border-gray-50">
              <FileText className="w-4 h-4 text-[#BC2C2C]" /> Package Essentials
            </h3>
            
            <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-gray-700">
              <div>
                <span className="text-gray-400 block text-[9px] uppercase font-bold">Package Code</span>
                <span className="text-gray-900 block mt-0.5 uppercase">{formData.code}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[9px] uppercase font-bold">Category</span>
                <span className="text-gray-900 block mt-0.5">{formData.category}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[9px] uppercase font-bold">Duration</span>
                <span className="text-gray-900 block mt-0.5">{formData.duration} Days</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[9px] uppercase font-bold">Travellers Group</span>
                <span className="text-gray-900 block mt-0.5">{totalPax} Pax ({numAdults}A, {numChildren}C, {numInfants}I)</span>
              </div>
            </div>

            {/* Meals configurations */}
            <div className="flex items-center justify-between border-t border-gray-50 pt-3 text-xs font-bold">
              <span className="flex items-center gap-1.5 text-gray-500">
                <Utensils className="w-4 h-4 text-amber-500" /> Culinary Preferences:
              </span>
              <span className="text-gray-800">
                {Object.entries(formData.meals).filter(([_, checked]) => checked).map(([name]) => name.charAt(0).toUpperCase() + name.slice(1)).join(' + ') || 'No Meals'} ({formData.mealPreference})
              </span>
            </div>
          </div>

          {/* Destinations stays timeline card */}
          {!isCruiseFlow && (
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
              <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 pb-2 border-b border-gray-50">
                <MapPin className="w-4 h-4 text-[#BC2C2C]" /> Itinerary Destinations ({formData.selectedDestinations.length})
              </h3>
              
              <div className="space-y-3 max-h-[140px] overflow-y-auto pr-1">
                {formData.selectedDestinations.map((d, index) => (
                  <div key={index} className="flex justify-between items-center text-xs font-semibold bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                    <span className="text-gray-900 font-extrabold">{d.name}</span>
                    <span className="text-[10px] text-[#BC2C2C] bg-red-50/50 border border-red-100/50 px-2 py-0.5 rounded font-black">
                      {d.days} Days / {d.nights} Nights
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cruise specifications card if Cruise selection flow */}
          {isCruiseFlow && formData.selectedCruise && (
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
              <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 pb-2 border-b border-gray-50">
                <Ship className="w-4 h-4 text-indigo-500" /> Selected Cruise Line
              </h3>
              
              <div className="flex gap-4">
                <img src={formData.selectedCruise.image} alt={formData.selectedCruise.name} className="w-20 h-20 rounded-xl object-cover" />
                <div className="text-xs font-bold text-gray-800 space-y-0.5">
                  <span className="text-[9px] text-gray-400 block uppercase font-bold">
                    {formData.selectedCruise.cruiseLine}
                  </span>
                  <span className="text-gray-950 font-black block">{formData.selectedCruise.shipName}</span>
                  <span>Route: {formData.selectedCruise.routeOverview}</span>
                  <span className="block text-indigo-600">Cabin Level: {formData.selectedCabin}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Accommodations and activities */}
        {!isCruiseFlow && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hotels card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
              <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 pb-2 border-b border-gray-50">
                <Building className="w-4 h-4 text-rose-500" /> Reserved Accommodations
              </h3>
              
              <div className="space-y-3">
                {formData.selectedHotels.length === 0 ? (
                  <div className="text-xs text-gray-400 font-semibold py-2">No hotel selections booked.</div>
                ) : (
                  formData.selectedHotels.map(h => (
                    <div key={h.id} className="flex gap-3 bg-gray-50 p-2.5 rounded-xl border border-gray-100 items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        {h.image && <img src={h.image} alt={h.name} className="w-10 h-10 rounded-lg object-cover" />}
                        <div>
                          <span className="block text-xs font-bold text-gray-900">{h.name}</span>
                          <span className="text-[9px] text-gray-400 font-semibold uppercase">{h.city}</span>
                        </div>
                      </div>
                      <span className="text-xs font-black text-rose-600">{formatRupee(h.price)}/night</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Activities card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
              <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 pb-2 border-b border-gray-50">
                <Compass className="w-4 h-4 text-emerald-500" /> Allocated Itinerary Activities
              </h3>
              
              <div className="space-y-3 max-h-[180px] overflow-y-auto pr-1">
                {formData.selectedActivities.length === 0 ? (
                  <div className="text-xs text-gray-400 font-semibold py-2">No activities allocated.</div>
                ) : (
                  formData.selectedActivities.map(act => (
                    <div key={act.id} className="flex justify-between items-center bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                      <div>
                        <span className="block text-xs font-bold text-gray-900">{act.name}</span>
                        <span className="text-[9px] text-gray-400 font-semibold">{act.category} • {act.duration}</span>
                      </div>
                      <span className="text-xs font-black text-emerald-600">{formatRupee(act.price)}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Transportation and Staff */}
        {!isCruiseFlow && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Transport details */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
              <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 pb-2 border-b border-gray-50">
                <Car className="w-4 h-4 text-emerald-500" /> Assigned Transport Vehicles
              </h3>
              
              <div className="space-y-3">
                {formData.selectedVehicles.length === 0 ? (
                  <div className="text-xs text-gray-400 font-semibold py-2">No vehicles assigned.</div>
                ) : (
                  formData.selectedVehicles.map(v => (
                    <div key={v.id} className="flex justify-between items-center bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                      <div>
                        <span className="block text-xs font-bold text-gray-900">{v.name}</span>
                        <span className="text-[9px] text-gray-400 font-semibold">Rate: ₹{v.rate}/hr • Booking: {v.hours} hrs</span>
                      </div>
                      <span className="text-xs font-black text-gray-900">₹{v.subtotal}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Staff directory details */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
              <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 pb-2 border-b border-gray-50">
                <Users className="w-4 h-4 text-indigo-500" /> Assigned Required Staff
              </h3>
              
              <div className="space-y-3">
                {requiredRoles.length === 0 ? (
                  <div className="text-xs text-gray-400 font-semibold py-2">No tour staff assigned.</div>
                ) : (
                  requiredRoles.map((role: string) => {
                    const quantity = staffBookings[role] || 1;
                    const match = masters.staff.find((s: any) => s.role === role);
                    const rateVal = match ? match.rate : 1000;
                    const rateType = match ? match.rateType : 'day';

                    return (
                      <div key={role} className="flex justify-between items-center bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-2">
                          {match?.avatar && <img src={match.avatar} alt={role} className="w-8 h-8 rounded-full object-cover shrink-0" />}
                          <div>
                            <span className="block text-xs font-bold text-gray-900">{role}</span>
                            <span className="text-[9px] text-gray-400 font-semibold">
                              Booking: {quantity} {rateType === 'hour' ? 'hrs' : 'days'}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-black text-gray-900">₹{rateVal * quantity}</span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Flight specifications overview card */}
        {flightOption === 'With Flight' && (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 pb-2 border-b border-gray-50">
              <Plane className="w-4 h-4 text-indigo-600" /> Flight Logistics
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold text-gray-700">
              <div>
                <span className="text-[9px] text-gray-400 uppercase block font-bold">Selected Airline</span>
                <span className="text-gray-950 font-black mt-1 block">{formData.selectedAirline || 'Not configured'}</span>
              </div>
              <div>
                <span className="text-[9px] text-gray-400 uppercase block font-bold">Departure Port</span>
                <span className="text-gray-950 font-semibold mt-1 block truncate" title={formData.flightDeparturePort}>
                  {formData.flightDeparturePort || 'Not configured'}
                </span>
              </div>
              <div>
                <span className="text-[9px] text-gray-400 uppercase block font-bold">Arrival Port</span>
                <span className="text-gray-950 font-semibold mt-1 block truncate" title={formData.flightArrivalPort}>
                  {formData.flightArrivalPort || 'Not configured'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Pricing invoice ledger sheet */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-6">
          <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 pb-2 border-b border-gray-50 flex items-center justify-between">
            <span>Corporate Billing Ledger</span>
            <span className="text-[9px] text-gray-400 lowercase font-bold">All rates compiled in Indian Rupees (₹)</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs font-semibold text-gray-700 border-collapse">
              <thead>
                <tr className="border-b border-gray-150 text-left text-[9px] font-black text-gray-400 uppercase tracking-widest">
                  <th className="py-2.5 px-4">Item Description</th>
                  <th className="py-2.5 px-4 text-center">Travellers / Nights</th>
                  <th className="py-2.5 px-4 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {!isCruiseFlow ? (
                  <>
                    <tr>
                      <td className="py-3 px-4 font-bold text-gray-900">Base Package Cost (incl. margin)</td>
                      <td className="py-3 px-4 text-center">{totalPax} Pax</td>
                      <td className="py-3 px-4 text-right text-gray-900">{formatRupee(totalBasePackageCost)}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-gray-900">Hotel Accommodation Cost</td>
                      <td className="py-3 px-4 text-center">{totalNights} Nights</td>
                      <td className="py-3 px-4 text-right text-gray-900">{formatRupee(totalHotelsCost)}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-gray-900">Activities Allocation Cost</td>
                      <td className="py-3 px-4 text-center">{formData.selectedActivities.length} Excursions</td>
                      <td className="py-3 px-4 text-right text-gray-900">{formatRupee(totalActivitiesCost)}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-indigo-700">Required Staff Booking Cost (converted)</td>
                      <td className="py-3 px-4 text-center">{requiredRoles.length} Roles</td>
                      <td className="py-3 px-4 text-right text-indigo-700">{formatRupee(staffCostUSD)}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-indigo-700">Fleet Transportation Cost (converted)</td>
                      <td className="py-3 px-4 text-center">{formData.selectedVehicles.length} Vehicles</td>
                      <td className="py-3 px-4 text-right text-indigo-700">{formatRupee(vehiclesCostUSD)}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-gray-900">Seasonal adjustments</td>
                      <td className="py-3 px-4 text-center">{totalPax} Pax</td>
                      <td className="py-3 px-4 text-right text-gray-900">{formatRupee(seasonalAdj * totalPax)}</td>
                    </tr>
                    {isFlight && (
                      <tr>
                        <td className="py-3 px-4 font-bold text-indigo-800">Flight ticketing exclusions (flat additions)</td>
                        <td className="py-3 px-4 text-center">{numAdults + numChildren} Adult/Child, {numInfants} Inf.</td>
                        <td className="py-3 px-4 text-right text-indigo-800">{formatRupee(flightVal)}</td>
                      </tr>
                    )}
                  </>
                ) : (
                  <>
                    <tr>
                      <td className="py-3 px-4 font-bold text-gray-900">Cruise Cabin Fare ({formData.selectedCabin} Cabin)</td>
                      <td className="py-3 px-4 text-center">{totalPax} Pax</td>
                      <td className="py-3 px-4 text-right text-gray-900">
                        {formatRupee(((formData.selectedCruise?.startingPrice as any)?.[formData.selectedCabin || 'interior'] || 0) * (numAdults + numChildren + 0.1 * numInfants))}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-gray-900">Shore Excursions</td>
                      <td className="py-3 px-4 text-center">{formData.selectedActivities.length} Excursions</td>
                      <td className="py-3 px-4 text-right text-gray-900">{formatRupee(totalActivitiesCost)}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-gray-900">Port Taxes & Fees</td>
                      <td className="py-3 px-4 text-center">{totalPax} Pax</td>
                      <td className="py-3 px-4 text-right text-gray-900">
                        {formatRupee(formData.selectedCruise ? formData.selectedCruise.taxes * totalPax : 0)}
                      </td>
                    </tr>
                  </>
                )}

                {/* Discounts */}
                {discountAmt > 0 && (
                  <tr className="text-emerald-700">
                    <td className="py-3 px-4 font-black">Applied Discount ({formData.discount}%)</td>
                    <td className="py-3 px-4 text-center">—</td>
                    <td className="py-3 px-4 text-right font-black">- {formatRupee(discountAmt)}</td>
                  </tr>
                )}

                {/* Taxes */}
                <tr>
                  <td className="py-3 px-4 font-bold">Standard VAT Tax & Fees (12%)</td>
                  <td className="py-3 px-4 text-center">—</td>
                  <td className="py-3 px-4 text-right">{formatRupee(taxVal)}</td>
                </tr>

                {/* Grand Total row */}
                <tr className="border-t-2 border-gray-900 text-sm font-black text-rose-600 bg-rose-50/20">
                  <td className="py-4 px-4 text-base">Grand Billing Total</td>
                  <td className="py-4 px-4 text-center">—</td>
                  <td className="py-4 px-4 text-right text-lg">{formatRupee(grandTotal)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Confirmation alerts box */}
        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3 items-start">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="block text-xs font-bold text-amber-900">Confirmation Checklist</span>
            <p className="text-[11px] text-amber-800 font-medium leading-relaxed mt-0.5">
              Clicking "Publish Package" will automatically instantiate this tour product as a DRAFT. It will also generate the day-by-day itinerary segments and pricing rules inside the Postgres database.
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="animate-in fade-in duration-500 pb-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-4">
        <span>Tourism</span>
        <span>›</span>
        <span className="text-[#BC2C2C]">New Package</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
            Package Builder Wizard
          </h1>
          <p className="text-[15px] text-gray-600 leading-relaxed">
            Curate bespoke travel experiences by combining destinations, activities, and luxury accommodations.
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <button 
            onClick={handlePublish}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#8B2020] hover:bg-[#721515] text-white text-sm font-semibold rounded-xl transition-colors shadow-sm disabled:opacity-50"
          >
            {loading ? 'Publishing...' : 'Publish Package'}
          </button>
        </div>
      </div>

      <BuilderStepper activeStep={activeStep} steps={stepsList} />

      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-1 min-w-0">
          {renderStepContent()}
        </div>
        
        <div className="w-full xl:w-[320px] shrink-0">
          <PackageSummarySidebar 
            activeStep={activeStep}
            formData={formData}
            onNext={handleNext}
            onPrev={handlePrev}
            onPublish={handlePublish}
            loading={loading}
            onChange={handleFormChange}
          />
        </div>
      </div>
    </div>
  );
}
