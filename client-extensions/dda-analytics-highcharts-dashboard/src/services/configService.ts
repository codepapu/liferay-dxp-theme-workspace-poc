import type { DashboardRuntimeConfig } from '@/types/dashboard';

import { resolveHighchartsLicense } from '@/services/licenseResolver';

export function buildRuntimeConfig(
  element: HTMLElement,
  partial?: Partial<DashboardRuntimeConfig>
): DashboardRuntimeConfig {
  const highChartLicense = resolveHighchartsLicense(
    element,
    partial?.highChartLicense ?? null
  );

  const analyticsApiBaseUrl =
    partial?.analyticsApiBaseUrl?.trim() ||
    element.getAttribute('analyticsApiBaseUrl')?.trim() ||
    import.meta.env.VITE_ANALYTICS_API_BASE_URL?.trim();

  return {
    highChartLicense,
    analyticsApiBaseUrl,
  };
}
