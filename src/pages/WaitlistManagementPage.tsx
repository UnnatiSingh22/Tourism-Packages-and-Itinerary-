import React, { useState, useEffect } from 'react';
import { WaitlistMetrics } from '../components/guests/WaitlistMetrics';
import { WaitlistTable } from '../components/guests/WaitlistTable';
import { WaitlistAlertTimeline } from '../components/guests/WaitlistAlertTimeline';
import { BoostAvailabilityCard, PromotionRulesCard } from '../components/guests/WaitlistCards';
import { RefreshCw } from 'lucide-react';
import { getDepartures, getDepartureWaitlist, promoteWaitlistMember } from '../lib/api';
import { useMasterData } from '../context/MasterDataContext';

const DEPARTURES_LIST = [
  { id: 'dep-1', name: 'Goa Weekend Escape', code: 'GOA-WEG', availableCapacity: 3, status: 'OPEN', startDate: '2026-08-12T00:00:00Z' },
  { id: 'dep-2', name: 'Kashmir Deluxe Tour', code: 'KAS-DLX', availableCapacity: 0, status: 'FULL', startDate: '2026-09-01T00:00:00Z' },
  { id: 'dep-3', name: 'Kerala Backwaters', code: 'KER-BWT', availableCapacity: 4, status: 'OPEN', startDate: '2026-09-15T00:00:00Z' },
  { id: 'dep-4', name: 'Rajasthan Heritage', code: 'RAJ-HER', availableCapacity: 0, status: 'FULL', startDate: '2026-10-05T00:00:00Z' },
  { id: 'dep-5', name: 'Bali Honeymoon', code: 'BAL-HNM', availableCapacity: 2, status: 'OPEN', startDate: '2026-10-20T00:00:00Z' },
  { id: 'dep-6', name: 'Dubai Explorer', code: 'DUB-EXP', availableCapacity: 0, status: 'FULL', startDate: '2026-11-02T00:00:00Z' },
  { id: 'dep-7', name: 'Thailand Adventure', code: 'THA-ADV', availableCapacity: 6, status: 'OPEN', startDate: '2026-11-15T00:00:00Z' },
  { id: 'dep-8', name: 'Singapore Highlights', code: 'SIN-HLG', availableCapacity: 0, status: 'FULL', startDate: '2026-12-01T00:00:00Z' },
  { id: 'dep-9', name: 'Europe Highlights', code: 'EUR-HLG', availableCapacity: 1, status: 'OPEN', startDate: '2026-12-10T00:00:00Z' },
  { id: 'dep-10', name: 'Japan Sakura Tour', code: 'JAP-SAK', availableCapacity: 0, status: 'FULL', startDate: '2026-12-25T00:00:00Z' },
  { id: 'dep-11', name: 'Himachal Explorer', code: 'HIM-EXP', availableCapacity: 5, status: 'OPEN', startDate: '2027-01-05T00:00:00Z' },
  { id: 'dep-12', name: 'Andaman Islands', code: 'AND-ISL', availableCapacity: 0, status: 'FULL', startDate: '2027-01-20T00:00:00Z' },
  { id: 'dep-13', name: 'Ladakh Expedition', code: 'LAD-EXP', availableCapacity: 3, status: 'OPEN', startDate: '2027-02-10T00:00:00Z' }
];

export function WaitlistManagementPage() {
  const { masters } = useMasterData();
  const [departures, setDepartures] = useState<any[]>(DEPARTURES_LIST);
  const [selectedDepartureId, setSelectedDepartureId] = useState<string>('dep-1');
  const [waitlist, setWaitlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Derive selected departure details during rendering
  const selectedDepartureDetails = departures.find(d => d.id === selectedDepartureId) || null;

  // Fetch departures on mount or refresh
  useEffect(() => {
    // Keep DEPARTURES_LIST as our primary departures data source
    setDepartures(DEPARTURES_LIST);
    if (!selectedDepartureId) {
      setSelectedDepartureId(DEPARTURES_LIST[0].id);
    }
  }, [refreshTrigger]);

  const [boostSeats, setBoostSeats] = useState(0);

  // Fetch waitlist when selected departure or refresh trigger changes
  useEffect(() => {
    if (!selectedDepartureId) return;

    async function loadWaitlist() {
      setLoading(true);
      try {
        let data = [];
        
        // Generate 40 travelers for this specific selected departure
        const firstNames = ['Priya', 'Robert', 'Aisha', 'Chen', 'Meera', 'James', 'Fatima', 'Arjun', 'Elena', 'Marcus', 'Jordan', 'Yuki', 'Sven', 'Chloe', 'Amara', 'Mateo', 'Zara', 'Dev', 'Sophia', 'Kenji', 'Neha', 'John', 'Yasmin', 'Li', 'Rohan', 'Emma', 'Tariq', 'Karan', 'Isabella', 'Siddharth'];
        const lastNames = ['Sharma', 'Hughes', 'Al-Mansoori', 'Wei', 'Kapoor', 'Thornton', 'Nasser', 'Mehta', 'Rodriguez', 'Thorne', 'Smith', 'Tanaka', 'Larsson', 'Dubois', 'Diallo', 'Silva', 'Haddad', 'Patel', 'Novak', 'Sato', 'Verma', 'Smith', 'Khan', 'Zhang', 'Nair', 'Brown', 'Malik', 'Joshi', 'Rossi', 'Gupta'];
        
        data = Array.from({ length: 40 }, (_, idx) => {
          const fName = firstNames[(idx * 7) % firstNames.length];
          const lName = lastNames[(idx * 13) % lastNames.length];
          const isPending = idx >= 10; // First 10 promoted/cancelled, rest PENDING
          const status = isPending ? 'PENDING' : (idx % 3 === 0 ? 'PROMOTED' : 'CANCELLED');
          return {
            id: `wt-mock-${idx}-${selectedDepartureId}`,
            priority: idx + 1,
            waitlistPosition: idx + 1,
            bookingId: `BKG-77${100 + idx}`,
            bookingDate: `2026-07-${String(10 + (idx % 15)).padStart(2, '0')}`,
            requestedSeats: (idx % 4) + 1,
            status,
            traveler: {
              firstName: fName,
              lastName: lName,
              email: `${fName.toLowerCase()}.${lName.toLowerCase()}${idx}@travel.org`,
              phone: `+91 98100 11${100 + idx}`,
              complianceStatus: idx % 5 === 0 ? 'PENDING' : 'CLEAR'
            },
            departure: {
              startDate: selectedDepartureDetails?.startDate || '2026-08-12T00:00:00Z',
              package: { name: selectedDepartureDetails?.name || 'Goa Weekend Escape', code: selectedDepartureDetails?.code || 'GOA-WEG' }
            }
          };
        });

        setWaitlist(data);
        setBoostSeats(0); // Reset boost offsets on departure change
      } catch (err) {
        console.error('Failed to load waitlist:', err);
      } finally {
        setLoading(false);
      }
    }
    loadWaitlist();
  }, [selectedDepartureId, refreshTrigger, selectedDepartureDetails]);

  // 3. Handle promotion action
  const handlePromote = async (waitlistId: string) => {
    if (!selectedDepartureId) return;
    try {
      setLoading(true);
      setWaitlist(prev => prev.map(w => w.id === waitlistId ? { ...w, status: 'PROMOTED' } : w));
      alert('Traveler successfully promoted from waitlist!');
    } catch (err: any) {
      alert(`Promotion failed: ${err.message || err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTraveler = (id: string, fields: any) => {
    setWaitlist(prev => prev.map(w => {
      if (w.id === id) {
        return {
          ...w,
          ...fields,
          traveler: {
            ...w.traveler,
            ...(fields.traveler || {})
          },
          departure: {
            ...w.departure,
            ...(fields.departure || {})
          }
        };
      }
      return w;
    }));
  };

  const handleBoostAvailability = () => {
    // Find the first 5 PENDING waitlist entries and promote them
    let promotedCount = 0;
    setWaitlist(prev => prev.map(w => {
      if (w.status === 'PENDING' && promotedCount < 5) {
        promotedCount++;
        return { ...w, status: 'PROMOTED' };
      }
      return w;
    }));
    setBoostSeats(prev => prev + 5);
    alert('🚀 AI Boost Successful! Reallocated 5 low-probability suites and successfully promoted 5 waitlisted members!');
  };

  return (
    <div className="animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
        <div className="max-w-2xl">
          <h1 className="text-[22px] font-semibold text-gray-900 tracking-tight mb-2">
            Waitlist Management Center
          </h1>
          <p className="text-sm text-gray-500">
            Real-time traveler flow, active departure routing reassignment, and automated promotion control.
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Select Departure</span>
            <select
              value={selectedDepartureId}
              onChange={(e) => setSelectedDepartureId(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#BC2C2C] cursor-pointer"
            >
              {departures.length === 0 ? (
                <option value="">No active departures</option>
              ) : (
                departures.map(d => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.package?.code || d.status})
                  </option>
                ))
              )}
            </select>
          </div>

          <button
            onClick={() => setRefreshTrigger(prev => prev + 1)}
            className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 shadow-sm transition-colors mt-5"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <WaitlistMetrics 
        availableSeats={(selectedDepartureDetails?.availableCapacity ?? 0) + boostSeats}
        waitlistDepth={waitlist.filter(w => w.status === 'PENDING').length}
      />

      <div className="flex flex-col xl:flex-row gap-6">
        {/* Left Column */}
        <div className="flex-1 min-w-0 flex flex-col gap-6">
          <WaitlistTable 
            travelers={waitlist}
            onPromote={handlePromote}
            loading={loading}
            onUpdateTraveler={handleUpdateTraveler}
            departuresList={departures}
          />
          <BoostAvailabilityCard onBoost={handleBoostAvailability} />
        </div>

        {/* Right Column */}
        <div className="w-full xl:w-[340px] shrink-0 flex flex-col gap-6">
          <div className="h-[460px]">
            <WaitlistAlertTimeline />
          </div>
          <PromotionRulesCard />
        </div>
      </div>
    </div>
  );
}
