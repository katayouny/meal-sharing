import "./Header.css";
import Logo from "./Logo";
import NavigationBar from "./NavigationBar";

function Header() {
  return (
    <div className="header">
      <div className="logo">
        <Logo />
      </div>
      <div>
      <p className="header-slogan">Taste a new experience with us!</p>
      </div>
      <div>
        <NavigationBar />
      </div>
    </div>
  );
}

export default Header;
