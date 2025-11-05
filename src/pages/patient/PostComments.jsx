import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PatientHeader from "../../components/Header/PatientHeader";
import SupporterPostCard from "../../components/PostCard/SupporterPostCard"; 
import CommentCard from "../../components/CommentCard/CommentCard";
import { getPost } from "../../lib/api";
import "../../styles/comment-page.css";

export default function PatientPostComments() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="supporter-page">
      <PatientHeader showSearch={false} />

      <div className="comment-header-bar">
        <button className="back-btn" onClick={() => navigate("/patient/posts")}>
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
                  <CommentCard comment={comment} isOwner={false} />

                  {index !== comments.length - 1 && (
                    <div className="comment-card-separator"></div>
                  )}
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}