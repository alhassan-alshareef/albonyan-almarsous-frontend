import React from "react";

export default function PostCard({ post }) {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h6 className="text-muted mb-1">{post.patient.username}</h6>
        <p>{post.content}</p>
      </div>
      <div className="card-footer d-flex justify-content-between">
        <button className="btn btn-outline-secondary btn-sm"> Edit</button>
        <button className="btn btn-outline-danger btn-sm">Delete</button>
      </div>
    </div>
  );
}
