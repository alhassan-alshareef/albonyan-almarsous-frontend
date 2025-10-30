import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./tabSwitcher.css";

export default function TabSwitcher() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isDonations = pathname.includes("/donations");

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="btn-group tab-switcher" role="group">
        <button
          className={`btn ${!isDonations ? "active-tab" : "inactive-tab"}`}
          onClick={() => navigate("/patient/posts")}
        >
          Posts
        </button>
        <button
          className={`btn ${isDonations ? "active-tab" : "inactive-tab"}`}
          onClick={() => navigate("/patient/donations")}
        >
          Donations
        </button>
      </div>
    </div>
  );
}
