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
export const getAllPosts = () =>
  axios.get(`${BASE_URL}/patient/posts/`, { headers: authHeader() });

export const createPost = (data) =>
  axios.post(`${BASE_URL}/patient/posts/`, data, { headers: authHeader() });

export const deletePost = (id) =>
  axios.delete(`${BASE_URL}/patient/posts/${id}/`, { headers: authHeader() });



/* ================================
            PROFILE
================================ */
export const getUserProfile = () =>
  axios.get(`${BASE_URL}/profile/`, { headers: authHeader() });

export const updateUserProfile = (data) =>
  axios.put(`${BASE_URL}/profile/`, data, { headers: authHeader() });
