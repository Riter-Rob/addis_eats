/**
 * Generic reusable button without business logic.
 */
export function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  loading = false,
  className = '',
  ariaLabel,
  ...rest
}) {
  const baseClass = 'ui-btn'
  const variantClass = `ui-btn--${variant}`
  const sizeClass = `ui-btn--${size}`
  const loadingClass = loading ? 'ui-btn--loading' : ''

  return (
    <button
      type={type}
      className={[baseClass, variantClass, sizeClass, loadingClass, className]
        .filter(Boolean)
        .join(' ')}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-busy={loading}
      {...rest}
    >
      {loading ? (
        <span className="ui-btn-spinner" aria-hidden="true" />
      ) : null}
      <span className="ui-btn-text">{children}</span>
    </button>
  )
}
