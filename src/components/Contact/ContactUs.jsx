import ContactForm from "./ContactForm";
const ContactUs = () => {
  return (
    <div className="row">
      <div className="col-lg-6 d-none d-lg-block">
        <img src="/images/model-banner.png" alt="Contact banner"/>
      </div>
      <div className="col-lg-6 col-12 px-4 px-lg-5 sec-dev">
        <div className="sec-chip  text-lg-start text-center">Contact Us</div>
        <div className="sec-title text-lg-start text-center">
          Let’s Connect with Care
        </div>
        <ContactForm />
      </div>
    </div>
  );
};

export default ContactUs;
