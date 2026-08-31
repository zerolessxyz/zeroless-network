const surfaces = [
  "Compute headroom",
  "Energy grids",
  "Network bandwidth",
  "Solana settlement",
];

export function TrustStrip() {
  return (
    <div className="strip">
      <div className="shell">
        <p className="fine" style={{ textAlign: "center" }}>
          One thesis, four surfaces
        </p>
        <div className="strip-grid">
          {surfaces.map((surface) => (
            <p key={surface} className="strip-item" style={{ textAlign: "center" }}>
              {surface}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
