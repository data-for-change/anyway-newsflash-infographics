import React, { Component, ErrorInfo } from 'react';

export class ErrorBoundary extends Component {
  public state = {
    hasError: false,
  };

  public static getDerivedStateFromError() {
    return { hasError: true };
  }

  // set the types for error  and info
  public componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught an error', error, info);
  }

  public componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
    }
  }

  public render() {
    if (this.state.hasError) {
      return <p>Invalid Component widget.</p>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
