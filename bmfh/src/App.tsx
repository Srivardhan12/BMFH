import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ViewData from "./components/ViewData";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <Router>
      <div className="h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/view-venue" element={<ViewData />} />
        </Routes>
      </div>
    </Router>
  );
}
