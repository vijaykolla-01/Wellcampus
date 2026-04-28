import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext.jsx'
import Navbar from './components/Navbar.jsx'
import LandingPage from './pages/LandingPage.jsx'
import AuthPage from './pages/AuthPage.jsx'
import StudentDashboard from './pages/StudentDashboard.jsx'
import MentalHealthPage from './pages/MentalHealthPage.jsx'
import FitnessPage from './pages/FitnessPage.jsx'
import NutritionPage from './pages/NutritionPage.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import AdminResources from './pages/AdminResources.jsx'

// ── Protected route wrapper ────────────────────────────────────────
function ProtectedRoute({ children, allowedRole }) {
  const { role, loading } = useAuth()

  // While restoring session from localStorage, show nothing (prevents flash)
  if (loading) return null

  if (!role) return <Navigate to="/login" replace />
  if (role !== allowedRole) return <Navigate to="/" replace />
  return children
}

export default function App() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/"      element={<LandingPage />} />
          <Route path="/login" element={<AuthPage />} />

          {/* Student Routes */}
          <Route path="/student"                element={<ProtectedRoute allowedRole="student"><StudentDashboard /></ProtectedRoute>} />
          <Route path="/student/dashboard"      element={<ProtectedRoute allowedRole="student"><StudentDashboard /></ProtectedRoute>} />
          <Route path="/student/mental-health"  element={<ProtectedRoute allowedRole="student"><MentalHealthPage /></ProtectedRoute>} />
          <Route path="/student/fitness"        element={<ProtectedRoute allowedRole="student"><FitnessPage /></ProtectedRoute>} />
          <Route path="/student/nutrition"      element={<ProtectedRoute allowedRole="student"><NutritionPage /></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/admin"            element={<ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/dashboard"  element={<ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/resources"  element={<ProtectedRoute allowedRole="admin"><AdminResources /></ProtectedRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="footer">
        © 2024 WellCampus – Online Platform for Student Health &amp; Wellness Resources &nbsp;|&nbsp; B.Tech FSAD Project
      </footer>
    </div>
  )
}
