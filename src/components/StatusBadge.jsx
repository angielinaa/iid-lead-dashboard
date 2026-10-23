import { STATUS_LABELS } from '../lib/leads';

export default function StatusBadge({ status }) {
  return <span className={`badge s-${status}`}>{STATUS_LABELS[status] ?? status}</span>;
}
