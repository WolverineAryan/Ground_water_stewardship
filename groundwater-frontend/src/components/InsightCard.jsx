import { generateInsight } from "../utils/generateInsight";

export default function InsightCard({ data }) {

  const insight = generateInsight(data);

  return (
    <div className="insight-card">
      <h3>AI Insight</h3>
      <p>{insight}</p>
    </div>
  );
}
