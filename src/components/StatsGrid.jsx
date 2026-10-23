import { STATUSES, STATUS_LABELS } from '../lib/leads';
import { useCountUp } from '../hooks/useCountUp';

function StatCard({ label, value, index, status }) {
  const animated = useCountUp(value);
  return (
    <div className={`card stat${status ? ` s-${status}` : ''}`} style={{ '--i': index }}>
      <div className="value">{animated}</div>
      <div className="label">{label}</div>
    </div>
  );
}

export default function StatsGrid({ counts, total }) {
  return (
    <section className="stats" aria-label="Ringkasan lead">
      <StatCard label="Total aplikasi" value={total} index={0} />
      {STATUSES.map((s, i) => (
        <StatCard key={s} label={STATUS_LABELS[s]} value={counts[s]} index={i + 1} status={s} />
      ))}
    </section>
  );
}