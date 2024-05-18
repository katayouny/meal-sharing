import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Meals.css";

function Meal({ meal }) {
  const specialMeals = [
    "Nugget",
    "Omlet",
    "Pasta Alfredo",
    "Rød grød med fløde",
  ];

  // Define a style object to conditionally apply background image to meal card component
  // based on whether the meal is a special offer.
  const mealCardBackground = {
    backgroundImage: specialMeals.includes(meal.title)
      ? 'url("/images/limited-offer1.png")'
      : 'none'
  };
  // style={mealCardBackground} line 22 inside div
  return (
    <div className="meal-card">
      <div>
        {specialMeals.includes(meal.title) && (
          <img
            className="special-offer-image"
            src="/images/special-offer.png"
            alt="Special Offer"
          />
        )}
      </div>
      <div className="meal-title">{meal.title}</div>
      <div className="meal-description">{meal.description}</div>
      <div>
        <img className="meal-image" src={meal.image_url} alt={meal.title} />
      </div>
      <div className="meal-price">
        <strong>Price: </strong>
        <span style={{ color: "brown" }}>{meal.price} kr. </span>
      </div>
      <div>
        <Link to={`/meals/${meal.id}`}>
          <button className="see-meal-and-reservation-or-review-button">
            See details and book a seat
          </button>
        </Link>
      </div>
      <div>
        <Link to={`/meals/${meal.id}/review`}>
          <button className="see-meal-and-reservation-or-review-button">
            See meal reviews
          </button>
        </Link>
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
    image_url: PropTypes.string.isRequired,
  }).isRequired,
};

export default Meal;
