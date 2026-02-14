import { useEffect, useState } from "react";
import api from "../services/api";

import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";

import ChartView from "./ChartView";
import MapView from "./MapView";
import StatCards from "./StatCards";
import AddDataForm from "./AddDataForm";
import DataTable from "./DataTable";
import InsightCard from "./InsightCard";
import "../layout/layout.css";

export default function Dashboard() {
  const [data, setData] = useState([]);

  const fetchData = () => {
    api.get("/groundwater").then((res) => setData(res.data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="app-container">
      <Sidebar />

      <div className="main">
        <Header />

        <div className="content">
          <AddDataForm onDataAdded={fetchData} />
          <StatCards data={data} />
          <MapView data={data} />
          <ChartView data={data} />
          <DataTable data={data} refresh={fetchData} />
          <InsightCard data={data} />
        </div>
      </div>
    </div>
  );
}
