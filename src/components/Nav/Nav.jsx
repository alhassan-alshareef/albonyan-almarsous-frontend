import { Link } from "react-router-dom";

const Nav = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const targetPosition = section.offsetTop;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 500; 
      let start = null;

      const smoothScroll = (timestamp) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const progressRatio = Math.min(progress / duration, 1);
        window.scrollTo(0, startPosition + distance * progressRatio);

        if (progress < duration) {
          requestAnimationFrame(smoothScroll);
        }
      };

      requestAnimationFrame(smoothScroll);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg px-4 px-lg-5 nav-shadow">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src="/images/logo.svg" alt="Albonyan AlMarsous logo" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {[
              { id: "about", label: "About" },
              { id: "features", label: "Features" },
              { id: "testimonials", label: "Testimonials" },
              { id: "contact", label: "Contact Us" },
            ].map((item) => (
              <li className="nav-item" key={item.id}>
                <a
                  href="#"
                  className="nav-link active"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="d-flex ">
            <Link className="btn btn_success mx-3" to="/login">
              Login
            </Link>
            <Link className="btn btn_outline_success" to="/signup">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
