import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getJSON } from "../api/fakeStore";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import { addToCart } from "../features/cart/cartSlice";
import { formatPrice } from "../utils/formatPrice";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Use the product from the store when it is already loaded (instant),
  // otherwise fetch it by id (for example after opening the link directly).
  const storedProduct = useSelector((state) => state.products.items.find((item) => String(item.id) === id));
  const [fetchedProduct, setFetchedProduct] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (storedProduct) return undefined;

    let isCancelled = false;

    async function loadProduct() {
      setStatus("loading");
      setError(null);
      try {
        const data = await getJSON(`/products/${id}`, "Failed to load this product.");
        if (!data) throw new Error("Product not found.");
        if (!isCancelled) {
          setFetchedProduct(data);
          setStatus("succeeded");
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err.message);
          setStatus("failed");
        }
      }
    }

    loadProduct();
    return () => {
      isCancelled = true;
    };
  }, [id, storedProduct]);

  const product = storedProduct || fetchedProduct;

  if (!product && status === "failed") {
    return (
      <>
        <Link to="/" className="back-link">&larr; Back to products</Link>
        <ErrorMessage message={error} />
      </>
    );
  }

  if (!product) {
    return <Loader message="Loading product..." />;
  }

  return (
    <section>
      <Link to="/" className="back-link">&larr; Back to products</Link>

      <article className="details">
        <div className="details__image">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="details__info">
          <span className="category-tag">{product.category}</span>
          <h1>{product.title}</h1>
          <p className="details__price">{formatPrice(product.price)}</p>
          <p className="details__description">{product.description}</p>
          <button type="button" className="btn btn--primary" onClick={() => dispatch(addToCart(product))}>
            Add to Cart
          </button>
        </div>
      </article>
    </section>
  );
}

export default ProductDetails;
