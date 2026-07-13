import React from 'react';
import { cn } from '../../lib/utils';
import { CheckCircle2, Clock } from 'lucide-react';

export interface AmalfiActivity {
  id: string;
  image: string;
  time: string;
  category: string;
  status: 'Confirmed' | 'Pending Confirmation';
  title: string;
  description: string;
}

interface Props {
  activity: AmalfiActivity;
}

export function AmalfiActivityCard({ activity }: Props) {
  const isConfirmed = activity.status === 'Confirmed';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 flex flex-col sm:flex-row gap-5 mb-5 hover:shadow-md transition-shadow">
      <img 
        src={activity.image} 
        alt={activity.title}
        className="w-full sm:w-[200px] h-[140px] rounded-xl object-cover"
      />
      
      <div className="flex-1 py-1 pr-2">
        <div className="flex flex-wrap justify-between items-start mb-2 gap-2">
          <div className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <span>{activity.time}</span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-500 font-medium">{activity.category}</span>
          </div>
          
          <div className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold",
            isConfirmed 
              ? "bg-emerald-50 text-emerald-600" 
              : "bg-orange-100/60 text-orange-700"
          )}>
            {isConfirmed ? (
              <CheckCircle2 className="w-3.5 h-3.5" />
            ) : (
              <Clock className="w-3.5 h-3.5" />
            )}
            {activity.status}
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-1.5">{activity.title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed max-w-xl">
          {activity.description}
        </p>
      </div>
    </div>
  );
}
