import { useState } from "react";
import api from "../services/api";

export default function Predictor() {

  const [year,setYear] = useState("");
  const [result,setResult] = useState(null);

  const predict = async () => {
    const res = await api.get(`/ml/predict/${year}`);
    setResult(res.data);
  };

  return (
    <div className="card">

      <h3>Predict Groundwater Trend</h3>

      <input
        type="number"
        placeholder="Enter Year"
        onChange={(e)=>setYear(e.target.value)}
      />

      <button onClick={predict}>Predict</button>

      {result && (
        <p>
          Predicted Depth: {result.predicted_depth.toFixed(2)} m
        </p>
      )}

    </div>
  );
}
