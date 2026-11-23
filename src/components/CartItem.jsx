import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { decreaseQuantity, increaseQuantity, removeFromCart } from "../features/cart/cartSlice";
import { formatPrice } from "../utils/formatPrice";

function CartItem({ item }) {
  const dispatch = useDispatch();
  const { id, title, price, image, quantity } = item;

  return (
    <li className="cart-item">
      <Link to={`/product/${id}`} className="cart-item__image">
        <img src={image} alt={title} />
      </Link>

      <div className="cart-item__info">
        <Link to={`/product/${id}`} className="cart-item__title">
          {title}
        </Link>
        <p className="cart-item__unit">{formatPrice(price)} each</p>
        <button type="button" className="link-button" onClick={() => dispatch(removeFromCart(id))}>
          Remove
        </button>
      </div>

      <div className="quantity" role="group" aria-label={`Quantity for ${title}`}>
        <button
          type="button"
          onClick={() => dispatch(decreaseQuantity(id))}
          disabled={quantity === 1}
          aria-label="Decrease quantity"
        >
          &minus;
        </button>
        <span aria-live="polite">{quantity}</span>
        <button type="button" onClick={() => dispatch(increaseQuantity(id))} aria-label="Increase quantity">
          +
        </button>
      </div>

      <p className="cart-item__subtotal">{formatPrice(price * quantity)}</p>
    </li>
  );
}

export default CartItem;
