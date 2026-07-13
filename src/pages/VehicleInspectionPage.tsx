import React, { useState } from 'react';
import { InspectionMetrics } from '../components/fleet/InspectionMetrics';
import { FleetHealthMatrix } from '../components/fleet/FleetHealthMatrix';
import { InspectionHistory } from '../components/fleet/InspectionHistory';
import { FleetSpotlight } from '../components/fleet/FleetSpotlight';
import { Settings, Plus, X, ClipboardCheck, CheckCircle2 } from 'lucide-react';

const INITIAL_LOGS = [
  { id: 'SUV-204', vehicle: 'Mercedes Sprinter', technician: 'Marcus Chen', status: 'pass', resultTag: 'PASS', resultColor: 'bg-emerald-50 text-emerald-600 border-emerald-100', notes: 'Brake pads replaced, fluids topped.', date: 'Oct 24,\n14:20', mileage: '84,200 km', nextService: 'Nov 24, 2026', items: ['Engine Oil ✅', 'Brake Pads ✅ (Replaced)', 'Tire Pressure ✅', 'Coolant Level ✅', 'AC Filter ✅', 'Headlights ✅'] },
  { id: 'VAN-012', vehicle: 'Toyota Coaster', technician: 'Elena Rodriguez', status: 'fail', resultTag: 'FAIL', resultColor: 'bg-red-50 text-red-600 border-red-100', notes: 'Coolant leak identified. Grounded.', date: 'Oct 24,\n11:05', mileage: '62,880 km', nextService: 'Immediate', items: ['Engine Oil ✅', 'Brake Pads ✅', 'Coolant Level ❌ (Leak Found)', 'AC Filter ⚠️', 'Windshield ✅', 'Seatbelts ✅'] },
  { id: 'LIMO-05', vehicle: 'BMW 7-Series Limo', technician: 'Marcus Chen', status: 'warning', resultTag: 'WARNING', resultColor: 'bg-yellow-50 text-yellow-600 border-yellow-100', notes: 'Minor upholstery wear. Requires steam.', date: 'Oct 23,\n16:45', mileage: '44,100 km', nextService: 'Dec 01, 2026', items: ['Engine Oil ✅', 'Brake Pads ✅', 'Tire Pressure ✅', 'Interior ⚠️ (Upholstery Wear)', 'AC Filter ✅', 'GPS System ✅'] },
  { id: 'BUS-088', vehicle: 'Volvo Coach Bus', technician: 'Priya Nair', status: 'pass', resultTag: 'PASS', resultColor: 'bg-emerald-50 text-emerald-600 border-emerald-100', notes: 'Full service complete. Road-ready.', date: 'Oct 22,\n09:30', mileage: '1,24,500 km', nextService: 'Dec 22, 2026', items: ['Engine Oil ✅', 'Brake System ✅', 'Tire Check ✅', 'Suspension ✅', 'Emergency Exit ✅', 'First Aid Kit ✅'] },
  { id: 'SUV-311', vehicle: 'Lexus LX 600', technician: 'Ravi Kumar', status: 'warning', resultTag: 'WARNING', resultColor: 'bg-yellow-50 text-yellow-600 border-yellow-100', notes: 'Tyre wear noted on front right axle.', date: 'Oct 21,\n13:10', mileage: '38,740 km', nextService: 'Nov 15, 2026', items: ['Engine Oil ✅', 'Brake Pads ✅', 'Front-Right Tyre ⚠️', 'AC System ✅', 'Coolant ✅', 'Seatbelts ✅'] },
  { id: 'MINI-020', vehicle: 'Mini Coach 24-Seater', technician: 'Sonal Iyer', status: 'fail', resultTag: 'FAIL', resultColor: 'bg-red-50 text-red-600 border-red-100', notes: 'Faulty rear brakes. Sent for repair.', date: 'Oct 20,\n10:50', mileage: '98,300 km', nextService: 'Immediate', items: ['Engine Oil ✅', 'Rear Brakes ❌ (Faulty)', 'Tire Pressure ✅', 'Coolant ✅', 'Lights ✅', 'Wipers ⚠️'] },
];

export function VehicleInspectionPage() {
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [modalOpen, setModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [specsModalOpen, setSpecsModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Form State
  const [form, setForm] = useState({
    id: '',
    vehicle: 'Mercedes Sprinter',
    technician: '',
    mileage: '',
    status: 'pass',
    notes: '',
    oilCheck: true,
    brakesCheck: true,
    tiresCheck: true,
    coolantCheck: true
  });

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleStartInspection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.id || !form.technician || !form.mileage) {
      alert('Please fill in all inspection details.');
      return;
    }

    const items = [
      `Engine Oil ${form.oilCheck ? '✅' : '❌'}`,
      `Brake Pads ${form.brakesCheck ? '✅' : '❌'}`,
      `Tires check ${form.tiresCheck ? '✅' : '❌'}`,
      `Coolant level ${form.coolantCheck ? '✅' : '❌'}`,
    ];

    const newLog = {
      id: form.id.toUpperCase(),
      vehicle: form.vehicle,
      technician: form.technician,
      status: form.status,
      resultTag: form.status.toUpperCase(),
      resultColor: form.status === 'pass' 
        ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
        : form.status === 'fail'
          ? 'bg-red-50 text-red-600 border-red-100'
          : 'bg-yellow-50 text-yellow-600 border-yellow-100',
      notes: form.notes || 'No issues found.',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ',\n' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      mileage: `${Number(form.mileage).toLocaleString()} km`,
      nextService: form.status === 'fail' ? 'Immediate' : 'Next 10,000 km',
      items
    };

    setLogs(prev => [newLog, ...prev]);
    setModalOpen(false);
    triggerToast(`🛠️ Inspection Log for ${newLog.id} submitted successfully!`);
    
    // Reset Form
    setForm({
      id: '',
      vehicle: 'Mercedes Sprinter',
      technician: '',
      mileage: '',
      status: 'pass',
      notes: '',
      oilCheck: true,
      brakesCheck: true,
      tiresCheck: true,
      coolantCheck: true
    });
  };

  return (
    <div className="animate-in fade-in duration-500 pb-8 relative">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white text-xs px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-in slide-in-from-bottom-2 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="font-bold">{toastMsg}</span>
        </div>
      )}

      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-1">
            Vehicle Inspection Center
          </h1>
          <p className="text-sm text-gray-500">
            Fleet Safety & Maintenance Performance Dashboard
          </p>
        </div>

        <button 
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl text-sm font-semibold shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#BC2C2C]" /> Start New Inspection
        </button>
      </div>

      <InspectionMetrics />

      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        <div className="w-full lg:w-1/3">
          <FleetHealthMatrix />
        </div>
        <div className="w-full lg:w-2/3">
          <InspectionHistory logs={logs} />
        </div>
      </div>

      <FleetSpotlight 
        onReview={() => setReviewModalOpen(true)}
        onViewSpecs={() => setSpecsModalOpen(true)}
      />

      {/* Start New Inspection Form Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setModalOpen(false)}>
          <div 
            className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 flex flex-col gap-4 animate-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5 text-[#BC2C2C]" />
                <h3 className="text-base font-bold text-gray-900">New Safety Inspection Report</h3>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleStartInspection} className="space-y-4 text-xs font-semibold text-gray-700">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Asset identifier Code *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. SUV-104"
                    value={form.id}
                    onChange={e => setForm({ ...form, id: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Vehicle Fleet Category</label>
                  <select 
                    value={form.vehicle} 
                    onChange={e => setForm({ ...form, vehicle: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none cursor-pointer"
                  >
                    <option value="Mercedes Sprinter">Mercedes Sprinter</option>
                    <option value="Toyota Coaster">Toyota Coaster</option>
                    <option value="BMW 7-Series Limo">BMW 7-Series Limo</option>
                    <option value="Volvo Coach Bus">Volvo Coach Bus</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Technician Name *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Marcus Chen"
                    value={form.technician}
                    onChange={e => setForm({ ...form, technician: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Odometer Mileage (km) *</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 84200"
                    value={form.mileage}
                    onChange={e => setForm({ ...form, mileage: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Checklist Multi-Select Checkboxes */}
              <div className="p-3 bg-gray-50 border border-gray-100 rounded-2xl flex flex-col gap-2">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Inspection Checklist</label>
                <div className="grid grid-cols-2 gap-3 mt-1.5">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-700">
                    <input 
                      type="checkbox" 
                      checked={form.oilCheck} 
                      onChange={e => setForm({ ...form, oilCheck: e.target.checked })}
                      className="w-4 h-4 rounded text-[#BC2C2C] accent-[#BC2C2C]"
                    />
                    Engine Oil OK
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-700">
                    <input 
                      type="checkbox" 
                      checked={form.brakesCheck} 
                      onChange={e => setForm({ ...form, brakesCheck: e.target.checked })}
                      className="w-4 h-4 rounded text-[#BC2C2C] accent-[#BC2C2C]"
                    />
                    Brake System OK
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-700">
                    <input 
                      type="checkbox" 
                      checked={form.tiresCheck} 
                      onChange={e => setForm({ ...form, tiresCheck: e.target.checked })}
                      className="w-4 h-4 rounded text-[#BC2C2C] accent-[#BC2C2C]"
                    />
                    Tire Pressure OK
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-700">
                    <input 
                      type="checkbox" 
                      checked={form.coolantCheck} 
                      onChange={e => setForm({ ...form, coolantCheck: e.target.checked })}
                      className="w-4 h-4 rounded text-[#BC2C2C] accent-[#BC2C2C]"
                    />
                    Coolant Level OK
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Inspection Status</label>
                <select 
                  value={form.status} 
                  onChange={e => setForm({ ...form, status: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none cursor-pointer text-gray-800"
                >
                  <option value="pass">PASS (Road Ready)</option>
                  <option value="warning">WARNING (Minor issue, monitor)</option>
                  <option value="fail">FAIL (Ground vehicle immediately)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Observations / Action Required</label>
                <textarea 
                  placeholder="Details of replacements, fluid tops, or critical repairs needed..."
                  value={form.notes}
                  onChange={e => setForm({ ...form, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none h-16 resize-none font-medium"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-2.5 bg-[#BC2C2C] hover:bg-[#8B2020] text-white rounded-xl transition-colors font-bold shadow-sm"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Review Logs Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setReviewModalOpen(false)}>
          <div 
            className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 flex flex-col gap-4 animate-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5 text-[#BC2C2C]" />
                <h3 className="text-base font-bold text-gray-900">Maintenance Log Audit: LIMO-05</h3>
              </div>
              <button onClick={() => setReviewModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-semibold text-gray-700">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Vehicle</p>
                <p className="text-sm font-bold text-gray-900">BMW 7-Series Limo (LIMO-05)</p>
              </div>

              <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-2xl">
                <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest mb-2">50,000 km Cycle Checklist</p>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>Engine Oil Check: <span className="text-emerald-600 font-bold">✅ PASS</span></div>
                  <div>Braking Efficiency: <span className="text-emerald-600 font-bold">✅ 96%</span></div>
                  <div>Tires & Suspension: <span className="text-emerald-600 font-bold">✅ PASS</span></div>
                  <div>Coolant Levels: <span className="text-emerald-600 font-bold">✅ PASS</span></div>
                  <div>AC & Cabin Filter: <span className="text-emerald-600 font-bold">✅ PASS</span></div>
                  <div>GPS & Electronics: <span className="text-emerald-600 font-bold">✅ PASS</span></div>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Technician Notes</p>
                <p className="text-gray-700 bg-gray-50 p-2.5 rounded-xl border border-gray-100 font-medium leading-relaxed">
                  "Zero critical faults detected. Front brake pads replaced ahead of scheduled wear. All cabin electronics verified for peak VIP operations. Certified as road ready for the Global summit."
                </p>
              </div>

              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Service History Timeline</p>
                <div className="border-l-2 border-rose-100 pl-4 space-y-3 relative ml-1.5">
                  <div className="relative">
                    <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#BC2C2C]"></span>
                    <p className="font-bold text-gray-900">Oct 24, 2026</p>
                    <p className="text-gray-500 text-[10px]">Certification Certificate Issued by Marcus Chen</p>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-gray-300"></span>
                    <p className="font-bold text-gray-800">Oct 23, 2026</p>
                    <p className="text-gray-500 text-[10px]">Mechanical Service & Fluids Top-up Completed</p>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-gray-300"></span>
                    <p className="font-bold text-gray-800">Oct 22, 2026</p>
                    <p className="text-gray-500 text-[10px]">Initial Diagnostics Diagnostic Codes Run</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button 
                  onClick={() => setReviewModalOpen(false)}
                  className="w-full py-2.5 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-colors text-center shadow-sm"
                >
                  Close Log Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Vehicle Specs Modal */}
      {specsModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSpecsModalOpen(false)}>
          <div 
            className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 flex flex-col gap-4 animate-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5 text-[#BC2C2C]" />
                <h3 className="text-base font-bold text-gray-900">Technical Specifications: LIMO-05</h3>
              </div>
              <button onClick={() => setSpecsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-semibold text-gray-700">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Asset Details</p>
                <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-2xl border border-gray-100">
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block mb-0.5">Model</span>
                    <span className="text-gray-900 font-extrabold text-[13px]">BMW 7-Series Hybrid Limo</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block mb-0.5">Fuel Type</span>
                    <span className="text-gray-900 font-extrabold text-[13px]">PHEV (Electric Hybrid)</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block mb-0.5">Seating Capacity</span>
                    <span className="text-gray-900 font-extrabold text-[13px]">4 Passengers + 1 Driver</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block mb-0.5">Registration ID</span>
                    <span className="text-gray-900 font-mono font-black text-[13px]">DL-3C-BA-8821</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Administrative & Permitting Info</p>
                <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-2xl border border-gray-100">
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block mb-0.5">Annual Permit Expiry</span>
                    <span className="text-gray-900 font-bold">Nov 14, 2027</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block mb-0.5">Insurance Policy</span>
                    <span className="text-gray-900 font-mono font-bold">INS-POL-8849-B</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Inspections Calendar</p>
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                    <span>Last Inspection Cycle</span>
                    <span className="text-emerald-600 font-extrabold">Oct 24, 2026 (PASS)</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                    <span>Next Scheduled Diagnostic Checklist</span>
                    <span className="text-amber-600 font-extrabold">Nov 24, 2026</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                    <span>Annual State Safety Audit Date</span>
                    <span className="text-gray-900 font-extrabold">Jan 10, 2027</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button 
                  onClick={() => setSpecsModalOpen(false)}
                  className="w-full py-2.5 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-colors text-center shadow-sm"
                >
                  Close Specifications
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
