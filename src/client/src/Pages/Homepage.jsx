import "./Homepage.css";
function Homepage() {
  return (
    <div className="homepage-wrapper">
      <div clasName="content-wrapper">
        <h1 className="homepage-title">Join Our Meal Sharing Journey!</h1>
        <div className="homepage-texts-container">
          <p>Where Every Meal is a Story,</p>
          <p>Every Bite Builds Community!</p>
        </div>
      </div>
      <div className="home-image-container">
        <img src="images\eating\meal-app-home.jpg" alt="meal-app-home" />
      </div>
    </div>
  );
}

export default Homepage;
