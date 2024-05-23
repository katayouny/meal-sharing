import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="social-icons">
        <span>
          <a href="https://www.facebook.com">
            <FaFacebook />
          </a>
        </span>
        <span>
          <a href="https://www.linkedin.com/in/katayoun-yousefzadeh/">
            <IoLogoLinkedin />
          </a>
        </span>
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
      <div className="name-and-copyright">
        <p>© 2024. All rights reserved.</p>
        <p>
          Developed by:{" "}
          <strong>
            <a
              href="mailto:k.yousefzadeh@gmail.com"
              style={{ color: "#001d0b" }}
            >
              Katayoun Yousefzadeh
            </a>
          </strong>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
