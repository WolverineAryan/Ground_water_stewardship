import { getRisk } from "./riskLevel";

export function generateInsight(data) {

  if (!data || data.length < 2)
    return "Insufficient data for analysis.";

  const latest = data[data.length - 1];
  const previous = data[data.length - 2];

  const risk = getRisk(latest.depth);

  // trend calculation
  const change = latest.depth - previous.depth;

  let trendText = "";

  if (change > 2)
    trendText = "rapidly declining";
  else if (change > 0)
    trendText = "gradually declining";
  else
    trendText = "stable";

  // risk-based insight
  if (risk.label === "Safe") {
    return `Groundwater levels are ${trendText} but remain within safe limits.`;
  }

  if (risk.label === "Warning") {
    return `Groundwater levels are ${trendText}. Preventive recharge measures are recommended.`;
  }

  return `Groundwater depletion is ${trendText} and the region is currently in a CRITICAL risk zone. Immediate conservation action is required.`;
}
