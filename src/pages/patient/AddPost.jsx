import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PatientHeader from "../../components/patient/PatientHeader";
import { createPost } from "../../lib/api";
import "../../App.css";

export default function AddPost() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleAddPost = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      setMessage("Content cannot be empty.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      await createPost({ content });
      setMessage("Post added successfully.");
      setContent("");

      setTimeout(() => navigate("/patient/posts"), 800);
    } catch (err) {
      console.log("Add post failed:", err);
      setMessage("Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="patient-page">
      <PatientHeader showSearch={false} showHi={false} />
      <div className="text-center mt-5">
        <h5><strong>Add Post</strong></h5>
      </div>

      <form onSubmit={handleAddPost} className="add-post-box mx-auto mt-4">
        <label className="add-post-label">Content</label>
        <textarea
          className="add-post-textarea"
          placeholder="Write something..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button type="submit" className="add-post-btn" disabled={loading}>
          {loading ? "Posting..." : "Post"}
        </button>

        {message && (
          <p className={`mt-2 text-center ${message.includes("successfully") ? "text-success" : "text-danger"}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

