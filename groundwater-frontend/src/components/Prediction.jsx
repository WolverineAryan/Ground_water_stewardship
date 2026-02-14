import data from "../data/groundwater.json";

export default function Prediction() {
  const last = data[data.length - 1];
  const predicted = last.depth + 3;

  return (
    <div>
      <h2>AI Prediction</h2>
      <p>
        Predicted Groundwater Depth (2024): {predicted} meters
      </p>
      <p>Status: High Risk Zone</p>
    </div>
  );
}
