import type { MockDashboard } from '@/model/dashboardModel';

function deltaClass(tone: MockDashboard['kpis'][number]['tone']): string {
  if (tone === 'positive') {
    return 'dda-kpi__delta dda-kpi__delta--positive';
  }
  if (tone === 'negative') {
    return 'dda-kpi__delta dda-kpi__delta--negative';
  }
  return 'dda-kpi__delta dda-kpi__delta--neutral';
}

export function KpiStrip({ kpis }: { kpis: MockDashboard['kpis'] }) {
  return (
    <div className="dda-kpis" role="list">
      {kpis.map((k) => (
        <article key={k.id} className="dda-kpi" role="listitem">
          <p className="dda-kpi__label">{k.label}</p>
          <p className="dda-kpi__value">{k.value}</p>
          <p className={deltaClass(k.tone)}>
            {k.deltaLabel}: {k.delta}
          </p>
        </article>
      ))}
    </div>
  );
}
