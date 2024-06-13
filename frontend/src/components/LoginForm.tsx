'use client'

import { useMutation, gql } from '@apollo/client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAuth } from '@/context/AuthContext'
import Button from '@/components/atoms/Button'

const LoginMutation = gql`
  mutation Register ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      firstname
      lastname
      email
    }
  }
`

type Inputs = {
  email: string
  password: string
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    // formState: { errors },
  } = useForm<Inputs>()
  
  const { setAuthUser } = useAuth()

  const [loginMutate] = useMutation(LoginMutation)

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res = await loginMutate({ variables: data })
    if (res.data.login.id) {
      setAuthUser(res.data.login)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col items-center w-64'>
          <input className='m-1 px-1 w-full' placeholder='email' type='email' {...register('email', { required: true })} />
          <input className='m-1 px-1 w-full' placeholder='password' type='password' {...register('password', { required: true })} />
          <Button onClick={handleSubmit(onSubmit)} text='Login' />
        </div>
      </form>
    </div>
    )
}

export default LoginForm


