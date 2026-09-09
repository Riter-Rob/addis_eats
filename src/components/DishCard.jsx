import React from 'react'

function DishCard({
  dish,
  onAddToCart,
  onQuickView,
  onSelectDish,
  isWishlisted,
  onToggleWishlist,
  inCartCount = 0
}) {
  return (
    <article className="dish-card">
      <div className="dish-card-image-wrap">
        <img
          src={dish.image}
          alt={dish.name}
          className="dish-card-img"
          onClick={() => onSelectDish(dish.id)}
        />
        <button
          type="button"
          className={isWishlisted ? 'dish-fav-btn active' : 'dish-fav-btn'}
          onClick={() => onToggleWishlist(dish)}
          aria-label={isWishlisted ? `Remove ${dish.name} from favorites` : `Add ${dish.name} to favorites`}
        >
          {isWishlisted ? 'Saved' : 'Save'}
        </button>
      </div>

      <div className="dish-card-body">
        <h3
          className="dish-title"
          onClick={() => onSelectDish(dish.id)}
        >
          {dish.name}
        </h3>
        <span className="dish-category">{dish.category}</span>
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
            {inCartCount > 0 ? `Add (${inCartCount})` : 'Add to Cart'}
          </button>
        </div>
      </div>
    </article>
  )
}

export default React.memo(DishCard)