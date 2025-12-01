import { Component, type ErrorInfo, type ReactNode } from "react"
import { Button } from "../ui/Button"

interface Props {
    children?: ReactNode
}

interface State {
    hasError: boolean
    error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    }

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error }
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo)
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
                    <h1 className="mb-4 text-2xl font-bold text-destructive">Something went wrong</h1>
                    <p className="mb-6 text-muted-foreground">
                        {this.state.error?.message || "An unexpected error occurred."}
                    </p>
                    <Button onClick={() => window.location.reload()}>Reload Page</Button>
                </div>
            )
        }

        return this.props.children
    }
}
