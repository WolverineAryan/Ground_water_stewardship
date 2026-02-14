import { useEffect, useState } from "react";
import api from "../services/api";

export default function ForecastPanel() {

  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/groundwater/forecast")
      .then(res => {
        setForecast(res.data.forecast);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading ML Forecast...</p>;

  return (
    <div className="card">
      <h3>AI Groundwater Forecast (Next 12 Months)</h3>

      {forecast.map((f, i) => (
        <div key={i}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "6px 0"
          }}
        >
          <span>{f.month}/{f.year}</span>

          <span>
            Level: {f.predicted_level.toFixed(2)}
          </span>

          <span
            style={{
              color:
                f.risk === "Critical"
                  ? "red"
                  : f.risk === "Warning"
                  ? "orange"
                  : "green",
              fontWeight: "bold"
            }}
          >
            {f.risk}
          </span>
        </div>
      ))}
    </div>
  );
}
