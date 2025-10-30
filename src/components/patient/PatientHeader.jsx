import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearTokens } from "../../lib/auth";
import { getUserProfile } from "../../lib/api";
import "../shared/header.css";

const PatientHeader = ({ showSearch = true , showHi = true }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profile, setProfile] = useState({ username: "", illness: "" });

  useEffect(() => {
    (async () => {
      try {
        const res = await getUserProfile();
        const data = res.data;
        setProfile({
          username: data.username || "Guest",
          illness: data.illness || "Unknown",
        });
      } catch (err) {
        console.error("Profile load failed:", err);
      }
    })();
  }, []);

  const handleLogout = () => {
    clearTokens();
    navigate("/");
  };

  return (
    <header className="main-header">
      <div className="d-flex align-items-center position-relative">
        <div className="profile-circle" onClick={() => setMenuOpen(!menuOpen)} />
        <div className="ms-3">
          <p className="user-name mb-0">
            {showHi ? `Hi ${profile.username}` : profile.username}
          </p>
          <p className="user-subinfo mb-0">#{profile.illness}</p>
        </div>

        {menuOpen && (
          <div className="dropdown-menu-custom">
            <p onClick={() => navigate("/patient/account")}>My Account</p>
            <p onClick={handleLogout} className="logout-text">
              Logout
            </p>
          </div>
        )}
      </div>

      {showSearch && (
        <div className="search-box">
          <input type="text" className="search-input" placeholder="Search your posts..." />
        </div>
      )}
    </header>
  );
};
export default PatientHeader;