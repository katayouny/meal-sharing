//Returns all meals that still have available spots left, if true.
//If false, return meals that have no available spots left. (api/meals?availableReservations=true)

// router.get("/", async (req, res) => {
//   const {
//     availableReservations,
//   } = req.query;
//   const response = {};
//   if (availableReservations === true) {
//     const result = await knex("meal")
//       .select("meal.*")
//       .innerJoin("reservation", "meal.id", "reservation.meal_id")
//       .groupBy("meal.id")
//       .having(
//         "meal.max_reservations",
//         ">",
//         knex.sum("reservation.number_of_guests")
//       );
//       response.data = result;
//       response.status = 200;
//       response.message = "Here are meals which have available spots left";
//     } else {
//       const result = await knex("meal")
//         .select("meal.*")
//         .innerJoin("reservation", "meal.id", "reservation.meal_id")
//         .groupBy("meal.id")
//         .having(
//           "meal.max_reservations",
//           "<",
//           knex.sum("reservation.number_of_guests")
//         );
//         response.data = result;
//       response.status = 200;
//       response.message = "Here are meals which have no available spots left";
//     }

// --Get meals that still has available reservations
// select meal.title as 'meals with avaiable reservations', meal_time, meal.location, max_reservations, number_of_guests as 'number of guests with reservation'
// from meal
// join reservation on meal.id=reservation.meal_id
// WHERE meal.max_reservations-reservation.number_of_guests>0;




// ------------------------------------------------------------------

// const handleChange = (e) => {
//     switch (e.target.name) {
//       case "name":
//         setReservationFormData({
//           ...reservationFormData,
//           contact_name: e.target.value.toLowerCase(),
//         });
//         break;
//       case "email":
//         setReservationFormData({
//           ...reservationFormData,
//           contact_email: e.target.value.toLowerCase(),
//         });
//         break;
//       case "phoneNumber":
//         setReservationFormData({
//           ...reservationFormData,
//           contact_phonenumber: e.target.value,
//         });
//         break;
//       case "createdDate":
//         setReservationFormData({
//           ...reservationFormData,
//           created_date: e.target.value, //.toISOString().split("T")[0]
//         });
//         break;


// case "created_date":
//         setReservationFormData({
//           ...reservationFormData,
//           created_date: e.target.value
//           // // 'en-GB' for dd/mm/yyyy format  //e.target.value, // new Date().toISOString().split("T")[0]
//           //new Date(e.target.value).toLocaleDateString()
//         });
//         break;


//       case "createdDate":
//         setReservationFormData({
//           ...reservationFormData,
//           number_of_guests: Number(e.target.value), //
//         });
//         break;
//     }
//   };


// ---------------- khodam --------------
//   // number_of_guests: e.target.value,
//   // contact_name: e.target.value.toLowerCase(),
//   // contact_email: e.target.value.toLowerCase(),
//   // contact_phonenumber: e.target.value,
//   // created_date: e.target.value, //date id datetime in database  >>>> ????
//   // number_of_guests: Number(e.target.value),
//   // });
