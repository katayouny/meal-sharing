import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Meals.css";

function Meal({ meal }) {
  const specialMeals = ["Nugget", "Omlet"];
  return (
    <div>
      <div className="meal-card">
        <h3>
          {meal.title}{" "}
          {specialMeals.includes(meal.title) && (
            <img
              className="special-offer-image"
              src="/images/special-offer.png"
              alt="Special Offer"
            />
          )}
        </h3>
        <p className="description">{meal.description}</p>
        <p>
          <strong>Price: </strong>
          <span style={{ color: "brown" }}>{meal.price} kr. </span>
        </p>
        <p>
          <img
            className="first-meal-image"
            src={meal.image_url}
            alt={meal.title}
          />
        </p>
        <div>
            <Link to={`/meals/${meal.id}`}>
              <button className="see-meal-and-reservation-or-review-button">
                See meal details and book a seat with us
              </button>
            </Link>
        </div>
        <div>
            <Link to={`/meals/${meal.id}/review`}> 
              <button className="see-meal-and-reservation-or-review-button" > 
                See meal and reviews
              </button>
            </Link>
        </div>
      </div>
    </div>
  );
}

Meal.propTypes = {
  meal: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    max_reservations: PropTypes.number.isRequired,
  }).isRequired,
};

export default Meal;
