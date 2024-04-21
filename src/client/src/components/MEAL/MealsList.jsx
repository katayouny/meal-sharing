import React, { useState, useEffect } from "react";
import Meal from "./Meal";
import api_url from "../../api-url";

function MealsList() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(api_url("/api/meals"))
      .then((response) => response.json())
      .then((data) => {
        setMeals(data);
        console.log(data);
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
          <h2 className="welcome">Welcome to Meal Sharing APP</h2>
          <h4 className="list-title">
            List of meals and prices{" "}
            <p style={{ fontSize: "10px" }}>
              Hover over images for enlargement
            </p>
          </h4>

          <div className="grid-container">
            <ul>
              {meals.map((meal) => (
                <Meal key={meal.id} meal={meal} />
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default MealsList;
