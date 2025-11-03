import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./tabSwitcher.css";

export default function TabSwitcher() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isPatientView = pathname.startsWith("/patient");
  const isDonationsTab = pathname.includes("/donations");

  const routes = {
    posts: isPatientView ? "/patient/posts" : "/posts",
    donations: isPatientView ? "/patient/donations" : "/donations",
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="btn-group tab-switcher" role="group">
        <button
          className={`btn ${!isDonationsTab ? "active-tab" : "inactive-tab"}`}
          onClick={() => navigate(routes.posts)}
        >
          Posts
        </button>
        <button
          className={`btn ${isDonationsTab ? "active-tab" : "inactive-tab"}`}
          onClick={() => navigate(routes.donations)}
        >
          Donations
        </button>
      </div>
    </div>
  );
}
