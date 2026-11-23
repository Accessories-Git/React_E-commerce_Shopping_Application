import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { clearCart, selectCartCount, selectCartItems, selectCartTotal } from "../features/cart/cartSlice";
import { formatPrice } from "../utils/formatPrice";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const itemCount = useSelector(selectCartCount);
  const total = useSelector(selectCartTotal);

  if (cartItems.length === 0) {
    return (
      <section className="empty-state empty-state--large">
        <h1>Your cart is empty</h1>
        <p>Looks like you have not added anything yet.</p>
        <Link to="/" className="btn btn--primary">
          Continue shopping
        </Link>
      </section>
    );
  }

  return (
    <section>
      <div className="page-heading page-heading--row">
        <h1>Shopping cart</h1>
        <button type="button" className="btn btn--outline" onClick={() => dispatch(clearCart())}>
          Clear cart
        </button>
      </div>

      <div className="cart-layout">
        <ul className="cart-list">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </ul>

        <aside className="summary" aria-label="Order summary">
          <h2>Summary</h2>
          <dl>
            <div>
              <dt>Items</dt>
              <dd>{itemCount}</dd>
            </div>
            <div>
              <dt>Subtotal</dt>
              <dd>{formatPrice(total)}</dd>
            </div>
            <div>
              <dt>Shipping</dt>
              <dd>Free</dd>
            </div>
            <div className="summary__total">
              <dt>Total</dt>
              <dd>{formatPrice(total)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}

export default Cart;
