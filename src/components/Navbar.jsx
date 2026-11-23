import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { selectCartCount } from "../features/cart/cartSlice";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = useSelector(selectCartCount);

  const closeMenu = () => setMenuOpen(false);
  const getLinkClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

  return (
    <header className="navbar">
      <nav className="navbar__inner" aria-label="Main navigation">
        <Link to="/" className="navbar__logo" onClick={closeMenu}>
          Cart<span>ly</span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="nav-links"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>

        <ul id="nav-links" className={menuOpen ? "nav-links open" : "nav-links"}>
          <li>
            <NavLink to="/" end className={getLinkClass} onClick={closeMenu}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" className={getLinkClass} onClick={closeMenu}>
              Cart
              <span className="cart-badge" aria-label={`${cartCount} items in cart`}>
                {cartCount}
              </span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
