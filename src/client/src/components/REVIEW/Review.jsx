import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api_url from "../../api-url";
import "./Review.css";

function Review() {
  const { id } = useParams(); // Retrieve the ID from the URL(api-url+routh)
  console.log(id);
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reviews, setReviews] = useState([]);

  // Fetching all meal details for a specific meal id (${id})
  const fetchMealDetails = async () => {
    try {
      const response = await fetch(api_url(`/api/meals/${id}`));
      if (response.ok) {
        const data = await response.json();
        setMeal(data);
        setLoading(false);
      } else {
        throw new Error("Failed to fetch meal details");
      }
    } catch (error) {
      console.error("Error fetching meal details:", error);
      setError("The meal does not exist"); // ??????????????????
      setLoading(false);
    }
  };

  // Fetching data from the rout (meal) to ckech for meal reviews
  const mealReviews = async () => {
    try {
      const response = await fetch(api_url(`/api/meals/${id}/reviews`));
      if (response.ok) {
        // if data fetched successfully
        const data = await response.json();
        setReviews(data.data); //
        console.log("Fetched reviews data:", data.data);
        setLoading(false);
      } else {
        throw new Error("Failed to fetch reviews data");
      }
    } catch (error) {
      console.error("Error fetching reviews data:", error);
      setError("It is not possible to see reviews");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMealDetails();
    mealReviews();
  }, [id]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : meal ? (
        <div>
          <div className="meal-with-all-details-container">
            <h2>{meal.title}</h2>
            <p style={{ color: "brown" }}>
              <b>{meal.description}</b>
            </p>
            <img
              className="meal-image-inside-MealItemDetails"
              src={meal.image_url}
              alt={meal.title}
            />
          </div>
          <div>
            {reviews.length > 0 ? (
              reviews.map((item) => (
                <div key={item.id}>
                  <p>{item.title}</p>
                  <p>{item.description}</p>
                  <p>{item.stars}</p>
                </div>
              ))
            ) : (
              <p>No review is available for this meal</p>
            )}
          </div>
        </div>
      ) : (
        <h2>{error}</h2>
      )}
    </div>
  );
}

export default Review;
