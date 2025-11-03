import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./pages/ProtectedRoute";

//  Patient
import MyPosts from "./pages/patient/MyPosts";
import AddPost from "./pages/patient/AddPost";
import EditPost from "./pages/patient/EditPost";
import MyDonations from "./pages/patient/MyDonations";
import AddDonation from "./pages/patient/AddDonation";
import EditDonation from "./pages/patient/EditDonation";

//  Supporter
import AllPatientsPosts from "./pages/supporter/AllPatientsPost";
import DonationsPage from "./pages/supporter/DonationsPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Profile */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        {/* Patient */}
        <Route path="/patient/posts" element={<ProtectedRoute allowedRole="patient"><MyPosts /></ProtectedRoute>} />
        <Route path="/patient/add-post" element={<ProtectedRoute allowedRole="patient"><AddPost /></ProtectedRoute>} />
        <Route path="/patient/edit-post/:id" element={<ProtectedRoute allowedRole="patient"><EditPost /></ProtectedRoute>} />
        <Route path="/patient/donations" element={<ProtectedRoute allowedRole="patient"><MyDonations /></ProtectedRoute>} />
        <Route path="/patient/add-donation" element={<ProtectedRoute allowedRole="patient"><AddDonation /></ProtectedRoute>} />
        <Route path="/patient/edit-donation/:id" element={<ProtectedRoute allowedRole="patient"><EditDonation /></ProtectedRoute>} />

        {/* Supporter */}
        <Route path="/posts" element={<ProtectedRoute allowedRole="supporter"><AllPatientsPosts /></ProtectedRoute>} />
        <Route path="/donations" element={<ProtectedRoute allowedRole="supporter"><DonationsPage /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
