import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

import { getRisk } from "../utils/riskLevel";

export default function ChartView({ data }) {

  if (!data.length) return null;

  const latest = data[data.length - 1];
  const risk = getRisk(latest.depth);

  return (
    <LineChart width={700} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" />
      <YAxis />
      <Tooltip />

      <Line
        type="monotone"
        dataKey="depth"
        stroke={risk.color}
        strokeWidth={3}
      />
    </LineChart>
  );
}
