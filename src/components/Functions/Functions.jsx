import FunctionsItem from "./FunctionsItem";
const Functions = () => {
  const functionsList = [
    {
      Title: "Emotional Support",
      Caption:
        "Stay surrounded by love and encouragement from family, friends, and your community.",
      Image: "/images/support-img.jpg",
      Id: 1,
    },
    {
      Title: "Meaningful Donations",
      Caption:
        "Give or receive help with transparency, every contribution makes a difference.",
      Image: "/images/Donatinos.jpg",
      Id: 2,
    },
    {
      Title: "Healing Through Connection",
      Caption:
        "A simple message from someone who cares can ease the pain and warm the heart.",
      Image: "/images/Healing.jpg",
      Id: 3,
    },
    {
      Title: "Social Activities",
      Caption:
        "Join uplifting events and group activities that help you stay connected and positive.",
      Image: "/images/Activities.jpg",
      Id: 4,
    },
  ];
  return (
    <>
      <div id="features" className="sec-dev px-4 px-lg-5 mt-5">
        <div className="sec-chip text-center">Our Services</div>
        <div className="sec-title text-center">
          Designed to Make Connection Simple
        </div>
        <div className="mt-3 mb-5">
          <div>
            {functionsList.map((x) => {
              return (
                <FunctionsItem
                  key={x.Id}
                  Title={x.Title}
                  Caption={x.Caption}
                  Image={x.Image}
                  Id={x.Id}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Functions;
