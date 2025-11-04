import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getComment, updateComment } from "../../lib/api";
import SupporterHeader from "../../components/Header/SupporterHeader";
import "../../App.css";

export default function EditComment() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await getComment(id);
        setContent(res.data.content || "");
      } catch (err) {
        console.error("Error loading comment:", err);
      }
    })();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      await updateComment(id, { content });
      setMessage("Comment updated successfully.");
      setTimeout(() => navigate(-1), 800); // يرجع للصفحة السابقة
    } catch (err) {
      console.error("Update failed:", err);
      setMessage("Failed to update comment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="supporter-page">
      <SupporterHeader showSearch={false} />
      <div className="text-center mt-5">
        <h5><strong>Edit Comment</strong></h5>
      </div>

      <form onSubmit={handleUpdate} className="add-form-box mx-auto mt-4">
        <label className="add-post-label">Your Comment</label>
        <textarea
          className="add-form-textarea"
          placeholder="Edit your comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit" className="add-form-btn" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>

        {message && <p className="mt-2 text-center text-success">{message}</p>}
      </form>
    </div>
  );
}
