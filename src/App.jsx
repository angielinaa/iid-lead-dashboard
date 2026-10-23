import { useMemo, useState } from 'react';
import { useLeads } from './hooks/useLeads';
import { filterByAppliedDate, countByStatus, conversionRate } from './lib/leads';
import DateFilter from './components/DateFilter';
import StatsGrid from './components/StatsGrid';
import ConversionRing from './components/ConversionRing';
import FunnelBars from './components/FunnelBars';
import LeadsTable from './components/LeadsTable';
import Skeleton from './components/Skeleton';

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
    <>
      <header className="hero">
        <div className="container">
          <p className="eyebrow">AIESEC in Indonesia &middot; IID</p>
          <h1>Lead Dashboard</h1>
          <p className="subtitle">
            Pantau aplikasi, status, dan conversion rate dalam satu halaman.
            <span className="pill">Prototype &middot; data mock</span>
          </p>
          {updatedAt && <p className="updated">Diperbarui {updatedAt.toLocaleString('id-ID')}</p>}
        </div>
      </header>

      <main className="container">
        {loading && <Skeleton />}
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}

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
            <StatsGrid counts={counts} total={filtered.length} />
            <section className="overview">
              <ConversionRing rate={rate} />
              <FunnelBars counts={counts} />
            </section>
            <LeadsTable leads={filtered} />
          </>
        )}
      </main>
    </>
  );
}