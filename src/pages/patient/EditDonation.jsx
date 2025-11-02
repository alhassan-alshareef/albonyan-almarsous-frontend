import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDonation, updateDonation } from "../../lib/api";
import PatientHeader from "../../components/patient/PatientHeader";
import "../../App.css";

export default function EditDonation() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    target_amount: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  // get donation details
  useEffect(() => {
    async function fetchDonation() {
      try {
        const res = await getDonation(id);
        setForm({
          title: res.data.title || "",
          description: res.data.description || "",
          target_amount: res.data.target_amount || "",
        });
      } catch (err) {
        console.log("Error loading donation:", err);
      }
    }
    fetchDonation();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // update donation
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.target_amount.trim()) {
      setMessage("Title and Target are required.");
      return;
    }

    try {
      setLoading(true);
      await updateDonation(id, {
        title: form.title,
        description: form.description || "",
        target_amount: form.target_amount,
      });
      setMessage("Donation updated successfully.");
      setTimeout(() => navigate("/patient/donations"), 800);
    } catch (err) {
      console.log("Update failed:", err);
      setMessage("Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <div className="patient-page">
      <PatientHeader showSearch={false} showHi={false} />
      <div className="text-center mt-5">
        <h5><strong>Edit Donation</strong></h5>
      </div>

      <form onSubmit={handleUpdate} className="add-form-box mx-auto mt-4">
        <label className="add-form-label">Title</label>
        <input
          type="text"
          name="title"
          className="add-form-input"
          placeholder="Enter title"
          value={form.title}
          onChange={handleChange}
        />

        <label className="add-form-label">Description</label>
        <textarea
          name="description"
          className="add-form-textarea"
          placeholder="Write description (optional)"
          value={form.description}
          onChange={handleChange}
        />

        <label className="add-form-label">Target</label>
        <input
          type="number"
          name="target_amount"
          className="add-form-input"
          placeholder="Enter target amount"
          value={form.target_amount}
          onChange={handleChange}
        />

        <button type="submit" className="add-form-btn" disabled={loading}>
          {loading ? "Saving..." : "Save"}
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
