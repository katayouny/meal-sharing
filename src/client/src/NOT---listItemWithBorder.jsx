// import PropTypes from "prop-types";
// const ListItemWithBorder = ({ children }) => {
//   return (
//     <li
//       style={{
//         border: "1px solid rgb(3, 0, 47)",
//         listStyleType: "none",
//         paddingTop: "12px",
//         paddingRight: "12px",
//         paddingBottom: "12px",
//         paddingLeft: "12px",
//         marginRight: "12px",
//         marginBottom: "4px",
//         borderRadius: "3px",
//         textAlign: "left",
//       }}
//     >
//       {children}
//     </li>
//   );
// };
// ListItemWithBorder.propTypes = {
//   children: PropTypes.node.isRequired,
// };
// export default ListItemWithBorder;


// async function fetchData() {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await fetch(`${API_URL}${debouncedQuery}`);
//       if (!response.ok) {
//         throw new Error("Network error");
//       }
//       const data = await response.json();
//       console.log(data);
//       setSearchResult(data.items);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setError(error.message);
//     }
//   }


//   useEffect(() => {
//     fetchData();
//   }, [debouncedQuery]);