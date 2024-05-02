// import { useState } from "react";
// import api_url from "../../api-url";


// const API_URL = "https://api.github.com/search/users?q=";

// function Search() {
//     const [searchInput, setSearchInput]=useState("");
//     const [meals, setMeals] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const handleChange=(e) => {
//         setSearchInput(e.target.value);
//               };

//     const handleSubmit = (e) => { 
//          e.preventDefault();
         
//          useEffect(() => {
//             fetch(api_url("/api/meals/title"))
//               .then((response) => response.json())
//               .then((data) => {
//                 setMeals(data.data)

//               setMeals(
//                 data.data.map((meal) => ({
//                   ...meal,
//                   price: parseFloat(meal.price),
//                 }))
//               );
      
//               console.log(data.data); // Just for check
      
//               setLoading(false);
//             })
//             .catch((error) => console.error("Error fetching meal:", error));
//         }, []);



//     return (
//       <div>
//         <form method="get" onSubmit={handleSubmit}>
//         <label htmlFor="searchBar">Search meal:
//           <input
//             type="text"
//             name="search"
//             id="searchBar"
//             placeholder="Meal name"
//             required
//             value={searchInput}
//             onChange={handleChange}
//           />
//         </label>
//         <input type="submit">Serach</input>
//         </form>
//       </div>
//     );
// }
  
// export default Search;

