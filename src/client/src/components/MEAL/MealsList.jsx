// This component fetches all meals from /api/meals and calls Meal function
import React, { useState, useEffect } from "react";
import Meal from "./Meals";
import api_url from "../../api-url";
import "./MealsList.css";

function MealsList() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(api_url("/api/meals"))
      .then((response) => response.json())
      .then((data) => {
        setMeals(data.data);

        // price is a decimal number and max_reservation is integer and in the database =>
        // Convert string price type to float number price type and max_reservation to integer for each meal
        // const mealsWithConvertedPriceSringToFloat = data.data.map((meal) => ({
        //   ...meal,
        //   max_reservations: parseInt(meal.max_reservations),
        //   price: parseFloat(meal.price),
        // }));

        setMeals(
          data.data.map((meal) => ({
            ...meal,
            price: parseFloat(meal.price),
          }))
        );

        console.log(data.data); // Just for check

        setLoading(false);
      })
      .catch((error) => console.error("Error fetching meals:", error));
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2 className="title-slogan">
            Come and try our delicious meals{" "}
            <p className="make-enlargement">
              Hover over images for enlargement
            </p>
          </h2>
          <div className="grid-container">
            <div className="grid">
              {meals.map((meal) => (
                <div className="grid-item" key={meal.id}>
                  <Meal meal={meal} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MealsList;

 {/* <ul>
              {meals.map((meal) => (
                <li className="li-style" key={meal.id}>
                  <Meal meal={meal} />
                </li>
              ))}
            </ul> */}
            