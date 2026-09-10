import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { fetchSpecials } from '../api/dishesApi'
import { useFetch } from '../hooks/useFetch'
import { DishList } from '../menu/DishList'
import { Spinner } from '../ui/Spinner'
import { Button } from '../ui/Button'

export function Home() {
  const fetchSpecialsCallback = useCallback(({ signal }) => fetchSpecials({ signal }), [])
  const { data: specials, loading, error } = useFetch(fetchSpecialsCallback, [])

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-content">
          <span className="hero-eyebrow">Fresh & Sizzling from Addis Ababa</span>
          <h1 id="hero-title" className="hero-heading">
            Authentic Ethiopian Delicacies Delivered to Your Door
          </h1>
          <p className="hero-description">
            From clay pot Shiro Tegabino and rich Doro Wat to sizzling Special Tibs and freshly brewed Jebena coffee. Order across Bole, Kazanchis, Piassa, and beyond.
          </p>
          <div className="hero-actions">
            <Link to="/menu">
              <Button variant="primary" size="lg">
                Explore Full Menu &rarr;
              </Button>
            </Link>
            <Link to="/menu?category=Traditional">
              <Button variant="outline" size="lg">
                Traditional Specials
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Chef's Today Specials */}
      <section className="specials-section" aria-labelledby="specials-title">
        <div className="section-header">
          <div>
            <h2 id="specials-title" className="section-title">
              Today&apos;s Featured Specials
            </h2>
            <p className="section-subtitle">
              Hand-picked favorites crafted fresh daily by our Addis culinary team.
            </p>
          </div>
          <Link to="/menu" className="view-all-link">
            View All Dishes &rarr;
          </Link>
        </div>

        {loading && (
          <div className="specials-loading">
            <Spinner message="Loading chef specials..." size="md" />
          </div>
        )}

        {error && (
          <div className="specials-error" role="alert">
            <p>Could not load today&apos;s specials.</p>
          </div>
        )}

        {!loading && !error && specials && (
          <DishList dishes={specials} />
        )}
      </section>

      {/* Feature Highlights */}
      <section className="features-grid" aria-label="Why choose Addis Eats">
        <div className="feature-card">
          <div className="feature-icon" aria-hidden="true">
            🥩
          </div>
          <h3 className="feature-title">Locally Sourced Meats & Spices</h3>
          <p className="feature-text">
            Authentic berbere ground in Addis Ababa, pure Highland niter kibbeh, and prime tenderloin.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon" aria-hidden="true">
            🥬
          </div>
          <h3 className="feature-title">Fasting & Vegetarian Friendly</h3>
          <p className="feature-text">
            Strict vegan fasting options (Tsom Beyaynetu, bubbling Shiro, fresh garden salads).
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon" aria-hidden="true">
            ⚡
          </div>
          <h3 className="feature-title">Fast Addis Delivery</h3>
          <p className="feature-text">
            Prompt motorized dispatch covering Bole, Kirkos, Arada, Yeka, and Lideta.
          </p>
        </div>
      </section>
    </div>
  )
}
