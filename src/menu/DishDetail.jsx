import { useState, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { fetchDishById } from '../api/dishesApi'
import { useFetch } from '../hooks/useFetch'
import { useCart } from '../cart/CartContext'
import { Button } from '../ui/Button'
import { Spinner } from '../ui/Spinner'

export function DishDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [addedMessage, setAddedMessage] = useState(false)

  // Fetch single dish with unmount cleanup
  const fetchSingleDish = useCallback(
    ({ signal }) => fetchDishById(id, { signal }),
    [id]
  )
  const { data: dish, loading, error, refetch } = useFetch(fetchSingleDish, [id])

  const handleAddToCart = () => {
    if (!dish) return
    addToCart(dish, quantity)
    setAddedMessage(true)
    setTimeout(() => setAddedMessage(false), 2000)
  }

  if (loading) {
    return (
      <div className="dish-detail-status-container">
        <Spinner message="Loading dish details..." size="lg" />
      </div>
    )
  }

  if (error || !dish) {
    return (
      <div className="dish-detail-error-card" role="alert">
        <div className="status-emoji" aria-hidden="true">
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <h1 className="dish-detail-error-title">Dish Not Found</h1>
        <p className="dish-detail-error-desc">
          We couldn&apos;t find a dish with ID #{id}. It may have been removed from our Addis menu.
        </p>
        <div className="dish-detail-error-actions">
          <Button variant="primary" onClick={() => navigate('/menu')}>
            Return to Menu
          </Button>
          <Button variant="outline" onClick={refetch}>
            Retry Fetch
          </Button>
        </div>
      </div>
    )
  }

  return (
    <article className="dish-detail-container" aria-labelledby="detail-dish-title">
      <nav className="breadcrumbs" aria-label="Breadcrumb navigation">
        <Link to="/" className="breadcrumb-link">
          Home
        </Link>
        <span className="breadcrumb-separator">/</span>
        <Link to="/menu" className="breadcrumb-link">
          Menu
        </Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current" aria-current="page">
          {dish.name}
        </span>
      </nav>

      <div className="dish-detail-card">
        <div className="dish-detail-media">
          <img
            src={dish.image}
            alt={dish.name}
            className="dish-detail-image"
          />
          <span className="dish-detail-cat-badge">{dish.category}</span>
          {dish.isVegetarian && (
            <span className="dish-detail-veg-badge">Fasting / Veg</span>
          )}
        </div>

        <div className="dish-detail-content">
          <div className="dish-detail-header">
            <h1 id="detail-dish-title" className="dish-detail-title">
              {dish.name}
            </h1>
            <div className="dish-detail-price-box">
              <span className="dish-detail-price">{dish.price} ETB</span>
              <span className="dish-detail-currency">Ethiopian Birr</span>
            </div>
          </div>

          <p className="dish-detail-desc">{dish.description}</p>

          <div className="dish-detail-meta">
            <div className="meta-item">
              <span className="meta-label">Est. Preparation</span>
              <span className="meta-value">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ verticalAlign: '-2px', marginRight: '5px' }}>
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {dish.prepTime || '20 min'}
              </span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Category</span>
              <span className="meta-value">{dish.category}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Dietary</span>
              <span className="meta-value">
                {dish.isVegetarian ? 'Vegetarian / Fasting (Tsom)' : 'Meat Dish'}
              </span>
            </div>
          </div>

          {dish.ingredients && dish.ingredients.length > 0 && (
            <div className="dish-detail-ingredients">
              <h2 className="ingredients-heading">Ingredients & Spices:</h2>
              <ul className="ingredients-list">
                {dish.ingredients.map((ing, idx) => (
                  <li key={idx} className="ingredient-tag">
                    {ing}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="dish-detail-action-bar">
            <div className="qty-picker" aria-label="Select quantity">
              <label htmlFor="dish-qty-input" className="qty-picker-label">
                Quantity:
              </label>
              <div className="qty-controls">
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  id="dish-qty-input"
                  type="number"
                  min="1"
                  max="50"
                  className="qty-input"
                  value={quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10)
                    if (!isNaN(val) && val >= 1) setQuantity(val)
                  }}
                />
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <Button
              type="button"
              variant="primary"
              size="lg"
              onClick={handleAddToCart}
              className="dish-add-order-btn"
            >
              {addedMessage ? 'Added to Order ✓' : `Add to Order (${dish.price * quantity} ETB)`}
            </Button>
          </div>

          {addedMessage && (
            <div className="dish-added-banner" role="status">
              Added {quantity} x {dish.name} to your order.{' '}
              <Link to="/cart" className="dish-view-cart-link">
                View Cart &rarr;
              </Link>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
