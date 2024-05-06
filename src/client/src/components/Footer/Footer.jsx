import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-content">
      <div className="social-icons">
        <a href="https://www.facebook.com">
          <i className="fab fa-facebook">facebook</i>
        </a>
        <a href="https://www.Linkedin.com">
          <i className="fab fa-Linkedin">Linkedin</i>
        </a>
      </div>
      <div>
        <ul className="footer-site-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/meals">See our meals</Link>
          </li>
          <li>
            <Link to="/contact">Contact us</Link>
          </li>
        </ul>
      </div>
      <div>
        <p>© 2024. All rights reserved.</p>
        <p>Developed by Katayoun Yousefzadeh</p>
      </div>
    </footer>
  );
};

export default Footer;