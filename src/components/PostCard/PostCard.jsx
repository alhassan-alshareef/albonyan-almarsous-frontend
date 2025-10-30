import React from "react";
import "../../App.css";

function PostCard({ post, onEdit, onDelete }) {
  const { patient, content } = post;
  const { username, illness } = patient;

  return (
    <div className="post-card">
      <div className="post-card__header">
        <div className="post-card__avatar" />
        <div>
          <p className="post-card__name mb-1">{username}</p>
          <p className="post-card__illness mb-0">{illness}</p>
        </div>
      </div>

      <div className="post-card__content">{content}</div>

      <div className="post-card__actions">
        <button onClick={() => onEdit?.(post)} className="post-card__action">
          <span className="material-symbols-outlined me-2">edit</span> Edit
        </button>
        <span className="post-card__divider" />
        <button
          onClick={() => onDelete?.(post)}
          className="post-card__action post-card__action--delete"
        >
          <span className="material-symbols-outlined me-2">delete</span> Delete
        </button>
      </div>
    </div>
  );
}
export default  PostCard
