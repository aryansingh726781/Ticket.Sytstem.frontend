import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import "./Register.css"; // ✅ same style file like Login.css

export default function Register() {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [error, setError] = useState(null);
  const nav = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const config = {};
      if (user?.token) {
        config.headers = { Authorization: `Bearer ${user.token}` };
      }
      await api.post("/auth/register", form, config);
      nav("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Register</h2>

        <div className="input-group">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        {user?.role === "admin" && (
          <div className="input-group">
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="user">User</option>
              <option value="support">Support</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        )}

        <button type="submit" className="btn-auth">Register</button>

        {error && <div className="error-msg">{error}</div>}

        <p className="redirect-text">
          Already have an account?{" "}
          <span onClick={() => nav("/login")}>Login</span>
        </p>
      </form>
    </div>
  );
}
