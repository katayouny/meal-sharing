import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
} from "react-router-dom";

import MealsList from "./components/meal/MealsList";
import MealDetailsAndReservation from "./components/meal/MealDetailsAndReservation";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import About from "./pages/AboutUs";
import Contact from "./pages/ContactUs";
import Review from "./components/review/Review";

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
  return (
    <div className="main-wrapper">
      <RouterProvider router={router} />
    </div>
  );
}

function Root() {
  return (
    <>
      <Header />
      <Outlet/>
      <Footer />
    </>
  );
}

export default App;
