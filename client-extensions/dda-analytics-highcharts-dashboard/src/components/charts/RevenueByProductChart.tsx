import type { Options, SeriesOptionsType } from 'highcharts';
import Highcharts from 'highcharts';
import { useMemo } from 'react';

import {
  ddaCategoryAxisLabelStyle,
  ddaChartCommon,
  ddaColumnPlotOptions,
  ddaGridLine,
  ddaValueAxisLabelStyle,
} from '@/lib/highcharts/chartDefaults';
import { useHighchartsChart } from '@/hooks/useHighchartsChart';
import type { MockDashboard } from '@/model/dashboardModel';
import { sharedLegendStyle, sharedTooltipStyle } from '@/services/analyticsApi';

type Model = MockDashboard['charts']['revenueByProduct'];

function segmentColor(base: string, stackIndex: number): string {
  try {
    const c = Highcharts.color(base);
    if (!c) {
      return base;
    }
    const brighten = ([0.12, 0.02, -0.08] as const)[stackIndex] ?? 0;
    return c.brighten(brighten).get() as string;
  } catch {
    return base;
  }
}

export default function RevenueByProductChart({ model }: { model: Model }) {
  const options: Options = useMemo(() => {
    const segmentCount = Math.max(
      1,
      model.products[0]?.quarters[0]?.length ?? 3
    );

    const perProductTotals = model.products.map((p) =>
      Math.max(
        ...p.quarters.map((q) =>
          q.reduce((acc, v) => acc + (typeof v === 'number' ? v : 0), 0)
        ),
        0
      )
    );
    const peak = Math.max(...perProductTotals, 0);
    const yMax = Math.max(5, Math.ceil(peak / 5) * 5);
    const tickInterval = yMax <= 6 ? 1 : yMax <= 12 ? 2 : 5;

    const series: SeriesOptionsType[] = [];

    for (const product of model.products) {
      for (let stackIndex = 0; stackIndex < segmentCount; stackIndex++) {
        const primary = stackIndex === 0;
        series.push({
          type: 'column',
          name: product.name,
          id: primary ? product.id : undefined,
          linkedTo: primary ? undefined : product.id,
          showInLegend: primary,
          stack: product.id,
          data: product.quarters.map((q) => q[stackIndex] ?? 0),
          color: segmentColor(product.color, stackIndex),
        });
      }
    }

    return {
      chart: {
        type: 'column',
        ...ddaChartCommon,
      },
      title: { text: undefined },
      legend: {
        ...sharedLegendStyle,
        marginTop: 14,
      },
      xAxis: {
        categories: model.categories,
        lineWidth: 0,
        tickLength: 0,
        gridLineWidth: 0,
        labels: { style: ddaCategoryAxisLabelStyle },
      },
      yAxis: {
        min: 0,
        max: yMax,
        tickInterval,
        endOnTick: false,
        title: { text: undefined },
        gridLineColor: ddaGridLine,
        labels: {
          style: ddaValueAxisLabelStyle,
          formatter: function () {
            return `${this.value as number}K`;
          },
        },
      },
      tooltip: {
        ...sharedTooltipStyle,
        shared: true,
      },
      plotOptions: {
        column: {
          ...ddaColumnPlotOptions,
          stacking: 'normal',
        },
        series: {
          animation: { duration: 780 },
        },
      },
      series,
    };
  }, [model]);

  const ref = useHighchartsChart(options);
  return <div ref={ref} className="dda-chart-root" />;
}
