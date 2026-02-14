import { useEffect, useState } from "react";
import api from "../services/api";

export default function ForecastChart() {

  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    api.get("/groundwater/forecast")
      .then(res => setForecast(res.data.forecast));
  }, []);

  return (
    <div className="card">
      <h3>ML Forecast (Next 12 Months)</h3>

      {forecast.map((f, i) => (
        <p key={i}>
          {f.month}/{f.year} →
          Level: {f.predicted_level.toFixed(2)} |
          Risk: {f.risk}
        </p>
      ))}
    </div>
  );
}
