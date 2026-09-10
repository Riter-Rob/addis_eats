import { Link } from 'react-router-dom'
import { useCart } from './CartContext'

export function CartBadge() {
  const { totalItems, totalETB } = useCart()

  return (
    <Link
      to="/cart"
      className="nav-cart-btn"
      aria-label={`Cart with ${totalItems} items, total ${totalETB} Ethiopian Birr`}
    >
      <span className="cart-icon" aria-hidden="true">
        🛒
      </span>
      <span className="cart-label">Cart</span>
      {totalItems > 0 ? (
        <span className="cart-counter-pill" aria-hidden="true">
          {totalItems}
        </span>
      ) : null}
    </Link>
  )
}
