import React, { useState, useMemo } from 'react';
import { OperationsMetrics } from '../components/tourism/OperationsMetrics';
import { RevenueTrendsChart, RecentBookingsTable } from '../components/tourism/OperationsCharts';
import { UpcomingDeparturesSidebar } from '../components/tourism/UpcomingDeparturesSidebar';
import { X, LayoutGrid, TrendingUp, Package, Bus, Users, BarChart2, DollarSign, Download, Search, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { formatRupee } from '../lib/utils';
import { useCurrency } from '../context/CurrencyContext';

type Dept = 'Operations' | 'Sales' | 'Vendors' | 'Fleet' | 'CRM' | 'Analytics' | 'Finance';

interface Booking {
  initials: string; name: string; pkg: string; date: string;
  status: string; statusColor: string; avatarColor: string;
}

const DEPT_DATA: Record<Dept, { kpis: { label: string; value: string; trend: string; positive: boolean }[]; rows: string[][] }> = {
  Operations: {
    kpis: [
      { label: 'Active Tours', value: '28', trend: '+4 this week', positive: true },
      { label: 'Departures Today', value: '7', trend: '2 delayed', positive: false },
      { label: 'Guides on Duty', value: '34', trend: '100% coverage', positive: true },
      { label: 'Incidents Open', value: '3', trend: '-2 vs yesterday', positive: true },
    ],
    rows: [
      ['Rajasthan Heritage Circuit', 'Day 4/12', '18 Pax', 'On Track', 'Jaipur'],
      ['Kerala Backwaters', 'Day 2/7', '20 Pax', 'On Track', 'Alleppey'],
      ['Kashmir Himalayan Trek', 'Day 3/8', '8 Pax', 'Slight Delay', 'Sonamarg'],
      ['Dubai Luxury Immersion', 'Day 1/5', '12 Pax', 'On Track', 'Dubai'],
    ],
  },
  Sales: {
    kpis: [
      { label: 'Bookings MTD', value: '142', trend: '+18% vs last month', positive: true },
      { label: 'Revenue MTD', value: formatRupee(4200000, 0, true), trend: '+12.4%', positive: true },
      { label: 'Conversion Rate', value: '24.8%', trend: '+3.2%', positive: true },
      { label: 'Avg Booking Value', value: formatRupee(29577, 0), trend: '+6%', positive: true },
    ],
    rows: [
      ['Bali Serenity Package', 'Active', '38 Bookings', formatRupee(3800000, 0, true), 'Peak'],
      ['Japan Sakura Tour', 'Active', '22 Bookings', formatRupee(2640000, 0, true), 'Shoulder'],
      ['Europe Highlights 12D', 'Active', '41 Bookings', formatRupee(4920000, 0, true), 'Peak'],
      ['Singapore City Break', 'Draft', '0 Bookings', '—', 'Off-Peak'],
    ],
  },
  Vendors: {
    kpis: [
      { label: 'Active Vendors', value: '84', trend: '6 pending renewal', positive: false },
      { label: 'Avg Rating', value: '4.7 / 5', trend: '+0.2 vs Q2', positive: true },
      { label: 'Contracts Expiring', value: '12', trend: 'Within 30 days', positive: false },
      { label: 'Spend MTD', value: formatRupee(1800000, 0, true), trend: 'Within budget', positive: true },
    ],
    rows: [
      ['Grand Hyatt Goa', 'Hotel', '★ 4.9', 'Active', formatRupee(480000, 0, true)],
      ['Riyaz Transport Co.', 'Fleet', '★ 4.7', 'Active', formatRupee(220000, 0, true)],
      ['Kerala Spice Caterers', 'F&B', '★ 4.6', 'Active', formatRupee(95000, 0, true)],
      ['Emirates Airlines', 'Aviation', '★ 4.8', 'Renewal Due', formatRupee(620000, 0, true)],
    ],
  },
  Fleet: {
    kpis: [
      { label: 'Total Vehicles', value: '62', trend: '4 in maintenance', positive: false },
      { label: 'Utilization Rate', value: '78%', trend: '+6% vs last week', positive: true },
      { label: 'Fuel Efficiency', value: '14.2 km/L', trend: '+1.1 km/L', positive: true },
      { label: 'Next Service Due', value: '8 Vehicles', trend: 'Within 7 days', positive: false },
    ],
    rows: [
      ['MH12-AB-4521', 'Mercedes Sprinter', 'Rajasthan Run', 'Active', '94%'],
      ['DL01-XY-9910', 'Toyota Coaster', 'Delhi–Agra', 'Active', '81%'],
      ['KA05-BZ-3322', 'Tempo Traveller', 'Kerala Backwaters', 'Maintenance', '—'],
      ['GJ02-CF-7741', 'Volvo Bus', 'Goa Circuit', 'Active', '67%'],
    ],
  },
  CRM: {
    kpis: [
      { label: 'Active Guests', value: '1,284', trend: '+47 this month', positive: true },
      { label: 'NPS Score', value: '78', trend: '+4 vs Q2', positive: true },
      { label: 'Repeat Bookings', value: '38%', trend: '+5% vs last year', positive: true },
      { label: 'Pending Complaints', value: '6', trend: '-3 resolved today', positive: true },
    ],
    rows: [
      ['Meera Kapoor', 'Gold Member', '8 Trips', 'Active', formatRupee(420000, 0, true)],
      ['Robert Hughes', 'Platinum', '14 Trips', 'Active', formatRupee(980000, 0, true)],
      ['Aisha Al-Mansoori', 'Gold Member', '5 Trips', 'Active', formatRupee(310000, 0, true)],
      ['Chen Wei', 'Silver', '3 Trips', 'Inactive', formatRupee(120000, 0, true)],
    ],
  },
  Analytics: {
    kpis: [
      { label: 'Revenue YTD', value: formatRupee(24600000, 0, true), trend: '+19.4% YoY', positive: true },
      { label: 'Avg Occupancy', value: '83.6%', trend: '+5.8%', positive: true },
      { label: 'Top Destination', value: 'Rajasthan', trend: '29% of bookings', positive: true },
      { label: 'Reports Generated', value: '142', trend: '12 this week', positive: true },
    ],
    rows: [
      ['Q2 Revenue Report', 'Finance', '2026-07-01', 'Published', 'PDF'],
      ['Occupancy Dashboard', 'Operations', '2026-06-28', 'Published', 'Live'],
      ['Guest Satisfaction Q2', 'CRM', '2026-06-25', 'Draft', 'PDF'],
      ['Fleet Efficiency Report', 'Fleet', '2026-06-20', 'Published', 'PDF'],
    ],
  },
  Finance: {
    kpis: [
      { label: 'Revenue MTD', value: formatRupee(4200000, 0, true), trend: '+12.4%', positive: true },
      { label: 'Expenses MTD', value: formatRupee(2100000, 0, true), trend: '-3% vs target', positive: true },
      { label: 'Net Margin', value: '50.1%', trend: '+4.2%', positive: true },
      { label: 'Pending Invoices', value: '18', trend: formatRupee(380000, 0, true) + ' total', positive: false },
    ],
    rows: [
      ['INV-10081', 'Grand Hyatt Goa', formatRupee(240000, 0), '2026-07-15', 'Pending'],
      ['INV-10079', 'Emirates Airlines', formatRupee(620000, 0), '2026-07-10', 'Paid'],
      ['INV-10076', 'Riyaz Transport', formatRupee(110000, 0), '2026-07-08', 'Overdue'],
      ['INV-10074', 'Kerala Spice Caterers', formatRupee(48000, 0), '2026-07-05', 'Paid'],
    ],
  },
};

const DEPT_HEADERS: Record<Dept, string[]> = {
  Operations: ['Tour Name', 'Progress', 'Group', 'Status', 'Location'],
  Sales: ['Package', 'Status', 'Bookings', 'Revenue', 'Season'],
  Vendors: ['Vendor', 'Category', 'Rating', 'Status', 'Spend MTD'],
  Fleet: ['Vehicle ID', 'Type', 'Assignment', 'Status', 'Utilization'],
  CRM: ['Guest Name', 'Tier', 'Total Trips', 'Status', 'Lifetime Value'],
  Analytics: ['Report Name', 'Department', 'Date', 'Status', 'Format'],
  Finance: ['Invoice', 'Vendor', 'Amount', 'Due Date', 'Status'],
};

const DEPT_ICONS: Record<Dept, React.ReactNode> = {
  Operations: <LayoutGrid className="w-4 h-4" />,
  Sales: <TrendingUp className="w-4 h-4" />,
  Vendors: <Package className="w-4 h-4" />,
  Fleet: <Bus className="w-4 h-4" />,
  CRM: <Users className="w-4 h-4" />,
  Analytics: <BarChart2 className="w-4 h-4" />,
  Finance: <DollarSign className="w-4 h-4" />,
};

const DEPARTMENTS: Dept[] = ['Operations', 'Sales', 'Vendors', 'Fleet', 'CRM', 'Analytics', 'Finance'];

const STATUS_COLORS: Record<string, string> = {
  'Active': 'bg-emerald-50 text-emerald-600', 'On Track': 'bg-emerald-50 text-emerald-600',
  'Published': 'bg-blue-50 text-blue-600', 'Paid': 'bg-emerald-50 text-emerald-600',
  'Pending': 'bg-amber-50 text-amber-600', 'Slight Delay': 'bg-orange-50 text-orange-600',
  'Maintenance': 'bg-gray-100 text-gray-500', 'Draft': 'bg-gray-100 text-gray-500',
  'Inactive': 'bg-gray-100 text-gray-400', 'Renewal Due': 'bg-red-50 text-red-500',
  'Overdue': 'bg-red-50 text-red-600', 'Peak': 'bg-purple-50 text-purple-600',
  'Shoulder': 'bg-amber-50 text-amber-600', 'Off-Peak': 'bg-blue-50 text-blue-600',
};

const MOCK_LARGE_BOOKINGS_POOL: Booking[] = [
  { initials: 'JD', name: 'Jonathan Doe', pkg: 'Alpine Ski Discovery', date: 'Oct 12, 2024', status: 'Confirmed', statusColor: 'text-emerald-500 bg-emerald-50', avatarColor: 'bg-red-50 text-red-600' },
  { initials: 'SM', name: 'Sarah Miller', pkg: 'Riviera Wine Tour', date: 'Oct 14, 2024', status: 'Pending', statusColor: 'text-orange-500 bg-orange-50', avatarColor: 'bg-amber-50 text-amber-600' },
  { initials: 'RK', name: 'Robert King', pkg: 'Kyoto Sakura Trail', date: 'Oct 18, 2024', status: 'Waitlist', statusColor: 'text-gray-500 bg-gray-100', avatarColor: 'bg-purple-50 text-purple-600' },
  { initials: 'EL', name: 'Emma Larsen', pkg: 'Amazon Basin Expedition', date: 'Nov 02, 2024', status: 'Confirmed', statusColor: 'text-emerald-500 bg-emerald-50', avatarColor: 'bg-blue-50 text-blue-600' },
  { initials: 'AB', name: 'Albert Brown', pkg: 'Rajasthan Heritage Circuit', date: 'Nov 10, 2024', status: 'Confirmed', statusColor: 'text-emerald-500 bg-emerald-50', avatarColor: 'bg-teal-50 text-teal-600' },
  { initials: 'CH', name: 'Christina Hill', pkg: 'Kerala Backwaters', date: 'Nov 12, 2024', status: 'Pending', statusColor: 'text-orange-500 bg-orange-50', avatarColor: 'bg-rose-50 text-rose-600' },
  { initials: 'MK', name: 'Meera Kapoor', pkg: 'Bali Serenity Package', date: 'Nov 15, 2024', status: 'Confirmed', statusColor: 'text-emerald-500 bg-emerald-50', avatarColor: 'bg-amber-50 text-amber-600' },
  { initials: 'JW', name: 'James Wilson', pkg: 'Japan Sakura Tour', date: 'Nov 20, 2024', status: 'Waitlist', statusColor: 'text-gray-500 bg-gray-100', avatarColor: 'bg-indigo-50 text-indigo-600' },
  { initials: 'TL', name: 'Tariq Latif', pkg: 'Dubai Luxury Immersion', date: 'Dec 01, 2024', status: 'Confirmed', statusColor: 'text-emerald-500 bg-emerald-50', avatarColor: 'bg-green-50 text-green-600' },
  { initials: 'HL', name: 'Helen Lucas', pkg: 'Europe Highlights 12D', date: 'Dec 05, 2024', status: 'Confirmed', statusColor: 'text-emerald-500 bg-emerald-50', avatarColor: 'bg-purple-50 text-purple-600' }
];

export function TourOperationsPage() {
  const { activeHeaderTab } = useCurrency();
  const [bookings, setBookings] = useState<Booking[]>(MOCK_LARGE_BOOKINGS_POOL);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeptOpen, setIsDeptOpen] = useState(false);
  const [activeDept, setActiveDept] = useState<Dept>('Operations');
  const [form, setForm] = useState({ name: '', pkg: 'Alpine Ski Discovery', date: '', status: 'Confirmed' });

  // View All Bookings state
  const [showAllBookings, setShowAllBookings] = useState(false);
  const [bookingSearch, setBookingSearch] = useState('');
  const [bookingStatusFilter, setBookingStatusFilter] = useState('All');
  const [bookingPage, setBookingPage] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.date) { alert('Please fill in the guest name and departure date.'); return; }
    const initials = form.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    const colors = ['bg-red-50 text-red-600', 'bg-amber-50 text-amber-600', 'bg-purple-50 text-purple-600', 'bg-blue-50 text-blue-600'];
    const statusColors: Record<string, string> = { Confirmed: 'text-emerald-500 bg-emerald-50', Pending: 'text-orange-500 bg-orange-50', Waitlist: 'text-gray-500 bg-gray-100' };
    setBookings(prev => [{ initials: initials || 'GB', name: form.name, pkg: form.pkg, date: new Date(form.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), status: form.status, statusColor: statusColors[form.status] || 'text-gray-500 bg-gray-100', avatarColor: colors[Math.floor(Math.random() * colors.length)] }, ...prev]);
    setIsModalOpen(false);
    setForm({ name: '', pkg: 'Alpine Ski Discovery', date: '', status: 'Confirmed' });
  };

  const handleDownloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,Initials,Name,Package,Departure Date,Status\n" +
      bookings.map(b => `"${b.initials}","${b.name}","${b.pkg}","${b.date}","${b.status}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Global_Bookings_Ledger.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredBookingsList = useMemo(() => {
    return bookings.filter(b => {
      const matchSearch = b.name.toLowerCase().includes(bookingSearch.toLowerCase()) || b.pkg.toLowerCase().includes(bookingSearch.toLowerCase());
      const matchStatus = bookingStatusFilter === 'All' || b.status === bookingStatusFilter;
      return matchSearch && matchStatus;
    });
  }, [bookings, bookingSearch, bookingStatusFilter]);

  const bookingPageSize = 5;
  const totalBookingPages = Math.max(1, Math.ceil(filteredBookingsList.length / bookingPageSize));
  const currentBookingPage = Math.min(bookingPage, totalBookingPages);
  const paginatedBookings = filteredBookingsList.slice((currentBookingPage - 1) * bookingPageSize, currentBookingPage * bookingPageSize);

  const deptData = DEPT_DATA[activeDept];
  const headers = DEPT_HEADERS[activeDept];

  return (
    <div className="animate-in fade-in duration-500 pb-12 relative">
      <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-4">
        <span>Tourism</span><span>›</span><span className="text-[#BC2C2C]">Operations Dashboard</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Tour Operations Overview</h1>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsDeptOpen(p => !p)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm ${isDeptOpen ? 'bg-[#BC2C2C] text-white' : 'bg-[#1F2937] text-white hover:bg-[#111827]'}`}
          >
            <LayoutGrid className="w-4 h-4" />
            Manage All Departments
          </button>
          <button 
            onClick={handleDownloadCSV}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Download className="w-4 h-4 text-[#BC2C2C]" /> Export Bookings
          </button>
          <button onClick={() => setIsModalOpen(true)} className="px-4 py-2.5 text-sm font-bold text-white bg-[#BC2C2C] hover:bg-[#8B2020] rounded-xl transition-colors shadow-sm">
            + New Booking
          </button>
        </div>
      </div>

      {/* Department Management Panel */}
      {isDeptOpen && (
        <div className="mb-8 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Dept Tabs */}
          <div className="flex overflow-x-auto border-b border-gray-100 bg-gray-50/50">
            {DEPARTMENTS.map(d => (
              <button
                key={d}
                onClick={() => setActiveDept(d)}
                className={`flex items-center gap-2 px-5 py-3.5 text-xs font-bold whitespace-nowrap transition-all border-b-2 -mb-px ${activeDept === d ? 'border-[#BC2C2C] text-[#BC2C2C] bg-white' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
              >
                {DEPT_ICONS[d]} {d}
              </button>
            ))}
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border-b border-gray-50">
            {deptData.kpis.map((kpi, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-4">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{kpi.label}</p>
                <p className="text-xl font-extrabold text-gray-900">{kpi.value}</p>
                <p className={`text-[10px] font-semibold mt-1 ${kpi.positive ? 'text-emerald-500' : 'text-red-500'}`}>{kpi.trend}</p>
              </div>
            ))}
          </div>

          {/* Summary Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-50 bg-gray-50/50">
                  {headers.map(h => (
                    <th key={h} className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {deptData.rows.map((row, i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/30 transition-colors">
                    {row.map((cell, j) => {
                      const isStatus = STATUS_COLORS[cell];
                      return (
                        <td key={j} className="px-6 py-4 text-sm">
                          {isStatus ? (
                            <span className={`px-2 py-1 text-[10px] font-bold rounded-lg ${isStatus}`}>{cell}</span>
                          ) : (
                            <span className={j === 0 ? 'font-semibold text-gray-900' : 'text-gray-600'}>{cell}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeHeaderTab === 'overview' ? (
        <>
          <OperationsMetrics />

          <div className="flex flex-col xl:flex-row gap-6">
            <div className="flex-1 min-w-0 flex flex-col">
              <RevenueTrendsChart />
              <RecentBookingsTable bookings={bookings} onViewAll={() => setShowAllBookings(true)} />
            </div>
            <div className="w-full xl:w-[320px] shrink-0">
              <UpcomingDeparturesSidebar />
            </div>
          </div>
        </>
      ) : (
        /* Reports view layout */
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col gap-6 animate-in fade-in duration-300">
          <div className="flex justify-between items-center pb-4 border-b border-gray-100 flex-wrap gap-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Department Operational Audit Ledgers</h2>
              <p className="text-xs text-gray-500 mt-0.5 font-medium">Daily summary of KPI sheets, bookings, fleet runs and invoices compiled across departments</p>
            </div>
            <button 
              onClick={handleDownloadCSV}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-[#BC2C2C] hover:bg-[#8B2020] text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" /> Download Department Audit
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bookings log */}
            <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 flex flex-col">
              <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center justify-between">
                <span>Direct Bookings Ledger</span>
                <span className="text-[10px] text-gray-400">{bookings.length} Bookings</span>
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-semibold text-gray-700">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-2">Guest</th>
                      <th className="py-2">Package</th>
                      <th className="py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.slice(0, 5).map((b, idx) => (
                      <tr key={idx} className="border-b border-gray-100 last:border-0">
                        <td className="py-2.5 font-bold text-gray-900">{b.name}</td>
                        <td className="py-2.5 text-gray-500">{b.pkg}</td>
                        <td className="py-2.5">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${b.statusColor}`}>{b.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Invoices log */}
            <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 flex flex-col">
              <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center justify-between">
                <span>Vendor Invoices Ledger</span>
                <span className="text-[10px] text-gray-400">Q3 accounts</span>
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-semibold text-gray-700">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-2">Invoice</th>
                      <th className="py-2">Vendor</th>
                      <th className="py-2">Amount</th>
                      <th className="py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DEPT_DATA.Finance.rows.map((row, idx) => (
                      <tr key={idx} className="border-b border-gray-100 last:border-0">
                        <td className="py-2.5 font-mono text-red-600 font-bold">{row[0]}</td>
                        <td className="py-2.5 text-gray-900 font-bold">{row[1]}</td>
                        <td className="py-2.5 text-gray-500">{row[2]}</td>
                        <td className="py-2.5">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${STATUS_COLORS[row[4]]}`}>{row[4]}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-xl border border-gray-100 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-900">Create New Booking</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-700 p-1"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1.5">Traveler Name</label>
                <input type="text" placeholder="e.g., Jonathan Doe" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#BC2C2C]/30" required />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1.5">Tourism Package</label>
                <select value={form.pkg} onChange={e => setForm({ ...form, pkg: e.target.value })} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#BC2C2C]/30 cursor-pointer">
                  <option>Alpine Ski Discovery</option><option>Riviera Wine Tour</option><option>Kyoto Sakura Trail</option><option>Amazon Basin Expedition</option><option>Rajasthan Heritage Circuit</option><option>Kerala Backwaters</option><option>Bali Serenity</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1.5">Departure Date</label>
                <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#BC2C2C]/30" required />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1.5">Status</label>
                <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#BC2C2C]/30 cursor-pointer">
                  <option>Confirmed</option><option>Pending</option><option>Waitlist</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-xs font-bold text-gray-700 rounded-xl transition-colors">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-[#BC2C2C] hover:bg-[#8B2020] text-white text-xs font-bold rounded-xl transition-colors shadow-sm">Create Booking</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View All Bookings Ledger Modal */}
      {showAllBookings && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowAllBookings(false)}>
          <div 
            className="bg-white rounded-3xl w-full max-w-4xl max-h-[85vh] p-6 shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-4 border-b border-gray-100 shrink-0">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Tourism Bookings Directory</h2>
                <p className="text-xs text-gray-500 font-medium mt-0.5">Audit log of all registered travelers, dates, and status codes</p>
              </div>
              <button onClick={() => setShowAllBookings(false)} className="p-2 hover:bg-gray-50 rounded-xl text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Filters */}
            <div className="flex flex-wrap items-center gap-3 py-4 border-b border-gray-50 shrink-0 bg-gray-50/50 px-4 mt-2 rounded-2xl">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search traveler name or package..."
                  value={bookingSearch}
                  onChange={e => { setBookingSearch(e.target.value); setBookingPage(1); }}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-900 focus:outline-none"
                />
              </div>

              <select
                value={bookingStatusFilter}
                onChange={e => { setBookingStatusFilter(e.target.value); setBookingPage(1); }}
                className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Pending">Pending</option>
                <option value="Waitlist">Waitlist</option>
              </select>

              <button 
                onClick={handleDownloadCSV}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#BC2C2C] hover:bg-[#8B2020] text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
              >
                <Download className="w-3.5 h-3.5" /> Export Bookings CSV
              </button>
            </div>

            {/* Modal Table */}
            <div className="flex-1 overflow-y-auto mt-4">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest sticky top-0 bg-white">
                    <th className="px-4 py-2">Traveler Name</th>
                    <th className="px-4 py-2">Package Route</th>
                    <th className="px-4 py-2">Departure Date</th>
                    <th className="px-4 py-2">Booking Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {paginatedBookings.length === 0 ? (
                    <tr><td colSpan={4} className="px-4 py-8 text-center text-xs text-gray-400">No bookings match search filters.</td></tr>
                  ) : paginatedBookings.map((b, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/30 transition-colors text-xs text-gray-700 font-semibold">
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-bold ${b.avatarColor}`}>
                            {b.initials}
                          </div>
                          <span className="text-gray-900 font-bold">{b.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-gray-500">{b.pkg}</td>
                      <td className="px-4 py-3.5 font-mono text-gray-400">{b.date}</td>
                      <td className="px-4 py-3.5">
                        <span className={`px-2 py-0.5 rounded-lg text-[9px] font-bold ${b.statusColor}`}>{b.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Modal Pagination */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-100 shrink-0">
              <span className="text-[11px] text-gray-400 font-bold">
                Showing {filteredBookingsList.length === 0 ? 0 : (currentBookingPage - 1) * bookingPageSize + 1}–{Math.min(currentBookingPage * bookingPageSize, filteredBookingsList.length)} of {filteredBookingsList.length} travelers
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setBookingPage(p => Math.max(1, p - 1))}
                  disabled={currentBookingPage === 1}
                  className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-3.5 h-3.5 text-gray-500" />
                </button>
                {Array.from({ length: totalBookingPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => setBookingPage(p)}
                    className={`w-6 h-6 text-[10px] font-bold rounded-lg ${p === currentBookingPage ? 'bg-[#BC2C2C] text-white shadow-sm' : 'text-gray-500 hover:bg-gray-100'}`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setBookingPage(p => Math.min(totalBookingPages, p + 1))}
                  disabled={currentBookingPage === totalBookingPages}
                  className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
