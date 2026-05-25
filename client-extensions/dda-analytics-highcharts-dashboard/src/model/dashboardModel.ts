import { buildDashboardFixture } from '@/model/buildDashboardFixture';

export const dashboardFixture = buildDashboardFixture();

export type MockDashboard = typeof dashboardFixture;

export type KpiTone = MockDashboard['kpis'][number]['tone'];
