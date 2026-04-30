import { useAuth } from '../context/AuthContext'
import './Dashboard.css'

export default function Dashboard() {
  const { user, logout } = useAuth()

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>🎉 Welcome to Dashboard</h1>
        <p>You are successfully logged in!</p>
      </div>

      <div className="dashboard-content">
        <div className="user-info-card">
          <h2>👤 User Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="label">Email:</span>
              <span className="value">{user?.email}</span>
            </div>
            <div className="info-item">
              <span className="label">User ID:</span>
              <span className="value">{user?.id}</span>
            </div>
            <div className="info-item">
              <span className="label">Login Time:</span>
              <span className="value">{user?.loginTime}</span>
            </div>
            <div className="info-item">
              <span className="label">Token:</span>
              <span className="value token-display">{user?.token}</span>
            </div>
          </div>
        </div>

        <div className="features-card">
          <h2>✨ Available Features</h2>
          <ul>
            <li>🔐 Secure Authentication System</li>
            <li>💾 Session Persistence (localStorage)</li>
            <li>🛡️ Protected Routes</li>
            <li>🔓 Logout Functionality</li>
            <li>📱 Responsive Design</li>
            <li>⚛️ Context API Integration</li>
          </ul>
        </div>

        <div className="logout-section">
          <button onClick={logout} className="logout-btn">
            🔓 Logout
          </button>
          <p className="logout-info">
            Clicking logout will clear your session and redirect you to the login page.
          </p>
        </div>
      </div>

      <div className="security-info">
        <h3>🔒 Security Notes</h3>
        <ul>
          <li>This is a demo authentication system for educational purposes</li>
          <li>The token is stored in localStorage (not recommended for production)</li>
          <li>In production, use secure HTTP-only cookies for tokens</li>
          <li>Always validate tokens on the backend before granting access</li>
          <li>Use HTTPS to ensure secure data transmission</li>
        </ul>
      </div>
    </div>
  )
}
