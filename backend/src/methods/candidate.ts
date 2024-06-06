import prisma from '@/db/prisma'
import { Candidate } from '@prisma/client'
import bcrypt from 'bcrypt'


type SafeCandidate = Omit<Candidate, 'passwordHash'>

export const exists = async (email: string): Promise<boolean> => {
  const count = await prisma.candidate.count({
    where: {
      email: email.toLowerCase(),
    }
  })

  return !!count
}

export const create = async ({ email, password, firstname, lastname }: {
  email: string,
  password: string,
  firstname?: string,
  lastname?: string,
}): Promise<SafeCandidate> => {

  let passwordHash = undefined
  if (password) {
    passwordHash = await bcrypt.hash(password, 12)
  }

  const candidate = await prisma.candidate.create({
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
 
  return candidate
}