import React, { useState, useEffect, useCallback, useRef, Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import DishCard from './components/DishCard'
import DishModal from './components/DishModal'
import DishDetail from './components/DishDetail'
import Wishlist from './components/Wishlist'
import CartDrawer from './components/CartDrawer'
import ErrorBoundary from './components/ErrorBoundary'
import Skeleton from './components/Skeleton'
import Footer from './component/footer'
import { fetchDishes } from './data/dishes'
import './App.css'

const CheckoutForm = lazy(() => import('./components/CheckoutForm'))

const CATEGORIES = ['All', 'Traditional', 'Fast Food', 'Salads', 'Beverages']

function App() {
  const [dishes, setDishes] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [onlyVegetarian, setOnlyVegetarian] = useState(false)
  const [sortBy, setSortBy] = useState('default')

  const [activeView, setActiveView] = useState('menu')
  const [selectedDishId, setSelectedDishId] = useState(null)
  const [selectedModalDish, setSelectedModalDish] = useState(null)

  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const modalTriggerRef = useRef(null)

  useEffect(() => {
    fetchDishes().then((data) => {
      setDishes(data)
      setLoading(false)
    })
  }, [])

  const handleAddToCart = useCallback((dish) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === dish.id)
      if (existing) {
        return prev.map((item) =>
          item.id === dish.id ? { ...item, qty: item.qty + 1 } : item
        )
      }
      return [...prev, { id: dish.id, name: dish.name, price: dish.price, qty: 1 }]
    })
  }, [])

  const handleIncreaseQty = useCallback((id) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item))
    )
  }, [])

  const handleDecreaseQty = useCallback((id) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0)
    )
  }, [])

  const handleRemoveItem = useCallback((id) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const handleClearCart = useCallback(() => {
    setCart([])
  }, [])

  const handleToggleWishlist = useCallback((dish) => {
    setWishlist((prev) => {
      const exists = prev.some((d) => d.id === dish.id)
      if (exists) {
        return prev.filter((d) => d.id !== dish.id)
      }
      return [...prev, dish]
    })
  }, [])

  const handleOpenQuickView = useCallback((dish, triggerElement) => {
    modalTriggerRef.current = triggerElement
    setSelectedModalDish(dish)
  }, [])

  const handleCloseQuickView = useCallback(() => {
    setSelectedModalDish(null)
  }, [])

  const handleSelectDish = useCallback((id) => {
    setSelectedDishId(id)
    setActiveView('detail')
  }, [])

  const filteredDishes = dishes
    .filter((dish) => {
      const matchesSearch =
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory =
        activeCategory === 'All' || dish.category === activeCategory
      const matchesVeg = !onlyVegetarian || dish.isVegetarian
      return matchesSearch && matchesCategory && matchesVeg
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      return a.id - b.id
    })

  const totalCartCount = cart.reduce((sum, item) => sum + item.qty, 0)
  const currentDetailDish = dishes.find((d) => d.id === selectedDishId)

  return (
    <div className="addis-app">
      <Navbar
        activeView={activeView}
        setActiveView={(view) => {
          setActiveView(view)
        }}
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="main-content">
        {loading && <Skeleton />}

        {!loading && activeView === 'menu' && (
          <ErrorBoundary
            fallback={(error, reset) => (
              <div className="menu-error-fallback" role="alert">
                <h2>Menu could not be loaded</h2>
                <p>{error?.message || 'An error occurred while displaying dishes.'}</p>
                <button type="button" onClick={reset} className="retry-btn">
                  Reload Menu
                </button>
              </div>
            )}
          >
            <section className="hero-banner">
              <div className="hero-text">
                <h1>Authentic Ethiopian Taste & City Street Food</h1>
                <p>Order freshly prepared dishes delivered anywhere across Addis Ababa.</p>
              </div>

              <div className="search-filter-container">
                <div className="search-bar-row">
                  <input
                    type="search"
                    className="dish-search-input"
                    placeholder="Search dishes, ingredients, or meals..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search dishes"
                  />

                  <div className="filter-controls-right">
                    <label className="veg-filter-label">
                      <input
                        type="checkbox"
                        checked={onlyVegetarian}
                        onChange={(e) => setOnlyVegetarian(e.target.checked)}
                      />
                      <span>Vegetarian Only</span>
                    </label>

                    <select
                      className="sort-dropdown"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      aria-label="Sort dishes"
                    >
                      <option value="default">Featured</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="name">Name (A-Z)</option>
                    </select>
                  </div>
                </div>

                <div className="category-filter-bar">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      className={activeCategory === cat ? 'category-tab active' : 'category-tab'}
                      onClick={() => setActiveCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section className="menu-grid-section">
              {filteredDishes.length === 0 ? (
                <div className="no-results-box">
                  <p>No dishes found matching your criteria.</p>
                  <button
                    type="button"
                    className="reset-filters-btn"
                    onClick={() => {
                      setSearchQuery('')
                      setActiveCategory('All')
                      setOnlyVegetarian(false)
                      setSortBy('default')
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="card_container">
                  {filteredDishes.map((dish) => {
                    const cartItem = cart.find((item) => item.id === dish.id)
                    const isWishlisted = wishlist.some((item) => item.id === dish.id)
                    return (
                      <DishCard
                        key={dish.id}
                        dish={dish}
                        inCartCount={cartItem ? cartItem.qty : 0}
                        isWishlisted={isWishlisted}
                        onAddToCart={handleAddToCart}
                        onQuickView={handleOpenQuickView}
                        onSelectDish={handleSelectDish}
                        onToggleWishlist={handleToggleWishlist}
                      />
                    )
                  })}
                </div>
              )}
            </section>
          </ErrorBoundary>
        )}

        {!loading && activeView === 'detail' && (
          <ErrorBoundary
            fallback={(error, reset) => (
              <div className="menu-error-fallback" role="alert">
                <h2>Could not load dish detail</h2>
                <p>{error?.message || 'Error viewing details.'}</p>
                <button type="button" onClick={reset} className="retry-btn">
                  Back
                </button>
              </div>
            )}
          >
            <DishDetail
              dish={currentDetailDish}
              onBack={() => setActiveView('menu')}
              onAddToCart={handleAddToCart}
              isWishlisted={wishlist.some((d) => d.id === selectedDishId)}
              onToggleWishlist={handleToggleWishlist}
            />
          </ErrorBoundary>
        )}

        {!loading && activeView === 'wishlist' && (
          <ErrorBoundary
            fallback={(error, reset) => (
              <div className="menu-error-fallback" role="alert">
                <h2>Could not load favorites</h2>
                <p>{error?.message || 'Error viewing wishlist.'}</p>
                <button type="button" onClick={reset} className="retry-btn">
                  Back to Menu
                </button>
              </div>
            )}
          >
            <Wishlist
              items={wishlist}
              onRemove={(id) => setWishlist((prev) => prev.filter((d) => d.id !== id))}
              onAddToCart={handleAddToCart}
              onSelectDish={handleSelectDish}
              onBackToMenu={() => setActiveView('menu')}
            />
          </ErrorBoundary>
        )}

        {!loading && activeView === 'checkout' && (
          <ErrorBoundary
            fallback={(error, reset) => (
              <div className="checkout-error-fallback" role="alert">
                <h2>Checkout encountered a problem</h2>
                <p>{error?.message || 'We could not load the checkout view.'}</p>
                <button type="button" onClick={reset} className="retry-btn">
                  Try Again
                </button>
              </div>
            )}
          >
            <Suspense fallback={<Skeleton />}>
              <CheckoutForm
                cart={cart}
                onBackToMenu={() => setActiveView('menu')}
                onClearCart={handleClearCart}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onIncreaseQty={handleIncreaseQty}
        onDecreaseQty={handleDecreaseQty}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => setActiveView('checkout')}
      />

      <DishModal
        isOpen={Boolean(selectedModalDish)}
        dish={selectedModalDish}
        onClose={handleCloseQuickView}
        onAddToCart={handleAddToCart}
        onSelectDish={handleSelectDish}
        triggerRef={modalTriggerRef}
      />

      <Footer />
    </div>
  )
}

export default App