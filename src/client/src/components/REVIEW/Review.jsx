import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api_url from "../../api-url";
import { Link } from "react-router-dom";
import GiveFeedback from "./GiveFeedback";
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
      <div>
      {loading ? (
        <p>Loading...</p>
      ) : meal ? (
        <div>
          <div className="meal-with-details-container">
            <h2 className="meal-title-in-review">{meal.title}</h2>
            <p style={{ color: "#233638" }}>
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
                  <p><strong>Review title: </strong> {item.title}</p>
                  <p><strong>Review description: </strong> {item.description}</p>
                  <p><strong>Stars: </strong> {item.stars} of 10</p>
                </div>
              ))
            ) : (
              <p>There is no review for this meal</p>
            )}
          </div>
        </div>
      ) : (
        <h2>{error}</h2>
      )}
<GiveFeedback/>
      <div>
      <Link to={`/meals/${id}`}>
          <button className="go-to-reservation">Make a reservation</button>
        </Link>
      </div>
      </div>
    </div>
  );
}

export default Review;
