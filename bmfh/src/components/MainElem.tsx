import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const [locations, setLocations] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://bmfh.medium-blog-clone.workers.dev/get-locations");
        console.log("API Response:", response.data);

        if (Array.isArray(response.data)) {
          setLocations(response.data);
        } else {
          throw new Error("API response is not an array");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load locations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleNavigate = () => {
    if (selectedLocation) {
      navigate("/view-venue", { state: { location: selectedLocation } });
    } else {
      alert("Please select a location first.");
    }
  };

  return (
    <div className="flex h-[70vh] justify-center items-center bg-gray-900">
      <div>
        <p className="text-2xl text-slate-100 font-semibold text-center">
          BMFH! One-stop destination for everything you need to plan <br /> for
          a perfect wedding.
        </p>
        <div className="flex justify-center">
          <div className="pr-3">
            <div className="text-center">
              <div className="relative mt-3 inline-block text-left">
                <button
                  className="px-4 py-2 bg-white rounded-md shadow-md"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  disabled={loading || !!error}
                >
                  {loading
                    ? "Loading..."
                    : selectedLocation || "Select Location"}
                </button>
                {dropdownOpen && (
                  <div className="absolute mt-2 bg-white shadow-md rounded-md w-full z-10">
                    {error ? (
                      <div className="px-4 py-2 text-red-500">{error}</div>
                    ) : locations.length > 0 ? (
                      locations.map((location, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setSelectedLocation(location);
                            setDropdownOpen(false);
                          }}
                          className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        >
                          {location}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-gray-500">
                        No locations available
                      </div>
                    )}
                  </div>
                )}
              </div>
              <button
                onClick={handleNavigate}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                View Venues
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
