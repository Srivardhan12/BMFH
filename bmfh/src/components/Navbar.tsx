import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center px-5 py-2 bg-blue-800">
      <div>
        <span className="text-2xl font-semibold text-white">
          <Link to="/">bmfh.in</Link>
        </span>
      </div>
      <div className="text-slate-100 font-semibold">IN Hyderabad</div>
    </div>
  );
}
