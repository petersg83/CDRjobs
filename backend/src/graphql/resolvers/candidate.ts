import { Context } from 'koa'
import { Session } from 'koa-session'
import { GraphQLError } from 'graphql'
import { exists as candidateAlreadyExists, create as createCandidate } from '@/methods/candidate'

// TODO: to move to proper type files
interface SessionData {
  user?: { email: string };
}

interface ContextWithSession extends Context {
  session: Session & Partial<SessionData>;
}

export default {
  Query: {
    // to remove once there is at least one other query
    hello: (parents: never, args: never, ctx: Context) => {
      console.log('hello', ctx.session)
      if (ctx.session?.user?.email) {
        return `hello ${ctx.session.user.email}`
      }
      return 'hello'
    },
  },
  Mutation: {
    createCandidate: async (_: object, { email }: { email: string }, ctx: ContextWithSession) => {
      const alreadyExists = await candidateAlreadyExists(email)
      console.log('ctx.session', ctx.session)

      if (alreadyExists) {
        throw new GraphQLError('Already exists', { extensions: { code: 'BAD_USER_INPUT' } })
      }

      const candidate = await createCandidate({ email, password: '123' })

      ctx.session.user = { email: email.toLowerCase() }
      
      return candidate
    }
  }
}