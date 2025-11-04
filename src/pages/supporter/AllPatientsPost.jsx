import React, { useEffect, useState } from "react";
import SupporterHeader from "../../components/Header/SupporterHeader";
import TabSwitcher from "../../components/shared/TabSwitcher";
import { getAllPosts } from "../../lib/api";
import SupporterPostCard from "../../components/PostCard/SupporterPostCard";
import "../../App.css";

export default function AllPatientsPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await getAllPosts();
        setPosts(res.data);
      } catch (error) {
        setMessage("Failed to load posts. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div className="supporter-page">
      <SupporterHeader />
      <TabSwitcher />

      <div className="d-flex flex-column align-items-center mt-5">
        <h2 className="text-muted">All Patients Posts</h2>
        <p className="text-secondary mt-2">
        </p>
      </div>

      {loading ? (
        <p className="text-center text-muted mt-5">Loading posts...</p>
      ) : message ? (
        <p className="text-center text-danger mt-5">{message}</p>
      ) : posts.length === 0 ? (
        <p className="text-center text-muted mt-5">No posts available yet.</p>
      ) : (
        <div className="d-flex flex-column align-items-center mt-4">
          {posts.map((post) => (
            <SupporterPostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
