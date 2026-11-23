import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../features/cart/cartSlice";
import { formatPrice } from "../utils/formatPrice";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { id, title, price, category, image } = product;

  return (
    <article className="product-card">
      <Link to={`/product/${id}`} className="product-card__image-link" aria-label={`View details for ${title}`}>
        <img src={image} alt={title} loading="lazy" />
      </Link>
      <div className="product-card__body">
        <span className="category-tag">{category}</span>
        <h3 className="product-card__title">
          <Link to={`/product/${id}`}>{title}</Link>
        </h3>
        <p className="product-card__price">{formatPrice(price)}</p>
        <button type="button" className="btn btn--primary" onClick={() => dispatch(addToCart(product))}>
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
