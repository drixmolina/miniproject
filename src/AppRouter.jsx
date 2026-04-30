import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './AppRouter.css'
import { AuthProvider, useAuth } from './context/AuthContext'
import { BlogProvider } from './context/BlogContext'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import ContextDemo from './pages/ContextDemo'
import TaskManager from './TaskManager'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import BlogHome from './pages/BlogHome'
import BlogPost from './pages/BlogPost'
import BlogCreateEdit from './pages/BlogCreateEdit'
import ProtectedRoute from './components/ProtectedRoute'

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth()

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          ⚛️ React Training
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/context" className="nav-link">
              Context API
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/tasks" className="nav-link">
              Task Manager
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/blog" className="nav-link">
              Blog
            </Link>
          </li>
          {isAuthenticated && (
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
            </li>
          )}
        </ul>
        <div className="nav-auth">
          {isAuthenticated ? (
            <>
              <span className="user-email">{user?.email}</span>
              <button onClick={logout} className="logout-link">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="login-link">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

function AppRouterContent() {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/context" element={<ContextDemo />} />
          <Route path="/tasks" element={<TaskManager />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<BlogHome />} />
          <Route path="/blog/create" element={
            <ProtectedRoute>
              <BlogCreateEdit />
            </ProtectedRoute>
          } />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/blog/:id/edit" element={
            <ProtectedRoute>
              <BlogCreateEdit />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <footer className="footer">
        <p>&copy; 2026 React.js Training. All rights reserved.</p>
      </footer>
    </>
  )
}

function AppRouter() {
  return (
    <Router>
      <AuthProvider>
        <BlogProvider>
          <AppRouterContent />
        </BlogProvider>
      </AuthProvider>
    </Router>
  )
}

export default AppRouter
