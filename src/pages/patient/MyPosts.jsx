import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import PatientHeader from "../../components/Header/PatientHeader";
import TabSwitcher from "../../components/shared/TabSwitcher";
import PostCard from "../../components/PostCard/PostCard";
import AddCard from "../../components/shared/AddCard";
import { getAllPosts, deletePost } from "../../lib/api";

export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [postToDelete, setPostToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await getAllPosts();
      setPosts(res.data);
    } catch (err) {
      console.log("Error loading posts:", err);
    } finally {
      setLoading(false); 
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(postToDelete.id);
      setPosts(posts.filter((post) => post.id !== postToDelete.id));
      setPostToDelete(null);
    } catch (err) {
      console.log("Delete failed:", err);
    }
  };

  const filteredPosts = posts.filter((p) =>
    p.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="patient-page">
      <PatientHeader onSearch={(value) => setSearchTerm(value)} />
      <TabSwitcher />

      <div className="d-flex flex-column align-items-center mt-4">
        {loading ? (
          <p className="text-muted mt-5">Loading posts...</p> 
        ) : filteredPosts.length ? (
          filteredPosts.map((p) => (
            <PostCard
              key={p.id}
              post={p}
              onEdit={() => navigate(`/patient/edit-post/${p.id}`)}
              onDelete={() => setPostToDelete(p)}
            />
          ))
        ) : (
          <p className="text-muted mt-5">No posts found.</p>
        )}

        {!loading && (
          <AddCard
            label="Add Post"
            onClick={() => navigate("/patient/add-post")}
          />
        )}
      </div>

      {postToDelete && (
        <div className="delete-overlay">
          <div className="delete-modal">
            <p>Are you sure you want to delete this post?</p>
            <div className="d-flex justify-content-end gap-2 mt-3">
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setPostToDelete(null)}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

