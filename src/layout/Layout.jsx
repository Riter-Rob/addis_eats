import { NavLink, Link, Outlet } from 'react-router-dom'
import { CartBadge } from '../cart/CartBadge'
import { useAuth } from '../auth/AuthContext'

export function Layout() {
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <div className="app-shell">
      {/* Accessible skip link for keyboard users */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Main Header / Nav */}
      <header className="app-header">
        <div className="header-inner">
          <Link to="/" className="brand-logo" aria-label="Addis Eats Homepage">
            <span className="brand-badge-circle" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 2c1.5 3 4 5.5 4 9a6 6 0 0 1-12 0c0-3.5 2.5-6 4-9 1 2 2 3 4 3s3-1 4-3z" fill="var(--color-gold)" stroke="var(--color-berbere)" />
              </svg>
            </span>
            <div className="brand-names">
              <span className="brand-title">Addis Eats</span>
              <span className="brand-tagline">Addis Ababa Delicacies</span>
            </div>
          </Link>

          <nav className="header-nav" aria-label="Primary navigation">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `nav-item ${isActive ? 'nav-item--active' : ''}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/menu"
              className={({ isActive }) =>
                `nav-item ${isActive ? 'nav-item--active' : ''}`
              }
            >
              Menu
            </NavLink>
          </nav>

          <div className="header-actions">
            {/* User session indicator */}
            {isAuthenticated ? (
              <div className="user-session-pill">
                <span className="user-name" title={user.email}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ verticalAlign: '-2px', marginRight: '5px' }}>
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  {user.name}
                </span>
                <button
                  type="button"
                  className="auth-signout-btn"
                  onClick={logout}
                  aria-label="Sign out of account"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link to="/login" className="auth-signin-link">
                Sign In
              </Link>
            )}

            {/* Cart Badge */}
            <CartBadge />
          </div>
        </div>
      </header>

      {/* Main Routed Content via Outlet */}
      <main id="main-content" className="app-main-content">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-inner">
          <div className="footer-col">
            <h3 className="footer-heading">Addis Eats Delivery</h3>
            <p className="footer-text">
              Bringing authentic Ethiopian taste to your home and office across Addis Ababa.
            </p>
            <p className="footer-hours">
              Kitchen Hours: Mon &ndash; Sun: 11:00 AM &ndash; 10:30 PM
            </p>
          </div>

          <div className="footer-col">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <Link to="/">Home (Today&apos;s Specials)</Link>
              </li>
              <li>
                <Link to="/menu">Full Addis Menu</Link>
              </li>
              <li>
                <Link to="/menu?category=Traditional">Traditional Dishes</Link>
              </li>
              <li>
                <Link to="/cart">View Cart & Total</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="footer-heading">Addis Ababa Coverage</h3>
            <p className="footer-text">
              Bole, Kirkos, Kazanchis, Piassa, 4 Kilo, Megenagna, CMC, Sarbet, and Old Airport.
            </p>
            <p className="footer-phone">
              Dispatch Hotline: <strong>+251 (0) 911 234 567</strong>
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Addis Eats &middot; CodeOps Full Stack Development</p>
        </div>
      </footer>
    </div>
  )
}
