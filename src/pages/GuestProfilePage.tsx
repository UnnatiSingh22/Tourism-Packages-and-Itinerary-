import React, { useState } from 'react';
import { GuestProfileHeader } from '../components/guests/GuestProfileHeader';
import { DocumentCenterTable } from '../components/guests/DocumentCenterTable';
import { PassportVisaCards, ActiveTripsCard, TravelHistoryCard } from '../components/guests/GuestProfileCards';
import { X } from 'lucide-react';

export function GuestProfilePage() {
  const [trips, setTrips] = useState([
    {
      id: '1',
      status: 'Confirmed',
      date: 'JUL 14 - 28',
      title: 'Bali Sanctuary Retreat',
      location: 'Ubud, Indonesia',
    },
    {
      id: '2',
      status: 'Deposit Paid',
      date: 'OCT 02 - 09',
      title: 'Paris Fashion Week',
      location: 'Paris, France',
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    date: '',
    status: 'Confirmed'
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.location || !formData.date) return;
    const newTrip = {
      id: Date.now().toString(),
      ...formData
    };
    setTrips([...trips, newTrip]);
    setFormData({ title: '', location: '', date: '', status: 'Confirmed' });
    setIsModalOpen(false);
  };

  return (
    <div className="animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col xl:flex-row gap-6">
        {/* Left Column */}
        <div className="flex-1 min-w-0 flex flex-col gap-6">
          <GuestProfileHeader />
          <DocumentCenterTable />
        </div>

        {/* Right Column */}
        <div className="w-full xl:w-[320px] shrink-0 flex flex-col gap-6">
          <PassportVisaCards />
          <ActiveTripsCard trips={trips} onAddBookingClick={() => setIsModalOpen(true)} />
          <TravelHistoryCard />
        </div>
      </div>

      {/* Add New Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-xl border border-gray-100 flex flex-col gap-4 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Add New Booking</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Trip / Package Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tokyo Sakura Explorer"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#BC2C2C] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Location
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tokyo, Japan"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#BC2C2C] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Dates
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. DEC 12 - 19"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#BC2C2C] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Booking Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#BC2C2C] focus:bg-white transition-all cursor-pointer"
                >
                  <option value="Confirmed">Confirmed</option>
                  <option value="Deposit Paid">Deposit Paid</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 border border-gray-200 text-gray-600 text-sm font-bold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#BC2C2C] hover:bg-[#8B2020] text-white text-sm font-bold rounded-xl shadow-sm transition-colors"
                >
                  Save Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
