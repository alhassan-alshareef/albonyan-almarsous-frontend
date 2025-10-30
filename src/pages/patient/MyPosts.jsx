import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ← أضف هذا السطر
import PatientHeader from "../../components/patient/PatientHeader";
import TabSwitcher from "../../components/shared/TabSwitcher";
import PostCard from "../../components/PostCard/PostCard";
import AddPostCard from "../../components/PostCard/AddPostCard";
import { getAllPosts, deletePost } from "../../lib/api";

export default function MyPosts() {
  const [posts, setPosts] = useState([]), [postToDelete, setPostToDelete] = useState(null);
  const navigate = useNavigate(); // ← نفعّله هنا

  useEffect(() => { fetchPosts(); }, []);

  const fetchPosts = async () => {
    try {
      const res = await getAllPosts();
      setPosts(res.data);
    } catch (err) {
      console.log("Error loading posts:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(postToDelete.id);
      setPosts(posts.filter(p => p.id !== postToDelete.id));
      setPostToDelete(null);
    } catch (err) {
      console.log("Delete failed:", err);
    }
  };

  return (
    <div className="patient-page">
      <PatientHeader />
      <TabSwitcher />

      <div className="d-flex flex-column align-items-center mt-4">
        {posts.length ? posts.map(p => (
          <PostCard key={p.id} post={p} onEdit={() => console.log("edit", p)} onDelete={() => setPostToDelete(p)} />
        )) : <p className="text-muted mt-5">No posts yet.</p>}
            <AddPostCard label="Add Post" onClick={() => navigate("/patient/add-post")} />
      </div>

      {postToDelete && (
        <div className="delete-overlay">
          <div className="delete-modal">
            <p>Are you sure you want to delete this post?</p>
            <div className="d-flex justify-content-end gap-2 mt-3">
              <button className="btn btn-secondary btn-sm" onClick={() => setPostToDelete(null)}>Cancel</button>
              <button className="btn btn-danger btn-sm" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
