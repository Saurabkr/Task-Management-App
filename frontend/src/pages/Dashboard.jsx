import { useEffect, useState } from "react";
import api from "../api";
import "./Dashboard.css";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    effort: "",
    due_date: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = [];
    if (!form.title || form.title.trim().length < 3) {
      errors.push("Title must be at least 3 characters.");
    }

    if (!form.description || form.description.trim().length < 5) {
      errors.push("Description must be at least 5 characters.");
    }

    const effortValue = parseInt(form.effort);
    if (
      !form.effort ||
      isNaN(effortValue) ||
      effortValue <= 0 ||
      effortValue > 365
    ) {
      errors.push("Effort must be a number between 1 and 365.");
    }

    const selectedDate = new Date(form.due_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (!form.due_date || selectedDate < today) {
      errors.push("Due date must be today or in the future.");
    }

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    try {
      if (editId) {
        await api.put(`/tasks/${editId}`, form);
        setEditId(null);
      } else {
        await api.post("/tasks", form);
      }

      setForm({ title: "", description: "", effort: "", due_date: "" });
      fetchTasks();
    } catch (err) {
      alert("An error occurred while submitting the task.");
    }
  };

  const handleDelete = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const handleExcelExport = async () => {
    const res = await api.get("/tasks/export/excel", { responseType: "blob" });
    const url = URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "tasks.xlsx");
    document.body.appendChild(link);
    link.click();
  };

  const handleExcelUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    await api.post("/tasks/upload/excel", formData);
    fetchTasks();
  };

  const handleEdit = (task) => {
    setForm({
      title: task.title,
      description: task.description,
      effort: task.effort,
      due_date: task.due_date?.slice(0, 10),
    });
    setEditId(task.id);
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setForm({ title: "", description: "", effort: "", due_date: "" });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="dashboard-container">
      <form onSubmit={handleSubmit} className="task-form">
        <div className="task-form-grid">
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="task-input"
          />
          <input
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="task-input"
          />
          <input
            type="number"
            placeholder="Effort (in days)"
            value={form.effort}
            onChange={(e) => setForm({ ...form, effort: e.target.value })}
            className="task-input"
          />
          <input
            type="date"
            value={form.due_date}
            onChange={(e) => setForm({ ...form, due_date: e.target.value })}
            className="task-input"
          />
        </div>
        <div className="task-actions">
          <button className="export-button" type="submit">
            {editId ? "Update Task" : "Add Task"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="task-input"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="dashboard-header">
        <button onClick={handleExcelExport} className="export-button">
          Export Excel
        </button>
        <input
          type="file"
          onChange={handleExcelUpload}
          className="file-input"
        />
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <strong>{task.title}</strong> - {task.description} (Effort:{" "}
            {task.effort}) Due: {task.due_date?.slice(0, 10)}
            <div className="task-buttons">
              <button
                onClick={() => handleEdit(task)}
                className="task-edit-btn"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                className="task-delete-btn"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
