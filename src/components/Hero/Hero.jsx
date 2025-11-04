const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-inner px-4 px-lg-5">
        <div className="row mt-5">
          <div className="col-lg-6 col-12 order-lg-1 order-2">
            <h1 className="head-hero my-3 text-center text-lg-start">
              Because No One Should Face It Alone
            </h1>
            <p className="p-hero text-center text-lg-start">
              A safe place to share your story, update loved ones, and feel
              supported every step of the way. made for our community, by our
              community.
            </p>
            <div className="actoin-row my-4 justify-content-center justify-content-lg-start">
              <a className="p-button" href="#">
                Login
              </a>
              <a className="s-button" href="#">
                Sign Up
              </a>
            </div>
          </div>
          <div className="col-lg-6 col-12 order-lg-2 order-1 d-none d-md-block">
            <div className="hero-img d-flex align-items-lg-center justify-content-lg-end justify-content-center">
              <img className="w-100" src="./images/HeroModel.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
