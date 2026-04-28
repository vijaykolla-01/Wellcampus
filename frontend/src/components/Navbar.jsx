import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar() {
  const { role, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path) => location.pathname === path ? 'nav-link active' : 'nav-link'

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link to="/" className="brand">
          <span className="brand-icon">🌿</span>
          WellCampus
          {role === 'admin' && <span className="admin-pill">Admin</span>}
        </Link>

        <div className="nav-links">
          {/* Public */}
          {!role && (
            <>
              <Link to="/" className={isActive('/')}>Home</Link>
              <Link to="/login" className="btn btn-primary btn-sm">Login</Link>
            </>
          )}

          {/* Student nav */}
          {role === 'student' && (
            <>
              <Link to="/student/dashboard"     className={isActive('/student/dashboard')}>Dashboard</Link>
              <Link to="/student/mental-health" className={isActive('/student/mental-health')}>Mental Health</Link>
              <Link to="/student/fitness"       className={isActive('/student/fitness')}>Fitness</Link>
              <Link to="/student/nutrition"     className={isActive('/student/nutrition')}>Nutrition</Link>
              <button className="nav-logout" onClick={handleLogout}>Logout</button>
            </>
          )}

          {/* Admin nav */}
          {role === 'admin' && (
            <>
              <Link to="/admin/dashboard"  className={isActive('/admin/dashboard')}>Dashboard</Link>
              <Link to="/admin/resources"  className={isActive('/admin/resources')}>Resources</Link>
              <button className="nav-logout" onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
