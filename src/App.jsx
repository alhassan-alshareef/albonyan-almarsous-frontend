import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import MyPosts from "./pages/patient/MyPosts";
import PatientPosts from "./pages/supporter/PatientPosts";
import AddPost from "./pages/patient/AddPost";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

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
              <PatientPosts />
            </ProtectedRoute>
          }
        />
        <Route path="/patient/add-post" element={<AddPost />} />
      </Routes>
    </Router>
  );
}

export default App;
