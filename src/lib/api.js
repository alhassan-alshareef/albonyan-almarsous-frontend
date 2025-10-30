import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;

//  Authorization header helper
const authHeader = () => {
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/* ================================
          POSTS
================================ */

//  Get all patient posts
export const getAllPosts = () =>
  axios.get(`${BASE_URL}/patient/posts/`, { headers: authHeader() });

//  Create a new post
export const createPost = (data) =>
  axios.post(`${BASE_URL}/patient/posts/`, data, { headers: authHeader() });

//  Update existing post
export const updatePost = (id, data) =>
  axios.put(`${BASE_URL}/patient/posts/${id}/`, data, { headers: authHeader() });

// Delete a post
export const deletePost = (id) =>
  axios.delete(`${BASE_URL}/patient/posts/${id}/`, { headers: authHeader() });

/* ================================
          PROFILE
================================ */

// Get logged-in user profile
export const getUserProfile = () =>
  axios.get(`${BASE_URL}/profile/`, { headers: authHeader() });

// Update user profile
export const updateUserProfile = (data) =>
  axios.put(`${BASE_URL}/profile/`, data, { headers: authHeader() });
