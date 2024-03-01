const express = require("express");
const router = express.Router();
const knex = require("../database");

//-------------------------------------------

//http://localhost:5000/api/meals/title
router.get("/title", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const titles = await knex("meal").select("title");
    response.json(titles);
  } catch (error) {
    throw error;
  }
});

//-------------------------------------------

// GET /api/meals  - Returns all meals
router.get("/", async (req, res) => {
  try {
    const allMeals = await knex.select("*").from("meal");
    if (allMeals) {
      res.status(200).json(allMeals);
    } else {
      res.status(404).send("The meals were not found");
    }
  } catch (error) {
    console.error("Server Error", err);
    res.status(500).json({ error: "Server Error: Not able to fetch data" });
  }
});

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
    const mealById = await knex.select("*").from("meal").where("id", id);
    if (mealById) {
      res.status(200).json(mealById);
    } else {
      res.status(404).send("The meal was not found");
    }
  } catch (error) {
    res.status(500).json({ error: "Server Error: Not able to fetch data" });
  }
});

// PUT /api/meals/:id - Updates the meal by id
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
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
    const id = req.params.id;
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

module.exports = router;
