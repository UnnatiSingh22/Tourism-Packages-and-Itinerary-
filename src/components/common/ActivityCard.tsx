import React from 'react';
import { StatusBadge, type StatusType } from './StatusBadge';
import { cn } from '../../lib/utils';
import { ExternalLink, Download, Edit2, Trash2, Utensils } from 'lucide-react';

export interface ActivityAction {
  label?: string;
  icon?: 'external' | 'download' | 'edit' | 'delete' | 'menu';
  onClick?: () => void;
  type?: 'text' | 'icon' | 'danger';
}

export interface ActivityContext {
  type: 'avatars' | 'tags';
  items?: string[];
  avatars?: { img: string; moreCount?: number }[];
}

export interface ActivityData {
  id: string;
  category: string;
  image: string;
  time: string;
  statusType: StatusType;
  statusLabel: string;
  title: string;
  description: string;
  context: ActivityContext;
  actions: ActivityAction[];
}

interface ActivityCardProps {
  activity: ActivityData;
}

export function ActivityCard({ activity }: ActivityCardProps) {
  const renderIcon = (iconName?: string) => {
    switch (iconName) {
      case 'external': return <ExternalLink className="w-4 h-4" />;
      case 'download': return <Download className="w-4 h-4" />;
      case 'edit': return <Edit2 className="w-4 h-4" />;
      case 'delete': return <Trash2 className="w-4 h-4" />;
      case 'menu': return <Utensils className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="bg-white rounded-[24px] shadow-card p-4 flex flex-col md:flex-row gap-6 mb-4 hover:shadow-soft transition-shadow">
      {/* Left Image Area */}
      <div className="relative w-full md:w-[220px] h-[180px] rounded-2xl overflow-hidden shrink-0">
        <img 
          src={activity.image} 
          alt={activity.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold text-gray-800 tracking-wide uppercase shadow-sm">
          {activity.category}
        </div>
      </div>

      {/* Center & Right Content Area */}
      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="text-sm font-semibold text-gray-500">{activity.time}</span>
            <StatusBadge status={activity.statusType} label={activity.statusLabel} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{activity.title}</h3>
          <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
            {activity.description}
          </p>
        </div>

        {/* Bottom Context and Actions */}
        <div className="flex flex-wrap items-center justify-between mt-4 pt-4 border-t border-gray-50 border-dashed">
          {/* Context Area (Left side of bottom) */}
          <div className="flex items-center gap-2">
            {activity.context.type === 'avatars' && activity.context.avatars && (
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {activity.context.avatars.map((av, i) => (
                    <img key={i} src={av.img} className="w-8 h-8 rounded-full border-2 border-white" alt="avatar" />
                  ))}
                </div>
                {activity.context.avatars[0]?.moreCount && (
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 border-2 border-white flex items-center justify-center text-xs font-bold -ml-2 z-10">
                    +{activity.context.avatars[0].moreCount}
                  </div>
                )}
              </div>
            )}
            
            {activity.context.type === 'tags' && activity.context.items && (
              <div className="flex flex-wrap gap-2">
                {activity.context.items.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-50 text-gray-600 rounded-lg text-xs font-medium border border-gray-100">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Actions Area (Right side of bottom) */}
          <div className="flex items-center gap-2 mt-3 sm:mt-0">
            {activity.actions.map((action, i) => (
              <button 
                key={i}
                onClick={action.onClick}
                className={cn(
                  "flex items-center gap-2 transition-colors",
                  action.type === 'icon' 
                    ? "p-2 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-600"
                    : action.type === 'danger'
                    ? "p-2 bg-red-50 hover:bg-red-100 rounded-full text-red-600"
                    : "px-4 py-2 text-sm font-semibold hover:text-[#E65A4B] text-gray-700"
                )}
              >
                {action.label}
                {renderIcon(action.icon)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
