import http from 'http'
import Router from '@koa/router'
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { koaMiddleware } from '@as-integrations/koa'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('@apollo/server-plugin-landing-page-graphql-playground')
import { typeDefs, resolvers } from './graphql'
import app from './koa'


const run = async () => {
  const router = new Router()
  const httpServer = http.createServer(app.callback())
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  })
  await server.start()

  router.all(
    '/graphql',
    koaMiddleware(server, {
      // context: async ({ ctx }) => ({ token: ctx.headers.jwt, session: ctx.session }),
      context: async ({ ctx }) => ctx,
    }),
  )

  app.use(router.routes())

  await new Promise((resolve) => httpServer.listen({ port: 4000 }, () => resolve(undefined)))
  console.log('🚀 Server ready at http://localhost:4000')
}

run()
  .catch((e) => console.log(e))