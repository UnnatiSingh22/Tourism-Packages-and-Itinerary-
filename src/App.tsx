import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { ItineraryDetailsPage } from './pages/ItineraryDetailsPage';
import { CheckInDashboardPage } from './pages/CheckInDashboardPage';

import { KeralaItineraryPage } from './pages/KeralaItineraryPage';
import { PricingRulesPage } from './pages/PricingRulesPage';
import { RouteOptimizationPage } from './pages/RouteOptimizationPage';
import { VehicleInspectionPage } from './pages/VehicleInspectionPage';
import { IncidentReportsPage } from './pages/IncidentReportsPage';
import { TransportationPerformancePage } from './pages/TransportationPerformancePage';
import { ItineraryBuilderPage } from './pages/ItineraryBuilderPage';
import { TravelCompliancePage } from './pages/TravelCompliancePage';
import { SupplierComparisonPage } from './pages/SupplierComparisonPage';
import { DriverSchedulePage } from './pages/DriverSchedulePage';
import { ResourceAllocationPage } from './pages/ResourceAllocationPage';
import { FleetUtilizationPage } from './pages/FleetUtilizationPage';

// New Pages
import { WaitlistManagementPage } from './pages/WaitlistManagementPage';
import { GuestProfilePage } from './pages/GuestProfilePage';
import { TravelPackageApprovalPage } from './pages/TravelPackageApprovalPage';
import { SeasonalPricingPage } from './pages/SeasonalPricingPage';

// Batch 3 Pages
import { DepartureDashboardPage } from './pages/DepartureDashboardPage';
import { TourOperationsPage } from './pages/TourOperationsPage';
import { DynamicPricingPage } from './pages/DynamicPricingPage';
import { PackageBuilderPage } from './pages/PackageBuilderPage';

// Batch 4 Pages
import { DestinationPerformancePage } from './pages/DestinationPerformancePage';
import { CommandCenterPage } from './pages/CommandCenterPage';
import { AIHubPage } from './pages/AIHubPage';

// Master Data context & page
import { MasterDataProvider } from './context/MasterDataContext';
import { MastersPage } from './pages/MastersPage';

// Currency context
import { CurrencyProvider } from './context/CurrencyContext';

function App() {
  return (
    <MasterDataProvider>
      <CurrencyProvider>
        <BrowserRouter>
          <Routes>
            {/* Everything uses the shared shell */}
            <Route
              path="*"
              element={
                <AppLayout>
                  <Routes>
                    <Route path="/" element={<Navigate to="/guests/waitlist" replace />} />
                    <Route path="/settings" element={<MastersPage />} />
                    <Route path="/guests/checkin" element={<CheckInDashboardPage />} />
                    <Route path="/events/itinerary" element={<ItineraryDetailsPage />} />
                    <Route path="/events/amalfi" element={<KeralaItineraryPage />} />
                    <Route path="/events/itinerary-builder" element={<ItineraryBuilderPage />} />
                    <Route path="/sales/pricing" element={<PricingRulesPage />} />
                    <Route path="/analytics/routes" element={<RouteOptimizationPage />} />
                    <Route path="/analytics/incidents" element={<IncidentReportsPage />} />
                    <Route path="/analytics/performance" element={<TransportationPerformancePage />} />
                    <Route path="/analytics/compliance" element={<TravelCompliancePage />} />
                    <Route path="/analytics/fleet" element={<FleetUtilizationPage />} />
                    <Route path="/analytics/pricing" element={<SeasonalPricingPage />} />
                    <Route path="/vendors/comparison" element={<SupplierComparisonPage />} />
                    <Route path="/crm/drivers" element={<DriverSchedulePage />} />
                    <Route path="/dashboard/resources" element={<ResourceAllocationPage />} />
                    <Route path="/fleet/inspection" element={<VehicleInspectionPage />} />

                    <Route path="/guests/waitlist" element={<WaitlistManagementPage />} />
                    <Route path="/guests/profile" element={<GuestProfilePage />} />
                    <Route path="/tourism/approvals" element={<TravelPackageApprovalPage />} />

                    <Route path="/dashboard/departures" element={<DepartureDashboardPage />} />
                    <Route path="/tourism/operations" element={<TourOperationsPage />} />
                    <Route path="/sales/dynamic-pricing" element={<DynamicPricingPage />} />
                    <Route path="/tourism/builder" element={<PackageBuilderPage />} />

                    <Route path="/analytics/destinations" element={<DestinationPerformancePage />} />
                    <Route path="/dashboard/command-center" element={<CommandCenterPage />} />
                    <Route path="/ai-hub" element={<AIHubPage />} />

                    <Route path="*" element={<Navigate to="/dashboard/command-center" replace />} />
                  </Routes>
                </AppLayout>
              }
            />
          </Routes>
        </BrowserRouter>
      </CurrencyProvider>
    </MasterDataProvider>
  );
}

export default App;
