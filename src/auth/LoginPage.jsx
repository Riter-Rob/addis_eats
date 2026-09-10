import { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useAuth } from './AuthContext'
import { Button } from '../ui/Button'

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Extract return path or fallback to home
  const from = location.state?.from?.pathname || '/'

  const [name, setName] = useState('Abebe Kebede')
  const [phone, setPhone] = useState('0911223344')
  const [email, setEmail] = useState('abebe@addis.et')

  const handleSubmit = (e) => {
    e.preventDefault()
    login({ name, phone, email })
    // Return after signing in
    navigate(from, { replace: true })
  }

  return (
    <section className="auth-page-container">
      <div className="auth-card">
        <div className="auth-badge">Addis Eats Account</div>
        <h1 className="auth-title">Sign in to Continue</h1>
        <p className="auth-subtitle">
          {from === '/checkout'
            ? 'Sign in is required to place and track your delivery order.'
            : 'Access your favorite dishes and fast checkout in Addis Ababa.'}
        </p>

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <div className="form-group">
            <label htmlFor="auth-name" className="form-label">
              Full Name
            </label>
            <input
              id="auth-name"
              type="text"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="auth-phone" className="form-label">
              Phone Number (Ethiopia)
            </label>
            <input
              id="auth-phone"
              type="tel"
              className="form-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0911223344 or +251 9..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="auth-email" className="form-label">
              Email Address
            </label>
            <input
              id="auth-email"
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-actions">
            <Button type="submit" variant="primary" size="lg" className="w-full">
              Sign In & Return to {from === '/checkout' ? 'Checkout' : 'Menu'}
            </Button>
          </div>
        </form>

        <div className="auth-footer-help">
          <p>
            Quick testing account pre-filled for convenience. You can also{' '}
            <Link to="/menu">browse the menu</Link> first.
          </p>
        </div>
      </div>
    </section>
  )
}
