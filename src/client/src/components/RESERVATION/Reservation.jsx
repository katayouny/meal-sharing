import React, { useState } from "react";
import { useParams } from "react-router-dom";
import api_url from "../../api-url";
import "./Reservation.css";

function Reservation({ mealTitle }) {
  //mealTitle is comming from MealItemDetails as props
  const { id } = useParams();
  const [reservationFormData, setReservationFormData] = useState({
    number_of_guests: "",
    meal_id: Number(id),
    meal_title: mealTitle, //mealTitle, is getting in used by the prop sending from MealItemDetails
    created_date: "",
    contact_phonenumber: "",
    contact_name: "",
    contact_email: "",
  });

  const handleChange = (e) => {
    console.log(e.target.name);
    switch (e.target.name) {
      case "contact_name":
        setReservationFormData({
          ...reservationFormData,
          contact_name: e.target.value,
        });
        break;
      case "contact_email":
        setReservationFormData({
          ...reservationFormData,
          contact_email: e.target.value,
        });
        break;
      case "contact_phonenumber":
        setReservationFormData({
          ...reservationFormData,
          contact_phonenumber: e.target.value,
        });
        break;
      case "created_date":
        setReservationFormData({
          ...reservationFormData,
          created_date: e.target.value,
        });
        break;
      case "number_of_guests":
        setReservationFormData({
          ...reservationFormData,
          number_of_guests: Number(e.target.value),
        });
        break;
      default:
        throw new Error("Unknown input field");
    }
  };

  const resetFormData = () => {
    setReservationFormData({
      meal_id: Number(id),
      contact_name: "",
      contact_email: "",
      contact_phonenumber: "",
      created_date: "",
      number_of_guests: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(reservationFormData); // just for check

    try {
      const response = await fetch(api_url(`/api/reservations`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationFormData),
      });
      if (response.ok) {
        const responseData = await response.json();
        console.log("Reservation successfully done!", responseData);
        resetFormData();
        alert("Reservation successfully done!");
      } else {
        console.error("Reservation failed");
        alert("Reservation failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h3 className="reservation-form-title">Make your seat reservation</h3>
      <p style={{ fontSize: "12px", color: "brown" }}>
        Filling all fields is neccessary to make a reservation
      </p>

      <form method="post" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="contact_name"
            id="name"
            placeholder="Full name"
            onChange={handleChange}
            required
            value={reservationFormData.contact_name}
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email" //I have text type in database >>> ???
            name="contact_email"
            id="email"
            placeholder="name@domain.com"
            value={reservationFormData.contact_email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number: </label>
          <input
            type="tel" //I have text type in database  >>>  ???
            name="contact_phonenumber"
            id="phoneNumber"
            placeholder="+45 22332233"
            value={reservationFormData.contact_phonenumber}
            onChange={handleChange}
            required
          />
          {/* {isNaN(reservationFormData.name) && (
            <span style={{ color: "red" }}>Please insert a number</span>
          )} */}
        </div>
        <div>
          <label htmlFor="creationDate">Creation date: </label>
          <input
            type="date"
            name="created_date"
            id="creationDate"
            value={reservationFormData.created_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="numberOfGuests">Number of guests: </label>
          <input
            type="text"
            name="number_of_guests"
            id="numberOfGuests"
            placeholder="0"
            value={reservationFormData.number_of_guests}
            onChange={handleChange}
            required
            pattern="[0-9]*"
          />
        </div>
        <input type="submit" value="Make Reservation" />
      </form>
    </div>
  );
}

export default Reservation;
