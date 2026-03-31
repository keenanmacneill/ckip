export default function MapLegend() {
  return (
    <div className="dashboard-map-legend dashboard-map-legend-bottom-left">
      <div>
        <span className="dashboard-legend-dot dashboard-legend-critical"></span>
        Critical
      </div>
      <div>
        <span className="dashboard-legend-dot dashboard-legend-attention"></span>
        Attention
      </div>
      <div>
        <span className="dashboard-legend-dot dashboard-legend-routine"></span>
        Routine
      </div>
    </div>
  );
}
