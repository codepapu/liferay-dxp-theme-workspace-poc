import { createContext } from 'react';

import type { DashboardRuntimeConfig } from '@/types/dashboard';

export const DashboardConfigContext = createContext<DashboardRuntimeConfig | null>(null);
