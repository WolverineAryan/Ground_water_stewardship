import { useState } from "react";
import api from "../services/api";

export default function ModelTrainer() {

  const [file,setFile] = useState(null);

  const uploadDataset = async () => {

    const formData = new FormData();
    formData.append("file", file);

    await api.post("/ml/train", formData);

    alert("Model trained successfully!");
  };

  return (
    <div className="card">

      <h3>Train ML Model</h3>

      <input
        type="file"
        onChange={(e)=>setFile(e.target.files[0])}
      />

      <button onClick={uploadDataset}>
        Train Model
      </button>

    </div>
  );
}
