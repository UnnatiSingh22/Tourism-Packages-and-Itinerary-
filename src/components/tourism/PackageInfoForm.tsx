import { useEffect } from 'react';
import { formatRupee } from '../../lib/utils';
import { useCurrency } from '../../context/CurrencyContext';
import { 
  FileText, 
  ChevronDown, 
  Plus, 
  Minus, 
  Check, 
  Calendar, 
  User, 
  HelpCircle, 
  Sparkles,
  Plane,
  Users,
  X,
  Clock
} from 'lucide-react';
import { SearchAutocomplete } from './SearchAutocomplete';
import { PACKAGE_CATEGORIES, MEAL_PREFERENCES, STAFF_ROLES, STAFF_DIRECTORY } from '../../data/tourismData';

interface PackageInfoFormProps {
  formData: any;
  onChange: (key: string, value: any) => void;
}

export function PackageInfoForm({ formData, onChange }: PackageInfoFormProps) {
  const { symbol } = useCurrency();

  // Safe defaults for fields
  const category = formData.category || 'Luxury';
  const travellers = formData.travellers || { adults: 2, children: 0, infants: 0 };
  const meals = formData.meals || { breakfast: true, lunch: false, dinner: false };
  const mealPreference = formData.mealPreference || 'Both';
  
  // Custom package fields
  const customPackageName = formData.customPackageName || '';
  const customerRequirements = formData.customerRequirements || '';
  const preferredDestinations = formData.preferredDestinations || '';
  const preferredHotels = formData.preferredHotels || '';
  const budgetRange = formData.budgetRange || '';
  const preferredActivities = formData.preferredActivities || '';
  const transportationPreference = formData.transportationPreference || '';
  const flexibleDates = formData.flexibleDates ?? false;

  // Flight Option & Staff Requirements
  const flightOption = formData.flightOption || 'Without Flight';
  const requiredRoles = formData.requiredRoles || [];
  const staffBookings = formData.staffBookings || {};

  // Flight details
  const selectedAirline = formData.selectedAirline || '';
  const flightDeparturePort = formData.flightDeparturePort || '';
  const flightArrivalPort = formData.flightArrivalPort || '';

  const selectedCategoryObj = PACKAGE_CATEGORIES.find(c => c.name === category) || PACKAGE_CATEGORIES[0];
  const SelectedCategoryIcon = selectedCategoryObj.icon;

  // Sync staff bookings when required roles change
  useEffect(() => {
    const duration = formData.duration || 5;
    const updatedBookings = { ...staffBookings };
    let changed = false;

    // Remove staff bookings for roles no longer selected
    Object.keys(updatedBookings).forEach(role => {
      if (!requiredRoles.includes(role)) {
        delete updatedBookings[role];
        changed = true;
      }
    });

    // Initialize default bookings for newly added roles
    requiredRoles.forEach((role: string) => {
      if (updatedBookings[role] === undefined) {
        const staffDef = STAFF_DIRECTORY.find(s => s.role === role);
        if (staffDef) {
          // If Driver, default to 8 hours per day of package duration
          // If other guide/coordinator, default to full package duration days
          updatedBookings[role] = staffDef.rateType === 'hour' ? duration * 8 : duration;
          changed = true;
        }
      }
    });

    if (changed) {
      onChange('staffBookings', updatedBookings);
    }
  }, [requiredRoles, formData.duration, onChange, staffBookings]);

  const handleCategorySelect = (catName: string) => {
    onChange('category', catName);
  };

  const handleTravellerChange = (type: 'adults' | 'children' | 'infants', operation: 'inc' | 'dec') => {
    const currentVal = travellers[type] || 0;
    let newVal = currentVal;
    if (operation === 'inc') {
      newVal += 1;
    } else {
      const minLimit = type === 'adults' ? 1 : 0;
      newVal = Math.max(minLimit, currentVal - 1);
    }
    onChange('travellers', {
      ...travellers,
      [type]: newVal
    });
  };

  const handleMealToggle = (mealKey: 'breakfast' | 'lunch' | 'dinner') => {
    onChange('meals', {
      ...meals,
      [mealKey]: !meals[mealKey]
    });
  };

  const handleRoleToggle = (role: string) => {
    const exists = requiredRoles.includes(role);
    const updated = exists
      ? requiredRoles.filter((r: string) => r !== role)
      : [...requiredRoles, role];
    onChange('requiredRoles', updated);
  };

  const handleStaffHoursDaysChange = (role: string, operation: 'inc' | 'dec') => {
    const currentVal = staffBookings[role] || 1;
    const newVal = operation === 'inc' ? currentVal + 1 : Math.max(1, currentVal - 1);
    onChange('staffBookings', {
      ...staffBookings,
      [role]: newVal
    });
  };

  // Autocomplete items mapping
  const categoryAutocompleteItems = PACKAGE_CATEGORIES.map(c => ({
    name: c.name,
    type: 'Category',
    description: c.description
  }));

  const staffRolesAutocompleteItems = STAFF_ROLES.map((role: string) => {
    const directoryMatch = STAFF_DIRECTORY.find(s => s.role === role);
    const rateText = directoryMatch 
      ? `${formatRupee(directoryMatch.rate)}/${directoryMatch.rateType}`
      : '';
    return {
      name: role,
      type: 'Staff Role',
      parent: rateText
    };
  });

  const airlineSuggestions = [
    { name: 'Emirates', type: 'Airline' },
    { name: 'Air India', type: 'Airline' },
    { name: 'Singapore Airlines', type: 'Airline' },
    { name: 'Lufthansa', type: 'Airline' },
    { name: 'Qatar Airways', type: 'Airline' },
    { name: 'British Airways', type: 'Airline' }
  ];

  const airportSuggestions = [
    { name: 'Delhi (DEL) - Indira Gandhi Airport', type: 'Airport', parent: 'India' },
    { name: 'Mumbai (BOM) - Chhatrapati Shivaji Airport', type: 'Airport', parent: 'India' },
    { name: 'London Heathrow (LHR)', type: 'Airport', parent: 'United Kingdom' },
    { name: 'Paris Charles de Gaulle (CDG)', type: 'Airport', parent: 'France' },
    { name: 'Tokyo Haneda (HND)', type: 'Airport', parent: 'Japan' },
    { name: 'Zurich Airport (ZRH)', type: 'Airport', parent: 'Switzerland' }
  ];

  return (
    <div className="space-y-6">
      {/* Primary Package Info Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6 animate-in fade-in duration-300">
        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#BC2C2C]" /> Package Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-[11px] font-bold text-gray-700 mb-1.5">Package Code <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              placeholder="e.g., PKG-PARIS" 
              value={formData.code || ''}
              onChange={(e) => onChange('code', e.target.value.toUpperCase())}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#BC2C2C]/30 transition-all" 
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-gray-700 mb-1.5">Package Name <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              placeholder="e.g., Parisian Summer Dreams" 
              value={formData.name || ''}
              onChange={(e) => onChange('name', e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#BC2C2C]/30 transition-all" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Custom Category Autocomplete Search Box */}
          <div>
            <label className="block text-[11px] font-bold text-gray-700 mb-1.5">Package Category <span className="text-red-500">*</span></label>
            <SearchAutocomplete
              value={category}
              onChange={(val) => onChange('category', val)}
              onSelect={(item) => handleCategorySelect(item.name)}
              items={categoryAutocompleteItems}
              placeholder="Type category (e.g. Cruise, Honeymoon, Solo)..."
              localStorageKey="pkg_category"
            />
            <div className="mt-2 flex items-center gap-1.5 px-3 py-1.5 bg-red-50/40 rounded-xl border border-red-100/40 text-[10px] font-bold text-[#BC2C2C] w-fit">
              <SelectedCategoryIcon className="w-3.5 h-3.5" />
              <span>Category layout: {category}</span>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-700 mb-1.5">Duration (Days)</label>
            <input 
              type="number" 
              min="1"
              max="90"
              value={formData.duration || 1}
              onChange={(e) => onChange('duration', parseInt(e.target.value) || 1)}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#BC2C2C]/30 transition-all" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-[11px] font-bold text-gray-700 mb-1.5">Base Price ({symbol})</label>
            <input 
              type="number" 
              min="1"
              value={formData.basePrice || 0}
              onChange={(e) => onChange('basePrice', parseFloat(e.target.value) || 0)}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#BC2C2C]/30 transition-all" 
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-gray-700 mb-1.5">Package Description</label>
            <input 
              placeholder="e.g. A premium summer experience in the City of Light." 
              value={formData.description || ''}
              onChange={(e) => onChange('description', e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#BC2C2C]/30 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Flight Option Config Card */}
      {category !== 'Cruise' && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6 animate-in fade-in duration-300">
          <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Plane className="w-4 h-4 text-[#BC2C2C]" /> Flight Inclusions
          </h3>
          <p className="text-xs text-gray-500 mb-6 font-medium">Select flight option to include domestic or international flight costs in this package.</p>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => onChange('flightOption', 'With Flight')}
                  className={`flex-1 py-3.5 rounded-xl border text-xs font-bold transition-all duration-300 ${
                    flightOption === 'With Flight'
                      ? 'border-[#BC2C2C] bg-[#BC2C2C]/5 text-[#BC2C2C] ring-1 ring-[#BC2C2C]/25'
                      : 'border-gray-100 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  With Flight
                </button>
                <button
                  type="button"
                  onClick={() => onChange('flightOption', 'Without Flight')}
                  className={`flex-1 py-3.5 rounded-xl border text-xs font-bold transition-all duration-300 ${
                    flightOption === 'Without Flight'
                      ? 'border-[#BC2C2C] bg-[#BC2C2C]/5 text-[#BC2C2C] ring-1 ring-[#BC2C2C]/25'
                      : 'border-gray-100 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Without Flight
                </button>
              </div>

              <div>
                {flightOption === 'With Flight' ? (
                  <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="text-[11px] text-emerald-800">
                      <span className="font-bold block">Flight pricing active</span>
                      <span>Estimated flight rate: <strong>{formatRupee(500)}</strong> / adult & child, <strong>{formatRupee(50)}</strong> / infant.</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-[11px] text-gray-400 font-medium">
                    Flight costs are excluded. The pricing simulator will evaluate ground services only.
                  </div>
                )}
              </div>
            </div>

            {/* Flight Autocomplete details */}
            {flightOption === 'With Flight' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-gray-100 pt-5 animate-in slide-in-from-top-3 duration-250">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1.5">Select Preferred Airline</label>
                  <SearchAutocomplete
                    value={selectedAirline}
                    onChange={(val) => onChange('selectedAirline', val)}
                    onSelect={(item) => onChange('selectedAirline', item.name)}
                    items={airlineSuggestions}
                    placeholder="Search Airlines..."
                    localStorageKey="airline_search"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1.5">Departure Airport</label>
                  <SearchAutocomplete
                    value={flightDeparturePort}
                    onChange={(val) => onChange('flightDeparturePort', val)}
                    onSelect={(item) => onChange('flightDeparturePort', item.name)}
                    items={airportSuggestions}
                    placeholder="Search Departure..."
                    localStorageKey="airport_dep"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1.5">Arrival Airport</label>
                  <SearchAutocomplete
                    value={flightArrivalPort}
                    onChange={(val) => onChange('flightArrivalPort', val)}
                    onSelect={(item) => onChange('flightArrivalPort', item.name)}
                    items={airportSuggestions}
                    placeholder="Search Arrival..."
                    localStorageKey="airport_arr"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tour Staff Requirements Card */}
      {category !== 'Cruise' && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6 animate-in fade-in duration-300">
          <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-[#BC2C2C]" /> Tour Staff Requirements
          </h3>
          <p className="text-xs text-gray-500 mb-6 font-medium">Select required employee roles. This maps resource requirements for the trip.</p>

          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              {/* Autocomplete for required roles */}
              <div className="w-full sm:w-80">
                <SearchAutocomplete
                  value=""
                  onChange={() => {}}
                  onSelect={(item) => {
                    if (!requiredRoles.includes(item.name)) {
                      handleRoleToggle(item.name);
                    }
                  }}
                  items={staffRolesAutocompleteItems}
                  placeholder="Type or select staff roles..."
                  localStorageKey="staff_roles_search"
                />
              </div>

              {requiredRoles.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {requiredRoles.map((role: string) => (
                    <div 
                      key={role} 
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full text-xs font-bold text-indigo-700 animate-in zoom-in-95 duration-150"
                    >
                      <span>{role}</span>
                      <button 
                        type="button" 
                        onClick={() => handleRoleToggle(role)}
                        className="hover:text-indigo-950 transition-colors p-0.5 rounded-full hover:bg-indigo-100/60"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Custom pricing logic grid for selected staff */}
            {requiredRoles.length > 0 && (
              <div className="border-t border-gray-100 pt-5 space-y-4 animate-in slide-in-from-top-3 duration-250">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Cost Breakdowns for Staff Required
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {requiredRoles.map((role: string) => {
                    const directoryMatch = STAFF_DIRECTORY.find(s => s.role === role);
                    if (!directoryMatch) return null;
                    const value = staffBookings[role] || 1;
                    const subtotal = directoryMatch.rate * value;
                    const isHourly = directoryMatch.rateType === 'hour';

                    return (
                      <div key={role} className="flex items-center justify-between border border-gray-100 rounded-2xl p-4 bg-gray-50/50">
                        <div>
                          <span className="block text-xs font-bold text-gray-900">{role}</span>
                          <span className="block text-[10px] text-gray-400 font-semibold mt-0.5">
                            Rate: {formatRupee(directoryMatch.rate)}/{directoryMatch.rateType}
                          </span>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2.5">
                            <button
                              type="button"
                              onClick={() => handleStaffHoursDaysChange(role, 'dec')}
                              className="w-7 h-7 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-gray-800 min-w-8 text-center">
                              {value} {isHourly ? 'hrs' : 'days'}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleStaffHoursDaysChange(role, 'inc')}
                              className="w-7 h-7 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-right shrink-0 min-w-[70px]">
                            <span className="text-xs font-black text-gray-900 block">{formatRupee(subtotal)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Dynamic Custom Package Specifications */}
      {category === 'Custom Package' && (
        <div className="bg-[#FCFDFD] rounded-3xl p-6 shadow-sm border border-cyan-100/60 mb-6 animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 rounded-xl bg-cyan-50">
              <Sparkles className="w-4 h-4 text-cyan-600" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-cyan-950 uppercase tracking-wider">Custom Package Configurations</h3>
              <p className="text-[10px] text-gray-500 font-medium">Bespoke fields tailored for corporate or VIP custom retreats.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-[11px] font-bold text-cyan-900 mb-1.5">Custom Package Name</label>
              <input 
                type="text" 
                placeholder="e.g., John Doe VIP Honeymoon" 
                value={customPackageName}
                onChange={(e) => onChange('customPackageName', e.target.value)}
                className="w-full bg-white border border-cyan-100 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all" 
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-cyan-900 mb-1.5">Preferred Destinations</label>
              <input 
                type="text" 
                placeholder="e.g., Zurich, Interlaken, Geneva" 
                value={preferredDestinations}
                onChange={(e) => onChange('preferredDestinations', e.target.value)}
                className="w-full bg-white border border-cyan-100 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-[11px] font-bold text-cyan-900 mb-1.5">Preferred Hotels</label>
              <input 
                type="text" 
                placeholder="e.g., Five-star boutique or luxury resorts" 
                value={preferredHotels}
                onChange={(e) => onChange('preferredHotels', e.target.value)}
                className="w-full bg-white border border-cyan-100 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all" 
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-cyan-900 mb-1.5">Budget Range</label>
              <input 
                type="text" 
                placeholder={`e.g., ${symbol}10,000 - ${symbol}15,000`} 
                value={budgetRange}
                onChange={(e) => onChange('budgetRange', e.target.value)}
                className="w-full bg-white border border-cyan-100 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-[11px] font-bold text-cyan-900 mb-1.5">Transportation Preference</label>
              <input 
                type="text" 
                placeholder="e.g., Private Chauffeur, First Class Rail" 
                value={transportationPreference}
                onChange={(e) => onChange('transportationPreference', e.target.value)}
                className="w-full bg-white border border-cyan-100 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all" 
              />
            </div>
            <div className="flex items-center justify-between border border-cyan-100/60 bg-cyan-50/20 rounded-xl px-4 py-3 self-end h-[46px]">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-cyan-600" />
                <span className="text-xs font-bold text-cyan-900">Flexible Travel Dates</span>
              </div>
              <button
                type="button"
                onClick={() => onChange('flexibleDates', !flexibleDates)}
                className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${
                  flexibleDates ? 'bg-cyan-600' : 'bg-gray-200'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                  flexibleDates ? 'translate-x-4' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[11px] font-bold text-cyan-900 mb-1.5">Customer Requirements</label>
              <textarea 
                placeholder="Specify private tours, guides, language specifications..." 
                value={customerRequirements}
                onChange={(e) => onChange('customerRequirements', e.target.value)}
                className="w-full bg-white border border-cyan-100 rounded-xl px-4 py-3 text-xs font-medium text-gray-900 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 h-24 resize-none transition-all"
              ></textarea>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-cyan-900 mb-1.5">Preferred Activities</label>
              <textarea 
                placeholder="e.g. Scuba diving, Museum curation VIP tour, private dinners..." 
                value={preferredActivities}
                onChange={(e) => onChange('preferredActivities', e.target.value)}
                className="w-full bg-white border border-cyan-100 rounded-xl px-4 py-3 text-xs font-medium text-gray-900 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 h-24 resize-none transition-all"
              ></textarea>
            </div>
          </div>
        </div>
      )}

      {/* Travellers Configuration Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6 animate-in fade-in duration-300">
        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <User className="w-4 h-4 text-[#BC2C2C]" /> Traveller Configuration
        </h3>
        <p className="text-xs text-gray-500 mb-6 font-medium">Configure counts. The pricing simulator evaluates rates using these details.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Adults */}
          <div className="flex items-center justify-between border border-gray-100 rounded-2xl p-4 bg-gray-50/50">
            <div>
              <span className="block text-xs font-bold text-gray-900">Adults</span>
              <span className="block text-[10px] text-gray-400 font-medium">Ages 12+</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleTravellerChange('adults', 'dec')}
                disabled={travellers.adults <= 1}
                className="w-8 h-8 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-55 disabled:cursor-not-allowed"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-sm font-black text-gray-900 w-4 text-center">{travellers.adults}</span>
              <button
                type="button"
                onClick={() => handleTravellerChange('adults', 'inc')}
                className="w-8 h-8 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Children */}
          <div className="flex items-center justify-between border border-gray-100 rounded-2xl p-4 bg-gray-50/50">
            <div>
              <span className="block text-xs font-bold text-gray-900">Children</span>
              <span className="block text-[10px] text-gray-400 font-medium">Ages 2 - 12 (75%)</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleTravellerChange('children', 'dec')}
                disabled={travellers.children <= 0}
                className="w-8 h-8 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-55 disabled:cursor-not-allowed"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-sm font-black text-gray-900 w-4 text-center">{travellers.children}</span>
              <button
                type="button"
                onClick={() => handleTravellerChange('children', 'inc')}
                className="w-8 h-8 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Infants */}
          <div className="flex items-center justify-between border border-gray-100 rounded-2xl p-4 bg-gray-50/50">
            <div>
              <span className="block text-xs font-bold text-gray-900">Infants</span>
              <span className="block text-[10px] text-gray-400 font-medium">Under 2 (10%)</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleTravellerChange('infants', 'dec')}
                disabled={travellers.infants <= 0}
                className="w-8 h-8 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-55 disabled:cursor-not-allowed"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-sm font-black text-gray-900 w-4 text-center">{travellers.infants}</span>
              <button
                type="button"
                onClick={() => handleTravellerChange('infants', 'inc')}
                className="w-8 h-8 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Meal Selection Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6 animate-in fade-in duration-300">
        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-[#BC2C2C]" /> Meal & Culinary Plan
        </h3>
        <p className="text-xs text-gray-500 mb-6 font-medium">Select meals per day and preferences for the package booking.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Meals Per Day */}
          <div>
            <label className="block text-[11px] font-bold text-gray-700 mb-3">Meals Per Day</label>
            <div className="flex flex-col sm:flex-row gap-3">
              {(['breakfast', 'lunch', 'dinner'] as const).map((mealKey) => {
                const isChecked = meals[mealKey];
                return (
                  <button
                    key={mealKey}
                    type="button"
                    onClick={() => handleMealToggle(mealKey)}
                    className={`flex-1 p-3.5 rounded-xl border text-xs font-bold capitalize transition-all duration-300 flex items-center justify-between ${
                      isChecked 
                        ? 'border-[#BC2C2C] bg-[#BC2C2C]/5 text-[#BC2C2C] ring-1 ring-[#BC2C2C]/25 shadow-sm'
                        : 'border-gray-100 hover:border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span>{mealKey}</span>
                    <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                      isChecked ? 'border-[#BC2C2C] bg-[#BC2C2C] text-white' : 'border-gray-200'
                    }`}>
                      {isChecked && <Check className="w-2.5 h-2.5" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Meal Preference */}
          <div>
            <label className="block text-[11px] font-bold text-gray-700 mb-3">Meal Preference</label>
            <div className="relative">
              <select
                value={mealPreference}
                onChange={(e) => onChange('mealPreference', e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#BC2C2C]/30 appearance-none cursor-pointer"
              >
                {MEAL_PREFERENCES.map((pref: any) => (
                  <option key={pref.value} value={pref.value}>
                    {pref.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
