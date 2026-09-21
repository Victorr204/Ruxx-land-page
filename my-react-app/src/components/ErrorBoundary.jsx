import { Component } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-2xl font-black text-foreground mb-2">Something went wrong</h1>
            <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto">
              An unexpected error occurred. Please try again.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl text-sm font-bold hover:opacity-90 transition-all"
              >
                <Home className="w-4 h-4" /> Go Home
              </Link>
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-2 border px-6 py-3 rounded-xl text-sm font-medium transition-all hover:bg-muted"
                style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
              >
                <RefreshCw className="w-4 h-4" /> Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
