import { useState } from 'react';
import { STATUS_LABELS } from '../lib/leads';

const PAGE_SIZE = 15;

export default function LeadsTable({ leads }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(leads.length / PAGE_SIZE));
  const current = Math.min(page, totalPages); // aman jika filter memperkecil data
  const rows = leads.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  if (leads.length === 0) return <p>Tidak ada lead pada rentang tanggal ini.</p>;

  return (
    <>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>LC</th>
              <th>Status</th>
              <th>Tanggal apply</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((l) => (
              <tr key={l.id}>
                <td>{l.id}</td>
                <td>{l.name}</td>
                <td>{l.lc}</td>
                <td>{STATUS_LABELS[l.status] ?? l.status}</td>
                <td>{l.appliedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pager">
        <button type="button" onClick={() => setPage(current - 1)} disabled={current === 1}>
          Sebelumnya
        </button>
        <span>
          Halaman {current} / {totalPages}
        </span>
        <button type="button" onClick={() => setPage(current + 1)} disabled={current === totalPages}>
          Berikutnya
        </button>
      </div>
    </>
  );
}