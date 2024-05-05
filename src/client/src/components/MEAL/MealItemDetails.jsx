import { AiFillAlert } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api_url from "../../api-url";
import Reservation from "../RESERVATION/Reservation";
import { Link } from "react-router-dom";
// import "../../App.css";

function MealItemDetails() {
  const { id } = useParams(); // Retrieve the ID from the URL(api-url+routh)
  const [meal, setMeal] = useState(null);
  const [leftSeats, setLeftSeats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [areAvailableReservation, setAreAvailableReservation] = useState(false);

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
            <div>
            <h2 style={{color:"#982e1d"}}>{meal.title}</h2>
            <p className="text-items">
              <b>{meal.description}</b>
            </p>
            <p className="text-items">
              <b>Locations:</b> {meal.location}
            </p>
            <p className="text-items">
              <b>Date:</b> {new Date(meal.meal_time).toLocaleDateString()}
            </p>
            <p className="text-items">
              <b>Time:</b> {new Date(meal.meal_time).toLocaleTimeString()}
            </p>
            <p className="text-items">
              <b>Price: </b>
              {meal.price} kr.
            </p>
            <p className="text-items">
              <b>Max reservations:</b> {meal.max_reservations}
              <b>
                {/* Adding spaces */}
                <span style={{ marginRight: "14px" }}></span>
                {leftSeats > 0 ? (
                  <AiFillAlert color="green" fontSize="1.1em" />
                ) : (
                  <AiFillAlert color="red" fontSize="1.1em" />
                )}
                {/* Adding spaces */}
                <span style={{ marginRight: "3px" }}></span>
                Seats left:
              </b>
              <span style={{ marginRight: "10px" }}> {leftSeats}</span>
            </p>
            </div>
            <div>
            <img
              className="meal-image-inside-MealItemDetails"
              src={meal.image_url}
              alt={meal.title}
            />
            </div>
          </div>
          <div>
            {areAvailableReservation ? (
              <Reservation mealTitle={meal.title} /> //mealTitle is sending to Reservation as props
            ) : (
              <p>No reservation is available for this meal</p>
            )}
          </div>
          <div>
          <Link to={`/meals/${meal.id}/review`}>
            <button className="go-to-review">
              See meal reviews
            </button>
          </Link>
        </div>
        </div>
      ) : (
        <h2>{error}</h2>
      )}
    </div>
  );
}

export default MealItemDetails;
