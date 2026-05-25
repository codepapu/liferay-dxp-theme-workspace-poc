import type { ReactNode } from 'react';

import { DashboardConfigContext } from '@/context/dashboardConfigContext';
import type { DashboardRuntimeConfig } from '@/types/dashboard';

export function DashboardConfigProvider({
  value,
  children,
}: {
  value: DashboardRuntimeConfig;
  children: ReactNode;
}) {
  return <DashboardConfigContext.Provider value={value}>{children}</DashboardConfigContext.Provider>;
}
