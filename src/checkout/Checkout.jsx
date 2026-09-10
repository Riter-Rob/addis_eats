import { useState, useId } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../cart/CartContext'
import { useAuth } from '../auth/AuthContext'
import { Field } from './Field'
import { validateCheckout } from './validate'
import { Button } from '../ui/Button'

const ADDIS_SUBCITIES = [
  'Bole (Medhanialem, Atlas, Rwanda, Gerji)',
  'Kirkos (Kazanchis, Meskel Flower, Beklo Bet)',
  'Arada (Piassa, 4 Kilo, 6 Kilo)',
  'Yeka (Megenagna, Signal, CMC, Ayat)',
  'Lideta (Mexico, Balcha, Abinet)',
  'Nifas Silk-Lafto (Sarbet, Gotera, Jomo)',
  'Kolfe Keranio (Torhailoch, Ayer Tena)',
  'Gullele (Shiro Meda, Addisu Gebeya)'
]

export function Checkout() {
  const navigate = useNavigate()
  const { cart, subtotal, deliveryFee, totalETB, clearCart } = useCart()
  const { user } = useAuth()
  const errorSummaryId = useId()

  // Checkout owns: form fields and nowhere else
  const [values, setValues] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    subCity: '',
    streetAddress: '',
    paymentMethod: 'telebirr',
    specialInstructions: ''
  })

  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedOrder, setSubmittedOrder] = useState(null)

  // Pure validation
  const errors = validateCheckout(values)
  const isValid = Object.keys(errors).length === 0

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Mark all as touched
    const allTouched = {
      fullName: true,
      phone: true,
      subCity: true,
      streetAddress: true,
      paymentMethod: true
    }
    setTouched(allTouched)

    if (!isValid) {
      // Focus first error field for keyboard accessibility
      const firstErrorKey = Object.keys(errors)[0]
      const element = document.getElementById(firstErrorKey)
      if (element) {
        element.focus()
      }
      return
    }

    setIsSubmitting(true)

    // Simulate placing order with network delay
    setTimeout(() => {
      const orderId = `AE-${Math.floor(100000 + Math.random() * 900000)}`
      const orderRecord = {
        orderId,
        items: [...cart],
        subtotal,
        deliveryFee,
        totalETB,
        recipient: { ...values },
        orderedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }

      setSubmittedOrder(orderRecord)
      clearCart()
      setIsSubmitting(false)
    }, 800)
  }

  // If order was successfully submitted
  if (submittedOrder) {
    return (
      <section className="order-success-container" aria-labelledby="success-title">
        <div className="order-success-card">
          <div className="success-icon" aria-hidden="true">
            ✓
          </div>
          <div className="success-badge">Order Confirmed</div>
          <h1 id="success-title" className="success-title">
            Amesegenalehu! Your Food is on the Way
          </h1>
          <p className="success-subtitle">
            Order Reference: <strong>#{submittedOrder.orderId}</strong>
          </p>

          <div className="order-details-box">
            <div className="detail-line">
              <span>Estimated Delivery Time:</span>
              <strong>35–45 minutes</strong>
            </div>
            <div className="detail-line">
              <span>Recipient:</span>
              <strong>{submittedOrder.recipient.fullName} ({submittedOrder.recipient.phone})</strong>
            </div>
            <div className="detail-line">
              <span>Delivery Area:</span>
              <strong>{submittedOrder.recipient.subCity}</strong>
            </div>
            <div className="detail-line">
              <span>Address / Landmark:</span>
              <span>{submittedOrder.recipient.streetAddress}</span>
            </div>
            <div className="detail-line">
              <span>Payment Mode:</span>
              <strong className="uppercase-payment">{submittedOrder.recipient.paymentMethod}</strong>
            </div>
            <div className="detail-divider" />
            <div className="detail-line total-highlight">
              <span>Total Paid / Due:</span>
              <span className="total-highlight-price">{submittedOrder.totalETB} ETB</span>
            </div>
          </div>

          <div className="order-items-summary">
            <h3>Dishes Prepared:</h3>
            <ul>
              {submittedOrder.items.map((item) => (
                <li key={item.id}>
                  {item.qty}x {item.name} &mdash; {item.price * item.qty} ETB
                </li>
              ))}
            </ul>
          </div>

          <div className="success-actions">
            <Button variant="primary" size="lg" onClick={() => navigate('/menu')}>
              Order More Delicacies
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/')}>
              Return Home
            </Button>
          </div>
        </div>
      </section>
    )
  }

  // If cart is empty and no order submitted
  if (cart.length === 0) {
    return (
      <section className="checkout-empty-container">
        <div className="checkout-empty-card">
          <h1 className="checkout-empty-title">Your Order Cart is Empty</h1>
          <p className="checkout-empty-text">
            Add at least one delicious dish from our menu before proceeding to checkout.
          </p>
          <Button variant="primary" onClick={() => navigate('/menu')}>
            Browse Dishes
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section className="checkout-container" aria-labelledby="checkout-heading">
      <header className="checkout-header">
        <h1 id="checkout-heading" className="checkout-title">
          Addis Ababa Delivery Checkout
        </h1>
        <p className="checkout-subtitle">
          Signed in as <strong>{user?.name || 'Valued Guest'}</strong> ({user?.phone || user?.email || 'Authenticated'}). Complete your delivery details below.
        </p>
      </header>

      {/* Accessible validation banner if submitted with errors */}
      {Object.keys(touched).length > 0 && !isValid && (
        <div
          id={errorSummaryId}
          className="checkout-error-summary"
          role="alert"
          tabIndex="-1"
        >
          <h2 className="summary-error-heading">
            <span aria-hidden="true">[!]</span> Please fix the following errors before submitting:
          </h2>
          <ul className="summary-error-list">
            {Object.entries(errors).map(([fieldKey, msg]) => (
              <li key={fieldKey}>
                <a href={`#${fieldKey}`}>{msg}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="checkout-grid">
        {/* Checkout Form */}
        <form
          className="checkout-form-panel"
          onSubmit={handleSubmit}
          noValidate
          aria-label="Delivery information form"
        >
          <h2 className="form-section-title">1. Delivery Location & Contact</h2>

          <Field
            label="Full Name"
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.fullName}
            touched={touched.fullName}
            required
            placeholder="e.g. Abebe Kebede"
          />

          <Field
            label="Ethiopian Mobile Phone Number"
            name="phone"
            type="tel"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.phone}
            touched={touched.phone}
            required
            placeholder="e.g. 0911223344 or +251 911 223344"
            helpText="Our Addis delivery driver will call this number upon arrival."
          />

          <Field
            label="Sub-City / District"
            name="subCity"
            as="select"
            value={values.subCity}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.subCity}
            touched={touched.subCity}
            required
          >
            <option value="">-- Choose Sub-City in Addis Ababa --</option>
            {ADDIS_SUBCITIES.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </Field>

          <Field
            label="Street Address / Specific Landmark"
            name="streetAddress"
            as="textarea"
            value={values.streetAddress}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.streetAddress}
            touched={touched.streetAddress}
            required
            placeholder="e.g. Bole Medhanialem, past Edna Mall, House #402, Green gate"
            helpText="Include notable buildings or crossroads to expedite dispatch."
          />

          <h2 className="form-section-title">2. Payment Method</h2>

          <fieldset className="payment-fieldset">
            <legend className="visually-hidden">Select payment method</legend>
            <div className="payment-options-grid">
              <label
                className={`payment-card-label ${
                  values.paymentMethod === 'telebirr' ? 'payment-card--selected' : ''
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="telebirr"
                  checked={values.paymentMethod === 'telebirr'}
                  onChange={handleChange}
                  className="payment-radio"
                />
                <div className="payment-card-content">
                  <span className="payment-method-name">Telebirr</span>
                  <span className="payment-method-desc">Instant mobile wallet payment</span>
                </div>
              </label>

              <label
                className={`payment-card-label ${
                  values.paymentMethod === 'cbe' ? 'payment-card--selected' : ''
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cbe"
                  checked={values.paymentMethod === 'cbe'}
                  onChange={handleChange}
                  className="payment-radio"
                />
                <div className="payment-card-content">
                  <span className="payment-method-name">CBE Birr / Commercial Bank</span>
                  <span className="payment-method-desc">Direct mobile banking transfer</span>
                </div>
              </label>

              <label
                className={`payment-card-label ${
                  values.paymentMethod === 'cash' ? 'payment-card--selected' : ''
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={values.paymentMethod === 'cash'}
                  onChange={handleChange}
                  className="payment-radio"
                />
                <div className="payment-card-content">
                  <span className="payment-method-name">Cash on Delivery</span>
                  <span className="payment-method-desc">Pay driver in cash upon arrival</span>
                </div>
              </label>
            </div>
            {touched.paymentMethod && errors.paymentMethod && (
              <div className="field-error-message" role="alert">
                <span className="field-error-icon" aria-hidden="true">[!]</span>
                <span>{errors.paymentMethod}</span>
              </div>
            )}
          </fieldset>

          <Field
            label="Special Cooking or Delivery Instructions (Optional)"
            name="specialInstructions"
            as="textarea"
            value={values.specialInstructions}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. Extra mitmita on the side, please call when 5 minutes away."
          />

          <div className="form-submit-row">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isSubmitting}
              className="checkout-submit-btn"
            >
              Confirm & Place Order ({totalETB} ETB)
            </Button>
          </div>
        </form>

        {/* Order review side panel */}
        <aside className="checkout-summary-panel" aria-label="Current order details">
          <div className="checkout-summary-card">
            <h2 className="summary-title">Order Items ({cart.length})</h2>

            <ul className="checkout-items-list">
              {cart.map((item) => (
                <li key={item.id} className="checkout-item-line">
                  <div className="checkout-item-main">
                    <span className="checkout-item-qty">{item.qty}x</span>
                    <span className="checkout-item-name">{item.name}</span>
                  </div>
                  <span className="checkout-item-price">{item.price * item.qty} ETB</span>
                </li>
              ))}
            </ul>

            <div className="summary-line">
              <span>Dishes Subtotal</span>
              <span>{subtotal} ETB</span>
            </div>
            <div className="summary-line">
              <span>Addis Delivery Fee</span>
              <span>{deliveryFee} ETB</span>
            </div>

            <div className="summary-divider" />

            <div className="summary-line total-bold">
              <span>Total to Pay</span>
              <span className="total-bold-price">{totalETB} ETB</span>
            </div>

            <div className="summary-return-cart">
              <Link to="/cart" className="return-cart-link">
                &larr; Modify cart items
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}

// Default export for lazy loading: React.lazy(() => import('./checkout/Checkout'))
export default Checkout
