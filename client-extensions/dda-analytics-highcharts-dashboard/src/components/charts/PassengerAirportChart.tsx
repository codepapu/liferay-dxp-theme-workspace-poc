import type { Options } from 'highcharts';
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
import { sharedTooltipStyle } from '@/services/analyticsApi';

type Model = MockDashboard['charts']['passengerAirport'];

export default function PassengerAirportChart({ model }: { model: Model }) {
  const options: Options = useMemo(
    () => ({
      chart: {
        type: 'column',
        ...ddaChartCommon,
      },
      title: { text: undefined },
      legend: { enabled: false },
      xAxis: {
        categories: model.categories,
        lineWidth: 0,
        tickLength: 0,
        gridLineWidth: 0,
        labels: { style: ddaCategoryAxisLabelStyle },
      },
      yAxis: {
        min: 0,
        max: 100,
        tickInterval: 20,
        title: { text: undefined },
        gridLineColor: ddaGridLine,
        gridLineWidth: 1,
        lineWidth: 0,
        labels: {
          style: ddaValueAxisLabelStyle,
          formatter: function () {
            return `${this.value as number}M`;
          },
        },
      },
      tooltip: {
        ...sharedTooltipStyle,
        shared: false,
        headerFormat: '<span style="font-size:12px;color:#6b7280">{point.key}</span><br/>',
        pointFormat:
          '<span style="color:{point.color}">\u25CF</span> {series.name}: ' +
          '<b>{point.y:.1f} M</b><br/>',
      },
      plotOptions: {
        column: {
          ...ddaColumnPlotOptions,
          pointPadding: 0.1,
          groupPadding: 0.14,
        },
        series: {
          animation: { duration: 780 },
        },
      },
      series: model.series.map((s) => ({
        type: 'column',
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
