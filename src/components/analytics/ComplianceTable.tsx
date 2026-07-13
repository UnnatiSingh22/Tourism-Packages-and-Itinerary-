import React, { useState } from 'react';
import { Filter, XCircle, CheckCircle2, Info, Plus, X, AlertTriangle } from 'lucide-react';
import { useMasterData } from '../../context/MasterDataContext';

interface NewRule {
  name: string; type: string; trigger: string; action: string; severity: string; destinations: string;
}

function AddRuleModal({ onClose }: { onClose: () => void }) {
  const [rule, setRule] = useState<NewRule>({ name: '', type: 'Passport Validity', trigger: 'Less than 6 months to expiry', action: 'Flag & Notify', severity: 'Critical', destinations: 'All' });
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rule.name) { alert('Please enter a rule name.'); return; }
    setSaved(true);
    setTimeout(() => { onClose(); }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" /> New Compliance Rule
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {saved ? (
          <div className="p-8 flex flex-col items-center gap-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
            <p className="text-base font-bold text-gray-900">Rule Created Successfully!</p>
            <p className="text-sm text-gray-500">"{rule.name}" has been added to the compliance ruleset.</p>
          </div>
        ) : (
          <form onSubmit={handleSave} className="p-6 space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Rule Name *</label>
              <input type="text" value={rule.name} onChange={e => setRule({ ...rule, name: e.target.value })} placeholder="e.g., Schengen Visa 6-Month Check" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#BC2C2C]/20" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Rule Type</label>
                <select value={rule.type} onChange={e => setRule({ ...rule, type: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none cursor-pointer">
                  <option>Passport Validity</option><option>Visa Requirement</option><option>Health Certificate</option><option>Travel Insurance</option><option>Age Restriction</option><option>Custom</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Severity</label>
                <select value={rule.severity} onChange={e => setRule({ ...rule, severity: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none cursor-pointer">
                  <option>Critical</option><option>Warning</option><option>Info</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Trigger Condition</label>
              <input type="text" value={rule.trigger} onChange={e => setRule({ ...rule, trigger: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#BC2C2C]/20" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Action on Trigger</label>
              <select value={rule.action} onChange={e => setRule({ ...rule, action: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none cursor-pointer">
                <option>Flag & Notify</option><option>Block Booking</option><option>Send Reminder Email</option><option>Escalate to Manager</option><option>Auto Reject</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Apply to Destinations</label>
              <select value={rule.destinations} onChange={e => setRule({ ...rule, destinations: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none cursor-pointer">
                <option>All</option><option>Europe (Schengen)</option><option>Middle East</option><option>Asia Pacific</option><option>Americas</option><option>Africa</option>
              </select>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-bold text-gray-700 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors">Cancel</button>
              <button type="submit" className="px-5 py-2.5 text-sm font-bold text-white bg-[#BC2C2C] hover:bg-[#8B2020] rounded-xl shadow-sm transition-colors">Create Rule</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export function ComplianceTable() {
  const { masters } = useMasterData();
  const [riskFilter, setRiskFilter] = useState('All Risk Levels');
  const [showAddRule, setShowAddRule] = useState(false);

  const travelers = masters.guests.filter(g => g.status === 'Active').map((guest, idx) => {
    const status = idx === 0 ? 'Critical Risk' : idx === 1 ? 'Warning' : 'Incomplete';
    const statusColor = status === 'Warning' ? 'bg-orange-50 text-orange-600' : 'bg-red-50 text-red-600';
    const statusDot = status === 'Warning' ? 'bg-orange-500' : 'bg-red-500';
    const dest = masters.destinations[idx % masters.destinations.length]?.name || 'London, UK';
    return {
      id: guest.id,
      name: `${guest.firstName} ${guest.lastName}`,
      role: idx === 0 ? 'Event Producer • Senior' : idx === 1 ? 'VIP Guest • Speaker' : 'Operations Lead',
      avatar: `https://images.unsplash.com/photo-${1507003211169 + idx}?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`,
      status, statusColor, statusDot,
      destination: dest,
      departure: idx === 0 ? 'Oct 24' : idx === 1 ? 'Nov 02' : 'Oct 28',
      visaText: idx === 0 ? 'COE Missing' : idx === 1 ? 'Business Standard' : 'Schengen Pending',
      visaIcon: idx === 1 ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : idx === 0 ? <XCircle className="w-4 h-4 text-red-500" /> : <Info className="w-4 h-4 text-gray-400" />,
      passport: idx === 1 ? '4.2 Years' : idx === 0 ? '12 Days' : '62 Days',
      passportColor: idx === 1 ? 'text-gray-900' : idx === 0 ? 'text-red-600' : 'text-orange-600',
      passportExp: idx === 1 ? 'Jan 15, 2029' : idx === 0 ? 'Sep 12, 2024' : 'Nov 15, 2024',
      action: idx === 0 ? 'Contact Traveler' : idx === 1 ? 'View Dossier' : 'Send Reminder'
    };
  });

  const filteredTravelers = travelers.filter(t => riskFilter === 'All Risk Levels' || t.status === riskFilter);

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col relative pb-20">
      {/* Header Bar */}
      <div className="p-6 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-sm font-bold text-gray-900">Urgent Attention Required</h2>
          <span className="px-3 py-1 bg-[#BC2C2C] text-white text-[10px] font-bold tracking-widest uppercase rounded-full">
            {filteredTravelers.length} Critical
          </span>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={riskFilter}
            onChange={e => setRiskFilter(e.target.value)}
            className="bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg focus:ring-gray-300 focus:border-gray-300 block px-4 py-2 hover:bg-gray-50 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#BC2C2C]"
          >
            <option value="All Risk Levels">All Risk Levels</option>
            <option value="Critical Risk">Critical Risk</option>
            <option value="Warning">Warning</option>
            <option value="Incomplete">Incomplete</option>
          </select>
          <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-500">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="pb-4 pt-6 pl-8 text-[11px] font-bold text-gray-600 uppercase tracking-widest">Traveler</th>
              <th className="pb-4 pt-6 px-4 text-[11px] font-bold text-gray-600 uppercase tracking-widest">Current Status</th>
              <th className="pb-4 pt-6 px-4 text-[11px] font-bold text-gray-600 uppercase tracking-widest">Destination</th>
              <th className="pb-4 pt-6 px-4 text-[11px] font-bold text-gray-600 uppercase tracking-widest">Visa Compliance</th>
              <th className="pb-4 pt-6 px-4 text-[11px] font-bold text-gray-600 uppercase tracking-widest">Passport Expiry</th>
              <th className="pb-4 pt-6 pr-8 text-[11px] font-bold text-gray-600 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTravelers.length === 0 ? (
              <tr><td colSpan={6} className="py-12 text-center text-sm text-gray-400">No travelers match this filter.</td></tr>
            ) : filteredTravelers.map(traveler => (
              <tr key={traveler.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
                <td className="py-6 pl-8">
                  <div className="flex items-center gap-4">
                    <img src={traveler.avatar} alt={traveler.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-0.5">{traveler.name}</p>
                      <p className="text-xs text-gray-500 font-medium w-32 break-words leading-tight">{traveler.role}</p>
                    </div>
                  </div>
                </td>
                <td className="py-6 px-4">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${traveler.statusColor}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${traveler.statusDot}`}></div>
                    <span className="text-[11px] font-bold">{traveler.status}</span>
                  </div>
                </td>
                <td className="py-6 px-4">
                  <p className="text-sm font-medium text-gray-900 mb-0.5">{traveler.destination}</p>
                  <p className="text-xs text-gray-500">Departure: {traveler.departure}</p>
                </td>
                <td className="py-6 px-4">
                  <div className="flex items-center gap-2">
                    {traveler.visaIcon}
                    <span className="text-sm font-medium text-gray-700">{traveler.visaText}</span>
                  </div>
                </td>
                <td className="py-6 px-4">
                  <p className={`text-sm font-bold mb-0.5 ${traveler.passportColor}`}>{traveler.passport}</p>
                  <p className="text-[10px] text-gray-400">Expires: {traveler.passportExp}</p>
                </td>
                <td className="py-6 pr-8 text-right">
                  <button className="text-sm font-medium text-[#BC2C2C] hover:text-red-900 transition-colors leading-tight text-right inline-block w-28">
                    {traveler.action}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Floating Add Rule Button */}
      <button
        onClick={() => setShowAddRule(true)}
        className="absolute bottom-6 right-6 flex items-center gap-2 px-5 py-3 bg-[#BC2C2C] hover:bg-[#8B2020] text-white font-bold text-sm rounded-2xl shadow-lg transition-all hover:scale-105 z-10"
      >
        <Plus className="w-5 h-5" /> Add Rule
      </button>

      {showAddRule && <AddRuleModal onClose={() => setShowAddRule(false)} />}
    </div>
  );
}
