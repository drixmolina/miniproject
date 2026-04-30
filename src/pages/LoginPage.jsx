import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import './LoginPage.css'

export default function LoginPage() {
  const { login, error, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [localError, setLocalError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLocalError(null)

    if (!email || !password) {
      setLocalError('Please fill in all fields')
      return
    }

    const success = await login(email, password)
    
    if (!success) {
      setLocalError(error || 'Login failed. Please try again.')
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>🔐 Login</h1>
        <p className="subtitle">Sign in to access protected content</p>

        {(localError || error) && (
          <div className="error-message">
            <p>❌ {localError || error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="eve.holt@reqres.in"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="cityslicka"
              disabled={loading}
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? '⏳ Logging in...' : '🔓 Login'}
          </button>
        </form>

        <div className="demo-credentials">
          <h3>Demo Credentials</h3>
          <p><strong>Email:</strong> eve.holt@reqres.in</p>
          <p><strong>Password:</strong> cityslicka</p>
        </div>

        <div className="login-info">
          <h3>ℹ️ About Authentication</h3>
          <p>
            This login uses the <strong>reqres.in</strong> fake API. The credentials above 
            are pre-configured in their system for testing purposes.
          </p>
          <p>
            After successful login, you'll have access to protected pages. Your session 
            is stored in localStorage and persists across page reloads.
          </p>
        </div>
      </div>
    </div>
  )
}
