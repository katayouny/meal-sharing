import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MealsList from "./components/MEAL/MealsList";
import Reservation from "./components/RESERVATION/Reservation";
import Review from "./components/REVIEW/Review";
import Homepage from "./components/Homepage";
import NotFoundRoutePage from "./components/NotFoundRoutePage";
import Header from "/src/components/HEADER/Header";
import Footer from "./components/Footer";
import "./App.css";

// const router = createBrowserRouter([
//   {
//     path: '/', element: <Root />, errorElement: <Error />, children: [
//       { path: '/', element: <p>Home </p> },
//       { path: '/about', element: <p>About</p> },
//       { path: '/contact', element: <p>Contact</p> },

//     ],
//   },
//   { path: '*', element: <p>Not found</p> }
// ])

// function App() {
//   return (
//     <div>
//       <RouterProvider router={router} />
//     </div>
//   )
// }

function App() {
  return (
    <div>
      {/* <h2 className="welcome">Welcome to Meal Sharing APP</h2> */}

      <Header />

      <Router>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/meals" element={<MealsList />} />
          <Route exact path="/reservations" element={<Reservation />} />
          <Route exact path="/reviews" element={<Review />} />
          <Route exact path="/*" element={<NotFoundRoutePage />} />
        </Routes>
      </Router>

      <Footer />
    </div>
  );
}

export default App;
