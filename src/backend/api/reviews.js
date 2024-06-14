const express = require("express");
const router = express.Router();
const knex = require("../database");

//-------------- Reviews Routs -----------------

//Returns all reviews. (api/reviews/)
router.get("/", async (req, res) => {
  const response = {};
  try {
    const result = await knex.select("*").from("review");
    if (result.length > 0) {
      response.data = result;
      response.status = 200;
      response.message = "Here are all meals reviews";
    }
    res
      .status(response.status)
      .json({ data: response.data, message: response.message });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Returns a review by id. (GET http://localhost:5000/api/reviews/:id)
router.get("/:id", async (req, res) => {
  const response = {};
  try {
    const id = +req.params.id;
    const reviewById = await knex
      .select(
        "review.id AS Review ID",
        "meal.title AS Meal title",
        "review.description"
      )
      .from("meal")
      .join("review", "meal.id", "=", "review.meal_id")
      .where("review.id", "=", id);

    if (reviewById.length > 0) {
      response.data = reviewById;
      response.status = 200;
      response.message = "Here is the review for the given id";
    }
    res
      .status(response.status)
      .json({ data: response.data, message: response.message });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Adds a new review to the database.
router.post("/", async (req, res) => {
  const response = {};
  try {
    const newReview = req.body;
    const NewReviewAdded = await knex("review").insert(newReview);

    if (NewReviewAdded.length > 0) {
      response.data = NewReviewAdded;
      response.status = 201;
      response.message = "The new review was created successfully";
    }
    res
      .status(response.status)
      .json({ data: response.data, message: response.message });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Updates the review by id. (/api/reviews/:id)
router.put("/:id", async (req, res) => {
  const response = {};
  try {
    const id = req.params.id;
    const updateReview = req.body;
    const updatedReviewById = await knex("review")
      .where("id", id)
      .update(updateReview);

    if (updatedReviewById.length > 0) {
      res.status(200).json({ message: "Reservation updated successfully" });
    }
    res
      .status(response.status)
      .json({ data: response.data, message: response.message });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Delete the review by id. (/api/reviews/:id)
router.delete("/:id", async (req, res) => {
  const response = {};
  try {
    const id = req.params.id;
    const deletedReviewById = await knex("review").where("id", id).del();

    if (deletedReviewById.length > 0) {
      res.status(200).json({ message: "Reservation updated successfully" });
    }
    res
      .status(response.status)
      .json({ data: response.data, message: response.message });
  } catch (error) {
    console.error("Server Error", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
