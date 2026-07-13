import { useState } from 'react';
import { Grid, PlusSquare, Trash2, Plus, Star, MapPin, Gauge } from 'lucide-react';
import { formatRupee } from '../../lib/utils';
import { useMasterData } from '../../context/MasterDataContext';
import type { RecommendedActivity } from '../../data/tourismData';

interface Activity {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  duration: string;
  image: string;
  difficulty?: string;
  isOptional?: boolean;
}

interface ActivityAllocationBoardProps {
  selectedActivities: Activity[];
  onUpdateActivities: (activities: Activity[]) => void;
  selectedDestinations: { name: string }[];
  category: string;
}

export function ActivityAllocationBoard({ 
  selectedActivities, 
  onUpdateActivities, 
  selectedDestinations,
  category
}: ActivityAllocationBoardProps) {
  const { masters } = useMasterData();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  // Extract destination names (e.g. "Goa" from "Goa, India")
  const destNames = selectedDestinations.map(d => d.name.split(',')[0].trim());

  const activeActivities: any[] = masters.activities.filter(a => a.status === 'Active').map(a => ({
    id: a.id,
    name: a.name,
    price: Number(a.price || 0),
    description: a.description || '',
    category: a.category || 'Cultural',
    duration: a.duration || '2 Hours',
    image: a.image || 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=150&h=150&fit=crop',
    difficulty: (a as any).difficulty || 'Easy',
    destinations: Array.isArray((a as any).destinations)
      ? (a as any).destinations
      : typeof (a as any).destinations === 'string'
        ? String((a as any).destinations).split(',').map((x: string) => x.trim())
        : ['Paris'],
    isOptional: (a as any).isOptional ?? true,
    isRecommended: (a as any).isRecommended ?? true
  }));

  // Filter and group available experiences from activeActivities
  const getGroupedActivities = () => {
    const q = searchQuery.toLowerCase().trim();
    const groups: Record<string, RecommendedActivity[]> = {};

    destNames.forEach(dest => {
      // Find activities matching this destination
      let list = activeActivities.filter(act => {
        const actDests = act.destinations || [];
        return actDests.some((d: string) => d.toLowerCase() === dest.toLowerCase());
      });

      // Apply search query filter if typed
      if (q) {
        list = list.filter(act => 
          act.name.toLowerCase().includes(q) || 
          act.description.toLowerCase().includes(q) ||
          act.category.toLowerCase().includes(q)
        );
      }

      if (list.length > 0) {
        groups[dest] = list;
      }
    });

    // Fallback if no destinations selected or matches found
    if (destNames.length === 0 || Object.keys(groups).length === 0) {
      let list = activeActivities;
      if (q) {
        list = list.filter(act => 
          act.name.toLowerCase().includes(q) || 
          act.description.toLowerCase().includes(q) ||
          act.category.toLowerCase().includes(q)
        );
      }
      groups['Recommended Spots'] = list;
    }

    return groups;
  };

  const groupedActivities = getGroupedActivities();

  const handleDragStart = (e: React.DragEvent, activity: Activity) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(activity));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    try {
      const dataStr = e.dataTransfer.getData('text/plain');
      if (!dataStr) return;
      const activity = JSON.parse(dataStr) as Activity;
      
      if (selectedActivities.some(a => a.id === activity.id)) return;
      onUpdateActivities([...selectedActivities, activity]);
    } catch (err) {
      console.error('Drop error:', err);
    }
  };

  const handleAddActivity = (activity: Activity) => {
    if (selectedActivities.some(a => a.id === activity.id)) return;
    onUpdateActivities([...selectedActivities, activity]);
  };

  const handleRemoveActivity = (id: string) => {
    onUpdateActivities(selectedActivities.filter(a => a.id !== id));
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Moderate': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Strenuous': return 'bg-rose-50 text-rose-700 border-rose-100';
      default: return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
          <Grid className="w-4 h-4 text-emerald-500" /> Smart Activity Allocation
        </h3>
        <span className="text-[10px] bg-emerald-50 text-emerald-600 font-bold px-2 py-0.5 rounded-lg border border-emerald-100">
          Intelligent Activities Mode
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available Experiences Column */}
        <div className="space-y-4">
          <div>
            <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Search Recommendations</h4>
            <input 
              type="text" 
              placeholder="Search experiences by name or category..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#BC2C2C]/30 transition-all" 
            />
          </div>

          <div className="space-y-6 max-h-[550px] overflow-y-auto pr-1">
            {Object.entries(groupedActivities).map(([destGroup, items]) => (
              <div key={destGroup} className="space-y-3">
                <div className="flex items-center gap-1.5 border-b border-gray-50 pb-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#BC2C2C]" />
                  <span className="text-xs font-extrabold text-gray-900 capitalize">{destGroup} Experience Pack</span>
                </div>

                <div className="space-y-3">
                  {items.map((item) => {
                    const isAdded = selectedActivities.some(a => a.id === item.id);
                    const isRecommended = item.categories.includes(category) || item.isRecommended;
                    
                    return (
                      <div 
                        key={item.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, {
                          id: item.id,
                          name: item.name,
                          price: item.price,
                          description: item.description,
                          category: item.category,
                          duration: item.duration,
                          image: item.image,
                          difficulty: item.difficulty,
                          isOptional: item.isOptional
                        })}
                        className={`border border-gray-100 rounded-2xl p-3.5 flex gap-3.5 cursor-grab hover:border-gray-200 transition-all bg-white shadow-xs group relative ${
                          isRecommended ? 'ring-1 ring-amber-500/25 bg-amber-50/5' : ''
                        }`}
                      >
                        <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover shrink-0 pointer-events-none" />
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-xs font-extrabold text-gray-900 truncate pr-6 leading-tight">{item.name}</span>
                            <span className="text-xs font-black text-gray-950">{formatRupee(item.price)}</span>
                          </div>
                          
                          <p className="text-[11px] font-medium text-gray-500 mb-2 leading-relaxed line-clamp-2">{item.description}</p>
                          
                          <div className="flex justify-between items-center mt-2.5">
                            <div className="flex flex-wrap gap-1.5 items-center">
                              {/* Included / Optional Badge */}
                              <span className={`px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider rounded border ${
                                item.isOptional 
                                  ? 'bg-gray-50 text-gray-500 border-gray-150' 
                                  : 'bg-emerald-50 text-emerald-700 border-emerald-150'
                              }`}>
                                {item.isOptional ? 'Optional' : 'Included'}
                              </span>

                              {/* Difficulty Badge */}
                              <span className={`px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider rounded border flex items-center gap-0.5 ${getDifficultyColor(item.difficulty)}`}>
                                <Gauge className="w-2 h-2" /> {item.difficulty}
                              </span>

                              {/* Duration Tag */}
                              <span className="px-1.5 py-0.5 bg-gray-50 text-gray-600 text-[8px] font-bold rounded border border-gray-100">
                                {item.duration}
                              </span>

                              {isRecommended && (
                                <span className="px-1.5 py-0.5 bg-amber-50 text-amber-800 text-[8px] font-extrabold uppercase tracking-widest rounded border border-amber-100 flex items-center gap-0.5">
                                  <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-500" /> Recommended
                                </span>
                              )}
                            </div>
                            
                            <button
                              type="button"
                              onClick={() => handleAddActivity({
                                id: item.id,
                                name: item.name,
                                price: item.price,
                                description: item.description,
                                category: item.category,
                                duration: item.duration,
                                image: item.image,
                                difficulty: item.difficulty,
                                isOptional: item.isOptional
                              })}
                              disabled={isAdded}
                              className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all flex items-center gap-1 shrink-0 ${
                                isAdded 
                                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                  : 'bg-[#BC2C2C] text-white hover:bg-[#8B2020] opacity-90 group-hover:opacity-100'
                              }`}
                            >
                              <Plus className="w-3 h-3" /> {isAdded ? 'Added' : 'Add'}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected activities column */}
        <div className="flex flex-col h-full">
          <h4 className="text-[10px] font-bold text-[#BC2C2C] uppercase tracking-widest mb-3 flex items-center justify-between">
            <span>Selected For Package ({selectedActivities.length})</span>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              Total Cost: {formatRupee(selectedActivities.reduce((sum, a) => sum + a.price, 0))}
            </span>
          </h4>
          
          <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`flex-1 border-2 border-dashed rounded-xl p-4 min-h-[400px] max-h-[585px] overflow-y-auto transition-all duration-200 ${
              isDragOver 
                ? 'border-[#BC2C2C] bg-[#FDF3F2]/80 scale-[1.01]' 
                : 'border-red-200 bg-[#FDF3F2]/20'
            }`}
          >
            {selectedActivities.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 mt-12">
                <PlusSquare className="w-8 h-8 text-red-200 mb-2" />
                <p className="text-xs font-semibold text-gray-400 max-w-[150px] leading-relaxed">
                  Drag items here or click "+" to add them to the package.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {selectedActivities.map(item => (
                  <div key={item.id} className="bg-white border border-gray-150 rounded-xl p-3 flex justify-between items-center shadow-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></div>
                      <div>
                        <span className="block text-xs font-bold text-gray-900 leading-snug">{item.name}</span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[9px] text-gray-400 font-semibold">{item.category} • {item.duration}</span>
                          {item.difficulty && (
                            <span className="text-[8px] bg-gray-50 text-gray-500 border border-gray-100 font-bold px-1 rounded">
                              {item.difficulty}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black text-gray-900">{formatRupee(item.price)}</span>
                      <button 
                        onClick={() => handleRemoveActivity(item.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors p-1"
                        title="Remove activity"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
