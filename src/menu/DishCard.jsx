import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../cart/CartContext'
import { Button } from '../ui/Button'

export function DishCard({ dish }) {
  const { addToCart } = useCart()
  const [justAdded, setJustAdded] = useState(false)

  const handleAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(dish, 1)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1200)
  }

  return (
    <article className="dish-card" aria-labelledby={`dish-title-${dish.id}`}>
      <Link to={`/menu/${dish.id}`} className="dish-card-media-link" tabIndex="-1" aria-hidden="true">
        <div className="dish-card-media">
          <img
            src={dish.image}
            alt={dish.name}
            loading="lazy"
            className="dish-card-img"
          />
          <span className="dish-card-badge">{dish.category}</span>
          {dish.isVegetarian && (
            <span className="dish-card-tag-veg" title="Vegetarian / Fasting">
              Fasting / Veg
            </span>
          )}
        </div>
      </Link>

      <div className="dish-card-content">
        <div className="dish-card-header">
          <h3 id={`dish-title-${dish.id}`} className="dish-card-title">
            <Link to={`/menu/${dish.id}`} className="dish-card-title-link">
              {dish.name}
            </Link>
          </h3>
          <span className="dish-card-price">{dish.price} ETB</span>
        </div>

        <p className="dish-card-desc">{dish.description}</p>

        <div className="dish-card-footer">
          <span className="dish-card-time" title="Estimated preparation time">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ verticalAlign: '-1px', marginRight: '4px' }}>
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {dish.prepTime || '15-20 min'}
          </span>
          <Button
            type="button"
            variant={justAdded ? 'secondary' : 'primary'}
            size="sm"
            onClick={handleAdd}
            ariaLabel={`Add ${dish.name} to order for ${dish.price} Ethiopian Birr`}
          >
            {justAdded ? 'Added ✓' : 'Add to Order'}
          </Button>
        </div>
      </div>
    </article>
  )
}
