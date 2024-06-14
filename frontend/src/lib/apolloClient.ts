import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

const link = createHttpLink(({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_SERVER_URL,
  credentials: 'include',
}))

const createApolloClient = () => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link,
  })
}

export default createApolloClient