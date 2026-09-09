import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

function DishModal({ isOpen, dish, onClose, onAddToCart, triggerRef, onSelectDish }) {
  const modalRef = useRef(null)
  const closeBtnRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    const triggerEl = triggerRef?.current
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    closeBtnRef.current?.focus()

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose()
        return
      }

      if (e.key === 'Tab') {
        const focusable = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (!focusable || focusable.length === 0) return

        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', handleKeyDown)
      triggerEl?.focus()
    }
  }, [isOpen, onClose, triggerRef])

  if (!isOpen || !dish) return null

  return createPortal(
    <div className="dish-modal-overlay" onClick={onClose} role="presentation">
      <div
        ref={modalRef}
        className="dish-modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dish-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="dish-modal-header">
          <h2 id="dish-modal-title">{dish.name}</h2>
          <button
            ref={closeBtnRef}
            type="button"
            className="dish-modal-close"
            onClick={onClose}
            aria-label="Close dialog"
          >
            Close
          </button>
        </div>

        {dish.image && (
          <img src={dish.image} alt={dish.name} className="modal-dish-img" />
        )}

        <div className="dish-modal-content">
          <p className="dish-modal-meta">Category: {dish.category}</p>
          <p className="dish-modal-desc">{dish.description}</p>
          <div className="dish-modal-price">{dish.price} ETB</div>
        </div>

        <div className="dish-modal-actions">
          <button
            type="button"
            className="dish-modal-add-btn"
            onClick={() => {
              onAddToCart(dish)
              onClose()
            }}
          >
            Add to Order
          </button>
          <button
            type="button"
            className="dish-modal-detail-btn"
            onClick={() => {
              onClose()
              onSelectDish(dish.id)
            }}
          >
            Full Details
          </button>
          <button
            type="button"
            className="dish-modal-cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default DishModal