import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [role, setRole]       = useState(null)
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)  // true while restoring session

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('wellcampus_user')
      if (stored) {
        const parsedUser = JSON.parse(stored)
        setRole(parsedUser.role)
        setUser(parsedUser)
      }
    } catch {
      localStorage.removeItem('wellcampus_user')
      localStorage.removeItem('wellcampus_token')
    } finally {
      setLoading(false)
    }
  }, [])

  const login = (userData, token) => {
    setRole(userData.role)
    setUser(userData)
    localStorage.setItem('wellcampus_user', JSON.stringify(userData))
    if (token) localStorage.setItem('wellcampus_token', token)
  }

  const logout = () => {
    setRole(null)
    setUser(null)
    localStorage.removeItem('wellcampus_user')
    localStorage.removeItem('wellcampus_token')
  }

  return (
    <AuthContext.Provider value={{ role, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext) // eslint-disable-line react-refresh/only-export-components
