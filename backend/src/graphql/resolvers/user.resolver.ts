import { Context } from 'koa'
import { GraphQLError } from 'graphql'
import { getById as getUserById } from '../../methods/user'

export default {
  Query: {
    me: async (parent: never, args: never, ctx: Context) => {
      if (!ctx.session?.user?.id) {
        throw new GraphQLError('You need to be logged in', { extensions: { code: 'UNAUTHENTICATED' } })
      }
      const user = await getUserById(ctx.session.user.id)
      
      return user
    },
  },
}