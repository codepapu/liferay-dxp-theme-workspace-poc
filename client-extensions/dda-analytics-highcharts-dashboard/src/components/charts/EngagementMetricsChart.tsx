import type { Options } from 'highcharts';
import { useMemo } from 'react';

import {
  ddaCategoryAxisLabelStyle,
  ddaChartCommon,
  ddaGridLine,
  ddaValueAxisLabelStyle,
} from '@/lib/highcharts/chartDefaults';
import { useHighchartsChart } from '@/hooks/useHighchartsChart';
import type { MockDashboard } from '@/model/dashboardModel';
import { sharedLegendStyle, sharedTooltipStyle } from '@/services/analyticsApi';

type Model = MockDashboard['charts']['engagement'];

export default function EngagementMetricsChart({ model }: { model: Model }) {
  const options: Options = useMemo(
    () => ({
      chart: {
        type: 'line',
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
        lineColor: ddaGridLine,
        tickLength: 0,
        gridLineWidth: 0,
        labels: { style: ddaCategoryAxisLabelStyle },
      },
      yAxis: {
        min: 0,
        max: 15,
        tickInterval: 5,
        endOnTick: false,
        title: { text: undefined },
        gridLineWidth: 1,
        gridLineColor: ddaGridLine,
        lineWidth: 0,
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
        line: {
          lineWidth: 1.75,
          marker: {
            enabled: true,
            radius: 4,
            lineWidth: 2,
            lineColor: '#ffffff',
          },
        },
        series: {
          animation: { duration: 780 },
        },
      },
      series: model.series.map((s) => ({
        type: 'spline',
        name: s.name,
        data: s.data,
        color: s.color,
      })),
    }),
    [model]
  );

  const ref = useHighchartsChart(options);
  return <div ref={ref} className="dda-chart-root" />;
}
