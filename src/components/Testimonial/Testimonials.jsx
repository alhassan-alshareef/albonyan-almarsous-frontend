import TestimonialCard from "./TestimonialCard";
const Testimonials = () => {
  const Testimonial = [
    {
      Name: "Fatimah A",
      Image: "/Images/model-1.jpg",
      City: "Jeddah",
      Title: "A Mother’s Story",
      Content:
        "When I was in the hospital, reading the messages from my family and friends made me feel stronger every day. It reminded me that I wasn’t alone — their words truly became part of my healing",
    },
    {
      Name: "Khalid M.",
      Image: "/images/model-2.jpg",
      City: "Riyadh",
      Title: "From a Friend’s Perspective",
      Content:
        "Being able to check updates and send prayers meant the world to me. Even from far away, I felt close to my friend during his recovery. This app made distance disappear.",
    },
    {
      Name: "Al-Khalid Family",
      Image: "/images/model-3.jpg",
      City: "Dammam",
      Title: "A Family’s Gratitude",
      Content:
        "Our family used this space to share updates, photos, and messages. It helped us stay connected through every challenge, and it brought comfort to see how many people cared.",
    },
  ];
  return (
    <div className="pt-sec text-center px-4 px-lg-5">
      <div className="sec-chip light-text">Testimonials</div>
      <div className="sec-title light-text">
        Because Every Story Deserves to Be Heard
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-5 mt-3 mb-5">
        {Testimonial.map((User) => {
          return (
            <TestimonialCard
              Name={User.Name}
              Image={User.Image}
              City={User.City}
              Title={User.Title}
              Content={User.Content}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Testimonials;
