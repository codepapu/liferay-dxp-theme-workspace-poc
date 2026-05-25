import { useEffect, useState } from 'react';

import { applyHighchartsLicense } from '@/lib/highcharts/license';
import { applyHighchartsTheme } from '@/lib/highcharts/theme';
import { loadHighcharts } from '@/lib/highcharts/license';

export function useHighchartsGate(highChartLicense?: string): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const HighchartsNS = await loadHighcharts();
      if (cancelled) {
        return;
      }
      applyHighchartsLicense(HighchartsNS, highChartLicense);
      applyHighchartsTheme(HighchartsNS);
      setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [highChartLicense]);

  return ready;
}
