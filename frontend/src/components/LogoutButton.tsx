import { useAuth } from '@/context/AuthContext'
import Button from './atoms/Button'

const LogoutButton = () => {
  const { setAuthUser } = useAuth()
  const onClick = () => {
    setAuthUser(null)
  }

  return <Button onClick={onClick} text='Logout' />
}

export default LogoutButton