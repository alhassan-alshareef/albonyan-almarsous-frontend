import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./pages/ProtectedRoute";
import MyPosts from "./pages/patient/MyPosts";
import AddPost from "./pages/patient/AddPost";
import EditPost from "./pages/patient/EditPost";
import MyDonations from "./pages/patient/MyDonations";
import AddDonation from "./pages/patient/AddDonation";
import EditDonation from "./pages/patient/EditDonation";
import AllPatientsPosts from "./pages/supporter/AllPatientsPost";
import DonationsPage from "./pages/supporter/DonationsPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProtectedRoute> <ProfilePage /> </ProtectedRoute> }/>

        <Route
          path="/patient/posts"
          element={
            <ProtectedRoute>
              <MyPosts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/posts"
          element={
            <ProtectedRoute>
              <AllPatientsPosts />
            </ProtectedRoute>
          }
        />
        <Route path="/patient/add-post" element={<AddPost />} />
        <Route path="/patient/edit-post/:id" element={<EditPost />} />

        <Route path="/patient/donations" element={<MyDonations />} />
        <Route path="/patient/add-donation" element={<AddDonation />} />
        <Route path="/patient/edit-donation/:id" element={<EditDonation />} />

        <Route path="/donations" element={<DonationsPage />} />
        

        

      </Routes>
    </Router>
  );
}

export default App;
