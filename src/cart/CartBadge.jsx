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
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          style={{ verticalAlign: '-2px' }}
        >
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
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
