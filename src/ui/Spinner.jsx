/**
 * Accessible, reusable loading spinner.
 */
export function Spinner({ message = 'Loading...', size = 'md' }) {
  return (
    <div className={`ui-spinner-container ui-spinner--${size}`} role="status">
      <div className="ui-spinner-circle" aria-hidden="true" />
      <span className="ui-spinner-text">{message}</span>
    </div>
  )
}
