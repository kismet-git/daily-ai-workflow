"use client"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Component, type ErrorInfo, type ReactNode } from "react"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error Boundary caught an error:", error.message, {
      componentStack: errorInfo.componentStack,
    })

    // In production, you would send this to an error reporting service
    if (process.env.NODE_ENV === "production") {
      // Example: Sentry.captureException(error, { contexts: { react: errorInfo } })
    }

    this.setState({ errorInfo })
  }

  private handleReset = () => {
    // Reset the error boundary so children are re-mounted.
    this.setState({ hasError: false, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
          <Alert variant="destructive" className="max-w-lg">
            <AlertTitle className="text-xl font-bold">Something went wrong</AlertTitle>
            <AlertDescription className="mt-2 space-y-2 text-sm">
              <p>We hit an unexpected error. Please try again.</p>
              {process.env.NODE_ENV === "development" && this.state.errorInfo && (
                <pre className="overflow-x-auto whitespace-pre-wrap rounded bg-muted p-2">
                  {this.state.errorInfo.componentStack}
                </pre>
              )}
              <button
                onClick={this.handleReset}
                className="mt-3 inline-flex items-center rounded bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90"
              >
                Refresh
              </button>
            </AlertDescription>
          </Alert>
        </main>
      )
    }

    return this.props.children
  }
}
