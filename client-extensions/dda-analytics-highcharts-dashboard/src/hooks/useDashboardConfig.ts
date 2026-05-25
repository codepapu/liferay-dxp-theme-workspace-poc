import { useContext } from 'react';

import { DashboardConfigContext } from '@/context/dashboardConfigContext';
import type { DashboardRuntimeConfig } from '@/types/dashboard';

export function useDashboardConfig(): DashboardRuntimeConfig {
  const ctx = useContext(DashboardConfigContext);
  if (!ctx) {
    throw new Error('useDashboardConfig must be used within DashboardConfigProvider');
  }
  return ctx;
}
