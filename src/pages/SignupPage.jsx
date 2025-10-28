import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/signup.css";

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
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    <div className="signup-container container-fluid p-0">
      <div className="row g-0 h-100">
        <div className="col-md-6 d-none d-md-block left-section" />
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <div className="signup-form-wrapper">
            <h3 className="fw-bold mb-4 signup-title">Signup</h3>

            <div className="btn-group w-100 mb-4 toggle-buttons" role="group">
              {["user", "patient"].map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`btn w-50 ${role === type ? "active-role" : "inactive-role"}`}
                  onClick={() => setRole(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {["firstName", "lastName", "email", "username"].map((field) => (
                <div className="mb-3" key={field}>
                  <label className="form-label field-label">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    className="form-control field-input"
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}

              <div className="mb-3">
                <label className="form-label field-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control field-input"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label field-label">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control field-input"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              {role === "patient" && (
                <div className="mb-3">
                  <label className="form-label field-label">Illness Type</label>
                  <input
                    type="text"
                    name="illness"
                    className="form-control field-input"
                    placeholder="Illness Type"
                    value={formData.illness}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              <button type="submit" className="btn submit-btn w-100 mt-2">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

/*
Bootstrap 5 Docs 
https://getbootstrap.com/docs/5.3/forms/overview/
*/