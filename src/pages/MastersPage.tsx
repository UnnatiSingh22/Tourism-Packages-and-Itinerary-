import React, { useState, useRef } from 'react';
import { useMasterData, type MasterName, type MasterRecord } from '../context/MasterDataContext';
import { 
  Database, Plus, Search, Edit2, Trash2, X, 
  MapPin, Building, Car, Navigation, Users, Shield, 
  Briefcase, Gift, DollarSign, Calendar, Globe, Compass, 
  Tag, Activity, ListFilter, Sliders, AlertCircle,
  Copy, FileSpreadsheet, SlidersHorizontal, Anchor, Plane, Utensils
} from 'lucide-react';
import { formatRupee } from '../lib/utils';

const MASTER_KEYS: Record<MasterName, { label: string; description: string; icon: any; fields: { name: string; label: string; type: 'text' | 'number' | 'select' | 'checkbox' | 'textarea'; options?: string[] }[] }> = {
  destinations: {
    label: 'Destinations',
    description: 'Central registry of travel destinations and hubs.',
    icon: Compass,
    fields: [
      { name: 'name', label: 'Destination Name', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'image', label: 'Image URL', type: 'text' },
    ],
  },
  hotels: {
    label: 'Hotels',
    description: 'Centralized database of hotel properties and baseline price indices.',
    icon: Building,
    fields: [
      { name: 'name', label: 'Hotel Name', type: 'text' },
      { name: 'location', label: 'Location', type: 'text' },
      { name: 'stars', label: 'Stars Rating', type: 'number' },
      { name: 'price', label: 'Base Rate (₹/night)', type: 'number' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'image', label: 'Image URL', type: 'text' },
    ],
  },
  transport: {
    label: 'Transport Services',
    description: 'Enterprise charter agreements and logistics partners.',
    icon: Car,
    fields: [
      { name: 'name', label: 'Company Name', type: 'text' },
      { name: 'location', label: 'Service Hub', type: 'text' },
      { name: 'rating', label: 'Rating', type: 'number' },
      { name: 'roomRate', label: 'Charter Price (₹)', type: 'number' },
      { name: 'confRate', label: 'Standby Price (₹)', type: 'number' },
      { name: 'tier', label: 'Service Tier', type: 'select', options: ['Tier 1', 'Tier 2', 'Tier 3'] },
      { name: 'contractNo', label: 'Contract Number', type: 'text' },
      { name: 'terms', label: 'Agreement Terms', type: 'textarea' },
      { name: 'image', label: 'Representative Image', type: 'text' },
    ],
  },
  vehicles: {
    label: 'Vehicles',
    description: 'Fleet composition database of active transportation models.',
    icon: Navigation,
    fields: [
      { name: 'name', label: 'Vehicle Model', type: 'text' },
      { name: 'type', label: 'Vehicle Type', type: 'select', options: ['Luxury Sedan', 'Premium SUV', 'Luxury Van', 'Coaches & Buses'] },
    ],
  },
  venues: {
    label: 'Venues',
    description: 'Concert, meeting, and luxury event hall registry.',
    icon: MapPin,
    fields: [
      { name: 'name', label: 'Venue Name', type: 'text' },
      { name: 'location', label: 'Location Address', type: 'text' },
    ],
  },
  staff: {
    label: 'Staff & Drivers',
    description: 'Active drivers, coordinators, and logistics crew member records.',
    icon: Users,
    fields: [
      { name: 'name', label: 'Full Name', type: 'text' },
      { name: 'role', label: 'Role Designation', type: 'select', options: ['Driver', 'Tour Manager', 'Coordinator', 'Event Planner', 'Guide'] },
    ],
  },
  vendors: {
    label: 'Catering Vendors',
    description: 'Contracted gourmet catering and culinary services registry.',
    icon: Shield,
    fields: [
      { name: 'name', label: 'Vendor Name', type: 'text' },
      { name: 'location', label: 'City / Hub', type: 'text' },
      { name: 'rating', label: 'Quality Score (1-5)', type: 'number' },
      { name: 'roomRate', label: 'Menu Base Rate (₹/pax)', type: 'number' },
      { name: 'confRate', label: 'Service Surcharge (₹)', type: 'number' },
      { name: 'tier', label: 'SLA Level', type: 'select', options: ['Tier 1', 'Tier 2', 'Tier 3'] },
      { name: 'contractNo', label: 'Contract Ref', type: 'text' },
      { name: 'terms', label: 'Catering Terms & Guidelines', type: 'textarea' },
      { name: 'image', label: 'Representative Image', type: 'text' },
    ],
  },
  suppliers: {
    label: 'Global Suppliers',
    description: 'Centralized index of active third-party wholesale supply contacts.',
    icon: Briefcase,
    fields: [
      { name: 'name', label: 'Supplier Name', type: 'text' },
      { name: 'email', label: 'Business Email', type: 'text' },
      { name: 'phone', label: 'Contact Phone', type: 'text' },
    ],
  },
  packages: {
    label: 'Default Packages',
    description: 'Pre-assembled corporate incentive travel drafts.',
    icon: Gift,
    fields: [
      { name: 'name', label: 'Package Name', type: 'text' },
      { name: 'code', label: 'Package Code', type: 'text' },
    ],
  },
  categories: {
    label: 'Package Categories',
    description: 'Package tag classifications (e.g. MICE, Leisure, Wellness).',
    icon: Tag,
    fields: [
      { name: 'name', label: 'Category Name', type: 'text' },
    ],
  },
  eventTypes: {
    label: 'Event Types',
    description: 'Operational tag classification for events.',
    icon: Activity,
    fields: [
      { name: 'name', label: 'Event Classification', type: 'text' },
    ],
  },
  activities: {
    label: 'Activities',
    description: 'Sightseeing tours and local operational activities list.',
    icon: Sliders,
    fields: [
      { name: 'name', label: 'Activity Name', type: 'text' },
      { name: 'price', label: 'Price per Pax (₹)', type: 'number' },
      { name: 'duration', label: 'Duration (e.g. 2 Hours)', type: 'text' },
      { name: 'category', label: 'Category', type: 'select', options: ['Luxury', 'Dining', 'Cultural', 'Leisure', 'Adventure'] },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'image', label: 'Image URL', type: 'text' },
    ],
  },
  mealPlans: {
    label: 'Meal Plans',
    description: 'Standard multi-day catering meal configurations.',
    icon: ListFilter,
    fields: [
      { name: 'name', label: 'Meal Plan Name', type: 'text' },
    ],
  },
  seasons: {
    label: 'Seasons',
    description: 'System seasonal windows and global adjustment offsets.',
    icon: Calendar,
    fields: [
      { name: 'name', label: 'Season Name', type: 'text' },
      { name: 'adjustmentFactor', label: 'Adjustment Surcharge (₹ or ratio)', type: 'text' },
    ],
  },
  countries: {
    label: 'Countries',
    description: 'Global geographic country codes database.',
    icon: Globe,
    fields: [
      { name: 'name', label: 'Country Name', type: 'text' },
      { name: 'code', label: 'Country Code (ISO)', type: 'text' },
    ],
  },
  states: {
    label: 'States',
    description: 'Geographic regional states mapping index.',
    icon: MapPin,
    fields: [
      { name: 'name', label: 'State Name', type: 'text' },
      { name: 'countryId', label: 'Country Reference ID', type: 'text' },
    ],
  },
  cities: {
    label: 'Cities',
    description: 'Geographic localized cities registry.',
    icon: MapPin,
    fields: [
      { name: 'name', label: 'City Name', type: 'text' },
      { name: 'stateId', label: 'State Reference ID', type: 'text' },
    ],
  },
  currencies: {
    label: 'Currencies',
    description: 'System exchange codes and currency symbol settings.',
    icon: DollarSign,
    fields: [
      { name: 'code', label: 'Currency Code', type: 'text' },
      { name: 'symbol', label: 'Symbol', type: 'text' },
    ],
  },
  guests: {
    label: 'Guests',
    description: 'Global master passenger manifest compliance database.',
    icon: Users,
    fields: [
      { name: 'firstName', label: 'First Name', type: 'text' },
      { name: 'lastName', label: 'Last Name', type: 'text' },
      { name: 'email', label: 'Email Address', type: 'text' },
      { name: 'phone', label: 'Phone Number', type: 'text' },
      { name: 'complianceStatus', label: 'Compliance Status', type: 'select', options: ['CLEAR', 'PENDING', 'SUSPENDED'] },
    ],
  },
  customers: {
    label: 'Customers / B2B Clients',
    description: 'Enterprise corporate entities and travel manager directories.',
    icon: Users,
    fields: [
      { name: 'name', label: 'Corporate Name', type: 'text' },
      { name: 'email', label: 'Company Email', type: 'text' },
      { name: 'phone', label: 'Direct Hotline', type: 'text' },
    ],
  },
  regions: {
    label: 'Regions',
    description: 'Standard regions mapping database for command center filtering.',
    icon: Globe,
    fields: [
      { name: 'name', label: 'Region Name', type: 'text' },
    ]
  },
  cruises: {
    label: 'Cruises',
    description: 'Global Cruise liners voyage parameters database.',
    icon: Anchor,
    fields: [
      { name: 'name', label: 'Cruise Voyage Name', type: 'text' },
      { name: 'cruiseLine', label: 'Cruise Line Company', type: 'text' },
      { name: 'shipName', label: 'Ship Name', type: 'text' },
      { name: 'destination', label: 'Region / Destination', type: 'text' },
      { name: 'departurePort', label: 'Departure Port', type: 'text' },
      { name: 'arrivalPort', label: 'Arrival Port', type: 'text' },
      { name: 'durationNights', label: 'Duration (Nights)', type: 'number' },
      { name: 'startingPriceInterior', label: 'Interior Cabin price (₹)', type: 'number' },
      { name: 'startingPriceOceanView', label: 'Ocean View Cabin price (₹)', type: 'number' },
      { name: 'startingPriceBalcony', label: 'Balcony Cabin price (₹)', type: 'number' },
      { name: 'startingPriceSuite', label: 'Suite Cabin price (₹)', type: 'number' },
      { name: 'taxes', label: 'Taxes & Port Fees per pax (₹)', type: 'number' },
      { name: 'rating', label: 'Cruise Rating', type: 'number' },
    ]
  },
  flights: {
    label: 'Flights',
    description: 'Active airline bookings routing directory.',
    icon: Plane,
    fields: [
      { name: 'airline', label: 'Airline Name', type: 'text' },
      { name: 'flightClass', label: 'Cabin Class', type: 'select', options: ['Economy', 'Premium Economy', 'Business', 'First Class'] },
      { name: 'airport', label: 'Airport Hub', type: 'text' },
      { name: 'route', label: 'Route (e.g. BOM - DEL)', type: 'text' },
    ]
  },
  pricingRules: {
    label: 'Pricing Rules',
    description: 'Dynamic pricing engines rules baseline config.',
    icon: Sliders,
    fields: [
      { name: 'name', label: 'Pricing Rule Name', type: 'text' },
      { name: 'seasonalPricing', label: 'Seasonal Surcharge (%)', type: 'number' },
      { name: 'discountRules', label: 'Discount Terms / Conditions', type: 'text' },
      { name: 'taxRules', label: 'Tax Percentage (%)', type: 'number' },
      { name: 'serviceCharges', label: 'Service Charge (%)', type: 'number' },
      { name: 'markups', label: 'Markup/Margin Percentage (%)', type: 'number' },
      { name: 'currencySettings', label: 'Default Currency Display', type: 'select', options: ['INR (₹)', 'USD ($)', 'EUR (€)'] },
    ]
  },
  mealOptions: {
    label: 'Meal Options',
    description: 'Centralized registry of meal plans and dietary exclusions.',
    icon: Utensils,
    fields: [
      { name: 'name', label: 'Meal Option Name', type: 'text' },
      { name: 'type', label: 'Meal Type', type: 'select', options: ['Breakfast', 'Lunch', 'Dinner', 'All Day', 'Snack'] },
      { name: 'veg', label: 'Vegetarian Option', type: 'checkbox' },
      { name: 'nonVeg', label: 'Non-Vegetarian Option', type: 'checkbox' },
      { name: 'jain', label: 'Jain Meal Available', type: 'checkbox' },
      { name: 'vegan', label: 'Vegan Option Available', type: 'checkbox' },
      { name: 'glutenFree', label: 'Gluten Free Available', type: 'checkbox' },
    ]
  }
};

export function MastersPage() {
  const { 
    masters, 
    addRecord, 
    addRecords, 
    updateRecord, 
    deleteRecord, 
    bulkDelete, 
    bulkUpdateStatus 
  } = useMasterData();

  const [selectedMaster, setSelectedMaster] = useState<MasterName>('destinations');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Checked Rows State for Bulk Actions
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  
  // Custom Columns Config
  const [showColSelector, setShowColSelector] = useState(false);
  const [visibleMetadataCols, setVisibleMetadataCols] = useState({
    id: true,
    createdAt: false,
    updatedAt: false,
    createdBy: false,
    modifiedBy: false,
  });

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<MasterRecord | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  
  // Import CSV ref & State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importStatus, setImportStatus] = useState<{ success?: string; error?: string } | null>(null);

  const masterConfig = MASTER_KEYS[selectedMaster];
  const listData = masters[selectedMaster] || [];

  const filteredData = listData.filter(record => {
    const searchVal = searchQuery.toLowerCase();
    return Object.keys(record).some(key => {
      if (key === 'id' || key === 'status' || key === 'createdAt' || key === 'updatedAt') return false;
      return String(record[key]).toLowerCase().includes(searchVal);
    });
  });

  const handleOpenAdd = () => {
    setEditingRecord(null);
    const initialForm: Record<string, any> = { status: 'Active' };
    masterConfig.fields.forEach(f => {
      if (f.type === 'checkbox') {
        initialForm[f.name] = false;
      } else if (f.type === 'number') {
        initialForm[f.name] = 0;
      } else if (f.type === 'select') {
        initialForm[f.name] = f.options?.[0] || '';
      } else {
        initialForm[f.name] = '';
      }
    });
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (record: MasterRecord) => {
    setEditingRecord(record);
    setFormData({ ...record });
    setIsModalOpen(true);
  };

  const handleClone = (record: MasterRecord) => {
    // Duplicate the record with a Copy suffix
    const cloneData: any = { ...record };
    delete cloneData.id;
    if (cloneData.name) {
      cloneData.name = `${cloneData.name} (Copy)`;
    } else if (cloneData.firstName) {
      cloneData.firstName = `${cloneData.firstName} (Copy)`;
    }
    setEditingRecord(null); // Save as new entry
    setFormData(cloneData);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this master record? This may impact active operations.')) {
      deleteRecord(selectedMaster, id);
      setCheckedIds(prev => prev.filter(x => x !== id));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRecord) {
      updateRecord(selectedMaster, editingRecord.id, formData);
    } else {
      addRecord(selectedMaster, formData as Omit<MasterRecord, 'id'>);
    }
    setIsModalOpen(false);
  };

  const handleToggleStatus = (record: MasterRecord) => {
    const nextStatus = record.status === 'Active' ? 'Inactive' : 'Active';
    updateRecord(selectedMaster, record.id, { status: nextStatus });
  };

  // Bulk Actions
  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCheckedIds(filteredData.map(r => r.id));
    } else {
      setCheckedIds([]);
    }
  };

  const handleRowCheck = (id: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckedIds(prev => [...prev, id]);
    } else {
      setCheckedIds(prev => prev.filter(x => x !== id));
    }
  };

  const handleBulkDelete = () => {
    if (confirm(`Are you sure you want to delete the ${checkedIds.length} selected records?`)) {
      bulkDelete(selectedMaster, checkedIds);
      setCheckedIds([]);
    }
  };

  const handleBulkStatusChange = (status: 'Active' | 'Inactive') => {
    bulkUpdateStatus(selectedMaster, checkedIds, status);
    setCheckedIds([]);
  };

  // CSV Import / Export
  const handleExportCSV = () => {
    if (filteredData.length === 0) return;
    
    // Header
    const fields = masterConfig.fields.map(f => f.name);
    const headers = [...fields, 'status', 'id', 'createdAt', 'createdBy'];
    
    const rows = filteredData.map(record => {
      return headers.map(header => {
        const val = record[header] ?? '';
        return `"${String(val).replace(/"/g, '""')}"`;
      }).join(',');
    });
    
    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${selectedMaster}_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleTriggerCSVInput = () => {
    fileInputRef.current?.click();
  };

  const handleImportCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (!text) return;

      try {
        const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
        if (lines.length < 2) {
          setImportStatus({ error: 'CSV file is empty or missing header.' });
          return;
        }

        // Parse header line (supporting quoted headers)
        const parseCSVLine = (line: string) => {
          const result = [];
          let current = '';
          let inQuotes = false;
          for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
              inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
              result.push(current.trim().replace(/^"|"$/g, ''));
              current = '';
            } else {
              current += char;
            }
          }
          result.push(current.trim().replace(/^"|"$/g, ''));
          return result;
        };

        const headers = parseCSVLine(lines[0]);
        const recordsToImport: Omit<MasterRecord, 'id'>[] = [];

        for (let i = 1; i < lines.length; i++) {
          const values = parseCSVLine(lines[i]);
          const record: Record<string, any> = { status: 'Active' };

          masterConfig.fields.forEach(f => {
            const headerIndex = headers.indexOf(f.name);
            if (headerIndex !== -1) {
              const strVal = values[headerIndex];
              if (f.type === 'number') {
                record[f.name] = parseFloat(strVal) || 0;
              } else if (f.type === 'checkbox') {
                record[f.name] = strVal?.toLowerCase() === 'true' || strVal === '1';
              } else {
                record[f.name] = strVal || '';
              }
            } else {
              record[f.name] = f.type === 'number' ? 0 : f.type === 'checkbox' ? false : '';
            }
          });

          // Grab status if available in CSV
          const statusIdx = headers.indexOf('status');
          if (statusIdx !== -1 && values[statusIdx]) {
            record.status = values[statusIdx] as any;
          }

          recordsToImport.push(record as Omit<MasterRecord, 'id'>);
        }

        if (recordsToImport.length > 0) {
          addRecords(selectedMaster, recordsToImport);
          setImportStatus({ success: `Successfully imported ${recordsToImport.length} records.` });
          // Clear notification after 4s
          setTimeout(() => setImportStatus(null), 4000);
        }
      } catch (err) {
        console.error(err);
        setImportStatus({ error: 'Failed to parse CSV. Make sure format is correct.' });
      }
    };
    reader.readAsText(file);
    // Reset file input
    e.target.value = '';
  };

  return (
    <div className="animate-in fade-in duration-500 pb-12 flex flex-col xl:flex-row gap-8 h-[calc(100vh-130px)]">
      {/* Left Sidebar List of Masters */}
      <div className="w-full xl:w-[320px] bg-white rounded-3xl border border-gray-100 flex flex-col overflow-hidden shrink-0 shadow-sm relative">
        <div className="p-5 border-b border-gray-50 flex items-center gap-3 bg-gradient-to-r from-red-50/30 to-white">
          <Database className="w-5 h-5 text-[#BC2C2C]" />
          <div>
            <h3 className="text-sm font-bold text-gray-900">Registries</h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Select master category</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-thin scrollbar-thumb-gray-200">
          {(Object.keys(MASTER_KEYS) as MasterName[]).map((key) => {
            const config = MASTER_KEYS[key];
            const Icon = config.icon;
            const count = masters[key]?.length || 0;
            const isSelected = selectedMaster === key;

            return (
              <button
                key={key}
                onClick={() => {
                  setSelectedMaster(key);
                  setSearchQuery('');
                  setCheckedIds([]);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 text-left ${
                  isSelected 
                    ? 'bg-[#BC2C2C]/5 text-[#BC2C2C] border-l-4 border-[#BC2C2C] pl-2.5 font-bold shadow-xs' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-semibold'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-[#BC2C2C]' : 'text-gray-400'}`} />
                  <span className="text-xs">{config.label}</span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  isSelected ? 'bg-[#BC2C2C] text-white font-extrabold shadow-sm' : 'bg-gray-100 text-gray-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Table Panel */}
      <div className="flex-1 bg-white rounded-3xl border border-gray-100 flex flex-col overflow-hidden shadow-sm relative">
        
        {/* CSV Import/Export alerts */}
        {importStatus && (
          <div className={`p-4 mx-6 mt-4 rounded-xl flex items-center justify-between border ${
            importStatus.error 
              ? 'bg-rose-50 border-rose-100 text-rose-800' 
              : 'bg-emerald-50 border-emerald-100 text-emerald-800'
          } text-xs font-semibold`}>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>{importStatus.error || importStatus.success}</span>
            </div>
            <button onClick={() => setImportStatus(null)} className="p-1 hover:opacity-75"><X className="w-3.5 h-3.5" /></button>
          </div>
        )}

        {/* Table Header */}
        <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div>
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              {masterConfig.label}
              <span className="text-xs text-gray-400 font-bold">({filteredData.length} records)</span>
            </h2>
            <p className="text-xs text-gray-500 font-semibold mt-0.5">{masterConfig.description}</p>
          </div>

          <div className="flex flex-wrap w-full md:w-auto items-center gap-2">
            {/* Search Input */}
            <div className="relative flex-1 md:w-56">
              <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={`Search records...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border-none rounded-xl text-xs font-semibold placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#BC2C2C]/30 text-gray-900 shadow-xs"
              />
            </div>

            {/* Column Selector Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowColSelector(!showColSelector)}
                className="p-2.5 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl transition-colors border border-gray-100 flex items-center gap-1.5 text-xs font-semibold shadow-xs"
                title="Select Metadata Columns"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Columns</span>
              </button>

              {showColSelector && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowColSelector(false)}></div>
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-2xl p-4 shadow-xl z-20 space-y-2.5">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block border-b pb-1 mb-2">Audit Metadata Fields</span>
                    {Object.keys(visibleMetadataCols).map(col => (
                      <label key={col} className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-gray-700 hover:text-gray-900">
                        <input
                          type="checkbox"
                          checked={visibleMetadataCols[col as keyof typeof visibleMetadataCols]}
                          onChange={(e) => setVisibleMetadataCols(prev => ({ ...prev, [col]: e.target.checked }))}
                          className="rounded border-gray-300 text-[#BC2C2C] focus:ring-[#BC2C2C]"
                        />
                        <span className="capitalize">{col === 'id' ? 'ID Key' : col.replace(/([A-Z])/g, ' $1')}</span>
                      </label>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* CSV Actions */}
            <button
              onClick={handleExportCSV}
              className="p-2.5 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl transition-colors border border-gray-100 flex items-center gap-1.5 text-xs font-semibold shadow-xs"
              title="Export CSV"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>Export</span>
            </button>
            
            <button
              onClick={handleTriggerCSVInput}
              className="p-2.5 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl transition-colors border border-gray-100 flex items-center gap-1.5 text-xs font-semibold shadow-xs"
              title="Import CSV"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-[#BC2C2C]" />
              <span>Import</span>
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImportCSV} 
              accept=".csv" 
              className="hidden" 
            />

            {/* Add Record Button */}
            <button
              onClick={handleOpenAdd}
              className="flex items-center gap-1.5 bg-[#BC2C2C] hover:bg-[#A32424] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all duration-200"
            >
              <Plus className="w-4 h-4" />
              Add Record
            </button>
          </div>
        </div>

        {/* Bulk Actions Panel (Floats at bottom if checked items exist) */}
        {checkedIds.length > 0 && (
          <div className="bg-[#BC2C2C]/5 border-y border-[#BC2C2C]/15 px-6 py-3.5 flex items-center justify-between text-xs font-bold text-gray-900 transition-all duration-300 relative z-10 animate-in slide-in-from-top-4">
            <div className="flex items-center gap-3">
              <span className="bg-[#BC2C2C] text-white px-2 py-0.5 rounded-full text-[10px] font-black">{checkedIds.length} Selected</span>
              <span className="text-gray-500 font-semibold">Bulk Operations:</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleBulkStatusChange('Active')}
                className="px-3 py-1.5 bg-white text-emerald-600 hover:bg-emerald-50 rounded-lg border border-emerald-100 shadow-xs transition-colors"
              >
                Set Active
              </button>
              <button
                type="button"
                onClick={() => handleBulkStatusChange('Inactive')}
                className="px-3 py-1.5 bg-white text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-150 shadow-xs transition-colors"
              >
                Set Inactive
              </button>
              <button
                type="button"
                onClick={handleBulkDelete}
                className="px-3 py-1.5 bg-red-600 text-white hover:bg-red-700 rounded-lg shadow-xs transition-colors flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete Selected
              </button>
              <button
                type="button"
                onClick={() => setCheckedIds([])}
                className="text-gray-400 hover:text-gray-600 px-2.5"
              >
                Clear
              </button>
            </div>
          </div>
        )}

        {/* Table Body */}
        <div className="flex-1 overflow-auto">
          {filteredData.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8">
              <AlertCircle className="w-10 h-10 text-gray-300 mb-3 animate-pulse" />
              <p className="text-sm font-semibold">No records found matching your query.</p>
              <p className="text-xs text-gray-400 mt-1">Try resetting the search filter or click "Add Record" to seed an entry.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50 sticky top-0 z-10">
                  {/* Select All Checkbox */}
                  <th className="p-4 w-12 text-center">
                    <input
                      type="checkbox"
                      checked={checkedIds.length === filteredData.length && filteredData.length > 0}
                      onChange={handleCheckAll}
                      className="rounded border-gray-300 text-[#BC2C2C] focus:ring-[#BC2C2C] cursor-pointer"
                    />
                  </th>
                  
                  {/* Metadata ID Column if visible */}
                  {visibleMetadataCols.id && (
                    <th className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider w-24">ID Key</th>
                  )}

                  {/* Schema fields */}
                  {masterConfig.fields.map(f => (
                    <th key={f.name} className="p-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">{f.label}</th>
                  ))}

                  {/* Metadata audit fields */}
                  {visibleMetadataCols.createdAt && (
                    <th className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Created At</th>
                  )}
                  {visibleMetadataCols.updatedAt && (
                    <th className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Modified At</th>
                  )}
                  {visibleMetadataCols.createdBy && (
                    <th className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Created By</th>
                  )}
                  {visibleMetadataCols.modifiedBy && (
                    <th className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Modified By</th>
                  )}

                  <th className="p-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider w-24">Status</th>
                  <th className="p-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider w-32 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredData.map((record) => {
                  const isChecked = checkedIds.includes(record.id);
                  return (
                    <tr 
                      key={record.id} 
                      className={`hover:bg-gray-50/40 transition-colors group ${
                        isChecked ? 'bg-[#BC2C2C]/5' : ''
                      }`}
                    >
                      {/* Checkbox column */}
                      <td className="p-4 text-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => handleRowCheck(record.id, e.target.checked)}
                          className="rounded border-gray-300 text-[#BC2C2C] focus:ring-[#BC2C2C] cursor-pointer"
                        />
                      </td>

                      {/* Metadata ID key */}
                      {visibleMetadataCols.id && (
                        <td className="p-4 text-xs font-mono font-bold text-gray-400">{record.id}</td>
                      )}

                      {/* Schema Fields */}
                      {masterConfig.fields.map(f => {
                        const value = record[f.name];
                        return (
                          <td key={f.name} className="p-4 text-xs font-semibold text-gray-900 max-w-xs truncate">
                            {f.type === 'checkbox' ? (
                              <span className={`inline-flex items-center px-1.5 py-0.5 rounded font-black text-[9px] ${
                                value ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-100 text-gray-400'
                              }`}>
                                {value ? 'YES' : 'NO'}
                              </span>
                            ) : f.type === 'textarea' ? (
                              <span className="text-gray-500 line-clamp-1">{value || '—'}</span>
                            ) : f.name === 'image' && value ? (
                              <div className="flex items-center gap-2">
                                <img src={value} alt="Preview" className="w-7 h-7 rounded-lg object-cover border border-gray-150 shadow-xs" />
                                <span className="text-[10px] text-gray-400 truncate max-w-[120px]">{value}</span>
                              </div>
                            ) : f.name.toLowerCase().includes('price') || f.name === 'taxes' || f.name === 'roomRate' || f.name === 'confRate' ? (
                              formatRupee(Number(value || 0))
                            ) : (
                              String(value ?? '—')
                            )}
                          </td>
                        );
                      })}

                      {/* Optional metadata values */}
                      {visibleMetadataCols.createdAt && (
                        <td className="p-4 text-[10px] font-bold text-gray-400">{record.createdAt ? new Date(record.createdAt).toLocaleString() : 'System Seed'}</td>
                      )}
                      {visibleMetadataCols.updatedAt && (
                        <td className="p-4 text-[10px] font-bold text-gray-400">{record.updatedAt ? new Date(record.updatedAt).toLocaleString() : 'System Seed'}</td>
                      )}
                      {visibleMetadataCols.createdBy && (
                        <td className="p-4 text-xs font-bold text-gray-500">{record.createdBy || 'System'}</td>
                      )}
                      {visibleMetadataCols.modifiedBy && (
                        <td className="p-4 text-xs font-bold text-gray-500">{record.modifiedBy || 'System'}</td>
                      )}

                      {/* Status indicator */}
                      <td className="p-4">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(record)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black border transition-all duration-300 ${
                            record.status === 'Active'
                              ? 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100'
                              : record.status === 'Archived'
                                ? 'bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-100'
                                : 'bg-gray-50 text-gray-400 border-gray-100 hover:bg-gray-100'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            record.status === 'Active' 
                              ? 'bg-emerald-500' 
                              : record.status === 'Archived' 
                                ? 'bg-amber-500' 
                                : 'bg-gray-300'
                          }`}></span>
                          {record.status}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={() => handleClone(record)}
                            className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                            title="Clone Entry"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(record)}
                            className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(record.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* CRUD Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/45 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-xl overflow-hidden animate-in scale-in duration-300 border border-gray-100 flex flex-col max-h-[90vh]">
            <div className="px-6 py-5 border-b border-gray-50 flex justify-between items-center bg-gray-50/50 shrink-0">
              <div>
                <h3 className="text-sm font-bold text-gray-900">{editingRecord ? 'Modify Record' : 'Create New Entry'}</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{masterConfig.label} Registry</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-950 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto flex-1 scrollbar-thin">
              {masterConfig.fields.map(f => {
                return (
                  <div key={f.name}>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1.5">{f.label}</label>
                    {f.type === 'textarea' ? (
                      <textarea
                        value={formData[f.name] || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, [f.name]: e.target.value }))}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#BC2C2C]/30 h-24 resize-none shadow-xs"
                        required={f.name === 'name' || f.name === 'firstName' || f.name === 'airline'}
                      />
                    ) : f.type === 'select' ? (
                      <select
                        value={formData[f.name] || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, [f.name]: e.target.value }))}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#BC2C2C]/30 shadow-xs"
                      >
                        {f.options?.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : f.type === 'checkbox' ? (
                      <label className="flex items-center gap-3 cursor-pointer py-1 bg-gray-50 border border-gray-100 px-4 rounded-xl shadow-xs">
                        <input
                          type="checkbox"
                          checked={!!formData[f.name]}
                          onChange={(e) => setFormData(prev => ({ ...prev, [f.name]: e.target.checked }))}
                          className="rounded border-gray-300 text-[#BC2C2C] focus:ring-[#BC2C2C]"
                        />
                        <span className="text-xs font-bold text-gray-700">Check to activate {f.label}</span>
                      </label>
                    ) : (
                      <input
                        type={f.type === 'number' ? 'number' : 'text'}
                        value={formData[f.name] ?? ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, [f.name]: f.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value }))}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#BC2C2C]/30 shadow-xs"
                        required={f.name === 'name' || f.name === 'firstName' || f.name === 'airline'}
                      />
                    )}
                  </div>
                );
              })}

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1.5">Registry Status</label>
                <select
                  value={formData.status || 'Active'}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'Active' | 'Inactive' | 'Archived' }))}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#BC2C2C]/30 shadow-xs"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>

              <div className="pt-4 border-t border-gray-50 flex justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-100 text-gray-600 hover:bg-gray-50 text-xs font-bold transition-all duration-200 shadow-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#BC2C2C] hover:bg-[#A32424] text-white text-xs font-bold shadow-xs transition-all duration-200"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
