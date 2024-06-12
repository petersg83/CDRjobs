import { useAuth } from '@/context/AuthContext'

const LogoutButton = () => {
  const { setAuthUser } = useAuth()
  const onClick = () => {
    setAuthUser(null)
  }

  return (<button onClick={onClick}>
    Logout
  </button>)
}

export default LogoutButton