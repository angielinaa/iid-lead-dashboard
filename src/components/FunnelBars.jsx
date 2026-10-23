import { STATUSES, STATUS_LABELS } from '../lib/leads';

export default function FunnelBars({ counts }) {
  const max = Math.max(1, ...STATUSES.map((s) => counts[s]));
  return (
    <div className="card funnel" style={{ '--i': 1 }}>
      <h2>Sebaran status</h2>
      {STATUSES.map((s) => (
        <div className={`bar-row s-${s}`} key={s}>
          <span className="bar-label">{STATUS_LABELS[s]}</span>
          <div className="bar-track">
            <div className="bar-fill" style={{ width: `${(counts[s] / max) * 100}%` }} />
          </div>
          <span className="bar-num">{counts[s]}</span>
        </div>
      ))}
    </div>
  );
}