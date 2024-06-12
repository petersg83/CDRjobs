'use client'

import { useMutation, gql } from '@apollo/client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAuth } from '@/context/AuthContext'

const registerMutation = gql`
  mutation Register ($firstname: String!, $lastname: String!, $email: String!, $password: String!) {
    register(email: $email, firstname: $firstname, lastname: $lastname, password: $password) {
      id
      firstname
      lastname
      email
    }
  }
`

type Inputs = {
  firstname: string
  lastname: string
  email: string
  password: string
}

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    // formState: { errors },
  } = useForm<Inputs>()
  
  const { setAuthUser } = useAuth()

  const [registerMutate] = useMutation(registerMutation)

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res = await registerMutate({ variables: data })
    if (res.data.register.id) {
      setAuthUser(res.data.register)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col items-center w-64'>
          <div className='flex mb-1 w-full'>
            <input className='mr-1 px-1 w-full' placeholder='Firstname' {...register('firstname', { required: true })} />
            <input className='ml-1 px-1 w-full' placeholder='Lastname' {...register('lastname', { required: true })} />
          </div>
          <input className='m-1 px-1 w-full' placeholder='email' type='email' {...register('email', { required: true })} />
          <input className='m-1 px-1 w-full' placeholder='password' type='password' {...register('password', { required: true })} />
          <button className='bg-white px-2 rounded-xl' type='submit'>Envoyer</button>
        </div>
      </form>
    </div>
    )
}

export default RegisterForm


