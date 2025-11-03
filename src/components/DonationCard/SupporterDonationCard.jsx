import React from "react";
import { useNavigate } from "react-router-dom";
import "../DonationCard/donation-card.css";

export default function SupporterDonationCard({ donation }) {
  const navigate = useNavigate();
  const { patient, title, description, progress_percentage, created_at } = donation;

  const username = patient?.username || "Unknown";
  const illness = patient?.illness || "—";

  const date = new Date(created_at).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const progress = progress_percentage ?? 0;

  return (
    <div className="donation-card">
      {/* Header */}
      <div className="donation-card__header">
        <div className="donation-card__avatar">
          <span className="material-symbols-outlined donation-avatar-icon">
            account_circle
          </span>
        </div>
        <div className="donation-card__info">
          <div className="donation-card__top-row">
            <p className="donation-card__name">{username}</p>
            <p className="donation-card__date">{date}</p>
          </div>
          <p className="donation-card__illness">{illness}</p>
        </div>
      </div>

      {/* Content */}
      <div className="donation-card__content">
        <h4>{title}</h4>
        <p className="donation-card__desc">{description || " "}</p>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${progress}%`,
              background: progress > 0 ? "#166c40" : "#c9c9c9",
            }}
          >
            <span className="progress-label">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="supporter-donation__actions">
        <button
          className="supporter-donation__donate-btn"
          onClick={() => navigate(`/donations/${donation.id}/pay`)}
        >
          <span className="material-symbols-outlined me-2"> volunteer_activism </span>
          Donate
        </button>
      </div>
    </div>
  );
}
