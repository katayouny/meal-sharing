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
  const response = {};

  try {
    //Returns all meals that are cheaper than maxPrice (api/meals?maxPrice=80)
    if (maxPrice) {
      const result = await knex
        .select("*")
        .from("meal")
        .where("price", "<", maxPrice); //+maxPrice

      response.data = result;
      response.status = 200;
      response.message = "Here are meals that are cheaper than maxPrice";
    }

    //Returns all meals that still have available spots left, if true.
    //If false, return meals that have no available spots left. (api/meals?availableReservations=true)
    if (availableReservations === true) {
      const result = await knex("meal")
        .select("meal.*")
        .innerJoin("reservation", "meal.id", "reservation.meal_id")
        .groupBy("meal.id")
        .having(
          "meal.max_reservations",
          ">",
          knex.sum("reservation.number_of_guests")
        );

      response.data = result;
      response.status = 200;
      response.message = "Here are meals which have available spots left";
    } else {
      const result = await knex("meal")
        .select("meal.*")
        .innerJoin("reservation", "meal.id", "reservation.meal_id")
        .groupBy("meal.id")
        .having(
          "meal.max_reservations",
          "<",
          knex.sum("reservation.number_of_guests")
        );

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
      console.log(result); //console.log(result.map(item => item.price));

      response.status = 200;
      response.message =
        "Here are all meals, as no filter key has been provided";
    }
    res
      .status(response.status)
      .json({ data: response.data, message: response.message });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// -------------------------------------------------------------------------------

//Returns all reviews for a specific meal. (/api/meals/:id/reviews)
router.get("/:id/reviews", async (req, res) => {
  const id = +req.params.id;
  const response = {};
  try {
    if (id) {
      const result = await knex
        .select(
          "review.title",
          "review.id",
          "review.stars",
          "review.description",
          "review.created_date"
        )
        .from("review")
        .join("meal", "meal.id", "=", "review.meal_id")
        .where("meal.id", "=", id);

      response.data = result;
      response.status = 200;
      response.message = "Here are all reviews for the given meal id";
    }
    res
      .status(response.status || 404) // Set default status to 404 if no meal id is provided
      .json({
        data: response.data || [],
        message: response.message || "No review was found for this meal",
      });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//---------------------------------------------------------------------

// GET /api/meals  - Returns all meals - this one will not execute because of the router on line 6
// router.get("/", async (req, res) => {
//   try {
//     const allMeals = await knex.select("*").from("meal");
//     if (allMeals) {
//       res.status(200).json(allMeals);
//     } else {
//       res.status(404).send("The meals were not found");
//     }
//   } catch (error) {
//     console.error("Server Error", error);
//     res.status(500).json({ error: "Server Error: Not able to fetch data" });
//   }
// });

// POST /api/meals - Adds a new meal to the database
router.post("/", async (req, res) => {
  try {
    const newMeal = req.body;
    const newMealAdded = await knex("meal").insert(newMeal);
    if (newMealAdded) {
      res.status(201).json({ message: "The meal was created successfully" });
    }
    res.status(404).send("The data you have requested is not found");
  } catch (err) {
    console.error("Server Error", err);
    res.status(500).send({ error: "Server Error: Not able to fetch data" });
  }
});

// GET /api/meals/:id - Returns the meal by id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const [mealById] = await knex.select("*").from("meal").where("id", id);
    if (mealById) {
      res.status(200).json(mealById);
    } else {
      res.status(404).send("The meal was not found");
    }
  } catch (err) {
    res.status(500).json({ err: "Server Error: Not able to fetch data" });
  }
});

// PUT /api/meals/:id - Updates the meal by id
router.put("/:id", async (req, res) => {
  try {
    const id = +req.params.id;
    const updateMeal = req.body;
    const updatedMealById = await knex("meal")
      .where("id", id)
      .update(updateMeal);
    if (updatedMealById) {
      res.json({ message: "Meal updated successfully" });
    } else {
      res.status(404).send("The meal was not found");
    }
  } catch (error) {
    res.status(500).json({ error: "Server Error: Not able to fetch data" });
  }
});

// DELETE /api/meals/:id - Deletes the meal by id
router.delete("/:id", async (req, res) => {
  try {
    const id = +req.params.id;
    const deletedById = await knex("meal").where("id", id).del();
    if (deletedById) {
      res.json({ message: "The meal was deleted successfully" });
    } else {
      res.status(404).json({ error: "The Meal was not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server Error: Not able to fetch data" });
  }
});

router.get("/:id/reservations", async (req, res) => {
  try {
    const id = +req.params.id;
    console.log(id);

    const mealWithAvailableReservations = await knex("meal")
      .select("meal.*")
      .leftJoin("reservation", "meal.id", "reservation.meal_id")
      .where("meal.id", id)
      .groupBy("meal.id")
      .first();

    if (mealWithAvailableReservations) {
      const totalGuests = await knex("reservation")
        .where("meal_id", id)
        .sum("number_of_guests as totalGuests")
        .first();

      const numberOfSeatsLeft =
        mealWithAvailableReservations.max_reservations -
        (totalGuests.totalGuests || 0);

      if (numberOfSeatsLeft >= 0) {
        console.log("Seats left: ", numberOfSeatsLeft);
        res.status(200).json({ numberOfSeatsLeft });
      } else {
        res.status(200).json({ message: "No seats left" });
      }
    } else {
      res.status(404).json({ message: "Meal not found" });
    }
  } catch (error) {
    console.error("Internal Server Error", error);
    res.status(500).json({
      error:
        "Server Error: Unable to fetch meal reservation data. Try again later",
    });
  }
});

module.exports = router;
