export function getRisk(depth) {

  if (depth <= 15)
    return { label: "Safe", color: "#2ecc71" };

  if (depth <= 25)
    return { label: "Warning", color: "#f1c40f" };

  return { label: "Critical", color: "#e74c3c" };
}
