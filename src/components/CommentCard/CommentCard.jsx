import React from "react";
import "../../components/CommentCard/commentCard.css";

export default function CommentCard({ comment, onEdit, onDelete, isOwner }) {
  if (!comment) return null;

  const { username, content, created_at } = comment;
  const formattedDate = new Date(created_at).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="comment-card-new">
      <div className="comment-card-header">
        <div className="comment-card-avatar">
          <span className="material-symbols-outlined">account_circle</span>
        </div>

        <div className="comment-card-info">
          <div className="comment-card-top-row">
            <p className="comment-card-name">{username}</p>
            <p className="comment-card-date">{formattedDate}</p>
          </div>
        </div>
      </div>

      <div className="comment-card-content">{content}</div>

      {isOwner && (
        <div className="comment-card-actions">
          <button className="comment-card-action" onClick={onEdit}>
            <span className="material-symbols-outlined me-1">edit</span> Edit
          </button>

          <span className="comment-card-divider-vertical" />

          <button
            className="comment-card-action delete"
            onClick={onDelete}
          >
            <span className="material-symbols-outlined me-1">delete</span> Delete
          </button>
        </div>
      )}
    </div>
  );
}
