import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  BarChart3, 
  Building,
  HelpCircle,
  LogOut,
  UserSquare2,
  Store,
  Settings,
  Bot,
  Globe
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useLocation } from 'react-router-dom';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard/command-center', subItems: [
    { label: 'Command Center', path: '/dashboard/command-center' },
    { label: 'Departure Dashboard', path: '/dashboard/departures' },
    { label: 'Resource Allocation', path: '/dashboard/resources' }
  ]},
  { icon: Globe, label: 'Tourism', path: '/tourism/operations', subItems: [
    { label: 'Operations Dashboard', path: '/tourism/operations' },
    { label: 'Approval Center', path: '/tourism/approvals' },
    { label: 'Package Builder', path: '/tourism/builder' }
  ]},
  { icon: UserSquare2, label: 'CRM', path: '/crm/drivers', subItems: [
    { label: 'Driver Schedule', path: '/crm/drivers' }
  ]},
  { icon: Store, label: 'Sales', path: '/sales/dynamic-pricing', subItems: [
    { label: 'Dynamic Pricing Center', path: '/sales/dynamic-pricing' },
    { label: 'Pricing Rules', path: '/sales/pricing' }
  ]},
  { icon: BarChart3, label: 'Analytics', path: '/analytics/destinations', subItems: [
    { label: 'Destination Performance', path: '/analytics/destinations' },
    { label: 'Fleet Utilization', path: '/analytics/fleet' },
    { label: 'Travel Compliance', path: '/analytics/compliance' },
    { label: 'Transport Performance', path: '/analytics/performance' },
    { label: 'Seasonal Pricing', path: '/analytics/pricing' },
    { label: 'Route Optimization', path: '/analytics/routes' },
    { label: 'Incident Reports', path: '/analytics/incidents' }
  ]},
  { icon: Calendar, label: 'Events', path: '/events/itinerary-builder', subItems: [
    { label: 'Itinerary Builder', path: '/events/itinerary-builder' },
    { label: 'Golden Triangle', path: '/events/itinerary' },
    { label: 'Kerala Backwaters', path: '/events/amalfi' }
  ]},
  { icon: Users, label: 'Guests', path: '/guests/waitlist', subItems: [
    { label: 'Waitlist Management', path: '/guests/waitlist' },
    { label: 'Guest Profile', path: '/guests/profile' },
    { label: 'Check-In Dashboard', path: '/guests/checkin' }
  ]},
  { icon: Store, label: 'Vendors', path: '/vendors/comparison', subItems: [
    { label: 'Supplier Comparison', path: '/vendors/comparison' }
  ]},
  { icon: Building, label: 'Fleet', path: '/fleet/inspection', subItems: [
    { label: 'Vehicle Inspection', path: '/fleet/inspection' }
  ]},
  { icon: Bot, label: 'AI Hub', path: '/ai-hub' },
  { icon: Settings, label: 'Administration', path: '/settings', subItems: [
    { label: 'Master Data Management', path: '/settings' }
  ]},
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="w-[240px] h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0 overflow-y-auto">
      <div className="p-8 pb-4 shrink-0">
        <h1 className="text-sm font-semibold text-[#8B2020] tracking-tight leading-tight">EventHub360</h1>
        <p className="text-xs text-gray-500 font-medium">Premium Concierge</p>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4 pb-8">
        {navItems.map((item) => {
          const isParentActive = item.path.split('/')[1] === location.pathname.split('/')[1] && location.pathname !== '/';
          
          return (
            <div key={item.path} className="mb-1">
              <NavLink
                to={item.path}
                className={() =>
                  cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors",
                    isParentActive
                      ? "bg-[#FDF3F2] text-[#E65A4B]"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  )
                }
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </NavLink>
              
              {isParentActive && item.subItems && (
                <div className="ml-11 mt-1 flex flex-col space-y-1 relative before:absolute before:left-[-15px] before:top-0 before:bottom-4 before:w-[1px] before:bg-red-100">
                  {item.subItems.map(subItem => (
                    <NavLink
                      key={subItem.path}
                      to={subItem.path}
                      className={({ isActive }) => cn(
                        "text-[12px] py-1.5 px-2 rounded-lg transition-colors relative before:absolute before:left-[-15px] before:top-1/2 before:w-[11px] before:h-[1px] before:bg-red-100",
                        isActive ? "text-[#E65A4B] font-bold bg-[#FDF3F2]" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50 font-medium"
                      )}
                    >
                      {subItem.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 flex flex-col gap-2 border-t border-gray-100 mt-auto">
        <button className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors">
          <HelpCircle className="w-5 h-5" />
          Help Center
        </button>
        
        <button className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors mt-auto">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}

