import React from 'react'

function DishCard({ dish, onAddToCart, onQuickView, inCartCount = 0 }) {
  return (
    <article className="dish-card">
      <div className="dish-card-header">
        <span className="dish-badge">{dish.badge}</span>
        <span className="dish-prep">{dish.prepTime}</span>
      </div>

      <div className="dish-card-body">
        <h3 className="dish-title">{dish.name}</h3>
        <p className="dish-category">{dish.category}</p>
        <p className="dish-desc">{dish.description}</p>
      </div>

      <div className="dish-card-footer">
        <span className="dish-price">{dish.price} ETB</span>

        <div className="dish-actions">
          <button
            type="button"
            className="dish-view-btn"
            onClick={(e) => onQuickView(dish, e.currentTarget)}
            aria-label={`Quick view ${dish.name}`}
          >
            Quick View
          </button>
          <button
            type="button"
            className="dish-add-btn"
            onClick={() => onAddToCart(dish)}
            aria-label={`Add ${dish.name} to cart`}
          >
            {inCartCount > 0 ? `+ Add (${inCartCount})` : 'Add to Cart'}
          </button>
        </div>
      </div>
    </article>
  )
}

export default React.memo(DishCard)