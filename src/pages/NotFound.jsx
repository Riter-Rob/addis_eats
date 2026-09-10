import { Link, useLocation } from 'react-router-dom'
import { Button } from '../ui/Button'

export function NotFound() {
  const location = useLocation()

  return (
    <section className="not-found-container" aria-labelledby="not-found-title">
      <div className="not-found-card">
        <div className="not-found-badge" aria-hidden="true">
          404
        </div>
        <h1 id="not-found-title" className="not-found-title">
          Page Not Found
        </h1>
        <p className="not-found-desc">
          The requested route <code className="not-found-code">{location.pathname}</code> does not exist on Addis Eats. It may have been moved or mistyped.
        </p>

        <div className="not-found-actions">
          <Link to="/">
            <Button variant="primary" size="lg">
              Return to Home
            </Button>
          </Link>
          <Link to="/menu">
            <Button variant="outline" size="lg">
              Browse the Menu
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
