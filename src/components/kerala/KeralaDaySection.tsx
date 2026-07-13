import React from 'react';
import { KeralaActivityCard, type KeralaActivity } from './KeralaActivityCard';

export interface KeralaDay {
  dayNumber: string;
  title: string;
  subtitle: string;
  activities: KeralaActivity[];
}

interface Props {
  day: KeralaDay;
}

export function KeralaDaySection({ day }: Props) {
  return (
    <div className="relative pl-12 md:pl-16 mb-12">
      {/* Day Marker Bubble */}
      <div className="absolute left-[-24px] top-0 w-12 h-14 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center z-10">
        <span className="text-[#E65A4B] font-bold text-sm leading-tight">{day.dayNumber}</span>
        <span className="text-gray-500 text-xs font-medium">Day</span>
      </div>

      {/* Header */}
      <div className="mb-6 pt-1">
        <h2 className="text-lg font-bold text-gray-800">{day.title}</h2>
        <p className="text-sm text-gray-500">{day.subtitle}</p>
      </div>

      {/* Activities */}
      <div className="space-y-2">
        {day.activities.map((activity) => (
          <KeralaActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
}
