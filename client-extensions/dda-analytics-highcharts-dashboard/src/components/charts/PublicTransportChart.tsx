import type { Options } from 'highcharts';
import { useMemo } from 'react';

import {
  ddaChartCommon,
  ddaGridLine,
  ddaValueAxisLabelStyle,
} from '@/lib/highcharts/chartDefaults';
import { useHighchartsChart } from '@/hooks/useHighchartsChart';
import type { MockDashboard } from '@/model/dashboardModel';
import { sharedTooltipStyle } from '@/services/analyticsApi';

type Model = MockDashboard['charts']['publicTransport'];

export default function PublicTransportChart({ model }: { model: Model }) {
  const categories = model.categories;

  const options: Options = useMemo(
    () => ({
      chart: {
        type: 'bar',
        ...ddaChartCommon,
      },
      title: { text: undefined },
      legend: { enabled: false },
      xAxis: {
        min: 0,
        lineWidth: 0,
        tickLength: 0,
        gridLineWidth: 1,
        gridLineColor: ddaGridLine,
        labels: {
          style: ddaValueAxisLabelStyle,
          formatter: function () {
            const v = this.value as number;
            if (v >= 1000) {
              return `${(v / 1000).toFixed(0)}K`;
            }
            return `${v}`;
          },
        },
      },
      yAxis: {
        categories,
        reversed: true,
        title: { text: undefined },
        gridLineWidth: 0,
        lineWidth: 0,
        tickLength: 0,
        labels: { enabled: false },
      },
      tooltip: {
        ...sharedTooltipStyle,
        formatter: function () {
          const idx = this.point.index ?? 0;
          const name = categories[idx] ?? '';
          const y = typeof this.y === 'number' ? this.y : 0;
          const rawColor = this.point.color;
          const c =
            typeof rawColor === 'string'
              ? rawColor
              : typeof this.color === 'string'
                ? this.color
                : '#0055A4';
          return (
            `<span style="font-size:12px;font-weight:600">${name}</span><br/>` +
            `<span style="color:${c}">\u25CF</span> ` +
            `<b>${y.toFixed(0)}M</b> rides`
          );
        },
      },
      plotOptions: {
        bar: {
          borderWidth: 0,
          borderRadius: {
            where: 'end',
            radius: 10,
            scope: 'point',
          },
          pointPadding: 0.14,
          groupPadding: 0.1,
          dataLabels: {
            enabled: true,
            inside: true,
            align: 'left',
            verticalAlign: 'middle',
            x: 12,
            style: {
              color: '#ffffff',
              fontWeight: '600',
              fontSize: '13px',
              textOutline: 'none',
            },
            formatter: function () {
              const idx = this.point.index ?? 0;
              return categories[idx] ?? '';
            },
          },
        },
        series: {
          animation: { duration: 780 },
        },
      },
      series: [
        {
          type: 'bar',
          name: 'Rides',
          data: model.data.map((y, i) => ({
            y,
            color: model.colors[i] ?? model.colors[model.colors.length - 1],
          })),
        },
      ],
    }),
    [categories, model]
  );

  const ref = useHighchartsChart(options);
  return <div ref={ref} className="dda-chart-root" />;
}
