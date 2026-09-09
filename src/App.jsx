import React, { useState, useCallback, useRef, Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import DishCard from './components/DishCard'
import DishModal from './components/DishModal'
import CartDrawer from './components/CartDrawer'
import ErrorBoundary from './components/ErrorBoundary'
import Skeleton from './components/Skeleton'
import Footer from './component/footer'
import { initialDishes } from './data/dishes'
import './App.css'

const CheckoutForm = lazy(() => import('./components/CheckoutForm'))

const CATEGORIES = ['All', 'Traditional', 'Fast Food', 'Salads']

function App() {
  const [dishes] = useState(initialDishes)
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeView, setActiveView] = useState('menu')
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedDish, setSelectedDish] = useState(null)

  const modalTriggerRef = useRef(null)

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

  const handleOpenQuickView = useCallback((dish, triggerElement) => {
    modalTriggerRef.current = triggerElement
    setSelectedDish(dish)
  }, [])

  const handleCloseQuickView = useCallback(() => {
    setSelectedDish(null)
  }, [])

  const filteredDishes =
    activeCategory === 'All'
      ? dishes
      : dishes.filter((dish) => dish.category === activeCategory)

  const totalCartCount = cart.reduce((sum, item) => sum + item.qty, 0)

  return (
    <div className="addis-app">
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="main-content">
        {activeView === 'menu' && (
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
                <p>Order hot, freshly prepared meals delivered anywhere across Addis Ababa.</p>
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
            </section>

            <section className="menu-grid-section">
              <div className="card_container">
                {filteredDishes.map((dish) => {
                  const cartItem = cart.find((item) => item.id === dish.id)
                  return (
                    <DishCard
                      key={dish.id}
                      dish={dish}
                      inCartCount={cartItem ? cartItem.qty : 0}
                      onAddToCart={handleAddToCart}
                      onQuickView={handleOpenQuickView}
                    />
                  )
                })}
              </div>
            </section>
          </ErrorBoundary>
        )}

        {activeView === 'checkout' && (
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
        isOpen={Boolean(selectedDish)}
        dish={selectedDish}
        onClose={handleCloseQuickView}
        onAddToCart={handleAddToCart}
        triggerRef={modalTriggerRef}
      />

      <Footer />
    </div>
  )
}

export default App