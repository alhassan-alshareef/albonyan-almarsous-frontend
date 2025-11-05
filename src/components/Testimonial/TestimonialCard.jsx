const TestimonialCard = ({ Name, Image, City, Title, Content }) => {
  return (
    <div className="col">
      <div className="testimonial-card h-100">
        <img className="quote-sym" width={25} src="/images/quote.svg" alt="quote.svg" />
        <div className="card-content">
          <div className="card-title mt-2">{Title}</div>
          <div className="card-inner mt-2">{Content}</div>
        </div>
        <div className="card-author mt-5">
          <div
            className="user-avatar"
            style={{ backgroundImage: `url(${Image})` }}
          ></div>
          <div className="user-info">
            <div className="user-name">{Name}</div>
            <div className="user-city">{City}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
