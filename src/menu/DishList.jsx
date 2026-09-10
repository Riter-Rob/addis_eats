import { DishCard } from './DishCard'

/**
 * Renders list of dishes via props.
 */
export function DishList({ dishes }) {
  return (
    <div className="dish-grid" role="region" aria-label="Dishes list">
      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} />
      ))}
    </div>
  )
}
