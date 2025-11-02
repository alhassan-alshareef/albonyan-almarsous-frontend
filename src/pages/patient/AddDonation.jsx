import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PatientHeader from "../../components/patient/PatientHeader";
import { createDonation } from "../../lib/api";
import "../../App.css";

export default function AddDonation() {
  const [form, setForm] = useState({ title: "", description: "", target: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.target.trim()) {
      setMessage("Title and target are required.");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      await createDonation({
        title: form.title,
        description: form.description || "",
        target_amount: form.target,
      });
      setMessage("Donation created successfully.");
      setForm({ title: "", description: "", target: "" });
      setTimeout(() => navigate("/patient/donations"), 800);
    } catch {
      setMessage("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="patient-page">
      <PatientHeader showSearch={false} showHi={false} />
      <div className="text-center mt-5">
        <h5><strong>Add Donation</strong></h5>
      </div>

      <form onSubmit={handleSubmit} className="add-form-box mx-auto mt-4">
        <label className="add-form-label">Title</label>
        <input
          type="text"
          name="title"
          className="add-form-input"
          placeholder="Enter title"
          value={form.title}
          onChange={handleChange}
        />

        <label className="add-form-label">Description </label>
        <textarea
          name="description"
          className="add-form-textarea"
          placeholder="Write description..."
          value={form.description}
          onChange={handleChange}
        />

        <label className="add-form-label">Target</label>
        <input
          type="number"
          name="target"
          className="add-form-input"
          placeholder="Enter target amount"
          value={form.target}
          onChange={(e) => setForm({ ...form, target: e.target.value })}
        />

        <button type="submit" className="add-form-btn" disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>

        {message && (
          <p className={`mt-2 text-center ${message.includes("success") ? "text-success" : "text-danger"}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
