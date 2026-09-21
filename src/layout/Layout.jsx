import { useState, useRef, useEffect } from 'react'
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom'
import { CartBadge } from '../cart/CartBadge'
import { useAuth } from '../auth/AuthContext'

export function Layout() {
  const { user, isAuthenticated, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const sidebarRef = useRef(null)

  const closeSidebar = () => setSidebarOpen(false)

  useEffect(() => {
    if (!sidebarOpen) return
    const onMouseDown = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) closeSidebar()
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [sidebarOpen])

  useEffect(() => {
    if (!sidebarOpen) return
    const onKey = (e) => { if (e.key === 'Escape') closeSidebar() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [sidebarOpen])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    navigate(searchQuery.trim()
      ? `/menu?q=${encodeURIComponent(searchQuery.trim())}`
      : '/menu'
    )
  }

  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* Top Navigation Header matching template */}
      <header className="app-header">
        <div className="header-inner">
          {/* Logo — Serif bold wordmark like "ORGANIC" in reference */}
          <Link to="/" className="brand-logo" aria-label="Addis Eats — go to homepage">
            <span className="brand-wordmark">ADDIS EATS</span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="header-nav" aria-label="Primary navigation">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `header-nav-link${isActive ? ' header-nav-link--active' : ''}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/menu"
              className={({ isActive }) =>
                `header-nav-link${isActive ? ' header-nav-link--active' : ''}`
              }
            >
              Menu
            </NavLink>
            <Link to="/#specials" className="header-nav-link">
              Specials
            </Link>
          </nav>

          {/* Right actions: search, cart, auth, mobile toggle */}
          <div className="header-actions">
            <form role="search" className="header-search-form" onSubmit={handleSearchSubmit}>
              <label htmlFor="header-search-input" className="visually-hidden">
                Search dishes
              </label>
              <span className="header-search-icon" aria-hidden="true">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
              <input
                id="header-search-input"
                type="search"
                autoComplete="off"
                spellCheck="false"
                placeholder="Search food..."
                className="header-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>

            {/* Cart Badge */}
            <CartBadge />

            {/* Auth Session */}
            {isAuthenticated ? (
              <div className="user-session-pill">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span title={user.email}>{user.name}</span>
                <button type="button" className="auth-signout-btn" onClick={logout}>
                  Sign Out
                </button>
              </div>
            ) : (
              <Link to="/login" className="auth-signin-link">Sign In</Link>
            )}

            {/* Hamburger for mobile */}
            <button
              type="button"
              className="hamburger-btn"
              aria-label="Open site menu"
              aria-expanded={sidebarOpen}
              aria-controls="site-sidebar"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="hamburger-lines" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`site-overlay${sidebarOpen ? ' site-overlay--open' : ''}`}
        aria-hidden={!sidebarOpen}
        onClick={closeSidebar}
      >
        <aside
          id="site-sidebar"
          ref={sidebarRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className={`site-sidebar${sidebarOpen ? ' site-sidebar--open' : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sidebar-top">
            <span className="brand-wordmark" style={{ fontSize: '1.25rem' }}>ADDIS EATS</span>
            <button
              type="button"
              className="sidebar-close-btn"
              aria-label="Close menu"
              onClick={closeSidebar}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="sidebar-nav" aria-label="Mobile navigation">
            <NavLink to="/" end
              className={({ isActive }) => `sidebar-link${isActive ? ' sidebar-link--active' : ''}`}
              onClick={closeSidebar}
            >
              Home
            </NavLink>
            <NavLink to="/menu"
              className={({ isActive }) => `sidebar-link${isActive ? ' sidebar-link--active' : ''}`}
              onClick={closeSidebar}
            >
              Menu
            </NavLink>
            <NavLink to="/cart"
              className={({ isActive }) => `sidebar-link${isActive ? ' sidebar-link--active' : ''}`}
              onClick={closeSidebar}
            >
              Cart
            </NavLink>
            {!isAuthenticated && (
              <NavLink to="/login"
                className="sidebar-link"
                onClick={closeSidebar}
              >
                Sign In
              </NavLink>
            )}
          </nav>
        </aside>
      </div>

      <main id="main-content" className="app-main-content">
        <Outlet />
      </main>

      {/* Solid Dark Forest Green Footer directly matching template */}
      <footer className="app-footer" id="about">
        <div className="footer-inner">
          {/* Column 1: About Us */}
          <div className="footer-col">
            <h3 className="footer-heading">About Us</h3>
            <p className="footer-text">
              Addis Eats connects you to the purest organic flavors of Ethiopia.
              We source fresh produce directly from local highland farms, preparing
              authentic dishes with sun-dried berbere, rich lentils, and time-honored recipes.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/menu">Our Menu</Link></li>
              <li><Link to="/#specials">Today&apos;s Specials</Link></li>
              <li><Link to="/cart">My Cart</Link></li>
              <li><Link to="/login">Account</Link></li>
            </ul>
          </div>

          {/* Column 3: Follow Us & Contact */}
          <div className="footer-col">
            <h3 className="footer-heading">Follow Us</h3>
            <p className="footer-sub-text">Addis Ababa, Ethiopia</p>
            <p className="footer-phone">+251 911 234 567</p>
            <div className="footer-social-row">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="footer-social-btn" aria-label="Facebook">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="footer-social-btn" aria-label="Instagram">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="footer-social-btn" aria-label="Twitter">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Addis Eats. Authentic Ethiopian Food. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
