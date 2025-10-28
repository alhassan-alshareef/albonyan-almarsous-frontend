import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/auth.css";

export default function SignupPage() {
  const [role, setRole] = useState("user");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    illness: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/signup/`, { ...formData, role });
      alert("Account created successfully!");
    } catch (err) {
      console.error(err);
      alert("Signup failed. Try again.");
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
              <button type="button" className={`btn w-50 ${role === "user" ? "role-active" : "role-inactive"}`} onClick={() => setRole("user")}>User</button>
              <button type="button" className={`btn w-50 ${role === "patient" ? "role-active" : "role-inactive"}`} onClick={() => setRole("patient")}>Patient</button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3"><label className="form-label input-label">First Name</label><input type="text" name="firstName" className="form-control input-field" value={formData.firstName} onChange={handleChange} required /></div>
              <div className="mb-3"><label className="form-label input-label">Last Name</label><input type="text" name="lastName" className="form-control input-field" value={formData.lastName} onChange={handleChange} required /></div>
              <div className="mb-3"><label className="form-label input-label">Email</label><input type="email" name="email" className="form-control input-field" value={formData.email} onChange={handleChange} required /></div>
              <div className="mb-3"><label className="form-label input-label">Username</label><input type="text" name="username" className="form-control input-field" value={formData.username} onChange={handleChange} required /></div>
              <div className="mb-3"><label className="form-label input-label">Password</label><input type="password" name="password" className="form-control input-field" value={formData.password} onChange={handleChange} required /></div>
              <div className="mb-3"><label className="form-label input-label">Confirm Password</label><input type="password" name="confirmPassword" className="form-control input-field" value={formData.confirmPassword} onChange={handleChange} required /></div>

              {role === "patient" && (
                <div className="mb-3"><label className="form-label input-label">Illness Type</label><input type="text" name="illness" className="form-control input-field" value={formData.illness} onChange={handleChange} required /></div>
              )}

              <button type="submit" className="btn primary-btn w-100 mt-2">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
