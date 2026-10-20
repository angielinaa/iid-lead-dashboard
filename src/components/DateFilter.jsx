export default function DateFilter({ from, to, onFromChange, onToChange, onReset, invalid }) {
  return (
    <section className="filter" aria-label="Filter tanggal aplikasi">
      <label>
        Dari tanggal
        <input type="date" value={from} max={to || undefined} onChange={(e) => onFromChange(e.target.value)} />
      </label>
      <label>
        Sampai tanggal
        <input type="date" value={to} min={from || undefined} onChange={(e) => onToChange(e.target.value)} />
      </label>
      <button type="button" onClick={onReset} disabled={!from && !to}>
        Reset
      </button>
      {invalid && <p className="error">Tanggal awal tidak boleh setelah tanggal akhir.</p>}
    </section>
  );
}