function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-box" role="alert">
      <p className="error-box__title">Something went wrong</p>
      <p>{message}</p>
      {onRetry && (
        <button type="button" className="btn btn--primary" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
