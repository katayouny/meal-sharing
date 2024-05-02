import { NavLink } from "react-router-dom";
import "./NavigationBar.css";

function NavigationBar() {
  return (
    <nav>
      <ul className="nav-style">
      <li className="nav-li-style">
          <NavLink to="/about">About us</NavLink>
        </li>
        <li className="nav-li-style">
          <NavLink to="/meals">See our meals</NavLink>
        </li>
        <li className="nav-li-style">
          <NavLink to="/contact">Contact us</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationBar;