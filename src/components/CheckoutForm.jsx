import React, { useState, useRef } from 'react'

const AREAS = [
  'Bole',
  'Kazanchis',
  'CMC & Ayat',
  'Sarbet & Bisrate Gabriel',
  'Piassa & Arada',
  'Meskel Flower & Olympia',
  'Gerji & Imperial',
  'Summit'
]

const PHONE_REGEX = /^(?:\+251|0)9\d{8}$/

function validate(form) {
  const errors = {}

  if (!form.name.trim()) {
    errors.name = 'Full name is required'
  } else if (form.name.trim().length < 3) {
    errors.name = 'Name must be at least 3 characters'
  }

  if (!form.phone.trim()) {
    errors.phone = 'Phone number is required'
  } else if (!PHONE_REGEX.test(form.phone.trim())) {
    errors.phone = 'Enter valid Ethiopian phone (e.g. 0912345678 or +251912345678)'
  }

  if (!form.area) {
    errors.area = 'Please select a delivery area in Addis Ababa'
  }

  if (!form.paymentMethod) {
    errors.paymentMethod = 'Please choose a payment method'
  }

  return errors
}

function CheckoutForm({ cart, onBackToMenu, onClearCart }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    area: '',
    paymentMethod: 'telebirr'
  })

  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [networkError, setNetworkError] = useState('')
  const [orderConfirmed, setOrderConfirmed] = useState(null)

  const nameInputRef = useRef(null)
  const phoneInputRef = useRef(null)
  const areaInputRef = useRef(null)

  const errors = validate(form)
  const isFormValid = Object.keys(errors).length === 0
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setNetworkError('')
  }

  function handleBlur(e) {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  function focusFirstInvalidField(currentErrors) {
    if (currentErrors.name && nameInputRef.current) {
      nameInputRef.current.focus()
    } else if (currentErrors.phone && phoneInputRef.current) {
      phoneInputRef.current.focus()
    } else if (currentErrors.area && areaInputRef.current) {
      areaInputRef.current.focus()
    }
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (!isFormValid) {
      setTouched({
        name: true,
        phone: true,
        area: true,
        paymentMethod: true
      })
      focusFirstInvalidField(errors)
      return
    }

    setIsSubmitting(true)
    setNetworkError('')

    setTimeout(() => {
      const order = {
        orderId: 'AE-' + Math.floor(100000 + Math.random() * 900000),
        customer: { ...form },
        items: [...cart],
        total: cartTotal,
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }

      setOrderConfirmed(order)
      setIsSubmitting(false)
      onClearCart()
    }, 1200)
  }

  if (orderConfirmed) {
    return (
      <section className="checkout-success" aria-live="polite">
        <div className="receipt-box">
          <div className="receipt-icon">✓</div>
          <h2>Order Confirmed!</h2>
          <p className="receipt-code">Order #{orderConfirmed.orderId}</p>
          <p className="receipt-time">Placed at {orderConfirmed.date}</p>

          <div className="receipt-summary">
            <h3>Delivery Summary</h3>
            <ul>
              {orderConfirmed.items.map((item) => (
                <li key={item.id} className="receipt-line">
                  <span>{item.name} × {item.qty}</span>
                  <strong>{item.price * item.qty} ETB</strong>
                </li>
              ))}
            </ul>

            <div className="receipt-total-row">
              <span>Total Paid:</span>
              <strong>{orderConfirmed.total} ETB</strong>
            </div>

            <div className="receipt-info-grid">
              <div>
                <span>Recipient:</span>
                <p>{orderConfirmed.customer.name}</p>
              </div>
              <div>
                <span>Phone:</span>
                <p>{orderConfirmed.customer.phone}</p>
              </div>
              <div>
                <span>Delivery Zone:</span>
                <p>{orderConfirmed.customer.area}</p>
              </div>
              <div>
                <span>Payment:</span>
                <p>{orderConfirmed.customer.paymentMethod}</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="receipt-back-btn"
            onClick={onBackToMenu}
          >
            Order More Food
          </button>
        </div>
      </section>
    )
  }

  if (cart.length === 0) {
    return (
      <section className="checkout-empty">
        <h2>Your cart is empty</h2>
        <p>You need at least one dish in your cart to proceed to checkout.</p>
        <button
          type="button"
          className="checkout-return-btn"
          onClick={onBackToMenu}
        >
          Return to Menu
        </button>
      </section>
    )
  }

  return (
    <section className="checkout-container">
      <div className="checkout-top-bar">
        <button
          type="button"
          className="checkout-back-nav"
          onClick={onBackToMenu}
        >
          ← Back to Menu
        </button>
        <h2>The Addis Eats Checkout</h2>
      </div>

      <div className="checkout-layout">
        <div className="checkout-form-card">
          {networkError && (
            <div className="network-error-banner" role="alert">
              {networkError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="field-group">
              <label htmlFor="name-input">
                Full Name <span className="req">*</span>
              </label>
              <input
                ref={nameInputRef}
                id="name-input"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g. Robel Tesfaye"
                aria-invalid={Boolean(touched.name && errors.name)}
                aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
                className={touched.name && errors.name ? 'input-error' : ''}
              />
              {touched.name && errors.name && (
                <p id="name-error" className="field-error" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="field-group">
              <label htmlFor="phone-input">
                Ethiopian Phone Number <span className="req">*</span>
              </label>
              <input
                ref={phoneInputRef}
                id="phone-input"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="0911000000 or +251911000000"
                aria-invalid={Boolean(touched.phone && errors.phone)}
                aria-describedby={touched.phone && errors.phone ? 'phone-error' : undefined}
                className={touched.phone && errors.phone ? 'input-error' : ''}
              />
              {touched.phone && errors.phone && (
                <p id="phone-error" className="field-error" role="alert">
                  {errors.phone}
                </p>
              )}
            </div>

            <div className="field-group">
              <label htmlFor="area-select">
                Addis Ababa Delivery Area <span className="req">*</span>
              </label>
              <select
                ref={areaInputRef}
                id="area-select"
                name="area"
                value={form.area}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(touched.area && errors.area)}
                aria-describedby={touched.area && errors.area ? 'area-error' : undefined}
                className={touched.area && errors.area ? 'input-error' : ''}
              >
                <option value="">-- Choose delivery zone --</option>
                {AREAS.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
              {touched.area && errors.area && (
                <p id="area-error" className="field-error" role="alert">
                  {errors.area}
                </p>
              )}
            </div>

            <fieldset className="field-group payment-fieldset">
              <legend>Payment Method <span className="req">*</span></legend>
              <div className="payment-options-grid">
                <label className={form.paymentMethod === 'telebirr' ? 'payment-pill active' : 'payment-pill'}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="telebirr"
                    checked={form.paymentMethod === 'telebirr'}
                    onChange={handleChange}
                  />
                  <span>telebirr</span>
                </label>

                <label className={form.paymentMethod === 'CBE Birr' ? 'payment-pill active' : 'payment-pill'}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="CBE Birr"
                    checked={form.paymentMethod === 'CBE Birr'}
                    onChange={handleChange}
                  />
                  <span>CBE Birr</span>
                </label>

                <label className={form.paymentMethod === 'Cash on Delivery' ? 'payment-pill active' : 'payment-pill'}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Cash on Delivery"
                    checked={form.paymentMethod === 'Cash on Delivery'}
                    onChange={handleChange}
                  />
                  <span>Cash on Delivery</span>
                </label>
              </div>
            </fieldset>

            <button
              type="submit"
              disabled={isSubmitting}
              className="checkout-submit-btn"
            >
              {isSubmitting
                ? 'Submitting Order...'
                : `Place Order (${cartTotal} ETB via ${form.paymentMethod})`}
            </button>
          </form>
        </div>

        <aside className="checkout-summary-card">
          <h3>Order Details ({cart.reduce((s, i) => s + i.qty, 0)} items)</h3>
          <div className="checkout-summary-items">
            {cart.map((item) => (
              <div key={item.id} className="summary-item-row">
                <div className="summary-item-title">
                  <span>{item.name}</span>
                  <small>Qty: {item.qty} × {item.price} ETB</small>
                </div>
                <strong>{item.qty * item.price} ETB</strong>
              </div>
            ))}
          </div>

          <div className="summary-breakdown">
            <div className="breakdown-row">
              <span>Delivery Fee</span>
              <span>Free</span>
            </div>
            <div className="breakdown-row total-row">
              <span>Total Amount</span>
              <strong>{cartTotal} ETB</strong>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default CheckoutForm