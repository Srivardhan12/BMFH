import Main from "./Main";
import PopVenue from "./Popvenue";

export default function Home() {
  return (
    <div>
      <div className="relative bg-[url('./assets/landing-page-image.jpg')] bg-cover bg-center h-4/5">
        <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
        <div className="relative z-20">
          <Main />
        </div>
      </div>
      <PopVenue />
    </div>
  );
}
