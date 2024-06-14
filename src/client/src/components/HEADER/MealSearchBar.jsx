import { useState, useEffect } from "react";
import api_url from "../../apiurl.js";
import "./Header.css";

function MealSearchBar() {
  const [query, setQuery] = useState("");
  const [mealSearchResult, setMealSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (query.trim() === "") {
      setMealSearchResult([]);
      setLoading(false);
      setError("");
      return;
    }

    const fetchMeal = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(api_url(`/api/meals?title=%${query}%`));
        if (response.ok) {
          const data = await response.json();
          setMealSearchResult(data.data);
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

    const debounceTimeout = setTimeout(() => {
      fetchMeal();
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [query]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <form>
        <label className="serach-for-our-meals" htmlFor="searchBar">
          Search for our meals:
          <input
            className="search-field"
            id="searchBar"
            type="text"
            placeholder="insert meal name"
            style={{}}
            value={query}
            onChange={handleChange}
          />
        </label>
      </form>

      {loading && <p style={{ color: "darkblue" }}>Loading...</p>}
      {!loading && error && <p style={{ color: "brown" }}>{error}</p>}
      {!loading && mealSearchResult.length > 0 && (
        <ul className="meal-serach-result-show-box">
          {mealSearchResult.map((meal) => (
            <li key={meal.id}>{meal.title}</li>
          ))}
        </ul>
      )}
      {!loading && mealSearchResult.length === 0 && query && (
        <p style={{ color: "brown", position: "fixed"}}>No match found</p>
      )}
    </div>
  );
}

export default MealSearchBar;
