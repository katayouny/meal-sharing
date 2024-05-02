import { AiFillAlert } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api_url from "../../api-url";
import Reservation from "../RESERVATION/Reservation";
// import "../../App.css";

function MealItemDetails() {
  const { id } = useParams(); // Retrieve the ID from the URL(api-url+routh)
  const [meal, setMeal] = useState(null);
  const [leftSeats, setLeftSeats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [areAvailableReservation, setAreAvailableReservation] = useState(false);
  const [areReviews, setAreReviews] = useState(false);

  // Fetching all meal detaild for a specific meal id (${id})
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

  // Fetching data from the rout (meal) to ckech for seat avalability
  const fetchReservationAvailability = async () => {
    try {
      const response = await fetch(api_url(`/api/meals/${id}/reservations`));
      if (response.ok) {
        // if data fetched successfully
        const data = await response.json();
        setAreAvailableReservation(true); //
        setLeftSeats(data.numberOfSeatsLeft); //
        console.log("Fetched reservation data:", data); // data: { numberOfSeatsLeft }
        setLoading(false);
      } else {
        throw new Error("Failed to fetch reservation data");
      }
    } catch (error) {
      console.error("Error fetching reservation data:", error);
      setError("Reservation is not possible");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMealDetails();
    fetchReservationAvailability();
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
            <p>
              <b>Locations:</b> {meal.location}
            </p>
            <p>
              <b>Date:</b> {new Date(meal.meal_time).toLocaleDateString()}
            </p>
            <p>
              <b>Time:</b> {new Date(meal.meal_time).toLocaleTimeString()}
            </p>
            <p>
              <b>Max reservations:</b> {meal.max_reservations}{" "}
              <b>
                <span style={{ marginRight: "10px" }}></span>{" "}
                {/* Adding spaces */}
                {leftSeats > 0 ? (
                  <AiFillAlert color="green" fontSize="1.1em" />
                ) : (
                  <AiFillAlert color="red" fontSize="1.1em" />
                )}
                Seats left:{" "}
              </b>
              {leftSeats}
            </p>
            <p>
              <b>Price: </b>
              {meal.price} kr.
            </p>
            <img
              className="meal-image-inside-MealItemDetails"
              src={meal.image_url}
              alt={meal.title}
            />
          </div>
          <div>
            {areAvailableReservation ? (
              <Reservation mealTitle={meal.title} /> //mealTitle is sending to Reservation as props
            ) : (
              <p>No reservation is available for this meal</p>
            )}
          </div>
          <div>
            {/* <p> // need a button, 'Go to Meal Review'
              {" "}
              <Review />
            </p> */}
          </div>
        </div>
      ) : (
        <h2>{error}</h2>
      )}
    </div>
  );
}

export default MealItemDetails;
