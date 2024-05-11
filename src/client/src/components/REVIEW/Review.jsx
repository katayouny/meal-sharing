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
        setReviews(data.data); 
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
          <div className="main-container">
            <div className="meal-with-details-container">
              <h3 className="meal-title-in-review">{meal.title}</h3>
              <p className="meal-text-items">
                <b>{meal.description}</b>
              </p>
              <img
                className="meal-image-inside-MealItemDetails"
                src={meal.image_url}
                alt={meal.title}
              />
              <div>
                <Link to={`/meals/${id}`}>
                  <button className="go-to-reservation-button">
                    Make a reservation
                  </button>
                </Link>
              </div>
            </div>
            {reviews.length > 0 ? (
              <ul className="reviews-container">
                {reviews.map((item) => (
                  <li className="review-list-item" key={item.id}>
                    <p>
                      <strong>Review title: </strong> {item.title}
                    </p>
                    <p>
                      <strong>Date: </strong> {new Date(item.created_date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
                    </p>
                    <p>
                      <strong>Review description: </strong> {item.description}
                    </p>
                    <p>
                      <strong>Stars: </strong> {item.stars} out of 10
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-review-message">
                There is no review for this meal
              </p>
            )}
            <GiveFeedback />
          </div>
        ) : (
          <h2>{error}</h2>
        )}
      </div>
    </div>
  );
}

export default Review;
