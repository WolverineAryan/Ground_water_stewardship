import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import AddDataForm from "../components/AddDataForm";
import DataTable from "../components/DataTable";
import "../layout/layout.css";

import { useEffect, useState } from "react";
import api from "../services/api";

export default function DataPage() {

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await api.get("/groundwater");
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
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
          <DataTable data={data} refresh={fetchData} />
        </div>
      </div>
    </div>
  );
}
