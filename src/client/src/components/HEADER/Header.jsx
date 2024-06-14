import Logo from "./Logo";
import NavigationBar from "./NavigationBar";
import MealSearchBar from "./MealSearchBar";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <div className="logo">
        <Logo />
      </div>
      <div>
        <p className="header-slogan">Taste a new experience with us</p>
      </div>
      <div>
        <MealSearchBar />
      </div>
      <div>
        <NavigationBar />
      </div>
    </div>
  );
}

export default Header;
