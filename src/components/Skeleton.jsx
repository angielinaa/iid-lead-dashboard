export default function Skeleton() {
  return (
    <div aria-busy="true" aria-label="Memuat data">
      <div className="stats">
        {Array.from({ length: 6 }, (_, i) => (
          <div className="card skeleton" key={i} />
        ))}
      </div>
      <div className="card skeleton tall" />
    </div>
  );
}