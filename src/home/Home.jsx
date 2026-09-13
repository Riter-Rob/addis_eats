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
          <h1 id="hero-title" className="hero-heading">
            Enkuan dehna Metu <span className="hero-heading-accent">Delivered to Your Door</span>
          </h1>
          <p className="hero-description">
            From bubbling clay pot Shiro Tegabino and rich Doro Wat to sizzling Special Tibs and freshly ground berbere stews. Delivered hot across Bole, Kazanchis, Piassa, and beyond.
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
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--color-berbere)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
            </svg>
          </div>
          <h3 className="feature-title">Locally Sourced Meats & Spices</h3>
          <p className="feature-text">
            Authentic berbere ground in Addis Ababa, pure Highland niter kibbeh, and prime tenderloin.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon" aria-hidden="true">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--color-rosemary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
            </svg>
          </div>
          <h3 className="feature-title">Fasting & Vegetarian Friendly</h3>
          <p className="feature-text">
            Strict vegan fasting options (Tsom Beyaynetu, bubbling Shiro, fresh garden salads).
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon" aria-hidden="true">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
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
