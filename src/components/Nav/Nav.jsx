const Nav = () => {
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
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Testimonials
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Contact US
              </a>
            </li>
          </ul>
          <div className="d-flex ">
            <a className="btn btn_success mx-3" href="#" role="button">
              Login
            </a>
            <a className="btn btn_outline_success" href="#" role="button">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Nav;
