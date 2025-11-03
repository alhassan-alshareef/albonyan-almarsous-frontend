import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PatientHeader from "../components/Header/PatientHeader";
import { getUserProfile, updateUserProfile } from "../lib/api";
import "../App.css";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [status, setStatus] = useState({ loading: false, message: "", success: false });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await getUserProfile();
        setProfile(data);
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: "", success: false });

    try {
      await updateUserProfile(profile);
      setStatus({
        loading: false,
        message: "Profile updated successfully.",
        success: true,
      });

      setTimeout(() => {
        if (profile.role === "patient") {
          navigate("/patient/posts");
        } else {
          navigate("/posts");
        }
      }, 800);
    } catch (err) {
      console.error("Profile update failed:", err);
      setStatus({
        loading: false,
        message: "Something went wrong.",
        success: false,
      });
    }
  };

  const fields = [
    { label: "Username", name: "username", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "First Name", name: "first_name", type: "text" },
    { label: "Last Name", name: "last_name", type: "text" },
    ...(profile.role === "patient"
      ? [{ label: "Illness", name: "illness", type: "text" }]
      : []),
  ];

  return (
    <div className="patient-page">
      <PatientHeader showSearch={false} />

      <div className="text-center mt-5">
        <h5><strong>My Profile</strong></h5>
        <p className="text-muted">
          {profile.role === "patient" ? "Patient Account" : "Supporter Account"}
        </p>
      </div>

      <form onSubmit={handleSave} className="add-form-box mx-auto mt-4">
        {fields.map(({ label, name, type }) => (
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
              status.success ? "text-success" : "text-danger"
            }`}
          >
            {status.message}
          </p>
        )}
      </form>
    </div>
  );
}
