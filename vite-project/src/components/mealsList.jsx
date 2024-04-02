import { useState, useEffect } from "react";
import ListItemWithBorder from "./listItemWithBorder.jsx";
import api_url from "../api-url.js";

function MealsList() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(api_url("/api/meals")) //calling api function to get the whole route
      .then((response) => response.json())
      .then((data) => {
        setMeals(data.data);
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
                <strong><i>price: </i></strong> {meal.price} kr.
              </ListItemWithBorder> 
              
            ))}
          </ul>
        ))
      )}
    </div>
  );
}
export default MealsList;

//--------------------------------------------------------------------------------

// import React, { useState, useEffect } from "react";

// const API_URL = "/api/meals";

// function MealsList() {
//   const [meals, setMeals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch(API_URL)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Failed to fetch meals');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setMeals(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching meals:', error);
//         setError(error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error.message}</p>;
//   }

//   return (
//     <div>
//       <h4>List of meals and prices</h4>
//       <ul style={{ paddingLeft: "30px" }}>
//         {meals.map((meal) => (
//           <li key={meal.id}>
//             {meal.title} : {meal.description} , {meal.price} kr.
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default MealsList;

//..........................................................................

// import React, { useState, useEffect } from "react";

// //const API_URL = "https://localhost:5000/api/meals";

// function MealsList() {
//   const [meals, setMeals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch(API_URL)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Failed to fetch meals');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setMeals(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching meals:', error);
//         setError(error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error.message}</p>;
//   }

//   return (
//     <div>
//       <h4>List of meals and prices</h4>
//       <ul style={{ paddingLeft: "30px" }}>
//         {meals.map((meal) => (
//           <li key={meal.id}>
//             {meal.title} : {meal.description} , {meal.price} kr.
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default MealsList;
