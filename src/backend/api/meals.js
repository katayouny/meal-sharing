const express = require("express");
const router = express.Router();
const knex = require("../database");

//------------ WEEK3 Meals Routs ---------------

router.get("/", async (req, res) => {
  const {
    maxPrice,
    availableReservations,
    title,
    dateAfter,
    dateBefore,
    limit,
    sortKey,
  } = req.query;

  let sortDir = req.query.sortDir;

  console.log({ maxPrice, availableReservations });
  const response = {};

  try {
    //Returns all meals that are cheaper than maxPrice (api/meals?maxPrice=80)
    if (maxPrice) {
      const result = await knex
        .select("*")
        .from("meal")
        .where("price", "<", +maxPrice);

      response.data = result;
      response.status = 200;
      response.message = "Here are meals that are cheaper than maxPrice";
    }

    //Returns all meals that still have available spots left, if true.
    //If false, return meals that have no available spots left. (api/meals?availableReservations=true)
     if (availableReservations===true) {
      const result = await knex.select('m.id', 'm.title', 'm.max_reservations', knex
      .raw('-SUM(r.number_of_guests) AS reserved'), knex
      .raw('m.max_reservations - SUM(r.number_of_guests) AS remaining_capacity'))
      .from('meal as m')
      .leftJoin('reservation as r', 'm.id', 'r.meal_id')
      .groupBy('m.id')
      .having(knex.raw('SUM(r.number_of_guests) < m.max_reservations'));

      response.data = result;
      response.status = 200;
      response.message = "Here are meals which have available spots left";
    } else {
      result = await knex.select('m.id', 'm.title', 'm.max_reservations', knex
      .raw('-SUM(r.number_of_guests) AS reserved'), knex
      .raw('m.max_reservations - SUM(r.number_of_guests) AS remaining_capacity'))
      .from('meal as m')
      .leftJoin('reservation as r', 'm.id', 'r.meal_id')
      .groupBy('m.id')
      .having(knex.raw('SUM(r.number_of_guests) > m.max_reservations'));

      response.data = result;
      response.status = 200;
      response.message = "Here are meals which have no available spots left";
    }
    
    //Returns all meals that partially match the given title.
    //Rød grød will match the meal with the title Rød grød med fløde. (api/meals?title=Rød%20grød)
    if (title) {
      const result = await knex
        .select("*")
        .from("meal")
        .where("title", "like", `%${title}%`);

      response.data = result;
      response.status = 200;
      response.message = "Meal name match found";
    }

    //Returns all meals where the date for meal_time is after the given date.(api/meals?dateAfter=2023-01-01)
    if (dateAfter) {
      console.log({ dateAfter, formatted: new Date(dateAfter) }); //meal_time is in datetime format in DB
      const result = await knex
        .select("*")
        .from("meal")
        .where("meal_time", ">", new Date(dateAfter));

      response.data = result;
      response.status = 200;
      response.message = "Meals with date after the given date";
    }

    //Returns all meals where the date for meal_time is before the given date.(api/meals?dateBefore=2024-01-01)
    if (dateBefore) {
      console.log({ dateBefore, formatted: new Date(dateBefore) }); //meal_time is in datetime format in DB
      const result = await knex
        .select("*")
        .from("meal")
        .where("meal_time", "<", new Date(dateBefore));

      response.data = result;
      response.status = 200;
      response.message = "Meals with date before the given date";
    }

    //Returns the given number of meals (api/meals?limit=7)
    if (limit) {
      const result = await knex
        .select("*")
        .from("meal")
        .orderBy("id", "asc")
        .limit(+limit);

      response.data = result;
      response.status = 200;
      response.message = `Here are the first ${limit} meals`;
    }

    //Returns all meals sorted by the given key. Allows when, max_reservations and price as keys.
    //Default sorting order is asc(ending). (api/meals?sortKey=price)
    if (["meal_time", "max_reservations", "price"].includes(sortKey)) {
      const result = await knex
        .select("*")
        .from("meal")
        .orderBy(sortKey, sortDir === "desc" ? sortDir : "asc");

      response.data = result;
      response.status = 200;
      response.message = "Meals sorted by the given sortKey";
    }

    //Returns all meals sorted in the given direction.
    //Only works combined with the sortKey and allows asc or desc. (api/meals?sortKey=price&sortDir=desc)
    if (["meal_time", "max_reservations", "price"].includes(sortKey)) {
      if (sortDir === "asc" || sortDir === "desc") {
        const result = await knex
          .select("*")
          .from("meal")
          .orderBy(sortKey, sortDir);

        response.data = result;
        response.status = 200;
        response.message =
          "Meals sorted by the given sort key and sort direction";
      }
    }

    // Returns all meals if no filter is given
    if (Object.keys(req.query).length === 0) {
      const result = await knex.select("*").from("meal");

      response.data = result;
      response.status = 200;
      response.message = "Here are all meals, as no filter key has been given";
    }

    console.log(response);

    res
      .status(response.status)
      .json({ data: response.data, message: response.message });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Returns all reviews for a specific meal. (/api/meals/:mealid/reviews)
router.get("/:mealid/reviews", async (req, res) => {
  const mealid = +req.params.mealid;
  const response = {};
  try {
    if (mealid) {
      const result = await knex
        .select("meal.title", "review.description")
        .from("meal")
        .join("review", "meal.id", "=", "review.meal_id")
        .where("meal.id", "=", mealid);

      response.data = result;
      response.status = 200;
      response.message = "Here are all reviews for the given meal id";
    }
    res
      .status(response.status || 404) // Set default status to 404 if no mealid is provided
      .json({ data: response.data || [], message: response.message || "No reviews found" });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
