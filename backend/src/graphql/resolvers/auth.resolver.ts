import { Context } from 'koa'
import { Session } from 'koa-session'
import { GraphQLError } from 'graphql'
import { doesUserExist, createUser, getUserWithCredentials } from '../../methods/user'
import { pick } from 'lodash/fp'

// TODO: to move to proper type files
interface SessionData {
  user?: {
    id: string,
    email: string,
    firstname: string,
    lastname: string,
  }
}

interface ContextWithSession extends Context {
  session: Session & Partial<SessionData>;
}

export default {
  Mutation: {
    register: async (
      parent: never,
      { firstname, lastname, email, password }: { email: string, firstname: string, lastname: string, password: string },
      ctx: ContextWithSession
    ) => {
      const alreadyExists = await doesUserExist(email)

      if (alreadyExists) {
        throw new GraphQLError('Already exists', { extensions: { code: 'BAD_USER_INPUT' } })
      }

      // TODO: validate email and password
      const user = await createUser({ firstname, lastname, email, password })

      ctx.session.userId = user.id

      return user
    },
    login : async (parent: never, { email, password }: { email: string, password: string }, ctx: ContextWithSession) => {
      const user = await getUserWithCredentials({ email, password })

      if (user) {
        ctx.session.userId = user.id
      }

      return user
    },
    logout: async (parent: never, args: never, ctx: Context) => {
      ctx.session = null

      return true
    }
  }
}