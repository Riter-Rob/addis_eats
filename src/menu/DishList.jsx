import { DishCard } from './DishCard'

export function DishList({ dishes }) {
  return (
    <div className="dish-grid" role="region" aria-label="Dishes list">
      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} />
      ))}
    </div>
  )
}
