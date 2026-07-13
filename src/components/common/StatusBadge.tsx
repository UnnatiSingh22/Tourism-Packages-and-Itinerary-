import React from 'react';
import { cn } from '../../lib/utils';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export type StatusType = 'confirmed' | 'secured' | 'pending';

interface StatusBadgeProps {
  status: StatusType;
  label: string;
  className?: string;
}

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case 'confirmed':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'secured':
        return 'bg-teal-50 text-teal-600 border-teal-100';
      case 'pending':
        return 'bg-orange-50 text-orange-600 border-orange-100';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  const getIcon = () => {
    switch (status) {
      case 'confirmed':
      case 'secured':
        return <CheckCircle2 className="w-3.5 h-3.5 mr-1" />;
      case 'pending':
        return <Clock className="w-3.5 h-3.5 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <div className={cn(
      "inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border",
      getStatusStyles(),
      className
    )}>
      {getIcon()}
      {label}
    </div>
  );
}
