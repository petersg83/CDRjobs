'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import RegisterForm from '@/components/RegisterForm'
import LogoutButton from '@/components/Logout'

const Page = () => {
  const { authUser } = useAuth()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLoading(false)
    }
  }, [])


  if (isLoading) {
    return <p>Loading...</p>
  }

  if (authUser) {
    return <LogoutButton />
  } else {
    return <RegisterForm />
  }
}

export default Page


