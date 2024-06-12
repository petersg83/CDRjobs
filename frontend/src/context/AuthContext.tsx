import { createContext, useContext, useEffect, useState } from 'react'

type User = {
  firstname: string
  lastname: string
  email: string
}

type AuthContext = {
  authUser: User | null
  setAuthUser: (user: User | null) => void
}

const AuthContext = createContext<AuthContext>({
  authUser: null,
  setAuthUser: () => {}
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User|null>(null)

  const setAuthUser = (user: User|null) => {
    localStorage.setItem('user', JSON.stringify(user))
    setUser(user)
  }

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      setAuthUser(JSON.parse(user))
    }
  }, [])

  return <AuthContext.Provider value={{ authUser: user, setAuthUser }}>{children}</AuthContext.Provider>
}