// import "./App.css";
import "./Header.css"
import Logo from "./Logo";
import NavigationBar from "./NavigationBar";
// import Search from "./Search";

function Header() {
  return (
    <div className="header">
      <div className="logo">
        <Logo />
      </div>
      <div>
        <p className="header-slogan">Unlock Culinary Adventures</p>
      </div>
      {/* <div>
        <Search />
      </div> */}
      <div>
        <NavigationBar />
      </div>
    </div>
  );
}

export default Header;
