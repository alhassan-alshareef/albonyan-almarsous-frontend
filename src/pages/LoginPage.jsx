import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/auth.css";

export default function LoginPage() {
    const [role, setRole] = useState("user");
    const [formData, setFormData] = useState({ username: "", password: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/login/`, { ...formData, role });
            alert("Logged in successfully!");
        } catch (err) {
            console.error(err);
            alert("Login failed. Please check your credentials.");
        }
    };
    
    return (
        <div className="auth-container container-fluid p-0">
            <div className="row g-0 h-100">
                <div className="col-md-6 d-none d-md-block auth-image" />
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <div className="auth-form">
                        <h3 className="fw-bold mb-4 auth-title">Login</h3>

            <div className="btn-group w-100 mb-4 role-toggle" role="group">
                <button type="button" className={`btn w-50 ${role === "user" ? "role-active" : "role-inactive"}`} onClick={() => setRole("user")}>User</button>
                <button type="button" className={`btn w-50 ${role === "patient" ? "role-active" : "role-inactive"}`} onClick={() => setRole("patient")}>Patient</button>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="mb-3"><label className="form-label input-label">Username</label><input type="text" name="username" className="form-control input-field" value={formData.username} onChange={handleChange} required /></div>
                <div className="mb-3"><label className="form-label input-label">Password</label><input type="password" name="password" className="form-control input-field" value={formData.password} onChange={handleChange} required /></div>
                <button type="submit" className="btn primary-btn w-100 mt-2">Login</button>
            </form>

            <p className="text-center mt-3" style={{ color: "#474646" }}>Don’t have an account? <a href="/signup" className="text-decoration-none text-primary">Signup</a></p>
            </div>
        </div>
        </div>
    </div>
    );
}
