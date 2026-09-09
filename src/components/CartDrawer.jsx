import React from 'react'

function CartDrawer({
  isOpen,
  onClose,
  items,
  onIncreaseQty,
  onDecreaseQty,
  onRemoveItem,
  onProceedToCheckout
}) {
  if (!isOpen) return null

  const cartTotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <div className="cart-backdrop" onClick={onClose} role="presentation">
      <div
        className="cart-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cart-panel-header">
          <h2 id="cart-drawer-title">Your Order ({items.reduce((s, i) => s + i.qty, 0)})</h2>
          <button
            type="button"
            className="cart-panel-close"
            onClick={onClose}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <p className="cart-empty-title">Your cart is empty</p>
            <p className="cart-empty-sub">Add delicious dishes from the menu to start your order.</p>
            <button
              type="button"
              className="cart-browse-btn"
              onClick={onClose}
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items-scroll">
              {items.map((item) => (
                <div key={item.id} className="cart-row">
                  <div className="cart-row-details">
                    <span className="cart-row-name">{item.name}</span>
                    <span className="cart-row-price">{item.price} ETB</span>
                  </div>

                  <div className="cart-row-controls">
                    <button
                      type="button"
                      className="cart-qty-btn"
                      onClick={() => onDecreaseQty(item.id)}
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      -
                    </button>
                    <span className="cart-qty-value">{item.qty}</span>
                    <button
                      type="button"
                      className="cart-qty-btn"
                      onClick={() => onIncreaseQty(item.id)}
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className="cart-remove-btn"
                      onClick={() => onRemoveItem(item.id)}
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-panel-footer">
              <div className="cart-subtotal-row">
                <span>Subtotal:</span>
                <strong>{cartTotal} ETB</strong>
              </div>
              <button
                type="button"
                className="cart-checkout-btn"
                onClick={() => {
                  onClose()
                  onProceedToCheckout()
                }}
              >
                Proceed to Checkout ({cartTotal} ETB)
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CartDrawer