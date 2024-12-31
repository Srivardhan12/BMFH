import img from "../assets/landing-page-image.jpg";

const selectedLocationVenues = [
  {
    id: 1,
    name: "Maha Raja Function Hall",
    image: img,
    location: "Uppal",
    rating: "5",
  },
  {
    id: 1,
    name: "Maha Raja Function Hall",
    image: img,
    location: "Uppal",
    rating: "5",
  },
];

export default function ViewData() {
  return (
    <div className="flex flex-col items-center my-5">
      <div className="w-[60vw]">
        {selectedLocationVenues.map((location) => {
          return (
            <div
              key={location.id}
              className="flex rounded-md p-2 my-2 border-[2px] border-gray-200"
            >
              <div>
                <img
                  className="h-40 aspect-auto bg-cover rounded-sm"
                  src={location.image}
                  alt="location image"
                />
              </div>
              <div className="pl-5 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold">{location.name}</h3>
                  <p className="text-blue-800">{location.location}</p>
                  <p>Rating: {location.rating} Stars</p>
                </div>
                <div>
                  <p className="px-2 py-1.5 my-2 w-fit border text-white font-semibold border-blue-600 rounded-sm bg-blue-400">
                    +91 9988776655
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
