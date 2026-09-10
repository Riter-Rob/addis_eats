/**
 * Category filter bar.
 * Updates URL search parameter when a category is selected.
 */
export function CategoryBar({ categories, selectedCategory, onSelectCategory }) {
  return (
    <nav className="category-bar" aria-label="Menu categories">
      <div className="category-list" role="tablist">
        {categories.map((cat) => {
          const isSelected =
            (selectedCategory === 'All' && (!selectedCategory || cat === 'All')) ||
            selectedCategory.toLowerCase() === cat.toLowerCase()

          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={isSelected}
              className={`category-chip ${isSelected ? 'category-chip--active' : ''}`}
              onClick={() => onSelectCategory(cat)}
            >
              {cat}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
