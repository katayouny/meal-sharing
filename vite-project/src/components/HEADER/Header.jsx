import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import MealsList from "./components/MEAL/MealsList"; 
// import Reservation from "./components/RESERVATION/Reservation";
// import Review from "./components/REVIEW/Review"; 

function Header() {
  return (
    <div>
      <div>logo</div>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <NavLink to="/meals" activeClassName="active">go to meals page</NavLink> Test one
              </li>
              <li>
                {/* <NavLink to="/reservations" activeClassName="active">go to reservations form page</NavLink> */}two
              </li>
              <li>
                {/* <NavLink to="/reviews" activeClassName="active">go to reviews</NavLink> */}three
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/meals" element={<MealsList />} />
            {/* <Route path="/reservations" element={<Reservation />} />
            <Route path="/reviews" element={<Review />} /> */}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default Header;

/* <div> MENU BAR LINKS (COMONENTS.../PAGES)</div> */
/* <Routes> */
/* </Routes> */
