import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
} from "react-router-dom";

// import { createContext } from "react";
import MealsList from "./components/Meal/MealsList";
import MealDetailsAndReservation from "./components/Meal/MealDetailsAndReservation";
import Homepage from "./components/Homepage";
import PageNotFound from "./components/PageNotFound";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import About from "./Pages/AboutUs";
import Contact from "./Pages/ContactUs";
import Review from "./components/Review/Review";
import "./App.css";

// const userContext = createContext(null);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />}>
      <Route exact path="/" element={<Homepage />} />
      <Route exact path="/meals" element={<MealsList />} />
      <Route exact path="/meals/:id" element={<MealDetailsAndReservation />} />
      <Route exact path="/meals/:id/review" element={<Review />} />
      <Route exact path="/about" element={<About />} />
      <Route exact path="/contact" element={<Contact />} />
      <Route exact path="/*" element={<PageNotFound />} />
    </Route>
  )
);

function App() {
  // const [loading, setLoading] = useState(true);
  // const [error, setError] =useState(null);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

function Root() {
  return (
    <>
      {/* <userContext.Provider value={{ query, setQuery, loading, error, searchResult }}> */}
      <Header />
      <Outlet />
      <Footer />
      {/* </userContext.Provider> */}
    </>
  );
}

export default App;

/* <Route exact path="/reservations" element={<Reservation />} /> */
/* <Route exact path="/reviews" element={<Review />} /> */

// import Reservation from "./components/RESERVATION/Reservation";
// import Review from "./components/REVIEW/Review";
