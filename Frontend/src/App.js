import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Diabetes from "./pages/Diabetes";
import Heart from "./pages/Heart";
import Kidney from "./pages/Kidney";
import Alzheimer from "./pages/Alzheimer";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#060b14] text-white font-body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/diabetes" element={<Diabetes />} />
          <Route path="/heart" element={<Heart />} />
          <Route path="/kidney" element={<Kidney />} />
          <Route path="/alzheimer" element={<Alzheimer />} />
        </Routes>
      </div>
    </Router>
  );
}
