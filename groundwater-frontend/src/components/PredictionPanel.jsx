import { useState } from "react";
import api from "../services/api";

export default function PredictionPanel() {

  const [result, setResult] = useState(null);

  const predict = async () => {

    const res = await api.post("/groundwater/ml-predict", {
      location: "Nashik",
      year: 2026,
      rainfall: 700
    });

    setResult(res.data);
  };

  return (
    <div className="card">
      <h3>ML Prediction</h3>

      <button onClick={predict}>
        Predict Future Level
      </button>

      {result && (
        <p>
          Predicted Depth: {result.predicted_depth.toFixed(2)} m
        </p>
      )}
    </div>
  );
}
