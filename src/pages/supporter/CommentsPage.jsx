import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SupporterHeader from "../../components/Header/SupporterHeader";
import SupporterPostCard from "../../components/PostCard/SupporterPostCard";
import CommentCard from "../../components/CommentCard/CommentCard";
import ModalConfirm from "../../components/shared/ModalConfirm"; 
import { getPost, addComment, deleteComment } from "../../lib/api";
import { getUserFromToken } from "../../lib/auth";
import "../../styles/comment-page.css";

export default function CommentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [sending, setSending] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const currentUser = getUserFromToken();

  useEffect(() => {
    (async () => {
      try {
        const res = await getPost(id);
        setPost(res.data);
        setComments(res.data.comments || []);
      } catch {
        console.error("Failed to load post or comments");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    setSending(true);
    try {
      const res = await addComment(id, { content: newComment });
      setComments((prev) => [res.data, ...prev]);
      setNewComment("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteComment(commentToDelete);
      setComments((prev) => prev.filter((c) => c.id !== commentToDelete));
      setShowConfirm(false);
      setCommentToDelete(null);
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  return (
    <div className="supporter-page">
      <SupporterHeader />

      <div className="comment-header-bar">
        <button className="back-btn" onClick={() => navigate("/posts")}>
          <span className="material-symbols-outlined me-1">arrow_back</span>
          Back
        </button>
      </div>

      {loading ? (
        <p className="text-center mt-5 text-muted">Loading...</p>
      ) : (
        <>
          <SupporterPostCard post={post} disableActions />
          <div style={{ marginBottom: "55px" }}></div>
          <div className="comments-section">
            {comments.length === 0 ? (
              <p className="text-center text-muted mt-3">No comments yet.</p>
            ) : (
              comments.map((comment, index) => (
                <div key={comment.id}>
                  <CommentCard
                    comment={comment}
                    isOwner={currentUser?.username === comment.username}
                    onEdit={() => navigate(`/comments/${comment.id}/edit`)}
                    onDelete={() => {
                      setShowConfirm(true);
                      setCommentToDelete(comment.id);
                    }}
                  />
                  {index !== comments.length - 1 && (
                    <div className="comment-card-separator"></div>
                  )}
                </div>
              ))
            )}
          </div>

          <div className="add-comment-box">
            <textarea
              className="comment-input"
              rows="2"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              className="send-btn"
              onClick={handleAddComment}
              disabled={!newComment.trim() || sending}
            >
              {sending ? "Sending..." : "Send"}
            </button>
          </div>
          {showConfirm && (
            <ModalConfirm
              message="Are you sure you want to delete this comment?"
              onCancel={() => setShowConfirm(false)}
              onConfirm={handleDelete}
            />
          )}
        </>
      )}
    </div>
  );
}
