import { useMemo, useState } from 'react';
import { useLeads } from './hooks/useLeads';
import { filterByAppliedDate, countByStatus, conversionRate } from './lib/leads';
import DateFilter from './components/DateFilter';
import StatsGrid from './components/StatsGrid';
import LeadsTable from './components/LeadsTable';

export default function App() {
  const { leads, loading, error, updatedAt } = useLeads();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const invalidRange = Boolean(from && to && from > to);

  const filtered = useMemo(
    () => (invalidRange ? [] : filterByAppliedDate(leads, from, to)),
    [leads, from, to, invalidRange]
  );
  const counts = useMemo(() => countByStatus(filtered), [filtered]);
  const rate = useMemo(() => conversionRate(filtered), [filtered]);

  return (
    <main className="container">
      <h1>IID Lead Dashboard (prototype)</h1>
      <p className="note">
        Data contoh (mock).
        {updatedAt && ` Diperbarui: ${updatedAt.toLocaleString('id-ID')}`}
      </p>

      {loading && <p>Memuat data...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <>
          <DateFilter
            from={from}
            to={to}
            onFromChange={setFrom}
            onToChange={setTo}
            onReset={() => {
              setFrom('');
              setTo('');
            }}
            invalid={invalidRange}
          />
          <StatsGrid counts={counts} total={filtered.length} rate={rate} />
          <LeadsTable leads={filtered} />
        </>
      )}
    </main>
  );
}