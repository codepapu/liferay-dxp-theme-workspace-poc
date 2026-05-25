import type { MockDashboard } from '@/model/dashboardModel';

type FilterBlock = MockDashboard['filters'][keyof MockDashboard['filters']];

export function FilterBar({
  filters,
  values,
  onChange,
}: {
  filters: MockDashboard['filters'];
  values: Record<string, string>;
  onChange: (id: string, value: string) => void;
}) {
  const blocks = Object.values(filters) as FilterBlock[];

  return (
    <div className="dda-filters" aria-label="Dashboard filters">
      {blocks.map((f) => (
        <div key={f.id} className="dda-field">
          <label htmlFor={`dda-filter-${f.id}`}>{f.label}</label>
          <select
            id={`dda-filter-${f.id}`}
            value={values[f.id] ?? f.defaultValue}
            onChange={(e) => onChange(f.id, e.target.value)}
          >
            {f.options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
