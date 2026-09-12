import { Link, useNavigate } from 'react-router-dom'
import { useCart } from './CartContext'
import { Button } from '../ui/Button'

export function CartPage() {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
    totalItems,
    subtotal,
    deliveryFee,
    totalETB
  } = useCart()

  const navigate = useNavigate()

  if (cart.length === 0) {
    return (
      <section className="cart-page-empty">
        <div className="empty-cart-card">
          <div className="empty-cart-icon" aria-hidden="true">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-ink-muted)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
              <line x1="9" y1="14" x2="15" y2="14" />
            </svg>
          </div>
          <h1 className="empty-cart-title">Your Order is Empty</h1>
          <p className="empty-cart-text">
            You haven&apos;t added any delicious dishes yet. Explore our Addis Ababa menu to get started!
          </p>
          <div className="empty-cart-actions">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/menu')}
            >
              Explore Today&apos;s Menu
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="cart-page-container">
      <div className="cart-header">
        <div>
          <h1 className="cart-title">Your Order</h1>
          <p className="cart-subtitle">
            {totalItems} {totalItems === 1 ? 'dish' : 'dishes'} in your cart
          </p>
        </div>
        <button
          type="button"
          className="cart-clear-btn"
          onClick={clearCart}
          aria-label="Clear all items from cart"
        >
          Clear Cart
        </button>
      </div>

      <div className="cart-layout-grid">
        {/* Order lines list */}
        <div className="cart-lines-list" role="list">
          {cart.map((item) => (
            <div key={item.id} className="cart-line-item" role="listitem">
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
                loading="lazy"
              />
              <div className="cart-item-info">
                <Link to={`/menu/${item.id}`} className="cart-item-name">
                  {item.name}
                </Link>
                <span className="cart-item-category">{item.category}</span>
                <span className="cart-item-unit-price">{item.price} ETB each</span>
              </div>

              <div className="cart-qty-controls">
                <button
                  type="button"
                  className="cart-qty-btn"
                  onClick={() => decreaseQty(item.id)}
                  aria-label={`Decrease quantity of ${item.name}`}
                >
                  -
                </button>
                <span className="cart-qty-value" aria-label={`Quantity: ${item.qty}`}>
                  {item.qty}
                </span>
                <button
                  type="button"
                  className="cart-qty-btn"
                  onClick={() => increaseQty(item.id)}
                  aria-label={`Increase quantity of ${item.name}`}
                >
                  +
                </button>
              </div>

              <div className="cart-item-total">
                <span className="cart-line-total-price">
                  {item.price * item.qty} ETB
                </span>
                <button
                  type="button"
                  className="cart-item-remove-btn"
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary & Running Total */}
        <aside className="cart-summary-sidebar" aria-label="Order summary">
          <div className="cart-summary-card">
            <h2 className="cart-summary-title">Order Summary</h2>

            <div className="summary-row">
              <span>Dishes Subtotal</span>
              <span className="summary-price">{subtotal} ETB</span>
            </div>

            <div className="summary-row">
              <span>Addis Delivery Fee</span>
              <span className="summary-price">{deliveryFee} ETB</span>
            </div>

            <div className="summary-divider" />

            <div className="summary-row summary-total-row">
              <span>Running Total</span>
              <span className="summary-total-price">{totalETB} ETB</span>
            </div>

            <p className="summary-tax-note">
              Inclusive of all VAT and Addis Ababa city dispatch handling.
            </p>

            <div className="summary-checkout-action">
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout ({totalETB} ETB)
              </Button>
            </div>

            <div className="summary-continue-shopping">
              <Link to="/menu" className="continue-link">
                &larr; Add more dishes from menu
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
