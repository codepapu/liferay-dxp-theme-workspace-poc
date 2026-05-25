import type { Options } from 'highcharts';

/** Shared layout so all dashboard charts align visually. */
export const DDA_CHART_HEIGHT = 320;

export const DDA_CHART_SPACING: [number, number, number, number] = [8, 8, 8, 4];

export const ddaAxisMuted = '#6b7280';
export const ddaGridLine = '#e5e7eb';

export const ddaChartCommon = {
  backgroundColor: 'transparent' as const,
  height: DDA_CHART_HEIGHT,
  spacing: DDA_CHART_SPACING,
};

export const ddaCategoryAxisLabelStyle = {
  color: ddaAxisMuted,
  fontSize: '12px',
  fontWeight: '500',
} as const;

export const ddaValueAxisLabelStyle = {
  color: ddaAxisMuted,
  fontSize: '12px',
} as const;

export const ddaColumnPlotOptions: NonNullable<Options['plotOptions']>['column'] = {
  borderWidth: 0,
  borderRadius: 4,
  pointPadding: 0.06,
  groupPadding: 0.12,
};
