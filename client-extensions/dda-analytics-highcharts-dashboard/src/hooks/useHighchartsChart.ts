import type { RefObject } from 'react';
import { useEffect, useRef } from 'react';

import type { Chart, Options } from 'highcharts';

export function useHighchartsChart(options: Options): RefObject<HTMLDivElement> {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }
    let disposed = false;
    let chart: Chart | undefined;
    let ro: ResizeObserver | undefined;

    void import('highcharts').then((hc) => {
      if (disposed) {
        return;
      }
      chart = hc.default.chart(el, options);
      ro = new ResizeObserver(() => {
        chart?.reflow();
      });
      ro.observe(el);
    });

    return () => {
      disposed = true;
      ro?.disconnect();
      chart?.destroy();
      chart = undefined;
    };
  }, [options]);

  return ref;
}
