import http from 'http'
import Router from '@koa/router'
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { koaMiddleware } from '@as-integrations/koa'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('@apollo/server-plugin-landing-page-graphql-playground')
import { typeDefs, resolvers } from './graphql'
import app from './koa'
import prisma from './db/prisma'
import { doesUserExist } from './methods/user'

const run = async () => {
  // Check database connection
  try {
    await prisma.$connect()
  } catch (e) {
    throw new Error('Couldn\'t connect to database')
  }

  // Set up graphql server
  const router = new Router()
  const httpServer = http.createServer(app.callback())

  const plugins = [ApolloServerPluginDrainHttpServer({ httpServer })];
  if (process.env.NODE_ENV !== 'production') {
    plugins.push(ApolloServerPluginLandingPageGraphQLPlayground())
  }

  const server = new ApolloServer({ typeDefs, resolvers, plugins })
  await server.start()

  router.all(
    '/graphql',
    koaMiddleware(server, {
      context: async ({ ctx }) => {
        if (ctx.session?.userId) {
          const exists = doesUserExist(ctx.session?.userId)
          if (!exists) {
            ctx.session = null
          }
        }

        return ctx
      },
    }),
  )

  app.use(router.routes())

  await new Promise((resolve) => httpServer.listen({ port: 4000 }, () => resolve(undefined)))
  console.log('🚀 Server ready on port 4000')
}

run()
  .catch((e) => console.log(e))