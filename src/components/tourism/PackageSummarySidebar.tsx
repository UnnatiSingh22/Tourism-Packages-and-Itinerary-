import { Lightbulb, TrendingUp, Loader2, ChevronLeft, ChevronRight, Users, Utensils, Percent, Info, Plane } from 'lucide-react';
import { formatRupee } from '../../lib/utils';

interface Activity {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  duration: string;
  image: string;
}

interface Hotel {
  id: string;
  name: string;
  price: number;
  stars: number;
}

interface CruiseRecord {
  id: string;
  name: string;
  cruiseLine: string;
  shipName: string;
  destination: string;
  departurePort: string;
  arrivalPort: string;
  durationNights: number;
  routeOverview: string;
  startingPrice: {
    interior: number;
    oceanView: number;
    balcony: number;
    suite: number;
  };
  taxes: number;
  rating: number;
  image: string;
}

interface SelectedVehicle {
  id: string;
  name: string;
  rate: number;
  hours: number;
  subtotal: number;
}

interface PackageSummarySidebarProps {
  activeStep: number;
  formData: {
    name: string;
    category: string;
    description: string;
    destination?: string;
    duration: number;
    basePrice: number;
    marginPerPax?: number;
    seasonalAdjustment?: number;
    selectedActivities: Activity[];
    selectedHotels: Hotel[];
    selectedVehicles: SelectedVehicle[];
    selectedStaff?: { name: string; role: string }[];
    selectedDestinations: { name: string; days: number; nights: number }[];
    // Traveller configuration
    travellers?: { adults: number; children: number; infants: number };
    // Meals
    meals?: { breakfast: boolean; lunch: boolean; dinner: boolean };
    mealPreference?: string;
    // Discount percentage
    discount?: number;
    // Flight Option & Required Roles
    flightOption?: string;
    requiredRoles?: string[];
    staffBookings?: Record<string, number>;
    // Flight details
    selectedAirline?: string;
    flightDeparturePort?: string;
    flightArrivalPort?: string;
    // Cruise details
    selectedCruise?: CruiseRecord | null;
    selectedCabin?: string | null;
  };
  onNext: () => void;
  onPrev: () => void;
  onPublish: () => void;
  loading?: boolean;
  onChange?: (key: string, value: any) => void;
}

export function PackageSummarySidebar({ 
  activeStep, 
  formData, 
  onNext, 
  onPrev, 
  onPublish, 
  loading = false,
  onChange
}: PackageSummarySidebarProps) {

  // Retrieve travelers count with safe fallbacks
  const travellers = formData.travellers || { adults: 2, children: 0, infants: 0 };
  const numAdults = travellers.adults || 0;
  const numChildren = travellers.children || 0;
  const numInfants = travellers.infants || 0;
  const totalTravellersCount = numAdults + numChildren + numInfants;

  const category = formData.category || 'Luxury';
  const isCruiseFlow = category === 'Cruise';

  // Cruise flow specific calculations
  if (isCruiseFlow) {
    const selectedCruise = formData.selectedCruise || null;
    const selectedCabin = formData.selectedCabin || null;
    
    let cabinPrice = 0;
    if (selectedCruise && selectedCabin) {
      cabinPrice = (selectedCruise.startingPrice as any)[selectedCabin] || 0;
    }

    const cabinCost = cabinPrice * (numAdults + numChildren + (0.10 * numInfants));
    
    // Shore excursions (activities)
    const activitiesCost = formData.selectedActivities.reduce((sum, act) => sum + act.price, 0) * (numAdults + numChildren);
    
    // Cruise port taxes
    const taxesCost = selectedCruise ? selectedCruise.taxes * totalTravellersCount : 0;
    
    const discountPercent = formData.discount ?? 0;
    const grossTotal = cabinCost + activitiesCost + taxesCost;
    const discountAmt = grossTotal * (discountPercent / 100);
    const estimatedTotal = grossTotal - discountAmt;

    const isLastStep = activeStep === 4;

    return (
      <div className="flex flex-col gap-6 h-full sticky top-6">
        <div className="bg-white rounded-3xl shadow-md border border-gray-150 p-6 flex flex-col transition-all duration-300">
          <h2 className="text-sm font-bold text-gray-900 mb-5 flex items-center justify-between border-b border-gray-50 pb-3">
            <span>Cruise Pricing Estimator</span>
            <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-black uppercase tracking-wider">
              Cruise Flow
            </span>
          </h2>

          {selectedCruise ? (
            <div className="mb-4">
              <span className="text-[9px] text-gray-400 font-bold uppercase block">{selectedCruise.cruiseLine}</span>
              <span className="text-xs font-extrabold text-gray-800 block">{selectedCruise.shipName}</span>
              {selectedCabin && (
                <span className="text-[10px] text-indigo-600 font-bold block mt-0.5 capitalize">
                  Cabin Type: {selectedCabin} ({formatRupee(cabinPrice)}/pax)
                </span>
              )}
            </div>
          ) : (
            <div className="p-3 bg-red-50 text-[#BC2C2C] text-[10px] font-bold rounded-xl mb-4">
              No cruise selected yet. Select a cruise in Step 1.
            </div>
          )}

          {/* Group info */}
          <div className="flex items-center justify-between bg-gray-50/50 p-3 rounded-2xl border border-gray-100 mb-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-500" />
              <span className="text-[11px] text-gray-600 font-bold">Travellers Group</span>
            </div>
            <span className="text-xs font-black text-gray-900">
              {totalTravellersCount} Pax ({numAdults}A, {numChildren}C, {numInfants}I)
            </span>
          </div>

          {/* Cruise Breakdown */}
          <div className="space-y-3.5 mb-5 text-[11px] font-semibold text-gray-500">
            <div className="flex justify-between items-center">
              <span>Cabin Fare</span>
              <span className="text-gray-950 font-bold">{formatRupee(cabinCost)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Shore Excursions ({formData.selectedActivities.length})</span>
              <span className="text-gray-950 font-bold">{formatRupee(activitiesCost)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Port Taxes & Fees</span>
              <span className="text-gray-950 font-bold">{formatRupee(taxesCost)}</span>
            </div>

            {/* Discount Section */}
            <div className="flex justify-between items-center border-t border-gray-50 pt-3">
              <span className="flex items-center gap-1 text-emerald-600 font-bold">
                <Percent className="w-3.5 h-3.5" /> Special Discount
              </span>
              {onChange ? (
                <select
                  value={discountPercent}
                  onChange={(e) => onChange('discount', parseInt(e.target.value) || 0)}
                  className="bg-white border border-gray-200 rounded-lg px-2 py-0.5 text-[10px] font-extrabold text-emerald-600 cursor-pointer"
                >
                  <option value="0">0% Off</option>
                  <option value="5">5% Off</option>
                  <option value="10">10% Off</option>
                  <option value="15">15% Off</option>
                </select>
              ) : (
                <span className="text-emerald-600 font-extrabold">{discountPercent}% Off</span>
              )}
            </div>
            {discountAmt > 0 && (
              <div className="flex justify-between items-center text-emerald-600 font-bold pl-4">
                <span>Discount Amount</span>
                <span>- {formatRupee(discountAmt)}</span>
              </div>
            )}
          </div>

          {/* Live Total */}
          <div className="border-t border-gray-100 pt-5 mb-5">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Grand Total</span>
              <div className="text-right">
                <span className="text-[9px] font-bold text-gray-400 block mb-0.5">Taxes & Cabin Incl.</span>
                <span className="text-3xl font-black text-[#BC2C2C] leading-none">{formatRupee(estimatedTotal)}</span>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-auto space-y-3">
            {isLastStep ? (
              <button 
                onClick={onPublish}
                disabled={loading}
                className="w-full py-3.5 bg-[#BC2C2C] hover:bg-[#8B2020] text-white text-sm font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Publish Cruise Package'}
              </button>
            ) : (
              <button 
                onClick={onNext}
                className="w-full py-3.5 bg-gradient-to-r from-[#E65A4B] to-[#F17361] hover:brightness-95 text-white text-sm font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                Continue to Next Step
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {activeStep > 0 && (
              <button 
                onClick={onPrev}
                className="w-full py-2.5 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-xl transition-all hover:bg-gray-50 flex items-center justify-center gap-1.5"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Go Back
              </button>
            )}
            <p className="text-center text-[9px] font-semibold text-gray-400">Step {activeStep + 1} of 5</p>
          </div>
        </div>
      </div>
    );
  }

  // Retrieve flight options
  const flightOption = formData.flightOption || 'Without Flight';
  const isFlightIncluded = flightOption === 'With Flight';
  const flightCostValue = isFlightIncluded 
    ? (500 * (numAdults + numChildren)) + (50 * numInfants) 
    : 0;

  // Retrieve required roles & bookings (INR values)
  const requiredRoles = formData.requiredRoles || [];
  const staffBookings = formData.staffBookings || {};

  // Import staff directory to check hourly/daily rates
  const getStaffSubtotalINR = () => {
    let total = 0;
    requiredRoles.forEach((role) => {
      const staffRecord = requireStaffRecord(role);
      if (staffRecord) {
        const quantity = staffBookings[role] || 1;
        total += staffRecord.rate * quantity;
      }
    });
    return total;
  };

  const requireStaffRecord = (role: string) => {
    // Dynamically retrieve staff record details
    const STAFF_DIR_MOCK = [
      { role: 'Driver', rate: 350, rateType: 'hour' },
      { role: 'Driver Premium', rate: 550, rateType: 'hour' },
      { role: 'Airport Driver', rate: 700, rateType: 'hour' },
      { role: 'Tour Manager', rate: 3500, rateType: 'day' },
      { role: 'Tour Guide', rate: 2500, rateType: 'day' },
      { role: 'Local Guide', rate: 2500, rateType: 'day' },
      { role: 'Photographer', rate: 4000, rateType: 'day' },
      { role: 'Adventure Instructor', rate: 5000, rateType: 'day' },
      { role: 'Tour Coordinator', rate: 2800, rateType: 'day' },
      { role: 'Translator', rate: 3200, rateType: 'day' }
    ];
    return STAFF_DIR_MOCK.find(s => s.role === role);
  };

  const staffCostINR = getStaffSubtotalINR();
  // Convert INR to USD at standard rate of 1 USD = 80 INR
  const staffCostUSD = staffCostINR / 80;

  // Retrieve selected vehicles (which store subtotals in INR)
  const vehiclesCostINR = formData.selectedVehicles?.reduce((sum, v) => sum + (v.subtotal || 0), 0) || 0;
  const vehiclesCostUSD = vehiclesCostINR / 80;

  // Retrieve meals combinations
  const meals = formData.meals || { breakfast: true, lunch: false, dinner: false };
  const selectedMealsList = Object.entries(meals)
    .filter(([_, checked]) => checked)
    .map(([mealName]) => mealName.charAt(0).toUpperCase() + mealName.slice(1));
  const mealPref = formData.mealPreference || 'Both';

  // Standard Pricing calculations
  const basePrice = Number(formData.basePrice) || 0;
  const marginPerPax = Number(formData.marginPerPax) || 0;
  const seasonalAdjustment = Number(formData.seasonalAdjustment) || 0;
  
  const adultUnitBaseCost = basePrice + marginPerPax;
  const childUnitBaseCost = adultUnitBaseCost * 0.75;
  const infantUnitBaseCost = adultUnitBaseCost * 0.10;

  const totalBasePackageCost = (adultUnitBaseCost * numAdults) + (childUnitBaseCost * numChildren) + (infantUnitBaseCost * numInfants);

  // Nights count calculation
  const totalNights = formData.selectedDestinations.reduce((sum, d) => sum + (Number(d.nights) || 0), 0);

  // Add-ons Calculations
  const activitiesUnitCost = formData.selectedActivities.reduce((sum, act) => sum + act.price, 0);
  const totalActivitiesCost = activitiesUnitCost * (numAdults + numChildren);

  const hotelsUnitCostPerNight = formData.selectedHotels.reduce((sum, h) => sum + h.price, 0);
  const totalHotelsCost = hotelsUnitCostPerNight * totalNights * (numAdults + numChildren);

  // Package Cost combined (excl. seasonal adjustments, staff, vehicles, and flights)
  const finalBaseCost = totalBasePackageCost + totalHotelsCost + totalActivitiesCost;

  // Seasonal Adjustment combined for all travellers
  const seasonalAdjVal = seasonalAdjustment * (numAdults + (numChildren * 0.75) + (numInfants * 0.10));

  // Subtotal (including converted local staff & vehicle currencies)
  const pricingSubtotal = finalBaseCost + seasonalAdjVal + staffCostUSD + vehiclesCostUSD;

  // Discount
  const discountPercent = formData.discount ?? 0;
  const discountAmt = pricingSubtotal * (discountPercent / 100);

  // Tax on subtotal after discount (12%)
  const tax = (pricingSubtotal - discountAmt) * 0.12;

  // Estimated Total: (Subtotal - Discount) + Flight Cost + Tax
  const estimatedTotal = (pricingSubtotal - discountAmt) + flightCostValue + tax;

  // Projected Profit Margin
  const profitMarginVal = (marginPerPax * (numAdults + (numChildren * 0.75) + (numInfants * 0.10)));

  const isLastStep = activeStep === 6;

  return (
    <div className="flex flex-col gap-6 h-full sticky top-6">
      {/* Sticky Package Pricing Panel */}
      <div className="bg-white rounded-3xl shadow-md border border-gray-150 p-6 flex flex-col transition-all duration-300">
        <h2 className="text-sm font-bold text-gray-900 mb-5 flex items-center justify-between border-b border-gray-50 pb-3">
          <span>Live Cost Estimator</span>
          <span className="text-[10px] bg-red-50 text-[#BC2C2C] px-2 py-0.5 rounded font-black uppercase tracking-wider">
            Active
          </span>
        </h2>

        {/* Group / Travellers overview */}
        <div className="flex items-center justify-between bg-gray-50/50 p-3 rounded-2xl border border-gray-100 mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-500" />
            <span className="text-[11px] text-gray-600 font-bold">Travellers Group</span>
          </div>
          <span className="text-xs font-black text-gray-900">
            {numAdults}A, {numChildren}C, {numInfants}I ({totalTravellersCount} Pax)
          </span>
        </div>

        {/* Flight Indicator overview */}
        <div className="flex items-center justify-between bg-gray-50/50 p-3 rounded-2xl border border-gray-100 mb-5">
          <div className="flex items-center gap-2">
            <Plane className="w-4 h-4 text-gray-500" />
            <span className="text-[11px] text-gray-600 font-bold">Flight Inclusion</span>
          </div>
          <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
            isFlightIncluded ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'
          }`}>
            {flightOption}
          </span>
        </div>

        {/* Detail Breakdown */}
        <div className="space-y-3.5 mb-5 text-[11px] font-semibold text-gray-500">
          <div className="flex justify-between items-center">
            <span>Package Cost ({formData.duration} Days)</span>
            <span className="text-gray-900">{formatRupee(finalBaseCost)}</span>
          </div>
          {isFlightIncluded && (
            <div className="flex justify-between items-center text-indigo-700 font-bold bg-indigo-50/20 p-1.5 rounded-lg border border-indigo-100/50">
              <span className="flex items-center gap-1">
                <Plane className="w-3.5 h-3.5" /> Flight Cost
              </span>
              <span>{formatRupee(flightCostValue)}</span>
            </div>
          )}

          {/* Converted Staff Cost */}
          {staffCostUSD > 0 && (
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1 text-indigo-600">
                Staff Bookings <span title="Converted from INR (1 USD = 80 INR)">ⓘ</span>
              </span>
              <span className="text-gray-900">{formatRupee(staffCostUSD)}</span>
            </div>
          )}

          {/* Converted Vehicles Cost */}
          {vehiclesCostUSD > 0 && (
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1 text-indigo-600">
                Fleet Transport <span title="Converted from INR (1 USD = 80 INR)">ⓘ</span>
              </span>
              <span className="text-gray-900">{formatRupee(vehiclesCostUSD)}</span>
            </div>
          )}

          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1">
              Seasonal Adjustment 
              <span title="Seasonal rates applied based on travel period">
                <Info className="w-3 h-3 text-gray-400 hover:text-gray-600 cursor-help" />
              </span>
            </span>
            <span className="text-gray-900">{formatRupee(seasonalAdjVal)}</span>
          </div>

          {/* Discount Section with Interactive Control */}
          <div className="flex justify-between items-center border-t border-gray-50 pt-3">
            <span className="flex items-center gap-1 text-emerald-600 font-bold">
              <Percent className="w-3.5 h-3.5" /> Special Discount
            </span>
            {onChange ? (
              <select
                value={discountPercent}
                onChange={(e) => onChange('discount', parseInt(e.target.value) || 0)}
                className="bg-white border border-gray-200 rounded-lg px-2 py-0.5 text-[10px] font-extrabold text-emerald-600 cursor-pointer"
              >
                <option value="0">0% Off</option>
                <option value="5">5% Off</option>
                <option value="10">10% Off</option>
                <option value="15">15% Off</option>
                <option value="20">20% Off</option>
              </select>
            ) : (
              <span className="text-emerald-600 font-extrabold">{discountPercent}% Off</span>
            )}
          </div>
          {discountAmt > 0 && (
            <div className="flex justify-between items-center text-emerald-600 font-bold pl-4">
              <span>Discount Amount</span>
              <span>- {formatRupee(discountAmt)}</span>
            </div>
          )}

          <div className="flex justify-between items-center border-t border-gray-50 pt-3">
            <span>Taxes & Fees (12%)</span>
            <span className="text-gray-900">{formatRupee(tax)}</span>
          </div>
        </div>

        {/* Live Total */}
        <div className="border-t border-gray-100 pt-5 mb-5">
          <div className="flex justify-between items-end">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Cost</span>
            <div className="text-right">
              <span className="text-[9px] font-bold text-gray-400 block mb-0.5">Taxes & Discounts Incl.</span>
              <span className="text-3xl font-black text-[#BC2C2C] leading-none">{formatRupee(estimatedTotal)}</span>
            </div>
          </div>
        </div>

        {/* Projected Profit Margin Alert Box */}
        <div className="bg-emerald-50/50 border border-emerald-100/50 rounded-2xl p-4 mb-4 flex items-start gap-2.5">
          <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span className="block text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Projected Package Profit</span>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-lg font-black text-emerald-950">{formatRupee(profitMarginVal)}</span>
              <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">({formatRupee(formData.marginPerPax || 0)} / Pax base)</span>
            </div>
          </div>
        </div>

        {/* Required staff roles chip tag list */}
        {requiredRoles.length > 0 && (
          <div className="mb-4 p-3.5 bg-indigo-50/20 border border-indigo-100/40 rounded-2xl space-y-2">
            <div className="flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-indigo-600" />
              <span className="text-[10px] font-bold text-indigo-900 uppercase">Staff Required ({requiredRoles.length})</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {requiredRoles.map((role) => (
                <span key={role} className="text-[8px] bg-indigo-50 border border-indigo-100 font-extrabold text-indigo-700 px-1.5 py-0.5 rounded">
                  {role} ({staffBookings[role] || 1} {requireStaffRecord(role)?.rateType === 'hour' ? 'hrs' : 'days'})
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Culinary Summary Block if meals are defined */}
        {selectedMealsList.length > 0 && (
          <div className="mb-6 p-3 bg-amber-50/20 border border-amber-100/50 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Utensils className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-[10px] font-bold text-amber-900 uppercase">Meals Setup</span>
            </div>
            <span className="text-[10px] font-extrabold text-amber-800">
              {selectedMealsList.join(' + ')} ({mealPref})
            </span>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-auto space-y-3">
          {isLastStep ? (
            <button 
              onClick={onPublish}
              disabled={loading}
              className="w-full py-3.5 bg-[#BC2C2C] hover:bg-[#8B2020] text-white text-sm font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Publish Package'}
            </button>
          ) : (
            <button 
              onClick={onNext}
              className="w-full py-3.5 bg-gradient-to-r from-[#E65A4B] to-[#F17361] hover:brightness-95 text-white text-sm font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
            >
              Continue Next Step
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {activeStep > 0 && (
            <button 
              onClick={onPrev}
              className="w-full py-2.5 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-xl transition-all hover:bg-gray-50 flex items-center justify-center gap-1.5"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Go Back
            </button>
          )}
          <p className="text-center text-[9px] font-semibold text-gray-400">Step {activeStep + 1} of 7</p>
        </div>
      </div>

      <div className="bg-indigo-50/50 rounded-3xl p-6 shadow-sm border border-indigo-100 relative overflow-hidden">
        <Lightbulb className="absolute right-0 bottom-0 w-32 h-32 text-indigo-100 translate-x-1/4 translate-y-1/4" />
        <div className="relative z-10">
          <h3 className="text-xs font-bold text-indigo-900 mb-2 flex items-center gap-2">
            <SparkleIcon /> Builder Pro-Tip
          </h3>
          <p className="text-xs text-indigo-800/80 leading-relaxed">
            Packages with at least 3 curated activities see a 40% higher conversion rate. Try adding a unique dining experience to this itinerary.
          </p>
        </div>
      </div>
    </div>
  );
}

function SparkleIcon() {
  return (
    <svg className="w-4 h-4 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
    </svg>
  );
}
