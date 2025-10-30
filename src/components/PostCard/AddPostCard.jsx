import React from "react";
import "../shared/sharedCard.css"

export default function AddPostCard({ label = "Add Post", onClick }) {
  return (
    <div className="add-card" onClick={onClick}>
      <span className="material-symbols-outlined add-card__icon">add_circle</span>
      <p className="add-card__text">{label}</p>
    </div>
  );
}
