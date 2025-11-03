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

// Get all active donations (for supporters)
export const getAllDonations = () =>
  axios.get(`${BASE_URL}/donations/`, { headers: authHeader() });

// Donate to a campaign
export const makeDonationPayment = (donationId, data) =>
  axios.post(`${BASE_URL}/donations/${donationId}/pay/`, data, {
    headers: authHeader(),
  });