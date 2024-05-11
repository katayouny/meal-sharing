import { AiFillAlert } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api_url from "../../api-url";
import Reservation from "../reservation/Reservation";
import { Link } from "react-router-dom";
import "./MealItemDetails.css";

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
      setError("The meal does not exist");
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
        <div className="main-container">
          <div className="meal-with-all-details-container">
              <h3 className="meal-title">{meal.title}</h3>
              <p className="meal-text-items">
                <b>{meal.description}</b>
              </p>
              <img
                className="meal-image-inside-MealItemDetails"
                src={meal.image_url}
                alt={meal.title}
              />       
            <div>
              <p className="meal-text-items">
                <b>Locations:</b> {meal.location}
              </p>
              <p className="meal-text-items">
                <b>Date:</b>{" "}
                {new Date(meal.meal_time).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
              <p className="meal-text-items">
                <b>Time:</b>{" "}
                {new Date(meal.meal_time).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p className="meal-text-items">
                <b>Price: </b>
                {meal.price} kr.
              </p>
              <p className="meal-text-items">
                <b>Max reservations:</b> {meal.max_reservations}
              </p>
              <p className="meal-text-items">
                {leftSeats > 0 ? (
                  <AiFillAlert color="green" fontSize="1.1em" />
                ) : (
                  <AiFillAlert color="red" fontSize="1.1em" />
                )}
                <span style={{ marginRight: "3px" }}></span>
                <b>Seats left:</b> {leftSeats}
              </p>
            </div>
            <div>
            <Link to={`/meals/${meal.id}/review`}>
              <button className="go-to-reviews-button">See meal reviews</button>
            </Link>
          </div>
          </div>
          <div>
            {leftSeats > 0 ? (
              <Reservation mealTitle={meal.title} /> //mealTitle is sending to Reservation as props
            ) : (
              <p className="no-reservation-availabele-message">No reservation available for this meal</p>
            )}
          </div>
          
        </div>
      ) : (
        <h2>{error}</h2>
      )}
    </div>
  );
}

export default MealItemDetails;
