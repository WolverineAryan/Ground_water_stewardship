import { getRisk } from "../utils/riskLevel";
import AnimatedNumber from "./AnimatedNumber";
import { getTrend } from "../utils/getTrend";
import { FaWater } from "react-icons/fa";
import { MdWarning } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

export default function StatCards({ data }) {
  if (!data || data.length === 0) return <p>Loading...</p>;

  const latest = data[data.length - 1];
  const risk = getRisk(latest.depth);
  const trend = getTrend(data);

  return (
    <div className="card-container">
      {/* Depth Card */}
      <div className="card kpi-card">
        <div>
          <h4>Current Depth</h4>

          <p className="kpi-value">
            <AnimatedNumber value={latest.depth} /> m
          </p>

          <p
            style={{
              color: trend.color,
              fontWeight: "bold",
              marginTop: "5px",
            }}
          >
            {trend.icon} {trend.text}
          </p>
        </div>
      </div>

      {/* Risk Card */}
      <div
        className="card kpi-card"
        style={{
          backgroundColor: risk.color,
          color: "white",
        }}
      >
        <MdWarning className="kpi-icon" />

        <div>
          <h4>Risk Status</h4>
          <p className="kpi-value">{risk.label}</p>
        </div>
      </div>

      {/* Location Card */}
      <div className="card kpi-card">
        <FaLocationDot className="kpi-icon green" />

        <div>
          <h4>Location</h4>
          <p className="kpi-value">{latest.location}</p>
        </div>
      </div>
    </div>
  );
}
