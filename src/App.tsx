import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Particles from "./Particles/Particles";

import Home from "./Pages/Home/Home";
import Problems from "./Pages/Problems/Problems";

import "./Global.css";
import Dashboard from "./Pages/Dashboard/Dashboard";
import TetrisPage from "./Pages/TetrisPage";

function App() {
  return (
    <Router>
      <div className="global-container">
        {/* Global background */}
        <Particles
          particleCount={300}
          particleBaseSize={60}
          moveParticlesOnHover={true}
          className="global-particles"
        />

        {/* Page content */}
        <Header />

        <div className="global-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/problems" element={<Problems />} />
            <Route path="/tetris" element={<TetrisPage />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
