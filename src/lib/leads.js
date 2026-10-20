// Urutan status = urutan funnel. Ubah di sini jika definisi EXPA berbeda.
export const STATUSES = ['applied', 'accepted', 'approved', 'realized', 'finished'];

export const STATUS_LABELS = {
  applied: 'Applied',
  accepted: 'Accepted',
  approved: 'Approved',
  realized: 'Realized',
  finished: 'Finished',
};

// Filter berdasarkan tanggal aplikasi (inklusif). Format 'YYYY-MM-DD' aman dibandingkan sebagai string.
export function filterByAppliedDate(leads, from, to) {
  return leads.filter((lead) => {
    if (from && lead.appliedAt < from) return false;
    if (to && lead.appliedAt > to) return false;
    return true;
  });
}

export function countByStatus(leads) {
  const counts = Object.fromEntries(STATUSES.map((s) => [s, 0]));
  for (const lead of leads) {
    if (lead.status in counts) counts[lead.status] += 1;
  }
  return counts;
}

// Conversion = lead yang sudah mencapai status `to` (atau lebih jauh) / lead yang mencapai `from` (atau lebih jauh).
// Mengembalikan null jika pembagi 0 (jangan tampilkan NaN).
export function conversionRate(leads, from = 'applied', to = 'approved') {
  const fromIdx = STATUSES.indexOf(from);
  const toIdx = STATUSES.indexOf(to);
  const reached = (idx) => leads.filter((l) => STATUSES.indexOf(l.status) >= idx).length;
  const base = reached(fromIdx);
  if (base === 0) return null;
  return reached(toIdx) / base;
}

export function formatPercent(value) {
  return value === null ? '-' : `${(value * 100).toFixed(1)}%`;
}