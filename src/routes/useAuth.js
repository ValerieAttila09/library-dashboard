import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      try {
        const decoded = jwtDecode(token)
        const now = Date.now() / 1000

        if (decoded.exp > now) {
          setIsAuthenticated(true)
          setUser(decoded)
        } else {
          localStorage.removeItem('token')
          setIsAuthenticated(false)
          setUser(null)
        }
      } catch (err) {
        console.error('Token invalid:', err)
        setIsAuthenticated(false)
        setUser(null)
      }
    } else {
      setIsAuthenticated(false)
      setUser(null)
    }

    setIsLoading(false)
  }, [])

  return { isAuthenticated, user, isLoading }
}

export default useAuth
