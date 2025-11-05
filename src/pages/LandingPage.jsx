import Nav from "../components/Nav/Nav";
import Hero from "../components/Hero/Hero";
import Partners from "../components/Partners/Partners";
import Functions from "../components/Functions/Functions";
import Testimonials from "../components/Testimonial/Testimonials";
import ContactUs from "../components/Contact/ContactUs";
import Footer from "../components/Footer/Footer";
import "../styles/LandingPage.css";

function LandingPage() {
  return (
    <div className="page-wrapper">
      <Nav />
      <Hero />
      <Partners />
      <Functions />
      <Testimonials />
      <ContactUs />
      <Footer />
    </div>
  );
}

export default LandingPage
