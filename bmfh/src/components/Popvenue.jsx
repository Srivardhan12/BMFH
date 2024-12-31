import img from "../assets/landing-page-image.jpg";

const popularVenueData = [
  {
    id: 1,
    name: "Maha Raja Function Hall",
    image: img,
    location: "Uppal",
    rating: "5",
  },
  {
    id: 2,
    name: "Sapthagiri Function Hall",
    image: img,
    location: "Kompally",
    rating: "4.8",
  },
  {
    id: 3,
    name: "Garden Function Hall",
    image: img,
    location: "Uppal",
    rating: "4.5",
  },
];

export default function PopVenue() {
  return (
    <div className="mx-16 my-16 pb-10">
      <h2 className="text-2xl pb-6 font-semibold text-gray-600">
        Popular Venues In Hyderabad
      </h2>
      <div className="flex">
        {popularVenueData.map((data) => {
          return (
            <div className="flex" key={data.id}>
              <img
                src={data.image}
                alt="Location Image"
                className="h-40 aspect-auto bg-cover rounded-md"
              />
              <div className="px-5">
                <h3 className="font-semibold text-lg text-gray-600">
                  {data.name}
                </h3>
                <p className="text-blue-800">{data.location}</p>
                <span>Rating: {data.rating}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
