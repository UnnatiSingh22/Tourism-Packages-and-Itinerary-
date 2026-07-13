import React, { useState } from 'react';
import { GripVertical, Plus, Trash2, Calendar, Hotel, Check, ShieldCheck, AlertTriangle, Loader2 } from 'lucide-react';
import { validateItineraryDay } from '../../lib/api';

interface BuilderTimelineProps {
  days?: any[];
  onAddDay?: (data: { dayNumber: number; title: string; description: string; accommodation?: string }) => Promise<void>;
  onDeleteDay?: (dayId: string) => Promise<void>;
  onReorderDays?: (dayIds: string[]) => Promise<void>;
  loading?: boolean;
}

export function BuilderTimeline({ days = [], onAddDay, onDeleteDay, onReorderDays, loading = false }: BuilderTimelineProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newDay, setNewDay] = useState({
    dayNumber: days.length + 1,
    title: '',
    description: '',
    accommodation: '',
  });

  // Validation States
  const [validationStates, setValidationStates] = useState<Record<string, { loading: boolean; success?: boolean; message?: string }>>({});

  // Drag and Drop States
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onAddDay) return;
    try {
      await onAddDay({
        dayNumber: Number(newDay.dayNumber),
        title: newDay.title,
        description: newDay.description,
        accommodation: newDay.accommodation || undefined,
      });
      setIsAdding(false);
      setNewDay({
        dayNumber: days.length + 2,
        title: '',
        description: '',
        accommodation: '',
      });
    } catch (err) {
      alert('Failed to add itinerary day');
    }
  };

  const handleValidate = async (dayId: string) => {
    setValidationStates(prev => ({ ...prev, [dayId]: { loading: true } }));
    try {
      const res = await validateItineraryDay(dayId);
      setValidationStates(prev => ({
        ...prev,
        [dayId]: { loading: false, success: true, message: res.message || 'Itinerary day validation successful.' },
      }));
    } catch (err: any) {
      setValidationStates(prev => ({
        ...prev,
        [dayId]: { loading: false, success: false, message: err.message || 'Validation failed.' },
      }));
    }
  };

  // Drag handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === index) return;
    setDragOverIndex(index);
  };

  const handleDrop = async (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    // Locally reorder first
    const reordered = [...days];
    const [removed] = reordered.splice(draggedIndex, 1);
    reordered.splice(targetIndex, 0, removed);

    if (onReorderDays) {
      await onReorderDays(reordered.map(d => d.id));
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div>
      <div className="space-y-4 mb-6">
        {loading ? (
          <div className="p-8 text-center text-sm font-semibold text-gray-500 bg-white border border-gray-100 rounded-3xl">Loading timeline...</div>
        ) : days.length === 0 ? (
          <div className="p-8 text-center text-sm font-semibold text-gray-500 bg-white border border-gray-100 rounded-3xl">No itinerary days found for this package. Add one below!</div>
        ) : (
          days.map((day, index) => {
            const valState = validationStates[day.id];
            const isDragging = draggedIndex === index;
            const isDragOver = dragOverIndex === index;

            return (
              <div
                key={day.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                onDragLeave={() => setDragOverIndex(null)}
                className={`flex group transition-all duration-200 ${
                  isDragging ? 'opacity-40 scale-[0.98]' : ''
                } ${
                  isDragOver ? 'border-t-2 border-[#E65A4B] pt-4' : ''
                }`}
              >
                {/* Day Badge Column */}
                <div className="w-24 shrink-0 flex flex-col items-end pr-4 py-4 relative">
                  <span className="text-xs font-bold text-gray-900">Day {day.dayNumber}</span>
                  <div className="absolute right-[-5px] top-5 w-2.5 h-2.5 rounded-full bg-gray-200 border-2 border-white z-10"></div>
                  <div className="absolute right-[-1px] top-7 bottom-[-24px] w-0.5 bg-gray-100 last:hidden"></div>
                </div>
                
                {/* Card Column */}
                <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex gap-3 hover:border-gray-200 transition-colors">
                  <div className="pt-1 text-gray-300 group-hover:text-gray-400">
                    <GripVertical className="w-5 h-5 cursor-grab active:cursor-grabbing" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="text-sm font-bold text-gray-900">{day.title}</h3>
                        {day.accommodation && (
                          <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase flex items-center gap-1.5 mt-1">
                            <Hotel className="w-3.5 h-3.5 text-gray-400" /> {day.accommodation}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {/* Validation Action and Badge */}
                        {valState ? (
                          valState.loading ? (
                            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-lg text-[10px] font-bold text-gray-500">
                              <Loader2 className="w-3 h-3 animate-spin text-[#E65A4B]" /> Validating...
                            </div>
                          ) : valState.success ? (
                            <div
                              title={valState.message}
                              className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-100 rounded-lg text-[10px] font-bold text-emerald-600 cursor-help"
                            >
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> DAG OK
                            </div>
                          ) : (
                            <div
                              title={valState.message}
                              className="flex items-center gap-1.5 px-2.5 py-1 bg-rose-50 border border-rose-100 rounded-lg text-[10px] font-bold text-rose-600 cursor-help"
                            >
                              <AlertTriangle className="w-3.5 h-3.5 text-rose-500" /> Error
                            </div>
                          )
                        ) : (
                          <button
                            onClick={() => handleValidate(day.id)}
                            className="text-[10px] font-bold text-gray-400 hover:text-[#E65A4B] border border-gray-150 px-2 py-0.5 rounded-lg transition-colors"
                          >
                            Check DAG
                          </button>
                        )}

                        {onDeleteDay && (
                          <button 
                            onClick={() => onDeleteDay(day.id)}
                            className="text-gray-400 hover:text-red-600 transition-colors p-1"
                            title="Delete Day"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 whitespace-pre-wrap">{day.description}</p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add New Block Form / Trigger */}
      <div className="ml-24">
        {isAdding ? (
          <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-gray-900 mb-2">New Itinerary Block</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Day Number</label>
                <input
                  type="number"
                  required
                  value={newDay.dayNumber}
                  onChange={(e) => setNewDay({ ...newDay, dayNumber: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#E65A4B]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Accommodation</label>
                <input
                  type="text"
                  placeholder="Hotel name (optional)"
                  value={newDay.accommodation}
                  onChange={(e) => setNewDay({ ...newDay, accommodation: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#E65A4B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Title</label>
              <input
                type="text"
                required
                placeholder="Day Activity Title (e.g. Eiffel Tower VIP Tour)"
                value={newDay.title}
                onChange={(e) => setNewDay({ ...newDay, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#E65A4B]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Description</label>
              <textarea
                required
                placeholder="Provide a detailed itinerary block description..."
                value={newDay.description}
                onChange={(e) => setNewDay({ ...newDay, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#E65A4B]"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-[#E65A4B] to-[#F17361] text-white rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" /> Save Block
              </button>
            </div>
          </form>
        ) : (
          <button 
            onClick={() => {
              setIsAdding(true);
              setNewDay({ ...newDay, dayNumber: days.length + 1 });
            }}
            className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl flex justify-center items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50 transition-all"
          >
            <Plus className="w-4 h-4" /> Add New Block
          </button>
        )}
      </div>
    </div>
  );
}
