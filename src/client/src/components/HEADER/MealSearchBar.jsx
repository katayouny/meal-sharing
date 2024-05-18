import { useState, useEffect } from "react";
// import { useDebounce } from "use-debounce";
import api_url from "../../api-url";
import "./Header.css";

function MealSearchBar() {
  const [query, setQuery] = useState("");
  // const [debouncedQuery] = useDebounce(query, 1000);
  const [mealSearchResult, setMealSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const fetchMeal = async () => {
      try {
        const response = await fetch(api_url(`/api/meals?title=${query}`));
        console.log(response);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setMealSearchResult(data);
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
        {loading && <div style={{ color: "darkblue" }}>Loading...</div>}
        {error && (
          <div style={{ color: "brown" }}>Error fetching data: {error}</div>
        )}
        {!loading && query && mealSearchResult.length === 0 &&(
          <div style={{ color: "brown" }}>No match found</div>
        )}
        {!loading && query && mealSearchResult.length > 0 && (
          <ul>
            {mealSearchResult.map((meal) => (
              <li key={meal.id}>{meal.title}</li>
            ))}
          </ul>
        )}
        </>
    );
  };
}
export default MealSearchBar;
