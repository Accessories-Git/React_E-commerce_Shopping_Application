function Loader({ message = "Loading..." }) {
  return (
    <div className="loader" role="status">
      <span className="loader__spinner" aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
}

export default Loader;
