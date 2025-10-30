import React from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";

function PostCard({ post, onDelete }) {
  const { patient, content, created_at  } = post;
  const postId = post.id; 
  const { username, illness } = patient;
  const navigate = useNavigate();

  const formattedDate = new Date(post.created_at).toLocaleString("en-US", {
});

return (
    <div className="post-card">
      <div className="post-card__header">
        <div className="post-card__avatar" />
        <div className="post-card__info">
          <div className="post-card__top-row">
            <p className="post-card__name">{username}</p>
            <p className="post-card__date">{formattedDate}</p>
          </div>
          <p className="post-card__illness">{illness}</p>
        </div>
      </div>

      <div className="post-card__content">{content}</div>

      <div className="post-card__actions">
        <button
          onClick={() => navigate(`/patient/edit-post/${postId}`)}
          className="post-card__action"
        >
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
export default PostCard;