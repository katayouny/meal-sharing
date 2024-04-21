import React from "react";
import PropTypes from "prop-types";
import ListItemWithBorder from "./listItemWithBorder";

function Meal({ meal }) {
  const specialMeals = ["Nugget", "Omlet"];
  return (

    <div>
    
      <ListItemWithBorder>
        <div className="meal-card">
          <h3>
            {meal.title}{" "}
            {specialMeals.includes(meal.title) && (
              <img
                className="offer-image"
                src="src/assets/images/special-offer.png"
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
            <img className="meal-image" src={meal.image_url} alt={meal.title} />
          </p>
        </div>
      </ListItemWithBorder>
    </div>

  );
}

Meal.propTypes = {
  meal: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default Meal;
