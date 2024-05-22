import { useState, useEffect } from "react";
// import { useDebounce } from "use-debounce";
import api_url from "../../api-url.js";
import "./Header.css";

function MealSearchBar() {
  const [query, setQuery] = useState("");
  // const [debouncedQuery] = useDebounce(query, 1000);
  const [mealSearchResult, setMealSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const fetchMeal = async () => {
      try {
        const response = await fetch(api_url(`/api/meals?title=%${query}%`));
        if (response.ok) {
          const data = await response.json();
          console.log(data.data);
          setMealSearchResult(data.data);
          setLoading(false);
        } else {
          throw new Error("Failed to fetch meal");
        }
      } catch (error) {
        console.error("Error fetching meal:", error);
        setError("The meal does not exist");
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchMeal();
    }, [query]);

    return (
      <>
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="serachBar">
              Search for meal:
              <input
                id="searchBar"
                type="text"
                placeholder="insert meal name"
                style={{
                  border: "1px solid rgb(3, 0, 47)",
                  marginLeft: "5px",
                  paddingLeft: "3px",
                }}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
              />
            </label>
            <button type="submit">Search for meal</button>
          </form>
        </div>

        <div>
          {loading && <p style={{ color: "darkblue" }}>Loading...</p>}
          {!loading ? (
            query.trim() === "" ? (
              alert("Insert a meal name")
            ) : mealSearchResult.length === 0 ? (
              <p style={{ color: "brown" }}>No match found</p>
            ) : (
              <ul>
                {mealSearchResult.map((meal) => (
                  <li key={meal.id}>{meal.title}</li>
                ))}
              </ul>
            )
          ) : (
            <h3>{error}</h3>
          )}
        </div>
      </>
    );
  };
}
// export default MealSearchBar;

// import { useState, useEffect } from "react";
// import api_url from "../../api-url.js";
// import "./Header.css";

// function MealSearchBar() {
//   const [query, setQuery] = useState("");
//   const [mealSearchResult, setMealSearchResult] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchMeal = async () => {
//       if (query.trim() === "") {
//         return;
//       }

//       setLoading(true);
//       setError("");

//       try {
//         const response = await fetch(api_url(`/api/meals?title=%${query}%`));
//         if (response.ok) {
//           const data = await response.json();
//           console.log(data.data);
//           setMealSearchResult(data.data);
//           if (data.data.length === 0) {
//             setError("No match found");
//           }
//         } else {
//           throw new Error("Failed to fetch meal");
//         }
//       } catch (error) {
//         console.error("Error fetching meal:", error);
//         setError("Failed to fetch meal");
//         setMealSearchResult([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMeal();
//   }, [query]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setQuery(e.target.query.value);
//   };

//   return (
//     <>
//       <div className="meal-search-bar">
//         <form onSubmit={handleSubmit}>
//           <label htmlFor="searchBar">
//             Search for meal:
//             <input
//               name="query"
//               id="searchBar"
//               type="text"
//               placeholder="insert meal name"
//               style={{
//                 border: "1px solid rgb(3, 0, 47)",
//                 marginLeft: "5px",
//                 paddingLeft: "3px",
//               }}
//             />
//           </label>
//           <button type="submit">Search for meal</button>
//         </form>
//       </div>

//       <div>
//         {loading && <p style={{ color: "darkblue" }}>Loading...</p>}
//         {!loading && error && <p style={{ color: "red" }}>{error}</p>}
//         {!loading && mealSearchResult.length > 0 && (
//           <ul>
//             {mealSearchResult.map((meal) => (
//               <li key={meal.id}>{meal.title}</li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </>
//   );
// }

// export default MealSearchBar;

// import { useState, useEffect } from "react";
// // import { useDebounce } from "use-debounce";
// import api_url from "../../api-url.js";
// import "./Header.css";

// function MealSearchBar() {
//   const [query, setQuery] = useState("");
//   // const [debouncedQuery] = useDebounce(query, 1000);
//   const [mealSearchResult, setMealSearchResult] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     const fetchMeal = async () => {
//       try {
//         const response = await fetch(api_url(`/api/meals?title=%${query}%`));
//         if (response.ok) {
//           const data = await response.json();
//           console.log(data.data);
//           setMealSearchResult(data.data);
//           setLoading(false);
//         } else {
//           throw new Error("Failed to fetch meal");
//         }
//       } catch (error) {
//         console.error("Error fetching meal:", error);
//         setError("The meal does not exist");
//       } finally {
//         setLoading(false);
//       }
//     };

//     useEffect(() => {
//       fetchMeal();
//     }, [query]);

//     return (
//       <>
//         <div>
//           <form>
//             <label htmlFor="serachBar">
//               Search for meal:
//               <input
//                 id="searchBar"
//                 type="text"
//                 placeholder="insert meal name"
//                 style={{
//                   border: "1px solid rgb(3, 0, 47)",
//                   marginLeft: "5px",
//                   paddingLeft: "3px",
//                 }}
//                 value={query}
//                 onChange={(e) => {
//                   setQuery(e.target.value);
//                 }}
//               />
//             </label>
//             <input type="button" onClick={handleChange}>
//               Search for meal
//             </input>
//           </form>
//         </div>

//         <div>
//           {loading && <p style={{ color: "darkblue" }}>Loading...</p>}
//           {!loading ? (mealSearchResult.length === 0 &&
//             <p style={{ color: "brown" }}>No match found</p>) : (mealSearchResult.length > 0 &&
//             <ul>
//               {mealSearchResult.map((meal) => (
//                 <li key={meal.id}>{meal.title}</li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </>
//     );
//   };
// }
// export default MealSearchBar;




// import { useState, useEffect } from "react";
// import api_url from "../../api-url.js";
// import "./Header.css";

// function MealSearchBar() {
//   const [query, setQuery] = useState("");
//   const [mealSearchResult, setMealSearchResult] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchMeal = async () => {
//       if (query.trim() === "") {
//         return;
//       }

//       setLoading(true);
//       setError("");

//       try {
//         const response = await fetch(api_url(`/api/meals?title=%${query}%`));
//         if (response.ok) {
//           const data = await response.json();
//           console.log(data.data);
//           setMealSearchResult(data.data);
//           if (data.data.length === 0) {
//             setError("No match found");
//           }
//         } else {
//           throw new Error("Failed to fetch meal");
//         }
//       } catch (error) {
//         console.error("Error fetching meal:", error);
//         setError("Failed to fetch meal");
//         setMealSearchResult([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMeal();
//   }, [query]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setQuery(e.target.query.value);
//   };

//   return (
//     <>
//       <div className="meal-search-bar">
//         <form onSubmit={handleSubmit}>
//           <label htmlFor="searchBar">
//             Search for meal:
//             <input
//               name="query"
//               id="searchBar"
//               type="text"
//               placeholder="insert meal name"
//               style={{
//                 border: "1px solid rgb(3, 0, 47)",
//                 marginLeft: "5px",
//                 paddingLeft: "3px",
//               }}
//             />
//           </label>
//           <button type="submit">Search for meal</button>
//         </form>
//       </div>

//       <div>
//         {loading && <p style={{ color: "darkblue" }}>Loading...</p>}
//         {!loading && error && <p style={{ color: "red" }}>{error}</p>}
//         {!loading && mealSearchResult.length > 0 && (
//           <ul>
//             {mealSearchResult.map((meal) => (
//               <li key={meal.id}>{meal.title}</li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </>
//   );
// }

// export default MealSearchBar;
