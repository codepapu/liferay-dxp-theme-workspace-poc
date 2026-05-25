/**
 * Resolves the Highcharts license for the browser bundle.
 *
 * Priority:
 * 1. Explicit `highChartLicense` from Liferay Custom Element configuration / React props.
 * 2. HTML attributes `highChartLicense` or `highchartlicense` on the host element.
 * 3. Build-time `import.meta.env.VITE_HIGHCHARTS_LICENSE` (CI / local `.env`).
 *
 * Align the Liferay widget property with **System Settings → Common Configuration → high-chart-license**
 * (`CommonConfiguration#getHighChartLicense`).
 */
export function resolveHighchartsLicense(
  element: HTMLElement,
  explicit?: string | null
): string | undefined {
  const fromExplicit = explicit?.trim();
  const fromAttr =
    element.getAttribute('highChartLicense')?.trim() ||
    element.getAttribute('highchartlicense')?.trim();
  const fromEnv = import.meta.env.VITE_HIGHCHARTS_LICENSE?.trim();

  return fromExplicit || fromAttr || fromEnv || undefined;
}
