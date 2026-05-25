import type Highcharts from 'highcharts';

type HighchartsWithLicense = typeof Highcharts & { license?: string };

/**
 * Applies a commercial / OEM Highcharts license key. Use the same value configured in Liferay
 * System Settings → Common Configuration → property name `high-chart-license`
 * (CommonConfiguration#getHighChartLicense).
 */
export function applyHighchartsLicense(HighchartsNS: typeof Highcharts, key?: string): void {
  const trimmed = key?.trim();
  if (!trimmed) {
    return;
  }
  (HighchartsNS as HighchartsWithLicense).license = trimmed;
}

export async function loadHighcharts(): Promise<typeof Highcharts> {
  const mod = await import('highcharts');
  return mod.default;
}
