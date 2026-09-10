import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchDishes, CATEGORIES } from '../api/dishesApi'
import { useFetch } from '../hooks/useFetch'
import { CategoryBar } from './CategoryBar'
import { DishList } from './DishList'
import { Spinner } from '../ui/Spinner'
import { Button } from '../ui/Button'

export function Menu() {
  const [searchParams, setSearchParams] = useSearchParams()

  // Selected category lives in the URL query string — shareable, survives a refresh
  const selectedCategory = searchParams.get('category') || 'All'
  const searchQuery = searchParams.get('q') || ''

  const handleSelectCategory = (cat) => {
    const nextParams = new URLSearchParams(searchParams)
    if (cat === 'All') {
      nextParams.delete('category')
    } else {
      nextParams.set('category', cat)
    }
    setSearchParams(nextParams)
  }

  const handleSearchChange = (e) => {
    const nextParams = new URLSearchParams(searchParams)
    const val = e.target.value
    if (val.trim()) {
      nextParams.set('q', val)
    } else {
      nextParams.delete('q')
    }
    setSearchParams(nextParams)
  }

  const handleClearFilters = () => {
    setSearchParams({})
  }

  // Fetch dishes in an effect with unmount cleanup (AbortController)
  const fetchDishesCallback = useCallback(
    ({ signal }) =>
      fetchDishes({
        category: selectedCategory,
        search: searchQuery,
        signal
      }),
    [selectedCategory, searchQuery]
  )

  const { data: dishes, loading, error, refetch } = useFetch(
    fetchDishesCallback,
    [selectedCategory, searchQuery]
  )

  const isFiltering = selectedCategory !== 'All' || searchQuery.trim() !== ''

  return (
    <section className="menu-page-container" aria-labelledby="menu-main-title">
      <header className="menu-header">
        <div>
          <h1 id="menu-main-title" className="menu-title">
            Addis Ababa Menu
          </h1>
          <p className="menu-subtitle">
            Authentic Ethiopian dishes, sizzling tibs, rich stews, and fresh Highland refreshments.
          </p>
        </div>

        {/* Search Input */}
        <div className="menu-search-wrapper">
          <label htmlFor="menu-search-input" className="visually-hidden">
            Search dishes or ingredients
          </label>
          <input
            id="menu-search-input"
            type="search"
            className="menu-search-input"
            placeholder="Search dishes, ingredients (e.g. Berbere, Tibs)..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => {
                const next = new URLSearchParams(searchParams)
                next.delete('q')
                setSearchParams(next)
              }}
              aria-label="Clear search"
            >
              &times;
            </button>
          )}
        </div>
      </header>

      {/* Category Filter in the URL */}
      <CategoryBar
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* Loading state: never a blank screen */}
      {loading && (
        <div className="menu-status-wrapper">
          <Spinner message="Fetching dishes from Addis Eats kitchen..." size="lg" />
        </div>
      )}

      {/* Error state: shows a useful message with retry */}
      {!loading && error && (
        <div className="menu-error-box" role="alert">
          <span className="error-badge-icon" aria-hidden="true">
            ⚠️
          </span>
          <h2 className="error-title">Unable to Load Menu</h2>
          <p className="error-desc">
            {error.message || 'We could not reach the dishes service. Please check your connection and try again.'}
          </p>
          <Button variant="primary" onClick={refetch}>
            Try Again
          </Button>
        </div>
      )}

      {/* Empty state: friendly note, not an error */}
      {!loading && !error && dishes && dishes.length === 0 && (
        <div className="menu-empty-box" role="status">
          <span className="empty-badge-icon" aria-hidden="true">
            🍲
          </span>
          <h2 className="empty-title">No Dishes Found</h2>
          <p className="empty-desc">
            {searchQuery
              ? `No dishes matched "${searchQuery}" in category "${selectedCategory}".`
              : `There are currently no items available in "${selectedCategory}".`}
          </p>
          {isFiltering && (
            <Button variant="outline" onClick={handleClearFilters}>
              Clear Filters & Show All Dishes
            </Button>
          )}
        </div>
      )}

      {/* Success: Dish list */}
      {!loading && !error && dishes && dishes.length > 0 && (
        <div className="menu-results-section">
          <div className="menu-results-count">
            Showing <strong>{dishes.length}</strong> {dishes.length === 1 ? 'dish' : 'dishes'}
            {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
          </div>
          <DishList dishes={dishes} />
        </div>
      )}
    </section>
  )
}
