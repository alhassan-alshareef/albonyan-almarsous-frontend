const ContactForm = () => {
  return (
    <div>
      <form className="row mt-4">
        <div className="col-md-6 col-12 mb-3">
          <input type="email" className="form-control" placeholder="Email"></input>
        </div>
        <div className="col-md-6 col-12 mb-3">
          <input type="text" className="form-control" placeholder="Title"></input>
        </div>
        <div className="col-12 mb-3">
          <textarea
            className="form-control"
            rows="8"
            placeholder="Enter a message"
          ></textarea>
        </div>
        <div className="mt-4">
          <a className="p-button" href="#">
            Submit
          </a>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
