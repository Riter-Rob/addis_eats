import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import { CartProvider } from './cart/CartContext'
import { ErrorBoundary } from './ui/ErrorBoundary'
import { Layout } from './layout/Layout'
import { Home } from './home/Home'
import { Menu } from './menu/Menu'
import { DishDetail } from './menu/DishDetail'
import { CartPage } from './cart/CartPage'
import { RequireAuth } from './auth/RequireAuth'
import { LoginPage } from './auth/LoginPage'
import { NotFound } from './pages/NotFound'
import { Spinner } from './ui/Spinner'
import './App.css'

// One lazy-loaded route per Days 33-34 requirements
const Checkout = lazy(() => import('./checkout/Checkout'))

/**
 * Addis Eats Root Application
 * Configures Router, Error Boundary, Auth Provider, and Cart Store.
 */
export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Routes>
              {/* Nested routes under Layout with header, nav, Outlet, and footer */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="menu" element={<Menu />} />
                <Route path="menu/:id" element={<DishDetail />} />
                <Route path="cart" element={<CartPage />} />
                <Route
                  path="checkout"
                  element={
                    <RequireAuth>
                      <Suspense
                        fallback={
                          <div className="lazy-suspense-container">
                            <Spinner message="Preparing Addis delivery checkout..." size="lg" />
                          </div>
                        }
                      >
                        <Checkout />
                      </Suspense>
                    </RequireAuth>
                  }
                />
                <Route path="login" element={<LoginPage />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}