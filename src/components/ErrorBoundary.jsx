import React from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console or error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.setState({
      error,
      errorInfo
    })
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render() {
    if (this.state.hasError) {
      // Custom error UI
      return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="mb-6">
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {this.props.title || 'Something went wrong'}
              </h2>
              <p className="text-gray-600 mb-6">
                {this.props.message || 'An unexpected error occurred. Please try again or contact support if the problem persists.'}
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={this.handleRetry}
                className="btn-primary flex items-center space-x-2 mx-auto"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Try Again</span>
              </button>

              {this.props.showDetails && this.state.error && (
                <details className="text-left bg-gray-50 rounded-lg p-4 mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 mb-2">
                    Error Details
                  </summary>
                  <div className="text-xs text-gray-600 font-mono">
                    <div className="mb-2">
                      <strong>Error:</strong> {this.state.error.toString()}
                    </div>
                    {this.state.errorInfo && (
                      <div>
                        <strong>Stack Trace:</strong>
                        <pre className="whitespace-pre-wrap mt-1">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </div>
                    )}
                  </div>
                </details>
              )}

              {this.props.onError && (
                <button
                  onClick={() => this.props.onError(this.state.error)}
                  className="btn-secondary text-sm"
                >
                  Report Issue
                </button>
              )}
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Functional component wrapper for easier usage
export const AIErrorBoundary = ({ children, onRetry }) => (
  <ErrorBoundary
    title="AI Service Error"
    message="There was an issue with the AI layout generation. This could be due to network connectivity or service availability."
    showDetails={false}
    onError={(error) => {
      console.error('AI Error:', error)
      // Could send to error reporting service
    }}
  >
    {children}
  </ErrorBoundary>
)

export default ErrorBoundary

