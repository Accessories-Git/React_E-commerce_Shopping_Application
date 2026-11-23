import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="empty-state empty-state--large">
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn--primary">
        Go to Home
      </Link>
    </section>
  );
}

export default NotFound;
