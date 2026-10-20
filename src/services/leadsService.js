import { MOCK_LEADS } from '../data/mockLeads';

// Catatan: variabel VITE_* ikut terbundel ke browser, JANGAN taruh rahasia di sini.
const USE_API = import.meta.env.VITE_USE_API === 'true';

export async function fetchLeads() {
  if (!USE_API) {
    await new Promise((resolve) => setTimeout(resolve, 300)); // simulasi jaringan
    return MOCK_LEADS;
  }
  const res = await fetch('/api/leads'); // backend/serverless milikmu, bukan EXPA langsung
  if (!res.ok) throw new Error(`Gagal memuat data (HTTP ${res.status})`);
  return res.json();
}