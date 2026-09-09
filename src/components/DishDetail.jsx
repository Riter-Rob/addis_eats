import React, { useState } from 'react'

function DishDetail({ dish, onBack, onAddToCart, isWishlisted, onToggleWishlist }) {
  const [quantity, setQuantity] = useState(1)

  if (!dish) {
    return (
      <div className="detail-empty">
        <p>Dish not found.</p>
        <button type="button" className="detail-back-btn" onClick={onBack}>
          Back to Menu
        </button>
      </div>
    )
  }

  function handleIncrease() {
    setQuantity((q) => q + 1)
  }

  function handleDecrease() {
    setQuantity((q) => (q > 1 ? q - 1 : 1))
  }

  function handleAdd() {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(dish)
    }
  }

  return (
    <article className="dish-detail-card">
      <button type="button" className="detail-back-link" onClick={onBack}>
        &larr; Back to Menu
      </button>

      <div className="dish-detail-grid">
        <div className="dish-detail-media">
          <img src={dish.image} alt={dish.name} className="dish-detail-img" />
        </div>

        <div className="dish-detail-info">
          <div className="detail-header-row">
            <span className="detail-category">{dish.category}</span>
            <button
              type="button"
              className={isWishlisted ? 'wishlist-toggle-btn active' : 'wishlist-toggle-btn'}
              onClick={() => onToggleWishlist(dish)}
              aria-label={isWishlisted ? 'Remove from favorites' : 'Save to favorites'}
            >
              {isWishlisted ? 'Saved in Favorites' : 'Save to Favorites'}
            </button>
          </div>

          <h1 className="dish-detail-title">{dish.name}</h1>

          <div className="detail-price-tag">{dish.price} ETB</div>

          {dish.isVegetarian && (
            <span className="veg-badge">Vegetarian</span>
          )}

          <p className="dish-detail-description">{dish.description}</p>

          <div className="detail-ingredients-section">
            <h3>Ingredients</h3>
            <ul className="ingredients-list">
              {dish.ingredients.map((ing, idx) => (
                <li key={idx}>{ing}</li>
              ))}
            </ul>
          </div>

          <div className="detail-purchase-controls">
            <div className="detail-qty-group">
              <button
                type="button"
                className="qty-btn"
                onClick={handleDecrease}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="qty-number">{quantity}</span>
              <button
                type="button"
                className="qty-btn"
                onClick={handleIncrease}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              type="button"
              className="detail-add-cart-btn"
              onClick={handleAdd}
            >
              Add {quantity} to Order ({dish.price * quantity} ETB)
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default DishDetail