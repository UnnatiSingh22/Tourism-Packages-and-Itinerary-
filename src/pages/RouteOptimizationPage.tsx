import React from 'react';
import { RouteMetrics } from '../components/analytics/RouteMetrics';
import { RouteMap } from '../components/analytics/RouteMap';
import { OptimizedRoutesList } from '../components/analytics/OptimizedRoutesList';

export function RouteOptimizationPage() {
  return (
    <div className="animate-in fade-in duration-500 pb-8 h-[calc(100vh-6rem)] flex flex-col">
      <RouteMetrics />
      
      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0 relative">
        <div className="w-full lg:w-[65%] xl:w-[70%] h-full">
          <RouteMap />
        </div>
        
        <div className="w-full lg:w-[35%] xl:w-[30%] h-full relative">
          <OptimizedRoutesList />
        </div>
      </div>
    </div>
  );
}
