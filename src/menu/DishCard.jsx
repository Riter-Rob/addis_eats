import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../cart/CartContext'

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
          <span className="dish-card-time">
            {dish.prepTime || '15-20 min'}
          </span>
          <button
            type="button"
            className={`dish-card-add-btn${justAdded ? ' dish-card-add-btn--added' : ''}`}
            onClick={handleAdd}
            aria-label={`Add ${dish.name} to order for ${dish.price} Ethiopian Birr`}
          >
            {justAdded ? 'Added' : 'Add to Order'}
          </button>
        </div>
      </div>
    </article>
  )
}
