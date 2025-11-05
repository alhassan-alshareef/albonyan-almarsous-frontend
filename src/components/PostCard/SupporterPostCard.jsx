import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import { toggleLike } from "../../lib/api";

export default function SupporterPostCard({ post, disableActions = false }) {
  if (!post?.patient) return null;

  const navigate = useNavigate();
  const { patient, content, created_at, likes_count, comments_count, is_liked_by_user, image } = post;
  const { username = "Unknown", illness = "Not specified" } = patient;

  const [likesCount, setLikesCount] = useState(likes_count || 0);
  const [liked, setLiked] = useState(is_liked_by_user || false);
  const [commentsCount] = useState(comments_count || 0);

  const formattedDate = new Date(created_at).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const handleLike = async () => {
    if (disableActions) return;
    try {
      await toggleLike(post.id);
      setLiked((prev) => !prev);
      setLikesCount((prev) => (liked ? Math.max(prev - 1, 0) : prev + 1));
    } catch (error) {
      console.error("Like action failed:", error);
    }
  };

  return (
    <div className="post-card">
      <div className="post-card__header">
        <div className="donation-card__avatar">
          <span className="material-symbols-outlined donation-avatar-icon">account_circle</span>
        </div>

        <div className="post-card__info">
          <div className="post-card__top-row">
            <p className="post-card__name">{username}</p>
            <p className="post-card__date">{formattedDate}</p>
          </div>
          <p className="post-card__illness">{illness}</p>
        </div>
      </div>

      <div className="post-card__content">{content}</div>

      {image && (
        <div className="post-card__image-box">
          <img
            src={image} 
            alt="Post"
            className="post-card__image"
          />
        </div>
      )}

      <div className="post-card__actions">
        <button
          className="post-card__action"
          onClick={() => !disableActions && navigate(`/posts/${post.id}/comments`)}
          disabled={disableActions}
        >
          <span className="material-symbols-outlined me-2">chat_bubble</span>
          {commentsCount > 0 && <span>{commentsCount}</span>}
        </button>

        <span className="post-card__divider" />

        <button
          className={`post-card__action ${liked ? "liked" : ""}`}
          onClick={handleLike}
          disabled={disableActions}
        >
          <span className="material-symbols-outlined me-2">favorite</span>
          {likesCount > 0 && <span>{likesCount}</span>}
        </button>
      </div>
    </div>
  );
}
