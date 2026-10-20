import { describe, it, expect } from 'vitest';
import { filterByAppliedDate, countByStatus, conversionRate, formatPercent } from './leads';
import { generateMockLeads } from '../data/mockLeads';

const sample = [
  { id: 1, status: 'applied', appliedAt: '2026-09-01' },
  { id: 2, status: 'approved', appliedAt: '2026-09-10' },
  { id: 3, status: 'realized', appliedAt: '2026-09-20' },
  { id: 4, status: 'accepted', appliedAt: '2026-10-01' },
];

describe('filterByAppliedDate', () => {
  it('inklusif di kedua batas', () => {
    const r = filterByAppliedDate(sample, '2026-09-10', '2026-09-20');
    expect(r.map((l) => l.id)).toEqual([2, 3]);
  });
  it('tanpa batas mengembalikan semua', () => {
    expect(filterByAppliedDate(sample, '', '')).toHaveLength(4);
  });
});

describe('countByStatus', () => {
  it('jumlah semua status sama dengan jumlah lead', () => {
    const leads = generateMockLeads();
    const total = Object.values(countByStatus(leads)).reduce((a, b) => a + b, 0);
    expect(total).toBe(leads.length);
  });
});

describe('conversionRate', () => {
  it('approved dan seterusnya dibagi semua yang applied dan seterusnya', () => {
    // approved + realized = 2 dari 4
    expect(conversionRate(sample)).toBe(0.5);
  });
  it('mengembalikan null jika tidak ada data', () => {
    expect(conversionRate([])).toBeNull();
    expect(formatPercent(null)).toBe('-');
  });
});

describe('generateMockLeads', () => {
  it('deterministik', () => {
    expect(generateMockLeads(10, 1)).toEqual(generateMockLeads(10, 1));
  });
});