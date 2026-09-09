import React from 'react'

function Navbar({ activeView, setActiveView, cartCount, onOpenCart }) {
  return (
    <header className="app-navbar">
      <div className="navbar-brand" onClick={() => setActiveView('menu')}>
        <span className="brand-title">Addis Eats</span>
      </div>

      <nav className="navbar-nav">
        <button
          type="button"
          className={activeView === 'menu' ? 'nav-link active' : 'nav-link'}
          onClick={() => setActiveView('menu')}
        >
          Menu
        </button>
        <button
          type="button"
          className={activeView === 'checkout' ? 'nav-link active' : 'nav-link'}
          onClick={() => setActiveView('checkout')}
        >
          Checkout
        </button>
        <button
          type="button"
          className="cart-btn"
          onClick={onOpenCart}
          aria-label={`View cart with ${cartCount} items`}
        >
          Cart ({cartCount})
        </button>
      </nav>
    </header>
  )
}

export default Navbar