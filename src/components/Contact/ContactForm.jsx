import { useState } from "react";

const ContactForm = () => {
  const [form, setForm] = useState({ email: "", title: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    setForm({ email: "", title: "", message: "" }); 
  };

  return (
    <div>
      <form className="row mt-4" onSubmit={handleSubmit}>
        <div className="col-md-6 col-12 mb-3">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6 col-12 mb-3">
          <input
            type="text"
            name="title"
            className="form-control"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
          />
        </div>
        <div className="col-12 mb-3">
          <textarea
            name="message"
            className="form-control"
            rows="8"
            placeholder="Enter a message"
            value={form.message}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mt-4">
          <a
            className="p-button"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
          >
            Submit
          </a>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
