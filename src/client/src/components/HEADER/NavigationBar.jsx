import { NavLink } from "react-router-dom";
import "./NavigationBar.css";

function NavigationBar() {
  return (
    <nav>
      <ul className="navbar-style">
        <li className="nav-link-item-style">
          <NavLink to="/about">About us</NavLink>
        </li>
        <li className="nav-link-item-style">
          <NavLink to="/meals">See our meals</NavLink>
        </li>
        <li className="nav-link-item-style">
          <NavLink to="/contact">Contact us</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationBar;
