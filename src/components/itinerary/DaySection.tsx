import React from 'react';
import { ActivityCard, type ActivityData } from '../common/ActivityCard';
import { Plus } from 'lucide-react';

export interface DayData {
  id: string;
  dayNumber: number;
  title: string;
  tag: string;
  activities: ActivityData[];
}

interface DaySectionProps {
  day: DayData;
}

export function DaySection({ day }: DaySectionProps) {
  return (
    <div className="mb-12 relative">
      {/* Vertical Timeline Indicator */}
      <div className="absolute left-7 top-[60px] bottom-10 w-0.5 bg-gray-100 -z-10 hidden md:block"></div>

      {/* Day Header */}
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Day {String(day.dayNumber).padStart(2, '0')}: {day.title}
        </h2>
        <span className="px-3 py-1 bg-orange-100/50 text-orange-600 text-[10px] font-bold uppercase tracking-widest rounded-lg">
          {day.tag}
        </span>
      </div>

      {/* Activities */}
      <div className="space-y-4">
        {day.activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>

      {/* Add Activity Button */}
      <button className="w-full mt-4 py-4 border-2 border-dashed border-gray-200 rounded-[24px] text-gray-400 font-medium flex items-center justify-center gap-2 hover:border-gray-300 hover:text-gray-500 transition-colors bg-white/50">
        <Plus className="w-5 h-5" />
        Add Activity to Day {day.dayNumber}
      </button>
    </div>
  );
}
