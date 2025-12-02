import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">InnovationHub</div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/problems">Problems</Link>
        <Link to="/submit">Submit</Link>
        <Link to="/mentorship">Mentorship</Link>
        <Link to="/impact">Impact</Link>
        <Link to="/about">About</Link>
      </nav>
    </header>
  );
};

export default Header;
