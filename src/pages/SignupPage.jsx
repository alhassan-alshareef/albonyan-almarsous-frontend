import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/auth.css";

export default function SignupPage() {
  const [role, setRole] = useState("supporter");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    confirm_password: "",
    illness: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (formData.password !== formData.confirm_password) {
      setMessage({ type: "danger", text: "Passwords do not match!" });
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/signup/`, { ...formData, role });
      setMessage({ type: "success", text: "Account created successfully! Redirecting..." });

      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error(err);


      const errorMessage =
        err.response?.data?.error ||
        (Array.isArray(err.response?.data) ? err.response.data.join(", ") : null) ||
        "Signup failed. Please check your input.";

      setMessage({ type: "danger", text: errorMessage });
    }
  };

  return (
    <div className="auth-container container-fluid p-0">
      <div className="row g-0 h-100">

        <div className="col-md-6 d-none d-md-block auth-image" />

        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <div className="auth-form">
            <h3 className="fw-bold mb-4 auth-title">Signup</h3>

            <div className="btn-group w-100 mb-4 role-toggle" role="group">
              <button
                type="button"
                className={`btn w-50 ${role === "supporter" ? "role-active" : "role-inactive"}`}
                onClick={() => setRole("supporter")}
              >
                User
              </button>
              <button
                type="button"
                className={`btn w-50 ${role === "patient" ? "role-active" : "role-inactive"}`}
                onClick={() => setRole("patient")}
              >
                Patient
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-3"><label className="form-label input-label">First Name</label><input type="text" name="first_name" className="form-control input-field" value={formData.first_name} onChange={handleChange} required /></div>
              <div className="mb-3"><label className="form-label input-label">Last Name</label><input type="text" name="last_name" className="form-control input-field" value={formData.last_name} onChange={handleChange} required /></div>
              <div className="mb-3"><label className="form-label input-label">Email</label><input type="email" name="email" className="form-control input-field" value={formData.email} onChange={handleChange} required /></div>
              <div className="mb-3"><label className="form-label input-label">Username</label><input type="text" name="username" className="form-control input-field" value={formData.username} onChange={handleChange} required /></div>
              <div className="mb-3"><label className="form-label input-label">Password</label><input type="password" name="password" className="form-control input-field" value={formData.password} onChange={handleChange} required /></div>
              <div className="mb-3"><label className="form-label input-label">Confirm Password</label><input type="password" name="confirm_password" className="form-control input-field" value={formData.confirm_password} onChange={handleChange} required /></div>

              {role === "patient" && (
                <div className="mb-3"><label className="form-label input-label">Illness Type</label><input type="text" name="illness" className="form-control input-field" value={formData.illness} onChange={handleChange} required /></div>
              )}

              {message.text && (
                <div className={`alert alert-${message.type} text-center`}>
                  {message.text}
                </div>
              )}

              <button type="submit" className="btn primary-btn w-100 mt-2">Signup</button>
            </form>

            <p className="text-center mt-3 text-muted">
              Already have an account?{" "}
              <Link to="/login" className="text-decoration-none text-primary">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
