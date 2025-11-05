import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PatientHeader from "../../components/Header/PatientHeader";
import { createPost } from "../../lib/api";
import ImageUploader from "../../components/shared/ImageUploader"; 
import "../../App.css";

export default function AddPost() {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleAddPost = async (e) => {
    e.preventDefault();

    if (!content.trim() && !image) {
      setMessage("You must write something or upload an image.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const formData = new FormData();
      formData.append("content", content);
      if (image) formData.append("image", image);

      await createPost(formData);

      setMessage("Post saved successfully.");
      setContent("");
      setImage(null);

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

      <form onSubmit={handleAddPost} className="add-form-box mx-auto mt-4">
        <label className="add-form-label">Content</label>
        <textarea
          className="add-form-textarea"
          placeholder="Write something..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <ImageUploader onImageSelect={setImage} />

        <button type="submit" className="add-form-btn mt-3" disabled={loading}>
          {loading ? "Posting..." : "Post"}
        </button>

        {message && (
          <p
            className={`mt-2 text-center ${
              message.includes("success") ? "text-success" : "text-danger"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
