import { STATUSES, STATUS_LABELS, formatPercent } from '../lib/leads';

export default function StatsGrid({ counts, total, rate }) {
  return (
    <section className="stats" aria-label="Ringkasan lead">
      <div className="card">
        <div className="value">{total}</div>
        <div className="label">Total aplikasi</div>
      </div>
      {STATUSES.map((s) => (
        <div className="card" key={s}>
          <div className="value">{counts[s]}</div>
          <div className="label">{STATUS_LABELS[s]}</div>
        </div>
      ))}
      <div className="card">
        <div className="value">{formatPercent(rate)}</div>
        <div className="label">Conversion rate</div>
      </div>
    </section>
  );
}