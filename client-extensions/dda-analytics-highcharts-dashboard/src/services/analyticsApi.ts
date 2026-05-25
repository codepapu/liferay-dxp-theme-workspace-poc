import type { Options } from 'highcharts';

/**
 * Future: GET `${base}/analytics/config` with Liferay OAuth2 — returns license server-side.
 * For now the extension uses Liferay widget properties + Vite env (see licenseResolver).
 */
export function fetchAnalyticsRuntimeConfig(_baseUrl: string | undefined): Promise<{
  highChartLicense?: string;
}> {
  return Promise.resolve({});
}

export const sharedTooltipStyle: Options['tooltip'] = {
  backgroundColor: '#ffffff',
  borderWidth: 0,
  borderRadius: 8,
  padding: 12,
  style: {
    color: '#111827',
    fontSize: '13px',
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  shadow: {
    color: 'rgba(15, 23, 42, 0.12)',
    offsetX: 0,
    offsetY: 6,
    opacity: 1,
    width: 20,
  },
};

export const sharedLegendStyle: Options['legend'] = {
  align: 'center',
  verticalAlign: 'bottom',
  itemStyle: {
    color: '#374151',
    fontWeight: '500',
    fontSize: '12px',
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  itemHoverStyle: {
    color: '#111827',
  },
  symbolRadius: 6,
};
