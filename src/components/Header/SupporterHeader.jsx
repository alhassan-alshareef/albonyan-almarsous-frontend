import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearTokens } from "../../lib/auth";
import { getUserProfile } from "../../lib/api";
import "../shared/header.css";

const SupporterHeader = ({ showSearch = true, showHi = true, onSearch }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profile, setProfile] = useState({ username: "", id: "" });

  useEffect(() => {
    (async () => {
      try {
        const res = await getUserProfile();
        const data = res.data;
        setProfile({
          username: data.username || data.user?.username || "Guest",
          id: data.user?.id || data.id || "—",
        });
      } catch (err) {
        console.error("Profile load failed:", err);
      }
    })();
  }, []);

  const handleLogout = () => {
    clearTokens();
    navigate("/login");
  };

  return (
    <header className="main-header">
      <div className="d-flex align-items-center position-relative">
        <div className="profile-circle" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="material-symbols-outlined">account_circle</span>
        </div>
        <div className="ms-3">
          <p className="user-name mb-0">
            {showHi ? `Hi ${profile.username}` : profile.username}
          </p>
          <p className="user-subinfo mb-0">ID: {profile.id}</p>
        </div>

        {menuOpen && (
          <div className="dropdown-menu-custom">
            <p onClick={() => navigate("/profile")}>My Account</p>
            <p onClick={handleLogout} className="logout-text">
              Logout
            </p>
          </div>
        )}
      </div>

      {showSearch && (
        <div className="search-box">
          <input
            type="text"
            className="search-input"
            placeholder="Search something"
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>
      )}
    </header>
  );
};

export default SupporterHeader;
