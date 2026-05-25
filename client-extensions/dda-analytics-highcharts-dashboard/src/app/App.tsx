import { lazy, Suspense } from 'react';

import { ChartCard } from '@/components/ui/ChartCard';
import { InsightBanner } from '@/components/ui/InsightBanner';
import { useDashboardConfig } from '@/hooks/useDashboardConfig';
import { useHighchartsGate } from '@/hooks/useHighchartsGate';
import { getDashboardDataset } from '@/services/dashboardDataService';

const PassengerAirportChart = lazy(() => import('@/components/charts/PassengerAirportChart'));
const PublicTransportChart = lazy(() => import('@/components/charts/PublicTransportChart'));
const RevenueByProductChart = lazy(() => import('@/components/charts/RevenueByProductChart'));
const EngagementMetricsChart = lazy(() => import('@/components/charts/EngagementMetricsChart'));

export function App() {
  const { highChartLicense } = useDashboardConfig();
  const ready = useHighchartsGate(highChartLicense);
  const dashboard = getDashboardDataset();

  if (!ready) {
    return (
      <div className="dda-shell">
        <div className="dda-shell__inner">
          <div className="dda-skeleton" style={{ minHeight: 420 }} />
        </div>
      </div>
    );
  }

  return (
    <div className="dda-shell dda-shell--figma-dashboard">
      <div className="dda-shell__inner">
        <InsightBanner />
        <Suspense fallback={<div className="dda-skeleton" style={{ minHeight: 420 }} />}>
          <div className="dda-dash-grid">
            <ChartCard
              title={dashboard.charts.passengerAirport.title}
              subtitle={dashboard.charts.passengerAirport.subtitle}
            >
              <PassengerAirportChart model={dashboard.charts.passengerAirport} />
            </ChartCard>
            <ChartCard
              title={dashboard.charts.publicTransport.title}
              subtitle={dashboard.charts.publicTransport.subtitle}
            >
              <PublicTransportChart model={dashboard.charts.publicTransport} />
            </ChartCard>
            <ChartCard
              title={dashboard.charts.revenueByProduct.title}
              subtitle={dashboard.charts.revenueByProduct.subtitle}
            >
              <RevenueByProductChart model={dashboard.charts.revenueByProduct} />
            </ChartCard>
            <ChartCard
              title={dashboard.charts.engagement.title}
              subtitle={dashboard.charts.engagement.subtitle}
            >
              <EngagementMetricsChart model={dashboard.charts.engagement} />
            </ChartCard>
          </div>
        </Suspense>
      </div>
    </div>
  );
}
