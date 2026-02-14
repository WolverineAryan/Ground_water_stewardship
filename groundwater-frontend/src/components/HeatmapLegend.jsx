export default function HeatmapLegend() {

  return (
    <div className="heatmap-legend">

      <h4>Groundwater Risk</h4>

      <div className="legend-item">
        <span className="legend-color green"></span>
        Safe (0–15 m)
      </div>

      <div className="legend-item">
        <span className="legend-color yellow"></span>
        Warning (15–25 m)
      </div>

      <div className="legend-item">
        <span className="legend-color red"></span>
        Critical (&gt;25 m)
      </div>

    </div>
  );
}
