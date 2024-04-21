// import { useState, useEffect } from "react";
// import ListItemWithBorder from "./listItemWithBorder.jsx";
// import api_url from "../api-url.js";


function MealsList() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch(api_url("/api/meals")) //calling api function to get the whole route
      .then((response) => response.json())
      .then((data) => {
        setMeals(data);
        setLoading(false);
      })

      .catch((error) => console.error("Error fetching meals:", error));
  }, []);


  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        ((<h4 className="title">List of meals and prices</h4>),
        (
          <ul style={{ paddingLeft: "30px" }}>
            {meals.map((meal) => (
              <ListItemWithBorder key={meal.id}>
                <strong> {meal.title} </strong> : <i> {meal.description} </i> ,{" "}
                <strong>price:</strong> {meal.price} kr.
              </ListItemWithBorder>
             
            ))}
          </ul>
        ))
      )}
    </div>
  );
}
//export default MealsList;


/* background-image: url('https://img.freepik.com/premium-photo/rosh-hashanah-jewish-new-year-holiday-concept-traditional-religion-symbols_53476-6003.jpg?w=1380'); */