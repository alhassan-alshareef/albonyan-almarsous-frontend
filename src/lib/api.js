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

export const getPost = (id) =>
  axios.get(`${BASE_URL}/patient/posts/${id}/`, { headers: authHeader() });


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

/* ================================
          DONATIONS
================================ */

// Get all donations (for the logged-in patient)
export const getPatientDonations = () =>
  axios.get(`${BASE_URL}/patient/donations/`, { headers: authHeader() });

// Get a single donation
export const getDonation = (donationId) =>
  axios.get(`${BASE_URL}/patient/donations/${donationId}/`, { headers: authHeader() });

// Create a new donation
export const createDonation = (data) =>
  axios.post(`${BASE_URL}/patient/donations/`, data, { headers: authHeader() });

// Update a donation
export const updateDonation = (donationId, data) =>
  axios.put(`${BASE_URL}/patient/donations/${donationId}/`, data, { headers: authHeader() });

// Delete a donation
export const deleteDonation = (donationId) =>
  axios.delete(`${BASE_URL}/patient/donations/${donationId}/`, { headers: authHeader() });

/* ================================
      DONATIONS (SUPPORTER)
================================ */

export const getAllDonations = () =>
  axios.get(`${BASE_URL}/donations/`, { headers: authHeader() });


export const getDonationDetails = (donationId) =>
  axios.get(`${BASE_URL}/donations/${donationId}/`, { headers: authHeader() });

export const payDonation = (donationId, data) =>
  axios.post(`${BASE_URL}/donations/${donationId}/pay/`, data, { headers: authHeader() });



/* ================================
          COMMENTS 
================================ */

//  Get all comments for a specific post
export const getComments = (postId) =>
  axios.get(`${BASE_URL}/posts/${postId}/comments/`, {
    headers: authHeader(),
  });

//  Add a comment
export const addComment = (postId, data) =>
  axios.post(`${BASE_URL}/posts/${postId}/comments/`, data, {
    headers: authHeader(),
  });

//  Edit a comment (only by owner)
export const updateComment = (commentId, data) =>
  axios.put(`${BASE_URL}/comments/${commentId}/`, data, {
    headers: authHeader(),
  });

//  Delete a comment (only by owner)
export const deleteComment = (commentId) =>
  axios.delete(`${BASE_URL}/comments/${commentId}/`, {
    headers: authHeader(),
  });

/* ================================
              LIKES
================================ */

//  Like / Unlike a post (supporter only)
export const toggleLike = (postId) =>
  axios.post(`${BASE_URL}/posts/${postId}/like/`, {}, {
    headers: authHeader(),
  });


