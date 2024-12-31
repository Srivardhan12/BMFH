import { useState } from "react";

export default function Main() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Select location");
  const locations = ["Location 1", "Location 2", "Location 3", "Location 4"];

  const handleSelect = (location: string) => {
    setSelectedLocation(location);
    setDropdownOpen(false);
  };

  return (
    <div className="flex h-[70vh] justify-center items-center">
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
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center rounded-[5px] px-5 py-[13px] bg-blue-400 text-base font-medium text-white"
                >
                  {selectedLocation}
                  <span className="pl-4">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-current"
                    >
                      <path d="M10 14.25C9.8125 14.25 9.65625 14.1875 9.5 14.0625L2.3125 7C2.03125 6.71875 2.03125 6.28125 2.3125 6C2.59375 5.71875 3.03125 5.71875 3.3125 6L10 12.5312L16.6875 5.9375C16.9688 5.65625 17.4063 5.65625 17.6875 5.9375C17.9687 6.21875 17.9687 6.65625 17.6875 6.9375L10.5 14C10.3437 14.1563 10.1875 14.25 10 14.25Z" />
                    </svg>
                  </span>
                </button>
                <div
                  className={`absolute left-0 z-40 mt-2 w-full rounded-md bg-blue-100 py-[10px] shadow-1 transition-all ${dropdownOpen
                    ? "top-full opacity-100 visible"
                    : "top-[110%] invisible opacity-0"
                    }`}
                >
                  {locations.map((location, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelect(location)}
                      className="block w-full text-left py-2 px-5 text-base text-dark-5 hover:bg-blue-200"
                    >
                      {location}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="border my-3 focus:outline-none focus:ring-4 font-medium rounded-[5px] text px-5 py-3 me-2 mb-2 bg-blue-400 text-slate-100 border-gray-600 hover:bg-blue-500 hover:border-gray-600"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
