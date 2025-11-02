import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PatientHeader from "../components/patient/PatientHeader";
import { getUserProfile, updateUserProfile } from "../lib/api";
import "../App.css";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [status, setStatus] = useState({ loading: false, message: "" });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getUserProfile();
        setProfile(data);
      } catch {
        console.error("Failed to load profile");
      }
    })();
  }, []);

  const handleChange = ({ target: { name, value } }) =>
    setProfile((prev) => ({ ...prev, [name]: value }));

  const handleSave = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: "" });

    try {
      await updateUserProfile(profile);
      setStatus({ loading: false, message: "Profile updated successfully." });
      setTimeout(() => navigate("/patient/posts"), 800);
    } catch {
      setStatus({ loading: false, message: "Something went wrong." });
    }
  };

  const commonFields = [
    { label: "Username", name: "username", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "First Name", name: "first_name", type: "text" },
    { label: "Last Name", name: "last_name", type: "text" },
  ];

  const patientFields =
    profile.role === "patient"
      ? [...commonFields, { label: "Illness", name: "illness", type: "text" }]
      : commonFields;


  return (
    <div className="patient-page">
      <PatientHeader showSearch={false} />

      <div className="text-center mt-5">
        <h5><strong>My Profile</strong></h5>
        <p className="text-muted">{profile.role === "patient" ? "Patient Account" : "Supporter Account"}</p>
      </div>

      <form onSubmit={handleSave} className="add-form-box mx-auto mt-4">
        {patientFields.map(({ label, name, type }) => (
          <div key={name}>
            <label className="add-form-label">{label}</label>
            <input
              type={type}
              name={name}
              className="add-form-input"
              value={profile[name] || ""}
              onChange={handleChange}
            />
          </div>
        ))}

        <button
          type="submit"
          className="add-form-btn"
          disabled={status.loading}
        >
          {status.loading ? "Saving..." : "Save"}
        </button>

        {status.message && (
          <p
            className={`mt-2 text-center ${
              status.message.includes("success") ? "text-success" : "text-danger"
            }`}
          >
            {status.message}
          </p>
        )}
      </form>
    </div>
  );
}