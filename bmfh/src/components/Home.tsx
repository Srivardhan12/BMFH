import axios from "axios";
import Main from "./MainElem";
import PopVenue from "./Popvenue";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState({
    popularVenues: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://bmfh.medium-blog-clone.workers.dev/get-popular-venues"
        );
        console.log("API Response:", response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="relative bg-[url('./assets/landing-page-image.jpg')] bg-cover bg-center h-4/5">
        <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
        <div className="relative z-20">
          <Main
          />
        </div>
      </div>
      <PopVenue
        popularVenues={data.popularVenues} />
    </div>
  );
}
