import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import ChartView from "../components/ChartView";
import ForecastPanel from "../components/ForecastPanel";
import "../layout/layout.css";

import { useEffect, useState } from "react";
import api from "../services/api";

export default function ReportsPage() {

  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/groundwater").then(res => setData(res.data));
  }, []);

  return (
    <div className="app-container">
      <Sidebar />

      <div className="main">
        <Header />

        <div className="content">
          <ChartView data={data}/>
          <ForecastPanel />
        </div>
      </div>
    </div>
  );
}
