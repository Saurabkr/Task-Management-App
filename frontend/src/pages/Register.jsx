import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!form.name) errs.name = "Name is required";
    if (!form.email) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      errs.email = "Invalid email format";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 6)
      errs.password = "Password must be at least 6 characters";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await api.post("/auth/register", form);
      navigate("/");
    } catch (err) {
      setErrors({ general: "User already exist, registration failed." });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h2 className="register-title">Register</h2>
      {errors.general && (
        <p className="register-error-general">{errors.general}</p>
      )}
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="register-input"
      />
      {errors.name && <p className="register-error">{errors.name}</p>}
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="register-input"
      />
      {errors.email && <p className="register-error">{errors.email}</p>}
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="register-input"
      />
      {errors.password && <p className="register-error">{errors.password}</p>}
      <button className="register-button">Register</button>
    </form>
  );
}
