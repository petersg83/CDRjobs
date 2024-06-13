'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import RegisterForm from '@/components/RegisterForm'
import LogoutButton from '@/components/LogoutButton'
import LoginForm from '@/components/LoginForm'

const Page = () => {
  const { authUser } = useAuth()

  return <div className='flex flex-col items-center'>
    {authUser && <LogoutButton />}
    {!authUser && <RegisterForm />}
    {!authUser && <LoginForm />}
  </div>
}

export default Page


