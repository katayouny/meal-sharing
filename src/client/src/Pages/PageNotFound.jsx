import "./PageNotFound.css";
function PageNotFound() {
  return (
    <div className="context-container">
      <div>
        <h3 className="not-found-message">The page was not found</h3>
      </div>
      <div>
        <img
          className="page-not-found-image"
          src="images\page-not-found-404.png"
          alt="Page not found"
        />
      </div>
    </div>
  );
}

export default PageNotFound;
