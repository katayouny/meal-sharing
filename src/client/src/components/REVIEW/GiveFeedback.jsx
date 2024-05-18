import React, { useState } from "react";
import { useParams } from "react-router-dom";
import api_url from "../../api-url";
import "./GiveFeedback.css";

function GiveFeedback() {
  const { id } = useParams();
  const [feedbackFormData, setFeedbackFormData] = useState({
    title: "",
    description: "",
    meal_id: Number(id),
    stars: "",
    created_date: "",
  });

  const handleChange = (e) => {
    console.log(e.target.name);
    switch (e.target.name) {
      case "title":
        setFeedbackFormData({
          ...feedbackFormData,
          title: e.target.value,
        });
        break;
      case "description":
        setFeedbackFormData({
          ...feedbackFormData,
          description: e.target.value,
        });
        break;
      case "stars":
        setFeedbackFormData({
          ...feedbackFormData,
          stars: parseInt(e.target.value, 10),
        });
        break;
      case "created_date":
        setFeedbackFormData({
          ...feedbackFormData,
          created_date: e.target.value,
        });
        break;
      default:
        throw new Error("Unknown input field");
    }
  };

  const resetFormData = () => {
    setFeedbackFormData({
      title: "",
      description: "",
      meal_id: Number(id),
      stars: "",
      created_date: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(api_url(`/api/reviews`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackFormData),
      });
      if (response.ok) {
        const responseData = await response.json();
        console.log("feedback was sent successfully", responseData);
        resetFormData();
        alert("We successfully received your feedback. Thank you!");
      } else {
        console.error("Sending feedback failed");
        alert("We were not able to receive your feedback. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="feedback-form-container">
      <h3 className="feedback-form-title">
        Do you like to share your experince with us?
      </h3>
      <p className="filling-fiels-neccessary-message">
        Filling all fields is neccessary to send your feedback
      </p>
      <form method="post" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-labels" htmlFor="feedbackTitle">
            Title:{" "}
          </label>
          <input
            type="text"
            name="title"
            id="feedbackTitle"
            placeholder="A title for your feedback"
            onChange={handleChange}
            required
            value={feedbackFormData.title}
          />
        </div>
        <div className="form-group">
          <label className="form-labels" htmlFor="idea">
            Your idea:{" "}
          </label>
          <textarea
            name="description"
            id="idea"
            placeholder="Write us your idea..."
            value={feedbackFormData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label className="form-labels" htmlFor="givenStars">
            Stars:{" "}
          </label>
          <select
            name="stars"
            id="givenStars"
            value={feedbackFormData.stars}
            onChange={handleChange}
            required
          >
            {/* Generating options dynamically from 1 to 10 */}
            {[...Array(10).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-labels" htmlFor="creationDate">
            Creation date:{" "}
          </label>
          <input
            type="date"
            name="created_date"
            id="creationDate"
            value={feedbackFormData.created_date}
            onChange={handleChange}
            required
          />
        </div>
        <input className="review-button" type="submit" value="Send your feedback" />
      </form>
    </div>
  );
}

export default GiveFeedback;
