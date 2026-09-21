export function CategoryBar({ categories, selectedCategory, onSelectCategory }) {
  return (
    <nav className="category-bar" aria-label="Menu categories">
      {categories.map((cat) => {
        const isSelected =
          selectedCategory.toLowerCase() === cat.toLowerCase()

        return (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={isSelected}
            className={`category-btn${isSelected ? ' category-btn--active' : ''}`}
            onClick={() => onSelectCategory(cat)}
          >
            {cat}
          </button>
        )
      })}
    </nav>
  )
}
