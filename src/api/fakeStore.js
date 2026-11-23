export const API_URL = "https://fakestoreapi.com";

// Small helper so every request checks response.ok the same way.
export async function getJSON(path, errorMessage) {
  const response = await fetch(`${API_URL}${path}`);
  if (!response.ok) {
    throw new Error(errorMessage);
  }
  const text = await response.text();
  // fakestoreapi answers with an empty body when an id does not exist
  return text ? JSON.parse(text) : null;
}
