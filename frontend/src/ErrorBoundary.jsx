import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null, info: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    this.setState({ info })
    console.error('TatkalEasy render crash:', error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          fontFamily: 'monospace',
          padding: '40px',
          maxWidth: '800px',
          margin: '0 auto',
          color: '#1a1a1a',
          background: '#FFF3F3',
          minHeight: '100vh',
        }}>
          <h1 style={{ color: '#D32F2F', fontSize: '24px' }}>TatkalEasy hit a rendering error</h1>
          <p style={{ marginTop: '16px' }}>
            Please screenshot this and send it back — this is exactly what's needed to fix it.
          </p>
          <pre style={{
            background: '#1a1a1a',
            color: '#FFB4B4',
            padding: '20px',
            marginTop: '20px',
            overflowX: 'auto',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            fontSize: '13px',
          }}>
            {this.state.error?.toString()}
            {'\n\n'}
            {this.state.error?.stack}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '20px',
              padding: '12px 24px',
              background: '#D32F2F',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'monospace',
              fontWeight: 'bold',
            }}
          >
            RELOAD PAGE
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
