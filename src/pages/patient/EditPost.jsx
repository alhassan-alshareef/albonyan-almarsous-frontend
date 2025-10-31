import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPost, updatePost } from "../../lib/api";
import PatientHeader from "../../components/patient/PatientHeader";
import "../../App.css";

export default function EditPost() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await getPost(id);
        setContent(res.data.content || "");
      } catch (err) {
        console.log("Error loading post:", err);
      }
    };
    fetchPost();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);

    try {
      await updatePost(id, { content });
      setMessage("Post updated successfully.");
      setTimeout(() => navigate("/patient/posts"), 800);
    } catch (err) {
      console.log("Update failed:", err);
    }

    setLoading(false);
  };

  return (
    <div className="patient-page">
      <PatientHeader showSearch={false} showHi={false} />
      <div className="text-center mt-5">
        <h5><strong>Edit Post</strong></h5>
      </div>

      <form onSubmit={handleUpdate} className="add-post-box mx-auto mt-4">
        <label className="add-post-label">Content</label>
        <textarea
          className="add-post-textarea"
          placeholder="Write your update..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit" className="add-post-btn" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>

        {message && <p className="mt-2 text-center text-success">{message}</p>}
      </form>
    </div>
  );
}
