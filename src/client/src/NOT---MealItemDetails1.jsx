// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import api_url from "../../api-url";
// import Reservation from "../RESERVATION/Reservation";
// import "./App.css";

function MealItemDetails() {
  const { id } = useParams(); // Retrieve the ID from the URL(path)
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [availableReservation, setAvailableReservation]=useState(false)

  // Fetch meal details based on the ID
  const fetchMealDetails = async () => {
    try {
      const response = await fetch(api_url(`/api/meals/${id}`));
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched data:", data); // Debugging statement
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

  useEffect(() => {
    fetchMealDetails();
  }, [id]);

  return (
    <div>
      <div>
      {loading ? (
        <p>Loading...</p>
      ) : meal ? (
        <div className="meal-with-all-details">
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
            <b>Max reservations:</b> {meal.max_reservations}
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
      ) : (
        <h2>{error}</h2>
      )}
</div>

      const fetchReservationAvalability = async () => {
    try {
      const response = await fetch(api_url(`api/meals?availableReservations`));  //api/meals/${id}
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched data:", data); // Debugging statement
        setAvailableReservation(true);
        <div>
            <Reservation />
          </div>
        setLoading(false);
      } else {
        throw new Error("Failed to fetch reservation data");
      }
    } catch (error) {
      console.error("Error fetching reservation data:", error);
      setError("Reservation is not posssible");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservationAvalability();
  }, [id]);
   
    </div>
  );
}

// export default MealItemDetails;
