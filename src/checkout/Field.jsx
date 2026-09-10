/**
 * Controlled input field with accessible labels, touched tracking,
 * and error indicators visible with color removed.
 */
export function Field({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  touched,
  required = false,
  placeholder,
  helpText,
  as = 'input',
  children,
  ...rest
}) {
  const hasError = Boolean(touched && error)
  const errorId = `${name}-error`
  const helpId = `${name}-help`

  const inputProps = {
    id: name,
    name,
    value,
    onChange,
    onBlur,
    placeholder,
    required,
    className: `field-control ${hasError ? 'field-control--error' : ''}`,
    'aria-invalid': hasError ? 'true' : 'false',
    'aria-describedby': [
      hasError ? errorId : null,
      helpText ? helpId : null
    ]
      .filter(Boolean)
      .join(' ') || undefined,
    ...rest
  }

  return (
    <div className={`form-field-group ${hasError ? 'has-error' : ''}`}>
      <div className="field-label-row">
        <label htmlFor={name} className="field-label">
          {label} {required && <span className="required-star" aria-hidden="true">*</span>}
        </label>
      </div>

      {as === 'select' ? (
        <select {...inputProps}>{children}</select>
      ) : as === 'textarea' ? (
        <textarea rows={3} {...inputProps} />
      ) : (
        <input type={type} {...inputProps} />
      )}

      {helpText && !hasError && (
        <p id={helpId} className="field-help-text">
          {helpText}
        </p>
      )}

      {/* Accessible error message visible in greyscale with clear icon and text */}
      {hasError && (
        <div id={errorId} className="field-error-message" role="alert">
          <span className="field-error-icon" aria-hidden="true">
            [!]
          </span>
          <span className="field-error-text">{error}</span>
        </div>
      )}
    </div>
  )
}
