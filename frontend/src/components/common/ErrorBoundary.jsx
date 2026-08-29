import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Adventure Error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
        }}>
          <div className="glass-panel anim-bounce-in" style={{
            background: 'white',
            borderRadius: '36px',
            maxWidth: '520px',
            width: '100%',
            padding: '40px',
            border: '4px solid #fbbf24',
            boxShadow: '0 25px 60px rgba(0,0,0,0.12)',
            textAlign: 'center',
          }}>
            {/* Animated Error Icon */}
            <div style={{
              fontSize: '72px',
              marginBottom: '16px',
            }} className="anim-wiggle">
              🤕
            </div>

            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: 800,
              color: '#0f172a',
              marginBottom: '12px',
            }}>
              Oops! Something Broke!
            </h2>

            <p style={{
              fontSize: '1.1rem',
              fontWeight: 600,
              color: '#64748b',
              marginBottom: '24px',
              lineHeight: 1.5,
            }}>
              Don't worry, even the best explorers stumble sometimes!
              Our robot friends are fixing things right now. 🤖
            </p>

            {/* Fun Error Card */}
            <div style={{
              background: '#fef3c7',
              border: '2px dashed #f59e0b',
              borderRadius: '16px',
              padding: '14px',
              marginBottom: '24px',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#92400e',
            }}>
              🔧 Technical details: {this.state.error?.message || 'Unknown error'}
            </div>

            {/* Retry Button */}
            <button
              onClick={this.handleRetry}
              className="btn-fun btn-fun-mint anim-pulse"
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '1.2rem',
                borderRadius: '9999px',
              }}
            >
              <span>🏠 Go Back Home & Try Again!</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
