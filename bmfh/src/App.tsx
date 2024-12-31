import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx"
import Home from "./components/Home.jsx"
import ViewData from "./components/ViewData.jsx"

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
    </Router >
  );
}
