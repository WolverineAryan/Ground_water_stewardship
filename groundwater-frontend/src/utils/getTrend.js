export function getTrend(data) {

  if (!data || data.length < 2)
    return { icon: "", text: "No trend data", color: "gray" };

  const latest = data[data.length - 1];
  const previous = data[data.length - 2];

  const diff = latest.depth - previous.depth;

  if (diff > 0) {
    return {
      icon: "↑",
      text: "Increasing Risk",
      color: "#e74c3c"
    };
  }

  if (diff < 0) {
    return {
      icon: "↓",
      text: "Improving Level",
      color: "#2ecc71"
    };
  }

  return {
    icon: "→",
    text: "Stable",
    color: "#f1c40f"
  };
}
