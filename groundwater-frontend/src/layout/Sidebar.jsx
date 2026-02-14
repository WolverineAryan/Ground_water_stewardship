import { Link } from "react-router-dom";
import "./layout.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>💧 GW Monitor</h2>

      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/data">Groundwater Data</Link></li>
        <li><Link to="/analytics">ML Analytics</Link></li>
        <li><Link to="/reports">Reports</Link></li>
      </ul>
    </div>
  );
}
