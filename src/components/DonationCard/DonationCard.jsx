import React from "react";
import { useNavigate } from "react-router-dom";
import "../DonationCard/donation-card.css";

export default function DonationCard({ donation, onDelete }) {
  const navigate = useNavigate();
  const { patient, title, description, progress_percentage, created_at } = donation;
  const { username, illness } = patient || {};

  const date = new Date(created_at).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const progress = progress_percentage ?? 0;

  return (
    <div className="donation-card">
      <div className="donation-card__header">
        <div className="donation-card__avatar">
          <span className="material-symbols-outlined donation-avatar-icon">account_circle</span>
        </div>
        <div className="donation-card__info">
          <div className="donation-card__top-row">
            <p className="donation-card__name">{username}</p>
            <p className="donation-card__date">{date}</p>
          </div>
          <p className="donation-card__illness">{illness}</p>
        </div>
      </div>

      <div className="donation-card__content">
        <h4>{title}:</h4>
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

      <div className="donation-card__actions">
        <button
          className="donation-card__action"
          onClick={() => navigate(`/patient/edit-donation/${donation.id}`)}
        >
          <span className="material-symbols-outlined me-2">edit</span>
          Edit
        </button>

        <span className="post-card__divider" />

        <button
          className="donation-card__action donation-card__action--delete"
          onClick={() => onDelete(donation)}
        >
          <span className="material-symbols-outlined me-2">delete</span>
          Delete
        </button>
      </div>
    </div>
  );
}
