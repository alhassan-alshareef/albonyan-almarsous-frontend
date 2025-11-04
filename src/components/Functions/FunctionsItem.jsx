const FunctionsItem = ({ Title, Caption, Image, Id }) => {
  return (
    <>
      {Id % 2 != 0 ? (
        <div className="row align-items-center mt-2">
          <div className="col-md-6 col-12 mt-3 mt-md-5 order-2 order-md-1">
            <div className="subTitel">{Title}</div>
            <div className="mt-2">
              <p>{Caption}</p>
            </div>
          </div>
          <div className="col-md-6 col-12 mt-5 order-1 order-md-2">
            <div
              className="service-bg"
              style={{
                backgroundImage: `url(${Image})`,
              }}
            ></div>
          </div>
        </div>
      ) : (
        <div className="row align-items-center mt-2">
          <div className="col-md-6 col-12 mt-5">
            <div
              className="service-bg"
              style={{
                backgroundImage: `url(${Image})`,
              }}
            ></div>
          </div>
          <div className="col-md-6 col-12 mt-3 mt-md-5">
            <div className="subTitel">{Title}</div>
            <div className="mt-2">
              <p>{Caption}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FunctionsItem;
