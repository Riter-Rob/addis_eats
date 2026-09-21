import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { fetchSpecials, fetchDishes, CATEGORIES } from '../api/dishesApi'
import { useFetch } from '../hooks/useFetch'
import { DishCard } from '../menu/DishCard'
import { CategoryBar } from '../menu/CategoryBar'
import { Spinner } from '../ui/Spinner'

const BASE_PATH = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`

export function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const fetchProductsCallback = useCallback(
    ({ signal }) => {
      if (selectedCategory === 'All') {
        return fetchSpecials({ signal })
      }
      return fetchDishes({ category: selectedCategory, signal })
    },
    [selectedCategory]
  )

  const { data: dishes, loading, error } = useFetch(fetchProductsCallback, [selectedCategory])

  return (
    <div className="home-container">

      {/* Hero Section: Rectangular, organic palette, authentic Addis Eats content */}
      <section className="hero-organic-section" aria-label="Welcome to Addis Eats">
        <div className="hero-organic-inner">
          <div className="hero-organic-content">
            <h1 className="hero-organic-title">
              Authentic<br />
              Addis Ababa<br />
              Flavors
            </h1>
            <p className="hero-organic-subtitle">
              Handcrafted traditional dishes prepared with pure highland ingredients,
              authentic sun-dried berbere, and fresh local produce across Addis Ababa.
            </p>
            <div className="hero-organic-actions">
              <Link to="/menu" className="hero-organic-btn">
                Explore Menu
              </Link>
            </div>
          </div>

          <div className="hero-organic-visual">
            <div className="hero-visual-card">
              <img
                src={`${BASE_PATH}menu-image/Beyaynetu.jpg`}
                alt="Traditional Ethiopian Beyaynetu feast platter on injera"
                className="hero-visual-main-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section className="products-section" id="specials" aria-labelledby="products-heading">
        <div className="products-inner">
          <h2 id="products-heading" className="products-title">
            Our Dishes
          </h2>

          <div className="products-category-bar">
            <CategoryBar
              categories={CATEGORIES}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>

          {loading && (
            <div className="products-loading">
              <Spinner message="Fetching dishes…" size="md" />
            </div>
          )}

          {error && (
            <div className="products-error" role="alert">
              Could not load dishes. Please try again.
            </div>
          )}

          {!loading && !error && dishes && (
            <div className="products-grid">
              {dishes.slice(0, 4).map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
          )}

          <div className="products-more-action">
            <Link to="/menu" className="products-view-all-btn">
              View Complete Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Split Feature Banners adapted to Addis Eats */}
      <section className="promo-split-section" aria-label="Featured highlights">
        <div className="promo-split-inner">

          {/* Card 1: Traditional Fasting & Veg */}
          <div className="promo-card">
            <div className="promo-card-media">
              <img
                src={`${BASE_PATH}menu-image/Shiro.jpg`}
                alt="Slow-simmered bubbling Shiro Tegabino in clay pot"
                className="promo-card-img"
              />
            </div>
            <div className="promo-card-content">
              <h3 className="promo-card-title">Traditional<br />Fasting &amp; Veg</h3>
              <p className="promo-card-desc">
                Royal fasting platters with spiced red lentils, yellow split peas,
                and bubbling Shiro cooked in earthen clay pots with fresh sourdough injera.
              </p>
              <Link to="/menu?category=Traditional" className="promo-card-btn">
                Explore Dishes
              </Link>
            </div>
          </div>

          {/* Card 2: Highland Spices & Buna */}
          <div className="promo-card">
            <div className="promo-card-content">
              <h3 className="promo-card-title">Highland Spices<br />&amp; Jebena Buna</h3>
              <p className="promo-card-desc">
                Stone-ground berbere, wild cardamom, and authentic Ethiopian coffee
                ceremonies freshly roasted and brewed in traditional clay pots.
              </p>
              <Link to="/menu?category=Beverages" className="promo-card-btn">
                Discover Drinks
              </Link>
            </div>
            <div className="promo-card-media">
              <img
                src={`${BASE_PATH}menu-image/Buna.jpg`}
                alt="Traditional Ethiopian Buna coffee in clay jebena"
                className="promo-card-img"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Quality Pillars Section */}
      <section className="quality-section" aria-label="Our culinary standards">
        <div className="quality-inner">
          <div className="quality-item">
            <h4 className="quality-item-title">Locally Sourced</h4>
            <p className="quality-item-text">
              Directly sourced from regional Ethiopian farmers and local Addis markets for authentic flavor.
            </p>
          </div>

          <div className="quality-item">
            <h4 className="quality-item-title">Highland Spices</h4>
            <p className="quality-item-text">
              Pure sun-dried berbere, wild korerima, and spiced clarified niter kibbeh crafted daily.
            </p>
          </div>

          <div className="quality-item">
            <h4 className="quality-item-title">Clay Pot Heritage</h4>
            <p className="quality-item-text">
              Generations-old slow-cooked recipes prepared with care in traditional clay cookware.
            </p>
          </div>
        </div>
      </section>

    </div>
  )
}
