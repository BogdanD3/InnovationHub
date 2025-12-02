import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

import Home from "./Pages/Home/Home";
import Problems from "./Pages/Problems/Problems";
// import SubmitProblem from "./pages/SubmitProblem";
// import Mentorship from "./pages/Mentorship";
// import Impact from "./pages/Impact";
// import About from "./pages/About";

import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/problems" element={<Problems />} />
        {/* <Route path="/submit" element={<SubmitProblem />} />
        <Route path="/mentorship" element={<Mentorship />} />
        <Route path="/impact" element={<Impact />} />
        <Route path="/about" element={<About />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
