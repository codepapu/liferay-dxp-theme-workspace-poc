import type { MockDashboard } from '@/model/dashboardModel';
import { dashboardFixture } from '@/model/dashboardModel';

/**
 * Static data: JSON under `src/data/api-samples/` uses the same `{ success, data }`
 * envelope as dataset chart chunks; `buildDashboardFixture.ts` maps rows to chart models.
 */
export function getDashboardDataset(): MockDashboard {
  return dashboardFixture;
}
