import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-inner">
        <h2>Innovation Hub</h2>
        <nav>
          <a href="/">Home</a>
          <a href="/dashboard">Dashboard</a>
          <a href="/problems">Problemi</a>
          <a href="/tetris">Tetris</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
