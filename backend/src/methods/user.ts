import prisma from '../db/prisma'
import { User } from '@prisma/client'
import bcrypt from 'bcrypt'

type SafeUser = Omit<User, 'passwordHash'>

export const doesUserExist = async (email: string): Promise<boolean> => {
  const count = await prisma.user.count({
    where: {
      email: email.toLowerCase(),
    }
  })

  return !!count
}

export const getUserById = async (id: string): Promise<SafeUser|null> => {
  const user = await prisma.user.findUnique({ where: { id } })

  return user
}

export const createUser = async ({ firstname, lastname, email, password }: {
  firstname: string,
  lastname: string,
  email: string,
  password: string,
}): Promise<SafeUser> => {
  const passwordHash = await bcrypt.hash(password, 12)

  const user = await prisma.user.create({
    data: {
      email: email.toLowerCase(),
      passwordHash,
      firstname,
      lastname
    },
    omit: {
      passwordHash: true,
    }
  })
 
  return user
}

export const getUserWithCredentials = async ({ email, password }: { email: string, password: string }): Promise<SafeUser|null> => {
  const user = await prisma.user.findUnique({
    where: {
      email: email.toLowerCase(),
    },
  })

  if (!user) {
    return null
  }

  const match = await bcrypt.compare(password, user.passwordHash)

  return match ? user : null
}

export const deleteUser = async (id: string) => {
  const user = await getUserById(id)

  if (!user) {
    throw new Error("Can't delete user because it doesn't exist")
  }

  await prisma.user.delete({ where: { id } })

  return user
}