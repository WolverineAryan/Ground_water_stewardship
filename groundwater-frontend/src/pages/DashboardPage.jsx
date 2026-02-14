import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import StatCards from "../components/StatCards";
import MapView from "../components/MapView";
import InsightCard from "../components/InsightCard";
import "../layout/layout.css";

import { useEffect, useState } from "react";
import api from "../services/api";

export default function DashboardPage() {

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
          <StatCards data={data}/>
          <MapView data={data}/>
          <InsightCard data={data}/>
        </div>
      </div>
    </div>
  );
}
