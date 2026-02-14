import { useState } from "react";
import api from "../services/api";

export default function DataTable({ data, refresh }) {

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this record?")) return;

    await api.delete(`/groundwater/${id}`);
    refresh();
  };

  const startEdit = (item) => {
    setEditId(item._id);
    setEditData(item);
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  const saveEdit = async () => {
    await api.put(`/groundwater/${editId}`, editData);
    setEditId(null);
    refresh();
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Groundwater Records</h3>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Location</th>
            <th>Year</th>
            <th>Depth</th>
            <th>Rainfall</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map(item => (

            <tr key={item._id}>

              {editId === item._id ? (
                <>
                  <td>
                    <input
                      name="location"
                      value={editData.location}
                      onChange={handleChange}
                    />
                  </td>

                  <td>
                    <input
                      name="year"
                      value={editData.year}
                      onChange={handleChange}
                    />
                  </td>

                  <td>
                    <input
                      name="depth"
                      value={editData.depth}
                      onChange={handleChange}
                    />
                  </td>

                  <td>
                    <input
                      name="rainfall"
                      value={editData.rainfall}
                      onChange={handleChange}
                    />
                  </td>

                  <td>
                    <button onClick={saveEdit} style={saveBtn}>
                      Save
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{item.location}</td>
                  <td>{item.year}</td>
                  <td>{item.depth}</td>
                  <td>{item.rainfall}</td>

                  <td>
                    <button
                      onClick={() => startEdit(item)}
                      style={editBtn}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(item._id)}
                      style={deleteBtn}
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const editBtn = {
  background: "#3498db",
  color: "white",
  border: "none",
  padding: "6px 10px",
  marginRight: "5px",
  borderRadius: "5px"
};

const deleteBtn = {
  background: "#e74c3c",
  color: "white",
  border: "none",
  padding: "6px 10px",
  borderRadius: "5px"
};

const saveBtn = {
  background: "#2ecc71",
  color: "white",
  border: "none",
  padding: "6px 10px",
  borderRadius: "5px"
};
