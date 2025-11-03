import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { saveTokens, clearTokens } from "../lib/auth.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/auth.css";

export default function LoginPage() {
  const [role, setRole] = useState("supporter");
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/login/`, formData);
      const { access, refresh, user } = res.data;

      saveTokens(access, refresh, user);

      if (user.role !== role) {
        clearTokens();
        setMessage({ type: "danger", text: `This account belongs to a ${user.role}. Please select the correct role.` });
        return;
      }

      setMessage({ type: "success", text: "Login successful! Redirecting..." });
      setTimeout(() => navigate(user.role === "patient" ? "/patient/posts" : "/posts"), 1200);
    } catch (err) {
      console.error(err);
      setMessage({ type: "danger", text: "Invalid username or password." });
    }
  };

  return (
    <div className="auth-container container-fluid p-0">
      <div className="row g-0 h-100">
        <div className="col-md-6 d-none d-md-block auth-image" />
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <div className="auth-form">
            <h3 className="fw-bold mb-4 auth-title">Login</h3>

            <div className="btn-group w-100 mb-4" role="group">
              <button type="button" className={`btn w-50 ${role === "supporter" ? "role-active" : "role-inactive"}`} onClick={() => setRole("supporter")}>User</button>
              <button type="button" className={`btn w-50 ${role === "patient" ? "role-active" : "role-inactive"}`} onClick={() => setRole("patient")}>Patient</button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label input-label">Username</label>
                <input type="text" name="username" className="form-control input-field" value={formData.username} onChange={handleChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label input-label">Password</label>
                <input type="password" name="password" className="form-control input-field" value={formData.password} onChange={handleChange} required />
              </div>

              {message.text && <div className={`alert alert-${message.type} text-center`}>{message.text}</div>}

              <button type="submit" className="btn primary-btn w-100 mt-2">Login</button>
            </form>

            <p className="text-center mt-3 text-muted">
              Don’t have an account? <Link to="/signup" className="text-decoration-none text-primary">Signup</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
