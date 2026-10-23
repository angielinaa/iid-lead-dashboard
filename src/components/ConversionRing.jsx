import { useEffect, useState } from 'react';
import { formatPercent } from '../lib/leads';

const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function ConversionRing({ rate }) {
  const [ready, setReady] = useState(false);

  // Mulai dari kosong lalu terisi, supaya ada animasi saat pertama tampil.
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const progress = ready ? rate ?? 0 : 0;

  return (
    <div className="card ring-card" role="img" aria-label={`Conversion rate ${formatPercent(rate)}`}>
      <svg viewBox="0 0 120 120" className="ring" aria-hidden="true">
        <circle className="ring-bg" cx="60" cy="60" r={RADIUS} />
        <circle
          className="ring-fg"
          cx="60"
          cy="60"
          r={RADIUS}
          style={{ strokeDasharray: CIRCUMFERENCE, strokeDashoffset: CIRCUMFERENCE * (1 - progress) }}
        />
      </svg>
      <div className="ring-text">
        <strong>{formatPercent(rate)}</strong>
        <span>Conversion rate</span>
      </div>
    </div>
  );
}