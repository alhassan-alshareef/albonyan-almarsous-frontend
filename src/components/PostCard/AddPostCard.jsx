import React from "react";
import { useNavigate } from "react-router-dom";

export default function AddPostCard() {
  const navigate = useNavigate();

  return (
    <div
      className="card text-center border-secondary border-dashed py-4 mt-3"
      style={{ cursor: "pointer" }}
      onClick={() => navigate("/patient/add-post")}
    >
      <div className="fs-4 text-muted"> Add Post</div>
    </div>
  );
}
