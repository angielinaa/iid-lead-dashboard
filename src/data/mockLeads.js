// Generator mock data deterministik: seed sama -> data sama, sehingga tes stabil.
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const FIRST = ['Alya', 'Bima', 'Citra', 'Dimas', 'Eka', 'Fajar', 'Gita', 'Hadi', 'Intan', 'Joko', 'Kirana', 'Lintang', 'Maya', 'Naufal', 'Olivia', 'Putra', 'Qori', 'Rani', 'Satria', 'Tara'];
const LAST = ['Pratama', 'Wijaya', 'Santoso', 'Lestari', 'Hidayat', 'Putri', 'Nugraha', 'Saputra', 'Rahma', 'Kusuma'];
const LCS = ['LC A', 'LC B', 'LC C', 'LC D', 'LC E'];
// Bobot peluang tiap status (total 1.0)
const STATUS_WEIGHTS = [
  ['applied', 0.35],
  ['accepted', 0.25],
  ['approved', 0.18],
  ['realized', 0.12],
  ['finished', 0.1],
];

function pick(rand, list) {
  return list[Math.floor(rand() * list.length)];
}

function pickStatus(rand) {
  const r = rand();
  let acc = 0;
  for (const [status, weight] of STATUS_WEIGHTS) {
    acc += weight;
    if (r < acc) return status;
  }
  return STATUS_WEIGHTS[STATUS_WEIGHTS.length - 1][0];
}

export function generateMockLeads(count = 240, seed = 2026) {
  const rand = mulberry32(seed);
  const base = new Date('2026-10-01T00:00:00Z');
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(base);
    d.setUTCDate(d.getUTCDate() - Math.floor(rand() * 120)); // 120 hari ke belakang
    return {
      id: i + 1,
      name: `${pick(rand, FIRST)} ${pick(rand, LAST)}`, // nama karangan, bukan orang sungguhan
      lc: pick(rand, LCS),
      status: pickStatus(rand),
      appliedAt: d.toISOString().slice(0, 10), // 'YYYY-MM-DD'
    };
  });
}

export const MOCK_LEADS = generateMockLeads();