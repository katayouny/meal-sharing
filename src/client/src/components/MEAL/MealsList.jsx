import { useState, useEffect } from "react";
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
        setMeals(
          data.data.map((meal) => ({
            ...meal,
            price: parseFloat(meal.price),
          }))
        );
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
          <div className="grid-container">
            {meals.map((meal) => (
                <Meal meal={meal} key={meal.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MealsList;
