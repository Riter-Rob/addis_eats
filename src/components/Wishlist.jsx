import React from 'react'

function Wishlist({ items, onRemove, onAddToCart, onSelectDish, onBackToMenu }) {
  return (
    <section className="wishlist-page">
      <div className="wishlist-header">
        <h2>Your Saved Favorites ({items.length})</h2>
        <button type="button" className="wishlist-back-btn" onClick={onBackToMenu}>
          &larr; Back to Menu
        </button>
      </div>

      {items.length === 0 ? (
        <div className="wishlist-empty-box">
          <p>You have no saved favorite dishes yet.</p>
          <button type="button" className="browse-menu-action" onClick={onBackToMenu}>
            Explore Menu
          </button>
        </div>
      ) : (
        <div className="wishlist-grid">
          {items.map((dish) => (
            <div key={dish.id} className="wishlist-item-card">
              <img
                src={dish.image}
                alt={dish.name}
                className="wishlist-thumb"
                onClick={() => onSelectDish(dish.id)}
              />

              <div className="wishlist-info">
                <h3 onClick={() => onSelectDish(dish.id)}>{dish.name}</h3>
                <span className="wishlist-category">{dish.category}</span>
                <span className="wishlist-price">{dish.price} ETB</span>
              </div>

              <div className="wishlist-actions">
                <button
                  type="button"
                  className="wishlist-add-cart-btn"
                  onClick={() => onAddToCart(dish)}
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  className="wishlist-remove-btn"
                  onClick={() => onRemove(dish.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Wishlist