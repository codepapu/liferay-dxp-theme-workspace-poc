import type { ReactNode } from 'react';

export function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section className="dda-card">
      <header className="dda-card__head">
        <h2 className="dda-card__title">{title}</h2>
        {subtitle ? <p className="dda-card__sub">{subtitle}</p> : null}
      </header>
      <div>{children}</div>
    </section>
  );
}
