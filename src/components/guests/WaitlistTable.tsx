import React, { useState } from 'react';
import { Filter, Search, ArrowUpDown, ChevronLeft, ChevronRight, UserCheck } from 'lucide-react';

interface WaitlistTableProps {
  travelers?: any[];
  onPromote?: (waitlistId: string) => void;
  loading?: boolean;
  onUpdateTraveler?: (id: string, fields: any) => void;
  departuresList?: any[];
}

export function WaitlistTable({ 
  travelers = [], 
  onPromote, 
  loading = false, 
  onUpdateTraveler, 
  departuresList = [] 
}: WaitlistTableProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortField, setSortField] = useState<'priority' | 'bookingDate' | 'requestedSeats'>('priority');
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
  };

  const getTierColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'CLEAR':
      case 'BOOKED':
        return 'bg-emerald-100 text-emerald-700';
      case 'PENDING':
        return 'bg-amber-100 text-amber-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Filter & Sort
  const filteredTravelers = travelers.filter(t => {
    const fullName = `${t.traveler?.firstName || ''} ${t.traveler?.lastName || ''}`.toLowerCase();
    const email = (t.traveler?.email || '').toLowerCase();
    const searchMatch = fullName.includes(search.toLowerCase()) || email.includes(search.toLowerCase());
    const statusMatch = statusFilter === 'All' || t.status === statusFilter;
    return searchMatch && statusMatch;
  });

  const sortedTravelers = [...filteredTravelers].sort((a, b) => {
    if (sortField === 'priority') {
      return a.priority - b.priority;
    } else if (sortField === 'bookingDate') {
      return new Date(a.bookingDate).getTime() - new Date(b.bookingDate).getTime();
    } else if (sortField === 'requestedSeats') {
      return b.requestedSeats - a.requestedSeats;
    }
    return 0;
  });

  const totalPages = Math.max(1, Math.ceil(sortedTravelers.length / PAGE_SIZE));
  const paginatedTravelers = sortedTravelers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col mb-6">
      
      {/* Header and Filter Controls */}
      <div className="p-6 border-b border-gray-100 flex flex-col gap-4">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h2 className="text-lg font-bold text-gray-900">Waitlisted Travelers Directory</h2>
          <span className="text-xs text-gray-400 font-medium">Auto-refresh Active</span>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search bar */}
          <div className="flex-1 min-w-[200px] flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 focus-within:ring-2 focus-within:ring-[#BC2C2C]/20 transition-all">
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search traveler name or email..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="text-xs font-semibold text-gray-700 bg-transparent border-none outline-none w-full"
            />
          </div>

          {/* Status filter dropdown */}
          <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-xl px-3 py-1.5 shadow-sm">
            <Filter className="w-3.5 h-3.5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="text-xs font-bold text-gray-700 bg-transparent border-none outline-none cursor-pointer focus:ring-0"
            >
              <option value="All">All Statuses</option>
              <option value="PENDING">PENDING</option>
              <option value="PROMOTED">PROMOTED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
          </div>

          {/* Sort selection */}
          <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-xl px-3 py-1.5 shadow-sm">
            <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
            <select
              value={sortField}
              onChange={(e) => {
                setSortField(e.target.value as any);
                setPage(1);
              }}
              className="text-xs font-bold text-gray-700 bg-transparent border-none outline-none cursor-pointer focus:ring-0"
            >
              <option value="priority">Sort by Priority Position</option>
              <option value="bookingDate">Sort by Booking Date</option>
              <option value="requestedSeats">Sort by Requested Seats</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="p-12 text-center text-sm font-semibold text-gray-500">Loading travelers...</div>
        ) : paginatedTravelers.length === 0 ? (
          <div className="p-12 text-center text-sm font-semibold text-gray-400">
            No travelers found matching active filters.
          </div>
        ) : (
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <th className="px-6 py-4">Booking ID</th>
                <th className="px-6 py-4">Traveler</th>
                <th className="px-6 py-4">Requested Seats</th>
                <th className="px-6 py-4">Assigned Departure</th>
                <th className="px-6 py-4">Departure Date</th>
                <th className="px-6 py-4">Compliance</th>
                <th className="px-6 py-4">Waitlist Pos</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTravelers.map((t, idx) => {
                const travelerInfo = t.traveler || {};
                const initials = getInitials(travelerInfo.firstName, travelerInfo.lastName) || 'TR';
                const fullName = `${travelerInfo.firstName || 'Traveler'} ${travelerInfo.lastName || ''}`;
                
                return (
                  <tr key={t.id || idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/20 transition-colors text-xs text-gray-700 font-semibold">
                    <td className="px-6 py-4 font-mono font-bold text-gray-900">
                      {t.bookingId}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold bg-[#BC2C2C]/10 text-[#BC2C2C] shrink-0 shadow-sm">
                          {initials}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{fullName}</p>
                          <p className="text-[10px] text-gray-500 mt-0.5">{travelerInfo.email || 'No email'}</p>
                          <p className="text-[10px] text-gray-400">{travelerInfo.phone || 'No phone'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-center font-bold text-gray-900">
                      {t.requestedSeats} {t.requestedSeats === 1 ? 'Seat' : 'Seats'}
                    </td>
                    <td className="px-6 py-4">
                      <select 
                        value={t.departure?.package?.code || ''}
                        onChange={e => {
                          const matchedDep = departuresList.find(d => d.code === e.target.value || d.id === e.target.value);
                          onUpdateTraveler?.(t.id, { 
                            departure: {
                              startDate: matchedDep?.startDate || t.departure?.startDate,
                              package: { 
                                name: matchedDep?.name || t.departure?.package?.name, 
                                code: e.target.value 
                              }
                            }
                          });
                        }}
                        className="bg-white border border-gray-200 rounded-lg px-2 py-1 text-xs font-bold text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#BC2C2C] max-w-[160px] cursor-pointer shadow-sm"
                      >
                        {departuresList.map(dep => (
                          <option key={dep.id} value={dep.code || dep.id}>
                            {dep.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      {t.departure?.startDate ? new Date(t.departure.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${getTierColor(travelerInfo.complianceStatus)}`}>
                        {travelerInfo.complianceStatus || 'CLEAR'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-800 font-bold font-mono">
                        {t.waitlistPosition}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select 
                        value={t.status || 'PENDING'}
                        onChange={e => onUpdateTraveler?.(t.id, { status: e.target.value })}
                        className={`bg-transparent border-none rounded py-0.5 text-xs font-bold focus:outline-none cursor-pointer focus:ring-0 ${
                          t.status === 'PROMOTED' 
                            ? 'text-emerald-600 font-extrabold' 
                            : t.status === 'CANCELLED' 
                              ? 'text-gray-400' 
                              : 'text-amber-500'
                        }`}
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="PROMOTED">PROMOTED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {t.status === 'PENDING' && onPromote ? (
                        <button 
                          onClick={() => onPromote(t.id)}
                          className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-all px-3 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1 mx-auto shadow-sm"
                        >
                          <UserCheck className="w-3.5 h-3.5" /> Promote
                        </button>
                      ) : (
                        <span className="text-[10px] text-gray-400 italic font-semibold">Processed</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="p-4 border-t border-gray-100 flex justify-between items-center text-xs font-semibold text-gray-500 bg-white rounded-b-3xl">
        <span>Showing {filteredTravelers.length > 0 ? (page - 1) * PAGE_SIZE + 1 : 0}–{Math.min(page * PAGE_SIZE, filteredTravelers.length)} of {filteredTravelers.length} travelers</span>
        
        <div className="flex gap-2 items-center">
          <button 
            onClick={() => setPage(p => Math.max(1, p - 1))} 
            disabled={page === 1} 
            className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button 
              key={p} 
              onClick={() => setPage(p)} 
              className={`w-7 h-7 rounded-lg font-bold transition-all ${p === page ? 'bg-[#BC2C2C] text-white' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              {p}
            </button>
          ))}
          
          <button 
            onClick={() => setPage(p => Math.min(totalPages, p + 1))} 
            disabled={page === totalPages} 
            className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
