import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

/**
 * Reusable modal component rendered into portal.
 * Handles ESC key dismissal, body scroll lock, and accessibility.
 */
export function Modal({ isOpen, onClose, title, children }) {
  const modalRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div
      className="ui-modal-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="ui-modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ui-modal-title"
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
      >
        <div className="ui-modal-header">
          <h2 id="ui-modal-title" className="ui-modal-title">
            {title}
          </h2>
          <button
            type="button"
            className="ui-modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div className="ui-modal-body">{children}</div>
      </div>
    </div>,
    document.body
  )
}
