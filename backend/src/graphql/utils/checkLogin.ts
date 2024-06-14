import { Context } from 'koa'
import { GraphQLError } from 'graphql'

const checkLogin = (ctx: Context) => {
  if (!ctx.session?.userId) {
    throw new GraphQLError('You need to be logged in', { extensions: { code: 'UNAUTHENTICATED' } })
  }
}

export default checkLogin