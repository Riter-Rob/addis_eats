import { Component } from 'react'

/**
 * Standard React Error Boundary catching unhandled rendering crashes.
 * Provides a clean user-facing error card with retry option.
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for diagnostics
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    if (this.props.onReset) {
      this.props.onReset()
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="ui-error-boundary-card" role="alert">
          <div className="ui-error-icon" aria-hidden="true">⚠️</div>
          <h2 className="ui-error-title">Something went wrong</h2>
          <p className="ui-error-message">
            {this.state.error?.message || 'An unexpected rendering error occurred in this view.'}
          </p>
          <div className="ui-error-actions">
            <button
              type="button"
              className="ui-btn ui-btn--primary ui-btn--md"
              onClick={this.handleReset}
            >
              Try Again
            </button>
            <button
              type="button"
              className="ui-btn ui-btn--outline ui-btn--md"
              onClick={() => window.location.assign('/')}
            >
              Back to Home
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
