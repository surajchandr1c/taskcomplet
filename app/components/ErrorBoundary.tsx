"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import Card from "@/app/components/ui/Card";
import Button from "@/app/components/ui/Button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error caught by ErrorBoundary:", error, errorInfo);
  }

  private handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 min-h-[calc(100vh-8rem)] flex items-center justify-center text-white">
          <Card className="max-w-md p-8 border-red-900/60 bg-red-950/10 space-y-4">
            <h2 className="text-xl font-bold text-red-400">Something went wrong</h2>
            <p className="text-zinc-400 text-sm">
              An unexpected client error occurred. Please reload the page or try logging in again if the issue persists.
            </p>
            {this.state.error && (
              <pre className="p-3 bg-black/40 border border-zinc-800 rounded text-[11px] text-zinc-500 overflow-x-auto">
                {this.state.error.message}
              </pre>
            )}
            <div className="pt-2">
              <Button onClick={this.handleReload} variant="danger" size="sm">
                Reload Page
              </Button>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
