import { useState } from "react";
import api from "../services/api";

export default function AddDataForm({ onDataAdded }) {

  const [form, setForm] = useState({
    location: "",
    year: "",
    depth: "",
    rainfall: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/groundwater", form);

      alert("Record Added ✅");

      setForm({
        location: "",
        year: "",
        depth: "",
        rainfall: ""
      });

      onDataAdded(); // refresh dashboard
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}
      style={formStyle}>

      <h3>Add Groundwater Record</h3>

      <input
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
        required
      />

      <input
        name="year"
        type="number"
        placeholder="Year"
        value={form.year}
        onChange={handleChange}
        required
      />

      <input
        name="depth"
        type="number"
        placeholder="Depth (m)"
        value={form.depth}
        onChange={handleChange}
        required
      />

      <input
        name="rainfall"
        type="number"
        placeholder="Rainfall"
        value={form.rainfall}
        onChange={handleChange}
      />

      <button type="submit">Add Record</button>
    </form>
  );
}

const formStyle = {
  display: "flex",
  gap: "10px",
  marginBottom: "20px",
  flexWrap: "wrap"
};
